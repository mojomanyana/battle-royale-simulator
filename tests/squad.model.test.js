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

const soldier12 = new Soldier(20, 200, 3);
const soldier22 = new Soldier(30, 200, 6);
const soldier32 = new Soldier(40, 200, 1);
const soldier52 = new Soldier(40, 200, 1);
const soldier62 = new Soldier(40, 200, 1);
const vehicle12 = new Vehicle(40, 1500, soldier52);
const vehicle22 = new Vehicle(40, 1500, soldier62);

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

  it('should be able to attack other squad instance', (done) => {
    const squad1 = new Squad('random', soldier1, soldier2, soldier3, vehicle1, vehicle2);
    const squad2 = new Squad('random', soldier12, soldier22, soldier32, vehicle12, vehicle22);
    while (squad2.isActive() > 0) {
      squad1.attack(squad2);
    }
    assert(squad2.getHealth() === 0);
    assert(!squad2.isActive());
    const attacProb2 = squad2.getNewtAttackSuccessProbability();
    assert(attacProb2 === 0);
    const attacDmg2 = squad2.getNextAttackDamage();
    assert(attacDmg2 === 0);
    done();
  });
});
