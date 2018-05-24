import RandomStrategy from './randomStrategy';
import StrongestStrategy from './strongestStrategy';
import WeakestStrategy from './weakestStrategy';
import Utils from '../../../helpers/utils';

export default class StrategyFactory {
  createStrategy = (type) => {
    switch (type) {
      case Utils.RANDOM:
        return new RandomStrategy();
      case Utils.STRONGEST:
        return new StrongestStrategy();
      case Utils.WEAKEST:
        return new WeakestStrategy();
      default:
        throw new TypeError(Utils.ERR_INVALID_STRATEGY);
    }
  }
}
