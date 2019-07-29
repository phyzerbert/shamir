(function() {
    'use strict';

    angular.module('myapp').factory('msgService', function() {
        var displayLoginMessages = function($scope) {
            var divLoginNewUserMessageTemplate = document.getElementById('divLoginNewUserMessageTemplate');
            var divLoginNeedhelpMessageTemplate = document.getElementById('divLoginNeedhelpMessageTemplate');
            var divLoginNotyouMessageTemplate = document.getElementById('divLoginNotyouMessageTemplate');
            var divYouAreLoggedOut = document.getElementById('divYouAreLoggedOut');
            var divYouHaveBeenLoggedOut = document.getElementById('divYouHaveBeenLoggedOut');
            //PRJ:21940-CI- B-51259 changes
            var divMortgageMessageTemplate = document.getElementById('divMortgageMessageTemplate');
            var divMortgageEnrollMessageTemplate = document.getElementById('divMortgageEnrollMessageTemplate');

            if ($scope.IsLogOut) {
                if (divLoginNewUserMessageTemplate) { divLoginNewUserMessageTemplate.style.display = 'none'; }
                if (divLoginNeedhelpMessageTemplate) { divLoginNeedhelpMessageTemplate.style.display = 'none'; }
                if (divLoginNotyouMessageTemplate) { divLoginNotyouMessageTemplate.style.display = 'none'; }
                if (divYouAreLoggedOut) { divYouAreLoggedOut.style.display = 'inline-block'; }
                if (divYouHaveBeenLoggedOut) { divYouHaveBeenLoggedOut.style.display = 'none'; }
                //PRJ:21940-CI- B-51259 changes
                if (divMortgageMessageTemplate) { divMortgageMessageTemplate.style.display = 'none'; }
                if (divMortgageEnrollMessageTemplate) { divMortgageEnrollMessageTemplate.style.display = 'none'; }
            } else if ($scope.IsSessionTimeOut) {
                if (divLoginNewUserMessageTemplate) { divLoginNewUserMessageTemplate.style.display = 'none'; }
                if (divLoginNeedhelpMessageTemplate) { divLoginNeedhelpMessageTemplate.style.display = 'none'; }
                if (divLoginNotyouMessageTemplate) { divLoginNotyouMessageTemplate.style.display = 'none'; }
                if (divYouAreLoggedOut) { divYouAreLoggedOut.style.display = 'none'; }
                if (divYouHaveBeenLoggedOut) { divYouHaveBeenLoggedOut.style.display = 'inline-block'; }
                //PRJ:21940-CI- B-51259 changes
                if (divMortgageMessageTemplate) { divMortgageMessageTemplate.style.display = 'none'; }
                if (divMortgageEnrollMessageTemplate) { divMortgageEnrollMessageTemplate.style.display = 'none'; }
            } else {
                if (divLoginNewUserMessageTemplate) { divLoginNewUserMessageTemplate.style.display = 'inline-block'; }
                if (divLoginNeedhelpMessageTemplate) { divLoginNeedhelpMessageTemplate.style.display = 'none'; }
                if (divLoginNotyouMessageTemplate) { divLoginNotyouMessageTemplate.style.display = 'none'; }
                if (divYouAreLoggedOut) { divYouAreLoggedOut.style.display = 'none'; }
                if (divYouHaveBeenLoggedOut) { divYouHaveBeenLoggedOut.style.display = 'none'; }
                //PRJ:21940-CI- B-51259 changes
                if (divMortgageMessageTemplate) { divMortgageMessageTemplate.style.display = 'none'; }
                if (divMortgageEnrollMessageTemplate) { divMortgageEnrollMessageTemplate.style.display = 'none'; }
            }
        };

        var displayStepUpMessages = function($scope) {
            var divLoginNewUserMessageTemplate = document.getElementById('divLoginNewUserMessageTemplate');
            var divLoginNeedhelpMessageTemplate = document.getElementById('divLoginNeedhelpMessageTemplate');
            var divLoginNotyouMessageTemplate = document.getElementById('divLoginNotyouMessageTemplate');
            var divYouAreLoggedOut = document.getElementById('divYouAreLoggedOut');
            var divYouHaveBeenLoggedOut = document.getElementById('divYouHaveBeenLoggedOut');
            //PRJ:21940-CI- B-51259 changes
            var divMortgageMessageTemplate = document.getElementById('divMortgageMessageTemplate');
            var divMortgageEnrollMessageTemplate = document.getElementById('divMortgageEnrollMessageTemplate');

            if (divLoginNewUserMessageTemplate) { divLoginNewUserMessageTemplate.style.display = 'none'; }
            if (divLoginNeedhelpMessageTemplate) { divLoginNeedhelpMessageTemplate.style.display = 'inline-block'; }
            if (divLoginNotyouMessageTemplate) { divLoginNotyouMessageTemplate.style.display = 'none'; }
            if (divYouAreLoggedOut) { divYouAreLoggedOut.style.display = 'none'; }
            if (divYouHaveBeenLoggedOut) { divYouHaveBeenLoggedOut.style.display = 'none'; }
            //PRJ:21940-CI- B-51259 changes
            if (divMortgageMessageTemplate) { divMortgageMessageTemplate.style.display = 'none'; }
            if (divMortgageEnrollMessageTemplate) { divMortgageEnrollMessageTemplate.style.display = 'none'; }
        };

        var displayPasswordMessages = function($scope, pwdImageExists) {
            var divLoginNewUserMessageTemplate = document.getElementById('divLoginNewUserMessageTemplate');
            var divLoginNeedhelpMessageTemplate = document.getElementById('divLoginNeedhelpMessageTemplate');
            var divLoginNotyouMessageTemplate = document.getElementById('divLoginNotyouMessageTemplate');
            var divYouAreLoggedOut = document.getElementById('divYouAreLoggedOut');
            var divYouHaveBeenLoggedOut = document.getElementById('divYouHaveBeenLoggedOut');
            //PRJ:21940-CI- B-51259 changes
            var divMortgageMessageTemplate = document.getElementById('divMortgageMessageTemplate');
            var divMortgageEnrollMessageTemplate = document.getElementById('divMortgageEnrollMessageTemplate');

            if (divLoginNewUserMessageTemplate) { divLoginNewUserMessageTemplate.style.display = 'none'; }
            if (divLoginNeedhelpMessageTemplate) { divLoginNeedhelpMessageTemplate.style.display = 'none'; }
            if (divLoginNotyouMessageTemplate) {
                if (pwdImageExists) {
                    divLoginNotyouMessageTemplate.style.display = 'inline-block';
                } else {
                    divLoginNotyouMessageTemplate.style.display = 'none';
                }
            }
            if (divYouAreLoggedOut) { divYouAreLoggedOut.style.display = 'none'; }
            if (divYouHaveBeenLoggedOut) { divYouHaveBeenLoggedOut.style.display = 'none'; }
            //PRJ:21940-CI- B-51259 changes
            if (divMortgageMessageTemplate) { divMortgageMessageTemplate.style.display = 'none'; }
            if (divMortgageEnrollMessageTemplate) { divMortgageEnrollMessageTemplate.style.display = 'none'; }
        };

        var displayTempAccessCodeMessages = function($scope) {
            var divLoginNewUserMessageTemplate = document.getElementById('divLoginNewUserMessageTemplate');
            var divLoginNeedhelpMessageTemplate = document.getElementById('divLoginNeedhelpMessageTemplate');
            var divLoginNotyouMessageTemplate = document.getElementById('divLoginNotyouMessageTemplate');
            var divYouAreLoggedOut = document.getElementById('divYouAreLoggedOut');
            var divYouHaveBeenLoggedOut = document.getElementById('divYouHaveBeenLoggedOut');
            //PRJ:21940-CI- B-51259 changes
            var divMortgageMessageTemplate = document.getElementById('divMortgageMessageTemplate');
            var divMortgageEnrollMessageTemplate = document.getElementById('divMortgageEnrollMessageTemplate');

            if (divLoginNewUserMessageTemplate) { divLoginNewUserMessageTemplate.style.display = 'none'; }
            if (divLoginNeedhelpMessageTemplate) { divLoginNeedhelpMessageTemplate.style.display = 'none'; }
            if (divLoginNotyouMessageTemplate) { divLoginNotyouMessageTemplate.style.display = 'none'; }
            if (divYouAreLoggedOut) { divYouAreLoggedOut.style.display = 'none'; }
            if (divYouHaveBeenLoggedOut) { divYouHaveBeenLoggedOut.style.display = 'none'; }
            //PRJ:21940-CI- B-51259 changes
            if (divMortgageMessageTemplate) { divMortgageMessageTemplate.style.display = 'none'; }
            if (divMortgageEnrollMessageTemplate) { divMortgageEnrollMessageTemplate.style.display = 'none'; }
        };

        var manageMsg = function($scope) {
            $scope.$watch('isLogIn', function(newValue) {
                //Execute only if it is rendered from Auth Login
                if (newValue && $scope.IsAuth) {
                    displayLoginMessages($scope);
                }
            });

            $scope.$watch('isStepUp', function(newValue) {
                //Execute only if it is rendered from Auth Login
                if (newValue && $scope.IsAuth) {
                    displayStepUpMessages($scope);
                }
            });

            $scope.$watch('isPassword', function(newValue) {
                //Execute only if it is rendered from Auth Login
                if (newValue && $scope.IsAuth) {
                    displayPasswordMessages($scope, $scope.isPwdImageExists);
                }
            });

            $scope.$watch('isTempAccessCode', function(newValue) {
                //Execute only if it is rendered from Auth Login
                if (newValue && $scope.IsAuth) {
                    displayTempAccessCodeMessages($scope);
                }
            });
        };

        return {
            DisplayMsg: manageMsg,
            DisplayLoginMessages: displayLoginMessages,
            DisplayStepUpMessages: displayStepUpMessages,
            DisplayPasswordMessages: displayPasswordMessages,
            DisplayTempAccessCodeMessages: displayTempAccessCodeMessages
        };
    });
})();