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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC1tYWNoaW5lLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0FDVC9ydW5uZXIvc3RlcC1tYWNoaW5lLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFjdCB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9hY3QtcmVnaXN0cnknO1xuaW1wb3J0IHsgQWN0aW9uU3RlcCB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9zaGFyZWQtdHlwZXMnO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL3J1bm5lci9sb2dnZXInO1xuaW1wb3J0IHsgVGlsZUFsbG9jYXRvciB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9ydW5uZXIvdGlsZS1hbGxvY2F0b3InO1xuaW1wb3J0IHsgY2xpY2tFbGVtZW50IH0gZnJvbSAnQHNyYy91dGlsJztcbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnQHNyYy91dGlscy9zbGVlcCc7XG5pbXBvcnQgeyB0IH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9pMThuJztcblxuaW50ZXJmYWNlIFN0ZXBNYWNoaW5lT3B0aW9ucyB7XG4gIHRpbGU6IFBydW5UaWxlO1xuICBsb2c6IExvZ2dlcjtcbiAgdGlsZUFsbG9jYXRvcjogVGlsZUFsbG9jYXRvcjtcbiAgb25CdWZmZXJTcGxpdDogKCkgPT4gdm9pZDtcbiAgb25TdGFydDogKCkgPT4gdm9pZDtcbiAgb25FbmQ6ICgpID0+IHZvaWQ7XG4gIG9uU3RhdHVzQ2hhbmdlZDogKHN0YXR1czogc3RyaW5nLCBrZWVwUmVhZHk/OiBib29sZWFuKSA9PiB2b2lkO1xuICBvbkFjdFJlYWR5OiAoKSA9PiB2b2lkO1xufVxuXG5jb25zdCBBc3NlcnRpb25FcnJvciA9IG5ldyBFcnJvcignQXNzZXJ0aW9uIGZhaWxlZCcpO1xuXG5leHBvcnQgY2xhc3MgU3RlcE1hY2hpbmUge1xuICBwcml2YXRlIG5leHQ/OiBBY3Rpb25TdGVwO1xuICBwcml2YXRlIG5leHRBY3Q/OiAoKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc3RlcHM6IEFjdGlvblN0ZXBbXSxcbiAgICBwcml2YXRlIG9wdGlvbnM6IFN0ZXBNYWNoaW5lT3B0aW9ucyxcbiAgKSB7fVxuXG4gIGdldCBpc1J1bm5pbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubmV4dCAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZ2V0IGxvZygpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmxvZztcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMub3B0aW9ucy5vblN0YXJ0KCk7XG4gICAgdGhpcy5zdGFydE5leHQoKTtcbiAgfVxuXG4gIGFjdCgpIHtcbiAgICBpZiAoIXRoaXMuZW5zdXJlUnVubmluZygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5leHRBY3QgPSB0aGlzLm5leHRBY3Q7XG4gICAgdGhpcy5uZXh0QWN0ID0gdW5kZWZpbmVkO1xuICAgIG5leHRBY3Q/LigpO1xuICB9XG5cbiAgc2tpcCgpIHtcbiAgICBpZiAoIXRoaXMuZW5zdXJlUnVubmluZygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5leHQgPSB0aGlzLm5leHQ7XG4gICAgaWYgKCFuZXh0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGluZm8gPSBhY3QuZ2V0QWN0aW9uU3RlcEluZm8obmV4dC50eXBlKTtcbiAgICB0aGlzLmxvZy5za2lwKGluZm8uZGVzY3JpcHRpb24obmV4dCkpO1xuICAgIHRoaXMubmV4dEFjdCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnN0YXJ0TmV4dCgpO1xuICB9XG5cbiAgY2FuY2VsKCkge1xuICAgIGlmICghdGhpcy5lbnN1cmVSdW5uaW5nKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5sb2cuY2FuY2VsKHQoJ2FjdC5jYW5jZWxFeGVjdXRpb24nKSk7XG4gICAgdGhpcy5zdG9wKCk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMubmV4dCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm5leHRBY3QgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5vcHRpb25zLm9uRW5kKCk7XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0TmV4dCgpIHtcbiAgICBpZiAodGhpcy5zdGVwcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMubG9nLnN1Y2Nlc3ModCgnYWN0LmV4ZWN1dGlvbkNvbXBsZXRlZCcpKTtcbiAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBuZXh0ID0gdGhpcy5zdGVwcy5zaGlmdCgpITtcbiAgICB0aGlzLm5leHQgPSBuZXh0O1xuICAgIGNvbnN0IGluZm8gPSBhY3QuZ2V0QWN0aW9uU3RlcEluZm8obmV4dC50eXBlKTtcbiAgICBsZXQgZGVzY3JpcHRpb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBjb25zdCBsb2cgPSB0aGlzLm9wdGlvbnMubG9nO1xuICAgIGluZm9cbiAgICAgIC5leGVjdXRlKHtcbiAgICAgICAgZGF0YTogbmV4dCxcbiAgICAgICAgbG9nLFxuICAgICAgICBzZXRTdGF0dXM6IHN0YXR1cyA9PiB0aGlzLm9wdGlvbnMub25TdGF0dXNDaGFuZ2VkKHN0YXR1cyksXG4gICAgICAgIHdhaXRBY3Q6IGFzeW5jIHN0YXR1cyA9PiB7XG4gICAgICAgICAgc3RhdHVzID8/PSBkZXNjcmlwdGlvbiA/PyBpbmZvLmRlc2NyaXB0aW9uKG5leHQpO1xuICAgICAgICAgIGF3YWl0IHRoaXMud2FpdEFjdChzdGF0dXMpO1xuICAgICAgICB9LFxuICAgICAgICB3YWl0QWN0aW9uRmVlZGJhY2s6IGFzeW5jIHRpbGUgPT4ge1xuICAgICAgICAgIHRoaXMub3B0aW9ucy5vblN0YXR1c0NoYW5nZWQoJ1dhaXRpbmcgZm9yIGFjdGlvbiBmZWVkYmFjay4uLicpO1xuICAgICAgICAgIGNvbnN0IGVycm9yID0gYXdhaXQgd2FpdEFjdGlvbkZlZWRiYWNrKHRpbGUpO1xuICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgbG9nLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIGxvZy5lcnJvcihkZXNjcmlwdGlvbiA/PyBpbmZvLmRlc2NyaXB0aW9uKG5leHQpKTtcbiAgICAgICAgICAgIGxvZy5lcnJvcignQWN0aW9uIFBhY2thZ2UgZXhlY3V0aW9uIGZhaWxlZCcpO1xuICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjYWNoZURlc2NyaXB0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgZGVzY3JpcHRpb24gPSBpbmZvLmRlc2NyaXB0aW9uKG5leHQpO1xuICAgICAgICAgIHRoaXMub3B0aW9ucy5vblN0YXR1c0NoYW5nZWQoZGVzY3JpcHRpb24sIHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICBjb21wbGV0ZTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIC8vIFdhaXQgYSBtb21lbnQgdG8gYWxsb3cgZGF0YSB0byB1cGRhdGUuXG4gICAgICAgICAgYXdhaXQgc2xlZXAoMCk7XG4gICAgICAgICAgbG9nLnN1Y2Nlc3MoZGVzY3JpcHRpb24gPz8gaW5mby5kZXNjcmlwdGlvbihuZXh0KSk7XG4gICAgICAgICAgdGhpcy5zdGFydE5leHQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2tpcDogKCkgPT4gdGhpcy5za2lwKCksXG4gICAgICAgIGZhaWw6IG1lc3NhZ2UgPT4ge1xuICAgICAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgICBsb2cuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxvZy5lcnJvcignQWN0aW9uIFBhY2thZ2UgZXhlY3V0aW9uIGZhaWxlZCcpO1xuICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSxcbiAgICAgICAgYXNzZXJ0OiAoY29uZGl0aW9uLCBtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgICAgICAgIGxvZy5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IEFzc2VydGlvbkVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVxdWVzdFRpbGU6IGFzeW5jIGNvbW1hbmQgPT4gYXdhaXQgdGhpcy5yZXF1ZXN0VGlsZShjb21tYW5kKSxcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgIGlmIChlICE9PSBBc3NlcnRpb25FcnJvcikge1xuICAgICAgICAgIGxvZy5ydW50aW1lRXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcmVxdWVzdFRpbGUoY29tbWFuZDogc3RyaW5nKSB7XG4gICAgbGV0IHRpbGUgPSB0aWxlcy5maW5kKGNvbW1hbmQsIHRydWUpWzBdO1xuICAgIGlmICh0aWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aWxlO1xuICAgIH1cbiAgICBhd2FpdCB0aGlzLndhaXRBY3QoYE9wZW4gJHtjb21tYW5kfWApO1xuICAgIHRoaXMub3B0aW9ucy5vblN0YXR1c0NoYW5nZWQoYE9wZW5pbmcgJHtjb21tYW5kfS4uLmApO1xuICAgIHRpbGUgPSBhd2FpdCB0aGlzLm9wdGlvbnMudGlsZUFsbG9jYXRvci5yZXF1ZXN0VGlsZShjb21tYW5kKTtcbiAgICBpZiAodGlsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmxvZy5lcnJvcihgRmFpbGVkIHRvIG9wZW4gJHtjb21tYW5kfWApO1xuICAgICAgdGhpcy5zdG9wKCk7XG4gICAgfVxuICAgIHJldHVybiB0aWxlO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyB3YWl0QWN0KHN0YXR1czogc3RyaW5nKSB7XG4gICAgdGhpcy5vcHRpb25zLm9uU3RhdHVzQ2hhbmdlZChzdGF0dXMpO1xuICAgIHRoaXMub3B0aW9ucy5vbkFjdFJlYWR5KCk7XG4gICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiAodGhpcy5uZXh0QWN0ID0gcmVzb2x2ZSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBlbnN1cmVSdW5uaW5nKCkge1xuICAgIGlmICghdGhpcy5pc1J1bm5pbmcpIHtcbiAgICAgIHRoaXMubG9nLmVycm9yKCdBY3Rpb24gUGFja2FnZSBpcyBub3QgcnVubmluZycpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pc1J1bm5pbmc7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gd2FpdEFjdGlvbkZlZWRiYWNrKHRpbGU6IFBydW5UaWxlKSB7XG4gIGNvbnN0IG92ZXJsYXkgPSBhd2FpdCAkKHRpbGUuZnJhbWUsIEMuQWN0aW9uRmVlZGJhY2sub3ZlcmxheSk7XG4gIGF3YWl0IHdhaXRBY3Rpb25Qcm9ncmVzcyhvdmVybGF5KTtcbiAgaWYgKG92ZXJsYXkuY2xhc3NMaXN0LmNvbnRhaW5zKEMuQWN0aW9uQ29uZmlybWF0aW9uT3ZlcmxheS5jb250YWluZXIpKSB7XG4gICAgY29uc3QgY29uZmlybSA9IF8kJChvdmVybGF5LCBDLkJ1dHRvbi5idG4pWzFdO1xuICAgIGlmIChjb25maXJtID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAnQ29uZmlybWF0aW9uIG92ZXJsYXkgaXMgbWlzc2luZyBjb25maXJtIGJ1dHRvbic7XG4gICAgfVxuICAgIGF3YWl0IGNsaWNrRWxlbWVudChjb25maXJtKTtcbiAgICBhd2FpdCB3YWl0QWN0aW9uUHJvZ3Jlc3Mob3ZlcmxheSk7XG4gIH1cbiAgaWYgKG92ZXJsYXkuY2xhc3NMaXN0LmNvbnRhaW5zKEMuQWN0aW9uRmVlZGJhY2suc3VjY2VzcykpIHtcbiAgICBhd2FpdCBjbGlja0VsZW1lbnQob3ZlcmxheSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChvdmVybGF5LmNsYXNzTGlzdC5jb250YWlucyhDLkFjdGlvbkZlZWRiYWNrLmVycm9yKSkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBfJChvdmVybGF5LCBDLkFjdGlvbkZlZWRiYWNrLm1lc3NhZ2UpPy50ZXh0Q29udGVudDtcbiAgICBjb25zdCBkaXNtaXNzID0gXyQob3ZlcmxheSwgQy5BY3Rpb25GZWVkYmFjay5kaXNtaXNzKT8udGV4dENvbnRlbnQ7XG4gICAgcmV0dXJuIGRpc21pc3MgPyBtZXNzYWdlPy5yZXBsYWNlKGRpc21pc3MsICcnKSA6IG1lc3NhZ2U7XG4gIH1cblxuICByZXR1cm4gJ1Vua25vd24gYWN0aW9uIGZlZWRiYWNrIG92ZXJsYXknO1xufVxuXG5hc3luYyBmdW5jdGlvbiB3YWl0QWN0aW9uUHJvZ3Jlc3Mob3ZlcmxheTogSFRNTEVsZW1lbnQpIHtcbiAgaWYgKCFvdmVybGF5LmNsYXNzTGlzdC5jb250YWlucyhDLkFjdGlvbkZlZWRiYWNrLnByb2dyZXNzKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHtcbiAgICBjb25zdCBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgaWYgKCFvdmVybGF5LmNsYXNzTGlzdC5jb250YWlucyhDLkFjdGlvbkZlZWRiYWNrLnByb2dyZXNzKSkge1xuICAgICAgICBtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShvdmVybGF5LCB7IGF0dHJpYnV0ZXM6IHRydWUgfSk7XG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFtQkEsTUFBQSxpQkFBQSxJQUFBLE1BQUEsa0JBQUE7QUFFTyxNQUFBLFlBQUE7QUFBQSxFQUFrQixZQUFBLE9BQUEsU0FBQTtBQUtiLFNBQUEsUUFB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
