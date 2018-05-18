export default class BaseUnit {
  constructor(_health, _recharge) {
    if (new.target === BaseUnit) {
      throw new TypeError('Cannot construct BaseUnit instances directly');
    }

    this.health = _health;
    this.recharge = _recharge;
  }

  getHealth = () => (this.health);

  getRecharge = () => (this.recharge);
}
