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

const getNextArmyInput = (numberOfArmies, i) => (
  new Promise(async (resolve, reject) => {
    let strategy;
    let squadsNumber;
    await rlp.questionAsync(`Enter Army(no. ${i + 1}/${numberOfArmies}) attack strategy (Please enter: random or weakest or strongest)? `)
      .then((answerStrategy) => {
        strategy = answerStrategy;
        return rlp.questionAsync(`Enter Army(no. ${i + 1}/${numberOfArmies}) number of squads (Please enter number >= 2)? `);
      })
      .then((answerSqadsNumber) => {
        squadsNumber = answerSqadsNumber;
        return rlp.questionAsync(`Enter Army(no. ${i + 1}/${numberOfArmies}) number of units per squad (Please enter 5 <= number <= 10)? `);
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
        resolve(army);
      })
      .catch((err) => {
        reject(err);
      });
  })
);

const init = () => (
  new Promise(async (resolve, reject) => {
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
        for (let i = 0; i < numberOfArmies; i++) {
          const newArmyImputPromise = await getNextArmyInput(numberOfArmies, i);
          promissesArray.push(newArmyImputPromise);
        }
        Promise.all(promissesArray).then((armies) => {
          resolve(armies);
        });
      })
      .catch((err) => {
        reject(err);
      });
  })
);

const simulate = armies => (
  new Promise(async (resolve) => {
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
    resolve(armies);
  })
);

Utils.log('******** Welcome to BATTLE ROYALE SIMULATOR!!! ********', 'info');
init()
  .then(async (armies) => {
    Utils.log(`******** ${armies.length} Armies generated!!! ********`, 'info');
    Utils.log('******** SIMULATING BATTLE NOW!!! ********', 'info');
    return simulate(armies);
  })
  .then(async (armiesAfterFight) => {
    Utils.log('******** BATTLE IS NOW OVER!!! ********', 'info');
    armiesAfterFight.forEach(army => (Utils.log(`******** Aftermath for army ********${army.toString()}`)));
    const winner = armiesAfterFight.filter(x => x.isActive())[0];
    Utils.log(`******** We have a winner army ${winner.name}!!! ********`, 'info');
    Utils.log('******** exiting BATTLE ROYALE SIMULATOR!!! ********', 'info');
    process.exit(0);
  })
  .catch((err) => {
    Utils.log(err.message, 'error');
    process.exit(1);
  });

