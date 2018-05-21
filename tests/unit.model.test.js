import assert from 'assert';
import Unit from '../src/models/base/unit';

describe('Models - Unit', () => {
  it('should not be able to instanciate Abstract class Unit', (done) => {
    try {
      const unit = new Unit(20, 200);
      unit.getHealth();
    } catch (error) {
      assert(error.message === 'Cannot construct Unit instances directly');
      done();
    }
  });
});
