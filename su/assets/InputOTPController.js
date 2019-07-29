(function() {
    'use strict';

    angular
        .module("sharedAuthStepUp")
        .controller('InputOTPController', InputOTPController);

    InputOTPController.$inject = ['$scope', '$rootScope', '$state', '$location', 'idShieldService', 'SASiteCatService', 'transmitEventsService'];

    function InputOTPController($scope, $rootScope, $state, $location, idShieldService, SASiteCatService, transmitEventsService) {

        $scope.IsTempAccessFlow = $state.params.transmitParams.otp_format.length == 7 ? true : false; //Temp Access Code will be 7 digit

        // Used by Mobile Preference Page during Enrollment
        $scope.hideChangeAuth = $state.params && $state.params.transmitParams && $state.params.transmitParams.hideChangeAuth || $rootScope.isUserLocked;
        $scope.showCancel = $state.params && $state.params.transmitParams && $state.params.transmitParams.showCancel;
        $scope.showOTPHeader = $state.params && $state.params.transmitParams && $state.params.transmitParams.showOTPHeader;
        $scope.hideRule = $state.params && $state.params.transmitParams && $state.params.transmitParams.hideRule;

        $scope.loginWigetDirective = $rootScope.loginWigetDirective;
        $rootScope.AccessFlowMessage = $scope.IsTempAccessFlow;
        if ($scope.IsTempAccessFlow) {
            $scope.otplength = 7;
            $scope.otpsubheading = "Temporary access code";
            $scope.otpheadingmessage = "After using your Temporary Access Code, we recommend you go to your profile and manage your authenticators, ex. Choose new ID Shield questions.";
        }
        else {
            $scope.otplength = 6;
            $scope.otpheadingmessage = "Please enter the code we sent to you. It will expire in 15 minutes.";
            $scope.otpheadingmessage_thirdparty = "Please enter the code we sent to your mobile phone. It will expire in 15 minutes.";
            $scope.otpsubheading = "6-digit code";
        }
        if (typeof $scope.transmitappid !== 'undefined' && $scope.transmitappid == "mbl") {
            SASiteCatService.onTrackSATransmitMobileLogin("Mobile", "StepupEnterOTPCode", null);
        }
        else {
            if (typeof $scope.iswidget !== 'undefined') {
                SASiteCatService.onTrackSATransmitLogin("LoginWidget", "StepupEnterOTPCode", null, $scope.iswidget);
            }
            else {
                var pid;
                if ($state && $state.params && $state.params.transmitParams) {
                    pid = $state.params.transmitParams.policyID || $state.params.transmitParams.TransmitPolicy;
                }
                if (!pid && $rootScope && $rootScope.transmitOTPParams) {
                    pid = $rootScope.transmitOTPParams.policyID;
                }
                if (!pid)
                    pid = $scope.transmitpolicy;
                SASiteCatService.onTrackCustomSharedStepUp("StepUpAuthentication", "AuthenticationTypeOTPVerify", pid);
            }
        }

        var otpRegex = /^[0-9]$/;
        $rootScope.dialogHeading = null;
        $rootScope.dialogHeading = "One-Time Passcode";
        if (document.getElementById('stepupLiveAnnouncement') !== null) {
            document.getElementById('stepupLiveAnnouncement').innerHTML = 'One-Time Passcode, view loaded';
        }
        if (!((window.currentPageID != null) || (typeof (window.currentPageID) != "undefined"))) {
            $(".sharedauth-loading").focus();
        }
        setTimeout(function() {
            if (((window.currentPageID != null) || (typeof (window.currentPageID) != "undefined")) && !idShieldService.isTuxLogin()) {
                document.getElementById("authenticatorheader").setAttribute("tabindex", "-1");
                document.getElementById("authenticatorheader").focus();
            } else if (idShieldService.isTuxLogin() || (document.getElementsByClassName("contain-stepup sharedauth authlogin")[0] != null && document.getElementsByClassName("contain-stepup sharedauth authlogin")[0] != undefined)) {
                document.getElementById("stepUpHeader").setAttribute("tabindex", "-1");
                document.getElementById("stepUpHeader").focus();
            } else {
                $("#goback").first().focus();
            }
        }, 400);
        $scope.otpCode = '';

        var appid = $rootScope.transmitOTPParams ? $rootScope.transmitOTPParams.TransmitAppID : '';
        var BaseUrl = $rootScope.transmitOTPParams ? $rootScope.transmitOTPParams.IDShieldBaseURL : '';
        $scope.isMobileWeb = (appid == "mbl") ? false : true;
        var urlSplit = BaseUrl.split('/');
        var protocol = urlSplit[0];
        var domain = urlSplit[2];
        var sub_url = protocol + '//' + domain;

        $scope.otpLogin = function() {
            if (document.getElementById("otpCode").value == '') {
                document.getElementById('otpError').innerHTML = "Please enter the code.";
                document.getElementById("otpCode").value = ""; //defect fix 20739
                document.getElementById("otpCode").focus();
                if (appid == "mbl") {
                    SASiteCatService.onTrackSATransmitMobileLogin("Mobile", "StepupEnterOTPFormatError", null);
                }
                else {
                    if (typeof $scope.iswidget !== 'undefined') {
                        SASiteCatService.onTrackSATransmitLogin("LoginWidget", "StepupEnterOTPFormatError", null, $scope.iswidget);
                    }
                }
            } else if (isNaN(document.getElementById("otpCode").value)) {
                if ($scope.IsTempAccessFlow) {
                    document.getElementById('otpError').innerHTML = "Please enter your 7-digit Temporary Access Code using numbers only.";
                } else {
                    document.getElementById('otpError').innerHTML = "Enter numbers only please, and no more than six digits.";
                }
                document.getElementById("otpCode").value = "";
                document.getElementById("otpCode").focus();
                if (appid == "mbl") {
                    SASiteCatService.onTrackSATransmitMobileLogin("Mobile", "StepupEnterOTPFormatError", null);
                }
                else {
                    if (typeof $scope.iswidget !== 'undefined') {
                        SASiteCatService.onTrackSATransmitLogin("LoginWidget", "StepupEnterOTPFormatError", null, $scope.iswidget);
                    }
                }
            }
            else {
                //$scope.errorMessage = "Please enter correct OTP"; //defect fix 19056
                document.getElementById('otpError').innerHTML = "";
                transmitEventsService.verifyOTP($scope.otpCode);
                $rootScope.$broadcast('otpLogin', $scope.otpCode);
            }
        }
        //$("#sharedAuthstepUpContainer input, #sharedAuthstepUpContainer button, #sharedAuthstepUpContainer a,#sharedAuthstepUpContainer h1").first().focus();
        //$(".omni-overlay.sharedauth").focus();      
        $scope.otpResend = function() {
            SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationResendLink");
            transmitEventsService.resendOTP();
            $rootScope.$broadcast('otpResend', null);
        }

        $scope.changeAuth = function() {
            SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationOTPChangeAuthLink");
            transmitEventsService.changeAuthenticator();
            $rootScope.$broadcast('authChangeMethod', null);
        }
        $scope.RedirectToLoginAssist = function(personId) {
            SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationOTPHelpLink");
            idShieldService.loginAssit($scope.accountLocked, true, $scope.isMobileWeb, sub_url);
        };
        $scope.validateinput = function(evt) {
            if (evt.charCode == 0) {
                return true;
            } else if (evt.charCode >= 48 && evt.charCode <= 57) {
                return true;
            } else {
                return false;
            }
        };
        $scope.cancelbuttonClick = function() {
            transmitEventsService.cancelAuthenticator();
            // changes has been done to fix the Tux start over option in step up screen 
            if (idShieldService.isTuxLogin()) {
                $rootScope.$broadcast('redirectToTuxLogin', { isError: false });
            } else { $rootScope.$broadcast('ResetLogin', { showError: false }); }
        };

        // To hide Need help? link for 24 HB screen
        $rootScope.$broadcast('ShowHideLinks', null);

    }
})();