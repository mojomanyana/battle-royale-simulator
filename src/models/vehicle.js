import assert from 'assert';
import gmean from 'compute-gmean';
import Unit from './base/unit';
import Soldier from './soldier';
import Utils from './helpers/utils';

export default class Vehicles extends Unit {
  constructor(_health, _recharge, _operator1, _operator2 = null, _operator3 = null) {
    super(_health, _recharge);

    assert(_operator1, 'At least 1 opperator is required');
    if (!(_operator1 instanceof Soldier)) {
      throw new TypeError('A operator 1 unit must be type of Soldier');
    }
    if (_recharge < 1000) {
      throw new TypeError('A vehicle recharge must be greater than 1000');
    }

    this.operators = [];
    this.operators.push(_operator1);
    if (_operator2) {
      if (!(_operator2 instanceof Soldier)) {
        throw new TypeError('A operator 2 unit must be type of Soldier');
      }
      this.operators.push(_operator2);
    }
    if (_operator3) {
      if (!(_operator3 instanceof Soldier)) {
        throw new TypeError('A operator 3 unit must be type of Soldier');
      }
      this.operators.push(_operator3);
    }
  }

  getHealth = () => {
    if (this.baseHealth > 0 && this.baseHealth <= 100) {
      return this.baseHealth;
    }
    return 0;
  }

  getExperience = () => {
    const activeOperators = this.operators.filter(x => x.isActive());
    const expiriances = activeOperators.map(x => x.getExperience());
    return expiriances.reduce((a, b) => a + b, 0);
  }

  getTotalHealth = () => {
    let baseVehicleHealth = 0;
    if (this.baseHealth > 0 && this.baseHealth <= 100) {
      baseVehicleHealth = this.baseHealth;
    }
    const healths = this.operators.map(operator => operator.getHealth());
    const sum = baseVehicleHealth + healths.reduce((a, b) => a + b, 0);
    const hlt = sum / (healths.length + 1);
    if (hlt > 0 && hlt <= Infinity) {
      return hlt;
    }
    return 0;
  }

  getNewtAttackSuccessProbability = () => {
    if (this.isActive()) {
      const activeOperators = this.operators.filter(x => x.isActive());
      const opAttacks = activeOperators.map(operator => operator.getNewtAttackSuccessProbability());
      const prob =
        0.5 * (1 + this.getTotalHealth() / 100)
        * gmean(opAttacks);
      // Utils.log(`${this.name} next attack success probability is ${prob}`);
      return prob;
    }
    return 0;
  }

  getNextAttackDamage = () => {
    if (this.isActive()) {
      const activeOperators = this.operators.filter(x => x.isActive());
      const opExperiances = activeOperators.map(operator => operator.getExperience() / 100);
      const dmg = 0.1 + opExperiances.reduce((a, b) => (a + b));
      // Utils.log(`${this.name}) next attack damage is ${dmg}`);
      return dmg;
    }
    return 0;
  }

  recieveDamage = (dmg) => {
    if (this.isActive()) {
      const activeOperators = this.operators.filter(x => x.isActive());
      this.baseHealth -= 0.3 * dmg;
      const i = Utils.rnd(1, activeOperators.length);
      activeOperators[i - 1].recieveDamage(0.5 * dmg);

      if (activeOperators.length === 1) {
        this.baseHealth -= 0.2 * dmg;
      } else if (activeOperators.length === 2) {
        activeOperators[((i - 1) === 0) ? 1 : 0].recieveDamage(0.2 * dmg);
      } else if (activeOperators.length === 3) {
        activeOperators.forEach((operator, j) => {
          if ((i - 1) !== j) {
            activeOperators[j].recieveDamage(0.1 * dmg);
          }
        });
      }

      Utils.log(`${this.name} recieved damage ${dmg}!`);
      if (!this.isActive()) {
        this.destroyUnit();
        return true;
      }
    }
    return false;
  };

  destroyUnit = () => {
    this.baseHealth = 0;
    Utils.log(`${this.name} destroyd!`);
    this.operators.forEach(operator => operator.destroyUnit());
  }

  isActive = () => {
    const activeOperators = this.operators.filter(x => x.isActive());
    return this.getHealth() > 0 && activeOperators.length > 0;
  }

  get name() {
    if (this.isActive()) {
      return `Vehicle(${this.randomName}) \x1b[39m{ h:${this.getHealth()}, th:${this.getTotalHealth()}, r:${this.getRecharge()} }`;
    }
    return `\x1b[31m\x1b[4mVehicle(${this.randomName})\x1b[0m\x1b[39m { h:${this.getHealth()}, th:${this.getTotalHealth()}, r:${this.getRecharge()} }`;
  }

  toString = (pref = '\n\x1b[34m--') => (`${pref}${this.name} ${this.operators.map(operator => (operator.toString(`${pref}-`)))}`);
}
