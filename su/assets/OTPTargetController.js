(function() {
    'use strict';

    angular
        .module("sharedAuthStepUp")
        .controller('OTPTargetController', OTPTargetController)
        .filter('formatetarget', function() {

            return function(input) {

                var output = input.substring(6, 10);
                return output;

            }

        });

    OTPTargetController.$inject = ['$scope', '$rootScope', '$state', '$location', 'idShieldService', 'SASiteCatService', 'transmitEventsService'];

    function OTPTargetController($scope, $rootScope, $state, $location, idShieldService, SASiteCatService, transmitEventsService) {

        if (document.getElementById('sharedAuthID')) {
            document.getElementById('sharedAuthID').removeAttribute("style");
        }
        if (typeof $scope.transmitappid !== 'undefined' && $scope.transmitappid == "mbl") {
            SASiteCatService.onTrackSATransmitMobileLogin("Mobile", "StepupSelectOTPDevice", null);
        }
        else {
            if (typeof $scope.iswidget !== 'undefined') {
                SASiteCatService.onTrackSATransmitLogin("LoginWidget", "StepupSelectOTPDevice", null, $scope.iswidget);
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
                SASiteCatService.onTrackCustomSharedStepUp("StepUpAuthentication", "AuthenticationTypeOTP", pid);
            }
        }
        //$("#sharedAuthstepUpContainer input, #sharedAuthstepUpContainer button, #sharedAuthstepUpContainer a, #sharedAuthstepUpContainer h1").first().focus();
        //$(".omni-overlay.sharedauth").focus();
        //to focus in overlay heading
        $rootScope.dialogHeading = null;
        $rootScope.dialogHeading = "Please select how you want us to deliver a one-time passcode to you";
        if (document.getElementById('stepupLiveAnnouncement') !== null) {
            document.getElementById('stepupLiveAnnouncement').innerHTML = 'Please select how you want us to deliver a one-time passcode to you, view loaded';
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


        if ($state.params.transmitParams) {

            $scope.targets = $state.params.transmitParams.channels[0].targets;

            $scope.targetClick = function(number) {
                transmitEventsService.selectedTarget(number);
                $rootScope.$broadcast('selectedTarget', number);
            }

            $scope.sendSMS = function(number) {
                transmitEventsService.selectedTarget(number);
                $rootScope.$broadcast('selectedTarget', number);
            }
        }


        // To Show Change Authentication link in OTP Select Page (only for 24 HB screen)
        $rootScope.$broadcast('ShowHideLinks', null);


        $scope.changeAuth = function() {
            SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationOTPChangeAuthLink");
            transmitEventsService.changeAuthenticator();
            $rootScope.$broadcast('authChangeMethod', null);
        }
        $scope.cancelbuttonClick = function() {
            transmitEventsService.cancelAuthenticator();
            // changes has been done to fix the Tux start over option in step up screen 
            if (idShieldService.isTuxLogin()) {
                $rootScope.$broadcast('redirectToTuxLogin', { isError: false });
            } else { $rootScope.$broadcast('ResetLogin', { showError: false }); }
        };
    }

})();