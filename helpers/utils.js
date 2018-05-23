import winston from 'winston';

// const logFormat = winston.format.printf(info => (`${info.message}`));

const logger = winston.createLogger({
  format: winston.format.simple(), // logFormat,
  transports: [
    new winston.transports.Console({ level: 'debug' }),
    new winston.transports.File({ filename: 'combined.log', level: 'debug' }),
  ],
});

export default class Utils {
  static log = (message, level = 'debug') => {
    if (!process.env.DISABLELOGS) {
      // logger.log({ level, message });
      console.log(message);
    }
  }

  static getLoggingStream = () => (logger.stream);

  static rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
}
