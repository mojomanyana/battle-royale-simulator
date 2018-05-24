import assert from 'assert';
import Soldier from '../src/models/soldier';
import Utils from '../helpers/utils';

describe('Models - Soldier', () => {
  it('should cast error for invalid health input', (done) => {
    try {
      const soldier = new Soldier(300, 200, 3);
      soldier.getHealth();
    } catch (error) {
      assert(error.message === Utils.ERR_HEALTH_RANGE);
      done();
    }
  });

  it('should cast error for invalid recharge input', (done) => {
    try {
      const soldier = new Soldier(30, 20, 3);
      soldier.getRecharge();
    } catch (error) {
      assert(error.message === Utils.ERR_RECHARGE_RANGE);
      done();
    }
  });

  it('should cast error for invalid expiriance input', (done) => {
    try {
      const soldier = new Soldier(30, 200, 300);
      soldier.getExperience();
    } catch (error) {
      assert(error.message === Utils.ERR_EXPIRIANCE_RANGE);
      done();
    }
  });

  it('should be able to instanciate instance of type class Soldier', (done) => {
    const soldier = new Soldier(20, 200, 3);
    assert(soldier.getHealth() === 20);
    assert(soldier.getExperience() === 3);
    assert(soldier.getRecharge() === 200);
    const attacProb = soldier.getNewtAttackSuccessProbability();
    assert(attacProb > 0 && attacProb < 1);
    const attacDmg = soldier.getNextAttackDamage();
    assert(attacDmg > 0 && attacDmg < 1);
    soldier.onSuccessfulAttack();
    assert(soldier.getExperience() === 4);
    assert(soldier.isActive());
    assert(soldier.name.length > 0);
    assert(soldier.toString().length > 0);
    soldier.recieveDamage(10);
    assert(soldier.getHealth() === 10);
    soldier.destroyUnit();
    assert(soldier.getHealth() === 0);
    assert(!soldier.isActive());
    const attacProb2 = soldier.getNewtAttackSuccessProbability();
    assert(attacProb2 === 0);
    const attacDmg2 = soldier.getNextAttackDamage();
    assert(attacDmg2 === 0);
    done();
  });
});
