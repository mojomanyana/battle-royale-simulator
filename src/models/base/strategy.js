export default class Strategy {
  constructor() {
    this.typeOfStrategy = new.target.toString();
    if (new.target === Strategy) {
      throw new TypeError('Cannot construct Strategy instances directly');
    }
  }

  getSquadToAttackFromArmy = (army) => { // eslint-disable-line no-unused-vars
    throw new Error('Method not implemented');
  }

  get type() { return this.typeOfStrategy; }
}
