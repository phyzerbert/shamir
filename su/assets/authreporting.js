/* USBank AppMeasurement for JS - last updated 06/1/2018 */
/* Adobe Analytics code version: AppMeasurement 2.5.0*/
if (typeof(cd) == "undefined") var cd = new Object();

var sc_code_ver = "R June 2018|AM_2.5.0|06.1.2018|baseOLB"; //SiteCatalyst code version

var s = new AppMeasurement();

if (typeof Visitor != 'undefined') {
    s.visitor = Visitor.getInstance("675616D751E567410A490D4C@AdobeOrg");


    if (s.c_r('appVisitorAID')) {
        visitor.setAnalyticsVisitorID(s.c_r('appVisitorAID'));
    }

    if (s.c_r('appVisitorMID')) {
        visitor.setMarketingCloudVisitorID(s.c_r('appVisitorMID'));
    }
}

if (typeof(cd) == "undefined") var cd = new Object();
var s_url = document.location.hostname.toString();

//QC 6713 [iphone/ipad/android] (Omniture) Omni Transfer pages for mobile app users does not set hostname
if (s_url == "") {
    if (typeof ApplicationContext == "function") {
        s_url = ApplicationContext.getContext().getContextProp("SERVICE_HOSTNAME");
    }
}
//End of QC 6713


if (s_url.match(/uat[\d]?/) || s_url.match(/it[\d]?/)) {
    s.account = "usbankdev";
} else if (s_url.indexOf("usbank.com") > -1 || s_url.indexOf("liveperson.net") > -1 || s_url.indexOf("emp-onlinebanking.us.bank-dns.com") > -1 || s_url.indexOf("24hb-banking.us.bank-dns.com") > -1 || s_url.indexOf("internal-banking-ad.us.bank-dns.com") > -1 || s_url.indexOf("fusionprodpilot.us.bank-dns.com") > -1 || s_url.match(/fusionprodgroup[\d]\.us\.bank\-dns\.com/)) {
    s.account = "usbankcom";
} else {
    s.account = "usbankdev";
}
window.cd = cd;

if (window.location.protocol == "file:") {
    s.ssl = true;
} // If Protocol is set to 'file:', force SSL
/************************** CONFIG SECTION **************************/
s.trackDownloadLinks = true;
s.trackExternalLinks = true;
s.trackInlineStats = false;
s.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
//s.linkInternalFilters = "javascript:,usbank.com,liveperson.net," + window.location.hostname;
s.linkInternalFilters = "javascript:,usbank.com,liveperson.net,us.bank-dns.com," + window.location.hostname;
//s.linkInternalFilters = ".";

s.linkLeaveQueryString = false;
s.linkTrackVars = "prop8,eVar8,contextData.appNameForSiteCat,contextData.uxNameForSiteCat,contextData.appName_PERS,contextData.uxName_PERS,prop4,eVar4,prop6,prop29,eVar90";
s.linkTrackEvents = "None";
s.visitorNamespace = "usbank";
s.trackingServer = "metrics.usbank.com";
s.trackingServerSecure = "smetrics.usbank.com";
/* Page Name Plugin Config */
s.siteID = "olb"; // leftmost value in pagename
s.defaultPage = ""; // filename to add when none exists
s.queryVarsList = ""; // query parameters to keep
s.pathExcludeDelim = ""; // portion of the path to exclude
s.pathConcatDelim = ":"; // page name component separator
s.pathExcludeList = ""; // elements to exclude from the path
s.isPageView = true
s.usePlugins = true

s.doPlugins = function(s) {
    /* Set Platform for OLB and enrollment */
    s.prop40 = "online banking";
    /* Custom Page View */
    s.events = s.apl(s.events, "event17", ",", 2);
    /* Page Name */
    s.prop24 = s.getPageName() ? s.getPageName().replace(/:af\([^:]*/g, '') : "";
    s.contextData['prop53Val'] = s.pageName;

    /*Checks for Presence of Visitor ID Service - writes result into Context Data Variable */
    s.contextData['vidAPICheck'] = (typeof(Visitor) != "undefined" ? "VisitorAPI Present" : "VisitorAPI Missing");


    /* User Agent Checking for Mobile-based logic */
    var ua = navigator.userAgent;
    if (!ua) {
        ua = "device unknown";
    }
    var device_name = "";
    var device_type = "";
    var device_auth_type = "";
    var checker = {
        iphone: ua.match(/iPhone/),
        ipad: ua.match(/iPad/),
        android: ua.match(/Android/),
        windowsPhone: ua.match(/Windows Phone/),
        blackBerry: ua.match(/BlackBerry|BB|playbook/i)
    };

    if ((s.prop30 && s.eVar71) && (s.prop30 == s.eVar71) && s.prop30 == "wap:touch") //if prop30/eVar71 hardcoded on page to wap:touch
    {
        if (checker.android) {
            device_name = "wap:android";
        } else if (checker.ipad) {
            device_name = "wap:ipad";
        } else if (checker.iphone) {
            device_name = "wap:iphone";
        } else if (checker.windowsPhone) {
            device_name = "wap:windowsPhone";
        } else if (checker.blackBerry) {
            device_name = "wap:blackBerry";
        } else {
            device_name = "wap:other";
        }

        s.eVar71 = s.prop30 = device_name;
    }


    /* contextData for Omni AppName and UXNAme */
    if (window.APPNAMEForSiteCat) {
        s.contextData['appNameForSiteCat'] = window.APPNAMEForSiteCat;
    }
    /* added below condition for OAUTH on Feb 10 2017 */
    if (window.ClientIDForSiteCat) {
        s.contextData['clientIDForSiteCat'] = window.ClientIDForSiteCat;
    }
    s.contextData['appName_PERS'] = s.getAndPersistValue(s.contextData['appNameForSiteCat'], 's_appname_sc', 0);
    if (window.UXNAMEForSiteCat) {

        s.contextData['uxApp'] = "false"; //default setting for uxName App Check

        s.contextData['uxNameForSiteCat'] = window.UXNAMEForSiteCat.toLowerCase();

        //Logic overwrites uxName App Check if uxName is set to iphone, ipad or android
        if (s.contextData['uxNameForSiteCat'] == "iphone") {
            s.contextData['uxApp'] = "app:iphone";
        }
        if (s.contextData['uxNameForSiteCat'] == "ipad") {
            s.contextData['uxApp'] = "app:ipad";
        }
        if (s.contextData['uxNameForSiteCat'] == "android") {
            s.contextData['uxApp'] = "app:android";
        }

        /*Modified on Feb 10 2017 - Added OR condition for responsive */
        if (s.contextData['uxNameForSiteCat'] == "touch" || s.contextData['uxNameForSiteCat'] == "responsive") {

            if (checker.android) {
                device_name = "wap:android";
            } else if (checker.ipad) {
                device_name = "wap:ipad";
            } else if (checker.iphone) {
                device_name = "wap:iphone";
            } else if (checker.windowsPhone) {
                device_name = "wap:windowsPhone";
            } else if (checker.blackBerry) {
                device_name = "wap:blackBerry";
            } else {
                device_name = "wap:other";
            }

            s.eVar71 = s.prop30 = device_name;
        }
        if (s.contextData['uxApp'] != "false") {
            s.eVar71 = s.prop30 = s.contextData['uxApp'];
        }
    }
    s.contextData['uxName_PERS'] = s.getAndPersistValue(s.contextData['uxNameForSiteCat'], 's_uxname_sc', 0);

    if (s.contextData['appNameForSiteCat'] == "MBL") {
        s.prop40 = "mobile";
    }
    if (s.contextData['appNameForSiteCat'] == "SVI") {
        s.prop40 = "mobile";
    }
    if (s.contextData['appNameForSiteCat'] == "APPLY") {
        s.prop40 = "touch apply";
    }

    if (!s.contextData['appNameForSiteCat'] && s.eVar48 != null && s.eVar48.match(/mobile/i)) {
        s.prop40 = "mobile";
    }
    /* Added below condition on Feb 10 2017 - For Yodlee appl. */
    if ((s.contextData['appNameForSiteCat'] == "OAUTH") && (s.contextData['clientIDForSiteCat'] == "Yodlee")) {
        s.prop40 = "online banking - yodlee";
    }
    /* Added below condition on July 10 2017 - For Alexa appl. */
    if ((s.contextData['appNameForSiteCat'] == "OAUTH") && (s.contextData['clientIDForSiteCat'] == "Amazon")) {
        s.prop40 = "online banking - alexa";
    }
    //If the context data variable cd.LPID/cd.lpid is set, set eVar8 to cd.LPID/cd.lpid value
    if (cd.lpid) {
        s.eVar8 = cd.lpid;
    }
    if (cd.LPID) {
        s.eVar8 = cd.LPID;
    }

    if (s.prop24) s.prop24 = s.prop24.toLowerCase();
    s.eVar35 = 'D=pageName';
    /* LPID */
    if (s.c_r("riblpid")) {
        s.eVar8 = s.c_r("riblpid");
    }
    if (s.eVar8) {
        s.prop8 = "D=v8";
        s.eVar9 = "customer"; //cust segment
    } else {
        s.eVar9 = "prospect";
    }

    // Setting eVar8 as Customer ID in Marketing Cloud if defined
    if (s.eVar8) {
        if (typeof Visitor != 'undefined') {
            visitor.setCustomerIDs({
                "lpid": {
                    "id": s.eVar8,
                    "authState": 1
                }
            });
        }
    }

    /*Remember Me Cookie*/
    if (s.c_r("RM")) {
        s.contextData['RememberMyId'] = s.c_r("RememberMyId");
    }

    if (!s.c_r("RM")) {
        if (s.c_r("RememberMyId")) {
            s.contextData['RememberMyId'] = s.c_r("RememberMyId");
        }
    }
    /* User Agent */
    s.eVar37 = "D=User-Agent";
    /* Campaign Tracking */
    if (!s.campaign) s.campaign = s.getQueryParam("ecid");
    s.campaign = s.getValOnce(s.campaign, "s_campaign", 0);
    /* Capture Original Referrer for redirect offers */
    if (s.getQueryParam("original_ref")) s.referrer = s.getQueryParam("original_ref");
    /* Internal Campaign */
    if (!s.eVar1) s.eVar1 = s.getQueryParam("icid");
    s.eVar1 = s.getValOnce(s.eVar1, "s_ev1", 0);
    /* Page URL */
    s.pageURL = document.location.href;
    s.prop29 = s.pageURL.split("?")[0];
    if (s.pageURL.match(/usb\/af\(.+\)/i)) {
        s.pageURL = s.pageURL.replace(/usb\/af\(.+\)\//i, '');
        if (s.prop15 && s.prop15.match(/usb:af\(.+\)/i)) s.prop15 = s.prop15.replace(/usb:usb:af\(.+\)/i, 'olb');
        if (s.prop24 && s.prop24.match(/usb:af\(.+\)/i)) s.prop24 = s.prop24.replace(/olb:usb:af\(.+\)/i, 'olb');
        if (s.prop29 && s.prop29.match(/usb\/af\(.+\)/i)) s.prop29 = s.prop29.replace(/\/usb\/af\(.+\)/i, '');
        if (s.prop31 && s.prop31.match(/usb:af\(.+\)/i)) s.prop31 = s.prop31.replace(/usb:usb:af\(.+\)/i, 'olb');
    }
    if (s.pageURL.match(/OLS\/af\(.+\)/i)) {
        s.pageURL = s.pageURL.replace(/\af\(.+\)\//i, '');
        if (s.prop24 && s.prop24.match(/ols:af\(.+\)/i)) s.prop24 = s.prop24.replace(/:af\(.+\)/i, '');
        if (s.prop29 && s.prop29.match(/OLS\/af\(.+\)/i)) s.prop29 = s.prop29.replace(/\/af\(.+\)/i, '');
    }
    if (s.pageURL.match(/OLMM\/af\(.+\)/i)) {
        s.pageURL = s.pageURL.replace(/\af\(.+\)\//i, '');
        if (s.prop24 && s.prop24.match(/OLMM:af\(.+\)/i)) s.prop24 = s.prop24.replace(/:af\(.+\)/i, '');
        if (s.prop29 && s.prop29.match(/OLMM\/af\(.+\)/i)) s.prop29 = s.prop29.replace(/\/af\(.+\)/i, '');
    }
    if (s.pageURL.match(/CM\/af\(.+\)/i)) {
        s.pageURL = s.pageURL.replace(/\af\(.+\)\//i, '');
        if (s.prop24 && s.prop24.match(/CM:af\(.+\)/i)) s.prop24 = s.prop24.replace(/:af\(.+\)/i, '');
        if (s.prop29 && s.prop29.match(/CM\/af\(.+\)/i)) s.prop29 = s.prop29.replace(/\/af\(.+\)/i, '');
    }
    if (s.pageURL.match(/onlinebanking.usbank.com/i)) {
        if (s.prop15 && s.prop15.match(/usb/i)) s.prop15 = s.prop15.replace(/usb/i, 'olb');
        if (s.prop24 && s.prop24.match(/usb:usb/i)) s.prop24 = s.prop24.replace(/usb:usb/i, 'olb');
        if (s.prop24 && s.prop24.match(/olb/i)) s.prop24 = s.prop24.replace(/olb:ccap:af\(.+\)/i, 'olb:ccap');
        if (s.prop24 && s.prop24.match(/olb/i)) s.prop24 = s.prop24.replace(/olb:auth:af\(.+\)/i, 'olb:auth');
        if (s.prop24 && s.prop24.match(/olb/i)) s.prop24 = s.prop24.replace(/olb:mm:af\(.+\)/i, 'olb:mm');
        if (s.prop29 && s.prop29.match(/CCAP\/af\(.+\)/i)) s.prop29 = s.prop29.replace(/\/af\(.+\)/i, '');
        if (s.prop29 && s.prop29.match(/auth\/af\(.+\)/i)) s.prop29 = s.prop29.replace(/\/af\(.+\)/i, '');
        if (s.prop29 && s.prop29.match(/MM\/af\(.+\)/i)) s.prop29 = s.prop29.replace(/\/af\(.+\)/i, '');
        if (s.prop31 && s.prop31.match(/usb/i)) s.prop31 = s.prop31.replace(/usb/i, 'olb');
    }
    if (s.pageURL.match(/onlinebanking2.usbank.com/i)) {
        if (s.prop15 && s.prop15.match(/usb/i)) s.prop15 = s.prop15.replace(/usb/i, 'olb');
        if (s.prop24 && s.prop24.match(/usb:usb/i)) s.prop24 = s.prop24.replace(/usb:usb/i, 'olb');
        if (s.prop24 && s.prop24.match(/olb/i)) s.prop24 = s.prop24.replace(/olb:ccap:af\(.+\)/i, 'olb:ccap');
        if (s.prop24 && s.prop24.match(/olb/i)) s.prop24 = s.prop24.replace(/olb:auth:af\(.+\)/i, 'olb:auth');
        if (s.prop24 && s.prop24.match(/olb/i)) s.prop24 = s.prop24.replace(/olb:mm:af\(.+\)/i, 'olb:mm');
        if (s.prop29 && s.prop29.match(/CCAP\/af\(.+\)/i)) s.prop29 = s.prop29.replace(/\/af\(.+\)/i, '');
        if (s.prop29 && s.prop29.match(/auth\/af\(.+\)/i)) s.prop29 = s.prop29.replace(/\/af\(.+\)/i, '');
        if (s.prop29 && s.prop29.match(/MM\/af\(.+\)/i)) s.prop29 = s.prop29.replace(/\/af\(.+\)/i, '');
        if (s.prop31 && s.prop31.match(/usb/i)) s.prop31 = s.prop31.replace(/usb/i, 'olb');
    }
    if (s.pageURL.match(/onlinebanking.us.bank-dns.com/i)) {
        if (s.prop15 && s.prop15.match(/usb/i)) s.prop15 = s.prop15.replace(/usb/i, 'olb');
        if (s.prop24 && s.prop24.match(/usb:usb/i)) s.prop24 = s.prop24.replace(/usb:usb/i, 'olb');
        if (s.prop24 && s.prop24.match(/olb/i)) s.prop24 = s.prop24.replace(/olb:ccap:af\(.+\)/i, 'olb:ccap');
        if (s.prop24 && s.prop24.match(/olb/i)) s.prop24 = s.prop24.replace(/olb:auth:af\(.+\)/i, 'olb:auth');
        if (s.prop24 && s.prop24.match(/olb/i)) s.prop24 = s.prop24.replace(/olb:MM:af\(.+\)/i, 'olb:mm');
        if (s.prop29 && s.prop29.match(/CCAP\/af\(.+\)/i)) s.prop29 = s.prop29.replace(/\/af\(.+\)/i, '');
        if (s.prop29 && s.prop29.match(/auth\/af\(.+\)/i)) s.prop29 = s.prop29.replace(/\/af\(.+\)/i, '');
        if (s.prop29 && s.prop29.match(/MM\/af\(.+\)/i)) s.prop29 = s.prop29.replace(/\/af\(.+\)/i, '');
        if (s.prop31 && s.prop31.match(/usb/i)) s.prop31 = s.prop31.replace(/usb/i, 'olb');
    }
    s.prop14 = s.eVar90 = "D=g";

    /* Plug-ins and Global Settings */
    s.prop18 = s.getDaysSinceLastVisit('s_lv');
    s.eVar3 = s.getNewRepeat(2000);
    s.prop3 = "D=v3";
    s.prop19 = s.getVisitNum(2000);
    /* Landing Page Event */
    var s_visitStart = s.getVisitStart('sc_visit_start');
    if (s_visitStart == 1 || s_visitStart == "1") {
        s.events = s.apl(s.events, "event15", ",", 2);
    }
    /* 2nd Page of Visit */
    var s_visitFirst = s.getPreviousValue(s_visitStart, "s_visitStart");
    if (s_visitFirst == 1 || s_visitFirst == "1") {
        s.events = s.apl(s.events, "event16", ",", 2);
    }
    /* Percent Page Viewed */
    s.prop17 = s.getPreviousValue(s.pageName ? s.pageName : s.prop24, "s_prevPage");
    s.prop17 = s.prop17 ? s.prop17.replace(/:af\([^:]*/g, '') : '';
    if (s.prop17) {
        var s_ppv = s.getPercentPageViewed();
        s.prop16 = s_ppv[1];
    }

    if (s.linkType == "e") {
        s.prop17 = s.getPreviousValue(s.pageName ? s.pageName : s.prop24, "s_prevPage");
        s.prop17 = s.prop17 ? s.prop17.replace(/:af\([^:]*/g, '') : '';
        if (s.prop17) {
            s.linkTrackVars = 'prop15,prop17';
            s.prop16 = s.getPercentPageViewed();
        }
    }
    /* Time Parting - Central */
    s.prop4 = s.getTimeParting('h', '-6');
    s.prop6 = s.getTimeParting('d', '-6');
    /* User's Date MM/DD/YYYY */
    var SCdate = new Date();
    s.prop7 = (SCdate.getMonth() + 1) + "/" + SCdate.getDate() + "/" + SCdate.getFullYear();
    /* Site Section */
    if (s.prop2 && !s.eVar40) s.eVar40 = s.prop2;
    /* Product View (custom) Event */
    /* if(s.events&&s.events.indexOf('prodView')>-1&&s.events.indexOf('event6,')<0)s.events=s.apl(s. events,"event6",",",2); */
    /* s_code Version */
    s.prop50=(window.visitor && window.visitor.version)?(sc_code_ver+'|Vid_'+window.visitor.version):sc_code_ver; //defined: line 3
    /* Added below if condition to support Target migrate the library from mbox.js to at.js */
    /* Removed outer if condition */
    /* Change done on Jan 19 2017 */
    if (!s.eVar27) {
        var pcId = document.cookie.match(/PC#[^#]*/g);
        s.eVar27 = pcId ? pcId[0].split('#')[1] : '';
    }
    s.tnt = s.trackTNT();
    /* setting prop39 based on EN/EASNonce cookie */
    if (s.c_r("EN")) {
        s.prop39 = 'remember me enabled';
    }

    if (!s.prop39) {
        var temp = s.c_r("EASNonce");
        if (temp) {
            s.prop39 = 'remember me enabled';
        }
    }

    if (s.prop17.match(/mobile/i) || (s.prop24.match(/svilogin/i))) {
        s.prop40 = "mobile";
    } else if (s.prop29.match(/CCAP/i) && s.prop24.match(/login assistance/i)) {
        s.prop40 = "mobile";
    }

    var ua = navigator.userAgent;
    if (!ua) {
        ua = "device unknown";
    }
    var device_name = "";
    var device_type = "";
    var device_auth_type = "";
    var checker = {
        iphone: ua.match(/iPhone/),
        ipad: ua.match(/iPad/),
        android: ua.match(/Android/),
        windowsPhone: ua.match(/Windows Phone/),
        blackBerry: ua.match(/BlackBerry/)
    };
    // order matters for USBAPP
    if (window.deviceAuthType) {
        var device_auth_type_split = window.deviceAuthType.split(":");
        device_auth_type = device_auth_type_split[1];
        device_auth_type = device_auth_type.toLowerCase();
        s.contextData['device_auth_type'] = device_auth_type;

        if (window.deviceAuthType == "mobile: USBAPP") {
            if (checker.android) {
                device_name = "app:android";
                device_type = "android";
            } else if (checker.ipad) {
                device_name = "app:ipad";
                device_type = "ipad";
            } else if (checker.iphone) {
                device_name = "app:iphone";
                device_type = "iphone"
            }

            s.prop1 = "mobile app";
            s.eVar71 = s.prop30 = device_name;
            s.eVar40 = s.prop2 = device_type + device_auth_type;
            s.contextData['device_auth_type_full'] = window.deviceAuthType.toLowerCase();
        } else if (window.deviceAuthType == "mobile: APP") {

            if (checker.android) {
                device_name = "app:android";
                device_type = "android";
            } else if (checker.ipad) {
                device_name = "app:ipad";
                device_type = "ipad";
            } else if (checker.iphone) {
                device_name = "app:iphone";
                device_type = "iphone"
            }

            s.prop1 = "mobile app";
            s.eVar71 = s.prop30 = device_name;
            s.eVar40 = s.prop2 = device_type + device_auth_type;
            s.contextData['device_auth_type_full'] = window.deviceAuthType.toLowerCase();
        } else if (window.deviceAuthType == "mobile: WAP") {

            s.eVar40 = s.prop2 = "wapbase secured";
            if (checker.android) {
                device_name = "wap:android";
                device_type = "android";
            } else if (checker.ipad) {
                device_name = "wap:ipad";
                device_type = "ipad";
            } else if (checker.iphone) {
                device_name = "wap:iphone";
                device_type = "iphone"
            } else if (checker.windowsPhone) {
                device_name = "wap:windowsPhone";
                device_type = "windows phone";
            } else if (checker.blackBerry) {
                device_name = "wap:blackBerry";
                device_type = "blackBerry";
            } else {
                device_name = "wap:other";
            }

            s.prop1 = "mobile wap";
            s.eVar71 = s.prop30 = device_name;
            if (device_type) {
                s.eVar40 = s.prop2 = "waptouch secured";
            }
            s.contextData['device_auth_type_full'] = window.deviceAuthType.toLowerCase();
        } else if (window.deviceAuthType == "mobile: TOUCH") {
            s.eVar40 = s.prop2 = "wapbase secured";
            if (checker.android) {
                device_name = "wap:android";
                device_type = "android";
            } else if (checker.ipad) {
                device_name = "wap:ipad";
                device_type = "ipad";
            } else if (checker.iphone) {
                device_name = "wap:iphone";
                device_type = "iphone"
            } else if (checker.windowsPhone) {
                device_name = "wap:windowsPhone";
                device_type = "windows phone";
            } else if (checker.blackBerry) {
                device_name = "wap:blackBerry";
                device_type = "blackBerry";
            } else {
                device_name = "wap:other";
            }

            s.prop1 = "mobile wap";
            s.eVar71 = s.prop30 = device_name;
            if (device_type) {
                s.eVar40 = s.prop2 = "waptouch secured";
            }
            s.contextData['device_auth_type_full'] = window.deviceAuthType.toLowerCase();
        } else if (window.deviceAuthType == "mobile: Touch") {
            s.eVar40 = s.prop2 = "wapbase secured";
            if (checker.android) {
                device_name = "wap:android";
                device_type = "android";
            } else if (checker.ipad) {
                device_name = "wap:ipad";
                device_type = "ipad";
            } else if (checker.iphone) {
                device_name = "wap:iphone";
                device_type = "iphone"
            } else if (checker.windowsPhone) {
                device_name = "wap:windowsPhone";
                device_type = "windows phone";
            } else if (checker.blackBerry) {
                device_name = "wap:blackBerry";
                device_type = "blackBerry";
            } else {
                device_name = "wap:other";
            }

            s.prop1 = "mobile wap";
            s.eVar71 = s.prop30 = device_name;
            if (device_type) {
                s.eVar40 = s.prop2 = "waptouch secured";
            }
            s.contextData['device_auth_type_full'] = window.deviceAuthType.toLowerCase();
        } else if ((window.deviceAuthType && (window.deviceAuthType != ("mobile: USBAPP" || "mobile: APP" || "mobile: WAP" || "mobile: TOUCH" || "mobile: Touch")))) {
            s.prop1 = "mobile unknown";
            s.eVar71 = s.prop30 = "device unknown";
            s.eVar40 = s.prop2 = "unknown";
            s.contextData['device_auth_type_full'] = window.deviceAuthType.toLowerCase();
        }
    }

    //Grabbing Client Segment Code from CommonDataHelper Object if present

    if (typeof CommonDataHelper != 'undefined') {
        if (CommonDataHelper.UserAndAccountsFromServer.UserInfoResponse.CustomerTypeCode) {
            cd.clientSegmentCode = CommonDataHelper.UserAndAccountsFromServer.UserInfoResponse.CustomerTypeCode;
        }

    }

    //responsive code for processing rules
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    s.contextData['et_dimensions'] = width + 'x' + height;
    s.contextData['et_width'] = width;
    var etratio = height / width;
    if (etratio >= 1) {
        s.contextData['et_orientation'] = "portrait";
    } else {
        s.contextData['et_orientation'] = "landscape";
    }

    for (var cdVar in cd) {
        if (cd.hasOwnProperty(cdVar)) { // check that item is a property of omn

            s.contextData['cd.' + cdVar] = cd[cdVar];
        }
    }

    if (cd.events) {
        s.events = s.apl(s.events, cd.events, ",", 2);
    }
    s.contextData['EVENTS'] = s.events ? s.events + ',' : '';


}

//Clear Context Function

s.clearContext = new Function("", "" + "var s=this;for(var cvr in cd){if(cd.hasOwnProperty(cvr)){delete cd[" + "cvr];}}for(var svr in s.contextData){if(s.contextData.hasOwnPropert" + "y(svr)){delete s.contextData[svr];}}");

/*
 * Cookie Combining Utility v.5
 */

if (!s.__ccucr) {
    s.c_rr = s.c_r;
    s.__ccucr = true;

    function c_r(k) {
        var s = this,
            d = new Date,
            v = s.c_rr(k),
            c = s.c_rspers(),
            i, m, e;
        if (v) return v;
        k = s.escape ? s.escape(k) : encodeURIComponent(k);
        i = c.indexOf(' ' + k + '=');
        c = i < 0 ? s.c_rr('s_sess') : c;
        i = c.indexOf(' ' + k + '=');
        m = i < 0 ? i : c.indexOf('|', i);
        e = i < 0 ? i : c.indexOf(';', i);
        m = m > 0 ? m : e;
        v = i < 0 ? '' : s.unescape ? s.unescape(c.substring(i + 2 + k.length, m < 0 ? c.length : m)) : decodeURIComponent(c.substring(i + 2 + k.length, m < 0 ? c.length : m));
        return v;
    }

    function c_rspers() {
        var s = this,
            cv = s.c_rr("s_pers"),
            date = new Date().getTime(),
            expd = null,
            cvarr = [],
            vcv = "";
        if (!cv) return vcv;
        cvarr = cv.split(";");
        for (var i = 0, l = cvarr.length; i < l; i++) {
            expd = cvarr[i].match(/\|([0-9]+)$/);
            if (expd && parseInt(expd[1]) >= date) {
                vcv += cvarr[i] + ";";
            }
        }
        return vcv;
    }
    s.c_rspers = c_rspers;
    s.c_r = s.cookieRead = c_r;
}
if (!s.__ccucw) {
    s.c_wr = s.c_w;
    s.__ccucw = true;

    function c_w(k, v, e) {
        var s = this,
            d = new Date,
            ht = 0,
            pn = 's_pers',
            sn = 's_sess',
            pc = 0,
            sc = 0,
            pv, sv, c, i, t, f;
        d.setTime(d.getTime() - 60000);
        if (s.c_rr(k)) s.c_wr(k, '', d);
        k = s.escape ? s.escape(k) : encodeURIComponent(k);
        pv = s.c_rspers();
        i = pv.indexOf(' ' + k + '=');
        if (i > -1) {
            pv = pv.substring(0, i) + pv.substring(pv.indexOf(';', i) + 1);
            pc = 1;
        }
        sv = s.c_rr(sn);
        i = sv.indexOf(' ' + k + '=');
        if (i > -1) {
            sv = sv.substring(0, i) + sv.substring(sv.indexOf(';', i) + 1);
            sc = 1;
        }
        d = new Date;
        if (e) {
            if (e == 1) e = new Date, f = e.getYear(), e.setYear(f + 5 + (f < 1900 ? 1900 : 0));
            if (e.getTime() > d.getTime()) {
                pv += ' ' + k + '=' + (s.escape ? s.escape(v) : encodeURIComponent(v)) + '|' + e.getTime() + ';';
                pc = 1;
            }
        } else {
            sv += ' ' + k + '=' + (s.escape ? s.escape(v) : encodeURIComponent(v)) + ';';
            sc = 1;
        }
        sv = sv.replace(/%00/g, '');
        pv = pv.replace(/%00/g, '');
        if (sc) s.c_wr(sn, sv, 0);
        if (pc) {
            t = pv;
            while (t && t.indexOf(';') != -1) {
                var t1 = parseInt(t.substring(t.indexOf('|') + 1, t.indexOf(';')));
                t = t.substring(t.indexOf(';') + 1);
                ht = ht < t1 ? t1 : ht;
            }
            d.setTime(ht);
            s.c_wr(pn, pv, d);
        }
        return v == s.c_r(s.unescape ? s.unescape(k) : decodeURIComponent(k));
    }
    s.c_w = s.cookieWrite = c_w;
}
/*
 * getQueryParam v2.5 - H-code and AppMeasurement Compatible
 */
s.getQueryParam = new Function("p", "d", "u", "h", "" + "var s=this,v='',i,j,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:(s.wd?s.w" + "d.location:window.location));while(p){i=p.indexOf(',');i=i<0?p.leng" + "th:i;t=s.p_gpv(p.substring(0,i),u+'',h);if(t){t=t.indexOf('#')>-1?t" + ".substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i==p." + "length?i:i+1)}return v");
s.p_gpv = new Function("k", "u", "h", "" + "var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.sub" + "string(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf = new Function("t", "k", "" + "if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T" + "rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s." + "epa?s.epa(v):s.unescape(v);}return''");
/*
 * TNT Integration Plugin v2.0
 */
s.trackTNT = new Function("v", "p", "b", "" + "var s=this,n='s_tnt',q='s_tntref',p=(p)?p:n,v=(v)?v:n,r='',pm=false" + ",b=(b)?b:true;if(s.Util.getQueryParam(q)!=''){s.referrer=s.Util.get" + "QueryParam(q);}else if(s.c_r(q)!=''){s.referrer=s.c_r(q);document.c" + "ookie=q+'=;path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT;';}else if(" + "(document.cookie.indexOf(q)!=-1&&s.c_r(q)=='')||(location.search.in" + "dexOf(q+'=')!=-1&&s.Util.getQueryParam(q)=='')){s.referrer='Typed/B" + "ookmarked';document.cookie=q+'=;path=/;expires=Thu, 01-Jan-1970 00:" + "00:01 GMT;';}if(s.Util.getQueryParam(p)!=''){pm=s.Util.getQueryPara" + "m(p);}else if(s.c_r(p)){pm=s.c_r(p);document.cookie=p+'=;path=/;exp" + "ires=Thu, 01-Jan-1970 00:00:01 GMT;';}else if(s.c_r(p)==''&&s.Util." + "getQueryParam(p)==''){pm='';}if(pm)r+=(pm+',');if(window[v]!=undefi" + "ned)r+=window[v];if(b)window[v]='';return r;");
/*
 * Plugin: Days since last Visit 1.1.H - capture time from last visit
 */
s.getDaysSinceLastVisit = new Function("c", "" + "var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT" + "ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.s" + "etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f" + "2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f" + "5='Less than 1 day';cval=s.c_r(c);if(cval.length==0){s.c_w(c,ct,e);" + "s.c_w(c+'_s',f1,es);}else{var d=ct-cval;if(d>30*60*1000){if(d>30*da" + "y){s.c_w(c,ct,e);s.c_w(c+'_s',f2,es);}else if(d<30*day+1 && d>7*day" + "){s.c_w(c,ct,e);s.c_w(c+'_s',f3,es);}else if(d<7*day+1 && d>day){s." + "c_w(c,ct,e);s.c_w(c+'_s',f4,es);}else if(d<day+1){s.c_w(c,ct,e);s.c" + "_w(c+'_s',f5,es);}}else{s.c_w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c" + "+'_s',cval_ss,es);}}cval_s=s.c_r(c+'_s');if(cval_s.length==0) retur" + "n f0;else if(cval_s!=f1&&cval_s!=f2&&cval_s!=f3&&cval_s!=f4&&cval_s" + "!=f5) return '';else return cval_s;");
/*
 * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
 */
s.getNewRepeat = new Function("d", "cn", "" + "var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:" + "'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length=" + "=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct" + "-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N" + "ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");
/*
 * Plugin: getVisitStart v2.0 - returns 1 on 1st page of visit, else 0
 */
s.getVisitStart = new Function("c", "" + "var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);if(s.c_r(c" + ")){v=0}if(!s.c_w(c,1,t)){s.c_w(c,1,0)}if(!s.c_r(c)){v=0}return v;");
/*
 * Plugin: getAndPersistValue 0.3 - get a value on every page
 */
s.getAndPersistValue = new Function("v", "c", "e", "" + "var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if(" + "v)s.c_w(c,v,e?a:0);return s.c_r(c);");
/* Copies variables from one object into another */
s.scCopy = new Function("src", "dest", "" + "for (i in src)dest[i]=src[i];");
/*
 * Plugin: getValOnce 0.2 - get a value once per session or number of days
 */
s.getValOnce = new Function("v", "c", "e", "" + "var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime(" + ")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");
/* Plugin: getPreviousValue_v1.0 - return previous value of designated */
s.getPreviousValue = new Function("v", "c", "el", "" + "var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el" + "){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i" + "){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)" + ":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?" + "s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
/*
 * Plugin: getPercentPageViewed 2.0 (Minified)
 */
s.handlePPVevents = function() {
    if (!s_c_il) return;
    for (var i = 0, scill = s_c_il.length; i < scill; i++)
        if (typeof s_c_il[i] != "undefined" && s_c_il[i]._c && s_c_il[i]._c == "s_c") {
            var s = s_c_il[i];
            break
        }
    if (!s) return;
    if (!s.getPPVid) return;
    var dh = Math.max(Math.max(s.d.body.scrollHeight, s.d.documentElement.scrollHeight), Math.max(s.d.body.offsetHeight, s.d.documentElement.offsetHeight), Math.max(s.d.body.clientHeight, s.d.documentElement.clientHeight)),
        vph = window.innerHeight || (s.d.documentElement.clientHeight || s.d.body.clientHeight),
        st = window.pageYOffset || (window.document.documentElement.scrollTop || window.document.body.scrollTop),
        vh = st + vph,
        pv = Math.min(Math.round(vh / dh * 100), 100),
        c = "";
    if (!s.c_r("tp") || decodeURIComponent(s.c_r("s_ppv").split(",")[0]) != s.getPPVid || s.ppvChange == "1" && (s.c_r("tp") && dh != s.c_r("tp"))) {
        s.c_w("tp", dh);
        s.c_w("s_ppv", "")
    } else c = s.c_r("s_ppv");
    var a = c && c.indexOf(",") > -1 ? c.split(",", 4) : [],
        id = a.length > 0 ? a[0] : escape(s.getPPVid),
        cv = a.length > 1 ? parseInt(a[1]) : 0,
        p0 = a.length > 2 ? parseInt(a[2]) : pv,
        cy = a.length > 3 ? parseInt(a[3]) :
            0,
        cn = pv > 0 ? id + "," + (pv > cv ? pv : cv) + "," + p0 + "," + (vh > cy ? vh : cy) : "";
    s.c_w("s_ppv", cn)
};
s.getPercentPageViewed = function(pid, change) {
    var s = this,
        ist = !s.getPPVid ? true : false;
    pid = pid ? pid : s.pageName ? s.pageName : document.location.href;
    s.ppvChange = change ? change : "1";
    if (typeof s.linkType != "undefined" && s.linkType != "0" && s.linkType != "" && s.linkType != "e") return "";
    var v = s.c_r("s_ppv"),
        a = v.indexOf(",") > -1 ? v.split(",", 4) : [];
    if (a && a.length < 4) {
        for (var i = 3; i > 0; i--) a[i] = i < a.length ? a[i - 1] : "";
        a[0] = ""
    }
    if (a) a[0] = unescape(a[0]);
    if (!s.getPPVid || s.getPPVid != pid) {
        s.getPPVid = pid;
        s.c_w("s_ppv", escape(s.getPPVid));
        s.handlePPVevents()
    }
    if (ist)
        if (window.addEventListener) {
            window.addEventListener("load",
                s.handlePPVevents, false);
            window.addEventListener("click", s.handlePPVevents, false);
            window.addEventListener("scroll", s.handlePPVevents, false);
            window.addEventListener("resize", s.handlePPVevents, false)
        } else if (window.attachEvent) {
        window.attachEvent("onload", s.handlePPVevents);
        window.attachEvent("onclick", s.handlePPVevents);
        window.attachEvent("onscroll", s.handlePPVevents);
        window.attachEvent("onresize", s.handlePPVevents)
    }
    return pid != "-" ? a : a[1]
};
/*
 * Plugin: getTimeParting 2.0
 */
s.getTimeParting = new Function("t", "z", "y", "l", "" + "var s=this,d,A,U,X,Z,W,B,C,D,Y,mint;d=new Date();A=d.getFullYear();Y=U=S" + "tring(A);if(s.dstStart&&s.dstEnd){B=s.dstStart;C=s.dstEnd}else{;U=U" + ".substring(2,4);X='090801|101407|111306|121104|131003|140902|150801" + "|161306|171205|181104|191003';X=s.split(X,'|');for(W=0;W<=10;W++){Z" + "=X[W].substring(0,2);if(U==Z){B=X[W].substring(2,4);C=X[W].substrin" + "g(4,6)}}if(!B||!C){B='08';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;}D" + "=new Date('1/1/2000');if(D.getDay()!=6||D.getMonth()!=0){return'Dat" + "a Not Available'}else{z=z?z:'0';z=parseFloat(z);B=new Date(B);C=new" + " Date(C);W=new Date();if(W>B&&W<C&&l!='0'){z=z+1}W=W.getTime()+(W.g" + "etTimezoneOffset()*60000);W=new Date(W+(3600000*z));X=['Sunday','Mo" + "nday','Tuesday','Wednesday','Thursday','Friday','Saturday'];B=W.get" + "Hours();C=W.getMinutes();D=W.getDay();Z=X[D];U='AM';A='Weekday';X='" + "00';if(C>=15&&C<30){X='15'}if(C>=30&&C<45){X='30'}if(C>=45&&C<60){X='45'}" + "if(B>=12){U='PM';B=B-12};if(B==0){B=12};if(D==6" + "||D==0){A='Weekend'}W=B+':'+X+U;if(y&&y!=Y){return'Data Not Availab" + "le'}else{if(t){if(t=='m'){mint=B+':'+C+U;return mint}if(t=='h'){return W}if(t=='d'){return Z}if(t=='w'){r" + "eturn A}}else{return Z+', '+W}}}");
/*
 * Plugin: getPageName v2.1 - parse URL and return
 */
s.getPageName = new Function("u", "" + "var s=this,v=u?u:''+s.wd.location,x=v.indexOf(':'),y=v.indexOf('/'," + "x+4),z=v.indexOf('?'),c=s.pathConcatDelim,e=s.pathExcludeDelim,g=s." + "queryVarsList,d=s.siteID,n=d?d:'',q=z<0?'':v.substring(z+1),p=v.sub" + "string(y+1,q?z:v.length);z=p.indexOf('#');p=z<0?p:s.fl(p,z);x=e?p.i" + "ndexOf(e):-1;p=x<0?p:s.fl(p,x);p+=!p||p.charAt(p.length-1)=='/'?s.d" + "efaultPage:'';y=c?c:'/';while(p){x=p.indexOf('/');x=x<0?p.length:x;" + "z=s.fl(p,x);if(!s.pt(s.pathExcludeList,',','p_c',z))n+=n?y+z:z;p=p." + "substring(x+1)}y=c?c:'?';while(g){x=g.indexOf(',');x=x<0?g.length:x" + ";z=s.fl(g,x);z=s.pt(q,'&','p_c',z);if(z){n+=n?y+z:z;y=c?c:'&'}g=g.s" + "ubstring(x+1)}return n");
/* s.join: 1.0 - s.join(v,p)*/
s.join = new Function("v", "p", "" + "var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back" + ":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0" + ";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el" + "se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");
/* Utility Function: p_c */
s.p_c = new Function("v", "c", "" + "var x=v.indexOf('=');return c.toLowerCase()==v.substring(0,x<0?v.le" + "ngth:x).toLowerCase()?v:0");
/*
 * Plugin Utility: apl v1.1
 */
s.apl = new Function("l", "v", "d", "u", "" + "var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a." + "length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas" + "e()));}}if(!m)l=l?l+d+v:v;return l");
/*
 * Plugin Utility: Replace v1.0
 */
s.repl = new Function("x", "o", "n", "" + "var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x." + "substring(i+o.length);i=x.indexOf(o,i+l)}return x");
/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split = new Function("l", "d", "" + "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x" + "++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
/*
 * Partner Plugin: DFA Check 1.0 - Restrict DFA calls to once a visit, per report suite, per click
 * through. Used in conjunction with VISTA. Deduplicates SCM hits.
 */

s.partnerDFACheck = new Function("cfg", "" + "var s=this,c=cfg.visitCookie,src=cfg.clickThroughParam,scp=cfg.searchCenterParam,p=cfg.newRsidsProp,tv=cfg.tEvar,dl=',',cr,nc,q,g,gs,i,j,k,fnd,v=1,t=new Date,cn=0,ca=new Array,aa=new Array,cs=new A" + "rray;t.setTime(t.getTime()+1800000);cr=s.c_r(c);if(cr){v=0;}ca=s.split(cr,dl);if(s.un)aa=s.split(s.un,dl);else aa=s.split(s.account,dl);for(i=0;i<aa.length;i++){fnd = 0;for(j=0;j<ca.length;j++){if(aa[i] == ca[j]){fnd=1;}}if(!fnd){cs[cn" + "]=aa[i];cn++;}}if(cs.length){for(k=0;k<cs.length;k++){nc=(nc?nc+dl:'')+cs[k];}cr=(cr?cr+dl:'')+nc;s.vpr(p,nc);v=1;}if(s.wd)q=s.wd.location.search.toLowerCase();else q=s.w.location.search.toLowerCase();q=s.repl(q,'?','&');g=q.indexOf('&'+src.toLow" + "erCase()+'=');gs=(scp)?q.indexOf('&'+scp.toLowerCase()+'='):-1;if(g>-1){s.vpr(p,cr);v=1;}else if(gs>-1){v=0;s.vpr(tv,'SearchCenter Visitors');}if(!s.c_w(c,cr,t)){s.c_w(c,cr,0);}if(!s.c_r(c)){v=0;}r" + "eturn v>=1;");

/*
 * Utility Function: vpr - set the variable vs with value v
 */
s.vpr = new Function("vs", "v",
    "if(typeof(v)!='undefined' && vs){var s=this; eval('s.'+vs+'=\"'+v+'\"')}");

/*
 *first load only plugin
 */
s.p_fo = new Function("n", "" + "var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]=" + "new Object;return 1;}else {return 0;}");
/*
 * Plugin: getVisitNum - version 3.0
 */
s.getVisitNum = new Function("tp", "c", "c2", "" + "var s=this,e=new Date,cval,cvisit,ct=e.getTime(),d;if(!tp){tp='m';}" + "if(tp=='m'||tp=='w'||tp=='d'){eo=s.endof(tp),y=eo.getTime();e.setTi" + "me(y);}else {d=tp*86400000;e.setTime(ct+d);}if(!c){c='s_vnum';}if(!" + "c2){c2='s_invisit';}cval=s.c_r(c);if(cval){var i=cval.indexOf('&vn=" + "'),str=cval.substring(i+4,cval.length),k;}cvisit=s.c_r(c2);if(cvisi" + "t){if(str){e.setTime(ct+1800000);s.c_w(c2,'true',e);return str;}els" + "e {return 'unknown visit number';}}else {if(str){str++;k=cval.substri" + "ng(0,i);e.setTime(k);s.c_w(c,k+'&vn='+str,e);e.setTime(ct+1800000);" + "s.c_w(c2,'true',e);return str;}else {s.c_w(c,e.getTime()+'&vn=1',e)" + ";e.setTime(ct+1800000);s.c_w(c2,'true',e);return 1;}}");
s.dimo = new Function("m", "y", "" + "var d=new Date(y,m+1,0);return d.getDate();");
s.endof = new Function("x", "" + "var t=new Date;t.setHours(0);t.setMinutes(0);t.setSeconds(0);if(x==" + "'m'){d=s.dimo(t.getMonth(),t.getFullYear())-t.getDate()+1;}else if(" + "x=='w'){d=7-t.getDay();}else {d=1;}t.setDate(t.getDate()+d);return " + "t;");

s.wd = window;
s.fl = new Function("x", "l", "" + "return x?(''+x).substring(0,l):x");
s.pt = new Function("x", "d", "f", "a", "" + "var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t" + ".substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substri" + "ng(z,x.length);t=z<x.length?t:''}return'';");

/* Configure Modules and Plugins */
s.loadModule("Integrate")
/************************** DFA VARIABLES **************************/
/* @TODO: Fill in these variables with the settings mapped in the
 * DFA wizard and that match your desired preferences. Some of the
 * variables are optional and have been labeled as such below.
 * @TODO: Comments should be removed in a production deployment. */
var dfaConfig = {
    CSID: '1521091', // DFA Client Site ID
    SPOTID: '3033967', // DFA Spotlight ID
    tEvar: 'eVar57', // Transfer variable, typically the "View Through" eVar.
    errorEvar: 'eVar59', // DFA error tracking (optional)
    timeoutEvent: 'event64', // Tracks timeouts/empty responses (optional)
    requestURL: "http://fls.doubleclick.net/json?spot=[SPOTID]&src=[CSID]&var=[VAR]&host=integrate.112.2o7.net%2Fdfa_echo%3Fvar%3D[VAR]%26AQE%3D1%26A2S%3D1&ord=[RAND]", // the DFA request URL
    maxDelay: "2500", // The maximum time to wait for DFA servers to respond, in milliseconds.
    visitCookie: "s_dfa", // The name of the visitor cookie to use to restrict DFA calls to once per visit.
    clickThroughParam: "CID", // A query string paramter that will force the DFA call to occur.
    searchCenterParam: "s_kwcid", // SearchCenter identifier.
    newRsidsProp: undefined //"prop34" // Stores the new report suites that need the DFA tracking code. (optional)
};
/************************ END DFA Variables ************************/
s.maxDelay = dfaConfig.maxDelay;
s.loadModule("Integrate")
s.Integrate.onLoad = function(s, m) {
    var dfaCheck = s.partnerDFACheck(dfaConfig);
    if (dfaCheck) {
        s.Integrate.add("DFA");
        s.Integrate.DFA.tEvar = dfaConfig.tEvar;
        s.Integrate.DFA.errorEvar = dfaConfig.errorEvar;
        s.Integrate.DFA.timeoutEvent = dfaConfig.timeoutEvent;
        s.Integrate.DFA.CSID = dfaConfig.CSID;
        s.Integrate.DFA.SPOTID = dfaConfig.SPOTID;
        s.Integrate.DFA.get(dfaConfig.requestURL);
        s.Integrate.DFA.setVars = function(s, p) {
            if (window[p.VAR]) { // got a response
                if (!p.ec) { // no errors
                    s[p.tEvar] = "DFA-" + (p.lis ? p.lis : 0) + "-" + (p.lip ? p.lip : 0) + "-" + (p.lastimp ? p.lastimp : 0) + "-" + (p.lastimptime ? p.lastimptime : 0) + "-" + (p.lcs ? p.lcs : 0) + "-" + (p.lcp ? p.lcp : 0) + "-" + (p.lastclk ? p.lastclk : 0) + "-" + (p.lastclktime ? p.lastclktime : 0)
                } else if (p.errorEvar) { // got an error response, track
                    s[p.errorEvar] = p.ec;
                }
            } else if (p.timeoutEvent) { // empty response or timeout
                s.events = ((!s.events || s.events == '') ? '' : (s.events + ',')) + p.timeoutEvent; // timeout event
            }
        }
    }
}

function AppMeasurement_Module_Integrate(l) {
    var c = this;
    c.s = l;
    var e = window;
    e.s_c_in || (e.s_c_il = [], e.s_c_in = 0);
    c._il = e.s_c_il;
    c._in = e.s_c_in;
    c._il[c._in] = c;
    e.s_c_in++;
    c._c = "s_m";
    c.list = [];
    c.add = function(d, b) {
        var a;
        b || (b = "s_Integrate_" + d);
        e[b] || (e[b] = {});
        a = c[d] = e[b];
        a.a = d;
        a.e = c;
        a._c = 0;
        a._d = 0;
        void 0 == a.disable && (a.disable = 0);
        a.get = function(b, d) {
            var f = document,
                h = f.getElementsByTagName("HEAD"),
                k;
            if (!a.disable && (d || (v = "s_" + c._in + "_Integrate_" + a.a + "_get_" + a._c), a._c++, a.VAR = v, a.CALLBACK = "s_c_il[" + c._in + "]." +
                a.a + ".callback", a.delay(), h = h && 0 < h.length ? h[0] : f.body)) try {
                k = f.createElement("SCRIPT"), k.type = "text/javascript", k.setAttribute("async", "async"), k.src = c.c(a, b), 0 > b.indexOf("[CALLBACK]") && (k.onload = k.onreadystatechange = function() {
                    a.callback(e[v])
                }), h.firstChild ? h.insertBefore(k, h.firstChild) : h.appendChild(k)
            } catch (l) {}
        };
        a.callback = function(b) {
            var c;
            if (b)
                for (c in b) Object.prototype[c] || (a[c] = b[c]);
            a.ready()
        };
        a.beacon = function(b) {
            var d = "s_i_" + c._in + "_Integrate_" + a.a + "_" + a._c;
            a.disable || (a._c++, d = e[d] =
                new Image, d.src = c.c(a, b))
        };
        a.script = function(b) {
            a.get(b, 1)
        };
        a.delay = function() {
            a._d++
        };
        a.ready = function() {
            a._d--;
            a.disable || l.delayReady()
        };
        c.list.push(d)
    };
    c._g = function(d) {
        var b, a = (d ? "use" : "set") + "Vars";
        for (d = 0; d < c.list.length; d++)
            if ((b = c[c.list[d]]) && !b.disable && b[a]) try {
                b[a](l, b)
            } catch (e) {}
    };
    c._t = function() {
        c._g(1)
    };
    c._d = function() {
        var d, b;
        for (d = 0; d < c.list.length; d++)
            if ((b = c[c.list[d]]) && !b.disable && 0 < b._d) return 1;
        return 0
    };
    c.c = function(c, b) {
        var a, e, g, f;
        "http" != b.toLowerCase().substring(0, 4) &&
            (b = "http://" + b);
        l.ssl && (b = l.replace(b, "http:", "https:"));
        c.RAND = Math.floor(1E13 * Math.random());
        for (a = 0; 0 <= a;) a = b.indexOf("[", a), 0 <= a && (e = b.indexOf("]", a), e > a && (g = b.substring(a + 1, e), 2 < g.length && "s." == g.substring(0, 2) ? (f = l[g.substring(2)]) || (f = "") : (f = "" + c[g], f != c[g] && parseFloat(f) != c[g] && (g = 0)), g && (b = b.substring(0, a) + encodeURIComponent(f) + b.substring(e + 1)), a = e));
        return b
    }
}

function AppMeasurement_Module_ActivityMap(f) {
    function g(a, d) {
        var b, c, n;
        if (a && d && (b = e.c[d] || (e.c[d] = d.split(","))))
            for (n = 0; n < b.length && (c = b[n++]);)
                if (-1 < a.indexOf(c)) return null;
        p = 1;
        return a
    }

    function q(a, d, b, c, e) {
        var g, h;
        if (a.dataset && (h = a.dataset[d])) g = h;
        else if (a.getAttribute)
            if (h = a.getAttribute("data-" + b)) g = h;
            else if (h = a.getAttribute(b)) g = h;
        if (!g && f.useForcedLinkTracking && e && (g = "", d = a.onclick ? "" + a.onclick : "")) {
            b = d.indexOf(c);
            var l, k;
            if (0 <= b) {
                for (b += 10; b < d.length && 0 <= "= \t\r\n".indexOf(d.charAt(b));) b++;
                if (b < d.length) {
                    h = b;
                    for (l = k = 0; h < d.length && (";" != d.charAt(h) || l);) l ? d.charAt(h) != l || k ? k = "\\" == d.charAt(h) ? !k : 0 : l = 0 : (l = d.charAt(h), '"' != l && "'" != l && (l = 0)), h++;
                    if (d = d.substring(b, h)) a.e = new Function("s", "var e;try{s.w." + c + "=" + d + "}catch(e){}"), a.e(f)
                }
            }
        }
        return g || e && f.w[c]
    }

    function r(a, d, b) {
        var c;
        return (c = e[d](a, b)) && (p ? (p = 0, c) : g(k(c), e[d + "Exclusions"]))
    }

    function s(a, d, b) {
        var c;
        if (a && !(1 === (c = a.nodeType) && (c = a.nodeName) && (c = c.toUpperCase()) && t[c]) && (1 === a.nodeType && (c = a.nodeValue) && (d[d.length] = c), b.a ||
            b.t || b.s || !a.getAttribute || ((c = a.getAttribute("alt")) ? b.a = c : (c = a.getAttribute("title")) ? b.t = c : "IMG" == ("" + a.nodeName).toUpperCase() && (c = a.getAttribute("src") || a.src) && (b.s = c)), (c = a.childNodes) && c.length))
            for (a = 0; a < c.length; a++) s(c[a], d, b)
    }

    function k(a) {
        if (null == a || void 0 == a) return a;
        try {
            return a.replace(RegExp("^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+", "mg"), "").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$",
                "mg"), "").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}", "mg"), " ").substring(0, 254)
        } catch (d) {}
    }
    var e = this;
    e.s = f;
    var m = window;
    m.s_c_in || (m.s_c_il = [], m.s_c_in = 0);
    e._il = m.s_c_il;
    e._in = m.s_c_in;
    e._il[e._in] = e;
    m.s_c_in++;
    e._c = "s_m";
    e.c = {};
    var p = 0,
        t = {
            SCRIPT: 1,
            STYLE: 1,
            LINK: 1,
            CANVAS: 1
        };
    e._g = function() {
        var a, d, b, c = f.contextData,
            e = f.linkObject;
        (a = f.pageName || f.pageURL) && (d = r(e, "link", f.linkName)) && (b = r(e, "region")) && (c["a.activitymap.page"] = a.substring(0,
                255), c["a.activitymap.link"] = 128 < d.length ? d.substring(0, 128) : d, c["a.activitymap.region"] = 127 < b.length ? b.substring(0, 127) : b, c["a.activitymap.pageIDType"] = f.pageName ? 1 : 0)
    };
    e.link = function(a, d) {
        var b;
        if (d) b = g(k(d), e.linkExclusions);
        else if ((b = a) && !(b = q(a, "sObjectId", "s-object-id", "s_objectID", 1))) {
            var c, f;
            (f = g(k(a.innerText || a.textContent), e.linkExclusions)) || (s(a, c = [], b = {
                a: void 0,
                t: void 0,
                s: void 0
            }), (f = g(k(c.join("")))) || (f = g(k(b.a ? b.a : b.t ? b.t : b.s ? b.s : void 0))) || !(c = (c = a.tagName) && c.toUpperCase ? c.toUpperCase() :
                "") || ("INPUT" == c || "SUBMIT" == c && a.value ? f = g(k(a.value)) : "IMAGE" == c && a.src && (f = g(k(a.src)))));
            b = f
        }
        return b
    };
    e.region = function(a) {
        for (var d, b = e.regionIDAttribute || "id"; a && (a = a.parentNode);) {
            if (d = q(a, b, b, b)) return d;
            if ("BODY" == a.nodeName) return "BODY"
        }
    }
}
/* End ActivityMap Module */


/****************************** MODULES *****************************/
s.loadModule("AudienceManagement");

function AppMeasurement_Module_AudienceManagement(d) {
    var a = this;
    a.s = d;
    var b = window;
    b.s_c_in || (b.s_c_il = [], b.s_c_in = 0);
    a._il = b.s_c_il;
    a._in = b.s_c_in;
    a._il[a._in] = a;
    b.s_c_in++;
    a._c = "s_m";
    a.setup = function(c) {
        b.DIL && c && (c.disableDefaultRequest = !0, c.disableScriptAttachment = !0, a.instance = b.DIL.create(c), a.tools = b.DIL.tools)
    };
    a.isReady = function() {
        return a.instance ? !0 : !1
    };
    a.getEventCallConfigParams = function() {
        return a.instance && a.instance.api && a.instance.api.getEventCallConfigParams ? a.instance.api.getEventCallConfigParams() : {}
    };
    a.passData = function(b) {
        a.instance && a.instance.api && a.instance.api.passData && a.instance.api.passData(b)
    }
}
"function" !== typeof window.DIL && (window.DIL = function(a, c) {
    var d = [],
        b, g;
    a !== Object(a) && (a = {});
    var f, k, n, u, s, m, p, y, x, J, K, D;
    f = a.partner;
    k = a.containerNSID;
    n = !! a.disableDestinationPublishingIframe;
    u = a.iframeAkamaiHTTPS;
    s = a.mappings;
    m = a.uuidCookie;
    p = !0 === a.enableErrorReporting;
    y = a.visitorService;
    x = a.declaredId;
    J = !0 === a.removeFinishedScriptsAndCallbacks;
    K = !0 === a.delayAllUntilWindowLoad;
    D = !0 === a.disableIDSyncs;
    var L, M, N, G, E, O, P, Q;
    L = !0 === a.disableScriptAttachment;
    M = !0 === a.disableCORSFiring;
    N = !0 === a.disableDefaultRequest;
    G = a.afterResultForDefaultRequest;
    E = a.dpIframeSrc;
    O = !0 === a.testCORS;
    P = !0 === a.useJSONPOnly;
    Q = a.visitorConstructor;
    p && DIL.errorModule.activate();
    var R = !0 === window._dil_unit_tests;
    (b = c) && d.push(b + "");
    if (!f || "string" !== typeof f) return b = "DIL partner is invalid or not specified in initConfig", DIL.errorModule.handleError({
        name: "error",
        message: b,
        filename: "dil.js"
    }), Error(b);
    b = "DIL containerNSID is invalid or not specified in initConfig, setting to default of 0";
    if (k || "number" === typeof k) k = parseInt(k, 10), !isNaN(k) && 0 <= k && (b = "");
    b && (k = 0, d.push(b), b = "");
    g = DIL.getDil(f, k);
    if (g instanceof DIL && g.api.getPartner() === f && g.api.getContainerNSID() === k) return g;
    if (this instanceof DIL) DIL.registerDil(this, f, k);
    else return new DIL(a, "DIL was not instantiated with the 'new' operator, returning a valid instance with partner = " + f + " and containerNSID = " + k);
    var B = {
        IS_HTTPS: "https:" === document.location.protocol,
        POST_MESSAGE_ENABLED: !! window.postMessage,
        COOKIE_MAX_EXPIRATION_DATE: "Tue, 19 Jan 2038 03:14:07 UTC"
    }, H = {
            stuffed: {}
        }, l = {}, q = {
            firingQueue: [],
            fired: [],
            firing: !1,
            sent: [],
            errored: [],
            reservedKeys: {
                sids: !0,
                pdata: !0,
                logdata: !0,
                callback: !0,
                postCallbackFn: !0,
                useImageRequest: !0
            },
            callbackPrefix: "demdexRequestCallback",
            firstRequestHasFired: !1,
            useJSONP: !0,
            abortRequests: !1,
            num_of_jsonp_responses: 0,
            num_of_jsonp_errors: 0,
            num_of_cors_responses: 0,
            num_of_cors_errors: 0,
            corsErrorSources: [],
            num_of_img_responses: 0,
            num_of_img_errors: 0,
            toRemove: [],
            removed: [],
            readyToRemove: !1,
            platformParams: {
                d_nsid: k + "",
                d_rtbd: "json",
                d_jsonv: DIL.jsonVersion + "",
                d_dst: "1"
            },
            nonModStatsParams: {
                d_rtbd: !0,
                d_dst: !0,
                d_cts: !0,
                d_rs: !0
            },
            modStatsParams: null,
            adms: {
                TIME_TO_CATCH_ALL_REQUESTS_RELEASE: 2E3,
                calledBack: !1,
                mid: null,
                noVisitorAPI: !1,
                instance: null,
                releaseType: "no VisitorAPI",
                admsProcessingStarted: !1,
                process: function(e) {
                    try {
                        if (!this.admsProcessingStarted) {
                            this.admsProcessingStarted = !0;
                            var t = this,
                                a, h, b, d, c;
                            if ("function" === typeof e && "function" === typeof e.getInstance) {
                                if (y === Object(y) && (a = y.namespace) && "string" === typeof a) h = e.getInstance(a, {
                                    idSyncContainerID: k
                                });
                                else {
                                    this.releaseType = "no namespace";
                                    this.releaseRequests();
                                    return
                                } if (h === Object(h) && "function" === typeof h.isAllowed && "function" === typeof h.getMarketingCloudVisitorID && "function" === typeof h.getCustomerIDs) {
                                    if (!h.isAllowed()) {
                                        this.releaseType = "VisitorAPI not allowed";
                                        this.releaseRequests();
                                        return
                                    }
                                    this.instance = h;
                                    b = function(e) {
                                        "VisitorAPI" !== t.releaseType && (t.mid = e, t.releaseType = "VisitorAPI", t.releaseRequests())
                                    };
                                    R && (d = y.server) && "string" === typeof d && (h.server = d);
                                    c = h.getMarketingCloudVisitorID(b);
                                    if ("string" ===
                                        typeof c && c.length) {
                                        b(c);
                                        return
                                    }
                                    setTimeout(function() {
                                        "VisitorAPI" !== t.releaseType && (t.releaseType = "timeout", t.releaseRequests())
                                    }, this.TIME_TO_CATCH_ALL_REQUESTS_RELEASE);
                                    return
                                }
                                this.releaseType = "invalid instance"
                            } else this.noVisitorAPI = !0;
                            this.releaseRequests()
                        }
                    } catch (f) {
                        this.releaseRequests()
                    }
                },
                releaseRequests: function() {
                    this.calledBack = !0;
                    q.registerRequest()
                },
                getMarketingCloudVisitorID: function() {
                    return this.instance ? this.instance.getMarketingCloudVisitorID() : null
                },
                getMIDQueryString: function() {
                    var e =
                        w.isPopulatedString,
                        t = this.getMarketingCloudVisitorID();
                    e(this.mid) && this.mid === t || (this.mid = t);
                    return e(this.mid) ? "d_mid=" + this.mid + "&" : ""
                },
                getCustomerIDs: function() {
                    return this.instance ? this.instance.getCustomerIDs() : null
                },
                getCustomerIDsQueryString: function(e) {
                    if (e === Object(e)) {
                        var t = "",
                            a = [],
                            h = [],
                            b, d;
                        for (b in e) e.hasOwnProperty(b) && (h[0] = b, d = e[b], d === Object(d) && (h[1] = d.id || "", h[2] = d.authState || 0, a.push(h), h = []));
                        if (h = a.length)
                            for (e = 0; e < h; e++) t += "&d_cid_ic=" + a[e].join("%01");
                        return t
                    }
                    return ""
                }
            },
            declaredId: {
                declaredId: {
                    init: null,
                    request: null
                },
                declaredIdCombos: {},
                setDeclaredId: function(e, t) {
                    var a = w.isPopulatedString,
                        h = encodeURIComponent;
                    if (e === Object(e) && a(t)) {
                        var b = e.dpid,
                            d = e.dpuuid,
                            c = null;
                        if (a(b) && a(d)) {
                            c = h(b) + "$" + h(d);
                            if (!0 === this.declaredIdCombos[c]) return "setDeclaredId: combo exists for type '" + t + "'";
                            this.declaredIdCombos[c] = !0;
                            this.declaredId[t] = {
                                dpid: b,
                                dpuuid: d
                            };
                            return "setDeclaredId: succeeded for type '" + t + "'"
                        }
                    }
                    return "setDeclaredId: failed for type '" + t + "'"
                },
                getDeclaredIdQueryString: function() {
                    var e =
                        this.declaredId.request,
                        t = this.declaredId.init,
                        a = "";
                    null !== e ? a = "&d_dpid=" + e.dpid + "&d_dpuuid=" + e.dpuuid : null !== t && (a = "&d_dpid=" + t.dpid + "&d_dpuuid=" + t.dpuuid);
                    return a
                }
            },
            registerRequest: function(e) {
                var a = this.firingQueue;
                e === Object(e) && a.push(e);
                this.firing || !a.length || K && !DIL.windowLoaded || !this.adms.calledBack || (e = a.shift(), e.src = e.src.replace(/demdex.net\/event\?d_nsid=/, "demdex.net/event?" + this.adms.getMIDQueryString() + "d_nsid="), w.isPopulatedString(e.corsPostData) && (e.corsPostData = e.corsPostData.replace(/^d_nsid=/,
                    this.adms.getMIDQueryString() + "d_nsid=")), C.fireRequest(e), this.firstRequestHasFired || "script" !== e.tag && "cors" !== e.tag || (this.firstRequestHasFired = !0))
            },
            processVisitorAPI: function() {
                this.adms.process(Q || window.Visitor)
            },
            requestRemoval: function(e) {
                if (!J) return "removeFinishedScriptsAndCallbacks is not boolean true";
                var a = this.toRemove,
                    r, h;
                e === Object(e) && (r = e.script, h = e.callbackName, (r === Object(r) && "SCRIPT" === r.nodeName || "no script created" === r) && "string" === typeof h && h.length && a.push(e));
                if (this.readyToRemove &&
                    a.length) {
                    h = a.shift();
                    r = h.script;
                    h = h.callbackName;
                    "no script created" !== r ? (e = r.src, r.parentNode.removeChild(r)) : e = r;
                    window[h] = null;
                    try {
                        delete window[h]
                    } catch (b) {}
                    this.removed.push({
                        scriptSrc: e,
                        callbackName: h
                    });
                    DIL.variables.scriptsRemoved.push(e);
                    DIL.variables.callbacksRemoved.push(h);
                    return this.requestRemoval()
                }
                return "requestRemoval() processed"
            }
        };
    g = function() {
        var e = "http://fast.",
            a = "?d_nsid=" + k + "#" + encodeURIComponent(document.location.href);
        if ("string" === typeof E && E.length) return E + a;
        B.IS_HTTPS &&
            (e = !0 === u ? "https://fast." : "https://");
        return e + f + ".demdex.net/dest5.html" + a
    };
    var z = {
        THROTTLE_START: 3E4,
        throttleTimerSet: !1,
        id: "destination_publishing_iframe_" + f + "_" + k,
        url: g(),
        iframe: null,
        iframeHasLoaded: !1,
        sendingMessages: !1,
        messages: [],
        messagesPosted: [],
        messageSendingInterval: B.POST_MESSAGE_ENABLED ? 15 : 100,
        ibsDeleted: [],
        jsonProcessed: [],
        newIframeCreated: null,
        iframeIdChanged: !1,
        originalIframeHasLoadedAlready: null,
        attachIframe: function() {
            function e() {
                h = document.createElement("iframe");
                h.id = b.id;
                h.style.cssText =
                    "display: none; width: 0; height: 0;";
                h.src = b.url;
                b.newIframeCreated = !0;
                a();
                document.body.appendChild(h)
            }

            function a() {
                v.addListener(h, "load", function() {
                    h.className = "aamIframeLoaded";
                    b.iframeHasLoaded = !0;
                    b.requestToProcess()
                })
            }
            var b = this,
                h = document.getElementById(this.id);
            h ? "IFRAME" !== h.nodeName ? (this.id += "_2", this.iframeIdChanged = !0, e()) : (this.newIframeCreated = !1, "aamIframeLoaded" !== h.className ? (this.originalIframeHasLoadedAlready = !1, a()) : (this.iframeHasLoaded = this.originalIframeHasLoadedAlready = !0, this.requestToProcess())) : e();
            this.iframe = h
        },
        requestToProcess: function(e, a) {
            var b = this;
            e && !w.isEmptyObject(e) && this.process(e, a);
            this.iframeHasLoaded && this.messages.length && !this.sendingMessages && (this.throttleTimerSet || (this.throttleTimerSet = !0, setTimeout(function() {
                b.messageSendingInterval = B.POST_MESSAGE_ENABLED ? 15 : 150
            }, this.THROTTLE_START)), this.sendingMessages = !0, this.sendMessages())
        },
        process: function(e, a) {
            var b = encodeURIComponent,
                h, d, c, f, g, k;
            a === Object(a) && (k = v.encodeAndBuildRequest(["", a.dpid ||
                "", a.dpuuid || ""
            ], ","));
            if ((h = e.dests) && h instanceof Array && (d = h.length))
                for (c = 0; c < d; c++) f = h[c], f = [b("dests"), b(f.id || ""), b(f.y || ""), b(f.c || "")], this.addMessage(f.join("|"));
            if ((h = e.ibs) && h instanceof Array && (d = h.length))
                for (c = 0; c < d; c++) f = h[c], f = [b("ibs"), b(f.id || ""), b(f.tag || ""), v.encodeAndBuildRequest(f.url || [], ","), b(f.ttl || ""), "", k], this.addMessage(f.join("|"));
            if ((h = e.dpcalls) && h instanceof Array && (d = h.length))
                for (c = 0; c < d; c++) f = h[c], g = f.callback || {}, g = [g.obj || "", g.fn || "", g.key || "", g.tag || "", g.url ||
                    ""
                ], f = [b("dpm"), b(f.id || ""), b(f.tag || ""), v.encodeAndBuildRequest(f.url || [], ","), b(f.ttl || ""), v.encodeAndBuildRequest(g, ","), k], this.addMessage(f.join("|"));
            this.jsonProcessed.push(e)
        },
        addMessage: function(e) {
            var a = encodeURIComponent,
                a = p ? a("---destpub-debug---") : a("---destpub---");
            this.messages.push(a + e)
        },
        sendMessages: function() {
            var e = this,
                a;
            this.messages.length && this.iframe && this.iframe.contentWindow ? (a = this.messages.shift(), DIL.xd.postMessage(a, this.url, this.iframe.contentWindow), this.messagesPosted.push(a), setTimeout(function() {
                    e.sendMessages()
                },
                this.messageSendingInterval)) : this.sendingMessages = !1
        }
    }, I = {
            traits: function(e) {
                w.isValidPdata(e) && (l.sids instanceof Array || (l.sids = []), v.extendArray(l.sids, e));
                return this
            },
            pixels: function(e) {
                w.isValidPdata(e) && (l.pdata instanceof Array || (l.pdata = []), v.extendArray(l.pdata, e));
                return this
            },
            logs: function(e) {
                w.isValidLogdata(e) && (l.logdata !== Object(l.logdata) && (l.logdata = {}), v.extendObject(l.logdata, e));
                return this
            },
            customQueryParams: function(e) {
                w.isEmptyObject(e) || v.extendObject(l, e, q.reservedKeys);
                return this
            },
            signals: function(e, a) {
                var b, h = e;
                if (!w.isEmptyObject(h)) {
                    if (a && "string" === typeof a)
                        for (b in h = {}, e) e.hasOwnProperty(b) && (h[a + b] = e[b]);
                    v.extendObject(l, h, q.reservedKeys)
                }
                return this
            },
            declaredId: function(e) {
                q.declaredId.setDeclaredId(e, "request");
                return this
            },
            result: function(e) {
                "function" === typeof e && (l.callback = e);
                return this
            },
            afterResult: function(e) {
                "function" === typeof e && (l.postCallbackFn = e);
                return this
            },
            useImageRequest: function() {
                l.useImageRequest = !0;
                return this
            },
            clearData: function() {
                l = {};
                return this
            },
            submit: function() {
                C.submitRequest(l);
                l = {};
                return this
            },
            getPartner: function() {
                return f
            },
            getContainerNSID: function() {
                return k
            },
            getEventLog: function() {
                return d
            },
            getState: function() {
                var e = {}, a = {};
                v.extendObject(e, q, {
                    callbackPrefix: !0,
                    useJSONP: !0,
                    registerRequest: !0
                });
                v.extendObject(a, z, {
                    attachIframe: !0,
                    requestToProcess: !0,
                    process: !0,
                    sendMessages: !0
                });
                return {
                    pendingRequest: l,
                    otherRequestInfo: e,
                    destinationPublishingInfo: a
                }
            },
            idSync: function(e) {
                if (D) return "Error: id syncs have been disabled";
                if (e !== Object(e) || "string" !== typeof e.dpid || !e.dpid.length) return "Error: config or config.dpid is empty";
                if ("string" !== typeof e.url || !e.url.length) return "Error: config.url is empty";
                var a = e.url,
                    b = e.minutesToLive,
                    h = encodeURIComponent,
                    d, a = a.replace(/^https:/, "").replace(/^http:/, "");
                if ("undefined" === typeof b) b = 20160;
                else if (b = parseInt(b, 10), isNaN(b) || 0 >= b) return "Error: config.minutesToLive needs to be a positive number";
                d = v.encodeAndBuildRequest(["", e.dpid, e.dpuuid || ""], ",");
                e = ["ibs", h(e.dpid), "img",
                    h(a), b, "", d
                ];
                z.addMessage(e.join("|"));
                q.firstRequestHasFired && z.requestToProcess();
                return "Successfully queued"
            },
            aamIdSync: function(e) {
                if (D) return "Error: id syncs have been disabled";
                if (e !== Object(e) || "string" !== typeof e.dpuuid || !e.dpuuid.length) return "Error: config or config.dpuuid is empty";
                e.url = "//dpm.demdex.net/ibs:dpid=" + e.dpid + "&dpuuid=" + e.dpuuid;
                return this.idSync(e)
            },
            passData: function(e) {
                if (w.isEmptyObject(e)) return "Error: json is empty or not an object";
                z.ibsDeleted.push(e.ibs);
                delete e.ibs;
                C.defaultCallback(e);
                return e
            },
            getPlatformParams: function() {
                return q.platformParams
            },
            getEventCallConfigParams: function() {
                var e = q,
                    a = e.modStatsParams,
                    b = e.platformParams,
                    h;
                if (!a) {
                    a = {};
                    for (h in b) b.hasOwnProperty(h) && !e.nonModStatsParams[h] && (a[h.replace(/^d_/, "")] = b[h]);
                    e.modStatsParams = a
                }
                return a
            }
        }, C = {
            corsMetadata: function() {
                var e = "none",
                    a = !0;
                "undefined" !== typeof XMLHttpRequest && XMLHttpRequest === Object(XMLHttpRequest) && ("withCredentials" in new XMLHttpRequest ? e = "XMLHttpRequest" : (new Function("/*@cc_on return /^10/.test(@_jscript_version) @*/"))() ?
                    e = "XMLHttpRequest" : "undefined" !== typeof XDomainRequest && XDomainRequest === Object(XDomainRequest) && (a = !1), 0 < Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") && (a = !1));
                return {
                    corsType: e,
                    corsCookiesEnabled: a
                }
            }(),
            getCORSInstance: function() {
                return "none" === this.corsMetadata.corsType ? null : new window[this.corsMetadata.corsType]
            },
            submitRequest: function(e) {
                q.registerRequest(C.createQueuedRequest(e));
                return !0
            },
            createQueuedRequest: function(e) {
                var a = q,
                    b, h = e.callback,
                    d = "img",
                    c;
                if (!w.isEmptyObject(s)) {
                    var f,
                        g, m;
                    for (f in s) s.hasOwnProperty(f) && (g = s[f], null != g && "" !== g && f in e && !(g in e || g in q.reservedKeys) && (m = e[f], null != m && "" !== m && (e[g] = m)))
                }
                w.isValidPdata(e.sids) || (e.sids = []);
                w.isValidPdata(e.pdata) || (e.pdata = []);
                w.isValidLogdata(e.logdata) || (e.logdata = {});
                e.logdataArray = v.convertObjectToKeyValuePairs(e.logdata, "=", !0);
                e.logdataArray.push("_ts=" + (new Date).getTime());
                "function" !== typeof h && (h = this.defaultCallback);
                a.useJSONP = !0 !== e.useImageRequest;
                a.useJSONP && (d = "script", b = a.callbackPrefix + "_" + k + "_" +
                    (new Date).getTime());
                a = this.makeRequestSrcData(e, b);
                !P && (c = this.getCORSInstance()) && a.truncated && (this.corsMetadata.corsCookiesEnabled || a.isDeclaredIdCall) && (d = "cors");
                return {
                    tag: d,
                    src: a.src,
                    corsSrc: a.corsSrc,
                    internalCallbackName: b,
                    callbackFn: h,
                    postCallbackFn: e.postCallbackFn,
                    useImageRequest: !! e.useImageRequest,
                    requestData: e,
                    corsInstance: c,
                    corsPostData: a.corsPostData,
                    hasCORSError: !1
                }
            },
            defaultCallback: function(e, a) {
                var b, h, d, c, f, g, k, x, p;
                if ((b = e.stuff) && b instanceof Array && (h = b.length))
                    for (d = 0; d < h; d++)
                        if ((c =
                            b[d]) && c === Object(c)) {
                            f = c.cn;
                            g = c.cv;
                            k = c.ttl;
                            if ("undefined" === typeof k || "" === k) k = Math.floor(v.getMaxCookieExpiresInMinutes() / 60 / 24);
                            x = c.dmn || "." + document.domain.replace(/^www\./, "");
                            p = c.type;
                            f && (g || "number" === typeof g) && ("var" !== p && (k = parseInt(k, 10)) && !isNaN(k) && v.setCookie(f, g, 1440 * k, "/", x, !1), H.stuffed[f] = g)
                        }
                b = e.uuid;
                w.isPopulatedString(b) && !w.isEmptyObject(m) && (h = m.path, "string" === typeof h && h.length || (h = "/"), d = parseInt(m.days, 10), isNaN(d) && (d = 100), v.setCookie(m.name || "aam_did", b, 1440 * d, h, m.domain ||
                    "." + document.domain.replace(/^www\./, ""), !0 === m.secure));
                n || q.abortRequests || z.requestToProcess(e, a)
            },
            makeRequestSrcData: function(e, a) {
                e.sids = w.removeEmptyArrayValues(e.sids || []);
                e.pdata = w.removeEmptyArrayValues(e.pdata || []);
                var b = q,
                    d = b.platformParams,
                    c = v.encodeAndBuildRequest(e.sids, ","),
                    g = v.encodeAndBuildRequest(e.pdata, ","),
                    m = (e.logdataArray || []).join("&");
                delete e.logdataArray;
                var x = B.IS_HTTPS ? "https://" : "http://",
                    p = b.declaredId.getDeclaredIdQueryString(),
                    s = b.adms.instance ? b.adms.getCustomerIDsQueryString(b.adms.getCustomerIDs()) :
                        "",
                    A;
                A = [];
                var l, n, u, y;
                for (l in e)
                    if (!(l in b.reservedKeys) && e.hasOwnProperty(l))
                        if (n = e[l], l = encodeURIComponent(l), n instanceof Array)
                            for (u = 0, y = n.length; u < y; u++) A.push(l + "=" + encodeURIComponent(n[u]));
                        else A.push(l + "=" + encodeURIComponent(n));
                A = A.length ? "&" + A.join("&") : "";
                l = !1;
                c = "d_nsid=" + d.d_nsid + p + s + (c.length ? "&d_sid=" + c : "") + (g.length ? "&d_px=" + g : "") + (m.length ? "&d_ld=" + encodeURIComponent(m) : "");
                d = "&d_rtbd=" + d.d_rtbd + "&d_jsonv=" + d.d_jsonv + "&d_dst=" + d.d_dst;
                x = x + f + ".demdex.net/event";
                g = b = x + "?" + c + (b.useJSONP ?
                    d + "&d_cb=" + (a || "") : "") + A;
                2048 < b.length && (b = b.substring(0, b.lastIndexOf("&")), l = !0);
                return {
                    corsSrc: x + "?" + (O ? "testcors=1&d_nsid=" + k + "&" : "") + "_ts=" + (new Date).getTime(),
                    src: b,
                    originalSrc: g,
                    truncated: l,
                    corsPostData: c + d + A,
                    isDeclaredIdCall: "" !== p
                }
            },
            fireRequest: function(e) {
                if ("img" === e.tag) this.fireImage(e);
                else {
                    var a = q.declaredId,
                        a = a.declaredId.request || a.declaredId.init || {}, a = {
                            dpid: a.dpid || "",
                            dpuuid: a.dpuuid || ""
                        };
                    "script" === e.tag ? this.fireScript(e, a) : "cors" === e.tag && this.fireCORS(e, a)
                }
            },
            fireImage: function(e) {
                var a =
                    q,
                    c, h;
                a.abortRequests || (a.firing = !0, c = new Image(0, 0), a.sent.push(e), c.onload = function() {
                        a.firing = !1;
                        a.fired.push(e);
                        a.num_of_img_responses++;
                        a.registerRequest()
                    }, h = function(c) {
                        b = "imgAbortOrErrorHandler received the event of type " + c.type;
                        d.push(b);
                        a.abortRequests = !0;
                        a.firing = !1;
                        a.errored.push(e);
                        a.num_of_img_errors++;
                        a.registerRequest()
                    }, c.addEventListener ? (c.addEventListener("error", h, !1), c.addEventListener("abort", h, !1)) : c.attachEvent && (c.attachEvent("onerror", h), c.attachEvent("onabort", h)), c.src =
                    e.src)
            },
            fireScript: function(a, c) {
                var g = this,
                    h = q,
                    k, m, x = a.src,
                    p = a.postCallbackFn,
                    l = "function" === typeof p,
                    s = a.internalCallbackName;
                h.abortRequests || (h.firing = !0, window[s] = function(g) {
                    try {
                        g !== Object(g) && (g = {});
                        D && (z.ibsDeleted.push(g.ibs), delete g.ibs);
                        var k = a.callbackFn;
                        h.firing = !1;
                        h.fired.push(a);
                        h.num_of_jsonp_responses++;
                        k(g, c);
                        l && p(g, c)
                    } catch (r) {
                        r.message = "DIL jsonp callback caught error with message " + r.message;
                        b = r.message;
                        d.push(b);
                        r.filename = r.filename || "dil.js";
                        r.partner = f;
                        DIL.errorModule.handleError(r);
                        try {
                            k({
                                error: r.name + "|" + r.message
                            }, c), l && p({
                                error: r.name + "|" + r.message
                            }, c)
                        } catch (x) {}
                    } finally {
                        h.requestRemoval({
                            script: m,
                            callbackName: s
                        }), h.registerRequest()
                    }
                }, L ? (h.firing = !1, h.requestRemoval({
                    script: "no script created",
                    callbackName: s
                })) : (m = document.createElement("script"), m.addEventListener && m.addEventListener("error", function(c) {
                        h.requestRemoval({
                            script: m,
                            callbackName: s
                        });
                        b = "jsonp script tag error listener received the event of type " + c.type + " with src " + x;
                        g.handleScriptError(b, a)
                    }, !1), m.type = "text/javascript",
                    m.src = x, k = DIL.variables.scriptNodeList[0], k.parentNode.insertBefore(m, k)), h.sent.push(a), h.declaredId.declaredId.request = null)
            },
            fireCORS: function(a, c) {
                function g(r) {
                    var m;
                    try {
                        if (m = JSON.parse(r), m !== Object(m)) {
                            h.handleCORSError(a, c, "Response is not JSON");
                            return
                        }
                    } catch (p) {
                        h.handleCORSError(a, c, "Error parsing response as JSON");
                        return
                    }
                    try {
                        var x = a.callbackFn;
                        k.firing = !1;
                        k.fired.push(a);
                        k.num_of_cors_responses++;
                        x(m, c);
                        n && s(m, c)
                    } catch (l) {
                        l.message = "DIL handleCORSResponse caught error with message " + l.message;
                        b = l.message;
                        d.push(b);
                        l.filename = l.filename || "dil.js";
                        l.partner = f;
                        DIL.errorModule.handleError(l);
                        try {
                            x({
                                error: l.name + "|" + l.message
                            }, c), n && s({
                                error: l.name + "|" + l.message
                            }, c)
                        } catch (q) {}
                    } finally {
                        k.registerRequest()
                    }
                }
                var h = this,
                    k = q,
                    m = this.corsMetadata.corsType,
                    x = a.corsSrc,
                    p = a.corsInstance,
                    l = a.corsPostData,
                    s = a.postCallbackFn,
                    n = "function" === typeof s;
                if (!k.abortRequests) {
                    k.firing = !0;
                    if (M) k.firing = !1;
                    else try {
                        p.open("post", x, !0), "XMLHttpRequest" === m ? (p.withCredentials = !0, p.setRequestHeader("Content-Type",
                            "application/x-www-form-urlencoded"), p.onreadystatechange = function() {
                            4 === this.readyState && (200 === this.status ? g(this.responseText) : h.handleCORSError(a, c, "onreadystatechange"))
                        }) : "XDomainRequest" === m && (p.onload = function() {
                            g(this.responseText)
                        }), p.onerror = function() {
                            h.handleCORSError(a, c, "onerror")
                        }, p.ontimeout = function() {
                            h.handleCORSError(a, c, "ontimeout")
                        }, p.send(l)
                    } catch (u) {
                        this.handleCORSError(a, c, "try-catch")
                    }
                    k.sent.push(a);
                    k.declaredId.declaredId.request = null
                }
            },
            handleCORSError: function(a, b, c) {
                a.hasCORSError ||
                    (a.hasCORSError = !0, q.num_of_cors_errors++, q.corsErrorSources.push(c), a.tag = "script", this.fireScript(a, b))
            },
            handleScriptError: function(a, b) {
                q.num_of_jsonp_errors++;
                this.handleRequestError(a, b)
            },
            handleRequestError: function(a, b) {
                var c = q;
                d.push(a);
                c.abortRequests = !0;
                c.firing = !1;
                c.errored.push(b);
                c.registerRequest()
            }
        }, w = {
            isValidPdata: function(a) {
                return a instanceof Array && this.removeEmptyArrayValues(a).length ? !0 : !1
            },
            isValidLogdata: function(a) {
                return !this.isEmptyObject(a)
            },
            isEmptyObject: function(a) {
                if (a !==
                    Object(a)) return !0;
                for (var b in a)
                    if (a.hasOwnProperty(b)) return !1;
                return !0
            },
            removeEmptyArrayValues: function(a) {
                for (var b = 0, c = a.length, d, f = [], b = 0; b < c; b++) d = a[b], "undefined" !== typeof d && null !== d && "" !== d && f.push(d);
                return f
            },
            isPopulatedString: function(a) {
                return "string" === typeof a && a.length
            }
        }, v = {
            addListener: function() {
                if (document.addEventListener) return function(a, b, c) {
                    a.addEventListener(b, function(a) {
                        "function" === typeof c && c(a)
                    }, !1)
                };
                if (document.attachEvent) return function(a, b, c) {
                    a.attachEvent("on" +
                        b, function(a) {
                            "function" === typeof c && c(a)
                        })
                }
            }(),
            convertObjectToKeyValuePairs: function(a, b, c) {
                var d = [],
                    f, g;
                b || (b = "=");
                for (f in a) a.hasOwnProperty(f) && (g = a[f], "undefined" !== typeof g && null !== g && "" !== g && d.push(f + b + (c ? encodeURIComponent(g) : g)));
                return d
            },
            encodeAndBuildRequest: function(a, b) {
                return this.map(a, function(a) {
                    return encodeURIComponent(a)
                }).join(b)
            },
            map: function(a, b) {
                if (Array.prototype.map) return a.map(b);
                if (void 0 === a || null === a) throw new TypeError;
                var c = Object(a),
                    d = c.length >>> 0;
                if ("function" !==
                    typeof b) throw new TypeError;
                for (var f = Array(d), g = 0; g < d; g++) g in c && (f[g] = b.call(b, c[g], g, c));
                return f
            },
            filter: function(a, b) {
                if (!Array.prototype.filter) {
                    if (void 0 === a || null === a) throw new TypeError;
                    var c = Object(a),
                        d = c.length >>> 0;
                    if ("function" !== typeof b) throw new TypeError;
                    for (var g = [], f = 0; f < d; f++)
                        if (f in c) {
                            var k = c[f];
                            b.call(b, k, f, c) && g.push(k)
                        }
                    return g
                }
                return a.filter(b)
            },
            getCookie: function(a) {
                a += "=";
                var b = document.cookie.split(";"),
                    c, d, f;
                c = 0;
                for (d = b.length; c < d; c++) {
                    for (f = b[c];
                        " " === f.charAt(0);) f =
                        f.substring(1, f.length);
                    if (0 === f.indexOf(a)) return decodeURIComponent(f.substring(a.length, f.length))
                }
                return null
            },
            setCookie: function(a, b, c, d, f, g) {
                var k = new Date;
                c && (c *= 6E4);
                document.cookie = a + "=" + encodeURIComponent(b) + (c ? ";expires=" + (new Date(k.getTime() + c)).toUTCString() : "") + (d ? ";path=" + d : "") + (f ? ";domain=" + f : "") + (g ? ";secure" : "")
            },
            extendArray: function(a, b) {
                return a instanceof Array && b instanceof Array ? (Array.prototype.push.apply(a, b), !0) : !1
            },
            extendObject: function(a, b, c) {
                var d;
                if (a === Object(a) && b ===
                    Object(b)) {
                    for (d in b)!b.hasOwnProperty(d) || !w.isEmptyObject(c) && d in c || (a[d] = b[d]);
                    return !0
                }
                return !1
            },
            getMaxCookieExpiresInMinutes: function() {
                return ((new Date(B.COOKIE_MAX_EXPIRATION_DATE)).getTime() - (new Date).getTime()) / 1E3 / 60
            }
        };
    "error" === f && 0 === k && v.addListener(window, "load", function() {
        DIL.windowLoaded = !0
    });
    var S = !1,
        F = function() {
            S || (S = !0, q.registerRequest(), U(), n || q.abortRequests || z.attachIframe(), q.readyToRemove = !0, q.requestRemoval())
        }, U = function() {
            n || setTimeout(function() {
                N || q.firstRequestHasFired ||
                    ("function" === typeof G ? I.afterResult(G).submit() : I.submit())
            }, DIL.constants.TIME_TO_DEFAULT_REQUEST)
        }, T = document;
    "error" !== f && (DIL.windowLoaded ? F() : "complete" !== T.readyState && "loaded" !== T.readyState ? v.addListener(window, "load", function() {
        DIL.windowLoaded = !0;
        F()
    }) : (DIL.windowLoaded = !0, F()));
    q.declaredId.setDeclaredId(x, "init");
    q.processVisitorAPI();
    this.api = I;
    this.getStuffedVariable = function(a) {
        var b = H.stuffed[a];
        b || "number" === typeof b || (b = v.getCookie(a)) || "number" === typeof b || (b = "");
        return b
    };
    this.validators =
        w;
    this.helpers = v;
    this.constants = B;
    this.log = d;
    R && (this.pendingRequest = l, this.requestController = q, this.setDestinationPublishingUrl = g, this.destinationPublishing = z, this.requestProcs = C, this.variables = H, this.callWindowLoadFunctions = F)
}, function() {
    var a = document,
        c;
    null == a.readyState && a.addEventListener && (a.readyState = "loading", a.addEventListener("DOMContentLoaded", c = function() {
        a.removeEventListener("DOMContentLoaded", c, !1);
        a.readyState = "complete"
    }, !1))
}(), DIL.extendStaticPropertiesAndMethods = function(a) {
    var c;
    if (a === Object(a))
        for (c in a) a.hasOwnProperty(c) && (this[c] = a[c])
}, DIL.extendStaticPropertiesAndMethods({
    version: "6.2",
    jsonVersion: 1,
    constants: {
        TIME_TO_DEFAULT_REQUEST: 50
    },
    variables: {
        scriptNodeList: document.getElementsByTagName("script"),
        scriptsRemoved: [],
        callbacksRemoved: []
    },
    windowLoaded: !1,
    dils: {},
    isAddedPostWindowLoad: function(a) {
        this.windowLoaded = "function" === typeof a ? !! a() : "boolean" === typeof a ? a : !0
    },
    create: function(a) {
        try {
            return new DIL(a)
        } catch (c) {
            return (new Image(0, 0)).src = "http://error.demdex.net/event?d_nsid=0&d_px=14137&d_ld=name%3Derror%26filename%3Ddil.js%26partner%3Dno_partner%26message%3DError%2520in%2520attempt%2520to%2520create%2520DIL%2520instance%2520with%2520DIL.create()%26_ts%3D" +
                (new Date).getTime(), Error("Error in attempt to create DIL instance with DIL.create()")
        }
    },
    registerDil: function(a, c, d) {
        c = c + "$" + d;
        c in this.dils || (this.dils[c] = a)
    },
    getDil: function(a, c) {
        var d;
        "string" !== typeof a && (a = "");
        c || (c = 0);
        d = a + "$" + c;
        return d in this.dils ? this.dils[d] : Error("The DIL instance with partner = " + a + " and containerNSID = " + c + " was not found")
    },
    dexGetQSVars: function(a, c, d) {
        c = this.getDil(c, d);
        return c instanceof this ? c.getStuffedVariable(a) : ""
    },
    xd: {
        postMessage: function(a, c, d) {
            var b = 1;
            c &&
                (window.postMessage ? d.postMessage(a, c.replace(/([^:]+:\/\/[^\/]+).*/, "$1")) : c && (d.location = c.replace(/#.*$/, "") + "#" + +new Date + (b++) + "&" + a))
        }
    }
}), DIL.errorModule = function() {
    var a = DIL.create({
        partner: "error",
        containerNSID: 0,
        disableDestinationPublishingIframe: !0
    }),
        c = {
            harvestererror: 14138,
            destpuberror: 14139,
            dpmerror: 14140,
            generalerror: 14137,
            error: 14137,
            noerrortypedefined: 15021,
            evalerror: 15016,
            rangeerror: 15017,
            referenceerror: 15018,
            typeerror: 15019,
            urierror: 15020
        }, d = !1;
    return {
        activate: function() {
            d = !0
        },
        handleError: function(b) {
            if (!d) return "DIL error module has not been activated";
            b !== Object(b) && (b = {});
            var g = b.name ? (b.name + "").toLowerCase() : "",
                f = [];
            b = {
                name: g,
                filename: b.filename ? b.filename + "" : "",
                partner: b.partner ? b.partner + "" : "no_partner",
                site: b.site ? b.site + "" : document.location.href,
                message: b.message ? b.message + "" : ""
            };
            f.push(g in c ? c[g] : c.noerrortypedefined);
            a.api.pixels(f).logs(b).useImageRequest().submit();
            return "DIL error report sent"
        },
        pixelMap: c
    }
}(), DIL.tools = {}, DIL.modules = {
    helpers: {
        handleModuleError: function(a, c, d) {
            var b = "";
            c = c || "Error caught in DIL module/submodule: ";
            a === Object(a) ? b = c + (a.message || "err has no message") : (b = c + "err is not a valid object", a = {});
            a.message = b;
            d instanceof DIL && (a.partner = d.api.getPartner());
            DIL.errorModule.handleError(a);
            return this.errorMessage = b
        }
    }
});
DIL.tools.getSearchReferrer = function(a, c) {
    var d = DIL.getDil("error"),
        b = DIL.tools.decomposeURI(a || document.referrer),
        g = "",
        f = "",
        k = {
            queryParam: "q"
        };
    return (g = d.helpers.filter([c === Object(c) ? c : {}, {
        hostPattern: /aol\./
    }, {
        hostPattern: /ask\./
    }, {
        hostPattern: /bing\./
    }, {
        hostPattern: /google\./
    }, {
        hostPattern: /yahoo\./,
        queryParam: "p"
    }], function(a) {
        return !(!a.hasOwnProperty("hostPattern") || !b.hostname.match(a.hostPattern))
    }).shift()) ? {
        valid: !0,
        name: b.hostname,
        keywords: (d.helpers.extendObject(k, g), f = k.queryPattern ?
            (g = ("" + b.search).match(k.queryPattern)) ? g[1] : "" : b.uriParams[k.queryParam], decodeURIComponent(f || "").replace(/\+|%20/g, " "))
    } : {
        valid: !1,
        name: "",
        keywords: ""
    }
};
DIL.tools.decomposeURI = function(a) {
    var c = DIL.getDil("error"),
        d = document.createElement("a");
    d.href = a || document.referrer;
    return {
        hash: d.hash,
        host: d.host.split(":").shift(),
        hostname: d.hostname,
        href: d.href,
        pathname: d.pathname.replace(/^\//, ""),
        protocol: d.protocol,
        search: d.search,
        uriParams: function(a, d) {
            c.helpers.map(d.split("&"), function(c) {
                c = c.split("=");
                a[c.shift()] = c.shift()
            });
            return a
        }({}, d.search.replace(/^(\/|\?)?|\/$/g, ""))
    }
};
DIL.tools.getMetaTags = function() {
    var a = {}, c = document.getElementsByTagName("meta"),
        d, b, g, f, k;
    d = 0;
    for (g = arguments.length; d < g; d++)
        if (f = arguments[d], null !== f)
            for (b = 0; b < c.length; b++)
                if (k = c[b], k.name === f) {
                    a[f] = k.content;
                    break
                }
    return a
};
DIL.modules.siteCatalyst = {
    dil: null,
    handle: DIL.modules.helpers.handleModuleError,
    init: function(a, c, d, b) {
        try {
            var g = this,
                f = {
                    name: "DIL Site Catalyst Module Error"
                }, k = function(a) {
                    f.message = a;
                    DIL.errorModule.handleError(f);
                    return a
                };
            this.options = b === Object(b) ? b : {};
            this.dil = null;
            if (c instanceof DIL) this.dil = c;
            else return k("dilInstance is not a valid instance of DIL");
            f.partner = c.api.getPartner();
            if (a !== Object(a)) return k("siteCatalystReportingSuite is not an object");
            window.AppMeasurement_Module_DIL = a.m_DIL =
                function(a) {
                    var b = "function" === typeof a.m_i ? a.m_i("DIL") : this;
                    if (b !== Object(b)) return k("m is not an object");
                    b.trackVars = g.constructTrackVars(d);
                    b.d = 0;
                    b.s = a;
                    b._t = function() {
                        var a, b, c = "," + this.trackVars + ",",
                            d = this.s,
                            f, s = [];
                        f = [];
                        var n = {}, u = !1;
                        if (d !== Object(d)) return k("Error in m._t function: s is not an object");
                        if (this.d) {
                            if ("function" === typeof d.foreachVar) d.foreachVar(function(a, b) {
                                "undefined" !== typeof b && (n[a] = b, u = !0)
                            }, this.trackVars);
                            else {
                                if (!(d.va_t instanceof Array)) return k("Error in m._t function: s.va_t is not an array");
                                if (d.lightProfileID)(a = d.lightTrackVars) && (a = "," + a + "," + d.vl_mr + ",");
                                else if (d.pe || d.linkType) a = d.linkTrackVars, d.pe && (b = d.pe.substring(0, 1).toUpperCase() + d.pe.substring(1), d[b] && (a = d[b].trackVars)), a && (a = "," + a + "," + d.vl_l + "," + d.vl_l2 + ",");
                                if (a) {
                                    b = 0;
                                    for (s = a.split(","); b < s.length; b++) 0 <= c.indexOf("," + s[b] + ",") && f.push(s[b]);
                                    f.length && (c = "," + f.join(",") + ",")
                                }
                                f = 0;
                                for (b = d.va_t.length; f < b; f++) a = d.va_t[f], 0 <= c.indexOf("," + a + ",") && "undefined" !== typeof d[a] && null !== d[a] && "" !== d[a] && (n[a] = d[a], u = !0)
                            }
                            g.includeContextData(d,
                                n).store_populated && (u = !0);
                            u && this.d.api.signals(n, "c_").submit()
                        }
                    }
            };
            a.loadModule("DIL");
            a.DIL.d = c;
            return f.message ? f.message : "DIL.modules.siteCatalyst.init() completed with no errors"
        } catch (n) {
            return this.handle(n, "DIL.modules.siteCatalyst.init() caught error with message ", this.dil)
        }
    },
    constructTrackVars: function(a) {
        var c = [],
            d, b, g, f, k;
        if (a === Object(a)) {
            d = a.names;
            if (d instanceof Array && (g = d.length))
                for (b = 0; b < g; b++) f = d[b], "string" === typeof f && f.length && c.push(f);
            a = a.iteratedNames;
            if (a instanceof Array &&
                (g = a.length))
                for (b = 0; b < g; b++)
                    if (d = a[b], d === Object(d) && (f = d.name, k = parseInt(d.maxIndex, 10), "string" === typeof f && f.length && !isNaN(k) && 0 <= k))
                        for (d = 0; d <= k; d++) c.push(f + d);
            if (c.length) return c.join(",")
        }
        return this.constructTrackVars({
            names: "pageName channel campaign products events pe pev1 pev2 pev3".split(" "),
            iteratedNames: [{
                name: "prop",
                maxIndex: 75
            }, {
                name: "eVar",
                maxIndex: 250
            }]
        })
    },
    includeContextData: function(a, c) {
        var d = {}, b = !1;
        if (a.contextData === Object(a.contextData)) {
            var g = a.contextData,
                f = this.options.replaceContextDataPeriodsWith,
                k = this.options.filterFromContextVariables,
                n = {}, u, s, m, p;
            "string" === typeof f && f.length || (f = "_");
            if (k instanceof Array)
                for (u = 0, s = k.length; u < s; u++) m = k[u], this.dil.validators.isPopulatedString(m) && (n[m] = !0);
            for (p in g)!g.hasOwnProperty(p) || n[p] || !(k = g[p]) && "number" !== typeof k || (p = ("contextData." + p).replace(/\./g, f), c[p] = k, b = !0)
        }
        d.store_populated = b;
        return d
    }
};
DIL.modules.GA = {
    dil: null,
    arr: null,
    tv: null,
    errorMessage: "",
    defaultTrackVars: ["_setAccount", "_setCustomVar", "_addItem", "_addTrans", "_trackSocial"],
    defaultTrackVarsObj: null,
    signals: {},
    hasSignals: !1,
    handle: DIL.modules.helpers.handleModuleError,
    init: function(a, c, d) {
        try {
            this.tv = this.arr = this.dil = null;
            this.errorMessage = "";
            this.signals = {};
            this.hasSignals = !1;
            var b = {
                name: "DIL GA Module Error"
            }, g = "";
            c instanceof DIL ? (this.dil = c, b.partner = this.dil.api.getPartner()) : (g = "dilInstance is not a valid instance of DIL",
                b.message = g, DIL.errorModule.handleError(b));
            a instanceof Array && a.length ? this.arr = a : (g = "gaArray is not an array or is empty", b.message = g, DIL.errorModule.handleError(b));
            this.tv = this.constructTrackVars(d);
            this.errorMessage = g
        } catch (f) {
            this.handle(f, "DIL.modules.GA.init() caught error with message ", this.dil)
        } finally {
            return this
        }
    },
    constructTrackVars: function(a) {
        var c = [],
            d, b, g, f;
        if (this.defaultTrackVarsObj !== Object(this.defaultTrackVarsObj)) {
            g = this.defaultTrackVars;
            f = {};
            d = 0;
            for (b = g.length; d < b; d++) f[g[d]] = !0;
            this.defaultTrackVarsObj = f
        } else f = this.defaultTrackVarsObj; if (a === Object(a)) {
            a = a.names;
            if (a instanceof Array && (b = a.length))
                for (d = 0; d < b; d++) g = a[d], "string" === typeof g && g.length && g in f && c.push(g);
            if (c.length) return c
        }
        return this.defaultTrackVars
    },
    constructGAObj: function(a) {
        var c = {};
        a = a instanceof Array ? a : this.arr;
        var d, b, g, f;
        d = 0;
        for (b = a.length; d < b; d++) g = a[d], g instanceof Array && g.length && (g = [], f = a[d], g instanceof Array && f instanceof Array && Array.prototype.push.apply(g, f), f = g.shift(), "string" ===
            typeof f && f.length && (c[f] instanceof Array || (c[f] = []), c[f].push(g)));
        return c
    },
    addToSignals: function(a, c) {
        if ("string" !== typeof a || "" === a || null == c || "" === c) return !1;
        this.signals[a] instanceof Array || (this.signals[a] = []);
        this.signals[a].push(c);
        return this.hasSignals = !0
    },
    constructSignals: function() {
        var a = this.constructGAObj(),
            c = {
                _setAccount: function(a) {
                    this.addToSignals("c_accountId", a)
                },
                _setCustomVar: function(a, b, c) {
                    "string" === typeof b && b.length && this.addToSignals("c_" + b, c)
                },
                _addItem: function(a, b, c, d,
                    f, g) {
                    this.addToSignals("c_itemOrderId", a);
                    this.addToSignals("c_itemSku", b);
                    this.addToSignals("c_itemName", c);
                    this.addToSignals("c_itemCategory", d);
                    this.addToSignals("c_itemPrice", f);
                    this.addToSignals("c_itemQuantity", g)
                },
                _addTrans: function(a, b, c, d, f, g, k, n) {
                    this.addToSignals("c_transOrderId", a);
                    this.addToSignals("c_transAffiliation", b);
                    this.addToSignals("c_transTotal", c);
                    this.addToSignals("c_transTax", d);
                    this.addToSignals("c_transShipping", f);
                    this.addToSignals("c_transCity", g);
                    this.addToSignals("c_transState",
                        k);
                    this.addToSignals("c_transCountry", n)
                },
                _trackSocial: function(a, b, c, d) {
                    this.addToSignals("c_socialNetwork", a);
                    this.addToSignals("c_socialAction", b);
                    this.addToSignals("c_socialTarget", c);
                    this.addToSignals("c_socialPagePath", d)
                }
            }, d = this.tv,
            b, g, f, k, n, u;
        b = 0;
        for (g = d.length; b < g; b++)
            if (f = d[b], a.hasOwnProperty(f) && c.hasOwnProperty(f) && (u = a[f], u instanceof Array))
                for (k = 0, n = u.length; k < n; k++) c[f].apply(this, u[k])
    },
    submit: function() {
        try {
            if ("" !== this.errorMessage) return this.errorMessage;
            this.constructSignals();
            return this.hasSignals ? (this.dil.api.signals(this.signals).submit(), "Signals sent: " + this.dil.helpers.convertObjectToKeyValuePairs(this.signals, "=", !0) + this.dil.log) : "No signals present"
        } catch (a) {
            return this.handle(a, "DIL.modules.GA.submit() caught error with message ", this.dil)
        }
    },
    Stuffer: {
        LIMIT: 5,
        dil: null,
        cookieName: null,
        delimiter: null,
        errorMessage: "",
        handle: DIL.modules.helpers.handleModuleError,
        callback: null,
        v: function() {
            return !1
        },
        init: function(a, c, d) {
            try {
                this.callback = this.dil = null, this.errorMessage =
                    "", a instanceof DIL ? (this.dil = a, this.v = this.dil.validators.isPopulatedString, this.cookieName = this.v(c) ? c : "aam_ga", this.delimiter = this.v(d) ? d : "|") : this.handle({
                        message: "dilInstance is not a valid instance of DIL"
                    }, "DIL.modules.GA.Stuffer.init() error: ")
            } catch (b) {
                this.handle(b, "DIL.modules.GA.Stuffer.init() caught error with message ", this.dil)
            } finally {
                return this
            }
        },
        process: function(a) {
            var c, d, b, g, f, k;
            k = !1;
            var n = 1;
            if (a === Object(a) && (c = a.stuff) && c instanceof Array && (d = c.length))
                for (a = 0; a < d; a++)
                    if ((b =
                        c[a]) && b === Object(b) && (g = b.cn, f = b.cv, g === this.cookieName && this.v(f))) {
                        k = !0;
                        break
                    }
            if (k) {
                c = f.split(this.delimiter);
                "undefined" === typeof window._gaq && (window._gaq = []);
                b = window._gaq;
                a = 0;
                for (d = c.length; a < d && !(k = c[a].split("="), f = k[0], k = k[1], this.v(f) && this.v(k) && b.push(["_setCustomVar", n++, f, k, 1]), n > this.LIMIT); a++);
                this.errorMessage = 1 < n ? "No errors - stuffing successful" : "No valid values to stuff"
            } else this.errorMessage = "Cookie name and value not found in json"; if ("function" === typeof this.callback) return this.callback()
        },
        submit: function() {
            try {
                var a = this;
                if ("" !== this.errorMessage) return this.errorMessage;
                this.dil.api.afterResult(function(c) {
                    a.process(c)
                }).submit();
                return "DIL.modules.GA.Stuffer.submit() successful"
            } catch (c) {
                return this.handle(c, "DIL.modules.GA.Stuffer.submit() caught error with message ", this.dil)
            }
        }
    }
};
DIL.modules.Peer39 = {
    aid: "",
    dil: null,
    optionals: null,
    errorMessage: "",
    calledBack: !1,
    script: null,
    scriptsSent: [],
    returnedData: [],
    handle: DIL.modules.helpers.handleModuleError,
    init: function(a, c, d) {
        try {
            this.dil = null;
            this.errorMessage = "";
            this.calledBack = !1;
            this.optionals = d === Object(d) ? d : {};
            d = {
                name: "DIL Peer39 Module Error"
            };
            var b = [],
                g = "";
            this.isSecurePageButNotEnabled(document.location.protocol) && (g = "Module has not been enabled for a secure page", b.push(g), d.message = g, DIL.errorModule.handleError(d));
            c instanceof
            DIL ? (this.dil = c, d.partner = this.dil.api.getPartner()) : (g = "dilInstance is not a valid instance of DIL", b.push(g), d.message = g, DIL.errorModule.handleError(d));
            "string" === typeof a && a.length ? this.aid = a : (g = "aid is not a string or is empty", b.push(g), d.message = g, DIL.errorModule.handleError(d));
            this.errorMessage = b.join("\n")
        } catch (f) {
            this.handle(f, "DIL.modules.Peer39.init() caught error with message ", this.dil)
        } finally {
            return this
        }
    },
    isSecurePageButNotEnabled: function(a) {
        return "https:" === a && !0 !== this.optionals.enableHTTPS ? !0 : !1
    },
    constructSignals: function() {
        var a = this,
            c = this.constructScript(),
            d = DIL.variables.scriptNodeList[0];
        window["afterFinished_" + this.aid] = function() {
            try {
                var b = a.processData(p39_KVP_Short("c_p", "|").split("|"));
                b.hasSignals && a.dil.api.signals(b.signals).submit()
            } catch (c) {} finally {
                a.calledBack = !0, "function" === typeof a.optionals.afterResult && a.optionals.afterResult()
            }
        };
        d.parentNode.insertBefore(c, d);
        this.scriptsSent.push(c);
        return "Request sent to Peer39"
    },
    processData: function(a) {
        var c, d, b, g, f = {}, k = !1;
        this.returnedData.push(a);
        if (a instanceof Array)
            for (c = 0, d = a.length; c < d; c++) b = a[c].split("="), g = b[0], b = b[1], g && isFinite(b) && !isNaN(parseInt(b, 10)) && (f[g] instanceof Array || (f[g] = []), f[g].push(b), k = !0);
        return {
            hasSignals: k,
            signals: f
        }
    },
    constructScript: function() {
        var a = document.createElement("script"),
            c = this.optionals,
            d = c.scriptId,
            b = c.scriptSrc,
            c = c.scriptParams;
        a.id = "string" === typeof d && d.length ? d : "peer39ScriptLoader";
        a.type = "text/javascript";
        "string" === typeof b && b.length ? a.src = b : (a.src = (this.dil.constants.IS_HTTPS ?
            "https:" : "http:") + "//stags.peer39.net/" + this.aid + "/trg_" + this.aid + ".js", "string" === typeof c && c.length && (a.src += "?" + c));
        return a
    },
    submit: function() {
        try {
            return "" !== this.errorMessage ? this.errorMessage : this.constructSignals()
        } catch (a) {
            return this.handle(a, "DIL.modules.Peer39.submit() caught error with message ", this.dil)
        }
    }
};

s.AudienceManagement.setup({
    "partner": "usbank",
    "containerNSID": 0,
    "uuidCookie": {
        "name": "aam_uuid",
        "days": 30
    }
});

/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 2.5.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/

function AppMeasurement(r) {
    var a = this;
    a.version = "2.5.0";
    var k = window;
    k.s_c_in || (k.s_c_il = [], k.s_c_in = 0);
    a._il = k.s_c_il;
    a._in = k.s_c_in;
    a._il[a._in] = a;
    k.s_c_in++;
    a._c = "s_c";
    var p = k.AppMeasurement.Pb;
    p || (p = null);
    var n = k,
        m, s;
    try {
        for (m = n.parent, s = n.location; m && m.location && s && "" + m.location != "" + s && n.location && "" + m.location != "" + n.location && m.location.host == s.host;) n = m, m = n.parent
    } catch (u) {}
    a.F = function(a) {
        try {
            console.log(a)
        } catch (b) {}
    };
    a.Ma = function(a) {
        return "" + parseInt(a) == "" + a
    };
    a.replace = function(a, b, d) {
        return !a ||
            0 > a.indexOf(b) ? a : a.split(b).join(d)
    };
    a.escape = function(c) {
        var b, d;
        if (!c) return c;
        c = encodeURIComponent(c);
        for (b = 0; 7 > b; b++) d = "+~!*()'".substring(b, b + 1), 0 <= c.indexOf(d) && (c = a.replace(c, d, "%" + d.charCodeAt(0).toString(16).toUpperCase()));
        return c
    };
    a.unescape = function(c) {
        if (!c) return c;
        c = 0 <= c.indexOf("+") ? a.replace(c, "+", " ") : c;
        try {
            return decodeURIComponent(c)
        } catch (b) {}
        return unescape(c)
    };
    a.wb = function() {
        var c = k.location.hostname,
            b = a.fpCookieDomainPeriods,
            d;
        b || (b = a.cookieDomainPeriods);
        if (c && !a.Ea && !/^[0-9.]+$/.test(c) &&
            (b = b ? parseInt(b) : 2, b = 2 < b ? b : 2, d = c.lastIndexOf("."), 0 <= d)) {
            for (; 0 <= d && 1 < b;) d = c.lastIndexOf(".", d - 1), b--;
            a.Ea = 0 < d ? c.substring(d) : c
        }
        return a.Ea
    };
    a.c_r = a.cookieRead = function(c) {
        c = a.escape(c);
        var b = " " + a.d.cookie,
            d = b.indexOf(" " + c + "="),
            f = 0 > d ? d : b.indexOf(";", d);
        c = 0 > d ? "" : a.unescape(b.substring(d + 2 + c.length, 0 > f ? b.length : f));
        return "[[B]]" != c ? c : ""
    };
    a.c_w = a.cookieWrite = function(c, b, d) {
        var f = a.wb(),
            e = a.cookieLifetime,
            g;
        b = "" + b;
        e = e ? ("" + e).toUpperCase() : "";
        d && "SESSION" != e && "NONE" != e && ((g = "" != b ? parseInt(e ? e : 0) : -60) ?
            (d = new Date, d.setTime(d.getTime() + 1E3 * g)) : 1 == d && (d = new Date, g = d.getYear(), d.setYear(g + 5 + (1900 > g ? 1900 : 0))));
        return c && "NONE" != e ? (a.d.cookie = a.escape(c) + "=" + a.escape("" != b ? b : "[[B]]") + "; path=/;" + (d && "SESSION" != e ? " expires=" + d.toUTCString() + ";" : "") + (f ? " domain=" + f + ";" : ""), a.cookieRead(c) == b) : 0
    };
    a.L = [];
    a.ia = function(c, b, d) {
        if (a.Fa) return 0;
        a.maxDelay || (a.maxDelay = 250);
        var f = 0,
            e = (new Date).getTime() + a.maxDelay,
            g = a.d.visibilityState,
            h = ["webkitvisibilitychange", "visibilitychange"];
        g || (g = a.d.webkitVisibilityState);
        if (g && "prerender" == g) {
            if (!a.ja)
                for (a.ja = 1, d = 0; d < h.length; d++) a.d.addEventListener(h[d], function() {
                    var c = a.d.visibilityState;
                    c || (c = a.d.webkitVisibilityState);
                    "visible" == c && (a.ja = 0, a.delayReady())
                });
            f = 1;
            e = 0
        } else d || a.p("_d") && (f = 1);
        f && (a.L.push({
            m: c,
            a: b,
            t: e
        }), a.ja || setTimeout(a.delayReady, a.maxDelay));
        return f
    };
    a.delayReady = function() {
        var c = (new Date).getTime(),
            b = 0,
            d;
        for (a.p("_d") ? b = 1 : a.xa(); 0 < a.L.length;) {
            d = a.L.shift();
            if (b && !d.t && d.t > c) {
                a.L.unshift(d);
                setTimeout(a.delayReady, parseInt(a.maxDelay / 2));
                break
            }
            a.Fa = 1;
            a[d.m].apply(a, d.a);
            a.Fa = 0
        }
    };
    a.setAccount = a.sa = function(c) {
        var b, d;
        if (!a.ia("setAccount", arguments))
            if (a.account = c, a.allAccounts)
                for (b = a.allAccounts.concat(c.split(",")), a.allAccounts = [], b.sort(), d = 0; d < b.length; d++) 0 != d && b[d - 1] == b[d] || a.allAccounts.push(b[d]);
            else a.allAccounts = c.split(",")
    };
    a.foreachVar = function(c, b) {
        var d, f, e, g, h = "";
        e = f = "";
        if (a.lightProfileID) d = a.P, (h = a.lightTrackVars) && (h = "," + h + "," + a.na.join(",") + ",");
        else {
            d = a.g;
            if (a.pe || a.linkType) h = a.linkTrackVars, f = a.linkTrackEvents,
            a.pe && (e = a.pe.substring(0, 1).toUpperCase() + a.pe.substring(1), a[e] && (h = a[e].Nb, f = a[e].Mb));
            h && (h = "," + h + "," + a.H.join(",") + ",");
            f && h && (h += ",events,")
        }
        b && (b = "," + b + ",");
        for (f = 0; f < d.length; f++) e = d[f], (g = a[e]) && (!h || 0 <= h.indexOf("," + e + ",")) && (!b || 0 <= b.indexOf("," + e + ",")) && c(e, g)
    };
    a.r = function(c, b, d, f, e) {
        var g = "",
            h, l, k, q, m = 0;
        "contextData" == c && (c = "c");
        if (b) {
            for (h in b)
                if (!(Object.prototype[h] || e && h.substring(0, e.length) != e) && b[h] && (!d || 0 <= d.indexOf("," + (f ? f + "." : "") + h + ","))) {
                    k = !1;
                    if (m)
                        for (l = 0; l < m.length; l++) h.substring(0,
                            m[l].length) == m[l] && (k = !0);
                    if (!k && ("" == g && (g += "&" + c + "."), l = b[h], e && (h = h.substring(e.length)), 0 < h.length))
                        if (k = h.indexOf("."), 0 < k) l = h.substring(0, k), k = (e ? e : "") + l + ".", m || (m = []), m.push(k), g += a.r(l, b, d, f, k);
                        else if ("boolean" == typeof l && (l = l ? "true" : "false"), l) {
                        if ("retrieveLightData" == f && 0 > e.indexOf(".contextData.")) switch (k = h.substring(0, 4), q = h.substring(4), h) {
                            case "transactionID":
                                h = "xact";
                                break;
                            case "channel":
                                h = "ch";
                                break;
                            case "campaign":
                                h = "v0";
                                break;
                            default:
                                a.Ma(q) && ("prop" == k ? h = "c" + q : "eVar" == k ? h = "v" +
                                    q : "list" == k ? h = "l" + q : "hier" == k && (h = "h" + q, l = l.substring(0, 255)))
                        }
                        g += "&" + a.escape(h) + "=" + a.escape(l)
                    }
                }
                "" != g && (g += "&." + c)
        }
        return g
    };
    a.usePostbacks = 0;
    a.zb = function() {
        var c = "",
            b, d, f, e, g, h, l, k, q = "",
            m = "",
            n = e = "";
        if (a.lightProfileID) b = a.P, (q = a.lightTrackVars) && (q = "," + q + "," + a.na.join(",") + ",");
        else {
            b = a.g;
            if (a.pe || a.linkType) q = a.linkTrackVars, m = a.linkTrackEvents, a.pe && (e = a.pe.substring(0, 1).toUpperCase() + a.pe.substring(1), a[e] && (q = a[e].Nb, m = a[e].Mb));
            q && (q = "," + q + "," + a.H.join(",") + ",");
            m && (m = "," + m + ",", q && (q +=
                ",events,"));
            a.events2 && (n += ("" != n ? "," : "") + a.events2)
        } if (a.visitor && a.visitor.getCustomerIDs) {
            e = p;
            if (g = a.visitor.getCustomerIDs())
                for (d in g) Object.prototype[d] || (f = g[d], "object" == typeof f && (e || (e = {}), f.id && (e[d + ".id"] = f.id), f.authState && (e[d + ".as"] = f.authState)));
            e && (c += a.r("cid", e))
        }
        a.AudienceManagement && a.AudienceManagement.isReady() && (c += a.r("d", a.AudienceManagement.getEventCallConfigParams()));
        for (d = 0; d < b.length; d++) {
            e = b[d];
            g = a[e];
            f = e.substring(0, 4);
            h = e.substring(4);
            g || ("events" == e && n ? (g = n, n =
                "") : "marketingCloudOrgID" == e && a.visitor && (g = a.visitor.marketingCloudOrgID));
            if (g && (!q || 0 <= q.indexOf("," + e + ","))) {
                switch (e) {
                    case "customerPerspective":
                        e = "cp";
                        break;
                    case "marketingCloudOrgID":
                        e = "mcorgid";
                        break;
                    case "supplementalDataID":
                        e = "sdid";
                        break;
                    case "timestamp":
                        e = "ts";
                        break;
                    case "dynamicVariablePrefix":
                        e = "D";
                        break;
                    case "visitorID":
                        e = "vid";
                        break;
                    case "marketingCloudVisitorID":
                        e = "mid";
                        break;
                    case "analyticsVisitorID":
                        e = "aid";
                        break;
                    case "audienceManagerLocationHint":
                        e = "aamlh";
                        break;
                    case "audienceManagerBlob":
                        e =
                            "aamb";
                        break;
                    case "authState":
                        e = "as";
                        break;
                    case "pageURL":
                        e = "g";
                        255 < g.length && (a.pageURLRest = g.substring(255), g = g.substring(0, 255));
                        break;
                    case "pageURLRest":
                        e = "-g";
                        break;
                    case "referrer":
                        e = "r";
                        break;
                    case "vmk":
                    case "visitorMigrationKey":
                        e = "vmt";
                        break;
                    case "visitorMigrationServer":
                        e = "vmf";
                        a.ssl && a.visitorMigrationServerSecure && (g = "");
                        break;
                    case "visitorMigrationServerSecure":
                        e = "vmf";
                        !a.ssl && a.visitorMigrationServer && (g = "");
                        break;
                    case "charSet":
                        e = "ce";
                        break;
                    case "visitorNamespace":
                        e = "ns";
                        break;
                    case "cookieDomainPeriods":
                        e =
                            "cdp";
                        break;
                    case "cookieLifetime":
                        e = "cl";
                        break;
                    case "variableProvider":
                        e = "vvp";
                        break;
                    case "currencyCode":
                        e = "cc";
                        break;
                    case "channel":
                        e = "ch";
                        break;
                    case "transactionID":
                        e = "xact";
                        break;
                    case "campaign":
                        e = "v0";
                        break;
                    case "latitude":
                        e = "lat";
                        break;
                    case "longitude":
                        e = "lon";
                        break;
                    case "resolution":
                        e = "s";
                        break;
                    case "colorDepth":
                        e = "c";
                        break;
                    case "javascriptVersion":
                        e = "j";
                        break;
                    case "javaEnabled":
                        e = "v";
                        break;
                    case "cookiesEnabled":
                        e = "k";
                        break;
                    case "browserWidth":
                        e = "bw";
                        break;
                    case "browserHeight":
                        e = "bh";
                        break;
                    case "connectionType":
                        e = "ct";
                        break;
                    case "homepage":
                        e = "hp";
                        break;
                    case "events":
                        n && (g += ("" != g ? "," : "") + n);
                        if (m)
                            for (h = g.split(","), g = "", f = 0; f < h.length; f++) l = h[f], k = l.indexOf("="), 0 <= k && (l = l.substring(0, k)), k = l.indexOf(":"), 0 <= k && (l = l.substring(0, k)), 0 <= m.indexOf("," + l + ",") && (g += (g ? "," : "") + h[f]);
                        break;
                    case "events2":
                        g = "";
                        break;
                    case "contextData":
                        c += a.r("c", a[e], q, e);
                        g = "";
                        break;
                    case "lightProfileID":
                        e = "mtp";
                        break;
                    case "lightStoreForSeconds":
                        e = "mtss";
                        a.lightProfileID || (g = "");
                        break;
                    case "lightIncrementBy":
                        e =
                            "mti";
                        a.lightProfileID || (g = "");
                        break;
                    case "retrieveLightProfiles":
                        e = "mtsr";
                        break;
                    case "deleteLightProfiles":
                        e = "mtsd";
                        break;
                    case "retrieveLightData":
                        a.retrieveLightProfiles && (c += a.r("mts", a[e], q, e));
                        g = "";
                        break;
                    default:
                        a.Ma(h) && ("prop" == f ? e = "c" + h : "eVar" == f ? e = "v" + h : "list" == f ? e = "l" + h : "hier" == f && (e = "h" + h, g = g.substring(0, 255)))
                }
                g && (c += "&" + e + "=" + ("pev" != e.substring(0, 3) ? a.escape(g) : g))
            }
            "pev3" == e && a.e && (c += a.e)
        }
        return c
    };
    a.D = function(a) {
        var b = a.tagName;
        if ("undefined" != "" + a.Sb || "undefined" != "" + a.Ib && "HTML" !=
            ("" + a.Ib).toUpperCase()) return "";
        b = b && b.toUpperCase ? b.toUpperCase() : "";
        "SHAPE" == b && (b = "");
        b && (("INPUT" == b || "BUTTON" == b) && a.type && a.type.toUpperCase ? b = a.type.toUpperCase() : !b && a.href && (b = "A"));
        return b
    };
    a.Ia = function(a) {
        var b = k.location,
            d = a.href ? a.href : "",
            f, e, g;
        f = d.indexOf(":");
        e = d.indexOf("?");
        g = d.indexOf("/");
        d && (0 > f || 0 <= e && f > e || 0 <= g && f > g) && (e = a.protocol && 1 < a.protocol.length ? a.protocol : b.protocol ? b.protocol : "", f = b.pathname.lastIndexOf("/"), d = (e ? e + "//" : "") + (a.host ? a.host : b.host ? b.host : "") + ("/" != d.substring(0,
            1) ? b.pathname.substring(0, 0 > f ? 0 : f) + "/" : "") + d);
        return d
    };
    a.M = function(c) {
        var b = a.D(c),
            d, f, e = "",
            g = 0;
        return b && (d = c.protocol, f = c.onclick, !c.href || "A" != b && "AREA" != b || f && d && !(0 > d.toLowerCase().indexOf("javascript")) ? f ? (e = a.replace(a.replace(a.replace(a.replace("" + f, "\r", ""), "\n", ""), "\t", ""), " ", ""), g = 2) : "INPUT" == b || "SUBMIT" == b ? (c.value ? e = c.value : c.innerText ? e = c.innerText : c.textContent && (e = c.textContent), g = 3) : "IMAGE" == b && c.src && (e = c.src) : e = a.Ia(c), e) ? {
            id: e.substring(0, 100),
            type: g
        } : 0
    };
    a.Qb = function(c) {
        for (var b =
            a.D(c), d = a.M(c); c && !d && "BODY" != b;)
            if (c = c.parentElement ? c.parentElement : c.parentNode) b = a.D(c), d = a.M(c);
        d && "BODY" != b || (c = 0);
        c && (b = c.onclick ? "" + c.onclick : "", 0 <= b.indexOf(".tl(") || 0 <= b.indexOf(".trackLink(")) && (c = 0);
        return c
    };
    a.Hb = function() {
        var c, b, d = a.linkObject,
            f = a.linkType,
            e = a.linkURL,
            g, h;
        a.oa = 1;
        d || (a.oa = 0, d = a.clickObject);
        if (d) {
            c = a.D(d);
            for (b = a.M(d); d && !b && "BODY" != c;)
                if (d = d.parentElement ? d.parentElement : d.parentNode) c = a.D(d), b = a.M(d);
            b && "BODY" != c || (d = 0);
            if (d && !a.linkObject) {
                var l = d.onclick ? "" + d.onclick :
                    "";
                if (0 <= l.indexOf(".tl(") || 0 <= l.indexOf(".trackLink(")) d = 0
            }
        } else a.oa = 1;
        !e && d && (e = a.Ia(d));
        e && !a.linkLeaveQueryString && (g = e.indexOf("?"), 0 <= g && (e = e.substring(0, g)));
        if (!f && e) {
            var m = 0,
                q = 0,
                n;
            if (a.trackDownloadLinks && a.linkDownloadFileTypes)
                for (l = e.toLowerCase(), g = l.indexOf("?"), h = l.indexOf("#"), 0 <= g ? 0 <= h && h < g && (g = h) : g = h, 0 <= g && (l = l.substring(0, g)), g = a.linkDownloadFileTypes.toLowerCase().split(","), h = 0; h < g.length; h++)(n = g[h]) && l.substring(l.length - (n.length + 1)) == "." + n && (f = "d");
            if (a.trackExternalLinks && !f && (l = e.toLowerCase(), a.La(l) && (a.linkInternalFilters || (a.linkInternalFilters = k.location.hostname), g = 0, a.linkExternalFilters ? (g = a.linkExternalFilters.toLowerCase().split(","), m = 1) : a.linkInternalFilters && (g = a.linkInternalFilters.toLowerCase().split(",")), g))) {
                for (h = 0; h < g.length; h++) n = g[h], 0 <= l.indexOf(n) && (q = 1);
                q ? m && (f = "e") : m || (f = "e")
            }
        }
        a.linkObject = d;
        a.linkURL = e;
        a.linkType = f;
        if (a.trackClickMap || a.trackInlineStats) a.e = "", d && (f = a.pageName, e = 1, d = d.sourceIndex, f || (f = a.pageURL, e = 0), k.s_objectID && (b.id =
            k.s_objectID, d = b.type = 1), f && b && b.id && c && (a.e = "&pid=" + a.escape(f.substring(0, 255)) + (e ? "&pidt=" + e : "") + "&oid=" + a.escape(b.id.substring(0, 100)) + (b.type ? "&oidt=" + b.type : "") + "&ot=" + c + (d ? "&oi=" + d : "")))
    };
    a.Ab = function() {
        var c = a.oa,
            b = a.linkType,
            d = a.linkURL,
            f = a.linkName;
        b && (d || f) && (b = b.toLowerCase(), "d" != b && "e" != b && (b = "o"), a.pe = "lnk_" + b, a.pev1 = d ? a.escape(d) : "", a.pev2 = f ? a.escape(f) : "", c = 1);
        a.abort && (c = 0);
        if (a.trackClickMap || a.trackInlineStats || a.ActivityMap) {
            var b = {}, d = 0,
                e = a.cookieRead("s_sq"),
                g = e ? e.split("&") :
                    0,
                h, l, k, e = 0;
            if (g)
                for (h = 0; h < g.length; h++) l = g[h].split("="), f = a.unescape(l[0]).split(","), l = a.unescape(l[1]), b[l] = f;
            f = a.account.split(",");
            h = {};
            for (k in a.contextData) k && !Object.prototype[k] && "a.activitymap." == k.substring(0, 14) && (h[k] = a.contextData[k], a.contextData[k] = "");
            a.e = a.r("c", h) + (a.e ? a.e : "");
            if (c || a.e) {
                c && !a.e && (e = 1);
                for (l in b)
                    if (!Object.prototype[l])
                        for (k = 0; k < f.length; k++)
                            for (e && (g = b[l].join(","), g == a.account && (a.e += ("&" != l.charAt(0) ? "&" : "") + l, b[l] = [], d = 1)), h = 0; h < b[l].length; h++) g = b[l][h],
                g == f[k] && (e && (a.e += "&u=" + a.escape(g) + ("&" != l.charAt(0) ? "&" : "") + l + "&u=0"), b[l].splice(h, 1), d = 1);
                c || (d = 1);
                if (d) {
                    e = "";
                    h = 2;
                    !c && a.e && (e = a.escape(f.join(",")) + "=" + a.escape(a.e), h = 1);
                    for (l in b)!Object.prototype[l] && 0 < h && 0 < b[l].length && (e += (e ? "&" : "") + a.escape(b[l].join(",")) + "=" + a.escape(l), h--);
                    a.cookieWrite("s_sq", e)
                }
            }
        }
        return c
    };
    a.Bb = function() {
        if (!a.Lb) {
            var c = new Date,
                b = n.location,
                d, f, e = f = d = "",
                g = "",
                h = "",
                l = "1.2",
                k = a.cookieWrite("s_cc", "true", 0) ? "Y" : "N",
                m = "",
                p = "";
            if (c.setUTCDate && (l = "1.3", (0).toPrecision &&
                (l = "1.5", c = [], c.forEach))) {
                l = "1.6";
                f = 0;
                d = {};
                try {
                    f = new Iterator(d), f.next && (l = "1.7", c.reduce && (l = "1.8", l.trim && (l = "1.8.1", Date.parse && (l = "1.8.2", Object.create && (l = "1.8.5")))))
                } catch (r) {}
            }
            d = screen.width + "x" + screen.height;
            e = navigator.javaEnabled() ? "Y" : "N";
            f = screen.pixelDepth ? screen.pixelDepth : screen.colorDepth;
            g = a.w.innerWidth ? a.w.innerWidth : a.d.documentElement.offsetWidth;
            h = a.w.innerHeight ? a.w.innerHeight : a.d.documentElement.offsetHeight;
            try {
                a.b.addBehavior("#default#homePage"), m = a.b.Rb(b) ? "Y" : "N"
            } catch (s) {}
            try {
                a.b.addBehavior("#default#clientCaps"),
                p = a.b.connectionType
            } catch (t) {}
            a.resolution = d;
            a.colorDepth = f;
            a.javascriptVersion = l;
            a.javaEnabled = e;
            a.cookiesEnabled = k;
            a.browserWidth = g;
            a.browserHeight = h;
            a.connectionType = p;
            a.homepage = m;
            a.Lb = 1
        }
    };
    a.Q = {};
    a.loadModule = function(c, b) {
        var d = a.Q[c];
        if (!d) {
            d = k["AppMeasurement_Module_" + c] ? new k["AppMeasurement_Module_" + c](a) : {};
            a.Q[c] = a[c] = d;
            d.eb = function() {
                return d.ib
            };
            d.jb = function(b) {
                if (d.ib = b) a[c + "_onLoad"] = b, a.ia(c + "_onLoad", [a, d], 1) || b(a, d)
            };
            try {
                Object.defineProperty ? Object.defineProperty(d, "onLoad", {
                    get: d.eb,
                    set: d.jb
                }) : d._olc = 1
            } catch (f) {
                d._olc = 1
            }
        }
        b && (a[c + "_onLoad"] = b, a.ia(c + "_onLoad", [a, d], 1) || b(a, d))
    };
    a.p = function(c) {
        var b, d;
        for (b in a.Q)
            if (!Object.prototype[b] && (d = a.Q[b]) && (d._olc && d.onLoad && (d._olc = 0, d.onLoad(a, d)), d[c] && d[c]())) return 1;
        return 0
    };
    a.Db = function() {
        var c = Math.floor(1E13 * Math.random()),
            b = a.visitorSampling,
            d = a.visitorSamplingGroup,
            d = "s_vsn_" + (a.visitorNamespace ? a.visitorNamespace : a.account) + (d ? "_" + d : ""),
            f = a.cookieRead(d);
        if (b) {
            b *= 100;
            f && (f = parseInt(f));
            if (!f) {
                if (!a.cookieWrite(d,
                    c)) return 0;
                f = c
            }
            if (f % 1E4 > b) return 0
        }
        return 1
    };
    a.R = function(c, b) {
        var d, f, e, g, h, l;
        for (d = 0; 2 > d; d++)
            for (f = 0 < d ? a.Aa : a.g, e = 0; e < f.length; e++)
                if (g = f[e], (h = c[g]) || c["!" + g]) {
                    if (!b && ("contextData" == g || "retrieveLightData" == g) && a[g])
                        for (l in a[g]) h[l] || (h[l] = a[g][l]);
                    a[g] = h
                }
    };
    a.Va = function(c, b) {
        var d, f, e, g;
        for (d = 0; 2 > d; d++)
            for (f = 0 < d ? a.Aa : a.g, e = 0; e < f.length; e++) g = f[e], c[g] = a[g], b || c[g] || (c["!" + g] = 1)
    };
    a.vb = function(a) {
        var b, d, f, e, g, h = 0,
            l, k = "",
            m = "";
        if (a && 255 < a.length && (b = "" + a, d = b.indexOf("?"), 0 < d && (l = b.substring(d +
            1), b = b.substring(0, d), e = b.toLowerCase(), f = 0, "http://" == e.substring(0, 7) ? f += 7 : "https://" == e.substring(0, 8) && (f += 8), d = e.indexOf("/", f), 0 < d && (e = e.substring(f, d), g = b.substring(d), b = b.substring(0, d), 0 <= e.indexOf("google") ? h = ",q,ie,start,search_key,word,kw,cd," : 0 <= e.indexOf("yahoo.co") && (h = ",p,ei,"), h && l)))) {
            if ((a = l.split("&")) && 1 < a.length) {
                for (f = 0; f < a.length; f++) e = a[f], d = e.indexOf("="), 0 < d && 0 <= h.indexOf("," + e.substring(0, d) + ",") ? k += (k ? "&" : "") + e : m += (m ? "&" : "") + e;
                k && m ? l = k + "&" + m : m = ""
            }
            d = 253 - (l.length - m.length) -
                b.length;
            a = b + (0 < d ? g.substring(0, d) : "") + "?" + l
        }
        return a
    };
    a.ab = function(c) {
        var b = a.d.visibilityState,
            d = ["webkitvisibilitychange", "visibilitychange"];
        b || (b = a.d.webkitVisibilityState);
        if (b && "prerender" == b) {
            if (c)
                for (b = 0; b < d.length; b++) a.d.addEventListener(d[b], function() {
                    var b = a.d.visibilityState;
                    b || (b = a.d.webkitVisibilityState);
                    "visible" == b && c()
                });
            return !1
        }
        return !0
    };
    a.ea = !1;
    a.J = !1;
    a.lb = function() {
        a.J = !0;
        a.j()
    };
    a.ca = !1;
    a.V = !1;
    a.hb = function(c) {
        a.marketingCloudVisitorID = c;
        a.V = !0;
        a.j()
    };
    a.fa = !1;
    a.W = !1;
    a.mb =
        function(c) {
            a.visitorOptedOut = c;
            a.W = !0;
            a.j()
    };
    a.Z = !1;
    a.S = !1;
    a.Xa = function(c) {
        a.analyticsVisitorID = c;
        a.S = !0;
        a.j()
    };
    a.ba = !1;
    a.U = !1;
    a.Za = function(c) {
        a.audienceManagerLocationHint = c;
        a.U = !0;
        a.j()
    };
    a.aa = !1;
    a.T = !1;
    a.Ya = function(c) {
        a.audienceManagerBlob = c;
        a.T = !0;
        a.j()
    };
    a.$a = function(c) {
        a.maxDelay || (a.maxDelay = 250);
        return a.p("_d") ? (c && setTimeout(function() {
            c()
        }, a.maxDelay), !1) : !0
    };
    a.da = !1;
    a.I = !1;
    a.xa = function() {
        a.I = !0;
        a.j()
    };
    a.isReadyToTrack = function() {
        var c = !0,
            b = a.visitor,
            d, f, e;
        a.ea || a.J || (a.ab(a.lb) ? a.J = !0 : a.ea = !0);
        if (a.ea && !a.J) return !1;
        b && b.isAllowed() && (a.ca || a.marketingCloudVisitorID || !b.getMarketingCloudVisitorID || (a.ca = !0, a.marketingCloudVisitorID = b.getMarketingCloudVisitorID([a, a.hb]), a.marketingCloudVisitorID && (a.V = !0)), a.fa || a.visitorOptedOut || !b.isOptedOut || (a.fa = !0, a.visitorOptedOut = b.isOptedOut([a, a.mb]), a.visitorOptedOut != p && (a.W = !0)), a.Z || a.analyticsVisitorID || !b.getAnalyticsVisitorID || (a.Z = !0, a.analyticsVisitorID = b.getAnalyticsVisitorID([a, a.Xa]), a.analyticsVisitorID && (a.S = !0)), a.ba ||
            a.audienceManagerLocationHint || !b.getAudienceManagerLocationHint || (a.ba = !0, a.audienceManagerLocationHint = b.getAudienceManagerLocationHint([a, a.Za]), a.audienceManagerLocationHint && (a.U = !0)), a.aa || a.audienceManagerBlob || !b.getAudienceManagerBlob || (a.aa = !0, a.audienceManagerBlob = b.getAudienceManagerBlob([a, a.Ya]), a.audienceManagerBlob && (a.T = !0)), c = a.ca && !a.V && !a.marketingCloudVisitorID, b = a.Z && !a.S && !a.analyticsVisitorID, d = a.ba && !a.U && !a.audienceManagerLocationHint, f = a.aa && !a.T && !a.audienceManagerBlob,
            e = a.fa && !a.W, c = c || b || d || f || e ? !1 : !0);
        a.da || a.I || (a.$a(a.xa) ? a.I = !0 : a.da = !0);
        a.da && !a.I && (c = !1);
        return c
    };
    a.o = p;
    a.u = 0;
    a.callbackWhenReadyToTrack = function(c, b, d) {
        var f;
        f = {};
        f.qb = c;
        f.pb = b;
        f.nb = d;
        a.o == p && (a.o = []);
        a.o.push(f);
        0 == a.u && (a.u = setInterval(a.j, 100))
    };
    a.j = function() {
        var c;
        if (a.isReadyToTrack() && (a.kb(), a.o != p))
            for (; 0 < a.o.length;) c = a.o.shift(), c.pb.apply(c.qb, c.nb)
    };
    a.kb = function() {
        a.u && (clearInterval(a.u), a.u = 0)
    };
    a.fb = function(c) {
        var b, d, f = p,
            e = p;
        if (!a.isReadyToTrack()) {
            b = [];
            if (c != p)
                for (d in f = {}, c) f[d] = c[d];
            e = {};
            a.Va(e, !0);
            b.push(f);
            b.push(e);
            a.callbackWhenReadyToTrack(a, a.track, b);
            return !0
        }
        return !1
    };
    a.xb = function() {
        var c = a.cookieRead("s_fid"),
            b = "",
            d = "",
            f;
        f = 8;
        var e = 4;
        if (!c || 0 > c.indexOf("-")) {
            for (c = 0; 16 > c; c++) f = Math.floor(Math.random() * f), b += "0123456789ABCDEF".substring(f, f + 1), f = Math.floor(Math.random() * e), d += "0123456789ABCDEF".substring(f, f + 1), f = e = 16;
            c = b + "-" + d
        }
        a.cookieWrite("s_fid", c, 1) || (c = 0);
        return c
    };
    a.t = a.track = function(c, b) {
        var d, f = new Date,
            e = "s" + Math.floor(f.getTime() / 108E5) % 10 +
                Math.floor(1E13 * Math.random()),
            g = f.getYear(),
            g = "t=" + a.escape(f.getDate() + "/" + f.getMonth() + "/" + (1900 > g ? g + 1900 : g) + " " + f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds() + " " + f.getDay() + " " + f.getTimezoneOffset());
        a.visitor && a.visitor.getAuthState && (a.authState = a.visitor.getAuthState());
        a.p("_s");
        a.fb(c) || (b && a.R(b), c && (d = {}, a.Va(d, 0), a.R(c)), a.Db() && !a.visitorOptedOut && (a.analyticsVisitorID || a.marketingCloudVisitorID || (a.fid = a.xb()), a.Hb(), a.usePlugins && a.doPlugins && a.doPlugins(a), a.account && (a.abort ||
            (a.trackOffline && !a.timestamp && (a.timestamp = Math.floor(f.getTime() / 1E3)), f = k.location, a.pageURL || (a.pageURL = f.href ? f.href : f), a.referrer || a.Wa || (f = a.Util.getQueryParam("adobe_mc_ref", null, null, !0), a.referrer = f || void 0 === f ? void 0 === f ? "" : f : n.document.referrer), a.Wa = 1, a.referrer = a.vb(a.referrer), a.p("_g")), a.Ab() && !a.abort && (a.visitor && !a.supplementalDataID && a.visitor.getSupplementalDataID && (a.supplementalDataID = a.visitor.getSupplementalDataID("AppMeasurement:" + a._in, a.expectSupplementalData ? !1 : !0)),
                a.Bb(), g += a.zb(), a.Gb(e, g), a.p("_t"), a.referrer = ""))), c && a.R(d, 1));
        a.abort = a.supplementalDataID = a.timestamp = a.pageURLRest = a.linkObject = a.clickObject = a.linkURL = a.linkName = a.linkType = k.s_objectID = a.pe = a.pev1 = a.pev2 = a.pev3 = a.e = a.lightProfileID = 0
    };
    a.za = [];
    a.registerPreTrackCallback = function(c) {
        for (var b = [], d = 1; d < arguments.length; d++) b.push(arguments[d]);
        "function" == typeof c ? a.za.push([c, b]) : a.debugTracking && a.F("DEBUG: Non function type passed to registerPreTrackCallback")
    };
    a.cb = function(c) {
        a.wa(a.za,
            c)
    };
    a.ya = [];
    a.registerPostTrackCallback = function(c) {
        for (var b = [], d = 1; d < arguments.length; d++) b.push(arguments[d]);
        "function" == typeof c ? a.ya.push([c, b]) : a.debugTracking && a.F("DEBUG: Non function type passed to registerPostTrackCallback")
    };
    a.bb = function(c) {
        a.wa(a.ya, c)
    };
    a.wa = function(c, b) {
        if ("object" == typeof c)
            for (var d = 0; d < c.length; d++) {
                var f = c[d][0],
                    e = c[d][1];
                e.unshift(b);
                if ("function" == typeof f) try {
                    f.apply(null, e)
                } catch (g) {
                    a.debugTracking && a.F(g.message)
                }
            }
    };
    a.tl = a.trackLink = function(c, b, d, f, e) {
        a.linkObject =
            c;
        a.linkType = b;
        a.linkName = d;
        e && (a.l = c, a.A = e);
        return a.track(f)
    };
    a.trackLight = function(c, b, d, f) {
        a.lightProfileID = c;
        a.lightStoreForSeconds = b;
        a.lightIncrementBy = d;
        return a.track(f)
    };
    a.clearVars = function() {
        var c, b;
        for (c = 0; c < a.g.length; c++)
            if (b = a.g[c], "prop" == b.substring(0, 4) || "eVar" == b.substring(0, 4) || "hier" == b.substring(0, 4) || "list" == b.substring(0, 4) || "channel" == b || "events" == b || "eventList" == b || "products" == b || "productList" == b || "purchaseID" == b || "transactionID" == b || "state" == b || "zip" == b || "campaign" == b) a[b] =
                void 0
    };
    a.tagContainerMarker = "";
    a.Gb = function(c, b) {
        var d, f = a.trackingServer;
        d = "";
        var e = a.dc,
            g = "sc.",
            h = a.visitorNamespace;
        f ? a.trackingServerSecure && a.ssl && (f = a.trackingServerSecure) : (h || (h = a.account, f = h.indexOf(","), 0 <= f && (h = h.substring(0, f)), h = h.replace(/[^A-Za-z0-9]/g, "")), d || (d = "2o7.net"), e = e ? ("" + e).toLowerCase() : "d1", "2o7.net" == d && ("d1" == e ? e = "112" : "d2" == e && (e = "122"), g = ""), f = h + "." + e + "." + g + d);
        d = a.ssl ? "https://" : "http://";
        e = a.AudienceManagement && a.AudienceManagement.isReady() || 0 != a.usePostbacks;
        d +=
            f + "/b/ss/" + a.account + "/" + (a.mobile ? "5." : "") + (e ? "10" : "1") + "/JS-" + a.version + (a.Kb ? "T" : "") + (a.tagContainerMarker ? "-" + a.tagContainerMarker : "") + "/" + c + "?AQB=1&ndh=1&pf=1&" + (e ? "callback=s_c_il[" + a._in + "].doPostbacks&et=1&" : "") + b + "&AQE=1";
        a.cb(d);
        a.tb(d);
        a.ka()
    };
    a.Ua = /{(%?)(.*?)(%?)}/;
    a.Ob = RegExp(a.Ua.source, "g");
    a.ub = function(c) {
        if ("object" == typeof c.dests)
            for (var b = 0; b < c.dests.length; ++b) {
                var d = c.dests[b];
                if ("string" == typeof d.c && "aa." == d.id.substr(0, 3))
                    for (var f = d.c.match(a.Ob), e = 0; e < f.length; ++e) {
                        var g =
                            f[e],
                            h = g.match(a.Ua),
                            k = "";
                        "%" == h[1] && "timezone_offset" == h[2] ? k = (new Date).getTimezoneOffset() : "%" == h[1] && "timestampz" == h[2] && (k = a.yb());
                        d.c = d.c.replace(g, a.escape(k))
                    }
            }
    };
    a.yb = function() {
        var c = new Date,
            b = new Date(6E4 * Math.abs(c.getTimezoneOffset()));
        return a.k(4, c.getFullYear()) + "-" + a.k(2, c.getMonth() + 1) + "-" + a.k(2, c.getDate()) + "T" + a.k(2, c.getHours()) + ":" + a.k(2, c.getMinutes()) + ":" + a.k(2, c.getSeconds()) + (0 < c.getTimezoneOffset() ? "-" : "+") + a.k(2, b.getUTCHours()) + ":" + a.k(2, b.getUTCMinutes())
    };
    a.k = function(a,
        b) {
        return (Array(a + 1).join(0) + b).slice(-a)
    };
    a.ta = {};
    a.doPostbacks = function(c) {
        if ("object" == typeof c)
            if (a.ub(c), "object" == typeof a.AudienceManagement && "function" == typeof a.AudienceManagement.isReady && a.AudienceManagement.isReady() && "function" == typeof a.AudienceManagement.passData) a.AudienceManagement.passData(c);
            else if ("object" == typeof c && "object" == typeof c.dests)
            for (var b = 0; b < c.dests.length; ++b) {
                var d = c.dests[b];
                "object" == typeof d && "string" == typeof d.c && "string" == typeof d.id && "aa." == d.id.substr(0,
                    3) && (a.ta[d.id] = new Image, a.ta[d.id].alt = "", a.ta[d.id].src = d.c)
            }
    };
    a.tb = function(c) {
        a.i || a.Cb();
        a.i.push(c);
        a.ma = a.C();
        a.Sa()
    };
    a.Cb = function() {
        a.i = a.Eb();
        a.i || (a.i = [])
    };
    a.Eb = function() {
        var c, b;
        if (a.ra()) {
            try {
                (b = k.localStorage.getItem(a.pa())) && (c = k.JSON.parse(b))
            } catch (d) {}
            return c
        }
    };
    a.ra = function() {
        var c = !0;
        a.trackOffline && a.offlineFilename && k.localStorage && k.JSON || (c = !1);
        return c
    };
    a.Ja = function() {
        var c = 0;
        a.i && (c = a.i.length);
        a.q && c++;
        return c
    };
    a.ka = function() {
        if (a.q && (a.B && a.B.complete && a.B.G && a.B.va(),
            a.q)) return;
        a.Ka = p;
        if (a.qa) a.ma > a.O && a.Qa(a.i), a.ua(500);
        else {
            var c = a.ob();
            if (0 < c) a.ua(c);
            else if (c = a.Ga()) a.q = 1, a.Fb(c), a.Jb(c)
        }
    };
    a.ua = function(c) {
        a.Ka || (c || (c = 0), a.Ka = setTimeout(a.ka, c))
    };
    a.ob = function() {
        var c;
        if (!a.trackOffline || 0 >= a.offlineThrottleDelay) return 0;
        c = a.C() - a.Pa;
        return a.offlineThrottleDelay < c ? 0 : a.offlineThrottleDelay - c
    };
    a.Ga = function() {
        if (0 < a.i.length) return a.i.shift()
    };
    a.Fb = function(c) {
        if (a.debugTracking) {
            var b = "AppMeasurement Debug: " + c;
            c = c.split("&");
            var d;
            for (d = 0; d < c.length; d++) b +=
                "\n\t" + a.unescape(c[d]);
            a.F(b)
        }
    };
    a.gb = function() {
        return a.marketingCloudVisitorID || a.analyticsVisitorID
    };
    a.Y = !1;
    var t;
    try {
        t = JSON.parse('{"x":"y"}')
    } catch (w) {
        t = null
    }
    t && "y" == t.x ? (a.Y = !0, a.X = function(a) {
        return JSON.parse(a)
    }) : k.$ && k.$.parseJSON ? (a.X = function(a) {
        return k.$.parseJSON(a)
    }, a.Y = !0) : a.X = function() {
        return null
    };
    a.Jb = function(c) {
        var b, d, f;
        a.gb() && 2047 < c.length && ("undefined" != typeof XMLHttpRequest && (b = new XMLHttpRequest, "withCredentials" in b ? d = 1 : b = 0), b || "undefined" == typeof XDomainRequest || (b =
            new XDomainRequest, d = 2), b && (a.AudienceManagement && a.AudienceManagement.isReady() || 0 != a.usePostbacks) && (a.Y ? b.Ba = !0 : b = 0));
        !b && a.Ta && (c = c.substring(0, 2047));
        !b && a.d.createElement && (0 != a.usePostbacks || a.AudienceManagement && a.AudienceManagement.isReady()) && (b = a.d.createElement("SCRIPT")) && "async" in b && ((f = (f = a.d.getElementsByTagName("HEAD")) && f[0] ? f[0] : a.d.body) ? (b.type = "text/javascript", b.setAttribute("async", "async"), d = 3) : b = 0);
        b || (b = new Image, b.alt = "", b.abort || "undefined" === typeof k.InstallTrigger ||
            (b.abort = function() {
                b.src = p
            }));
        b.Da = function() {
            try {
                b.G && (clearTimeout(b.G), b.G = 0)
            } catch (a) {}
        };
        b.onload = b.va = function() {
            a.bb(c);
            b.Da();
            a.sb();
            a.ga();
            a.q = 0;
            a.ka();
            if (b.Ba) {
                b.Ba = !1;
                try {
                    a.doPostbacks(a.X(b.responseText))
                } catch (d) {}
            }
        };
        b.onabort = b.onerror = b.Ha = function() {
            b.Da();
            (a.trackOffline || a.qa) && a.q && a.i.unshift(a.rb);
            a.q = 0;
            a.ma > a.O && a.Qa(a.i);
            a.ga();
            a.ua(500)
        };
        b.onreadystatechange = function() {
            4 == b.readyState && (200 == b.status ? b.va() : b.Ha())
        };
        a.Pa = a.C();
        if (1 == d || 2 == d) {
            var e = c.indexOf("?");
            f = c.substring(0,
                e);
            e = c.substring(e + 1);
            e = e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/, "");
            1 == d ? (b.open("POST", f, !0), b.send(e)) : 2 == d && (b.open("POST", f), b.send(e))
        } else if (b.src = c, 3 == d) {
            if (a.Na) try {
                f.removeChild(a.Na)
            } catch (g) {}
            f.firstChild ? f.insertBefore(b, f.firstChild) : f.appendChild(b);
            a.Na = a.B
        }
        b.G = setTimeout(function() {
            b.G && (b.complete ? b.va() : (a.trackOffline && b.abort && b.abort(), b.Ha()))
        }, 5E3);
        a.rb = c;
        a.B = k["s_i_" + a.replace(a.account, ",", "_")] = b;
        if (a.useForcedLinkTracking && a.K || a.A) a.forcedLinkTrackingTimeout || (a.forcedLinkTrackingTimeout =
            250), a.ha = setTimeout(a.ga, a.forcedLinkTrackingTimeout)
    };
    a.sb = function() {
        if (a.ra() && !(a.Oa > a.O)) try {
            k.localStorage.removeItem(a.pa()), a.Oa = a.C()
        } catch (c) {}
    };
    a.Qa = function(c) {
        if (a.ra()) {
            a.Sa();
            try {
                k.localStorage.setItem(a.pa(), k.JSON.stringify(c)), a.O = a.C()
            } catch (b) {}
        }
    };
    a.Sa = function() {
        if (a.trackOffline) {
            if (!a.offlineLimit || 0 >= a.offlineLimit) a.offlineLimit = 10;
            for (; a.i.length > a.offlineLimit;) a.Ga()
        }
    };
    a.forceOffline = function() {
        a.qa = !0
    };
    a.forceOnline = function() {
        a.qa = !1
    };
    a.pa = function() {
        return a.offlineFilename +
            "-" + a.visitorNamespace + a.account
    };
    a.C = function() {
        return (new Date).getTime()
    };
    a.La = function(a) {
        a = a.toLowerCase();
        return 0 != a.indexOf("#") && 0 != a.indexOf("about:") && 0 != a.indexOf("opera:") && 0 != a.indexOf("javascript:") ? !0 : !1
    };
    a.setTagContainer = function(c) {
        var b, d, f;
        a.Kb = c;
        for (b = 0; b < a._il.length; b++)
            if ((d = a._il[b]) && "s_l" == d._c && d.tagContainerName == c) {
                a.R(d);
                if (d.lmq)
                    for (b = 0; b < d.lmq.length; b++) f = d.lmq[b], a.loadModule(f.n);
                if (d.ml)
                    for (f in d.ml)
                        if (a[f])
                            for (b in c = a[f], f = d.ml[f], f)!Object.prototype[b] && ("function" !=
                                typeof f[b] || 0 > ("" + f[b]).indexOf("s_c_il")) && (c[b] = f[b]);
                if (d.mmq)
                    for (b = 0; b < d.mmq.length; b++) f = d.mmq[b], a[f.m] && (c = a[f.m], c[f.f] && "function" == typeof c[f.f] && (f.a ? c[f.f].apply(c, f.a) : c[f.f].apply(c)));
                if (d.tq)
                    for (b = 0; b < d.tq.length; b++) a.track(d.tq[b]);
                d.s = a;
                break
            }
    };
    a.Util = {
        urlEncode: a.escape,
        urlDecode: a.unescape,
        cookieRead: a.cookieRead,
        cookieWrite: a.cookieWrite,
        getQueryParam: function(c, b, d, f) {
            var e, g = "";
            b || (b = a.pageURL ? a.pageURL : k.location);
            d = d ? d : "&";
            if (!c || !b) return g;
            b = "" + b;
            e = b.indexOf("?");
            if (0 >
                e) return g;
            b = d + b.substring(e + 1) + d;
            if (!f || !(0 <= b.indexOf(d + c + d) || 0 <= b.indexOf(d + c + "=" + d))) {
                e = b.indexOf("#");
                0 <= e && (b = b.substr(0, e) + d);
                e = b.indexOf(d + c + "=");
                if (0 > e) return g;
                b = b.substring(e + d.length + c.length + 1);
                e = b.indexOf(d);
                0 <= e && (b = b.substring(0, e));
                0 < b.length && (g = a.unescape(b));
                return g
            }
        }
    };
    a.H = "supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
    a.g = a.H.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));
    a.na = "timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");
    a.P = a.na.slice(0);
    a.Aa = "account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData usePostbacks registerPreTrackCallback registerPostTrackCallback AudienceManagement".split(" ");
    for (m = 0; 250 >= m; m++) 76 > m && (a.g.push("prop" + m), a.P.push("prop" + m)), a.g.push("eVar" + m), a.P.push("eVar" + m), 6 > m && a.g.push("hier" + m), 4 > m && a.g.push("list" + m);
    m = "pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID".split(" ");
    a.g = a.g.concat(m);
    a.H = a.H.concat(m);
    a.ssl = 0 <= k.location.protocol.toLowerCase().indexOf("https");
    a.charSet = "UTF-8";
    a.contextData = {};
    a.offlineThrottleDelay =
        0;
    a.offlineFilename = "AppMeasurement.offline";
    a.Pa = 0;
    a.ma = 0;
    a.O = 0;
    a.Oa = 0;
    a.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
    a.w = k;
    a.d = k.document;
    try {
        if (a.Ta = !1, navigator) {
            var v = navigator.userAgent;
            if ("Microsoft Internet Explorer" == navigator.appName || 0 <= v.indexOf("MSIE ") || 0 <= v.indexOf("Trident/") && 0 <= v.indexOf("Windows NT 6")) a.Ta = !0
        }
    } catch (x) {}
    a.ga = function() {
        a.ha && (k.clearTimeout(a.ha), a.ha = p);
        a.l && a.K && a.l.dispatchEvent(a.K);
        a.A && ("function" == typeof a.A ? a.A() :
            a.l && a.l.href && (a.d.location = a.l.href));
        a.l = a.K = a.A = 0
    };
    a.Ra = function() {
        a.b = a.d.body;
        a.b ? (a.v = function(c) {
            var b, d, f, e, g;
            if (!(a.d && a.d.getElementById("cppXYctnr") || c && c["s_fe_" + a._in])) {
                if (a.Ca)
                    if (a.useForcedLinkTracking) a.b.removeEventListener("click", a.v, !1);
                    else {
                        a.b.removeEventListener("click", a.v, !0);
                        a.Ca = a.useForcedLinkTracking = 0;
                        return
                    } else a.useForcedLinkTracking = 0;
                a.clickObject = c.srcElement ? c.srcElement : c.target;
                try {
                    if (!a.clickObject || a.N && a.N == a.clickObject || !(a.clickObject.tagName || a.clickObject.parentElement ||
                        a.clickObject.parentNode)) a.clickObject = 0;
                    else {
                        var h = a.N = a.clickObject;
                        a.la && (clearTimeout(a.la), a.la = 0);
                        a.la = setTimeout(function() {
                            a.N == h && (a.N = 0)
                        }, 1E4);
                        f = a.Ja();
                        a.track();
                        if (f < a.Ja() && a.useForcedLinkTracking && c.target) {
                            for (e = c.target; e && e != a.b && "A" != e.tagName.toUpperCase() && "AREA" != e.tagName.toUpperCase();) e = e.parentNode;
                            if (e && (g = e.href, a.La(g) || (g = 0), d = e.target, c.target.dispatchEvent && g && (!d || "_self" == d || "_top" == d || "_parent" == d || k.name && d == k.name))) {
                                try {
                                    b = a.d.createEvent("MouseEvents")
                                } catch (l) {
                                    b =
                                        new k.MouseEvent
                                }
                                if (b) {
                                    try {
                                        b.initMouseEvent("click", c.bubbles, c.cancelable, c.view, c.detail, c.screenX, c.screenY, c.clientX, c.clientY, c.ctrlKey, c.altKey, c.shiftKey, c.metaKey, c.button, c.relatedTarget)
                                    } catch (m) {
                                        b = 0
                                    }
                                    b && (b["s_fe_" + a._in] = b.s_fe = 1, c.stopPropagation(), c.stopImmediatePropagation && c.stopImmediatePropagation(), c.preventDefault(), a.l = c.target, a.K = b)
                                }
                            }
                        }
                    }
                } catch (n) {
                    a.clickObject = 0
                }
            }
        }, a.b && a.b.attachEvent ? a.b.attachEvent("onclick", a.v) : a.b && a.b.addEventListener && (navigator && (0 <= navigator.userAgent.indexOf("WebKit") &&
            a.d.createEvent || 0 <= navigator.userAgent.indexOf("Firefox/2") && k.MouseEvent) && (a.Ca = 1, a.useForcedLinkTracking = 1, a.b.addEventListener("click", a.v, !0)), a.b.addEventListener("click", a.v, !1))) : setTimeout(a.Ra, 30)
    };
    a.Ra();
    r ? a.setAccount(r) : a.F("Error, missing Report Suite ID in AppMeasurement initialization");
    a.loadModule("ActivityMap")
}

function s_gi(r) {
    var a, k = window.s_c_il,
        p, n, m = r.split(","),
        s, u, t = 0;
    if (k)
        for (p = 0; !t && p < k.length;) {
            a = k[p];
            if ("s_c" == a._c && (a.account || a.oun))
                if (a.account && a.account == r) t = 1;
                else
                    for (n = a.account ? a.account : a.oun, n = a.allAccounts ? a.allAccounts : n.split(","), s = 0; s < m.length; s++)
                        for (u = 0; u < n.length; u++) m[s] == n[u] && (t = 1);
            p++
        }
    t || (a = new AppMeasurement(r));
    return a
}
AppMeasurement.getInstance = s_gi;
window.s_objectID || (window.s_objectID = 0);

function s_pgicq() {
    var r = window,
        a = r.s_giq,
        k, p, n;
    if (a)
        for (k = 0; k < a.length; k++) p = a[k], n = s_gi(p.oun), n.setAccount(p.un), n.setTagContainer(p.tagContainerName);
    r.s_giq = 0
}
s_pgicq();