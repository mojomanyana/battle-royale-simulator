import assert from 'assert';
import gmean from 'compute-gmean';
import Unit from './base/unit';

export default class Vehicles extends Unit {
  constructor(_health, _recharge, _operator1, _operator2 = null, _operator3 = null) {
    super(_health, _recharge);

    assert(_operator1);
    if (_recharge < 1000) {
      throw new TypeError('A vehicle recharge must be greater than 1000');
    }

    this.operators = [];
    // TODO: check if _operator1,2,3 is instance of class Soldier
    this.operators.push(_operator1);
    if (_operator2) {
      this.operators.push(_operator2);
    }
    if (_operator3) {
      this.operators.push(_operator3);
    }
    console.log(`\x1b[34m***Vehicle unit created { h:${this.getHealth()}, r:${this.getRecharge()}, noo:${this.getNumberOfOperators()} }***\x1b[39m`);
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
    console.log(`Vehicles next attack success probability is ${prob}`);
    return prob;
  }

  getNextAttackDamage = () => {
    const opExperiances = this.operators.map(operator => operator.getExperience() / 100);
    const dmg = 0.1 + opExperiances.reduce((a, b) => (a + b));
    console.log(`Vehicles next attack damage is ${dmg}`);
    return dmg;
  }

  destroyUnit = () => {
    this.operators.forEach(operator => operator.destoryUnit());
    this.baseHealth = 0;
  }
}
