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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _menu = __webpack_require__(1);

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _menu2.default();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _querySelector = __webpack_require__(2);

var _querySelector2 = _interopRequireDefault(_querySelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Menu = function () {
  function Menu() {
    _classCallCheck(this, Menu);

    this.options = {
      btnClassName: 'uc-menu-btn',
      activeClassName: '_active',
      openTargetDataName: 'data-open-target'
    };

    this._init();
  }

  _createClass(Menu, [{
    key: '_init',
    value: function _init() {
      (0, _querySelector2.default)('.' + this.options.btnClassName, 'click', this.openMenu.bind(this));
    }
  }, {
    key: 'openMenu',
    value: function openMenu(e) {
      e.preventDefault();

      var btn = e.currentTarget;
      var menu = (0, _querySelector2.default)(btn.getAttribute(this.options.openTargetDataName))[0];

      this.toggleClass(menu, this.options.activeClassName);
      this.toggleClass(btn, this.options.activeClassName);
    }
  }, {
    key: 'toggleClass',
    value: function toggleClass(element, className) {
      if (element.classList) {
        element.classList.toggle(className);
      } else {
        var classes = element.className.split(' ');
        var existingIndex = classes.indexOf(className);

        if (existingIndex >= 0) {
          classes.splice(existingIndex, 1);
        } else {
          classes.push(className);
        }

        element.className = classes.join(' ');
      }
    }
  }]);

  return Menu;
}();

exports.default = Menu;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var $ = function $(element) {
  var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var nodeList = document.querySelectorAll(element);

  if (!event) {
    return nodeList;
  } else {
    for (var i = nodeList.length; i--;) {
      nodeList[i].addEventListener(event, callback, options);
    }
  }
};

exports.default = $;

/***/ })
/******/ ]);