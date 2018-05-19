import assert from 'assert';

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

    this.baseHealth = _baseHealth;
    this.recharge = _recharge;
    this.active = this.baseHealth > 0;
  }

  getHealth = () => (this.baseHealth);

  getRecharge = () => (this.recharge);

  getNewtAttackSuccessProbability = () => (0);

  getNextAttackDamage = () => (0);

  recieveDamage = (dmg) => {
    this.baseHealth -= dmg;
    if (this.baseHealth <= 0) {
      this.destoryUnit();
    }
  };

  destoryUnit = () => {
    this.baseHealth = 0;
    this.recharge = 0;
    this.active = false;
  }
}
