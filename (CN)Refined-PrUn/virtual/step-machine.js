import tiles from './tiles.js';
import { $, _$$, _$ } from './select-dom.js';
import { C } from './prun-css.js';
import { act } from './act-registry.js';
import { clickElement } from './util.js';
import { sleep } from './sleep.js';
import { t } from './index5.js';
const AssertionError = new Error('Assertion failed');
class StepMachine {
  constructor(steps, options) {
    this.steps = steps;
    this.options = options;
  }
  next;
  nextAct;
  get isRunning() {
    return this.next !== void 0;
  }
  get log() {
    return this.options.log;
  }
  start() {
    this.options.onStart();
    this.startNext();
  }
  act() {
    if (!this.ensureRunning()) {
      return;
    }
    const nextAct = this.nextAct;
    this.nextAct = void 0;
    nextAct?.();
  }
  skip() {
    if (!this.ensureRunning()) {
      return;
    }
    const next = this.next;
    if (!next) {
      return;
    }
    const info = act.getActionStepInfo(next.type);
    this.log.skip(info.description(next));
    this.nextAct = void 0;
    this.startNext();
  }
  cancel() {
    if (!this.ensureRunning()) {
      return;
    }
    this.log.cancel(t('act.cancelExecution'));
    this.stop();
  }
  stop() {
    this.next = void 0;
    this.nextAct = void 0;
    this.options.onEnd();
  }
  startNext() {
    if (this.steps.length === 0) {
      this.log.success(t('act.executionCompleted'));
      this.stop();
      return;
    }
    const next = this.steps.shift();
    this.next = next;
    const info = act.getActionStepInfo(next.type);
    let description;
    const log = this.options.log;
    info
      .execute({
        data: next,
        log,
        setStatus: status => this.options.onStatusChanged(status),
        waitAct: async status => {
          status ??= description ?? info.description(next);
          await this.waitAct(status);
        },
        waitActionFeedback: async tile => {
          this.options.onStatusChanged('Waiting for action feedback...');
          const error = await waitActionFeedback(tile);
          if (error) {
            log.error(error);
            log.error(description ?? info.description(next));
            log.error('Action Package execution failed');
            this.stop();
            return;
          }
        },
        cacheDescription: () => {
          description = info.description(next);
          this.options.onStatusChanged(description, true);
        },
        complete: async () => {
          await sleep(0);
          log.success(description ?? info.description(next));
          this.startNext();
        },
        skip: () => this.skip(),
        fail: message => {
          if (message) {
            log.error(message);
          }
          log.error('Action Package execution failed');
          this.stop();
          return;
        },
        assert: (condition, message) => {
          if (!condition) {
            log.error(message);
            throw AssertionError;
          }
        },
        requestTile: async command => await this.requestTile(command),
      })
      .catch(e => {
        if (e !== AssertionError) {
          log.runtimeError(e);
        }
        this.stop();
      });
  }
  async requestTile(command) {
    let tile = tiles.find(command, true)[0];
    if (tile !== void 0) {
      return tile;
    }
    await this.waitAct(`Open ${command}`);
    this.options.onStatusChanged(`Opening ${command}...`);
    tile = await this.options.tileAllocator.requestTile(command);
    if (tile === void 0) {
      this.log.error(`Failed to open ${command}`);
      this.stop();
    }
    return tile;
  }
  async waitAct(status) {
    this.options.onStatusChanged(status);
    this.options.onActReady();
    await new Promise(resolve => (this.nextAct = resolve));
  }
  ensureRunning() {
    if (!this.isRunning) {
      this.log.error('Action Package is not running');
    }
    return this.isRunning;
  }
}
async function waitActionFeedback(tile) {
  const overlay = await $(tile.frame, C.ActionFeedback.overlay);
  await waitActionProgress(overlay);
  if (overlay.classList.contains(C.ActionConfirmationOverlay.container)) {
    const confirm = _$$(overlay, C.Button.btn)[1];
    if (confirm === void 0) {
      return 'Confirmation overlay is missing confirm button';
    }
    await clickElement(confirm);
    await waitActionProgress(overlay);
  }
  if (overlay.classList.contains(C.ActionFeedback.success)) {
    await clickElement(overlay);
    return;
  }
  if (overlay.classList.contains(C.ActionFeedback.error)) {
    const message = _$(overlay, C.ActionFeedback.message)?.textContent;
    const dismiss = _$(overlay, C.ActionFeedback.dismiss)?.textContent;
    return dismiss ? message?.replace(dismiss, '') : message;
  }
  return 'Unknown action feedback overlay';
}
async function waitActionProgress(overlay) {
  if (!overlay.classList.contains(C.ActionFeedback.progress)) {
    return;
  }
  await new Promise(resolve => {
    const mutationObserver = new MutationObserver(() => {
      if (!overlay.classList.contains(C.ActionFeedback.progress)) {
        mutationObserver.disconnect();
        resolve();
      }
    });
    mutationObserver.observe(overlay, { attributes: true });
  });
}
export { StepMachine };
