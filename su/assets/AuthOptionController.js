(function() {
    'use strict';

    angular
        .module("sharedAuthStepUp")
        .controller('AuthOptionController', AuthOptionController);

    AuthOptionController.$inject = ['$scope', '$rootScope', '$state', '$location', '$compile', 'SASiteCatService', 'idShieldService', 'transmitEventsService'];

    function AuthOptionController($scope, $rootScope, $state, $location, $compile, SASiteCatService, idShieldService, transmitEventsService) {

        // Hiding the Spinner after screen load completion
        if (!$('.sharedauth-loading').hasClass('sharedauth-complete')) {
            $(".sharedauth-loading").attr('aria-busy', false);
            $(".sharedauth-loading").attr('aria-hidden', true);
            $('.sharedauth-loading').toggleClass('sharedauth-complete');
        }

        if (typeof $scope.transmitappid !== 'undefined' && $scope.transmitappid == "mbl") {
            SASiteCatService.onTrackSATransmitMobileLogin("Mobile", "StepupChangeAuthSuccess", null);
        }
        else {
            if (typeof $scope.iswidget !== 'undefined') {
                SASiteCatService.onTrackSATransmitLogin("LoginWidget", "StepupChangeAuthSuccess", null, $scope.iswidget);
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
                SASiteCatService.onTrackCustomSharedStepUp("StepUpAuthentication", "AuthenticationType", pid);
            }
        }
        var authenticationType = {
            'otp': 'One-time passcode',
            'placeholder_qa': 'ID Shield questions',
            'placeholder_password_pld': 'Password',
            'mobile_approve': ' Visual pattern, fingerprint scan or Face ID (iPhone X only)'
        };

        var errorTag = document.getElementById("errortag");
        if (errorTag) errorTag.innerHTML = "";

        //$("#sharedAuthstepUpContainer input, #sharedAuthstepUpContainer button, #sharedAuthstepUpContainer a, #sharedAuthstepUpContainer h1").first().focus();
        //$(".omni-overlay.sharedauth").focus();
        //to focus in overlay heading

        $rootScope.dialogHeading = null;
        $rootScope.dialogHeading = "Please select authentication method";
        if (document.getElementById('stepupLiveAnnouncement') !== null) {
            document.getElementById('stepupLiveAnnouncement').innerHTML = "Please select authentication method, view loaded";
        }
        setTimeout(function() {
            if (((window.currentPageID != null) || (typeof (window.currentPageID) != "undefined")) && !idShieldService.isTuxLogin()) {
                document.getElementById("authenticatorheader").setAttribute("tabindex", "-1");
                document.getElementById("authenticatorheader").focus();
            } else if (idShieldService.isTuxLogin() || (document.getElementsByClassName("contain-stepup sharedauth authlogin")[0] != null && document.getElementsByClassName("contain-stepup sharedauth authlogin")[0] != undefined)) {
                document.getElementById("stepUpHeader").setAttribute("tabindex", "-1");
                document.getElementById("stepUpHeader").focus();
            } else if (document.getElementById("authenticatorheader") != null || document.getElementById("authenticatorheader") != "undefined") {
                document.getElementById("authenticatorheader").setAttribute("tabindex", "-1");
                document.getElementById("authenticatorheader").focus();
            } else {
                $("#goback").first().focus();
            }
        }, 100);
        if ($state.params.transmitParams) {

            $scope.methods = $state.params.transmitParams;

            if ($scope.methods) {
                for (i = 0; i < $scope.methods.length; i++) {
                    if ($scope.methods[i] && $scope.methods[i].type == "mobile_approve") {
                        if ($scope.methods[i].selectable_devices.length == 0) {
                            delete $scope.methods[i];
                            break;
                        }
                    }
                }
            }

            $scope.getAuthenticationTypeText = function(type) {
                return authenticationType[type];

            }

            $scope.authenticationMethodClicked = function(type) {
                //$rootScope.$broadcast('rootScope:AuthOption', type);
                transmitEventsService.displayAuthOptions($scope, $scope.methods, type)
            }
        }
        $scope.cancelbuttonClick = function() {
            transmitEventsService.cancelAuthenticator();
            if (idShieldService.isTuxLogin()) {
                $rootScope.$broadcast('redirectToTuxLogin', { isError: false });
            }
            else {
                $rootScope.$broadcast('ResetLogin', { showError: false });
            }
        };
    }
})();