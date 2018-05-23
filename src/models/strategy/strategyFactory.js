
import RandomStrategy from './randomStrategy';
import StrongestStrategy from './strongestStrategy';
import WeakestStrategy from './weakestStrategy';

export default class StrategyFactory {
  createStrategy = (type) => {
    switch (type) {
      case 'random':
        return new RandomStrategy();
      case 'strongest':
        return new StrongestStrategy();
      case 'weakest':
        return new WeakestStrategy();
      default:
        throw new TypeError('A strategy must be string type of value: "random", "weakest" or "strongest"');
    }
  }
}
