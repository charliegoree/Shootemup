/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
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
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("lowdb");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lowdb__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lowdb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lowdb__);


const data = __WEBPACK_IMPORTED_MODULE_0_lowdb___default()('database.json');
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
//teclas
var cursors;
var fireButton;

//naves
var space;
//armas
var normalShoot;

function preload() {
	game.load.image('shoot1', './assets/img/shoot1.png', 16, 16);
	game.load.spritesheet('space1', './assets/img/spaceSprites.png', 32, 32);
}

function create() {
	//nave
	space = game.add.sprite(300, 200, 'space1');
	space.animations.add('normal', [0, 1, 2, 3, 4, 5, 6, 7]);
	space.animations.add('izquierda', [8, 9, 10, 11, 12, 13, 14]);
	space.animations.add('derecha', [15, 16, 17, 18, 19, 20, 21]);
	game.physics.arcade.enable(space);
	space.animations.play('normal', 16, true);
	//armas
	normalShoot = game.add.weapon(30, 'shoot1');
	normalShoot.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	normalShoot.bulletAngleOffset = 90;
	normalShoot.bulletSpeed = 400;
	normalShoot.fireRate = 30;
	//teclas
	cursors = this.input.keyboard.createCursorKeys();
	fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
}

function update() {
	naveAct();
	naveDraw();
}

//MANEJO NAVE

function naveAct() {
	space.body.velocity.x = 0;
	space.body.velocity.y = 0;
	if (cursors.left.isDown) {
		space.body.velocity.x = -200;
	}
	if (cursors.right.isDown) {
		space.body.velocity.x = 200;
	}
	if (cursors.up.isDown) {
		space.body.velocity.y = -150;
	}
	if (cursors.down.isDown) {
		space.body.velocity.y = 150;
	}
	if (fireButton.isDown) {
		normalShoot.fire();
	}
}
function naveDraw() {
	if (space.body.velocity.x > 50) {
		space.animations.play('derecha', 16, true);
	}
	if (space.body.velocity.x < -50) {
		space.animations.play('izquierda', 16, true);
	}
	if (space.body.velocity.x > -50 && space.body.velocity.x < 50) {
		space.animations.play('normal', 16, true);
	}
}

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map