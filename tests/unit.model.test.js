import assert from 'assert';
import Unit from '../src/models/base/unit';
import Utils from '../helpers/utils';

describe('Models - Unit', () => {
  it('should not be able to instanciate Abstract class Unit', (done) => {
    try {
      const unit = new Unit(20, 200);
      unit.getHealth();
    } catch (error) {
      assert(error.message === Utils.ERR_ABSTRACT_INSTANCE);
      done();
    }
  });
});
