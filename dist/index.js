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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DynaDuxContext: () => (/* binding */ DynaDuxContext),
/* harmony export */   Provider: () => (/* binding */ Provider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var DynaDuxContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createContext(null);
DynaDuxContext.displayName = "DynaduxContext";
var Provider = function Provider(props) {
  var store = props.store,
    children = props.children;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DynaDuxContext.Provider, {
    value: store,
    children: children
  });
};

/***/ }),

/***/ "./src/connect.tsx":
/*!*************************!*\
  !*** ./src/connect.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   connect: () => (/* binding */ connect)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Provider */ "./src/Provider.tsx");
/* harmony import */ var _utils_debounce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/debounce */ "./src/utils/debounce.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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




var connect = function connect(Component) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var shouldComponentUpdate = config.shouldComponentUpdate;
  var Wrapper = /*#__PURE__*/function (_React$Component) {
    function Wrapper(props, context) {
      var _this;
      _classCallCheck(this, Wrapper);
      _this = _callSuper(this, Wrapper, [props, context]);
      _this.isMount = false;
      _this.handleStoreChange = function (_state, action, payload) {
        var shouldUpdate = !shouldComponentUpdate || shouldComponentUpdate(action, payload);
        if (shouldUpdate) _this.callForceUpdate();
      };
      _this.callForceUpdate = function () {
        if (!_this.isMount) return;
        _this.forceUpdate();
      };
      if (config.debounce) _this.callForceUpdate = (0,_utils_debounce__WEBPACK_IMPORTED_MODULE_3__.debounce)(_this.callForceUpdate, config.debounce.timeout);
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
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(C, Object.assign({
          store: this.context,
          dynaduxStore: this.context.provider.store
        }, this.props));
      }
    }]);
  }(react__WEBPACK_IMPORTED_MODULE_1__.Component);
  Wrapper.contextType = _Provider__WEBPACK_IMPORTED_MODULE_2__.DynaDuxContext;
  return Wrapper;
};

/***/ }),

/***/ "./src/useStore.ts":
/*!*************************!*\
  !*** ./src/useStore.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useStore: () => (/* binding */ useStore)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Provider */ "./src/Provider.tsx");


/**
 * Access the current store instance from the Provider context.
 *
 * Should only be called from a descendant of the Provider.
 *
 * @template TStore The type of the store provided by the context.
 * @throws {Error} If used outside of a Provider.
 * @returns {TStore} The store instance from the Provider.
 *
 * @example
 * // In a React component
 * import { useStore } from "./useStore";
 * import type { MyStoreType } from "./store";
 *
 * function MyComponent() {
 *   const store = useStore<MyStoreType>();
 *   return <div>{store.someValue}</div>;
 * }
 */
var useStore = function useStore() {
  var context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(_Provider__WEBPACK_IMPORTED_MODULE_1__.DynaDuxContext);
  if (context === undefined || context === null) throw new Error("dev error: useStore must be used within a dynadux Provider");
  return context;
};

/***/ }),

/***/ "./src/useStoreAdvanced.ts":
/*!*********************************!*\
  !*** ./src/useStoreAdvanced.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useStoreAdvanced: () => (/* binding */ useStoreAdvanced)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/debounce */ "./src/utils/debounce.ts");
/* harmony import */ var _Provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Provider */ "./src/Provider.tsx");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }




/**
 * Provides a hook-based interface for subscribing to store changes from the DynaDuxContext.
 *
 * Mimics the classic "connect" HOC pattern by exposing config to filter when the component should update and to debounce store-driven re-renders.
 * Only triggers re-renders when relevant store actions occur, improving component efficiency and control.
 * Must be called from a descendant of a DynaDux Provider.
 *
 * @throws {Error} If used outside of a DynaDux Provider context.
 * @returns {{store: any, dynaduxStore: any}} - An object containing the current store from context and the raw dynaduxStore.
 *
 * @example
 * // In a React function component:
 * import { useConnectedStore } from './useConnectedStore';
 *
 * function MyComponent() {
 *   const { store, dynaduxStore } = useConnectedStore({
 *     shouldComponentUpdate: (action) => action !== 'IGNORED_ACTION',
 *     debounce: { timeout: 100 }
 *   });
 *   return <div>{store.someValue}</div>;
 * }
 */
var useStoreAdvanced = function useStoreAdvanced() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var store = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_Provider__WEBPACK_IMPORTED_MODULE_2__.DynaDuxContext);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    setRerender = _useState2[1];
  var isMounted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  var rerender = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(config.debounce ? (0,_utils_debounce__WEBPACK_IMPORTED_MODULE_1__.debounce)(function () {
    return setRerender(function (t) {
      return t + 1;
    });
  }, config.debounce.timeout) : function () {
    return setRerender(function (t) {
      return t + 1;
    });
  }, [config.debounce]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    var _a;
    isMounted.current = true;
    var handler = function handler(_state, action, payload) {
      if (!config.shouldComponentUpdate || config.shouldComponentUpdate(action, payload)) {
        rerender();
      }
    };
    (_a = store === null || store === void 0 ? void 0 : store.provider) === null || _a === void 0 ? void 0 : _a.addChangeEventListener(handler);
    return function () {
      var _a;
      isMounted.current = false;
      (_a = store === null || store === void 0 ? void 0 : store.provider) === null || _a === void 0 ? void 0 : _a.removeChangeEventListener(handler);
    };
  }, [store, config, rerender]);
  if (!store) throw new Error("useConnectedStore must be used within DynaDux Provider");
  return store;
};

/***/ }),

/***/ "./src/utils/debounce.ts":
/*!*******************************!*\
  !*** ./src/utils/debounce.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debounce: () => (/* binding */ debounce)
/* harmony export */ });
/* harmony import */ var dyna_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dyna-debounce */ "dyna-debounce");
/* harmony import */ var dyna_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dyna_debounce__WEBPACK_IMPORTED_MODULE_0__);

var debounce = function debounce(func, timeout) {
  if (timeout === undefined) return func;
  return (0,dyna_debounce__WEBPACK_IMPORTED_MODULE_0__.dynaDebounce)(func, timeout, {
    leading: true,
    maxWait: timeout
  });
};

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DynaDuxContext: () => (/* reexport safe */ _Provider__WEBPACK_IMPORTED_MODULE_0__.DynaDuxContext),
/* harmony export */   Provider: () => (/* reexport safe */ _Provider__WEBPACK_IMPORTED_MODULE_0__.Provider),
/* harmony export */   connect: () => (/* reexport safe */ _connect__WEBPACK_IMPORTED_MODULE_1__.connect),
/* harmony export */   useStore: () => (/* reexport safe */ _useStore__WEBPACK_IMPORTED_MODULE_2__.useStore),
/* harmony export */   useStoreAdvanced: () => (/* reexport safe */ _useStoreAdvanced__WEBPACK_IMPORTED_MODULE_3__.useStoreAdvanced)
/* harmony export */ });
/* harmony import */ var _Provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Provider */ "./src/Provider.tsx");
/* harmony import */ var _connect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./connect */ "./src/connect.tsx");
/* harmony import */ var _useStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useStore */ "./src/useStore.ts");
/* harmony import */ var _useStoreAdvanced__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useStoreAdvanced */ "./src/useStoreAdvanced.ts");




/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map