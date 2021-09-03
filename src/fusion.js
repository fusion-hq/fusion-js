/**
 *
 * * Fusion Analytcs Javascript Module
 *   Should be used with NPM based projects like NodeJS, React, Angular, Vue etc.
 *   Author: Vikas Singh
 *   Date: 02/08/21
 *   Version : BETA V1.0
 *
 */

//TODO: Add autocaputre using vanilla js DOM events(scrap jquery)
//TODO: Pageleave support

//Load the jquery script
var script = document.createElement("SCRIPT");
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";
script.type = "text/javascript";
document.getElementsByTagName("HEAD")[0].appendChild(script);
var autocaptureEnabled;

import {
  readCookie,
  createCookie,
  generateUserId,
  getBrowser,
  getBrowserVersion,
  getOS,
  getDeviceType,
  referringDomain,
} from "./utils";

export class Fusion {
  setup() {
    const Http = new XMLHttpRequest();
    const libraryType = "web",
      libraryVersion = "1.0.0",
      win = typeof window !== "undefined" ? window : {},
      navigator = win.navigator || { userAgent: "" },
      document = win.document || {},
      userAgent = navigator.userAgent;

    // Get browser path,url
    this.path = window.location.pathname;
    this.host = window.location.host;

    //get browser referrer
    var referrer = document.referrer;
    this.referrer = referrer;
    this.referrerDomain = referringDomain(referrer);

    this.deviceType = getDeviceType(userAgent);

    // Get OS,Browser,DeviceType etc
    this.os = getOS(userAgent);
    this.browser = getBrowser(userAgent, navigator.vendor, window.opera);
    this.browserVersion = getBrowserVersion(
      userAgent,
      navigator.vendor,
      window.opera
    );

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

    //data fileds for user info cookies
    let userInfoCookieTemplate = {
      user_id: `${this.user_id}`,
      device_id: `${this.device_id}`,
      initial_referrer: `${this.referrer || "direct"}`,
      initial_referring_website: `${this.referrerDomain || "direct"}`,
      referrer: `${this.referrer || "direct"}`,
      referring_website: `${this.referrerDomain || "direct"}`,
    };

    // saving important reuseable info in browser cookie
    this.userInfoCookie = readCookie(`fusion_${this.apiKey}`);
    // check for info cookie existis and create one if unavaialable
    if (this.userInfoCookie == null) {
      this.user_id = generateUserId();
      this.device_id = generateUserId();
      userInfoCookieTemplate.user_id = this.user_id;
      userInfoCookieTemplate.device_id = this.device_id;

      //?UTM capability disable due to bug(malformed JSON while adding UTM data)
      //   //get UTM data
      //   const UTMdata = getCampaignParams();
      //   //console.log(UTMdata);

      //   // add UTM data to userInfoCookieTemplate & save in cookie if exists
      //   for (const UTMTag in UTMdata) {
      //     userInfoCookieTemplate[UTMTag] = `${UTMdata[UTMTag]}`;
      //   }

      // Stringify in save userInfo into cookie
      let userInfoCookieString = JSON.stringify(userInfoCookieTemplate);
      createCookie(
        `fusion_${this.apiKey}`,
        encodeURIComponent(userInfoCookieString),
        730
      );
      this.userInfoCookie = readCookie(`fusion_${this.apiKey}`);
      //console.log(this.userInfoCookie);
    }
  }

  /**
   ** Register super properties -(user defined property to be sent with all events)
   * @param  {} properties -> super propery list json
   */

  register(properties) {
    this.propertiesToRegister = properties;
    //read data saved in cookie and parse it
    this.eventPropertyPayload = JSON.parse(
      decodeURIComponent(readCookie(`fusion_${this.apiKey}`))
    );

    // add property passed by user into property above parsed json
    for (const property in this.propertiesToRegister) {
      //console.log(`${property}: ${this.propertiesToRegister[property]}`);
      this.eventPropertyPayload[
        property
      ] = `${this.propertiesToRegister[property]}`;
    }
    //encode stringify and save new userInfo(cookie saved data)
    createCookie(
      `fusion_${this.apiKey}`,
      encodeURIComponent(JSON.stringify(this.eventPropertyPayload)),
      730
    );
  }

  /**
   ** Unregister a super property -(used to remove register super properties)
   * @param  {} property - super property name to delete from cookie
   */
  unregister(property) {
    this.propertyToUnregister = property;

    //read data saved in cookie and parse it
    this.savedPropertyPayload = JSON.parse(
      decodeURIComponent(readCookie(`fusion_${this.apiKey}`))
    );
    // remove property key-value passed by user from loaded property payload
    delete this.savedPropertyPayload[`${this.propertyToUnregister}`];
    //encode stringify and save new userInfo(cookie saved data)
    createCookie(
      `fusion_${this.apiKey}`,
      encodeURIComponent(JSON.stringify(this.savedPropertyPayload)),
      730
    );
  }

  /**
   *  Function Definition : Tracking function sends events with other data.
   *  Can be callded from script tag or from html button/links/form
   *  parameters:
   *  event = String event name
   *  data = String custom user defined data(can be kept empty as well)
   **/

  /**
   ** Function Definition : Tracking function sends events with other data.
   *  Can be callded from script tag or from html button/links/form
   * @param  {} event -> event name
   * @param  {} properties -> key-value pair json of properties
   */

  track(event, properties) {
    this.event = event;
    properties == undefined
      ? this.userDefinedProperties == ""
      : (this.userDefinedProperties = properties);

    //read data saved in cookie and parse it
    this.eventPropertyPayload = JSON.parse(
      decodeURIComponent(readCookie(`fusion_${this.apiKey}`))
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
    this.eventPropertyPayload.browser_version = this.browserVersion;
    this.eventPropertyPayload.os = this.os;
    this.eventPropertyPayload.device_type = this.deviceType;
    this.eventPropertyPayload.screen_height = this.screenHeight;
    this.eventPropertyPayload.screen_width = this.screenWidth;
    this.eventPropertyPayload.ip = this.userIP;
    this.eventPropertyPayload.library_type = this.libraryType;
    this.eventPropertyPayload.library_version = this.libraryVersion;
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
