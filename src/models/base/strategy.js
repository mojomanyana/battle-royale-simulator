import Utils from '../../../helpers/utils';

export default class Strategy {
  constructor() {
    this.typeOfStrategy = new.target.toString();
    if (new.target === Strategy) {
      throw new TypeError(Utils.ERR_ABSTRACT_INSTANCE);
    }
  }

  getSquadToAttack = (squads) => { // eslint-disable-line no-unused-vars
    throw new Error(Utils.ERR_NOT_IMPLEMENTED);
  }

  get type() { return this.typeOfStrategy; }
}
