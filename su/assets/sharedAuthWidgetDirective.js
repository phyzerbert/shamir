(function() {
    'use strict';

    angular
        .module("sharedAuthStepUp")
        .directive('saloginwidget', ['SASiteCatService', 'dataContainer', 'transmitService', function(SASiteCatService, dataContainer, transmitService) {
            var directive = {
                restrict: 'A',
                transclude: false,
                replace: false,
                template:
                '<div class="contain-stepup sharedauth" ng-class="{\'loginwidget\':uxrefresh && !istux,\'tuxlogin loginwidget\': istux , \'authlogin\':!uxrefresh && !iswidget && !istux, \'loginwidgetgray\':!uxrefresh && iswidget && !istux}" id="sharedAuthstepUpContainer" >' +
                '<h1 ng-if="uxrefresh" class="new-UX-header">Log In</h1>' +
                '<div ng-if="istux" class="new-UX-header">' +
                '<img src="css/images/usbank_logo.svg" alt="U.S. Bank" role="img">' +
                '</div>' +
                '<div aria-label="" aria-hidden="true" ng-if="!uxrefresh && !istux" class="lw-AuthBody_Lock_Icon lw-Lock_Icon"></div>' +
                '<div class="lw-marBottom7">' +
                '<div ng-if="!uxrefresh && !iswidget && !istux" class="lw-AuthLoginIcon">{{welcomeMessage}}</div>' +
                '</div>' +
                '<div ui-view id="customUI"></div>' +
                '</div>',
                scope: {
                    username: '@',
                    iswidget: '=',
                    uxrefresh: '=',
                    istux: '=?',
                    onsuccess: '&',
                    onerror: '&'
                },
                link: link,
                controller: ['$scope', '$state', '$element', '$rootScope', '$injector', function sharedAuthStepUpCtrl($scope, $state, $element, $rootScope, $injector) {

                    $scope.navigatePage = function(pageName, params) { $state.go(pageName, { transmitParams: params }); };
                    var actmizeDataContainer = document.getElementById('ActimizeData');

                    $scope.transmiturl = dataContainer.TransmitURL;
                    $scope.idshieldbaseurl = dataContainer.IDShieldBaseURL;
                    $scope.passwordbaseurl = dataContainer.PasswordBaseURL;
                    $scope.transactionid = dataContainer.TransactionID;
                    $scope.transmitappid = dataContainer.TransmitAppID;
                    $scope.transmitpolicy = dataContainer.TransmitPolicy;
                    $scope.imagebaseurl = dataContainer.ImageBaseURL;
                    $scope.soundbaseurl = dataContainer.SoundBaseURL;
                    $scope.transid = dataContainer.SessionGUID;
                    $scope.istux = angular.isDefined($scope.istux) ? true : false;

                    var usernameInLowerCase = $scope.username ? $scope.username.toLowerCase() : $scope.username;
                    var requestParameter = {
                        username: usernameInLowerCase,
                        TransactionID: dataContainer.TransactionID,
                        IDShieldBaseURL: dataContainer.IDShieldBaseURL,
                        PasswordBaseURL: dataContainer.PasswordBaseURL,
                        TransmitAppID: dataContainer.TransmitAppID ? dataContainer.TransmitAppID : 'web',
                        ImageBaseURL: dataContainer.ImageBaseURL,
                        SoundBaseURL: dataContainer.SoundBaseURL,
                        TransmitPolicy: dataContainer.TransmitPolicy,
                        SessionGUID: dataContainer.SessionGUID,
                        //dataContainer.ActimizeData will hold value for TUX
                        actimizeData: actmizeDataContainer ? actmizeDataContainer.value : (dataContainer.ActimizeData ? dataContainer.ActimizeData : ""),
                        isOAMEnabled: dataContainer.IsOAMEnabled,
                        OAMPostUrl: dataContainer.OAMPostUrl,
                        ContextData: "",
                        InWidget: true
                    };
                    $rootScope.loginWigetDirective = true;
                    $scope.welcomeMessage = "Hi, " + (($scope.username) ? $scope.username.substring(0, 4) + '****' : "");
                    $scope.showServiceModal = function() {
                        transmitService.showOptions(
                            null,
                            null,
                            usernameInLowerCase,
                            dataContainer.SuccessHandler,
                            dataContainer.ErrorHandler,
                            $scope.transmitappid,
                            $scope.transmitpolicy,
                            $scope.transmiturl,
                            requestParameter,
                            $scope,
                            ($scope != null && $scope.$parent != null && $scope.$parent.additionalTransmitParams != null) ? $scope.$parent.additionalTransmitParams : null,
                            SASiteCatService,
                            $rootScope,
                            dataContainer);
                    };
                } ]
            };

            return directive;
        } ]);

    function link(scope, element, attrs) {
        if (scope.istux) scope.showServiceModal();
        scope.showAuthModal = true;
        scope.isSharedAuthModal = true;
    }
})();