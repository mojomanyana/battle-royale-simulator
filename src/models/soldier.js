import Unit from './base/unit';
import Utils from '../../helpers/utils';

export default class Soldier extends Unit {
  constructor(_health, _recharge, _experience) {
    super(_health, _recharge);

    if (_experience < 0 || _experience > 50) {
      throw new TypeError(Utils.ERR_EXPIRIANCE_RANGE);
    }

    this.experience = _experience;
  }

  getHealth = () => {
    if (this.baseHealth > 0 && this.baseHealth <= 100) {
      return this.baseHealth;
    }
    return 0;
  }

  getExperience = () => (this.experience);

  getNewtAttackSuccessProbability = () => {
    if (this.isActive()) {
      const prob =
        0.5 * (1 + this.getHealth() / 100)
        * Utils.rnd(30 + this.getExperience(), 100) / 100;
      Utils.log(`${this.name} next attack success probability is ${prob}`);
      return prob;
    }
    return 0;
  }

  getNextAttackDamage = () => {
    if (this.isActive()) {
      const dmg = 0.05 + this.getExperience() / 100;
      Utils.log(`${this.name} next attack damage is ${dmg}`, 'debug');
      return dmg;
    }
    return 0;
  }

  onSuccessfulAttack = () => {
    if (this.isActive() && this.experience < 50) {
      this.experience++;
    }
  };

  destroyUnit = () => {
    this.baseHealth = 0;
    Utils.log(`Soldier(${this.randomName}) destroyd!`);
  }

  recieveDamage = (dmg) => {
    this.baseHealth -= dmg;
    Utils.log(`${this.name} recieved damage ${dmg}!`);
    if (!this.isActive()) {
      this.destroyUnit();
      return true;
    }
    return false;
  };

  isActive = () => (this.getHealth() > 0);

  get name() {
    return `Soldier(${this.randomName}) { h:${this.getHealth()}, r:${this.getRecharge()}, exp:${this.getExperience()} }`;
  }

  toString = (pref = '') => (`${pref}${this.name}`);
}
