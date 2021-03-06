import firstBy from 'thenby';
import Strategy from '../base/strategy';

export default class WeakestStrategy extends Strategy {
  getSquadToAttack = (squads) => {
    const activeSquads = squads.filter(x => x.isActive());
    if (activeSquads.length === 0) {
      return null;
    } else if (activeSquads.length === 1) {
      return activeSquads[0];
    }

    // first by health, then by expiriance, then by number of units, then by damage ascending
    const sortedByWeakest = activeSquads.sort(firstBy((v1, v2) => (v1.getHealth() - v2.getHealth()))
      .thenBy((v1, v2) => (v1.getExpiriance() - v2.getExpiriance()))
      .thenBy((v1, v2) => (v1.getUnitsNumber() - v2.getUnitsNumber()))
      .thenBy((v1, v2) => (v1.getNextAttackDamage() - v2.getNextAttackDamage())));

    return sortedByWeakest[0];
  }
}
