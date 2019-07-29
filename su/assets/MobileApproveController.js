(function() {
    'use strict';

    angular
        .module("sharedAuthStepUp")
        .controller('MobileApproveController', MobileApproveController);

    MobileApproveController.$inject = ['$scope', '$rootScope', '$state', '$location', 'idShieldService', 'SASiteCatService', 'transmitEventsService'];

    function MobileApproveController($scope, $rootScope, $state, $location, idShieldService, SASiteCatService, transmitEventsService) {
        if (document.getElementById('sharedAuthID')) {
            document.getElementById('sharedAuthID').removeAttribute("style");
        }
        if (typeof $scope.transmitappid !== 'undefined' && $scope.transmitappid == "mbl") {
            SASiteCatService.onTrackSATransmitMobileLogin("Mobile", "StepupMobApprove", null);
        }
        else {
            if (typeof $scope.iswidget !== 'undefined') {
                SASiteCatService.onTrackSATransmitLogin("LoginWidget", "StepupMobApprove", null, $scope.iswidget);
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
                SASiteCatService.onTrackCustomSharedStepUp("StepUpAuthentication", "AuthenticationTypeMobileApprove", pid);
            }
        }
        $scope.devices = [];
        //$("#sharedAuthstepUpContainer input, #sharedAuthstepUpContainer button, #sharedAuthstepUpContainer a,#sharedAuthstepUpContainer h1").first().focus();
        //$(".omni-overlay.sharedauth").focus();
        //to focus in overlay heading
        $rootScope.dialogHeading = null;
        $rootScope.dialogHeading = "Please select how you want us to deliver a push notification to authenticate you";
        if (document.getElementById('stepupLiveAnnouncement') !== null) {
            document.getElementById('stepupLiveAnnouncement').innerHTML = 'Please select how you want us to deliver a push notification to authenticate you, view loaded';
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

            //$scope.devices = $state.params.transmitParams.selectable_devices;
            //changes done to show the device list if device number is one - defect fix 19744
            if ($state.params.transmitParams.selectable_devices.constructor === Array) {
                $scope.devices = $state.params.transmitParams.selectable_devices;
            }
            else {
                var list = $state.params.transmitParams.selectable_devices;
                $scope.devices = [list];
            }

            $scope.targetClick = function(device) {
                transmitEventsService.selectedTarget(device.device_id);
                $rootScope.$broadcast('selectedDevice', device.device_id);
            }
        }

        $scope.hasDevices = $scope.devices.length > 0;

        // To Show Change Authentication link in Device Select Page (only for 24 HB screen)
        $rootScope.$broadcast('ShowHideLinks', null);

        $scope.changeAuth = function() {
            SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationPushChangeAuthLink");
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

    angular
        .module("sharedAuthStepUp")
        .controller('ErrorPageController', ErrorPageController);

    ErrorPageController.$inject = ['$scope', '$rootScope', '$state', '$location', 'idShieldService', 'SASiteCatService'];

    function ErrorPageController($scope, $rootScope, $state, $location, idShieldService, SASiteCatService) {

        $scope.cancelbuttonClick = function() {
            // changes has been done to fix the Tux start over option in step up screen 
            if (idShieldService.isTuxLogin()) {
                $rootScope.$broadcast('redirectToTuxLogin', { isError: false });
            } else { $rootScope.$broadcast('ResetLogin', { showError: false }); }
        };
    }

})();