import assert from 'assert';
import BaseUnit from './base/baseUnit';

export default class Soldier extends BaseUnit {
  constructor(_health, _recharge, _soldierExperience) {
    super(_health, _recharge);

    assert(_soldierExperience);
    if (_soldierExperience < 0 || _soldierExperience > 50) {
      throw new TypeError('A soldier expiriance must be 0 - 50');
    }

    this.soldierExperience = _soldierExperience;
    console.log(`\x1b[34m***Soldier unit created { h:${this.getHealth()}, r:${this.getRecharge()}, exp:${this.getExperience()} }***\x1b[39m`);
  }

  getHealth = () => (this.getBaseHealth());

  getExperience = () => (this.soldierExperience);

  getNewtAttackSuccessProbability = () => {
    const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const prob =
      0.5 * (1 + this.getHealth() / 100)
      * rnd(30 + this.getExperience(), 100) / 100;
    console.log(`Soldier next attack success probability is ${prob}`);
    return prob;
  }

  getNextAttackDamage = () => {
    const dmg = 0.05 + this.soldierExperience / 100;
    console.log(`Soldier next attack damage is ${dmg}`);
    return dmg;
  }

  destoryUnit = () => {
    this.baseHealth = 0;
  }
}
