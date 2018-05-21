import assert from 'assert';
import randomWord from 'random-word';
import Squad from './squad';

const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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

    this.name = randomWord();
  }

  attack = (defArmy) => {
    if (!(defArmy instanceof Army)) {
      throw new TypeError('A defending army must be type of Army');
    }

    if (this.isActive() && defArmy.isActive()) {
      console.log(`\nArmy(${this.name}) is now attacking Army(${defArmy.name})\n`);
      this.squads.forEach((squad) => {
        const defSquadRandom = defArmy.pickRandomSquad();
        switch (squad.strategy) {
          case 'random':
            if (squad.isActive() && defSquadRandom.isActive()) {
              squad.attack(defSquadRandom);
            }
            break;
          default:
            throw new TypeError('squad.strategy must be defined');
        }
      });
    }
  }

  pickRandomSquad = () => {
    const index = rnd(0, this.squads.length - 1);
    if (index > this.squads.length - 1) {
      throw new RangeError('Invalid index');
    }
    return this.squads[index];
  }

  isActive = () => (this.squads.map(squad => (squad.isActive())).some(sa => (sa === true)));

  toString = (pref = '\n\x1b[33m-') => (`${pref}Army(${this.name}) { sqads:${this.squads.length} }${this.squads.map(squad => (squad.toString()))}\x1b[39m`);
}
