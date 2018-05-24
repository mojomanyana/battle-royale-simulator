import winston from 'winston';

// const logFormat = winston.format.printf(info => (`${info.message}`));
const logger = winston.createLogger({
  format: winston.format.simple(), // logFormat,
  transports: [
    new winston.transports.Console({ level: 'debug' }),
    new winston.transports.File({ filename: 'combined.log', level: 'debug' }),
  ],
});

const RANDOM = 'random';
const STRONGEST = 'strongest';
const WEAKEST = 'weakest';
const ERR_ABSTRACT_INSTANCE = 'Cannot construct Abstract Class instances directly';
const ERR_NOT_IMPLEMENTED = 'Method not implemented';
const ERR_HEALTH_RANGE = 'A unit health must be 0 - 100';
const ERR_RECHARGE_RANGE = 'A unit recharge must be 100 - 2000';
const ERR_EXPIRIANCE_RANGE = 'A soldier expiriance must be 0 - 50';
const ERR_INVALID_STRATEGY = 'A strategy must be string type of value: "random", "weakest" or "strongest"';
const ERR_SQUADS_REQUIRED = 'Squads are reuqired for army';
const ERR_SQUADS_LENGTH = 'Number of squads should be more than 1 squad for every army';
const ERR_NOT_SQUAD = 'A unit must be type of Squad';
const ERR_NOT_UNIT = 'A unit must be type of Unit';
const ERR_STRATEGY_REQUIRED = 'Strategy is reuqired for squad';
const ERR_UNITS_REQUIRED = 'Units are reuqired for squad';
const ERR_UNITS_LENGTH = 'Number of units per squad must be more than or equal to 5 and less then or equal to 10';
const ERR_OPERATOR_REQUIRED = 'At least 1 opperator is required';
const ERR_NOT_SOLDIER = 'A operator unit must be type of Soldier';
const ERR_RECHARGEVEHICLE_RANGE = 'A vehicle recharge must be greater than 1000';

export default class Utils {
  static log = (message, level = 'debug') => {
    if (!process.env.DISABLELOGS) {
      // logger.log({ level, message });
      console.log(message);
    }
  }

  static getLoggingStream = () => (logger.stream);

  static rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  static get ERR_NOT_UNIT() {
    return ERR_NOT_UNIT;
  }

  static get ERR_EXPIRIANCE_RANGE() {
    return ERR_EXPIRIANCE_RANGE;
  }

  static get ERR_OPERATOR_REQUIRED() {
    return ERR_OPERATOR_REQUIRED;
  }

  static get ERR_NOT_SOLDIER() {
    return ERR_NOT_SOLDIER;
  }

  static get ERR_RECHARGEVEHICLE_RANGE() {
    return ERR_RECHARGEVEHICLE_RANGE;
  }

  static get ERR_STRATEGY_REQUIRED() {
    return ERR_STRATEGY_REQUIRED;
  }

  static get ERR_UNITS_REQUIRED() {
    return ERR_UNITS_REQUIRED;
  }

  static get ERR_UNITS_LENGTH() {
    return ERR_UNITS_LENGTH;
  }

  static get ERR_SQUADS_LENGTH() {
    return ERR_SQUADS_LENGTH;
  }

  static get ERR_NOT_SQUAD() {
    return ERR_NOT_SQUAD;
  }

  static get ERR_SQUADS_REQUIRED() {
    return ERR_SQUADS_REQUIRED;
  }

  static get WEAKEST() {
    return WEAKEST;
  }

  static get RANDOM() {
    return RANDOM;
  }

  static get STRONGEST() {
    return STRONGEST;
  }

  static get ERR_ABSTRACT_INSTANCE() {
    return ERR_ABSTRACT_INSTANCE;
  }

  static get ERR_NOT_IMPLEMENTED() {
    return ERR_NOT_IMPLEMENTED;
  }

  static get ERR_HEALTH_RANGE() {
    return ERR_HEALTH_RANGE;
  }

  static get ERR_RECHARGE_RANGE() {
    return ERR_RECHARGE_RANGE;
  }

  static get ERR_INVALID_STRATEGY() {
    return ERR_INVALID_STRATEGY;
  }
}
