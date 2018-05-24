import assert from 'assert';
import Soldier from '../src/models/soldier';
import Vehicle from '../src/models/vehicle';
import Utils from '../helpers/utils';

describe('Models - Vehicles', () => {
  it('should cast error for invalid health input', (done) => {
    try {
      const vehicle = new Vehicle(300, 200);
      vehicle.getHealth();
    } catch (error) {
      assert(error.message === Utils.ERR_HEALTH_RANGE);
      done();
    }
  });

  it('should cast error for invalid recharge input', (done) => {
    try {
      const vehicle = new Vehicle(30, 20);
      vehicle.getRecharge();
    } catch (error) {
      assert(error.message === Utils.ERR_RECHARGE_RANGE);
      done();
    }
  });

  it('should cast error for invalid recharge input', (done) => {
    try {
      const soldier = new Soldier(20, 200, 3);
      const vehicle = new Vehicle(30, 200, soldier);
      vehicle.getRecharge();
    } catch (error) {
      assert(error.message === Utils.ERR_RECHARGEVEHICLE_RANGE);
      done();
    }
  });

  it('should cast error for missing at least 1 opperator on input', (done) => {
    try {
      const vehicle = new Vehicle(30, 200);
      vehicle.getTotalHealth();
    } catch (error) {
      assert(error.message === Utils.ERR_OPERATOR_REQUIRED);
      done();
    }
  });

  it('should cast error for first opperator wrong type on input', (done) => {
    try {
      const soldier1 = new Vehicle(20, 200, 3);
      const vehicle = new Vehicle(30, 200, soldier1);
      vehicle.getTotalHealth();
    } catch (error) {
      assert(error.message === Utils.ERR_NOT_SOLDIER);
      done();
    }
  });

  it('should be able to instanciate instance of type class Vehicle', (done) => {
    const soldier1 = new Soldier(20, 200, 3);
    const soldier2 = new Soldier(30, 200, 6);
    const soldier3 = new Soldier(40, 200, 1);
    const vehicle = new Vehicle(40, 1500, soldier1, soldier2, soldier3);
    assert(vehicle.getHealth() === 40);
    assert(vehicle.getExperience() === 10);
    assert(vehicle.getRecharge() === 1500);
    assert(vehicle.getTotalHealth() === 32.5);
    const attacProb = vehicle.getNewtAttackSuccessProbability();
    assert(attacProb > 0 && attacProb < 1);
    const attacDmg = vehicle.getNextAttackDamage();
    assert(attacDmg > 0 && attacDmg < 1);
    assert(vehicle.isActive());
    assert(vehicle.name.length > 0);
    assert(vehicle.toString().length > 0);
    vehicle.recieveDamage(10);
    assert(vehicle.getHealth() === 37);
    vehicle.destroyUnit();
    assert(vehicle.getHealth() === 0);
    assert(!vehicle.isActive());
    const attacProb2 = vehicle.getNewtAttackSuccessProbability();
    assert(attacProb2 === 0);
    const attacDmg2 = vehicle.getNextAttackDamage();
    assert(attacDmg2 === 0);
    done();
  });
});
