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
/***/ function(module, exports) {

	'use strict';

	var findParentId = function findParentId(element) {
	  var target = element.parentNode;
	  var id = element.dataset.id;

	  while (id === undefined && target != undefined) {
	    id = target.dataset.id;
	    target = target.parentNode;
	  }

	  return id;
	};

	var deckClicked = function deckClicked(event) {
	  var id = findParentId(event.target);

	  window.location = '/deck/edit/' + id;
	};

	var timer = function () {
	  var ids = {};

	  return {
	    timeout: function timeout(id, fn) {
	      var time = arguments.length <= 2 || arguments[2] === undefined ? 1500 : arguments[2];
	      return ids[id] = window.setTimeout(fn, time);
	    },
	    cancel: function cancel(id) {
	      return ids[id] !== undefined ? window.clearTimeout(ids[id]) : '';
	    }
	  };
	}();

	var deckMouseover = function deckMouseover(event) {
	  var id = findParentId(event.target);
	  var wrapper = event.target.querySelector('.toggle-wrapper');

	  if (wrapper) {
	    timer.cancel(id);

	    wrapper.style.display = 'block';
	    timer.timeout(id, function () {
	      return wrapper.style.display = 'none';
	    });
	  }
	};

	Array.from(document.getElementsByClassName('deck')).forEach(function (element) {
	  return element.addEventListener('click', deckClicked);
	});

	Array.from(document.getElementsByClassName('deck')).forEach(function (element) {
	  return element.addEventListener('mouseover', deckMouseover);
	});

/***/ }
/******/ ]);
