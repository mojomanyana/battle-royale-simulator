import assert from 'assert';
import Soldier from '../src/models/soldier';
import Vehicle from '../src/models/vehicle';
import Squad from '../src/models/squad';

const soldier1 = new Soldier(20, 200, 3);
const soldier2 = new Soldier(30, 200, 6);
const soldier3 = new Soldier(40, 200, 1);
const soldier5 = new Soldier(40, 200, 1);
const soldier6 = new Soldier(40, 200, 1);
const vehicle1 = new Vehicle(40, 1500, soldier5);
const vehicle2 = new Vehicle(40, 1500, soldier6);

describe('Models - Squad', () => {
  it('should cast error for invalid strategy input', (done) => {
    try {
      const squad = new Squad('unknown', soldier1, soldier2, soldier3, vehicle1, vehicle2);
      squad.getHealth();
    } catch (error) {
      assert(error.message === 'A strategy must be string type of value: "random", "weakest" or "strongest"');
      done();
    }
  });

  it('should cast error for invalid number of units input', (done) => {
    try {
      const squad = new Squad('random', soldier1, soldier2, soldier3, vehicle1);
      squad.getHealth();
    } catch (error) {
      done();
    }
  });

  it('should cast error for invalid type of units input', (done) => {
    try {
      const squad = new Squad('random', soldier1, soldier2, soldier3, vehicle1, {});
      squad.getHealth();
    } catch (error) {
      assert(error.message === 'A unit must be type of Unit');
      done();
    }
  });

  it('should be able to instanciate instance of type class Squad', (done) => {
    const squad = new Squad('random', soldier1, soldier2, soldier3, vehicle1, vehicle2);
    assert(squad.getHealth() === 170);
    const attacProb = squad.getNewtAttackSuccessProbability();
    assert(attacProb > 0 && attacProb < 1);
    const attacDmg = squad.getNextAttackDamage();
    assert(attacDmg > 0 && attacDmg < 1);
    assert(squad.isActive());
    assert(squad.name.length > 0);
    assert(squad.toString().length > 0);
    done();
  });
});
