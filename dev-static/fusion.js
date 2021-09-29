/**
 *
 * * Fusion Analytcs Javascript Library
 *   Author: Vikas Singh
 *   Date: 21/5/21
 *   Version : Alpha-V4
 *
 *
 * * Change Log :
 *  Auto-capture is completely based on vanilla JS insated of Jquery - Vikas Singh -29/09/21
 *  Although detecting dom ready uses jquery as vanilla is not compatible some IE versions
 *
 */

//Load the jquery script
var script = document.createElement("SCRIPT");
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";
script.type = "text/javascript";
document.getElementsByTagName("HEAD")[0].appendChild(script);
var autocaptureEnabled;

class Fusion {
  /** Extracts & saves user/browser data,
   * gets location info and calls track method
   *  to send pageview event with those data.
   **/

  setup() {
    const Http = new XMLHttpRequest();
    const libraryType = "web",
      libraryVersion = "1.0.0",
      win = typeof window !== "undefined" ? window : {},
      navigator = win.navigator || { userAgent: "" },
      document = win.document || {},
      userAgent = navigator.userAgent;

    // Function Definition: Check & return cookie and if unavailable returns null
    this.readCookie = function (name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    };

    // Function Definition: Create cookie @param1 = cookie name @param2 = cookie vale
    /**
     * @param  {string} name coookie name
     * @param  {string} value cookie value
     * @param  {number} days retention period of cookie on days
     */
    this.createCookie = function (name, value, days) {
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        var expires = "; expires=" + date.toGMTString();
      } else var expires = "";
      let domain = window.location.hostname;
      document.cookie =
        name + "=" + value + expires + "; path=/; domain=" + domain;
    };

    // Function Definition: Returns cryotographically unique user ids
    /** older version
    function generateUserId() {
      const typedArray = new Uint8Array(10);
      const randomValues = window.crypto.getRandomValues(typedArray);
      return randomValues.join("");
    }
     */
    // RFC4122 version 4 compliant
    function generateUserId() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    }

    /**
     * @param  {} referrer
     */
    function findSearchEngine(referrer) {
      if (referrer.search("https?://(.*)google.([^/?]*)") === 0) {
        return "google";
      } else if (referrer.search("https?://(.*)bing.com") === 0) {
        return "bing";
      } else if (referrer.search("https?://(.*)yahoo.com") === 0) {
        return "yahoo";
      } else if (referrer.search("https?://(.*)duckduckgo.com") === 0) {
        return "duckduckgo";
      } else {
        return null;
      }
    }

    function includes(str, needle) {
      return str.indexOf(needle) !== -1;
    }

    /**
     * * Detects the client browser type
     * ! Do not change the order of the checks done below as some
     * ! user agents include same keywords used in later checks.
     */
    function getBrowser(user_agent, vendor, opera) {
      vendor = vendor || ""; // vendor is undefined for at least IE9
      if (opera || includes(user_agent, " OPR/")) {
        if (includes(user_agent, "Mini")) {
          return "Opera Mini";
        }
        return "Opera";
      } else if (/(BlackBerry|PlayBook|BB10)/i.test(user_agent)) {
        return "BlackBerry";
      } else if (
        includes(user_agent, "IEMobile") ||
        includes(user_agent, "WPDesktop")
      ) {
        return "Internet Explorer Mobile";
      } else if (includes(user_agent, "SamsungBrowser/")) {
        //? https://developer.samsung.com/internet/user-agent-string-format
        return "Samsung Internet";
      } else if (includes(user_agent, "Edge") || includes(user_agent, "Edg/")) {
        return "Microsoft Edge";
      } else if (includes(user_agent, "FBIOS")) {
        return "Facebook Mobile";
      } else if (includes(user_agent, "Chrome")) {
        return "Chrome";
      } else if (includes(user_agent, "CriOS")) {
        return "Chrome iOS";
      } else if (
        includes(user_agent, "UCWEB") ||
        includes(user_agent, "UCBrowser")
      ) {
        return "UC Browser";
      } else if (includes(user_agent, "FxiOS")) {
        return "Firefox iOS";
      } else if (includes(vendor, "Apple")) {
        if (includes(user_agent, "Mobile")) {
          return "Mobile Safari";
        }
        return "Safari";
      } else if (includes(user_agent, "Android")) {
        return "Android Mobile";
      } else if (includes(user_agent, "Konqueror")) {
        return "Konqueror";
      } else if (includes(user_agent, "Firefox")) {
        return "Firefox";
      } else if (
        includes(user_agent, "MSIE") ||
        includes(user_agent, "Trident/")
      ) {
        return "Internet Explorer";
      } else if (includes(user_agent, "Gecko")) {
        return "Mozilla";
      } else {
        return "";
      }
    }

    /**
     ** Detects the client browser version
     *  User agent strings referred from:
     *? http://www.useragentstring.com/pages/useragentstring.php
     */
    function getBrowserVersion(userAgent, vendor, opera) {
      var browser = getBrowser(userAgent, vendor, opera);
      var versionRegexs = {
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
      };
      var regex = versionRegexs[browser];
      if (regex === undefined) {
        return null;
      }
      var matches = userAgent.match(regex);
      if (!matches) {
        return null;
      }
      return parseFloat(matches[matches.length - 2]);
    }
    /**
     * Get OS name of client device
     */
    function getOS() {
      var a = userAgent;
      if (/Windows/i.test(a)) {
        if (/Phone/.test(a) || /WPDesktop/.test(a)) {
          return "Windows Phone";
        }
        return "Windows";
      } else if (/(iPhone|iPad|iPod)/.test(a)) {
        return "iOS";
      } else if (/Android/.test(a)) {
        return "Android";
      } else if (/(BlackBerry|PlayBook|BB10)/i.test(a)) {
        return "BlackBerry";
      } else if (/Mac/i.test(a)) {
        return "Mac OS X";
      } else if (/Linux/.test(a)) {
        return "Linux";
      } else if (/CrOS/.test(a)) {
        return "Chrome OS";
      } else {
        return "";
      }
    }
    /**
     * Get device from user agent string
     * @param  {} user_agent
     */
    function getDevice(user_agent) {
      if (/Windows Phone/i.test(user_agent) || /WPDesktop/.test(user_agent)) {
        return "Windows Phone";
      } else if (/iPad/.test(user_agent)) {
        return "iPad";
      } else if (/iPod/.test(user_agent)) {
        return "iPod Touch";
      } else if (/iPhone/.test(user_agent)) {
        return "iPhone";
      } else if (/(BlackBerry|PlayBook|BB10)/i.test(user_agent)) {
        return "BlackBerry";
      } else if (/Android/.test(user_agent) && !/Mobile/.test(user_agent)) {
        return "Android Tablet";
      } else if (/Android/.test(user_agent)) {
        return "Android";
      } else {
        return "";
      }
    }
    /**
     * Detects device types eg:(desktop, tablet, mobile) using getDevice()
     * @param  {} user_agent
     */
    function getDeviceType(user_agent) {
      const device = getDevice(user_agent);
      if (device === "iPad" || device === "Android Tablet") {
        return "Tablet";
      } else if (device) {
        return "Mobile";
      } else {
        return "Desktop";
      }
    }

    // Get OS,Browser,DeviceType etc
    this.os = getOS();
    this.browser = getBrowser(userAgent, navigator.vendor, window.opera);
    this.browserVersion = getBrowserVersion(
      userAgent,
      navigator.vendor,
      window.opera
    );

    /**
     * Returns domain name of referrer from referrer string
     * @param  {} referrer
     */
    function referringDomain(referrer) {
      var split = referrer.split("/");
      if (split.length >= 3) {
        return split[2];
      }
      return "";
    }

    this.deviceType = getDeviceType(userAgent);

    // Get browser path,url
    this.path = window.location.pathname;
    this.host = window.location.host;

    //get browser referrer
    var referrer = document.referrer;
    this.referrer = referrer;
    this.referrerDomain = referringDomain(referrer);

    //get User agent
    this.userAgent = navigator.userAgent;

    //Get local timezone from browser to locate user indeirectly
    this.browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Device screen size
    this.screenHeight = window.screen.height;
    this.screenWidth = window.screen.width;

    // Fetch user location data using third party IP lookup service
    this.userIP = "";
    this.city = "";
    this.country = "";

    this.user_id = "";
    this.device_id = "";

    this.libraryType = libraryType;
    this.libraryVersion = libraryVersion;

    // Fetch ip of user from ipify.org(third party service)
    fetch("https://api64.ipify.org?format=json")
      .then((res) => res.json())
      .then((out) => {
        this.userIP = out.ip;
        //Send page view data with location !
        this.track("Pageview", "");
      })
      .catch(() => {
        //if location api not working just set location data to NULL
        this.userIP = "";
        console.log("sending pagview without location data..");
        this.track("Pageview", "");
      });

    // extract query paramter from a URL
    function getQueryParam(url, param) {
      param = param.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
      var regexS = "[\\?&]" + param + "=([^&#]*)",
        regex = new RegExp(regexS),
        results = regex.exec(url);
      if (
        results === null ||
        (results && typeof results[1] !== "string" && results[1].length)
      ) {
        return "";
      } else {
        var result = results[1];
        try {
          result = decodeURIComponent(result);
        } catch (err) {
          console.error(
            "Skiped decoding for corrupted query parameter: " + result
          );
        }
        return result.replace(/\+/g, " ");
      }
    }

    // Returns UTM parameter and their value
    function getCampaignParams() {
      var campaignKeywords =
          "utm_source utm_medium utm_campaign utm_content utm_term".split(" "),
        params = {},
        keyword = "";
      campaignKeywords.forEach((keywordKey) => {
        keyword = getQueryParam(document.URL, keywordKey);
        //console.log(keyword);
        if (keyword.length) {
          params[keywordKey] = `${keyword}`;
        }
      });

      return params;
    }

    //data fileds for user info cookies
    let userInfoCookieTemplate = {
      user_id: `${this.user_id}`,
      device_id: `${this.device_id}`,
      initial_referrer: `${this.referrer || "direct"}`,
      initial_referring_website: `${this.referrerDomain || "direct"}`,
      referrer: `${this.referrer || "direct"}`,
      referring_website: `${this.referrerDomain || "direct"}`,
    };

    // if (Object.keys(UTMdata).length !== 0) {
    //   console.log("UTM present");
    // }

    // saving important reuseable info in browser cookie
    this.userInfoCookie = this.readCookie(`fusion_${this.apiKey}`);
    // check for info cookie existis and create one if unavaialable
    if (this.userInfoCookie == null) {
      this.user_id = generateUserId();
      this.device_id = generateUserId();
      userInfoCookieTemplate.user_id = this.user_id;
      userInfoCookieTemplate.device_id = this.device_id;

      //get UTM data
      const UTMdata = getCampaignParams();
      //console.log(UTMdata);

      // add UTM data to userInfoCookieTemplate & save in cookie if exists
      for (const UTMTag in UTMdata) {
        userInfoCookieTemplate[UTMTag] = `${UTMdata[UTMTag]}`;
      }

      // Stringify in save userInfo into cookie
      let userInfoCookieString = JSON.stringify(userInfoCookieTemplate);
      this.createCookie(
        `fusion_${this.apiKey}`,
        encodeURIComponent(userInfoCookieString),
        730
      );
      this.userInfoCookie = this.readCookie(`fusion_${this.apiKey}`);
      //console.log(this.userInfoCookie);
    }
  }

  /**
   *  Function Definition : Tracking function sends events with other data.
   *  Can be callded from script tag or from html button/links/form
   *  parameters:
   *  event = String event name
   *  data = String custom user defined data(can be kept empty as well)
   **/

  //Register super properties -(user defined property to be sent with all events)
  register(properties) {
    this.propertiesToRegister = properties;
    //read data saved in cookie and parse it
    this.eventPropertyPayload = JSON.parse(
      decodeURIComponent(this.readCookie(`fusion_${this.apiKey}`))
    );

    // add property passed by user into property above parsed json
    for (const property in this.propertiesToRegister) {
      //console.log(`${property}: ${this.propertiesToRegister[property]}`);
      this.eventPropertyPayload[
        property
      ] = `${this.propertiesToRegister[property]}`;
    }
    //encode stringify and save new userInfo(cookie saved data)
    this.createCookie(
      `fusion_${this.apiKey}`,
      encodeURIComponent(JSON.stringify(this.eventPropertyPayload)),
      730
    );
  }

  //TODO: Unregister super properties -(used to remove register super properties)
  /**
   ** Unregister a super property -(used to remove register super properties)
   * @param  {} property - super property name to delete from cookie
   */
  unregister(property) {
    this.propertyToUnregister = property;

    //read data saved in cookie and parse it
    this.savedPropertyPayload = JSON.parse(
      decodeURIComponent(this.readCookie(`fusion_${this.apiKey}`))
    );
    // remove property key-value passed by user from loaded property payload
    delete this.savedPropertyPayload[`${this.propertyToUnregister}`];
    //encode stringify and save new userInfo(cookie saved data)
    this.createCookie(
      `fusion_${this.apiKey}`,
      encodeURIComponent(JSON.stringify(this.savedPropertyPayload)),
      730
    );
  }

  track(event, properties) {
    this.event = event;
    properties == undefined
      ? this.userDefinedProperties == ""
      : (this.userDefinedProperties = properties);

    //read data saved in cookie and parse it
    this.eventPropertyPayload = JSON.parse(
      decodeURIComponent(this.readCookie(`fusion_${this.apiKey}`))
    );

    // add property passed by user into propery above parsed - eventPropertyPayload
    for (const property in this.userDefinedProperties) {
      //console.log(`${property}: ${this.propertiesToRegister[property]}`);
      this.eventPropertyPayload[
        property
      ] = `${this.userDefinedProperties[property]}`;
    }

    //default super properties assigned by fusion.js
    this.eventPropertyPayload.website = this.host;
    this.eventPropertyPayload.page = this.path;
    this.eventPropertyPayload.browser = this.browser;
    this.eventPropertyPayload.browserVersion = this.browserVersion;
    this.eventPropertyPayload.os = this.os;
    this.eventPropertyPayload.deviceType = this.deviceType;
    this.eventPropertyPayload.screenHeight = this.screenHeight;
    this.eventPropertyPayload.screenWidth = this.screenWidth;
    this.eventPropertyPayload.ip = this.userIP;
    this.eventPropertyPayload.libraryType = this.libraryType;
    this.eventPropertyPayload.libraryVersion = this.libraryVersion;
    this.eventPropertyPayload.referrer = this.referrer || "direct";
    this.eventPropertyPayload.referring_website =
      this.referrerDomain || "direct";

    //console.log(this.eventPropertyPayload);
    this.propertiesToSend = JSON.stringify(this.eventPropertyPayload);
    const Http = new XMLHttpRequest();
    this.time = new Date().getTime();

    Http.open(
      "GET",
      `${this.apiHost}/event?event=${this.event}&properties=${this.propertiesToSend}&timestamp=${this.time}&apiKey=${this.apiKey}`
    );
    Http.send();
  }

  /**
   ** Main entry point of the tracking library
   * That sets api_key, api_host and autocapture_enabled setting
   * & calls setup() thus sends pageview event also
   * @param api_key unique right-only key string for every users
   * @param api_host tracking server url string
   * @param autocapture_enabled if true event autocapture is enabled
   */
  init(api_key, api_host, autocapture_enabled) {
    this.apiHost = api_host;
    this.apiKey = api_key;
    autocaptureEnabled = autocapture_enabled;
    this.setup();
  }
}

// Initiallize the Fusion class
const fusion = new Fusion();

// sends pageleave event just before leaving the page
window.onbeforeunload = function () {
  fusion.track("Pageleave");
};

// Auto executing function
(function () {
  // Poll for jQuery to come into existance (only used for detecting dom ready)
  var autocapture = function (callback) {
    if (window.jQuery) {
      callback(jQuery);
    } else {
      window.setTimeout(function () {
        autocapture(callback);
      }, 20);
    }
  };

  // Start polling...
  autocapture(function ($) {
    if (autocaptureEnabled) {
      //check if (dom ready using jquery)
      $(function () {
        // Auto-captures button clicks
        document.addEventListener(`click`, (e) => {
          const origin = e.target.closest("button");

          //check if origin exists and does not have class fusion-no-capture
          if (origin && origin.className !== "fusion-no-capture") {
            let button_name = origin.innerText,
              button_id = origin.id,
              button_class = origin.className;
            let tag = button_name || button_id || button_class || "unnamed";

            //console.log(`${tag} button clicked`);
            fusion.track(`${tag} button clicked`, "");
          }
        });

        // Auto-captures link clicks
        document.addEventListener(`click`, (e) => {
          const origin = e.target.closest("a");

          if (origin && origin.className !== "fusion-no-capture") {
            let link_name = origin.innerText,
              link_id = origin.id,
              link_class = origin.className;
            //TODO: does not capture link with no text but image as body
            let tag = link_name || link_id || link_class || "unnamed";

            //console.log(`${tag} link clicked`);
            fusion.track(`${tag} link clicked`, "");
          }
        });

        // Auto-captures all input fill-up attemp other than checkbox & radio
        document.addEventListener(`change`, (e) => {
          const origin = e.target.closest(
            'input:not([type="checkbox"], [type="radio"])'
          );
          if (origin && origin.className !== "fusion-no-capture") {
            if (origin.value.length > 0) {
              let input_name = "",
                input_id = origin.id,
                input_class = origin.className;

              //get the placeholder if exists
              if (origin.attributes["placeholder"] !== undefined) {
                input_name = origin.attributes["placeholder"].value;
              }

              let tag = input_name || input_id || input_class || "unnamed";

              //console.log(`${tag} filled`);
              fusion.track(`${tag} filled`, "");
            }
          }
        });

        // Auto-captures check-box selection
        document.addEventListener(`click`, (e) => {
          const origin = e.target.closest('input[type="checkbox"]:checked');

          if (origin && origin.className !== "fusion-no-capture") {
            let input_value = origin.value,
              input_id = origin.id,
              input_class = origin.className;

            let tag = input_value || input_id || input_class || "unnamed";

            //console.log(`${tag} checked`);
            fusion.track(`${tag} checked`, "");
          }
        });

        // Auto-captures radio selection
        document.addEventListener(`click`, (e) => {
          const origin = e.target.closest('input[type="radio"]:checked');

          if (origin && origin.className !== "fusion-no-capture") {
            let input_value = origin.value,
              input_id = origin.id,
              input_class = origin.className;
            let tag = input_value || input_id || input_class || "unnamed";

            //console.log(`${tag} checked`);
            fusion.track(`${tag} checked`, "");
          }
        });

        // Auto-captures select option
        document.addEventListener(`change`, (e) => {
          const origin = e.target.closest("select");

          if (origin && origin.className !== "fusion-no-capture") {
            let input_value = origin.value,
              input_id = origin.id,
              input_class = origin.className;
            let tag = input_value || input_id || input_class || "unnamed";

            //console.log(`${tag} selected`);
            fusion.track(`${tag} selected`, "");
          }
        });

        // Auto-captures form-submission
        document.addEventListener(`submit`, (e) => {
          const origin = e.target.closest("form");

          if (origin && origin.className !== "fusion-no-capture") {
            let form_name,
              form_action,
              form_id = origin.id,
              form_class = origin.className;

            //get the form name if exists
            if (origin.attributes["name"] !== undefined) {
              form_name = origin.attributes["name"].value;
            }

            //get the form action if exists
            if (origin.attributes["action"] !== undefined) {
              form_action = origin.attributes["action"].value;
            }

            let tag =
              form_name || form_action || form_id || form_class || "unnamed";
            //console.log(`${tag} form submitted`);
            fusion.track(`${tag} form submitted`, "");
          }
        });

        // Auto-captures file upload attemp
        document.addEventListener(`click`, (e) => {
          const origin = e.target.closest('input[type="file"]');

          if (origin && origin.className !== "fusion-no-capture") {
            let input_value = origin.value,
              input_id = origin.id,
              input_class = origin.className;
            let tag = input_value || input_id || input_class || "unnamed";

            //console.log(`${tag} input clicked`);
            fusion.track(`${tag} input clicked`, "");
          }
        });
      });
    }
  });
})();
