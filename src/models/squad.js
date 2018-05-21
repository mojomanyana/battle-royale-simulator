import assert from 'assert';
import gmean from 'compute-gmean';
import randomWord from 'random-word';
import Unit from './base/unit';

export default class Squad {
  constructor(_strategy, ..._units) {
    assert(_strategy);
    assert(_units);
    // assert(_units.length >= 5);
    // assert(_units.length <= 10);

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
    this.randomName = randomWord();
  }

  getNewtAttackSuccessProbability = () => {
    const activeUnits = this.units.filter(unit => unit.isActive());
    const opAttacks = activeUnits.map(unit => unit.getNewtAttackSuccessProbability());
    const prob = gmean(opAttacks);
    console.log(`\x1b[35m${this.name} next attack success probability is ${prob} ***\x1b[39m`);
    return prob;
  }

  getNextAttackDamage = () => {
    const activeUnits = this.units.filter(unit => unit.isActive());
    const opDmg = activeUnits.map(unit => unit.getNextAttackDamage());
    const dmg = opDmg.reduce((a, b) => (a + b));
    console.log(`\x1b[35m${this.name} next attack damage is ${dmg} ***\x1b[39m`);
    return dmg;
  }

  recieveDamage = (dmg) => {
    const activeUnits = this.units.filter(unit => unit.isActive());
    const numberOfUnits = activeUnits.length;
    activeUnits.forEach((unit) => {
      unit.recieveDamage(dmg / numberOfUnits);
    });
  }

  attack = (defSquad) => {
    if (!(defSquad instanceof Squad)) {
      throw new TypeError('A defending squad must be type of Squad');
    }

    if (this.isActive() && defSquad.isActive()) {
      console.log(`\x1b[35m${this.name} is attacking ${defSquad.name}\x1b[39m`);
      const probAtt = this.getNewtAttackSuccessProbability();
      const probDef = defSquad.getNewtAttackSuccessProbability();
      if (probAtt > probDef) {
        const dmg = this.getNextAttackDamage();
        defSquad.recieveDamage(dmg);
        this.units.forEach((unit) => {
          unit.onSuccessfulAttack();
        });
      }
    }
  }

  isActive = () => (this.units.map(unit => (unit.isActive())).some(ua => (ua === true)));

  get name() {
    if (this.isActive()) {
      return `Squad(${this.randomName}) \x1b[39m{ units:${this.units.filter(x => x.isActive()).length} }`;
    }
    return `\x1b[31m\x1b[4mSquad(${this.randomName})\x1b[0m\x1b[39m { units:${this.units.filter(x => x.isActive()).length} }\x1b[0m\x1b[39m`;
  }

  toString = (pref = '\n\x1b[35m-') => (`${pref}${this.name}${this.units.map(operator => (operator.toString()))}\x1b[39m`);
}
