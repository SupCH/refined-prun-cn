import './config.js';
import { act } from './act-registry.js';
import { deepToRaw } from './deep-to-raw.js';
import { TileAllocator } from './tile-allocator.js';
import { StepMachine } from './step-machine.js';
import { StepGenerator } from './step-generator.js';
import { t } from './index5.js';
class ActionRunner {
  // Track auto-execute mode
  constructor(options) {
    this.options = options;
    this.tileAllocator = new TileAllocator(options);
    this.stepGenerator = new StepGenerator(options);
  }
  tileAllocator;
  stepGenerator;
  stepMachine;
  autoMode = false;
  get log() {
    return this.options.log;
  }
  get isRunning() {
    return this.stepMachine?.isRunning ?? false;
  }
  get isAutoMode() {
    return this.autoMode;
  }
  async preview(pkg, config) {
    if (this.isRunning) {
      this.log.error('Action Package is already running');
      return;
    }
    const copy = structuredClone(deepToRaw(pkg));
    const { steps, fail } = await this.stepGenerator.generateSteps(copy, config);
    if (steps.length === 0) {
      return;
    }
    if (fail) {
      this.log.info('Generated steps for valid actions:');
    }
    for (const step of steps) {
      const stepInfo = act.getActionStepInfo(step.type);
      this.log.action(stepInfo.description(step));
    }
  }
  async execute(pkg, config, auto = false) {
    if (this.isRunning) {
      this.log.error('Action Package is already running');
      return;
    }
    const copy = structuredClone(deepToRaw(pkg));
    const { steps, fail } = await this.stepGenerator.generateSteps(copy, config);
    if (fail) {
      this.log.error('Action Package execution failed');
      return;
    }
    this.autoMode = auto;
    this.log.info(auto ? t('act.autoExecutionStarted') : t('act.executionStarted'));
    this.stepMachine = new StepMachine(steps, {
      ...this.options,
      tileAllocator: this.tileAllocator,
      // Override onActReady to support auto-execution
      onActReady: () => {
        this.options.onActReady();
        if (this.autoMode && this.stepMachine?.isRunning) {
          setTimeout(() => {
            if (this.autoMode && this.stepMachine?.isRunning) {
              this.act();
            }
          }, 500);
        }
      },
    });
    this.stepMachine.start();
  }
  act() {
    this.stepMachine?.act();
    if (!this.stepMachine?.isRunning) {
      this.stepMachine = void 0;
      this.autoMode = false;
    }
  }
  skip() {
    this.stepMachine?.skip();
    if (!this.stepMachine?.isRunning) {
      this.stepMachine = void 0;
      this.autoMode = false;
    }
  }
  cancel() {
    this.stepMachine?.cancel();
    this.stepMachine = void 0;
    this.autoMode = false;
  }
  stopAuto() {
    this.autoMode = false;
    this.options.log.info('Auto-execution stopped, switched to manual mode');
  }
}
export { ActionRunner };
