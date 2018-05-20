import assert from 'assert';
import gmean from 'compute-gmean';
import Unit from './base/unit';
import Soldier from './soldier';

export default class Vehicles extends Unit {
  constructor(_health, _recharge, _operator1, _operator2 = null, _operator3 = null) {
    super(_health, _recharge);

    assert(_operator1);
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

  getNumberOfOperators = () => (this.operators.length);

  getHealth = () => {
    const healths = this.operators.map(operator => operator.getHealth());
    const sum = this.baseHealth + healths.reduce((a, b) => a + b, 0);
    return sum / this.operators.length + 1;
  }

  getNewtAttackSuccessProbability = () => {
    const opAttacks = this.operators.map(operator => operator.getNewtAttackSuccessProbability());
    const prob =
      0.5 * (1 + this.getHealth() / 100)
      * gmean(opAttacks);
    console.log(`\x1b[34m*** Vehicles(${this.name}) next attack success probability is ${prob} ***\x1b[39m`);
    return prob;
  }

  getNextAttackDamage = () => {
    const opExperiances = this.operators.map(operator => operator.getExperience() / 100);
    const dmg = 0.1 + opExperiances.reduce((a, b) => (a + b));
    console.log(`\x1b[34m*** Vehicles(${this.name}) next attack damage is ${dmg} ***\x1b[39m`);
    return dmg;
  }

  recieveDamage = (dmg) => {
    this.baseHealth -= 0.3 * dmg;
    const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const i = rnd(1, this.operators.length);
    this.operators[i - 1].recieveDamage(0.5 * dmg);

    if (this.operators.length === 1) {
      this.baseHealth -= 0.2 * dmg;
    } else if (this.operators.length === 2) {
      this.operators[((i - 1) === 0) ? 1 : 0].recieveDamage(0.2 * dmg);
    } else if (this.operators.length === 3) {
      this.operators.forEach((operator, j) => {
        if ((i - 1) !== j) {
          this.operators[j].recieveDamage(0.1 * dmg);
        }
      });
    }
  };

  destroyUnit = () => {
    this.operators.forEach(operator => operator.destoryUnit());
    super.destroyUnit();
  }

  toString = (pref = '\n\x1b[34m--') => (`${pref}Vehicle(${this.name}) { h:${this.getHealth()}, r:${this.getRecharge()} }${this.operators.map(operator => (operator.toString(`${pref}-`)))}\x1b[39m`);
}
