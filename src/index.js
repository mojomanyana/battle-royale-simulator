import readline from 'readline-promise';
import Army from './models/army';
import Soldier from './models/soldier';
import Vehicle from './models/vehicle';
import Squad from './models/squad';

const rlp = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const createRandomSolder = () => (new Soldier(rnd(1, 100), rnd(100, 2000), rnd(1, 50)));

const createRandomVehicle = (...solders) => (new Vehicle(rnd(1, 100), rnd(1000, 2000), ...solders));

const createRandomUnit = () => {
  if (Math.random() > 0.5) {
    // Return Solder
    return createRandomSolder();
  }
  // Return Vehicle
  const numOfOperators = rnd(1, 3);
  const operators = [];
  for (let i = 0; i < numOfOperators; i++) {
    operators.push(createRandomSolder());
  }
  return createRandomVehicle(...operators);
};

const createRandomSquad = (numberOfUnits, strategy) => {
  const units = [];
  for (let i = 0; i < numberOfUnits; i++) {
    units.push(createRandomUnit());
  }
  return new Squad(strategy, ...units);
};

const init = (callback) => {
  const armies = [];
  let numberOfArmies;
  let strategy;
  let squadsNumber;
  rlp.questionAsync('Enter number of armies on battlefield (Please enter number >= 2)? ')
    .then((numberOfArmiesAnswer) => {
      numberOfArmies = numberOfArmiesAnswer;
      if (numberOfArmies < 2) {
        throw new RangeError('You must enter number bigger than 1 for number of armies');
      }
      for (let i = 0, p = Promise.resolve(); i < numberOfArmies + 1; i++) {
        p = p.then(() => new Promise((resolve, reject) => {
          rlp.questionAsync(`\n\nEnter Army(no. ${i + 1}/${numberOfArmies}) attack strategy (Please enter: random or weakest or strongest)? `)
            .then((answerStrategy) => {
              strategy = answerStrategy;
              if (strategy !== 'random' && strategy !== 'weakest' && strategy !== 'strongest') {
                throw new TypeError('A strategy must be string type of value: "random", "weakest" or "strongest"');
              }
              return rlp.questionAsync(`Enter Army(no. ${i + 1}/${numberOfArmies}) number of sqads (Please enter number >= 2)? `);
            })
            .then((answerSqadsNumber) => {
              squadsNumber = answerSqadsNumber;
              return rlp.questionAsync(`Enter Army(no. ${i + 1}/${numberOfArmies}) number of units per sqads (Please enter 5 <= number <= 10)? `);
            })
            .then((answerUnitsPerSquadNumber) => {
              const sqads = [];
              for (let j = 0; j < squadsNumber; j++) {
                sqads.push(createRandomSquad(answerUnitsPerSquadNumber, strategy));
              }
              return new Army(...sqads);
            })
            .then((army) => {
              rlp.write(`\nArmy(no. ${armies.length + 1}/${numberOfArmies}) created:${army.toString()}`);
              armies.push(army);
              rlp.write('\n');
              if (armies.length >= numberOfArmies) {
                return callback(armies);
              }
              return resolve();
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        }));
      }
      return true;
    });
};

const simulate = (armies) => {
  while (armies.filter(x => x.isActive()).length > 1) {
    for (let i = 0; i < armies.length; i++) {
      const attackingArmy = armies[i];
      for (let j = 0; j < armies.length; j++) {
        const defendingArmy = armies[j];
        if (i !== j) {
          attackingArmy.attack(defendingArmy);
        }
      }
    }
  }

  rlp.write('\n******** BATTLE IS NOW OVER!!! ********');
  armies.forEach(army => (rlp.write(army.toString())));
  return armies.filter(x => x.isActive())[0];
};

rlp.write('\n******** Welcome to BATTLE ROYALE SIMULATOR!!! ********\n');
init(async (armies) => {
  rlp.write(`\n******** ${armies.length} Armies generated!!! ********`);
  rlp.write('\n******** GET READY FOR RUMBLEEE!!! ********');
  const winner = simulate(armies);
  rlp.write(`\n******** We have a winner army ${winner.name}!!! ********`);
  rlp.write('\n******** Press CTRL+z to exit BATTLE ROYALE SIMULATOR!!! ********\n');
  process.exit();
});

