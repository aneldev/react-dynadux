(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("react-dynadux", [], factory);
	else if(typeof exports === 'object')
		exports["react-dynadux"] = factory();
	else
		root["react-dynadux"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Provider.tsx":
/*!**************************!*\
  !*** ./src/Provider.tsx ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Provider = exports.DynaDuxContext = void 0;
var jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
var React = __importStar(__webpack_require__(/*! react */ "react"));
exports.DynaDuxContext = React.createContext(null);
exports.DynaDuxContext.displayName = "DynaduxContext";
var Provider = function Provider(props) {
  var store = props.store,
    children = props.children;
  return (0, jsx_runtime_1.jsx)(exports.DynaDuxContext.Provider, {
    value: store,
    children: children
  });
};
exports.Provider = Provider;

/***/ }),

/***/ "./src/connect.tsx":
/*!*************************!*\
  !*** ./src/connect.tsx ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.connect = void 0;
var jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
var React = __importStar(__webpack_require__(/*! react */ "react"));
var Provider_1 = __webpack_require__(/*! ./Provider */ "./src/Provider.tsx");
var debounce_1 = __webpack_require__(/*! ./debounce */ "./src/debounce.ts");
var connect = function connect(Component) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var shouldComponentUpdate = config.shouldComponentUpdate;
  var Wrapper = /*#__PURE__*/function (_React$Component) {
    function Wrapper(props, context) {
      var _this;
      _classCallCheck(this, Wrapper);
      _this = _callSuper(this, Wrapper, [props, context]);
      _this.isMount = false;
      _this.handleStoreChange = function (state, action, payload) {
        state; // 4TS
        var shouldUpdate = !shouldComponentUpdate || shouldComponentUpdate(action, payload);
        if (shouldUpdate) _this.callForceUpdate();
      };
      _this.callForceUpdate = function () {
        if (!_this.isMount) return;
        _this.forceUpdate();
      };
      if (config.debounce) _this.callForceUpdate = (0, debounce_1.debounce)(_this.callForceUpdate, config.debounce.timeout);
      return _this;
    }
    _inherits(Wrapper, _React$Component);
    return _createClass(Wrapper, [{
      key: "store",
      get: function get() {
        return this.context;
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.isMount = true;
        if (!this.store.provider) {
          console.error("Dynadux connect: Your store should return the `provider` property also, where, is returned by the Dynadux's `createStore` to be able to connect it. " + "Just add the line `provider: store.provider,` in the return of your business store. " + "For more read the https://github.com/aneldev/react-dynadux#1-create-the-store");
        }
        if (!this.store.provider) return;
        this.store.provider.addChangeEventListener(this.handleStoreChange);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.isMount = false;
        if (!this.store.provider) return;
        this.store.provider.removeChangeEventListener(this.handleStoreChange);
      }
    }, {
      key: "render",
      value: function render() {
        var C = Component;
        return (0, jsx_runtime_1.jsx)(C, _objectSpread({
          store: this.context,
          dynaduxStore: this.context.provider.store
        }, this.props));
      }
    }]);
  }(React.Component);
  Wrapper.contextType = Provider_1.DynaDuxContext;
  return Wrapper;
};
exports.connect = connect;

/***/ }),

/***/ "./src/debounce.ts":
/*!*************************!*\
  !*** ./src/debounce.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.debounce = void 0;
var dyna_debounce_1 = __webpack_require__(/*! dyna-debounce */ "dyna-debounce");
var debounce = function debounce(func, timeout) {
  if (timeout === undefined) return func;
  return (0, dyna_debounce_1.dynaDebounce)(func, timeout, {
    leading: true,
    maxWait: timeout
  });
};
exports.debounce = debounce;

/***/ }),

/***/ "dyna-debounce":
/*!********************************!*\
  !*** external "dyna-debounce" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("dyna-debounce");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.connect = exports.DynaDuxContext = exports.Provider = void 0;
var Provider_1 = __webpack_require__(/*! ./Provider */ "./src/Provider.tsx");
Object.defineProperty(exports, "Provider", ({
  enumerable: true,
  get: function get() {
    return Provider_1.Provider;
  }
}));
Object.defineProperty(exports, "DynaDuxContext", ({
  enumerable: true,
  get: function get() {
    return Provider_1.DynaDuxContext;
  }
}));
var connect_1 = __webpack_require__(/*! ./connect */ "./src/connect.tsx");
Object.defineProperty(exports, "connect", ({
  enumerable: true,
  get: function get() {
    return connect_1.connect;
  }
}));
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map