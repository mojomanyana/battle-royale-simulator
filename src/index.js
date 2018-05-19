import Soldier from './models/soldier';
import Vehicle from './models/vehicle';
const test = (a, b) => (a + b);

console.log('10 + 20', test(10, 20));
console.log('10 + 30', test(10, 30));

const sol1 = new Soldier(20, 200, 1);
const sol2 = new Soldier(20, 200, 1);
const sol3 = new Soldier(20, 200, 1);
const sol4 = new Soldier(20, 200, 1);
const sol5 = new Soldier(20, 200, 1);

const veh1 = new Vehicle(20, 1200, sol1, sol2);
veh1.getNewtAttackSuccessProbability();
veh1.getNextAttackDamage();
const veh2 = new Vehicle(20, 1200, sol3, sol4, sol5);
veh2.getNewtAttackSuccessProbability();
veh2.getNextAttackDamage();