import Utils from '../../../helpers/utils';
import Strategy from '../base/strategy';
import Army from '../army';

export default class RandomStrategy extends Strategy {
  getSquadToAttackFromArmy = (army) => {
    if (!(army instanceof Army)) {
      throw new TypeError('A army must be type of Army');
    }

    const activeSquads = army.squads.filter(x => x.isActive());
    if (activeSquads.length === 0) {
      return null;
    } else if (activeSquads.length === 0) {
      return activeSquads[0];
    }

    const index = Utils.rnd(0, activeSquads.length - 1);
    return activeSquads[index];
  }
}
