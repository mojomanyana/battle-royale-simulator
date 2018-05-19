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
  }

  getBaseHealth = () => (this.baseHealth);

  getRecharge = () => (this.recharge);
}
