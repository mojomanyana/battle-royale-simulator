import Utils from '../../../helpers/utils';
import Strategy from '../base/strategy';

export default class RandomStrategy extends Strategy {
  getSquadToAttack = (squads) => {
    const activeSquads = squads.filter(x => x.isActive());
    if (activeSquads.length === 0) {
      return null;
    } else if (activeSquads.length === 1) {
      return activeSquads[0];
    }

    const index = Utils.rnd(0, activeSquads.length - 1);
    return activeSquads[index];
  }
}
