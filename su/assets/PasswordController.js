(function() {
    'use strict';

    angular
        .module("sharedAuthStepUp")
        .controller('PasswordController', PasswordController);

    PasswordController.$inject = ['$scope', '$rootScope', '$state', '$http', 'dataContainer', 'soundPlayService', 'SASiteCatService', 'idShieldService', 'transmitEventsService'];

    function PasswordController($scope, $rootScope, $state, $http, dataContainer, soundPlayService, SASiteCatService, idShieldService, transmitEventsService) {

        var tParams = $state.params.transmitParams;
        $rootScope.dialogHeading = "Password";
        var callInProgress = false;
        $scope.txtPwd = document.getElementById('txtPassword');
        /**
        * DE - SE - Card #73, 103 - Show/Hide Password Changes - STARTS
        */

        /// Show/Hide password
        // DE-SE : Card 103 Start
        $scope.hidePassword = function() {
            $scope.txtPwd.type = "password";
            $scope.isHide = false;
        };

        $scope.showHidePwd = function(resetFlag, fromUI) {
            var txtPwd = $scope.txtPwd;
            var btnShow = document.getElementById('btnShow');
            var password = "password", text = "text";
            try {

                /// TO TEXT
                if (txtPwd.type == password) {
                    txtPwd.type = text;
                    $scope.isHide = true;
                    // DE SE Card 226 & 204 - Sitecat Implementation - Show
                    if (idShieldService != undefined && idShieldService.isTuxLogin()) {
                        SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "LoginStepUpPwdShowPassword");
                    } else if ($scope.$parent.iswidget || $scope.uxrefresh) {
                        SASiteCatService.onTrackSATransmitLoginClickEvent("LoginWidget", "LoginStepUpPwdShowPasswordSBBDOTCOM", $scope.iswidget);
                    } else {
                        SASiteCatService.onTrackSATransmitLoginClickEvent("LoginWidget", "LoginStepUpPwdShowPassword", $scope.iswidget);
                    }
                }
                else {
                    /// TO PASSWORD
                    $scope.hidePassword();
                    // DE SE Card 226 & 204 - Sitecat Implementation - Hide
                    if (idShieldService != undefined && idShieldService.isTuxLogin()) {
                        SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "LoginStepUpPwdHidePassword");
                    } else if ($scope.$parent.iswidget || $scope.uxrefresh) {
                        SASiteCatService.onTrackSATransmitLoginClickEvent("LoginWidget", "LoginStepUpPwdHidePasswordSBBDOTCOM", $scope.iswidget);
                    } else {
                        SASiteCatService.onTrackSATransmitLoginClickEvent("LoginWidget", "LoginStepUpPwdHidePassword", $scope.iswidget);
                    }
                }

                /// set the focus here...
                txtPwd.focus();
                txtPwd.selectionEnd = txtPwd.value ? txtPwd.value.length : 0;
            }
            catch (error) {
                if (console && console.log) console.log(error);
            }
        };

        /// handle the key press event
        $scope.ProcessPassword = function(keyEvent) {

            /// Handler the show hide password on tab click
            var keycode = (keyEvent.keyCode ? keyEvent.keyCode : keyEvent.which);
            if (keycode === 9) {
                $scope.hidePassword();
            }
        };
        /**
        * DE - SE - Card #73, 103 - Show/Hide Password Changes - ENDS
        */

        clearData();

        if (!tParams) return;

        var transactionID = tParams.TransactionID;
        var BaseUrl = tParams.PasswordBaseURL;
        var contextData = tParams.ContextData;
        var actimizeData = tParams.actimizeData;
        var hasResumePlaceholder = tParams.hasResumePlaceholder;
        var appid = tParams.TransmitAppID;
        $scope.isMobileWeb = (appid == "mbl") ? false : true;
        $scope.iswidget = tParams.InWidget;

        var urlSplit = BaseUrl.split('/');
        var protocol = urlSplit[0];
        var domain = urlSplit[2];
        var sub_url = protocol + '//' + domain;

        Object.toparams = function ObjecttoParams(validationParams) {
            var parameters = [];
            for (var key in validationParams) {
                parameters.push(key + '=' + encodeURIComponent(validationParams[key]));
            }
            return parameters.join('&');
        };

        if (typeof $scope.transmitappid !== 'undefined' && $scope.transmitappid != "mbl") {
            if (typeof $scope.iswidget !== 'undefined' && !idShieldService.isTuxLogin()) {
                SASiteCatService.onTrackSATransmitLogin("LoginWidget", "StandaloneEnterPassword", null, $scope.iswidget);
            } else {

                SASiteCatService.onTrackCustomSharedStepUp("StepUpAuthentication", "StepUpPassword", tParams.TransmitPolicy);
            }
        }

        function bindStepUpData() {
            if (dataContainer && dataContainer.stepupData) {

                $scope.IsEnrolled = dataContainer.stepupData.IsEnrolled;
                $scope.ImangeName = dataContainer.stepupData.IsEnrolled ? dataContainer.stepupData.ImangeName : null;
                $scope.Phrase = dataContainer.stepupData.IsEnrolled ? dataContainer.stepupData.Phrase : null;
                $scope.ImageUrl = dataContainer.stepupData.IsEnrolled && dataContainer.stepupData.ImageUrl ? tParams.ImageBaseURL + dataContainer.stepupData.ImageUrl : null;
                $scope.SoundUrl = dataContainer.stepupData.IsEnrolled && dataContainer.stepupData.SoundUrl ? tParams.SoundBaseURL + dataContainer.stepupData.SoundUrl : null;

                $scope.isPwdImageExists = $scope.ImageUrl ? true : false;
                $scope.DataSound = $scope.ImageUrl != null ? $scope.SoundUrl ? "Yes" : "No" : "No";

                $rootScope.$broadcast('busy.end', { remaining: 0 });
                $scope.playSound();
            }
        };

        function submitToOAM() {

            return $http({
                method: 'GET',
                url: "/auth/login/protectedResource"
            }).then(function(response) {
                return $http({
                    method: 'POST',
                    url: tParams.OAMPostUrl,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                    data: Object.toparams({ 'UserId': tParams.username, 'Password': $scope.Password })
                });
            }, function(response) { webRequestErrorHandler(response, 'TransmitProtectedResourceReqErr'); });
        };

        function validateSignOn(getBaseUrl, transactionid, contextData, appid, isOLB) {
            $rootScope.loading = true;

            var answerParams = {
                "SignOnID": tParams.username,
                "Password": $scope.Password,
                "ContextData": contextData ? contextData : "",
                "TransmitApplicationId": appid,
                "TransactionGUID": tParams.SessionGUID,
                "IsOLB": isOLB,
                "ActimizeData": tParams.actimizeData
            };

            return $http({
                method: 'POST',
                url: getBaseUrl + "Validate",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                data: Object.toparams(answerParams)
            });
        };

        function clearData() {
            $scope.Password = "";
            $scope.ImageUrl = "";
            $scope.ImangeName = "";
            $scope.IsEnrolled = false;
            $scope.Phrase = "";
            $scope.SoundUrl = "";

            // DE - SE Spring #2: Hide when populated and reset the password box to PASSWORD
            $scope.hidePassword();
        }
        // Set Password type if we click any where than password text box
        $(document).on('click touchstart', function(event) {
            if (!$(event.target).is('input#txtPassword,button#btnShow')) {
                $scope.hidePassword();

                $scope.$apply(function() {
                    $scope["isHide"] = false;
                });
            }
        });

     
        // on iframe focus out
        window.addEventListener("blur", function() {
            $scope.hidePassword();
        });

        function valiadtePassword() {
            var invalid =
                        ($scope.passwordForm.password.$error.required) ||
                        ($scope.passwordForm.password.$error.minlength) ||
                        ($scope.passwordForm.password.$error.maxlength) ||
                        ($scope.passwordForm.password.$error.pattern);

            if ($scope.passwordForm.password.$error.required) {
                $scope.errorMessage = "Please enter a Password.";
                document.getElementById("txtPassword").value = "";
                $scope.hidePassword();
            }

            if ($scope.passwordForm.password.$error.minlength ||
                $scope.passwordForm.password.$error.maxlength ||
                $scope.passwordForm.password.$error.pattern) {
                $scope.errorMessage = "Your password should have 8 to 24 characters with no space and include atleast one number and one letter. It can also include special characters (Such as % $ &).";
                document.getElementById("txtPassword").value = "";
                $scope.hidePassword();
            }

            return !invalid;
        };

        function webRequestErrorHandler(response, requestName) {
            callInProgress = false;
            var statusCode = response && response.status ? response.status : 'unknown';
            var dynamicVars = { responseStatusCode: statusCode, "challengePolicy": tParams.TransmitPolicy };
            SASiteCatService.onTrackSATransmitLogin("LoginWidget", requestName, dynamicVars, $scope.iswidget);
            if (idShieldService.isTuxLogin()) {
                $rootScope.$broadcast('redirectToTuxLogin', { isError: true });
            }
            else {
                $rootScope.$broadcast('ResetLogin', { showError: true });
            }
        };

        function pwdSuccessHandler(response) {
            if (!expectedResponse(response, 'password validate api')) {
                if (idShieldService.isTuxLogin()) {
                    $rootScope.$broadcast('redirectToTuxLogin', { isError: true });
                }
                else {
                    $rootScope.$broadcast('busy.end', { remaining: 0 });
                    $rootScope.loading = false;
                    callInProgress = false;
                    $rootScope.$broadcast('ResetLogin', { showError: true });
                }
                return;
            }
            else {

                $rootScope.$broadcast('busy.begin', {});
            }

            if (response.data.Success == false) {
                handleOAMErrors(response);
            }
            else {
                if (response.data != null && response.data.OBSSOCookie != null)
                    dataContainer.OBSSOCookieValue = response.data.OBSSOCookie.m_value;

                if (response && response.data && response.data.Token)
                    transmitEventsService.invokeSuccessHandler({ "token": response.data.Token });
                else
                    transmitEventsService.invokeRejectHandler("Error: Password placeholder token is empty");

                $rootScope.$broadcast('PwdSuccess', response);
            }

            callInProgress = false;
        };

        function handleNoAuthTicketClients(response) {
            $http({
                method: 'POST',
                url: response.ContinueURL,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                data: Object.toparams({ 'SignonId': tParams.username })
            }).then(
                    function(sessionResponse) {
                        if (!expectedResponse(sessionResponse, 'LoginInit')) {
                            return;
                        }
                        $http({
                            method: 'GET',
                            url: response.ReturnURL
                        }).then(
                        function(authErrorResponse) {
                            if (expectedResponse(authErrorResponse, 'LoginError')) {
                                handleOAMErrors(authErrorResponse);
                            }
                            else {
                                webRequestErrorHandler(authErrorResponse, 'LoginError');
                            }
                        },
                        function() { });
                    },
                    function(errorResponse) { webRequestErrorHandler(errorResponse, 'LoginInit'); });
        };

        function handleOAMErrors(response) {
            callInProgress = false;
            $scope.showerror = true;

            // This will happen for TUX and other clients who doesn't have an Auth Ticket.
            if (response.data.Code == 25 && response.data.ContinueURL) {
                handleNoAuthTicketClients(response.data);
                return;
            }

            if (response.data.PasswordExpired && response.data.ControllerName == 'ChangePassword') {
                if (idShieldService.isTuxLogin()) {
                    $rootScope.$broadcast('redirectToResetPassword', { isChangePassword: true, existingPassword: $scope.Password });
                }
                else {
                    $rootScope.$broadcast("ChangePassword", { response: response, existingPwd: $scope.Password });
                }
                return;
            }


            if (response.data.UserLocked) {
                if (idShieldService.isTuxLogin()) {
                    $rootScope.$broadcast('redirectToResetPassword', null);
                }
                else {
                    $rootScope.$broadcast('RedirectToLA', { ResetPwd: true, Locked: true });
                }
                return;
            }

            switch (response.data.Status) {
                case 1:
                    if (appid != "mbl") {
                        if (typeof $scope.iswidget !== 'undefined' && !idShieldService.isTuxLogin()) {
                            SASiteCatService.onTrackSATransmitLogin("LoginWidget", "EnterPasswordUserError", null, $scope.iswidget);
                        } else {

                            SASiteCatService.onTrackCustomSharedStepUp("StepUpAuthentication", "StepUpPasswordFailure", tParams.TransmitPolicy);
                        }
                    }
                    $scope.errorMessage = "Incorrect password. Remember: passwords are case sensitive.";
                    document.getElementById("txtPassword").value = "";
                    break;
                case 2:
                    if (appid != "mbl") {
                        if (typeof $scope.iswidget !== 'undefined') {
                            SASiteCatService.onTrackSATransmitLogin("LoginWidget", "EnterPasswordExpiredError", null, $scope.iswidget);
                        }
                    }
                    $scope.errorMessage = "Your temporary password expired. Please reset it below";
                    document.getElementById("txtPassword").value = "";
                    break;
                case 3:
                    if (appid != "mbl") {
                        if (typeof $scope.iswidget !== 'undefined') {
                            SASiteCatService.onTrackSATransmitLogin("LoginWidget", "EnterPasswordLockoutError", null, $scope.iswidget);
                        }
                    }
                    if (idShieldService.isTuxLogin()) {
                        $rootScope.$broadcast('redirectToResetPassword', null);
                    }
                    else {
                        $rootScope.$broadcast('RedirectToLA', { ResetPwd: true, Locked: true });
                    }
                    break;
                case 5:
                case 6:
                case 7:
                    if (appid != "mbl") {
                        if (typeof $scope.iswidget !== 'undefined') {
                            SASiteCatService.onTrackSATransmitLogin("LoginWidget", "EnterPasswordUserDisabledError", null, $scope.iswidget);
                        }
                    }
                    $scope.errorMessage = "We're sorry; it looks like your personal ID has been disabled.  Please contact 800-987-7237 for help."
                    if (!idShieldService.isTuxLogin()) {
                        $rootScope.$broadcast('ResetSALogin', { showError: true, errorMessage: $scope.errorMessage });
                    }
                    document.getElementById("txtPassword").value = "";
                    break;
                default:
                    if (appid != "mbl") {
                        if (typeof $scope.iswidget !== 'undefined') {
                            SASiteCatService.onTrackSATransmitLogin("LoginWidget", "EnterPasswordSystemError", null, $scope.iswidget);
                        }
                    }

                    if (idShieldService.isTuxLogin()) {
                        $rootScope.$broadcast('redirectToTuxLogin', { isError: true });
                    }
                    else {
                        $rootScope.$broadcast('ResetLogin', { showError: true });
                    }
            }
        };

        function expectedResponse(response, requestName) {
            if (!response || !response.headers()) {
                var dynamicVars = { requestName: requestName, "challengePolicy": tParams.TransmitPolicy };
                SASiteCatService.onTrackSATransmitLogin("LoginWidget", "TransmitUnExpectedContent", dynamicVars, $scope.iswidget);
                return false;
            }

            var jsonContentType = "application/json";

            var responseType = response.headers()["content-type"];
            if (responseType && responseType.indexOf(jsonContentType) >= 0) {
                return true;
            }

            var dynamicVars = { requestName: requestName, "challengePolicy": tParams.TransmitPolicy };
            SASiteCatService.onTrackSATransmitLogin("LoginWidget", "TransmitUnExpectedContent", dynamicVars, $scope.iswidget);

            return false;
        };

        $scope.playSound = function() {
            if (soundPlayService && soundPlayService.playSound) soundPlayService.playSound($scope.SoundUrl);
        };

        $scope.cancelbuttonClick = function() {
            transmitEventsService.cancelAuthenticator();
            if (appid != "mbl") {
                if (typeof $scope.iswidget !== 'undefined') {
                    SASiteCatService.onTrackSATransmitLoginClickEvent("LoginWidget", "CancelPassword", $scope.iswidget);
                }
            }
            if (idShieldService.isTuxLogin()) {
                $rootScope.$broadcast('redirectToTuxLogin', { isError: false });
            }
            else {
                $rootScope.$broadcast('ResetLogin', { showError: false });
            }
        };

        $scope.submitPassword = function() {
            if (callInProgress) return;

            $rootScope.$broadcast('busy.begin', {});
            callInProgress = true;

            if (!valiadtePassword()) {
                if (appid != "mbl") {
                    if (typeof $scope.iswidget !== 'undefined') {
                        SASiteCatService.onTrackSATransmitLogin("LoginWidget", "EnterPasswordFormatError", null, $scope.iswidget);
                    }
                }
                $rootScope.$broadcast('busy.end', { remaining: 0 });
                callInProgress = false;
                return;
            }

            if (tParams.isOAMEnabled) {
                submitToOAM().then(
                    function(oamResponse) {
                        if (!expectedResponse(oamResponse, 'webgate')) {
                            if (idShieldService.isTuxLogin()) {
                                $rootScope.$broadcast('redirectToTuxLogin', { isError: true });
                            }
                            else {
                                $scope.showerror = true;
                                $rootScope.$broadcast('ResetLogin', { showError: true });
                                callInProgress = false;
                            }
                            return;
                        }

                        if (oamResponse.data.Success) {
                            validateSignOn(BaseUrl, transactionID, contextData, appid, true)
                                .then(pwdSuccessHandler, function(response) { webRequestErrorHandler(response, 'TransmitPwdAPIReqErr'); });
                        }
                        else {
                            handleOAMErrors(oamResponse);
                        }
                    }, function(response) { webRequestErrorHandler(response, 'TransmitWebgateReqErr'); });
            } else {
                validateSignOn(BaseUrl, transactionID, contextData, appid, false)
                    .then(pwdSuccessHandler, function(response) { webRequestErrorHandler(response, 'TransmitPwdAPIReqErr'); });
            }
        };

        $scope.RedirectToLoginAssist = function(personId) {
            if (appid != "mbl") {
                if (personId) {
                    if (typeof $scope.iswidget !== 'undefined') {
                        SASiteCatService.onTrackSATransmitLoginClickEvent("LoginWidget", "ForgotPassword", $scope.iswidget);
                    }
                } else {
                    //                    SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationQAHelpLink");
                }

                // Navigating to Login Assistance in TUX
                if (idShieldService.isTuxLogin()) {
                    $rootScope.$broadcast('redirectToResetPassword', null);
                }
                else {
                    $rootScope.$broadcast('RedirectToLA', { ResetPwd: true, Locked: false });
                }
            } else {
                $rootScope.$broadcast('LoginAssistance', 1001);
            }

        };

        $scope.$on('ResetLogin', function() {
            clearData();
        });

        bindStepUpData();

        if (appid == "mbl") {
            setTimeout(function() {
                document.getElementById("sharedAuthstepUpContainer").setAttribute("role", "dialog");
                document.getElementById("sharedauthmodalheader").focus();
            }, 3000);
        } else {
            setTimeout(function() {
                $("#overlayModalContainer").first().focus();
                if (((window.currentPageID != null) || (typeof (window.currentPageID) != "undefined"))) {
                    document.getElementById("sharedauthmodalheader").focus();
                }
            }, 600);
        }

        $rootScope.$broadcast("Password", { PasswordImageExists: $scope.isPwdImageExists });
        // To hide Need help? link for 24 HB screen
        $rootScope.$broadcast('ShowHideLinks', null);
    }
})();

(function () {
    'use strict';
    angular
        .module("sharedAuthStepUp")
        .factory('dataContainer', function () {
            return {};
        });
})();

(function () {
    'use strict';
    angular
        .module("sharedAuthStepUp")
        .factory('soundPlayService', function () {
            var getIEVersion = function () {
                var rv = -1;
                var ua = navigator.userAgent;
                var re = ua.indexOf("MSIE") > -1 ? new RegExp("MSIE\\s([0-9]{1,}[\\.0-9]{0,})") : new RegExp("Trident/.*?rv:([0-9]{1,}[\\.0-9]{0,})");
                var result = re.exec(ua);
                if (result != null && result[1] != null) rv = parseFloat(result[1]);
                return rv;
            };

            function get_browser_info() {
                var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                if (/trident/i.test(M[1])) {
                    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                    return { name: 'IE ', version: (tem[1] || '') };
                }
                if (M[1] === 'Chrome') {
                    tem = ua.match(/\bOPR\/(\d+)/)
                    if (tem != null) { return { name: 'Opera', version: tem[1] }; }
                }
                M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
                if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
                return {
                    name: M[0],
                    version: M[1]
                };
            }


            var playSound = function (soundURL) {
                if (!soundURL || soundURL === '') return;

                var IE_Version = getIEVersion();
                var ua = navigator.userAgent;
                var IsIE = ua.indexOf('Trident') > 0 || navigator.userAgent.indexOf('MSIE') > 0;
                if ((IsIE) || (IE_Version === 11)) {
                    var soundContainer = document.getElementById('soundContainer');
                    if (soundContainer == null) {
                        var div = document.createElement('div');
                        div.innerHTML = "<embed src=\"" + soundURL + "\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
                        document.body.appendChild(div);
                    } else {
                        soundContainer.empty();
                        soundContainer.html("<embed src=\"" + soundURL + "\" hidden=\"true\" autostart=\"true\" loop=\"false\" />");
                    }
                } else {
                    var browser = get_browser_info();
                    if (browser != undefined && browser.name.toLowerCase() == 'safari' && parseFloat(browser.version) >= 11) {
                        console.log("play audio skipped for safari version greater than 10")
                    }
                    else {

                        try {
                            var audio = new Audio();
                            audio.src = soundURL;
                            audio.play();
                        }
                        catch (err) {
                            console && console.log(err);
                        }
                    }
                }
            };

            return {
                playSound: playSound
            }
        });

        Object.defineProperties(Array.prototype, {
            'flatMap': {
                value: function(lambda) {
                    return Array.prototype.concat.apply([], this.map(lambda));
                },
                enumerable: false
            }
        });  

})();