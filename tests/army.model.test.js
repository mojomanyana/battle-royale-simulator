import assert from 'assert';
import Soldier from '../src/models/soldier';
import Vehicle from '../src/models/vehicle';
import Squad from '../src/models/squad';
import Army from '../src/models/army';

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

const soldier123 = new Soldier(20, 200, 3);
const soldier223 = new Soldier(30, 200, 6);
const soldier323 = new Soldier(40, 200, 1);
const soldier523 = new Soldier(40, 200, 1);
const soldier623 = new Soldier(40, 200, 1);
const vehicle123 = new Vehicle(40, 1500, soldier523);
const vehicle223 = new Vehicle(40, 1500, soldier623);

const soldier1New = new Soldier(20, 200, 3);
const soldier2New = new Soldier(30, 200, 6);
const soldier3New = new Soldier(40, 200, 1);
const soldier5New = new Soldier(40, 200, 1);
const soldier6New = new Soldier(40, 200, 1);
const vehicle1New = new Vehicle(40, 1500, soldier5New);
const vehicle2New = new Vehicle(40, 1500, soldier6New);

const soldier12New = new Soldier(20, 200, 3);
const soldier22New = new Soldier(30, 200, 6);
const soldier32New = new Soldier(40, 200, 1);
const soldier52New = new Soldier(40, 200, 1);
const soldier62New = new Soldier(40, 200, 1);
const vehicle12New = new Vehicle(40, 1500, soldier52New);
const vehicle22New = new Vehicle(40, 1500, soldier62New);

describe('Models - Army', () => {
  it('should cast error for invalid number of squads input', (done) => {
    try {
      const squad = new Squad('random', soldier1, soldier2, soldier3, vehicle1, vehicle2);
      const army = new Army(squad);
      army.isActive();
    } catch (error) {
      done();
    }
  });

  it('should cast error for invalid type of units input', (done) => {
    try {
      const squad = new Squad('random', soldier1, soldier2, soldier3, vehicle1, vehicle2);
      const army = new Army(squad, {});
      army.isActive();
    } catch (error) {
      assert(error.message === 'A unit must be type of Squad');
      done();
    }
  });

  it('should be able to instanciate instance of type class Army', (done) => {
    const squad1 = new Squad('random', soldier1, soldier2, soldier3, vehicle1, vehicle2);
    const squad2 = new Squad('random', soldier12, soldier22, soldier32, vehicle12, vehicle22);
    const army = new Army(squad1, squad2);
    assert(army.isActive());
    assert(army.pickRandomSquad());
    assert(army.pickStrongestSquad());
    assert(army.pickWeakestSquad());
    assert(army.name.length > 0);
    assert(army.toString().length > 0);
    done();
  });

  it('should be able to attack other army instance', (done) => {
    const squad1 = new Squad('random', soldier1, soldier2, soldier3, vehicle1, vehicle2);
    const squad2 = new Squad('weakest', soldier12, soldier22, soldier32, vehicle12, vehicle22);
    const squad3 = new Squad('strongest', soldier123, soldier223, soldier323, vehicle123, vehicle223);
    const army1 = new Army(squad1, squad2, squad3);

    const squad12 = new Squad('random', soldier1New, soldier2New, soldier3New, vehicle1New, vehicle2New);
    const squad22 = new Squad('random', soldier12New, soldier22New, soldier32New, vehicle12New, vehicle22New);
    const army2 = new Army(squad12, squad22);

    while (army2.isActive() > 0) {
      army1.attack(army2);
    }
    assert(!army2.isActive());
    assert(army2.pickRandomSquad() == null);
    assert(army2.pickStrongestSquad() == null);
    assert(army2.pickWeakestSquad() == null);
    done();
  });
});
