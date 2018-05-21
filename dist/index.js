(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _readlinePromise = __webpack_require__(/*! readline-promise */ \"readline-promise\");\n\nvar _readlinePromise2 = _interopRequireDefault(_readlinePromise);\n\nvar _army = __webpack_require__(/*! ./models/army */ \"./src/models/army.js\");\n\nvar _army2 = _interopRequireDefault(_army);\n\nvar _soldier = __webpack_require__(/*! ./models/soldier */ \"./src/models/soldier.js\");\n\nvar _soldier2 = _interopRequireDefault(_soldier);\n\nvar _vehicle = __webpack_require__(/*! ./models/vehicle */ \"./src/models/vehicle.js\");\n\nvar _vehicle2 = _interopRequireDefault(_vehicle);\n\nvar _squad = __webpack_require__(/*! ./models/squad */ \"./src/models/squad.js\");\n\nvar _squad2 = _interopRequireDefault(_squad);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst rlp = _readlinePromise2.default.createInterface({\n  input: process.stdin,\n  output: process.stdout,\n  terminal: true\n});\n\nconst rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;\n\nconst createRandomSolder = () => new _soldier2.default(rnd(1, 100), rnd(100, 2000), rnd(1, 50));\n\nconst createRandomVehicle = (...solders) => new _vehicle2.default(rnd(1, 100), rnd(1000, 2000), ...solders);\n\nconst createRandomUnit = () => {\n  if (Math.random() > 0.5) {\n    // Return Solder\n    return createRandomSolder();\n  }\n  // Return Vehicle\n  const numOfOperators = rnd(1, 3);\n  const operators = [];\n  for (let i = 0; i < numOfOperators; i++) {\n    operators.push(createRandomSolder());\n  }\n  return createRandomVehicle(...operators);\n};\n\nconst createRandomSquad = (numberOfUnits, strategy) => {\n  const units = [];\n  for (let i = 0; i < numberOfUnits; i++) {\n    units.push(createRandomUnit());\n  }\n  return new _squad2.default(strategy, ...units);\n};\n\nconst init = callback => {\n  const armies = [];\n  let numberOfArmies;\n  let strategy;\n  let squadsNumber;\n  rlp.questionAsync('Enter number of armies on battlefield (Please enter number >= 2)? ').then(numberOfArmiesAnswer => {\n    numberOfArmies = numberOfArmiesAnswer;\n    if (numberOfArmies < 2) {\n      throw new RangeError('You must enter number bigger than 1 for number of armies');\n    }\n    for (let i = 0, p = Promise.resolve(); i < numberOfArmies + 1; i++) {\n      p = p.then(() => new Promise((resolve, reject) => {\n        rlp.questionAsync(`\\n\\nEnter Army(no. ${i + 1}/${numberOfArmies}) attack strategy (Please enter: random or weakest or strongest)? `).then(answerStrategy => {\n          strategy = answerStrategy;\n          if (strategy !== 'random' && strategy !== 'weakest' && strategy !== 'strongest') {\n            throw new TypeError('A strategy must be string type of value: \"random\", \"weakest\" or \"strongest\"');\n          }\n          return rlp.questionAsync(`Enter Army(no. ${i + 1}/${numberOfArmies}) number of sqads (Please enter number >= 2)? `);\n        }).then(answerSqadsNumber => {\n          squadsNumber = answerSqadsNumber;\n          return rlp.questionAsync(`Enter Army(no. ${i + 1}/${numberOfArmies}) number of units per sqads (Please enter 5 <= number <= 10)? `);\n        }).then(answerUnitsPerSquadNumber => {\n          const sqads = [];\n          for (let j = 0; j < squadsNumber; j++) {\n            sqads.push(createRandomSquad(answerUnitsPerSquadNumber, strategy));\n          }\n          return new _army2.default(...sqads);\n        }).then(army => {\n          rlp.write(`\\nArmy(no. ${armies.length + 1}/${numberOfArmies}) created:${army.toString()}`);\n          armies.push(army);\n          rlp.write('\\n');\n          if (armies.length >= numberOfArmies) {\n            return callback(armies);\n          }\n          return resolve();\n        }).catch(err => {\n          console.log(err);\n          reject(err);\n        });\n      }));\n    }\n    return true;\n  });\n};\n\nconst simulate = armies => {\n  while (armies.filter(x => x.isActive()).length > 1) {\n    for (let i = 0; i < armies.length; i++) {\n      const attackingArmy = armies[i];\n      for (let j = 0; j < armies.length; j++) {\n        const defendingArmy = armies[j];\n        if (i !== j) {\n          attackingArmy.attack(defendingArmy);\n        }\n      }\n    }\n  }\n\n  rlp.write('\\n******** BATTLE IS NOW OVER!!! ********');\n  armies.forEach(army => rlp.write(army.toString()));\n  return armies.filter(x => x.isActive())[0];\n};\n\nrlp.write('\\n******** Welcome to BATTLE ROYALE SIMULATOR!!! ********\\n');\ninit(async armies => {\n  rlp.write(`\\n******** ${armies.length} Armies generated!!! ********`);\n  rlp.write('\\n******** GET READY FOR RUMBLEEE!!! ********');\n  const winner = simulate(armies);\n  rlp.write(`\\n******** We have a winner army ${winner.name}!!! ********`);\n  rlp.write('\\n******** Press CTRL+z to exit BATTLE ROYALE SIMULATOR!!! ********\\n');\n  process.exit();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/models/army.js":
/*!****************************!*\
  !*** ./src/models/army.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _assert = __webpack_require__(/*! assert */ \"assert\");\n\nvar _assert2 = _interopRequireDefault(_assert);\n\nvar _randomWord = __webpack_require__(/*! random-word */ \"random-word\");\n\nvar _randomWord2 = _interopRequireDefault(_randomWord);\n\nvar _squad = __webpack_require__(/*! ./squad */ \"./src/models/squad.js\");\n\nvar _squad2 = _interopRequireDefault(_squad);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;\n\nclass Army {\n  constructor(..._squads) {\n    this.attack = defArmy => {\n      if (!(defArmy instanceof Army)) {\n        throw new TypeError('A defending army must be type of Army');\n      }\n\n      if (this.isActive() && defArmy.isActive()) {\n        console.log(`\\nArmy(${this.name}) is now attacking Army(${defArmy.name})\\n`);\n        this.squads.forEach(squad => {\n          const defSquadRandom = defArmy.pickRandomSquad();\n          switch (squad.strategy) {\n            case 'random':\n              if (squad.isActive() && defSquadRandom.isActive()) {\n                squad.attack(defSquadRandom);\n              }\n              break;\n            default:\n              throw new TypeError('squad.strategy must be defined');\n          }\n        });\n      }\n    };\n\n    this.pickRandomSquad = () => {\n      const index = rnd(0, this.squads.length - 1);\n      if (index > this.squads.length - 1) {\n        throw new RangeError('Invalid index');\n      }\n      return this.squads[index];\n    };\n\n    this.isActive = () => this.squads.map(squad => squad.isActive()).some(sa => sa === true);\n\n    this.toString = (pref = '\\n\\x1b[33m-') => `${pref}Army(${this.name}) { sqads:${this.squads.length} }${this.squads.map(squad => squad.toString())}\\x1b[39m`;\n\n    (0, _assert2.default)(_squads);\n    (0, _assert2.default)(_squads.length > 1);\n\n    this.squads = [];\n    _squads.forEach(squad => {\n      if (squad instanceof _squad2.default) {\n        this.squads.push(squad);\n      } else {\n        throw new TypeError('A unit must be type of Squad');\n      }\n    });\n\n    this.name = (0, _randomWord2.default)();\n  }\n\n}\nexports.default = Army;\n\n//# sourceURL=webpack:///./src/models/army.js?");

/***/ }),

/***/ "./src/models/base/unit.js":
/*!*********************************!*\
  !*** ./src/models/base/unit.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _assert = __webpack_require__(/*! assert */ \"assert\");\n\nvar _assert2 = _interopRequireDefault(_assert);\n\nvar _randomWord = __webpack_require__(/*! random-word */ \"random-word\");\n\nvar _randomWord2 = _interopRequireDefault(_randomWord);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Unit {\n  constructor(_baseHealth, _recharge) {\n    this.getHealth = () => this.baseHealth;\n\n    this.toString = (pref = '\\x1b[39m') => `${pref}Unit`;\n\n    this.getRecharge = () => this.recharge;\n\n    this.getNewtAttackSuccessProbability = () => 0;\n\n    this.getNextAttackDamage = () => 0;\n\n    this.recieveDamage = () => {};\n\n    this.destoryUnit = () => {};\n\n    this.isActive = () => {};\n\n    this.onSuccessfulAttack = () => {};\n\n    if (new.target === Unit) {\n      throw new TypeError('Cannot construct Unit instances directly');\n    }\n\n    (0, _assert2.default)(_baseHealth);\n    if (_baseHealth < 0 || _baseHealth > 100) {\n      throw new TypeError('A unit health must be 0 - 100');\n    }\n\n    (0, _assert2.default)(_recharge);\n    if (_recharge < 100 || _recharge > 2000) {\n      throw new TypeError('A unit recharge must be 100 - 2000');\n    }\n\n    this.randomName = (0, _randomWord2.default)();\n    this.baseHealth = _baseHealth;\n    this.recharge = _recharge;\n  }\n\n  get name() {\n    if (this.isActive()) {\n      return `\\x1b[32m${this.randomName}\\x1b[39m`;\n    }\n    return `\\x1b[31m\\x1b[4m${this.randomName}\\x1b[0m\\x1b[39m`;\n  }\n\n}\nexports.default = Unit;\n\n//# sourceURL=webpack:///./src/models/base/unit.js?");

/***/ }),

/***/ "./src/models/soldier.js":
/*!*******************************!*\
  !*** ./src/models/soldier.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _unit = __webpack_require__(/*! ./base/unit */ \"./src/models/base/unit.js\");\n\nvar _unit2 = _interopRequireDefault(_unit);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;\n\nclass Soldier extends _unit2.default {\n  constructor(_health, _recharge, _experience) {\n    super(_health, _recharge);\n\n    this.getHealth = () => {\n      if (this.baseHealth > 0 && this.baseHealth <= 100) {\n        return this.baseHealth;\n      }\n      return 0;\n    };\n\n    this.getExperience = () => this.experience;\n\n    this.getNewtAttackSuccessProbability = () => {\n      if (this.isActive()) {\n        const prob = 0.5 * (1 + this.getHealth() / 100) * rnd(30 + this.getExperience(), 100) / 100;\n        console.log(`\\x1b[36m${this.name} next attack success probability is ${prob}\\x1b[39m`);\n        return prob;\n      }\n      return 0;\n    };\n\n    this.getNextAttackDamage = () => {\n      if (this.isActive()) {\n        const dmg = 0.05 + this.getExperience() / 100;\n        console.log(`\\x1b[36m${this.name} next attack damage is ${dmg}\\x1b[39m`);\n        return dmg;\n      }\n      return 0;\n    };\n\n    this.onSuccessfulAttack = () => {\n      if (this.isActive() && this.experience < 50) {\n        this.experience++;\n      }\n    };\n\n    this.destoryUnit = () => {\n      this.baseHealth = 0;\n      console.log(`${this.name} destroyd!`);\n    };\n\n    this.recieveDamage = dmg => {\n      this.baseHealth -= dmg;\n      console.log(`\\x1b[36m${this.name} recieved damage ${dmg}, health: ${this.getHealth()}\\x1b[39m`);\n      if (!this.isActive()) {\n        this.destoryUnit();\n        return true;\n      }\n      return false;\n    };\n\n    this.isActive = () => this.getHealth() > 0;\n\n    this.toString = (pref = '\\n\\x1b[36m--') => `${pref}${this.name}`;\n\n    if (_experience < 0 || _experience > 50) {\n      throw new TypeError('A soldier expiriance must be 0 - 50');\n    }\n\n    this.experience = _experience;\n  }\n\n  get name() {\n    if (this.isActive()) {\n      return `Soldier(${this.randomName})\\x1b[39m { h:${this.getHealth()}, r:${this.getRecharge()}, exp:${this.getExperience()} }`;\n    }\n    return `\\x1b[31m\\x1b[4mSoldier(${this.randomName})\\x1b[0m\\x1b[39m { h:${this.getHealth()}, r:${this.getRecharge()}, exp:${this.getExperience()} }`;\n  }\n\n}\nexports.default = Soldier;\n\n//# sourceURL=webpack:///./src/models/soldier.js?");

/***/ }),

/***/ "./src/models/squad.js":
/*!*****************************!*\
  !*** ./src/models/squad.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _assert = __webpack_require__(/*! assert */ \"assert\");\n\nvar _assert2 = _interopRequireDefault(_assert);\n\nvar _computeGmean = __webpack_require__(/*! compute-gmean */ \"compute-gmean\");\n\nvar _computeGmean2 = _interopRequireDefault(_computeGmean);\n\nvar _randomWord = __webpack_require__(/*! random-word */ \"random-word\");\n\nvar _randomWord2 = _interopRequireDefault(_randomWord);\n\nvar _unit = __webpack_require__(/*! ./base/unit */ \"./src/models/base/unit.js\");\n\nvar _unit2 = _interopRequireDefault(_unit);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Squad {\n  constructor(_strategy, ..._units) {\n    this.getNewtAttackSuccessProbability = () => {\n      const activeUnits = this.units.filter(unit => unit.isActive());\n      const opAttacks = activeUnits.map(unit => unit.getNewtAttackSuccessProbability());\n      const prob = (0, _computeGmean2.default)(opAttacks);\n      console.log(`\\x1b[35m${this.name} next attack success probability is ${prob} ***\\x1b[39m`);\n      return prob;\n    };\n\n    this.getNextAttackDamage = () => {\n      const activeUnits = this.units.filter(unit => unit.isActive());\n      const opDmg = activeUnits.map(unit => unit.getNextAttackDamage());\n      const dmg = opDmg.reduce((a, b) => a + b);\n      console.log(`\\x1b[35m${this.name} next attack damage is ${dmg} ***\\x1b[39m`);\n      return dmg;\n    };\n\n    this.recieveDamage = dmg => {\n      const activeUnits = this.units.filter(unit => unit.isActive());\n      const numberOfUnits = activeUnits.length;\n      activeUnits.forEach(unit => {\n        unit.recieveDamage(dmg / numberOfUnits);\n      });\n    };\n\n    this.attack = defSquad => {\n      if (!(defSquad instanceof Squad)) {\n        throw new TypeError('A defending squad must be type of Squad');\n      }\n\n      if (this.isActive() && defSquad.isActive()) {\n        console.log(`\\x1b[35m${this.name} is attacking ${defSquad.name}\\x1b[39m`);\n        const probAtt = this.getNewtAttackSuccessProbability();\n        const probDef = defSquad.getNewtAttackSuccessProbability();\n        if (probAtt > probDef) {\n          const dmg = this.getNextAttackDamage();\n          defSquad.recieveDamage(dmg);\n          this.units.forEach(unit => {\n            unit.onSuccessfulAttack();\n          });\n        }\n      }\n    };\n\n    this.isActive = () => this.units.map(unit => unit.isActive()).some(ua => ua === true);\n\n    this.toString = (pref = '\\n\\x1b[35m-') => `${pref}${this.name}${this.units.map(operator => operator.toString())}\\x1b[39m`;\n\n    (0, _assert2.default)(_strategy);\n    (0, _assert2.default)(_units);\n    // assert(_units.length >= 5);\n    // assert(_units.length <= 10);\n\n    this.units = [];\n    _units.forEach(unit => {\n      if (unit instanceof _unit2.default) {\n        this.units.push(unit);\n      } else {\n        throw new TypeError('A unit must be type of Unit');\n      }\n    });\n\n    if (_strategy !== 'random' && _strategy !== 'weakest' && _strategy !== 'strongest') {\n      throw new TypeError('A strategy must be string type of value: \"random\", \"weakest\" or \"strongest\"');\n    }\n    this.strategy = _strategy;\n    this.randomName = (0, _randomWord2.default)();\n  }\n\n  get name() {\n    if (this.isActive()) {\n      return `Squad(${this.randomName}) \\x1b[39m{ units:${this.units.filter(x => x.isActive()).length} }`;\n    }\n    return `\\x1b[31m\\x1b[4mSquad(${this.randomName})\\x1b[0m\\x1b[39m { units:${this.units.filter(x => x.isActive()).length} }\\x1b[0m\\x1b[39m`;\n  }\n\n}\nexports.default = Squad;\n\n//# sourceURL=webpack:///./src/models/squad.js?");

/***/ }),

/***/ "./src/models/vehicle.js":
/*!*******************************!*\
  !*** ./src/models/vehicle.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _assert = __webpack_require__(/*! assert */ \"assert\");\n\nvar _assert2 = _interopRequireDefault(_assert);\n\nvar _computeGmean = __webpack_require__(/*! compute-gmean */ \"compute-gmean\");\n\nvar _computeGmean2 = _interopRequireDefault(_computeGmean);\n\nvar _unit = __webpack_require__(/*! ./base/unit */ \"./src/models/base/unit.js\");\n\nvar _unit2 = _interopRequireDefault(_unit);\n\nvar _soldier = __webpack_require__(/*! ./soldier */ \"./src/models/soldier.js\");\n\nvar _soldier2 = _interopRequireDefault(_soldier);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;\n\nclass Vehicles extends _unit2.default {\n  constructor(_health, _recharge, _operator1, _operator2 = null, _operator3 = null) {\n    super(_health, _recharge);\n\n    this.getHealth = () => {\n      if (this.baseHealth > 0 && this.baseHealth <= 100) {\n        return this.baseHealth;\n      }\n      return 0;\n    };\n\n    this.getTotalHealth = () => {\n      let baseVehicleHealth = 0;\n      if (this.baseHealth > 0 && this.baseHealth <= 100) {\n        baseVehicleHealth = this.baseHealth;\n      }\n      const healths = this.operators.map(operator => operator.getHealth());\n      const sum = baseVehicleHealth + healths.reduce((a, b) => a + b, 0);\n      const hlt = sum / (healths.length + 1);\n      if (hlt > 0 && hlt <= Infinity) {\n        return hlt;\n      }\n      return 0;\n    };\n\n    this.getNewtAttackSuccessProbability = () => {\n      if (this.isActive()) {\n        const activeOperators = this.operators.filter(x => x.isActive());\n        const opAttacks = activeOperators.map(operator => operator.getNewtAttackSuccessProbability());\n        const prob = 0.5 * (1 + this.getTotalHealth() / 100) * (0, _computeGmean2.default)(opAttacks);\n        console.log(`\\x1b[34m${this.name} next attack success probability is ${prob}\\x1b[39m`);\n        return prob;\n      }\n      return 0;\n    };\n\n    this.getNextAttackDamage = () => {\n      if (this.isActive()) {\n        const activeOperators = this.operators.filter(x => x.isActive());\n        const opExperiances = activeOperators.map(operator => operator.getExperience() / 100);\n        const dmg = 0.1 + opExperiances.reduce((a, b) => a + b);\n        console.log(`\\x1b[34m${this.name}) next attack damage is ${dmg}\\x1b[39m`);\n        return dmg;\n      }\n      return 0;\n    };\n\n    this.recieveDamage = dmg => {\n      if (this.isActive()) {\n        const activeOperators = this.operators.filter(x => x.isActive());\n        this.baseHealth -= 0.3 * dmg;\n        const i = rnd(1, activeOperators.length);\n        activeOperators[i - 1].recieveDamage(0.5 * dmg);\n\n        if (activeOperators.length === 1) {\n          this.baseHealth -= 0.2 * dmg;\n        } else if (activeOperators.length === 2) {\n          activeOperators[i - 1 === 0 ? 1 : 0].recieveDamage(0.2 * dmg);\n        } else if (activeOperators.length === 3) {\n          activeOperators.forEach((operator, j) => {\n            if (i - 1 !== j) {\n              activeOperators[j].recieveDamage(0.1 * dmg);\n            }\n          });\n        }\n\n        console.log(`${this.name} recieved damage ${dmg}, health: ${this.getHealth()}, total health: ${this.getTotalHealth()}!`);\n        if (!this.isActive()) {\n          this.destoryUnit();\n          return true;\n        }\n      }\n      return false;\n    };\n\n    this.destroyUnit = () => {\n      this.baseHealth = 0;\n      console.log(`${this.name} destroyd!`);\n      this.operators.forEach(operator => operator.destoryUnit());\n    };\n\n    this.isActive = () => {\n      const activeOperators = this.operators.filter(x => x.isActive());\n      return this.getHealth() > 0 && activeOperators.length > 0;\n    };\n\n    this.toString = (pref = '\\n\\x1b[34m--') => `${pref}${this.name} ${this.operators.map(operator => operator.toString(`${pref}-`))}`;\n\n    (0, _assert2.default)(_operator1);\n    if (!(_operator1 instanceof _soldier2.default)) {\n      throw new TypeError('A operator 1 unit must be type of Soldier');\n    }\n    if (_recharge < 1000) {\n      throw new TypeError('A vehicle recharge must be greater than 1000');\n    }\n\n    this.operators = [];\n    this.operators.push(_operator1);\n    if (_operator2) {\n      if (!(_operator2 instanceof _soldier2.default)) {\n        throw new TypeError('A operator 2 unit must be type of Soldier');\n      }\n      this.operators.push(_operator2);\n    }\n    if (_operator3) {\n      if (!(_operator3 instanceof _soldier2.default)) {\n        throw new TypeError('A operator 3 unit must be type of Soldier');\n      }\n      this.operators.push(_operator3);\n    }\n  }\n\n  get name() {\n    if (this.isActive()) {\n      return `Vehicle(${this.randomName}) \\x1b[39m{ h:${this.getHealth()}, th:${this.getTotalHealth()}, r:${this.getRecharge()} }`;\n    }\n    return `\\x1b[31m\\x1b[4mVehicle(${this.randomName})\\x1b[0m\\x1b[39m { h:${this.getHealth()}, th:${this.getTotalHealth()}, r:${this.getRecharge()} }`;\n  }\n\n}\nexports.default = Vehicles;\n\n//# sourceURL=webpack:///./src/models/vehicle.js?");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"assert\");\n\n//# sourceURL=webpack:///external_%22assert%22?");

/***/ }),

/***/ "compute-gmean":
/*!********************************!*\
  !*** external "compute-gmean" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"compute-gmean\");\n\n//# sourceURL=webpack:///external_%22compute-gmean%22?");

/***/ }),

/***/ "random-word":
/*!******************************!*\
  !*** external "random-word" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"random-word\");\n\n//# sourceURL=webpack:///external_%22random-word%22?");

/***/ }),

/***/ "readline-promise":
/*!***********************************!*\
  !*** external "readline-promise" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"readline-promise\");\n\n//# sourceURL=webpack:///external_%22readline-promise%22?");

/***/ })

/******/ })));