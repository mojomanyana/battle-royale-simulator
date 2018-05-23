import assert from 'assert';
import gmean from 'compute-gmean';
import randomWord from 'random-word';
import Unit from './base/unit';
import StrategyFactory from './strategy/strategyFactory';
import Utils from '../../helpers/utils';

export default class Squad {
  constructor(_strategy, ..._units) {
    assert(_strategy, 'strategy is reuqired for squad');
    assert(_units, 'units are reuqired for squad');
    assert(_units.length >= 5, 'number of units per squad must be more than or equal to 5');
    assert(_units.length <= 10, 'number of units per squad must be less than or equal to 10');

    this.units = [];
    _units.forEach((unit) => {
      if (unit instanceof Unit) {
        this.units.push(unit);
      } else {
        throw new TypeError('A unit must be type of Unit');
      }
    });

    const factory = new StrategyFactory();
    this.strategy = factory.createStrategy(_strategy);
    this.randomName = randomWord();
  }

  getNewtAttackSuccessProbability = () => {
    if (this.isActive()) {
      const activeUnits = this.units.filter(unit => unit.isActive());
      const opAttacks = activeUnits.map(unit => unit.getNewtAttackSuccessProbability());
      const prob = gmean(opAttacks);
      // Utils.log(`${this.name} next attack success probability is ${prob}`, 'debug');
      return prob;
    }
    return 0;
  }

  getNextAttackDamage = () => {
    if (this.isActive()) {
      const activeUnits = this.units.filter(unit => unit.isActive());
      const opDmg = activeUnits.map(unit => unit.getNextAttackDamage());
      const dmg = opDmg.reduce((a, b) => (a + b));
      // Utils.log(`${this.name} next attack damage is ${dmg}`, 'debug');
      return dmg;
    }
    return 0;
  }

  recieveDamage = (dmg) => {
    const activeUnits = this.units.filter(unit => unit.isActive());
    const numberOfUnits = activeUnits.length;
    activeUnits.forEach((unit) => {
      unit.recieveDamage(dmg / numberOfUnits);
    });
  }

  attack = (army) => {
    const defSquad = this.strategy.getSquadToAttackFromArmy(army);
    if (this.isActive() && defSquad != null && defSquad.isActive()) {
      Utils.log(`${this.name} is attacking ${defSquad.name}`, 'debug');
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

  isActive = () => (this.units.filter(unit => unit.isActive()).length > 0);

  getHealth = () => {
    const healts = this.units.map(x => x.getHealth());
    const healtsSum = healts.reduce((a, b) => a + b, 0);
    return healtsSum;
  }

  getExpiriance = () => {
    const expiriances = this.units.map(x => x.getExperience());
    const hexpiriancesSum = expiriances.reduce((a, b) => a + b, 0);
    return hexpiriancesSum;
  }

  getUnitsNumber = () => (this.units.filter(x => x.isActive()).length);

  get name() {
    return `Squad(${this.randomName}) { units:${this.getUnitsNumber()} }`;
  }

  toString = (pref = '') => (`${pref}${this.name}${this.units.map(operator => (operator.toString('\n--')))}`);
}
