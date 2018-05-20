import readline from 'readline-promise';
import randomWord from 'random-word';
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
  let unitsPerSquadNumber;
  rlp.questionAsync('Enter number of armies on battlefield (Please enter number >= 2)? ')
    .then((numberOfArmiesAnswer) => {
      numberOfArmies = numberOfArmiesAnswer;
      for (let i = 0, p = Promise.resolve(); i < numberOfArmies + 1; i++) {
        p = p.then(() => new Promise((resolve, reject) => {
          const armyName = randomWord();
          console.log(`\n\n\n\n*** Initializing Army(${armyName}) ***\n\n`);
          rlp.questionAsync(`Enter Army(${armyName}) attack strategy ("random", "weakest", "strongest")? `)
            .then((answerStrategy) => {
              strategy = answerStrategy;
              return rlp.questionAsync(`Enter Army(${armyName}) number of sqads (Please enter number >= 2)? `);
            })
            .then((answerSqadsNumber) => {
              squadsNumber = answerSqadsNumber;
              return rlp.questionAsync(`Enter Army(${armyName}) number of units per sqads (Please enter 5 <= number <= 10)? `);
            })
            .then((answerUnitsPerSquadNumber) => {
              unitsPerSquadNumber = answerUnitsPerSquadNumber;
              return { ArmyName: armyName, sqads: [] };
            })
            .then((army) => {
              console.log(`\n\n*** Making sqads for Army(${armyName}) ***\n\n`);
              for (let j = 0; j < squadsNumber; j++) {
                army.sqads.push(createRandomSquad(unitsPerSquadNumber, strategy));
                console.log(army.sqads[j].toString());
              }
              armies.push(army);
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

rlp.write('\n******** Welcome to BATTLE ROYALE SIMULATOR!!! ********\n');
init((armies) => {
  rlp.write(`\n******** ${armies.length} Armies generated!!! ********\n`);
  rlp.write('\n******** Press any key to exit BATTLE ROYALE SIMULATOR!!! ********\n');
});

