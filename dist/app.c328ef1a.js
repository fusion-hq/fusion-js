// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../dist/module-loader.js":[function(require,module,exports) {
var define;
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

parcelRequire = function (e, r, t, n) {
  var i,
      o = "function" == typeof parcelRequire && parcelRequire,
      u = "function" == typeof require && require;

  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = "function" == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && "string" == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw c.code = "MODULE_NOT_FOUND", c;
      }

      p.resolve = function (r) {
        return e[t][1][r] || r;
      }, p.cache = {};
      var l = r[t] = new f.Module(t);
      e[t][0].call(l.exports, p, l, l.exports, this);
    }

    return r[t].exports;

    function p(e) {
      return f(p.resolve(e));
    }
  }

  f.isParcelRequire = !0, f.Module = function (e) {
    this.id = e, this.bundle = f, this.exports = {};
  }, f.modules = e, f.cache = r, f.parent = o, f.register = function (r, t) {
    e[r] = [function (e, r) {
      r.exports = t;
    }, {}];
  };

  for (var c = 0; c < t.length; c++) {
    try {
      f(t[c]);
    } catch (e) {
      i || (i = e);
    }
  }

  if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () {
      return l;
    }) : n && (this[n] = l);
  }

  if (parcelRequire = f, i) throw i;
  return f;
}({
  "FOZT": [function (require, module, exports) {
    function e(e) {
      for (var r = e + "=", o = document.cookie.split(";"), t = 0; t < o.length; t++) {
        for (var i = o[t]; " " == i.charAt(0);) {
          i = i.substring(1, i.length);
        }

        if (0 == i.indexOf(r)) return i.substring(r.length, i.length);
      }

      return null;
    }

    function r(e, r, o) {
      if (o) {
        var t = new Date();
        t.setTime(t.getTime() + 24 * o * 60 * 60 * 1e3);
        var i = "; expires=" + t.toGMTString();
      } else i = "";

      var n = window.location.hostname;
      document.cookie = e + "=" + r + i + "; path=/; domain=" + n;
    }

    function o() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
        var r = 16 * Math.random() | 0;
        return ("x" == e ? r : 3 & r | 8).toString(16);
      });
    }

    function t(e, r) {
      return -1 !== e.indexOf(r);
    }

    function i(e, r, o) {
      return r = r || "", o || t(e, " OPR/") ? t(e, "Mini") ? "Opera Mini" : "Opera" : /(BlackBerry|PlayBook|BB10)/i.test(e) ? "BlackBerry" : t(e, "IEMobile") || t(e, "WPDesktop") ? "Internet Explorer Mobile" : t(e, "SamsungBrowser/") ? "Samsung Internet" : t(e, "Edge") || t(e, "Edg/") ? "Microsoft Edge" : t(e, "FBIOS") ? "Facebook Mobile" : t(e, "Chrome") ? "Chrome" : t(e, "CriOS") ? "Chrome iOS" : t(e, "UCWEB") || t(e, "UCBrowser") ? "UC Browser" : t(e, "FxiOS") ? "Firefox iOS" : t(r, "Apple") ? t(e, "Mobile") ? "Mobile Safari" : "Safari" : t(e, "Android") ? "Android Mobile" : t(e, "Konqueror") ? "Konqueror" : t(e, "Firefox") ? "Firefox" : t(e, "MSIE") || t(e, "Trident/") ? "Internet Explorer" : t(e, "Gecko") ? "Mozilla" : "";
    }

    function n(e, r, o) {
      var t = {
        "Internet Explorer Mobile": /rv:(\d+(\.\d+)?)/,
        "Microsoft Edge": /Edge?\/(\d+(\.\d+)?)/,
        Chrome: /Chrome\/(\d+(\.\d+)?)/,
        "Chrome iOS": /CriOS\/(\d+(\.\d+)?)/,
        "UC Browser": /(UCBrowser|UCWEB)\/(\d+(\.\d+)?)/,
        Safari: /Version\/(\d+(\.\d+)?)/,
        "Mobile Safari": /Version\/(\d+(\.\d+)?)/,
        Opera: /(Opera|OPR)\/(\d+(\.\d+)?)/,
        Firefox: /Firefox\/(\d+(\.\d+)?)/,
        "Firefox iOS": /FxiOS\/(\d+(\.\d+)?)/,
        Konqueror: /Konqueror:(\d+(\.\d+)?)/,
        BlackBerry: /BlackBerry (\d+(\.\d+)?)/,
        "Android Mobile": /android\s(\d+(\.\d+)?)/,
        "Samsung Internet": /SamsungBrowser\/(\d+(\.\d+)?)/,
        "Internet Explorer": /(rv:|MSIE )(\d+(\.\d+)?)/,
        Mozilla: /rv:(\d+(\.\d+)?)/
      }[i(e, r, o)];
      if (void 0 === t) return null;
      var n = e.match(t);
      return n ? parseFloat(n[n.length - 2]) : null;
    }

    function d(e) {
      var r = e;
      return /Windows/i.test(r) ? /Phone/.test(r) || /WPDesktop/.test(r) ? "Windows Phone" : "Windows" : /(iPhone|iPad|iPod)/.test(r) ? "iOS" : /Android/.test(r) ? "Android" : /(BlackBerry|PlayBook|BB10)/i.test(r) ? "BlackBerry" : /Mac/i.test(r) ? "Mac OS X" : /Linux/.test(r) ? "Linux" : /CrOS/.test(r) ? "Chrome OS" : "";
    }

    function a(e) {
      return /Windows Phone/i.test(e) || /WPDesktop/.test(e) ? "Windows Phone" : /iPad/.test(e) ? "iPad" : /iPod/.test(e) ? "iPod Touch" : /iPhone/.test(e) ? "iPhone" : /(BlackBerry|PlayBook|BB10)/i.test(e) ? "BlackBerry" : /Android/.test(e) && !/Mobile/.test(e) ? "Android Tablet" : /Android/.test(e) ? "Android" : "";
    }

    function s(e) {
      var r = a(e);
      return "iPad" === r || "Android Tablet" === r ? "Tablet" : r ? "Mobile" : "Desktop";
    }

    function l(e) {
      var r = e.split("/");
      return r.length >= 3 ? r[2] : "";
    }

    module.exports = {
      readCookie: e,
      createCookie: r,
      generateUserId: o,
      getBrowser: i,
      getBrowserVersion: n,
      getOS: d,
      getDevice: a,
      getDeviceType: s,
      referringDomain: l
    };
  }, {}],
  "MMjl": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.init_fusion_as_module = s;

    var e = require("./utils");

    function t(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function i(e, t) {
      for (var i = 0; i < t.length; i++) {
        var r = t[i];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function r(e, t, r) {
      return t && i(e.prototype, t), r && i(e, r), e;
    }

    var o = function () {
      function i() {
        t(this, i);
      }

      return r(i, [{
        key: "setup",
        value: function value() {
          var t = this,
              i = (new XMLHttpRequest(), "undefined" != typeof window ? window : {}),
              r = i.navigator || {
            userAgent: ""
          },
              o = i.document || {},
              s = r.userAgent;
          this.path = window.location.pathname, this.host = window.location.host;
          var n = o.referrer;
          this.referrer = n, this.referrerDomain = (0, e.referringDomain)(n), this.deviceType = (0, e.getDeviceType)(s), this.os = (0, e.getOS)(s), this.browser = (0, e.getBrowser)(s, r.vendor, window.opera), this.browserVersion = (0, e.getBrowserVersion)(s, r.vendor, window.opera), this.browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone, this.screenHeight = window.screen.height, this.screenWidth = window.screen.width, this.userIP = "", this.city = "", this.country = "", this.user_id = "", this.device_id = "", this.libraryType = "web", this.libraryVersion = "1.0.0", fetch("https://api64.ipify.org?format=json").then(function (e) {
            return e.json();
          }).then(function (e) {
            t.userIP = e.ip, t.track("Pageview", "");
          }).catch(function () {
            t.userIP = "", console.log("sending pagview without location data.."), t.track("Pageview", "");
          });
          var a = {
            user_id: "".concat(this.user_id),
            device_id: "".concat(this.device_id),
            initial_referrer: "".concat(this.referrer || "direct"),
            initial_referring_website: "".concat(this.referrerDomain || "direct"),
            referrer: "".concat(this.referrer || "direct"),
            referring_website: "".concat(this.referrerDomain || "direct")
          };

          if (this.userInfoCookie = (0, e.readCookie)("fusion_".concat(this.apiKey)), null == this.userInfoCookie) {
            this.user_id = (0, e.generateUserId)(), this.device_id = (0, e.generateUserId)(), a.user_id = this.user_id, a.device_id = this.device_id;
            var h = JSON.stringify(a);
            (0, e.createCookie)("fusion_".concat(this.apiKey), encodeURIComponent(h), 730), this.userInfoCookie = (0, e.readCookie)("fusion_".concat(this.apiKey));
          }
        }
      }, {
        key: "register",
        value: function value(t) {
          for (var i in this.propertiesToRegister = t, this.eventPropertyPayload = JSON.parse(decodeURIComponent((0, e.readCookie)("fusion_".concat(this.apiKey)))), this.propertiesToRegister) {
            this.eventPropertyPayload[i] = "".concat(this.propertiesToRegister[i]);
          }

          (0, e.createCookie)("fusion_".concat(this.apiKey), encodeURIComponent(JSON.stringify(this.eventPropertyPayload)), 730);
        }
      }, {
        key: "unregister",
        value: function value(t) {
          this.propertyToUnregister = t, this.savedPropertyPayload = JSON.parse(decodeURIComponent((0, e.readCookie)("fusion_".concat(this.apiKey)))), delete this.savedPropertyPayload["".concat(this.propertyToUnregister)], (0, e.createCookie)("fusion_".concat(this.apiKey), encodeURIComponent(JSON.stringify(this.savedPropertyPayload)), 730);
        }
      }, {
        key: "track",
        value: function value(t, i) {
          for (var r in this.event = t, null == i ? this.userDefinedProperties : this.userDefinedProperties = i, this.eventPropertyPayload = JSON.parse(decodeURIComponent((0, e.readCookie)("fusion_".concat(this.apiKey)))), this.userDefinedProperties) {
            this.eventPropertyPayload[r] = "".concat(this.userDefinedProperties[r]);
          }

          this.eventPropertyPayload.website = this.host, this.eventPropertyPayload.page = this.path, this.eventPropertyPayload.browser = this.browser, this.eventPropertyPayload.browser_version = this.browserVersion, this.eventPropertyPayload.os = this.os, this.eventPropertyPayload.device_type = this.deviceType, this.eventPropertyPayload.screen_height = this.screenHeight, this.eventPropertyPayload.screen_width = this.screenWidth, this.eventPropertyPayload.ip = this.userIP, this.eventPropertyPayload.library_type = this.libraryType, this.eventPropertyPayload.library_version = this.libraryVersion, this.eventPropertyPayload.referrer = this.referrer || "direct", this.eventPropertyPayload.referring_website = this.referrerDomain || "direct", this.propertiesToSend = JSON.stringify(this.eventPropertyPayload);
          var o = new XMLHttpRequest();
          this.time = new Date().getTime(), o.open("GET", "".concat(this.apiHost, "/event?event=").concat(this.event, "&properties=").concat(this.propertiesToSend, "&timestamp=").concat(this.time, "&apiKey=").concat(this.apiKey)), o.send();
        }
      }, {
        key: "indentify",
        value: function value(t, i) {
          for (var r in null == t ? this.uuid : this.uuid = t, null == i ? this.userDefinedProperties : this.userDefinedProperties = i, this.eventPropertyPayload = JSON.parse(decodeURIComponent((0, e.readCookie)("fusion_".concat(this.apiKey)))), this.userDefinedProperties) {
            this.eventPropertyPayload[r] = "".concat(this.userDefinedProperties[r]);
          }

          this.eventPropertyPayload.website = this.host, this.eventPropertyPayload.page = this.path, this.eventPropertyPayload.browser = this.browser, this.eventPropertyPayload.browser_version = this.browserVersion, this.eventPropertyPayload.os = this.os, this.eventPropertyPayload.device_type = this.deviceType, this.eventPropertyPayload.screen_height = this.screenHeight, this.eventPropertyPayload.screen_width = this.screenWidth, this.eventPropertyPayload.ip = this.userIP, this.eventPropertyPayload.library_type = this.libraryType, this.eventPropertyPayload.library_version = this.libraryVersion, this.eventPropertyPayload.referrer = this.referrer || "direct", this.eventPropertyPayload.referring_website = this.referrerDomain || "direct", this.propertiesToSend = JSON.stringify(this.eventPropertyPayload);
          var o = new XMLHttpRequest();
          this.time = new Date().getTime(), o.open("GET", "".concat(this.apiHost, "/user?uuid=").concat(this.uuid, "&properties=").concat(this.propertiesToSend, "&apiKey=").concat(this.apiKey)), o.send();
        }
      }, {
        key: "init",
        value: function value(e, t, i) {
          this.apiHost = t, this.apiKey = e, this.setup();
        }
      }]), i;
    }();

    function s() {
      return new o();
    }
  }, {
    "./utils": "FOZT"
  }],
  "c18L": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;

    var e = require("./fusion-core.js"),
        o = (0, e.init_fusion_as_module)(),
        r = o;

    exports.default = r;
  }, {
    "./fusion-core.js": "MMjl"
  }]
}, {}, ["c18L"], null);
},{}],"app.js":[function(require,module,exports) {
"use strict";

var _moduleLoader = _interopRequireDefault(require("../dist/module-loader.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * App.js emulates an dynamic app eg: react, vue, angular or node
 *
 */
_moduleLoader.default.init("608813b5254914007109279a", "http://localhost:3000", true);

_moduleLoader.default.indentify("vikas3091999"); //fusion.register({ ice_cream: "vanilla-chocolate" });


_moduleLoader.default.track("icecream");

console.log("done"); //fusion.unregister("ice_cream");
//fusion.track("no-icecream");
//fusion.track("Pageview");
},{"../dist/module-loader.js":"../dist/module-loader.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49700" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map