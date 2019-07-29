(function () {

    'use strict';

    angular.module('sharedAuthStepUp', ['ui.bootstrap', 'ui.router', 'ngBusy', 'ngAria', 'sharedAuthOmniTemplateModule'])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('init', {
                    name: 'init',
                    //                    url: '/',
                    template: ''
                })
                .state('authOptions', {
                    name: 'authOptions',
                    //                    url: '/authOptions',
                    params: {
                        transmitParams: null
                    },
                    templateUrl: 'ChildAuthOptionPage.html',
                    controller: "AuthOptionController"

                })
                .state('ErrorPage', {
                    name: 'error',
                    params: {
                        transmitParams: null
                    },
                    templateUrl: 'ErrorPage.html',
                    controller: "ErrorPageController"

                })
                .state('otpTarget', {
                    name: 'otpTarget',
                    //                    url: '/otpTarget',
                    params: {
                        transmitParams: null
                    },
                    templateUrl: 'ChildOTPSelectTarget.html',
                    controller: "OTPTargetController"

                }).state('inputOTPCode', {
                    name: 'inputOTPCode',
                    //                    url: '/inputOTPCode',
                    params: {
                        transmitParams: null
                    },
                    templateUrl: 'ChildOTPInputCode.html',
                    controller: "InputOTPController"
                }).state('mobApprove', {
                    name: 'mobApprove',
                    //                    url: '/mobApprove',
                    params: {
                        transmitParams: null
                    },
                    templateUrl: 'ChildMobileApprove.html',
                    controller: "MobileApproveController"
                }).state('pendingApproval', {
                    name: 'pendingApproval',
                    //                    url: '/pendingApproval',
                    params: {
                        transmitParams: null
                    },
                    templateUrl: 'PendingApproval.html',
                    controller: "PendingApprovalController"
                }).state('idshield', {
                    name: 'idshield',
                    //                    url: '/idshield',
                    params: {
                        transmitParams: null
                    },
                    templateUrl: 'ChildIDShield.html',
                    controller: "IDShieldController"
                }).state('password', {
                    name: 'password',
                    //                    url: '/password',
                    params: {
                        transmitParams: null
                    },
                    templateUrl: 'Password.html',
                    controller: "PasswordController"
                }).state('cancelauth', {
                    name: 'cancelauth',
                    //                    url: '/cancelauth',
                    params: {
                        transmitParams: null
                    },
                    templateUrl: 'StepupCancellation.html',
                    controller: "ConfirmPopController"
                }).state('inputOTPCodeMNC', {
                    name: 'inputOTPCodeMNC',
                    //                    url: '/inputOTPCode',
                    params: {
                        transmitParams: null
                    },
                    templateUrl: 'ChildOTPInputCodeMNC.html',
                    controller: "InputOTPControllerMNC"
                })


        }]);

    //End Routing
    // This Controller is specifically added for Login scenario in TUX.
    angular.module("sharedAuthStepUp")
        .controller("TransmitLoginStepupController", transmitLoginStepupController);

    transmitLoginStepupController.$inject = ['$rootScope', '$scope', 'dataContainer', 'idShieldService', '$state', 'transmitService'];

    function transmitLoginStepupController($rootScope, $scope, dataContainer, idShieldService, $state, transmitService) {
        var transmitLoginParams = OmniDataUtil.getOmniData('transmitLoginParams');
        $scope.Username = transmitLoginParams.Username;
        dataContainer.TransactionID = transmitLoginParams.TransactionId;
        dataContainer.IDShieldBaseURL = transmitLoginParams.IdshieldBaseUrl;
        dataContainer.PasswordBaseURL = transmitLoginParams.PasswordBaseUrl;
        dataContainer.TransmitAppID = transmitLoginParams.TransmitAppid;
        dataContainer.ImageBaseURL = transmitLoginParams.ImageBaseURL;
        dataContainer.SoundBaseURL = transmitLoginParams.SoundBaseURL;
        dataContainer.TransmitPolicy = transmitLoginParams.TransmitPolicy;
        dataContainer.TransmitURL = transmitLoginParams.TransmitUrl;
        dataContainer.RedirectToLogin = transmitLoginParams.RedirectToLogin;
        dataContainer.RedirectToLoginWithError = transmitLoginParams.RedirectToLoginWithError;
        dataContainer.IsOAMEnabled = transmitLoginParams.isOAMEnabled;
        dataContainer.OAMPostUrl = transmitLoginParams.OAMPostUrl;
        dataContainer.ActimizeData = transmitLoginParams.ActimizeData;

        dataContainer.RedirectToResetOrChangePassword = function (isChangePassword, existingPassword) {
            var isResetPassword = true;
            if (isChangePassword) {
                isResetPassword = false;
            }
            idShieldService.loginAssit(true, false, true, "", "", isResetPassword, isChangePassword, existingPassword);
        }

        dataContainer.SuccessHandler = function (response) {
            transmitLoginParams.TransmitCall(response);
        };

        dataContainer.ErrorHandler = function (response) {

            if (response.userLockedQA) {
                idShieldService.loginAssit(true, false, true, "");
                return;
            }
            if (response.isDeviceNotAvailable) {
                transmitLoginParams.ErrorCallBack();
                return;
            }
            transmitLoginParams.ErrorCallBack(response);
        };

        $scope.saSuccessHandler = function (response) {
            transmitLoginParams.TransmitCall(response);
        };

        $scope.saErrorHandler = function (response) {

            if (response.userLockedQA) {
                idShieldService.loginAssit(true, false, true, "");
                return;
            }
            if (response.isDeviceNotAvailable) {
                transmitLoginParams.ErrorCallBack();
                return;
            }
            // When user denies the push notification
            if (response.isMobileApprovalDenied) {
                transmitLoginParams.RedirectToLoginWithError("DenyErrorMessage");
                return;
            }
            transmitLoginParams.ErrorCallBack(response);
        };
    }

    angular.module("sharedAuthStepUp")
        .controller("SharedAuthModalCtrl", sharedAuthStepUpCtrl);

    sharedAuthStepUpCtrl.$inject = ['$rootScope', '$injector', '$state', '$scope', '$modal', '$location', 'SASiteCatService', 'idShieldService', '$compile', 'MMScrollService', 'transmitService'];

    function sharedAuthStepUpCtrl($rootScope, $injector, $state, $scope, $modal, $location, SASiteCatService, idShieldService, $compile, MMScrollService, transmitService) {

        var _onMBQASuccessHandler;
        var vm = $scope;
        var modalInstance;
        var isLinkCustomizationFor24HB = false;
        var openOverlay = true;
        //defect fix for screen reader reading behind screens
        vm.dialogOpen = false;
        vm.showPlaceHolder = showPlaceHolder;
        vm.navigatePage = navigatePage;
        vm.showServiceModal = showServiceModal;
        vm.showLogInAssistance = showLogInAssistance;

        vm.opts = {
            backdrop: true,
            keyboard: true,
            templateUrl: 'StepUpContainer.html',
            controller: AuthModalInstanceCtrl,
            //windowClass: 'sharedauth-modal-open',
            resolve: {} // empty storage
        };

        $rootScope.$on('MBQASuccess', function (event, response) {
            if (_onMBQASuccessHandler) _onMBQASuccessHandler(event, response);
        });

        //Show QA place hodler screen for Mobile
        function showPlaceHolder(params) {
            //Defect#20729
            $scope.isKitkat = false;
            if (navigator.userAgent.match(/Android/i)) {
                var deviceOs = parseFloat(navigator.appVersion.split("Android ")[1].split(';')[0]);
                if (deviceOs >= 4.4 && deviceOs < 5) {
                    $scope.isKitkat = true;
                    //$('.modal-content').css('top','50%');
                }
            }
            //vm.ContextData = params.ContextData;
            vm.username = params.username;
            //vm.TransmitURL = params.TransmitURL;
            params.hasResumePlaceholder = params.resumePlaceholder ? true : false;

            //Open a modal dialog
            openModal(params);

            _onMBQASuccessHandler = function (event, response) {
                params.resumePlaceholder(response);
                modalInstance.dismiss();
            };

            $rootScope.$on('LoginAssistance', function (event, response) {
                params.failed({ "error": "LoginAssitanceClicked", "code": "1001" });
                modalInstance.dismiss();
            });
            $rootScope.$on('NotifySiteCat', function (event, response) {
                params.notifySiteCat(response);
            });
            //Navigate to ID Shield
            vm.navigatePage(params.defaultauth, params);
        }

        function showLogInAssistance(params) {
            var baseURL = params.BaseURL;
            var urlSplit = baseURL.split('/');
            var protocol = urlSplit[0];
            var domain = urlSplit[2];
            var sub_url = protocol + '//' + domain;
            idShieldService.loginAssit($scope.accountLocked, false, false, sub_url);
        }
        //Navigate through different screens
        function navigatePage(pageName, params) {
            $state.go(pageName, { transmitParams: params });
        }

        //Adding null check
        document.addEventListener("focus", function (event) {
            var d = document.getElementById("sharedAuthstepUpContainer");
            if (d != null) {
                if (vm.dialogOpen && !d.contains(event.target)) {
                    event.stopPropagation();
                    d.focus();
                }
            }

        }, true);
        // To Open Stepup Modal
        function openModal(params) {
            vm.dialogOpen = true;
            modalInstance = $modal.open(vm.opts);

            angular.element(document.getElementsByTagName('body')).toggleClass("sharedauth-modal-open");

            setTimeout(function () {
                if (params.TransmitAppID == "mbl") {
                    var dom = document.getElementsByClassName("modal fade ng-isolate-scope in")[0];
                    if (dom != undefined && dom != "") {
                        dom.setAttribute("role", "dialog");
                        dom.setAttribute("aria-live", "assertive");
                        dom.removeAttribute("ng-click"); // fix for VO reading as clickable
                    }
                }
                //defect fix for scroll issue and page ui issue in lower end android #20013 #22080
                var domModalContent = document.getElementsByClassName("modal-content")[0];
                if (domModalContent != undefined && domModalContent != "") {
                    if ($scope.isKitkat == true) {
                        domModalContent.setAttribute("style", "overflow:auto !important; max-height:100% !important; top:50% !important");
                    } else {
                        domModalContent.setAttribute("style", "overflow:auto !important; max-height:100% !important;");
                    }
                    domModalContent.setAttribute("role", "document");
                }

            }, 1000);

            modalInstance.result.then(function () {
                //on ok button press 
            }, function (event) {

                //Clear listeners to use again.
                $rootScope.$$listeners.MBQASuccess = []; //Multiple events issue fix
                angular.element(document.getElementsByTagName('body')).toggleClass("sharedauth-modal-open");

                if (event === "closedOnError") {
                    vm.dialogOpen = false;
                }
            });

            return modalInstance;
        }

        //Funcion to loop tabfocus within modal dialog
        function trapTabfocus(e) {
            if (document.querySelector('div[saloginwidget]') == null || document.querySelector('div[saloginwidget]') == 'undefined') {
                var Dialog = document.getElementById("sharedAuthstepUpContainer");
                if (!Dialog) return;

                var focusableElsall = Dialog.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
                if (!focusableElsall || focusableElsall.length == 0) return;

                var focusableEls = [];
                for (var i = 0; i < focusableElsall.length; i++) {
                    var el = focusableElsall[i];
                    var pel = focusableElsall[i].parentElement;
                    var style, style1;
                    if (el != null || el != undefined) {
                        style = window.getComputedStyle(el);
                    }
                    else {
                        style = null;
                    }
                    if (pel != null || pel != undefined) {
                        style1 = window.getComputedStyle(pel);
                    }
                    else {
                        style1 = null;
                    }
                    if (style != null && style1 != null) {
                        if (style.display != 'none' && style.visibility != 'hidden') {
                            if (style1.display != 'none' && style1.visibility != 'hidden') {
                                focusableEls.push(focusableElsall[i]);
                            }
                        }
                    }
                }
                focusableEls = Array.prototype.slice.call(focusableEls);
                var firstFocusableEl = focusableEls[0];
                var lastFocusableEl = focusableEls[focusableEls.length - 1];
                var KEY_TAB = 9;
                var KEY_ESC = 27;

                function handleBackwardTab() {
                    if (document.activeElement === firstFocusableEl) {
                        e.preventDefault();
                        lastFocusableEl.focus();
                    }
                }
                function handleForwardTab() {
                    if (document.activeElement === lastFocusableEl) {
                        e.preventDefault();
                        firstFocusableEl.focus();
                    }
                }

                switch (e.keyCode) {
                    case KEY_TAB:
                        if (focusableEls.length === 1) {
                            e.preventDefault();
                            break;
                        }
                        if (e.shiftKey) {
                            handleBackwardTab();
                        } else {
                            handleForwardTab();
                        }
                        break;
                    default:
                        break;
                }
            }
        }

        //Show All Authenticators
        function showServiceModal(params) {

            vm.successHandler = params.success;
            vm.failureHandler = params.failed;
            vm.TransmitURL = getServiceURL(params.TransmitURL, $location);
            vm.username = params.username.toLowerCase();
            vm.TransmitAppID = params.TransmitAppID;
            vm.TransmitPolicy = params.TransmitPolicy;
            vm.requestParameter = {
                resumePlaceHolder: params.resumePlaceHolder ? true : false,
                username: params.username,
                TransactionID: params.TransactionID,
                IDShieldBaseURL: getServiceURL(params.IDShieldBaseURL, $location),
                PasswordBaseURL: getServiceURL(params.PasswordBaseURL, $location),
                ContextData: params.ContextData ? params.ContextData : "",
                TransmitAppID: params.TransmitAppID ? params.TransmitAppID : "web",
                stepupQuestion: params.stepupQuestion,
                policyID: params.TransmitPolicy,
                actimizeData: params.ActimizeData ? params.ActimizeData : "",
                modelDialogOnClose: params.closeHandler || params.modalClose,
                showModalDialog: !params.StepupWithoutOverlay
            };

            if (params.additionalParams) {
                vm.additionalParams = params.additionalParams;
            }
            //defect fix 19742
            if (params.closeHandler) {
                vm.closeHandler = params.closeHandler;
                //defect fix 20458
                $rootScope.authcncl = params.closeHandler;
            }

            // To differentiate the Stepup Overlay and Stepup screen
            if (params.StepupWithoutOverlay) {
                openOverlay = false;
            }

            // To remove Need Help? link and add Change Auth link in 24 HB Screen (Stepup Without Overlay)
            if (params.LinksCustomizationFor24HBScreen) {
                isLinkCustomizationFor24HB = true;
            }

            // To remove close button by default
            if (params.HideCloseButton) {
                $scope.HideCloseButton = true;
            }
            else {
                $scope.HideCloseButton = false;
            }
            $scope.$on('lockoutUser', function (event, data) {
                $rootScope.isUserLocked = true;
            });
            $scope.$on('authCancel', function (event, data) {
                modalInstance.dismiss("cancel");
            });
            $scope.$on('ShowHideLinks', function (event, data) {
                if (isLinkCustomizationFor24HB) {
                    $scope.is24HBScreen = true;
                }
                else {
                    $scope.is24HBScreen = false;
                }
            });

            //defect fix #21534
            $rootScope.dialogHeading = "";
            $rootScope.transmitOTPParams = vm.requestParameter;

            //Clear previous state
            vm.navigatePage('init');
            //check for mbl
            if (vm.TransmitAppID != "mbl" && ((window.currentPageID != null) || (typeof (window.currentPageID) != "undefined"))) {
                var focusable = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
                var currentpageID = window.currentPageID;
                var domCurrentPg = document.getElementById(currentpageID);
                domCurrentPg.setAttribute("aria-hidden", "true");
                $("#"+currentpageID).find(focusable).attr('tabindex', '-1');
                //passing value to another controller
                $rootScope.toAuthCncl = vm.TransmitAppID;
            }
            else if (vm.TransmitAppID != "mbl") {
                var focusable = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
                var domContainerOLB = document.getElementsByClassName("container")[0];
                if (domContainerOLB != undefined && domContainerOLB != "") {
                    domContainerOLB.setAttribute("aria-hidden", "true");
                    $(".container").find(focusable).attr('tabindex', '-1');
                }
                var domFooterOLB = document.getElementById("footer"); //fix 22987
                if (domFooterOLB != undefined && domFooterOLB != "") {
                    domFooterOLB.setAttribute("aria-hidden", "true");
                    $("#footer").find(focusable).attr('tabindex', '-1');
                }
                var domGssUIWrapper = document.getElementById("gssUIWrapper");
                if (domGssUIWrapper != undefined && domGssUIWrapper != "") {
                    domGssUIWrapper.setAttribute("aria-hidden", "true");
                    $("#gssUIWrapper").find(focusable).attr('tabindex', '-1');
                }
                sessionStorage.setItem("isDialogOpen", true);
                $(document).keydown(function (e) {
                    var dialogToken = sessionStorage.getItem("isDialogOpen");
                    if (dialogToken == "true") {
                        trapTabfocus(e);
                    }
                });
            }

            var modalInstance;

            transmitService.clearEventHandlers();

            transmitService.onAuthenticatorsChanged(function (eventArgs) {
                if (openOverlay && !vm.dialogOpen) {
                    modalInstance = openModal(params);
                    transmitService.setModalInstance(modalInstance);
                }
            });

            transmitService.onAuthenticatorFailure(function(eventArgs) {
                if (openOverlay && !vm.dialogOpen) {
                    modalInstance = openModal(params);
                    transmitService.setModalInstance(modalInstance);
                }
            });
            
            transmitService.onAuthenticatorCancelled(function () {
                if (modalInstance) modalInstance.dismiss("cancel");
                vm.dialogOpen = false;

                if ($state.params.transmitParams && $state.params.transmitParams.TransmitAppID !== 'mbl') { //null check added for failure scenario.
                    if ($state.params.transmitParams && $state.params.transmitParams.type == 'otp') {
                        SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationOTPCloseLink");
                    } else {
                        SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationCloseLink");
                    }
                }

                $rootScope.mainClose = true;

                if ($rootScope.systemError) {
                    $rootScope.$broadcast('authCancel', null);
                }

                if ($state.params.transmitParams && $state.params.transmitParams.hasResumePlaceholder && $state.params.transmitParams.failed) {
                    $state.params.transmitParams.failed({ "error": "cancelled", "code": "105" });
                }
            });

            transmitService.onAuthenticatorSuccess(function () {
                if (modalInstance) modalInstance.dismiss("cancel");
                vm.dialogOpen = false;
            });

            $rootScope.systemError = false;
            //Call Transmit for available authenticators for this policy/user
            showTransmitAuthOptions(modalInstance, null, vm.username, vm.successHandler, vm.failureHandler, vm.TransmitAppID, vm.TransmitPolicy, vm.TransmitURL, vm.requestParameter, vm, vm.additionalParams, SASiteCatService, $rootScope, {}, transmitService);
            //fix for 20941
            if (vm.TransmitAppID != "mbl" && ((window.currentPageID != null) || (typeof (window.currentPageID) != "undefined"))) {
                $scope.updatePageScroll("MAscroller", "#wrapperId", "#scrollerId", 10, null, 100, false, null);
            }
        }

        //fix for 20941
        $scope.updatePageScroll = function (scrollObj, wrapperId, scrollerId, individualHeight, dataArray, additionalHeight, staticPage, staticHeight) {

            var adjustedHeight = 0;

            if (staticPage) { // Is page already rendered
                if (staticHeight) //manual calculation
                    adjustedHeight = staticHeight;
                else if (angular.element(scrollerId)) // Auto calculations with scroller
                    adjustedHeight = angular.element(scrollerId).outerHeight();
            } else if (dataArray) { // For ajax calls
                adjustedHeight = adjustedHeight + (dataArray * individualHeight);
            }

            //this is for top label and bottom CMS content height.
            if (additionalHeight)
                adjustedHeight += additionalHeight;

            // //This method destroys the previously calculated height of the container.
            MMScrollService.destroyParamterizedScroll(scrollObj);

            setTimeout(function () {
                // //This method needs custom parameters to be passed to differentiate the multiple wrapper and scrollers.
                MMScrollService.updatePageWithScrollOmni(scrollObj, wrapperId, scrollerId, adjustedHeight);
                var wrprht = document.getElementById("wrapperId");
                wrprht.setAttribute("style", "height:400px;");
                var scrlrht = document.getElementById("scrollerId");
                scrlrht.style.height = "700px";
            }, 500);
        }
    }

    angular.module("sharedAuthStepUp")
        .controller('AuthModalInstanceCtrl', AuthModalInstanceCtrl);

    AuthModalInstanceCtrl.$inject = ['$scope', '$rootScope', '$modalInstance', '$modal', '$state', 'SASiteCatService', 'transmitService', 'transmitEventsService'];

    function AuthModalInstanceCtrl($scope, $rootScope, $modalInstance, $modal, $state, SASiteCatService, transmitService, transmitEventsService) {

        $scope.cancel = function (event) {

            if ($state && $state.params &&
                $state.params.transmitParams &&
                $state.params.transmitParams.hasResumePlaceholder &&
                $state.params.transmitParams.failed) {
                $state.params.transmitParams.failed({ "error": "cancelled", "code": "105" });
            }

            if ($state &&
                $state.params &&
                $state.params.transmitParams &&
                $state.params.transmitParams.TransmitAppID == "mbl")
                return;

            if (transmitService.iAuthenticationErrored()) {
                if ($modalInstance) $modalInstance.dismiss("closedOnError");
                return;
            }

            if (transmitEventsService) transmitEventsService.showAuthCancelConfirmation();
            if (event) event.preventDefault();
        };
    }

    var getServiceURL = function (serviceurl, location) {

        var port = location.port() ? ':' + location.port() : '';
        return location.protocol() + '://' + location.host() + port + serviceurl;

    }

    var getErrorMessage = function (cflowcontext, SASiteCatService) {

        if (cflowcontext) {

            // D23716: Lockout is happening in OTP step up after 4 incorrect attempts
            // Even though the user is getting locked in the 3rd attempt, the error_code which receive from Transmit says 5 and taking the user through woring code flow
            // This has been fixed no checking the locked before getting into the switch...case statement
            if (cflowcontext.data.data != null && cflowcontext.data.data.locked == true) {
                SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationOTPLockedError");
                return "locked";
            }
            switch (cflowcontext.data.assertion_error_code) {
                case 5: //Authentication failed - secret/credentials passed as part of the assertion are incorrect.
                    SASiteCatService.onTrackCustomSharedStepUp("StepUpAuthentication", "AuthenticationOTPIncorrectError");
                    return "That seems to be the wrong code. Please try again.";
                    break;
                case 9: //Internal error
                    return "We're sorry. We are having problems on our end. It shouldn't be too long, so please try again shortly.";
                    break;
                case 6: //User is locked.
                    SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationOTPLockedError");
                    return "locked";
                    break;
                case 12: //User is locked.
                    $rootScope.isUserLocked = true;
                    SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationOTPLockedError");
                    return "locked";
                    break;
                case 13: //Used by “Mobile Approve” method only - indicates that approval is still pending.
                    return "Your approval is still pending.";
                    break;
                case 21: //Approval is expired.
                    return "Approval is expired.";
                    break;
                default:
                    return "We're sorry. We are having problems on our end. It shouldn't be too long, so please try again shortly.";

            }


        }

    }

    function showTransmitAuthOptions(modalInstance, pathToRedirect, username, successHandler, failureHandler, TransmitAppID, TransmitPolicy, TransmitURL, requestParameter, $scope, additionalParams, SASiteCatService, $rootScope, dataContainer, transmitService) {
        /* Using the call from Transmit Service. Transmit Service is updated with the calls defined in this method.
        * This is done to avoid duplicate coding and to fix the defects casued by duplicate binding to events on scope */

        transmitService.showOptions(
            modalInstance,
            pathToRedirect,
            username,
            successHandler,
            failureHandler,
            TransmitAppID,
            TransmitPolicy,
            TransmitURL,
            requestParameter,
            $scope,
            additionalParams,
            SASiteCatService,
            $rootScope,
            dataContainer);
    }

    //Expose to use in directive
    window.showTransmitAuthOptions = showTransmitAuthOptions;
})();

(function () {

    'use strict';

    angular.module('sharedAuthStepUp')
        .factory('transmitService', ['idShieldService', 'transmitEventsService', 'saLoggingService', 'saBusyService', '$modal', '$timeout', function (idShieldService, transmitEventsService, logger, saBusyService, $modal, $timeout) {
            var unHandledRejectionHandler;
            var authChangeCallbacks = [];
            var authCancelCallbacks = [];
            var authSuccessCallbacks = [];
            var authFailureCallbacks = [];
            var authenticationCancelled = false;
            var authenticationErrored = false;
            var tsModalInstance;
			
            window.addEventListener("unhandledrejection", function (err, promise) {
                if (unHandledRejectionHandler) unHandledRejectionHandler(err);
            });

            function setaspnetCookie(additionalParams) {
                var sessionId = '';
                var name = 'ASP.NET_SessionId';
                var value = "; " + document.cookie;
                var parts = value.split("; " + name + "=");
                if (parts.length == 2)
                    sessionId = parts.pop().split(";").shift();

                if (sessionId != '') {
                    if (additionalParams != null) {
                        additionalParams.sessionid = sessionId;
                    }
                    else {
                        additionalParams = { "sessionid": sessionId };
                    }
                }
            };

            function checkIsSessionExpired(errorResponse, errorReason) {
                if (errorReason && errorReason.toLowerCase() === "sessionexpired")
                    return true;
                if (errorResponse.error_code === 4005) return true;
                return (errorResponse.error_message && errorResponse.error_message.toLowerCase().indexOf("session not found for device") >= 0);
            };

            function parseError(error) {
                if (!error) return {};

                var errorObject = {};
                if (typeof (error) === "string") {
                    try {
                        var jsonString = error.match(new RegExp("\{.*\}"));
                        if (jsonString && jsonString.length > 0) {
                            errorObject = JSON.parse(jsonString[0]);
                        }

                    } catch (e) { }
                }
                else
                    errorObject = error;

                return errorObject;
            };

            function processError(errorResponse) {
                if (!errorResponse) return {};

                var errorObject = {};
                errorObject.IsValidUID = true;
                errorObject.isDeviceNotAvailable = false;
                errorObject.userLockedQA = false;
                errorObject.isMobileApprovalDenied = false;
                if (errorResponse && errorResponse.failure_data && errorResponse.failure_data.code == 9 && errorResponse.failure_data.action == "reject") {
                    errorObject.IsValidUID = false;
                    errorObject.Reason = errorResponse.failure_data.reason;
                    errorObject.ErrorMessage = "Hmm. We don't recognize that ID. Please try again.";
                } else if (errorResponse && errorResponse.failure_data && errorResponse.failure_data.code == 3 && errorResponse.failure_data.action == "reject") {
                    errorObject.userLockedQA = true;
                    errorObject.Reason = errorResponse.failure_data.reason;
                }
                else if (errorResponse.data && errorResponse.data.assertion_error_code && errorResponse.data.assertion_error_code == "10" && errorResponse.data.assertion_error_message.indexOf("MobileApprove") > 0) {
                    errorObject.Reason = errorResponse && errorResponse.xmapiError ? errorResponse.xmapiError.name : null;
                    errorObject.isDeviceNotAvailable = true;
                }
                // Handling the Mobile Approval reject scenario
                // This will be executed on 3rd invalid attempt of Push Approval and user is locked as well.
                else if (errorResponse != null && errorResponse.indexOf && errorResponse.indexOf("failed to authenticate") > -1) {
                    errorObject.isMobileApprovalDenied = true;
                    errorObject.userLockedQA = false;
                }
                else {
                    errorObject.Reason = errorResponse && errorResponse.xmapiError ? errorResponse.xmapiError.name : null;
                    if (errorResponse == "locked") {
                        errorObject.Reason = "allauthenticatorslocked";
                    }
                    errorObject.userLockedQA = errorResponse && errorResponse.state ? "rejected" == errorResponse.state.toLowerCase() :
                        (errorObject && errorObject.Reason ? "allauthenticatorslocked" == errorObject.Reason.toLowerCase() : false);
                }

                errorObject.SessionExpired = checkIsSessionExpired(errorResponse, errorObject.Reason);


                logger.error(errorObject.Reason);
                logger.error("Locked: " + errorObject.userLockedQA);

                errorObject.transmitErrorResponse = errorResponse;
                return errorObject;
            };

            function setInnerHTML(domElementID, message) {
                if (!domElementID) return;

                var domElement = document.getElementById(domElementID);
                if (domElement) domElement.innerHTML = message;
            }

            function clearAreaHidden(domElementSelector, removeTabIndex) {
                var focusable = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
                if (!domElementSelector) return;

                var domElement = $(domElementSelector);
                if (!domElement) return;

                domElement.removeAttr("aria-hidden");
                if (removeTabIndex)
                    $(domElementSelector).find(focusable).removeAttr('tabindex', '-1');
            }

            function resetUIElements(transmitAppId) {
                if (transmitAppId != "mbl" && ((window.currentPageID != null) || (typeof (window.currentPageID) != "undefined"))) {
                    clearAreaHidden("#" + window.currentPageID);
                }
                else if (transmitAppId != "mbl") {
                    clearAreaHidden(".container", true);
                    clearAreaHidden("#footer", true);
                    clearAreaHidden("#gssUIWrapper", true);

                    sessionStorage.setItem("isDialogOpen", false);
                    setInnerHTML('stepupLiveAnnouncement', '');
                }
            }

            function showErrorMessageInUI(err,$rootScope) {

                $rootScope.systemError = err.data && err.data.assertion_error_code && err.data.assertion_error_code == "13";

                if (err.data && err.data.assertion_error_code && err.data.assertion_error_code == "10" && err.data.assertion_error_message.indexOf("MobileApprove") > 0) {
                    setInnerHTML('authenticatorheader', '');
                    setInnerHTML('customUI', "<div class='omni-modal-body'><p class='error general' role='alert' aria-live='assertive'>To use these features, you must have Push enabled on your device. You can manage Push Notifications in the Device Manager or in the My Profile section of the app.</p></div>");

                    $rootScope.systemError = true;
                }
                else if (err.type && err.type == "mobile_approve") {
                    setInnerHTML('authenticatorheader', '');
                    setInnerHTML('customUI', "<div class='omni-modal-body'><p class='error general' role='alert' aria-live='assertive'>To use these features, you must have Push enabled on your device. You can manage Push Notifications in the Device Manager or in the My Profile section of the app.</p></div>");

                    $rootScope.systemError = true;
                }
                else if (err.failure_data && err.failure_data.locked == "true") {
                    setInnerHTML('customUI', "<div class='omni-modal-body'><p class='error general' role='alert' aria-live='assertive'>Hmm. Something you've entered isn't quite right, so we've locked your account to ensure your security. Login Assist can help.</p></div>");
                    setInnerHTML('authenticatorheader', '');

                    $rootScope.systemError = true;
                }
                // Defect #27241 - User locked after 3rd OTP error 
                else if (err.failure_data && err.failure_data.locked == true) {
                    if (idShieldService.isTuxLogin()) {
                        idShieldService.loginAssit(true, false, true, "");
                    } else {
                        $rootScope.$broadcast('UserLocked');
                        document.getElementById('otpLockError').removeAttribute("style");
                        document.getElementById("changeAuth").setAttribute("disabled", "true");
                        document.getElementById("changeAuth").style.visibility = "hidden";
                        $rootScope.$broadcast('lockoutUser', null);
                    }
                }
                else if (err.data && err.data.assertion_error_code && err.data.assertion_error_code == 6 && err.data.assertion_error_message && err.data.assertion_error_message.indexOf("MobileApprove") > 0) {
                    setInnerHTML('customUI', "<div class='omni-modal-body'><p class='error general' role='alert' aria-live='assertive'>Hmm. Something you've entered isn't quite right, so we've locked your account to ensure your security. Login Assist can help.</p></div>");
                    setInnerHTML('authenticatorheader', '');

                    $rootScope.systemError = true;
                }
                else if ((err.failure_data && err.failure_data.action == "reject" && err.failure_data.code == 3) ||
                    (err.xmapiError && err.xmapiError.name && err.xmapiError.name == "allAuthenticatorsLocked")) {
                    setInnerHTML('customUI', "<div class='omni-modal-body'><p class='error general' role='alert' aria-live='assertive'>Hmm. Something you've entered isn't quite right, so we've locked your account to ensure your security. Login Assist can help.</p></div>");
                    setInnerHTML('authenticatorheader', '');

                    $rootScope.systemError = true;
                } else if (err.name && err.name == "Cancel") {
                    $rootScope.systemError = true;
                }
                // Handling the Mobile Approval reject scenario
                // This will be executed on 3rd invalid attempt of Push Approval and user is locked as well.
                else if (err && err.indexOf && err.indexOf("failed to authenticate") > -1) {
                    setInnerHTML('customUI', "<div class='omni-modal-body'><p class='error' role='alert' aria-live='assertive'>Authorization on mobile device was denied.</p></div>");
                    setInnerHTML('authenticatorheader', '');

                    $rootScope.systemError = true;
                }
                else if (err.failure_data && err.failure_data.action == "reject" && err.failure_data.code == 900 && err.failure_data.reason == "VOIP") {
                    // Hides the Overlay. But the user will see the overlay kind of blinking.					
                    // TODO
		    if (tsModalInstance) tsModalInstance.dismiss();

                    $rootScope.systemError = true;
                    return;
                }
                else {
                    setInnerHTML('customUI', "<div class='omni-modal-body'><p class='error' role='alert' aria-live='assertive'>We're sorry. We are having problems on our end. It shouldn't be too long, so please try again shortly.</p></div>");
                    setInnerHTML('authenticatorheader', '');

                    $rootScope.systemError = true;
                }
            }

            function authPromiseOnSuccess(username, requestParameter, auth, successHandler, $scope, $rootScope, modalInstance, TransmitAppID, SASiteCatService, xm) {
                saBusyService.busyEnd('transmitAuthentication');
                resetUIElements();
                onAuthSuccess();

                var response = {};
                response.Success = true; // For OLB
                response.result = "success"; // Matching with mobile
                response.token = auth.token;
                response.resData = auth.jsonData; // For MNO
                if ($scope.isQa) response.isQa = $scope.isQa;
                response.DeviceID = xm.SessionStorage.getItem(xm.SessionStorage.deviceIdKey(username));

                successHandler(response);
            };

            function authPromiseOnError(username, requestParameter, err, failureHandler, $scope, $rootScope, modalInstance, TransmitAppID, SASiteCatService) {// Respond here to unsuccessful authentication
                saBusyService.busyEnd('transmitAuthentication');

                logger.error('TS Error');
                logger.error(err);

                $rootScope.$broadcast('busy.end', { remaining: 0 });
                $rootScope.loading = false;

                var disablingDiv = document.getElementById('disablingDiv');
                if (disablingDiv) disablingDiv.style.display = 'none'; //defect fix 22590

                // When User Cancelled the challenge
                if (err && err.name && err.name.toLowerCase() === "cancel") {
                    authenticationCancelled = true;
                    authenticationErrored = false;

                    resetUIElements();
                    if (requestParameter.modelDialogOnClose) {
                        saBusyService.busyBegin('cancelAction');
                        requestParameter.modelDialogOnClose();
                    }
                    onAuthCancel();
                    return;
                }

                onAuthFailure(err);

                if (err && err.indexOf && err.indexOf("failed to authenticate") > -1) {
                    failureHandler(processError(err));
                } else { failureHandler(processError(parseError(err))); }

                if (TransmitAppID != "mbl") {
                    SASiteCatService.onTrackSATransmitLogin("LoginWidget", "StepupAuthFailed", null, true);
                }
                else
                    SASiteCatService.onTrackSATransmitMobileLogin("Mobile", "StepupAuthFailed", null);

                authenticationCancelled = false;
                authenticationErrored = true;

                resetUIElements(TransmitAppID);
                $timeout(function () { showErrorMessageInUI(err, $rootScope) }, 0);                
            };

            function invokeCallbaks(callbackLists, eventArgs) {
                if (!callbackLists || callbackLists.length == 0) return;

                callbackLists.forEach(function (callback) {
                    callback(eventArgs);
                });
            }

            function onAuthChange(eventArgs) {
                invokeCallbaks(authChangeCallbacks, eventArgs);
            }

            function onAuthCancel(eventArgs) {
                invokeCallbaks(authCancelCallbacks, eventArgs);
            }

            function onAuthSuccess(eventArgs) {
                invokeCallbaks(authSuccessCallbacks, eventArgs);
            }

            function onAuthFailure(eventArgs) {
                invokeCallbaks(authFailureCallbacks, eventArgs);
            }

            var showOptions = function (modalInstance, pathToRedirect, username, successHandler, failureHandler, TransmitAppID, TransmitPolicy, TransmitURL, requestParameter, $scope, additionalParams, SASiteCatService, $rootScope, dataContainer) {
                saBusyService.initiateBusy('transmitAuthentication',
                    {
                        busyElement: requestParameter.busyElement,
                        busyClass: requestParameter.busyClass
                    });

                authenticationCancelled = false;
                authenticationErrored = false;

                unHandledRejectionHandler = function (err) {
                    var reason = (err && err.reason) ? err.reason : err;
                    authPromiseOnError(username, requestParameter, reason, failureHandler, $scope, $rootScope, modalInstance, TransmitAppID, SASiteCatService);
                };

                transmitEventsService.init($scope, $rootScope);

                if (TransmitPolicy == "mno_zelle") {
                    $rootScope.$broadcast('busy.begin');
                }

                setaspnetCookie(additionalParams);

                require(['xm/xmui', 'xm/xm_api'], function (xmui, xm) {

                    if (additionalParams) {
                        additionalParams.ActimizeData = requestParameter.actimizeData;
                    }
                    else {
                        additionalParams = { ActimizeData: requestParameter.actimizeData };
                    }

                    var uiConf = {
                        "loginConf": {
                            "aid": TransmitAppID,
                            "policy": TransmitPolicy,
                            "additionalParams": additionalParams
                        },

                        "authenticationMethodPromiseOverrides": {
                            otp: {
                                "input.numeric": promiseCustomOTPInput, // Callback for authenticator 'otp', callback type 'input'
                                recover: otpRecoverCallback,
                                targetSelection: promiseAuthOtpTargetSelectionInput
                            },
                            mobileApprove: {
                                input: promiseCustomMobileApproveInput,
                                recover: mobileRecoverCallback,
                                deviceSelection: promiseCustomMobileApproveInput
                            },
                            otpSelect: promiseAuthOtpTargetSelectionInput,
                            question: {
                                input: promiseAuthQuestionInput,
                                recover: qaRecoverCallback
                            },
                            methodMenu2: promiseMethodMenuInput,
                            mobileApproveSelect: promiseAuthMobileAuthSelectDeviceInput,
                            placeholder_qa: {
                                input: promiseAuthPlaceholderIDSheild
                            },
                            placeholder_password_pld: {
                                input: promiseAuthPlaceholderPassword
                            }
                        }

                    };

                    //Configure transmit
                    xmui.configure(uiConf);
                    //set transmit server url
                    xm.setWebloginUrl(TransmitURL);
                    // Kickstart precollection of device attributes
                    xm.preCollect();

                    xm.setJsonDataCallback(function (jsonData, uiContext) {
                        if (dataContainer) dataContainer.stepupData = jsonData;
                    });

                    (function (routeHandlers) {
                        var uiContainer = document.all('uiContainer');
                        $('#customUI').html('');
                        $("#customUI").focus();

                        var authResultPromise = xmui.startAuthUi(username, uiContainer);

                        //defect fix 20097
                        setTimeout(function () {
                            var dom = document.getElementsByClassName("modal fade ng-isolate-scope in")[0];
                            if (dom != undefined && dom != "") {
                                dom.setAttribute("role", "dialog");
                                dom.removeAttribute("ng-click"); // fix for VO reading as clickable
                                dom.setAttribute("id", "overlayModalContainer");
                                dom.setAttribute("aria-labelledby", "authenticatorheader");
                            }
                        }, 1000);

                        authResultPromise.then(
                            function (response) {
                                authPromiseOnSuccess(username, requestParameter, response, successHandler, $scope, $rootScope, modalInstance, TransmitAppID, SASiteCatService, xm);
                            },
                            function (response) {
                                authPromiseOnError(username, requestParameter, response, failureHandler, $scope, $rootScope, modalInstance, TransmitAppID, SASiteCatService);
                            });
                    })();

                    function promiseMethodMenuInput(methods, uiContext) {

                        return new Promise(function (accept, reject) {
                            transmitEventsService.stashContext(xm, accept, reject, null, requestParameter, "METHODMENU");

                            if (!transmitEventsService.userChangingAuthenticator()) {
                                var selectedMethod = transmitEventsService.getMethodForCurrentFlow(methods);
                                if (selectedMethod) accept(selectedMethod);
                                return;
                            }

                            $scope.methods = methods;
                            onAuthChange(transmitEventsService.getCurrentEventDetails());
                            $scope.navigatePage('authOptions', methods);
                            saBusyService.busyEnd('transmitAuthentication', $scope, {}, {});
                        });
                    }

                    function promiseAuthPlaceholderIDSheild(methodConfig, uiContext) {
                        $scope.isQa = true;

                        return new Promise(function (accept, reject) {
                            var context = methodConfig.placeholderContextData;
                            requestParameter.ContextData = context;
                            transmitEventsService.stashContext(xm, accept, reject, methodConfig, requestParameter, "IDSHIELD");
                            onAuthChange(transmitEventsService.getCurrentEventDetails());
                            $scope.navigatePage("idshield", requestParameter);                            
                            $rootScope.$broadcast('loadCompleted');
                        });
                    }

                    function promiseAuthPlaceholderPassword(methodConfig, uiContext) {

                        return new Promise(function (accept, reject) {
                            var context = methodConfig.placeholderContextData;
                            requestParameter.ContextData = context;
                            transmitEventsService.stashContext(xm, accept, reject, methodConfig, requestParameter, "PWD");
                            onAuthChange(transmitEventsService.getCurrentEventDetails());
                            $scope.navigatePage("password", requestParameter);
                            saBusyService.busyEnd('transmitAuthentication', $scope, {}, {});
                        });
                    }

                    function promiseCustomMobileApproveInput(methodConfig, uiContext) {

                        return new Promise(function (accept, reject) {
                            transmitEventsService.stashContext(xm, accept, reject, methodConfig, requestParameter, "PUSH");
                            onAuthChange(transmitEventsService.getCurrentEventDetails());
                            return JSON.stringify({});
                        });
                    }

                    function promiseAuthOtpTargetSelectionInput(methodConfig, uiContext) {

                        return new Promise(function (accept, reject) {
                            transmitEventsService.stashContext(xm, accept, reject, methodConfig, requestParameter, "OTPTARGET");
                            $rootScope.$broadcast('loadCompleted');
                            onAuthChange(transmitEventsService.getCurrentEventDetails());
                            $scope.navigatePage('otpTarget', methodConfig);
                            saBusyService.busyEnd('transmitAuthentication', $scope, {}, {});
                        });
                    }

                    function mobileRecoverCallback(cflowContext, methodData, assertionResponse, context) {

                        saBusyService.busyEnd('transmitAuthentication', $scope, {}, {});
                        var errorMessage = getErrorMessage(cflowContext, SASiteCatService);
                        setInnerHTML('mobError', errorMessage);

                        if (errorMessage == "locked") {
                            var changeAuthElement = document.getElementById("changeAuth");

                            if (changeAuthElement) {
                                changeAuthElement.setAttribute("disabled", "true");
                                changeAuthElement.style.visibility = "hidden";
                            }
                            $rootScope.$broadcast('lockoutUser', null);

                        }

                        return Promise.resolve(xm.AssertionErrorHandlerResponse.RetryMethod);
                    }

                    function qaRecoverCallback(cflowContext, methodData, assertionResponse, context) {

                        setInnerHTML('qaError', getErrorMessage(cflowContext, SASiteCatService));
                        return Promise.resolve(xm.AssertionErrorHandlerResponse.RetryMethod);
                    }

                    function promiseAuthQuestionInput(methodConfig, uiContext) {
                        console.log('promiseAuthQuestionInput');
                    }

                    function promiseAuthMobileAuthSelectDeviceInput(methodConfig, uiContext) {

                        return new Promise(function (accept, reject) {
                            transmitEventsService.stashContext(xm, accept, reject, methodConfig, requestParameter, "PUSHTARGET");
                            onAuthChange(transmitEventsService.getCurrentEventDetails());
                            $scope.navigatePage('mobApprove', methodConfig);
                            saBusyService.busyEnd('transmitAuthentication', $scope, {}, {});
                        });
                    }

                    function otpRecoverCallback(cflowContext, methodData, assertionResponse, context) {
                        // Here we need to show a cancel dilog and inform user that entred otp is wrong. and prompt
                        // for cancel,retry or change auth method. based ont he response from user
                        // resolve the promise with Retry / Cancel / Change method.
                        saBusyService.busyEnd('transmitAuthentication', $scope, {}, {});
                        var errMsg = getErrorMessage(cflowContext, SASiteCatService); // "Please enter correct OTP";
                        if (errMsg == "locked") {
                            //Added for Tux Login User Lock  Defect # 24849
                            if (idShieldService.isTuxLogin()) {
                                idShieldService.loginAssit(true, false, true, "");
                            } else {

                                $rootScope.$broadcast('UserLocked');

                                document.getElementById('otpLockError').removeAttribute("style");
                                document.getElementById("changeAuth").setAttribute("disabled", "true");
                                document.getElementById("changeAuth").style.visibility = "hidden";
                                $rootScope.$broadcast('lockoutUser', null);
                            }
                        }
                        else {
                            setInnerHTML('otpError', errMsg);
                            document.getElementById("otpCode").value = ""; //defect fix 20739
                            document.getElementById("otpCode").focus();
                        }

                        return Promise.resolve(xm.AssertionErrorHandlerResponse.RetryMethod);
                    }

                    function promiseCustomOTPInput(methodConfig, uiContext) {

                        return new Promise(function (accept, reject) {
                            transmitEventsService.stashContext(xm, accept, reject, methodConfig, requestParameter, "OTP");

                            methodConfig.hideChangeAuth = requestParameter.hideChangeAuth;
                            methodConfig.showCancel = requestParameter.showCancel;
                            methodConfig.showOTPHeader = requestParameter.showOTPHeader;
                            methodConfig.hideRule = requestParameter.hideRule;

                            $rootScope.$broadcast('loadCompleted');
                            onAuthChange(transmitEventsService.getCurrentEventDetails());
                            if (requestParameter.TransactionID == "MobileCapture") { $scope.navigatePage('inputOTPCodeMNC', methodConfig); }
                            else { $scope.navigatePage('inputOTPCode', methodConfig); }
                            saBusyService.busyEnd('transmitAuthentication', $scope, {}, {});
                        });
                    }

                });

                function getErrorMessage(cflowcontext, SASiteCatService) {
                    if (cflowcontext) {
                        var isMobile = (TransmitAppID == "mbl");
                        switch (cflowcontext.data.assertion_error_code) {
                            case 5: //Authentication failed - secret/credentials passed as part of the assertion are incorrect.
                                if (isMobile)
                                    SASiteCatService.onTrackSATransmitMobileLogin("Mobile", "StepupEnterOTPUserError", null);
                                else if ($scope.iswidget !== undefined)
                                    SASiteCatService.onTrackSATransmitLogin("LoginWidget", "StepupEnterOTPUserError", null, true);
                                else
                                    SASiteCatService.onTrackCustomSharedStepUp("StepUpAuthentication", "AuthenticationOTPIncorrectError");

                                if (cflowcontext.data.data !== null &&
                                    cflowcontext.data.data.locked !== null &&
                                    cflowcontext.data.data.locked == true) {
                                    return "locked";
                                    break;
                                }
                                if ($rootScope.IsTempAccessFlow) {
                                    return "Hmm. That code doesn't match our records. Please try again.";
                                } else {
                                    return "That seems to be the wrong code. Please try again.";
                                }
                                break;
                            case 9: //Internal error
                                if (isMobile)
                                    SASiteCatService.onTrackSATransmitMobileLogin("Mobile", "StepupAuthSystemError", null);
                                else
                                    SASiteCatService.onTrackSATransmitLogin("LoginWidget", "StepupAuthSystemError", null, true);
                                return "We're sorry. We are having problems on our end. It shouldn't be too long, so please try again shortly.";
                                break;
                            case 6: //User is locked.
                                if (isMobile)
                                    SASiteCatService.onTrackSATransmitMobileLogin("Mobile", "StepupEnterOTPUserLockedError", null);
                                else
                                    SASiteCatService.onTrackSATransmitLogin("LoginWidget", "StepupEnterOTPUserLockedError", null, true);
                                //SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationOTPLockedError");
                                return "locked";
                                break;
                            case 12: //User is locked.
                                $rootScope.isUserLocked = true;
                                if (isMobile)
                                    SASiteCatService.onTrackSATransmitMobileLogin("Mobile", "StepupEnterOTPUserLockedError", null);
                                else
                                    SASiteCatService.onTrackSATransmitLogin("LoginWidget", "StepupEnterOTPUserLockedError", null, true);
                                //SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationOTPLockedError");
                                return "locked";
                                break;
                            case 13: //Used by ''Mobile Approve'' method only - indicates that approval is still pending.
                                if (isMobile)
                                    SASiteCatService.onTrackSATransmitMobileLogin("Mobile", "StepupMobileApprovePendingError", null);
                                else
                                    SASiteCatService.onTrackSATransmitLogin("LoginWidget", "StepupMobileApprovePendingError", null, true);
                                return "Your approval is still pending.";
                                break;
                            case 21: //Approval is expired.
                                if (isMobile)
                                    SASiteCatService.onTrackSATransmitMobileLogin("Mobile", "StepupMobileApproveExpiredError", null);
                                else
                                    SASiteCatService.onTrackSATransmitLogin("LoginWidget", "StepupMobileApproveExpiredError", null, true);
                                return "Approval is expired.";
                                break;
                            default:
                                if (isMobile)
                                    SASiteCatService.onTrackSATransmitMobileLogin("Mobile", "StepupAuthSystemError", null);
                                else
                                    SASiteCatService.onTrackSATransmitLogin("LoginWidget", "StepupAuthSystemError", null, true);
                                return "We're sorry. We are having problems on our end. It shouldn't be too long, so please try again shortly.";
                        }
                    }
                }

                $scope.$on('redirectToTuxLogin', function (event, data) {
                    if (!data.isError) {
                        dataContainer.RedirectToLogin();
                    }
                    else {
                        dataContainer.RedirectToLoginWithError();
                    }
                });

                $scope.$on('redirectToResetPassword', function (event, data) {
                    var isChangePassword = false;
                    var existingPassword = "";
                    if (data != null && data.isChangePassword != undefined && data.isChangePassword) {
                        isChangePassword = true;
                        existingPassword = data.existingPassword;
                    }
                    dataContainer.RedirectToResetOrChangePassword(isChangePassword, existingPassword);
                });
            };

            var extendSession = function () {
                var additionalParams = {};
                setaspnetCookie(additionalParams);

                require(['xm/xmui', 'xm/xm_api'], function (xmui, xm) {
                    var uiConf = {
                        "loginConf": {
                            "aid": TransmitAppID,
                            "policy": 'heartbeat',
                            "additionalParams": additionalParams
                        }
                    };

                    xmui.configure(uiConf);
                    var uiContainer = document.all('customUI');
                    var authResultPromise = xmui.startAuthUi(username, uiContainer);
                    authResultPromise.then(
                        function (response) { },
                        function (response) { });
                });
            };

            var onAuthenticatorsChanged = function (callback) {
                authChangeCallbacks.push(callback);
            };

            var onAuthenticatorsCancelled = function (callback) {
                authCancelCallbacks.push(callback);
            };

            var onAuthenticatorSuccess = function (callback) {
                authSuccessCallbacks.push(callback);
            };

            var onAuthenticatorFailure = function (callback) {
                authFailureCallbacks.push(callback);
            };

            return {
                showOptions: showOptions,
                extendSession: extendSession,
                onAuthenticatorsChanged: onAuthenticatorsChanged,
                onAuthenticatorCancelled: onAuthenticatorsCancelled,
                onAuthenticatorSuccess: onAuthenticatorSuccess,
                onAuthenticatorFailure: onAuthenticatorFailure,
                isAuthenticationCancelled: function () { return authenticationCancelled; },
                iAuthenticationErrored: function () { return authenticationErrored; },
                setModalInstance: function(modalInstance) { tsModalInstance = modalInstance },
                clearEventHandlers: function () {
                    authChangeCallbacks = [];
                    authCancelCallbacks = [];
                    authSuccessCallbacks = [];
                    authFailureCallbacks = [];
                }
            };
        }]);
})();

(function () {
    'use strict';

    angular.module('sharedAuthStepUp')
        .factory('transmitEventsService', ['SASiteCatService', '$state', 'saLoggingService', 'idShieldService', function (SASiteCatService, $state, logger, idShieldService) {
            var acceptCallback;
            var rejectCallback;
            var tsSDK;
            var currentMethodConfig;
            var currentRequestParameter;
            var currentControlFlowHasMultipleAuthenticators = false;
            var isTryingToChangeAuthenticator = false;
            var authenticatorsForCurrentFlow = null;
            var _currentAuthenticator = null;
            var _previousAuthenticator = null;
            var _containerScope;
            var _containerRootScope;

            var _navigatePage = function (pageName, params) {
                if (_containerScope.navigatePage) {
                    _containerScope.navigatePage(pageName, params);
                    return;
                }

                $state.go(pageName, { transmitParams: params });
            };

            var _getSelectedMethod = function (methods, authType) {
                var result = null;
                methods.map(function (method) {
                    if (method.type == authType) {
                        result = method;
                    }
                })
                return result;
            };

            var _hasDevices = function (methods) {
                for (var i = 0; i < methods.length; i++) {
                    if (methods[i] && methods[i].type == "mobile_approve") {
                        if (methods[i].selectable_devices && methods[i].selectable_devices.length > 0) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                };
            };

            var _selectedTargetForOTP = function (data) {

                var channel = currentMethodConfig.channels[0];
                for (var target in channel.targets) {
                    if (channel.targets[target] == data) {
                        acceptCallback(target);
                    }
                }
            };

            var _selectedTargetForPUSH = function (data) {

                var deviceIds = Array.isArray(data) ? data : [data];
                acceptCallback(deviceIds);
                _navigatePage('pendingApproval', currentMethodConfig);

            };

            var stashContext = function (xm, accept, reject, methodConfig, requestParameter, currentAuthenticator) {
                acceptCallback = accept;
                rejectCallback = reject;
                tsSDK = xm;
                currentMethodConfig = methodConfig;
                requestParameter.hideChangeAuth = !hasMultipleAuthenticators();
                currentRequestParameter = requestParameter;
                _previousAuthenticator = _currentAuthenticator;
                _currentAuthenticator = currentAuthenticator;

                if (_currentAuthenticator === 'METHODMENU')
                    $('.close').hide();
                else
                    $('.close').show();

                logger.debug('Selected authenticator: ' + _currentAuthenticator);
            };

            var changeAuthenticator = function () {
                isTryingToChangeAuthenticator = true;

                if (acceptCallback)
                    acceptCallback({ "cancelAction": tsSDK.CancelFlowActions.ChangeMethod });

                logger.debug('Changing from authenticator: ' + _currentAuthenticator);
            };

            var retryAuthenticator = function () {
                if (acceptCallback)
                    acceptCallback({ "cancelAction": tsSDK.CancelFlowActions.Retry });

                if (_currentAuthenticator === "PUSH")
                    _navigatePage('mobApprove', currentMethodConfig);

                $('.close').show();
                logger.debug('Retrying authenticator: ' + _currentAuthenticator);
            };

            var cancelAuthenticator = function () {
                if (_currentAuthenticator === 'METHODMENU') return;

                if (acceptCallback)
                    acceptCallback({ "cancelAction": tsSDK.CancelFlowActions.Cancel });

                logger.debug('Cancelling authenticator: ' + _currentAuthenticator);
            };

            var verifyOTP = function (otpCode) {
                logger.debug('Verifying OTP');

                if (acceptCallback)
                    acceptCallback({ "otp": otpCode });
            };

            var resendOTP = function () {
                logger.debug('Resending OTP');

                var data = '{"command": "resend" }';
                var str = JSON.parse(data);
                if (acceptCallback)
                    acceptCallback(str);
            };

            var selectedTarget = function (data) {

                if (_currentAuthenticator === 'PUSHTARGET') {
                    _selectedTargetForPUSH(data);
                } else {
                    _selectedTargetForOTP(data);
                }

                logger.debug('Selected target for authenticator: ' + _currentAuthenticator);
            };

            var setMethodsForCurrentFlow = function (methods) {
                authenticatorsForCurrentFlow = methods;
            };

            var getMethodForCurrentFlow = function (methods) {
                if (!methods) return null;
                authenticatorsForCurrentFlow = methods;
                currentControlFlowHasMultipleAuthenticators = (methods.length > 1);

                var selected = null;
                var lastUsed = 0;
                methods.forEach(function (currentMethod) {
                    if (!currentMethod.locked && !currentMethod.expired && (currentMethod.last_used > lastUsed)) {
                        selected = currentMethod;
                        lastUsed = currentMethod.last_used;
                    }
                });

                return selected;
            };

            var displayAuthOptions = function ($scope, methods, data) {
                var selectedMethod = _getSelectedMethod(methods, data);
                var allowMobileApprove = _hasDevices(methods);

                // Resetting the flag used to identify the user was trying to change the authenticator
                isTryingToChangeAuthenticator = false;

                if (_containerScope.trackedMethod != selectedMethod.type) {
                    switch (selectedMethod.type) {
                        case 'otp':
                            if (typeof _containerScope.transmitappid !== 'undefined' && _containerScope.transmitappid == "mbl") {
                                SASiteCatService.onTrackSATransmitMobileLoginClickEvent("Mobile", "ChangeAuthOTPLink");
                            }
                            else {
                                if (typeof _containerScope.iswidget !== 'undefined') {
                                    SASiteCatService.onTrackSATransmitLoginClickEvent("LoginWidget", "ChangeAuthOTPLink", _containerScope.iswidget);
                                }
                                else
                                    SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationOTPLink");
                            }
                            _containerScope.trackedMethod = 'otp';
                            break;
                        case 'placeholder_qa':
                            if (typeof _containerScope.transmitappid !== 'undefined' && _containerScope.transmitappid == "mbl") {
                                SASiteCatService.onTrackSATransmitMobileLoginClickEvent("Mobile", "ChangeAuthQALink");
                            }
                            else {
                                if (typeof _containerScope.iswidget !== 'undefined') {
                                    SASiteCatService.onTrackSATransmitLoginClickEvent("LoginWidget", "ChangeAuthQALink", _containerScope.iswidget);
                                } else
                                    SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationQALink");
                            }

                            _containerScope.trackedMethod = 'placeholder_qa';
                            break;
                        case 'mobile_approve':
                            if (typeof _containerScope.transmitappid !== 'undefined' && _containerScope.transmitappid == "mbl") {
                                SASiteCatService.onTrackSATransmitMobileLoginClickEvent("Mobile", "ChangeAuthMobApproveLink");
                            }
                            else {
                                if (typeof _containerScope.iswidget !== 'undefined') {
                                    SASiteCatService.onTrackSATransmitLoginClickEvent("LoginWidget", "ChangeAuthMobApproveLink", _containerScope.iswidget);
                                }
                                else
                                    SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationApproveLink");
                            }
                            _containerScope.trackedMethod = 'mobile_approve';
                            break;
                        case 'placeholder_password_pld':
                            SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationPasswordLink");
                            _containerScope.trackedMethod = 'placeholder_password_pld';
                            break;
                    }
                }

                if (selectedMethod.type != 'mobile_approve') {
                    acceptCallback(selectedMethod);
                }
                else {
                    if (allowMobileApprove) {
                        acceptCallback(selectedMethod);
                    }
                    else {
                        rejectCallback(selectedMethod);
                    }
                }

                logger.debug('Displaying Auth Options');
            };

            var invokeSuccessHandler = function (data) {
                if (acceptCallback)
                    acceptCallback(data);
            };

            var invokeRejectHandler = function (data) {
                if (rejectCallback)
                    rejectCallback(data);
            };

            var hasMultipleAuthenticators = function (hasMultiple) {
                if (hasMultiple === true || hasMultiple === false)
                    currentControlFlowHasMultipleAuthenticators = hasMultiple;

                return currentControlFlowHasMultipleAuthenticators;
            };

            var userChangingAuthenticator = function () {
                return isTryingToChangeAuthenticator;
            };

            var showAuthCancelConfirmation = function () {
                $('.close').hide();
                _navigatePage("cancelauth", currentRequestParameter);
            };

            var init = function (scope, rootScope) {
                currentControlFlowHasMultipleAuthenticators = false;
                isTryingToChangeAuthenticator = false;

                _containerScope = scope;
                _containerRootScope = rootScope;
            };

            return {
                init: init,
                stashContext: stashContext,
                changeAuthenticator: changeAuthenticator,
                retryAuthenticator: retryAuthenticator,
                cancelAuthenticator: cancelAuthenticator,
                hasMultipleAuthenticators: hasMultipleAuthenticators,
                userChangingAuthenticator: userChangingAuthenticator,
                setMethodsForCurrentFlow: setMethodsForCurrentFlow,
                getMethodForCurrentFlow: getMethodForCurrentFlow,
                selectedTarget: selectedTarget,
                displayAuthOptions: displayAuthOptions,
                invokeSuccessHandler: invokeSuccessHandler,
                invokeRejectHandler: invokeRejectHandler,
                verifyOTP: verifyOTP,
                resendOTP: resendOTP,
                showAuthCancelConfirmation: showAuthCancelConfirmation,
                getCurrentEventDetails: function () {
                    return {
                        requestParameter: currentRequestParameter,
                        previousAuthenticator: _previousAuthenticator,
                        currentAuthenticator: _currentAuthenticator
                    };
                }
            };
        }]);
})();

(function () {
    'use strict';
    angular.module('sharedAuthStepUp')
        .factory('saLoggingService', function () {

            var error = function (message) {
                try {
                    if (window.console) {
                        window.console.error(message);
                    }
                }
                catch (ex) { }
            };

            var debug = function (message) {
                try {
                    if (window.console) {
                        window.console.debug(message);
                    }
                }
                catch (ex) { }
            };


            return {
                error: error,
                debug: debug
            };
        });
})();

(function (window, angular, undefined) {
    'use strict';

    angular.module('sharedAuthStepUp')
        .provider('sabusyInterceptor', function () {

            this.$get = ['$rootScope', '$q', 'saBusyService', function ($rootScope, $q, saBusyService) {
                var _total = 0, _completed = 0;

                function complete() {
                    _total = _completed = 0;
                }

                function handleResponse(r) {
                    saBusyService.busyEnd();
                    if (_completed >= _total) complete();
                }

                return {
                    outstanding: function () {
                        return _total - _completed;
                    },
                    'request': function (config) {
                        saBusyService.busyBegin();
                        return config || $q.when(config);
                    },
                    'response': function (response) {
                        handleResponse(response);
                        return response;
                    },
                    'responseError': function (rejection) {
                        handleResponse(rejection);
                        return $q.reject(rejection);
                    }
                };
            }];
        })
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('sabusyInterceptor');
        }]);

    angular.module('sharedAuthStepUp')
        .directive('saBusy', ['$parse', '$timeout', 'saBusyService', function ($parse, $timeout, saBusyService) {
            return {
                restrict: 'A',
                tranclude: true,
                scope: {},
                controller: ['$scope', function ($scope) {
                    this.setBusyMessageElement = function (element) {
                        $scope.busyMessageElement = element;
                    }
                }],
                link: function (scope, element, attrs) {

                    scope.busyElementID = attrs['busyElement'];
                    scope.busyElementClassName = attrs['busyClass'];
                    scope.startAsBusy = attrs['startAsBusy'];

                    scope.isWidget = false;
                    saBusyService.addLoadingTemplate(
                        scope.busyElementID,
                        scope.busyElementClassName,
                        scope.startAsBusy);
                }
            }
        }]);

    angular.module('sharedAuthStepUp')
        .factory('saBusyService', function () {

            var isBusy;
            var busyElementId = 'divLoading';
            var busyElementClass = 'sa__loader';

            var currentTrx;
            var isBusyFor = function (name, isBusyBegin) {
                if (!isBusyBegin) {
                    if (currentTrx) {
                        var result = (name === currentTrx);
                        if (result) currentTrx = undefined;

                        return result;
                    }
                    else
                        return true;
                }

                if (currentTrx && name) {
                    return name === currentTrx;
                }
                else if (name) {
                    currentTrx = name;
                    return true;
                }
                return true;
            };

            var busyBegin = function (name, config, evt) {
                config = config || {};

                var element = angular.element($('#' + busyElementId));
                if (!isBusy && isBusyFor(name, true)) {

                    if (config.busyDisabled) $timeout(function () {
                        element.attr('disabled', true);
                    });

                    var msgElement = config.busyMessageElement ? config.busyMessageElement.clone() : null;
                    if (msgElement || config.busyMessage) element.html('').append(msgElement || scope.busyMessage);

                    element.addClass(busyElementClass);

                    if (config.isWidget === true) {
                        angular.forEach(document.querySelectorAll('.tabDisableOnBusy'), function (v) {
                            angular.element(v).removeAttr('tabindex');
                            angular.element(v).attr('tabindex', '-1');
                        });
                    }
                    $('body').css('user-select', 'none');
                    angular.forEach(document.querySelectorAll('input'), function (v) {
                        angular.element(v).removeAttr('tabindex');
                        angular.element(v).attr('tabindex', '-1');
                    });
                    angular.forEach(document.querySelectorAll('a'), function (v) {
                        angular.element(v).removeAttr('tabindex');
                        angular.element(v).attr('tabindex', '-1');
                    });
                    angular.forEach(document.querySelectorAll('button'), function (v) {
                        angular.element(v).removeAttr('tabindex');
                        angular.element(v).attr('tabindex', '-1');
                    });
                    $("#spinerSpan").text('Loading please wait.');
                    $(".contentHolder").removeClass('hide');
                    $(".loadingSpinner").attr('aria-busy', 'true');

                    isBusy = true;
                }
            };

            var busyEnd = function (name, config, evt) {
                config = config || {};

                var element = angular.element($('#' + busyElementId));
                if (isBusy && isBusyFor(name, false)) {
                    element.attr('disabled', config.notBusyDisabled === true);
                    element.removeClass(busyElementClass);

                    if (config.isWidget === true) {
                        angular.forEach(document.querySelectorAll('.tabDisableOnBusy'), function (v) {
                            angular.element(v).removeAttr('tabindex');
                            angular.element(v).attr('tabindex', '0');
                        });
                    }

                    $('body').css('user-select', 'auto');
                    angular.forEach(document.querySelectorAll('input'), function (v) {
                        angular.element(v).removeAttr('tabindex');
                        angular.element(v).attr('tabindex', '0');
                    });
                    angular.forEach(document.querySelectorAll('a'), function (v) {
                        angular.element(v).removeAttr('tabindex');
                        angular.element(v).attr('tabindex', '0');
                    });
                    angular.forEach(document.querySelectorAll('button'), function (v) {
                        angular.element(v).removeAttr('tabindex');
                        angular.element(v).attr('tabindex', '0');
                    });


                    $("#spinerSpan").text('');
                    $(".loadingSpinner").attr('aria-busy', 'false');
                    isBusy = false;
                }
            };

            function bindLoadingTemplate(element, startAsBusy) {
                if (!element) return;
                if ($("#" + busyElementId).length) return;

                // -- This change is to handle dotCom UXRefreshWidget scenario.
                // The code checks whether the current page uses ng-busy 
                // (by checking elements with the attribute 'busy-add-classes'. 
                // If the page has any element with this attribute, then we'll piggy back to that element 
                // to display the busyIcon.

                var ngBusyElement = $("div[busy-add-classes]");
                if (ngBusyElement.length) {
                    ngBusyElement.attr('id', busyElementId);
                    return;
                }

                var ieVersion = getIEVersion();
                var loader = (ieVersion == 8 || ieVersion == 9) ? $('<div></div >') :
                    $('<div><div class="loadingSpinner"><div class="holder"><div class="bar1"></div><div class="bar2"></div><div class="bar3"></div><div class="bar4"></div><div class="bar5"></div><div class="bar6"></div><div class="bar7"></div><div class="bar8"></div><div class="bar9"></div><div class="bar10"></div><div class="bar11"></div><div class="bar12"></div></div></div></div>');

                if (!loader) return;
                loader.attr('id', busyElementId);
                if (startAsBusy) loader.addClass(busyElementClass);

                element.prepend(loader);
            }

            function getIEVersion() {
                var rv = -1;
                var ua = navigator.userAgent;
                var re = ua.indexOf("MSIE") > -1 ? new RegExp("MSIE\\s([0-9]{1,}[\\.0-9]{0,})") : new RegExp("Trident/.*?rv:([0-9]{1,}[\\.0-9]{0,})");
                var result = re.exec(ua);
                if (result != null && result[1] != null) rv = parseFloat(result[1]);
                return rv;
            };

            return {
                busyBegin: busyBegin,
                busyEnd: busyEnd,
                initiateBusy: function (name, config, evt) {
                    config = config || {};
                    busyElementId = config.busyElement || busyElementId;
                    busyElementClass = config.busyClass || busyElementClass;
                    bindLoadingTemplate($("body"), true);
                    busyBegin(name, config, evt);
                },
                addLoadingTemplate: function (elementID, busyClassName, startAsBusy) {
                    busyElementId = elementID || busyElementId;
                    busyElementClass = busyClassName || busyElementClass;
                    bindLoadingTemplate($("body"), startAsBusy);
                }
            };
        });

})(window, window.angular);