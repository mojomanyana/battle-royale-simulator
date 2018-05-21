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

    this.randomName = randomWord();
  }

  attack = (defArmy) => {
    if (!(defArmy instanceof Army)) {
      throw new TypeError('A defending army must be type of Army');
    }

    if (this.isActive() && defArmy.isActive()) {
      console.log(`\n${this.name} is now attacking ${defArmy.name}\n`);
      this.squads.forEach((squad) => {
        const defSquadRandom = defArmy.pickRandomSquad();
        const defSquadStrongest = defArmy.pickStrongestSquad();
        const defSquadWeakest = defArmy.pickWeakestSquad();
        switch (squad.strategy) {
          case 'random':
            if (squad.isActive() && defSquadRandom && defSquadRandom.isActive()) {
              squad.attack(defSquadRandom);
            }
            break;
          case 'weakest':
            if (squad.isActive() && defSquadWeakest && defSquadWeakest.isActive()) {
              squad.attack(defSquadWeakest);
            }
            break;
          case 'strongest':
            if (squad.isActive() && defSquadStrongest && defSquadStrongest.isActive()) {
              squad.attack(defSquadStrongest);
            }
            break;
          default:
            throw new TypeError('squad.strategy must be defined');
        }
      });
    }
  }

  pickRandomSquad = () => {
    const activeSquads = this.squads.filter(x => x.isActive());
    const index = rnd(0, activeSquads.length - 1);
    if (index > activeSquads.length - 1) {
      return null;
    }
    return activeSquads[index];
  }

  pickStrongestSquad = () => {
    const activeSquads = this.squads.filter(x => x.isActive());
    const squadHealths = activeSquads.map(x => x.getHealth());
    const index = squadHealths.indexOf(Math.max(...squadHealths));
    if (index > activeSquads.length - 1) {
      return null;
    }
    return activeSquads[index];
  }

  pickWeakestSquad = () => {
    const activeSquads = this.squads.filter(x => x.isActive());
    const squadHealths = activeSquads.map(x => x.getHealth());
    const index = squadHealths.indexOf(Math.min(...squadHealths));
    if (index > activeSquads.length - 1) {
      return null;
    }
    return activeSquads[index];
  }

  isActive = () => (this.squads.filter(squad => squad.isActive()).length > 0);

  get name() {
    if (this.isActive()) {
      return `Army(${this.randomName}) \x1b[39m{ squads:${this.squads.filter(x => x.isActive()).length} }`;
    }
    return `\x1b[31m\x1b[4mArmy(${this.randomName})\x1b[0m\x1b[39m { squads:${this.squads.filter(x => x.isActive()).length} }\x1b[0m\x1b[39m`;
  }

  toString = (pref = '\n\x1b[33m-') => (`${pref}${this.name} ${this.squads.map(squad => (squad.toString()))}\x1b[39m`);
}
