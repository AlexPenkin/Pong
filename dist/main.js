/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(2);
var game = new Game_1.default();


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Canvas_1 = __webpack_require__(3);
var Game = (function () {
    function Game() {
        this.canvas = new Canvas_1.default({
            selector: 'root'
        });
    }
    return Game;
}());
exports.default = Game;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Canvas = (function () {
    function Canvas(settings) {
        this.canvasSelector = settings.selector;
        this.canvasSize = settings.size;
        this.init(settings);
    }
    Canvas.prototype.setSize = function (size) {
        if (size && size.height && size.width) {
            this.canvas.height = size.width;
            this.canvas.width = size.height;
        }
        else if (size && size.width) {
            this.canvas.height = window.innerHeight - 50;
            this.canvas.width = size.width;
        }
        else if (size && size.height) {
            this.canvas.height = size.height;
            this.canvas.width = window.innerWidth - 50;
        }
        else {
            this.canvas.height = window.innerHeight - 50;
            this.canvas.width = window.innerWidth - 50;
        }
    };
    Canvas.prototype.init = function (settings) {
        var selector = settings.selector || 'root';
        this.canvas = document.getElementById(selector);
        this.context = this.canvas.getContext('2d');
        this.setSize(settings.size);
    };
    Canvas.prototype.getContext = function () {
        return this.context;
    };
    Canvas.prototype.getCanvas = function () {
        return this.canvas;
    };
    return Canvas;
}());
exports.default = Canvas;
;


/***/ })
/******/ ]);