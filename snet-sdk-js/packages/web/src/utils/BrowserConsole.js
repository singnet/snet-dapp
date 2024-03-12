const Transport = require('winston-transport');

export default class BrowserConsole extends Transport {
  constructor(opts) {
    super(opts);

    this.methods = {
      debug: "debug",
      error: "error",
      info: "info",
      warn: "warn"
    };

    if (opts && opts.level && Level.hasOwnProperty(opts.level)) {
      this.level = opts.level;
    }
  }

  log(logEntry, next) {
    setImmediate(() => {
      this.emit("logged", logEntry);
    });

    const { message, level } = logEntry;
    const mappedMethod = this.methods[level];

    if (Object.getOwnPropertySymbols(logEntry).length === 2) {
      console[mappedMethod](message);
    } else {
      let args = logEntry[Object.getOwnPropertySymbols(logEntry)[1]];
      args = args.length >= 1 ? args[0] : args;
      if (args) {
        console[mappedMethod](message, args);
      } else {
        console[mappedMethod](message);
      }
    }

    next();
  }
}

const Level = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 4
};