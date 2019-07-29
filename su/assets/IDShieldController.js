(function() {
    'use strict';

    angular
        .module("sharedAuthStepUp")
        .controller('IDShieldController', IDShieldController);

    IDShieldController.$inject = ['$scope', '$rootScope', '$state', '$location', '$http', 'idShieldService', 'SASiteCatService', 'transmitEventsService', 'saBusyService'];

    function IDShieldController($scope, $rootScope, $state, $location, $http, idShieldService, SASiteCatService, transmitEventsService, saBusyService) {

        var callInProgress = false;
        var tParams = $state.params.transmitParams;
        $rootScope.dialogHeading = null;
        $rootScope.dialogHeading = "ID Shield Questions";
        if (document.getElementById('stepupLiveAnnouncement') !== null) {
            document.getElementById('stepupLiveAnnouncement').innerHTML = 'ID Shield Questions, view loaded';
        }
        if (document.getElementById('sharedAuthID')) {
            document.getElementById('sharedAuthID').removeAttribute("style");
        }
        //setTimeout(function () { $("#overlayModalContainer").first().focus(); }, 600);
        //If Params null then don't execute.'
        if (!tParams) return;

        var transactionID = tParams.TransactionID;
        var BaseUrl = tParams.IDShieldBaseURL;
        var contextData = tParams.ContextData;
        var hasResumePlaceholder = tParams.hasResumePlaceholder;
        var appid = tParams.TransmitAppID;
        var signonid = tParams.username;
        var policyid = tParams.policyID || tParams.TransmitPolicy;
        var actimizedata = tParams.actimizeData ? tParams.actimizeData : "";
        var SessionGUID = tParams.SessionGUID;

        $scope.isMobileWeb = (appid == "mbl") ? false : true;
        $scope.hideChangeAuth = tParams.hideChangeAuth;

        $scope.CancelUrl = tParams.CancelURL;

        $('.sharedauth-loading').toggleClass('sharedauth-complete');
        $(".sharedauth-loading").attr('aria-busy', true);
        $(".sharedauth-loading").attr('aria-hidden', false);

        var idShieldObject = idShieldService.getIdshieldQuestions(BaseUrl, transactionID, signonid, SessionGUID).then(function(response) {
            //screen reader heading fix
            if (!$scope.isMobileWeb) {
                setTimeout(function() {
                    document.getElementById("sharedAuthstepUpContainer").setAttribute("role", "dialog");
                    document.getElementById("authenticatorheader").focus();
                }, 300);
            } else {
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
            }


            var disablingDiv = document.getElementById('disablingDiv');
            if (disablingDiv) disablingDiv.style.display = 'none'; //defect fix 22590

            if (!response || !response.data || response.data.ErrorCode !== 0 || !response.data.QestionText) {

                if (response && response.data && response.data.ErrorCode == 203) {
                    $rootScope.isUserLocked = true; //change for lock scenario.
                    $scope.lockErrorMessage = true;
                    if (!$('.sharedauth-loading').hasClass('sharedauth-complete')) {
                        $('.sharedauth-loading').toggleClass('sharedauth-complete');
                    }

                    if (appid != "mbl") {
                        $scope.isApp = false;
                        SASiteCatService.onTrackCustomSharedStepUp("StepUpAuthentication", "AuthenticationQALockout");
                    } else if (appid == "mbl") {
                        $scope.isApp = true;
                        $rootScope.$broadcast('NotifySiteCat', "100");
                        if (!$('.sharedauth-loading').hasClass('sharedauth-complete')) {
                            $('.sharedauth-loading').toggleClass('sharedauth-complete');
                        }
                    }

                    return;
                }

                if (appid != "mbl") {
                    if (typeof $scope.iswidget !== 'undefined') {
                        var dynamicValue = { "challengePolicy": $scope.transmitpolicy };
                        SASiteCatService.onTrackSATransmitLogin("LoginWidget", "TransmitEmptyQA", dynamicValue, $scope.iswidget);
                    }
                }

                $rootScope.$broadcast('ResetLogin', { showError: true });
                return;
            }

            $scope.idShieldQuestion = response.data.QestionText;
            $scope.placeHolderText = idShieldService.getPlaceholderText(response.data.AnswerFormat);
            $scope.AnswerFormat = response.data.AnswerFormat;
            if (!$('.sharedauth-loading').hasClass('sharedauth-complete')) {
                $('.sharedauth-loading').toggleClass('sharedauth-complete');
            }
            $rootScope.$broadcast("StepUp", null);
            $rootScope.loading = false;
            saBusyService.busyEnd('transmitAuthentication', $scope, {}, {});
        }, function(response) {
            var disablingDiv = document.getElementById('disablingDiv');
            if (disablingDiv) disablingDiv.style.display = 'none'; //defect fix 22590
            saBusyService.busyEnd('transmitAuthentication', $scope, {}, {});
            transmitEventsService.invokeRejectHandler("Error: ID Questions retrieval failed.");
        });

        if (appid != "mbl") {

            if (typeof $scope.iswidget !== 'undefined') {
                var dynamicValue = { "challengePolicy": $scope.transmitpolicy };
                SASiteCatService.onTrackSATransmitLogin("LoginWidget", "StepupQuestion", dynamicValue, $scope.iswidget);
            }
            else
                SASiteCatService.onTrackCustomSharedStepUp("StepUpAuthentication", "AuthenticationIDShield", policyid || $scope.transmitpolicy);

            //$(".omni-overlay.sharedauth").focus();
        }
        else {
            var dynamicValue = { "challengePolicy": $scope.transmitpolicy };
            SASiteCatService.onTrackSATransmitMobileLogin("Mobile", "StepupQuestion", dynamicValue);
        }

        var urlSplit = BaseUrl.split('/');
        var protocol = urlSplit[0];
        var domain = urlSplit[2];
        var sub_url = protocol + '//' + domain;

        //$scope.changeAuth = function () {
        //    $rootScope.$broadcast('authChangeMethod', null);
        //}
        $scope.submitAns = function(answer) {
            if (callInProgress) return;
            callInProgress = true;

            idShieldService.answerValidation(answer, $scope);
            if ($scope.showerror || $scope.lockErrorMessage) {
                if (appid != "mbl") {
                    if (typeof $scope.iswidget !== 'undefined') {
                        SASiteCatService.onTrackSATransmitLogin("LoginWidget", "StepupQAFormatError", null, $scope.iswidget);
                    }
                }
                else
                    SASiteCatService.onTrackSATransmitMobileLogin("Mobile", "StepupQAFormatError", null);
                callInProgress = false;
                return;
            }
            else {
                $scope.showerror = false;
                $scope.lockErrorMessage = false;
                $scope.errorMessage = "";
                //document.getElementById("qaError").innerHTML = '';
            }

            var idShieldObject = idShieldService.validateAnswer(BaseUrl, transactionID, answer, contextData, appid, signonid, policyid, actimizedata, SessionGUID).then(function(response) {
                $rootScope.loading = false;
                if (response.data.IsSuccess == false) {
                    $scope.showerror = true;
                    if (response.data.ErrorCode == 0) {
                        $scope.errorMessage = "Hmm. That answer doesn’t match our records. Please try again.";
                        if (appid != "mbl") {
                            if (typeof $scope.iswidget !== 'undefined') {
                                SASiteCatService.onTrackSATransmitLogin("LoginWidget", "StepupQAFailure", null, $scope.iswidget);
                            }
                            else
                                SASiteCatService.onTrackCustomSharedStepUp("StepUpAuthentication", "AuthenticationQAFailedError");
                        } else if (appid == "mbl") {
                            SASiteCatService.onTrackSATransmitMobileLogin("Mobile", "StepupQAFailure", null);
                            $rootScope.$broadcast('NotifySiteCat', "100");
                        }
                    }
                    if (response.data.ErrorCode == 203) {
                        // Redirect to Login Assistance while login (if the answer is wrong and user is locked out)
                        if (idShieldService.isLoginStepup()) {
                            $scope.accountLocked = true;
                            $scope.RedirectToLoginAssist(signonid);
                            return;
                        }
                        $rootScope.isUserLocked = true; //change for lock scenario.
                        $scope.lockErrorMessage = true;
                        document.getElementById("changeAuth").setAttribute("disabled", "true");
                        if (appid != "mbl") {
                            $scope.isApp = false;
                            SASiteCatService.onTrackCustomSharedStepUp("StepUpAuthentication", "AuthenticationQALockout");
                        } else if (appid == "mbl") {
                            $scope.isApp = true;
                            $rootScope.$broadcast('NotifySiteCat', "100");
                        }
                    }
                    if (response.data.ErrorCode == 503 || response.data.ErrorCode == -1) {
                        document.getElementById("qaError").innerHTML = "Sorry, our system is currently unavailable. Please try again later.";
                        if (appid != "mbl") {
                            if (typeof $scope.iswidget !== 'undefined') {
                                SASiteCatService.onTrackSATransmitLogin("LoginWidget", "StepupQASystemError", null, $scope.iswidget);
                            }
                        }
                        else
                            SASiteCatService.onTrackSATransmitMobileLogin("Mobile", "StepupQASystemError", null);
                    }

                    $scope.answer = "";
                    document.getElementById("ans").value = "";
                    document.getElementById("ans").focus();
                }
                else {

                    if (tParams.InWidget && response.data.IsSuccess) {
                        $rootScope.$broadcast('busy.begin', {});
                    }
                    // Success Scenario for Mobile App
                    if (hasResumePlaceholder) {
                        $rootScope.$broadcast('MBQASuccess', response);
                    }
                    else {
                        if (response && response.data && response.data.Token)
                            transmitEventsService.invokeSuccessHandler({ "token": response.data.Token });
                        else
                            transmitEventsService.invokeRejectHandler("Error: ID Shield placeholder token is empty");
                    }

                    //                    if (hasResumePlaceholder)
                    //                        $rootScope.$broadcast('MBQASuccess', response);
                    //                    else
                    //                        $rootScope.$broadcast('QASuccess', response);
                }

                callInProgress = false;
            });
        }

        $scope.changeAuth = function() {
            if (appid != "mbl") {
                if (typeof $scope.iswidget !== 'undefined') {
                    SASiteCatService.onTrackSATransmitLoginClickEvent("LoginWidget", "StepupQAChangeAuth", $scope.iswidget);
                }
                else
                    SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationQAChangeAuthLink");
            }
            else
                SASiteCatService.onTrackSATransmitMobileLoginClickEvent("Mobile", "StepupQAChangeAuth");

            transmitEventsService.changeAuthenticator();
            $rootScope.$broadcast('authChangeMethod', null);
        }

        $scope.revealAnswer = function(id) {
            // pass in the ID of the input that needs to be displayed; default is 3 seconds
            var id = document.getElementById(id);
            var typeOrig = id.type;

            id.type = 'text';

            setTimeout(function() {
                id.type = typeOrig;
            }, 3000);
        }

        $scope.RedirectToLoginAssist = function(personId) {
            if (appid != "mbl") {
                if (personId) {
                    if (typeof $scope.iswidget !== 'undefined') {
                        SASiteCatService.onTrackSATransmitLoginClickEvent("LoginWidget", "StepupForgotAnswer", $scope.iswidget);
                    }
                    else
                        SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationForgotLink");

                } else {
                    SASiteCatService.onTrackSharedStepUpClickEvent("StepUpAuthentication", "AuthenticationQAHelpLink");
                }
                idShieldService.loginAssit($scope.accountLocked, false, $scope.isMobileWeb, sub_url, $scope.CancelUrl);
            } else {
                if (personId) {
                    SASiteCatService.onTrackSATransmitMobileLoginClickEvent("Mobile", "StepupForgotAnswer");
                }
                $rootScope.$broadcast('LoginAssistance', 1001);
            }
        };
        $scope.cancelbuttonClick = function() {
            transmitEventsService.cancelAuthenticator();
            // changes has been done to fix the Tux start over option in step up screen 
            if (idShieldService.isTuxLogin()) {
                $rootScope.$broadcast('redirectToTuxLogin', { isError: false });
            } else { $rootScope.$broadcast('ResetLogin', { showError: false }); }
        };
        $scope.$on('ResetLogin', function() {
            $scope.idShieldQuestion = "";
            $scope.placeHolderText = "";
            $scope.AnswerFormat = "";
        });
        $scope.onBlur = function($event) {
            if (appid == "mbl") {
                setTimeout(function() {
                    document.getElementById("SubmitAns").focus();
                }, 300);
            }
        }
        // To hide Need help? link for 24 HB screen
        $rootScope.$broadcast('ShowHideLinks', null);
    }
})();
