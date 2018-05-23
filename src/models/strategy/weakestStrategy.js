import firstBy from 'thenby';
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
    } else if (activeSquads.length === 1) {
      return activeSquads[0];
    }

    // first by health, then by expiriance, then by number of units, then by damage descending
    const sortedByWeakest = activeSquads.sort(firstBy((v1, v2) => (v1.getHealth() - v2.getHealth()), -1)
      .thenBy((v1, v2) => (v1.getExpiriance() - v2.getExpiriance()), -1)
      .thenBy((v1, v2) => (v1.getUnitsNumber() - v2.getUnitsNumber()), -1)
      .thenBy((v1, v2) => (v1.getNextAttackDamage() - v2.getNextAttackDamage()), -1));

    return sortedByWeakest[0];
  }
}
