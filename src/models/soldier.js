import Unit from './base/unit';
import Logger from './helpers/utils';

const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default class Soldier extends Unit {
  constructor(_health, _recharge, _experience) {
    super(_health, _recharge);

    if (_experience < 0 || _experience > 50) {
      throw new TypeError('A soldier expiriance must be 0 - 50');
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
        * rnd(30 + this.getExperience(), 100) / 100;
      // Logger.log(`${this.name} next attack success probability is ${prob}`);
      return prob;
    }
    return 0;
  }

  getNextAttackDamage = () => {
    if (this.isActive()) {
      const dmg = 0.05 + this.getExperience() / 100;
      // Logger.log(`${this.name} next attack damage is ${dmg}`);
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
    Logger.log(`${this.name} destroyd!`);
  }

  recieveDamage = (dmg) => {
    this.baseHealth -= dmg;
    Logger.log(`${this.name} recieved damage ${dmg}!`);
    if (!this.isActive()) {
      this.destroyUnit();
      return true;
    }
    return false;
  };

  isActive = () => (this.getHealth() > 0);

  get name() {
    if (this.isActive()) {
      return `Soldier(${this.randomName})\x1b[39m { h:${this.getHealth()}, r:${this.getRecharge()}, exp:${this.getExperience()} }`;
    }
    return `\x1b[31m\x1b[4mSoldier(${this.randomName})\x1b[0m\x1b[39m { h:${this.getHealth()}, r:${this.getRecharge()}, exp:${this.getExperience()} }`;
  }

  toString = (pref = '\n\x1b[36m--') => (`${pref}${this.name}`);
}
