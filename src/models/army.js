import assert from 'assert';
import randomWord from 'random-word';
import Squad from './squad';
import Utils from '../../helpers/utils';

export default class Army {
  constructor(..._squads) {
    assert(_squads, 'squads are reuqired for army');
    assert(_squads.length > 1, 'number of squads should be more than 1 squad for every army');

    this.squads = [];
    _squads.forEach((squad) => {
      if (squad instanceof Squad) {
        this.squads.push(squad);
      } else {
        throw new TypeError('A unit must be type of Squad');
      }
    });

    this.randomName = randomWord();
  }

  isActive = () => (this.squads.filter(squad => squad.isActive()).length > 0);

  joinWar = foeArmies => (
    new Promise(async (resolve) => {
      Utils.log(`${this.name} is going to war`, 'debug');
      const foeSquads = [];
      foeArmies.forEach(army => foeSquads.push(...army.squads));
      this.squads.forEach(squad => squad.startAttackingFoes(foeSquads, resolve));
    })
  )

  get name() {
    return `Army(${this.randomName}) { squads:${this.squads.filter(x => x.isActive()).length} }`;
  }

  toString = (pref = '\n') => (`${pref}${this.name} ${this.squads.map(squad => (squad.toString('\n-')))}`);
}
