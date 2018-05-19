import assert from 'assert';
import gmean from 'compute-gmean';
import Unit from './base/unit';

export default class Squad {
  constructor(_strategy, ..._units) {
    assert(_strategy);
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

    if (_strategy !== 'random' && _strategy !== 'weakest' && _strategy !== 'strongest') {
      throw new TypeError('A strategy must be string type of value: "random", "weakest" or "strongest"');
    }
    this.strategy = _strategy;

    console.log(`\x1b[35m*** Squad created { nou:${this.units.length} } ***\x1b[39m`);
  }

  getNewtAttackSuccessProbability = () => {
    const opAttacks = this.units.map(unit => unit.getNewtAttackSuccessProbability());
    const prob = gmean(opAttacks);
    console.log(`\x1b[35m*** Squad next attack success probability is ${prob} ***\x1b[39m`);
    return prob;
  }

  getNextAttackDamage = () => {
    const opDmg = this.units.map(unit => unit.getNextAttackDamage());
    const dmg = opDmg.reduce((a, b) => (a + b));
    console.log(`\x1b[35m*** Squad next attack damage is ${dmg} ***\x1b[39m`);
    return dmg;
  }

  recieveDamage = (dmg) => {
    const numberOfUnits = this.units.length;
    this.units.forEach((unit) => {
      unit.recieveDamage(dmg / numberOfUnits);
    });
  }
}
