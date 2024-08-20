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
var React = __importStar(__webpack_require__(/*! react */ "react"));
exports.DynaDuxContext = React.createContext(null);
exports.DynaDuxContext.displayName = "DynaduxContext";
var Provider = function Provider(props) {
  var store = props.store,
    children = props.children;
  return React.createElement(exports.DynaDuxContext.Provider, {
    value: store
  }, children);
};
exports.Provider = Provider;

/***/ }),

/***/ "./src/connect.tsx":
/*!*************************!*\
  !*** ./src/connect.tsx ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
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
var React = __importStar(__webpack_require__(/*! react */ "react"));
var Provider_1 = __webpack_require__(/*! ./Provider */ "./src/Provider.tsx");
var debounce_1 = __webpack_require__(/*! ./debounce */ "./src/debounce.ts");
var connect = function connect(Component, config) {
  if (config === void 0) {
    config = {};
  }
  var shouldComponentUpdate = config.shouldComponentUpdate;
  var Wrapper = /** @class */function (_super) {
    __extends(class_1, _super);
    function class_1(props, context) {
      var _this = _super.call(this, props, context) || this;
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
    Object.defineProperty(class_1.prototype, "store", {
      get: function get() {
        return this.context;
      },
      enumerable: false,
      configurable: true
    });
    class_1.prototype.componentDidMount = function () {
      this.isMount = true;
      if (!this.store.provider) {
        console.error("Dynadux connect: Your store should return the `provider` property also, where, is returned by the Dynadux's `createStore` to be able to connect it. " + "Just add the line `provider: store.provider,` in the return of your business store. " + "For more read the https://github.com/aneldev/react-dynadux#1-create-the-store");
      }
      if (!this.store.provider) return;
      this.store.provider.addChangeEventListener(this.handleStoreChange);
    };
    class_1.prototype.componentWillUnmount = function () {
      this.isMount = false;
      if (!this.store.provider) return;
      this.store.provider.removeChangeEventListener(this.handleStoreChange);
    };
    class_1.prototype.render = function () {
      var C = Component;
      return React.createElement(C, __assign({
        store: this.context,
        dynaduxStore: this.context.provider.store
      }, this.props));
    };
    return class_1;
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