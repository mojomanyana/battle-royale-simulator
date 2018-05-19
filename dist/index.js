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
eval("\n\nvar _soldier = __webpack_require__(/*! ./models/soldier */ \"./src/models/soldier.js\");\n\nvar _soldier2 = _interopRequireDefault(_soldier);\n\nvar _vehicle = __webpack_require__(/*! ./models/vehicle */ \"./src/models/vehicle.js\");\n\nvar _vehicle2 = _interopRequireDefault(_vehicle);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst test = (a, b) => a + b;\n\nconsole.log('10 + 20', test(10, 20));\nconsole.log('10 + 30', test(10, 30));\n\nconst sol1 = new _soldier2.default(20, 200, 1);\nconst sol2 = new _soldier2.default(20, 200, 1);\nconst sol3 = new _soldier2.default(20, 200, 1);\nconst sol4 = new _soldier2.default(20, 200, 1);\nconst sol5 = new _soldier2.default(20, 200, 1);\n\nconst veh1 = new _vehicle2.default(20, 1200, sol1, sol2);\nveh1.getNewtAttackSuccessProbability();\nveh1.getNextAttackDamage();\nconst veh2 = new _vehicle2.default(20, 1200, sol3, sol4, sol5);\nveh2.getNewtAttackSuccessProbability();\nveh2.getNextAttackDamage();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/models/base/baseUnit.js":
/*!*************************************!*\
  !*** ./src/models/base/baseUnit.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _assert = __webpack_require__(/*! assert */ \"assert\");\n\nvar _assert2 = _interopRequireDefault(_assert);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass BaseUnit {\n  constructor(_baseHealth, _recharge) {\n    this.getBaseHealth = () => this.baseHealth;\n\n    this.getRecharge = () => this.recharge;\n\n    if (new.target === BaseUnit) {\n      throw new TypeError('Cannot construct BaseUnit instances directly');\n    }\n\n    (0, _assert2.default)(_baseHealth);\n    if (_baseHealth < 0 || _baseHealth > 100) {\n      throw new TypeError('A unit health must be 0 - 100');\n    }\n\n    (0, _assert2.default)(_recharge);\n    if (_recharge < 100 || _recharge > 2000) {\n      throw new TypeError('A unit recharge must be 100 - 2000');\n    }\n\n    this.baseHealth = _baseHealth;\n    this.recharge = _recharge;\n  }\n\n}\nexports.default = BaseUnit;\n\n//# sourceURL=webpack:///./src/models/base/baseUnit.js?");

/***/ }),

/***/ "./src/models/soldier.js":
/*!*******************************!*\
  !*** ./src/models/soldier.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _assert = __webpack_require__(/*! assert */ \"assert\");\n\nvar _assert2 = _interopRequireDefault(_assert);\n\nvar _baseUnit = __webpack_require__(/*! ./base/baseUnit */ \"./src/models/base/baseUnit.js\");\n\nvar _baseUnit2 = _interopRequireDefault(_baseUnit);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Soldier extends _baseUnit2.default {\n  constructor(_health, _recharge, _soldierExperience) {\n    super(_health, _recharge);\n\n    this.getHealth = () => this.getBaseHealth();\n\n    this.getExperience = () => this.soldierExperience;\n\n    this.getNewtAttackSuccessProbability = () => {\n      const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;\n      const prob = 0.5 * (1 + this.getHealth() / 100) * rnd(30 + this.getExperience(), 100) / 100;\n      console.log(`Soldier next attack success probability is ${prob}`);\n      return prob;\n    };\n\n    this.getNextAttackDamage = () => {\n      const dmg = 0.05 + this.soldierExperience / 100;\n      console.log(`Soldier next attack damage is ${dmg}`);\n      return dmg;\n    };\n\n    this.destoryUnit = () => {\n      this.baseHealth = 0;\n    };\n\n    (0, _assert2.default)(_soldierExperience);\n    if (_soldierExperience < 0 || _soldierExperience > 50) {\n      throw new TypeError('A soldier expiriance must be 0 - 50');\n    }\n\n    this.soldierExperience = _soldierExperience;\n    console.log(`\\x1b[34m***Soldier unit created { h:${this.getHealth()}, r:${this.getRecharge()}, exp:${this.getExperience()} }***\\x1b[39m`);\n  }\n\n}\nexports.default = Soldier;\n\n//# sourceURL=webpack:///./src/models/soldier.js?");

/***/ }),

/***/ "./src/models/vehicle.js":
/*!*******************************!*\
  !*** ./src/models/vehicle.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _assert = __webpack_require__(/*! assert */ \"assert\");\n\nvar _assert2 = _interopRequireDefault(_assert);\n\nvar _computeGmean = __webpack_require__(/*! compute-gmean */ \"compute-gmean\");\n\nvar _computeGmean2 = _interopRequireDefault(_computeGmean);\n\nvar _baseUnit = __webpack_require__(/*! ./base/baseUnit */ \"./src/models/base/baseUnit.js\");\n\nvar _baseUnit2 = _interopRequireDefault(_baseUnit);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Vehicles extends _baseUnit2.default {\n  constructor(_health, _recharge, _operator1, _operator2 = null, _operator3 = null) {\n    super(_health, _recharge);\n\n    this.getNumberOfOperators = () => this.operators.length;\n\n    this.getHealth = () => {\n      const healths = this.operators.map(operator => operator.getHealth());\n      const sum = this.baseHealth + healths.reduce((a, b) => a + b, 0);\n      return sum / this.operators.length + 1;\n    };\n\n    this.getNewtAttackSuccessProbability = () => {\n      const opAttacks = this.operators.map(operator => operator.getNewtAttackSuccessProbability());\n      const prob = 0.5 * (1 + this.getHealth() / 100) * (0, _computeGmean2.default)(opAttacks);\n      console.log(`Vehicles next attack success probability is ${prob}`);\n      return prob;\n    };\n\n    this.getNextAttackDamage = () => {\n      const opExperiances = this.operators.map(operator => operator.getExperience() / 100);\n      const dmg = 0.1 + opExperiances.reduce((a, b) => a + b);\n      console.log(`Vehicles next attack damage is ${dmg}`);\n      return dmg;\n    };\n\n    this.destroyUnit = () => {\n      this.operators.forEach(operator => operator.destoryUnit());\n      this.baseHealth = 0;\n    };\n\n    (0, _assert2.default)(_operator1);\n    if (_recharge < 1000) {\n      throw new TypeError('A vehicle recharge must be greater than 1000');\n    }\n\n    this.operators = [];\n    // TODO: check if _operator1,2,3 is instance of class Soldier\n    this.operators.push(_operator1);\n    if (_operator2) {\n      this.operators.push(_operator2);\n    }\n    if (_operator3) {\n      this.operators.push(_operator3);\n    }\n    console.log(`\\x1b[34m***Vehicle unit created { h:${this.getHealth()}, r:${this.getRecharge()}, noo:${this.getNumberOfOperators()} }***\\x1b[39m`);\n  }\n\n}\nexports.default = Vehicles;\n\n//# sourceURL=webpack:///./src/models/vehicle.js?");

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

/***/ })

/******/ })));