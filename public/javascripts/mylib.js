var mylib =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/library.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/library.js":
/*!************************!*\
  !*** ./src/library.js ***!
  \************************/
/*! exports provided: myTable, myTableOnline, myGraph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"myTable\", function() { return myTable; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"myTableOnline\", function() { return myTableOnline; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"myGraph\", function() { return myGraph; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var vis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vis */ \"vis\");\n/* harmony import */ var vis__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vis__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nfunction myTable(container, data, options){\n  var data_obj = data;\n  \n  if (typeof options.pager === \"undefined\") options.pager = {};\n  var page_size = typeof options.pager.page_size !== \"undefined\" ? options.pager.page_size : 10;\n  var pager_size = typeof options.pager.pager_size !== \"undefined\" ? options.pager.pager_size : 10;\n  var pager_front = typeof options.pager.pager_front !== \"undefined\" ? options.pager.pager_front : 1;\n  var pager_active = typeof options.pager.pager_active !== \"undefined\" ? options.pager.pager_active : 1;\n\n  container.innerHTML = '\\\n      <table class=\"table table-bordered table-hover col-md-10\" id=\"ip_table\">\\\n          <thead></thead>\\\n          <tbody></tbody>\\\n      </table>\\\n      <nav class=\"col-md-10\" id=\"pager\">\\\n          <ul class=\"pagination\">\\\n              <li id=\"prev\">\\\n                  <a aria-label=\"Previous\">\\\n                      <span aria-hidden=\"true\">&laquo;</span>\\\n                  </a>\\\n              </li>\\\n              <li class=\"active\"><a>1</a></li>\\\n              <li id=\"next\">\\\n                  <a aria-label=\"Next\">\\\n                      <span aria-hidden=\"true\">&raquo;</span>\\\n                  </a>\\\n              </li>\\\n          </ul>\\\n      </nav>'\n  refresh();\n\n  function on_pager_click(e){\n    var c=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr(\"class\");\n    var last = Math.ceil(data_obj.body.length/page_size);\n    if (c == 'page-link ff'){\n      pager_active=Math.min( pager_front+pager_size, last );\n      pager_front=pager_active;\n    }else if (c == 'page-link fb'){\n      pager_active=Math.max( pager_front-1, 1 );\n      pager_front=Math.max( pager_active-pager_size+1, 1 );\n    }else if (c == 'page-link front'){\n      pager_active=1;\n      pager_front=1;\n    }else if (c == 'page-link end'){\n      pager_active=last;\n      pager_front=Math.max( pager_active-pager_size+1, 1 );\n    }else{\n      pager_active=parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).html());\n    }\n    refresh();\n  }\n\n  function refresh(){\n    //fill pager\n    var pager = jquery__WEBPACK_IMPORTED_MODULE_0___default()(container).find('#pager');\n    pager.find(\"li\").remove();\n    pager.find(\"ul\").append(\"<li id='front' class='page-item'><a class='page-link front' href='#' aria-label='Previous'><span aria-hidden='true'>&laquo;</span><span class='sr-only'>Previous</span></a></li>\");\n    if (pager_front>1){\n      pager.find(\"ul\").append(\"<li class='page-item'><a class='page-link fb' href='#'>...</a></li>\");\n    }\n    var last = Math.ceil(data_obj.body.length/page_size);\n    for (var i=pager_front; i<Math.min(pager_front+pager_size, last+1); i++){\n      if (i == pager_active){\n        pager.find(\"ul\").append(\"<li class='page-item active'><a class='page-link' href='#'>\"+(i).toString()+\"</a></li>\");\n      }else{\n        pager.find(\"ul\").append(\"<li class='page-item'><a class='page-link' href='#'>\"+(i).toString()+\"</a></li>\");\n      }\n    }\n    if (last > pager_front+pager_size-1){\n      pager.find(\"ul\").append(\"<li class='page-item'><a class='page-link ff' href='#'>...</a></li>\");\n    }\n    pager.find(\"ul\").append(\"<li id='end' class='page-item'><a class='page-link end' href='#' aria-label='Next'><span aria-hidden='true'>&raquo;</span><span class='sr-only'>Next</span></a></li>\");\n    pager.find(\"li\").find(\"a\").click(on_pager_click); \n    \n    //fill table.\n    var tbl = jquery__WEBPACK_IMPORTED_MODULE_0___default()(container).find('#ip_table');\n    ///header.\n    tbl.find('thead tr').remove();\n    tbl.find('thead').append('<tr></tr>');\n    for (var i in data_obj.head){\n      var h = data_obj.head[i];\n      tbl.find('thead tr').append('<th>'+h+'</th>');\n    }\n    ///body.\n    tbl.find('tbody tr').remove();\n    for (var i=(pager_active-1)*page_size; i<Math.min(pager_active*page_size, data_obj.body.length); i++){\n      var r = data_obj.body[i];\n      tbl.find('tbody').append('<tr></tr>');\n      var row = tbl.find('tbody tr:last');\n      row.append('<td>'+i.toString()+'</td>');\n      for (var j in r){\n        row.append('<td>'+r[j]+'</td>');\n      }\n    }\n  }\n  \n  return {\n    'refresh': refresh\n  };\n}\n\nfunction myTableOnline(container, request, options){\n  var data_obj;\n  if (typeof options.pager === \"undefined\") options.pager = {};\n  myTableOnline.prototype.page_size = typeof options.pager.page_size !== \"undefined\" ? options.pager.page_size : 10;\n  var pager_size = typeof options.pager.pager_size !== \"undefined\" ? options.pager.pager_size : 10;\n  myTableOnline.prototype.pager_front = typeof options.pager.pager_front !== \"undefined\" ? options.pager.pager_front : 1;\n  var pager_active = typeof options.pager.pager_active !== \"undefined\" ? options.pager.pager_active : 1;\n\n  container.innerHTML = '\\\n      <table class=\"table table-bordered table-hover col-md-10\" id=\"ip_table\">\\\n          <thead></thead>\\\n          <tbody></tbody>\\\n      </table>\\\n      <nav class=\"col-md-10\" id=\"pager\">\\\n          <ul class=\"pagination\">\\\n              <li id=\"prev\">\\\n                  <a aria-label=\"Previous\">\\\n                      <span aria-hidden=\"true\">&laquo;</span>\\\n                  </a>\\\n              </li>\\\n              <li class=\"active\"><a>1</a></li>\\\n              <li id=\"next\">\\\n                  <a aria-label=\"Next\">\\\n                      <span aria-hidden=\"true\">&raquo;</span>\\\n                  </a>\\\n              </li>\\\n          </ul>\\\n      </nav>'\n\n  myTableOnline.prototype.refresh = function(d){\n    data_obj = d;\n    //fill pager\n    var pager = jquery__WEBPACK_IMPORTED_MODULE_0___default()(container).find('#pager');\n    pager.find(\"li\").remove();\n    pager.find(\"ul\").append(\"<li id='front' class='page-item'><a class='page-link front' href='#' aria-label='Previous'><span aria-hidden='true'>&laquo;</span><span class='sr-only'>Previous</span></a></li>\");\n    if (this.pager_front>1){\n      pager.find(\"ul\").append(\"<li class='page-item'><a class='page-link fb' href='#'>...</a></li>\");\n    }\n    var last = Math.ceil(data_obj.body.length/this.page_size);\n    for (var i=this.pager_front; i<Math.min(this.pager_front+pager_size, last+1); i++){\n      if (i == pager_active){\n        pager.find(\"ul\").append(\"<li class='page-item active'><a class='page-link' href='#'>\"+(i).toString()+\"</a></li>\");\n      }else{\n        pager.find(\"ul\").append(\"<li class='page-item'><a class='page-link' href='#'>\"+(i).toString()+\"</a></li>\");\n      }\n    }\n    if (last > this.pager_front+pager_size-1){\n      pager.find(\"ul\").append(\"<li class='page-item'><a class='page-link ff' href='#'>...</a></li>\");\n    }\n    pager.find(\"ul\").append(\"<li id='end' class='page-item'><a class='page-link end' href='#' aria-label='Next'><span aria-hidden='true'>&raquo;</span><span class='sr-only'>Next</span></a></li>\");\n    pager.find(\"li\").find(\"a\").click(on_pager_click); \n    \n    //fill table.\n    var tbl = jquery__WEBPACK_IMPORTED_MODULE_0___default()(container).find('#ip_table');\n    ///header.\n    tbl.find('thead tr').remove();\n    tbl.find('thead').append('<tr></tr>');\n    for (var i in data_obj.head){\n      var h = data_obj.head[i];\n      tbl.find('thead tr').append('<th>'+h+'</th>');\n    }\n    ///body.\n    tbl.find('tbody tr').remove();\n    for (var i in data_obj.body){\n      var r = data_obj.body[i];\n      tbl.find('tbody').append('<tr></tr>');\n      var row = tbl.find('tbody tr:last');\n      row.append('<td>'+i.toString()+'</td>');\n      for (var j in r){\n        row.append('<td>'+r[j]+'</td>');\n      }\n    }\n  }\n\n  request(this);\n\n  function on_pager_click(e){\n    var c=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr(\"class\");\n    var last = Math.ceil(data_obj.body.length/this.page_size);\n    if (c == 'page-link ff'){\n      pager_active=Math.min( this.pager_front+pager_size, last );\n      this.pager_front=pager_active;\n    }else if (c == 'page-link fb'){\n      pager_active=Math.max( this.pager_front-1, 1 );\n      this.pager_front=Math.max( pager_active-pager_size+1, 1 );\n    }else if (c == 'page-link front'){\n      pager_active=1;\n      this.pager_front=1;\n    }else if (c == 'page-link end'){\n      pager_active=last;\n      this.pager_front=Math.max( pager_active-pager_size+1, 1 );\n    }else{\n      pager_active=parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).html());\n    }\n    request(this);\n  }\n}\n\nfunction myGraph(container, data){\n  var options = {\n    nodes: {\n        shape: 'dot',\n        size: 16\n    },\n    physics: {\n        forceAtlas2Based: {\n            gravitationalConstant: -26,\n            centralGravity: 0.005,\n            springLength: 230,\n            springConstant: 0.18\n        },\n        maxVelocity: 146,\n        solver: 'forceAtlas2Based',\n        timestep: 0.35,\n        stabilization: {iterations: 150}\n    }\n  };\n  var network = new vis__WEBPACK_IMPORTED_MODULE_1__[\"Network\"](container, data, options);\n}\n\n\n//# sourceURL=webpack://mylib/./src/library.js?");

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = jQuery;\n\n//# sourceURL=webpack://mylib/external_%22jQuery%22?");

/***/ }),

/***/ "vis":
/*!**********************!*\
  !*** external "vis" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = vis;\n\n//# sourceURL=webpack://mylib/external_%22vis%22?");

/***/ })

/******/ });