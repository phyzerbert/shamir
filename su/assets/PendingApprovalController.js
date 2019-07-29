(function() {
    'use strict';

    angular
        .module("sharedAuthStepUp")
        .controller('PendingApprovalController', PendingApprovalController);

    PendingApprovalController.$inject = ['$scope', '$rootScope', '$state', '$location', 'idShieldService', 'SASiteCatService', 'transmitEventsService'];

    function PendingApprovalController($scope, $rootScope, $state, $location, idShieldService, SASiteCatService, transmitEventsService) {
        if (typeof $scope.transmitappid !== 'undefined' && $scope.transmitappid == "mbl") {
            SASiteCatService.onTrackSATransmitMobileLogin("Mobile", "StepupMobApprovePending", null);
        }
        else {
            if (typeof $scope.iswidget !== 'undefined') {
                SASiteCatService.onTrackSATransmitLogin("LoginWidget", "StepupMobApprovePending", null, $scope.iswidget);
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
                SASiteCatService.onTrackCustomSharedStepUp("StepUpAuthentication", "AuthenticationTypeMobileApprovePending", pid);
            }
        }
        var appid = $rootScope.transmitOTPParams ? $rootScope.transmitOTPParams.TransmitAppID : '';
        var BaseUrl = $rootScope.transmitOTPParams ? $rootScope.transmitOTPParams.IDShieldBaseURL : '';
        $scope.isMobileWeb = (appid == "mbl") ? false : true;
        var urlSplit = BaseUrl.split('/');
        var protocol = urlSplit[0];
        var domain = urlSplit[2];
        var sub_url = protocol + '//' + domain;

        //$("#sharedAuthstepUpContainer input, #sharedAuthstepUpContainer button, #sharedAuthstepUpContainer a, #sharedAuthstepUpContainer h1").first().focus();
        //$(".omni-overlay.sharedauth").focus();
        //to focus in overlay heading        
        $rootScope.dialogHeading = null;
        $rootScope.dialogHeading = "Authorization Pending";
        if (document.getElementById('stepupLiveAnnouncement') !== null) {
            document.getElementById('stepupLiveAnnouncement').innerHTML = 'Authorization Pending, View loaded';
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
        $scope.changeAuth = function() {
            SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationPushChangeAuthLink");
            transmitEventsService.changeAuthenticator();
            $rootScope.$broadcast('authChangeMethod', null);
        }
        $scope.tryOnce = function() {
            SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationChangeDeviceLink");
            transmitEventsService.retryAuthenticator();
            $rootScope.$broadcast('authRetry', null);
        }
        $scope.RedirectToLoginAssist = function(personId) {
            SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationPushHelpLink");
            idShieldService.loginAssit($scope.accountLocked, false, $scope.isMobileWeb, sub_url);
        };

        $scope.cancelbuttonClick = function() {
            transmitEventsService.cancelAuthenticator();
            // changes has been done to fix the Tux start over option in step up screen 
            if (idShieldService.isTuxLogin()) {
                $rootScope.$broadcast('redirectToTuxLogin', { isError: false });
            } else { $rootScope.$broadcast('ResetLogin', { showError: false }); }
        };
        $scope.navigateArrowKeys = function(event) {
            if (event.keyCode == 40) {
                if (document.activeElement.parentElement.nextElementSibling != null && document.activeElement.parentElement.nextElementSibling.children.length > 0) {
                    angular.element(document.activeElement.parentElement.nextElementSibling.children[0].focus());
                }
                else {
                    angular.element(document.querySelector("#authenticatorheader").parentNode.focus());
                }
            }
            if (event.keyCode == 38) {
                if (document.activeElement.parentElement.previousElementSibling != null && document.activeElement.parentElement.previousElementSibling.children.length > 0) {
                    angular.element(document.activeElement.parentElement.previousElementSibling.children[0].focus());
                }
                else {
                    angular.element(document.querySelector("#authenticatorheader").parentNode.focus());
                }
            }
        };
        //code to hide the change device link for single device - defect fix 19744
        $scope.deviceList = [];
        if ($state.params.transmitParams.selectable_devices.constructor === Array) {
            $scope.deviceList = $state.params.transmitParams.selectable_devices;
        }
        else {
            var list = $state.params.transmitParams.selectable_devices;
            $scope.deviceList = [list];
        }
        if ($scope.deviceList.length < 2) {
            $('#linkdiable').hide();
        }
        else {
            $('#linkdiable').show();
        }

        $rootScope.$broadcast('ShowHideLinks', null);
    }
})();