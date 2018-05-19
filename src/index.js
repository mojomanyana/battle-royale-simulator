import Soldier from './models/soldier';
import Vehicle from './models/vehicle';
import Squad from './models/squad';

const test = (a, b) => (a + b);

console.log('10 + 20', test(10, 20));
console.log('10 + 30', test(10, 30));

const sol1 = new Soldier(50, 200, 1);
const sol2 = new Soldier(90, 200, 0);
const sol3 = new Soldier(90, 200, 20);
const sol4 = new Soldier(20, 1200, 1);
const sol5 = new Soldier(20, 1800, 1);
const sol6 = new Soldier(88, 1000, 1);
const sol7 = new Soldier(78, 500, 10);
const sol8 = new Soldier(66, 300, 30);
const veh1 = new Vehicle(90, 1200, sol1, sol2);
const veh2 = new Vehicle(30, 2000, sol6, sol7, sol8);
const sqa1 = new Squad('random', sol3, sol4, sol5, veh1, veh2);

sqa1.getNewtAttackSuccessProbability();
sqa1.getNextAttackDamage();
