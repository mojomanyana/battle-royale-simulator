import assert from 'assert';
import randomWord from 'random-word';
import Squad from './squad';
// import Utils from '../../helpers/utils';

export default class Army {
  constructor(..._squads) {
    assert(_squads);
    assert(_squads.length > 1);

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

  attack = (defArmy) => {
    if (this.isActive() && defArmy.isActive()) {
      // Utils.log(`${this.name} is now attacking ${defArmy.name}`, 'debug');
      this.squads.forEach((squad) => { squad.attack(defArmy); });
    }
  }

  isActive = () => (this.squads.filter(squad => squad.isActive()).length > 0);

  get name() {
    return `Army(${this.randomName}) { squads:${this.squads.filter(x => x.isActive()).length} }`;
  }

  toString = (pref = '\n') => (`${pref}${this.name} ${this.squads.map(squad => (squad.toString('\n-')))}`);
}
