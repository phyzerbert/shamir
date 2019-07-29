(function () {
    //IDShield Service
    angular.module('sharedAuthStepUp')
        .factory('idShieldService', ['$http', '$state', '$rootScope', function ($http, $state, $rootScope) {

            var getIdshieldQuestions = function (getBaseUrl, transactionid, signonid, sessionGUID) {
                questionParams = {
                    "TransactionId": transactionid,
                    "SignOnId": signonid,
                    "TransactionGUID": sessionGUID
                }
                Object.toparams = function ObjecttoParams(questionParams) {
                    var parameters = [];
                    for (var key in questionParams) {
                        parameters.push(key + '=' + encodeURIComponent(questionParams[key]));
                    }
                    return parameters.join('&');
                };
                $rootScope.loading = true;

                var disablingDiv = document.getElementById('disablingDiv');
                if (disablingDiv) disablingDiv.style.display = 'block'; //defect fix 22590

                return $http({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: getBaseUrl + "getstepupquestion",
                    data: Object.toparams(questionParams)
                });

            }
            var answerValidation = function (answer, $scope) {

                if (!answer) {
                    $scope.showerror = true;
                    $scope.errorMessage = "Please enter an answer.";
                    return;
                }
                else {
                    $scope.showerror = false;
                    $scope.errorMessage = "";
                }
                if ($scope.placeHolderText) {

                    switch ($scope.AnswerFormat) {
                        case "MMYY":
                            $scope.regFormat = /^(0?[1-9]|1[012])[\/]\d\d$/;
                            $scope.errorText = "Please enter the date in this format: MM/YY";
                            break;
                        case "DATE6":
                            $scope.regFormat = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d\d$/;
                            $scope.errorText = "Please enter the date in this format: MM/DD/YY";
                            break;
                        case "MMDD":
                            $scope.regFormat = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])$/;
                            $scope.errorText = "Please enter the date in this format: MM/DD";
                            break;

                    }

                    if (!$scope.regFormat.test(answer)) {
                        $scope.showerror = true;
                        $scope.errorMessage = $scope.errorText;
                        return;
                    }
                    $scope.showerror = false;
                    $scope.errorMessage = "";
                }
            }
            var getPlaceholderText = function (formate) {

                switch (formate) {
                    case "MMYY":
                        return "MM/YY";
                        break;
                    case "DATE6":
                        return "MM/DD/YY";
                        break;
                    case "MMDD":
                        return "MM/DD";
                        break;
                }
            }
            var validateAnswer = function (getBaseUrl, transactionid, answer, contextData, appid, signonid, policyid, actimizedata, sessionGUID) {
                answerParams = {
                    "Answer": answer,
                    "ContextData": contextData ? contextData : "",
                    "TransmitApplicationId": appid,
                    "SignOnId": signonid,
                    "PolicyID": policyid,
                    "ActimizeData": actimizedata ? actimizedata : "",
                    "TransactionGUID": sessionGUID
                }
                Object.toparams = function ObjecttoParams(validationParams) {
                    var parameters = [];
                    for (var key in validationParams) {
                        parameters.push(key + '=' + encodeURIComponent(validationParams[key]));
                    }
                    return parameters.join('&');
                };
                $rootScope.loading = true;
                return $http({
                    method: 'POST',
                    url: getBaseUrl + "validatestepupquestion",

                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    },
                    data: Object.toparams(answerParams)

                });

            }

            var isLoginStepup = function () {
                var returnVal = false;
                if ($("div[saloginwidget]") != null && $("div[saloginwidget]") != undefined) {
                    if ($("div[saloginwidget]").length > 0) {
                        returnVal = true;
                    }
                }
                return returnVal;
            }


            var isTuxLogin = function () {
                var returnFlag = false;
                if ($("#tuxloginwidget") != null && $("#tuxloginwidget") != undefined) {
                    if ($("#tuxloginwidget").length > 0) {
                        returnFlag = true;
                    }
                }
                return returnFlag;
            }
            // To check whether the stepup is loaded via SharedAuthDirective.js
            var isStepUpViaSharedAuthDirective = function () {
                var returnFlag = false;
                if (document.querySelector("div[sastepup]") != null && document.querySelector("div[sastepup]") != undefined) {
                    if (angular.element(document.querySelector("div[sastepup]")).length > 0) {
                        returnFlag = true;
                    }
                }
                return returnFlag;
            }

            var loginAssistance = function LoginAssistance(isAccountLocked, isOTP, isMobileWeb, BaseUrl,CancelUrl, isResetPassword, isChangePassword, existingPassword) {
                var isOTPFlow = false;
                if (isOTP != undefined && isOTP != null && isOTP) {
                    isOTPFlow = true;
                }
                try {

                    // Check Mobile/OLB
                    if (typeof (OmniDataUtil) != "undefined") {
                        $rootScope.$broadcast('authCancel', null); //defect fix 18057
                        require(['login_util', 'login_model'], function (LoginUtil, LoginModel) {
                            var inSession = 'true';
                            // To identify insession or out session for TUX
                            if ($("#tuxloginwidget") != null && $("#tuxloginwidget") != undefined) {
                                if ($("#tuxloginwidget").length > 0) {
                                    inSession = 'false';
                                }
                            }
                            if (isResetPassword != undefined && isResetPassword != null && isResetPassword) {
                                LoginUtil.LoginAssistanceUtil('URL_SUFFIX_LOGIN_ASSIST_RESET_PASSWORD', inSession, 'true', 'resetPassword', isOTPFlow);
                            }
                            else if (isChangePassword != undefined && isChangePassword != null && isChangePassword) {
                                LoginUtil.LoginAssistanceUtil('URL_SUFFIX_LOGIN_ASSIST_CHANGE_PASSWORD', inSession, 'false', 'changePassword', isOTPFlow, false, "", existingPassword);
                            }
                            else {
                                if (isAccountLocked)
                                    LoginUtil.LoginAssistanceUtil('URL_SUFFIX_LOGIN_ASSIST_RESET_ANSWERS', inSession, 'true', 'resetQuestions', isOTPFlow);
                                else
                                    LoginUtil.LoginAssistanceUtil('URL_SUFFIX_LOGIN_ASSIST_RESET_ANSWERS', inSession, 'false', 'forgotAns', isOTPFlow);
                            }

                            LoginModel.model.set("LoginAssistanceFlow", false);
                        });
                    }
                    else {

                        $rootScope.$broadcast('authCancel', null);
                        var laForm = document.createElement('form');
                        laForm.id = "LAForm";
                        laForm.method = 'post';

                        var directiveWidgetBaseURL = "";
                        var directiveWidget = document.getElementById('dvLoginWidgetDir');
                        if (directiveWidget != null && directiveWidget != undefined) {
                            directiveWidgetBaseURL = directiveWidget.getAttribute("baseurl");
                        }
                        if (directiveWidgetBaseURL!=null && directiveWidgetBaseURL!=undefined && directiveWidgetBaseURL!="") {
                            laForm.action = directiveWidgetBaseURL + "/OLS/LoginAssist/ResetAnswers";
                        }
                        else {
                            laForm.action = "/OLS/LoginAssist/ResetAnswers";
                        }

                        if (window.parent) {
                            laForm.target = '_parent';
                        }

                        // Added for passing inSession value as false during login
                        var inSession = "True";
                        if ($("div[saloginwidget]") != null && $("div[saloginwidget]") != undefined) {
                            if ($("div[saloginwidget]").length > 0) {
                                inSession = "False";
                            }
                        }

                        var redirectUrlLocation = "";
                        if (inSession == "True") {
                            redirectUrlLocation = window.location.pathname;
                            var elemReturnUrl = document.createElement('INPUT');
                            elemReturnUrl.type = "HIDDEN";
                            elemReturnUrl.value = redirectUrlLocation;
                            elemReturnUrl.name = "ReturnURL";
                            laForm.appendChild(elemReturnUrl);
                            redirectUrlLocation = window.location.pathname;
                        }
                        else {
                            redirectUrlLocation = CancelUrl ? CancelUrl : "/Auth/Login";
                        }

                        var elemCancelUrl = document.createElement('INPUT');
                        var elemAppName = document.createElement('INPUT');
                        var elemIsOTP = document.createElement('INPUT');
                        var elemIsLock = document.createElement('INPUT');

                        elemIsOTP.type = 'HIDDEN';
                        elemIsOTP.value = 'true';
                        elemIsOTP.name = 'IsOTP';

                        elemCancelUrl.type = 'HIDDEN';
                        elemCancelUrl.value = redirectUrlLocation;
                        elemCancelUrl.name = 'CancelURL';

                        elemAppName.type = "HIDDEN";
                        elemAppName.value = "OLB";
                        elemAppName.name = "AppName";

                        var lockIndicator = 'False';
                        if (isAccountLocked) {
                            lockIndicator = 'True';
                        }

                        elemIsLock.type = "HIDDEN";
                        elemIsLock.value = lockIndicator;
                        elemIsLock.name = "LockIndicator";

                        laForm.appendChild(elemCancelUrl);
                        laForm.appendChild(elemAppName);
                        laForm.appendChild(elemIsLock);
                        // Hide Send text row during OTp Flow
                        if (isOTPFlow) {
                            laForm.appendChild(elemIsOTP);
                        }

                        var elemInSession = document.createElement('INPUT');
                        elemInSession.type = "HIDDEN";
                        elemInSession.value = inSession;
                        elemInSession.name = "InSession";
                        laForm.appendChild(elemInSession);

                        document.body.appendChild(laForm);
                        laForm.submit();
                        // End CI-LoginAssistance : Changed ForgotAnswer link urls to new LA ResetIdShield

                    }
                }
                catch (ex) { }
            }
            return {
                getIdshieldQuestions: getIdshieldQuestions,
                validateAnswer: validateAnswer,
                loginAssit: loginAssistance,
                answerValidation: answerValidation,
                getPlaceholderText: getPlaceholderText,
                isLoginStepup: isLoginStepup,
                isTuxLogin: isTuxLogin,
                isStepUpViaSharedAuthDirective: isStepUpViaSharedAuthDirective
            };

        }]).factory('SASiteCatService', ['$http', '$state', '$rootScope', function ($http, $state, $rootScope) {
            var commonTracking = function () {

                /* User Agent Checking for Mobile-based logic */
                var ua = navigator.userAgent;
                if (!ua) { ua = "device unknown"; }
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
                } else { device_name = "wap:other"; }

                s.eVar71 = s.prop30 = device_name;
                if (s.contextData['appName_PERS'] == "MBL") { s.prop40 = "mobile"; }

            };
            var setChallengeContextData = function (pid) {
                cd.challengePolicy = pid;
                switch (pid) {
                    case "full_number":
                        cd.challengeStatus = "full account number view";
                        break;
                    default:
                        cd.challengeStatus = pid ? pid.replace(/_/g, " ") : "";
                        break;
                }
            };
            var isTuxLogin = function () {
                var returnFlag = false;
                if ($("#tuxloginwidget") != null && $("#tuxloginwidget") != undefined) {
                    if ($("#tuxloginwidget").length > 0) {
                        returnFlag = true;
                    }
                }
                return returnFlag;
            }
            var siteCatTUXLoginParameters= function(pageType,pageSection) {
                var siteCatParams ={};
                siteCatParams.subSiteSection ='';
                siteCatParams.currentPageName ='';
                if(isTuxLogin){
                    siteCatParams.subSiteSection =Omniture.constants[pageType]["subSiteSectionLoginTUX"];
                    siteCatParams.currentPageName ="usb:mobile:wap:waptouch:login" +":" + Omniture.constants[pageType][pageSection];
                }else{
                    siteCatParams.subSiteSection =Omniture.constants[pageType]["subSiteSection"];
                    siteCatParams.currentPageName =prefix + ":" + Omniture.constants[pageType]["pageType"] + ":" + Omniture.constants[pageType][pageSection];
                }
                return siteCatParams;
            }
            var onTrackCustomSharedStepUp = function (pageType, pageSection, policyId) {
                if (Omniture.constants[pageType] && Omniture.constants[pageType]["pageType"]) {
                    var prefix = "omni";
                    var subSiteSection ="";
                    var currentPageName="";
                    s.clearContext();
                    s.clearVars();
                    if (s.contextData['appName_PERS'] == "MBL") { commonTracking(); }
                    var siteCatParams = siteCatTUXLoginParameters(pageType,pageSection);

                    cd.currentPage = siteCatParams.currentPageName;
                    cd.siteSection = Omniture.constants[pageType]["siteSection"];
                    cd.subSiteSection = siteCatParams.subSiteSection;;
                    if (policyId)
                        setChallengeContextData(policyId);
                    if (pageSection.indexOf("Error") > 1) {
                        cd.transactionerror = Omniture.constants[pageType][pageSection];
                    }

                    s.pageName = "";
                    s.prop53 = cd.currentPage;

                    s.t();
                }
                else {
                    window.console.log("Missing omniture values");
                }
            };
            var onTrackSharedStepUpClickEvent = function (pageType, pageSection) {
                if (Omniture.constants[pageType] && Omniture.constants[pageType][pageSection]) {
                    var prefix = "omni";
                    s.clearVars();
                    if (s.contextData['appName_PERS'] == "MBL") { commonTracking(); }
                    s.linkTrackVars = s.linkTrackVars + ',prop53';
                    //s.linkTrackVars = s.linkTrackVars + ',prop53,contextData.cd.challengePolicy,contextData.cd.challengeStatus';
                    //setChallengeContextData();
                    var siteCatParams = siteCatTUXLoginParameters(pageType,pageSection);

                    
                    //var track53 = prefix + ":" + Omniture.constants[pageType]["pageType"] + ":" + Omniture.constants[pageType][pageSection];
                    var track53 = siteCatParams.currentPageName;
                    s.prop53 = track53;
                    s.tl(this, 'o', track53, null, 'navigate');

                }
                else {
                    window.console.log("Missing omniture values for ", pageType, pageSection);
                }
            };
            var SiteCatSwitchCode = function (pageName, eventName, dynamicVars, SiteCatProperties) {
                for (var key in SiteCatProperties) {
                    if (!SiteCatProperties.hasOwnProperty(key)) {
                        //The current property is not a direct property of SiteCatProperties
                        continue;
                    }
                    switch (key) {
                        case "mobileEvent":
                            cd.currentPage = Omniture.constants["MobilePrefix"] + ":" + s.prop30.replace("wap:", "") + ":" + SiteCatProperties[key];
                            break;
                        case "mblprop53":
                            s.prop53 = Omniture.constants["MobilePrefix"] + ":" + s.prop30.replace("wap:", "") + ":" + SiteCatProperties[key];
                            break;
                        case "eventname":
                            cd.currentPage = Omniture.constants["OmniSitePrefix"] + ":" + cd.siteSection + ":" + SiteCatProperties[key];
                            break;
                        case "loginMethod":
                            cd.loginMethod = SiteCatProperties[key];
                            break;
                        case "challengeStatus":
                            cd.challengeStatus = SiteCatProperties[key];
                            break;
                        case "errorStatus":
                            cd.errorStatus = SiteCatProperties[key];
                            break;
                        case "prop53":
                            s.prop53 = Omniture.constants["OmniSitePrefix"] + ":" + cd.siteSection + ":" + SiteCatProperties[key];
                            break;
                        case "prop67":
                            s.prop67 = SiteCatProperties[key];
                            break;
                        case "eVar67":
                            s.eVar67 = SiteCatProperties[key];
                            break;
                    }
                }

                if (dynamicVars != null) {
                    for (var key in dynamicVars) {
                        if (!dynamicVars.hasOwnProperty(key)) {
                            //The current property is not a direct property of DynamicVars
                            continue;
                        }
                        switch (key) {
                            case "challengePolicy":
                                cd.challengePolicy = dynamicVars[key];
                                break;

                            case "responseStatusCode":
                                if (cd.currentPage && dynamicVars[key]) {
                                    cd.currentPage = cd.currentPage + ' response status ' + dynamicVars[key];
                                }
                                break;

                            case "requestName":
                                if (cd.currentPage && dynamicVars[key]) {
                                    cd.currentPage = cd.currentPage + ' for req ' + dynamicVars[key];
                                }
                                break;
                        }
                    }
                }
            };
            var onTrackSATransmitLogin = function (pageName, eventName, dynamicVars, isWidget) {
                if (Omniture.constants[pageName] && Omniture.constants[pageName][eventName]) {
                    s.clearContext();
                    s.clearVars();

                    var SiteCatProperties;

                    cd.siteSection = Omniture.constants[pageName]["siteSection"];
                    cd.subSiteSection = Omniture.constants[pageName]["subSiteSection"];
                    if (isWidget) {
                        SiteCatProperties = Omniture.constants[pageName][eventName];
                    }
                    else
                        SiteCatProperties = Omniture.constants[pageName]["Standalone" + eventName];
                    SiteCatSwitchCode(pageName, eventName, dynamicVars, SiteCatProperties);

                    s.t();
                }
                else {
                    window.console.log("Missing omniture values for ", pageName, eventName);
                }
            };
            var onTrackSATransmitLoginClickEvent = function (pageName, eventName, isWidget) {
                if (Omniture.constants[pageName] && Omniture.constants[pageName][eventName]) {
                    s.clearVars();

                    var SiteCatProperties;
                    if (isWidget) {
                        s.linkTrackVars = s.linkTrackVars + ',prop53,contextData.cd.loginMethod,prop67,eVar67';
                        SiteCatProperties = Omniture.constants[pageName][eventName];
                    }
                    else {
                        s.linkTrackVars = s.linkTrackVars + ',prop53,contextData.cd.loginMethod';
                        SiteCatProperties = Omniture.constants[pageName]["Standalone" + eventName];
                    }
                    SiteCatSwitchCode(pageName, eventName, null, SiteCatProperties);

                    s.tl(this, 'o', s.prop53, null, 'navigate');
                }
                else {
                    window.console.log("Missing omniture values for ", pageName, eventName);
                }
            };
            var onTrackSATransmitMobileLogin = function (pageName, eventName, dynamicVars) {
                if (Omniture.constants[pageName] && Omniture.constants[pageName][eventName]) {
                    s.clearContext();
                    s.clearVars();
                    //if (s.contextData['appName_PERS'] == "MBL") {
                    commonTracking();
                    //}

                    var SiteCatProperties = Omniture.constants[pageName][eventName];
                    SiteCatSwitchCode(pageName, eventName, dynamicVars, SiteCatProperties);

                    s.t();
                }
                else {
                    window.console.log("Missing omniture values for ", pageName, eventName);
                }
            };
            var onTrackSATransmitMobileLoginClickEvent = function (pageName, eventName) {
                if (Omniture.constants[pageName] && Omniture.constants[pageName][eventName]) {
                    s.clearVars();
                    //if (s.contextData['appName_PERS'] == "MBL") {
                    commonTracking();
                    //}

                    var SiteCatProperties = Omniture.constants[pageName][eventName];
                    s.linkTrackVars = s.linkTrackVars + ',prop53,contextData.cd.loginMethod';
                    SiteCatSwitchCode(pageName, eventName, null, SiteCatProperties);

                    s.tl(this, 'o', s.prop53, null, 'navigate');
                }
                else {
                    window.console.log("Missing omniture values for ", pageName, eventName);
                }
            };
            return {
                onTrackCustomSharedStepUp: onTrackCustomSharedStepUp,
                onTrackSharedStepUpClickEvent: onTrackSharedStepUpClickEvent,
                onTrackSATransmitLogin: onTrackSATransmitLogin,
                onTrackSATransmitLoginClickEvent: onTrackSATransmitLoginClickEvent,
                onTrackSATransmitMobileLogin: onTrackSATransmitMobileLogin,
                onTrackSATransmitMobileLoginClickEvent: onTrackSATransmitMobileLoginClickEvent
            }
        }]).factory('MMScrollService', [MMScrollService]); //fix for 20941
    function MMScrollService() {
        //return {
        var MMScrollService = {};

        // This is used to manage special adjustment during orientation
        // change.
        MMScrollService.specialAdjustment = 0;


        function _createScroll(wrapperDiv, scrollerDiv, scrollKey,
                        specialAdjustment, isScrollStay, scrollvalue) {
            console.log("SCROLL Method is called");
            if (wrapperDiv.length == 1) {

                console.log("creating content scroll for : "
                        + scrollKey);

                var windowHeight = 0;

                // The way content ID is taken varies from type of
                // screens.
                // Content ID is used to check whether there is a footer
                // button inside or not, to manipulate scroll height.
                var contentID = null;

                if (scrollKey == "inspectorScroll") {

                    if ($(wrapperDiv)[0].id
                            .indexOf("-usboverlaywrapper") > -1) {

                        contentID = $("#"
                                + $(wrapperDiv)[0].id.replace(
                                        "-usboverlaywrapper", ""))[0];

                        // This is an Overlay Inspector
                        windowHeight = $(
                                "#"
                                        + $(wrapperDiv)[0].id.replace(
                                                "-usboverlaywrapper",
                                                "")).outerHeight();

                    } else {
                        /*
                        * This is introduced to manage situations,
                        * where the wrapper is known and content is
                        * added run time. In such cases it is not
                        * possible to get the wrapper height. USed only
                        * for calendar in inspector - can be used for
                        * other cases also, after doing sufficient
                        * testing -- arun
                        */

                        contentID = $("#" + window.currentInspector)
                                .find('[data-id="page_content"]')[0];

                        windowHeight = $("#" + window.currentInspector)
                                .outerHeight();
                        var customScrollHeight = $(wrapperDiv).data(
                                "heightabovescroller");
                        console.log(customScrollHeight);
                        if (customScrollHeight != null
                                || customScrollHeight != undefined) {
                            windowHeight = windowHeight
                                    - customScrollHeight;
                        }
                        // This is a page Inspector
                    }
                } else {

                    /*
                    * This is introduced to manage situations, where
                    * the wrapper is known and content is added run
                    * time. In such cases it is not possible to get the
                    * wrapper height. USed only for calendar in
                    * inspector - can be used for other cases also,
                    * after doing sufficient testing -- arun
                    */
                    var customScrollHeight = $(wrapperDiv).data(
                            "heightabovescroller");
                    windowHeight = $(window).outerHeight();

                    // TOUCH - for Android web, only window height needs to be considered,
                    // TOUCH - using screen height is not letting the content to scroll
                    if (ApplicationContext.getContext().getChannel() === ApplicationContext
                        .getContext().ANDROID && !ApplicationContext.getContext().ISMOBILEWEB) {
                        moreThanWH = windowHeight * 1.5;
                        // because sometimes screen height is too much
                        // than actual window height. typically happens
                        // in jellybean devices
                        if (moreThanWH > screen.height) {
                            windowHeight = screen.height;
                        }
                        if (scrollKey == "overlayScroll") {
                            // this is to accomodate the padding in the
                            // top for overlays
                            windowHeight -= 35;
                        }
                    }

                    if (customScrollHeight != null
                            || customScrollHeight != undefined) {

                        // Below logic would discount the height
                        // considering its calculated.
                        windowHeight = windowHeight
                                - customScrollHeight;
                    }
                }
                var contentHeight = scrollerDiv[0].scrollHeight;

                console.log("contentHeightINIT: " + contentHeight);
                console.log("windowHeightINIT: " + windowHeight);

                if (scrollKey == "overlayScroll") {

                    contentID = $("#"
                            + $(wrapperDiv)[0].id.replace(
                                    "-usboverlaywrapper", ""))[0];

                    // Typically a full screen overlay
                    contentHeight += 60;

                    if (ApplicationContext.getContext().getChannel() === ApplicationContext
                        .getContext().IPAD && !ApplicationContext.getContext().ISMOBILEWEB) {
                        // FIXME ARUN -- not sure whether this is needed
                        // only for ipad Need to test and fix, once
                        // iPhone testing starts

                        var calculatedHeight = Math
                                .round(windowHeight * .27);
                        contentHeight += Math
                                .round(calculatedHeight / 2);
                        windowHeight -= calculatedHeight;
                    }
                } else if (scrollKey == "myScroll") {
                    /*to handle the scroll height for devices with notification bar.*/
                    if (ApplicationContext.getContext().getChannel() === ApplicationContext.getContext().ANDROID ||
                        ApplicationContext.getContext().getChannel() === ApplicationContext.getContext().IPAD) {
                        specialAdjustment = 40;
                    }
                    else if (ApplicationContext.getContext().getChannel() === ApplicationContext.getContext().IPHONE) {
                        specialAdjustment = 30;
                    }
                    /*to handle the scroll height for devices with notification bar.*/
                    contentID = $("#" + window.currentPageID).find(
                            '[data-id="page_content"]')[0];
                }

                // Height of headers needs to be accomodated for page
                // scrolling

                if (scrollKey == "inspectorScroll") {// if inspector
                    // Scroll
                    if ($(window.currentInspector).find(
                            ".header-layout").length == 1) {
                        // Page inspector and has header
                        contentHeight += 50;
                        windowHeight -= 40;
                    } else {
                        // Overlay inspector and has header
                        // Inconsistency in using headers in overlay
                        // inspectors
                        windowHeight -= 40;
                        contentHeight += 45;
                    }

                } else {
                    contentHeight += 50;
                    windowHeight -= 40;
                }

                console.log(contentID);
                console.log($(contentID));
                if ($(contentID).find(".footer-buttons").length == 1) {
                    // If there is a footer, add the height to it.
                    // header is always present
                    // header = 66px; footer=60px;
                    console
                            .log("Now there is a footer in this content, adding buffer");
                    contentHeight += 50;

                    // The scroll happens within the frame where footer
                    // is not a part of it
                    windowHeight -= 80;
                }

                if (specialAdjustment != null) {
                    // There are situations like myaccounts, payments
                    // history where there are animations possible. in
                    // such cases this special extention of container
                    // height is required
                    contentHeight += specialAdjustment;

                    MMScrollService.specialAdjustment = specialAdjustment;
                } else {
                    MMScrollService.specialAdjustment = 0;
                }

                if (scrollKey.indexOf("customScroll") > -1) {// FIXME
                    // IPAD
                    // HAS
                    // ASSIGNED THE
                    // WRAPPER HEIGHT TO
                    // ITS PARENT HEIGHT
                    // IN CASE OF CUSTOM
                    // SCROLL SCENARIO.
                    if (ApplicationContext.getContext().getChannel() === ApplicationContext
                            .getContext().IPAD) {
                        windowHeight = $(wrapperDiv).parent()
                                .outerHeight();
                        contentHeight = $(scrollerDiv).css('height',
                                'auto').outerHeight();
                    }
                }
                console.log("contentHeightFINAL: " + contentHeight);
                console.log("windowHeightFINAL: " + windowHeight);

                wrapperDiv.height(windowHeight);
                scrollerDiv.height(contentHeight);
                console.log("scroller initiated");

                if (window[scrollKey]) {
                    setTimeout(function () {
                        // Add and remove a dumb style to take
                        // care of occasional patches
                        // on gradient background.
                        $('<style></style>').appendTo($(document.body))
                                .remove();
                        if (window[scrollKey] != null) {
                            window[scrollKey].refresh();

                            // checking if the page scroll to top
                            if (!isScrollStay) {
                                window[scrollKey].scrollTo(0, 0, 100);
                            } else if (scrollvalue) {
                                window[scrollKey].scrollTo(0, scrollvalue, 100);
                            }
                        }
                    }, 250);

                } else {
                    console.log(wrapperDiv.prop("id"));
                    window[scrollKey] = new IScroll('#'
                            + wrapperDiv.prop("id"), {
                                bounce: false,
                                preventDefault: false,
                                onBeforeScrollStart: function (e) {
                                    var target = e.target;
                                    while (target.nodeType != 1)
                                        target = target.parentNode;
                                    if (target.tagName != 'SELECT'
											&& target.tagName != 'INPUT'
											&& target.tagName != 'TEXTAREA')
                                        e.preventDefault();
                                }
                            });
                    setTimeout(function () {
                        if (window[scrollKey]) {
                            // Add and remove a dumb style to take
                            // care of occasional patches on
                            // gradient background.
                            $('<style></style>').appendTo(
                                    $(document.body)).remove();
                            window[scrollKey].refresh();
                            // checking if the page scroll to top
                            if (!isScrollStay) {
                                window[scrollKey].scrollTo(0, 0, 100);
                            }
                            else if (scrollvalue) {
                                window[scrollKey].scrollTo(0, scrollvalue, 100);
                            }
                        }
                    }, 250);
                }
            } else {
                console.log("Inbuilt SCROLL");
                if ($('#wrapper').length == 1) {
                    new IScroll('#wrapper');
                }
            }
        }




        function _createScrollOmni(wrapperDiv, scrollerDiv, scrollKey,
                specialAdjustment, dynamicContainerHeight, isScrollStay, scrollvalue) {
            console.log("SCROLL Method is called");
            if (wrapperDiv.length == 1) {

                console.log("creating content scroll for : "
                        + scrollKey);

                var windowHeight = 0;

                // The way content ID is taken varies from type of
                // screens.
                // Content ID is used to check whether there is a footer
                // button inside or not, to manipulate scroll height.
                var contentID = null;

                if (scrollKey == "inspectorScroll") {

                    if ($(wrapperDiv)[0].id
                            .indexOf("-usboverlaywrapper") > -1) {

                        contentID = $("#"
                                + $(wrapperDiv)[0].id.replace(
                                        "-usboverlaywrapper", ""))[0];

                        // This is an Overlay Inspector
                        windowHeight = $(
                                "#"
                                        + $(wrapperDiv)[0].id.replace(
                                                "-usboverlaywrapper",
                                                "")).outerHeight();

                    } else {
                        /*
                        * This is introduced to manage situations,
                        * where the wrapper is known and content is
                        * added run time. In such cases it is not
                        * possible to get the wrapper height. USed only
                        * for calendar in inspector - can be used for
                        * other cases also, after doing sufficient
                        * testing -- arun
                        */

                        contentID = $("#" + window.currentInspector)
                                .find('[data-id="page_content"]')[0];

                        windowHeight = $("#" + window.currentInspector)
                                .outerHeight();
                        var customScrollHeight = $(wrapperDiv).data(
                                "heightabovescroller");
                        console.log(customScrollHeight);
                        if (customScrollHeight != null
                                || customScrollHeight != undefined) {
                            windowHeight = windowHeight
                                    - customScrollHeight;
                        }
                        // This is a page Inspector
                    }
                } else {

                    /*
                    * This is introduced to manage situations, where
                    * the wrapper is known and content is added run
                    * time. In such cases it is not possible to get the
                    * wrapper height. USed only for calendar in
                    * inspector - can be used for other cases also,
                    * after doing sufficient testing -- arun
                    */
                    var customScrollHeight = $(wrapperDiv).data(
                            "heightabovescroller");
                    windowHeight = $(window).outerHeight();

                    // TOUCH - for Android web, only window height needs to be considered,
                    // TOUCH - using screen height is not letting the content to scroll
                    if (ApplicationContext.getContext().getChannel() === ApplicationContext
                        .getContext().ANDROID && !ApplicationContext.getContext().ISMOBILEWEB) {
                        moreThanWH = windowHeight * 1.5;
                        // because sometimes screen height is too much
                        // than actual window height. typically happens
                        // in jellybean devices
                        if (moreThanWH > screen.height) {
                            windowHeight = screen.height;
                        }
                        if (scrollKey == "overlayScroll") {
                            // this is to accomodate the padding in the
                            // top for overlays
                            windowHeight -= 35;
                        }
                    }

                    if (customScrollHeight != null
                            || customScrollHeight != undefined) {

                        // Below logic would discount the height
                        // considering its calculated.
                        windowHeight = windowHeight
                                - customScrollHeight;
                    }
                }

                var contentHeight = scrollerDiv[0].scrollHeight;

                if (scrollKey === "manageDelegatemyscroll" || scrollKey === "myScrollAddUser" || scrollKey === "myScrollAccountDetail") {
                    //Temp fix
                    //contentHeight += 128;
                    windowHeight = windowHeight - $(wrapperDiv).offset().top;
                    if (dynamicContainerHeight != null
                                || dynamicContainerHeight != undefined) {
                        contentHeight = dynamicContainerHeight;
                    }
                    /*if ($(wrapperDiv).parents('[data-role=main]').first().find('.footer-buttons').length) {
                    wrap_height = wrap_height - $(wrapperDiv).parents('[data-role=main]').first().find('.footer-buttons').outerHeight();
                    }*/
                } else if (dynamicContainerHeight != null
                            || dynamicContainerHeight != undefined) {
                    contentHeight = dynamicContainerHeight;
                }

                console.log("contentHeightINIT: " + contentHeight);
                console.log("windowHeightINIT: " + windowHeight);

                if (scrollKey == "overlayScroll") {

                    contentID = $("#"
                            + $(wrapperDiv)[0].id.replace(
                                    "-usboverlaywrapper", ""))[0];

                    // Typically a full screen overlay
                    contentHeight += 60;

                    if (ApplicationContext.getContext().getChannel() === ApplicationContext
                        .getContext().IPAD && !ApplicationContext.getContext().ISMOBILEWEB) {
                        // FIXME ARUN -- not sure whether this is needed
                        // only for ipad Need to test and fix, once
                        // iPhone testing starts

                        var calculatedHeight = Math
                                .round(windowHeight * .27);
                        contentHeight += Math
                                .round(calculatedHeight / 2);
                        windowHeight -= calculatedHeight;
                    }
                } else if (scrollKey == "myScroll") {
                    /*to handle the scroll height for devices with notification bar.*/
                    if (ApplicationContext.getContext().getChannel() === ApplicationContext.getContext().ANDROID ||
                        ApplicationContext.getContext().getChannel() === ApplicationContext.getContext().IPAD) {
                        specialAdjustment = 40;
                    }
                    else if (ApplicationContext.getContext().getChannel() === ApplicationContext.getContext().IPHONE) {
                        specialAdjustment = 30;
                    }
                    /*to handle the scroll height for devices with notification bar.*/
                    contentID = $("#" + window.currentPageID).find(
                            '[data-id="page_content"]')[0];
                }

                // Height of headers needs to be accomodated for page
                // scrolling

                if (scrollKey == "inspectorScroll") {// if inspector
                    // Scroll
                    if ($(window.currentInspector).find(
                            ".header-layout").length == 1) {
                        // Page inspector and has header
                        contentHeight += 50;
                        windowHeight -= 40;
                    } else {
                        // Overlay inspector and has header
                        // Inconsistency in using headers in overlay
                        // inspectors
                        windowHeight -= 40;
                        contentHeight += 45;
                    }

                } else {
                    contentHeight += 50;
                    windowHeight -= 40;
                }

                console.log(contentID);
                console.log($(contentID));
                if ($(contentID).find(".footer-buttons").length == 1) {
                    // If there is a footer, add the height to it.
                    // header is always present
                    // header = 66px; footer=60px;
                    console
                            .log("Now there is a footer in this content, adding buffer");
                    contentHeight += 50;

                    // The scroll happens within the frame where footer
                    // is not a part of it
                    windowHeight -= 80;
                }

                if (specialAdjustment != null) {
                    // There are situations like myaccounts, payments
                    // history where there are animations possible. in
                    // such cases this special extention of container
                    // height is required
                    contentHeight += specialAdjustment;

                    MMScrollService.specialAdjustment = specialAdjustment;
                } else {
                    MMScrollService.specialAdjustment = 0;
                }

                if (scrollKey.indexOf("customScroll") > -1) {// FIXME
                    // IPAD
                    // HAS
                    // ASSIGNED THE
                    // WRAPPER HEIGHT TO
                    // ITS PARENT HEIGHT
                    // IN CASE OF CUSTOM
                    // SCROLL SCENARIO.
                    if (ApplicationContext.getContext().getChannel() === ApplicationContext
                            .getContext().IPAD) {
                        windowHeight = $(wrapperDiv).parent()
                                .outerHeight();
                        contentHeight = $(scrollerDiv).css('height',
                                'auto').outerHeight();
                    }
                }
                console.log("contentHeightFINAL: " + contentHeight);
                console.log("windowHeightFINAL: " + windowHeight);

                wrapperDiv.height(windowHeight);
                scrollerDiv.height(contentHeight);
                console.log("scroller initiated");

                if (window[scrollKey]) {
                    setTimeout(function () {
                        // Add and remove a dumb style to take
                        // care of occasional patches
                        // on gradient background.
                        $('<style></style>').appendTo($(document.body))
                                .remove();
                        window[scrollKey].refresh();
                        // checking if the page scroll to top
                        if (!isScrollStay) {
                            window[scrollKey].scrollTo(0, 0, 100);
                        }
                        else if (scrollvalue) {
                            window[scrollKey].scrollTo(0, scrollvalue, 100);
                        }
                    }, 250);

                } else {
                    // Added this condition to check for entitlement enroll t&c div
                    // ADA - when voiceover is ON in IOS, iscroll was not compatible so added css style of scrolling
                    var channel = OmniDataUtil.getOmniData("mobileChannel");
                    if ((channel == "iPhone" || channel == "ipad") && scrollKey == "ent_tc_enroll") {
                        $(wrapperDiv).css({
                            "-webkit-overflow-scrolling": "touch",
                            "overflow-y": "scroll"
                        });

                    } else {
                        console.log(wrapperDiv.prop("id"));
                        window[scrollKey] = new IScroll('#'
                                                        + wrapperDiv.prop("id"), {
                                                            bounce: false,
                                                            preventDefault: false,
                                                            onBeforeScrollStart: function (e) {
                                                                var target = e.target;
                                                                while (target.nodeType != 1)
                                                                    target = target.parentNode;
                                                                if (target.tagName != 'SELECT'
                                                                    && target.tagName != 'INPUT'
                                                                    && target.tagName != 'TEXTAREA')
                                                                    e.preventDefault();
                                                            }
                                                        });
                        setTimeout(function () {
                            if (window[scrollKey]) {
                                // Add and remove a dumb style to take
                                // care of occasional patches on
                                // gradient background.
                                $('<style></style>').appendTo(
                                                              $(document.body)).remove();
                                window[scrollKey].refresh();
                                // checking if the page scroll to top
                                if (!isScrollStay) {
                                    window[scrollKey].scrollTo(0, 0, 100);
                                }
                                else if (scrollvalue) {
                                    window[scrollKey].scrollTo(0, scrollvalue, 100);
                                }
                            }
                        }, 250);
                    }
                }
            } else {
                console.log("Inbuilt SCROLL");
                if ($('#wrapper').length == 1) {
                    new IScroll('#wrapper');
                }
            }
        }

        // Exposed Interfaces goes below. All calls the private method
        // above.

        MMScrollService.reInitPageWhenKeyboardComesUp = function () {

            window.orgPageWrapperHeight = $("#usbwrapper").height();
            window.orgPageScrollerHeight = $("#usbscroller").height();

            if ($("#" + window.currentPageID).hasClass('overlayInAction')) {
                return;
            }

            var customScrollHeight = $("#usbwrapper").data(
                    "heightabovescroller");

            if (customScrollHeight == null
                    || customScrollHeight == undefined) {
                customScrollHeight = 0;
            } else {
                customScrollHeight = customScrollHeight - 70;
            }
            var roundedHeight = $(window).innerHeight() - 70
                    - customScrollHeight;
            $("#usbwrapper").height(roundedHeight);
            $("#usbscroller").height(
                    window.orgPageScrollerHeight + roundedHeight - 50);

            if (window.focussedItem != undefined
                    || window.focussedItem != null) {
                var offset = window.focussedItem.offset().top;
                var scrollto = -(offset - window['myScroll'].y - 100);

                window['myScroll'].scrollTo(0, scrollto, 100)
                window.focussedItem = undefined;
            }
            window['myScroll'].refresh();
        };

        MMScrollService.reInitPageWhenKeyboardGoesDown = function () {

            $("#usbwrapper").height(window.orgPageWrapperHeight);
            $("#usbscroller").height(window.orgPageScrollerHeight);

            window['myScroll'].refresh();
        };

        MMScrollService.reInitOverlayWhenKeyboardComesUp = function (
                overlayDivId) {


            window.orgOverlayWrapperHeight = $(
                    "#" + overlayDivId + "-usboverlaywrapper").height();
            window.orgOverlayScrollerHeight = $(
                    "#" + overlayDivId + "-usboverlayscrollee")
                    .height();

            var customScrollHeight = $("#" + overlayDivId + "-usboverlaywrapper").data(
                    "heightabovescroller");

            if (customScrollHeight == null
                    || customScrollHeight == undefined) {
                customScrollHeight = 0;
            } else {
                customScrollHeight = customScrollHeight - 70;
            }

            var roundedHeight;
            if (ApplicationContext.getContext().ISMOBILEWEB) {/*added for stepupcheck keyboard scroll issue*/
                window.myScroll.disable();
                roundedHeight = $(window).innerHeight();
            }
            else {
                roundedHeight = $(window).innerHeight() - 70 - customScrollHeight;
            }

            $("#" + overlayDivId + "-usboverlaywrapper").height(
                    roundedHeight);
            $("#" + overlayDivId + "-usboverlayscrollee").height(
                    window.orgOverlayScrollerHeight + roundedHeight - 50);

            if (window.focussedItem != undefined
                    || window.focussedItem != null) {
                var hght = 100;

                //IF the overlay has already a header, then the calculation is different
                //especially for Android.
                var contentID = $("#"
                        + $('#' + overlayDivId)[0].id.replace(
                                "-usboverlaywrapper", ""))[0];

                if ($(contentID).find(".overlay-header").length == 1) {
                    hght = 200;
                }
                var offset = window.focussedItem.offset().top;
                var scrollto = -(offset - window['overlayScroll'].y - hght);

                window['overlayScroll'].scrollTo(0, scrollto, 100)
                window.focussedItem = undefined;
            }
            window['overlayScroll'].refresh();
            window.overlayScroll.enable(); /*added for stepupcheck keyboard scroll issue*/
        };

        MMScrollService.reInitOverlayWhenKeyboardGoesDown = function (
                overlayDivId) {

            $("#" + overlayDivId + "-usboverlaywrapper").height(
                    window.orgOverlayWrapperHeight);
            $("#" + overlayDivId + "-usboverlayscrollee").height(
                    window.orgOverlayScrollerHeight);

            window['overlayScroll'].refresh();

        };
        MMScrollService.disableScrolls = function () {

            var scrollKey = ['myScroll', 'overlayScroll',
                    'allBlockScroll', 'payPersonBlockScroll',
                    'payBillsScroll', 'transferBlockScroll',
                    'allBlockHistoryScroll', 'depositHistoryScroll',
                    'pendingHistoryScroll', 'rejectedHistoryScroll'];
            for (var key in scrollKey) {
                if (window[scrollKey[key]]) {
                    window[scrollKey[key]].disable();
                }
            }
        };

        MMScrollService.enableScrolls = function () {
            var scrollKey = ['myScroll', 'overlayScroll',
                    'allBlockScroll', 'payPersonBlockScroll',
                    'payBillsScroll', 'transferBlockScroll',
                    'allBlockHistoryScroll', 'depositHistoryScroll',
                    'pendingHistoryScroll', 'rejectedHistoryScroll'];
            for (var key in scrollKey) {
                if (window[scrollKey[key]]) {
                    window[scrollKey[key]].enable();
                }
            }
        };

        MMScrollService.destroyScroll = function () {
            MMScrollService.destroyParamterizedScroll('myScroll');
            MMScrollService.destroyParamterizedScroll('overlayScroll');
        };

        MMScrollService.destroyParamterizedScroll = function (scrollKey) {

            if (window[scrollKey]) {
                $(window[scrollKey].scroller).removeAttr('style');
                $(window[scrollKey].wrapper).removeAttr('style');
                window[scrollKey].destroy();
                window[scrollKey] = null;
            }
        };

        MMScrollService.scrollMyAccounts = function (wrapperDiv, scrollerDiv,
                scrollKey, specialAdjustment) {
            _createScroll(wrapperDiv, scrollerDiv, scrollKey,
                    specialAdjustment, false);
        };

        MMScrollService.updatePageWithScrollOmni = function (scrollObj, wrapperDiv, scrollerDiv, dynamicContainerHeight, adjustedHeight) {
            _createScrollOmni($(wrapperDiv), $(scrollerDiv),
                    scrollObj, adjustedHeight, dynamicContainerHeight, false);
        };

        MMScrollService.updatePageWithScroll = function (adjustedHeight) {
            _createScroll($("#usbwrapper"), $("#usbscroller"),
                    "myScroll", adjustedHeight, false);
        };

        // USe this function, when you want to entirely re-init a page
        // with scroll to avoid adding the older height to the new one
        MMScrollService.reinitializePageWithScroll = function (adjustedHeight) {
            MMScrollService.destroyParamterizedScroll('myScroll');
            setTimeout(function () {
                _createScroll($("#usbwrapper"), $("#usbscroller"),
                        "myScroll", adjustedHeight, false);
            }, 200);
        };

        MMScrollService.reinitializePageWithScrollOmni = function (adjustedHeight) {
            MMScrollService.destroyParamterizedScroll("myScrollOmni");
            setTimeout(function () {
                _createScroll($("#usbwrapperOmni"), $("#usbscrollerOmni"),
                        "myScrollOmni", 100, false);
            }, 200);
        };

        MMScrollService.updatePageWithScrollAndStay = function (isScrollStay) {
            _createScroll($("#usbwrapper"), $("#usbscroller"),
                    "myScroll", null, isScrollStay);
        };

        MMScrollService.updatePageWithScrollWithKeyboard = function () {
            MMScrollService.destroyParamterizedScroll('myScroll');
            setTimeout(function () {
                _createScroll($("#usbwrapper"), $("#usbscroller"),
                "myScroll", $(window).outerHeight(), true);
            }, 200);
        };

        MMScrollService.updateOverlayWithScroll = function (overlayDivId,
                adjustedHeight) {
            _createScroll($("#" + overlayDivId + "-usboverlaywrapper"),
                    $("#" + overlayDivId + "-usboverlayscrollee"),
                    "overlayScroll", adjustedHeight, false);
        };

        // USe this function, when you want to entirely re-init a page
        // with scroll to avoid adding the older height to the new one
        MMScrollService.reinitializeOverlayWithScroll = function (
                overlayDivId, adjustedHeight) {
            MMScrollService.destroyParamterizedScroll('overlayScroll');
            setTimeout(function () {
                _createScroll($("#" + overlayDivId
                        + "-usboverlaywrapper"), $("#" + overlayDivId
                        + "-usboverlayscrollee"), "overlayScroll",
                        adjustedHeight, false);
            }, 200);
        };

        MMScrollService.updateOverlayWithScrollWithKeyboard = function (overlayDivId, adjustedHeight) {
            MMScrollService.destroyParamterizedScroll('overlayScroll');
            setTimeout(function () {
                _createScroll($("#" + overlayDivId
                + "-usboverlaywrapper"), $("#" + overlayDivId
                + "-usboverlayscrollee"), "overlayScroll", $(window).outerHeight(), false);
            }, 200);
        };

        MMScrollService.updateContentWithScrollAndAdjustedHeight = function (
            scroller, scrollee, scrollName, adjustedHeight) {
            _createScroll($("#" + scroller), $("#" + scrollee),
                    scrollName, adjustedHeight, false);
        };

        MMScrollService.updatePageWithScrollAndStay = function (
                adjustedHeight) {
            _createScroll($("#usbwrapper"), $("#usbscroller"),
                    "myScroll", adjustedHeight, true);
        };

        MMScrollService.updateOverlayWithScrollAndStay = function (
                overlayDivId, adjustedHeight) {
            _createScroll($("#" + overlayDivId + "-usboverlaywrapper"),
                    $("#" + overlayDivId + "-usboverlayscrollee"),
                    "overlayScroll", adjustedHeight, true);
        };

        MMScrollService.updateInspectorWithScroll = function (overlayDivId,
                adjustedHeight) {

            MMScrollService.disableScrolls();

            if ($("#" + overlayDivId + " #usbwrapper").length) {
                console.log("Inspector is a page - Scroll Init");
                $("#" + overlayDivId + " #usbwrapper").attr("id",
                        "usbwrapper-inspector");
                $("#" + overlayDivId + " #usbscroller").attr("id",
                        "usbscroller-inspector");

                _createScroll($("#" + overlayDivId
                        + " #usbwrapper-inspector"), $("#"
                        + overlayDivId + " #usbscroller-inspector"),
                        "inspectorScroll", adjustedHeight, false);
                return;
            }

            if ($("#" + overlayDivId + "-usboverlaywrapper").length) {
                console.log("Inspector is an overlay - Scroll Init");

                _createScroll($("#" + overlayDivId
                        + "-usboverlaywrapper"), $("#" + overlayDivId
                        + "-usboverlayscrollee"), "inspectorScroll",
                        adjustedHeight, false);
                return;
            }

            MMScrollService.updateCalendarCustom(0);
        };

        // USe only for re-initializing scroll, where you need to upate
        // scroll content runtime
        MMScrollService.reinitializeInspectorWithScroll = function () {

            MMScrollService.disableScrolls();

            if ($("#usbwrapper-inspector").length) {
                console.log("Inspector is a page - Scroll Init");
                _createScroll($('#usbwrapper-inspector'),
                        $("#usbscroller-inspector"), "inspectorScroll",
                        null, false);
                return;
            }

            if ($("#" + overlayDivId + "-usboverlaywrapper").length) {
                console.log("Inspector is an overlay - Scroll Init");

                _createScroll($("#" + overlayDivId
                        + "-usboverlaywrapper"), $("#" + overlayDivId
                        + "-usboverlayscrollee"), "inspectorScroll",
                        adjustedHeight, false);
                return;
            }
        };
        MMScrollService.createCustomScroll = function (instance) {
            var customscroll = "customScroll";
            MMScrollService.destroyParamterizedScroll(customscroll
                    + instance);
            _createScroll($("#customusbwrapper" + instance),
                    $("#customusbscroller" + instance), "customScroll"
                            + instance, 0, true);

        };
        MMScrollService.updateCustomScroll = function (instance) {
            if ($("#customusbwrapper" + instance).length == 1) {
                $("#customusbscroller" + instance)
                        .css('height', 'auto');
                window["customScroll" + instance].refresh();
            }
        };

        MMScrollService.updateCalendarCustom = function (adjustedHeight) {
            MMScrollService.destroyParamterizedScroll("dateScroll");
            _createScroll($("#datepicker-usbwrapper"),
                    $("#datepicker-usbscroller"), "dateScroll",
                    adjustedHeight, false);
        };

        MMScrollService.reinitializeTimelineScroll = function (wrapperDiv,
                scrollerDiv, scrollKey, adjustedHeight) {// FIXME
            // Android
            // -- to fix
            // infinity
            // scroll in
            // timeline.
            window.timelineWrapper = wrapperDiv;
            window.timelineScroller = scrollerDiv;
            window.timelineScrollkey = scrollKey;
            window.timelineScrollAdjustedHeight = adjustedHeight;
            MMScrollService.destroyParamterizedScroll(scrollKey);
            _createScroll($('#' + wrapperDiv), $('#' + scrollerDiv),
                    scrollKey, adjustedHeight, false);
        };
        MMScrollService.updateTimelineScroll = function (wrapperDiv,
                scrollerDiv, scrollKey, adjustedHeight, scrollvalue) {// FIXME
            // Android
            // -- to fix
            // infinity
            // scroll in
            // timeline.
            window.timelineWrapper = wrapperDiv;
            window.timelineScroller = scrollerDiv;
            window.timelineScrollkey = scrollKey;
            window.timelineScrollAdjustedHeight = adjustedHeight;
            var calculatedWrapperHeight = $(window).height() - $("header").height();
            $("#" + wrapperDiv).height(calculatedWrapperHeight);
            $("#" + scrollerDiv).css("height", "auto");
            if (ApplicationContext.getContext().getChannel() === ApplicationContext
                            .getContext().IPAD) {
                $("#" + scrollerDiv).height($("#" + scrollerDiv).height() + 140);
            }
            else {
                $("#" + scrollerDiv).height($("#" + scrollerDiv).height() + 80);
            }
            if (scrollKey)
                window[scrollKey].refresh();
        };
        MMScrollService.updatePageScroll = function () {//224884 fix
            var calculatedWrapperHeight = $(window).height() - $("header").height();
            $("#usbwrapper").height(calculatedWrapperHeight);
            $("#usbscroller").css("height", "auto");
            if (ApplicationContext.getContext().getChannel() === ApplicationContext
                            .getContext().IPAD) {
                $("#usbscroller").height($("#usbscroller").height() + 140);
            }
            else {
                $("#usbscroller").height($("#usbscroller").height() + 80);
            }
            if (window.myScroll)
                window.myScroll.refresh();
        };

        return MMScrollService;
    }
})();
