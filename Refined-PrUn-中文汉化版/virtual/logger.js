class Logger {
  constructor(logMessage) {
    this.logMessage = logMessage;
  }
  label(msg) {
    this.logMessage(null, msg);
  }
  info(msg) {
    this.logMessage('INFO', msg);
  }
  action(msg) {
    this.logMessage('ACTION', msg);
  }
  success(msg) {
    this.logMessage('SUCCESS', msg);
  }
  error(msg) {
    this.logMessage('ERROR', msg);
  }
  skip(msg) {
    this.logMessage('SKIP', msg);
  }
  warning(msg) {
    this.logMessage('WARNING', msg);
  }
  cancel(msg) {
    this.logMessage('CANCEL', msg);
  }
  runtimeError(e) {
    console.error(e);
    if (e instanceof Error) {
      if (e.stack) {
        for (const line of e.stack.split('\n')) {
          this.error(line);
        }
      } else {
        this.error(e.message);
      }
    } else {
      this.error(e);
    }
    this.error(`Action Package execution failed due to a runtime error`);
    this.error(`Please report this error to the extension developer`);
  }
}
export { Logger };
