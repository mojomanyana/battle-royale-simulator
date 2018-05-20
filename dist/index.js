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
eval("\n\nvar _readlinePromise = __webpack_require__(/*! readline-promise */ \"readline-promise\");\n\nvar _readlinePromise2 = _interopRequireDefault(_readlinePromise);\n\nvar _randomWord = __webpack_require__(/*! random-word */ \"random-word\");\n\nvar _randomWord2 = _interopRequireDefault(_randomWord);\n\nvar _soldier = __webpack_require__(/*! ./models/soldier */ \"./src/models/soldier.js\");\n\nvar _soldier2 = _interopRequireDefault(_soldier);\n\nvar _vehicle = __webpack_require__(/*! ./models/vehicle */ \"./src/models/vehicle.js\");\n\nvar _vehicle2 = _interopRequireDefault(_vehicle);\n\nvar _squad = __webpack_require__(/*! ./models/squad */ \"./src/models/squad.js\");\n\nvar _squad2 = _interopRequireDefault(_squad);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst rlp = _readlinePromise2.default.createInterface({\n  input: process.stdin,\n  output: process.stdout,\n  terminal: true\n});\n\nconst rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;\n\nconst createRandomSolder = () => new _soldier2.default(rnd(1, 100), rnd(100, 2000), rnd(1, 50));\n\nconst createRandomVehicle = (...solders) => new _vehicle2.default(rnd(1, 100), rnd(1000, 2000), ...solders);\n\nconst createRandomUnit = () => {\n  if (Math.random() > 0.5) {\n    // Return Solder\n    return createRandomSolder();\n  }\n  // Return Vehicle\n  const numOfOperators = rnd(1, 3);\n  const operators = [];\n  for (let i = 0; i < numOfOperators; i++) {\n    operators.push(createRandomSolder());\n  }\n  return createRandomVehicle(...operators);\n};\n\nconst createRandomSquad = (numberOfUnits, strategy) => {\n  const units = [];\n  for (let i = 0; i < numberOfUnits; i++) {\n    units.push(createRandomUnit());\n  }\n  return new _squad2.default(strategy, ...units);\n};\n\nconst init = callback => {\n  const armies = [];\n  let numberOfArmies;\n  let strategy;\n  let squadsNumber;\n  let unitsPerSquadNumber;\n  rlp.questionAsync('Enter number of armies on battlefield (Please enter number >= 2)? ').then(numberOfArmiesAnswer => {\n    numberOfArmies = numberOfArmiesAnswer;\n    for (let i = 0, p = Promise.resolve(); i < numberOfArmies + 1; i++) {\n      p = p.then(() => new Promise((resolve, reject) => {\n        const armyName = (0, _randomWord2.default)();\n        console.log(`\\n\\n\\n\\n*** Initializing Army(${armyName}) ***\\n\\n`);\n        rlp.questionAsync(`Enter Army(${armyName}) attack strategy (\"random\", \"weakest\", \"strongest\")? `).then(answerStrategy => {\n          strategy = answerStrategy;\n          return rlp.questionAsync(`Enter Army(${armyName}) number of sqads (Please enter number >= 2)? `);\n        }).then(answerSqadsNumber => {\n          squadsNumber = answerSqadsNumber;\n          return rlp.questionAsync(`Enter Army(${armyName}) number of units per sqads (Please enter 5 <= number <= 10)? `);\n        }).then(answerUnitsPerSquadNumber => {\n          unitsPerSquadNumber = answerUnitsPerSquadNumber;\n          return { ArmyName: armyName, sqads: [] };\n        }).then(army => {\n          console.log(`\\n\\n*** Making sqads for Army(${armyName}) ***\\n\\n`);\n          for (let j = 0; j < squadsNumber; j++) {\n            army.sqads.push(createRandomSquad(unitsPerSquadNumber, strategy));\n            console.log(army.sqads[j].toString());\n          }\n          armies.push(army);\n          if (armies.length >= numberOfArmies) {\n            return callback(armies);\n          }\n          return resolve();\n        }).catch(err => {\n          console.log(err);\n          reject(err);\n        });\n      }));\n    }\n    return true;\n  });\n};\n\nrlp.write('\\n******** Welcome to BATTLE ROYALE SIMULATOR!!! ********\\n');\ninit(armies => {\n  rlp.write(`\\n******** ${armies.length} Armies generated!!! ********\\n`);\n  rlp.write('\\n******** Press any key to exit BATTLE ROYALE SIMULATOR!!! ********\\n');\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/models/base/unit.js":
/*!*********************************!*\
  !*** ./src/models/base/unit.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _assert = __webpack_require__(/*! assert */ \"assert\");\n\nvar _assert2 = _interopRequireDefault(_assert);\n\nvar _randomWord = __webpack_require__(/*! random-word */ \"random-word\");\n\nvar _randomWord2 = _interopRequireDefault(_randomWord);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Unit {\n  constructor(_baseHealth, _recharge) {\n    this.getHealth = () => this.baseHealth;\n\n    this.toString = (pref = '\\x1b[39m') => `${pref}Unit`;\n\n    this.getRecharge = () => this.recharge;\n\n    this.getNewtAttackSuccessProbability = () => 0;\n\n    this.getNextAttackDamage = () => 0;\n\n    this.recieveDamage = dmg => {\n      this.baseHealth -= dmg;\n      if (this.baseHealth <= 0) {\n        this.destoryUnit();\n      }\n    };\n\n    this.destoryUnit = () => {\n      this.baseHealth = 0;\n      this.recharge = 0;\n    };\n\n    this.isActive = () => this.baseHealth > 0;\n\n    if (new.target === Unit) {\n      throw new TypeError('Cannot construct Unit instances directly');\n    }\n\n    (0, _assert2.default)(_baseHealth);\n    if (_baseHealth < 0 || _baseHealth > 100) {\n      throw new TypeError('A unit health must be 0 - 100');\n    }\n\n    (0, _assert2.default)(_recharge);\n    if (_recharge < 100 || _recharge > 2000) {\n      throw new TypeError('A unit recharge must be 100 - 2000');\n    }\n\n    this.name = (0, _randomWord2.default)();\n    this.baseHealth = _baseHealth;\n    this.recharge = _recharge;\n  }\n\n}\nexports.default = Unit;\n\n//# sourceURL=webpack:///./src/models/base/unit.js?");

/***/ }),

/***/ "./src/models/soldier.js":
/*!*******************************!*\
  !*** ./src/models/soldier.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _unit = __webpack_require__(/*! ./base/unit */ \"./src/models/base/unit.js\");\n\nvar _unit2 = _interopRequireDefault(_unit);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Soldier extends _unit2.default {\n  constructor(_health, _recharge, _experience) {\n    super(_health, _recharge);\n\n    this.getExperience = () => this.experience;\n\n    this.getNewtAttackSuccessProbability = () => {\n      const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;\n      const prob = 0.5 * (1 + this.getHealth() / 100) * rnd(30 + this.getExperience(), 100) / 100;\n      console.log(`\\x1b[36m*** Soldier(${this.name}) next attack success probability is ${prob} ***\\x1b[39m`);\n      return prob;\n    };\n\n    this.getNextAttackDamage = () => {\n      const dmg = 0.05 + this.getExperience() / 100;\n      console.log(`\\x1b[36m*** Soldier(${this.name}) next attack damage is ${dmg} ***\\x1b[39m`);\n      return dmg;\n    };\n\n    this.toString = (pref = '\\n\\x1b[36m--') => `${pref}Soldier(${this.name}) { h:${this.getHealth()}, r:${this.getRecharge()}, exp:${this.getExperience()} } \\x1b[39m`;\n\n    if (_experience < 0 || _experience > 50) {\n      throw new TypeError('A soldier expiriance must be 0 - 50');\n    }\n\n    this.experience = _experience;\n  }\n\n}\nexports.default = Soldier;\n\n//# sourceURL=webpack:///./src/models/soldier.js?");

/***/ }),

/***/ "./src/models/squad.js":
/*!*****************************!*\
  !*** ./src/models/squad.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _assert = __webpack_require__(/*! assert */ \"assert\");\n\nvar _assert2 = _interopRequireDefault(_assert);\n\nvar _computeGmean = __webpack_require__(/*! compute-gmean */ \"compute-gmean\");\n\nvar _computeGmean2 = _interopRequireDefault(_computeGmean);\n\nvar _randomWord = __webpack_require__(/*! random-word */ \"random-word\");\n\nvar _randomWord2 = _interopRequireDefault(_randomWord);\n\nvar _unit = __webpack_require__(/*! ./base/unit */ \"./src/models/base/unit.js\");\n\nvar _unit2 = _interopRequireDefault(_unit);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Squad {\n  constructor(_strategy, ..._units) {\n    this.getNewtAttackSuccessProbability = () => {\n      const opAttacks = this.units.map(unit => unit.getNewtAttackSuccessProbability());\n      const prob = (0, _computeGmean2.default)(opAttacks);\n      console.log(`\\x1b[35m*** Squad(${this.name}) next attack success probability is ${prob} ***\\x1b[39m`);\n      return prob;\n    };\n\n    this.getNextAttackDamage = () => {\n      const opDmg = this.units.map(unit => unit.getNextAttackDamage());\n      const dmg = opDmg.reduce((a, b) => a + b);\n      console.log(`\\x1b[35m*** Squad(${this.name}) next attack damage is ${dmg} ***\\x1b[39m`);\n      return dmg;\n    };\n\n    this.recieveDamage = dmg => {\n      const numberOfUnits = this.units.length;\n      this.units.forEach(unit => {\n        unit.recieveDamage(dmg / numberOfUnits);\n      });\n    };\n\n    this.toString = (pref = '\\n\\x1b[35m--') => `${pref}Squad(${this.name}) { nou:${this.units.length} }${this.units.map(operator => operator.toString())}\\x1b[39m`;\n\n    (0, _assert2.default)(_strategy);\n    (0, _assert2.default)(_units);\n    (0, _assert2.default)(_units.length > 0);\n\n    this.units = [];\n    _units.forEach(unit => {\n      if (unit instanceof _unit2.default) {\n        this.units.push(unit);\n      } else {\n        throw new TypeError('A unit must be type of Unit');\n      }\n    });\n\n    if (_strategy !== 'random' && _strategy !== 'weakest' && _strategy !== 'strongest') {\n      throw new TypeError('A strategy must be string type of value: \"random\", \"weakest\" or \"strongest\"');\n    }\n    this.strategy = _strategy;\n    this.name = (0, _randomWord2.default)();\n  }\n\n}\nexports.default = Squad;\n\n//# sourceURL=webpack:///./src/models/squad.js?");

/***/ }),

/***/ "./src/models/vehicle.js":
/*!*******************************!*\
  !*** ./src/models/vehicle.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _assert = __webpack_require__(/*! assert */ \"assert\");\n\nvar _assert2 = _interopRequireDefault(_assert);\n\nvar _computeGmean = __webpack_require__(/*! compute-gmean */ \"compute-gmean\");\n\nvar _computeGmean2 = _interopRequireDefault(_computeGmean);\n\nvar _unit = __webpack_require__(/*! ./base/unit */ \"./src/models/base/unit.js\");\n\nvar _unit2 = _interopRequireDefault(_unit);\n\nvar _soldier = __webpack_require__(/*! ./soldier */ \"./src/models/soldier.js\");\n\nvar _soldier2 = _interopRequireDefault(_soldier);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Vehicles extends _unit2.default {\n  constructor(_health, _recharge, _operator1, _operator2 = null, _operator3 = null) {\n    super(_health, _recharge);\n\n    this.getNumberOfOperators = () => this.operators.length;\n\n    this.getHealth = () => {\n      const healths = this.operators.map(operator => operator.getHealth());\n      const sum = this.baseHealth + healths.reduce((a, b) => a + b, 0);\n      return sum / this.operators.length + 1;\n    };\n\n    this.getNewtAttackSuccessProbability = () => {\n      const opAttacks = this.operators.map(operator => operator.getNewtAttackSuccessProbability());\n      const prob = 0.5 * (1 + this.getHealth() / 100) * (0, _computeGmean2.default)(opAttacks);\n      console.log(`\\x1b[34m*** Vehicles(${this.name}) next attack success probability is ${prob} ***\\x1b[39m`);\n      return prob;\n    };\n\n    this.getNextAttackDamage = () => {\n      const opExperiances = this.operators.map(operator => operator.getExperience() / 100);\n      const dmg = 0.1 + opExperiances.reduce((a, b) => a + b);\n      console.log(`\\x1b[34m*** Vehicles(${this.name}) next attack damage is ${dmg} ***\\x1b[39m`);\n      return dmg;\n    };\n\n    this.recieveDamage = dmg => {\n      this.baseHealth -= 0.3 * dmg;\n      const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;\n      const i = rnd(1, this.operators.length);\n      this.operators[i - 1].recieveDamage(0.5 * dmg);\n\n      if (this.operators.length === 1) {\n        this.baseHealth -= 0.2 * dmg;\n      } else if (this.operators.length === 2) {\n        this.operators[i - 1 === 0 ? 1 : 0].recieveDamage(0.2 * dmg);\n      } else if (this.operators.length === 3) {\n        this.operators.forEach((operator, j) => {\n          if (i - 1 !== j) {\n            this.operators[j].recieveDamage(0.1 * dmg);\n          }\n        });\n      }\n    };\n\n    this.destroyUnit = () => {\n      this.operators.forEach(operator => operator.destoryUnit());\n      super.destroyUnit();\n    };\n\n    this.toString = (pref = '\\n\\x1b[34m--') => `${pref}Vehicle(${this.name}) { h:${this.getHealth()}, r:${this.getRecharge()} }${this.operators.map(operator => operator.toString(`${pref}-`))}\\x1b[39m`;\n\n    (0, _assert2.default)(_operator1);\n    if (!(_operator1 instanceof _soldier2.default)) {\n      throw new TypeError('A operator 1 unit must be type of Soldier');\n    }\n    if (_recharge < 1000) {\n      throw new TypeError('A vehicle recharge must be greater than 1000');\n    }\n\n    this.operators = [];\n    this.operators.push(_operator1);\n    if (_operator2) {\n      if (!(_operator2 instanceof _soldier2.default)) {\n        throw new TypeError('A operator 2 unit must be type of Soldier');\n      }\n      this.operators.push(_operator2);\n    }\n    if (_operator3) {\n      if (!(_operator3 instanceof _soldier2.default)) {\n        throw new TypeError('A operator 3 unit must be type of Soldier');\n      }\n      this.operators.push(_operator3);\n    }\n  }\n\n}\nexports.default = Vehicles;\n\n//# sourceURL=webpack:///./src/models/vehicle.js?");

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