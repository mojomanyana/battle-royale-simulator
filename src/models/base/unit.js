import assert from 'assert';
import randomWord from 'random-word';

export default class Unit {
  constructor(_baseHealth, _recharge) {
    if (new.target === Unit) {
      throw new TypeError('Cannot construct Unit instances directly');
    }

    assert(_baseHealth);
    if (_baseHealth < 0 || _baseHealth > 100) {
      throw new TypeError('A unit health must be 0 - 100');
    }

    assert(_recharge);
    if (_recharge < 100 || _recharge > 2000) {
      throw new TypeError('A unit recharge must be 100 - 2000');
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

  destoryUnit = () => {}

  isActive = () => {};

  onSuccessfulAttack = () => {};
}
