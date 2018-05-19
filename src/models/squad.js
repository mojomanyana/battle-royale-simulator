import assert from 'assert';
import gmean from 'compute-gmean';
import Unit from './base/unit';

export default class Squad {
  constructor(..._units) {
    assert(_units);
    assert(_units.length > 0);

    this.units = [];
    _units.forEach((unit) => {
      if (unit instanceof Unit) {
        this.units.push(unit);
      } else {
        throw new TypeError('A unit must be type of Unit');
      }
    });

    console.log(`\x1b[34m***Squad unit created { nou:${this.units.length} }***\x1b[39m`);
  }

  getNewtAttackSuccessProbability = () => {
    const opAttacks = this.units.map(unit => unit.getNewtAttackSuccessProbability());
    const prob = gmean(opAttacks);
    console.log(`Squad next attack success probability is ${prob}`);
    return prob;
  }

  getNextAttackDamage = () => {
    const opDmg = this.units.map(unit => unit.getNextAttackDamage());
    const dmg = opDmg.reduce((a, b) => (a + b));
    console.log(`Squad next attack damage is ${dmg}`);
    return dmg;
  }
}
