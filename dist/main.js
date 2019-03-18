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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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

/***/ "./src/cursor.js":
/*!***********************!*\
  !*** ./src/cursor.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const imagePromise = __webpack_require__(/*! ./imagePromise */ \"./src/imagePromise.js\");\n\nclass Cursor {\n  constructor(context, map) {\n    this.context = context;\n    this.map = map;\n    this.x = 0;\n    this.y = 0;\n    this.image = new Image();\n    this.imagePromise = imagePromise('../src/OrangeStarSprites.png', this.image);\n    this.imagePosition = [286, 127];\n    this.imageSize = [212, 234];\n\n    this.render = this.render.bind(this);\n    this.move = this.move.bind(this);\n  }\n\n  render() {\n    this.context.drawImage(\n      this.image,\n      this.imagePosition[0], \n      this.imagePosition[1], \n      this.imageSize[0],\n      this.imageSize[1],\n      this.x * this.map.gameTileSize,\n      this.y * this.map.gameTileSize, \n      52, \n      57\n    );\n  }\n\n  move(dx, dy) {\n    this.x += dx;\n    this.y += dy;\n\n    let maxX = (this.map.cols - 1);\n    let maxY = (this.map.rows - 1);\n    this.x = Math.max(0, Math.min(this.x, maxX));\n    this.y = Math.max(0, Math.min(this.y, maxY));\n  }\n}\n\nmodule.exports = Cursor;\n\n//# sourceURL=webpack:///./src/cursor.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Map = __webpack_require__(/*! ./map */ \"./src/map.js\");\nconst Keyboard = __webpack_require__(/*! ./keyboard */ \"./src/keyboard.js\");\nconst Cursor = __webpack_require__(/*! ./cursor */ \"./src/cursor.js\");\n\nclass Game {\n  constructor(context) {\n    this.context = context;\n    this.player1 = new Player([new Infantry()], \"../src/OrangeStarSprites.png\");\n    this.player2 = new Player([new Infantry()], \"../src/BlueMoonSprites.png\");\n    this.map = new Map(this.context);\n    this.keyboard = new Keyboard();\n    this.cursor = new Cursor(this.context, this.map);\n\n    this.hold = {L: 0, \"R\": 0, \"U\": 0, \"D\": 0 };\n    Promise.all([this.cursor.imagePromise, this.map.imagePromise]).then(\n      () => this.tick()\n    );\n  }\n\n  start() {\n\n  }\n\n  won() {\n\n  }\n\n  load() {\n\n  }\n\n  init() {\n\n  }\n\n  update() {\n\n    let dx = 0;\n    let dy = 0;\n    if (this.keyboard.isPressed(Keyboard.LEFT)) { if (this.hold.L % 5 === 0) {dx = -1;} this.hold.L++; }\n    else if (this.keyboard.isPressed(Keyboard.RIGHT)) { if (this.hold.R % 5 === 0) {dx = 1;} this.hold.R++; }\n    else if (this.keyboard.isPressed(Keyboard.UP)) { if (this.hold.U % 5 === 0) {dy = -1;} this.hold.U++; }\n    else if (this.keyboard.isPressed(Keyboard.DOWN)) { if (this.hold.D % 5 === 0) {dy = 1;} this.hold.D++; }\n\n    this.cursor.move(dx, dy);\n  }\n\n  render() {\n    this.map.render();\n    this.cursor.render();\n  }\n\n  tick() {\n    window.requestAnimationFrame(this.tick.bind(this));\n    this.context.clearRect(0, 0, 800, 600);\n\n    this.update();\n    this.render();\n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/imagePromise.js":
/*!*****************************!*\
  !*** ./src/imagePromise.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nfunction imagePromise(src, image) {\n  // const image = new Image();\n  image.src = src;\n  return new Promise((resolve) => {\n    image.onload = () => {\n      resolve(image);\n    };\n  });\n}\n\nmodule.exports = imagePromise;\n\n//# sourceURL=webpack:///./src/imagePromise.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Cursor = __webpack_require__(/*! ./cursor */ \"./src/cursor.js\");\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  const canvas = document.getElementById('canvas');\n  const context = canvas.getContext('2d');\n  \n  let unitImage;\n  let x = [705, 660];\n  let y = 106;\n  let fps = 2;\n  let now;\n  let then = Date.now();\n  let interval = 1000/fps;\n  let delta;\n\n  const game = new Game(context);\n  // loadResources();\n  \n  // function loadResources() {\n  //   unitImage = new Image();\n  //   unitImage.src = '../src/sprites.png';\n  // }\n\n  // unitImage.onload = () => {\n  //   animate();\n  // };\n\n  // function animate() {\n  //   requestAnimationFrame(animate);\n\n  //   now = Date.now();\n  //   delta = now - then;\n\n  //   if (delta > interval) {\n\n  //     then = now - (delta % interval);\n  //     next_x = x.pop();\n  //     x.unshift(next_x);\n  //     context.clearRect(100, 100, 40, 40);\n  //     context.drawImage(\n  //       unitImage,\n  //       x[0], y, 40, 40,\n  //       100, 100, 40, 40\n  //     );\n  //   }\n  // }\n\n});\n  \n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/keyboard.js":
/*!*************************!*\
  !*** ./src/keyboard.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass Keyboard {\n  constructor() {\n    this.keys = {};\n\n    window.onkeydown = ({keyCode}) => {\n      console.log(keyCode);\n      this.keys[keyCode] = true;\n    };\n\n    window.onkeyup = ({keyCode}) => {\n      this.keys[keyCode] = false;\n    };\n\n    this.isPressed = this.isPressed.bind(this);\n  }\n\n  isPressed(keyCode) {\n    return this.keys[keyCode] === true;\n  }\n}\n\nKeyboard.LEFT = 37;\nKeyboard.UP = 38;\nKeyboard.RIGHT = 39;\nKeyboard.DOWN = 40;\n\nmodule.exports = Keyboard;\n\n//# sourceURL=webpack:///./src/keyboard.js?");

/***/ }),

/***/ "./src/map.js":
/*!********************!*\
  !*** ./src/map.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const imagePromise = __webpack_require__(/*! ./imagePromise */ \"./src/imagePromise.js\");\n\nclass Map {\n  constructor(context) {\n    this.context = context;\n    this.cols = 15;\n    this.rows = 10;\n    this.gameTileSize = this.context.canvas.height / 10;\n    this.imageTileSize = 16;\n    this.tiles = [\n      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1,\n      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 8, 1,\n      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 8, 1,\n      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1,\n      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1,\n      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 1,\n      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1,\n      1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1,\n      6, 6, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 1,\n      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1\n    ];\n\n    this.unitMap = [\n      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,\n      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,\n      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,\n      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0,\n      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,\n      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,\n      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,\n      0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,\n      0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,\n      0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0\n    ];\n\n    this.image = new Image();\n    this.imagePromise = imagePromise(\"../src/map_parts_1.png\", this.image);\n\n    this.getTile = this.getTile.bind(this);\n    this.render = this.render.bind(this);\n\n  }\n\n  getTile(col, row) {\n    return this.tiles[row * this.cols + col];\n  }\n\n  render() {\n    for (var col = 0; col < this.cols; col++) {\n      for (var row = 0; row < this.rows; row++) {\n        var tile = this.getTile(col, row);\n        if (tile !== 0) { // 0 => empty tile\n          this.context.drawImage(\n            this.image, // image\n            Map.imageTileLoc[tile][0], // source x\n            Map.imageTileLoc[tile][1], // source y\n            this.imageTileSize, // source width\n            this.imageTileSize, // source height\n            col * this.gameTileSize,  // target x\n            row * this.gameTileSize, // target y\n            this.gameTileSize, // target width\n            this.gameTileSize // target height\n          );\n        }\n      }\n    }\n  }\n\n}\n\nMap.imageTileLoc = {\n  1: [464, 0],\n  2: [0, 288],\n  3: [0, 304],\n  4: [96, 288],\n  5: [96, 304],\n  6: [320, 160],\n  7: [416, 176],\n  8: [336, 176],\n  9: [272, 160],\n};\n\nmodule.exports = Map;\n\n//# sourceURL=webpack:///./src/map.js?");

/***/ })

/******/ });