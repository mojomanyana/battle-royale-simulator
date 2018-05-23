import Strategy from '../base/strategy';
import Army from '../army';

export default class WeakestStrategy extends Strategy {
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

    const squadHealths = activeSquads.map(x => x.getHealth());
    const index = squadHealths.indexOf(Math.min(...squadHealths));
    if (index > activeSquads.length - 1) {
      return null;
    }
    return activeSquads[index];
  }
}
