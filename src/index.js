import readline from 'readline-promise';
import Utils from '../helpers/utils';
import Army from './models/army';
import Soldier from './models/soldier';
import Vehicle from './models/vehicle';
import Squad from './models/squad';

const rlp = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

const createRandomSolder = () => (new Soldier(Utils.rnd(1, 100), Utils.rnd(100, 2000), Utils.rnd(1, 50)));

const createRandomVehicle = (...solders) => (new Vehicle(Utils.rnd(1, 100), Utils.rnd(1000, 2000), ...solders));

const createRandomUnit = () => {
  if (Math.random() > 0.5) {
    // Return Solder
    return createRandomSolder();
  }
  // Return Vehicle
  const numOfOperators = Utils.rnd(1, 3);
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

const getArmyNextInputRecursion = async (promissesArray, numberOfArmies, i) => {
  let strategy;
  let squadsNumber;
  await rlp.questionAsync(`Enter Army(no. ${i + 1}/${numberOfArmies}) attack strategy (Please enter: random or weakest or strongest)? `)
    .then((answerStrategy) => {
      strategy = answerStrategy;
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
      Utils.log(`Army(no. ${i + 1}/${numberOfArmies}) created:${army.toString()}`, 'info');
      Utils.log('********************************************************', 'info');
      promissesArray.push(new Promise((resolve) => { resolve(army); }));
      return i + 1;
    })
    .then(async (j) => {
      if (j >= numberOfArmies) {
        return true;
      }
      await getArmyNextInputRecursion(promissesArray, numberOfArmies, j);
      return true;
    })
    .catch((err) => {
      throw err;
    });
};

const init = async (callback) => {
  let numberOfArmies;
  await rlp.questionAsync('Enter number of armies on battlefield (Please enter number >= 2)? ')
    .then(async (numberOfArmiesAnswer) => {
      if (Number.isNaN(parseInt(numberOfArmiesAnswer, 10))) {
        throw new TypeError('You must enter a number bigger than 1 for number of armies');
      }
      numberOfArmies = parseInt(numberOfArmiesAnswer, 10);
      if (numberOfArmies < 2) {
        throw new RangeError('You must enter a number bigger than 1 for number of armies');
      }

      const promissesArray = [];
      await getArmyNextInputRecursion(promissesArray, numberOfArmies, 0);
      Promise.all(promissesArray).then((armies) => {
        callback(armies);
      });
    });
};

const simulate = (armies, callback) => {
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

  callback(armies);
};

Utils.log('******** Welcome to BATTLE ROYALE SIMULATOR!!! ********', 'info');
init(async (armies) => {
  Utils.log(`******** ${armies.length} Armies generated!!! ********`, 'info');
  Utils.log('******** SIMULATING BATTLE NOW!!! ********', 'info');
  simulate(armies, async (armiesFinal) => {
    Utils.log('******** BATTLE IS NOW OVER!!! ********', 'info');
    armiesFinal.forEach(army => (Utils.log(`******** Aftermath for army ********${army.toString()}`)));
    const winner = armiesFinal.filter(x => x.isActive())[0];
    Utils.log(`******** We have a winner army ${winner.name}!!! ********`, 'info');
    Utils.log('******** exiting BATTLE ROYALE SIMULATOR!!! ********', 'info');
    // process.exit(0);
  });
});

