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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLXJ1bm5lci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvcnVubmVyL2FjdGlvbi1ydW5uZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYWN0IH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL2FjdC1yZWdpc3RyeSc7XG5pbXBvcnQgeyBkZWVwVG9SYXcgfSBmcm9tICdAc3JjL3V0aWxzL2RlZXAtdG8tcmF3JztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9ydW5uZXIvbG9nZ2VyJztcbmltcG9ydCB7IFRpbGVBbGxvY2F0b3IgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvcnVubmVyL3RpbGUtYWxsb2NhdG9yJztcbmltcG9ydCB7IFN0ZXBNYWNoaW5lIH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL3J1bm5lci9zdGVwLW1hY2hpbmUnO1xuaW1wb3J0IHsgU3RlcEdlbmVyYXRvciB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9ydW5uZXIvc3RlcC1nZW5lcmF0b3InO1xuaW1wb3J0IHsgQWN0aW9uUGFja2FnZUNvbmZpZyB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9zaGFyZWQtdHlwZXMnO1xuaW1wb3J0IHsgdCB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvaTE4bic7XG5cbmludGVyZmFjZSBBY3Rpb25SdW5uZXJPcHRpb25zIHtcbiAgdGlsZTogUHJ1blRpbGU7XG4gIGxvZzogTG9nZ2VyO1xuICBvbkJ1ZmZlclNwbGl0OiAoKSA9PiB2b2lkO1xuICBvblN0YXJ0OiAoKSA9PiB2b2lkO1xuICBvbkVuZDogKCkgPT4gdm9pZDtcbiAgb25TdGF0dXNDaGFuZ2VkOiAoc3RhdHVzOiBzdHJpbmcsIGtlZXBSZWFkeT86IGJvb2xlYW4pID0+IHZvaWQ7XG4gIG9uQWN0UmVhZHk6ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25SdW5uZXIge1xuICBwcml2YXRlIHJlYWRvbmx5IHRpbGVBbGxvY2F0b3I6IFRpbGVBbGxvY2F0b3I7XG4gIHByaXZhdGUgcmVhZG9ubHkgc3RlcEdlbmVyYXRvcjogU3RlcEdlbmVyYXRvcjtcbiAgcHJpdmF0ZSBzdGVwTWFjaGluZT86IFN0ZXBNYWNoaW5lO1xuICBwcml2YXRlIGF1dG9Nb2RlID0gZmFsc2U7IC8vIFRyYWNrIGF1dG8tZXhlY3V0ZSBtb2RlXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvcHRpb25zOiBBY3Rpb25SdW5uZXJPcHRpb25zKSB7XG4gICAgdGhpcy50aWxlQWxsb2NhdG9yID0gbmV3IFRpbGVBbGxvY2F0b3Iob3B0aW9ucyk7XG4gICAgdGhpcy5zdGVwR2VuZXJhdG9yID0gbmV3IFN0ZXBHZW5lcmF0b3Iob3B0aW9ucyk7XG4gIH1cblxuICBnZXQgbG9nKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMubG9nO1xuICB9XG5cbiAgZ2V0IGlzUnVubmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5zdGVwTWFjaGluZT8uaXNSdW5uaW5nID8/IGZhbHNlO1xuICB9XG5cbiAgZ2V0IGlzQXV0b01vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXV0b01vZGU7XG4gIH1cblxuICBhc3luYyBwcmV2aWV3KHBrZzogVXNlckRhdGEuQWN0aW9uUGFja2FnZURhdGEsIGNvbmZpZzogQWN0aW9uUGFja2FnZUNvbmZpZykge1xuICAgIGlmICh0aGlzLmlzUnVubmluZykge1xuICAgICAgdGhpcy5sb2cuZXJyb3IoJ0FjdGlvbiBQYWNrYWdlIGlzIGFscmVhZHkgcnVubmluZycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBDcmVhdGUgYSBjb3B5IHRvIHByZXZlbnQgY2hhbmdlcyBkdXJpbmcgZXhlY3V0aW9uLlxuICAgIGNvbnN0IGNvcHkgPSBzdHJ1Y3R1cmVkQ2xvbmUoZGVlcFRvUmF3KHBrZykpO1xuICAgIGNvbnN0IHsgc3RlcHMsIGZhaWwgfSA9IGF3YWl0IHRoaXMuc3RlcEdlbmVyYXRvci5nZW5lcmF0ZVN0ZXBzKGNvcHksIGNvbmZpZyk7XG4gICAgaWYgKHN0ZXBzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZmFpbCkge1xuICAgICAgdGhpcy5sb2cuaW5mbygnR2VuZXJhdGVkIHN0ZXBzIGZvciB2YWxpZCBhY3Rpb25zOicpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHN0ZXAgb2Ygc3RlcHMpIHtcbiAgICAgIGNvbnN0IHN0ZXBJbmZvID0gYWN0LmdldEFjdGlvblN0ZXBJbmZvKHN0ZXAudHlwZSk7XG4gICAgICB0aGlzLmxvZy5hY3Rpb24oc3RlcEluZm8uZGVzY3JpcHRpb24oc3RlcCkpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGV4ZWN1dGUocGtnOiBVc2VyRGF0YS5BY3Rpb25QYWNrYWdlRGF0YSwgY29uZmlnOiBBY3Rpb25QYWNrYWdlQ29uZmlnLCBhdXRvID0gZmFsc2UpIHtcbiAgICBpZiAodGhpcy5pc1J1bm5pbmcpIHtcbiAgICAgIHRoaXMubG9nLmVycm9yKCdBY3Rpb24gUGFja2FnZSBpcyBhbHJlYWR5IHJ1bm5pbmcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gQ3JlYXRlIGEgY29weSB0byBwcmV2ZW50IGNoYW5nZXMgZHVyaW5nIGV4ZWN1dGlvbi5cbiAgICBjb25zdCBjb3B5ID0gc3RydWN0dXJlZENsb25lKGRlZXBUb1Jhdyhwa2cpKTtcbiAgICBjb25zdCB7IHN0ZXBzLCBmYWlsIH0gPSBhd2FpdCB0aGlzLnN0ZXBHZW5lcmF0b3IuZ2VuZXJhdGVTdGVwcyhjb3B5LCBjb25maWcpO1xuICAgIGlmIChmYWlsKSB7XG4gICAgICB0aGlzLmxvZy5lcnJvcignQWN0aW9uIFBhY2thZ2UgZXhlY3V0aW9uIGZhaWxlZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYXV0b01vZGUgPSBhdXRvO1xuICAgIHRoaXMubG9nLmluZm8oYXV0byA/IHQoJ2FjdC5hdXRvRXhlY3V0aW9uU3RhcnRlZCcpIDogdCgnYWN0LmV4ZWN1dGlvblN0YXJ0ZWQnKSk7XG5cbiAgICB0aGlzLnN0ZXBNYWNoaW5lID0gbmV3IFN0ZXBNYWNoaW5lKHN0ZXBzLCB7XG4gICAgICAuLi50aGlzLm9wdGlvbnMsXG4gICAgICB0aWxlQWxsb2NhdG9yOiB0aGlzLnRpbGVBbGxvY2F0b3IsXG4gICAgICAvLyBPdmVycmlkZSBvbkFjdFJlYWR5IHRvIHN1cHBvcnQgYXV0by1leGVjdXRpb25cbiAgICAgIG9uQWN0UmVhZHk6ICgpID0+IHtcbiAgICAgICAgdGhpcy5vcHRpb25zLm9uQWN0UmVhZHkoKTtcbiAgICAgICAgLy8gQXV0b21hdGljYWxseSBjYWxsIGFjdCgpIGlmIGluIGF1dG8gbW9kZVxuICAgICAgICBpZiAodGhpcy5hdXRvTW9kZSAmJiB0aGlzLnN0ZXBNYWNoaW5lPy5pc1J1bm5pbmcpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9Nb2RlICYmIHRoaXMuc3RlcE1hY2hpbmU/LmlzUnVubmluZykge1xuICAgICAgICAgICAgICB0aGlzLmFjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIDUwMCk7IC8vIDUwMG1zIGRlbGF5IHRvIGxldCB1c2VyIHNlZSB0aGUgc3RlcFxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMuc3RlcE1hY2hpbmUuc3RhcnQoKTtcbiAgfVxuXG4gIGFjdCgpIHtcbiAgICB0aGlzLnN0ZXBNYWNoaW5lPy5hY3QoKTtcbiAgICBpZiAoIXRoaXMuc3RlcE1hY2hpbmU/LmlzUnVubmluZykge1xuICAgICAgdGhpcy5zdGVwTWFjaGluZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuYXV0b01vZGUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBza2lwKCkge1xuICAgIHRoaXMuc3RlcE1hY2hpbmU/LnNraXAoKTtcbiAgICBpZiAoIXRoaXMuc3RlcE1hY2hpbmU/LmlzUnVubmluZykge1xuICAgICAgdGhpcy5zdGVwTWFjaGluZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuYXV0b01vZGUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjYW5jZWwoKSB7XG4gICAgdGhpcy5zdGVwTWFjaGluZT8uY2FuY2VsKCk7XG4gICAgdGhpcy5zdGVwTWFjaGluZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmF1dG9Nb2RlID0gZmFsc2U7XG4gIH1cblxuICBzdG9wQXV0bygpIHtcbiAgICB0aGlzLmF1dG9Nb2RlID0gZmFsc2U7XG4gICAgdGhpcy5vcHRpb25zLmxvZy5pbmZvKCdBdXRvLWV4ZWN1dGlvbiBzdG9wcGVkLCBzd2l0Y2hlZCB0byBtYW51YWwgbW9kZScpO1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQW1CTyxNQUFBLGFBQUE7QUFBQTtBQUFBLEVBQW1CLFlBQUEsU0FBQTtBQU1KLFNBQUEsVUFBQTtBQUNsQixTQUFBLGdCQUFBLElBQUEsY0FBQSxPQUFBO0FBQ0EsU0FBQSxnQkFBQSxJQUFBLGNBQUEsT0FBQTtBQUFBLEVBQThDO0FBQUEsRUFDaEQ7QUFBQSxFQVJpQjtBQUFBLEVBQ0E7QUFBQSxFQUNULFdBQUE7QUFBQSxFQUNXLElBQUEsTUFBQTtBQVFqQixXQUFBLEtBQUEsUUFBQTtBQUFBLEVBQW9CO0FBQUEsRUFDdEIsSUFBQSxZQUFBO0FBR0UsV0FBQSxLQUFBLGFBQUEsYUFBQTtBQUFBLEVBQXNDO0FBQUEsRUFDeEMsSUFBQSxhQUFBO0FBR0UsV0FBQSxLQUFBO0FBQUEsRUFBWTtBQUFBLEVBQ2QsTUFBQSxRQUFBLEtBQUEsUUFBQTtBQUdFLFFBQUEsS0FBQSxXQUFBO0FBQ0UsV0FBQSxJQUFBLE1BQUEsbUNBQUE7QUFDQTtBQUFBLElBQUE7QUFHRixVQUFBLE9BQUEsZ0JBQUEsVUFBQSxHQUFBLENBQUE7QUFDQSxVQUFBLEVBQUEsT0FBQSxTQUFBLE1BQUEsS0FBQSxjQUFBLGNBQUEsTUFBQSxNQUFBO0FBQ0EsUUFBQSxNQUFBLFdBQUEsR0FBQTtBQUNFO0FBQUEsSUFBQTtBQUVGLFFBQUEsTUFBQTtBQUNFLFdBQUEsSUFBQSxLQUFBLG9DQUFBO0FBQUEsSUFBa0Q7QUFFcEQsZUFBQSxRQUFBLE9BQUE7QUFDRSxZQUFBLFdBQUEsSUFBQSxrQkFBQSxLQUFBLElBQUE7QUFDQSxXQUFBLElBQUEsT0FBQSxTQUFBLFlBQUEsSUFBQSxDQUFBO0FBQUEsSUFBMEM7QUFBQSxFQUM1QztBQUFBLEVBQ0YsTUFBQSxRQUFBLEtBQUEsUUFBQSxPQUFBLE9BQUE7QUFHRSxRQUFBLEtBQUEsV0FBQTtBQUNFLFdBQUEsSUFBQSxNQUFBLG1DQUFBO0FBQ0E7QUFBQSxJQUFBO0FBR0YsVUFBQSxPQUFBLGdCQUFBLFVBQUEsR0FBQSxDQUFBO0FBQ0EsVUFBQSxFQUFBLE9BQUEsU0FBQSxNQUFBLEtBQUEsY0FBQSxjQUFBLE1BQUEsTUFBQTtBQUNBLFFBQUEsTUFBQTtBQUNFLFdBQUEsSUFBQSxNQUFBLGlDQUFBO0FBQ0E7QUFBQSxJQUFBO0FBR0YsU0FBQSxXQUFBO0FBQ0EsU0FBQSxJQUFBLEtBQUEsT0FBQSxFQUFBLDBCQUFBLElBQUEsRUFBQSxzQkFBQSxDQUFBO0FBRUEsU0FBQSxjQUFBLElBQUEsWUFBQSxPQUFBO0FBQUEsTUFBMEMsR0FBQSxLQUFBO0FBQUEsTUFDaEMsZUFBQSxLQUFBO0FBQUE7QUFBQSxNQUNZLFlBQUEsTUFBQTtBQUdsQixhQUFBLFFBQUEsV0FBQTtBQUVBLFlBQUEsS0FBQSxZQUFBLEtBQUEsYUFBQSxXQUFBO0FBQ0UscUJBQUEsTUFBQTtBQUNFLGdCQUFBLEtBQUEsWUFBQSxLQUFBLGFBQUEsV0FBQTtBQUNFLG1CQUFBLElBQUE7QUFBQSxZQUFTO0FBQUEsVUFDWCxHQUFBLEdBQUE7QUFBQSxRQUNJO0FBQUEsTUFDUjtBQUFBLElBQ0YsQ0FBQTtBQUVGLFNBQUEsWUFBQSxNQUFBO0FBQUEsRUFBdUI7QUFBQSxFQUN6QixNQUFBO0FBR0UsU0FBQSxhQUFBLElBQUE7QUFDQSxRQUFBLENBQUEsS0FBQSxhQUFBLFdBQUE7QUFDRSxXQUFBLGNBQUE7QUFDQSxXQUFBLFdBQUE7QUFBQSxJQUFnQjtBQUFBLEVBQ2xCO0FBQUEsRUFDRixPQUFBO0FBR0UsU0FBQSxhQUFBLEtBQUE7QUFDQSxRQUFBLENBQUEsS0FBQSxhQUFBLFdBQUE7QUFDRSxXQUFBLGNBQUE7QUFDQSxXQUFBLFdBQUE7QUFBQSxJQUFnQjtBQUFBLEVBQ2xCO0FBQUEsRUFDRixTQUFBO0FBR0UsU0FBQSxhQUFBLE9BQUE7QUFDQSxTQUFBLGNBQUE7QUFDQSxTQUFBLFdBQUE7QUFBQSxFQUFnQjtBQUFBLEVBQ2xCLFdBQUE7QUFHRSxTQUFBLFdBQUE7QUFDQSxTQUFBLFFBQUEsSUFBQSxLQUFBLGlEQUFBO0FBQUEsRUFBdUU7QUFFM0U7In0=
