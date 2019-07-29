(function() {
    'use strict';

    angular
        .module('CommonModule', [])
        .factory('CommonService', [
            '$http', function($http) {
                var mobileLaunchRequest;
                var isTouchValue;

                return {

                    result: function(method, url, inputData) {
                        return $http({
                            method: method,
                            url: url,
                            data: inputData
                        });
                    },

                    getIsTouch: function() {
                        return isTouchValue;
                    },
                    setIsTouch: function(value) {
                        isTouchValue = value;
                    },

                    getMobileLaunchRequest: function() {
                        return mobileLaunchRequest;
                    },
                    setMobileLaunchRequest: function(value) {
                        mobileLaunchRequest = value;
                    }
                };
            }
        ]).factory('OpenModalService', [
            '$modal', function($modal) {
                return {
                    popup: function(modalInstanceController, modalObj, backdrop) {
                        return $modal.open({
                            animation: false,
                            templateUrl: modalObj.templateUrl,
                            controller: modalInstanceController,
                            backdrop: backdrop,
                            keyboard: false,
                            resolve: {
                                modalObj: function() {
                                    return modalObj;
                                }
                            }
                        });
                    }
                };

            }
        ]).factory('SiteCatService', function() {
            var $scope;

            var InitService = function($scopeParam) {
                $scope = $scopeParam;

                if ($scope.IsAuth == undefined || $scope.IsAuth == null) {
                    $scope.IsAuth = false;
                }
            };

            var SiteCatSwitchCode = function(PageName, EventName, DynamicVars) {

                s.clearVars();
                cd.currentPage = "";
                cd.errorStatus = "";
                cd.loginType = "";
                if (DynamicVars != null) {
                    for (var dynKey in DynamicVars) {
                        if (!DynamicVars.hasOwnProperty(dynKey)) {
                            //The current property is not a direct property of DynamicVars
                            continue;
                        }
                        Omniture.constants[PageName][EventName][dynKey] = DynamicVars[dynKey];
                    }
                }

                //reading the page level values
                var prefix = Omniture.constants["OmniSitePrefix"];
                cd.siteSection = Omniture.constants[PageName]["siteSection"];
                cd.subSiteSection = Omniture.constants[PageName]["subSiteSection"];
                //reading the event level values
                var SiteCatProperties = Omniture.constants[PageName][EventName];
                for (var key in SiteCatProperties) {
                    if (!SiteCatProperties.hasOwnProperty(key)) {
                        //The current property is not a direct property of SiteCatProperties
                        continue;
                    }
                    switch (key) {
                        case "eventname":
                            cd.currentPage = prefix + ":" + cd.subSiteSection + ":" + SiteCatProperties[key];
                            break;
                        case "supportedPlatform":
                            cd.supportedPlatform = SiteCatProperties[key];
                            break;
                        case "transactionType":
                            cd.transactionType = SiteCatProperties[key];
                            break;
                        case "tokenType":
                            cd.tokenType = SiteCatProperties[key];
                            break;
                        case "transactionStatus":
                            cd.transactionStatus = SiteCatProperties[key];
                            break;
                        case "transactionError":
                            cd.transactionError = SiteCatProperties[key];
                            break;
                        case "deliverySpeed":
                            cd.deliverySpeed = SiteCatProperties[key];
                            break;
                        case "deliveryFrequency":
                            cd.deliveryFrequency = SiteCatProperties[key];
                            break;
                        case "enrollStatus":
                            cd.enrollStatus = SiteCatProperties[key];
                            break;
                        case "prop53":
                            s.prop53 = prefix + ":" + cd.subSiteSection + ":" + SiteCatProperties[key];
                            break;
                        case "programStatus":
                            cd.programStatus = SiteCatProperties[key];
                            break;
                        case "errorStatus":
                            cd.errorStatus = SiteCatProperties[key];
                            break;
                        case "prop67":
                            s.prop67 = SiteCatProperties[key];
                            if (typeof Utility !== 'undefined' && Utility.isOnDotcom()) {
                                s.prop67 = s.prop67 + " no iframe";
                            }
                            break;
                        case "eVar67":
                            s.eVar67 = SiteCatProperties[key];
                            if (typeof Utility !== 'undefined' && Utility.isOnDotcom()) {
                                s.eVar67 = s.eVar67 + " no iframe";
                            }
                            break;
                        case "prop40":
                            s.prop40 = "online banking";
                            break;
                        case "prop28":
                            if (typeof Utility !== 'undefined' && Utility.isOnDotcom()) {
                                s.prop28 = SiteCatProperties[key];
                            }
                            break;
                        case "eVar60":
                            if (typeof Utility !== 'undefined' && Utility.isOnDotcom()) {
                                s.eVar60 = SiteCatProperties[key];
                            }
                            break;
                        case "eVar72":
                            if (typeof Utility !== 'undefined' && Utility.isOnDotcom()) {
                                s.eVar72 = SiteCatProperties[key];
                            }
                            break;
                        case "loginType":
                            if (typeof Utility !== 'undefined' && Utility.isOnDotcom()) {
                                cd.loginType = SiteCatProperties[key];
                            }
                            break;
                        case "prop13":
                            s.prop13 = prefix + ":" + cd.subSiteSection + ":" + SiteCatProperties[key];
                            break;
                        case "pagename":
                            s.pageName = prefix + ":" + cd.subSiteSection + ":" + SiteCatProperties[key];
                            s.prop1 = cd.subSiteSection;
                            s.prop2 = cd.subSiteSection;
                            break;
                        case "uxNameForSiteCat":
                            if (!$scope.IsAuth) {
                                cd.uxNameForSiteCat = SiteCatProperties[key];
                            }
                            break;
                        case "appNameForSiteCat":
                            if (!$scope.IsAuth) {
                                cd.appNameForSiteCat = SiteCatProperties[key];
                            }
                            break;
                    }
                }
            };
            var SiteCatT = function (PageName, EventName, DynamicVars) {
                try {
                SiteCatSwitchCode(PageName, EventName, DynamicVars);
                s.t();
                }
                catch (e) { }
              
            };

            var SiteCatTL = function (PageName, EventName, DynamicVars) {
                try {
                SiteCatSwitchCode(PageName, EventName, DynamicVars);
                if (typeof Utility !== 'undefined' && Utility.isOnDotcom()) {
                    s.linkTrackVars = s.linkTrackVars + ',prop53,prop28,prop67,eVar60,eVar72,eVar67,uxNameForSiteCat,appNameForSiteCat';
                }
                else if (!$scope.IsAuth) {
                    //added below if condition to call s.tl for blocked browser for rebradind auth login
                    if (DynamicVars == "DotComBlockEvent") {
                        s.linkTrackVars = s.linkTrackVars + ",prop53,prop13,events";
                        s.linkTrackEvents = 'event637';
                        s.events = 'event637';
                        s.prop13 = s.prop53;
                    } else {
                        s.linkTrackVars = s.linkTrackVars + ',prop53,prop67,eVar67,uxNameForSiteCat,appNameForSiteCat';
                    }
                } else {
                    s.linkTrackVars = s.linkTrackVars + ',prop53,prop67,eVar67';
                }
                s.tl(this, 'o', s.prop53, null, 'navigate');
                }
                catch (e) {}
            };

            return {
                SiteCatTCall: SiteCatT,
                SiteCatTLCall: SiteCatTL,
                InitSiteCatService: InitService
            };
        });
})();
