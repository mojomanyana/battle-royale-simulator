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

let soldier123 = new Soldier(20, 200, 3);
let soldier223 = new Soldier(30, 200, 6);
let soldier323 = new Soldier(40, 200, 1);
let soldier523 = new Soldier(40, 200, 1);
let soldier623 = new Soldier(40, 200, 1);
let vehicle123 = new Vehicle(40, 1500, soldier523);
let vehicle223 = new Vehicle(40, 1500, soldier623);

let soldier1New = new Soldier(20, 200, 3);
let soldier2New = new Soldier(30, 200, 6);
let soldier3New = new Soldier(40, 200, 1);
let soldier5New = new Soldier(40, 200, 1);
let soldier6New = new Soldier(40, 200, 1);
let vehicle1New = new Vehicle(40, 1500, soldier5New);
let vehicle2New = new Vehicle(40, 1500, soldier6New);

let soldier12New = new Soldier(20, 200, 3);
let soldier22New = new Soldier(30, 200, 6);
let soldier32New = new Soldier(40, 200, 1);
let soldier52New = new Soldier(40, 200, 1);
let soldier62New = new Soldier(40, 200, 1);
let vehicle12New = new Vehicle(40, 1500, soldier52New);
let vehicle22New = new Vehicle(40, 1500, soldier62New);

const reInitUnits = () => {
  soldier123 = new Soldier(20, 200, 3);
  soldier223 = new Soldier(30, 200, 6);
  soldier323 = new Soldier(40, 200, 1);
  soldier523 = new Soldier(40, 200, 1);
  soldier623 = new Soldier(40, 200, 1);
  vehicle123 = new Vehicle(40, 1500, soldier523);
  vehicle223 = new Vehicle(40, 1500, soldier623);

  soldier1New = new Soldier(20, 200, 3);
  soldier2New = new Soldier(30, 200, 6);
  soldier3New = new Soldier(40, 200, 1);
  soldier5New = new Soldier(40, 200, 1);
  soldier6New = new Soldier(40, 200, 1);
  vehicle1New = new Vehicle(40, 1500, soldier5New);
  vehicle2New = new Vehicle(40, 1500, soldier6New);

  soldier12New = new Soldier(20, 200, 3);
  soldier22New = new Soldier(30, 200, 6);
  soldier32New = new Soldier(40, 200, 1);
  soldier52New = new Soldier(40, 200, 1);
  soldier62New = new Soldier(40, 200, 1);
  vehicle12New = new Vehicle(40, 1500, soldier52New);
  vehicle22New = new Vehicle(40, 1500, soldier62New);
};

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
    assert(army.name.length > 0);
    assert(army.toString().length > 0);
    done();
  });

  it('should be able to attack other army instance random', (done) => {
    const squad1 = new Squad('random', soldier1, soldier2, soldier3, vehicle1, vehicle2);
    const squad2 = new Squad('random', soldier12, soldier22, soldier32, vehicle12, vehicle22);
    const army1 = new Army(squad1, squad2);
    const squad12 = new Squad('random', soldier1New, soldier2New, soldier3New, vehicle1New, vehicle2New);
    const squad22 = new Squad('random', soldier12New, soldier22New, soldier32New, vehicle12New, vehicle22New);
    const squad33 = new Squad('random', soldier123, soldier223, soldier323, vehicle123, vehicle223);
    const army2 = new Army(squad12, squad22, squad33);

    while (army2.isActive()) {
      army1.attack(army2);
    }
    assert(!army2.isActive());
    assert(army1.isActive());
    done();
  });

  it('should be able to attack other army instance by attacking weakest', (done) => {
    reInitUnits();
    const squad1 = new Squad('weakest', soldier1, soldier2, soldier3, vehicle1, vehicle2);
    const squad2 = new Squad('weakest', soldier12, soldier22, soldier32, vehicle12, vehicle22);
    const army1 = new Army(squad1, squad2);
    const squad12 = new Squad('random', soldier1New, soldier2New, soldier3New, vehicle1New, vehicle2New);
    const squad22 = new Squad('random', soldier12New, soldier22New, soldier32New, vehicle12New, vehicle22New);
    const squad33 = new Squad('random', soldier123, soldier223, soldier323, vehicle123, vehicle223);
    const army2 = new Army(squad12, squad22, squad33);

    while (army2.isActive()) {
      army1.attack(army2);
    }
    assert(!army2.isActive());
    assert(army1.isActive());
    done();
  });

  it('should be able to attack other army instance by attacking strongest', (done) => {
    reInitUnits();
    const squad1 = new Squad('strongest', soldier1, soldier2, soldier3, vehicle1, vehicle2);
    const squad2 = new Squad('strongest', soldier12, soldier22, soldier32, vehicle12, vehicle22);
    const army1 = new Army(squad1, squad2);
    const squad12 = new Squad('random', soldier1New, soldier2New, soldier3New, vehicle1New, vehicle2New);
    const squad22 = new Squad('random', soldier12New, soldier22New, soldier32New, vehicle12New, vehicle22New);
    const squad33 = new Squad('random', soldier123, soldier223, soldier323, vehicle123, vehicle223);
    const army2 = new Army(squad12, squad22, squad33);

    while (army2.isActive()) {
      army1.attack(army2);
    }
    assert(!army2.isActive());
    assert(army1.isActive());
    done();
  });
});
