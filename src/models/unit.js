import BaseUnit from './base/baseUnit';

export default class Unit extends BaseUnit {
  constructor(_health, _recharge) {
    super(_health, _recharge);
    console.log('Unit created');
  }
}
