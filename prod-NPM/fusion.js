parcelRequire = (function (e, r, t, n) {
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
        throw ((c.code = "MODULE_NOT_FOUND"), c);
      }
      (p.resolve = function (r) {
        return e[t][1][r] || r;
      }),
        (p.cache = {});
      var l = (r[t] = new f.Module(t));
      e[t][0].call(l.exports, p, l, l.exports, this);
    }
    return r[t].exports;
    function p(e) {
      return f(p.resolve(e));
    }
  }
  (f.isParcelRequire = !0),
    (f.Module = function (e) {
      (this.id = e), (this.bundle = f), (this.exports = {});
    }),
    (f.modules = e),
    (f.cache = r),
    (f.parent = o),
    (f.register = function (r, t) {
      e[r] = [
        function (e, r) {
          r.exports = t;
        },
        {},
      ];
    });
  for (var c = 0; c < t.length; c++)
    try {
      f(t[c]);
    } catch (e) {
      i || (i = e);
    }
  if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = l)
      : "function" == typeof define && define.amd
      ? define(function () {
          return l;
        })
      : n && (this[n] = l);
  }
  if (((parcelRequire = f), i)) throw i;
  return f;
})(
  {
    FOZT: [
      function (require, module, exports) {
        function e(e) {
          for (
            var r = e + "=", o = document.cookie.split(";"), t = 0;
            t < o.length;
            t++
          ) {
            for (var i = o[t]; " " == i.charAt(0); )
              i = i.substring(1, i.length);
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
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (e) {
              var r = (16 * Math.random()) | 0;
              return ("x" == e ? r : (3 & r) | 8).toString(16);
            }
          );
        }
        function t(e, r) {
          return -1 !== e.indexOf(r);
        }
        function i(e, r, o) {
          return (
            (r = r || ""),
            o || t(e, " OPR/")
              ? t(e, "Mini")
                ? "Opera Mini"
                : "Opera"
              : /(BlackBerry|PlayBook|BB10)/i.test(e)
              ? "BlackBerry"
              : t(e, "IEMobile") || t(e, "WPDesktop")
              ? "Internet Explorer Mobile"
              : t(e, "SamsungBrowser/")
              ? "Samsung Internet"
              : t(e, "Edge") || t(e, "Edg/")
              ? "Microsoft Edge"
              : t(e, "FBIOS")
              ? "Facebook Mobile"
              : t(e, "Chrome")
              ? "Chrome"
              : t(e, "CriOS")
              ? "Chrome iOS"
              : t(e, "UCWEB") || t(e, "UCBrowser")
              ? "UC Browser"
              : t(e, "FxiOS")
              ? "Firefox iOS"
              : t(r, "Apple")
              ? t(e, "Mobile")
                ? "Mobile Safari"
                : "Safari"
              : t(e, "Android")
              ? "Android Mobile"
              : t(e, "Konqueror")
              ? "Konqueror"
              : t(e, "Firefox")
              ? "Firefox"
              : t(e, "MSIE") || t(e, "Trident/")
              ? "Internet Explorer"
              : t(e, "Gecko")
              ? "Mozilla"
              : ""
          );
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
            Mozilla: /rv:(\d+(\.\d+)?)/,
          }[i(e, r, o)];
          if (void 0 === t) return null;
          var n = e.match(t);
          return n ? parseFloat(n[n.length - 2]) : null;
        }
        function d(e) {
          var r = e;
          return /Windows/i.test(r)
            ? /Phone/.test(r) || /WPDesktop/.test(r)
              ? "Windows Phone"
              : "Windows"
            : /(iPhone|iPad|iPod)/.test(r)
            ? "iOS"
            : /Android/.test(r)
            ? "Android"
            : /(BlackBerry|PlayBook|BB10)/i.test(r)
            ? "BlackBerry"
            : /Mac/i.test(r)
            ? "Mac OS X"
            : /Linux/.test(r)
            ? "Linux"
            : /CrOS/.test(r)
            ? "Chrome OS"
            : "";
        }
        function a(e) {
          return /Windows Phone/i.test(e) || /WPDesktop/.test(e)
            ? "Windows Phone"
            : /iPad/.test(e)
            ? "iPad"
            : /iPod/.test(e)
            ? "iPod Touch"
            : /iPhone/.test(e)
            ? "iPhone"
            : /(BlackBerry|PlayBook|BB10)/i.test(e)
            ? "BlackBerry"
            : /Android/.test(e) && !/Mobile/.test(e)
            ? "Android Tablet"
            : /Android/.test(e)
            ? "Android"
            : "";
        }
        function s(e) {
          var r = a(e);
          return "iPad" === r || "Android Tablet" === r
            ? "Tablet"
            : r
            ? "Mobile"
            : "Desktop";
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
          referringDomain: l,
        };
      },
      {},
    ],
    WWUv: [
      function (require, module, exports) {
        "use strict";
        var e = require("./utils");
        function t(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        function i(e, t) {
          for (var i = 0; i < t.length; i++) {
            var r = t[i];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        function r(e, t, r) {
          return t && i(e.prototype, t), r && i(e, r), e;
        }
        var o = (function () {
          function i() {
            t(this, i);
          }
          return (
            r(i, [
              {
                key: "setup",
                value: function () {
                  var t = this,
                    i =
                      (new XMLHttpRequest(),
                      "undefined" != typeof window ? window : {}),
                    r = i.navigator || { userAgent: "" },
                    o = i.document || {},
                    s = r.userAgent;
                  (this.path = window.location.pathname),
                    (this.host = window.location.host);
                  var n = o.referrer;
                  (this.referrer = n),
                    (this.referrerDomain = (0, e.referringDomain)(n)),
                    (this.deviceType = (0, e.getDeviceType)(s)),
                    (this.os = (0, e.getOS)(s)),
                    (this.browser = (0, e.getBrowser)(
                      s,
                      r.vendor,
                      window.opera
                    )),
                    (this.browserVersion = (0, e.getBrowserVersion)(
                      s,
                      r.vendor,
                      window.opera
                    )),
                    (this.browserTimeZone =
                      Intl.DateTimeFormat().resolvedOptions().timeZone),
                    (this.screenHeight = window.screen.height),
                    (this.screenWidth = window.screen.width),
                    (this.userIP = ""),
                    (this.city = ""),
                    (this.country = ""),
                    (this.user_id = ""),
                    (this.device_id = ""),
                    (this.libraryType = "web"),
                    (this.libraryVersion = "1.0.0"),
                    fetch("https://api64.ipify.org?format=json")
                      .then(function (e) {
                        return e.json();
                      })
                      .then(function (e) {
                        (t.userIP = e.ip), t.track("Pageview", "");
                      })
                      .catch(function () {
                        (t.userIP = ""),
                          console.log(
                            "sending pagview without location data.."
                          ),
                          t.track("Pageview", "");
                      });
                  var a = {
                    user_id: "".concat(this.user_id),
                    device_id: "".concat(this.device_id),
                    initial_referrer: "".concat(this.referrer || "direct"),
                    initial_referring_website: "".concat(
                      this.referrerDomain || "direct"
                    ),
                    referrer: "".concat(this.referrer || "direct"),
                    referring_website: "".concat(
                      this.referrerDomain || "direct"
                    ),
                  };
                  if (
                    ((this.userInfoCookie = (0, e.readCookie)(
                      "fusion_".concat(this.apiKey)
                    )),
                    null == this.userInfoCookie)
                  ) {
                    (this.user_id = (0, e.generateUserId)()),
                      (this.device_id = (0, e.generateUserId)()),
                      (a.user_id = this.user_id),
                      (a.device_id = this.device_id);
                    var h = JSON.stringify(a);
                    (0, e.createCookie)(
                      "fusion_".concat(this.apiKey),
                      encodeURIComponent(h),
                      730
                    ),
                      (this.userInfoCookie = (0, e.readCookie)(
                        "fusion_".concat(this.apiKey)
                      ));
                  }
                },
              },
              {
                key: "register",
                value: function (t) {
                  for (var i in ((this.propertiesToRegister = t),
                  (this.eventPropertyPayload = JSON.parse(
                    decodeURIComponent(
                      (0, e.readCookie)("fusion_".concat(this.apiKey))
                    )
                  )),
                  this.propertiesToRegister))
                    this.eventPropertyPayload[i] = "".concat(
                      this.propertiesToRegister[i]
                    );
                  (0, e.createCookie)(
                    "fusion_".concat(this.apiKey),
                    encodeURIComponent(
                      JSON.stringify(this.eventPropertyPayload)
                    ),
                    730
                  );
                },
              },
              {
                key: "unregister",
                value: function (t) {
                  (this.propertyToUnregister = t),
                    (this.savedPropertyPayload = JSON.parse(
                      decodeURIComponent(
                        (0, e.readCookie)("fusion_".concat(this.apiKey))
                      )
                    )),
                    delete this.savedPropertyPayload[
                      "".concat(this.propertyToUnregister)
                    ],
                    (0, e.createCookie)(
                      "fusion_".concat(this.apiKey),
                      encodeURIComponent(
                        JSON.stringify(this.savedPropertyPayload)
                      ),
                      730
                    );
                },
              },
              {
                key: "track",
                value: function (t, i) {
                  for (var r in ((this.event = t),
                  null == i
                    ? this.userDefinedProperties
                    : (this.userDefinedProperties = i),
                  (this.eventPropertyPayload = JSON.parse(
                    decodeURIComponent(
                      (0, e.readCookie)("fusion_".concat(this.apiKey))
                    )
                  )),
                  this.userDefinedProperties))
                    this.eventPropertyPayload[r] = "".concat(
                      this.userDefinedProperties[r]
                    );
                  (this.eventPropertyPayload.website = this.host),
                    (this.eventPropertyPayload.page = this.path),
                    (this.eventPropertyPayload.browser = this.browser),
                    (this.eventPropertyPayload.browser_version =
                      this.browserVersion),
                    (this.eventPropertyPayload.os = this.os),
                    (this.eventPropertyPayload.device_type = this.deviceType),
                    (this.eventPropertyPayload.screen_height =
                      this.screenHeight),
                    (this.eventPropertyPayload.screen_width = this.screenWidth),
                    (this.eventPropertyPayload.ip = this.userIP),
                    (this.eventPropertyPayload.library_type = this.libraryType),
                    (this.eventPropertyPayload.library_version =
                      this.libraryVersion),
                    (this.eventPropertyPayload.referrer =
                      this.referrer || "direct"),
                    (this.eventPropertyPayload.referring_website =
                      this.referrerDomain || "direct"),
                    (this.propertiesToSend = JSON.stringify(
                      this.eventPropertyPayload
                    ));
                  var o = new XMLHttpRequest();
                  (this.time = new Date().getTime()),
                    o.open(
                      "GET",
                      ""
                        .concat(this.apiHost, "/event?event=")
                        .concat(this.event, "&properties=")
                        .concat(this.propertiesToSend, "&timestamp=")
                        .concat(this.time, "&apiKey=")
                        .concat(this.apiKey)
                    ),
                    o.send();
                },
              },
              {
                key: "init",
                value: function (e, t, i) {
                  (this.apiHost = t), (this.apiKey = e), this.setup();
                },
              },
            ]),
            i
          );
        })();
        module.exports = o;
      },
      { "./utils": "FOZT" },
    ],
  },
  {},
  ["WWUv"],
  null
);
//# sourceMappingURL=/fusion.js.map
