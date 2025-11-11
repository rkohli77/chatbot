var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// .wrangler/tmp/bundle-CDLSIP/checked-fetch.js
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
var urls;
var init_checked_fetch = __esm({
  ".wrangler/tmp/bundle-CDLSIP/checked-fetch.js"() {
    urls = /* @__PURE__ */ new Set();
    __name(checkURL, "checkURL");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request, init] = argArray;
        checkURL(request, init);
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }
});

// .wrangler/tmp/bundle-CDLSIP/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
var init_strip_cf_connecting_ip_header = __esm({
  ".wrangler/tmp/bundle-CDLSIP/strip-cf-connecting-ip-header.js"() {
    __name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        return Reflect.apply(target, thisArg, [
          stripCfConnectingIPHeader.apply(null, argArray)
        ]);
      }
    });
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
  }
});

// node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// node_modules/tslib/tslib.js
var require_tslib = __commonJS({
  "node_modules/tslib/tslib.js"(exports, module) {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    var __extends;
    var __assign;
    var __rest2;
    var __decorate;
    var __param;
    var __esDecorate;
    var __runInitializers;
    var __propKey;
    var __setFunctionName;
    var __metadata;
    var __awaiter2;
    var __generator;
    var __exportStar;
    var __values;
    var __read;
    var __spread;
    var __spreadArrays;
    var __spreadArray;
    var __await;
    var __asyncGenerator;
    var __asyncDelegator;
    var __asyncValues;
    var __makeTemplateObject;
    var __importStar;
    var __importDefault;
    var __classPrivateFieldGet;
    var __classPrivateFieldSet;
    var __classPrivateFieldIn;
    var __createBinding;
    var __addDisposableResource;
    var __disposeResources;
    var __rewriteRelativeImportExtension;
    (function(factory) {
      var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function(exports2) {
          factory(createExporter(root, createExporter(exports2)));
        });
      } else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
      } else {
        factory(createExporter(root));
      }
      function createExporter(exports2, previous) {
        if (exports2 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports2, "__esModule", { value: true });
          } else {
            exports2.__esModule = true;
          }
        }
        return function(id, v) {
          return exports2[id] = previous ? previous(id, v) : v;
        };
      }
      __name(createExporter, "createExporter");
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b)
          if (Object.prototype.hasOwnProperty.call(b, p))
            d[p] = b[p];
      };
      __extends = /* @__PURE__ */ __name(function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        __name(__, "__");
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      }, "__extends");
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      __rest2 = /* @__PURE__ */ __name(function(s, e) {
        var t = {};
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
          }
        return t;
      }, "__rest");
      __decorate = /* @__PURE__ */ __name(function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      }, "__decorate");
      __param = /* @__PURE__ */ __name(function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      }, "__param");
      __esDecorate = /* @__PURE__ */ __name(function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
        function accept(f) {
          if (f !== void 0 && typeof f !== "function")
            throw new TypeError("Function expected");
          return f;
        }
        __name(accept, "accept");
        var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
        var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
        var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
        var _, done = false;
        for (var i = decorators.length - 1; i >= 0; i--) {
          var context = {};
          for (var p in contextIn)
            context[p] = p === "access" ? {} : contextIn[p];
          for (var p in contextIn.access)
            context.access[p] = contextIn.access[p];
          context.addInitializer = function(f) {
            if (done)
              throw new TypeError("Cannot add initializers after decoration has completed");
            extraInitializers.push(accept(f || null));
          };
          var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
          if (kind === "accessor") {
            if (result === void 0)
              continue;
            if (result === null || typeof result !== "object")
              throw new TypeError("Object expected");
            if (_ = accept(result.get))
              descriptor.get = _;
            if (_ = accept(result.set))
              descriptor.set = _;
            if (_ = accept(result.init))
              initializers.unshift(_);
          } else if (_ = accept(result)) {
            if (kind === "field")
              initializers.unshift(_);
            else
              descriptor[key] = _;
          }
        }
        if (target)
          Object.defineProperty(target, contextIn.name, descriptor);
        done = true;
      }, "__esDecorate");
      __runInitializers = /* @__PURE__ */ __name(function(thisArg, initializers, value) {
        var useValue = arguments.length > 2;
        for (var i = 0; i < initializers.length; i++) {
          value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
        }
        return useValue ? value : void 0;
      }, "__runInitializers");
      __propKey = /* @__PURE__ */ __name(function(x) {
        return typeof x === "symbol" ? x : "".concat(x);
      }, "__propKey");
      __setFunctionName = /* @__PURE__ */ __name(function(f, name, prefix) {
        if (typeof name === "symbol")
          name = name.description ? "[".concat(name.description, "]") : "";
        return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
      }, "__setFunctionName");
      __metadata = /* @__PURE__ */ __name(function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      }, "__metadata");
      __awaiter2 = /* @__PURE__ */ __name(function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        __name(adopt, "adopt");
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          __name(fulfilled, "fulfilled");
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          __name(rejected, "rejected");
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          __name(step, "step");
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      }, "__awaiter");
      __generator = /* @__PURE__ */ __name(function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        __name(verb, "verb");
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
        __name(step, "step");
      }, "__generator");
      __exportStar = /* @__PURE__ */ __name(function(m, o) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
            __createBinding(o, m, p);
      }, "__exportStar");
      __createBinding = Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      };
      __values = /* @__PURE__ */ __name(function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
          return m.call(o);
        if (o && typeof o.length === "number")
          return {
            next: function() {
              if (o && i >= o.length)
                o = void 0;
              return { value: o && o[i++], done: !o };
            }
          };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, "__values");
      __read = /* @__PURE__ */ __name(function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"]))
              m.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      }, "__read");
      __spread = /* @__PURE__ */ __name(function() {
        for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read(arguments[i]));
        return ar;
      }, "__spread");
      __spreadArrays = /* @__PURE__ */ __name(function() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
          s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
        return r;
      }, "__spreadArrays");
      __spreadArray = /* @__PURE__ */ __name(function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      }, "__spreadArray");
      __await = /* @__PURE__ */ __name(function(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
      }, "__await");
      __asyncGenerator = /* @__PURE__ */ __name(function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
          return this;
        }, i;
        function awaitReturn(f) {
          return function(v) {
            return Promise.resolve(v).then(f, reject);
          };
        }
        __name(awaitReturn, "awaitReturn");
        function verb(n, f) {
          if (g[n]) {
            i[n] = function(v) {
              return new Promise(function(a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v);
              });
            };
            if (f)
              i[n] = f(i[n]);
          }
        }
        __name(verb, "verb");
        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }
        __name(resume, "resume");
        function step(r) {
          r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        __name(step, "step");
        function fulfill(value) {
          resume("next", value);
        }
        __name(fulfill, "fulfill");
        function reject(value) {
          resume("throw", value);
        }
        __name(reject, "reject");
        function settle(f, v) {
          if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]);
        }
        __name(settle, "settle");
      }, "__asyncGenerator");
      __asyncDelegator = /* @__PURE__ */ __name(function(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function(e) {
          throw e;
        }), verb("return"), i[Symbol.iterator] = function() {
          return this;
        }, i;
        function verb(n, f) {
          i[n] = o[n] ? function(v) {
            return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v;
          } : f;
        }
        __name(verb, "verb");
      }, "__asyncDelegator");
      __asyncValues = /* @__PURE__ */ __name(function(o) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i);
        function verb(n) {
          i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
              v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
          };
        }
        __name(verb, "verb");
        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function(v2) {
            resolve({ value: v2, done: d });
          }, reject);
        }
        __name(settle, "settle");
      }, "__asyncValues");
      __makeTemplateObject = /* @__PURE__ */ __name(function(cooked, raw2) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw2 });
        } else {
          cooked.raw = raw2;
        }
        return cooked;
      }, "__makeTemplateObject");
      var __setModuleDefault = Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      };
      var ownKeys = /* @__PURE__ */ __name(function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2)
            if (Object.prototype.hasOwnProperty.call(o2, k))
              ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      }, "ownKeys");
      __importStar = /* @__PURE__ */ __name(function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++)
            if (k[i] !== "default")
              __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      }, "__importStar");
      __importDefault = /* @__PURE__ */ __name(function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      }, "__importDefault");
      __classPrivateFieldGet = /* @__PURE__ */ __name(function(receiver, state, kind, f) {
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      }, "__classPrivateFieldGet");
      __classPrivateFieldSet = /* @__PURE__ */ __name(function(receiver, state, value, kind, f) {
        if (kind === "m")
          throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      }, "__classPrivateFieldSet");
      __classPrivateFieldIn = /* @__PURE__ */ __name(function(state, receiver) {
        if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function")
          throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
      }, "__classPrivateFieldIn");
      __addDisposableResource = /* @__PURE__ */ __name(function(env, value, async) {
        if (value !== null && value !== void 0) {
          if (typeof value !== "object" && typeof value !== "function")
            throw new TypeError("Object expected.");
          var dispose, inner;
          if (async) {
            if (!Symbol.asyncDispose)
              throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
          }
          if (dispose === void 0) {
            if (!Symbol.dispose)
              throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async)
              inner = dispose;
          }
          if (typeof dispose !== "function")
            throw new TypeError("Object not disposable.");
          if (inner)
            dispose = /* @__PURE__ */ __name(function() {
              try {
                inner.call(this);
              } catch (e) {
                return Promise.reject(e);
              }
            }, "dispose");
          env.stack.push({ value, dispose, async });
        } else if (async) {
          env.stack.push({ async: true });
        }
        return value;
      }, "__addDisposableResource");
      var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
      };
      __disposeResources = /* @__PURE__ */ __name(function(env) {
        function fail(e) {
          env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
          env.hasError = true;
        }
        __name(fail, "fail");
        var r, s = 0;
        function next() {
          while (r = env.stack.pop()) {
            try {
              if (!r.async && s === 1)
                return s = 0, env.stack.push(r), Promise.resolve().then(next);
              if (r.dispose) {
                var result = r.dispose.call(r.value);
                if (r.async)
                  return s |= 2, Promise.resolve(result).then(next, function(e) {
                    fail(e);
                    return next();
                  });
              } else
                s |= 1;
            } catch (e) {
              fail(e);
            }
          }
          if (s === 1)
            return env.hasError ? Promise.reject(env.error) : Promise.resolve();
          if (env.hasError)
            throw env.error;
        }
        __name(next, "next");
        return next();
      }, "__disposeResources");
      __rewriteRelativeImportExtension = /* @__PURE__ */ __name(function(path, preserveJsx) {
        if (typeof path === "string" && /^\.\.?\//.test(path)) {
          return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
          });
        }
        return path;
      }, "__rewriteRelativeImportExtension");
      exporter("__extends", __extends);
      exporter("__assign", __assign);
      exporter("__rest", __rest2);
      exporter("__decorate", __decorate);
      exporter("__param", __param);
      exporter("__esDecorate", __esDecorate);
      exporter("__runInitializers", __runInitializers);
      exporter("__propKey", __propKey);
      exporter("__setFunctionName", __setFunctionName);
      exporter("__metadata", __metadata);
      exporter("__awaiter", __awaiter2);
      exporter("__generator", __generator);
      exporter("__exportStar", __exportStar);
      exporter("__createBinding", __createBinding);
      exporter("__values", __values);
      exporter("__read", __read);
      exporter("__spread", __spread);
      exporter("__spreadArrays", __spreadArrays);
      exporter("__spreadArray", __spreadArray);
      exporter("__await", __await);
      exporter("__asyncGenerator", __asyncGenerator);
      exporter("__asyncDelegator", __asyncDelegator);
      exporter("__asyncValues", __asyncValues);
      exporter("__makeTemplateObject", __makeTemplateObject);
      exporter("__importStar", __importStar);
      exporter("__importDefault", __importDefault);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet);
      exporter("__classPrivateFieldIn", __classPrivateFieldIn);
      exporter("__addDisposableResource", __addDisposableResource);
      exporter("__disposeResources", __disposeResources);
      exporter("__rewriteRelativeImportExtension", __rewriteRelativeImportExtension);
    });
  }
});

// node_modules/@supabase/postgrest-js/dist/cjs/PostgrestError.js
var require_PostgrestError = __commonJS({
  "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestError.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var PostgrestError2 = class extends Error {
      constructor(context) {
        super(context.message);
        this.name = "PostgrestError";
        this.details = context.details;
        this.hint = context.hint;
        this.code = context.code;
      }
    };
    __name(PostgrestError2, "PostgrestError");
    exports.default = PostgrestError2;
  }
});

// node_modules/@supabase/postgrest-js/dist/cjs/PostgrestBuilder.js
var require_PostgrestBuilder = __commonJS({
  "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestBuilder.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var PostgrestError_1 = tslib_1.__importDefault(require_PostgrestError());
    var PostgrestBuilder2 = class {
      constructor(builder) {
        var _a2, _b;
        this.shouldThrowOnError = false;
        this.method = builder.method;
        this.url = builder.url;
        this.headers = new Headers(builder.headers);
        this.schema = builder.schema;
        this.body = builder.body;
        this.shouldThrowOnError = (_a2 = builder.shouldThrowOnError) !== null && _a2 !== void 0 ? _a2 : false;
        this.signal = builder.signal;
        this.isMaybeSingle = (_b = builder.isMaybeSingle) !== null && _b !== void 0 ? _b : false;
        if (builder.fetch) {
          this.fetch = builder.fetch;
        } else {
          this.fetch = fetch;
        }
      }
      /**
       * If there's an error with the query, throwOnError will reject the promise by
       * throwing the error instead of returning it as part of a successful response.
       *
       * {@link https://github.com/supabase/supabase-js/issues/92}
       */
      throwOnError() {
        this.shouldThrowOnError = true;
        return this;
      }
      /**
       * Set an HTTP header for the request.
       */
      setHeader(name, value) {
        this.headers = new Headers(this.headers);
        this.headers.set(name, value);
        return this;
      }
      then(onfulfilled, onrejected) {
        if (this.schema === void 0) {
        } else if (["GET", "HEAD"].includes(this.method)) {
          this.headers.set("Accept-Profile", this.schema);
        } else {
          this.headers.set("Content-Profile", this.schema);
        }
        if (this.method !== "GET" && this.method !== "HEAD") {
          this.headers.set("Content-Type", "application/json");
        }
        const _fetch = this.fetch;
        let res = _fetch(this.url.toString(), {
          method: this.method,
          headers: this.headers,
          body: JSON.stringify(this.body),
          signal: this.signal
        }).then(async (res2) => {
          var _a2, _b, _c, _d;
          let error = null;
          let data = null;
          let count = null;
          let status = res2.status;
          let statusText = res2.statusText;
          if (res2.ok) {
            if (this.method !== "HEAD") {
              const body = await res2.text();
              if (body === "") {
              } else if (this.headers.get("Accept") === "text/csv") {
                data = body;
              } else if (this.headers.get("Accept") && ((_a2 = this.headers.get("Accept")) === null || _a2 === void 0 ? void 0 : _a2.includes("application/vnd.pgrst.plan+text"))) {
                data = body;
              } else {
                data = JSON.parse(body);
              }
            }
            const countHeader = (_b = this.headers.get("Prefer")) === null || _b === void 0 ? void 0 : _b.match(/count=(exact|planned|estimated)/);
            const contentRange = (_c = res2.headers.get("content-range")) === null || _c === void 0 ? void 0 : _c.split("/");
            if (countHeader && contentRange && contentRange.length > 1) {
              count = parseInt(contentRange[1]);
            }
            if (this.isMaybeSingle && this.method === "GET" && Array.isArray(data)) {
              if (data.length > 1) {
                error = {
                  // https://github.com/PostgREST/postgrest/blob/a867d79c42419af16c18c3fb019eba8df992626f/src/PostgREST/Error.hs#L553
                  code: "PGRST116",
                  details: `Results contain ${data.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                  hint: null,
                  message: "JSON object requested, multiple (or no) rows returned"
                };
                data = null;
                count = null;
                status = 406;
                statusText = "Not Acceptable";
              } else if (data.length === 1) {
                data = data[0];
              } else {
                data = null;
              }
            }
          } else {
            const body = await res2.text();
            try {
              error = JSON.parse(body);
              if (Array.isArray(error) && res2.status === 404) {
                data = [];
                error = null;
                status = 200;
                statusText = "OK";
              }
            } catch (_e) {
              if (res2.status === 404 && body === "") {
                status = 204;
                statusText = "No Content";
              } else {
                error = {
                  message: body
                };
              }
            }
            if (error && this.isMaybeSingle && ((_d = error === null || error === void 0 ? void 0 : error.details) === null || _d === void 0 ? void 0 : _d.includes("0 rows"))) {
              error = null;
              status = 200;
              statusText = "OK";
            }
            if (error && this.shouldThrowOnError) {
              throw new PostgrestError_1.default(error);
            }
          }
          const postgrestResponse = {
            error,
            data,
            count,
            status,
            statusText
          };
          return postgrestResponse;
        });
        if (!this.shouldThrowOnError) {
          res = res.catch((fetchError) => {
            var _a2, _b, _c;
            return {
              error: {
                message: `${(_a2 = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _a2 !== void 0 ? _a2 : "FetchError"}: ${fetchError === null || fetchError === void 0 ? void 0 : fetchError.message}`,
                details: `${(_b = fetchError === null || fetchError === void 0 ? void 0 : fetchError.stack) !== null && _b !== void 0 ? _b : ""}`,
                hint: "",
                code: `${(_c = fetchError === null || fetchError === void 0 ? void 0 : fetchError.code) !== null && _c !== void 0 ? _c : ""}`
              },
              data: null,
              count: null,
              status: 0,
              statusText: ""
            };
          });
        }
        return res.then(onfulfilled, onrejected);
      }
      /**
       * Override the type of the returned `data`.
       *
       * @typeParam NewResult - The new result type to override with
       * @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
       */
      returns() {
        return this;
      }
      /**
       * Override the type of the returned `data` field in the response.
       *
       * @typeParam NewResult - The new type to cast the response data to
       * @typeParam Options - Optional type configuration (defaults to { merge: true })
       * @typeParam Options.merge - When true, merges the new type with existing return type. When false, replaces the existing types entirely (defaults to true)
       * @example
       * ```typescript
       * // Merge with existing types (default behavior)
       * const query = supabase
       *   .from('users')
       *   .select()
       *   .overrideTypes<{ custom_field: string }>()
       *
       * // Replace existing types completely
       * const replaceQuery = supabase
       *   .from('users')
       *   .select()
       *   .overrideTypes<{ id: number; name: string }, { merge: false }>()
       * ```
       * @returns A PostgrestBuilder instance with the new type
       */
      overrideTypes() {
        return this;
      }
    };
    __name(PostgrestBuilder2, "PostgrestBuilder");
    exports.default = PostgrestBuilder2;
  }
});

// node_modules/@supabase/postgrest-js/dist/cjs/PostgrestTransformBuilder.js
var require_PostgrestTransformBuilder = __commonJS({
  "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestTransformBuilder.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var PostgrestBuilder_1 = tslib_1.__importDefault(require_PostgrestBuilder());
    var PostgrestTransformBuilder2 = class extends PostgrestBuilder_1.default {
      /**
       * Perform a SELECT on the query result.
       *
       * By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
       * return modified rows. By calling this method, modified rows are returned in
       * `data`.
       *
       * @param columns - The columns to retrieve, separated by commas
       */
      select(columns) {
        let quoted = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c) => {
          if (/\s/.test(c) && !quoted) {
            return "";
          }
          if (c === '"') {
            quoted = !quoted;
          }
          return c;
        }).join("");
        this.url.searchParams.set("select", cleanedColumns);
        this.headers.append("Prefer", "return=representation");
        return this;
      }
      /**
       * Order the query result by `column`.
       *
       * You can call this method multiple times to order by multiple columns.
       *
       * You can order referenced tables, but it only affects the ordering of the
       * parent table if you use `!inner` in the query.
       *
       * @param column - The column to order by
       * @param options - Named parameters
       * @param options.ascending - If `true`, the result will be in ascending order
       * @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
       * `null`s appear last.
       * @param options.referencedTable - Set this to order a referenced table by
       * its columns
       * @param options.foreignTable - Deprecated, use `options.referencedTable`
       * instead
       */
      order(column, { ascending = true, nullsFirst, foreignTable, referencedTable = foreignTable } = {}) {
        const key = referencedTable ? `${referencedTable}.order` : "order";
        const existingOrder = this.url.searchParams.get(key);
        this.url.searchParams.set(key, `${existingOrder ? `${existingOrder},` : ""}${column}.${ascending ? "asc" : "desc"}${nullsFirst === void 0 ? "" : nullsFirst ? ".nullsfirst" : ".nullslast"}`);
        return this;
      }
      /**
       * Limit the query result by `count`.
       *
       * @param count - The maximum number of rows to return
       * @param options - Named parameters
       * @param options.referencedTable - Set this to limit rows of referenced
       * tables instead of the parent table
       * @param options.foreignTable - Deprecated, use `options.referencedTable`
       * instead
       */
      limit(count, { foreignTable, referencedTable = foreignTable } = {}) {
        const key = typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
        this.url.searchParams.set(key, `${count}`);
        return this;
      }
      /**
       * Limit the query result by starting at an offset `from` and ending at the offset `to`.
       * Only records within this range are returned.
       * This respects the query order and if there is no order clause the range could behave unexpectedly.
       * The `from` and `to` values are 0-based and inclusive: `range(1, 3)` will include the second, third
       * and fourth rows of the query.
       *
       * @param from - The starting index from which to limit the result
       * @param to - The last index to which to limit the result
       * @param options - Named parameters
       * @param options.referencedTable - Set this to limit rows of referenced
       * tables instead of the parent table
       * @param options.foreignTable - Deprecated, use `options.referencedTable`
       * instead
       */
      range(from, to, { foreignTable, referencedTable = foreignTable } = {}) {
        const keyOffset = typeof referencedTable === "undefined" ? "offset" : `${referencedTable}.offset`;
        const keyLimit = typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
        this.url.searchParams.set(keyOffset, `${from}`);
        this.url.searchParams.set(keyLimit, `${to - from + 1}`);
        return this;
      }
      /**
       * Set the AbortSignal for the fetch request.
       *
       * @param signal - The AbortSignal to use for the fetch request
       */
      abortSignal(signal) {
        this.signal = signal;
        return this;
      }
      /**
       * Return `data` as a single object instead of an array of objects.
       *
       * Query result must be one row (e.g. using `.limit(1)`), otherwise this
       * returns an error.
       */
      single() {
        this.headers.set("Accept", "application/vnd.pgrst.object+json");
        return this;
      }
      /**
       * Return `data` as a single object instead of an array of objects.
       *
       * Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
       * this returns an error.
       */
      maybeSingle() {
        if (this.method === "GET") {
          this.headers.set("Accept", "application/json");
        } else {
          this.headers.set("Accept", "application/vnd.pgrst.object+json");
        }
        this.isMaybeSingle = true;
        return this;
      }
      /**
       * Return `data` as a string in CSV format.
       */
      csv() {
        this.headers.set("Accept", "text/csv");
        return this;
      }
      /**
       * Return `data` as an object in [GeoJSON](https://geojson.org) format.
       */
      geojson() {
        this.headers.set("Accept", "application/geo+json");
        return this;
      }
      /**
       * Return `data` as the EXPLAIN plan for the query.
       *
       * You need to enable the
       * [db_plan_enabled](https://supabase.com/docs/guides/database/debugging-performance#enabling-explain)
       * setting before using this method.
       *
       * @param options - Named parameters
       *
       * @param options.analyze - If `true`, the query will be executed and the
       * actual run time will be returned
       *
       * @param options.verbose - If `true`, the query identifier will be returned
       * and `data` will include the output columns of the query
       *
       * @param options.settings - If `true`, include information on configuration
       * parameters that affect query planning
       *
       * @param options.buffers - If `true`, include information on buffer usage
       *
       * @param options.wal - If `true`, include information on WAL record generation
       *
       * @param options.format - The format of the output, can be `"text"` (default)
       * or `"json"`
       */
      explain({ analyze = false, verbose = false, settings = false, buffers = false, wal = false, format = "text" } = {}) {
        var _a2;
        const options = [
          analyze ? "analyze" : null,
          verbose ? "verbose" : null,
          settings ? "settings" : null,
          buffers ? "buffers" : null,
          wal ? "wal" : null
        ].filter(Boolean).join("|");
        const forMediatype = (_a2 = this.headers.get("Accept")) !== null && _a2 !== void 0 ? _a2 : "application/json";
        this.headers.set("Accept", `application/vnd.pgrst.plan+${format}; for="${forMediatype}"; options=${options};`);
        if (format === "json") {
          return this;
        } else {
          return this;
        }
      }
      /**
       * Rollback the query.
       *
       * `data` will still be returned, but the query is not committed.
       */
      rollback() {
        this.headers.append("Prefer", "tx=rollback");
        return this;
      }
      /**
       * Override the type of the returned `data`.
       *
       * @typeParam NewResult - The new result type to override with
       * @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
       */
      returns() {
        return this;
      }
      /**
       * Set the maximum number of rows that can be affected by the query.
       * Only available in PostgREST v13+ and only works with PATCH and DELETE methods.
       *
       * @param value - The maximum number of rows that can be affected
       */
      maxAffected(value) {
        this.headers.append("Prefer", "handling=strict");
        this.headers.append("Prefer", `max-affected=${value}`);
        return this;
      }
    };
    __name(PostgrestTransformBuilder2, "PostgrestTransformBuilder");
    exports.default = PostgrestTransformBuilder2;
  }
});

// node_modules/@supabase/postgrest-js/dist/cjs/PostgrestFilterBuilder.js
var require_PostgrestFilterBuilder = __commonJS({
  "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestFilterBuilder.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var PostgrestTransformBuilder_1 = tslib_1.__importDefault(require_PostgrestTransformBuilder());
    var PostgrestReservedCharsRegexp = new RegExp("[,()]");
    var PostgrestFilterBuilder2 = class extends PostgrestTransformBuilder_1.default {
      /**
       * Match only rows where `column` is equal to `value`.
       *
       * To check if the value of `column` is NULL, you should use `.is()` instead.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      eq(column, value) {
        this.url.searchParams.append(column, `eq.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is not equal to `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      neq(column, value) {
        this.url.searchParams.append(column, `neq.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is greater than `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      gt(column, value) {
        this.url.searchParams.append(column, `gt.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is greater than or equal to `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      gte(column, value) {
        this.url.searchParams.append(column, `gte.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is less than `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      lt(column, value) {
        this.url.searchParams.append(column, `lt.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is less than or equal to `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      lte(column, value) {
        this.url.searchParams.append(column, `lte.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` matches `pattern` case-sensitively.
       *
       * @param column - The column to filter on
       * @param pattern - The pattern to match with
       */
      like(column, pattern) {
        this.url.searchParams.append(column, `like.${pattern}`);
        return this;
      }
      /**
       * Match only rows where `column` matches all of `patterns` case-sensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      likeAllOf(column, patterns) {
        this.url.searchParams.append(column, `like(all).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` matches any of `patterns` case-sensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      likeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `like(any).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` matches `pattern` case-insensitively.
       *
       * @param column - The column to filter on
       * @param pattern - The pattern to match with
       */
      ilike(column, pattern) {
        this.url.searchParams.append(column, `ilike.${pattern}`);
        return this;
      }
      /**
       * Match only rows where `column` matches all of `patterns` case-insensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      ilikeAllOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(all).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` matches any of `patterns` case-insensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      ilikeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(any).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` IS `value`.
       *
       * For non-boolean columns, this is only relevant for checking if the value of
       * `column` is NULL by setting `value` to `null`.
       *
       * For boolean columns, you can also set `value` to `true` or `false` and it
       * will behave the same way as `.eq()`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      is(column, value) {
        this.url.searchParams.append(column, `is.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is included in the `values` array.
       *
       * @param column - The column to filter on
       * @param values - The values array to filter with
       */
      in(column, values) {
        const cleanedValues = Array.from(new Set(values)).map((s) => {
          if (typeof s === "string" && PostgrestReservedCharsRegexp.test(s))
            return `"${s}"`;
          else
            return `${s}`;
        }).join(",");
        this.url.searchParams.append(column, `in.(${cleanedValues})`);
        return this;
      }
      /**
       * Only relevant for jsonb, array, and range columns. Match only rows where
       * `column` contains every element appearing in `value`.
       *
       * @param column - The jsonb, array, or range column to filter on
       * @param value - The jsonb, array, or range value to filter with
       */
      contains(column, value) {
        if (typeof value === "string") {
          this.url.searchParams.append(column, `cs.${value}`);
        } else if (Array.isArray(value)) {
          this.url.searchParams.append(column, `cs.{${value.join(",")}}`);
        } else {
          this.url.searchParams.append(column, `cs.${JSON.stringify(value)}`);
        }
        return this;
      }
      /**
       * Only relevant for jsonb, array, and range columns. Match only rows where
       * every element appearing in `column` is contained by `value`.
       *
       * @param column - The jsonb, array, or range column to filter on
       * @param value - The jsonb, array, or range value to filter with
       */
      containedBy(column, value) {
        if (typeof value === "string") {
          this.url.searchParams.append(column, `cd.${value}`);
        } else if (Array.isArray(value)) {
          this.url.searchParams.append(column, `cd.{${value.join(",")}}`);
        } else {
          this.url.searchParams.append(column, `cd.${JSON.stringify(value)}`);
        }
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is greater than any element in `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeGt(column, range) {
        this.url.searchParams.append(column, `sr.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is either contained in `range` or greater than any element in
       * `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeGte(column, range) {
        this.url.searchParams.append(column, `nxl.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is less than any element in `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeLt(column, range) {
        this.url.searchParams.append(column, `sl.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is either contained in `range` or less than any element in
       * `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeLte(column, range) {
        this.url.searchParams.append(column, `nxr.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where `column` is
       * mutually exclusive to `range` and there can be no element between the two
       * ranges.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeAdjacent(column, range) {
        this.url.searchParams.append(column, `adj.${range}`);
        return this;
      }
      /**
       * Only relevant for array and range columns. Match only rows where
       * `column` and `value` have an element in common.
       *
       * @param column - The array or range column to filter on
       * @param value - The array or range value to filter with
       */
      overlaps(column, value) {
        if (typeof value === "string") {
          this.url.searchParams.append(column, `ov.${value}`);
        } else {
          this.url.searchParams.append(column, `ov.{${value.join(",")}}`);
        }
        return this;
      }
      /**
       * Only relevant for text and tsvector columns. Match only rows where
       * `column` matches the query string in `query`.
       *
       * @param column - The text or tsvector column to filter on
       * @param query - The query text to match with
       * @param options - Named parameters
       * @param options.config - The text search configuration to use
       * @param options.type - Change how the `query` text is interpreted
       */
      textSearch(column, query, { config, type } = {}) {
        let typePart = "";
        if (type === "plain") {
          typePart = "pl";
        } else if (type === "phrase") {
          typePart = "ph";
        } else if (type === "websearch") {
          typePart = "w";
        }
        const configPart = config === void 0 ? "" : `(${config})`;
        this.url.searchParams.append(column, `${typePart}fts${configPart}.${query}`);
        return this;
      }
      /**
       * Match only rows where each column in `query` keys is equal to its
       * associated value. Shorthand for multiple `.eq()`s.
       *
       * @param query - The object to filter with, with column names as keys mapped
       * to their filter values
       */
      match(query) {
        Object.entries(query).forEach(([column, value]) => {
          this.url.searchParams.append(column, `eq.${value}`);
        });
        return this;
      }
      /**
       * Match only rows which doesn't satisfy the filter.
       *
       * Unlike most filters, `opearator` and `value` are used as-is and need to
       * follow [PostgREST
       * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
       * to make sure they are properly sanitized.
       *
       * @param column - The column to filter on
       * @param operator - The operator to be negated to filter with, following
       * PostgREST syntax
       * @param value - The value to filter with, following PostgREST syntax
       */
      not(column, operator, value) {
        this.url.searchParams.append(column, `not.${operator}.${value}`);
        return this;
      }
      /**
       * Match only rows which satisfy at least one of the filters.
       *
       * Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
       * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
       * to make sure it's properly sanitized.
       *
       * It's currently not possible to do an `.or()` filter across multiple tables.
       *
       * @param filters - The filters to use, following PostgREST syntax
       * @param options - Named parameters
       * @param options.referencedTable - Set this to filter on referenced tables
       * instead of the parent table
       * @param options.foreignTable - Deprecated, use `referencedTable` instead
       */
      or(filters, { foreignTable, referencedTable = foreignTable } = {}) {
        const key = referencedTable ? `${referencedTable}.or` : "or";
        this.url.searchParams.append(key, `(${filters})`);
        return this;
      }
      /**
       * Match only rows which satisfy the filter. This is an escape hatch - you
       * should use the specific filter methods wherever possible.
       *
       * Unlike most filters, `opearator` and `value` are used as-is and need to
       * follow [PostgREST
       * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
       * to make sure they are properly sanitized.
       *
       * @param column - The column to filter on
       * @param operator - The operator to filter with, following PostgREST syntax
       * @param value - The value to filter with, following PostgREST syntax
       */
      filter(column, operator, value) {
        this.url.searchParams.append(column, `${operator}.${value}`);
        return this;
      }
    };
    __name(PostgrestFilterBuilder2, "PostgrestFilterBuilder");
    exports.default = PostgrestFilterBuilder2;
  }
});

// node_modules/@supabase/postgrest-js/dist/cjs/PostgrestQueryBuilder.js
var require_PostgrestQueryBuilder = __commonJS({
  "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestQueryBuilder.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var PostgrestFilterBuilder_1 = tslib_1.__importDefault(require_PostgrestFilterBuilder());
    var PostgrestQueryBuilder2 = class {
      constructor(url, { headers = {}, schema, fetch: fetch2 }) {
        this.url = url;
        this.headers = new Headers(headers);
        this.schema = schema;
        this.fetch = fetch2;
      }
      /**
       * Perform a SELECT query on the table or view.
       *
       * @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
       *
       * @param options - Named parameters
       *
       * @param options.head - When set to `true`, `data` will not be returned.
       * Useful if you only need the count.
       *
       * @param options.count - Count algorithm to use to count rows in the table or view.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      select(columns, options) {
        const { head: head2 = false, count } = options !== null && options !== void 0 ? options : {};
        const method = head2 ? "HEAD" : "GET";
        let quoted = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c) => {
          if (/\s/.test(c) && !quoted) {
            return "";
          }
          if (c === '"') {
            quoted = !quoted;
          }
          return c;
        }).join("");
        this.url.searchParams.set("select", cleanedColumns);
        if (count) {
          this.headers.append("Prefer", `count=${count}`);
        }
        return new PostgrestFilterBuilder_1.default({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          fetch: this.fetch
        });
      }
      /**
       * Perform an INSERT into the table or view.
       *
       * By default, inserted rows are not returned. To return it, chain the call
       * with `.select()`.
       *
       * @param values - The values to insert. Pass an object to insert a single row
       * or an array to insert multiple rows.
       *
       * @param options - Named parameters
       *
       * @param options.count - Count algorithm to use to count inserted rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       *
       * @param options.defaultToNull - Make missing fields default to `null`.
       * Otherwise, use the default value for the column. Only applies for bulk
       * inserts.
       */
      insert(values, { count, defaultToNull = true } = {}) {
        var _a2;
        const method = "POST";
        if (count) {
          this.headers.append("Prefer", `count=${count}`);
        }
        if (!defaultToNull) {
          this.headers.append("Prefer", `missing=default`);
        }
        if (Array.isArray(values)) {
          const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
          if (columns.length > 0) {
            const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
            this.url.searchParams.set("columns", uniqueColumns.join(","));
          }
        }
        return new PostgrestFilterBuilder_1.default({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body: values,
          fetch: (_a2 = this.fetch) !== null && _a2 !== void 0 ? _a2 : fetch
        });
      }
      /**
       * Perform an UPSERT on the table or view. Depending on the column(s) passed
       * to `onConflict`, `.upsert()` allows you to perform the equivalent of
       * `.insert()` if a row with the corresponding `onConflict` columns doesn't
       * exist, or if it does exist, perform an alternative action depending on
       * `ignoreDuplicates`.
       *
       * By default, upserted rows are not returned. To return it, chain the call
       * with `.select()`.
       *
       * @param values - The values to upsert with. Pass an object to upsert a
       * single row or an array to upsert multiple rows.
       *
       * @param options - Named parameters
       *
       * @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
       * duplicate rows are determined. Two rows are duplicates if all the
       * `onConflict` columns are equal.
       *
       * @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
       * `false`, duplicate rows are merged with existing rows.
       *
       * @param options.count - Count algorithm to use to count upserted rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       *
       * @param options.defaultToNull - Make missing fields default to `null`.
       * Otherwise, use the default value for the column. This only applies when
       * inserting new rows, not when merging with existing rows under
       * `ignoreDuplicates: false`. This also only applies when doing bulk upserts.
       */
      upsert(values, { onConflict, ignoreDuplicates = false, count, defaultToNull = true } = {}) {
        var _a2;
        const method = "POST";
        this.headers.append("Prefer", `resolution=${ignoreDuplicates ? "ignore" : "merge"}-duplicates`);
        if (onConflict !== void 0)
          this.url.searchParams.set("on_conflict", onConflict);
        if (count) {
          this.headers.append("Prefer", `count=${count}`);
        }
        if (!defaultToNull) {
          this.headers.append("Prefer", "missing=default");
        }
        if (Array.isArray(values)) {
          const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
          if (columns.length > 0) {
            const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
            this.url.searchParams.set("columns", uniqueColumns.join(","));
          }
        }
        return new PostgrestFilterBuilder_1.default({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body: values,
          fetch: (_a2 = this.fetch) !== null && _a2 !== void 0 ? _a2 : fetch
        });
      }
      /**
       * Perform an UPDATE on the table or view.
       *
       * By default, updated rows are not returned. To return it, chain the call
       * with `.select()` after filters.
       *
       * @param values - The values to update with
       *
       * @param options - Named parameters
       *
       * @param options.count - Count algorithm to use to count updated rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      update(values, { count } = {}) {
        var _a2;
        const method = "PATCH";
        if (count) {
          this.headers.append("Prefer", `count=${count}`);
        }
        return new PostgrestFilterBuilder_1.default({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body: values,
          fetch: (_a2 = this.fetch) !== null && _a2 !== void 0 ? _a2 : fetch
        });
      }
      /**
       * Perform a DELETE on the table or view.
       *
       * By default, deleted rows are not returned. To return it, chain the call
       * with `.select()` after filters.
       *
       * @param options - Named parameters
       *
       * @param options.count - Count algorithm to use to count deleted rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      delete({ count } = {}) {
        var _a2;
        const method = "DELETE";
        if (count) {
          this.headers.append("Prefer", `count=${count}`);
        }
        return new PostgrestFilterBuilder_1.default({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          fetch: (_a2 = this.fetch) !== null && _a2 !== void 0 ? _a2 : fetch
        });
      }
    };
    __name(PostgrestQueryBuilder2, "PostgrestQueryBuilder");
    exports.default = PostgrestQueryBuilder2;
  }
});

// node_modules/@supabase/postgrest-js/dist/cjs/PostgrestClient.js
var require_PostgrestClient = __commonJS({
  "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestClient.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var PostgrestQueryBuilder_1 = tslib_1.__importDefault(require_PostgrestQueryBuilder());
    var PostgrestFilterBuilder_1 = tslib_1.__importDefault(require_PostgrestFilterBuilder());
    var PostgrestClient2 = class {
      // TODO: Add back shouldThrowOnError once we figure out the typings
      /**
       * Creates a PostgREST client.
       *
       * @param url - URL of the PostgREST endpoint
       * @param options - Named parameters
       * @param options.headers - Custom headers
       * @param options.schema - Postgres schema to switch to
       * @param options.fetch - Custom fetch
       */
      constructor(url, { headers = {}, schema, fetch: fetch2 } = {}) {
        this.url = url;
        this.headers = new Headers(headers);
        this.schemaName = schema;
        this.fetch = fetch2;
      }
      /**
       * Perform a query on a table or a view.
       *
       * @param relation - The table or view name to query
       */
      from(relation) {
        const url = new URL(`${this.url}/${relation}`);
        return new PostgrestQueryBuilder_1.default(url, {
          headers: new Headers(this.headers),
          schema: this.schemaName,
          fetch: this.fetch
        });
      }
      /**
       * Select a schema to query or perform an function (rpc) call.
       *
       * The schema needs to be on the list of exposed schemas inside Supabase.
       *
       * @param schema - The schema to query
       */
      schema(schema) {
        return new PostgrestClient2(this.url, {
          headers: this.headers,
          schema,
          fetch: this.fetch
        });
      }
      /**
       * Perform a function call.
       *
       * @param fn - The function name to call
       * @param args - The arguments to pass to the function call
       * @param options - Named parameters
       * @param options.head - When set to `true`, `data` will not be returned.
       * Useful if you only need the count.
       * @param options.get - When set to `true`, the function will be called with
       * read-only access mode.
       * @param options.count - Count algorithm to use to count rows returned by the
       * function. Only applicable for [set-returning
       * functions](https://www.postgresql.org/docs/current/functions-srf.html).
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      rpc(fn, args = {}, { head: head2 = false, get: get2 = false, count } = {}) {
        var _a2;
        let method;
        const url = new URL(`${this.url}/rpc/${fn}`);
        let body;
        if (head2 || get2) {
          method = head2 ? "HEAD" : "GET";
          Object.entries(args).filter(([_, value]) => value !== void 0).map(([name, value]) => [name, Array.isArray(value) ? `{${value.join(",")}}` : `${value}`]).forEach(([name, value]) => {
            url.searchParams.append(name, value);
          });
        } else {
          method = "POST";
          body = args;
        }
        const headers = new Headers(this.headers);
        if (count) {
          headers.set("Prefer", `count=${count}`);
        }
        return new PostgrestFilterBuilder_1.default({
          method,
          url,
          headers,
          schema: this.schemaName,
          body,
          fetch: (_a2 = this.fetch) !== null && _a2 !== void 0 ? _a2 : fetch
        });
      }
    };
    __name(PostgrestClient2, "PostgrestClient");
    exports.default = PostgrestClient2;
  }
});

// node_modules/@supabase/postgrest-js/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/@supabase/postgrest-js/dist/cjs/index.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PostgrestError = exports.PostgrestBuilder = exports.PostgrestTransformBuilder = exports.PostgrestFilterBuilder = exports.PostgrestQueryBuilder = exports.PostgrestClient = void 0;
    var tslib_1 = require_tslib();
    var PostgrestClient_1 = tslib_1.__importDefault(require_PostgrestClient());
    exports.PostgrestClient = PostgrestClient_1.default;
    var PostgrestQueryBuilder_1 = tslib_1.__importDefault(require_PostgrestQueryBuilder());
    exports.PostgrestQueryBuilder = PostgrestQueryBuilder_1.default;
    var PostgrestFilterBuilder_1 = tslib_1.__importDefault(require_PostgrestFilterBuilder());
    exports.PostgrestFilterBuilder = PostgrestFilterBuilder_1.default;
    var PostgrestTransformBuilder_1 = tslib_1.__importDefault(require_PostgrestTransformBuilder());
    exports.PostgrestTransformBuilder = PostgrestTransformBuilder_1.default;
    var PostgrestBuilder_1 = tslib_1.__importDefault(require_PostgrestBuilder());
    exports.PostgrestBuilder = PostgrestBuilder_1.default;
    var PostgrestError_1 = tslib_1.__importDefault(require_PostgrestError());
    exports.PostgrestError = PostgrestError_1.default;
    exports.default = {
      PostgrestClient: PostgrestClient_1.default,
      PostgrestQueryBuilder: PostgrestQueryBuilder_1.default,
      PostgrestFilterBuilder: PostgrestFilterBuilder_1.default,
      PostgrestTransformBuilder: PostgrestTransformBuilder_1.default,
      PostgrestBuilder: PostgrestBuilder_1.default,
      PostgrestError: PostgrestError_1.default
    };
  }
});

// node_modules/bcryptjs/dist/bcrypt.js
var require_bcrypt = __commonJS({
  "node_modules/bcryptjs/dist/bcrypt.js"(exports, module) {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    (function(global2, factory) {
      if (typeof define === "function" && define["amd"])
        define([], factory);
      else if (typeof __require === "function" && typeof module === "object" && module && module["exports"])
        module["exports"] = factory();
      else
        (global2["dcodeIO"] = global2["dcodeIO"] || {})["bcrypt"] = factory();
    })(exports, function() {
      "use strict";
      var bcrypt2 = {};
      var randomFallback = null;
      function random(len) {
        if (typeof module !== "undefined" && module && module["exports"])
          try {
            return __require("crypto")["randomBytes"](len);
          } catch (e) {
          }
        try {
          var a;
          (self["crypto"] || self["msCrypto"])["getRandomValues"](a = new Uint32Array(len));
          return Array.prototype.slice.call(a);
        } catch (e) {
        }
        if (!randomFallback)
          throw Error("Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative");
        return randomFallback(len);
      }
      __name(random, "random");
      var randomAvailable = false;
      try {
        random(1);
        randomAvailable = true;
      } catch (e) {
      }
      randomFallback = null;
      bcrypt2.setRandomFallback = function(random2) {
        randomFallback = random2;
      };
      bcrypt2.genSaltSync = function(rounds, seed_length) {
        rounds = rounds || GENSALT_DEFAULT_LOG2_ROUNDS;
        if (typeof rounds !== "number")
          throw Error("Illegal arguments: " + typeof rounds + ", " + typeof seed_length);
        if (rounds < 4)
          rounds = 4;
        else if (rounds > 31)
          rounds = 31;
        var salt = [];
        salt.push("$2a$");
        if (rounds < 10)
          salt.push("0");
        salt.push(rounds.toString());
        salt.push("$");
        salt.push(base64_encode(random(BCRYPT_SALT_LEN), BCRYPT_SALT_LEN));
        return salt.join("");
      };
      bcrypt2.genSalt = function(rounds, seed_length, callback) {
        if (typeof seed_length === "function")
          callback = seed_length, seed_length = void 0;
        if (typeof rounds === "function")
          callback = rounds, rounds = void 0;
        if (typeof rounds === "undefined")
          rounds = GENSALT_DEFAULT_LOG2_ROUNDS;
        else if (typeof rounds !== "number")
          throw Error("illegal arguments: " + typeof rounds);
        function _async(callback2) {
          nextTick(function() {
            try {
              callback2(null, bcrypt2.genSaltSync(rounds));
            } catch (err) {
              callback2(err);
            }
          });
        }
        __name(_async, "_async");
        if (callback) {
          if (typeof callback !== "function")
            throw Error("Illegal callback: " + typeof callback);
          _async(callback);
        } else
          return new Promise(function(resolve, reject) {
            _async(function(err, res) {
              if (err) {
                reject(err);
                return;
              }
              resolve(res);
            });
          });
      };
      bcrypt2.hashSync = function(s, salt) {
        if (typeof salt === "undefined")
          salt = GENSALT_DEFAULT_LOG2_ROUNDS;
        if (typeof salt === "number")
          salt = bcrypt2.genSaltSync(salt);
        if (typeof s !== "string" || typeof salt !== "string")
          throw Error("Illegal arguments: " + typeof s + ", " + typeof salt);
        return _hash(s, salt);
      };
      bcrypt2.hash = function(s, salt, callback, progressCallback) {
        function _async(callback2) {
          if (typeof s === "string" && typeof salt === "number")
            bcrypt2.genSalt(salt, function(err, salt2) {
              _hash(s, salt2, callback2, progressCallback);
            });
          else if (typeof s === "string" && typeof salt === "string")
            _hash(s, salt, callback2, progressCallback);
          else
            nextTick(callback2.bind(this, Error("Illegal arguments: " + typeof s + ", " + typeof salt)));
        }
        __name(_async, "_async");
        if (callback) {
          if (typeof callback !== "function")
            throw Error("Illegal callback: " + typeof callback);
          _async(callback);
        } else
          return new Promise(function(resolve, reject) {
            _async(function(err, res) {
              if (err) {
                reject(err);
                return;
              }
              resolve(res);
            });
          });
      };
      function safeStringCompare(known, unknown) {
        var right = 0, wrong = 0;
        for (var i = 0, k = known.length; i < k; ++i) {
          if (known.charCodeAt(i) === unknown.charCodeAt(i))
            ++right;
          else
            ++wrong;
        }
        if (right < 0)
          return false;
        return wrong === 0;
      }
      __name(safeStringCompare, "safeStringCompare");
      bcrypt2.compareSync = function(s, hash) {
        if (typeof s !== "string" || typeof hash !== "string")
          throw Error("Illegal arguments: " + typeof s + ", " + typeof hash);
        if (hash.length !== 60)
          return false;
        return safeStringCompare(bcrypt2.hashSync(s, hash.substr(0, hash.length - 31)), hash);
      };
      bcrypt2.compare = function(s, hash, callback, progressCallback) {
        function _async(callback2) {
          if (typeof s !== "string" || typeof hash !== "string") {
            nextTick(callback2.bind(this, Error("Illegal arguments: " + typeof s + ", " + typeof hash)));
            return;
          }
          if (hash.length !== 60) {
            nextTick(callback2.bind(this, null, false));
            return;
          }
          bcrypt2.hash(s, hash.substr(0, 29), function(err, comp) {
            if (err)
              callback2(err);
            else
              callback2(null, safeStringCompare(comp, hash));
          }, progressCallback);
        }
        __name(_async, "_async");
        if (callback) {
          if (typeof callback !== "function")
            throw Error("Illegal callback: " + typeof callback);
          _async(callback);
        } else
          return new Promise(function(resolve, reject) {
            _async(function(err, res) {
              if (err) {
                reject(err);
                return;
              }
              resolve(res);
            });
          });
      };
      bcrypt2.getRounds = function(hash) {
        if (typeof hash !== "string")
          throw Error("Illegal arguments: " + typeof hash);
        return parseInt(hash.split("$")[2], 10);
      };
      bcrypt2.getSalt = function(hash) {
        if (typeof hash !== "string")
          throw Error("Illegal arguments: " + typeof hash);
        if (hash.length !== 60)
          throw Error("Illegal hash length: " + hash.length + " != 60");
        return hash.substring(0, 29);
      };
      var nextTick = typeof process !== "undefined" && process && typeof process.nextTick === "function" ? typeof setImmediate === "function" ? setImmediate : process.nextTick : setTimeout;
      function stringToBytes(str) {
        var out = [], i = 0;
        utfx.encodeUTF16toUTF8(function() {
          if (i >= str.length)
            return null;
          return str.charCodeAt(i++);
        }, function(b) {
          out.push(b);
        });
        return out;
      }
      __name(stringToBytes, "stringToBytes");
      var BASE64_CODE = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
      var BASE64_INDEX = [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        0,
        1,
        54,
        55,
        56,
        57,
        58,
        59,
        60,
        61,
        62,
        63,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
        -1,
        -1,
        -1,
        -1,
        -1
      ];
      var stringFromCharCode = String.fromCharCode;
      function base64_encode(b, len) {
        var off = 0, rs = [], c1, c2;
        if (len <= 0 || len > b.length)
          throw Error("Illegal len: " + len);
        while (off < len) {
          c1 = b[off++] & 255;
          rs.push(BASE64_CODE[c1 >> 2 & 63]);
          c1 = (c1 & 3) << 4;
          if (off >= len) {
            rs.push(BASE64_CODE[c1 & 63]);
            break;
          }
          c2 = b[off++] & 255;
          c1 |= c2 >> 4 & 15;
          rs.push(BASE64_CODE[c1 & 63]);
          c1 = (c2 & 15) << 2;
          if (off >= len) {
            rs.push(BASE64_CODE[c1 & 63]);
            break;
          }
          c2 = b[off++] & 255;
          c1 |= c2 >> 6 & 3;
          rs.push(BASE64_CODE[c1 & 63]);
          rs.push(BASE64_CODE[c2 & 63]);
        }
        return rs.join("");
      }
      __name(base64_encode, "base64_encode");
      function base64_decode(s, len) {
        var off = 0, slen = s.length, olen = 0, rs = [], c1, c2, c3, c4, o, code;
        if (len <= 0)
          throw Error("Illegal len: " + len);
        while (off < slen - 1 && olen < len) {
          code = s.charCodeAt(off++);
          c1 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
          code = s.charCodeAt(off++);
          c2 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
          if (c1 == -1 || c2 == -1)
            break;
          o = c1 << 2 >>> 0;
          o |= (c2 & 48) >> 4;
          rs.push(stringFromCharCode(o));
          if (++olen >= len || off >= slen)
            break;
          code = s.charCodeAt(off++);
          c3 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
          if (c3 == -1)
            break;
          o = (c2 & 15) << 4 >>> 0;
          o |= (c3 & 60) >> 2;
          rs.push(stringFromCharCode(o));
          if (++olen >= len || off >= slen)
            break;
          code = s.charCodeAt(off++);
          c4 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
          o = (c3 & 3) << 6 >>> 0;
          o |= c4;
          rs.push(stringFromCharCode(o));
          ++olen;
        }
        var res = [];
        for (off = 0; off < olen; off++)
          res.push(rs[off].charCodeAt(0));
        return res;
      }
      __name(base64_decode, "base64_decode");
      var utfx = function() {
        "use strict";
        var utfx2 = {};
        utfx2.MAX_CODEPOINT = 1114111;
        utfx2.encodeUTF8 = function(src, dst) {
          var cp = null;
          if (typeof src === "number")
            cp = src, src = /* @__PURE__ */ __name(function() {
              return null;
            }, "src");
          while (cp !== null || (cp = src()) !== null) {
            if (cp < 128)
              dst(cp & 127);
            else if (cp < 2048)
              dst(cp >> 6 & 31 | 192), dst(cp & 63 | 128);
            else if (cp < 65536)
              dst(cp >> 12 & 15 | 224), dst(cp >> 6 & 63 | 128), dst(cp & 63 | 128);
            else
              dst(cp >> 18 & 7 | 240), dst(cp >> 12 & 63 | 128), dst(cp >> 6 & 63 | 128), dst(cp & 63 | 128);
            cp = null;
          }
        };
        utfx2.decodeUTF8 = function(src, dst) {
          var a, b, c, d, fail = /* @__PURE__ */ __name(function(b2) {
            b2 = b2.slice(0, b2.indexOf(null));
            var err = Error(b2.toString());
            err.name = "TruncatedError";
            err["bytes"] = b2;
            throw err;
          }, "fail");
          while ((a = src()) !== null) {
            if ((a & 128) === 0)
              dst(a);
            else if ((a & 224) === 192)
              (b = src()) === null && fail([a, b]), dst((a & 31) << 6 | b & 63);
            else if ((a & 240) === 224)
              ((b = src()) === null || (c = src()) === null) && fail([a, b, c]), dst((a & 15) << 12 | (b & 63) << 6 | c & 63);
            else if ((a & 248) === 240)
              ((b = src()) === null || (c = src()) === null || (d = src()) === null) && fail([a, b, c, d]), dst((a & 7) << 18 | (b & 63) << 12 | (c & 63) << 6 | d & 63);
            else
              throw RangeError("Illegal starting byte: " + a);
          }
        };
        utfx2.UTF16toUTF8 = function(src, dst) {
          var c1, c2 = null;
          while (true) {
            if ((c1 = c2 !== null ? c2 : src()) === null)
              break;
            if (c1 >= 55296 && c1 <= 57343) {
              if ((c2 = src()) !== null) {
                if (c2 >= 56320 && c2 <= 57343) {
                  dst((c1 - 55296) * 1024 + c2 - 56320 + 65536);
                  c2 = null;
                  continue;
                }
              }
            }
            dst(c1);
          }
          if (c2 !== null)
            dst(c2);
        };
        utfx2.UTF8toUTF16 = function(src, dst) {
          var cp = null;
          if (typeof src === "number")
            cp = src, src = /* @__PURE__ */ __name(function() {
              return null;
            }, "src");
          while (cp !== null || (cp = src()) !== null) {
            if (cp <= 65535)
              dst(cp);
            else
              cp -= 65536, dst((cp >> 10) + 55296), dst(cp % 1024 + 56320);
            cp = null;
          }
        };
        utfx2.encodeUTF16toUTF8 = function(src, dst) {
          utfx2.UTF16toUTF8(src, function(cp) {
            utfx2.encodeUTF8(cp, dst);
          });
        };
        utfx2.decodeUTF8toUTF16 = function(src, dst) {
          utfx2.decodeUTF8(src, function(cp) {
            utfx2.UTF8toUTF16(cp, dst);
          });
        };
        utfx2.calculateCodePoint = function(cp) {
          return cp < 128 ? 1 : cp < 2048 ? 2 : cp < 65536 ? 3 : 4;
        };
        utfx2.calculateUTF8 = function(src) {
          var cp, l = 0;
          while ((cp = src()) !== null)
            l += utfx2.calculateCodePoint(cp);
          return l;
        };
        utfx2.calculateUTF16asUTF8 = function(src) {
          var n = 0, l = 0;
          utfx2.UTF16toUTF8(src, function(cp) {
            ++n;
            l += utfx2.calculateCodePoint(cp);
          });
          return [n, l];
        };
        return utfx2;
      }();
      Date.now = Date.now || function() {
        return +/* @__PURE__ */ new Date();
      };
      var BCRYPT_SALT_LEN = 16;
      var GENSALT_DEFAULT_LOG2_ROUNDS = 10;
      var BLOWFISH_NUM_ROUNDS = 16;
      var MAX_EXECUTION_TIME = 100;
      var P_ORIG = [
        608135816,
        2242054355,
        320440878,
        57701188,
        2752067618,
        698298832,
        137296536,
        3964562569,
        1160258022,
        953160567,
        3193202383,
        887688300,
        3232508343,
        3380367581,
        1065670069,
        3041331479,
        2450970073,
        2306472731
      ];
      var S_ORIG = [
        3509652390,
        2564797868,
        805139163,
        3491422135,
        3101798381,
        1780907670,
        3128725573,
        4046225305,
        614570311,
        3012652279,
        134345442,
        2240740374,
        1667834072,
        1901547113,
        2757295779,
        4103290238,
        227898511,
        1921955416,
        1904987480,
        2182433518,
        2069144605,
        3260701109,
        2620446009,
        720527379,
        3318853667,
        677414384,
        3393288472,
        3101374703,
        2390351024,
        1614419982,
        1822297739,
        2954791486,
        3608508353,
        3174124327,
        2024746970,
        1432378464,
        3864339955,
        2857741204,
        1464375394,
        1676153920,
        1439316330,
        715854006,
        3033291828,
        289532110,
        2706671279,
        2087905683,
        3018724369,
        1668267050,
        732546397,
        1947742710,
        3462151702,
        2609353502,
        2950085171,
        1814351708,
        2050118529,
        680887927,
        999245976,
        1800124847,
        3300911131,
        1713906067,
        1641548236,
        4213287313,
        1216130144,
        1575780402,
        4018429277,
        3917837745,
        3693486850,
        3949271944,
        596196993,
        3549867205,
        258830323,
        2213823033,
        772490370,
        2760122372,
        1774776394,
        2652871518,
        566650946,
        4142492826,
        1728879713,
        2882767088,
        1783734482,
        3629395816,
        2517608232,
        2874225571,
        1861159788,
        326777828,
        3124490320,
        2130389656,
        2716951837,
        967770486,
        1724537150,
        2185432712,
        2364442137,
        1164943284,
        2105845187,
        998989502,
        3765401048,
        2244026483,
        1075463327,
        1455516326,
        1322494562,
        910128902,
        469688178,
        1117454909,
        936433444,
        3490320968,
        3675253459,
        1240580251,
        122909385,
        2157517691,
        634681816,
        4142456567,
        3825094682,
        3061402683,
        2540495037,
        79693498,
        3249098678,
        1084186820,
        1583128258,
        426386531,
        1761308591,
        1047286709,
        322548459,
        995290223,
        1845252383,
        2603652396,
        3431023940,
        2942221577,
        3202600964,
        3727903485,
        1712269319,
        422464435,
        3234572375,
        1170764815,
        3523960633,
        3117677531,
        1434042557,
        442511882,
        3600875718,
        1076654713,
        1738483198,
        4213154764,
        2393238008,
        3677496056,
        1014306527,
        4251020053,
        793779912,
        2902807211,
        842905082,
        4246964064,
        1395751752,
        1040244610,
        2656851899,
        3396308128,
        445077038,
        3742853595,
        3577915638,
        679411651,
        2892444358,
        2354009459,
        1767581616,
        3150600392,
        3791627101,
        3102740896,
        284835224,
        4246832056,
        1258075500,
        768725851,
        2589189241,
        3069724005,
        3532540348,
        1274779536,
        3789419226,
        2764799539,
        1660621633,
        3471099624,
        4011903706,
        913787905,
        3497959166,
        737222580,
        2514213453,
        2928710040,
        3937242737,
        1804850592,
        3499020752,
        2949064160,
        2386320175,
        2390070455,
        2415321851,
        4061277028,
        2290661394,
        2416832540,
        1336762016,
        1754252060,
        3520065937,
        3014181293,
        791618072,
        3188594551,
        3933548030,
        2332172193,
        3852520463,
        3043980520,
        413987798,
        3465142937,
        3030929376,
        4245938359,
        2093235073,
        3534596313,
        375366246,
        2157278981,
        2479649556,
        555357303,
        3870105701,
        2008414854,
        3344188149,
        4221384143,
        3956125452,
        2067696032,
        3594591187,
        2921233993,
        2428461,
        544322398,
        577241275,
        1471733935,
        610547355,
        4027169054,
        1432588573,
        1507829418,
        2025931657,
        3646575487,
        545086370,
        48609733,
        2200306550,
        1653985193,
        298326376,
        1316178497,
        3007786442,
        2064951626,
        458293330,
        2589141269,
        3591329599,
        3164325604,
        727753846,
        2179363840,
        146436021,
        1461446943,
        4069977195,
        705550613,
        3059967265,
        3887724982,
        4281599278,
        3313849956,
        1404054877,
        2845806497,
        146425753,
        1854211946,
        1266315497,
        3048417604,
        3681880366,
        3289982499,
        290971e4,
        1235738493,
        2632868024,
        2414719590,
        3970600049,
        1771706367,
        1449415276,
        3266420449,
        422970021,
        1963543593,
        2690192192,
        3826793022,
        1062508698,
        1531092325,
        1804592342,
        2583117782,
        2714934279,
        4024971509,
        1294809318,
        4028980673,
        1289560198,
        2221992742,
        1669523910,
        35572830,
        157838143,
        1052438473,
        1016535060,
        1802137761,
        1753167236,
        1386275462,
        3080475397,
        2857371447,
        1040679964,
        2145300060,
        2390574316,
        1461121720,
        2956646967,
        4031777805,
        4028374788,
        33600511,
        2920084762,
        1018524850,
        629373528,
        3691585981,
        3515945977,
        2091462646,
        2486323059,
        586499841,
        988145025,
        935516892,
        3367335476,
        2599673255,
        2839830854,
        265290510,
        3972581182,
        2759138881,
        3795373465,
        1005194799,
        847297441,
        406762289,
        1314163512,
        1332590856,
        1866599683,
        4127851711,
        750260880,
        613907577,
        1450815602,
        3165620655,
        3734664991,
        3650291728,
        3012275730,
        3704569646,
        1427272223,
        778793252,
        1343938022,
        2676280711,
        2052605720,
        1946737175,
        3164576444,
        3914038668,
        3967478842,
        3682934266,
        1661551462,
        3294938066,
        4011595847,
        840292616,
        3712170807,
        616741398,
        312560963,
        711312465,
        1351876610,
        322626781,
        1910503582,
        271666773,
        2175563734,
        1594956187,
        70604529,
        3617834859,
        1007753275,
        1495573769,
        4069517037,
        2549218298,
        2663038764,
        504708206,
        2263041392,
        3941167025,
        2249088522,
        1514023603,
        1998579484,
        1312622330,
        694541497,
        2582060303,
        2151582166,
        1382467621,
        776784248,
        2618340202,
        3323268794,
        2497899128,
        2784771155,
        503983604,
        4076293799,
        907881277,
        423175695,
        432175456,
        1378068232,
        4145222326,
        3954048622,
        3938656102,
        3820766613,
        2793130115,
        2977904593,
        26017576,
        3274890735,
        3194772133,
        1700274565,
        1756076034,
        4006520079,
        3677328699,
        720338349,
        1533947780,
        354530856,
        688349552,
        3973924725,
        1637815568,
        332179504,
        3949051286,
        53804574,
        2852348879,
        3044236432,
        1282449977,
        3583942155,
        3416972820,
        4006381244,
        1617046695,
        2628476075,
        3002303598,
        1686838959,
        431878346,
        2686675385,
        1700445008,
        1080580658,
        1009431731,
        832498133,
        3223435511,
        2605976345,
        2271191193,
        2516031870,
        1648197032,
        4164389018,
        2548247927,
        300782431,
        375919233,
        238389289,
        3353747414,
        2531188641,
        2019080857,
        1475708069,
        455242339,
        2609103871,
        448939670,
        3451063019,
        1395535956,
        2413381860,
        1841049896,
        1491858159,
        885456874,
        4264095073,
        4001119347,
        1565136089,
        3898914787,
        1108368660,
        540939232,
        1173283510,
        2745871338,
        3681308437,
        4207628240,
        3343053890,
        4016749493,
        1699691293,
        1103962373,
        3625875870,
        2256883143,
        3830138730,
        1031889488,
        3479347698,
        1535977030,
        4236805024,
        3251091107,
        2132092099,
        1774941330,
        1199868427,
        1452454533,
        157007616,
        2904115357,
        342012276,
        595725824,
        1480756522,
        206960106,
        497939518,
        591360097,
        863170706,
        2375253569,
        3596610801,
        1814182875,
        2094937945,
        3421402208,
        1082520231,
        3463918190,
        2785509508,
        435703966,
        3908032597,
        1641649973,
        2842273706,
        3305899714,
        1510255612,
        2148256476,
        2655287854,
        3276092548,
        4258621189,
        236887753,
        3681803219,
        274041037,
        1734335097,
        3815195456,
        3317970021,
        1899903192,
        1026095262,
        4050517792,
        356393447,
        2410691914,
        3873677099,
        3682840055,
        3913112168,
        2491498743,
        4132185628,
        2489919796,
        1091903735,
        1979897079,
        3170134830,
        3567386728,
        3557303409,
        857797738,
        1136121015,
        1342202287,
        507115054,
        2535736646,
        337727348,
        3213592640,
        1301675037,
        2528481711,
        1895095763,
        1721773893,
        3216771564,
        62756741,
        2142006736,
        835421444,
        2531993523,
        1442658625,
        3659876326,
        2882144922,
        676362277,
        1392781812,
        170690266,
        3921047035,
        1759253602,
        3611846912,
        1745797284,
        664899054,
        1329594018,
        3901205900,
        3045908486,
        2062866102,
        2865634940,
        3543621612,
        3464012697,
        1080764994,
        553557557,
        3656615353,
        3996768171,
        991055499,
        499776247,
        1265440854,
        648242737,
        3940784050,
        980351604,
        3713745714,
        1749149687,
        3396870395,
        4211799374,
        3640570775,
        1161844396,
        3125318951,
        1431517754,
        545492359,
        4268468663,
        3499529547,
        1437099964,
        2702547544,
        3433638243,
        2581715763,
        2787789398,
        1060185593,
        1593081372,
        2418618748,
        4260947970,
        69676912,
        2159744348,
        86519011,
        2512459080,
        3838209314,
        1220612927,
        3339683548,
        133810670,
        1090789135,
        1078426020,
        1569222167,
        845107691,
        3583754449,
        4072456591,
        1091646820,
        628848692,
        1613405280,
        3757631651,
        526609435,
        236106946,
        48312990,
        2942717905,
        3402727701,
        1797494240,
        859738849,
        992217954,
        4005476642,
        2243076622,
        3870952857,
        3732016268,
        765654824,
        3490871365,
        2511836413,
        1685915746,
        3888969200,
        1414112111,
        2273134842,
        3281911079,
        4080962846,
        172450625,
        2569994100,
        980381355,
        4109958455,
        2819808352,
        2716589560,
        2568741196,
        3681446669,
        3329971472,
        1835478071,
        660984891,
        3704678404,
        4045999559,
        3422617507,
        3040415634,
        1762651403,
        1719377915,
        3470491036,
        2693910283,
        3642056355,
        3138596744,
        1364962596,
        2073328063,
        1983633131,
        926494387,
        3423689081,
        2150032023,
        4096667949,
        1749200295,
        3328846651,
        309677260,
        2016342300,
        1779581495,
        3079819751,
        111262694,
        1274766160,
        443224088,
        298511866,
        1025883608,
        3806446537,
        1145181785,
        168956806,
        3641502830,
        3584813610,
        1689216846,
        3666258015,
        3200248200,
        1692713982,
        2646376535,
        4042768518,
        1618508792,
        1610833997,
        3523052358,
        4130873264,
        2001055236,
        3610705100,
        2202168115,
        4028541809,
        2961195399,
        1006657119,
        2006996926,
        3186142756,
        1430667929,
        3210227297,
        1314452623,
        4074634658,
        4101304120,
        2273951170,
        1399257539,
        3367210612,
        3027628629,
        1190975929,
        2062231137,
        2333990788,
        2221543033,
        2438960610,
        1181637006,
        548689776,
        2362791313,
        3372408396,
        3104550113,
        3145860560,
        296247880,
        1970579870,
        3078560182,
        3769228297,
        1714227617,
        3291629107,
        3898220290,
        166772364,
        1251581989,
        493813264,
        448347421,
        195405023,
        2709975567,
        677966185,
        3703036547,
        1463355134,
        2715995803,
        1338867538,
        1343315457,
        2802222074,
        2684532164,
        233230375,
        2599980071,
        2000651841,
        3277868038,
        1638401717,
        4028070440,
        3237316320,
        6314154,
        819756386,
        300326615,
        590932579,
        1405279636,
        3267499572,
        3150704214,
        2428286686,
        3959192993,
        3461946742,
        1862657033,
        1266418056,
        963775037,
        2089974820,
        2263052895,
        1917689273,
        448879540,
        3550394620,
        3981727096,
        150775221,
        3627908307,
        1303187396,
        508620638,
        2975983352,
        2726630617,
        1817252668,
        1876281319,
        1457606340,
        908771278,
        3720792119,
        3617206836,
        2455994898,
        1729034894,
        1080033504,
        976866871,
        3556439503,
        2881648439,
        1522871579,
        1555064734,
        1336096578,
        3548522304,
        2579274686,
        3574697629,
        3205460757,
        3593280638,
        3338716283,
        3079412587,
        564236357,
        2993598910,
        1781952180,
        1464380207,
        3163844217,
        3332601554,
        1699332808,
        1393555694,
        1183702653,
        3581086237,
        1288719814,
        691649499,
        2847557200,
        2895455976,
        3193889540,
        2717570544,
        1781354906,
        1676643554,
        2592534050,
        3230253752,
        1126444790,
        2770207658,
        2633158820,
        2210423226,
        2615765581,
        2414155088,
        3127139286,
        673620729,
        2805611233,
        1269405062,
        4015350505,
        3341807571,
        4149409754,
        1057255273,
        2012875353,
        2162469141,
        2276492801,
        2601117357,
        993977747,
        3918593370,
        2654263191,
        753973209,
        36408145,
        2530585658,
        25011837,
        3520020182,
        2088578344,
        530523599,
        2918365339,
        1524020338,
        1518925132,
        3760827505,
        3759777254,
        1202760957,
        3985898139,
        3906192525,
        674977740,
        4174734889,
        2031300136,
        2019492241,
        3983892565,
        4153806404,
        3822280332,
        352677332,
        2297720250,
        60907813,
        90501309,
        3286998549,
        1016092578,
        2535922412,
        2839152426,
        457141659,
        509813237,
        4120667899,
        652014361,
        1966332200,
        2975202805,
        55981186,
        2327461051,
        676427537,
        3255491064,
        2882294119,
        3433927263,
        1307055953,
        942726286,
        933058658,
        2468411793,
        3933900994,
        4215176142,
        1361170020,
        2001714738,
        2830558078,
        3274259782,
        1222529897,
        1679025792,
        2729314320,
        3714953764,
        1770335741,
        151462246,
        3013232138,
        1682292957,
        1483529935,
        471910574,
        1539241949,
        458788160,
        3436315007,
        1807016891,
        3718408830,
        978976581,
        1043663428,
        3165965781,
        1927990952,
        4200891579,
        2372276910,
        3208408903,
        3533431907,
        1412390302,
        2931980059,
        4132332400,
        1947078029,
        3881505623,
        4168226417,
        2941484381,
        1077988104,
        1320477388,
        886195818,
        18198404,
        3786409e3,
        2509781533,
        112762804,
        3463356488,
        1866414978,
        891333506,
        18488651,
        661792760,
        1628790961,
        3885187036,
        3141171499,
        876946877,
        2693282273,
        1372485963,
        791857591,
        2686433993,
        3759982718,
        3167212022,
        3472953795,
        2716379847,
        445679433,
        3561995674,
        3504004811,
        3574258232,
        54117162,
        3331405415,
        2381918588,
        3769707343,
        4154350007,
        1140177722,
        4074052095,
        668550556,
        3214352940,
        367459370,
        261225585,
        2610173221,
        4209349473,
        3468074219,
        3265815641,
        314222801,
        3066103646,
        3808782860,
        282218597,
        3406013506,
        3773591054,
        379116347,
        1285071038,
        846784868,
        2669647154,
        3771962079,
        3550491691,
        2305946142,
        453669953,
        1268987020,
        3317592352,
        3279303384,
        3744833421,
        2610507566,
        3859509063,
        266596637,
        3847019092,
        517658769,
        3462560207,
        3443424879,
        370717030,
        4247526661,
        2224018117,
        4143653529,
        4112773975,
        2788324899,
        2477274417,
        1456262402,
        2901442914,
        1517677493,
        1846949527,
        2295493580,
        3734397586,
        2176403920,
        1280348187,
        1908823572,
        3871786941,
        846861322,
        1172426758,
        3287448474,
        3383383037,
        1655181056,
        3139813346,
        901632758,
        1897031941,
        2986607138,
        3066810236,
        3447102507,
        1393639104,
        373351379,
        950779232,
        625454576,
        3124240540,
        4148612726,
        2007998917,
        544563296,
        2244738638,
        2330496472,
        2058025392,
        1291430526,
        424198748,
        50039436,
        29584100,
        3605783033,
        2429876329,
        2791104160,
        1057563949,
        3255363231,
        3075367218,
        3463963227,
        1469046755,
        985887462
      ];
      var C_ORIG = [
        1332899944,
        1700884034,
        1701343084,
        1684370003,
        1668446532,
        1869963892
      ];
      function _encipher(lr, off, P, S) {
        var n, l = lr[off], r = lr[off + 1];
        l ^= P[0];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[1];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[2];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[3];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[4];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[5];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[6];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[7];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[8];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[9];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[10];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[11];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[12];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[13];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[14];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[15];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[16];
        lr[off] = r ^ P[BLOWFISH_NUM_ROUNDS + 1];
        lr[off + 1] = l;
        return lr;
      }
      __name(_encipher, "_encipher");
      function _streamtoword(data, offp) {
        for (var i = 0, word = 0; i < 4; ++i)
          word = word << 8 | data[offp] & 255, offp = (offp + 1) % data.length;
        return { key: word, offp };
      }
      __name(_streamtoword, "_streamtoword");
      function _key(key, P, S) {
        var offset = 0, lr = [0, 0], plen = P.length, slen = S.length, sw;
        for (var i = 0; i < plen; i++)
          sw = _streamtoword(key, offset), offset = sw.offp, P[i] = P[i] ^ sw.key;
        for (i = 0; i < plen; i += 2)
          lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
        for (i = 0; i < slen; i += 2)
          lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
      }
      __name(_key, "_key");
      function _ekskey(data, key, P, S) {
        var offp = 0, lr = [0, 0], plen = P.length, slen = S.length, sw;
        for (var i = 0; i < plen; i++)
          sw = _streamtoword(key, offp), offp = sw.offp, P[i] = P[i] ^ sw.key;
        offp = 0;
        for (i = 0; i < plen; i += 2)
          sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
        for (i = 0; i < slen; i += 2)
          sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
      }
      __name(_ekskey, "_ekskey");
      function _crypt(b, salt, rounds, callback, progressCallback) {
        var cdata = C_ORIG.slice(), clen = cdata.length, err;
        if (rounds < 4 || rounds > 31) {
          err = Error("Illegal number of rounds (4-31): " + rounds);
          if (callback) {
            nextTick(callback.bind(this, err));
            return;
          } else
            throw err;
        }
        if (salt.length !== BCRYPT_SALT_LEN) {
          err = Error("Illegal salt length: " + salt.length + " != " + BCRYPT_SALT_LEN);
          if (callback) {
            nextTick(callback.bind(this, err));
            return;
          } else
            throw err;
        }
        rounds = 1 << rounds >>> 0;
        var P, S, i = 0, j;
        if (Int32Array) {
          P = new Int32Array(P_ORIG);
          S = new Int32Array(S_ORIG);
        } else {
          P = P_ORIG.slice();
          S = S_ORIG.slice();
        }
        _ekskey(salt, b, P, S);
        function next() {
          if (progressCallback)
            progressCallback(i / rounds);
          if (i < rounds) {
            var start = Date.now();
            for (; i < rounds; ) {
              i = i + 1;
              _key(b, P, S);
              _key(salt, P, S);
              if (Date.now() - start > MAX_EXECUTION_TIME)
                break;
            }
          } else {
            for (i = 0; i < 64; i++)
              for (j = 0; j < clen >> 1; j++)
                _encipher(cdata, j << 1, P, S);
            var ret = [];
            for (i = 0; i < clen; i++)
              ret.push((cdata[i] >> 24 & 255) >>> 0), ret.push((cdata[i] >> 16 & 255) >>> 0), ret.push((cdata[i] >> 8 & 255) >>> 0), ret.push((cdata[i] & 255) >>> 0);
            if (callback) {
              callback(null, ret);
              return;
            } else
              return ret;
          }
          if (callback)
            nextTick(next);
        }
        __name(next, "next");
        if (typeof callback !== "undefined") {
          next();
        } else {
          var res;
          while (true)
            if (typeof (res = next()) !== "undefined")
              return res || [];
        }
      }
      __name(_crypt, "_crypt");
      function _hash(s, salt, callback, progressCallback) {
        var err;
        if (typeof s !== "string" || typeof salt !== "string") {
          err = Error("Invalid string / salt: Not a string");
          if (callback) {
            nextTick(callback.bind(this, err));
            return;
          } else
            throw err;
        }
        var minor, offset;
        if (salt.charAt(0) !== "$" || salt.charAt(1) !== "2") {
          err = Error("Invalid salt version: " + salt.substring(0, 2));
          if (callback) {
            nextTick(callback.bind(this, err));
            return;
          } else
            throw err;
        }
        if (salt.charAt(2) === "$")
          minor = String.fromCharCode(0), offset = 3;
        else {
          minor = salt.charAt(2);
          if (minor !== "a" && minor !== "b" && minor !== "y" || salt.charAt(3) !== "$") {
            err = Error("Invalid salt revision: " + salt.substring(2, 4));
            if (callback) {
              nextTick(callback.bind(this, err));
              return;
            } else
              throw err;
          }
          offset = 4;
        }
        if (salt.charAt(offset + 2) > "$") {
          err = Error("Missing salt rounds");
          if (callback) {
            nextTick(callback.bind(this, err));
            return;
          } else
            throw err;
        }
        var r1 = parseInt(salt.substring(offset, offset + 1), 10) * 10, r2 = parseInt(salt.substring(offset + 1, offset + 2), 10), rounds = r1 + r2, real_salt = salt.substring(offset + 3, offset + 25);
        s += minor >= "a" ? "\0" : "";
        var passwordb = stringToBytes(s), saltb = base64_decode(real_salt, BCRYPT_SALT_LEN);
        function finish(bytes) {
          var res = [];
          res.push("$2");
          if (minor >= "a")
            res.push(minor);
          res.push("$");
          if (rounds < 10)
            res.push("0");
          res.push(rounds.toString());
          res.push("$");
          res.push(base64_encode(saltb, saltb.length));
          res.push(base64_encode(bytes, C_ORIG.length * 4 - 1));
          return res.join("");
        }
        __name(finish, "finish");
        if (typeof callback == "undefined")
          return finish(_crypt(passwordb, saltb, rounds));
        else {
          _crypt(passwordb, saltb, rounds, function(err2, bytes) {
            if (err2)
              callback(err2, null);
            else
              callback(null, finish(bytes));
          }, progressCallback);
        }
      }
      __name(_hash, "_hash");
      bcrypt2.encodeBase64 = base64_encode;
      bcrypt2.decodeBase64 = base64_decode;
      return bcrypt2;
    });
  }
});

// .wrangler/tmp/bundle-CDLSIP/middleware-loader.entry.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// .wrangler/tmp/bundle-CDLSIP/middleware-insertion-facade.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// src/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/hono/dist/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/hono/dist/hono.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/hono/dist/hono-base.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/hono/dist/compose.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context, next) => {
    let index2 = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index2) {
        throw new Error("next() called multiple times");
      }
      index2 = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// node_modules/hono/dist/context.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/hono/dist/request.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/hono/dist/http-exception.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/hono/dist/request/constants.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var GET_MATCH_RESULT = Symbol();

// node_modules/hono/dist/utils/body.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index2) => {
    if (index2 === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");

// node_modules/hono/dist/utils/url.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index2) => {
    const mark = `@${index2}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const path = url.slice(start, queryIndex === -1 ? void 0 : queryIndex);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63) {
      break;
    }
  }
  return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf(`?${key}`, 8);
    if (keyIndex2 === -1) {
      keyIndex2 = url.indexOf(`&${key}`, 8);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURIComponent_), "tryDecodeURIComponent");
var HonoRequest = /* @__PURE__ */ __name(class {
  raw;
  #validatedData;
  #matchResult;
  routeIndex = 0;
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return this.bodyCache.parsedBody ??= await parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  };
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  text() {
    return this.#cachedBody("text");
  }
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  blob() {
    return this.#cachedBody("blob");
  }
  formData() {
    return this.#cachedBody("formData");
  }
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
}, "HonoRequest");

// node_modules/hono/dist/utils/html.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
}, "setDefaultContentType");
var Context = /* @__PURE__ */ __name(class {
  #rawRequest;
  #req;
  env = {};
  #var;
  finalized = false;
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  get res() {
    return this.#res ||= new Response(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  set res(_res) {
    if (this.#res && _res) {
      _res = new Response(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  setLayout = (layout) => this.#layout = layout;
  getLayout = () => this.#layout;
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = new Response(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  };
  status = (status) => {
    this.#status = status;
  };
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  };
  get = (key) => {
    return this.#var ? this.#var.get(key) : void 0;
  };
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return new Response(data, { status, headers: responseHeaders });
  }
  newResponse = (...args) => this.#newResponse(...args);
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  };
  json = (object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  };
  html = (html, arg, headers) => {
    const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  };
  redirect = (location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  };
  notFound = () => {
    this.#notFoundHandler ??= () => new Response();
    return this.#notFoundHandler(this);
  };
}, "Context");

// node_modules/hono/dist/router.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = /* @__PURE__ */ __name(class extends Error {
}, "UnsupportedPathError");

// node_modules/hono/dist/utils/constants.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = /* @__PURE__ */ __name(class {
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  router;
  getPath;
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  errorHandler = errorHandler;
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler);
    });
    return this;
  }
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { basePath: this._basePath, path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request, { env });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  };
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  };
}, "Hono");

// node_modules/hono/dist/router/reg-exp-router/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/hono/dist/router/reg-exp-router/router.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/hono/dist/router/reg-exp-router/matcher.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = /* @__PURE__ */ __name((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index2 = match3.indexOf("", 1);
    return [matcher[1][index2], match3];
  }, "match2");
  this.match = match2;
  return match2(method, path);
}
__name(match, "match");

// node_modules/hono/dist/router/reg-exp-router/node.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
__name(compareKey, "compareKey");
var Node = /* @__PURE__ */ __name(class {
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index2, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index2;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new Node();
        if (name !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new Node();
      }
    }
    node.insert(restTokens, index2, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
}, "Node");

// node_modules/hono/dist/router/reg-exp-router/trie.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var Trie = /* @__PURE__ */ __name(class {
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path, index2, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index2, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
}, "Trie");

// node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = /* @__PURE__ */ __name(class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
}, "RegExpRouter");

// node_modules/hono/dist/router/reg-exp-router/prepared-router.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/hono/dist/router/smart-router/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/hono/dist/router/smart-router/router.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var SmartRouter = /* @__PURE__ */ __name(class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
}, "SmartRouter");

// node_modules/hono/dist/router/trie-router/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/hono/dist/router/trie-router/router.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/hono/dist/router/trie-router/node.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var emptyParams = /* @__PURE__ */ Object.create(null);
var Node2 = /* @__PURE__ */ __name(class {
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #getHandlerSets(node, method, nodeParams, params) {
    const handlerSets = [];
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
    return handlerSets;
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              handlerSets.push(
                ...this.#getHandlerSets(nextNode.#children["*"], method, node.#params)
              );
            }
            handlerSets.push(...this.#getHandlerSets(nextNode, method, node.#params));
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              handlerSets.push(...this.#getHandlerSets(astNode, method, node.#params));
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          const restPathString = parts.slice(i).join("/");
          if (matcher instanceof RegExp) {
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              handlerSets.push(...this.#getHandlerSets(child, method, node.#params, params));
              if (Object.keys(child.#children).length) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              handlerSets.push(...this.#getHandlerSets(child, method, params, node.#params));
              if (child.#children["*"]) {
                handlerSets.push(
                  ...this.#getHandlerSets(child.#children["*"], method, params, node.#params)
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      curNodes = tempNodes.concat(curNodesQueue.shift() ?? []);
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
}, "Node");

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = /* @__PURE__ */ __name(class {
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
}, "TrieRouter");

// node_modules/hono/dist/hono.js
var Hono2 = /* @__PURE__ */ __name(class extends Hono {
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
}, "Hono");

// node_modules/hono/dist/middleware/cors/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var cors = /* @__PURE__ */ __name((options) => {
  const defaults = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    allowHeaders: [],
    exposeHeaders: []
  };
  const opts = {
    ...defaults,
    ...options
  };
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function") {
      return optsAllowMethods;
    } else if (Array.isArray(optsAllowMethods)) {
      return () => optsAllowMethods;
    } else {
      return () => [];
    }
  })(opts.allowMethods);
  return /* @__PURE__ */ __name(async function cors2(c, next) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    __name(set, "set");
    const allowOrigin = await findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (opts.exposeHeaders?.length) {
      set("Access-Control-Expose-Headers", opts.exposeHeaders.join(","));
    }
    if (c.req.method === "OPTIONS") {
      if (opts.origin !== "*") {
        set("Vary", "Origin");
      }
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      const allowMethods = await findAllowMethods(c.req.header("origin") || "", c);
      if (allowMethods.length) {
        set("Access-Control-Allow-Methods", allowMethods.join(","));
      }
      let headers = opts.allowHeaders;
      if (!headers?.length) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headers = requestHeaders.split(/\s*,\s*/);
        }
      }
      if (headers?.length) {
        set("Access-Control-Allow-Headers", headers.join(","));
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c.res.headers.delete("Content-Length");
      c.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
    if (opts.origin !== "*") {
      c.header("Vary", "Origin", { append: true });
    }
  }, "cors2");
}, "cors");

// node_modules/@supabase/supabase-js/dist/module/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/functions-js/dist/module/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/functions-js/dist/module/FunctionsClient.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/tslib/tslib.es6.mjs
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
__name(__rest, "__rest");
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  __name(adopt, "adopt");
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    __name(fulfilled, "fulfilled");
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    __name(rejected, "rejected");
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    __name(step, "step");
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
__name(__awaiter, "__awaiter");

// node_modules/@supabase/functions-js/dist/module/helper.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var resolveFetch = /* @__PURE__ */ __name((customFetch) => {
  if (customFetch) {
    return (...args) => customFetch(...args);
  }
  return (...args) => fetch(...args);
}, "resolveFetch");

// node_modules/@supabase/functions-js/dist/module/types.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var FunctionsError = class extends Error {
  constructor(message, name = "FunctionsError", context) {
    super(message);
    this.name = name;
    this.context = context;
  }
};
__name(FunctionsError, "FunctionsError");
var FunctionsFetchError = class extends FunctionsError {
  constructor(context) {
    super("Failed to send a request to the Edge Function", "FunctionsFetchError", context);
  }
};
__name(FunctionsFetchError, "FunctionsFetchError");
var FunctionsRelayError = class extends FunctionsError {
  constructor(context) {
    super("Relay Error invoking the Edge Function", "FunctionsRelayError", context);
  }
};
__name(FunctionsRelayError, "FunctionsRelayError");
var FunctionsHttpError = class extends FunctionsError {
  constructor(context) {
    super("Edge Function returned a non-2xx status code", "FunctionsHttpError", context);
  }
};
__name(FunctionsHttpError, "FunctionsHttpError");
var FunctionRegion;
(function(FunctionRegion2) {
  FunctionRegion2["Any"] = "any";
  FunctionRegion2["ApNortheast1"] = "ap-northeast-1";
  FunctionRegion2["ApNortheast2"] = "ap-northeast-2";
  FunctionRegion2["ApSouth1"] = "ap-south-1";
  FunctionRegion2["ApSoutheast1"] = "ap-southeast-1";
  FunctionRegion2["ApSoutheast2"] = "ap-southeast-2";
  FunctionRegion2["CaCentral1"] = "ca-central-1";
  FunctionRegion2["EuCentral1"] = "eu-central-1";
  FunctionRegion2["EuWest1"] = "eu-west-1";
  FunctionRegion2["EuWest2"] = "eu-west-2";
  FunctionRegion2["EuWest3"] = "eu-west-3";
  FunctionRegion2["SaEast1"] = "sa-east-1";
  FunctionRegion2["UsEast1"] = "us-east-1";
  FunctionRegion2["UsWest1"] = "us-west-1";
  FunctionRegion2["UsWest2"] = "us-west-2";
})(FunctionRegion || (FunctionRegion = {}));

// node_modules/@supabase/functions-js/dist/module/FunctionsClient.js
var FunctionsClient = class {
  constructor(url, { headers = {}, customFetch, region = FunctionRegion.Any } = {}) {
    this.url = url;
    this.headers = headers;
    this.region = region;
    this.fetch = resolveFetch(customFetch);
  }
  /**
   * Updates the authorization header
   * @param token - the new jwt token sent in the authorisation header
   */
  setAuth(token) {
    this.headers.Authorization = `Bearer ${token}`;
  }
  /**
   * Invokes a function
   * @param functionName - The name of the Function to invoke.
   * @param options - Options for invoking the Function.
   */
  invoke(functionName_1) {
    return __awaiter(this, arguments, void 0, function* (functionName, options = {}) {
      var _a2;
      try {
        const { headers, method, body: functionArgs, signal } = options;
        let _headers = {};
        let { region } = options;
        if (!region) {
          region = this.region;
        }
        const url = new URL(`${this.url}/${functionName}`);
        if (region && region !== "any") {
          _headers["x-region"] = region;
          url.searchParams.set("forceFunctionRegion", region);
        }
        let body;
        if (functionArgs && (headers && !Object.prototype.hasOwnProperty.call(headers, "Content-Type") || !headers)) {
          if (typeof Blob !== "undefined" && functionArgs instanceof Blob || functionArgs instanceof ArrayBuffer) {
            _headers["Content-Type"] = "application/octet-stream";
            body = functionArgs;
          } else if (typeof functionArgs === "string") {
            _headers["Content-Type"] = "text/plain";
            body = functionArgs;
          } else if (typeof FormData !== "undefined" && functionArgs instanceof FormData) {
            body = functionArgs;
          } else {
            _headers["Content-Type"] = "application/json";
            body = JSON.stringify(functionArgs);
          }
        } else {
          body = functionArgs;
        }
        const response = yield this.fetch(url.toString(), {
          method: method || "POST",
          // headers priority is (high to low):
          // 1. invoke-level headers
          // 2. client-level headers
          // 3. default Content-Type header
          headers: Object.assign(Object.assign(Object.assign({}, _headers), this.headers), headers),
          body,
          signal
        }).catch((fetchError) => {
          if (fetchError.name === "AbortError") {
            throw fetchError;
          }
          throw new FunctionsFetchError(fetchError);
        });
        const isRelayError = response.headers.get("x-relay-error");
        if (isRelayError && isRelayError === "true") {
          throw new FunctionsRelayError(response);
        }
        if (!response.ok) {
          throw new FunctionsHttpError(response);
        }
        let responseType = ((_a2 = response.headers.get("Content-Type")) !== null && _a2 !== void 0 ? _a2 : "text/plain").split(";")[0].trim();
        let data;
        if (responseType === "application/json") {
          data = yield response.json();
        } else if (responseType === "application/octet-stream" || responseType === "application/pdf") {
          data = yield response.blob();
        } else if (responseType === "text/event-stream") {
          data = response;
        } else if (responseType === "multipart/form-data") {
          data = yield response.formData();
        } else {
          data = yield response.text();
        }
        return { data, error: null, response };
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return { data: null, error: new FunctionsFetchError(error) };
        }
        return {
          data: null,
          error,
          response: error instanceof FunctionsHttpError || error instanceof FunctionsRelayError ? error.context : void 0
        };
      }
    });
  }
};
__name(FunctionsClient, "FunctionsClient");

// node_modules/@supabase/postgrest-js/dist/esm/wrapper.mjs
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var index = __toESM(require_cjs(), 1);
var {
  PostgrestClient,
  PostgrestQueryBuilder,
  PostgrestFilterBuilder,
  PostgrestTransformBuilder,
  PostgrestBuilder,
  PostgrestError
} = index.default || index;

// node_modules/@supabase/realtime-js/dist/module/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var WebSocketFactory = class {
  static detectEnvironment() {
    var _a2;
    if (typeof WebSocket !== "undefined") {
      return { type: "native", constructor: WebSocket };
    }
    if (typeof globalThis !== "undefined" && typeof globalThis.WebSocket !== "undefined") {
      return { type: "native", constructor: globalThis.WebSocket };
    }
    if (typeof global !== "undefined" && typeof global.WebSocket !== "undefined") {
      return { type: "native", constructor: global.WebSocket };
    }
    if (typeof globalThis !== "undefined" && typeof globalThis.WebSocketPair !== "undefined" && typeof globalThis.WebSocket === "undefined") {
      return {
        type: "cloudflare",
        error: "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",
        workaround: "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."
      };
    }
    if (typeof globalThis !== "undefined" && globalThis.EdgeRuntime || typeof navigator !== "undefined" && ((_a2 = "Cloudflare-Workers") === null || _a2 === void 0 ? void 0 : _a2.includes("Vercel-Edge"))) {
      return {
        type: "unsupported",
        error: "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",
        workaround: "Use serverless functions or a different deployment target for WebSocket functionality."
      };
    }
    if (typeof process !== "undefined") {
      const processVersions = process["versions"];
      if (processVersions && processVersions["node"]) {
        const versionString = processVersions["node"];
        const nodeVersion = parseInt(versionString.replace(/^v/, "").split(".")[0]);
        if (nodeVersion >= 22) {
          if (typeof globalThis.WebSocket !== "undefined") {
            return { type: "native", constructor: globalThis.WebSocket };
          }
          return {
            type: "unsupported",
            error: `Node.js ${nodeVersion} detected but native WebSocket not found.`,
            workaround: "Provide a WebSocket implementation via the transport option."
          };
        }
        return {
          type: "unsupported",
          error: `Node.js ${nodeVersion} detected without native WebSocket support.`,
          workaround: 'For Node.js < 22, install "ws" package and provide it via the transport option:\nimport ws from "ws"\nnew RealtimeClient(url, { transport: ws })'
        };
      }
    }
    return {
      type: "unsupported",
      error: "Unknown JavaScript runtime without WebSocket support.",
      workaround: "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."
    };
  }
  static getWebSocketConstructor() {
    const env = this.detectEnvironment();
    if (env.constructor) {
      return env.constructor;
    }
    let errorMessage = env.error || "WebSocket not supported in this environment.";
    if (env.workaround) {
      errorMessage += `

Suggested solution: ${env.workaround}`;
    }
    throw new Error(errorMessage);
  }
  static createWebSocket(url, protocols) {
    const WS = this.getWebSocketConstructor();
    return new WS(url, protocols);
  }
  static isWebSocketSupported() {
    try {
      const env = this.detectEnvironment();
      return env.type === "native" || env.type === "ws";
    } catch (_a2) {
      return false;
    }
  }
};
__name(WebSocketFactory, "WebSocketFactory");
var websocket_factory_default = WebSocketFactory;

// node_modules/@supabase/realtime-js/dist/module/lib/constants.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/realtime-js/dist/module/lib/version.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var version = "2.80.0";

// node_modules/@supabase/realtime-js/dist/module/lib/constants.js
var DEFAULT_VERSION = `realtime-js/${version}`;
var VSN = "1.0.0";
var DEFAULT_TIMEOUT = 1e4;
var WS_CLOSE_NORMAL = 1e3;
var MAX_PUSH_BUFFER_SIZE = 100;
var SOCKET_STATES;
(function(SOCKET_STATES2) {
  SOCKET_STATES2[SOCKET_STATES2["connecting"] = 0] = "connecting";
  SOCKET_STATES2[SOCKET_STATES2["open"] = 1] = "open";
  SOCKET_STATES2[SOCKET_STATES2["closing"] = 2] = "closing";
  SOCKET_STATES2[SOCKET_STATES2["closed"] = 3] = "closed";
})(SOCKET_STATES || (SOCKET_STATES = {}));
var CHANNEL_STATES;
(function(CHANNEL_STATES2) {
  CHANNEL_STATES2["closed"] = "closed";
  CHANNEL_STATES2["errored"] = "errored";
  CHANNEL_STATES2["joined"] = "joined";
  CHANNEL_STATES2["joining"] = "joining";
  CHANNEL_STATES2["leaving"] = "leaving";
})(CHANNEL_STATES || (CHANNEL_STATES = {}));
var CHANNEL_EVENTS;
(function(CHANNEL_EVENTS2) {
  CHANNEL_EVENTS2["close"] = "phx_close";
  CHANNEL_EVENTS2["error"] = "phx_error";
  CHANNEL_EVENTS2["join"] = "phx_join";
  CHANNEL_EVENTS2["reply"] = "phx_reply";
  CHANNEL_EVENTS2["leave"] = "phx_leave";
  CHANNEL_EVENTS2["access_token"] = "access_token";
})(CHANNEL_EVENTS || (CHANNEL_EVENTS = {}));
var TRANSPORTS;
(function(TRANSPORTS2) {
  TRANSPORTS2["websocket"] = "websocket";
})(TRANSPORTS || (TRANSPORTS = {}));
var CONNECTION_STATE;
(function(CONNECTION_STATE2) {
  CONNECTION_STATE2["Connecting"] = "connecting";
  CONNECTION_STATE2["Open"] = "open";
  CONNECTION_STATE2["Closing"] = "closing";
  CONNECTION_STATE2["Closed"] = "closed";
})(CONNECTION_STATE || (CONNECTION_STATE = {}));

// node_modules/@supabase/realtime-js/dist/module/lib/serializer.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var Serializer = class {
  constructor() {
    this.HEADER_LENGTH = 1;
  }
  decode(rawPayload, callback) {
    if (rawPayload.constructor === ArrayBuffer) {
      return callback(this._binaryDecode(rawPayload));
    }
    if (typeof rawPayload === "string") {
      return callback(JSON.parse(rawPayload));
    }
    return callback({});
  }
  _binaryDecode(buffer) {
    const view = new DataView(buffer);
    const decoder = new TextDecoder();
    return this._decodeBroadcast(buffer, view, decoder);
  }
  _decodeBroadcast(buffer, view, decoder) {
    const topicSize = view.getUint8(1);
    const eventSize = view.getUint8(2);
    let offset = this.HEADER_LENGTH + 2;
    const topic = decoder.decode(buffer.slice(offset, offset + topicSize));
    offset = offset + topicSize;
    const event = decoder.decode(buffer.slice(offset, offset + eventSize));
    offset = offset + eventSize;
    const data = JSON.parse(decoder.decode(buffer.slice(offset, buffer.byteLength)));
    return { ref: null, topic, event, payload: data };
  }
};
__name(Serializer, "Serializer");

// node_modules/@supabase/realtime-js/dist/module/lib/timer.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var Timer = class {
  constructor(callback, timerCalc) {
    this.callback = callback;
    this.timerCalc = timerCalc;
    this.timer = void 0;
    this.tries = 0;
    this.callback = callback;
    this.timerCalc = timerCalc;
  }
  reset() {
    this.tries = 0;
    clearTimeout(this.timer);
    this.timer = void 0;
  }
  // Cancels any previous scheduleTimeout and schedules callback
  scheduleTimeout() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.tries = this.tries + 1;
      this.callback();
    }, this.timerCalc(this.tries + 1));
  }
};
__name(Timer, "Timer");

// node_modules/@supabase/realtime-js/dist/module/lib/transformers.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var PostgresTypes;
(function(PostgresTypes2) {
  PostgresTypes2["abstime"] = "abstime";
  PostgresTypes2["bool"] = "bool";
  PostgresTypes2["date"] = "date";
  PostgresTypes2["daterange"] = "daterange";
  PostgresTypes2["float4"] = "float4";
  PostgresTypes2["float8"] = "float8";
  PostgresTypes2["int2"] = "int2";
  PostgresTypes2["int4"] = "int4";
  PostgresTypes2["int4range"] = "int4range";
  PostgresTypes2["int8"] = "int8";
  PostgresTypes2["int8range"] = "int8range";
  PostgresTypes2["json"] = "json";
  PostgresTypes2["jsonb"] = "jsonb";
  PostgresTypes2["money"] = "money";
  PostgresTypes2["numeric"] = "numeric";
  PostgresTypes2["oid"] = "oid";
  PostgresTypes2["reltime"] = "reltime";
  PostgresTypes2["text"] = "text";
  PostgresTypes2["time"] = "time";
  PostgresTypes2["timestamp"] = "timestamp";
  PostgresTypes2["timestamptz"] = "timestamptz";
  PostgresTypes2["timetz"] = "timetz";
  PostgresTypes2["tsrange"] = "tsrange";
  PostgresTypes2["tstzrange"] = "tstzrange";
})(PostgresTypes || (PostgresTypes = {}));
var convertChangeData = /* @__PURE__ */ __name((columns, record, options = {}) => {
  var _a2;
  const skipTypes = (_a2 = options.skipTypes) !== null && _a2 !== void 0 ? _a2 : [];
  if (!record) {
    return {};
  }
  return Object.keys(record).reduce((acc, rec_key) => {
    acc[rec_key] = convertColumn(rec_key, columns, record, skipTypes);
    return acc;
  }, {});
}, "convertChangeData");
var convertColumn = /* @__PURE__ */ __name((columnName, columns, record, skipTypes) => {
  const column = columns.find((x) => x.name === columnName);
  const colType = column === null || column === void 0 ? void 0 : column.type;
  const value = record[columnName];
  if (colType && !skipTypes.includes(colType)) {
    return convertCell(colType, value);
  }
  return noop(value);
}, "convertColumn");
var convertCell = /* @__PURE__ */ __name((type, value) => {
  if (type.charAt(0) === "_") {
    const dataType = type.slice(1, type.length);
    return toArray(value, dataType);
  }
  switch (type) {
    case PostgresTypes.bool:
      return toBoolean(value);
    case PostgresTypes.float4:
    case PostgresTypes.float8:
    case PostgresTypes.int2:
    case PostgresTypes.int4:
    case PostgresTypes.int8:
    case PostgresTypes.numeric:
    case PostgresTypes.oid:
      return toNumber(value);
    case PostgresTypes.json:
    case PostgresTypes.jsonb:
      return toJson(value);
    case PostgresTypes.timestamp:
      return toTimestampString(value);
    case PostgresTypes.abstime:
    case PostgresTypes.date:
    case PostgresTypes.daterange:
    case PostgresTypes.int4range:
    case PostgresTypes.int8range:
    case PostgresTypes.money:
    case PostgresTypes.reltime:
    case PostgresTypes.text:
    case PostgresTypes.time:
    case PostgresTypes.timestamptz:
    case PostgresTypes.timetz:
    case PostgresTypes.tsrange:
    case PostgresTypes.tstzrange:
      return noop(value);
    default:
      return noop(value);
  }
}, "convertCell");
var noop = /* @__PURE__ */ __name((value) => {
  return value;
}, "noop");
var toBoolean = /* @__PURE__ */ __name((value) => {
  switch (value) {
    case "t":
      return true;
    case "f":
      return false;
    default:
      return value;
  }
}, "toBoolean");
var toNumber = /* @__PURE__ */ __name((value) => {
  if (typeof value === "string") {
    const parsedValue = parseFloat(value);
    if (!Number.isNaN(parsedValue)) {
      return parsedValue;
    }
  }
  return value;
}, "toNumber");
var toJson = /* @__PURE__ */ __name((value) => {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.log(`JSON parse error: ${error}`);
      return value;
    }
  }
  return value;
}, "toJson");
var toArray = /* @__PURE__ */ __name((value, type) => {
  if (typeof value !== "string") {
    return value;
  }
  const lastIdx = value.length - 1;
  const closeBrace = value[lastIdx];
  const openBrace = value[0];
  if (openBrace === "{" && closeBrace === "}") {
    let arr;
    const valTrim = value.slice(1, lastIdx);
    try {
      arr = JSON.parse("[" + valTrim + "]");
    } catch (_) {
      arr = valTrim ? valTrim.split(",") : [];
    }
    return arr.map((val) => convertCell(type, val));
  }
  return value;
}, "toArray");
var toTimestampString = /* @__PURE__ */ __name((value) => {
  if (typeof value === "string") {
    return value.replace(" ", "T");
  }
  return value;
}, "toTimestampString");
var httpEndpointURL = /* @__PURE__ */ __name((socketUrl) => {
  const wsUrl = new URL(socketUrl);
  wsUrl.protocol = wsUrl.protocol.replace(/^ws/i, "http");
  wsUrl.pathname = wsUrl.pathname.replace(/\/+$/, "").replace(/\/socket\/websocket$/i, "").replace(/\/socket$/i, "").replace(/\/websocket$/i, "");
  if (wsUrl.pathname === "" || wsUrl.pathname === "/") {
    wsUrl.pathname = "/api/broadcast";
  } else {
    wsUrl.pathname = wsUrl.pathname + "/api/broadcast";
  }
  return wsUrl.href;
}, "httpEndpointURL");

// node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/realtime-js/dist/module/lib/push.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var Push = class {
  /**
   * Initializes the Push
   *
   * @param channel The Channel
   * @param event The event, for example `"phx_join"`
   * @param payload The payload, for example `{user_id: 123}`
   * @param timeout The push timeout in milliseconds
   */
  constructor(channel, event, payload = {}, timeout = DEFAULT_TIMEOUT) {
    this.channel = channel;
    this.event = event;
    this.payload = payload;
    this.timeout = timeout;
    this.sent = false;
    this.timeoutTimer = void 0;
    this.ref = "";
    this.receivedResp = null;
    this.recHooks = [];
    this.refEvent = null;
  }
  resend(timeout) {
    this.timeout = timeout;
    this._cancelRefEvent();
    this.ref = "";
    this.refEvent = null;
    this.receivedResp = null;
    this.sent = false;
    this.send();
  }
  send() {
    if (this._hasReceived("timeout")) {
      return;
    }
    this.startTimeout();
    this.sent = true;
    this.channel.socket.push({
      topic: this.channel.topic,
      event: this.event,
      payload: this.payload,
      ref: this.ref,
      join_ref: this.channel._joinRef()
    });
  }
  updatePayload(payload) {
    this.payload = Object.assign(Object.assign({}, this.payload), payload);
  }
  receive(status, callback) {
    var _a2;
    if (this._hasReceived(status)) {
      callback((_a2 = this.receivedResp) === null || _a2 === void 0 ? void 0 : _a2.response);
    }
    this.recHooks.push({ status, callback });
    return this;
  }
  startTimeout() {
    if (this.timeoutTimer) {
      return;
    }
    this.ref = this.channel.socket._makeRef();
    this.refEvent = this.channel._replyEventName(this.ref);
    const callback = /* @__PURE__ */ __name((payload) => {
      this._cancelRefEvent();
      this._cancelTimeout();
      this.receivedResp = payload;
      this._matchReceive(payload);
    }, "callback");
    this.channel._on(this.refEvent, {}, callback);
    this.timeoutTimer = setTimeout(() => {
      this.trigger("timeout", {});
    }, this.timeout);
  }
  trigger(status, response) {
    if (this.refEvent)
      this.channel._trigger(this.refEvent, { status, response });
  }
  destroy() {
    this._cancelRefEvent();
    this._cancelTimeout();
  }
  _cancelRefEvent() {
    if (!this.refEvent) {
      return;
    }
    this.channel._off(this.refEvent, {});
  }
  _cancelTimeout() {
    clearTimeout(this.timeoutTimer);
    this.timeoutTimer = void 0;
  }
  _matchReceive({ status, response }) {
    this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
  }
  _hasReceived(status) {
    return this.receivedResp && this.receivedResp.status === status;
  }
};
__name(Push, "Push");

// node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var REALTIME_PRESENCE_LISTEN_EVENTS;
(function(REALTIME_PRESENCE_LISTEN_EVENTS2) {
  REALTIME_PRESENCE_LISTEN_EVENTS2["SYNC"] = "sync";
  REALTIME_PRESENCE_LISTEN_EVENTS2["JOIN"] = "join";
  REALTIME_PRESENCE_LISTEN_EVENTS2["LEAVE"] = "leave";
})(REALTIME_PRESENCE_LISTEN_EVENTS || (REALTIME_PRESENCE_LISTEN_EVENTS = {}));
var RealtimePresence = class {
  /**
   * Initializes the Presence.
   *
   * @param channel - The RealtimeChannel
   * @param opts - The options,
   *        for example `{events: {state: 'state', diff: 'diff'}}`
   */
  constructor(channel, opts) {
    this.channel = channel;
    this.state = {};
    this.pendingDiffs = [];
    this.joinRef = null;
    this.enabled = false;
    this.caller = {
      onJoin: () => {
      },
      onLeave: () => {
      },
      onSync: () => {
      }
    };
    const events = (opts === null || opts === void 0 ? void 0 : opts.events) || {
      state: "presence_state",
      diff: "presence_diff"
    };
    this.channel._on(events.state, {}, (newState) => {
      const { onJoin, onLeave, onSync } = this.caller;
      this.joinRef = this.channel._joinRef();
      this.state = RealtimePresence.syncState(this.state, newState, onJoin, onLeave);
      this.pendingDiffs.forEach((diff) => {
        this.state = RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
      });
      this.pendingDiffs = [];
      onSync();
    });
    this.channel._on(events.diff, {}, (diff) => {
      const { onJoin, onLeave, onSync } = this.caller;
      if (this.inPendingSyncState()) {
        this.pendingDiffs.push(diff);
      } else {
        this.state = RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
        onSync();
      }
    });
    this.onJoin((key, currentPresences, newPresences) => {
      this.channel._trigger("presence", {
        event: "join",
        key,
        currentPresences,
        newPresences
      });
    });
    this.onLeave((key, currentPresences, leftPresences) => {
      this.channel._trigger("presence", {
        event: "leave",
        key,
        currentPresences,
        leftPresences
      });
    });
    this.onSync(() => {
      this.channel._trigger("presence", { event: "sync" });
    });
  }
  /**
   * Used to sync the list of presences on the server with the
   * client's state.
   *
   * An optional `onJoin` and `onLeave` callback can be provided to
   * react to changes in the client's local presences across
   * disconnects and reconnects with the server.
   *
   * @internal
   */
  static syncState(currentState, newState, onJoin, onLeave) {
    const state = this.cloneDeep(currentState);
    const transformedState = this.transformState(newState);
    const joins = {};
    const leaves = {};
    this.map(state, (key, presences) => {
      if (!transformedState[key]) {
        leaves[key] = presences;
      }
    });
    this.map(transformedState, (key, newPresences) => {
      const currentPresences = state[key];
      if (currentPresences) {
        const newPresenceRefs = newPresences.map((m) => m.presence_ref);
        const curPresenceRefs = currentPresences.map((m) => m.presence_ref);
        const joinedPresences = newPresences.filter((m) => curPresenceRefs.indexOf(m.presence_ref) < 0);
        const leftPresences = currentPresences.filter((m) => newPresenceRefs.indexOf(m.presence_ref) < 0);
        if (joinedPresences.length > 0) {
          joins[key] = joinedPresences;
        }
        if (leftPresences.length > 0) {
          leaves[key] = leftPresences;
        }
      } else {
        joins[key] = newPresences;
      }
    });
    return this.syncDiff(state, { joins, leaves }, onJoin, onLeave);
  }
  /**
   * Used to sync a diff of presence join and leave events from the
   * server, as they happen.
   *
   * Like `syncState`, `syncDiff` accepts optional `onJoin` and
   * `onLeave` callbacks to react to a user joining or leaving from a
   * device.
   *
   * @internal
   */
  static syncDiff(state, diff, onJoin, onLeave) {
    const { joins, leaves } = {
      joins: this.transformState(diff.joins),
      leaves: this.transformState(diff.leaves)
    };
    if (!onJoin) {
      onJoin = /* @__PURE__ */ __name(() => {
      }, "onJoin");
    }
    if (!onLeave) {
      onLeave = /* @__PURE__ */ __name(() => {
      }, "onLeave");
    }
    this.map(joins, (key, newPresences) => {
      var _a2;
      const currentPresences = (_a2 = state[key]) !== null && _a2 !== void 0 ? _a2 : [];
      state[key] = this.cloneDeep(newPresences);
      if (currentPresences.length > 0) {
        const joinedPresenceRefs = state[key].map((m) => m.presence_ref);
        const curPresences = currentPresences.filter((m) => joinedPresenceRefs.indexOf(m.presence_ref) < 0);
        state[key].unshift(...curPresences);
      }
      onJoin(key, currentPresences, newPresences);
    });
    this.map(leaves, (key, leftPresences) => {
      let currentPresences = state[key];
      if (!currentPresences)
        return;
      const presenceRefsToRemove = leftPresences.map((m) => m.presence_ref);
      currentPresences = currentPresences.filter((m) => presenceRefsToRemove.indexOf(m.presence_ref) < 0);
      state[key] = currentPresences;
      onLeave(key, currentPresences, leftPresences);
      if (currentPresences.length === 0)
        delete state[key];
    });
    return state;
  }
  /** @internal */
  static map(obj, func) {
    return Object.getOwnPropertyNames(obj).map((key) => func(key, obj[key]));
  }
  /**
   * Remove 'metas' key
   * Change 'phx_ref' to 'presence_ref'
   * Remove 'phx_ref' and 'phx_ref_prev'
   *
   * @example
   * // returns {
   *  abc123: [
   *    { presence_ref: '2', user_id: 1 },
   *    { presence_ref: '3', user_id: 2 }
   *  ]
   * }
   * RealtimePresence.transformState({
   *  abc123: {
   *    metas: [
   *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
   *      { phx_ref: '3', user_id: 2 }
   *    ]
   *  }
   * })
   *
   * @internal
   */
  static transformState(state) {
    state = this.cloneDeep(state);
    return Object.getOwnPropertyNames(state).reduce((newState, key) => {
      const presences = state[key];
      if ("metas" in presences) {
        newState[key] = presences.metas.map((presence) => {
          presence["presence_ref"] = presence["phx_ref"];
          delete presence["phx_ref"];
          delete presence["phx_ref_prev"];
          return presence;
        });
      } else {
        newState[key] = presences;
      }
      return newState;
    }, {});
  }
  /** @internal */
  static cloneDeep(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  /** @internal */
  onJoin(callback) {
    this.caller.onJoin = callback;
  }
  /** @internal */
  onLeave(callback) {
    this.caller.onLeave = callback;
  }
  /** @internal */
  onSync(callback) {
    this.caller.onSync = callback;
  }
  /** @internal */
  inPendingSyncState() {
    return !this.joinRef || this.joinRef !== this.channel._joinRef();
  }
};
__name(RealtimePresence, "RealtimePresence");

// node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js
var REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
(function(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2) {
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["ALL"] = "*";
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["INSERT"] = "INSERT";
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["UPDATE"] = "UPDATE";
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["DELETE"] = "DELETE";
})(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
var REALTIME_LISTEN_TYPES;
(function(REALTIME_LISTEN_TYPES2) {
  REALTIME_LISTEN_TYPES2["BROADCAST"] = "broadcast";
  REALTIME_LISTEN_TYPES2["PRESENCE"] = "presence";
  REALTIME_LISTEN_TYPES2["POSTGRES_CHANGES"] = "postgres_changes";
  REALTIME_LISTEN_TYPES2["SYSTEM"] = "system";
})(REALTIME_LISTEN_TYPES || (REALTIME_LISTEN_TYPES = {}));
var REALTIME_SUBSCRIBE_STATES;
(function(REALTIME_SUBSCRIBE_STATES2) {
  REALTIME_SUBSCRIBE_STATES2["SUBSCRIBED"] = "SUBSCRIBED";
  REALTIME_SUBSCRIBE_STATES2["TIMED_OUT"] = "TIMED_OUT";
  REALTIME_SUBSCRIBE_STATES2["CLOSED"] = "CLOSED";
  REALTIME_SUBSCRIBE_STATES2["CHANNEL_ERROR"] = "CHANNEL_ERROR";
})(REALTIME_SUBSCRIBE_STATES || (REALTIME_SUBSCRIBE_STATES = {}));
var RealtimeChannel = class {
  constructor(topic, params = { config: {} }, socket) {
    var _a2, _b;
    this.topic = topic;
    this.params = params;
    this.socket = socket;
    this.bindings = {};
    this.state = CHANNEL_STATES.closed;
    this.joinedOnce = false;
    this.pushBuffer = [];
    this.subTopic = topic.replace(/^realtime:/i, "");
    this.params.config = Object.assign({
      broadcast: { ack: false, self: false },
      presence: { key: "", enabled: false },
      private: false
    }, params.config);
    this.timeout = this.socket.timeout;
    this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
    this.rejoinTimer = new Timer(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs);
    this.joinPush.receive("ok", () => {
      this.state = CHANNEL_STATES.joined;
      this.rejoinTimer.reset();
      this.pushBuffer.forEach((pushEvent) => pushEvent.send());
      this.pushBuffer = [];
    });
    this._onClose(() => {
      this.rejoinTimer.reset();
      this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`);
      this.state = CHANNEL_STATES.closed;
      this.socket._remove(this);
    });
    this._onError((reason) => {
      if (this._isLeaving() || this._isClosed()) {
        return;
      }
      this.socket.log("channel", `error ${this.topic}`, reason);
      this.state = CHANNEL_STATES.errored;
      this.rejoinTimer.scheduleTimeout();
    });
    this.joinPush.receive("timeout", () => {
      if (!this._isJoining()) {
        return;
      }
      this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
      this.state = CHANNEL_STATES.errored;
      this.rejoinTimer.scheduleTimeout();
    });
    this.joinPush.receive("error", (reason) => {
      if (this._isLeaving() || this._isClosed()) {
        return;
      }
      this.socket.log("channel", `error ${this.topic}`, reason);
      this.state = CHANNEL_STATES.errored;
      this.rejoinTimer.scheduleTimeout();
    });
    this._on(CHANNEL_EVENTS.reply, {}, (payload, ref) => {
      this._trigger(this._replyEventName(ref), payload);
    });
    this.presence = new RealtimePresence(this);
    this.broadcastEndpointURL = httpEndpointURL(this.socket.endPoint);
    this.private = this.params.config.private || false;
    if (!this.private && ((_b = (_a2 = this.params.config) === null || _a2 === void 0 ? void 0 : _a2.broadcast) === null || _b === void 0 ? void 0 : _b.replay)) {
      throw `tried to use replay on public channel '${this.topic}'. It must be a private channel.`;
    }
  }
  /** Subscribe registers your client with the server */
  subscribe(callback, timeout = this.timeout) {
    var _a2, _b, _c;
    if (!this.socket.isConnected()) {
      this.socket.connect();
    }
    if (this.state == CHANNEL_STATES.closed) {
      const { config: { broadcast, presence, private: isPrivate } } = this.params;
      const postgres_changes = (_b = (_a2 = this.bindings.postgres_changes) === null || _a2 === void 0 ? void 0 : _a2.map((r) => r.filter)) !== null && _b !== void 0 ? _b : [];
      const presence_enabled = !!this.bindings[REALTIME_LISTEN_TYPES.PRESENCE] && this.bindings[REALTIME_LISTEN_TYPES.PRESENCE].length > 0 || ((_c = this.params.config.presence) === null || _c === void 0 ? void 0 : _c.enabled) === true;
      const accessTokenPayload = {};
      const config = {
        broadcast,
        presence: Object.assign(Object.assign({}, presence), { enabled: presence_enabled }),
        postgres_changes,
        private: isPrivate
      };
      if (this.socket.accessTokenValue) {
        accessTokenPayload.access_token = this.socket.accessTokenValue;
      }
      this._onError((e) => callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, e));
      this._onClose(() => callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CLOSED));
      this.updateJoinPayload(Object.assign({ config }, accessTokenPayload));
      this.joinedOnce = true;
      this._rejoin(timeout);
      this.joinPush.receive("ok", async ({ postgres_changes: postgres_changes2 }) => {
        var _a3;
        this.socket.setAuth();
        if (postgres_changes2 === void 0) {
          callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
          return;
        } else {
          const clientPostgresBindings = this.bindings.postgres_changes;
          const bindingsLen = (_a3 = clientPostgresBindings === null || clientPostgresBindings === void 0 ? void 0 : clientPostgresBindings.length) !== null && _a3 !== void 0 ? _a3 : 0;
          const newPostgresBindings = [];
          for (let i = 0; i < bindingsLen; i++) {
            const clientPostgresBinding = clientPostgresBindings[i];
            const { filter: { event, schema, table, filter } } = clientPostgresBinding;
            const serverPostgresFilter = postgres_changes2 && postgres_changes2[i];
            if (serverPostgresFilter && serverPostgresFilter.event === event && serverPostgresFilter.schema === schema && serverPostgresFilter.table === table && serverPostgresFilter.filter === filter) {
              newPostgresBindings.push(Object.assign(Object.assign({}, clientPostgresBinding), { id: serverPostgresFilter.id }));
            } else {
              this.unsubscribe();
              this.state = CHANNEL_STATES.errored;
              callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error("mismatch between server and client bindings for postgres changes"));
              return;
            }
          }
          this.bindings.postgres_changes = newPostgresBindings;
          callback && callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
          return;
        }
      }).receive("error", (error) => {
        this.state = CHANNEL_STATES.errored;
        callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error(JSON.stringify(Object.values(error).join(", ") || "error")));
        return;
      }).receive("timeout", () => {
        callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.TIMED_OUT);
        return;
      });
    }
    return this;
  }
  presenceState() {
    return this.presence.state;
  }
  async track(payload, opts = {}) {
    return await this.send({
      type: "presence",
      event: "track",
      payload
    }, opts.timeout || this.timeout);
  }
  async untrack(opts = {}) {
    return await this.send({
      type: "presence",
      event: "untrack"
    }, opts);
  }
  on(type, filter, callback) {
    if (this.state === CHANNEL_STATES.joined && type === REALTIME_LISTEN_TYPES.PRESENCE) {
      this.socket.log("channel", `resubscribe to ${this.topic} due to change in presence callbacks on joined channel`);
      this.unsubscribe().then(() => this.subscribe());
    }
    return this._on(type, filter, callback);
  }
  /**
   * Sends a broadcast message explicitly via REST API.
   *
   * This method always uses the REST API endpoint regardless of WebSocket connection state.
   * Useful when you want to guarantee REST delivery or when gradually migrating from implicit REST fallback.
   *
   * @param event The name of the broadcast event
   * @param payload Payload to be sent (required)
   * @param opts Options including timeout
   * @returns Promise resolving to object with success status, and error details if failed
   */
  async httpSend(event, payload, opts = {}) {
    var _a2;
    const authorization = this.socket.accessTokenValue ? `Bearer ${this.socket.accessTokenValue}` : "";
    if (payload === void 0 || payload === null) {
      return Promise.reject("Payload is required for httpSend()");
    }
    const options = {
      method: "POST",
      headers: {
        Authorization: authorization,
        apikey: this.socket.apiKey ? this.socket.apiKey : "",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          {
            topic: this.subTopic,
            event,
            payload,
            private: this.private
          }
        ]
      })
    };
    const response = await this._fetchWithTimeout(this.broadcastEndpointURL, options, (_a2 = opts.timeout) !== null && _a2 !== void 0 ? _a2 : this.timeout);
    if (response.status === 202) {
      return { success: true };
    }
    let errorMessage = response.statusText;
    try {
      const errorBody = await response.json();
      errorMessage = errorBody.error || errorBody.message || errorMessage;
    } catch (_b) {
    }
    return Promise.reject(new Error(errorMessage));
  }
  /**
   * Sends a message into the channel.
   *
   * @param args Arguments to send to channel
   * @param args.type The type of event to send
   * @param args.event The name of the event being sent
   * @param args.payload Payload to be sent
   * @param opts Options to be used during the send process
   */
  async send(args, opts = {}) {
    var _a2, _b;
    if (!this._canPush() && args.type === "broadcast") {
      console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");
      const { event, payload: endpoint_payload } = args;
      const authorization = this.socket.accessTokenValue ? `Bearer ${this.socket.accessTokenValue}` : "";
      const options = {
        method: "POST",
        headers: {
          Authorization: authorization,
          apikey: this.socket.apiKey ? this.socket.apiKey : "",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            {
              topic: this.subTopic,
              event,
              payload: endpoint_payload,
              private: this.private
            }
          ]
        })
      };
      try {
        const response = await this._fetchWithTimeout(this.broadcastEndpointURL, options, (_a2 = opts.timeout) !== null && _a2 !== void 0 ? _a2 : this.timeout);
        await ((_b = response.body) === null || _b === void 0 ? void 0 : _b.cancel());
        return response.ok ? "ok" : "error";
      } catch (error) {
        if (error.name === "AbortError") {
          return "timed out";
        } else {
          return "error";
        }
      }
    } else {
      return new Promise((resolve) => {
        var _a3, _b2, _c;
        const push = this._push(args.type, args, opts.timeout || this.timeout);
        if (args.type === "broadcast" && !((_c = (_b2 = (_a3 = this.params) === null || _a3 === void 0 ? void 0 : _a3.config) === null || _b2 === void 0 ? void 0 : _b2.broadcast) === null || _c === void 0 ? void 0 : _c.ack)) {
          resolve("ok");
        }
        push.receive("ok", () => resolve("ok"));
        push.receive("error", () => resolve("error"));
        push.receive("timeout", () => resolve("timed out"));
      });
    }
  }
  updateJoinPayload(payload) {
    this.joinPush.updatePayload(payload);
  }
  /**
   * Leaves the channel.
   *
   * Unsubscribes from server events, and instructs channel to terminate on server.
   * Triggers onClose() hooks.
   *
   * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
   * channel.unsubscribe().receive("ok", () => alert("left!") )
   */
  unsubscribe(timeout = this.timeout) {
    this.state = CHANNEL_STATES.leaving;
    const onClose = /* @__PURE__ */ __name(() => {
      this.socket.log("channel", `leave ${this.topic}`);
      this._trigger(CHANNEL_EVENTS.close, "leave", this._joinRef());
    }, "onClose");
    this.joinPush.destroy();
    let leavePush = null;
    return new Promise((resolve) => {
      leavePush = new Push(this, CHANNEL_EVENTS.leave, {}, timeout);
      leavePush.receive("ok", () => {
        onClose();
        resolve("ok");
      }).receive("timeout", () => {
        onClose();
        resolve("timed out");
      }).receive("error", () => {
        resolve("error");
      });
      leavePush.send();
      if (!this._canPush()) {
        leavePush.trigger("ok", {});
      }
    }).finally(() => {
      leavePush === null || leavePush === void 0 ? void 0 : leavePush.destroy();
    });
  }
  /**
   * Teardown the channel.
   *
   * Destroys and stops related timers.
   */
  teardown() {
    this.pushBuffer.forEach((push) => push.destroy());
    this.pushBuffer = [];
    this.rejoinTimer.reset();
    this.joinPush.destroy();
    this.state = CHANNEL_STATES.closed;
    this.bindings = {};
  }
  /** @internal */
  async _fetchWithTimeout(url, options, timeout) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await this.socket.fetch(url, Object.assign(Object.assign({}, options), { signal: controller.signal }));
    clearTimeout(id);
    return response;
  }
  /** @internal */
  _push(event, payload, timeout = this.timeout) {
    if (!this.joinedOnce) {
      throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
    }
    let pushEvent = new Push(this, event, payload, timeout);
    if (this._canPush()) {
      pushEvent.send();
    } else {
      this._addToPushBuffer(pushEvent);
    }
    return pushEvent;
  }
  /** @internal */
  _addToPushBuffer(pushEvent) {
    pushEvent.startTimeout();
    this.pushBuffer.push(pushEvent);
    if (this.pushBuffer.length > MAX_PUSH_BUFFER_SIZE) {
      const removedPush = this.pushBuffer.shift();
      if (removedPush) {
        removedPush.destroy();
        this.socket.log("channel", `discarded push due to buffer overflow: ${removedPush.event}`, removedPush.payload);
      }
    }
  }
  /**
   * Overridable message hook
   *
   * Receives all events for specialized message handling before dispatching to the channel callbacks.
   * Must return the payload, modified or unmodified.
   *
   * @internal
   */
  _onMessage(_event, payload, _ref) {
    return payload;
  }
  /** @internal */
  _isMember(topic) {
    return this.topic === topic;
  }
  /** @internal */
  _joinRef() {
    return this.joinPush.ref;
  }
  /** @internal */
  _trigger(type, payload, ref) {
    var _a2, _b;
    const typeLower = type.toLocaleLowerCase();
    const { close, error, leave, join } = CHANNEL_EVENTS;
    const events = [close, error, leave, join];
    if (ref && events.indexOf(typeLower) >= 0 && ref !== this._joinRef()) {
      return;
    }
    let handledPayload = this._onMessage(typeLower, payload, ref);
    if (payload && !handledPayload) {
      throw "channel onMessage callbacks must return the payload, modified or unmodified";
    }
    if (["insert", "update", "delete"].includes(typeLower)) {
      (_a2 = this.bindings.postgres_changes) === null || _a2 === void 0 ? void 0 : _a2.filter((bind) => {
        var _a3, _b2, _c;
        return ((_a3 = bind.filter) === null || _a3 === void 0 ? void 0 : _a3.event) === "*" || ((_c = (_b2 = bind.filter) === null || _b2 === void 0 ? void 0 : _b2.event) === null || _c === void 0 ? void 0 : _c.toLocaleLowerCase()) === typeLower;
      }).map((bind) => bind.callback(handledPayload, ref));
    } else {
      (_b = this.bindings[typeLower]) === null || _b === void 0 ? void 0 : _b.filter((bind) => {
        var _a3, _b2, _c, _d, _e, _f;
        if (["broadcast", "presence", "postgres_changes"].includes(typeLower)) {
          if ("id" in bind) {
            const bindId = bind.id;
            const bindEvent = (_a3 = bind.filter) === null || _a3 === void 0 ? void 0 : _a3.event;
            return bindId && ((_b2 = payload.ids) === null || _b2 === void 0 ? void 0 : _b2.includes(bindId)) && (bindEvent === "*" || (bindEvent === null || bindEvent === void 0 ? void 0 : bindEvent.toLocaleLowerCase()) === ((_c = payload.data) === null || _c === void 0 ? void 0 : _c.type.toLocaleLowerCase()));
          } else {
            const bindEvent = (_e = (_d = bind === null || bind === void 0 ? void 0 : bind.filter) === null || _d === void 0 ? void 0 : _d.event) === null || _e === void 0 ? void 0 : _e.toLocaleLowerCase();
            return bindEvent === "*" || bindEvent === ((_f = payload === null || payload === void 0 ? void 0 : payload.event) === null || _f === void 0 ? void 0 : _f.toLocaleLowerCase());
          }
        } else {
          return bind.type.toLocaleLowerCase() === typeLower;
        }
      }).map((bind) => {
        if (typeof handledPayload === "object" && "ids" in handledPayload) {
          const postgresChanges = handledPayload.data;
          const { schema, table, commit_timestamp, type: type2, errors } = postgresChanges;
          const enrichedPayload = {
            schema,
            table,
            commit_timestamp,
            eventType: type2,
            new: {},
            old: {},
            errors
          };
          handledPayload = Object.assign(Object.assign({}, enrichedPayload), this._getPayloadRecords(postgresChanges));
        }
        bind.callback(handledPayload, ref);
      });
    }
  }
  /** @internal */
  _isClosed() {
    return this.state === CHANNEL_STATES.closed;
  }
  /** @internal */
  _isJoined() {
    return this.state === CHANNEL_STATES.joined;
  }
  /** @internal */
  _isJoining() {
    return this.state === CHANNEL_STATES.joining;
  }
  /** @internal */
  _isLeaving() {
    return this.state === CHANNEL_STATES.leaving;
  }
  /** @internal */
  _replyEventName(ref) {
    return `chan_reply_${ref}`;
  }
  /** @internal */
  _on(type, filter, callback) {
    const typeLower = type.toLocaleLowerCase();
    const binding = {
      type: typeLower,
      filter,
      callback
    };
    if (this.bindings[typeLower]) {
      this.bindings[typeLower].push(binding);
    } else {
      this.bindings[typeLower] = [binding];
    }
    return this;
  }
  /** @internal */
  _off(type, filter) {
    const typeLower = type.toLocaleLowerCase();
    if (this.bindings[typeLower]) {
      this.bindings[typeLower] = this.bindings[typeLower].filter((bind) => {
        var _a2;
        return !(((_a2 = bind.type) === null || _a2 === void 0 ? void 0 : _a2.toLocaleLowerCase()) === typeLower && RealtimeChannel.isEqual(bind.filter, filter));
      });
    }
    return this;
  }
  /** @internal */
  static isEqual(obj1, obj2) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false;
    }
    for (const k in obj1) {
      if (obj1[k] !== obj2[k]) {
        return false;
      }
    }
    return true;
  }
  /** @internal */
  _rejoinUntilConnected() {
    this.rejoinTimer.scheduleTimeout();
    if (this.socket.isConnected()) {
      this._rejoin();
    }
  }
  /**
   * Registers a callback that will be executed when the channel closes.
   *
   * @internal
   */
  _onClose(callback) {
    this._on(CHANNEL_EVENTS.close, {}, callback);
  }
  /**
   * Registers a callback that will be executed when the channel encounteres an error.
   *
   * @internal
   */
  _onError(callback) {
    this._on(CHANNEL_EVENTS.error, {}, (reason) => callback(reason));
  }
  /**
   * Returns `true` if the socket is connected and the channel has been joined.
   *
   * @internal
   */
  _canPush() {
    return this.socket.isConnected() && this._isJoined();
  }
  /** @internal */
  _rejoin(timeout = this.timeout) {
    if (this._isLeaving()) {
      return;
    }
    this.socket._leaveOpenTopic(this.topic);
    this.state = CHANNEL_STATES.joining;
    this.joinPush.resend(timeout);
  }
  /** @internal */
  _getPayloadRecords(payload) {
    const records = {
      new: {},
      old: {}
    };
    if (payload.type === "INSERT" || payload.type === "UPDATE") {
      records.new = convertChangeData(payload.columns, payload.record);
    }
    if (payload.type === "UPDATE" || payload.type === "DELETE") {
      records.old = convertChangeData(payload.columns, payload.old_record);
    }
    return records;
  }
};
__name(RealtimeChannel, "RealtimeChannel");

// node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js
var noop2 = /* @__PURE__ */ __name(() => {
}, "noop");
var CONNECTION_TIMEOUTS = {
  HEARTBEAT_INTERVAL: 25e3,
  RECONNECT_DELAY: 10,
  HEARTBEAT_TIMEOUT_FALLBACK: 100
};
var RECONNECT_INTERVALS = [1e3, 2e3, 5e3, 1e4];
var DEFAULT_RECONNECT_FALLBACK = 1e4;
var WORKER_SCRIPT = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
var RealtimeClient = class {
  /**
   * Initializes the Socket.
   *
   * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
   * @param httpEndpoint The string HTTP endpoint, ie, "https://example.com", "/" (inherited host & protocol)
   * @param options.transport The Websocket Transport, for example WebSocket. This can be a custom implementation
   * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
   * @param options.params The optional params to pass when connecting.
   * @param options.headers Deprecated: headers cannot be set on websocket connections and this option will be removed in the future.
   * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
   * @param options.heartbeatCallback The optional function to handle heartbeat status.
   * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
   * @param options.logLevel Sets the log level for Realtime
   * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
   * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
   * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
   * @param options.worker Use Web Worker to set a side flow. Defaults to false.
   * @param options.workerUrl The URL of the worker script. Defaults to https://realtime.supabase.com/worker.js that includes a heartbeat event call to keep the connection alive.
   */
  constructor(endPoint, options) {
    var _a2;
    this.accessTokenValue = null;
    this.apiKey = null;
    this.channels = new Array();
    this.endPoint = "";
    this.httpEndpoint = "";
    this.headers = {};
    this.params = {};
    this.timeout = DEFAULT_TIMEOUT;
    this.transport = null;
    this.heartbeatIntervalMs = CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL;
    this.heartbeatTimer = void 0;
    this.pendingHeartbeatRef = null;
    this.heartbeatCallback = noop2;
    this.ref = 0;
    this.reconnectTimer = null;
    this.logger = noop2;
    this.conn = null;
    this.sendBuffer = [];
    this.serializer = new Serializer();
    this.stateChangeCallbacks = {
      open: [],
      close: [],
      error: [],
      message: []
    };
    this.accessToken = null;
    this._connectionState = "disconnected";
    this._wasManualDisconnect = false;
    this._authPromise = null;
    this._resolveFetch = (customFetch) => {
      if (customFetch) {
        return (...args) => customFetch(...args);
      }
      return (...args) => fetch(...args);
    };
    if (!((_a2 = options === null || options === void 0 ? void 0 : options.params) === null || _a2 === void 0 ? void 0 : _a2.apikey)) {
      throw new Error("API key is required to connect to Realtime");
    }
    this.apiKey = options.params.apikey;
    this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
    this.httpEndpoint = httpEndpointURL(endPoint);
    this._initializeOptions(options);
    this._setupReconnectionTimer();
    this.fetch = this._resolveFetch(options === null || options === void 0 ? void 0 : options.fetch);
  }
  /**
   * Connects the socket, unless already connected.
   */
  connect() {
    if (this.isConnecting() || this.isDisconnecting() || this.conn !== null && this.isConnected()) {
      return;
    }
    this._setConnectionState("connecting");
    this._setAuthSafely("connect");
    if (this.transport) {
      this.conn = new this.transport(this.endpointURL());
    } else {
      try {
        this.conn = websocket_factory_default.createWebSocket(this.endpointURL());
      } catch (error) {
        this._setConnectionState("disconnected");
        const errorMessage = error.message;
        if (errorMessage.includes("Node.js")) {
          throw new Error(`${errorMessage}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`);
        }
        throw new Error(`WebSocket not available: ${errorMessage}`);
      }
    }
    this._setupConnectionHandlers();
  }
  /**
   * Returns the URL of the websocket.
   * @returns string The URL of the websocket.
   */
  endpointURL() {
    return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: VSN }));
  }
  /**
   * Disconnects the socket.
   *
   * @param code A numeric status code to send on disconnect.
   * @param reason A custom reason for the disconnect.
   */
  disconnect(code, reason) {
    if (this.isDisconnecting()) {
      return;
    }
    this._setConnectionState("disconnecting", true);
    if (this.conn) {
      const fallbackTimer = setTimeout(() => {
        this._setConnectionState("disconnected");
      }, 100);
      this.conn.onclose = () => {
        clearTimeout(fallbackTimer);
        this._setConnectionState("disconnected");
      };
      if (code) {
        this.conn.close(code, reason !== null && reason !== void 0 ? reason : "");
      } else {
        this.conn.close();
      }
      this._teardownConnection();
    } else {
      this._setConnectionState("disconnected");
    }
  }
  /**
   * Returns all created channels
   */
  getChannels() {
    return this.channels;
  }
  /**
   * Unsubscribes and removes a single channel
   * @param channel A RealtimeChannel instance
   */
  async removeChannel(channel) {
    const status = await channel.unsubscribe();
    if (this.channels.length === 0) {
      this.disconnect();
    }
    return status;
  }
  /**
   * Unsubscribes and removes all channels
   */
  async removeAllChannels() {
    const values_1 = await Promise.all(this.channels.map((channel) => channel.unsubscribe()));
    this.channels = [];
    this.disconnect();
    return values_1;
  }
  /**
   * Logs the message.
   *
   * For customized logging, `this.logger` can be overridden.
   */
  log(kind, msg, data) {
    this.logger(kind, msg, data);
  }
  /**
   * Returns the current state of the socket.
   */
  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case SOCKET_STATES.connecting:
        return CONNECTION_STATE.Connecting;
      case SOCKET_STATES.open:
        return CONNECTION_STATE.Open;
      case SOCKET_STATES.closing:
        return CONNECTION_STATE.Closing;
      default:
        return CONNECTION_STATE.Closed;
    }
  }
  /**
   * Returns `true` is the connection is open.
   */
  isConnected() {
    return this.connectionState() === CONNECTION_STATE.Open;
  }
  /**
   * Returns `true` if the connection is currently connecting.
   */
  isConnecting() {
    return this._connectionState === "connecting";
  }
  /**
   * Returns `true` if the connection is currently disconnecting.
   */
  isDisconnecting() {
    return this._connectionState === "disconnecting";
  }
  channel(topic, params = { config: {} }) {
    const realtimeTopic = `realtime:${topic}`;
    const exists = this.getChannels().find((c) => c.topic === realtimeTopic);
    if (!exists) {
      const chan = new RealtimeChannel(`realtime:${topic}`, params, this);
      this.channels.push(chan);
      return chan;
    } else {
      return exists;
    }
  }
  /**
   * Push out a message if the socket is connected.
   *
   * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
   */
  push(data) {
    const { topic, event, payload, ref } = data;
    const callback = /* @__PURE__ */ __name(() => {
      this.encode(data, (result) => {
        var _a2;
        (_a2 = this.conn) === null || _a2 === void 0 ? void 0 : _a2.send(result);
      });
    }, "callback");
    this.log("push", `${topic} ${event} (${ref})`, payload);
    if (this.isConnected()) {
      callback();
    } else {
      this.sendBuffer.push(callback);
    }
  }
  /**
   * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
   *
   * If param is null it will use the `accessToken` callback function or the token set on the client.
   *
   * On callback used, it will set the value of the token internal to the client.
   *
   * @param token A JWT string to override the token set on the client.
   */
  async setAuth(token = null) {
    this._authPromise = this._performAuth(token);
    try {
      await this._authPromise;
    } finally {
      this._authPromise = null;
    }
  }
  /**
   * Sends a heartbeat message if the socket is connected.
   */
  async sendHeartbeat() {
    var _a2;
    if (!this.isConnected()) {
      try {
        this.heartbeatCallback("disconnected");
      } catch (e) {
        this.log("error", "error in heartbeat callback", e);
      }
      return;
    }
    if (this.pendingHeartbeatRef) {
      this.pendingHeartbeatRef = null;
      this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
      try {
        this.heartbeatCallback("timeout");
      } catch (e) {
        this.log("error", "error in heartbeat callback", e);
      }
      this._wasManualDisconnect = false;
      (_a2 = this.conn) === null || _a2 === void 0 ? void 0 : _a2.close(WS_CLOSE_NORMAL, "heartbeat timeout");
      setTimeout(() => {
        var _a3;
        if (!this.isConnected()) {
          (_a3 = this.reconnectTimer) === null || _a3 === void 0 ? void 0 : _a3.scheduleTimeout();
        }
      }, CONNECTION_TIMEOUTS.HEARTBEAT_TIMEOUT_FALLBACK);
      return;
    }
    this.pendingHeartbeatRef = this._makeRef();
    this.push({
      topic: "phoenix",
      event: "heartbeat",
      payload: {},
      ref: this.pendingHeartbeatRef
    });
    try {
      this.heartbeatCallback("sent");
    } catch (e) {
      this.log("error", "error in heartbeat callback", e);
    }
    this._setAuthSafely("heartbeat");
  }
  onHeartbeat(callback) {
    this.heartbeatCallback = callback;
  }
  /**
   * Flushes send buffer
   */
  flushSendBuffer() {
    if (this.isConnected() && this.sendBuffer.length > 0) {
      this.sendBuffer.forEach((callback) => callback());
      this.sendBuffer = [];
    }
  }
  /**
   * Return the next message ref, accounting for overflows
   *
   * @internal
   */
  _makeRef() {
    let newRef = this.ref + 1;
    if (newRef === this.ref) {
      this.ref = 0;
    } else {
      this.ref = newRef;
    }
    return this.ref.toString();
  }
  /**
   * Unsubscribe from channels with the specified topic.
   *
   * @internal
   */
  _leaveOpenTopic(topic) {
    let dupChannel = this.channels.find((c) => c.topic === topic && (c._isJoined() || c._isJoining()));
    if (dupChannel) {
      this.log("transport", `leaving duplicate topic "${topic}"`);
      dupChannel.unsubscribe();
    }
  }
  /**
   * Removes a subscription from the socket.
   *
   * @param channel An open subscription.
   *
   * @internal
   */
  _remove(channel) {
    this.channels = this.channels.filter((c) => c.topic !== channel.topic);
  }
  /** @internal */
  _onConnMessage(rawMessage) {
    this.decode(rawMessage.data, (msg) => {
      if (msg.topic === "phoenix" && msg.event === "phx_reply") {
        try {
          this.heartbeatCallback(msg.payload.status === "ok" ? "ok" : "error");
        } catch (e) {
          this.log("error", "error in heartbeat callback", e);
        }
      }
      if (msg.ref && msg.ref === this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
      }
      const { topic, event, payload, ref } = msg;
      const refString = ref ? `(${ref})` : "";
      const status = payload.status || "";
      this.log("receive", `${status} ${topic} ${event} ${refString}`.trim(), payload);
      this.channels.filter((channel) => channel._isMember(topic)).forEach((channel) => channel._trigger(event, payload, ref));
      this._triggerStateCallbacks("message", msg);
    });
  }
  /**
   * Clear specific timer
   * @internal
   */
  _clearTimer(timer) {
    var _a2;
    if (timer === "heartbeat" && this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = void 0;
    } else if (timer === "reconnect") {
      (_a2 = this.reconnectTimer) === null || _a2 === void 0 ? void 0 : _a2.reset();
    }
  }
  /**
   * Clear all timers
   * @internal
   */
  _clearAllTimers() {
    this._clearTimer("heartbeat");
    this._clearTimer("reconnect");
  }
  /**
   * Setup connection handlers for WebSocket events
   * @internal
   */
  _setupConnectionHandlers() {
    if (!this.conn)
      return;
    if ("binaryType" in this.conn) {
      ;
      this.conn.binaryType = "arraybuffer";
    }
    this.conn.onopen = () => this._onConnOpen();
    this.conn.onerror = (error) => this._onConnError(error);
    this.conn.onmessage = (event) => this._onConnMessage(event);
    this.conn.onclose = (event) => this._onConnClose(event);
  }
  /**
   * Teardown connection and cleanup resources
   * @internal
   */
  _teardownConnection() {
    if (this.conn) {
      this.conn.onopen = null;
      this.conn.onerror = null;
      this.conn.onmessage = null;
      this.conn.onclose = null;
      this.conn = null;
    }
    this._clearAllTimers();
    this.channels.forEach((channel) => channel.teardown());
  }
  /** @internal */
  _onConnOpen() {
    this._setConnectionState("connected");
    this.log("transport", `connected to ${this.endpointURL()}`);
    this.flushSendBuffer();
    this._clearTimer("reconnect");
    if (!this.worker) {
      this._startHeartbeat();
    } else {
      if (!this.workerRef) {
        this._startWorkerHeartbeat();
      }
    }
    this._triggerStateCallbacks("open");
  }
  /** @internal */
  _startHeartbeat() {
    this.heartbeatTimer && clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = setInterval(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
  }
  /** @internal */
  _startWorkerHeartbeat() {
    if (this.workerUrl) {
      this.log("worker", `starting worker for from ${this.workerUrl}`);
    } else {
      this.log("worker", `starting default worker`);
    }
    const objectUrl = this._workerObjectUrl(this.workerUrl);
    this.workerRef = new Worker(objectUrl);
    this.workerRef.onerror = (error) => {
      this.log("worker", "worker error", error.message);
      this.workerRef.terminate();
    };
    this.workerRef.onmessage = (event) => {
      if (event.data.event === "keepAlive") {
        this.sendHeartbeat();
      }
    };
    this.workerRef.postMessage({
      event: "start",
      interval: this.heartbeatIntervalMs
    });
  }
  /** @internal */
  _onConnClose(event) {
    var _a2;
    this._setConnectionState("disconnected");
    this.log("transport", "close", event);
    this._triggerChanError();
    this._clearTimer("heartbeat");
    if (!this._wasManualDisconnect) {
      (_a2 = this.reconnectTimer) === null || _a2 === void 0 ? void 0 : _a2.scheduleTimeout();
    }
    this._triggerStateCallbacks("close", event);
  }
  /** @internal */
  _onConnError(error) {
    this._setConnectionState("disconnected");
    this.log("transport", `${error}`);
    this._triggerChanError();
    this._triggerStateCallbacks("error", error);
  }
  /** @internal */
  _triggerChanError() {
    this.channels.forEach((channel) => channel._trigger(CHANNEL_EVENTS.error));
  }
  /** @internal */
  _appendParams(url, params) {
    if (Object.keys(params).length === 0) {
      return url;
    }
    const prefix = url.match(/\?/) ? "&" : "?";
    const query = new URLSearchParams(params);
    return `${url}${prefix}${query}`;
  }
  _workerObjectUrl(url) {
    let result_url;
    if (url) {
      result_url = url;
    } else {
      const blob = new Blob([WORKER_SCRIPT], { type: "application/javascript" });
      result_url = URL.createObjectURL(blob);
    }
    return result_url;
  }
  /**
   * Set connection state with proper state management
   * @internal
   */
  _setConnectionState(state, manual = false) {
    this._connectionState = state;
    if (state === "connecting") {
      this._wasManualDisconnect = false;
    } else if (state === "disconnecting") {
      this._wasManualDisconnect = manual;
    }
  }
  /**
   * Perform the actual auth operation
   * @internal
   */
  async _performAuth(token = null) {
    let tokenToSend;
    if (token) {
      tokenToSend = token;
    } else if (this.accessToken) {
      tokenToSend = await this.accessToken();
    } else {
      tokenToSend = this.accessTokenValue;
    }
    if (this.accessTokenValue != tokenToSend) {
      this.accessTokenValue = tokenToSend;
      this.channels.forEach((channel) => {
        const payload = {
          access_token: tokenToSend,
          version: DEFAULT_VERSION
        };
        tokenToSend && channel.updateJoinPayload(payload);
        if (channel.joinedOnce && channel._isJoined()) {
          channel._push(CHANNEL_EVENTS.access_token, {
            access_token: tokenToSend
          });
        }
      });
    }
  }
  /**
   * Wait for any in-flight auth operations to complete
   * @internal
   */
  async _waitForAuthIfNeeded() {
    if (this._authPromise) {
      await this._authPromise;
    }
  }
  /**
   * Safely call setAuth with standardized error handling
   * @internal
   */
  _setAuthSafely(context = "general") {
    this.setAuth().catch((e) => {
      this.log("error", `error setting auth in ${context}`, e);
    });
  }
  /**
   * Trigger state change callbacks with proper error handling
   * @internal
   */
  _triggerStateCallbacks(event, data) {
    try {
      this.stateChangeCallbacks[event].forEach((callback) => {
        try {
          callback(data);
        } catch (e) {
          this.log("error", `error in ${event} callback`, e);
        }
      });
    } catch (e) {
      this.log("error", `error triggering ${event} callbacks`, e);
    }
  }
  /**
   * Setup reconnection timer with proper configuration
   * @internal
   */
  _setupReconnectionTimer() {
    this.reconnectTimer = new Timer(async () => {
      setTimeout(async () => {
        await this._waitForAuthIfNeeded();
        if (!this.isConnected()) {
          this.connect();
        }
      }, CONNECTION_TIMEOUTS.RECONNECT_DELAY);
    }, this.reconnectAfterMs);
  }
  /**
   * Initialize client options with defaults
   * @internal
   */
  _initializeOptions(options) {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _j;
    this.transport = (_a2 = options === null || options === void 0 ? void 0 : options.transport) !== null && _a2 !== void 0 ? _a2 : null;
    this.timeout = (_b = options === null || options === void 0 ? void 0 : options.timeout) !== null && _b !== void 0 ? _b : DEFAULT_TIMEOUT;
    this.heartbeatIntervalMs = (_c = options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs) !== null && _c !== void 0 ? _c : CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL;
    this.worker = (_d = options === null || options === void 0 ? void 0 : options.worker) !== null && _d !== void 0 ? _d : false;
    this.accessToken = (_e = options === null || options === void 0 ? void 0 : options.accessToken) !== null && _e !== void 0 ? _e : null;
    this.heartbeatCallback = (_f = options === null || options === void 0 ? void 0 : options.heartbeatCallback) !== null && _f !== void 0 ? _f : noop2;
    if (options === null || options === void 0 ? void 0 : options.params)
      this.params = options.params;
    if (options === null || options === void 0 ? void 0 : options.logger)
      this.logger = options.logger;
    if ((options === null || options === void 0 ? void 0 : options.logLevel) || (options === null || options === void 0 ? void 0 : options.log_level)) {
      this.logLevel = options.logLevel || options.log_level;
      this.params = Object.assign(Object.assign({}, this.params), { log_level: this.logLevel });
    }
    this.reconnectAfterMs = (_g = options === null || options === void 0 ? void 0 : options.reconnectAfterMs) !== null && _g !== void 0 ? _g : (tries) => {
      return RECONNECT_INTERVALS[tries - 1] || DEFAULT_RECONNECT_FALLBACK;
    };
    this.encode = (_h = options === null || options === void 0 ? void 0 : options.encode) !== null && _h !== void 0 ? _h : (payload, callback) => {
      return callback(JSON.stringify(payload));
    };
    this.decode = (_j = options === null || options === void 0 ? void 0 : options.decode) !== null && _j !== void 0 ? _j : this.serializer.decode.bind(this.serializer);
    if (this.worker) {
      if (typeof window !== "undefined" && !window.Worker) {
        throw new Error("Web Worker is not supported");
      }
      this.workerUrl = options === null || options === void 0 ? void 0 : options.workerUrl;
    }
  }
};
__name(RealtimeClient, "RealtimeClient");

// node_modules/@supabase/storage-js/dist/module/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/storage-js/dist/module/StorageClient.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/storage-js/dist/module/lib/errors.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var StorageError = class extends Error {
  constructor(message) {
    super(message);
    this.__isStorageError = true;
    this.name = "StorageError";
  }
};
__name(StorageError, "StorageError");
function isStorageError(error) {
  return typeof error === "object" && error !== null && "__isStorageError" in error;
}
__name(isStorageError, "isStorageError");
var StorageApiError = class extends StorageError {
  constructor(message, status, statusCode) {
    super(message);
    this.name = "StorageApiError";
    this.status = status;
    this.statusCode = statusCode;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      statusCode: this.statusCode
    };
  }
};
__name(StorageApiError, "StorageApiError");
var StorageUnknownError = class extends StorageError {
  constructor(message, originalError) {
    super(message);
    this.name = "StorageUnknownError";
    this.originalError = originalError;
  }
};
__name(StorageUnknownError, "StorageUnknownError");

// node_modules/@supabase/storage-js/dist/module/lib/fetch.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/storage-js/dist/module/lib/helpers.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var resolveFetch2 = /* @__PURE__ */ __name((customFetch) => {
  if (customFetch) {
    return (...args) => customFetch(...args);
  }
  return (...args) => fetch(...args);
}, "resolveFetch");
var resolveResponse = /* @__PURE__ */ __name(() => {
  return Response;
}, "resolveResponse");
var recursiveToCamel = /* @__PURE__ */ __name((item) => {
  if (Array.isArray(item)) {
    return item.map((el) => recursiveToCamel(el));
  } else if (typeof item === "function" || item !== Object(item)) {
    return item;
  }
  const result = {};
  Object.entries(item).forEach(([key, value]) => {
    const newKey = key.replace(/([-_][a-z])/gi, (c) => c.toUpperCase().replace(/[-_]/g, ""));
    result[newKey] = recursiveToCamel(value);
  });
  return result;
}, "recursiveToCamel");
var isPlainObject = /* @__PURE__ */ __name((value) => {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}, "isPlainObject");

// node_modules/@supabase/storage-js/dist/module/lib/fetch.js
var _getErrorMessage = /* @__PURE__ */ __name((err) => {
  var _a2;
  return err.msg || err.message || err.error_description || (typeof err.error === "string" ? err.error : (_a2 = err.error) === null || _a2 === void 0 ? void 0 : _a2.message) || JSON.stringify(err);
}, "_getErrorMessage");
var handleError = /* @__PURE__ */ __name((error, reject, options) => __awaiter(void 0, void 0, void 0, function* () {
  const Res = yield resolveResponse();
  if (error instanceof Res && !(options === null || options === void 0 ? void 0 : options.noResolveJson)) {
    error.json().then((err) => {
      const status = error.status || 500;
      const statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || status + "";
      reject(new StorageApiError(_getErrorMessage(err), status, statusCode));
    }).catch((err) => {
      reject(new StorageUnknownError(_getErrorMessage(err), err));
    });
  } else {
    reject(new StorageUnknownError(_getErrorMessage(error), error));
  }
}), "handleError");
var _getRequestParams = /* @__PURE__ */ __name((method, options, parameters, body) => {
  const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
  if (method === "GET" || !body) {
    return params;
  }
  if (isPlainObject(body)) {
    params.headers = Object.assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers);
    params.body = JSON.stringify(body);
  } else {
    params.body = body;
  }
  if (options === null || options === void 0 ? void 0 : options.duplex) {
    params.duplex = options.duplex;
  }
  return Object.assign(Object.assign({}, params), parameters);
}, "_getRequestParams");
function _handleRequest(fetcher, method, url, options, parameters, body) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      fetcher(url, _getRequestParams(method, options, parameters, body)).then((result) => {
        if (!result.ok)
          throw result;
        if (options === null || options === void 0 ? void 0 : options.noResolveJson)
          return result;
        return result.json();
      }).then((data) => resolve(data)).catch((error) => handleError(error, reject, options));
    });
  });
}
__name(_handleRequest, "_handleRequest");
function get(fetcher, url, options, parameters) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "GET", url, options, parameters);
  });
}
__name(get, "get");
function post(fetcher, url, body, options, parameters) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "POST", url, options, parameters, body);
  });
}
__name(post, "post");
function put(fetcher, url, body, options, parameters) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "PUT", url, options, parameters, body);
  });
}
__name(put, "put");
function head(fetcher, url, options, parameters) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "HEAD", url, Object.assign(Object.assign({}, options), { noResolveJson: true }), parameters);
  });
}
__name(head, "head");
function remove(fetcher, url, body, options, parameters) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "DELETE", url, options, parameters, body);
  });
}
__name(remove, "remove");

// node_modules/@supabase/storage-js/dist/module/packages/BlobDownloadBuilder.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/storage-js/dist/module/packages/StreamDownloadBuilder.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var StreamDownloadBuilder = class {
  constructor(downloadFn, shouldThrowOnError) {
    this.downloadFn = downloadFn;
    this.shouldThrowOnError = shouldThrowOnError;
  }
  then(onfulfilled, onrejected) {
    return this.execute().then(onfulfilled, onrejected);
  }
  execute() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this.downloadFn();
        return {
          data: result.body,
          error: null
        };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
};
__name(StreamDownloadBuilder, "StreamDownloadBuilder");

// node_modules/@supabase/storage-js/dist/module/packages/BlobDownloadBuilder.js
var _a;
var BlobDownloadBuilder = class {
  constructor(downloadFn, shouldThrowOnError) {
    this.downloadFn = downloadFn;
    this.shouldThrowOnError = shouldThrowOnError;
    this[_a] = "BlobDownloadBuilder";
    this.promise = null;
  }
  asStream() {
    return new StreamDownloadBuilder(this.downloadFn, this.shouldThrowOnError);
  }
  then(onfulfilled, onrejected) {
    return this.getPromise().then(onfulfilled, onrejected);
  }
  catch(onrejected) {
    return this.getPromise().catch(onrejected);
  }
  finally(onfinally) {
    return this.getPromise().finally(onfinally);
  }
  getPromise() {
    if (!this.promise) {
      this.promise = this.execute();
    }
    return this.promise;
  }
  execute() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this.downloadFn();
        return {
          data: yield result.blob(),
          error: null
        };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
};
__name(BlobDownloadBuilder, "BlobDownloadBuilder");
_a = Symbol.toStringTag;
var BlobDownloadBuilder_default = BlobDownloadBuilder;

// node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js
var DEFAULT_SEARCH_OPTIONS = {
  limit: 100,
  offset: 0,
  sortBy: {
    column: "name",
    order: "asc"
  }
};
var DEFAULT_FILE_OPTIONS = {
  cacheControl: "3600",
  contentType: "text/plain;charset=UTF-8",
  upsert: false
};
var StorageFileApi = class {
  constructor(url, headers = {}, bucketId, fetch2) {
    this.shouldThrowOnError = false;
    this.url = url;
    this.headers = headers;
    this.bucketId = bucketId;
    this.fetch = resolveFetch2(fetch2);
  }
  /**
   * Enable throwing errors instead of returning them.
   */
  throwOnError() {
    this.shouldThrowOnError = true;
    return this;
  }
  /**
   * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
   *
   * @param method HTTP method.
   * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  uploadOrUpdate(method, path, fileBody, fileOptions) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let body;
        const options = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), fileOptions);
        let headers = Object.assign(Object.assign({}, this.headers), method === "POST" && { "x-upsert": String(options.upsert) });
        const metadata = options.metadata;
        if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
          body = new FormData();
          body.append("cacheControl", options.cacheControl);
          if (metadata) {
            body.append("metadata", this.encodeMetadata(metadata));
          }
          body.append("", fileBody);
        } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
          body = fileBody;
          if (!body.has("cacheControl")) {
            body.append("cacheControl", options.cacheControl);
          }
          if (metadata && !body.has("metadata")) {
            body.append("metadata", this.encodeMetadata(metadata));
          }
        } else {
          body = fileBody;
          headers["cache-control"] = `max-age=${options.cacheControl}`;
          headers["content-type"] = options.contentType;
          if (metadata) {
            headers["x-metadata"] = this.toBase64(this.encodeMetadata(metadata));
          }
          const isStream = typeof ReadableStream !== "undefined" && body instanceof ReadableStream || body && typeof body === "object" && "pipe" in body && typeof body.pipe === "function";
          if (isStream && !options.duplex) {
            options.duplex = "half";
          }
        }
        if (fileOptions === null || fileOptions === void 0 ? void 0 : fileOptions.headers) {
          headers = Object.assign(Object.assign({}, headers), fileOptions.headers);
        }
        const cleanPath = this._removeEmptyFolders(path);
        const _path = this._getFinalPath(cleanPath);
        const data = yield (method == "PUT" ? put : post)(this.fetch, `${this.url}/object/${_path}`, body, Object.assign({ headers }, (options === null || options === void 0 ? void 0 : options.duplex) ? { duplex: options.duplex } : {}));
        return {
          data: { path: cleanPath, id: data.Id, fullPath: data.Key },
          error: null
        };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Uploads a file to an existing bucket.
   *
   * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  upload(path, fileBody, fileOptions) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("POST", path, fileBody, fileOptions);
    });
  }
  /**
   * Upload a file with a token generated from `createSignedUploadUrl`.
   * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param token The token generated from `createSignedUploadUrl`
   * @param fileBody The body of the file to be stored in the bucket.
   */
  uploadToSignedUrl(path, token, fileBody, fileOptions) {
    return __awaiter(this, void 0, void 0, function* () {
      const cleanPath = this._removeEmptyFolders(path);
      const _path = this._getFinalPath(cleanPath);
      const url = new URL(this.url + `/object/upload/sign/${_path}`);
      url.searchParams.set("token", token);
      try {
        let body;
        const options = Object.assign({ upsert: DEFAULT_FILE_OPTIONS.upsert }, fileOptions);
        const headers = Object.assign(Object.assign({}, this.headers), { "x-upsert": String(options.upsert) });
        if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
          body = new FormData();
          body.append("cacheControl", options.cacheControl);
          body.append("", fileBody);
        } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
          body = fileBody;
          body.append("cacheControl", options.cacheControl);
        } else {
          body = fileBody;
          headers["cache-control"] = `max-age=${options.cacheControl}`;
          headers["content-type"] = options.contentType;
        }
        const data = yield put(this.fetch, url.toString(), body, { headers });
        return {
          data: { path: cleanPath, fullPath: data.Key },
          error: null
        };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Creates a signed upload URL.
   * Signed upload URLs can be used to upload files to the bucket without further authentication.
   * They are valid for 2 hours.
   * @param path The file path, including the current file name. For example `folder/image.png`.
   * @param options.upsert If set to true, allows the file to be overwritten if it already exists.
   */
  createSignedUploadUrl(path, options) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let _path = this._getFinalPath(path);
        const headers = Object.assign({}, this.headers);
        if (options === null || options === void 0 ? void 0 : options.upsert) {
          headers["x-upsert"] = "true";
        }
        const data = yield post(this.fetch, `${this.url}/object/upload/sign/${_path}`, {}, { headers });
        const url = new URL(this.url + data.url);
        const token = url.searchParams.get("token");
        if (!token) {
          throw new StorageError("No token returned by API");
        }
        return { data: { signedUrl: url.toString(), path, token }, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Replaces an existing file at the specified path with a new one.
   *
   * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  update(path, fileBody, fileOptions) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("PUT", path, fileBody, fileOptions);
    });
  }
  /**
   * Moves an existing file to a new path in the same bucket.
   *
   * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
   * @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
   * @param options The destination options.
   */
  move(fromPath, toPath, options) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield post(this.fetch, `${this.url}/object/move`, {
          bucketId: this.bucketId,
          sourceKey: fromPath,
          destinationKey: toPath,
          destinationBucket: options === null || options === void 0 ? void 0 : options.destinationBucket
        }, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Copies an existing file to a new path in the same bucket.
   *
   * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
   * @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
   * @param options The destination options.
   */
  copy(fromPath, toPath, options) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield post(this.fetch, `${this.url}/object/copy`, {
          bucketId: this.bucketId,
          sourceKey: fromPath,
          destinationKey: toPath,
          destinationBucket: options === null || options === void 0 ? void 0 : options.destinationBucket
        }, { headers: this.headers });
        return { data: { path: data.Key }, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
   *
   * @param path The file path, including the current file name. For example `folder/image.png`.
   * @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
   * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
   * @param options.transform Transform the asset before serving it to the client.
   */
  createSignedUrl(path, expiresIn, options) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let _path = this._getFinalPath(path);
        let data = yield post(this.fetch, `${this.url}/object/sign/${_path}`, Object.assign({ expiresIn }, (options === null || options === void 0 ? void 0 : options.transform) ? { transform: options.transform } : {}), { headers: this.headers });
        const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `&download=${options.download === true ? "" : options.download}` : "";
        const signedUrl = encodeURI(`${this.url}${data.signedURL}${downloadQueryParam}`);
        data = { signedUrl };
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
   *
   * @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
   * @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
   * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
   */
  createSignedUrls(paths, expiresIn, options) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield post(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn, paths }, { headers: this.headers });
        const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `&download=${options.download === true ? "" : options.download}` : "";
        return {
          data: data.map((datum) => Object.assign(Object.assign({}, datum), { signedUrl: datum.signedURL ? encodeURI(`${this.url}${datum.signedURL}${downloadQueryParam}`) : null })),
          error: null
        };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Downloads a file from a private bucket. For public buckets, make a request to the URL returned from `getPublicUrl` instead.
   *
   * @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
   * @param options.transform Transform the asset before serving it to the client.
   */
  download(path, options) {
    const wantsTransformation = typeof (options === null || options === void 0 ? void 0 : options.transform) !== "undefined";
    const renderPath = wantsTransformation ? "render/image/authenticated" : "object";
    const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
    const queryString = transformationQuery ? `?${transformationQuery}` : "";
    const _path = this._getFinalPath(path);
    const downloadFn = /* @__PURE__ */ __name(() => get(this.fetch, `${this.url}/${renderPath}/${_path}${queryString}`, {
      headers: this.headers,
      noResolveJson: true
    }), "downloadFn");
    return new BlobDownloadBuilder_default(downloadFn, this.shouldThrowOnError);
  }
  /**
   * Retrieves the details of an existing file.
   * @param path
   */
  info(path) {
    return __awaiter(this, void 0, void 0, function* () {
      const _path = this._getFinalPath(path);
      try {
        const data = yield get(this.fetch, `${this.url}/object/info/${_path}`, {
          headers: this.headers
        });
        return { data: recursiveToCamel(data), error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Checks the existence of a file.
   * @param path
   */
  exists(path) {
    return __awaiter(this, void 0, void 0, function* () {
      const _path = this._getFinalPath(path);
      try {
        yield head(this.fetch, `${this.url}/object/${_path}`, {
          headers: this.headers
        });
        return { data: true, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error) && error instanceof StorageUnknownError) {
          const originalError = error.originalError;
          if ([400, 404].includes(originalError === null || originalError === void 0 ? void 0 : originalError.status)) {
            return { data: false, error };
          }
        }
        throw error;
      }
    });
  }
  /**
   * A simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.
   * This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
   *
   * @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
   * @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
   * @param options.transform Transform the asset before serving it to the client.
   */
  getPublicUrl(path, options) {
    const _path = this._getFinalPath(path);
    const _queryString = [];
    const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `download=${options.download === true ? "" : options.download}` : "";
    if (downloadQueryParam !== "") {
      _queryString.push(downloadQueryParam);
    }
    const wantsTransformation = typeof (options === null || options === void 0 ? void 0 : options.transform) !== "undefined";
    const renderPath = wantsTransformation ? "render/image" : "object";
    const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
    if (transformationQuery !== "") {
      _queryString.push(transformationQuery);
    }
    let queryString = _queryString.join("&");
    if (queryString !== "") {
      queryString = `?${queryString}`;
    }
    return {
      data: { publicUrl: encodeURI(`${this.url}/${renderPath}/public/${_path}${queryString}`) }
    };
  }
  /**
   * Deletes files within the same bucket
   *
   * @param paths An array of files to delete, including the path and file name. For example [`'folder/image.png'`].
   */
  remove(paths) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield remove(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: paths }, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Get file metadata
   * @param id the file id to retrieve metadata
   */
  // async getMetadata(
  //   id: string
  // ): Promise<
  //   | {
  //       data: Metadata
  //       error: null
  //     }
  //   | {
  //       data: null
  //       error: StorageError
  //     }
  // > {
  //   try {
  //     const data = await get(this.fetch, `${this.url}/metadata/${id}`, { headers: this.headers })
  //     return { data, error: null }
  //   } catch (error) {
  //     if (isStorageError(error)) {
  //       return { data: null, error }
  //     }
  //     throw error
  //   }
  // }
  /**
   * Update file metadata
   * @param id the file id to update metadata
   * @param meta the new file metadata
   */
  // async updateMetadata(
  //   id: string,
  //   meta: Metadata
  // ): Promise<
  //   | {
  //       data: Metadata
  //       error: null
  //     }
  //   | {
  //       data: null
  //       error: StorageError
  //     }
  // > {
  //   try {
  //     const data = await post(
  //       this.fetch,
  //       `${this.url}/metadata/${id}`,
  //       { ...meta },
  //       { headers: this.headers }
  //     )
  //     return { data, error: null }
  //   } catch (error) {
  //     if (isStorageError(error)) {
  //       return { data: null, error }
  //     }
  //     throw error
  //   }
  // }
  /**
   * Lists all the files and folders within a path of the bucket.
   * @param path The folder path.
   * @param options Search options including limit (defaults to 100), offset, sortBy, and search
   */
  list(path, options, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const body = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), options), { prefix: path || "" });
        const data = yield post(this.fetch, `${this.url}/object/list/${this.bucketId}`, body, { headers: this.headers }, parameters);
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * @experimental this method signature might change in the future
   * @param options search options
   * @param parameters
   */
  listV2(options, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const body = Object.assign({}, options);
        const data = yield post(this.fetch, `${this.url}/object/list-v2/${this.bucketId}`, body, { headers: this.headers }, parameters);
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  encodeMetadata(metadata) {
    return JSON.stringify(metadata);
  }
  toBase64(data) {
    if (typeof Buffer !== "undefined") {
      return Buffer.from(data).toString("base64");
    }
    return btoa(data);
  }
  _getFinalPath(path) {
    return `${this.bucketId}/${path.replace(/^\/+/, "")}`;
  }
  _removeEmptyFolders(path) {
    return path.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
  }
  transformOptsToQueryString(transform) {
    const params = [];
    if (transform.width) {
      params.push(`width=${transform.width}`);
    }
    if (transform.height) {
      params.push(`height=${transform.height}`);
    }
    if (transform.resize) {
      params.push(`resize=${transform.resize}`);
    }
    if (transform.format) {
      params.push(`format=${transform.format}`);
    }
    if (transform.quality) {
      params.push(`quality=${transform.quality}`);
    }
    return params.join("&");
  }
};
__name(StorageFileApi, "StorageFileApi");

// node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/storage-js/dist/module/lib/constants.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/storage-js/dist/module/lib/version.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var version2 = "2.80.0";

// node_modules/@supabase/storage-js/dist/module/lib/constants.js
var DEFAULT_HEADERS = {
  "X-Client-Info": `storage-js/${version2}`
};

// node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js
var StorageBucketApi = class {
  constructor(url, headers = {}, fetch2, opts) {
    this.shouldThrowOnError = false;
    const baseUrl = new URL(url);
    if (opts === null || opts === void 0 ? void 0 : opts.useNewHostname) {
      const isSupabaseHost = /supabase\.(co|in|red)$/.test(baseUrl.hostname);
      if (isSupabaseHost && !baseUrl.hostname.includes("storage.supabase.")) {
        baseUrl.hostname = baseUrl.hostname.replace("supabase.", "storage.supabase.");
      }
    }
    this.url = baseUrl.href.replace(/\/$/, "");
    this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS), headers);
    this.fetch = resolveFetch2(fetch2);
  }
  /**
   * Enable throwing errors instead of returning them.
   */
  throwOnError() {
    this.shouldThrowOnError = true;
    return this;
  }
  /**
   * Retrieves the details of all Storage buckets within an existing project.
   */
  listBuckets(options) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const queryString = this.listBucketOptionsToQueryString(options);
        const data = yield get(this.fetch, `${this.url}/bucket${queryString}`, {
          headers: this.headers
        });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves the details of an existing Storage bucket.
   *
   * @param id The unique identifier of the bucket you would like to retrieve.
   */
  getBucket(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield get(this.fetch, `${this.url}/bucket/${id}`, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Creates a new Storage bucket
   *
   * @param id A unique identifier for the bucket you are creating.
   * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
   * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
   * The global file size limit takes precedence over this value.
   * The default value is null, which doesn't set a per bucket file size limit.
   * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
   * The default value is null, which allows files with all mime types to be uploaded.
   * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
   * @returns newly created bucket id
   * @param options.type (private-beta) specifies the bucket type. see `BucketType` for more details.
   *   - default bucket type is `STANDARD`
   */
  createBucket(id_1) {
    return __awaiter(this, arguments, void 0, function* (id, options = {
      public: false
    }) {
      try {
        const data = yield post(this.fetch, `${this.url}/bucket`, {
          id,
          name: id,
          type: options.type,
          public: options.public,
          file_size_limit: options.fileSizeLimit,
          allowed_mime_types: options.allowedMimeTypes
        }, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Updates a Storage bucket
   *
   * @param id A unique identifier for the bucket you are updating.
   * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
   * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
   * The global file size limit takes precedence over this value.
   * The default value is null, which doesn't set a per bucket file size limit.
   * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
   * The default value is null, which allows files with all mime types to be uploaded.
   * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
   */
  updateBucket(id, options) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield put(this.fetch, `${this.url}/bucket/${id}`, {
          id,
          name: id,
          public: options.public,
          file_size_limit: options.fileSizeLimit,
          allowed_mime_types: options.allowedMimeTypes
        }, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Removes all objects inside a single bucket.
   *
   * @param id The unique identifier of the bucket you would like to empty.
   */
  emptyBucket(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield post(this.fetch, `${this.url}/bucket/${id}/empty`, {}, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
   * You must first `empty()` the bucket.
   *
   * @param id The unique identifier of the bucket you would like to delete.
   */
  deleteBucket(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield remove(this.fetch, `${this.url}/bucket/${id}`, {}, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  listBucketOptionsToQueryString(options) {
    const params = {};
    if (options) {
      if ("limit" in options) {
        params.limit = String(options.limit);
      }
      if ("offset" in options) {
        params.offset = String(options.offset);
      }
      if (options.search) {
        params.search = options.search;
      }
      if (options.sortColumn) {
        params.sortColumn = options.sortColumn;
      }
      if (options.sortOrder) {
        params.sortOrder = options.sortOrder;
      }
    }
    return Object.keys(params).length > 0 ? "?" + new URLSearchParams(params).toString() : "";
  }
};
__name(StorageBucketApi, "StorageBucketApi");

// node_modules/@supabase/storage-js/dist/module/packages/StorageAnalyticsApi.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var StorageAnalyticsApi = class {
  /**
   * Creates a new StorageAnalyticsApi instance
   * @param url - The base URL for the storage API
   * @param headers - HTTP headers to include in requests
   * @param fetch - Optional custom fetch implementation
   */
  constructor(url, headers = {}, fetch2) {
    this.shouldThrowOnError = false;
    this.url = url.replace(/\/$/, "");
    this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS), headers);
    this.fetch = resolveFetch2(fetch2);
  }
  /**
   * Enable throwing errors instead of returning them in the response
   * When enabled, failed operations will throw instead of returning { data: null, error }
   *
   * @returns This instance for method chaining
   */
  throwOnError() {
    this.shouldThrowOnError = true;
    return this;
  }
  /**
   * Creates a new analytics bucket using Iceberg tables
   * Analytics buckets are optimized for analytical queries and data processing
   *
   * @param name A unique name for the bucket you are creating
   * @returns Promise with newly created bucket name or error
   *
   * @example
   * ```typescript
   * const { data, error } = await storage.analytics.createBucket('analytics-data')
   * if (error) {
   *   console.error('Failed to create analytics bucket:', error.message)
   * } else {
   *   console.log('Created bucket:', data.name)
   * }
   * ```
   */
  createBucket(name) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield post(this.fetch, `${this.url}/bucket`, { name }, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves the details of all Analytics Storage buckets within an existing project
   * Only returns buckets of type 'ANALYTICS'
   *
   * @param options Query parameters for listing buckets
   * @param options.limit Maximum number of buckets to return
   * @param options.offset Number of buckets to skip
   * @param options.sortColumn Column to sort by ('id', 'name', 'created_at', 'updated_at')
   * @param options.sortOrder Sort order ('asc' or 'desc')
   * @param options.search Search term to filter bucket names
   * @returns Promise with list of analytics buckets or error
   *
   * @example
   * ```typescript
   * const { data, error } = await storage.analytics.listBuckets({
   *   limit: 10,
   *   offset: 0,
   *   sortColumn: 'created_at',
   *   sortOrder: 'desc',
   *   search: 'analytics'
   * })
   * if (data) {
   *   console.log('Found analytics buckets:', data.length)
   *   data.forEach(bucket => console.log(`- ${bucket.name}`))
   * }
   * ```
   */
  listBuckets(options) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const queryParams = new URLSearchParams();
        if ((options === null || options === void 0 ? void 0 : options.limit) !== void 0)
          queryParams.set("limit", options.limit.toString());
        if ((options === null || options === void 0 ? void 0 : options.offset) !== void 0)
          queryParams.set("offset", options.offset.toString());
        if (options === null || options === void 0 ? void 0 : options.sortColumn)
          queryParams.set("sortColumn", options.sortColumn);
        if (options === null || options === void 0 ? void 0 : options.sortOrder)
          queryParams.set("sortOrder", options.sortOrder);
        if (options === null || options === void 0 ? void 0 : options.search)
          queryParams.set("search", options.search);
        const queryString = queryParams.toString();
        const url = queryString ? `${this.url}/bucket?${queryString}` : `${this.url}/bucket`;
        const data = yield get(this.fetch, url, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Deletes an existing analytics bucket
   * A bucket can't be deleted with existing objects inside it
   * You must first empty the bucket before deletion
   *
   * @param bucketId The unique identifier of the bucket you would like to delete
   * @returns Promise with success message or error
   *
   * @example
   * ```typescript
   * const { data, error } = await analyticsApi.deleteBucket('old-analytics-bucket')
   * if (error) {
   *   console.error('Failed to delete bucket:', error.message)
   * } else {
   *   console.log('Bucket deleted successfully:', data.message)
   * }
   * ```
   */
  deleteBucket(bucketId) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield remove(this.fetch, `${this.url}/bucket/${bucketId}`, {}, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
};
__name(StorageAnalyticsApi, "StorageAnalyticsApi");

// node_modules/@supabase/storage-js/dist/module/lib/vectors/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/storage-js/dist/module/lib/vectors/StorageVectorsClient.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/storage-js/dist/module/lib/vectors/VectorIndexApi.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/storage-js/dist/module/lib/vectors/constants.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var DEFAULT_HEADERS2 = {
  "X-Client-Info": `storage-js/${version2}`,
  "Content-Type": "application/json"
};

// node_modules/@supabase/storage-js/dist/module/lib/vectors/errors.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var StorageVectorsError = class extends Error {
  constructor(message) {
    super(message);
    this.__isStorageVectorsError = true;
    this.name = "StorageVectorsError";
  }
};
__name(StorageVectorsError, "StorageVectorsError");
function isStorageVectorsError(error) {
  return typeof error === "object" && error !== null && "__isStorageVectorsError" in error;
}
__name(isStorageVectorsError, "isStorageVectorsError");
var StorageVectorsApiError = class extends StorageVectorsError {
  constructor(message, status, statusCode) {
    super(message);
    this.name = "StorageVectorsApiError";
    this.status = status;
    this.statusCode = statusCode;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      statusCode: this.statusCode
    };
  }
};
__name(StorageVectorsApiError, "StorageVectorsApiError");
var StorageVectorsUnknownError = class extends StorageVectorsError {
  constructor(message, originalError) {
    super(message);
    this.name = "StorageVectorsUnknownError";
    this.originalError = originalError;
  }
};
__name(StorageVectorsUnknownError, "StorageVectorsUnknownError");
var StorageVectorsErrorCode;
(function(StorageVectorsErrorCode2) {
  StorageVectorsErrorCode2["InternalError"] = "InternalError";
  StorageVectorsErrorCode2["S3VectorConflictException"] = "S3VectorConflictException";
  StorageVectorsErrorCode2["S3VectorNotFoundException"] = "S3VectorNotFoundException";
  StorageVectorsErrorCode2["S3VectorBucketNotEmpty"] = "S3VectorBucketNotEmpty";
  StorageVectorsErrorCode2["S3VectorMaxBucketsExceeded"] = "S3VectorMaxBucketsExceeded";
  StorageVectorsErrorCode2["S3VectorMaxIndexesExceeded"] = "S3VectorMaxIndexesExceeded";
})(StorageVectorsErrorCode || (StorageVectorsErrorCode = {}));

// node_modules/@supabase/storage-js/dist/module/lib/vectors/fetch.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/storage-js/dist/module/lib/vectors/helpers.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var resolveFetch3 = /* @__PURE__ */ __name((customFetch) => {
  if (customFetch) {
    return (...args) => customFetch(...args);
  }
  return (...args) => fetch(...args);
}, "resolveFetch");
var isPlainObject2 = /* @__PURE__ */ __name((value) => {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}, "isPlainObject");

// node_modules/@supabase/storage-js/dist/module/lib/vectors/fetch.js
var _getErrorMessage2 = /* @__PURE__ */ __name((err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err), "_getErrorMessage");
var handleError2 = /* @__PURE__ */ __name((error, reject, options) => __awaiter(void 0, void 0, void 0, function* () {
  const isResponseLike = error && typeof error === "object" && "status" in error && "ok" in error && typeof error.status === "number";
  if (isResponseLike && !(options === null || options === void 0 ? void 0 : options.noResolveJson)) {
    const status = error.status || 500;
    const responseError = error;
    if (typeof responseError.json === "function") {
      responseError.json().then((err) => {
        const statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || (err === null || err === void 0 ? void 0 : err.code) || status + "";
        reject(new StorageVectorsApiError(_getErrorMessage2(err), status, statusCode));
      }).catch(() => {
        const statusCode = status + "";
        const message = responseError.statusText || `HTTP ${status} error`;
        reject(new StorageVectorsApiError(message, status, statusCode));
      });
    } else {
      const statusCode = status + "";
      const message = responseError.statusText || `HTTP ${status} error`;
      reject(new StorageVectorsApiError(message, status, statusCode));
    }
  } else {
    reject(new StorageVectorsUnknownError(_getErrorMessage2(error), error));
  }
}), "handleError");
var _getRequestParams2 = /* @__PURE__ */ __name((method, options, parameters, body) => {
  const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
  if (method === "GET" || !body) {
    return params;
  }
  if (isPlainObject2(body)) {
    params.headers = Object.assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers);
    params.body = JSON.stringify(body);
  } else {
    params.body = body;
  }
  return Object.assign(Object.assign({}, params), parameters);
}, "_getRequestParams");
function _handleRequest2(fetcher, method, url, options, parameters, body) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      fetcher(url, _getRequestParams2(method, options, parameters, body)).then((result) => {
        if (!result.ok)
          throw result;
        if (options === null || options === void 0 ? void 0 : options.noResolveJson)
          return result;
        const contentType = result.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          return {};
        }
        return result.json();
      }).then((data) => resolve(data)).catch((error) => handleError2(error, reject, options));
    });
  });
}
__name(_handleRequest2, "_handleRequest");
function post2(fetcher, url, body, options, parameters) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest2(fetcher, "POST", url, options, parameters, body);
  });
}
__name(post2, "post");

// node_modules/@supabase/storage-js/dist/module/lib/vectors/VectorIndexApi.js
var VectorIndexApi = class {
  constructor(url, headers = {}, fetch2) {
    this.shouldThrowOnError = false;
    this.url = url.replace(/\/$/, "");
    this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS2), headers);
    this.fetch = resolveFetch3(fetch2);
  }
  /**
   * Enable throwing errors instead of returning them in the response
   * When enabled, failed operations will throw instead of returning { data: null, error }
   *
   * @returns This instance for method chaining
   * @example
   * ```typescript
   * const client = new VectorIndexApi(url, headers)
   * client.throwOnError()
   * const { data } = await client.createIndex(options) // throws on error
   * ```
   */
  throwOnError() {
    this.shouldThrowOnError = true;
    return this;
  }
  /**
   * Creates a new vector index within a bucket
   * Defines the schema for vectors including dimensionality, distance metric, and metadata config
   *
   * @param options - Index configuration
   * @param options.vectorBucketName - Name of the parent vector bucket
   * @param options.indexName - Unique name for the index within the bucket
   * @param options.dataType - Data type for vector components (currently only 'float32')
   * @param options.dimension - Dimensionality of vectors (e.g., 384, 768, 1536)
   * @param options.distanceMetric - Similarity metric ('cosine', 'euclidean', 'dotproduct')
   * @param options.metadataConfiguration - Optional config for non-filterable metadata keys
   * @returns Promise with empty response on success or error
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorConflictException` if index already exists (HTTP 409)
   * - `S3VectorMaxIndexesExceeded` if quota exceeded (HTTP 400)
   * - `S3VectorNotFoundException` if bucket doesn't exist (HTTP 404)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * const { data, error } = await client.createIndex({
   *   vectorBucketName: 'embeddings-prod',
   *   indexName: 'documents-openai-small',
   *   dataType: 'float32',
   *   dimension: 1536,
   *   distanceMetric: 'cosine',
   *   metadataConfiguration: {
   *     nonFilterableMetadataKeys: ['raw_text', 'internal_id']
   *   }
   * })
   * ```
   */
  createIndex(options) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield post2(this.fetch, `${this.url}/CreateIndex`, options, {
          headers: this.headers
        });
        return { data: data || {}, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageVectorsError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves metadata for a specific vector index
   * Returns index configuration including dimension, distance metric, and metadata settings
   *
   * @param vectorBucketName - Name of the parent vector bucket
   * @param indexName - Name of the index to retrieve
   * @returns Promise with index metadata or error
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorNotFoundException` if index or bucket doesn't exist (HTTP 404)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * const { data, error } = await client.getIndex('embeddings-prod', 'documents-openai-small')
   * if (data) {
   *   console.log('Index dimension:', data.index.dimension)
   *   console.log('Distance metric:', data.index.distanceMetric)
   * }
   * ```
   */
  getIndex(vectorBucketName, indexName) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield post2(this.fetch, `${this.url}/GetIndex`, { vectorBucketName, indexName }, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageVectorsError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Lists vector indexes within a bucket with optional filtering and pagination
   * Supports prefix-based filtering and paginated results
   *
   * @param options - Listing options
   * @param options.vectorBucketName - Name of the parent vector bucket
   * @param options.prefix - Filter indexes by name prefix
   * @param options.maxResults - Maximum results per page (default: 100)
   * @param options.nextToken - Pagination token from previous response
   * @returns Promise with list of indexes and pagination token
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorNotFoundException` if bucket doesn't exist (HTTP 404)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * // List all indexes in a bucket
   * const { data, error } = await client.listIndexes({
   *   vectorBucketName: 'embeddings-prod',
   *   prefix: 'documents-'
   * })
   * if (data) {
   *   console.log('Found indexes:', data.indexes.map(i => i.indexName))
   *   // Fetch next page if available
   *   if (data.nextToken) {
   *     const next = await client.listIndexes({
   *       vectorBucketName: 'embeddings-prod',
   *       nextToken: data.nextToken
   *     })
   *   }
   * }
   * ```
   */
  listIndexes(options) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield post2(this.fetch, `${this.url}/ListIndexes`, options, {
          headers: this.headers
        });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageVectorsError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Deletes a vector index and all its data
   * This operation removes the index schema and all vectors stored in the index
   *
   * @param vectorBucketName - Name of the parent vector bucket
   * @param indexName - Name of the index to delete
   * @returns Promise with empty response on success or error
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorNotFoundException` if index or bucket doesn't exist (HTTP 404)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * // Delete an index and all its vectors
   * const { error } = await client.deleteIndex('embeddings-prod', 'old-index')
   * if (!error) {
   *   console.log('Index deleted successfully')
   * }
   * ```
   */
  deleteIndex(vectorBucketName, indexName) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield post2(this.fetch, `${this.url}/DeleteIndex`, { vectorBucketName, indexName }, { headers: this.headers });
        return { data: data || {}, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageVectorsError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
};
__name(VectorIndexApi, "VectorIndexApi");

// node_modules/@supabase/storage-js/dist/module/lib/vectors/VectorDataApi.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var VectorDataApi = class {
  constructor(url, headers = {}, fetch2) {
    this.shouldThrowOnError = false;
    this.url = url.replace(/\/$/, "");
    this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS2), headers);
    this.fetch = resolveFetch3(fetch2);
  }
  /**
   * Enable throwing errors instead of returning them in the response
   * When enabled, failed operations will throw instead of returning { data: null, error }
   *
   * @returns This instance for method chaining
   * @example
   * ```typescript
   * const client = new VectorDataApi(url, headers)
   * client.throwOnError()
   * const { data } = await client.putVectors(options) // throws on error
   * ```
   */
  throwOnError() {
    this.shouldThrowOnError = true;
    return this;
  }
  /**
   * Inserts or updates vectors in batch (upsert operation)
   * Accepts 1-500 vectors per request. Larger batches should be split
   *
   * @param options - Vector insertion options
   * @param options.vectorBucketName - Name of the parent vector bucket
   * @param options.indexName - Name of the target index
   * @param options.vectors - Array of vectors to insert/update (1-500 items)
   * @returns Promise with empty response on success or error
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorConflictException` if duplicate key conflict occurs (HTTP 409)
   * - `S3VectorNotFoundException` if bucket or index doesn't exist (HTTP 404)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * const { data, error } = await client.putVectors({
   *   vectorBucketName: 'embeddings-prod',
   *   indexName: 'documents-openai-small',
   *   vectors: [
   *     {
   *       key: 'doc-1',
   *       data: { float32: [0.1, 0.2, 0.3, ...] }, // 1536 dimensions
   *       metadata: { title: 'Introduction', page: 1 }
   *     },
   *     {
   *       key: 'doc-2',
   *       data: { float32: [0.4, 0.5, 0.6, ...] },
   *       metadata: { title: 'Conclusion', page: 42 }
   *     }
   *   ]
   * })
   * ```
   */
  putVectors(options) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        if (options.vectors.length < 1 || options.vectors.length > 500) {
          throw new Error("Vector batch size must be between 1 and 500 items");
        }
        const data = yield post2(this.fetch, `${this.url}/PutVectors`, options, {
          headers: this.headers
        });
        return { data: data || {}, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageVectorsError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves vectors by their keys in batch
   * Optionally includes vector data and/or metadata in response
   * Additional permissions required when returning data or metadata
   *
   * @param options - Vector retrieval options
   * @param options.vectorBucketName - Name of the parent vector bucket
   * @param options.indexName - Name of the index
   * @param options.keys - Array of vector keys to retrieve
   * @param options.returnData - Whether to include vector embeddings (requires permission)
   * @param options.returnMetadata - Whether to include metadata (requires permission)
   * @returns Promise with array of vectors or error
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorNotFoundException` if bucket or index doesn't exist (HTTP 404)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * const { data, error } = await client.getVectors({
   *   vectorBucketName: 'embeddings-prod',
   *   indexName: 'documents-openai-small',
   *   keys: ['doc-1', 'doc-2', 'doc-3'],
   *   returnData: false,     // Don't return embeddings
   *   returnMetadata: true   // Return metadata only
   * })
   * if (data) {
   *   data.vectors.forEach(v => console.log(v.key, v.metadata))
   * }
   * ```
   */
  getVectors(options) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield post2(this.fetch, `${this.url}/GetVectors`, options, {
          headers: this.headers
        });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageVectorsError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Lists/scans vectors in an index with pagination
   * Supports parallel scanning via segment configuration for high-throughput scenarios
   * Additional permissions required when returning data or metadata
   *
   * @param options - Vector listing options
   * @param options.vectorBucketName - Name of the parent vector bucket
   * @param options.indexName - Name of the index
   * @param options.maxResults - Maximum results per page (default: 500, max: 1000)
   * @param options.nextToken - Pagination token from previous response
   * @param options.returnData - Whether to include vector embeddings (requires permission)
   * @param options.returnMetadata - Whether to include metadata (requires permission)
   * @param options.segmentCount - Total parallel segments (1-16) for distributed scanning
   * @param options.segmentIndex - Zero-based segment index (0 to segmentCount-1)
   * @returns Promise with array of vectors, pagination token, or error
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorNotFoundException` if bucket or index doesn't exist (HTTP 404)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * // Simple pagination
   * let nextToken: string | undefined
   * do {
   *   const { data, error } = await client.listVectors({
   *     vectorBucketName: 'embeddings-prod',
   *     indexName: 'documents-openai-small',
   *     maxResults: 500,
   *     nextToken,
   *     returnMetadata: true
   *   })
   *   if (error) break
   *   console.log('Batch:', data.vectors.length)
   *   nextToken = data.nextToken
   * } while (nextToken)
   *
   * // Parallel scanning (4 concurrent workers)
   * const workers = [0, 1, 2, 3].map(async (segmentIndex) => {
   *   const { data } = await client.listVectors({
   *     vectorBucketName: 'embeddings-prod',
   *     indexName: 'documents-openai-small',
   *     segmentCount: 4,
   *     segmentIndex,
   *     returnMetadata: true
   *   })
   *   return data?.vectors || []
   * })
   * const results = await Promise.all(workers)
   * ```
   */
  listVectors(options) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        if (options.segmentCount !== void 0) {
          if (options.segmentCount < 1 || options.segmentCount > 16) {
            throw new Error("segmentCount must be between 1 and 16");
          }
          if (options.segmentIndex !== void 0) {
            if (options.segmentIndex < 0 || options.segmentIndex >= options.segmentCount) {
              throw new Error(`segmentIndex must be between 0 and ${options.segmentCount - 1}`);
            }
          }
        }
        const data = yield post2(this.fetch, `${this.url}/ListVectors`, options, {
          headers: this.headers
        });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageVectorsError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Queries for similar vectors using approximate nearest neighbor (ANN) search
   * Returns top-K most similar vectors based on the configured distance metric
   * Supports optional metadata filtering (requires GetVectors permission)
   *
   * @param options - Query options
   * @param options.vectorBucketName - Name of the parent vector bucket
   * @param options.indexName - Name of the index
   * @param options.queryVector - Query embedding to find similar vectors
   * @param options.topK - Number of nearest neighbors to return (default: 10)
   * @param options.filter - Optional JSON filter for metadata (requires GetVectors permission)
   * @param options.returnDistance - Whether to include similarity distances
   * @param options.returnMetadata - Whether to include metadata (requires GetVectors permission)
   * @returns Promise with array of similar vectors ordered by distance
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorNotFoundException` if bucket or index doesn't exist (HTTP 404)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * // Semantic search with filtering
   * const { data, error } = await client.queryVectors({
   *   vectorBucketName: 'embeddings-prod',
   *   indexName: 'documents-openai-small',
   *   queryVector: { float32: [0.1, 0.2, 0.3, ...] }, // 1536 dimensions
   *   topK: 5,
   *   filter: {
   *     category: 'technical',
   *     published: true
   *   },
   *   returnDistance: true,
   *   returnMetadata: true
   * })
   * if (data) {
   *   data.matches.forEach(match => {
   *     console.log(`${match.key}: distance=${match.distance}`)
   *     console.log('Metadata:', match.metadata)
   *   })
   * }
   * ```
   */
  queryVectors(options) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield post2(this.fetch, `${this.url}/QueryVectors`, options, {
          headers: this.headers
        });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageVectorsError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Deletes vectors by their keys in batch
   * Accepts 1-500 keys per request
   *
   * @param options - Vector deletion options
   * @param options.vectorBucketName - Name of the parent vector bucket
   * @param options.indexName - Name of the index
   * @param options.keys - Array of vector keys to delete (1-500 items)
   * @returns Promise with empty response on success or error
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorNotFoundException` if bucket or index doesn't exist (HTTP 404)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * const { error } = await client.deleteVectors({
   *   vectorBucketName: 'embeddings-prod',
   *   indexName: 'documents-openai-small',
   *   keys: ['doc-1', 'doc-2', 'doc-3']
   * })
   * if (!error) {
   *   console.log('Vectors deleted successfully')
   * }
   * ```
   */
  deleteVectors(options) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        if (options.keys.length < 1 || options.keys.length > 500) {
          throw new Error("Keys batch size must be between 1 and 500 items");
        }
        const data = yield post2(this.fetch, `${this.url}/DeleteVectors`, options, {
          headers: this.headers
        });
        return { data: data || {}, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageVectorsError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
};
__name(VectorDataApi, "VectorDataApi");

// node_modules/@supabase/storage-js/dist/module/lib/vectors/VectorBucketApi.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var VectorBucketApi = class {
  /**
   * Creates a new VectorBucketApi instance
   * @param url - The base URL for the storage vectors API
   * @param headers - HTTP headers to include in requests
   * @param fetch - Optional custom fetch implementation
   */
  constructor(url, headers = {}, fetch2) {
    this.shouldThrowOnError = false;
    this.url = url.replace(/\/$/, "");
    this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS2), headers);
    this.fetch = resolveFetch3(fetch2);
  }
  /**
   * Enable throwing errors instead of returning them in the response
   * When enabled, failed operations will throw instead of returning { data: null, error }
   *
   * @returns This instance for method chaining
   * @example
   * ```typescript
   * const client = new VectorBucketApi(url, headers)
   * client.throwOnError()
   * const { data } = await client.createBucket('my-bucket') // throws on error
   * ```
   */
  throwOnError() {
    this.shouldThrowOnError = true;
    return this;
  }
  /**
   * Creates a new vector bucket
   * Vector buckets are containers for vector indexes and their data
   *
   * @param vectorBucketName - Unique name for the vector bucket
   * @returns Promise with empty response on success or error
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorConflictException` if bucket already exists (HTTP 409)
   * - `S3VectorMaxBucketsExceeded` if quota exceeded (HTTP 400)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * const { data, error } = await client.createBucket('embeddings-prod')
   * if (error) {
   *   console.error('Failed to create bucket:', error.message)
   * }
   * ```
   */
  createBucket(vectorBucketName) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield post2(this.fetch, `${this.url}/CreateVectorBucket`, { vectorBucketName }, { headers: this.headers });
        return { data: data || {}, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageVectorsError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves metadata for a specific vector bucket
   * Returns bucket configuration including encryption settings and creation time
   *
   * @param vectorBucketName - Name of the vector bucket to retrieve
   * @returns Promise with bucket metadata or error
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorNotFoundException` if bucket doesn't exist (HTTP 404)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * const { data, error } = await client.getBucket('embeddings-prod')
   * if (data) {
   *   console.log('Bucket created at:', new Date(data.vectorBucket.creationTime! * 1000))
   * }
   * ```
   */
  getBucket(vectorBucketName) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield post2(this.fetch, `${this.url}/GetVectorBucket`, { vectorBucketName }, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageVectorsError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Lists vector buckets with optional filtering and pagination
   * Supports prefix-based filtering and paginated results
   *
   * @param options - Listing options
   * @param options.prefix - Filter buckets by name prefix
   * @param options.maxResults - Maximum results per page (default: 100)
   * @param options.nextToken - Pagination token from previous response
   * @returns Promise with list of buckets and pagination token
   *
   * @throws {StorageVectorsApiError} With code:
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * // List all buckets with prefix 'prod-'
   * const { data, error } = await client.listBuckets({ prefix: 'prod-' })
   * if (data) {
   *   console.log('Found buckets:', data.buckets.length)
   *   // Fetch next page if available
   *   if (data.nextToken) {
   *     const next = await client.listBuckets({ nextToken: data.nextToken })
   *   }
   * }
   * ```
   */
  listBuckets() {
    return __awaiter(this, arguments, void 0, function* (options = {}) {
      try {
        const data = yield post2(this.fetch, `${this.url}/ListVectorBuckets`, options, {
          headers: this.headers
        });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageVectorsError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Deletes a vector bucket
   * Bucket must be empty before deletion (all indexes must be removed first)
   *
   * @param vectorBucketName - Name of the vector bucket to delete
   * @returns Promise with empty response on success or error
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorBucketNotEmpty` if bucket contains indexes (HTTP 400)
   * - `S3VectorNotFoundException` if bucket doesn't exist (HTTP 404)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * // Delete all indexes first, then delete bucket
   * const { error } = await client.deleteBucket('old-bucket')
   * if (error?.statusCode === 'S3VectorBucketNotEmpty') {
   *   console.error('Must delete all indexes first')
   * }
   * ```
   */
  deleteBucket(vectorBucketName) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield post2(this.fetch, `${this.url}/DeleteVectorBucket`, { vectorBucketName }, { headers: this.headers });
        return { data: data || {}, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageVectorsError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
};
__name(VectorBucketApi, "VectorBucketApi");

// node_modules/@supabase/storage-js/dist/module/lib/vectors/StorageVectorsClient.js
var StorageVectorsClient = class extends VectorBucketApi {
  constructor(url, options = {}) {
    super(url, options.headers || {}, options.fetch);
  }
  /**
   * Access operations for a specific vector bucket
   * Returns a scoped client for index and vector operations within the bucket
   *
   * @param vectorBucketName - Name of the vector bucket
   * @returns Bucket-scoped client with index and vector operations
   *
   * @example
   * ```typescript
   * const bucket = client.bucket('embeddings-prod')
   *
   * // Create an index in this bucket
   * await bucket.createIndex({
   *   indexName: 'documents-openai',
   *   dataType: 'float32',
   *   dimension: 1536,
   *   distanceMetric: 'cosine'
   * })
   *
   * // List indexes in this bucket
   * const { data } = await bucket.listIndexes()
   * ```
   */
  from(vectorBucketName) {
    return new VectorBucketScope(this.url, this.headers, vectorBucketName, this.fetch);
  }
};
__name(StorageVectorsClient, "StorageVectorsClient");
var VectorBucketScope = class extends VectorIndexApi {
  constructor(url, headers, vectorBucketName, fetch2) {
    super(url, headers, fetch2);
    this.vectorBucketName = vectorBucketName;
  }
  /**
   * Creates a new vector index in this bucket
   * Convenience method that automatically includes the bucket name
   *
   * @param options - Index configuration (vectorBucketName is automatically set)
   * @returns Promise with empty response on success or error
   *
   * @example
   * ```typescript
   * const bucket = client.bucket('embeddings-prod')
   * await bucket.createIndex({
   *   indexName: 'documents-openai',
   *   dataType: 'float32',
   *   dimension: 1536,
   *   distanceMetric: 'cosine',
   *   metadataConfiguration: {
   *     nonFilterableMetadataKeys: ['raw_text']
   *   }
   * })
   * ```
   */
  createIndex(options) {
    const _super = Object.create(null, {
      createIndex: { get: () => super.createIndex }
    });
    return __awaiter(this, void 0, void 0, function* () {
      return _super.createIndex.call(this, Object.assign(Object.assign({}, options), { vectorBucketName: this.vectorBucketName }));
    });
  }
  /**
   * Lists indexes in this bucket
   * Convenience method that automatically includes the bucket name
   *
   * @param options - Listing options (vectorBucketName is automatically set)
   * @returns Promise with list of indexes or error
   *
   * @example
   * ```typescript
   * const bucket = client.bucket('embeddings-prod')
   * const { data } = await bucket.listIndexes({ prefix: 'documents-' })
   * ```
   */
  listIndexes() {
    const _super = Object.create(null, {
      listIndexes: { get: () => super.listIndexes }
    });
    return __awaiter(this, arguments, void 0, function* (options = {}) {
      return _super.listIndexes.call(this, Object.assign(Object.assign({}, options), { vectorBucketName: this.vectorBucketName }));
    });
  }
  /**
   * Retrieves metadata for a specific index in this bucket
   * Convenience method that automatically includes the bucket name
   *
   * @param indexName - Name of the index to retrieve
   * @returns Promise with index metadata or error
   *
   * @example
   * ```typescript
   * const bucket = client.bucket('embeddings-prod')
   * const { data } = await bucket.getIndex('documents-openai')
   * console.log('Dimension:', data?.index.dimension)
   * ```
   */
  getIndex(indexName) {
    const _super = Object.create(null, {
      getIndex: { get: () => super.getIndex }
    });
    return __awaiter(this, void 0, void 0, function* () {
      return _super.getIndex.call(this, this.vectorBucketName, indexName);
    });
  }
  /**
   * Deletes an index from this bucket
   * Convenience method that automatically includes the bucket name
   *
   * @param indexName - Name of the index to delete
   * @returns Promise with empty response on success or error
   *
   * @example
   * ```typescript
   * const bucket = client.bucket('embeddings-prod')
   * await bucket.deleteIndex('old-index')
   * ```
   */
  deleteIndex(indexName) {
    const _super = Object.create(null, {
      deleteIndex: { get: () => super.deleteIndex }
    });
    return __awaiter(this, void 0, void 0, function* () {
      return _super.deleteIndex.call(this, this.vectorBucketName, indexName);
    });
  }
  /**
   * Access operations for a specific index within this bucket
   * Returns a scoped client for vector data operations
   *
   * @param indexName - Name of the index
   * @returns Index-scoped client with vector data operations
   *
   * @example
   * ```typescript
   * const index = client.bucket('embeddings-prod').index('documents-openai')
   *
   * // Insert vectors
   * await index.putVectors({
   *   vectors: [
   *     { key: 'doc-1', data: { float32: [...] }, metadata: { title: 'Intro' } }
   *   ]
   * })
   *
   * // Query similar vectors
   * const { data } = await index.queryVectors({
   *   queryVector: { float32: [...] },
   *   topK: 5
   * })
   * ```
   */
  index(indexName) {
    return new VectorIndexScope(this.url, this.headers, this.vectorBucketName, indexName, this.fetch);
  }
};
__name(VectorBucketScope, "VectorBucketScope");
var VectorIndexScope = class extends VectorDataApi {
  constructor(url, headers, vectorBucketName, indexName, fetch2) {
    super(url, headers, fetch2);
    this.vectorBucketName = vectorBucketName;
    this.indexName = indexName;
  }
  /**
   * Inserts or updates vectors in this index
   * Convenience method that automatically includes bucket and index names
   *
   * @param options - Vector insertion options (bucket and index names automatically set)
   * @returns Promise with empty response on success or error
   *
   * @example
   * ```typescript
   * const index = client.bucket('embeddings-prod').index('documents-openai')
   * await index.putVectors({
   *   vectors: [
   *     {
   *       key: 'doc-1',
   *       data: { float32: [0.1, 0.2, ...] },
   *       metadata: { title: 'Introduction', page: 1 }
   *     }
   *   ]
   * })
   * ```
   */
  putVectors(options) {
    const _super = Object.create(null, {
      putVectors: { get: () => super.putVectors }
    });
    return __awaiter(this, void 0, void 0, function* () {
      return _super.putVectors.call(this, Object.assign(Object.assign({}, options), { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
    });
  }
  /**
   * Retrieves vectors by keys from this index
   * Convenience method that automatically includes bucket and index names
   *
   * @param options - Vector retrieval options (bucket and index names automatically set)
   * @returns Promise with array of vectors or error
   *
   * @example
   * ```typescript
   * const index = client.bucket('embeddings-prod').index('documents-openai')
   * const { data } = await index.getVectors({
   *   keys: ['doc-1', 'doc-2'],
   *   returnMetadata: true
   * })
   * ```
   */
  getVectors(options) {
    const _super = Object.create(null, {
      getVectors: { get: () => super.getVectors }
    });
    return __awaiter(this, void 0, void 0, function* () {
      return _super.getVectors.call(this, Object.assign(Object.assign({}, options), { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
    });
  }
  /**
   * Lists vectors in this index with pagination
   * Convenience method that automatically includes bucket and index names
   *
   * @param options - Listing options (bucket and index names automatically set)
   * @returns Promise with array of vectors and pagination token
   *
   * @example
   * ```typescript
   * const index = client.bucket('embeddings-prod').index('documents-openai')
   * const { data } = await index.listVectors({
   *   maxResults: 500,
   *   returnMetadata: true
   * })
   * ```
   */
  listVectors() {
    const _super = Object.create(null, {
      listVectors: { get: () => super.listVectors }
    });
    return __awaiter(this, arguments, void 0, function* (options = {}) {
      return _super.listVectors.call(this, Object.assign(Object.assign({}, options), { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
    });
  }
  /**
   * Queries for similar vectors in this index
   * Convenience method that automatically includes bucket and index names
   *
   * @param options - Query options (bucket and index names automatically set)
   * @returns Promise with array of similar vectors ordered by distance
   *
   * @example
   * ```typescript
   * const index = client.bucket('embeddings-prod').index('documents-openai')
   * const { data } = await index.queryVectors({
   *   queryVector: { float32: [0.1, 0.2, ...] },
   *   topK: 5,
   *   filter: { category: 'technical' },
   *   returnDistance: true,
   *   returnMetadata: true
   * })
   * ```
   */
  queryVectors(options) {
    const _super = Object.create(null, {
      queryVectors: { get: () => super.queryVectors }
    });
    return __awaiter(this, void 0, void 0, function* () {
      return _super.queryVectors.call(this, Object.assign(Object.assign({}, options), { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
    });
  }
  /**
   * Deletes vectors by keys from this index
   * Convenience method that automatically includes bucket and index names
   *
   * @param options - Deletion options (bucket and index names automatically set)
   * @returns Promise with empty response on success or error
   *
   * @example
   * ```typescript
   * const index = client.bucket('embeddings-prod').index('documents-openai')
   * await index.deleteVectors({
   *   keys: ['doc-1', 'doc-2', 'doc-3']
   * })
   * ```
   */
  deleteVectors(options) {
    const _super = Object.create(null, {
      deleteVectors: { get: () => super.deleteVectors }
    });
    return __awaiter(this, void 0, void 0, function* () {
      return _super.deleteVectors.call(this, Object.assign(Object.assign({}, options), { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
    });
  }
};
__name(VectorIndexScope, "VectorIndexScope");

// node_modules/@supabase/storage-js/dist/module/StorageClient.js
var StorageClient = class extends StorageBucketApi {
  constructor(url, headers = {}, fetch2, opts) {
    super(url, headers, fetch2, opts);
  }
  /**
   * Perform file operation in a bucket.
   *
   * @param id The bucket id to operate on.
   */
  from(id) {
    return new StorageFileApi(this.url, this.headers, id, this.fetch);
  }
  /**
   * Access vector storage operations.
   *
   * @returns A StorageVectorsClient instance configured with the current storage settings.
   */
  get vectors() {
    return new StorageVectorsClient(this.url + "/vector", {
      headers: this.headers,
      fetch: this.fetch
    });
  }
  /**
   * Access analytics storage operations using Iceberg tables.
   *
   * @returns A StorageAnalyticsApi instance configured with the current storage settings.
   * @example
   * ```typescript
   * const client = createClient(url, key)
   * const analytics = client.storage.analytics
   *
   * // Create an analytics bucket
   * await analytics.createBucket('my-analytics-bucket')
   *
   * // List all analytics buckets
   * const { data: buckets } = await analytics.listBuckets()
   *
   * // Delete an analytics bucket
   * await analytics.deleteBucket('old-analytics-bucket')
   * ```
   */
  get analytics() {
    return new StorageAnalyticsApi(this.url + "/iceberg", this.headers, this.fetch);
  }
};
__name(StorageClient, "StorageClient");

// node_modules/@supabase/supabase-js/dist/module/lib/constants.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/supabase-js/dist/module/lib/version.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var version3 = "2.80.0";

// node_modules/@supabase/supabase-js/dist/module/lib/constants.js
var JS_ENV = "";
if (typeof Deno !== "undefined") {
  JS_ENV = "deno";
} else if (typeof document !== "undefined") {
  JS_ENV = "web";
} else if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
  JS_ENV = "react-native";
} else {
  JS_ENV = "node";
}
var DEFAULT_HEADERS3 = { "X-Client-Info": `supabase-js-${JS_ENV}/${version3}` };
var DEFAULT_GLOBAL_OPTIONS = {
  headers: DEFAULT_HEADERS3
};
var DEFAULT_DB_OPTIONS = {
  schema: "public"
};
var DEFAULT_AUTH_OPTIONS = {
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
  flowType: "implicit"
};
var DEFAULT_REALTIME_OPTIONS = {};

// node_modules/@supabase/supabase-js/dist/module/lib/fetch.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var resolveFetch4 = /* @__PURE__ */ __name((customFetch) => {
  if (customFetch) {
    return (...args) => customFetch(...args);
  }
  return (...args) => fetch(...args);
}, "resolveFetch");
var resolveHeadersConstructor = /* @__PURE__ */ __name(() => {
  return Headers;
}, "resolveHeadersConstructor");
var fetchWithAuth = /* @__PURE__ */ __name((supabaseKey, getAccessToken, customFetch) => {
  const fetch2 = resolveFetch4(customFetch);
  const HeadersConstructor = resolveHeadersConstructor();
  return async (input, init) => {
    var _a2;
    const accessToken = (_a2 = await getAccessToken()) !== null && _a2 !== void 0 ? _a2 : supabaseKey;
    let headers = new HeadersConstructor(init === null || init === void 0 ? void 0 : init.headers);
    if (!headers.has("apikey")) {
      headers.set("apikey", supabaseKey);
    }
    if (!headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return fetch2(input, Object.assign(Object.assign({}, init), { headers }));
  };
}, "fetchWithAuth");

// node_modules/@supabase/supabase-js/dist/module/lib/helpers.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
function ensureTrailingSlash(url) {
  return url.endsWith("/") ? url : url + "/";
}
__name(ensureTrailingSlash, "ensureTrailingSlash");
function applySettingDefaults(options, defaults) {
  var _a2, _b;
  const { db: dbOptions, auth: authOptions, realtime: realtimeOptions, global: globalOptions } = options;
  const { db: DEFAULT_DB_OPTIONS2, auth: DEFAULT_AUTH_OPTIONS2, realtime: DEFAULT_REALTIME_OPTIONS2, global: DEFAULT_GLOBAL_OPTIONS2 } = defaults;
  const result = {
    db: Object.assign(Object.assign({}, DEFAULT_DB_OPTIONS2), dbOptions),
    auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS2), authOptions),
    realtime: Object.assign(Object.assign({}, DEFAULT_REALTIME_OPTIONS2), realtimeOptions),
    storage: {},
    global: Object.assign(Object.assign(Object.assign({}, DEFAULT_GLOBAL_OPTIONS2), globalOptions), { headers: Object.assign(Object.assign({}, (_a2 = DEFAULT_GLOBAL_OPTIONS2 === null || DEFAULT_GLOBAL_OPTIONS2 === void 0 ? void 0 : DEFAULT_GLOBAL_OPTIONS2.headers) !== null && _a2 !== void 0 ? _a2 : {}), (_b = globalOptions === null || globalOptions === void 0 ? void 0 : globalOptions.headers) !== null && _b !== void 0 ? _b : {}) }),
    accessToken: async () => ""
  };
  if (options.accessToken) {
    result.accessToken = options.accessToken;
  } else {
    delete result.accessToken;
  }
  return result;
}
__name(applySettingDefaults, "applySettingDefaults");
function validateSupabaseUrl(supabaseUrl) {
  const trimmedUrl = supabaseUrl === null || supabaseUrl === void 0 ? void 0 : supabaseUrl.trim();
  if (!trimmedUrl) {
    throw new Error("supabaseUrl is required.");
  }
  if (!trimmedUrl.match(/^https?:\/\//i)) {
    throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
  }
  try {
    return new URL(ensureTrailingSlash(trimmedUrl));
  } catch (_a2) {
    throw Error("Invalid supabaseUrl: Provided URL is malformed.");
  }
}
__name(validateSupabaseUrl, "validateSupabaseUrl");

// node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/auth-js/dist/module/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/auth-js/dist/module/GoTrueAdminApi.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/auth-js/dist/module/lib/fetch.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/auth-js/dist/module/lib/constants.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/auth-js/dist/module/lib/version.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var version4 = "2.80.0";

// node_modules/@supabase/auth-js/dist/module/lib/constants.js
var AUTO_REFRESH_TICK_DURATION_MS = 30 * 1e3;
var AUTO_REFRESH_TICK_THRESHOLD = 3;
var EXPIRY_MARGIN_MS = AUTO_REFRESH_TICK_THRESHOLD * AUTO_REFRESH_TICK_DURATION_MS;
var GOTRUE_URL = "http://localhost:9999";
var STORAGE_KEY = "supabase.auth.token";
var DEFAULT_HEADERS4 = { "X-Client-Info": `gotrue-js/${version4}` };
var API_VERSION_HEADER_NAME = "X-Supabase-Api-Version";
var API_VERSIONS = {
  "2024-01-01": {
    timestamp: Date.parse("2024-01-01T00:00:00.0Z"),
    name: "2024-01-01"
  }
};
var BASE64URL_REGEX = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i;
var JWKS_TTL = 10 * 60 * 1e3;

// node_modules/@supabase/auth-js/dist/module/lib/helpers.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/auth-js/dist/module/lib/errors.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var AuthError = class extends Error {
  constructor(message, status, code) {
    super(message);
    this.__isAuthError = true;
    this.name = "AuthError";
    this.status = status;
    this.code = code;
  }
};
__name(AuthError, "AuthError");
function isAuthError(error) {
  return typeof error === "object" && error !== null && "__isAuthError" in error;
}
__name(isAuthError, "isAuthError");
var AuthApiError = class extends AuthError {
  constructor(message, status, code) {
    super(message, status, code);
    this.name = "AuthApiError";
    this.status = status;
    this.code = code;
  }
};
__name(AuthApiError, "AuthApiError");
function isAuthApiError(error) {
  return isAuthError(error) && error.name === "AuthApiError";
}
__name(isAuthApiError, "isAuthApiError");
var AuthUnknownError = class extends AuthError {
  constructor(message, originalError) {
    super(message);
    this.name = "AuthUnknownError";
    this.originalError = originalError;
  }
};
__name(AuthUnknownError, "AuthUnknownError");
var CustomAuthError = class extends AuthError {
  constructor(message, name, status, code) {
    super(message, status, code);
    this.name = name;
    this.status = status;
  }
};
__name(CustomAuthError, "CustomAuthError");
var AuthSessionMissingError = class extends CustomAuthError {
  constructor() {
    super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
  }
};
__name(AuthSessionMissingError, "AuthSessionMissingError");
function isAuthSessionMissingError(error) {
  return isAuthError(error) && error.name === "AuthSessionMissingError";
}
__name(isAuthSessionMissingError, "isAuthSessionMissingError");
var AuthInvalidTokenResponseError = class extends CustomAuthError {
  constructor() {
    super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0);
  }
};
__name(AuthInvalidTokenResponseError, "AuthInvalidTokenResponseError");
var AuthInvalidCredentialsError = class extends CustomAuthError {
  constructor(message) {
    super(message, "AuthInvalidCredentialsError", 400, void 0);
  }
};
__name(AuthInvalidCredentialsError, "AuthInvalidCredentialsError");
var AuthImplicitGrantRedirectError = class extends CustomAuthError {
  constructor(message, details = null) {
    super(message, "AuthImplicitGrantRedirectError", 500, void 0);
    this.details = null;
    this.details = details;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      details: this.details
    };
  }
};
__name(AuthImplicitGrantRedirectError, "AuthImplicitGrantRedirectError");
function isAuthImplicitGrantRedirectError(error) {
  return isAuthError(error) && error.name === "AuthImplicitGrantRedirectError";
}
__name(isAuthImplicitGrantRedirectError, "isAuthImplicitGrantRedirectError");
var AuthPKCEGrantCodeExchangeError = class extends CustomAuthError {
  constructor(message, details = null) {
    super(message, "AuthPKCEGrantCodeExchangeError", 500, void 0);
    this.details = null;
    this.details = details;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      details: this.details
    };
  }
};
__name(AuthPKCEGrantCodeExchangeError, "AuthPKCEGrantCodeExchangeError");
var AuthRetryableFetchError = class extends CustomAuthError {
  constructor(message, status) {
    super(message, "AuthRetryableFetchError", status, void 0);
  }
};
__name(AuthRetryableFetchError, "AuthRetryableFetchError");
function isAuthRetryableFetchError(error) {
  return isAuthError(error) && error.name === "AuthRetryableFetchError";
}
__name(isAuthRetryableFetchError, "isAuthRetryableFetchError");
var AuthWeakPasswordError = class extends CustomAuthError {
  constructor(message, status, reasons) {
    super(message, "AuthWeakPasswordError", status, "weak_password");
    this.reasons = reasons;
  }
};
__name(AuthWeakPasswordError, "AuthWeakPasswordError");
var AuthInvalidJwtError = class extends CustomAuthError {
  constructor(message) {
    super(message, "AuthInvalidJwtError", 400, "invalid_jwt");
  }
};
__name(AuthInvalidJwtError, "AuthInvalidJwtError");

// node_modules/@supabase/auth-js/dist/module/lib/base64url.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var TO_BASE64URL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split("");
var IGNORE_BASE64URL = " 	\n\r=".split("");
var FROM_BASE64URL = (() => {
  const charMap = new Array(128);
  for (let i = 0; i < charMap.length; i += 1) {
    charMap[i] = -1;
  }
  for (let i = 0; i < IGNORE_BASE64URL.length; i += 1) {
    charMap[IGNORE_BASE64URL[i].charCodeAt(0)] = -2;
  }
  for (let i = 0; i < TO_BASE64URL.length; i += 1) {
    charMap[TO_BASE64URL[i].charCodeAt(0)] = i;
  }
  return charMap;
})();
function byteToBase64URL(byte, state, emit) {
  if (byte !== null) {
    state.queue = state.queue << 8 | byte;
    state.queuedBits += 8;
    while (state.queuedBits >= 6) {
      const pos = state.queue >> state.queuedBits - 6 & 63;
      emit(TO_BASE64URL[pos]);
      state.queuedBits -= 6;
    }
  } else if (state.queuedBits > 0) {
    state.queue = state.queue << 6 - state.queuedBits;
    state.queuedBits = 6;
    while (state.queuedBits >= 6) {
      const pos = state.queue >> state.queuedBits - 6 & 63;
      emit(TO_BASE64URL[pos]);
      state.queuedBits -= 6;
    }
  }
}
__name(byteToBase64URL, "byteToBase64URL");
function byteFromBase64URL(charCode, state, emit) {
  const bits = FROM_BASE64URL[charCode];
  if (bits > -1) {
    state.queue = state.queue << 6 | bits;
    state.queuedBits += 6;
    while (state.queuedBits >= 8) {
      emit(state.queue >> state.queuedBits - 8 & 255);
      state.queuedBits -= 8;
    }
  } else if (bits === -2) {
    return;
  } else {
    throw new Error(`Invalid Base64-URL character "${String.fromCharCode(charCode)}"`);
  }
}
__name(byteFromBase64URL, "byteFromBase64URL");
function stringFromBase64URL(str) {
  const conv = [];
  const utf8Emit = /* @__PURE__ */ __name((codepoint) => {
    conv.push(String.fromCodePoint(codepoint));
  }, "utf8Emit");
  const utf8State = {
    utf8seq: 0,
    codepoint: 0
  };
  const b64State = { queue: 0, queuedBits: 0 };
  const byteEmit = /* @__PURE__ */ __name((byte) => {
    stringFromUTF8(byte, utf8State, utf8Emit);
  }, "byteEmit");
  for (let i = 0; i < str.length; i += 1) {
    byteFromBase64URL(str.charCodeAt(i), b64State, byteEmit);
  }
  return conv.join("");
}
__name(stringFromBase64URL, "stringFromBase64URL");
function codepointToUTF8(codepoint, emit) {
  if (codepoint <= 127) {
    emit(codepoint);
    return;
  } else if (codepoint <= 2047) {
    emit(192 | codepoint >> 6);
    emit(128 | codepoint & 63);
    return;
  } else if (codepoint <= 65535) {
    emit(224 | codepoint >> 12);
    emit(128 | codepoint >> 6 & 63);
    emit(128 | codepoint & 63);
    return;
  } else if (codepoint <= 1114111) {
    emit(240 | codepoint >> 18);
    emit(128 | codepoint >> 12 & 63);
    emit(128 | codepoint >> 6 & 63);
    emit(128 | codepoint & 63);
    return;
  }
  throw new Error(`Unrecognized Unicode codepoint: ${codepoint.toString(16)}`);
}
__name(codepointToUTF8, "codepointToUTF8");
function stringToUTF8(str, emit) {
  for (let i = 0; i < str.length; i += 1) {
    let codepoint = str.charCodeAt(i);
    if (codepoint > 55295 && codepoint <= 56319) {
      const highSurrogate = (codepoint - 55296) * 1024 & 65535;
      const lowSurrogate = str.charCodeAt(i + 1) - 56320 & 65535;
      codepoint = (lowSurrogate | highSurrogate) + 65536;
      i += 1;
    }
    codepointToUTF8(codepoint, emit);
  }
}
__name(stringToUTF8, "stringToUTF8");
function stringFromUTF8(byte, state, emit) {
  if (state.utf8seq === 0) {
    if (byte <= 127) {
      emit(byte);
      return;
    }
    for (let leadingBit = 1; leadingBit < 6; leadingBit += 1) {
      if ((byte >> 7 - leadingBit & 1) === 0) {
        state.utf8seq = leadingBit;
        break;
      }
    }
    if (state.utf8seq === 2) {
      state.codepoint = byte & 31;
    } else if (state.utf8seq === 3) {
      state.codepoint = byte & 15;
    } else if (state.utf8seq === 4) {
      state.codepoint = byte & 7;
    } else {
      throw new Error("Invalid UTF-8 sequence");
    }
    state.utf8seq -= 1;
  } else if (state.utf8seq > 0) {
    if (byte <= 127) {
      throw new Error("Invalid UTF-8 sequence");
    }
    state.codepoint = state.codepoint << 6 | byte & 63;
    state.utf8seq -= 1;
    if (state.utf8seq === 0) {
      emit(state.codepoint);
    }
  }
}
__name(stringFromUTF8, "stringFromUTF8");
function base64UrlToUint8Array(str) {
  const result = [];
  const state = { queue: 0, queuedBits: 0 };
  const onByte = /* @__PURE__ */ __name((byte) => {
    result.push(byte);
  }, "onByte");
  for (let i = 0; i < str.length; i += 1) {
    byteFromBase64URL(str.charCodeAt(i), state, onByte);
  }
  return new Uint8Array(result);
}
__name(base64UrlToUint8Array, "base64UrlToUint8Array");
function stringToUint8Array(str) {
  const result = [];
  stringToUTF8(str, (byte) => result.push(byte));
  return new Uint8Array(result);
}
__name(stringToUint8Array, "stringToUint8Array");
function bytesToBase64URL(bytes) {
  const result = [];
  const state = { queue: 0, queuedBits: 0 };
  const onChar = /* @__PURE__ */ __name((char) => {
    result.push(char);
  }, "onChar");
  bytes.forEach((byte) => byteToBase64URL(byte, state, onChar));
  byteToBase64URL(null, state, onChar);
  return result.join("");
}
__name(bytesToBase64URL, "bytesToBase64URL");

// node_modules/@supabase/auth-js/dist/module/lib/helpers.js
function expiresAt(expiresIn) {
  const timeNow = Math.round(Date.now() / 1e3);
  return timeNow + expiresIn;
}
__name(expiresAt, "expiresAt");
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
__name(uuid, "uuid");
var isBrowser = /* @__PURE__ */ __name(() => typeof window !== "undefined" && typeof document !== "undefined", "isBrowser");
var localStorageWriteTests = {
  tested: false,
  writable: false
};
var supportsLocalStorage = /* @__PURE__ */ __name(() => {
  if (!isBrowser()) {
    return false;
  }
  try {
    if (typeof globalThis.localStorage !== "object") {
      return false;
    }
  } catch (e) {
    return false;
  }
  if (localStorageWriteTests.tested) {
    return localStorageWriteTests.writable;
  }
  const randomKey = `lswt-${Math.random()}${Math.random()}`;
  try {
    globalThis.localStorage.setItem(randomKey, randomKey);
    globalThis.localStorage.removeItem(randomKey);
    localStorageWriteTests.tested = true;
    localStorageWriteTests.writable = true;
  } catch (e) {
    localStorageWriteTests.tested = true;
    localStorageWriteTests.writable = false;
  }
  return localStorageWriteTests.writable;
}, "supportsLocalStorage");
function parseParametersFromURL(href) {
  const result = {};
  const url = new URL(href);
  if (url.hash && url.hash[0] === "#") {
    try {
      const hashSearchParams = new URLSearchParams(url.hash.substring(1));
      hashSearchParams.forEach((value, key) => {
        result[key] = value;
      });
    } catch (e) {
    }
  }
  url.searchParams.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}
__name(parseParametersFromURL, "parseParametersFromURL");
var resolveFetch5 = /* @__PURE__ */ __name((customFetch) => {
  if (customFetch) {
    return (...args) => customFetch(...args);
  }
  return (...args) => fetch(...args);
}, "resolveFetch");
var looksLikeFetchResponse = /* @__PURE__ */ __name((maybeResponse) => {
  return typeof maybeResponse === "object" && maybeResponse !== null && "status" in maybeResponse && "ok" in maybeResponse && "json" in maybeResponse && typeof maybeResponse.json === "function";
}, "looksLikeFetchResponse");
var setItemAsync = /* @__PURE__ */ __name(async (storage, key, data) => {
  await storage.setItem(key, JSON.stringify(data));
}, "setItemAsync");
var getItemAsync = /* @__PURE__ */ __name(async (storage, key) => {
  const value = await storage.getItem(key);
  if (!value) {
    return null;
  }
  try {
    return JSON.parse(value);
  } catch (_a2) {
    return value;
  }
}, "getItemAsync");
var removeItemAsync = /* @__PURE__ */ __name(async (storage, key) => {
  await storage.removeItem(key);
}, "removeItemAsync");
var Deferred = class {
  constructor() {
    ;
    this.promise = new Deferred.promiseConstructor((res, rej) => {
      ;
      this.resolve = res;
      this.reject = rej;
    });
  }
};
__name(Deferred, "Deferred");
Deferred.promiseConstructor = Promise;
function decodeJWT(token) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new AuthInvalidJwtError("Invalid JWT structure");
  }
  for (let i = 0; i < parts.length; i++) {
    if (!BASE64URL_REGEX.test(parts[i])) {
      throw new AuthInvalidJwtError("JWT not in base64url format");
    }
  }
  const data = {
    // using base64url lib
    header: JSON.parse(stringFromBase64URL(parts[0])),
    payload: JSON.parse(stringFromBase64URL(parts[1])),
    signature: base64UrlToUint8Array(parts[2]),
    raw: {
      header: parts[0],
      payload: parts[1]
    }
  };
  return data;
}
__name(decodeJWT, "decodeJWT");
async function sleep(time) {
  return await new Promise((accept) => {
    setTimeout(() => accept(null), time);
  });
}
__name(sleep, "sleep");
function retryable(fn, isRetryable) {
  const promise = new Promise((accept, reject) => {
    ;
    (async () => {
      for (let attempt = 0; attempt < Infinity; attempt++) {
        try {
          const result = await fn(attempt);
          if (!isRetryable(attempt, null, result)) {
            accept(result);
            return;
          }
        } catch (e) {
          if (!isRetryable(attempt, e)) {
            reject(e);
            return;
          }
        }
      }
    })();
  });
  return promise;
}
__name(retryable, "retryable");
function dec2hex(dec) {
  return ("0" + dec.toString(16)).substr(-2);
}
__name(dec2hex, "dec2hex");
function generatePKCEVerifier() {
  const verifierLength = 56;
  const array = new Uint32Array(verifierLength);
  if (typeof crypto === "undefined") {
    const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    const charSetLen = charSet.length;
    let verifier = "";
    for (let i = 0; i < verifierLength; i++) {
      verifier += charSet.charAt(Math.floor(Math.random() * charSetLen));
    }
    return verifier;
  }
  crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
}
__name(generatePKCEVerifier, "generatePKCEVerifier");
async function sha256(randomString) {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(randomString);
  const hash = await crypto.subtle.digest("SHA-256", encodedData);
  const bytes = new Uint8Array(hash);
  return Array.from(bytes).map((c) => String.fromCharCode(c)).join("");
}
__name(sha256, "sha256");
async function generatePKCEChallenge(verifier) {
  const hasCryptoSupport = typeof crypto !== "undefined" && typeof crypto.subtle !== "undefined" && typeof TextEncoder !== "undefined";
  if (!hasCryptoSupport) {
    console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.");
    return verifier;
  }
  const hashed = await sha256(verifier);
  return btoa(hashed).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
__name(generatePKCEChallenge, "generatePKCEChallenge");
async function getCodeChallengeAndMethod(storage, storageKey, isPasswordRecovery = false) {
  const codeVerifier = generatePKCEVerifier();
  let storedCodeVerifier = codeVerifier;
  if (isPasswordRecovery) {
    storedCodeVerifier += "/PASSWORD_RECOVERY";
  }
  await setItemAsync(storage, `${storageKey}-code-verifier`, storedCodeVerifier);
  const codeChallenge = await generatePKCEChallenge(codeVerifier);
  const codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
  return [codeChallenge, codeChallengeMethod];
}
__name(getCodeChallengeAndMethod, "getCodeChallengeAndMethod");
var API_VERSION_REGEX = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
function parseResponseAPIVersion(response) {
  const apiVersion = response.headers.get(API_VERSION_HEADER_NAME);
  if (!apiVersion) {
    return null;
  }
  if (!apiVersion.match(API_VERSION_REGEX)) {
    return null;
  }
  try {
    const date = /* @__PURE__ */ new Date(`${apiVersion}T00:00:00.0Z`);
    return date;
  } catch (e) {
    return null;
  }
}
__name(parseResponseAPIVersion, "parseResponseAPIVersion");
function validateExp(exp) {
  if (!exp) {
    throw new Error("Missing exp claim");
  }
  const timeNow = Math.floor(Date.now() / 1e3);
  if (exp <= timeNow) {
    throw new Error("JWT has expired");
  }
}
__name(validateExp, "validateExp");
function getAlgorithm(alg) {
  switch (alg) {
    case "RS256":
      return {
        name: "RSASSA-PKCS1-v1_5",
        hash: { name: "SHA-256" }
      };
    case "ES256":
      return {
        name: "ECDSA",
        namedCurve: "P-256",
        hash: { name: "SHA-256" }
      };
    default:
      throw new Error("Invalid alg claim");
  }
}
__name(getAlgorithm, "getAlgorithm");
var UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
function validateUUID(str) {
  if (!UUID_REGEX.test(str)) {
    throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not");
  }
}
__name(validateUUID, "validateUUID");
function userNotAvailableProxy() {
  const proxyTarget = {};
  return new Proxy(proxyTarget, {
    get: (target, prop) => {
      if (prop === "__isUserNotAvailableProxy") {
        return true;
      }
      if (typeof prop === "symbol") {
        const sProp = prop.toString();
        if (sProp === "Symbol(Symbol.toPrimitive)" || sProp === "Symbol(Symbol.toStringTag)" || sProp === "Symbol(util.inspect.custom)") {
          return void 0;
        }
      }
      throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${prop}" property of the session object is not supported. Please use getUser() instead.`);
    },
    set: (_target, prop) => {
      throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${prop}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
    },
    deleteProperty: (_target, prop) => {
      throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${prop}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
    }
  });
}
__name(userNotAvailableProxy, "userNotAvailableProxy");
function insecureUserWarningProxy(user, suppressWarningRef) {
  return new Proxy(user, {
    get: (target, prop, receiver) => {
      if (prop === "__isInsecureUserWarningProxy") {
        return true;
      }
      if (typeof prop === "symbol") {
        const sProp = prop.toString();
        if (sProp === "Symbol(Symbol.toPrimitive)" || sProp === "Symbol(Symbol.toStringTag)" || sProp === "Symbol(util.inspect.custom)" || sProp === "Symbol(nodejs.util.inspect.custom)") {
          return Reflect.get(target, prop, receiver);
        }
      }
      if (!suppressWarningRef.value && typeof prop === "string") {
        console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.");
        suppressWarningRef.value = true;
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
__name(insecureUserWarningProxy, "insecureUserWarningProxy");
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
__name(deepClone, "deepClone");

// node_modules/@supabase/auth-js/dist/module/lib/fetch.js
var _getErrorMessage3 = /* @__PURE__ */ __name((err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err), "_getErrorMessage");
var NETWORK_ERROR_CODES = [502, 503, 504];
async function handleError3(error) {
  var _a2;
  if (!looksLikeFetchResponse(error)) {
    throw new AuthRetryableFetchError(_getErrorMessage3(error), 0);
  }
  if (NETWORK_ERROR_CODES.includes(error.status)) {
    throw new AuthRetryableFetchError(_getErrorMessage3(error), error.status);
  }
  let data;
  try {
    data = await error.json();
  } catch (e) {
    throw new AuthUnknownError(_getErrorMessage3(e), e);
  }
  let errorCode = void 0;
  const responseAPIVersion = parseResponseAPIVersion(error);
  if (responseAPIVersion && responseAPIVersion.getTime() >= API_VERSIONS["2024-01-01"].timestamp && typeof data === "object" && data && typeof data.code === "string") {
    errorCode = data.code;
  } else if (typeof data === "object" && data && typeof data.error_code === "string") {
    errorCode = data.error_code;
  }
  if (!errorCode) {
    if (typeof data === "object" && data && typeof data.weak_password === "object" && data.weak_password && Array.isArray(data.weak_password.reasons) && data.weak_password.reasons.length && data.weak_password.reasons.reduce((a, i) => a && typeof i === "string", true)) {
      throw new AuthWeakPasswordError(_getErrorMessage3(data), error.status, data.weak_password.reasons);
    }
  } else if (errorCode === "weak_password") {
    throw new AuthWeakPasswordError(_getErrorMessage3(data), error.status, ((_a2 = data.weak_password) === null || _a2 === void 0 ? void 0 : _a2.reasons) || []);
  } else if (errorCode === "session_not_found") {
    throw new AuthSessionMissingError();
  }
  throw new AuthApiError(_getErrorMessage3(data), error.status || 500, errorCode);
}
__name(handleError3, "handleError");
var _getRequestParams3 = /* @__PURE__ */ __name((method, options, parameters, body) => {
  const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
  if (method === "GET") {
    return params;
  }
  params.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, options === null || options === void 0 ? void 0 : options.headers);
  params.body = JSON.stringify(body);
  return Object.assign(Object.assign({}, params), parameters);
}, "_getRequestParams");
async function _request(fetcher, method, url, options) {
  var _a2;
  const headers = Object.assign({}, options === null || options === void 0 ? void 0 : options.headers);
  if (!headers[API_VERSION_HEADER_NAME]) {
    headers[API_VERSION_HEADER_NAME] = API_VERSIONS["2024-01-01"].name;
  }
  if (options === null || options === void 0 ? void 0 : options.jwt) {
    headers["Authorization"] = `Bearer ${options.jwt}`;
  }
  const qs = (_a2 = options === null || options === void 0 ? void 0 : options.query) !== null && _a2 !== void 0 ? _a2 : {};
  if (options === null || options === void 0 ? void 0 : options.redirectTo) {
    qs["redirect_to"] = options.redirectTo;
  }
  const queryString = Object.keys(qs).length ? "?" + new URLSearchParams(qs).toString() : "";
  const data = await _handleRequest3(fetcher, method, url + queryString, {
    headers,
    noResolveJson: options === null || options === void 0 ? void 0 : options.noResolveJson
  }, {}, options === null || options === void 0 ? void 0 : options.body);
  return (options === null || options === void 0 ? void 0 : options.xform) ? options === null || options === void 0 ? void 0 : options.xform(data) : { data: Object.assign({}, data), error: null };
}
__name(_request, "_request");
async function _handleRequest3(fetcher, method, url, options, parameters, body) {
  const requestParams = _getRequestParams3(method, options, parameters, body);
  let result;
  try {
    result = await fetcher(url, Object.assign({}, requestParams));
  } catch (e) {
    console.error(e);
    throw new AuthRetryableFetchError(_getErrorMessage3(e), 0);
  }
  if (!result.ok) {
    await handleError3(result);
  }
  if (options === null || options === void 0 ? void 0 : options.noResolveJson) {
    return result;
  }
  try {
    return await result.json();
  } catch (e) {
    await handleError3(e);
  }
}
__name(_handleRequest3, "_handleRequest");
function _sessionResponse(data) {
  var _a2;
  let session = null;
  if (hasSession(data)) {
    session = Object.assign({}, data);
    if (!data.expires_at) {
      session.expires_at = expiresAt(data.expires_in);
    }
  }
  const user = (_a2 = data.user) !== null && _a2 !== void 0 ? _a2 : data;
  return { data: { session, user }, error: null };
}
__name(_sessionResponse, "_sessionResponse");
function _sessionResponsePassword(data) {
  const response = _sessionResponse(data);
  if (!response.error && data.weak_password && typeof data.weak_password === "object" && Array.isArray(data.weak_password.reasons) && data.weak_password.reasons.length && data.weak_password.message && typeof data.weak_password.message === "string" && data.weak_password.reasons.reduce((a, i) => a && typeof i === "string", true)) {
    response.data.weak_password = data.weak_password;
  }
  return response;
}
__name(_sessionResponsePassword, "_sessionResponsePassword");
function _userResponse(data) {
  var _a2;
  const user = (_a2 = data.user) !== null && _a2 !== void 0 ? _a2 : data;
  return { data: { user }, error: null };
}
__name(_userResponse, "_userResponse");
function _ssoResponse(data) {
  return { data, error: null };
}
__name(_ssoResponse, "_ssoResponse");
function _generateLinkResponse(data) {
  const { action_link, email_otp, hashed_token, redirect_to, verification_type } = data, rest = __rest(data, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]);
  const properties = {
    action_link,
    email_otp,
    hashed_token,
    redirect_to,
    verification_type
  };
  const user = Object.assign({}, rest);
  return {
    data: {
      properties,
      user
    },
    error: null
  };
}
__name(_generateLinkResponse, "_generateLinkResponse");
function _noResolveJsonResponse(data) {
  return data;
}
__name(_noResolveJsonResponse, "_noResolveJsonResponse");
function hasSession(data) {
  return data.access_token && data.refresh_token && data.expires_in;
}
__name(hasSession, "hasSession");

// node_modules/@supabase/auth-js/dist/module/lib/types.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var SIGN_OUT_SCOPES = ["global", "local", "others"];

// node_modules/@supabase/auth-js/dist/module/GoTrueAdminApi.js
var GoTrueAdminApi = class {
  constructor({ url = "", headers = {}, fetch: fetch2 }) {
    this.url = url;
    this.headers = headers;
    this.fetch = resolveFetch5(fetch2);
    this.mfa = {
      listFactors: this._listFactors.bind(this),
      deleteFactor: this._deleteFactor.bind(this)
    };
    this.oauth = {
      listClients: this._listOAuthClients.bind(this),
      createClient: this._createOAuthClient.bind(this),
      getClient: this._getOAuthClient.bind(this),
      updateClient: this._updateOAuthClient.bind(this),
      deleteClient: this._deleteOAuthClient.bind(this),
      regenerateClientSecret: this._regenerateOAuthClientSecret.bind(this)
    };
  }
  /**
   * Removes a logged-in session.
   * @param jwt A valid, logged-in JWT.
   * @param scope The logout sope.
   */
  async signOut(jwt, scope = SIGN_OUT_SCOPES[0]) {
    if (SIGN_OUT_SCOPES.indexOf(scope) < 0) {
      throw new Error(`@supabase/auth-js: Parameter scope must be one of ${SIGN_OUT_SCOPES.join(", ")}`);
    }
    try {
      await _request(this.fetch, "POST", `${this.url}/logout?scope=${scope}`, {
        headers: this.headers,
        jwt,
        noResolveJson: true
      });
      return { data: null, error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  /**
   * Sends an invite link to an email address.
   * @param email The email address of the user.
   * @param options Additional options to be included when inviting.
   */
  async inviteUserByEmail(email, options = {}) {
    try {
      return await _request(this.fetch, "POST", `${this.url}/invite`, {
        body: { email, data: options.data },
        headers: this.headers,
        redirectTo: options.redirectTo,
        xform: _userResponse
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null }, error };
      }
      throw error;
    }
  }
  /**
   * Generates email links and OTPs to be sent via a custom email provider.
   * @param email The user's email.
   * @param options.password User password. For signup only.
   * @param options.data Optional user metadata. For signup only.
   * @param options.redirectTo The redirect url which should be appended to the generated link
   */
  async generateLink(params) {
    try {
      const { options } = params, rest = __rest(params, ["options"]);
      const body = Object.assign(Object.assign({}, rest), options);
      if ("newEmail" in rest) {
        body.new_email = rest === null || rest === void 0 ? void 0 : rest.newEmail;
        delete body["newEmail"];
      }
      return await _request(this.fetch, "POST", `${this.url}/admin/generate_link`, {
        body,
        headers: this.headers,
        xform: _generateLinkResponse,
        redirectTo: options === null || options === void 0 ? void 0 : options.redirectTo
      });
    } catch (error) {
      if (isAuthError(error)) {
        return {
          data: {
            properties: null,
            user: null
          },
          error
        };
      }
      throw error;
    }
  }
  // User Admin API
  /**
   * Creates a new user.
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async createUser(attributes) {
    try {
      return await _request(this.fetch, "POST", `${this.url}/admin/users`, {
        body: attributes,
        headers: this.headers,
        xform: _userResponse
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null }, error };
      }
      throw error;
    }
  }
  /**
   * Get a list of users.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   * @param params An object which supports `page` and `perPage` as numbers, to alter the paginated results.
   */
  async listUsers(params) {
    var _a2, _b, _c, _d, _e, _f, _g;
    try {
      const pagination = { nextPage: null, lastPage: 0, total: 0 };
      const response = await _request(this.fetch, "GET", `${this.url}/admin/users`, {
        headers: this.headers,
        noResolveJson: true,
        query: {
          page: (_b = (_a2 = params === null || params === void 0 ? void 0 : params.page) === null || _a2 === void 0 ? void 0 : _a2.toString()) !== null && _b !== void 0 ? _b : "",
          per_page: (_d = (_c = params === null || params === void 0 ? void 0 : params.perPage) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""
        },
        xform: _noResolveJsonResponse
      });
      if (response.error)
        throw response.error;
      const users = await response.json();
      const total = (_e = response.headers.get("x-total-count")) !== null && _e !== void 0 ? _e : 0;
      const links = (_g = (_f = response.headers.get("link")) === null || _f === void 0 ? void 0 : _f.split(",")) !== null && _g !== void 0 ? _g : [];
      if (links.length > 0) {
        links.forEach((link) => {
          const page = parseInt(link.split(";")[0].split("=")[1].substring(0, 1));
          const rel = JSON.parse(link.split(";")[1].split("=")[1]);
          pagination[`${rel}Page`] = page;
        });
        pagination.total = parseInt(total);
      }
      return { data: Object.assign(Object.assign({}, users), pagination), error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { users: [] }, error };
      }
      throw error;
    }
  }
  /**
   * Get user by id.
   *
   * @param uid The user's unique identifier
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async getUserById(uid) {
    validateUUID(uid);
    try {
      return await _request(this.fetch, "GET", `${this.url}/admin/users/${uid}`, {
        headers: this.headers,
        xform: _userResponse
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null }, error };
      }
      throw error;
    }
  }
  /**
   * Updates the user data.
   *
   * @param attributes The data you want to update.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async updateUserById(uid, attributes) {
    validateUUID(uid);
    try {
      return await _request(this.fetch, "PUT", `${this.url}/admin/users/${uid}`, {
        body: attributes,
        headers: this.headers,
        xform: _userResponse
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null }, error };
      }
      throw error;
    }
  }
  /**
   * Delete a user. Requires a `service_role` key.
   *
   * @param id The user id you want to remove.
   * @param shouldSoftDelete If true, then the user will be soft-deleted from the auth schema. Soft deletion allows user identification from the hashed user ID but is not reversible.
   * Defaults to false for backward compatibility.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async deleteUser(id, shouldSoftDelete = false) {
    validateUUID(id);
    try {
      return await _request(this.fetch, "DELETE", `${this.url}/admin/users/${id}`, {
        headers: this.headers,
        body: {
          should_soft_delete: shouldSoftDelete
        },
        xform: _userResponse
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null }, error };
      }
      throw error;
    }
  }
  async _listFactors(params) {
    validateUUID(params.userId);
    try {
      const { data, error } = await _request(this.fetch, "GET", `${this.url}/admin/users/${params.userId}/factors`, {
        headers: this.headers,
        xform: (factors) => {
          return { data: { factors }, error: null };
        }
      });
      return { data, error };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  async _deleteFactor(params) {
    validateUUID(params.userId);
    validateUUID(params.id);
    try {
      const data = await _request(this.fetch, "DELETE", `${this.url}/admin/users/${params.userId}/factors/${params.id}`, {
        headers: this.headers
      });
      return { data, error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  /**
   * Lists all OAuth clients with optional pagination.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async _listOAuthClients(params) {
    var _a2, _b, _c, _d, _e, _f, _g;
    try {
      const pagination = { nextPage: null, lastPage: 0, total: 0 };
      const response = await _request(this.fetch, "GET", `${this.url}/admin/oauth/clients`, {
        headers: this.headers,
        noResolveJson: true,
        query: {
          page: (_b = (_a2 = params === null || params === void 0 ? void 0 : params.page) === null || _a2 === void 0 ? void 0 : _a2.toString()) !== null && _b !== void 0 ? _b : "",
          per_page: (_d = (_c = params === null || params === void 0 ? void 0 : params.perPage) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""
        },
        xform: _noResolveJsonResponse
      });
      if (response.error)
        throw response.error;
      const clients = await response.json();
      const total = (_e = response.headers.get("x-total-count")) !== null && _e !== void 0 ? _e : 0;
      const links = (_g = (_f = response.headers.get("link")) === null || _f === void 0 ? void 0 : _f.split(",")) !== null && _g !== void 0 ? _g : [];
      if (links.length > 0) {
        links.forEach((link) => {
          const page = parseInt(link.split(";")[0].split("=")[1].substring(0, 1));
          const rel = JSON.parse(link.split(";")[1].split("=")[1]);
          pagination[`${rel}Page`] = page;
        });
        pagination.total = parseInt(total);
      }
      return { data: Object.assign(Object.assign({}, clients), pagination), error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { clients: [] }, error };
      }
      throw error;
    }
  }
  /**
   * Creates a new OAuth client.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async _createOAuthClient(params) {
    try {
      return await _request(this.fetch, "POST", `${this.url}/admin/oauth/clients`, {
        body: params,
        headers: this.headers,
        xform: (client) => {
          return { data: client, error: null };
        }
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  /**
   * Gets details of a specific OAuth client.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async _getOAuthClient(clientId) {
    try {
      return await _request(this.fetch, "GET", `${this.url}/admin/oauth/clients/${clientId}`, {
        headers: this.headers,
        xform: (client) => {
          return { data: client, error: null };
        }
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  /**
   * Updates an existing OAuth client.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async _updateOAuthClient(clientId, params) {
    try {
      return await _request(this.fetch, "PUT", `${this.url}/admin/oauth/clients/${clientId}`, {
        body: params,
        headers: this.headers,
        xform: (client) => {
          return { data: client, error: null };
        }
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  /**
   * Deletes an OAuth client.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async _deleteOAuthClient(clientId) {
    try {
      await _request(this.fetch, "DELETE", `${this.url}/admin/oauth/clients/${clientId}`, {
        headers: this.headers,
        noResolveJson: true
      });
      return { data: null, error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  /**
   * Regenerates the secret for an OAuth client.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async _regenerateOAuthClientSecret(clientId) {
    try {
      return await _request(this.fetch, "POST", `${this.url}/admin/oauth/clients/${clientId}/regenerate_secret`, {
        headers: this.headers,
        xform: (client) => {
          return { data: client, error: null };
        }
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
};
__name(GoTrueAdminApi, "GoTrueAdminApi");

// node_modules/@supabase/auth-js/dist/module/GoTrueClient.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/auth-js/dist/module/lib/local-storage.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
function memoryLocalStorageAdapter(store = {}) {
  return {
    getItem: (key) => {
      return store[key] || null;
    },
    setItem: (key, value) => {
      store[key] = value;
    },
    removeItem: (key) => {
      delete store[key];
    }
  };
}
__name(memoryLocalStorageAdapter, "memoryLocalStorageAdapter");

// node_modules/@supabase/auth-js/dist/module/lib/locks.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var internals = {
  /**
   * @experimental
   */
  debug: !!(globalThis && supportsLocalStorage() && globalThis.localStorage && globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true")
};
var LockAcquireTimeoutError = class extends Error {
  constructor(message) {
    super(message);
    this.isAcquireTimeout = true;
  }
};
__name(LockAcquireTimeoutError, "LockAcquireTimeoutError");
var NavigatorLockAcquireTimeoutError = class extends LockAcquireTimeoutError {
};
__name(NavigatorLockAcquireTimeoutError, "NavigatorLockAcquireTimeoutError");
async function navigatorLock(name, acquireTimeout, fn) {
  if (internals.debug) {
    console.log("@supabase/gotrue-js: navigatorLock: acquire lock", name, acquireTimeout);
  }
  const abortController = new globalThis.AbortController();
  if (acquireTimeout > 0) {
    setTimeout(() => {
      abortController.abort();
      if (internals.debug) {
        console.log("@supabase/gotrue-js: navigatorLock acquire timed out", name);
      }
    }, acquireTimeout);
  }
  return await Promise.resolve().then(() => globalThis.navigator.locks.request(name, acquireTimeout === 0 ? {
    mode: "exclusive",
    ifAvailable: true
  } : {
    mode: "exclusive",
    signal: abortController.signal
  }, async (lock) => {
    if (lock) {
      if (internals.debug) {
        console.log("@supabase/gotrue-js: navigatorLock: acquired", name, lock.name);
      }
      try {
        return await fn();
      } finally {
        if (internals.debug) {
          console.log("@supabase/gotrue-js: navigatorLock: released", name, lock.name);
        }
      }
    } else {
      if (acquireTimeout === 0) {
        if (internals.debug) {
          console.log("@supabase/gotrue-js: navigatorLock: not immediately available", name);
        }
        throw new NavigatorLockAcquireTimeoutError(`Acquiring an exclusive Navigator LockManager lock "${name}" immediately failed`);
      } else {
        if (internals.debug) {
          try {
            const result = await globalThis.navigator.locks.query();
            console.log("@supabase/gotrue-js: Navigator LockManager state", JSON.stringify(result, null, "  "));
          } catch (e) {
            console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state", e);
          }
        }
        console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request");
        return await fn();
      }
    }
  }));
}
__name(navigatorLock, "navigatorLock");

// node_modules/@supabase/auth-js/dist/module/lib/polyfills.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
function polyfillGlobalThis() {
  if (typeof globalThis === "object")
    return;
  try {
    Object.defineProperty(Object.prototype, "__magic__", {
      get: function() {
        return this;
      },
      configurable: true
    });
    __magic__.globalThis = __magic__;
    delete Object.prototype.__magic__;
  } catch (e) {
    if (typeof self !== "undefined") {
      self.globalThis = self;
    }
  }
}
__name(polyfillGlobalThis, "polyfillGlobalThis");

// node_modules/@supabase/auth-js/dist/module/lib/web3/ethereum.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
function getAddress(address) {
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error(`@supabase/auth-js: Address "${address}" is invalid.`);
  }
  return address.toLowerCase();
}
__name(getAddress, "getAddress");
function fromHex(hex) {
  return parseInt(hex, 16);
}
__name(fromHex, "fromHex");
function toHex(value) {
  const bytes = new TextEncoder().encode(value);
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return "0x" + hex;
}
__name(toHex, "toHex");
function createSiweMessage(parameters) {
  var _a2;
  const { chainId, domain, expirationTime, issuedAt = /* @__PURE__ */ new Date(), nonce, notBefore, requestId, resources, scheme, uri, version: version5 } = parameters;
  {
    if (!Number.isInteger(chainId))
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${chainId}`);
    if (!domain)
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.`);
    if (nonce && nonce.length < 8)
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${nonce}`);
    if (!uri)
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.`);
    if (version5 !== "1")
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${version5}`);
    if ((_a2 = parameters.statement) === null || _a2 === void 0 ? void 0 : _a2.includes("\n"))
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${parameters.statement}`);
  }
  const address = getAddress(parameters.address);
  const origin = scheme ? `${scheme}://${domain}` : domain;
  const statement = parameters.statement ? `${parameters.statement}
` : "";
  const prefix = `${origin} wants you to sign in with your Ethereum account:
${address}

${statement}`;
  let suffix = `URI: ${uri}
Version: ${version5}
Chain ID: ${chainId}${nonce ? `
Nonce: ${nonce}` : ""}
Issued At: ${issuedAt.toISOString()}`;
  if (expirationTime)
    suffix += `
Expiration Time: ${expirationTime.toISOString()}`;
  if (notBefore)
    suffix += `
Not Before: ${notBefore.toISOString()}`;
  if (requestId)
    suffix += `
Request ID: ${requestId}`;
  if (resources) {
    let content = "\nResources:";
    for (const resource of resources) {
      if (!resource || typeof resource !== "string")
        throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${resource}`);
      content += `
- ${resource}`;
    }
    suffix += content;
  }
  return `${prefix}
${suffix}`;
}
__name(createSiweMessage, "createSiweMessage");

// node_modules/@supabase/auth-js/dist/module/lib/webauthn.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/auth-js/dist/module/lib/webauthn.errors.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var WebAuthnError = class extends Error {
  constructor({ message, code, cause, name }) {
    var _a2;
    super(message, { cause });
    this.__isWebAuthnError = true;
    this.name = (_a2 = name !== null && name !== void 0 ? name : cause instanceof Error ? cause.name : void 0) !== null && _a2 !== void 0 ? _a2 : "Unknown Error";
    this.code = code;
  }
};
__name(WebAuthnError, "WebAuthnError");
var WebAuthnUnknownError = class extends WebAuthnError {
  constructor(message, originalError) {
    super({
      code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
      cause: originalError,
      message
    });
    this.name = "WebAuthnUnknownError";
    this.originalError = originalError;
  }
};
__name(WebAuthnUnknownError, "WebAuthnUnknownError");
function identifyRegistrationError({ error, options }) {
  var _a2, _b, _c;
  const { publicKey } = options;
  if (!publicKey) {
    throw Error("options was missing required publicKey property");
  }
  if (error.name === "AbortError") {
    if (options.signal instanceof AbortSignal) {
      return new WebAuthnError({
        message: "Registration ceremony was sent an abort signal",
        code: "ERROR_CEREMONY_ABORTED",
        cause: error
      });
    }
  } else if (error.name === "ConstraintError") {
    if (((_a2 = publicKey.authenticatorSelection) === null || _a2 === void 0 ? void 0 : _a2.requireResidentKey) === true) {
      return new WebAuthnError({
        message: "Discoverable credentials were required but no available authenticator supported it",
        code: "ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",
        cause: error
      });
    } else if (
      // @ts-ignore: `mediation` doesn't yet exist on CredentialCreationOptions but it's possible as of Sept 2024
      options.mediation === "conditional" && ((_b = publicKey.authenticatorSelection) === null || _b === void 0 ? void 0 : _b.userVerification) === "required"
    ) {
      return new WebAuthnError({
        message: "User verification was required during automatic registration but it could not be performed",
        code: "ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",
        cause: error
      });
    } else if (((_c = publicKey.authenticatorSelection) === null || _c === void 0 ? void 0 : _c.userVerification) === "required") {
      return new WebAuthnError({
        message: "User verification was required but no available authenticator supported it",
        code: "ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",
        cause: error
      });
    }
  } else if (error.name === "InvalidStateError") {
    return new WebAuthnError({
      message: "The authenticator was previously registered",
      code: "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",
      cause: error
    });
  } else if (error.name === "NotAllowedError") {
    return new WebAuthnError({
      message: error.message,
      code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
      cause: error
    });
  } else if (error.name === "NotSupportedError") {
    const validPubKeyCredParams = publicKey.pubKeyCredParams.filter((param) => param.type === "public-key");
    if (validPubKeyCredParams.length === 0) {
      return new WebAuthnError({
        message: 'No entry in pubKeyCredParams was of type "public-key"',
        code: "ERROR_MALFORMED_PUBKEYCREDPARAMS",
        cause: error
      });
    }
    return new WebAuthnError({
      message: "No available authenticator supported any of the specified pubKeyCredParams algorithms",
      code: "ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",
      cause: error
    });
  } else if (error.name === "SecurityError") {
    const effectiveDomain = window.location.hostname;
    if (!isValidDomain(effectiveDomain)) {
      return new WebAuthnError({
        message: `${window.location.hostname} is an invalid domain`,
        code: "ERROR_INVALID_DOMAIN",
        cause: error
      });
    } else if (publicKey.rp.id !== effectiveDomain) {
      return new WebAuthnError({
        message: `The RP ID "${publicKey.rp.id}" is invalid for this domain`,
        code: "ERROR_INVALID_RP_ID",
        cause: error
      });
    }
  } else if (error.name === "TypeError") {
    if (publicKey.user.id.byteLength < 1 || publicKey.user.id.byteLength > 64) {
      return new WebAuthnError({
        message: "User ID was not between 1 and 64 characters",
        code: "ERROR_INVALID_USER_ID_LENGTH",
        cause: error
      });
    }
  } else if (error.name === "UnknownError") {
    return new WebAuthnError({
      message: "The authenticator was unable to process the specified options, or could not create a new credential",
      code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
      cause: error
    });
  }
  return new WebAuthnError({
    message: "a Non-Webauthn related error has occurred",
    code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
    cause: error
  });
}
__name(identifyRegistrationError, "identifyRegistrationError");
function identifyAuthenticationError({ error, options }) {
  const { publicKey } = options;
  if (!publicKey) {
    throw Error("options was missing required publicKey property");
  }
  if (error.name === "AbortError") {
    if (options.signal instanceof AbortSignal) {
      return new WebAuthnError({
        message: "Authentication ceremony was sent an abort signal",
        code: "ERROR_CEREMONY_ABORTED",
        cause: error
      });
    }
  } else if (error.name === "NotAllowedError") {
    return new WebAuthnError({
      message: error.message,
      code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
      cause: error
    });
  } else if (error.name === "SecurityError") {
    const effectiveDomain = window.location.hostname;
    if (!isValidDomain(effectiveDomain)) {
      return new WebAuthnError({
        message: `${window.location.hostname} is an invalid domain`,
        code: "ERROR_INVALID_DOMAIN",
        cause: error
      });
    } else if (publicKey.rpId !== effectiveDomain) {
      return new WebAuthnError({
        message: `The RP ID "${publicKey.rpId}" is invalid for this domain`,
        code: "ERROR_INVALID_RP_ID",
        cause: error
      });
    }
  } else if (error.name === "UnknownError") {
    return new WebAuthnError({
      message: "The authenticator was unable to process the specified options, or could not create a new assertion signature",
      code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
      cause: error
    });
  }
  return new WebAuthnError({
    message: "a Non-Webauthn related error has occurred",
    code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
    cause: error
  });
}
__name(identifyAuthenticationError, "identifyAuthenticationError");

// node_modules/@supabase/auth-js/dist/module/lib/webauthn.js
var WebAuthnAbortService = class {
  /**
   * Create an abort signal for a new WebAuthn operation.
   * Automatically cancels any existing operation.
   *
   * @returns {AbortSignal} Signal to pass to navigator.credentials.create() or .get()
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal MDN - AbortSignal}
   */
  createNewAbortSignal() {
    if (this.controller) {
      const abortError = new Error("Cancelling existing WebAuthn API call for new one");
      abortError.name = "AbortError";
      this.controller.abort(abortError);
    }
    const newController = new AbortController();
    this.controller = newController;
    return newController.signal;
  }
  /**
   * Manually cancel the current WebAuthn operation.
   * Useful for cleaning up when user cancels or navigates away.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort MDN - AbortController.abort}
   */
  cancelCeremony() {
    if (this.controller) {
      const abortError = new Error("Manually cancelling existing WebAuthn API call");
      abortError.name = "AbortError";
      this.controller.abort(abortError);
      this.controller = void 0;
    }
  }
};
__name(WebAuthnAbortService, "WebAuthnAbortService");
var webAuthnAbortService = new WebAuthnAbortService();
function deserializeCredentialCreationOptions(options) {
  if (!options) {
    throw new Error("Credential creation options are required");
  }
  if (typeof PublicKeyCredential !== "undefined" && "parseCreationOptionsFromJSON" in PublicKeyCredential && typeof PublicKeyCredential.parseCreationOptionsFromJSON === "function") {
    return PublicKeyCredential.parseCreationOptionsFromJSON(
      /** we assert the options here as typescript still doesn't know about future webauthn types */
      options
    );
  }
  const { challenge: challengeStr, user: userOpts, excludeCredentials } = options, restOptions = __rest(
    options,
    ["challenge", "user", "excludeCredentials"]
  );
  const challenge = base64UrlToUint8Array(challengeStr).buffer;
  const user = Object.assign(Object.assign({}, userOpts), { id: base64UrlToUint8Array(userOpts.id).buffer });
  const result = Object.assign(Object.assign({}, restOptions), {
    challenge,
    user
  });
  if (excludeCredentials && excludeCredentials.length > 0) {
    result.excludeCredentials = new Array(excludeCredentials.length);
    for (let i = 0; i < excludeCredentials.length; i++) {
      const cred = excludeCredentials[i];
      result.excludeCredentials[i] = Object.assign(Object.assign({}, cred), {
        id: base64UrlToUint8Array(cred.id).buffer,
        type: cred.type || "public-key",
        // Cast transports to handle future transport types like "cable"
        transports: cred.transports
      });
    }
  }
  return result;
}
__name(deserializeCredentialCreationOptions, "deserializeCredentialCreationOptions");
function deserializeCredentialRequestOptions(options) {
  if (!options) {
    throw new Error("Credential request options are required");
  }
  if (typeof PublicKeyCredential !== "undefined" && "parseRequestOptionsFromJSON" in PublicKeyCredential && typeof PublicKeyCredential.parseRequestOptionsFromJSON === "function") {
    return PublicKeyCredential.parseRequestOptionsFromJSON(options);
  }
  const { challenge: challengeStr, allowCredentials } = options, restOptions = __rest(
    options,
    ["challenge", "allowCredentials"]
  );
  const challenge = base64UrlToUint8Array(challengeStr).buffer;
  const result = Object.assign(Object.assign({}, restOptions), { challenge });
  if (allowCredentials && allowCredentials.length > 0) {
    result.allowCredentials = new Array(allowCredentials.length);
    for (let i = 0; i < allowCredentials.length; i++) {
      const cred = allowCredentials[i];
      result.allowCredentials[i] = Object.assign(Object.assign({}, cred), {
        id: base64UrlToUint8Array(cred.id).buffer,
        type: cred.type || "public-key",
        // Cast transports to handle future transport types like "cable"
        transports: cred.transports
      });
    }
  }
  return result;
}
__name(deserializeCredentialRequestOptions, "deserializeCredentialRequestOptions");
function serializeCredentialCreationResponse(credential) {
  var _a2;
  if ("toJSON" in credential && typeof credential.toJSON === "function") {
    return credential.toJSON();
  }
  const credentialWithAttachment = credential;
  return {
    id: credential.id,
    rawId: credential.id,
    response: {
      attestationObject: bytesToBase64URL(new Uint8Array(credential.response.attestationObject)),
      clientDataJSON: bytesToBase64URL(new Uint8Array(credential.response.clientDataJSON))
    },
    type: "public-key",
    clientExtensionResults: credential.getClientExtensionResults(),
    // Convert null to undefined and cast to AuthenticatorAttachment type
    authenticatorAttachment: (_a2 = credentialWithAttachment.authenticatorAttachment) !== null && _a2 !== void 0 ? _a2 : void 0
  };
}
__name(serializeCredentialCreationResponse, "serializeCredentialCreationResponse");
function serializeCredentialRequestResponse(credential) {
  var _a2;
  if ("toJSON" in credential && typeof credential.toJSON === "function") {
    return credential.toJSON();
  }
  const credentialWithAttachment = credential;
  const clientExtensionResults = credential.getClientExtensionResults();
  const assertionResponse = credential.response;
  return {
    id: credential.id,
    rawId: credential.id,
    // W3C spec expects rawId to match id for JSON format
    response: {
      authenticatorData: bytesToBase64URL(new Uint8Array(assertionResponse.authenticatorData)),
      clientDataJSON: bytesToBase64URL(new Uint8Array(assertionResponse.clientDataJSON)),
      signature: bytesToBase64URL(new Uint8Array(assertionResponse.signature)),
      userHandle: assertionResponse.userHandle ? bytesToBase64URL(new Uint8Array(assertionResponse.userHandle)) : void 0
    },
    type: "public-key",
    clientExtensionResults,
    // Convert null to undefined and cast to AuthenticatorAttachment type
    authenticatorAttachment: (_a2 = credentialWithAttachment.authenticatorAttachment) !== null && _a2 !== void 0 ? _a2 : void 0
  };
}
__name(serializeCredentialRequestResponse, "serializeCredentialRequestResponse");
function isValidDomain(hostname) {
  return (
    // Consider localhost valid as well since it's okay wrt Secure Contexts
    hostname === "localhost" || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(hostname)
  );
}
__name(isValidDomain, "isValidDomain");
function browserSupportsWebAuthn() {
  var _a2, _b;
  return !!(isBrowser() && "PublicKeyCredential" in window && window.PublicKeyCredential && "credentials" in navigator && typeof ((_a2 = navigator === null || navigator === void 0 ? void 0 : navigator.credentials) === null || _a2 === void 0 ? void 0 : _a2.create) === "function" && typeof ((_b = navigator === null || navigator === void 0 ? void 0 : navigator.credentials) === null || _b === void 0 ? void 0 : _b.get) === "function");
}
__name(browserSupportsWebAuthn, "browserSupportsWebAuthn");
async function createCredential(options) {
  try {
    const response = await navigator.credentials.create(
      /** we assert the type here until typescript types are updated */
      options
    );
    if (!response) {
      return {
        data: null,
        error: new WebAuthnUnknownError("Empty credential response", response)
      };
    }
    if (!(response instanceof PublicKeyCredential)) {
      return {
        data: null,
        error: new WebAuthnUnknownError("Browser returned unexpected credential type", response)
      };
    }
    return { data: response, error: null };
  } catch (err) {
    return {
      data: null,
      error: identifyRegistrationError({
        error: err,
        options
      })
    };
  }
}
__name(createCredential, "createCredential");
async function getCredential(options) {
  try {
    const response = await navigator.credentials.get(
      /** we assert the type here until typescript types are updated */
      options
    );
    if (!response) {
      return {
        data: null,
        error: new WebAuthnUnknownError("Empty credential response", response)
      };
    }
    if (!(response instanceof PublicKeyCredential)) {
      return {
        data: null,
        error: new WebAuthnUnknownError("Browser returned unexpected credential type", response)
      };
    }
    return { data: response, error: null };
  } catch (err) {
    return {
      data: null,
      error: identifyAuthenticationError({
        error: err,
        options
      })
    };
  }
}
__name(getCredential, "getCredential");
var DEFAULT_CREATION_OPTIONS = {
  hints: ["security-key"],
  authenticatorSelection: {
    authenticatorAttachment: "cross-platform",
    requireResidentKey: false,
    /** set to preferred because older yubikeys don't have PIN/Biometric */
    userVerification: "preferred",
    residentKey: "discouraged"
  },
  attestation: "none"
};
var DEFAULT_REQUEST_OPTIONS = {
  /** set to preferred because older yubikeys don't have PIN/Biometric */
  userVerification: "preferred",
  hints: ["security-key"]
};
function deepMerge(...sources) {
  const isObject = /* @__PURE__ */ __name((val) => val !== null && typeof val === "object" && !Array.isArray(val), "isObject");
  const isArrayBufferLike = /* @__PURE__ */ __name((val) => val instanceof ArrayBuffer || ArrayBuffer.isView(val), "isArrayBufferLike");
  const result = {};
  for (const source of sources) {
    if (!source)
      continue;
    for (const key in source) {
      const value = source[key];
      if (value === void 0)
        continue;
      if (Array.isArray(value)) {
        result[key] = value;
      } else if (isArrayBufferLike(value)) {
        result[key] = value;
      } else if (isObject(value)) {
        const existing = result[key];
        if (isObject(existing)) {
          result[key] = deepMerge(existing, value);
        } else {
          result[key] = deepMerge(value);
        }
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}
__name(deepMerge, "deepMerge");
function mergeCredentialCreationOptions(baseOptions, overrides) {
  return deepMerge(DEFAULT_CREATION_OPTIONS, baseOptions, overrides || {});
}
__name(mergeCredentialCreationOptions, "mergeCredentialCreationOptions");
function mergeCredentialRequestOptions(baseOptions, overrides) {
  return deepMerge(DEFAULT_REQUEST_OPTIONS, baseOptions, overrides || {});
}
__name(mergeCredentialRequestOptions, "mergeCredentialRequestOptions");
var WebAuthnApi = class {
  constructor(client) {
    this.client = client;
    this.enroll = this._enroll.bind(this);
    this.challenge = this._challenge.bind(this);
    this.verify = this._verify.bind(this);
    this.authenticate = this._authenticate.bind(this);
    this.register = this._register.bind(this);
  }
  /**
   * Enroll a new WebAuthn factor.
   * Creates an unverified WebAuthn factor that must be verified with a credential.
   *
   * @experimental This method is experimental and may change in future releases
   * @param {Omit<MFAEnrollWebauthnParams, 'factorType'>} params - Enrollment parameters (friendlyName required)
   * @returns {Promise<AuthMFAEnrollWebauthnResponse>} Enrolled factor details or error
   * @see {@link https://w3c.github.io/webauthn/#sctn-registering-a-new-credential W3C WebAuthn Spec - Registering a New Credential}
   */
  async _enroll(params) {
    return this.client.mfa.enroll(Object.assign(Object.assign({}, params), { factorType: "webauthn" }));
  }
  /**
   * Challenge for WebAuthn credential creation or authentication.
   * Combines server challenge with browser credential operations.
   * Handles both registration (create) and authentication (request) flows.
   *
   * @experimental This method is experimental and may change in future releases
   * @param {MFAChallengeWebauthnParams & { friendlyName?: string; signal?: AbortSignal }} params - Challenge parameters including factorId
   * @param {Object} overrides - Allows you to override the parameters passed to navigator.credentials
   * @param {PublicKeyCredentialCreationOptionsFuture} overrides.create - Override options for credential creation
   * @param {PublicKeyCredentialRequestOptionsFuture} overrides.request - Override options for credential request
   * @returns {Promise<RequestResult>} Challenge response with credential or error
   * @see {@link https://w3c.github.io/webauthn/#sctn-credential-creation W3C WebAuthn Spec - Credential Creation}
   * @see {@link https://w3c.github.io/webauthn/#sctn-verifying-assertion W3C WebAuthn Spec - Verifying Assertion}
   */
  async _challenge({ factorId, webauthn, friendlyName, signal }, overrides) {
    try {
      const { data: challengeResponse, error: challengeError } = await this.client.mfa.challenge({
        factorId,
        webauthn
      });
      if (!challengeResponse) {
        return { data: null, error: challengeError };
      }
      const abortSignal = signal !== null && signal !== void 0 ? signal : webAuthnAbortService.createNewAbortSignal();
      if (challengeResponse.webauthn.type === "create") {
        const { user } = challengeResponse.webauthn.credential_options.publicKey;
        if (!user.name) {
          user.name = `${user.id}:${friendlyName}`;
        }
        if (!user.displayName) {
          user.displayName = user.name;
        }
      }
      switch (challengeResponse.webauthn.type) {
        case "create": {
          const options = mergeCredentialCreationOptions(challengeResponse.webauthn.credential_options.publicKey, overrides === null || overrides === void 0 ? void 0 : overrides.create);
          const { data, error } = await createCredential({
            publicKey: options,
            signal: abortSignal
          });
          if (data) {
            return {
              data: {
                factorId,
                challengeId: challengeResponse.id,
                webauthn: {
                  type: challengeResponse.webauthn.type,
                  credential_response: data
                }
              },
              error: null
            };
          }
          return { data: null, error };
        }
        case "request": {
          const options = mergeCredentialRequestOptions(challengeResponse.webauthn.credential_options.publicKey, overrides === null || overrides === void 0 ? void 0 : overrides.request);
          const { data, error } = await getCredential(Object.assign(Object.assign({}, challengeResponse.webauthn.credential_options), { publicKey: options, signal: abortSignal }));
          if (data) {
            return {
              data: {
                factorId,
                challengeId: challengeResponse.id,
                webauthn: {
                  type: challengeResponse.webauthn.type,
                  credential_response: data
                }
              },
              error: null
            };
          }
          return { data: null, error };
        }
      }
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      return {
        data: null,
        error: new AuthUnknownError("Unexpected error in challenge", error)
      };
    }
  }
  /**
   * Verify a WebAuthn credential with the server.
   * Completes the WebAuthn ceremony by sending the credential to the server for verification.
   *
   * @experimental This method is experimental and may change in future releases
   * @param {Object} params - Verification parameters
   * @param {string} params.challengeId - ID of the challenge being verified
   * @param {string} params.factorId - ID of the WebAuthn factor
   * @param {MFAVerifyWebauthnParams<T>['webauthn']} params.webauthn - WebAuthn credential response
   * @returns {Promise<AuthMFAVerifyResponse>} Verification result with session or error
   * @see {@link https://w3c.github.io/webauthn/#sctn-verifying-assertion W3C WebAuthn Spec - Verifying an Authentication Assertion}
   * */
  async _verify({ challengeId, factorId, webauthn }) {
    return this.client.mfa.verify({
      factorId,
      challengeId,
      webauthn
    });
  }
  /**
   * Complete WebAuthn authentication flow.
   * Performs challenge and verification in a single operation for existing credentials.
   *
   * @experimental This method is experimental and may change in future releases
   * @param {Object} params - Authentication parameters
   * @param {string} params.factorId - ID of the WebAuthn factor to authenticate with
   * @param {Object} params.webauthn - WebAuthn configuration
   * @param {string} params.webauthn.rpId - Relying Party ID (defaults to current hostname)
   * @param {string[]} params.webauthn.rpOrigins - Allowed origins (defaults to current origin)
   * @param {AbortSignal} params.webauthn.signal - Optional abort signal
   * @param {PublicKeyCredentialRequestOptionsFuture} overrides - Override options for navigator.credentials.get
   * @returns {Promise<RequestResult<AuthMFAVerifyResponseData, WebAuthnError | AuthError>>} Authentication result
   * @see {@link https://w3c.github.io/webauthn/#sctn-authentication W3C WebAuthn Spec - Authentication Ceremony}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredentialRequestOptions MDN - PublicKeyCredentialRequestOptions}
   */
  async _authenticate({ factorId, webauthn: { rpId = typeof window !== "undefined" ? window.location.hostname : void 0, rpOrigins = typeof window !== "undefined" ? [window.location.origin] : void 0, signal } }, overrides) {
    if (!rpId) {
      return {
        data: null,
        error: new AuthError("rpId is required for WebAuthn authentication")
      };
    }
    try {
      if (!browserSupportsWebAuthn()) {
        return {
          data: null,
          error: new AuthUnknownError("Browser does not support WebAuthn", null)
        };
      }
      const { data: challengeResponse, error: challengeError } = await this.challenge({
        factorId,
        webauthn: { rpId, rpOrigins },
        signal
      }, { request: overrides });
      if (!challengeResponse) {
        return { data: null, error: challengeError };
      }
      const { webauthn } = challengeResponse;
      return this._verify({
        factorId,
        challengeId: challengeResponse.challengeId,
        webauthn: {
          type: webauthn.type,
          rpId,
          rpOrigins,
          credential_response: webauthn.credential_response
        }
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      return {
        data: null,
        error: new AuthUnknownError("Unexpected error in authenticate", error)
      };
    }
  }
  /**
   * Complete WebAuthn registration flow.
   * Performs enrollment, challenge, and verification in a single operation for new credentials.
   *
   * @experimental This method is experimental and may change in future releases
   * @param {Object} params - Registration parameters
   * @param {string} params.friendlyName - User-friendly name for the credential
   * @param {string} params.rpId - Relying Party ID (defaults to current hostname)
   * @param {string[]} params.rpOrigins - Allowed origins (defaults to current origin)
   * @param {AbortSignal} params.signal - Optional abort signal
   * @param {PublicKeyCredentialCreationOptionsFuture} overrides - Override options for navigator.credentials.create
   * @returns {Promise<RequestResult<AuthMFAVerifyResponseData, WebAuthnError | AuthError>>} Registration result
   * @see {@link https://w3c.github.io/webauthn/#sctn-registering-a-new-credential W3C WebAuthn Spec - Registration Ceremony}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredentialCreationOptions MDN - PublicKeyCredentialCreationOptions}
   */
  async _register({ friendlyName, rpId = typeof window !== "undefined" ? window.location.hostname : void 0, rpOrigins = typeof window !== "undefined" ? [window.location.origin] : void 0, signal }, overrides) {
    if (!rpId) {
      return {
        data: null,
        error: new AuthError("rpId is required for WebAuthn registration")
      };
    }
    try {
      if (!browserSupportsWebAuthn()) {
        return {
          data: null,
          error: new AuthUnknownError("Browser does not support WebAuthn", null)
        };
      }
      const { data: factor, error: enrollError } = await this._enroll({
        friendlyName
      });
      if (!factor) {
        await this.client.mfa.listFactors().then((factors) => {
          var _a2;
          return (_a2 = factors.data) === null || _a2 === void 0 ? void 0 : _a2.all.find((v) => v.factor_type === "webauthn" && v.friendly_name === friendlyName && v.status !== "unverified");
        }).then((factor2) => factor2 ? this.client.mfa.unenroll({ factorId: factor2 === null || factor2 === void 0 ? void 0 : factor2.id }) : void 0);
        return { data: null, error: enrollError };
      }
      const { data: challengeResponse, error: challengeError } = await this._challenge({
        factorId: factor.id,
        friendlyName: factor.friendly_name,
        webauthn: { rpId, rpOrigins },
        signal
      }, {
        create: overrides
      });
      if (!challengeResponse) {
        return { data: null, error: challengeError };
      }
      return this._verify({
        factorId: factor.id,
        challengeId: challengeResponse.challengeId,
        webauthn: {
          rpId,
          rpOrigins,
          type: challengeResponse.webauthn.type,
          credential_response: challengeResponse.webauthn.credential_response
        }
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      return {
        data: null,
        error: new AuthUnknownError("Unexpected error in register", error)
      };
    }
  }
};
__name(WebAuthnApi, "WebAuthnApi");

// node_modules/@supabase/auth-js/dist/module/GoTrueClient.js
polyfillGlobalThis();
var DEFAULT_OPTIONS = {
  url: GOTRUE_URL,
  storageKey: STORAGE_KEY,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
  headers: DEFAULT_HEADERS4,
  flowType: "implicit",
  debug: false,
  hasCustomAuthorizationHeader: false,
  throwOnError: false
};
async function lockNoOp(name, acquireTimeout, fn) {
  return await fn();
}
__name(lockNoOp, "lockNoOp");
var GLOBAL_JWKS = {};
var GoTrueClient = class {
  /**
   * The JWKS used for verifying asymmetric JWTs
   */
  get jwks() {
    var _a2, _b;
    return (_b = (_a2 = GLOBAL_JWKS[this.storageKey]) === null || _a2 === void 0 ? void 0 : _a2.jwks) !== null && _b !== void 0 ? _b : { keys: [] };
  }
  set jwks(value) {
    GLOBAL_JWKS[this.storageKey] = Object.assign(Object.assign({}, GLOBAL_JWKS[this.storageKey]), { jwks: value });
  }
  get jwks_cached_at() {
    var _a2, _b;
    return (_b = (_a2 = GLOBAL_JWKS[this.storageKey]) === null || _a2 === void 0 ? void 0 : _a2.cachedAt) !== null && _b !== void 0 ? _b : Number.MIN_SAFE_INTEGER;
  }
  set jwks_cached_at(value) {
    GLOBAL_JWKS[this.storageKey] = Object.assign(Object.assign({}, GLOBAL_JWKS[this.storageKey]), { cachedAt: value });
  }
  /**
   * Create a new client for use in the browser.
   */
  constructor(options) {
    var _a2, _b, _c;
    this.userStorage = null;
    this.memoryStorage = null;
    this.stateChangeEmitters = /* @__PURE__ */ new Map();
    this.autoRefreshTicker = null;
    this.visibilityChangedCallback = null;
    this.refreshingDeferred = null;
    this.initializePromise = null;
    this.detectSessionInUrl = true;
    this.hasCustomAuthorizationHeader = false;
    this.suppressGetSessionWarning = false;
    this.lockAcquired = false;
    this.pendingInLock = [];
    this.broadcastChannel = null;
    this.logger = console.log;
    const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
    this.storageKey = settings.storageKey;
    this.instanceID = (_a2 = GoTrueClient.nextInstanceID[this.storageKey]) !== null && _a2 !== void 0 ? _a2 : 0;
    GoTrueClient.nextInstanceID[this.storageKey] = this.instanceID + 1;
    this.logDebugMessages = !!settings.debug;
    if (typeof settings.debug === "function") {
      this.logger = settings.debug;
    }
    if (this.instanceID > 0 && isBrowser()) {
      const message = `${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;
      console.warn(message);
      if (this.logDebugMessages) {
        console.trace(message);
      }
    }
    this.persistSession = settings.persistSession;
    this.autoRefreshToken = settings.autoRefreshToken;
    this.admin = new GoTrueAdminApi({
      url: settings.url,
      headers: settings.headers,
      fetch: settings.fetch
    });
    this.url = settings.url;
    this.headers = settings.headers;
    this.fetch = resolveFetch5(settings.fetch);
    this.lock = settings.lock || lockNoOp;
    this.detectSessionInUrl = settings.detectSessionInUrl;
    this.flowType = settings.flowType;
    this.hasCustomAuthorizationHeader = settings.hasCustomAuthorizationHeader;
    this.throwOnError = settings.throwOnError;
    if (settings.lock) {
      this.lock = settings.lock;
    } else if (isBrowser() && ((_b = globalThis === null || globalThis === void 0 ? void 0 : globalThis.navigator) === null || _b === void 0 ? void 0 : _b.locks)) {
      this.lock = navigatorLock;
    } else {
      this.lock = lockNoOp;
    }
    if (!this.jwks) {
      this.jwks = { keys: [] };
      this.jwks_cached_at = Number.MIN_SAFE_INTEGER;
    }
    this.mfa = {
      verify: this._verify.bind(this),
      enroll: this._enroll.bind(this),
      unenroll: this._unenroll.bind(this),
      challenge: this._challenge.bind(this),
      listFactors: this._listFactors.bind(this),
      challengeAndVerify: this._challengeAndVerify.bind(this),
      getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this),
      webauthn: new WebAuthnApi(this)
    };
    this.oauth = {
      getAuthorizationDetails: this._getAuthorizationDetails.bind(this),
      approveAuthorization: this._approveAuthorization.bind(this),
      denyAuthorization: this._denyAuthorization.bind(this)
    };
    if (this.persistSession) {
      if (settings.storage) {
        this.storage = settings.storage;
      } else {
        if (supportsLocalStorage()) {
          this.storage = globalThis.localStorage;
        } else {
          this.memoryStorage = {};
          this.storage = memoryLocalStorageAdapter(this.memoryStorage);
        }
      }
      if (settings.userStorage) {
        this.userStorage = settings.userStorage;
      }
    } else {
      this.memoryStorage = {};
      this.storage = memoryLocalStorageAdapter(this.memoryStorage);
    }
    if (isBrowser() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
      try {
        this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
      } catch (e) {
        console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", e);
      }
      (_c = this.broadcastChannel) === null || _c === void 0 ? void 0 : _c.addEventListener("message", async (event) => {
        this._debug("received broadcast notification from other tab or client", event);
        await this._notifyAllSubscribers(event.data.event, event.data.session, false);
      });
    }
    this.initialize();
  }
  /**
   * Returns whether error throwing mode is enabled for this client.
   */
  isThrowOnErrorEnabled() {
    return this.throwOnError;
  }
  /**
   * Centralizes return handling with optional error throwing. When `throwOnError` is enabled
   * and the provided result contains a non-nullish error, the error is thrown instead of
   * being returned. This ensures consistent behavior across all public API methods.
   */
  _returnResult(result) {
    if (this.throwOnError && result && result.error) {
      throw result.error;
    }
    return result;
  }
  _logPrefix() {
    return `GoTrueClient@${this.storageKey}:${this.instanceID} (${version4}) ${(/* @__PURE__ */ new Date()).toISOString()}`;
  }
  _debug(...args) {
    if (this.logDebugMessages) {
      this.logger(this._logPrefix(), ...args);
    }
    return this;
  }
  /**
   * Initializes the client session either from the url or from storage.
   * This method is automatically called when instantiating the client, but should also be called
   * manually when checking for an error from an auth redirect (oauth, magiclink, password recovery, etc).
   */
  async initialize() {
    if (this.initializePromise) {
      return await this.initializePromise;
    }
    this.initializePromise = (async () => {
      return await this._acquireLock(-1, async () => {
        return await this._initialize();
      });
    })();
    return await this.initializePromise;
  }
  /**
   * IMPORTANT:
   * 1. Never throw in this method, as it is called from the constructor
   * 2. Never return a session from this method as it would be cached over
   *    the whole lifetime of the client
   */
  async _initialize() {
    var _a2;
    try {
      let params = {};
      let callbackUrlType = "none";
      if (isBrowser()) {
        params = parseParametersFromURL(window.location.href);
        if (this._isImplicitGrantCallback(params)) {
          callbackUrlType = "implicit";
        } else if (await this._isPKCECallback(params)) {
          callbackUrlType = "pkce";
        }
      }
      if (isBrowser() && this.detectSessionInUrl && callbackUrlType !== "none") {
        const { data, error } = await this._getSessionFromURL(params, callbackUrlType);
        if (error) {
          this._debug("#_initialize()", "error detecting session from URL", error);
          if (isAuthImplicitGrantRedirectError(error)) {
            const errorCode = (_a2 = error.details) === null || _a2 === void 0 ? void 0 : _a2.code;
            if (errorCode === "identity_already_exists" || errorCode === "identity_not_found" || errorCode === "single_identity_not_deletable") {
              return { error };
            }
          }
          await this._removeSession();
          return { error };
        }
        const { session, redirectType } = data;
        this._debug("#_initialize()", "detected session in URL", session, "redirect type", redirectType);
        await this._saveSession(session);
        setTimeout(async () => {
          if (redirectType === "recovery") {
            await this._notifyAllSubscribers("PASSWORD_RECOVERY", session);
          } else {
            await this._notifyAllSubscribers("SIGNED_IN", session);
          }
        }, 0);
        return { error: null };
      }
      await this._recoverAndRefresh();
      return { error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ error });
      }
      return this._returnResult({
        error: new AuthUnknownError("Unexpected error during initialization", error)
      });
    } finally {
      await this._handleVisibilityChange();
      this._debug("#_initialize()", "end");
    }
  }
  /**
   * Creates a new anonymous user.
   *
   * @returns A session where the is_anonymous claim in the access token JWT set to true
   */
  async signInAnonymously(credentials) {
    var _a2, _b, _c;
    try {
      const res = await _request(this.fetch, "POST", `${this.url}/signup`, {
        headers: this.headers,
        body: {
          data: (_b = (_a2 = credentials === null || credentials === void 0 ? void 0 : credentials.options) === null || _a2 === void 0 ? void 0 : _a2.data) !== null && _b !== void 0 ? _b : {},
          gotrue_meta_security: { captcha_token: (_c = credentials === null || credentials === void 0 ? void 0 : credentials.options) === null || _c === void 0 ? void 0 : _c.captchaToken }
        },
        xform: _sessionResponse
      });
      const { data, error } = res;
      if (error || !data) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      const session = data.session;
      const user = data.user;
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers("SIGNED_IN", session);
      }
      return this._returnResult({ data: { user, session }, error: null });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      throw error;
    }
  }
  /**
   * Creates a new user.
   *
   * Be aware that if a user account exists in the system you may get back an
   * error message that attempts to hide this information from the user.
   * This method has support for PKCE via email signups. The PKCE flow cannot be used when autoconfirm is enabled.
   *
   * @returns A logged-in session if the server has "autoconfirm" ON
   * @returns A user if the server has "autoconfirm" OFF
   */
  async signUp(credentials) {
    var _a2, _b, _c;
    try {
      let res;
      if ("email" in credentials) {
        const { email, password, options } = credentials;
        let codeChallenge = null;
        let codeChallengeMethod = null;
        if (this.flowType === "pkce") {
          ;
          [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
        }
        res = await _request(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
          body: {
            email,
            password,
            data: (_a2 = options === null || options === void 0 ? void 0 : options.data) !== null && _a2 !== void 0 ? _a2 : {},
            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
            code_challenge: codeChallenge,
            code_challenge_method: codeChallengeMethod
          },
          xform: _sessionResponse
        });
      } else if ("phone" in credentials) {
        const { phone, password, options } = credentials;
        res = await _request(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          body: {
            phone,
            password,
            data: (_b = options === null || options === void 0 ? void 0 : options.data) !== null && _b !== void 0 ? _b : {},
            channel: (_c = options === null || options === void 0 ? void 0 : options.channel) !== null && _c !== void 0 ? _c : "sms",
            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
          },
          xform: _sessionResponse
        });
      } else {
        throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
      }
      const { data, error } = res;
      if (error || !data) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      const session = data.session;
      const user = data.user;
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers("SIGNED_IN", session);
      }
      return this._returnResult({ data: { user, session }, error: null });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      throw error;
    }
  }
  /**
   * Log in an existing user with an email and password or phone and password.
   *
   * Be aware that you may get back an error message that will not distinguish
   * between the cases where the account does not exist or that the
   * email/phone and password combination is wrong or that the account can only
   * be accessed via social login.
   */
  async signInWithPassword(credentials) {
    try {
      let res;
      if ("email" in credentials) {
        const { email, password, options } = credentials;
        res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
          headers: this.headers,
          body: {
            email,
            password,
            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
          },
          xform: _sessionResponsePassword
        });
      } else if ("phone" in credentials) {
        const { phone, password, options } = credentials;
        res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
          headers: this.headers,
          body: {
            phone,
            password,
            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
          },
          xform: _sessionResponsePassword
        });
      } else {
        throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
      }
      const { data, error } = res;
      if (error) {
        return this._returnResult({ data: { user: null, session: null }, error });
      } else if (!data || !data.session || !data.user) {
        const invalidTokenError = new AuthInvalidTokenResponseError();
        return this._returnResult({ data: { user: null, session: null }, error: invalidTokenError });
      }
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers("SIGNED_IN", data.session);
      }
      return this._returnResult({
        data: Object.assign({ user: data.user, session: data.session }, data.weak_password ? { weakPassword: data.weak_password } : null),
        error
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      throw error;
    }
  }
  /**
   * Log in an existing user via a third-party provider.
   * This method supports the PKCE flow.
   */
  async signInWithOAuth(credentials) {
    var _a2, _b, _c, _d;
    return await this._handleProviderSignIn(credentials.provider, {
      redirectTo: (_a2 = credentials.options) === null || _a2 === void 0 ? void 0 : _a2.redirectTo,
      scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
      queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
      skipBrowserRedirect: (_d = credentials.options) === null || _d === void 0 ? void 0 : _d.skipBrowserRedirect
    });
  }
  /**
   * Log in an existing user by exchanging an Auth Code issued during the PKCE flow.
   */
  async exchangeCodeForSession(authCode) {
    await this.initializePromise;
    return this._acquireLock(-1, async () => {
      return this._exchangeCodeForSession(authCode);
    });
  }
  /**
   * Signs in a user by verifying a message signed by the user's private key.
   * Supports Ethereum (via Sign-In-With-Ethereum) & Solana (Sign-In-With-Solana) standards,
   * both of which derive from the EIP-4361 standard
   * With slight variation on Solana's side.
   * @reference https://eips.ethereum.org/EIPS/eip-4361
   */
  async signInWithWeb3(credentials) {
    const { chain } = credentials;
    switch (chain) {
      case "ethereum":
        return await this.signInWithEthereum(credentials);
      case "solana":
        return await this.signInWithSolana(credentials);
      default:
        throw new Error(`@supabase/auth-js: Unsupported chain "${chain}"`);
    }
  }
  async signInWithEthereum(credentials) {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    let message;
    let signature;
    if ("message" in credentials) {
      message = credentials.message;
      signature = credentials.signature;
    } else {
      const { chain, wallet, statement, options } = credentials;
      let resolvedWallet;
      if (!isBrowser()) {
        if (typeof wallet !== "object" || !(options === null || options === void 0 ? void 0 : options.url)) {
          throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
        }
        resolvedWallet = wallet;
      } else if (typeof wallet === "object") {
        resolvedWallet = wallet;
      } else {
        const windowAny = window;
        if ("ethereum" in windowAny && typeof windowAny.ethereum === "object" && "request" in windowAny.ethereum && typeof windowAny.ethereum.request === "function") {
          resolvedWallet = windowAny.ethereum;
        } else {
          throw new Error(`@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.`);
        }
      }
      const url = new URL((_a2 = options === null || options === void 0 ? void 0 : options.url) !== null && _a2 !== void 0 ? _a2 : window.location.href);
      const accounts = await resolvedWallet.request({
        method: "eth_requestAccounts"
      }).then((accs) => accs).catch(() => {
        throw new Error(`@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid`);
      });
      if (!accounts || accounts.length === 0) {
        throw new Error(`@supabase/auth-js: No accounts available. Please ensure the wallet is connected.`);
      }
      const address = getAddress(accounts[0]);
      let chainId = (_b = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _b === void 0 ? void 0 : _b.chainId;
      if (!chainId) {
        const chainIdHex = await resolvedWallet.request({
          method: "eth_chainId"
        });
        chainId = fromHex(chainIdHex);
      }
      const siweMessage = {
        domain: url.host,
        address,
        statement,
        uri: url.href,
        version: "1",
        chainId,
        nonce: (_c = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _c === void 0 ? void 0 : _c.nonce,
        issuedAt: (_e = (_d = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _d === void 0 ? void 0 : _d.issuedAt) !== null && _e !== void 0 ? _e : /* @__PURE__ */ new Date(),
        expirationTime: (_f = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _f === void 0 ? void 0 : _f.expirationTime,
        notBefore: (_g = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _g === void 0 ? void 0 : _g.notBefore,
        requestId: (_h = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _h === void 0 ? void 0 : _h.requestId,
        resources: (_j = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _j === void 0 ? void 0 : _j.resources
      };
      message = createSiweMessage(siweMessage);
      signature = await resolvedWallet.request({
        method: "personal_sign",
        params: [toHex(message), address]
      });
    }
    try {
      const { data, error } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
        headers: this.headers,
        body: Object.assign({
          chain: "ethereum",
          message,
          signature
        }, ((_k = credentials.options) === null || _k === void 0 ? void 0 : _k.captchaToken) ? { gotrue_meta_security: { captcha_token: (_l = credentials.options) === null || _l === void 0 ? void 0 : _l.captchaToken } } : null),
        xform: _sessionResponse
      });
      if (error) {
        throw error;
      }
      if (!data || !data.session || !data.user) {
        const invalidTokenError = new AuthInvalidTokenResponseError();
        return this._returnResult({ data: { user: null, session: null }, error: invalidTokenError });
      }
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers("SIGNED_IN", data.session);
      }
      return this._returnResult({ data: Object.assign({}, data), error });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      throw error;
    }
  }
  async signInWithSolana(credentials) {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    let message;
    let signature;
    if ("message" in credentials) {
      message = credentials.message;
      signature = credentials.signature;
    } else {
      const { chain, wallet, statement, options } = credentials;
      let resolvedWallet;
      if (!isBrowser()) {
        if (typeof wallet !== "object" || !(options === null || options === void 0 ? void 0 : options.url)) {
          throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
        }
        resolvedWallet = wallet;
      } else if (typeof wallet === "object") {
        resolvedWallet = wallet;
      } else {
        const windowAny = window;
        if ("solana" in windowAny && typeof windowAny.solana === "object" && ("signIn" in windowAny.solana && typeof windowAny.solana.signIn === "function" || "signMessage" in windowAny.solana && typeof windowAny.solana.signMessage === "function")) {
          resolvedWallet = windowAny.solana;
        } else {
          throw new Error(`@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.`);
        }
      }
      const url = new URL((_a2 = options === null || options === void 0 ? void 0 : options.url) !== null && _a2 !== void 0 ? _a2 : window.location.href);
      if ("signIn" in resolvedWallet && resolvedWallet.signIn) {
        const output = await resolvedWallet.signIn(Object.assign(Object.assign(Object.assign({ issuedAt: (/* @__PURE__ */ new Date()).toISOString() }, options === null || options === void 0 ? void 0 : options.signInWithSolana), {
          // non-overridable properties
          version: "1",
          domain: url.host,
          uri: url.href
        }), statement ? { statement } : null));
        let outputToProcess;
        if (Array.isArray(output) && output[0] && typeof output[0] === "object") {
          outputToProcess = output[0];
        } else if (output && typeof output === "object" && "signedMessage" in output && "signature" in output) {
          outputToProcess = output;
        } else {
          throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");
        }
        if ("signedMessage" in outputToProcess && "signature" in outputToProcess && (typeof outputToProcess.signedMessage === "string" || outputToProcess.signedMessage instanceof Uint8Array) && outputToProcess.signature instanceof Uint8Array) {
          message = typeof outputToProcess.signedMessage === "string" ? outputToProcess.signedMessage : new TextDecoder().decode(outputToProcess.signedMessage);
          signature = outputToProcess.signature;
        } else {
          throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields");
        }
      } else {
        if (!("signMessage" in resolvedWallet) || typeof resolvedWallet.signMessage !== "function" || !("publicKey" in resolvedWallet) || typeof resolvedWallet !== "object" || !resolvedWallet.publicKey || !("toBase58" in resolvedWallet.publicKey) || typeof resolvedWallet.publicKey.toBase58 !== "function") {
          throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");
        }
        message = [
          `${url.host} wants you to sign in with your Solana account:`,
          resolvedWallet.publicKey.toBase58(),
          ...statement ? ["", statement, ""] : [""],
          "Version: 1",
          `URI: ${url.href}`,
          `Issued At: ${(_c = (_b = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _b === void 0 ? void 0 : _b.issuedAt) !== null && _c !== void 0 ? _c : (/* @__PURE__ */ new Date()).toISOString()}`,
          ...((_d = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _d === void 0 ? void 0 : _d.notBefore) ? [`Not Before: ${options.signInWithSolana.notBefore}`] : [],
          ...((_e = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _e === void 0 ? void 0 : _e.expirationTime) ? [`Expiration Time: ${options.signInWithSolana.expirationTime}`] : [],
          ...((_f = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _f === void 0 ? void 0 : _f.chainId) ? [`Chain ID: ${options.signInWithSolana.chainId}`] : [],
          ...((_g = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _g === void 0 ? void 0 : _g.nonce) ? [`Nonce: ${options.signInWithSolana.nonce}`] : [],
          ...((_h = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _h === void 0 ? void 0 : _h.requestId) ? [`Request ID: ${options.signInWithSolana.requestId}`] : [],
          ...((_k = (_j = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _j === void 0 ? void 0 : _j.resources) === null || _k === void 0 ? void 0 : _k.length) ? [
            "Resources",
            ...options.signInWithSolana.resources.map((resource) => `- ${resource}`)
          ] : []
        ].join("\n");
        const maybeSignature = await resolvedWallet.signMessage(new TextEncoder().encode(message), "utf8");
        if (!maybeSignature || !(maybeSignature instanceof Uint8Array)) {
          throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");
        }
        signature = maybeSignature;
      }
    }
    try {
      const { data, error } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
        headers: this.headers,
        body: Object.assign({ chain: "solana", message, signature: bytesToBase64URL(signature) }, ((_l = credentials.options) === null || _l === void 0 ? void 0 : _l.captchaToken) ? { gotrue_meta_security: { captcha_token: (_m = credentials.options) === null || _m === void 0 ? void 0 : _m.captchaToken } } : null),
        xform: _sessionResponse
      });
      if (error) {
        throw error;
      }
      if (!data || !data.session || !data.user) {
        const invalidTokenError = new AuthInvalidTokenResponseError();
        return this._returnResult({ data: { user: null, session: null }, error: invalidTokenError });
      }
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers("SIGNED_IN", data.session);
      }
      return this._returnResult({ data: Object.assign({}, data), error });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      throw error;
    }
  }
  async _exchangeCodeForSession(authCode) {
    const storageItem = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
    const [codeVerifier, redirectType] = (storageItem !== null && storageItem !== void 0 ? storageItem : "").split("/");
    try {
      const { data, error } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, {
        headers: this.headers,
        body: {
          auth_code: authCode,
          code_verifier: codeVerifier
        },
        xform: _sessionResponse
      });
      await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
      if (error) {
        throw error;
      }
      if (!data || !data.session || !data.user) {
        const invalidTokenError = new AuthInvalidTokenResponseError();
        return this._returnResult({
          data: { user: null, session: null, redirectType: null },
          error: invalidTokenError
        });
      }
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers("SIGNED_IN", data.session);
      }
      return this._returnResult({ data: Object.assign(Object.assign({}, data), { redirectType: redirectType !== null && redirectType !== void 0 ? redirectType : null }), error });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({
          data: { user: null, session: null, redirectType: null },
          error
        });
      }
      throw error;
    }
  }
  /**
   * Allows signing in with an OIDC ID token. The authentication provider used
   * should be enabled and configured.
   */
  async signInWithIdToken(credentials) {
    try {
      const { options, provider, token, access_token, nonce } = credentials;
      const res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
        headers: this.headers,
        body: {
          provider,
          id_token: token,
          access_token,
          nonce,
          gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
        },
        xform: _sessionResponse
      });
      const { data, error } = res;
      if (error) {
        return this._returnResult({ data: { user: null, session: null }, error });
      } else if (!data || !data.session || !data.user) {
        const invalidTokenError = new AuthInvalidTokenResponseError();
        return this._returnResult({ data: { user: null, session: null }, error: invalidTokenError });
      }
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers("SIGNED_IN", data.session);
      }
      return this._returnResult({ data, error });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      throw error;
    }
  }
  /**
   * Log in a user using magiclink or a one-time password (OTP).
   *
   * If the `{{ .ConfirmationURL }}` variable is specified in the email template, a magiclink will be sent.
   * If the `{{ .Token }}` variable is specified in the email template, an OTP will be sent.
   * If you're using phone sign-ins, only an OTP will be sent. You won't be able to send a magiclink for phone sign-ins.
   *
   * Be aware that you may get back an error message that will not distinguish
   * between the cases where the account does not exist or, that the account
   * can only be accessed via social login.
   *
   * Do note that you will need to configure a Whatsapp sender on Twilio
   * if you are using phone sign in with the 'whatsapp' channel. The whatsapp
   * channel is not supported on other providers
   * at this time.
   * This method supports PKCE when an email is passed.
   */
  async signInWithOtp(credentials) {
    var _a2, _b, _c, _d, _e;
    try {
      if ("email" in credentials) {
        const { email, options } = credentials;
        let codeChallenge = null;
        let codeChallengeMethod = null;
        if (this.flowType === "pkce") {
          ;
          [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
        }
        const { error } = await _request(this.fetch, "POST", `${this.url}/otp`, {
          headers: this.headers,
          body: {
            email,
            data: (_a2 = options === null || options === void 0 ? void 0 : options.data) !== null && _a2 !== void 0 ? _a2 : {},
            create_user: (_b = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _b !== void 0 ? _b : true,
            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
            code_challenge: codeChallenge,
            code_challenge_method: codeChallengeMethod
          },
          redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo
        });
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      if ("phone" in credentials) {
        const { phone, options } = credentials;
        const { data, error } = await _request(this.fetch, "POST", `${this.url}/otp`, {
          headers: this.headers,
          body: {
            phone,
            data: (_c = options === null || options === void 0 ? void 0 : options.data) !== null && _c !== void 0 ? _c : {},
            create_user: (_d = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _d !== void 0 ? _d : true,
            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
            channel: (_e = options === null || options === void 0 ? void 0 : options.channel) !== null && _e !== void 0 ? _e : "sms"
          }
        });
        return this._returnResult({
          data: { user: null, session: null, messageId: data === null || data === void 0 ? void 0 : data.message_id },
          error
        });
      }
      throw new AuthInvalidCredentialsError("You must provide either an email or phone number.");
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      throw error;
    }
  }
  /**
   * Log in a user given a User supplied OTP or TokenHash received through mobile or email.
   */
  async verifyOtp(params) {
    var _a2, _b;
    try {
      let redirectTo = void 0;
      let captchaToken = void 0;
      if ("options" in params) {
        redirectTo = (_a2 = params.options) === null || _a2 === void 0 ? void 0 : _a2.redirectTo;
        captchaToken = (_b = params.options) === null || _b === void 0 ? void 0 : _b.captchaToken;
      }
      const { data, error } = await _request(this.fetch, "POST", `${this.url}/verify`, {
        headers: this.headers,
        body: Object.assign(Object.assign({}, params), { gotrue_meta_security: { captcha_token: captchaToken } }),
        redirectTo,
        xform: _sessionResponse
      });
      if (error) {
        throw error;
      }
      if (!data) {
        const tokenVerificationError = new Error("An error occurred on token verification.");
        throw tokenVerificationError;
      }
      const session = data.session;
      const user = data.user;
      if (session === null || session === void 0 ? void 0 : session.access_token) {
        await this._saveSession(session);
        await this._notifyAllSubscribers(params.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", session);
      }
      return this._returnResult({ data: { user, session }, error: null });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      throw error;
    }
  }
  /**
   * Attempts a single-sign on using an enterprise Identity Provider. A
   * successful SSO attempt will redirect the current page to the identity
   * provider authorization page. The redirect URL is implementation and SSO
   * protocol specific.
   *
   * You can use it by providing a SSO domain. Typically you can extract this
   * domain by asking users for their email address. If this domain is
   * registered on the Auth instance the redirect will use that organization's
   * currently active SSO Identity Provider for the login.
   *
   * If you have built an organization-specific login page, you can use the
   * organization's SSO Identity Provider UUID directly instead.
   */
  async signInWithSSO(params) {
    var _a2, _b, _c;
    try {
      let codeChallenge = null;
      let codeChallengeMethod = null;
      if (this.flowType === "pkce") {
        ;
        [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
      }
      const result = await _request(this.fetch, "POST", `${this.url}/sso`, {
        body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in params ? { provider_id: params.providerId } : null), "domain" in params ? { domain: params.domain } : null), { redirect_to: (_b = (_a2 = params.options) === null || _a2 === void 0 ? void 0 : _a2.redirectTo) !== null && _b !== void 0 ? _b : void 0 }), ((_c = params === null || params === void 0 ? void 0 : params.options) === null || _c === void 0 ? void 0 : _c.captchaToken) ? { gotrue_meta_security: { captcha_token: params.options.captchaToken } } : null), { skip_http_redirect: true, code_challenge: codeChallenge, code_challenge_method: codeChallengeMethod }),
        headers: this.headers,
        xform: _ssoResponse
      });
      return this._returnResult(result);
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  /**
   * Sends a reauthentication OTP to the user's email or phone number.
   * Requires the user to be signed-in.
   */
  async reauthenticate() {
    await this.initializePromise;
    return await this._acquireLock(-1, async () => {
      return await this._reauthenticate();
    });
  }
  async _reauthenticate() {
    try {
      return await this._useSession(async (result) => {
        const { data: { session }, error: sessionError } = result;
        if (sessionError)
          throw sessionError;
        if (!session)
          throw new AuthSessionMissingError();
        const { error } = await _request(this.fetch, "GET", `${this.url}/reauthenticate`, {
          headers: this.headers,
          jwt: session.access_token
        });
        return this._returnResult({ data: { user: null, session: null }, error });
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      throw error;
    }
  }
  /**
   * Resends an existing signup confirmation email, email change email, SMS OTP or phone change OTP.
   */
  async resend(credentials) {
    try {
      const endpoint = `${this.url}/resend`;
      if ("email" in credentials) {
        const { email, type, options } = credentials;
        const { error } = await _request(this.fetch, "POST", endpoint, {
          headers: this.headers,
          body: {
            email,
            type,
            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
          },
          redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo
        });
        return this._returnResult({ data: { user: null, session: null }, error });
      } else if ("phone" in credentials) {
        const { phone, type, options } = credentials;
        const { data, error } = await _request(this.fetch, "POST", endpoint, {
          headers: this.headers,
          body: {
            phone,
            type,
            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
          }
        });
        return this._returnResult({
          data: { user: null, session: null, messageId: data === null || data === void 0 ? void 0 : data.message_id },
          error
        });
      }
      throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a type");
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      throw error;
    }
  }
  /**
   * Returns the session, refreshing it if necessary.
   *
   * The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.
   *
   * **IMPORTANT:** This method loads values directly from the storage attached
   * to the client. If that storage is based on request cookies for example,
   * the values in it may not be authentic and therefore it's strongly advised
   * against using this method and its results in such circumstances. A warning
   * will be emitted if this is detected. Use {@link #getUser()} instead.
   */
  async getSession() {
    await this.initializePromise;
    const result = await this._acquireLock(-1, async () => {
      return this._useSession(async (result2) => {
        return result2;
      });
    });
    return result;
  }
  /**
   * Acquires a global lock based on the storage key.
   */
  async _acquireLock(acquireTimeout, fn) {
    this._debug("#_acquireLock", "begin", acquireTimeout);
    try {
      if (this.lockAcquired) {
        const last = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve();
        const result = (async () => {
          await last;
          return await fn();
        })();
        this.pendingInLock.push((async () => {
          try {
            await result;
          } catch (e) {
          }
        })());
        return result;
      }
      return await this.lock(`lock:${this.storageKey}`, acquireTimeout, async () => {
        this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
        try {
          this.lockAcquired = true;
          const result = fn();
          this.pendingInLock.push((async () => {
            try {
              await result;
            } catch (e) {
            }
          })());
          await result;
          while (this.pendingInLock.length) {
            const waitOn = [...this.pendingInLock];
            await Promise.all(waitOn);
            this.pendingInLock.splice(0, waitOn.length);
          }
          return await result;
        } finally {
          this._debug("#_acquireLock", "lock released for storage key", this.storageKey);
          this.lockAcquired = false;
        }
      });
    } finally {
      this._debug("#_acquireLock", "end");
    }
  }
  /**
   * Use instead of {@link #getSession} inside the library. It is
   * semantically usually what you want, as getting a session involves some
   * processing afterwards that requires only one client operating on the
   * session at once across multiple tabs or processes.
   */
  async _useSession(fn) {
    this._debug("#_useSession", "begin");
    try {
      const result = await this.__loadSession();
      return await fn(result);
    } finally {
      this._debug("#_useSession", "end");
    }
  }
  /**
   * NEVER USE DIRECTLY!
   *
   * Always use {@link #_useSession}.
   */
  async __loadSession() {
    this._debug("#__loadSession()", "begin");
    if (!this.lockAcquired) {
      this._debug("#__loadSession()", "used outside of an acquired lock!", new Error().stack);
    }
    try {
      let currentSession = null;
      const maybeSession = await getItemAsync(this.storage, this.storageKey);
      this._debug("#getSession()", "session from storage", maybeSession);
      if (maybeSession !== null) {
        if (this._isValidSession(maybeSession)) {
          currentSession = maybeSession;
        } else {
          this._debug("#getSession()", "session from storage is not valid");
          await this._removeSession();
        }
      }
      if (!currentSession) {
        return { data: { session: null }, error: null };
      }
      const hasExpired = currentSession.expires_at ? currentSession.expires_at * 1e3 - Date.now() < EXPIRY_MARGIN_MS : false;
      this._debug("#__loadSession()", `session has${hasExpired ? "" : " not"} expired`, "expires_at", currentSession.expires_at);
      if (!hasExpired) {
        if (this.userStorage) {
          const maybeUser = await getItemAsync(this.userStorage, this.storageKey + "-user");
          if (maybeUser === null || maybeUser === void 0 ? void 0 : maybeUser.user) {
            currentSession.user = maybeUser.user;
          } else {
            currentSession.user = userNotAvailableProxy();
          }
        }
        if (this.storage.isServer && currentSession.user && !currentSession.user.__isUserNotAvailableProxy) {
          const suppressWarningRef = { value: this.suppressGetSessionWarning };
          currentSession.user = insecureUserWarningProxy(currentSession.user, suppressWarningRef);
          if (suppressWarningRef.value) {
            this.suppressGetSessionWarning = true;
          }
        }
        return { data: { session: currentSession }, error: null };
      }
      const { data: session, error } = await this._callRefreshToken(currentSession.refresh_token);
      if (error) {
        return this._returnResult({ data: { session: null }, error });
      }
      return this._returnResult({ data: { session }, error: null });
    } finally {
      this._debug("#__loadSession()", "end");
    }
  }
  /**
   * Gets the current user details if there is an existing session. This method
   * performs a network request to the Supabase Auth server, so the returned
   * value is authentic and can be used to base authorization rules on.
   *
   * @param jwt Takes in an optional access token JWT. If no JWT is provided, the JWT from the current session is used.
   */
  async getUser(jwt) {
    if (jwt) {
      return await this._getUser(jwt);
    }
    await this.initializePromise;
    const result = await this._acquireLock(-1, async () => {
      return await this._getUser();
    });
    return result;
  }
  async _getUser(jwt) {
    try {
      if (jwt) {
        return await _request(this.fetch, "GET", `${this.url}/user`, {
          headers: this.headers,
          jwt,
          xform: _userResponse
        });
      }
      return await this._useSession(async (result) => {
        var _a2, _b, _c;
        const { data, error } = result;
        if (error) {
          throw error;
        }
        if (!((_a2 = data.session) === null || _a2 === void 0 ? void 0 : _a2.access_token) && !this.hasCustomAuthorizationHeader) {
          return { data: { user: null }, error: new AuthSessionMissingError() };
        }
        return await _request(this.fetch, "GET", `${this.url}/user`, {
          headers: this.headers,
          jwt: (_c = (_b = data.session) === null || _b === void 0 ? void 0 : _b.access_token) !== null && _c !== void 0 ? _c : void 0,
          xform: _userResponse
        });
      });
    } catch (error) {
      if (isAuthError(error)) {
        if (isAuthSessionMissingError(error)) {
          await this._removeSession();
          await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
        }
        return this._returnResult({ data: { user: null }, error });
      }
      throw error;
    }
  }
  /**
   * Updates user data for a logged in user.
   */
  async updateUser(attributes, options = {}) {
    await this.initializePromise;
    return await this._acquireLock(-1, async () => {
      return await this._updateUser(attributes, options);
    });
  }
  async _updateUser(attributes, options = {}) {
    try {
      return await this._useSession(async (result) => {
        const { data: sessionData, error: sessionError } = result;
        if (sessionError) {
          throw sessionError;
        }
        if (!sessionData.session) {
          throw new AuthSessionMissingError();
        }
        const session = sessionData.session;
        let codeChallenge = null;
        let codeChallengeMethod = null;
        if (this.flowType === "pkce" && attributes.email != null) {
          ;
          [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
        }
        const { data, error: userError } = await _request(this.fetch, "PUT", `${this.url}/user`, {
          headers: this.headers,
          redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
          body: Object.assign(Object.assign({}, attributes), { code_challenge: codeChallenge, code_challenge_method: codeChallengeMethod }),
          jwt: session.access_token,
          xform: _userResponse
        });
        if (userError) {
          throw userError;
        }
        session.user = data.user;
        await this._saveSession(session);
        await this._notifyAllSubscribers("USER_UPDATED", session);
        return this._returnResult({ data: { user: session.user }, error: null });
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null }, error });
      }
      throw error;
    }
  }
  /**
   * Sets the session data from the current session. If the current session is expired, setSession will take care of refreshing it to obtain a new session.
   * If the refresh token or access token in the current session is invalid, an error will be thrown.
   * @param currentSession The current session that minimally contains an access token and refresh token.
   */
  async setSession(currentSession) {
    await this.initializePromise;
    return await this._acquireLock(-1, async () => {
      return await this._setSession(currentSession);
    });
  }
  async _setSession(currentSession) {
    try {
      if (!currentSession.access_token || !currentSession.refresh_token) {
        throw new AuthSessionMissingError();
      }
      const timeNow = Date.now() / 1e3;
      let expiresAt2 = timeNow;
      let hasExpired = true;
      let session = null;
      const { payload } = decodeJWT(currentSession.access_token);
      if (payload.exp) {
        expiresAt2 = payload.exp;
        hasExpired = expiresAt2 <= timeNow;
      }
      if (hasExpired) {
        const { data: refreshedSession, error } = await this._callRefreshToken(currentSession.refresh_token);
        if (error) {
          return this._returnResult({ data: { user: null, session: null }, error });
        }
        if (!refreshedSession) {
          return { data: { user: null, session: null }, error: null };
        }
        session = refreshedSession;
      } else {
        const { data, error } = await this._getUser(currentSession.access_token);
        if (error) {
          throw error;
        }
        session = {
          access_token: currentSession.access_token,
          refresh_token: currentSession.refresh_token,
          user: data.user,
          token_type: "bearer",
          expires_in: expiresAt2 - timeNow,
          expires_at: expiresAt2
        };
        await this._saveSession(session);
        await this._notifyAllSubscribers("SIGNED_IN", session);
      }
      return this._returnResult({ data: { user: session.user, session }, error: null });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { session: null, user: null }, error });
      }
      throw error;
    }
  }
  /**
   * Returns a new session, regardless of expiry status.
   * Takes in an optional current session. If not passed in, then refreshSession() will attempt to retrieve it from getSession().
   * If the current session's refresh token is invalid, an error will be thrown.
   * @param currentSession The current session. If passed in, it must contain a refresh token.
   */
  async refreshSession(currentSession) {
    await this.initializePromise;
    return await this._acquireLock(-1, async () => {
      return await this._refreshSession(currentSession);
    });
  }
  async _refreshSession(currentSession) {
    try {
      return await this._useSession(async (result) => {
        var _a2;
        if (!currentSession) {
          const { data, error: error2 } = result;
          if (error2) {
            throw error2;
          }
          currentSession = (_a2 = data.session) !== null && _a2 !== void 0 ? _a2 : void 0;
        }
        if (!(currentSession === null || currentSession === void 0 ? void 0 : currentSession.refresh_token)) {
          throw new AuthSessionMissingError();
        }
        const { data: session, error } = await this._callRefreshToken(currentSession.refresh_token);
        if (error) {
          return this._returnResult({ data: { user: null, session: null }, error });
        }
        if (!session) {
          return this._returnResult({ data: { user: null, session: null }, error: null });
        }
        return this._returnResult({ data: { user: session.user, session }, error: null });
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      throw error;
    }
  }
  /**
   * Gets the session data from a URL string
   */
  async _getSessionFromURL(params, callbackUrlType) {
    try {
      if (!isBrowser())
        throw new AuthImplicitGrantRedirectError("No browser detected.");
      if (params.error || params.error_description || params.error_code) {
        throw new AuthImplicitGrantRedirectError(params.error_description || "Error in URL with unspecified error_description", {
          error: params.error || "unspecified_error",
          code: params.error_code || "unspecified_code"
        });
      }
      switch (callbackUrlType) {
        case "implicit":
          if (this.flowType === "pkce") {
            throw new AuthPKCEGrantCodeExchangeError("Not a valid PKCE flow url.");
          }
          break;
        case "pkce":
          if (this.flowType === "implicit") {
            throw new AuthImplicitGrantRedirectError("Not a valid implicit grant flow url.");
          }
          break;
        default:
      }
      if (callbackUrlType === "pkce") {
        this._debug("#_initialize()", "begin", "is PKCE flow", true);
        if (!params.code)
          throw new AuthPKCEGrantCodeExchangeError("No code detected.");
        const { data: data2, error: error2 } = await this._exchangeCodeForSession(params.code);
        if (error2)
          throw error2;
        const url = new URL(window.location.href);
        url.searchParams.delete("code");
        window.history.replaceState(window.history.state, "", url.toString());
        return { data: { session: data2.session, redirectType: null }, error: null };
      }
      const { provider_token, provider_refresh_token, access_token, refresh_token, expires_in, expires_at, token_type } = params;
      if (!access_token || !expires_in || !refresh_token || !token_type) {
        throw new AuthImplicitGrantRedirectError("No session defined in URL");
      }
      const timeNow = Math.round(Date.now() / 1e3);
      const expiresIn = parseInt(expires_in);
      let expiresAt2 = timeNow + expiresIn;
      if (expires_at) {
        expiresAt2 = parseInt(expires_at);
      }
      const actuallyExpiresIn = expiresAt2 - timeNow;
      if (actuallyExpiresIn * 1e3 <= AUTO_REFRESH_TICK_DURATION_MS) {
        console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${actuallyExpiresIn}s, should have been closer to ${expiresIn}s`);
      }
      const issuedAt = expiresAt2 - expiresIn;
      if (timeNow - issuedAt >= 120) {
        console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", issuedAt, expiresAt2, timeNow);
      } else if (timeNow - issuedAt < 0) {
        console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew", issuedAt, expiresAt2, timeNow);
      }
      const { data, error } = await this._getUser(access_token);
      if (error)
        throw error;
      const session = {
        provider_token,
        provider_refresh_token,
        access_token,
        expires_in: expiresIn,
        expires_at: expiresAt2,
        refresh_token,
        token_type,
        user: data.user
      };
      window.location.hash = "";
      this._debug("#_getSessionFromURL()", "clearing window.location.hash");
      return this._returnResult({ data: { session, redirectType: params.type }, error: null });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { session: null, redirectType: null }, error });
      }
      throw error;
    }
  }
  /**
   * Checks if the current URL contains parameters given by an implicit oauth grant flow (https://www.rfc-editor.org/rfc/rfc6749.html#section-4.2)
   */
  _isImplicitGrantCallback(params) {
    return Boolean(params.access_token || params.error_description);
  }
  /**
   * Checks if the current URL and backing storage contain parameters given by a PKCE flow
   */
  async _isPKCECallback(params) {
    const currentStorageContent = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
    return !!(params.code && currentStorageContent);
  }
  /**
   * Inside a browser context, `signOut()` will remove the logged in user from the browser session and log them out - removing all items from localstorage and then trigger a `"SIGNED_OUT"` event.
   *
   * For server-side management, you can revoke all refresh tokens for a user by passing a user's JWT through to `auth.api.signOut(JWT: string)`.
   * There is no way to revoke a user's access token jwt until it expires. It is recommended to set a shorter expiry on the jwt for this reason.
   *
   * If using `others` scope, no `SIGNED_OUT` event is fired!
   */
  async signOut(options = { scope: "global" }) {
    await this.initializePromise;
    return await this._acquireLock(-1, async () => {
      return await this._signOut(options);
    });
  }
  async _signOut({ scope } = { scope: "global" }) {
    return await this._useSession(async (result) => {
      var _a2;
      const { data, error: sessionError } = result;
      if (sessionError) {
        return this._returnResult({ error: sessionError });
      }
      const accessToken = (_a2 = data.session) === null || _a2 === void 0 ? void 0 : _a2.access_token;
      if (accessToken) {
        const { error } = await this.admin.signOut(accessToken, scope);
        if (error) {
          if (!(isAuthApiError(error) && (error.status === 404 || error.status === 401 || error.status === 403))) {
            return this._returnResult({ error });
          }
        }
      }
      if (scope !== "others") {
        await this._removeSession();
        await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
      }
      return this._returnResult({ error: null });
    });
  }
  onAuthStateChange(callback) {
    const id = uuid();
    const subscription = {
      id,
      callback,
      unsubscribe: () => {
        this._debug("#unsubscribe()", "state change callback with id removed", id);
        this.stateChangeEmitters.delete(id);
      }
    };
    this._debug("#onAuthStateChange()", "registered callback with id", id);
    this.stateChangeEmitters.set(id, subscription);
    (async () => {
      await this.initializePromise;
      await this._acquireLock(-1, async () => {
        this._emitInitialSession(id);
      });
    })();
    return { data: { subscription } };
  }
  async _emitInitialSession(id) {
    return await this._useSession(async (result) => {
      var _a2, _b;
      try {
        const { data: { session }, error } = result;
        if (error)
          throw error;
        await ((_a2 = this.stateChangeEmitters.get(id)) === null || _a2 === void 0 ? void 0 : _a2.callback("INITIAL_SESSION", session));
        this._debug("INITIAL_SESSION", "callback id", id, "session", session);
      } catch (err) {
        await ((_b = this.stateChangeEmitters.get(id)) === null || _b === void 0 ? void 0 : _b.callback("INITIAL_SESSION", null));
        this._debug("INITIAL_SESSION", "callback id", id, "error", err);
        console.error(err);
      }
    });
  }
  /**
   * Sends a password reset request to an email address. This method supports the PKCE flow.
   *
   * @param email The email address of the user.
   * @param options.redirectTo The URL to send the user to after they click the password reset link.
   * @param options.captchaToken Verification token received when the user completes the captcha on the site.
   */
  async resetPasswordForEmail(email, options = {}) {
    let codeChallenge = null;
    let codeChallengeMethod = null;
    if (this.flowType === "pkce") {
      ;
      [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(
        this.storage,
        this.storageKey,
        true
        // isPasswordRecovery
      );
    }
    try {
      return await _request(this.fetch, "POST", `${this.url}/recover`, {
        body: {
          email,
          code_challenge: codeChallenge,
          code_challenge_method: codeChallengeMethod,
          gotrue_meta_security: { captcha_token: options.captchaToken }
        },
        headers: this.headers,
        redirectTo: options.redirectTo
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  /**
   * Gets all the identities linked to a user.
   */
  async getUserIdentities() {
    var _a2;
    try {
      const { data, error } = await this.getUser();
      if (error)
        throw error;
      return this._returnResult({ data: { identities: (_a2 = data.user.identities) !== null && _a2 !== void 0 ? _a2 : [] }, error: null });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async linkIdentity(credentials) {
    if ("token" in credentials) {
      return this.linkIdentityIdToken(credentials);
    }
    return this.linkIdentityOAuth(credentials);
  }
  async linkIdentityOAuth(credentials) {
    var _a2;
    try {
      const { data, error } = await this._useSession(async (result) => {
        var _a3, _b, _c, _d, _e;
        const { data: data2, error: error2 } = result;
        if (error2)
          throw error2;
        const url = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, credentials.provider, {
          redirectTo: (_a3 = credentials.options) === null || _a3 === void 0 ? void 0 : _a3.redirectTo,
          scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
          queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
          skipBrowserRedirect: true
        });
        return await _request(this.fetch, "GET", url, {
          headers: this.headers,
          jwt: (_e = (_d = data2.session) === null || _d === void 0 ? void 0 : _d.access_token) !== null && _e !== void 0 ? _e : void 0
        });
      });
      if (error)
        throw error;
      if (isBrowser() && !((_a2 = credentials.options) === null || _a2 === void 0 ? void 0 : _a2.skipBrowserRedirect)) {
        window.location.assign(data === null || data === void 0 ? void 0 : data.url);
      }
      return this._returnResult({
        data: { provider: credentials.provider, url: data === null || data === void 0 ? void 0 : data.url },
        error: null
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { provider: credentials.provider, url: null }, error });
      }
      throw error;
    }
  }
  async linkIdentityIdToken(credentials) {
    return await this._useSession(async (result) => {
      var _a2;
      try {
        const { error: sessionError, data: { session } } = result;
        if (sessionError)
          throw sessionError;
        const { options, provider, token, access_token, nonce } = credentials;
        const res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
          headers: this.headers,
          jwt: (_a2 = session === null || session === void 0 ? void 0 : session.access_token) !== null && _a2 !== void 0 ? _a2 : void 0,
          body: {
            provider,
            id_token: token,
            access_token,
            nonce,
            link_identity: true,
            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
          },
          xform: _sessionResponse
        });
        const { data, error } = res;
        if (error) {
          return this._returnResult({ data: { user: null, session: null }, error });
        } else if (!data || !data.session || !data.user) {
          return this._returnResult({
            data: { user: null, session: null },
            error: new AuthInvalidTokenResponseError()
          });
        }
        if (data.session) {
          await this._saveSession(data.session);
          await this._notifyAllSubscribers("USER_UPDATED", data.session);
        }
        return this._returnResult({ data, error });
      } catch (error) {
        if (isAuthError(error)) {
          return this._returnResult({ data: { user: null, session: null }, error });
        }
        throw error;
      }
    });
  }
  /**
   * Unlinks an identity from a user by deleting it. The user will no longer be able to sign in with that identity once it's unlinked.
   */
  async unlinkIdentity(identity) {
    try {
      return await this._useSession(async (result) => {
        var _a2, _b;
        const { data, error } = result;
        if (error) {
          throw error;
        }
        return await _request(this.fetch, "DELETE", `${this.url}/user/identities/${identity.identity_id}`, {
          headers: this.headers,
          jwt: (_b = (_a2 = data.session) === null || _a2 === void 0 ? void 0 : _a2.access_token) !== null && _b !== void 0 ? _b : void 0
        });
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  /**
   * Generates a new JWT.
   * @param refreshToken A valid refresh token that was returned on login.
   */
  async _refreshAccessToken(refreshToken) {
    const debugName = `#_refreshAccessToken(${refreshToken.substring(0, 5)}...)`;
    this._debug(debugName, "begin");
    try {
      const startedAt = Date.now();
      return await retryable(async (attempt) => {
        if (attempt > 0) {
          await sleep(200 * Math.pow(2, attempt - 1));
        }
        this._debug(debugName, "refreshing attempt", attempt);
        return await _request(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
          body: { refresh_token: refreshToken },
          headers: this.headers,
          xform: _sessionResponse
        });
      }, (attempt, error) => {
        const nextBackOffInterval = 200 * Math.pow(2, attempt);
        return error && isAuthRetryableFetchError(error) && // retryable only if the request can be sent before the backoff overflows the tick duration
        Date.now() + nextBackOffInterval - startedAt < AUTO_REFRESH_TICK_DURATION_MS;
      });
    } catch (error) {
      this._debug(debugName, "error", error);
      if (isAuthError(error)) {
        return this._returnResult({ data: { session: null, user: null }, error });
      }
      throw error;
    } finally {
      this._debug(debugName, "end");
    }
  }
  _isValidSession(maybeSession) {
    const isValidSession = typeof maybeSession === "object" && maybeSession !== null && "access_token" in maybeSession && "refresh_token" in maybeSession && "expires_at" in maybeSession;
    return isValidSession;
  }
  async _handleProviderSignIn(provider, options) {
    const url = await this._getUrlForProvider(`${this.url}/authorize`, provider, {
      redirectTo: options.redirectTo,
      scopes: options.scopes,
      queryParams: options.queryParams
    });
    this._debug("#_handleProviderSignIn()", "provider", provider, "options", options, "url", url);
    if (isBrowser() && !options.skipBrowserRedirect) {
      window.location.assign(url);
    }
    return { data: { provider, url }, error: null };
  }
  /**
   * Recovers the session from LocalStorage and refreshes the token
   * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
   */
  async _recoverAndRefresh() {
    var _a2, _b;
    const debugName = "#_recoverAndRefresh()";
    this._debug(debugName, "begin");
    try {
      const currentSession = await getItemAsync(this.storage, this.storageKey);
      if (currentSession && this.userStorage) {
        let maybeUser = await getItemAsync(this.userStorage, this.storageKey + "-user");
        if (!this.storage.isServer && Object.is(this.storage, this.userStorage) && !maybeUser) {
          maybeUser = { user: currentSession.user };
          await setItemAsync(this.userStorage, this.storageKey + "-user", maybeUser);
        }
        currentSession.user = (_a2 = maybeUser === null || maybeUser === void 0 ? void 0 : maybeUser.user) !== null && _a2 !== void 0 ? _a2 : userNotAvailableProxy();
      } else if (currentSession && !currentSession.user) {
        if (!currentSession.user) {
          const separateUser = await getItemAsync(this.storage, this.storageKey + "-user");
          if (separateUser && (separateUser === null || separateUser === void 0 ? void 0 : separateUser.user)) {
            currentSession.user = separateUser.user;
            await removeItemAsync(this.storage, this.storageKey + "-user");
            await setItemAsync(this.storage, this.storageKey, currentSession);
          } else {
            currentSession.user = userNotAvailableProxy();
          }
        }
      }
      this._debug(debugName, "session from storage", currentSession);
      if (!this._isValidSession(currentSession)) {
        this._debug(debugName, "session is not valid");
        if (currentSession !== null) {
          await this._removeSession();
        }
        return;
      }
      const expiresWithMargin = ((_b = currentSession.expires_at) !== null && _b !== void 0 ? _b : Infinity) * 1e3 - Date.now() < EXPIRY_MARGIN_MS;
      this._debug(debugName, `session has${expiresWithMargin ? "" : " not"} expired with margin of ${EXPIRY_MARGIN_MS}s`);
      if (expiresWithMargin) {
        if (this.autoRefreshToken && currentSession.refresh_token) {
          const { error } = await this._callRefreshToken(currentSession.refresh_token);
          if (error) {
            console.error(error);
            if (!isAuthRetryableFetchError(error)) {
              this._debug(debugName, "refresh failed with a non-retryable error, removing the session", error);
              await this._removeSession();
            }
          }
        }
      } else if (currentSession.user && currentSession.user.__isUserNotAvailableProxy === true) {
        try {
          const { data, error: userError } = await this._getUser(currentSession.access_token);
          if (!userError && (data === null || data === void 0 ? void 0 : data.user)) {
            currentSession.user = data.user;
            await this._saveSession(currentSession);
            await this._notifyAllSubscribers("SIGNED_IN", currentSession);
          } else {
            this._debug(debugName, "could not get user data, skipping SIGNED_IN notification");
          }
        } catch (getUserError) {
          console.error("Error getting user data:", getUserError);
          this._debug(debugName, "error getting user data, skipping SIGNED_IN notification", getUserError);
        }
      } else {
        await this._notifyAllSubscribers("SIGNED_IN", currentSession);
      }
    } catch (err) {
      this._debug(debugName, "error", err);
      console.error(err);
      return;
    } finally {
      this._debug(debugName, "end");
    }
  }
  async _callRefreshToken(refreshToken) {
    var _a2, _b;
    if (!refreshToken) {
      throw new AuthSessionMissingError();
    }
    if (this.refreshingDeferred) {
      return this.refreshingDeferred.promise;
    }
    const debugName = `#_callRefreshToken(${refreshToken.substring(0, 5)}...)`;
    this._debug(debugName, "begin");
    try {
      this.refreshingDeferred = new Deferred();
      const { data, error } = await this._refreshAccessToken(refreshToken);
      if (error)
        throw error;
      if (!data.session)
        throw new AuthSessionMissingError();
      await this._saveSession(data.session);
      await this._notifyAllSubscribers("TOKEN_REFRESHED", data.session);
      const result = { data: data.session, error: null };
      this.refreshingDeferred.resolve(result);
      return result;
    } catch (error) {
      this._debug(debugName, "error", error);
      if (isAuthError(error)) {
        const result = { data: null, error };
        if (!isAuthRetryableFetchError(error)) {
          await this._removeSession();
        }
        (_a2 = this.refreshingDeferred) === null || _a2 === void 0 ? void 0 : _a2.resolve(result);
        return result;
      }
      (_b = this.refreshingDeferred) === null || _b === void 0 ? void 0 : _b.reject(error);
      throw error;
    } finally {
      this.refreshingDeferred = null;
      this._debug(debugName, "end");
    }
  }
  async _notifyAllSubscribers(event, session, broadcast = true) {
    const debugName = `#_notifyAllSubscribers(${event})`;
    this._debug(debugName, "begin", session, `broadcast = ${broadcast}`);
    try {
      if (this.broadcastChannel && broadcast) {
        this.broadcastChannel.postMessage({ event, session });
      }
      const errors = [];
      const promises = Array.from(this.stateChangeEmitters.values()).map(async (x) => {
        try {
          await x.callback(event, session);
        } catch (e) {
          errors.push(e);
        }
      });
      await Promise.all(promises);
      if (errors.length > 0) {
        for (let i = 0; i < errors.length; i += 1) {
          console.error(errors[i]);
        }
        throw errors[0];
      }
    } finally {
      this._debug(debugName, "end");
    }
  }
  /**
   * set currentSession and currentUser
   * process to _startAutoRefreshToken if possible
   */
  async _saveSession(session) {
    this._debug("#_saveSession()", session);
    this.suppressGetSessionWarning = true;
    const sessionToProcess = Object.assign({}, session);
    const userIsProxy = sessionToProcess.user && sessionToProcess.user.__isUserNotAvailableProxy === true;
    if (this.userStorage) {
      if (!userIsProxy && sessionToProcess.user) {
        await setItemAsync(this.userStorage, this.storageKey + "-user", {
          user: sessionToProcess.user
        });
      } else if (userIsProxy) {
      }
      const mainSessionData = Object.assign({}, sessionToProcess);
      delete mainSessionData.user;
      const clonedMainSessionData = deepClone(mainSessionData);
      await setItemAsync(this.storage, this.storageKey, clonedMainSessionData);
    } else {
      const clonedSession = deepClone(sessionToProcess);
      await setItemAsync(this.storage, this.storageKey, clonedSession);
    }
  }
  async _removeSession() {
    this._debug("#_removeSession()");
    await removeItemAsync(this.storage, this.storageKey);
    await removeItemAsync(this.storage, this.storageKey + "-code-verifier");
    await removeItemAsync(this.storage, this.storageKey + "-user");
    if (this.userStorage) {
      await removeItemAsync(this.userStorage, this.storageKey + "-user");
    }
    await this._notifyAllSubscribers("SIGNED_OUT", null);
  }
  /**
   * Removes any registered visibilitychange callback.
   *
   * {@see #startAutoRefresh}
   * {@see #stopAutoRefresh}
   */
  _removeVisibilityChangedCallback() {
    this._debug("#_removeVisibilityChangedCallback()");
    const callback = this.visibilityChangedCallback;
    this.visibilityChangedCallback = null;
    try {
      if (callback && isBrowser() && (window === null || window === void 0 ? void 0 : window.removeEventListener)) {
        window.removeEventListener("visibilitychange", callback);
      }
    } catch (e) {
      console.error("removing visibilitychange callback failed", e);
    }
  }
  /**
   * This is the private implementation of {@link #startAutoRefresh}. Use this
   * within the library.
   */
  async _startAutoRefresh() {
    await this._stopAutoRefresh();
    this._debug("#_startAutoRefresh()");
    const ticker = setInterval(() => this._autoRefreshTokenTick(), AUTO_REFRESH_TICK_DURATION_MS);
    this.autoRefreshTicker = ticker;
    if (ticker && typeof ticker === "object" && typeof ticker.unref === "function") {
      ticker.unref();
    } else if (typeof Deno !== "undefined" && typeof Deno.unrefTimer === "function") {
      Deno.unrefTimer(ticker);
    }
    setTimeout(async () => {
      await this.initializePromise;
      await this._autoRefreshTokenTick();
    }, 0);
  }
  /**
   * This is the private implementation of {@link #stopAutoRefresh}. Use this
   * within the library.
   */
  async _stopAutoRefresh() {
    this._debug("#_stopAutoRefresh()");
    const ticker = this.autoRefreshTicker;
    this.autoRefreshTicker = null;
    if (ticker) {
      clearInterval(ticker);
    }
  }
  /**
   * Starts an auto-refresh process in the background. The session is checked
   * every few seconds. Close to the time of expiration a process is started to
   * refresh the session. If refreshing fails it will be retried for as long as
   * necessary.
   *
   * If you set the {@link GoTrueClientOptions#autoRefreshToken} you don't need
   * to call this function, it will be called for you.
   *
   * On browsers the refresh process works only when the tab/window is in the
   * foreground to conserve resources as well as prevent race conditions and
   * flooding auth with requests. If you call this method any managed
   * visibility change callback will be removed and you must manage visibility
   * changes on your own.
   *
   * On non-browser platforms the refresh process works *continuously* in the
   * background, which may not be desirable. You should hook into your
   * platform's foreground indication mechanism and call these methods
   * appropriately to conserve resources.
   *
   * {@see #stopAutoRefresh}
   */
  async startAutoRefresh() {
    this._removeVisibilityChangedCallback();
    await this._startAutoRefresh();
  }
  /**
   * Stops an active auto refresh process running in the background (if any).
   *
   * If you call this method any managed visibility change callback will be
   * removed and you must manage visibility changes on your own.
   *
   * See {@link #startAutoRefresh} for more details.
   */
  async stopAutoRefresh() {
    this._removeVisibilityChangedCallback();
    await this._stopAutoRefresh();
  }
  /**
   * Runs the auto refresh token tick.
   */
  async _autoRefreshTokenTick() {
    this._debug("#_autoRefreshTokenTick()", "begin");
    try {
      await this._acquireLock(0, async () => {
        try {
          const now = Date.now();
          try {
            return await this._useSession(async (result) => {
              const { data: { session } } = result;
              if (!session || !session.refresh_token || !session.expires_at) {
                this._debug("#_autoRefreshTokenTick()", "no session");
                return;
              }
              const expiresInTicks = Math.floor((session.expires_at * 1e3 - now) / AUTO_REFRESH_TICK_DURATION_MS);
              this._debug("#_autoRefreshTokenTick()", `access token expires in ${expiresInTicks} ticks, a tick lasts ${AUTO_REFRESH_TICK_DURATION_MS}ms, refresh threshold is ${AUTO_REFRESH_TICK_THRESHOLD} ticks`);
              if (expiresInTicks <= AUTO_REFRESH_TICK_THRESHOLD) {
                await this._callRefreshToken(session.refresh_token);
              }
            });
          } catch (e) {
            console.error("Auto refresh tick failed with error. This is likely a transient error.", e);
          }
        } finally {
          this._debug("#_autoRefreshTokenTick()", "end");
        }
      });
    } catch (e) {
      if (e.isAcquireTimeout || e instanceof LockAcquireTimeoutError) {
        this._debug("auto refresh token tick lock not available");
      } else {
        throw e;
      }
    }
  }
  /**
   * Registers callbacks on the browser / platform, which in-turn run
   * algorithms when the browser window/tab are in foreground. On non-browser
   * platforms it assumes always foreground.
   */
  async _handleVisibilityChange() {
    this._debug("#_handleVisibilityChange()");
    if (!isBrowser() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
      if (this.autoRefreshToken) {
        this.startAutoRefresh();
      }
      return false;
    }
    try {
      this.visibilityChangedCallback = async () => await this._onVisibilityChanged(false);
      window === null || window === void 0 ? void 0 : window.addEventListener("visibilitychange", this.visibilityChangedCallback);
      await this._onVisibilityChanged(true);
    } catch (error) {
      console.error("_handleVisibilityChange", error);
    }
  }
  /**
   * Callback registered with `window.addEventListener('visibilitychange')`.
   */
  async _onVisibilityChanged(calledFromInitialize) {
    const methodName = `#_onVisibilityChanged(${calledFromInitialize})`;
    this._debug(methodName, "visibilityState", document.visibilityState);
    if (document.visibilityState === "visible") {
      if (this.autoRefreshToken) {
        this._startAutoRefresh();
      }
      if (!calledFromInitialize) {
        await this.initializePromise;
        await this._acquireLock(-1, async () => {
          if (document.visibilityState !== "visible") {
            this._debug(methodName, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
            return;
          }
          await this._recoverAndRefresh();
        });
      }
    } else if (document.visibilityState === "hidden") {
      if (this.autoRefreshToken) {
        this._stopAutoRefresh();
      }
    }
  }
  /**
   * Generates the relevant login URL for a third-party provider.
   * @param options.redirectTo A URL or mobile address to send the user to after they are confirmed.
   * @param options.scopes A space-separated list of scopes granted to the OAuth application.
   * @param options.queryParams An object of key-value pairs containing query parameters granted to the OAuth application.
   */
  async _getUrlForProvider(url, provider, options) {
    const urlParams = [`provider=${encodeURIComponent(provider)}`];
    if (options === null || options === void 0 ? void 0 : options.redirectTo) {
      urlParams.push(`redirect_to=${encodeURIComponent(options.redirectTo)}`);
    }
    if (options === null || options === void 0 ? void 0 : options.scopes) {
      urlParams.push(`scopes=${encodeURIComponent(options.scopes)}`);
    }
    if (this.flowType === "pkce") {
      const [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
      const flowParams = new URLSearchParams({
        code_challenge: `${encodeURIComponent(codeChallenge)}`,
        code_challenge_method: `${encodeURIComponent(codeChallengeMethod)}`
      });
      urlParams.push(flowParams.toString());
    }
    if (options === null || options === void 0 ? void 0 : options.queryParams) {
      const query = new URLSearchParams(options.queryParams);
      urlParams.push(query.toString());
    }
    if (options === null || options === void 0 ? void 0 : options.skipBrowserRedirect) {
      urlParams.push(`skip_http_redirect=${options.skipBrowserRedirect}`);
    }
    return `${url}?${urlParams.join("&")}`;
  }
  async _unenroll(params) {
    try {
      return await this._useSession(async (result) => {
        var _a2;
        const { data: sessionData, error: sessionError } = result;
        if (sessionError) {
          return this._returnResult({ data: null, error: sessionError });
        }
        return await _request(this.fetch, "DELETE", `${this.url}/factors/${params.factorId}`, {
          headers: this.headers,
          jwt: (_a2 = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a2 === void 0 ? void 0 : _a2.access_token
        });
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async _enroll(params) {
    try {
      return await this._useSession(async (result) => {
        var _a2, _b;
        const { data: sessionData, error: sessionError } = result;
        if (sessionError) {
          return this._returnResult({ data: null, error: sessionError });
        }
        const body = Object.assign({ friendly_name: params.friendlyName, factor_type: params.factorType }, params.factorType === "phone" ? { phone: params.phone } : params.factorType === "totp" ? { issuer: params.issuer } : {});
        const { data, error } = await _request(this.fetch, "POST", `${this.url}/factors`, {
          body,
          headers: this.headers,
          jwt: (_a2 = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a2 === void 0 ? void 0 : _a2.access_token
        });
        if (error) {
          return this._returnResult({ data: null, error });
        }
        if (params.factorType === "totp" && data.type === "totp" && ((_b = data === null || data === void 0 ? void 0 : data.totp) === null || _b === void 0 ? void 0 : _b.qr_code)) {
          data.totp.qr_code = `data:image/svg+xml;utf-8,${data.totp.qr_code}`;
        }
        return this._returnResult({ data, error: null });
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async _verify(params) {
    return this._acquireLock(-1, async () => {
      try {
        return await this._useSession(async (result) => {
          var _a2;
          const { data: sessionData, error: sessionError } = result;
          if (sessionError) {
            return this._returnResult({ data: null, error: sessionError });
          }
          const body = Object.assign({ challenge_id: params.challengeId }, "webauthn" in params ? {
            webauthn: Object.assign(Object.assign({}, params.webauthn), { credential_response: params.webauthn.type === "create" ? serializeCredentialCreationResponse(params.webauthn.credential_response) : serializeCredentialRequestResponse(params.webauthn.credential_response) })
          } : { code: params.code });
          const { data, error } = await _request(this.fetch, "POST", `${this.url}/factors/${params.factorId}/verify`, {
            body,
            headers: this.headers,
            jwt: (_a2 = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a2 === void 0 ? void 0 : _a2.access_token
          });
          if (error) {
            return this._returnResult({ data: null, error });
          }
          await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + data.expires_in }, data));
          await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", data);
          return this._returnResult({ data, error });
        });
      } catch (error) {
        if (isAuthError(error)) {
          return this._returnResult({ data: null, error });
        }
        throw error;
      }
    });
  }
  async _challenge(params) {
    return this._acquireLock(-1, async () => {
      try {
        return await this._useSession(async (result) => {
          var _a2;
          const { data: sessionData, error: sessionError } = result;
          if (sessionError) {
            return this._returnResult({ data: null, error: sessionError });
          }
          const response = await _request(this.fetch, "POST", `${this.url}/factors/${params.factorId}/challenge`, {
            body: params,
            headers: this.headers,
            jwt: (_a2 = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a2 === void 0 ? void 0 : _a2.access_token
          });
          if (response.error) {
            return response;
          }
          const { data } = response;
          if (data.type !== "webauthn") {
            return { data, error: null };
          }
          switch (data.webauthn.type) {
            case "create":
              return {
                data: Object.assign(Object.assign({}, data), { webauthn: Object.assign(Object.assign({}, data.webauthn), { credential_options: Object.assign(Object.assign({}, data.webauthn.credential_options), { publicKey: deserializeCredentialCreationOptions(data.webauthn.credential_options.publicKey) }) }) }),
                error: null
              };
            case "request":
              return {
                data: Object.assign(Object.assign({}, data), { webauthn: Object.assign(Object.assign({}, data.webauthn), { credential_options: Object.assign(Object.assign({}, data.webauthn.credential_options), { publicKey: deserializeCredentialRequestOptions(data.webauthn.credential_options.publicKey) }) }) }),
                error: null
              };
          }
        });
      } catch (error) {
        if (isAuthError(error)) {
          return this._returnResult({ data: null, error });
        }
        throw error;
      }
    });
  }
  /**
   * {@see GoTrueMFAApi#challengeAndVerify}
   */
  async _challengeAndVerify(params) {
    const { data: challengeData, error: challengeError } = await this._challenge({
      factorId: params.factorId
    });
    if (challengeError) {
      return this._returnResult({ data: null, error: challengeError });
    }
    return await this._verify({
      factorId: params.factorId,
      challengeId: challengeData.id,
      code: params.code
    });
  }
  /**
   * {@see GoTrueMFAApi#listFactors}
   */
  async _listFactors() {
    var _a2;
    const { data: { user }, error: userError } = await this.getUser();
    if (userError) {
      return { data: null, error: userError };
    }
    const data = {
      all: [],
      phone: [],
      totp: [],
      webauthn: []
    };
    for (const factor of (_a2 = user === null || user === void 0 ? void 0 : user.factors) !== null && _a2 !== void 0 ? _a2 : []) {
      data.all.push(factor);
      if (factor.status === "verified") {
        ;
        data[factor.factor_type].push(factor);
      }
    }
    return {
      data,
      error: null
    };
  }
  /**
   * {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
   */
  async _getAuthenticatorAssuranceLevel() {
    var _a2, _b;
    const { data: { session }, error: sessionError } = await this.getSession();
    if (sessionError) {
      return this._returnResult({ data: null, error: sessionError });
    }
    if (!session) {
      return {
        data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
        error: null
      };
    }
    const { payload } = decodeJWT(session.access_token);
    let currentLevel = null;
    if (payload.aal) {
      currentLevel = payload.aal;
    }
    let nextLevel = currentLevel;
    const verifiedFactors = (_b = (_a2 = session.user.factors) === null || _a2 === void 0 ? void 0 : _a2.filter((factor) => factor.status === "verified")) !== null && _b !== void 0 ? _b : [];
    if (verifiedFactors.length > 0) {
      nextLevel = "aal2";
    }
    const currentAuthenticationMethods = payload.amr || [];
    return { data: { currentLevel, nextLevel, currentAuthenticationMethods }, error: null };
  }
  /**
   * Retrieves details about an OAuth authorization request.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   *
   * Returns authorization details including client info, scopes, and user information.
   * If the API returns a redirect_uri, it means consent was already given - the caller
   * should handle the redirect manually if needed.
   */
  async _getAuthorizationDetails(authorizationId) {
    try {
      return await this._useSession(async (result) => {
        const { data: { session }, error: sessionError } = result;
        if (sessionError) {
          return this._returnResult({ data: null, error: sessionError });
        }
        if (!session) {
          return this._returnResult({ data: null, error: new AuthSessionMissingError() });
        }
        return await _request(this.fetch, "GET", `${this.url}/oauth/authorizations/${authorizationId}`, {
          headers: this.headers,
          jwt: session.access_token,
          xform: (data) => ({ data, error: null })
        });
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  /**
   * Approves an OAuth authorization request.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   */
  async _approveAuthorization(authorizationId, options) {
    try {
      return await this._useSession(async (result) => {
        const { data: { session }, error: sessionError } = result;
        if (sessionError) {
          return this._returnResult({ data: null, error: sessionError });
        }
        if (!session) {
          return this._returnResult({ data: null, error: new AuthSessionMissingError() });
        }
        const response = await _request(this.fetch, "POST", `${this.url}/oauth/authorizations/${authorizationId}/consent`, {
          headers: this.headers,
          jwt: session.access_token,
          body: { action: "approve" },
          xform: (data) => ({ data, error: null })
        });
        if (response.data && response.data.redirect_url) {
          if (isBrowser() && !(options === null || options === void 0 ? void 0 : options.skipBrowserRedirect)) {
            window.location.assign(response.data.redirect_url);
          }
        }
        return response;
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  /**
   * Denies an OAuth authorization request.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   */
  async _denyAuthorization(authorizationId, options) {
    try {
      return await this._useSession(async (result) => {
        const { data: { session }, error: sessionError } = result;
        if (sessionError) {
          return this._returnResult({ data: null, error: sessionError });
        }
        if (!session) {
          return this._returnResult({ data: null, error: new AuthSessionMissingError() });
        }
        const response = await _request(this.fetch, "POST", `${this.url}/oauth/authorizations/${authorizationId}/consent`, {
          headers: this.headers,
          jwt: session.access_token,
          body: { action: "deny" },
          xform: (data) => ({ data, error: null })
        });
        if (response.data && response.data.redirect_url) {
          if (isBrowser() && !(options === null || options === void 0 ? void 0 : options.skipBrowserRedirect)) {
            window.location.assign(response.data.redirect_url);
          }
        }
        return response;
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async fetchJwk(kid, jwks = { keys: [] }) {
    let jwk = jwks.keys.find((key) => key.kid === kid);
    if (jwk) {
      return jwk;
    }
    const now = Date.now();
    jwk = this.jwks.keys.find((key) => key.kid === kid);
    if (jwk && this.jwks_cached_at + JWKS_TTL > now) {
      return jwk;
    }
    const { data, error } = await _request(this.fetch, "GET", `${this.url}/.well-known/jwks.json`, {
      headers: this.headers
    });
    if (error) {
      throw error;
    }
    if (!data.keys || data.keys.length === 0) {
      return null;
    }
    this.jwks = data;
    this.jwks_cached_at = now;
    jwk = data.keys.find((key) => key.kid === kid);
    if (!jwk) {
      return null;
    }
    return jwk;
  }
  /**
   * Extracts the JWT claims present in the access token by first verifying the
   * JWT against the server's JSON Web Key Set endpoint
   * `/.well-known/jwks.json` which is often cached, resulting in significantly
   * faster responses. Prefer this method over {@link #getUser} which always
   * sends a request to the Auth server for each JWT.
   *
   * If the project is not using an asymmetric JWT signing key (like ECC or
   * RSA) it always sends a request to the Auth server (similar to {@link
   * #getUser}) to verify the JWT.
   *
   * @param jwt An optional specific JWT you wish to verify, not the one you
   *            can obtain from {@link #getSession}.
   * @param options Various additional options that allow you to customize the
   *                behavior of this method.
   */
  async getClaims(jwt, options = {}) {
    try {
      let token = jwt;
      if (!token) {
        const { data, error } = await this.getSession();
        if (error || !data.session) {
          return this._returnResult({ data: null, error });
        }
        token = data.session.access_token;
      }
      const { header, payload, signature, raw: { header: rawHeader, payload: rawPayload } } = decodeJWT(token);
      if (!(options === null || options === void 0 ? void 0 : options.allowExpired)) {
        validateExp(payload.exp);
      }
      const signingKey = !header.alg || header.alg.startsWith("HS") || !header.kid || !("crypto" in globalThis && "subtle" in globalThis.crypto) ? null : await this.fetchJwk(header.kid, (options === null || options === void 0 ? void 0 : options.keys) ? { keys: options.keys } : options === null || options === void 0 ? void 0 : options.jwks);
      if (!signingKey) {
        const { error } = await this.getUser(token);
        if (error) {
          throw error;
        }
        return {
          data: {
            claims: payload,
            header,
            signature
          },
          error: null
        };
      }
      const algorithm = getAlgorithm(header.alg);
      const publicKey = await crypto.subtle.importKey("jwk", signingKey, algorithm, true, [
        "verify"
      ]);
      const isValid = await crypto.subtle.verify(algorithm, publicKey, signature, stringToUint8Array(`${rawHeader}.${rawPayload}`));
      if (!isValid) {
        throw new AuthInvalidJwtError("Invalid JWT signature");
      }
      return {
        data: {
          claims: payload,
          header,
          signature
        },
        error: null
      };
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
};
__name(GoTrueClient, "GoTrueClient");
GoTrueClient.nextInstanceID = {};
var GoTrueClient_default = GoTrueClient;

// node_modules/@supabase/auth-js/dist/module/AuthAdminApi.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// node_modules/@supabase/auth-js/dist/module/AuthClient.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var AuthClient = GoTrueClient_default;
var AuthClient_default = AuthClient;

// node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js
var SupabaseAuthClient = class extends AuthClient_default {
  constructor(options) {
    super(options);
  }
};
__name(SupabaseAuthClient, "SupabaseAuthClient");

// node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js
var SupabaseClient = class {
  /**
   * Create a new client for use in the browser.
   * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
   * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
   * @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
   * @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
   * @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
   * @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
   * @param options.realtime Options passed along to realtime-js constructor.
   * @param options.storage Options passed along to the storage-js constructor.
   * @param options.global.fetch A custom fetch implementation.
   * @param options.global.headers Any additional headers to send with each network request.
   */
  constructor(supabaseUrl, supabaseKey, options) {
    var _a2, _b, _c;
    this.supabaseUrl = supabaseUrl;
    this.supabaseKey = supabaseKey;
    const baseUrl = validateSupabaseUrl(supabaseUrl);
    if (!supabaseKey)
      throw new Error("supabaseKey is required.");
    this.realtimeUrl = new URL("realtime/v1", baseUrl);
    this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws");
    this.authUrl = new URL("auth/v1", baseUrl);
    this.storageUrl = new URL("storage/v1", baseUrl);
    this.functionsUrl = new URL("functions/v1", baseUrl);
    const defaultStorageKey = `sb-${baseUrl.hostname.split(".")[0]}-auth-token`;
    const DEFAULTS = {
      db: DEFAULT_DB_OPTIONS,
      realtime: DEFAULT_REALTIME_OPTIONS,
      auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), { storageKey: defaultStorageKey }),
      global: DEFAULT_GLOBAL_OPTIONS
    };
    const settings = applySettingDefaults(options !== null && options !== void 0 ? options : {}, DEFAULTS);
    this.storageKey = (_a2 = settings.auth.storageKey) !== null && _a2 !== void 0 ? _a2 : "";
    this.headers = (_b = settings.global.headers) !== null && _b !== void 0 ? _b : {};
    if (!settings.accessToken) {
      this.auth = this._initSupabaseAuthClient((_c = settings.auth) !== null && _c !== void 0 ? _c : {}, this.headers, settings.global.fetch);
    } else {
      this.accessToken = settings.accessToken;
      this.auth = new Proxy({}, {
        get: (_, prop) => {
          throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(prop)} is not possible`);
        }
      });
    }
    this.fetch = fetchWithAuth(supabaseKey, this._getAccessToken.bind(this), settings.global.fetch);
    this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers, accessToken: this._getAccessToken.bind(this) }, settings.realtime));
    this.rest = new PostgrestClient(new URL("rest/v1", baseUrl).href, {
      headers: this.headers,
      schema: settings.db.schema,
      fetch: this.fetch
    });
    this.storage = new StorageClient(this.storageUrl.href, this.headers, this.fetch, options === null || options === void 0 ? void 0 : options.storage);
    if (!settings.accessToken) {
      this._listenForAuthEvents();
    }
  }
  /**
   * Supabase Functions allows you to deploy and invoke edge functions.
   */
  get functions() {
    return new FunctionsClient(this.functionsUrl.href, {
      headers: this.headers,
      customFetch: this.fetch
    });
  }
  /**
   * Perform a query on a table or a view.
   *
   * @param relation - The table or view name to query
   */
  from(relation) {
    return this.rest.from(relation);
  }
  // NOTE: signatures must be kept in sync with PostgrestClient.schema
  /**
   * Select a schema to query or perform an function (rpc) call.
   *
   * The schema needs to be on the list of exposed schemas inside Supabase.
   *
   * @param schema - The schema to query
   */
  schema(schema) {
    return this.rest.schema(schema);
  }
  // NOTE: signatures must be kept in sync with PostgrestClient.rpc
  /**
   * Perform a function call.
   *
   * @param fn - The function name to call
   * @param args - The arguments to pass to the function call
   * @param options - Named parameters
   * @param options.head - When set to `true`, `data` will not be returned.
   * Useful if you only need the count.
   * @param options.get - When set to `true`, the function will be called with
   * read-only access mode.
   * @param options.count - Count algorithm to use to count rows returned by the
   * function. Only applicable for [set-returning
   * functions](https://www.postgresql.org/docs/current/functions-srf.html).
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  rpc(fn, args = {}, options = {
    head: false,
    get: false,
    count: void 0
  }) {
    return this.rest.rpc(fn, args, options);
  }
  /**
   * Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
   *
   * @param {string} name - The name of the Realtime channel.
   * @param {Object} opts - The options to pass to the Realtime channel.
   *
   */
  channel(name, opts = { config: {} }) {
    return this.realtime.channel(name, opts);
  }
  /**
   * Returns all Realtime channels.
   */
  getChannels() {
    return this.realtime.getChannels();
  }
  /**
   * Unsubscribes and removes Realtime channel from Realtime client.
   *
   * @param {RealtimeChannel} channel - The name of the Realtime channel.
   *
   */
  removeChannel(channel) {
    return this.realtime.removeChannel(channel);
  }
  /**
   * Unsubscribes and removes all Realtime channels from Realtime client.
   */
  removeAllChannels() {
    return this.realtime.removeAllChannels();
  }
  async _getAccessToken() {
    var _a2, _b;
    if (this.accessToken) {
      return await this.accessToken();
    }
    const { data } = await this.auth.getSession();
    return (_b = (_a2 = data.session) === null || _a2 === void 0 ? void 0 : _a2.access_token) !== null && _b !== void 0 ? _b : this.supabaseKey;
  }
  _initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, storage, userStorage, storageKey, flowType, lock, debug, throwOnError }, headers, fetch2) {
    const authHeaders = {
      Authorization: `Bearer ${this.supabaseKey}`,
      apikey: `${this.supabaseKey}`
    };
    return new SupabaseAuthClient({
      url: this.authUrl.href,
      headers: Object.assign(Object.assign({}, authHeaders), headers),
      storageKey,
      autoRefreshToken,
      persistSession,
      detectSessionInUrl,
      storage,
      userStorage,
      flowType,
      lock,
      debug,
      throwOnError,
      fetch: fetch2,
      // auth checks if there is a custom authorizaiton header using this flag
      // so it knows whether to return an error when getUser is called with no session
      hasCustomAuthorizationHeader: Object.keys(this.headers).some((key) => key.toLowerCase() === "authorization")
    });
  }
  _initRealtimeClient(options) {
    return new RealtimeClient(this.realtimeUrl.href, Object.assign(Object.assign({}, options), { params: Object.assign({ apikey: this.supabaseKey }, options === null || options === void 0 ? void 0 : options.params) }));
  }
  _listenForAuthEvents() {
    const data = this.auth.onAuthStateChange((event, session) => {
      this._handleTokenChanged(event, "CLIENT", session === null || session === void 0 ? void 0 : session.access_token);
    });
    return data;
  }
  _handleTokenChanged(event, source, token) {
    if ((event === "TOKEN_REFRESHED" || event === "SIGNED_IN") && this.changedAccessToken !== token) {
      this.changedAccessToken = token;
      this.realtime.setAuth(token);
    } else if (event === "SIGNED_OUT") {
      this.realtime.setAuth();
      if (source == "STORAGE")
        this.auth.signOut();
      this.changedAccessToken = void 0;
    }
  }
};
__name(SupabaseClient, "SupabaseClient");

// node_modules/@supabase/supabase-js/dist/module/index.js
var createClient = /* @__PURE__ */ __name((supabaseUrl, supabaseKey, options) => {
  return new SupabaseClient(supabaseUrl, supabaseKey, options);
}, "createClient");
function shouldShowDeprecationWarning() {
  if (typeof window !== "undefined") {
    return false;
  }
  if (typeof process === "undefined") {
    return false;
  }
  const processVersion = process["version"];
  if (processVersion === void 0 || processVersion === null) {
    return false;
  }
  const versionMatch = processVersion.match(/^v(\d+)\./);
  if (!versionMatch) {
    return false;
  }
  const majorVersion = parseInt(versionMatch[1], 10);
  return majorVersion <= 18;
}
__name(shouldShowDeprecationWarning, "shouldShowDeprecationWarning");
if (shouldShowDeprecationWarning()) {
  console.warn(`\u26A0\uFE0F  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217`);
}

// src/index.js
var import_bcryptjs = __toESM(require_bcrypt(), 1);

// node_modules/@tsndr/cloudflare-worker-jwt/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
function bytesToByteString(bytes) {
  let byteStr = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    byteStr += String.fromCharCode(bytes[i]);
  }
  return byteStr;
}
__name(bytesToByteString, "bytesToByteString");
function byteStringToBytes(byteStr) {
  let bytes = new Uint8Array(byteStr.length);
  for (let i = 0; i < byteStr.length; i++) {
    bytes[i] = byteStr.charCodeAt(i);
  }
  return bytes;
}
__name(byteStringToBytes, "byteStringToBytes");
function arrayBufferToBase64String(arrayBuffer) {
  return btoa(bytesToByteString(new Uint8Array(arrayBuffer)));
}
__name(arrayBufferToBase64String, "arrayBufferToBase64String");
function base64StringToArrayBuffer(b64str) {
  return byteStringToBytes(atob(b64str)).buffer;
}
__name(base64StringToArrayBuffer, "base64StringToArrayBuffer");
function textToArrayBuffer(str) {
  return byteStringToBytes(str);
}
__name(textToArrayBuffer, "textToArrayBuffer");
function arrayBufferToBase64Url(arrayBuffer) {
  return arrayBufferToBase64String(arrayBuffer).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
__name(arrayBufferToBase64Url, "arrayBufferToBase64Url");
function base64UrlToArrayBuffer(b64url) {
  return base64StringToArrayBuffer(b64url.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, ""));
}
__name(base64UrlToArrayBuffer, "base64UrlToArrayBuffer");
function textToBase64Url(str) {
  const encoder = new TextEncoder();
  const charCodes = encoder.encode(str);
  const binaryStr = String.fromCharCode(...charCodes);
  return btoa(binaryStr).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
__name(textToBase64Url, "textToBase64Url");
function pemToBinary(pem) {
  return base64StringToArrayBuffer(pem.replace(/-+(BEGIN|END).*/g, "").replace(/\s/g, ""));
}
__name(pemToBinary, "pemToBinary");
async function importTextSecret(key, algorithm, keyUsages) {
  return await crypto.subtle.importKey("raw", textToArrayBuffer(key), algorithm, true, keyUsages);
}
__name(importTextSecret, "importTextSecret");
async function importJwk(key, algorithm, keyUsages) {
  return await crypto.subtle.importKey("jwk", key, algorithm, true, keyUsages);
}
__name(importJwk, "importJwk");
async function importPublicKey(key, algorithm, keyUsages) {
  return await crypto.subtle.importKey("spki", pemToBinary(key), algorithm, true, keyUsages);
}
__name(importPublicKey, "importPublicKey");
async function importPrivateKey(key, algorithm, keyUsages) {
  return await crypto.subtle.importKey("pkcs8", pemToBinary(key), algorithm, true, keyUsages);
}
__name(importPrivateKey, "importPrivateKey");
async function importKey(key, algorithm, keyUsages) {
  if (typeof key === "object")
    return importJwk(key, algorithm, keyUsages);
  if (typeof key !== "string")
    throw new Error("Unsupported key type!");
  if (key.includes("PUBLIC"))
    return importPublicKey(key, algorithm, keyUsages);
  if (key.includes("PRIVATE"))
    return importPrivateKey(key, algorithm, keyUsages);
  return importTextSecret(key, algorithm, keyUsages);
}
__name(importKey, "importKey");
function decodePayload(raw2) {
  try {
    const bytes = Array.from(atob(raw2), (char) => char.charCodeAt(0));
    const decodedString = new TextDecoder("utf-8").decode(new Uint8Array(bytes));
    return JSON.parse(decodedString);
  } catch {
    return;
  }
}
__name(decodePayload, "decodePayload");
if (typeof crypto === "undefined" || !crypto.subtle)
  throw new Error("SubtleCrypto not supported!");
var algorithms = {
  ES256: { name: "ECDSA", namedCurve: "P-256", hash: { name: "SHA-256" } },
  ES384: { name: "ECDSA", namedCurve: "P-384", hash: { name: "SHA-384" } },
  ES512: { name: "ECDSA", namedCurve: "P-521", hash: { name: "SHA-512" } },
  HS256: { name: "HMAC", hash: { name: "SHA-256" } },
  HS384: { name: "HMAC", hash: { name: "SHA-384" } },
  HS512: { name: "HMAC", hash: { name: "SHA-512" } },
  RS256: { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } },
  RS384: { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-384" } },
  RS512: { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-512" } }
};
async function sign(payload, secret, options = "HS256") {
  if (typeof options === "string")
    options = { algorithm: options };
  options = { algorithm: "HS256", header: { typ: "JWT" }, ...options };
  if (!payload || typeof payload !== "object")
    throw new Error("payload must be an object");
  if (!secret || typeof secret !== "string" && typeof secret !== "object")
    throw new Error("secret must be a string, a JWK object or a CryptoKey object");
  if (typeof options.algorithm !== "string")
    throw new Error("options.algorithm must be a string");
  const algorithm = algorithms[options.algorithm];
  if (!algorithm)
    throw new Error("algorithm not found");
  if (!payload.iat)
    payload.iat = Math.floor(Date.now() / 1e3);
  const partialToken = `${textToBase64Url(JSON.stringify({ ...options.header, alg: options.algorithm }))}.${textToBase64Url(JSON.stringify(payload))}`;
  const key = secret instanceof CryptoKey ? secret : await importKey(secret, algorithm, ["sign"]);
  const signature = await crypto.subtle.sign(algorithm, key, textToArrayBuffer(partialToken));
  return `${partialToken}.${arrayBufferToBase64Url(signature)}`;
}
__name(sign, "sign");
async function verify(token, secret, options = "HS256") {
  if (typeof options === "string")
    options = { algorithm: options };
  options = { algorithm: "HS256", clockTolerance: 0, throwError: false, ...options };
  if (typeof token !== "string")
    throw new Error("token must be a string");
  if (typeof secret !== "string" && typeof secret !== "object")
    throw new Error("secret must be a string, a JWK object or a CryptoKey object");
  if (typeof options.algorithm !== "string")
    throw new Error("options.algorithm must be a string");
  const tokenParts = token.split(".");
  if (tokenParts.length !== 3)
    throw new Error("token must consist of 3 parts");
  const algorithm = algorithms[options.algorithm];
  if (!algorithm)
    throw new Error("algorithm not found");
  const { header, payload } = decode(token);
  if (header?.alg !== options.algorithm) {
    if (options.throwError)
      throw new Error("ALG_MISMATCH");
    return false;
  }
  try {
    if (!payload)
      throw new Error("PARSE_ERROR");
    const now = Math.floor(Date.now() / 1e3);
    if (payload.nbf && payload.nbf > now && payload.nbf - now > (options.clockTolerance ?? 0))
      throw new Error("NOT_YET_VALID");
    if (payload.exp && payload.exp <= now && now - payload.exp > (options.clockTolerance ?? 0))
      throw new Error("EXPIRED");
    const key = secret instanceof CryptoKey ? secret : await importKey(secret, algorithm, ["verify"]);
    return await crypto.subtle.verify(algorithm, key, base64UrlToArrayBuffer(tokenParts[2]), textToArrayBuffer(`${tokenParts[0]}.${tokenParts[1]}`));
  } catch (err) {
    if (options.throwError)
      throw err;
    return false;
  }
}
__name(verify, "verify");
function decode(token) {
  return {
    header: decodePayload(token.split(".")[0].replace(/-/g, "+").replace(/_/g, "/")),
    payload: decodePayload(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
  };
}
__name(decode, "decode");
var src_default = {
  sign,
  verify,
  decode
};

// src/index.js
var app = new Hono2();
var allowedOrigins = [
  "http://localhost:3000",
  "https://chatbot.prosperonline.ca"
];
app.use("/api/auth/*", cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use("/api/chatbots/*", cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use("/api/chat", cors({
  origin: "*"
}));
app.use("/widget.js", cors({
  origin: "*"
}));
app.use("*", async (c, next) => {
  const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_KEY);
  c.set("supabase", supabase);
  await next();
});
var authenticateToken = /* @__PURE__ */ __name(async (c, next) => {
  const authHeader = c.req.header("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return c.json({ error: "Token required" }, 401);
  }
  try {
    const isValid = await src_default.verify(token, String(c.env.JWT_SECRET));
    if (!isValid) {
      return c.json({ error: "Invalid token" }, 403);
    }
    const payload = src_default.decode(token);
    c.set("user", payload.payload);
    await next();
  } catch (error) {
    return c.json({ error: "Invalid token" }, 403);
  }
}, "authenticateToken");
app.get("/health", (c) => c.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() }));
app.get("/", (c) => c.json({ message: "Chatbot API (Cloudflare)", version: "3.0.0" }));
app.post("/api/auth/register", async (c) => {
  try {
    const { email, password } = await c.req.json();
    if (!email || !password) {
      return c.json({ error: "Email and password required" }, 400);
    }
    const supabase = c.get("supabase");
    const { data: existing } = await supabase.from("users").select("id").eq("email", email.toLowerCase());
    if (existing?.length > 0) {
      return c.json({ error: "Email already registered" }, 400);
    }
    const hash = await import_bcryptjs.default.hash(password, 10);
    const { data, error } = await supabase.from("users").insert([{ email: email.toLowerCase(), password_hash: hash }]).select().single();
    if (error)
      throw error;
    const token = await src_default.sign(
      { userId: data.id, email: data.email },
      String(c.env.JWT_SECRET)
    );
    return c.json({ token, user: { id: data.id, email: data.email } });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});
app.post("/api/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json();
    if (!email || !password) {
      return c.json({ error: "Email and password required" }, 400);
    }
    const supabase = c.get("supabase");
    const { data: users, error } = await supabase.from("users").select("*").eq("email", email.toLowerCase()).single();
    if (error || !users) {
      return c.json({ error: "Invalid credentials" }, 401);
    }
    const valid = await import_bcryptjs.default.compare(password, users.password_hash);
    if (!valid) {
      return c.json({ error: "Invalid credentials" }, 401);
    }
    const token = await src_default.sign(
      { userId: users.id, email: users.email },
      String(c.env.JWT_SECRET)
    );
    return c.json({ token, user: { id: users.id, email: users.email } });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});
app.get("/api/chatbots", authenticateToken, async (c) => {
  try {
    const user = c.get("user");
    const supabase = c.get("supabase");
    const { data, error } = await supabase.from("chatbots").select("*").eq("user_id", user.userId).order("created_at", { ascending: false });
    if (error)
      throw error;
    return c.json(data);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});
app.post("/api/chatbots", authenticateToken, async (c) => {
  try {
    const user = c.get("user");
    const { name, color, welcomeMessage } = await c.req.json();
    const id = "cb_" + Math.random().toString(36).substr(2, 9);
    const supabase = c.get("supabase");
    const { data, error } = await supabase.from("chatbots").insert([{
      id,
      user_id: user.userId,
      name: name || "My Chatbot",
      color: color || "#667eea",
      welcome_message: welcomeMessage || "Hi!"
    }]).select().single();
    if (error)
      throw error;
    return c.json(data);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});
app.put("/api/chatbots/:id", authenticateToken, async (c) => {
  try {
    const user = c.get("user");
    const { name, color, welcomeMessage, isDeployed } = await c.req.json();
    const chatbotId = c.req.param("id");
    const supabase = c.get("supabase");
    const { data, error } = await supabase.from("chatbots").update({ name, color, welcome_message: welcomeMessage, is_deployed: isDeployed }).eq("id", chatbotId).eq("user_id", user.userId).select().single();
    if (error)
      throw error;
    return c.json(data);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});
app.get("/api/chatbots/:id/documents", authenticateToken, async (c) => {
  try {
    const chatbotId = c.req.param("id");
    const supabase = c.get("supabase");
    const { data, error } = await supabase.from("documents").select("*").eq("chatbot_id", chatbotId);
    if (error)
      throw error;
    return c.json(data);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});
app.post("/api/chatbots/:id/documents", authenticateToken, async (c) => {
  try {
    const chatbotId = c.req.param("id");
    const formData = await c.req.formData();
    const file = formData.get("file");
    if (!file) {
      return c.json({ error: "No file uploaded" }, 400);
    }
    const buffer = await file.arrayBuffer();
    const content = new TextDecoder().decode(buffer);
    const supabase = c.get("supabase");
    const { data, error } = await supabase.from("documents").insert([{
      chatbot_id: chatbotId,
      filename: file.name,
      content,
      file_type: file.type,
      file_size: file.size,
      status: "ready"
    }]).select().single();
    if (error)
      throw error;
    return c.json(data);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});
app.delete("/api/chatbots/:id/documents/:docId", authenticateToken, async (c) => {
  try {
    const chatbotId = c.req.param("id");
    const docId = c.req.param("docId");
    const supabase = c.get("supabase");
    const { error } = await supabase.from("documents").delete().eq("id", docId).eq("chatbot_id", chatbotId);
    if (error)
      throw error;
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});
app.post("/api/chat", async (c) => {
  try {
    const { chatbotId, message } = await c.req.json();
    if (!chatbotId || !message) {
      return c.json({ error: "Missing required parameters" }, 400);
    }
    const supabase = c.get("supabase");
    const { data: documents } = await supabase.from("documents").select("content").eq("chatbot_id", chatbotId);
    if (!documents || documents.length === 0) {
      return c.json({ error: "No training data found for this chatbot" }, 404);
    }
    const context = documents.map((doc) => doc.content).join("\\n\\n");
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${c.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a helpful AI assistant. Use the following context to answer questions: ${context}`
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 150
      })
    });
    const data = await response.json();
    return c.json({ response: data.choices[0].message.content });
  } catch (error) {
    return c.json({ error: "Failed to process chat message" }, 500);
  }
});
app.get("/widget.js", async (c) => {
  const widgetCode = `
(function() {
    if (!window.chatbotConfig) {
        console.error('Chatbot configuration not found!');
        return;
    }

    const config = window.chatbotConfig;
    if (!config.chatbotId || !config.apiUrl) {
        console.error('Missing required chatbot configuration!');
        return;
    }

    // Create chatbot UI
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'ai-chatbot-container';
    chatbotContainer.style.cssText = \`
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    \`;

    // Create chat window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'ai-chatbot-window';
    chatWindow.style.cssText = \`
        display: none;
        width: 350px;
        height: 500px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        margin-bottom: 10px;
        overflow: hidden;
        flex-direction: column;
    \`;

    // Chat header
    const chatHeader = document.createElement('div');
    chatHeader.style.cssText = \`
        padding: 15px;
        background: \${config.color || '#667eea'};
        color: white;
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 600;
    \`;
    chatHeader.textContent = config.name || 'AI Chat';

    // Chat messages container
    const messagesContainer = document.createElement('div');
    messagesContainer.style.cssText = \`
        flex: 1;
        padding: 15px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: #f9fafb;
    \`;

    // Input container
    const inputContainer = document.createElement('div');
    inputContainer.style.cssText = \`
        padding: 15px;
        border-top: 1px solid #e5e7eb;
        display: flex;
        gap: 10px;
        background: white;
    \`;

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type your message...';
    input.style.cssText = \`
        flex: 1;
        padding: 8px 12px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 14px;
        outline: none;
    \`;

    const sendButton = document.createElement('button');
    sendButton.textContent = 'Send';
    sendButton.style.cssText = \`
        padding: 8px 16px;
        background: \${config.color || '#667eea'};
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
    \`;

    // Toggle button
    const toggleButton = document.createElement('button');
    toggleButton.style.cssText = \`
        width: 60px;
        height: 60px;
        border-radius: 30px;
        background: \${config.color || '#667eea'};
        color: white;
        border: none;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
    \`;
    toggleButton.innerHTML = '\u{1F4AC}';

    // Assemble UI
    inputContainer.appendChild(input);
    inputContainer.appendChild(sendButton);

    chatWindow.appendChild(chatHeader);
    chatWindow.appendChild(messagesContainer);
    chatWindow.appendChild(inputContainer);

    chatbotContainer.appendChild(chatWindow);
    chatbotContainer.appendChild(toggleButton);

    document.body.appendChild(chatbotContainer);

    // Event handlers
    toggleButton.onclick = () => {
        const isVisible = chatWindow.style.display === 'flex';
        chatWindow.style.display = isVisible ? 'none' : 'flex';
        if (!isVisible) input.focus();
    };

    // Message handling
    function addMessage(text, isUser = false) {
        const message = document.createElement('div');
        message.style.cssText = \`
            padding: 10px 15px;
            border-radius: 10px;
            max-width: 80%;
            \${isUser ? 'background: ' + config.color + '; color: white; align-self: flex-end;' 
                    : 'background: white; border: 1px solid #e5e7eb; align-self: flex-start;'}
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 14px;
        \`;
        message.textContent = text;
        messagesContainer.appendChild(message);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async function sendMessage(text) {
        if (!text.trim()) return;
        
        addMessage(text, true);
        input.value = '';
        input.disabled = true;
        sendButton.disabled = true;

        try {
            const response = await fetch(\`\${config.apiUrl}/api/chat\`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chatbotId: config.chatbotId,
                    message: text
                })
            });

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }

            addMessage(data.response);
        } catch (error) {
            addMessage('Sorry, I encountered an error. Please try again later.');
            console.error('Chat error:', error);
        } finally {
            input.disabled = false;
            sendButton.disabled = false;
            input.focus();
        }
    }

    sendButton.onclick = () => sendMessage(input.value);
    input.onkeypress = (e) => {
        if (e.key === 'Enter') sendMessage(input.value);
    };

    // Add welcome message if provided
    if (config.welcomeMessage) {
        addMessage(config.welcomeMessage);
    }
})();
  `;
  return c.text(widgetCode, 200, {
    "Content-Type": "application/javascript"
  });
});
var src_default2 = app;

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-CDLSIP/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default2;

// node_modules/wrangler/templates/middleware/common.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head2, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head2(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-CDLSIP/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
/*! Bundled license information:

bcryptjs/dist/bcrypt.js:
  (**
   * @license bcrypt.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
   * Released under the Apache License, Version 2.0
   * see: https://github.com/dcodeIO/bcrypt.js for details
   *)
*/
//# sourceMappingURL=index.js.map
