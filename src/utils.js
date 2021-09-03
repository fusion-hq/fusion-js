// Function Definition: Check & return cookie and if unavailable returns null
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function Definition: Create cookie @param1 = cookie name @param2 = cookie vale
/**
 * @param  {string} name coookie name
 * @param  {string} value cookie value
 * @param  {number} days retention period of cookie on days
 */
function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = "; expires=" + date.toGMTString();
  } else var expires = "";
  let domain = window.location.hostname;
  document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
}

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
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
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
  } else if (includes(user_agent, "MSIE") || includes(user_agent, "Trident/")) {
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
function getOS(userAgent) {
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

module.exports = {
  readCookie,
  createCookie,
  generateUserId,
  getBrowser,
  getBrowserVersion,
  getOS,
  getDevice,
  getDeviceType,
  referringDomain,
};
