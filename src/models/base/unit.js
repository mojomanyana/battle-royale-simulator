import randomWord from 'random-word';
import Utils from '../../../helpers/utils';

export default class Unit {
  constructor(_baseHealth, _recharge) {
    if (new.target === Unit) {
      throw new TypeError(Utils.ERR_ABSTRACT_INSTANCE);
    }

    if (_baseHealth < 0 || _baseHealth > 100) {
      throw new RangeError(Utils.ERR_HEALTH_RANGE);
    }

    if (_recharge < 100 || _recharge > 2000) {
      throw new RangeError(Utils.ERR_RECHARGE_RANGE);
    }

    this.randomName = randomWord();
    this.baseHealth = _baseHealth;
    this.recharge = _recharge;
  }

  get name() {
    if (this.isActive()) {
      return `\x1b[32m${this.randomName}\x1b[39m`;
    }
    return `\x1b[31m\x1b[4m${this.randomName}\x1b[0m\x1b[39m`;
  }

  getHealth = () => (this.baseHealth)

  toString = (pref = '\x1b[39m') => (`${pref}Unit`);

  getRecharge = () => (this.recharge);

  getNewtAttackSuccessProbability = () => (0);

  getNextAttackDamage = () => (0);

  recieveDamage = () => {};

  destroyUnit = () => {}

  isActive = () => {};

  onSuccessfulAttack = () => {};
}
