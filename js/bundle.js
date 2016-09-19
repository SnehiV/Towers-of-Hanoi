/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiGame = __webpack_require__(1);
	const HanoiView = __webpack_require__(2);

	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function HanoiView(game, rootEl) {
	  this.game = game;
	  this.rootEl = rootEl;
	  this.liTowers = [];
	  this.fromTower = null;
	  this.setupTowers();
	  this.render();
	  this.clickTower();
	}

	HanoiView.prototype.setupTowers = function() {
	  for (var i = 0; i < 3; i++) {
	    const $tower = $('<ul></ul>');
	    $tower.data('id', i);
	    let liTower = [];
	    for (var j = 0; j < 3; j++) {
	      const $block = $('<li></li>');
	      $tower.append($block);
	      liTower.push($block);
	    }
	    this.liTowers.push(liTower);
	    this.rootEl.append($tower);
	  }
	};

	HanoiView.prototype.render = function() {
	  for (var i = 0; i < this.liTowers.length; i++) {
	    let gametower = this.game.towers[i];
	    let liTower = this.liTowers[i];

	    for (var j = 0; j < liTower.length; j++) {
	      const liIdx = liTower.length - j - 1;
	      let discValue = gametower[j];
	      liTower[liIdx].removeClass();

	      if (discValue) {
	        liTower[liIdx].addClass('disc');
	        liTower[liIdx].addClass(`disc-${discValue}`);
	      }
	    }
	  }
	};

	HanoiView.prototype.clickTower = function() {
	  const $towers = $('ul');
	  $towers.on("click", event => {
	    let $tower = $(event.currentTarget);
	    if (this.fromTower !== null) {
	      this.playMove($tower);
	    } else {
	      this.fromTower = $tower;
	      this.fromTower.addClass('fromTower');
	    }
	    this.render();
	    this.checkWin();
	  });
	};

	HanoiView.prototype.checkWin = function() {
	  if (this.game.isWon()) {
	    const $grid = $('.hanoi');
	    const $winMessage = $('<strong>Congrats!</strong>');
	    $grid.append($winMessage);
	  }
	};

	HanoiView.prototype.playMove = function(toTower) {
	  let turn = this.game.move(this.fromTower.data('id'), toTower.data('id'));
	  this.fromTower.removeClass('fromTower');
	  this.fromTower = null;

	  if (!turn) {
	    alert("Invalid move");
	  }
	};

	module.exports = HanoiView;


/***/ }
/******/ ]);