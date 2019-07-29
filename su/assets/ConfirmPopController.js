(function() {
    'use strict';

    angular
        .module("sharedAuthStepUp")
        .controller('ConfirmPopController', ConfirmPopController);

    ConfirmPopController.$inject = ['$scope', '$state', '$rootScope', 'SASiteCatService', 'transmitEventsService'];

    function ConfirmPopController($scope, $state, $rootScope, SASiteCatService, transmitEventsService) {
        if ($rootScope.systemError) {
            transmitEventsService.cancel();
            $rootScope.$broadcast('authCancel', null);
        }
        if ($rootScope.mainClose != true) {
            SASiteCatService.onTrackCustomSharedStepUp("StepUpAuthentication", "AuthenticationAYS");
        }
        $rootScope.dialogHeading = null;
        $rootScope.dialogHeading = "Are you sure you want to cancel?";
        if (document.getElementById('stepupLiveAnnouncement') !== null) {
            document.getElementById('stepupLiveAnnouncement').innerHTML = 'Are you sure you want to cancel?, view loaded';
        }


        // Used by Mobile Preference Page during Enrollment
        $scope.hideChangeAuth = $state && $state.params && $state.params.transmitParams && $state.params.transmitParams.hideChangeAuth || $rootScope.isUserLocked;
        $scope.showCancel = $state && $state.params && $state.params.transmitParams && $state.params.transmitParams.showCancel;

        if (((window.currentPageID != null) || (typeof (window.currentPageID) != "undefined"))) {
            document.getElementById("authenticatorheader").setAttribute("tabindex", "-1"); //setting focus to header in AYS screen for TUX
            document.getElementById("authenticatorheader").focus();
        }

        //setTimeout(function() {
        //    $("#overlayModalContainer").first().focus();
        //    if (((window.currentPageID != null) || (typeof (window.currentPageID) != "undefined"))) {
        //        document.getElementById("authenticatorheader").setAttribute("tabindex", "-1"); //setting focus to header in AYS screen for TUX
        //        document.getElementById("authenticatorheader").focus();
        //    }
        //}, 400);
        //if (((window.currentPageID != null) || (typeof (window.currentPageID) != "undefined"))) {
        //    setTimeout(function() {
        //        document.getElementById("confirmCancel").focus(); //focusing on yes link in AYS screen
        //    }, 300)
        //} 
        require(['xm/xmui', 'xm/xm_api'], function (xmui, xm) {
            $scope.confirmCancel = function() {
                transmitEventsService.cancelAuthenticator();
                SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationAYSYesLink");
                $rootScope.$broadcast('authCancel', null);
            }
            $scope.tryOnce = function() {
                transmitEventsService.retryAuthenticator();
                SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationAYSNoLink");
                $rootScope.$broadcast('authRetry', null);
            }
            $scope.changeAuth = function() {
                SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationAYSChagneAuthLink");
                transmitEventsService.changeAuthenticator();
                $rootScope.$broadcast('authChangeMethod', null);
            }
        });
        //$("#sharedAuthstepUpContainer a,#sharedAuthstepUpContainer h1").first().focus();
        //$(".omni-overlay.sharedauth").focus();
        //to focus in overlay heading        
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
    }
})();