import Unit from './base/unit';

export default class Soldier extends Unit {
  constructor(_health, _recharge, _experience) {
    super(_health, _recharge);

    if (_experience < 0 || _experience > 50) {
      throw new TypeError('A soldier expiriance must be 0 - 50');
    }

    this.experience = _experience;
    console.log(`\x1b[36m*** Soldier unit created { h:${this.getHealth()}, r:${this.getRecharge()}, exp:${this.getExperience()} } ***\x1b[39m`);
  }

  getExperience = () => (this.experience);

  getNewtAttackSuccessProbability = () => {
    const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const prob =
      0.5 * (1 + this.getHealth() / 100)
      * rnd(30 + this.getExperience(), 100) / 100;
    console.log(`\x1b[36m*** Soldier next attack success probability is ${prob} ***\x1b[39m`);
    return prob;
  }

  getNextAttackDamage = () => {
    const dmg = 0.05 + this.getExperience() / 100;
    console.log(`\x1b[36m*** Soldier next attack damage is ${dmg} ***\x1b[39m`);
    return dmg;
  }
}
