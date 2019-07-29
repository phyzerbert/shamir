(function() {
    // This IIFE executes the Transmit Logout call.
    try {
        if (window.require) {
            require(['xm/xmui', 'xm/xm_api'], function(xmui, xm) {

                var uiConf = {
                    "loginConf": {
                        "aid": 'web',
                        "policy": 'login_pwd'
                    }
                };

                if (xmui) xmui.configure(uiConf);
                if (xm) xm.setWebloginUrl('/Proxy/TS/api/v2/web/');

                if (xmui && xmui.logout) {
                    var userid = sessionStorage.getItem('ts:userid');
                    var token = sessionStorage.getItem('ts:usertkn');
                    if (userid)
                        xmui.logout(userid, token);
                }
            });
        }
    } catch (ex) {
        if (window.console) {
            window.console.error('error while TS logout');
            window.console.error(ex);
        }
    }
})();

(function() {

    /*BEGIN - CI:Dec-2017, B-52249 & B-52251 Changes */
    if (navigator.userAgent.indexOf("MSIE 5.") != -1 || navigator.userAgent.indexOf("MSIE 6.") != -1 || navigator.userAgent.indexOf("MSIE 7.") != -1) {
        angular.notSupported = false;
    }
    if (angular.notSupported) {
        var querySelector = function(attrib, element) {
            element = element || '*';
            var elements = document.getElementsByTagName(element);
            var response = [];
            for (var index = 0; index < elements.length; ++index) {
                if (elements[index].getAttribute(attrib) != null) {
                    response.push(elements[index]);
                }
            }
            return response;
        };

        angular.element(document).ready(function() {
            var directives = querySelector('loginwidgetdir', 'div');
            if (directives && directives.length > 0) {
                var directive = directives[0];
                var isAuth = directive.getAttribute('isauth') === 'true';
                var elementClass = isAuth ? ' lw-floatLeft lw-AuthContainer' : ' lw-positionRelative lw-Container';

                var container = document.createElement('div');
                container.className = elementClass;
                if (!isAuth) {
                    container.style.width = '220px';
                    container.style.height = '272px';
                }

                var loginlockIcon = document.createElement('div');
                loginlockIcon.className = 'lw-Body_Lock_Icon';
                container.appendChild(loginlockIcon);

                var loginIcon = document.createElement('div');
                loginIcon.className = 'lw-LoginIcon  lw-PadLeft20 lw-paddingBottom28';
                loginIcon.innerHTML = '<p> <b> Log In</b> </p>';

                container.appendChild(loginIcon);

                var redirectUrl = directive.getAttribute('baseurl') || '';
                redirectUrl += '/Auth/Login/?compatibility=true';
                var notSupportedMessage = document.createElement('div');
                notSupportedMessage.innerHTML = '<p class=" lw-notSupported">You\'re using a browser we don\'t support. You can either upgrade your browser or <a id="loginHere" class=" lw-notSupported-loginLink" href="#" >log in here</a>.</p>';

                container.appendChild(notSupportedMessage);

                directive.appendChild(container);

                var link = document.getElementById('loginHere');
                if (link) {

                    var onClickHandler = function() {
                        var win = window.parent || window;
                        win.location = redirectUrl;
                        return false;
                    };

                    if (link.addEventListener) {
                        return link.addEventListener('click', onClickHandler, false);
                    }
                    if (link.attachEvent) {
                        return link.attachEvent('onclick', onClickHandler);
                    }
                }
            } else {
                var link = document.getElementById('loginHere');
                if (link) {
                    var redirectUrl = link.href;
                    redirectUrl = redirectUrl.indexOf("http") < 0 ? window.location.protocol + "//" + window.location.host + redirectUrl : redirectUrl;
                    var onClickHandler = function() {
                        var win = window.parent || window;
                        win.location = redirectUrl;
                        return false;
                    };
                    if (link.addEventListener) {
                        return link.addEventListener('click', onClickHandler, false);
                    }
                    if (link.attachEvent) {
                        return link.attachEvent('onclick', onClickHandler);
                    }
                }
            }
        });

        return;
    }

    angular.module("myapp", ['ngCookies', 'ngBusy', 'ui.bootstrap', 'ui.router', 'ngAria', 'CommonModule', 'sharedAuthStepUp']).directive('loginwidgetdir', [
        'SiteCatService', '$rootScope', function(SiteCatService, $rootScope) {

            var logInWidgetUrl = '/Auth/Login/LoginWidget';
            var stepUpCheckWidgetUrl = '/Auth/Login/StepUpCheckWidget';
            var passwordWidgetUrl = '/Auth/Login/PasswordWidget';
            var newUserEnrollUrl = '/Auth/EnrollmentDesktop/Verification';
            var tempAccessCodeWidgetUrl = '/Auth/Login/TempAccessCodeWidget';
            var sessionOutUrl = '/Auth/SessionTimeout';
            var sessionTimeOut;
            var InternetBankingURL = "https://www4.usbank.com/internetBanking/RequestRouter?src=Homepage";
            var OnlineInvestingURL = "https://onlineinvesting.usbank.com/ncWeb/AControlServlet?firm_no=36";
            var MortgageAccountURL = "https://www.usbank.com/home-loans/mortgage/mortgage-account-management.html"; //PRJ:21940-CI-Mar 2017-Dropdown changes
            var TrustNowEssentialsURL = "https://trustnowessentials.usbank.com/TNE/login.jsp";
            var SPEURL = "https://singlepoint.usbank.com/essentials";
            var SBIBankingURL = "http://www.usbank.com/internet_banking_logon/";
            var EasyTaxURL = "https://www.govone.com/usbank/welcome.asp?ws=ADB06E027D47467195FD8413D792C63D005";
            var MerchantConnectURL = "https://www.merchantconnect.com/CWRWeb/displayMemberLogin.do";
            var FXWebURL = "https://fxweb.usbank.com?src=homedropdown";
            var AccessOnlineURL = "https://access.usbank.com/cpsApp1/index.jsp?src=homedropdown";
            var SinglePointURL = "https://singlepoint.usbank.com";
            var MSinglePointURL = "http://m.singlepoint.usbank.com";
            var TNEURL = "https://www.usbank.com/trustnowessentials?src=homedropdown";
            var EPSURL = "https://admin.epymtservice.com/admin/index.jhtml?src=homedropdown";
            var EasyTaxCURL = "https://www.usbank.com/easyTax";
            var GlobalTradeURL = "https://globaltrade.usbank.com";
            var FCOURL = "https://www.fleetcommanderonline.com/app/auth/home.do?src=homedropdown";
            var SLURL = "https://seclend.usbank.com/auth/login.aspx";
            var SPANSOnlineURL = "https://spansonline.usbank.com/?src=homedropdown";
            var ITCPURL = "https://pivot.usbank.com/wmss/web/gcts/home";

            var hiddenVariables = '<input type="hidden" id="LoginScreenForgotIdUrl" value="/Auth/Landingpage.aspx?La&type=pid" />';

            //PRJ:21940-CI-Mar 2017-Dropdown changes
            var loginTemplate =
                '<div class="hide blockmessagelegacy" id="divBlockedUnsupportedMessage"><span class="unsupport-icon-placeholder"><svg version="1.1" x="0px" y="0px" width="24px" height="22px" style="fill:#de162b"  viewBox="0 0 22 20" enable-background="new 0 0 22 20" xml:space="preserve"><g id="Icons"> <g><g><circle cx="11" cy="14" r="1"></circle></g> <g><path d="M18.672,20H3.328c-1.208,0-2.288-0.615-2.887-1.646c-0.584-1.004-0.589-2.206-0.015-3.216L8.099,1.671 C8.695,0.625,9.779,0,11,0s2.305,0.625,2.901,1.671l7.672,13.467c0.574,1.01,0.569,2.212-0.015,3.216 C20.96,19.385,19.88,20,18.672,20z M11,2c-0.492,0-0.928,0.247-1.163,0.661L2.165,16.128c-0.222,0.389-0.22,0.833,0.005,1.22C2.407,17.756,2.84,18,3.328,18h15.344c0.488,0,0.921-0.244,1.158-0.652c0.225-0.387,0.227-0.831,0.005-1.22L12.163,2.661C11.928,2.247,11.492,2,11,2z"></path></g><g><path d="M11,5.998c-0.592,0-1.055,0.467-0.995,1.004l0.445,4.449c0,0.303,0.245,0.549,0.549,0.549c0.303,0,0.549-0.246,0.549-0.549h0.002l0.445-4.449C12.055,6.465,11.592,5.998,11,5.998z"></path></g> </g> </g> <g id="Grid" ></g></svg></span><span id="Errormessage1" class="legacy-blocked">It\'s really time now. Please update your browser.<span id="Errormessage2"> Log in access will be restored once you upgrade.</span></span></div>' +
                '<div id="backgroundUnsupport"></div><div ng-show="!IsSharedAuth">' +
                '<form name="userForm" method="post" autocomplete="off" novalidate><div ng-if="IsAuth && isLogIn" class="lw-AuthBody_Lock_Icon"> </div> <div ng-if="IsAuth && isLogIn" class="lw-PadLeft20 lw-marBottom7"><div class="lw-AuthLoginIcon" ng-if="!IsLogOut && !IsSessionTimeOut"> Log In to Your Accounts</div><div class="lw-AuthLoginIcon" ng-if="IsLogOut">You are logged out.</div><div class="lw-AuthLoginIcon" ng-if="IsSessionTimeOut">You\'ve been logged out.</div></div><div id="divLoginPersonId" ng-show="isLogIn" enable-placeholders="true" ng-class="{\'lw-Container\':!IsAuth, \'lw-AuthContainer\':IsAuth, \'lw-marginTop10\':isErrorMessage && IsAuth}" class="lw-positionRelative">' +
                '<div><div ng-if="!IsAuth" class="lw-Body_Lock_Icon"> </div> <div ng-if="!IsAuth" class="lw-LoginIcon  lw-PadLeft20 lw-paddingBottom28" ng-class="{\'lw-paddingBottom12\': !IsAuth && isErrorMessage}"><p> <b> Log In</b> </p> </div>' +
                '<div ><div class="lw-PadLeft20 lw-paddingBottom9 lw-errorText" ng-show="isErrorMessage" ng-class="{\'lw-paddingBottom8 lw-padLeft60\':IsAuth }"><p>{{ ErrorMessage }}</p></div>' +
            //PRJ:21940-CI-Mar 2017 and User stroy E-05433 Changes
                '<div class="" ng-class="{\'lw-PadLeft20\':!IsAuth, \'lw-padLeft60\':IsAuth}"><div ng-if="!IsPapLogin && (UserType ==\'USBI\' || UserType ==\'\' || UserType ==\'DEFAULT\')" usb-dropdown isauth={{IsAuth}} isunsupportedbrowser={{IsUnsupportedBrowser}} source="loginddlOptions" selectedid="ddlSelectedId" change="ddlchange"></div></div>' +
            //PRJ:21940-CI-April 2017, B-30151 Changes
                '<div class="" ng-show="isPersonIDDisplay" ng-class="{\'lw-PadLeft20 lw-vs15\':!IsAuth, \'lw-padLeft60 lw-vs15\':IsAuth}" ><input type="text" focus-me="focusInput" ng-init="focusInput=true" name="personalId" ng-show="isPersonIDDisplay" class="tabDisableOnBusy"  ng-class="{redborderTextbox: invalidPersonalId,\'lw-TextRoundCorner lw-marginTop0\':!IsAuth, \'lw-AuthTextRoundCorner\':IsAuth}" ng-keypress="ProcessLogin($event)" ng-model="PersonalId" handle-autofill placeholder="Personal ID" id="txtPersonalId" class="" autocomplete="off" validateonblur="false" ng-required="true" ng-minlength="7" ng-maxlength="22" ng-pattern="/^[a-zA-Z0-9*]+$/" /><input type="hidden" id="ActimizeData" value=""/></div>' +
                '<div ng-if="invalidPersonalId" ng-show="isValidaitonErrorDisplay" class="lw-vs8 lw-errorText" ng-class="{\'lw-PadLeft20\':!IsAuth, \'lw-padLeft60\':IsAuth}"><p>{{ personalIdErrorMessage }}</p></div>' +
                '<div class="lw-marBottom3" ng-class="{\'lw-PadLeft20 lw-vs15\':!IsAuth, \'lw-padLeft60 lw-vs24\':IsAuth, \'lw-vs14\':IsAuth && (invalidPersonalId || isErrorMessage)}" ng-show="isPersonIDDisplay"><input class="tabDisableOnBusy lw-floatLeft lw-checkBox" type="checkbox" id="chkRemember" ng-model="RememberUserId" name="RememberUserId" ng-change="onRememberIdChange();" /> <label for="chkRemember"><span class="lw-textRememberId" ng-class="{\'lw-PadLeft3 lw-fontsize12 lw-displayInline\':!IsAuth, \'lw-PadLeft3\':IsAuth}">Remember my ID</span></label></div>' +
                '<div class="" ng-class="{\'lw-PadLeft20 lw-Padtop33\':!IsAuth, \'lw-padLeft60 lw-vs24\':IsAuth , \'lw-vs14\':IsAuth && (invalidPersonalId || isErrorMessage)}"><input type="submit" target="_top" ng-show="isContinueButtonDisplay" id="btnContinue" class="tabDisableOnBusy" value="Log In" ng-click="loginbuttonClick();" ng-class="{\'lw-buttonSubmit\':!IsAuth, \'lw-AuthbuttonSubmit\':IsAuth,\'pointerEventsnone\': IsUnsupportedBrowser }" />' +
            //PRJ:21940-CI- B-51259 changes
                '<div class="lw-textcolorgrey" ng-show="isMortgageDisplay" id="mortgageInfoText">The login for all mortgage accounts is moving to our Online Banking system.</div>' +
            //PRJ:21940-CI-Mar 2017-Dropdown changes
                '<input type="submit" ng-show="isGoButtonDisplay" id="btnGo" value="Go" ng-click="btnGoClick();" ng-class="{\'lw-buttonSubmit lw-PadLeft20 lw-marginTop8\':!IsAuth, \'lw-AuthbuttonSubmit lw-buttonSubmit\':IsAuth }"class="" /></div>' +
                '</div></div>' +
                '<div  ng-class="{\'lw-PadLeft13 lw-ForgotId lw-PadRight13\':!IsAuth, \'lw-padLeft60 lw-marginTop14 lw-AuthForgotId \':IsAuth}" ng-show="isPersonIDDisplay"><a ng-class="{\'pointerEventsnone\': IsUnsupportedBrowser}" href="" target="_top" ng-click="RedirectForgotIdUrl();" tabindex="{{IsUnsupportedBrowser&&!IsAuth?\'-1\':\'0\'}}">Forgot ID?</a>' +
                '<span ng-if="IsAuth && IsCoBrandedCard" class="lw-pipe-delimiter">&#124;</span> <a ng-class="{\'pointerEventsnone\': IsUnsupportedBrowser}" ng-if="IsAuth && IsCoBrandedCard" href="" ng-click="RedirectNewUserEnrollUrl();" tabindex="{{IsUnsupportedBrowser&&!IsAuth?\'-1\':\'0\'}}"> Enroll now</a>' +
                '<span ng-if="!IsAuth" class="lw-pipe-delimiter lw-PadLeftRight6">&#124;</span> <a ng-class="{\'pointerEventsnone\': IsUnsupportedBrowser}" ng-if="!IsAuth" href="" ng-click="RedirectNewUserEnrollUrl();" tabindex="{{IsUnsupportedBrowser&&!IsAuth?\'-1\':\'0\'}}"> New user? Enroll now</a></div>' +
                '</div></div><div ng-show="isLogIn" ng-if="IsAuth" class="" ng-class="{\'lw-PadLeft20 lw-Body_Lock_Icon\':!IsAuth, \'lw-Auth-secure-Body_Lock_Icon \':IsAuth}"> </div><div ng-show="isLogIn" ng-if="IsAuth" class="lw-PadLeft20" ng-class="{\'lw-LoginIcon\' : !IsAuth , \'lw-AuthLogin\':IsAuth}"><p>Connection Secured</p></div></form>';

            var saLoginWidget = '<div ng-if="IsSharedAuth" saloginwidget username="{{PersonalId}}" ' +
                ' iswidget="IsWidget" uxrefresh="IsUXRefresh"' +
                ' onsuccess="saSuccessHandler(response)" onerror="saErrorHandler(response)" ' +
                '></div>';

            //START - PRJ:21940-CI-April 2017, B-30151 Changes
            var stepUpCheckTemplate = '<form name="stepUpForm" aria-live="assertive" method="post" autocomplete="off" novalidate><div ng-if="IsAuth && isStepUp" class="lw-AuthBody_Lock_Icon"> </div> <div ng-if="IsAuth && isStepUp" class="lw-PadLeft20 lw-paddingBottom14 lw-AuthLoginIcon" ng-class="{\'lw-paddingBottom10\': IsAuth && isStepUp && isErrorMessage ,\'lw-paddingBottom8\':IsAuth && (isMinLength || isPattern)}"> Hi, {{ PersonalId | mask}}</div><div ng-show="isStepUp" ng-class="{\'lw-Container\':!IsAuth, \'lw-AuthContainer\':IsAuth, \'lw-AuthContainerStepUp\':isStepUp && IsAuth, \'lw-AuthStepUpIsrequired\':isRequired && IsAuth,\'lw-AuthStepUpIsMinLength\':isMinLength && IsAuth, \'lw-AuthStepUpIsPattern\':isPattern && IsAuth,\'lw-AuthStepUpisErrorMessage\':isErrorMessage && IsAuth}" class="lw-positionRelative ">' +
                '<div><div ng-if="!IsAuth" class="lw-Body_Lock_Icon"> </div> <div ng-if="!IsAuth" class="lw-LoginIcon lw-PadLeft20 lw-paddingBottom15"><p> <b> Log In</b> </p> </div>' +
                '<div ><div ng-if="isErrorMessage && !serverValidation" class="lw-PadLeft20 lw-errorpadding lw-paddingTop0 lw-paddingBottom6 lw-errorText"><p>{{ ErrorMessage }}</p></div>' +
                '<div ng-if="!IsAuth" class="lw-textcolor  lw-PadLeft20 lw-vs15 lw-textbold lw-paddingTop0" ng-class="{\'lw-marginBottom12 \':!IsAuth, \'lw-lineheight12\':!IsAuth && (isErrorMessage || isRequired)}">Hi, {{ PersonalId | mask }}</div><div ng-show="isStepUp">' +
                '<div class="lw-PadLeft20"><label class="lw-idquestion-label">{{ StepUpShieldQuestion }}</label></div>' +
                '<div id="divMMDD" enable-placeholders="true" ng-class="{\'lw-paddingBottom8\':showValidationMessage(), \'lw-marBottom13\':!showValidationMessage(), \'lw-marBottom15\':!IsAuth && !showValidationMessage()}" class="lw-PadLeft20 lw-paddingTop0 lw-idquestion-label lw-vs12" ng-if="stepupAnswerDiv==' + "'MMDD'" + '">' +
                '<input class="LLBlocked" type="text" name="monthForMMDD" focus-me="stepupAnswerDiv==' + "'MMDD'" + '" ng-keypress="enterKeyPress($event)" ng-model="$parent.ShieldAnswer1" placeholder="MM" style="width: 25px;" ' +
            ' ng-required="true" ng-minlength="2" ng-maxlength="2" ng-pattern="/^(0?[1-9]|1[012])$/" restrict-input keypress-pattern="[0-9]" />&nbsp;/&nbsp;' +
                '<input class="LLBlocked" type="text" name="dayForMMDD" ng-keypress="enterKeyPress($event)" ng-model="$parent.ShieldAnswer2" placeholder="DD" style="width: 25px;" ' +
                ' ng-required="true" ng-minlength="2" ng-maxlength="2" ng-pattern="/^(0[1-9]|[12][0-9]|3[01])$/" restrict-input keypress-pattern="[0-9]" handle-autofill focus-me="$parent.ShieldAnswer1.length>=2" />' +
            '</div>' +
                '<div id="divDate6" enable-placeholders="true" ng-class="{\'lw-paddingBottom8\':showValidationMessage(), \'lw-marBottom13\':!showValidationMessage(), \'lw-marBottom15\':!IsAuth && !showValidationMessage()}" class="lw-PadLeft20 lw-paddingTop0 lw-idquestion-label lw-vs12" ng-if="stepupAnswerDiv==' + "'DATE6'" + '">' +
                '<input class="LLBlocked" type="text" name="monthForDate6" focus-me="stepupAnswerDiv==' + "'DATE6'" + '" ng-keypress="enterKeyPress($event)" ng-model="$parent.ShieldAnswer1"  placeholder="MM" style="width: 25px;" ' +
            'ng-required="true" ng-minlength="2" ng-maxlength="2" ng-pattern="/^(0?[1-9]|1[012])$/" restrict-input keypress-pattern="[0-9]" />&nbsp;/&nbsp; ' +
                '<input class="LLBlocked" type="text" name="dayForDate6" ng-keypress="enterKeyPress($event)" ng-model="$parent.ShieldAnswer2" placeholder="DD" style="width: 25px;" ' +
                'ng-required="true" ng-minlength="2" ng-maxlength="2" ng-pattern="/^(0[1-9]|[12][0-9]|3[01])$/" restrict-input keypress-pattern="[0-9]" handle-autofill focus-me="$parent.ShieldAnswer1.length>=2" />&nbsp;/&nbsp; ' +
                '<input class="LLBlocked" type="text" name="yearForDate6" ng-keypress="enterKeyPress($event)" ng-model="$parent.ShieldAnswer3" placeholder="YY" style="width: 25px;" ' +
                ' ng-required="true" ng-minlength="2" ng-maxlength="2" ng-pattern="/^[0-9]{2}$/" restrict-input keypress-pattern="[0-9]" handle-autofill focus-me="$parent.ShieldAnswer2.length>=2" />' +
            '</div>' +
                '<div id="divMMYY" enable-placeholders="true" ng-class="{\'lw-paddingBottom8\':showValidationMessage(), \'lw-marBottom13\':!showValidationMessage(), \'lw-marBottom15\':!IsAuth && !showValidationMessage()}" class="lw-PadLeft20 lw-paddingTop0 lw-idquestion-label lw-vs12" ng-if="stepupAnswerDiv==' + "'MMYY'" + '">' +
                '<input class="LLBlocked" type="text" name="monthForMMYY" focus-me="stepupAnswerDiv==' + "'MMYY'" + '" ng-keypress="enterKeyPress($event)" ng-model="$parent.ShieldAnswer1" placeholder="MM" style="width: 25px;" ' +
            ' ng-required="true" ng-minlength="2" ng-maxlength="2" ng-pattern="/^(0?[1-9]|1[012])$/" restrict-input keypress-pattern="[0-9]" />&nbsp;/&nbsp; ' +
                '<input class="LLBlocked" type="text" name="yearForMMYY" ng-keypress="enterKeyPress($event)" ng-model="$parent.ShieldAnswer2" placeholder="YY" style="width: 25px;" ' +
                ' ng-required="true" ng-minlength="2" ng-maxlength="2" ng-pattern="/^[0-9]{2}$/" restrict-input keypress-pattern="[0-9]" handle-autofill focus-me="$parent.ShieldAnswer1.length>=2" />' +
            '</div>' +
                '<div id="divTime4" enable-placeholders="true" ng-class="{\'lw-paddingBottom8\':showValidationMessage(), \'lw-marBottom13\':!showValidationMessage(), \'lw-marBottom15\':!IsAuth && !showValidationMessage()}" class="lw-PadLeft20 lw-paddingTop0 lw-idquestion-label lw-vs12" ng-if="stepupAnswerDiv==' + "'TIME4'" + '">' +
                '<input class="LLBlocked" type="text" name="hour" focus-me="stepupAnswerDiv==' + "'TIME4'" + '" ng-keypress="enterKeyPress($event)" ng-model="$parent.ShieldAnswer1" placeholder="HH" style="width: 25px;" ' +
            'regxexpr="Hour" ng-required="true" ng-minlength="2" ng-maxlength="2" ng-pattern="/^(?:2[0-3]|[01][0-9])$/" restrict-input keypress-pattern="[0-9]" />&nbsp;:&nbsp; ' +
                '<input class="LLBlocked" type="text" name="minute" ng-keypress="enterKeyPress($event)" ng-model="$parent.ShieldAnswer2" placeholder="MM" style="width: 25px;" ' +
                'regxexpr="Minute" ng-required="true" ng-minlength="2" ng-maxlength="2" ng-pattern="/^[0-5][0-9]$/" restrict-input keypress-pattern="[0-9]" handle-autofill focus-me="$parent.ShieldAnswer1.length>=2" />' +
            '</div>' +
                '<div id="divPhone" enable-placeholders="true" ng-class="{\'lw-paddingBottom8\':showValidationMessage(), \'lw-marBottom13\':!showValidationMessage(), \'lw-marBottom15\':!IsAuth && !showValidationMessage()}" class="lw-PadLeft20 lw-paddingTop0 lw-idquestion-label lw-vs12" ng-if="stepupAnswerDiv==' + "'PHONE10'" + '">' +
                '<input class="LLBlocked" type="text" focus-me="stepupAnswerDiv==' + "'PHONE10'" + '" restrict-input ng-required="true" ng-model="$parent.ShieldAnswer1" ng-keypress="enterKeyPress($event)" name="txtPhoneDigits1" ng-minlength="3" ng-maxlength="3" style="width: 30px;" ng-pattern="/^[0-9]{3}$/" keypress-pattern="[0-9]" ' +
            'regxexpr="Num3" />&nbsp;-&nbsp; ' +
                '<input class="LLBlocked" type="text" restrict-input ng-required="true" ng-model="$parent.ShieldAnswer2" ng-keypress="enterKeyPress($event)" name="txtPhoneDigits2" handle-autofill focus-me="$parent.ShieldAnswer1.length>=3" ng-minlength="3" ng-maxlength="3" style="width: 30px;" ng-pattern="/^[0-9]{3}$/" keypress-pattern="[0-9]" ' +
            'regxexpr="Num3" />&nbsp;-&nbsp; ' +
                '<input class="LLBlocked" type="text" restrict-input ng-required="true" ng-model="$parent.ShieldAnswer3" ng-keypress="enterKeyPress($event)" name="txtPhoneDigits3" handle-autofill focus-me="$parent.ShieldAnswer2.length>=3" ng-minlength="4" ng-maxlength="4" style="width: 50px;" ng-pattern="/^[0-9]{4}$/" keypress-pattern="[0-9]" ' +
            'regxexpr="Num4" /> ' +
            '</div>' +
                '<div id="divNumber4" enable-placeholders="true" ng-class="{\'lw-paddingBottom8\':showValidationMessage(), \'lw-marBottom13\':!showValidationMessage(), \'lw-marBottom15\':!IsAuth && !showValidationMessage()}" class="lw-PadLeft20 lw-paddingTop0 lw-idquestion-label lw-vs12" ng-if="stepupAnswerDiv==' + "'DIV4'" + '">' +
                '<input type="text" handle-autofill focus-me="stepupAnswerDiv==' + "'DIV4'" + '" focus-me="stepupAnswerDiv==' + "'DIV4'" + '" ng-keypress="enterKeyPress($event)" ng-model="$parent.ShieldAnswer1" ng-class="{redborderTextbox: (isErrorMessage || isRequired ||isMinLength || isPattern )}" name="txtNumber4" ng-required="true" style="width: 50px;"  ng-minlength="{{data.StepUpShieldQuestion.AnswerMinLength}}" ng-maxlength="4" ' +
            'ng-pattern="/^[0-9]{4}$/" restrict-input keypress-pattern="[0-9]" class="LLBlocked lw-TextRoundCorner" placeholder="Answer" />' +
            '</div>' +
                '<div id="divNumber5" enable-placeholders="true" ng-class="{\'lw-paddingBottom8\':showValidationMessage(), \'lw-marBottom13\':!showValidationMessage(), \'lw-marBottom15\':!IsAuth && !showValidationMessage()}" class="lw-PadLeft20 lw-paddingTop0 lw-idquestion-label lw-vs12" ng-if="stepupAnswerDiv==' + "'DIV5'" + '">' +
                '<input type="text" handle-autofill focus-me="stepupAnswerDiv==' + "'DIV5'" + '" ng-keypress="enterKeyPress($event)" ng-model="$parent.ShieldAnswer1"  ng-class="{redborderTextbox: (isErrorMessage || isRequired ||isMinLength || isPattern )}" name="txtNumber5" ng-required="true" style="width: 70px;"  ng-minlength="{{data.StepUpShieldQuestion.AnswerMinLength}}" ng-maxlength="5"' +
            'ng-pattern="/^[0-9]{5}$/" restrict-input keypress-pattern="[0-9]" class="LLBlocked lw-TextRoundCorner" placeholder="Answer" />' +
            '</div>' +
                '<div id="divNumber6" enable-placeholders="true" ng-class="{\'lw-paddingBottom8\':showValidationMessage(), \'lw-marBottom13\':!showValidationMessage(), \'lw-marBottom15\':!IsAuth && !showValidationMessage()}" class="lw-PadLeft20 lw-paddingTop0 lw-idquestion-label lw-vs12" ng-if="stepupAnswerDiv==' + "'DIV6'" + '">' +
                '<input type="text" handle-autofill focus-me="stepupAnswerDiv==' + "'DIV6'" + '" ng-class="{redborderTextbox: (isErrorMessage || isRequired ||isMinLength || isPattern )}" ng-keypress="enterKeyPress($event)" ng-model="$parent.ShieldAnswer1" name="txtNumber6" style="width: 70px;"  ng-required="true" ng-minlength="{{data.StepUpShieldQuestion.AnswerMinLength}}" ng-maxlength="6" ' +
            'ng-pattern="/^[0-9]{6}$/" restrict-input keypress-pattern="[0-9]" class="LLBlocked lw-TextRoundCorner" placeholder="Answer" />' +
            '</div>' +
                '<div id="divNumber" enable-placeholders="true" ng-class="{\'lw-paddingBottom8\':showValidationMessage(), \'lw-marBottom13\':!showValidationMessage(), \'lw-marBottom15\':!IsAuth && !showValidationMessage()}" class="lw-PadLeft20 lw-paddingTop0 lw-idquestion-label lw-vs12" ng-if="stepupAnswerDiv==' + "'NUMBER'" + '" ng-class="{redborderTextbox: (isErrorMessage || isRequired ||isMinLength || isPattern )}">' +
                '<input type="text" name="txtNumber" handle-autofill focus-me="stepupAnswerDiv==' + "'NUMBER'" + '" regxexpr="NumericOnly" ng-pattern="/^[0-9]+$/" restrict-input keypress-pattern="[0-9]" ng-model="$parent.ShieldAnswer1" ng-keypress="enterKeyPress($event)"  ng-required="true" ng-class="{redborderTextbox: (isErrorMessage || isRequired ||isMinLength || isPattern )}" ng-minlength="{{data.StepUpShieldQuestion.AnswerMinLength}}" ng-maxlength="{{data.StepUpShieldQuestion.AnswerMaxLength}}" class="LLBlocked lw-TextRoundCorner" placeholder="Answer" />' +
            '</div> ' +
                '<div id="divAlpha" enable-placeholders="true" ng-class="{\'lw-paddingBottom8\':showValidationMessage(), \'lw-marBottom13\':!showValidationMessage(), \'lw-marBottom15\':!IsAuth && !showValidationMessage()}" class="lw-PadLeft20 lw-paddingTop0 lw-idquestion-label lw-vs12" ng-if="stepupAnswerDiv==' + "'ALPHA'" + '">' +
                '<input type="text" name="txtAlpha" handle-autofill focus-me="stepupAnswerDiv==' + "'ALPHA'" + '" ng-keypress="enterKeyPress($event)" ng-model="$parent.ShieldAnswer1" ng-class="{redborderTextbox: (isErrorMessage || isRequired ||isMinLength || isPattern )}" ng-pattern="/^[a-zA-Z ]+$/" restrict-input keypress-pattern="[a-zA-Z ]" ng-required="true" ng-maxlength="{{data.StepUpShieldQuestion.AnswerMaxLength}}" class="LLBlocked lw-TextRoundCorner" placeholder="Answer" />' +
            '</div>' +
                '<div id="divAlphaNum" enable-placeholders="true" ng-class="{\'lw-paddingBottom8\':showValidationMessage(), \'lw-marBottom13\':!showValidationMessage(), \'lw-marBottom15\':!IsAuth && !showValidationMessage()}" class="lw-PadLeft20 lw-paddingTop0 lw-idquestion-label lw-vs12" ng-if="stepupAnswerDiv==' + "'ALPHANUM'" + '">' +
                '<input type="text" name="txtAlphaNum" handle-autofill focus-me="stepupAnswerDiv==' + "'ALPHANUM'" + '" ng-model="$parent.ShieldAnswer1" ng-class="{redborderTextbox: (isErrorMessage || isRequired ||isMinLength || isPattern )}" ng-keypress="enterKeyPress($event)" restrict-input ng-required="true" ng-minlength="{{data.StepUpShieldQuestion.AnswerMinLength}}" ng-maxlength="{{data.StepUpShieldQuestion.AnswerMaxLength}}" class="LLBlocked lw-TextRoundCorner" placeholder="Answer" /> ' +
                '</div>' + '<div id="divEmail" enable-placeholders="true" ng-class="{\'lw-marginBottom8\':(showValidationMessage()|| IsPattern), \'lw-marBottom13\':!showValidationMessage(), \'lw-marBottom15\':!IsAuth}" class="lw-PadLeft20 lw-paddingTop0 lw-idquestion-label lw-vs12" ng-if="stepupAnswerDiv==' + "'EMAIL'" + '">' +
                '<input type="text" name="txtEmail" handle-autofill focus-me="stepupAnswerDiv==' + "'EMAIL'" + '" ng-model="$parent.ShieldAnswer1" ng-class="{redborderTextbox: (isErrorMessage || isRequired ||isMinLength || isPattern )}" ng-keypress="enterKeyPress($event)" restrict-input ng-maxlength="48"  ng-required="true" ng-pattern="/^([A-Za-z0-9_\._-]+@[A-Za-z0-9\-_]+(\.[A-Za-z0-9\-_]+)+)$/" class="LLBlocked lw-TextRoundCorner" placeholder="Answer" />' +
            '</div>' +
            '<div ng-if="isRequired" class="lw-PadLeft20 lw-errorpadding lw-errorText"><p>{{ RequiredValidationMessage }}</p></div>' +
            '<div ng-if="isMinLength" class="lw-PadLeft20 lw-errorpadding lw-errorText"><p>{{ MinLengthValidationMessage }}</p></div>' +
            '<div ng-if="isPattern" class="lw-PadLeft20 lw-errorpadding lw-errorText"><p>{{ RegexValidationMessage }}</p></div>' +
            '<div ng-if="isErrorMessage && serverValidation" class="lw-PadLeft20 lw-errorpadding lw-errorText"><p>{{ ErrorMessage }}</p></div>' +
            '<div class="lw-Tip_Source lw-PadLeft20 lw-idquestion-checked"><input checked="checked" class="lw-floatLeft lw-checkBox" id="StepUpShieldQuestion_RegisterComputer" name="StepUpShieldQuestion.RegisterComputer" type="checkbox" value="true" ng-model="checkboxModel.value" ng-click="DontAskQstClick();"/>' +
            '<p ng-class="{\'lw-idquestion-label lw-labelwidth170 lw-PadLeft3 lw-PadTop2\':!IsAuth, \'lw-labelwidth190\':IsAuth}">Don\'t ask me a question when I log in from this device.</p></div>' +
            '<div ng-class="showValidationMessage() ? \'lw-buttonPaddingOnException\':\'lw-buttonPadding\'"><input type="submit" id="btnContinue" value="Continue" ng-click="stepupCheckbuttonClick(); " ng-class="{\'lw-buttonSubmit\':!IsAuth, \'lw-AuthbuttonSubmit\':IsAuth}" class="tabDisableOnBusy lw-buttonwidth125 lw-marginRight20"/><span ng-class="{\'lw-AuthForgotId\':IsAuth}"><a href="" ng-click="cancelbuttonClick();" >Cancel</a></span></div></div>' +
            '</div><div class="lw-PadLeft13 " ng-class="{\' lw-forgotAnswer\':!IsAuth,\'lw-PadLeft20 lw-marginTop14 lw-AuthForgotId lw-AuthForgotAnswer\':IsAuth, \'lw-marginTop8\':IsAuth && isErrorMessage}"><a href="" ng-click="forgotAnswerClick();">Forgot answer?</a></div></div></div>' +
            '</div><div ng-if="IsAuth && isStepUp" class="lw-Auth-secure-Body_Lock_Icon" ng-class="{\'lw-marginTop28 \':IsAuth && isStepUp}"> </div><div ng-if="IsAuth && isStepUp" class="lw-LoginIcon lw-PadLeft20" ng-class="{\'lw-AuthLogin\' : IsAuth, \'lw-marginTop28 \':IsAuth && isStepUp}" ><p>Connection Secured</p></div></form>';
            //END - PRJ:21940-CI-April 2017, B-30151 Changes

            //PRJ:21940-CI-April 2017, B-30151 Changes
            var passwordTemplate = '<form name="passwordForm" method="post" autocomplete="off" novalidate><div ng-if="IsAuth && isPassword" class="lw-AuthBody_Lock_Icon"> </div> <div ng-if="IsAuth && isPassword" class="lw-PadLeft20 lw-vs-5 lw-paddingBottom12 lw-AuthLoginIcon" ng-class="{\'lw-paddingBottom5 lw-marBottom0\': invalidPassword && IsAuth}"> Hi, {{ PersonalId | mask}}</div><div ng-show="isPassword" ng-class="{\'lw-Container\':!IsAuth, \'lw-AuthContainer\':IsAuth, \'lw-AuthContainerPassword \':isPassword && IsAuth, \'lw-AuthContainerPasswordError \':isErrorMessage && IsAuth}" class="lw-positionRelative "><div>' +
            '<div ng-if="!IsAuth" class="lw-Body_Lock_Icon"> </div> <div ng-if="!IsAuth" class="lw-LoginIcon lw-PadLeft20 lw-paddingBottom15"><p> <b> Log In</b> </p> </div>' +
            '<div ><div ng-show="isErrorMessage" class="lw-vs10 lw-marginLeft20 lw-paddingTop0 lw-paddingBottom6 lw-errorText" ng-class="{\'lw-paddingBottom0\': isErrorMessage && IsAuth}"><p>{{ ErrorMessage }}</p></div>' +
            '<div ng-if="!IsAuth" class="lw-textcolor lw-textbold lw-padLeft20 lw-paddingTop0">Hi, {{ PersonalId | mask }}</div>' +
            '<div><div ng-if="isPwdImageExists"><div class="lw-vs8 lw-floatLeft" ng-class="{\'lw-marginBottomOnException\':isErrorMessage, \'lw-AuthmarginBottomOnException \':isErrorMessage && IsAuth, \'lw-marginBottom33\':!isErrorMessage, \'lw-marginBottom18\':IsAuth ,\'lw-paddingTop0\':invalidPassword && IsAuth, \'lw-vs10\':!IsAuth}">' +
            '<img id="imgSound" class="lw-passwordImage" ng-src="{{ StepUpImageUrl }}" alt="{{ StepUpImageName }}" data-sound= "{{DataSound}}" data-sounduri="{{StepUpImageSoundUrl}}" imgindex="0" ng-click="playSound();"/><div ng-if="StepUpImageSoundUrl != null" id="imgSound" ng-class="{\'lw-passwordImageSound\':IsAuth, \'lw-passwordImageAuthSound\':!IsAuth}" data-sound= "{{DataSound}}" data-sounduri="{{StepUpImageSoundUrl}}" imgindex="0" ng-click="playSound();"></div>' +
            '</div><div class="lw-vs8 lw-passwordImagePhrase" ng-class="{\'lw-passwordPhraseAlign\':!IsAuth}">{{ StepUpImagePhrase }}</div></div>' +
            //PRJ:21940-CI-April 2017, B-30151 Changes
            '<div class="lw-vs20" ng-class="{\'lw-vs0 lw-marginBottom33 lw-marginTop33 \':!IsAuth,\'lw-placeholderIe8 \':IsAuth, \'lw-marginBottom0\':invalidPassword && !IsAuth}" enable-placeholders="true"><input id="txtPassword" name="password" oncopy = "return false;" handle-autofill focus-me="focusPassword" ng-keydown ="ProcessPassword($event)" ng-model="Password" type="password" placeholder="Password" maxlength="24" class="lw-TextRoundCorner lw-passwordBox lw-marginLeft20" ng-required="true" ng-minlength="8" ng-maxlength="24" ng-class="{\'redborderTextbox\': invalidPassword, \'lw-marginBottom18\': !invalidPassword && IsAuth , \'lw-marginBottom8\': isErrorMessage && IsAuth, \'lw-AuthTextRoundCorner\': IsAuth}" />' +
            '<button id="btnShow" role="button" type="button" class="showHideBtn" ng-class="{\'showHideNonAuthBtn\': !IsAuth, \'showHideSABtn\': IsAuth}" ng-click="showHidePwd();"  aria-label="{{isHide?\'Hide Password\':\'Show Password\'}}" >{{isHide?\'Hide\':\'Show\'}}</button>' +

            '<div class="lw-vs10 lw-errorText lw-passwordErrorMessage lw-marginLeft20" ng-class="{\'lw-hide\': !invalidPassword, \'lw-AuthpasswordErrorMessage\':IsAuth}"><span ng-if="invalidPassword" ng-show="isValidaitonErrorDisplay"><p>{{ passwordErrorMessage }}</p></span></div>' +
            '</div><div class=""><input type="submit" target="_top" value="Log In" id="btnLogin" ng-click="passwordbuttonClick();" ng-class="{\'lw-buttonSubmit lw-buttonwidth125 lw-marginRight20\':!IsAuth, \'lw-AuthbuttonSubmit lw-buttonwidth168\':IsAuth}" class="lw-buttonwidth140 lw-marginLeft20 lw-marginRight10 lw-padLeft20">' +
            '<span ng-class="{\'lw-AuthForgotId\':IsAuth}"><a href="" ng-click="cancelbuttonClick();" >Cancel</a></span></div>' +
            '</div></div></div>' +
            '<div class="lw-marginLeft13 lw-forgotPasswordLink " ng-class="{\'lw-marginLeft20  lw-AuthForgotId lw-AuthforgotPasswordLink\':IsAuth, \'lw-AuthforgotPasswordLinkError\':isErrorMessage && IsAuth}"><a href="" ng-click="forgotPwdClick();">Forgot password?</a></div>' +
            '</div><div ng-if="IsAuth && isPassword" class="lw-Auth-secure-Body_Lock_Icon"> </div><div ng-if="IsAuth && isPassword" class="" ng-class="{\'lw-LoginIcon\' : !IsAuth , \'lw-AuthLogin\':IsAuth}"><p>Connection Secured</p></div></form>';


            var tempAccessCodeTemplate = '<form name="tempAccessCodeForm" method="post" autocomplete="off" novalidate><div ng-if="IsAuth && isTempAccessCode" class="lw-AuthBody_Lock_Icon"> </div> <div ng-if="IsAuth && isTempAccessCode" class="lw-PadLeft20 lw-vs-5 lw-paddingBottom12 lw-AuthLoginIcon"> Hi, {{ PersonalId | mask}}</div><div ng-show="isTempAccessCode" enable-placeholders="true" ng-class="{\'lw-Container\':!IsAuth, \'lw-AuthContainer lw-paddingTop6 lw-padLeft40\':IsAuth}" class="lw-positionRelative">' +
            '<div><div ng-if="!IsAuth" class="lw-Body_Lock_Icon"> </div> <div ng-if="!IsAuth" class="lw-LoginIcon lw-vs2 lw-PadLeft20 lw-vs-5 lw-paddingBottom12"><p> <b> Log In</b> </p> </div>' +
            '<div ><div ng-show="isErrorMessage" class="lw-vs10 lw-PadLeft20 lw-paddingTop0 lw-paddingBottom6 lw-errorText"><p>{{ ErrorMessage }}</p></div>' +
            '<div ng-if="!IsAuth" class="lw-textcolor lw-textbold lw-PadLeft20">Hi, {{ PersonalId | mask }}</div><div ng-show="isTempAccessCode">' +
            '<div class="lw-vs10 lw-PadLeft20" ng-class="{\'lw-marginBottom18 lw-paddingTop0\':IsAuth}"><label ng-class="{\'lw-textcolorgrey\':IsAuth}">Enter Your Temporary Access Code</label></div>' +
            '<br ng-class="{\'lw-hide\':IsAuth}"/><div class="Tip_Source lw-PadLeft20" ng-class="{\'lw-marginBottom18\':IsAuth, \'lw-marBottom10\':invalidTempCode && IsAuth}"><input type="text" id="txtTempAccessCode" handle-autofill focus-me="focusTempAccessCode" name="tempAccessCode" ng-keydown="tempAccessKeyDown($event)" ng-keypress="ProcessTempAccessCode($event)" ng-model="TempAccessCode" placeholder="Temporary Access Code" class="lw-TextRoundCorner" ng-required="true" ng-minlength="7" ng-maxlength="7" ng-pattern="/^[0-9]+$/" ng-class="{\'redborderTextbox\': invalidTempCode, \'lw-AuthTextRoundCorner\': IsAuth}"/></div>' +
            '<br ng-class="{\'lw-hide\':IsAuth}"/><div ng-if="invalidTempCode" class="lw-PadLeft20 lw-errorText"><p>{{ accessCodeErrorMessage }}</p></div>' +
            '<br ng-class="{\'lw-hide\':IsAuth}"/><div class="lw-PadLeft20"><input type="submit" id="btnContinue" value="Continue" ng-click="tempaccesscodebuttonClick();" ng-class="{\'lw-buttonSubmit\':!IsAuth, \'lw-AuthbuttonSubmit lw-buttonwidth168\':IsAuth, \'lw-marginTop18\':invalidTempCode && IsAuth}" class="lw-buttonwidth140 lw-marginRight10"/><span ng-class="{\'lw-AuthForgotId\':IsAuth}"><a href="" ng-click="cancelbuttonClick();" >Cancel</a></span></div></div>' +
            '<br ng-class="{\'lw-hide\':IsAuth}"/></div><div class="lw-PadLeft13 lw-forgotPasswordLink " ng-class="{\'lw-PadLeft20 lw-AuthForgotId lw-AuthforgotPasswordLink\':IsAuth}"><a href="" ng-click="RedirectForgotTempAccessUrl();" >Forgot Access Code?</a></div></div>' +
            '</div><div ng-if="IsAuth && isTempAccessCode" class="lw-Auth-secure-Body_Lock_Icon"> </div><div ng-if="IsAuth && isTempAccessCode" class="" ng-class="{\'lw-LoginIcon\' : !IsAuth , \'lw-AuthLogin\':IsAuth}"><p>Connection Secured</p></div></form>';

            /*
            This login widget is part of U.S. Bank homepage rebranding. 
            Following section has added so that it matches with new homepage login widget design. 
            following template can be used as tempalte 
            uxrLoginTemplate
            uxrStepUpCheckTemplate
            uxrPasswordTemplate
            uxrTempAccessCodeTemplate
            */


            var uxrLoginTemplate = '<div  id="uxrLoginTemplate" ng-class="isPartner ? \'widget-wrapper widget-wrapper-partner\' : \'widget-wrapper\'"role="login" ng-show="isLogIn"><div class="hide" id="unsupportBackground"></div><div ng-show="!IsSharedAuth"><form class="tabDisableOnBusy" aria-live="assertive" name="userForm" method="post" autocomplete="off" novalidate><div enable-placeholders="true"   ><h4 id="LoginId" ng-show="!IsAuth || isPartner">Log In</h4>' +
            '<div class=" hide accountType form-control" id="divBlockedUnsupportedMessage">' +
            '<table><tr><td class="td-icon-placeholder">' +
            '<span class="rebrand-unsupport-icon-placeholder"><svg version="1.1" x="0px" y="0px" width="24px" height="22px" style="fill:#de162b"  viewBox="0 0 22 20" enable-background="new 0 0 22 20" xml:space="preserve"><g id="Icons"> <g><g><circle cx="11" cy="14" r="1"></circle></g> <g><path d="M18.672,20H3.328c-1.208,0-2.288-0.615-2.887-1.646c-0.584-1.004-0.589-2.206-0.015-3.216L8.099,1.671 C8.695,0.625,9.779,0,11,0s2.305,0.625,2.901,1.671l7.672,13.467c0.574,1.01,0.569,2.212-0.015,3.216 C20.96,19.385,19.88,20,18.672,20z M11,2c-0.492,0-0.928,0.247-1.163,0.661L2.165,16.128c-0.222,0.389-0.22,0.833,0.005,1.22C2.407,17.756,2.84,18,3.328,18h15.344c0.488,0,0.921-0.244,1.158-0.652c0.225-0.387,0.227-0.831,0.005-1.22L12.163,2.661C11.928,2.247,11.492,2,11,2z"></path></g><g><path d="M11,5.998c-0.592,0-1.055,0.467-0.995,1.004l0.445,4.449c0,0.303,0.245,0.549,0.549,0.549c0.303,0,0.549-0.246,0.549-0.549h0.002l0.445-4.449C12.055,6.465,11.592,5.998,11,5.998z"></path></g> </g> </g> <g id="Grid" ></g></svg></span></td><td style="vertical-align:top;"><span id="unsupportSpanMessage" class="rebrand-blocked-message"> <a tabindex="0" href="javascript:void(0);" id="linkUpgradeBrowser"> </a></span></td></tr></table></div>' +
            '<div aria-live="assertive">' +
            '<svg ng-show="isErrorMessage" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve" class="alert-svg" focusable="false" aria-hidden="true" ><g id="Icons"><g><circle cx="16" cy="20" r="1"/><path d="M23.672,26H8.328c-1.208,0-2.287-0.615-2.887-1.646c-0.583-1.003-0.589-2.205-0.015-3.215l7.672-13.468 C13.695,6.625,14.78,6,16,6c1.221,0,2.305,0.625,2.901,1.671l7.672,13.467c0.574,1.01,0.569,2.212-0.015,3.216 C25.959,25.385,24.88,26,23.672,26z M16,8c-0.492,0-0.927,0.248-1.164,0.662L7.165,22.128c-0.221,0.389-0.219,0.834,0.006,1.221 C7.408,23.757,7.84,24,8.328,24h15.344c0.487,0,0.921-0.244,1.158-0.652c0.225-0.386,0.227-0.831,0.005-1.22L17.163,8.661 C16.928,8.247,16.493,8,16,8z"/><path d="M16,11.998c-0.592,0-1.055,0.467-0.995,1.004l0.445,4.449c0,0.303,0.245,0.549,0.549,0.549 c0.303,0,0.549-0.246,0.549-0.549h0.002l0.445-4.449C17.055,12.465,16.592,11.998,16,11.998z" /></g>' +
            '</g><g id="Grid" display="none"></g></svg><p class="err" ng-if="isErrorMessage" ng-bind="ErrorMessage"></p></div>' +
            '<div id="wrapperId" class="dynamic_content_wrapper"><div aria-busy="false" aria-live="assertive" ng-if="invalidPersonalId && isValidaitonErrorDisplay" class=" errMsgHighlightP MarBot5Per" > ' +
            '<div class="alertTriangle "><svg version="1.1" x="0px" y="0px" width="24px" height="22px" style="fill:#de162b"  viewBox="0 0 22 20" enable-background="new 0 0 22 20" xml:space="preserve"> <g id="Icons"> <g><g><circle cx="11" cy="14" r="1"></circle></g> <g><path d="M18.672,20H3.328c-1.208,0-2.288-0.615-2.887-1.646c-0.584-1.004-0.589-2.206-0.015-3.216L8.099,1.671 C8.695,0.625,9.779,0,11,0s2.305,0.625,2.901,1.671l7.672,13.467c0.574,1.01,0.569,2.212-0.015,3.216 C20.96,19.385,19.88,20,18.672,20z M11,2c-0.492,0-0.928,0.247-1.163,0.661L2.165,16.128c-0.222,0.389-0.22,0.833,0.005,1.22C2.407,17.756,2.84,18,3.328,18h15.344c0.488,0,0.921-0.244,1.158-0.652c0.225-0.387,0.227-0.831,0.005-1.22L12.163,2.661C11.928,2.247,11.492,2,11,2z"></path></g><g><path d="M11,5.998c-0.592,0-1.055,0.467-0.995,1.004l0.445,4.449c0,0.303,0.245,0.549,0.549,0.549c0.303,0,0.549-0.246,0.549-0.549h0.002l0.445-4.449C12.055,6.465,11.592,5.998,11,5.998z"></path></g> </g> </g> <g id="Grid" display="none"></g></svg></div>' +
            '<p role="alert" ng-if="invalidPersonalId && isValidaitonErrorDisplay" class="errP MarBot0 "  ng-bind="personalIdErrorMessage"></p></div><div class="form-group" data-role="none"><label id="atp" for="textAccountType" ng-show="!IsPapLogin && !IsAuth">Account Type</label>' +
            '<select id="textAccountType" ng-show="!IsPapLogin && !IsAuth" class=" tabDisableOnBusy accountType form-control" ng-options="item.label for item in loginddlOptions" ng-model="selectedItem" ng-change="ddlchange(selectedItem)"><option value="" ng-if="false" focusable="true"></option></select>' +
            '</div><div class="form-group" ng-show="isPersonIDDisplay" ng-class="{has_errP: invalidPersonalId && isValidaitonErrorDisplay }"><label id="pid" for="textPersonalId">Personal ID</label><input id="textPersonalId" type="text" ng-required="true" class="tabDisableOnBusy form-control" name="personalId" ng-keypress="ProcessLogin($event)" ng-model="PersonalId" handle-autofill placeholder="Personal ID" enable-placeholder="true" autocomplete="off" validateonblur="false" ng-minlength="7" ng-maxlength="22" ng-pattern="/^[a-zA-Z0-9*]+$/" ng-class="{\'err-highlightP\':invalidPersonalId && isValidaitonErrorDisplay}" /><input type="hidden" id="ActimizeData" value="" aria-hidden="true"/></div>' +
            '<div aria-live="assertive"></div>' +
            '<div class="form-group" ng-show="isPersonIDDisplay"><div class="accountCheckBox"><input type="checkbox" id="chkRemember" ng-model="RememberUserId" name="RememberUserId" class="tabDisableOnBusy" ng-change="onRememberIdChange();" /><label for="chkRemember">Remember my ID</label></div></div><div class="form-group"><button type="submit" target="_top" ng-show="isContinueButtonDisplay" id="btnContinue" ng-click="loginbuttonClick();" class="tabDisableOnBusy btn btn-std-red-fill"> Log In</button><button type="submit" ng-show="isGoButtonDisplay" id="btnGo" ng-click="btnGoClick();" class=" btn btn-std-red-fill"> Go </button></div>' +
            '<div class="link-group"><button id="linkForgotID" ng-show="isPersonIDDisplay" class="tabDisableOnBusy btn-transparent multi-btns font-13" target="_top" ng-click="RedirectForgotIdUrl();">Forgot ID?</button><button ng-show="isPersonIDDisplay && IsAuth && IsCoBrandedCard" class=" btn-transparent multi-btns font-14" ng-click="RedirectNewUserEnrollUrl();" > Enroll now</button><button id="linkNewUserEnroll" ng-show="isPersonIDDisplay && !IsAuth" class="tabDisableOnBusy btn-transparent multi-btns font-13" ng-show="!IsAuth" ng-click="RedirectNewUserEnrollUrl();"> New user? Setup online access</button></div></div></div></form></div></div>';


            var uxrStepUpCheckTemplate = '<div ng-class="isPartner ? \'widget-wrapper widget-wrapper-partner\' : \'widget-wrapper\'" ng-show="isStepUp" role="login"><form aria-live="assertive" name="stepUpForm" method="post" autocomplete="off" novalidate class="ng-dirty ng-valid-minlength ng-invalid ng-invalid-required"><div enable-placeholders="true"><h4 ng-show="!IsAuth || isPartner">Log In</h4>' +
            '<div aria-live="assertive">' +
            '<svg ng-show="isErrorMessage && !serverValidation" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve" class="alert-svg" focusable="false" aria-hidden="true"><g id="Icons"><g><circle cx="16" cy="20" r="1"/><path d="M23.672,26H8.328c-1.208,0-2.287-0.615-2.887-1.646c-0.583-1.003-0.589-2.205-0.015-3.215l7.672-13.468 C13.695,6.625,14.78,6,16,6c1.221,0,2.305,0.625,2.901,1.671l7.672,13.467c0.574,1.01,0.569,2.212-0.015,3.216 C25.959,25.385,24.88,26,23.672,26z M16,8c-0.492,0-0.927,0.248-1.164,0.662L7.165,22.128c-0.221,0.389-0.219,0.834,0.006,1.221 C7.408,23.757,7.84,24,8.328,24h15.344c0.487,0,0.921-0.244,1.158-0.652c0.225-0.386,0.227-0.831,0.005-1.22L17.163,8.661 C16.928,8.247,16.493,8,16,8z"/><path d="M16,11.998c-0.592,0-1.055,0.467-0.995,1.004l0.445,4.449c0,0.303,0.245,0.549,0.549,0.549 c0.303,0,0.549-0.246,0.549-0.549h0.002l0.445-4.449C17.055,12.465,16.592,11.998,16,11.998z"/></g></g><g id="Grid" display="none"></g></svg></div>' +
            '<p ng-if="isErrorMessage && !serverValidation" class="err" ng-bind="ErrorMessage"></p></div>' +
                '<div class="dynamic_content_wrapper"><div aria-live="assertive" ng-if="isRequired || isPattern || (isErrorMessage && serverValidation)|| isMinLength" class=" errMsgHighlightP MarBot5Per">' +
                '<div class="alertTriangle "><svg version="1.1" x="0px" y="0px" width="24px" height="22px" style="fill:#de162b" viewBox="0 0 22 20" enable-background="new 0 0 22 20" xml:space="preserve"> <g id="Icons"> <g><g><circle cx="11" cy="14" r="1"></circle></g> <g><path d="M18.672,20H3.328c-1.208,0-2.288-0.615-2.887-1.646c-0.584-1.004-0.589-2.206-0.015-3.216L8.099,1.671 C8.695,0.625,9.779,0,11,0s2.305,0.625,2.901,1.671l7.672,13.467c0.574,1.01,0.569,2.212-0.015,3.216 C20.96,19.385,19.88,20,18.672,20z M11,2c-0.492,0-0.928,0.247-1.163,0.661L2.165,16.128c-0.222,0.389-0.22,0.833,0.005,1.22C2.407,17.756,2.84,18,3.328,18h15.344c0.488,0,0.921-0.244,1.158-0.652c0.225-0.387,0.227-0.831,0.005-1.22L12.163,2.661C11.928,2.247,11.492,2,11,2z"></path></g><g><path d="M11,5.998c-0.592,0-1.055,0.467-0.995,1.004l0.445,4.449c0,0.303,0.245,0.549,0.549,0.549c0.303,0,0.549-0.246,0.549-0.549h0.002l0.445-4.449C12.055,6.465,11.592,5.998,11,5.998z"></path></g> </g> </g> <g id="Grid" display="none"></g></svg></div> ' +
                '<p class="errP MarBot0 " ng-if="isRequired" ng-bind="RequiredValidationMessage"></p><p class="errP MarBot0" ng-if="(isErrorMessage && serverValidation)" ng-bind="ErrorMessage"></p>  <p class="errP MarBot0" ng-if="isPattern" ng-bind="RegexValidationMessage"></p><p class="errP MarBot0" ng-if="isMinLength" ng-bind="MinLengthValidationMessage"></p></div>' +
                '<div ng-show="!IsAuth" class="tabDisableOnBusy greeting" tabindex="0">Hi, {{ PersonalId | mask }}</div><div class="form-group" ng-class="{has_errP: isRequired || isMinLength || isPattern || (isErrorMessage && serverValidation) }">' +
            //begin labels for screen readers
            '<div id="Label_MM" style="display: none" >Enter the 2-digit month</div>' +
            '<div id="Label_DD" style="display: none" >Enter the 2-digit day of the month</div>' +
            '<div id="Label_YY" style="display: none" >Enter the last 2 digits of the year</div>' +
            '<div id="Label_HOUR" style="display: none" >Enter the 2-digit hour</div>' +
            '<div id="Label_MINUTE" style="display: none" >Enter the 2-digit minute</div>' +
            '<div id="Label_PHONE_AREA_CODE" style="display: none" >Enter the area code</div>' +
            '<div id="Label_PHONE_EXCHANGE" style="display: none" >Enter the exchange code</div>' +
            '<div id="Label_PHONE_LINE" style="display: none" >Enter the line number</div>' +
            '<div id="Label_ANSWER" style="display: none" >Enter the answer</div>' +
            //end labels for screen readers
            '<label class="tabDisableOnBusy" tabindex="0">{{ StepUpShieldQuestion }}</label>' +
            '<div id="divMMDD" ng-show="stepupAnswerDiv== \'MMDD\'" class="padTop5"><input aria-labelledby="Label_MM" class="LLBlocked form-control" type="text" name="monthForMMDD" ng-keypress="enterKeyPress($event)" ng-model="ShieldAnswer1" placeholder="MM" ng-minlength="2" ng-maxlength="2" ng-pattern="/^(0?[1-9]|1[012])$/" restrict-input keypress-pattern="[0-9]" /><input aria-labelledby="Label_DD" class="LLBlocked form-control" type="text" name="dayForMMDD" ng-keypress="enterKeyPress($event)" ng-model="ShieldAnswer2" placeholder="DD" ng-minlength="2" ng-maxlength="2" ng-pattern="/^(0[1-9]|[12][0-9]|3[01])$/" restrict-input keypress-pattern="[0-9]" handle-autofill focus-me="ShieldAnswer1.length>=2" /></div>' +
            '<div id="divDate6" ng-show="stepupAnswerDiv==\'DATE6\'" class="padTop5"><input aria-labelledby="Label_MM" class="LLBlocked form-control" type="text" name="monthForDate6" ng-keypress="enterKeyPress($event)" ng-model="ShieldAnswer1"  placeholder="MM" ng-required="true" ng-minlength="2" ng-maxlength="2" ng-pattern="/^(0?[1-9]|1[012])$/" restrict-input keypress-pattern="[0-9]" /><input aria-labelledby="Label_DD" class="LLBlocked form-control" type="text" name="dayForDate6" ng-keypress="enterKeyPress($event)" ng-model="ShieldAnswer2" placeholder="DD" ng-required="true" ng-minlength="2" ng-maxlength="2" ng-pattern="/^(0[1-9]|[12][0-9]|3[01])$/" restrict-input keypress-pattern="[0-9]" handle-autofill focus-me="ShieldAnswer1.length>=2" /><input aria-labelledby="Label_YY" class="LLBlocked form-control" type="text" name="yearForDate6" ng-keypress="enterKeyPress($event)" ng-model="ShieldAnswer3" placeholder="YY" ng-required="true" ng-minlength="2" ng-maxlength="2" ng-pattern="/^[0-9]{2}$/" restrict-input keypress-pattern="[0-9]" handle-autofill focus-me="ShieldAnswer2.length>=2" /></div>' +
            '<div id="divMMYY" ng-show="stepupAnswerDiv==\'MMYY\'" class="padTop5"><input aria-labelledby="Label_MM"  class="LLBlocked form-control" type="text" name="monthForMMYY" ng-keypress="enterKeyPress($event)" ng-model="ShieldAnswer1" placeholder="MM" ng-required="true" ng-minlength="2" ng-maxlength="2" ng-pattern="/^(0?[1-9]|1[012])$/" restrict-input keypress-pattern="[0-9]" /><input aria-labelledby="Label_YY"  class="LLBlocked form-control" type="text" name="yearForMMYY" ng-keypress="enterKeyPress($event)" ng-model="ShieldAnswer2" placeholder="YY" ng-required="true" ng-minlength="2" ng-maxlength="2" ng-pattern="/^[0-9]{2}$/" restrict-input keypress-pattern="[0-9]" handle-autofill focus-me="ShieldAnswer1.length>=2" /></div>' +
            '<div id="divTime4" ng-show="stepupAnswerDiv==\'TIME4\'" class="padTop5"><input aria-labelledby="Label_HOUR" class="LLBlocked form-control" type="text" name="hour" ng-keypress="enterKeyPress($event)" ng-model="ShieldAnswer1" placeholder="HH" regxexpr="Hour" ng-required="true" ng-minlength="2" ng-maxlength="2" ng-pattern="/^(?:2[0-3]|[01][0-9])$/" restrict-input keypress-pattern="[0-9]" /><input aria-labelledby="Label_MINUTE" class="LLBlocked form-control" type="text" name="minute" ng-keypress="enterKeyPress($event)" ng-model="ShieldAnswer2" placeholder="MM" regxexpr="Minute" ng-required="true" ng-minlength="2" ng-maxlength="2" ng-pattern="/^[0-5][0-9]$/" restrict-input keypress-pattern="[0-9]" handle-autofill focus-me="ShieldAnswer1.length>=2" /></div>' +
            '<div id="divPhone" ng-show="stepupAnswerDiv==\'PHONE10\'" class="padTop5"><input aria-labelledby="Label_PHONE_AREA_CODE" class="LLBlocked form-control" type="text" restrict-input ng-required="true" ng-model="ShieldAnswer1" ng-keypress="enterKeyPress($event)" name="txtPhoneDigits1" ng-minlength="3" ng-maxlength="3" ng-pattern="/^[0-9]{3}$/" keypress-pattern="[0-9]" regxexpr="Num3" /><input aria-labelledby="Label_PHONE_EXCHANGE" class="LLBlocked form-control" type="text" restrict-input ng-required="true" ng-model="ShieldAnswer2" ng-keypress="enterKeyPress($event)" name="txtPhoneDigits2" handle-autofill focus-me="ShieldAnswer1.length>=3" ng-minlength="3" ng-maxlength="3"  ng-pattern="/^[0-9]{3}$/" keypress-pattern="[0-9]" regxexpr="Num3" /><input aria-labelledby="Label_PHONE_LINE" class="LLBlocked form-control" type="text" restrict-input ng-required="true" ng-model="ShieldAnswer3" ng-keypress="enterKeyPress($event)" name="txtPhoneDigits3" handle-autofill focus-me="ShieldAnswer2.length>=3" ng-minlength="4" ng-maxlength="4" ng-pattern="/^[0-9]{4}$/" keypress-pattern="[0-9]" regxexpr="Num4" /></div>' +
            '<div id="divNumber4" ng-show="stepupAnswerDiv==\'DIV4\'" class="padTop5"><input aria-labelledby="Label_ANSWER" type="text" handle-autofill focus-me="stepupAnswerDiv==\'DIV4\'"   ng-keypress="enterKeyPress($event)" ng-model="ShieldAnswer1" name="txtNumber4" ng-required="true"  ng-minlength="{{data.StepUpShieldQuestion.AnswerMinLength}}" ng-maxlength="4" ng-pattern="/^[0-9]{4}$/" restrict-input keypress-pattern="[0-9]" class="form-control" placeholder="Answer" /></div>' +
            '<div id="divNumber5" ng-show="stepupAnswerDiv==\'DIV5\'" class="padTop5"><input aria-labelledby="Label_ANSWER" type="text" handle-autofill focus-me="stepupAnswerDiv==\'DIV5\'" ng-keypress="enterKeyPress($event)" ng-model="ShieldAnswer1" name="txtNumber5" ng-required="true" ng-minlength="{{data.StepUpShieldQuestion.AnswerMinLength}}" ng-maxlength="5" ng-pattern="/^[0-9]{5}$/" restrict-input keypress-pattern="[0-9]" class="form-control" placeholder="Answer" /></div>' +
            '<div id="divNumber6" ng-show="stepupAnswerDiv==\'DIV6\'" class="padTop5"><input aria-labelledby="Label_ANSWER" type="text" handle-autofill focus-me="stepupAnswerDiv==\'DIV6\'"  ng-keypress="enterKeyPress($event)" ng-model="ShieldAnswer1" name="txtNumber6" ng-required="true" ng-minlength="{{data.StepUpShieldQuestion.AnswerMinLength}}" ng-maxlength="6" ng-pattern="/^[0-9]{6}$/" restrict-input keypress-pattern="[0-9]" class="form-control" placeholder="Answer" /></div>' +
            '<div id="divNumber" ng-show="stepupAnswerDiv==\'NUMBER\'" class="padTop5"><input aria-labelledby="Label_ANSWER" type="text" name="txtNumber" handle-autofill focus-me="stepupAnswerDiv==\'NUMBER\'" regxexpr="NumericOnly" ng-pattern="/^[0-9]+$/" restrict-input keypress-pattern="[0-9]" ng-model="ShieldAnswer1" ng-keypress="enterKeyPress($event)" ng-required="true" ng-minlength="{{data.StepUpShieldQuestion.AnswerMinLength}}" ng-maxlength="{{data.StepUpShieldQuestion.AnswerMaxLength}}" class="form-control" placeholder="Answer" /></div>' +
            '<div id="divAlpha" ng-show="stepupAnswerDiv==\'ALPHA\'" class="padTop5"><input aria-labelledby="Label_ANSWER" type="text" name="txtAlpha" handle-autofill focus-me="stepupAnswerDiv==\'ALPHA\'" ng-keypress="enterKeyPress($event)" ng-model="ShieldAnswer1" ng-pattern="/^[a-zA-Z ]+$/" restrict-input keypress-pattern="[a-zA-Z ]" ng-required="true" ng-maxlength="{{data.StepUpShieldQuestion.AnswerMaxLength}}" class="form-control" placeholder="Answer" /></div>' +
            '<div id="divAlphaNum" ng-show="stepupAnswerDiv==\'ALPHANUM\'" class="padTop5"><input aria-labelledby="Label_ANSWER" type="text" name="txtAlphaNum" handle-autofill focus-me="stepupAnswerDiv==\'ALPHANUM\'" ng-model="ShieldAnswer1" ng-keypress="enterKeyPress($event)" restrict-input ng-required="true" ng-minlength="{{data.StepUpShieldQuestion.AnswerMinLength}}" ng-maxlength="{{data.StepUpShieldQuestion.AnswerMaxLength}}" class="tabDisableOnBusy form-control" ng-class="{\'err-highlightP\' :  isRequired || isMinLength || isPattern || (isErrorMessage && serverValidation)}" placeholder="Answer" /></div>' +
            '<div id="divEmail" ng-show="stepupAnswerDiv==\'EMAIL\'"><input aria-labelledby="Label_ANSWER" type="text" name="txtEmail" handle-autofill focus-me=stepupAnswerDiv=="EMAIL" ng-model="ShieldAnswer1" ng-keypress="enterKeyPress($event)" restrict-input ng-maxlength="48"  ng-required="true" ng-pattern="/^([A-Za-z0-9_\._-]+@[A-Za-z0-9\-_]+(\.[A-Za-z0-9\-_]+)+)$/" class="form-control" placeholder="Answer"/></div></div>' +
            // Use ng-bind because, if you use {{ RequiredValidationMessage }}, JAWS 16 / 17 will read out precompiled text (i.e. 'left-brace left-brace RequiredValidationMessage right-brace right-brace").
            //  This trick works with JAWS 17.0.2727

            '<div class="form-group"><div class="accountCheckBox"><input checked="checked" checked class="tabDisableOnBusy" id="StepUpShieldQuestion_RegisterComputer" name="StepUpShieldQuestion.RegisterComputer" type="checkbox" style="float:left" value="true" ng-model="checkboxModel.value" ng-click="DontAskQstClick();"/> <label for="StepUpShieldQuestion_RegisterComputer">Don\'t ask me a question when I log in from this device.</label></div></div><div class="form-group"><button type="submit" id="btnContinue" class="tabDisableOnBusy btn btn-std-red-fill" ng-click="stepupCheckbuttonClick();"> Continue </button></div><div class="link-group"><button class="tabDisableOnBusy btn-transparent multi-btns" ng-click="forgotAnswerClick();">Forgot answer?</button><button class="tabDisableOnBusy btn-transparent multi-btns" ng-click="cancelbuttonClick();">Cancel</button></div></div></div></form></div>';
            var uxrPasswordTemplate = '<div ng-class="isPartner ? \'widget-wrapper widget-wrapper-partner\' : \'widget-wrapper\'" role="login" ng-show="isPassword"><form aria-live="assertive" name="passwordForm" method="post" autocomplete="off" novalidate><h4 ng-show="!IsAuth || isPartner">Log In</h4>' +
            '<div>' +
            '<svg ng-show="isErrorMessage && !serverValidation" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve" class="alert-svg" focusable="false" aria-hidden="true"><g id="Icons"><g><circle cx="16" cy="20" r="1"/><path d="M23.672,26H8.328c-1.208,0-2.287-0.615-2.887-1.646c-0.583-1.003-0.589-2.205-0.015-3.215l7.672-13.468 C13.695,6.625,14.78,6,16,6c1.221,0,2.305,0.625,2.901,1.671l7.672,13.467c0.574,1.01,0.569,2.212-0.015,3.216 C25.959,25.385,24.88,26,23.672,26z M16,8c-0.492,0-0.927,0.248-1.164,0.662L7.165,22.128c-0.221,0.389-0.219,0.834,0.006,1.221 C7.408,23.757,7.84,24,8.328,24h15.344c0.487,0,0.921-0.244,1.158-0.652c0.225-0.386,0.227-0.831,0.005-1.22L17.163,8.661 C16.928,8.247,16.493,8,16,8z"/><path d="M16,11.998c-0.592,0-1.055,0.467-0.995,1.004l0.445,4.449c0,0.303,0.245,0.549,0.549,0.549 c0.303,0,0.549-0.246,0.549-0.549h0.002l0.445-4.449C17.055,12.465,16.592,11.998,16,11.998z"/></g></g><g id="Grid" display="none"></g></svg>' +
            '<p ng-if="isErrorMessage && !serverValidation" class="err" ng-bind="ErrorMessage"></p></div>' +
            '<div class="dynamic_content_wrapper"><div aria-live="assertive" ng-if="invalidPassword && isValidaitonErrorDisplay" class=" errMsgHighlightP MarBot5Per">' +
            '<div class="alertTriangle "><svg version="1.1" x="0px" y="0px" width="24px" height="22px" style="fill:#de162b" viewBox="0 0 22 20" enable-background="new 0 0 22 20" xml:space="preserve"> <g id="Icons"> <g><g><circle cx="11" cy="14" r="1"></circle></g> <g><path d="M18.672,20H3.328c-1.208,0-2.288-0.615-2.887-1.646c-0.584-1.004-0.589-2.206-0.015-3.216L8.099,1.671 C8.695,0.625,9.779,0,11,0s2.305,0.625,2.901,1.671l7.672,13.467c0.574,1.01,0.569,2.212-0.015,3.216 C20.96,19.385,19.88,20,18.672,20z M11,2c-0.492,0-0.928,0.247-1.163,0.661L2.165,16.128c-0.222,0.389-0.22,0.833,0.005,1.22C2.407,17.756,2.84,18,3.328,18h15.344c0.488,0,0.921-0.244,1.158-0.652c0.225-0.387,0.227-0.831,0.005-1.22L12.163,2.661C11.928,2.247,11.492,2,11,2z"></path></g><g><path d="M11,5.998c-0.592,0-1.055,0.467-0.995,1.004l0.445,4.449c0,0.303,0.245,0.549,0.549,0.549c0.303,0,0.549-0.246,0.549-0.549h0.002l0.445-4.449C12.055,6.465,11.592,5.998,11,5.998z"></path></g> </g> </g> <g id="Grid" display="none"></g></svg></div> ' +
            '<p class="errP MarBot0" ng-if="invalidPassword && isValidaitonErrorDisplay"  ng-bind="passwordErrorMessage"></p></div><div ng-show="!IsAuth" class="tabDisableOnBusy greeting" tabindex="0" ng-class="{\'has_img\':isPwdImageExists}">Hi, {{ PersonalId | mask }}</div><div class="form-group image-wrapper" ng-show="isPwdImageExists"><img id="imgSound" ng-src="{{ StepUpImageUrl }}" alt="{{ StepUpImageName }}" data-sound= "{{DataSound}}" data-sounduri="{{StepUpImageSoundUrl}}" imgindex="0" ng-click="playSound();"/><div ng-show="StepUpImageSoundUrl != null" id="imgSound" class="sound_img" data-sound= "{{DataSound}}" data-sounduri="{{StepUpImageSoundUrl}}" imgindex="0" ng-click="playSound();"></div><p>{{ StepUpImagePhrase }}</p></div><div class="form-group" ng-class="{has_errP:(invalidPassword && isValidaitonErrorDisplay)}"><label id="pwdField" for="txtPassword">Password</label><input id="txtPassword" name="password" handle-autofill focus-me="focusPassword" ng-keydown="ProcessPassword($event)" ng-model="Password" oncopy = "return false;" type="password" placeholder="Password" maxlength="24" class="tabDisableOnBusy form-control" ng-class="{\'err-highlightP\' : invalidPassword}"  ng-required="true" ng-minlength="8" ng-maxlength="24" />' +
            '<button id="btnShow" role="button" type="button" class="showHideBtn showHideDotComBtn" ng-click="showHidePwd();"  aria-label="{{isHide?\'Hide Password\':\'Show Password\'}}" >{{isHide?\'Hide\':\'Show\'}}</button>' +
            '<div class="form-group"><button type="submit" target="_top" value="Log In" id="btnLogin" ng-click="passwordbuttonClick();" class="tabDisableOnBusy btn btn-std-red-fill">Continue</button></div><div class="link-group"><button ng-show="isPersonIDDisplay" class="tabDisableOnBusy btn-transparent multi-btns" target="_top" ng-click="forgotPwdClick();" >Forgot Password?</button><button class="tabDisableOnBusy btn-transparent multi-btns" ng-click="cancelbuttonClick();">Cancel</button></div></div></form></div></div>';

            var uxrTempAccessCodeTemplate = '<div ng-class="isPartner ? \'widget-wrapper widget-wrapper-partner\' : \'widget-wrapper\'" role="login" ng-show="isTempAccessCode"><form name="tempAccessCodeForm" method="post" autocomplete="off" novalidate><div enable-placeholders="true"><h4 ng-show="!IsAuth"> Log In </h4>' +
            '<div aria-live="assertive">' +
            '<svg ng-show="isErrorMessage" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve" class="alert-svg" focusable="false" aria-hidden="true"><g id="Icons"><g><circle cx="16" cy="20" r="1"/><path d="M23.672,26H8.328c-1.208,0-2.287-0.615-2.887-1.646c-0.583-1.003-0.589-2.205-0.015-3.215l7.672-13.468 C13.695,6.625,14.78,6,16,6c1.221,0,2.305,0.625,2.901,1.671l7.672,13.467c0.574,1.01,0.569,2.212-0.015,3.216 C25.959,25.385,24.88,26,23.672,26z M16,8c-0.492,0-0.927,0.248-1.164,0.662L7.165,22.128c-0.221,0.389-0.219,0.834,0.006,1.221 C7.408,23.757,7.84,24,8.328,24h15.344c0.487,0,0.921-0.244,1.158-0.652c0.225-0.386,0.227-0.831,0.005-1.22L17.163,8.661 C16.928,8.247,16.493,8,16,8z"/><path d="M16,11.998c-0.592,0-1.055,0.467-0.995,1.004l0.445,4.449c0,0.303,0.245,0.549,0.549,0.549 c0.303,0,0.549-0.246,0.549-0.549h0.002l0.445-4.449C17.055,12.465,16.592,11.998,16,11.998z"/></g>' +
            '</g><g id="Grid" display="none"></g></svg>' +
            '<p ng-if="isErrorMessage" class="err" ng-bind="ErrorMessage"></p></div>' +
            '<div class="dynamic_content_wrapper"><div ng-show="!IsAuth" class="greeting" >Hi, {{ PersonalId | mask  }}</div><div class="form-group" ng-class="{has_err:invalidTempCode}"><label id="tempAccessCode" for="tmpAccessCode">Enter Your Temporary Access Code</label><input id="tmpAccessCode" type="text" id="txtTempAccessCode" handle-autofill focus-me="focusTempAccessCode" name="tempAccessCode" ng-keydown="tempAccessKeyDown($event)" ng-keypress="ProcessTempAccessCode($event)" ng-model="TempAccessCode" placeholder="Temporary Access Code" ng-required="true" ng-minlength="7" ng-maxlength="7" ng-pattern="/^[0-9]+$/" class="form-control" /></div>' +
            '<div aria-live="assertive"><p class="err" ng-if="invalidTempCode" ng-bind="accessCodeErrorMessage"></p></div>' +
                '<div class="form-group"><button type="submit" id="btnContinue" value="Continue" ng-click="tempaccesscodebuttonClick();" class="tabDisableOnBusy btn btn-std-red-fill">Continue</button></div><div class="link-group"><button class="btn-transparent multi-btns" ng-click="RedirectForgotTempAccessUrl();" >Forgot Access Code?</button><button class="btn-transparent multi-btns" ng-click="cancelbuttonClick();">Cancel</button></div></div></div></form></div>';

            if (!Array.prototype.filter) {
                Array.prototype.filter = function(fun /*, thisp */) {
                    "use strict";

                    if (this === void 0 || this === null)
                        throw new TypeError();

                    var t = Object(this);
                    var len = t.length >>> 0;
                    if (typeof fun !== "function")
                        throw new TypeError();

                    var res = [];
                    var thisp = arguments[1];
                    for (var i = 0; i < len; i++) {
                        if (i in t) {
                            var val = t[i]; // in case fun mutates this
                            if (fun.call(thisp, val, i, t))
                                res.push(val);
                        }
                    }

                    return res;
                };
            }

            //START PRJ:21940-CI- B-51259 changes
            showMortgageEnrollOption = function() {

                $rootScope.$broadcast('busy.begin');
                // add timeout to see spinner as per requirement
                setTimeout(function() {
                    SiteCatService.SiteCatTCall("LoginWidget", "MortgageNewToOlb", null); //CI B-52091
                    var divMortgageMessageTemplate = document.getElementById('divMortgageMessageTemplate');
                    if (divMortgageMessageTemplate) {
                        divMortgageMessageTemplate.style.display = 'none';
                    }
                    var divMortgageEnrollMessageTemplate = document.getElementById('divMortgageEnrollMessageTemplate');
                    if (divMortgageEnrollMessageTemplate) {
                        divMortgageEnrollMessageTemplate.style.display = 'inline-block';
                        $("#buttonEnrollOLbMal").focus();
                    }
                    // $("#divLoginSpinner").addClass("hidden");
                    $rootScope.$broadcast('busy.end', { remaining: 0 });
                }, 200);
            }

            //END PRJ:21940-CI- B-51259 changes  
            redirectToLoginAssist = function(params, url, useBaseUrl, baseUrl) {
                var laForm = document.createElement('form');
                laForm.id = "LAForm";
                laForm.method = 'post';
                var actionUrl;
                if (useBaseUrl) {
                    actionUrl = baseUrl + url;
                } else {
                    actionUrl = url;
                }

                laForm.action = actionUrl; //url;  //"/OLS/LoginAssist/Index";

                if (window.parent) {
                    laForm.target = '_parent';
                }

                for (var obj in params) {
                    var hiddenElement = document.createElement('INPUT');
                    hiddenElement.type = "HIDDEN";
                    hiddenElement.value = params[obj].value;
                    hiddenElement.name = params[obj].name;
                    laForm.appendChild(hiddenElement);
                }
                document.body.appendChild(laForm);
                laForm.submit();
            }
            /*START - dotcom loginwidget spinner template*/
            var spinnerTemplate = '';
            try {
                if (typeof Utility !== 'undefined' && Utility.isOnDotcom()) {
                    var cxrCapture = "true"; //CI - B-44889 cxReplay
                    var browser = Utility.getBrowser();
                    var browserName = browser[0].toLowerCase();
                    var browserVersion = browser[1];
                    if (browserName.indexOf('microsoft internet explorer') > -1 && browserVersion < 10) {
                        spinnerTemplate = '<div id="divLoading" busy busy-add-classes="lw__loader-ie-lower" not-busy-remove-classes="lw__loader-ie-lower" aria-live="assertive"></div>';
                    }
                    else {
                        spinnerTemplate = '<div busy busy-add-classes="lw__loader" not-busy-remove-classes="lw__loader" aria-live="assertive"><div class="spinner" aria-busy="false"><div class="holder"><div class="bar1"></div><div class="bar2"></div><div class="bar3"></div><div class="bar4"></div><div class="bar5"></div><div class="bar6"></div><div class="bar7"></div><div class="bar8"></div><div class="bar9"></div><div class="bar10"></div><div class="bar11"></div><div class="bar12"></div></div></div></div>';
                    }
                    spinnerTemplate = spinnerTemplate + '  <div class="contentHolder hide" aria-live="assertive"><span id="spinerSpan" class ="opacity0"></span></div>';

                }
            }
            catch (e) {
            }
            /*END - dotcom loginwidget spinner template*/

            /* 
            Following if statement detect old and new template by uxRefresh variable in url.
            This one has added because $scope.uxRefresh is not avaliable in this directive.
            First solution we had, which make a combined template string, had issue in form validation. 
        
            */
            var attrUxRefresh = document.getElementById("dvLoginWidgetDir") == null ? "" : document.getElementById("dvLoginWidgetDir").getAttribute("isuxrefresh");
            var attrUserType = document.getElementById("dvLoginWidgetDir") == null ? "" : document.getElementById("dvLoginWidgetDir").getAttribute("usertype");
            var url = window.location.href;
            if (url.indexOf("uxRefresh=true") > -1 || (attrUserType != "" && attrUxRefresh == 'True')) {
                attrUxRefresh = 'True';
                var loginTemplate = spinnerTemplate + hiddenVariables + uxrLoginTemplate + saLoginWidget + uxrStepUpCheckTemplate + uxrTempAccessCodeTemplate + uxrPasswordTemplate;
            } else {
                var loginTemplate = spinnerTemplate + hiddenVariables + loginTemplate + saLoginWidget + stepUpCheckTemplate + passwordTemplate + tempAccessCodeTemplate;
            }
            /* end of uxRefresh template selection */

            return {
                scope: {},
                restrict: "AE",
                template: loginTemplate,
                controller: function($scope, $http, $cookies, $injector, $document, $rootScope, $timeout, $state, dataContainer, saLoggingService, transmitService, SASiteCatService) {
                    $scope.enterKeyPress = function(keyEvent) {
                        if (keyEvent.which === 13) {
                        }
                    };

                    $scope.autoFillHandlers = [];
                    this.onAutofill = function(handler) { $scope.autoFillHandlers.push(handler); };

                    $scope.processAutofill = function() {
                        angular.forEach($scope.autoFillHandlers, function(handler) {
                            handler();
                        });
                    };

                    $scope.ProcessLogin = function(keyEvent) {
                        // Check for Ie8 browser. If not ie8 then the submit button will be called automatically.
                        if (navigator.appVersion.indexOf("MSIE 8.") != -1) {
                            if (keyEvent.keyCode === 13) {
                                $scope.loginbuttonClick();
                            }
                        }
                    };

                    $scope.ProcessPassword = function(keyEvent) {
                        //START - CARD 103 DE Changes
                        var keycode = (keyEvent.keyCode ? keyEvent.keyCode : keyEvent.which);
                        if (keycode === 9) {
                            $scope.hidePassword();
                        }
                        //End - CARD 103 DE Changes 
                        //START - B-51253, B-52808, B-50937 - CO Dec 17 - Clear the password text field
                        if (keyEvent.keyCode === 13) {
                            $scope.isEnterHitFromPasswordTextBox = true;
                        }
                        //END - B-51253, B-52808, B-50937
                        // Check for Ie8 browser. If not ie8 then the submit button will be called automatically.
                        if (navigator.appVersion.indexOf("MSIE 8.") != -1) {
                            if (keyEvent.keyCode === 13) {
                                $scope.passwordbuttonClick();
                            }
                        }
                    };
                    $scope.ProcessTempAccessCode = function(keyEvent) {
                        // Check for Ie8 browser. If not ie8 then the submit button will be called automatically.
                        if (navigator.appVersion.indexOf("MSIE 8.") != -1) {
                            if (keyEvent.keyCode === 13) {
                                $scope.tempaccesscodebuttonClick();
                            }
                        }
                    };

                    $scope.tempAccessKeyDown = function(keyEvent) {
                        // Allow: backspace, delete, tab, escape, enter and .
                        if ($scope.TempAccessCodeKeyArray.indexOf(keyEvent.keyCode) !== -1 ||
                        // Allow: Ctrl+A
                        (keyEvent.keyCode == 65 && keyEvent.ctrlKey === true) ||
                        // Allow: home, end, left, right
                        (keyEvent.keyCode >= 35 && keyEvent.keyCode <= 39)) {
                            // let it happen, don't do anything
                            return;
                        } else {
                            // Ensure that it is a number and stop the keypress
                            if (keyEvent.shiftKey || (keyEvent.keyCode < 48 || keyEvent.keyCode > 57) && (keyEvent.keyCode < 96 || keyEvent.keyCode > 105)) {
                                keyEvent.preventDefault();
                            }
                        }
                    };

                    // -- Transmit Changes
                    var messageService = getMessageService();
                    var isWidgetVal = document.getElementById('IsWidget') ? document.getElementById('IsWidget').value : "false";
                    $scope.IsUXRefresh = attrUxRefresh == 'True';
                    $scope.IsWidget = isWidgetVal ? isWidgetVal.toLowerCase() === "true" : false;
                    $scope.IsSharedAuth = false;
                    $scope.InvalidAttempts = 0;
                    $scope.saSuccessHandler = function(response) {

                        try {
                            var isWidget = $scope.IsWidget || $scope.IsUXRefresh || $scope.IsUxRefresh;
                            var storage = window.sessionStorage;
                            if (storage) {
                                storage.setItem('ts:userid', $scope.PersonalId ? $scope.PersonalId.toLowerCase() : '');
                                storage.setItem('ts:usertkn', response.token);
                                storage.setItem('ts:appid', $scope.TransmitAppID);
                            }

                            var tsParams = isWidget ? readSessionStorageItemsForTransmit() : null;
                            var regNumber = new RegExp("[^0-9]");
                            var cno = getParameterByName("cno");
                            var dest = getParameterByName("dest").toLowerCase() == "ptm"? getParameterByName("dest").toLowerCase() :"";
                            
                            var requestParams = {
                                "AppId": $scope.TransmitAppID,
                                "DeviceID": response.DeviceID,
                                "Policy": $scope.TransmitPolicy,
                                "Token": response.token,
                                "UserId": $scope.TransmitPersonalId,
                                "IsTempAccessFlow": $rootScope.AccessFlowMessage,
                                "TSParams": tsParams
                            };

                            var signonURL = '/Auth/SignOn/SignonWithTransmit';
                            $http.post($scope.authBaseurl + signonURL, requestParams, {
                                headers: { 'DT': $scope.DeviceToken, 'MP': $cookies["MP"] },
                                transformRequest: function(data) { return $scope.transformComplexRequest(data); }
                            }).then(function(response) {
                                if (response && response.data && response.data.RedirectUrl) {
                                    $rootScope.$broadcast('busy.begin');
                                    var redirectUrl = response.data.RedirectUrl;
                                   
                                    if(cno!="" && dest!="" && cno.length == 4 && !regNumber.test(cno)){
                                        redirectUrl += (redirectUrl.indexOf("?") < 0) ? '?dest=ptm&cno='+cno : '&dest=ptm&cno='+cno;
                                    }
                                    if (isWidget)
                                        redirectUrl += (redirectUrl.indexOf("?") < 0) ? '?tsParams=true' : '&tsParams=true';
                                    $scope.doRedirection(redirectUrl);
                                }
                                else {
                                    $scope.isAjaxCall = false;
                                    $scope.IsSharedAuth = false;
                                    ReloadAuthWidget(true);
                                }
                            });
                        }
                        catch (ex) {
                            saLoggingService.error('Error from Login');
                            saLoggingService.error(ex);
                        }

                        $rootScope.$broadcast('busy.end', { remaining: 0 });
                    };

                    $scope.saErrorHandler = function(response) {
                        $scope.isAjaxCall = false;
                        $scope.IsSharedAuth = false;
                        if (!response.IsValidUID) {
                            $scope.isErrorMessage = true;
                            $scope.isPersonIDDisplay = true;
                            $scope.IsAuth = true;
                            $scope.invalidPersonalId = true;
                            $scope.personalIdErrorMessage = response.ErrorMessage;
                            $scope.InvalidAttempts += 1;
                            if ($scope.InvalidAttempts >= 5) {
                                RedirectToOLSLA({ UID: true, Locked: true });
                            }
                            return;
                        }
                        // Handling the Mobile Approval reject scenario
                        // This will be executed on 3rd invalid attempt of Push Approval and user is locked as well.
                        if (response.isMobileApprovalDenied) {
                            $scope.isErrorMessage = true;
                            $scope.isPersonIDDisplay = true;
                            $scope.IsAuth = true;
                            $scope.invalidPersonalId = true;
                            $scope.personalIdErrorMessage = "Authorization on mobile device was denied.";
                            return;
                        }
                        if (response.userLockedQA) {
                            RedirectToOLSLA({ QA: true, Locked: true });
                            return;
                        }
                        if (response.isDeviceNotAvailable) {
                            $scope.IsSharedAuth = true;
                            //document.getElementById("no-device-error").innerHTML = "<div class='omni-modal-body'><p class='device-error general' role='alert' aria-live='assertive'>To use these features, you must have Push enabled on your device. You can manage Push Notifications in the Device Manager or in the My Profile section of the app.</p></div>";
                            $state.go("ErrorPage", { transmitParams: {} });
                            return;
                        }
                        if (response.IsValidUID)
                            ReloadAuthWidget(true);
                    };

                    $scope.$on("ResetLogin", function(eventDetails, eventArgs) {
                        $scope.isAjaxCall = false;
                        $scope.IsSharedAuth = false;
                        ReloadAuthWidget(eventArgs.showError);
                    });

                    $scope.$on("ResetSALogin", function(eventDetails, eventArgs) {
                        $scope.isAjaxCall = false;
                        $scope.IsSharedAuth = false;
                        $scope.reloadSALoginWidget(eventArgs.showError, eventArgs.errorMessage);
                    });

                    $scope.$on("RedirectToLA", function(eventDeatils, eventArgs) {
                        if (eventArgs.ResetPwd) {
                            RedirectToOLSLA({ PWD: true, Locked: eventArgs.Locked });
                            return;
                        }
                    });

                    $scope.$on("UserLocked", function(eventDeatils, eventArgs) {
                        RedirectToOLSLA({ QA: true, Locked: true });
                        return;
                    });

                    $rootScope.$on("StepUp", function() {
                        if (messageService) messageService.DisplayStepUpMessages($scope);
                    });

                    $rootScope.$on("Password", function(eventDetails, eventArgs) {
                        if (messageService) messageService.DisplayPasswordMessages($scope, eventArgs.PasswordImageExists);
                    });

                    $scope.$on("ChangePassword", function(eventDetails, eventArgs) {
                        // Redirecting the user to New ChangePassword page in LA
                        RedirectToOLSLA({ ChangePWD: true, existingPwd: eventArgs.existingPwd });
                    });

                    function RedirectToOLSLA(request) {
                        var loginAssistParams = [];
                        loginAssistParams.push(
                            { name: 'AppName', value: $scope.AppName },
                            { name: 'InSession', value: 'false' },
                            { name: 'CancelURL', value: $scope.CancelUrl },
                            { name: 'LockIndicator', value: request.Locked ? 'True' : 'False' },
                            { name: 'PersonalId', value: $scope.TransmitPersonalId },
                            { name: 'Password', value: request.existingPwd });

                        var targetUrl = request.UID ? "/OLS/LoginAssist/RetriveId" :
                            request.QA ? "/OLS/LoginAssist/ResetAnswers" :
                                request.PWD ? "/OLS/LoginAssist/ResetPassword" :
                                    request.ChangePWD ? "/OLS/LoginAssist/ChangePassword" : null;

                        if (targetUrl) {
                            redirectToLoginAssist(loginAssistParams, targetUrl, $scope.useBaseUrl, $scope.baseUrl);
                        }
                    }

                    function ReloadAuthWidget(showError) {
                        $timeout(function() { $scope.reloadLoginWidget(showError); }, 0, true);
                        if (messageService) messageService.DisplayLoginMessages($scope);
                    }

                    function getMessageService() {
                        try {
                            return $injector.get('msgService');
                        }
                        catch (ex) { }
                        return undefined;
                    }

                    function readSessionStorageItemsForTransmit() {
                        if (!window.sessionStorage) return null;
                        var length = window.sessionStorage.length;
                        var uidInLowerCase = $scope.PersonalId.toLowerCase();

                        var params = [];
                        for (var index = 0; index < length; ++index) {
                            var key = window.sessionStorage.key(index);
                            if (!key) continue;

                            if (key.startsWith("ts:")
                            /*  && key.endsWith(uidInLowerCase)*/) {
                                params.push({ Key: key, Value: window.sessionStorage.getItem(key) });
                            }
                        }

                        return params;
                    }
                    function getParameterByName(name, url) {
                        if (!url) url = window.location.href;
                        name = name.replace(/[\[\]]/g, '\\$&');
                        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                            results = regex.exec(url);
                        if (!results) return '';
                        if (!results[2]) return '';
                        return decodeURIComponent(results[2].replace(/\+/g, ' '));
                    }
                    // -- Transmit Changes

                    $scope.PersonalId = $cookies["MP"];
                    $scope.RememberUserId = $scope.PersonalId ? true : false;
                    $scope.DeviceToken = $cookies["DT"];
                    $scope.invalidPersonalId = false;
                    $scope.invalidTempCode = false;
                    $scope.isContinueButtonDisplay = true;
                    $scope.isPersonIDDisplay = true;
                    $scope.isValidaitonErrorDisplay = true;
                    $scope.ShieldAnswerComb = '';
                    $scope.ShieldAnswer1 = '';
                    $scope.ShieldAnswer2 = '';
                    $scope.ShieldAnswer3 = '';
                    $scope.baseUrl = '';
                    $scope.Env = '';
                    $scope.TempAccessCode = '';
                    $scope.param = function(a) {
                        var r20 = /%20/g,
                            prefix,
                            s = [],
                            add = function(key, value) {
                                value == null ? "" : value;
                                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
                            };

                        for (prefix in a) {
                            add(prefix, a[prefix]);
                        }
                        return s.join("&").replace(r20, "+");
                    };
                    $scope.transformComplexRequest = function(request) {
                        var r20 = /%20/g;
                        var convert = function(parent, request) {
                            var transformedRequest = [];

                            for (property in request) {
                                var value = request[property];

                                if (Array.isArray(value)) {
                                    var index = 0;
                                    for (index = 0; index < value.length; ++index) {
                                        for (innerProp in value[index]) {
                                            var innerValue = value[index][innerProp];
                                            var innerKey = property + '[' + index + '].' + innerProp;
                                            transformedRequest[transformedRequest.length] = encodeURIComponent(innerKey) + "=" + encodeURIComponent(innerValue);
                                        }
                                    }
                                    //}else if (typeof (value) == "object") {
                                    //    var newParent = parent ? parent + "." : property;
                                    //    var result = convert(newParent, value);
                                    //    if (result) {
                                    //        var length = result.length;
                                    //        for (var count = 0; count < length; ++count) {
                                    //            transformedRequest.push(result[count]);
                                    //        }
                                    //    }
                                } else {
                                    value = (value == null || value == undefined) ? "" : value;
                                    transformedRequest[transformedRequest.length] = encodeURIComponent(parent ? parent + "." + property : property) + "=" + encodeURIComponent(value);
                                }
                            }

                            return transformedRequest;
                        }
                        var response = convert(null, request);

                        return response.join("&").replace(r20, "+");
                    };

                    try {
                        var msgService = $injector.get('msgService');
                        msgService.DisplayMsg($scope);
                    } catch (e) {
                    }

                    //Initialise SiteCatService
                    SiteCatService.InitSiteCatService($scope);

                    $scope.showValidationMessage = function() {
                        return $scope.isRequired || $scope.isMinLength || $scope.isPattern || $scope.isErrorMessage;
                    },
                    $scope.ddlchange = function(item) {
                        $scope.ddlSelectedId = item;
                        $scope.isValidaitonErrorDisplay = false;
                        if (item.id == 1 || item.id == 2) {
                            $scope.isContinueButtonDisplay = true;
                            $scope.isPersonIDDisplay = true;
                            $scope.isGoButtonDisplay = false;
                            $scope.isMortgageDisplay = false; //PRJ:21940-CI- B-51259 changes
                            $scope.PersonalId = null;
                            $scope.focusInput = true;
                            $scope.focusPassword = false;
                            $scope.focusTempAccessCode = false;
                            //PRJ:21940-CI- B-51259 changes
                            var divMortgageMessageTemplate = document.getElementById('divMortgageMessageTemplate');
                            if (divMortgageMessageTemplate) {
                                divMortgageMessageTemplate.style.display = 'none';
                            }
                            var divMortgageEnrollMessageTemplate = document.getElementById('divMortgageEnrollMessageTemplate');
                            if (divMortgageEnrollMessageTemplate) {
                                divMortgageEnrollMessageTemplate.style.display = 'none';
                            }
                            //PRJ:21940-CI-Mar 2017-Dropdown changes
                            if ($scope.IsAuth && !($scope.IsLogOut || $scope.IsSessionTimeOut)) {
                                var divLoginNewUserMessageTemplate = document.getElementById('divLoginNewUserMessageTemplate');
                                if (divLoginNewUserMessageTemplate) {
                                    divLoginNewUserMessageTemplate.style.display = 'inline-block';
                                }
                            }
                            //START PRJ:21940-CI- B-51259 changes
                        } else if (item.id == 3 && $scope.IsAuth) {
                            if ($scope.IsAuth && !($scope.IsLogOut || $scope.IsSessionTimeOut)) {
                                var divLoginNewUserMessageTemplate = document.getElementById('divLoginNewUserMessageTemplate');
                                if (divLoginNewUserMessageTemplate) {
                                    divLoginNewUserMessageTemplate.style.display = 'none';
                                }
                            }
                            var divMortgageEnrollMessageTemplate = document.getElementById('divMortgageEnrollMessageTemplate');
                            if (divMortgageEnrollMessageTemplate) {
                                divMortgageEnrollMessageTemplate.style.display = 'none';
                            }

                            var divMortgageMessageTemplate = document.getElementById('divMortgageMessageTemplate');
                            if (divMortgageMessageTemplate) {
                                divMortgageMessageTemplate.style.display = 'inline-block';
                                $("#buttonLoginOLbMAL").focus();
                                $("#buttonLoginOLbMAL").click(function() {
                                    $scope.$broadcast('change-drop-down', $scope.loginddlOptions[0]);
                                });
                            }
                            $scope.isContinueButtonDisplay = false;
                            $scope.isPersonIDDisplay = false;
                            $scope.isGoButtonDisplay = false;
                            $scope.isMortgageDisplay = true;
                            // END PRJ:21940-CI- B-51259 changes
                        } else {
                            //PRJ:21940-CI-Mar 2017-Dropdown changes
                            if ($scope.IsAuth && !($scope.IsLogOut || $scope.IsSessionTimeOut)) {
                                var divLoginNewUserMessageTemplate = document.getElementById('divLoginNewUserMessageTemplate');
                                if (divLoginNewUserMessageTemplate) {
                                    divLoginNewUserMessageTemplate.style.display = 'none';
                                }
                            }
                            //START PRJ:21940-CI- B-51259 changes
                            var divMortgageEnrollMessageTemplate = document.getElementById('divMortgageEnrollMessageTemplate');
                            if (divMortgageEnrollMessageTemplate) {
                                divMortgageEnrollMessageTemplate.style.display = 'none';
                            }
                            var divMortgageMessageTemplate = document.getElementById('divMortgageMessageTemplate');
                            if (divMortgageMessageTemplate) {
                                divMortgageMessageTemplate.style.display = 'none';
                            }
                            //END PRJ:21940-CI- B-51259 changes
                            $scope.isContinueButtonDisplay = false;
                            $scope.isPersonIDDisplay = false;
                            $scope.isMortgageDisplay = false; //PRJ:21940-CI- B-51259 changes
                            $scope.isGoButtonDisplay = true;
                        }
                        $scope.invalidPersonalId = false;
                        $scope.isValidaitonErrorDisplay = true;
                        $scope.isErrorMessage = false;
                        //PRJ:21940-CI-Mar 2017-Omniture implementation
                        var dynamicValue = { "prop53": Omniture.constants["LoginWidget"][$scope.IsAuth ? "StandalonePersonalIdDropdownSelection" : "PersonalIdDropdownSelection"]["dynamic"] + ':' + item.label.toLowerCase() }
                        SiteCatService.SiteCatTLCall("LoginWidget", "PersonalIdDropdownSelection", dynamicValue);
                    },
                    $scope.btnGoClick = function() {
                        //PRJ:21940-CI-Mar 2017-Omniture implementation
                        var dynamicValue = { "prop53": Omniture.constants["LoginWidget"][$scope.IsAuth ? "StandalonePersonalIdButtonGoClick" : "PersonalIdButtonGoClick"]["dynamic"] + ':' + $scope.ddlSelectedId.label.toLowerCase() };
                        SiteCatService.SiteCatTLCall("LoginWidget", "PersonalIdButtonGoClick", dynamicValue);
                        if (angular.isDefined($scope.ddlSelectedId) && $scope.ddlSelectedId.id != -1) {
                            var win = window.parent || window;
                            win.location = $scope.ddlSelectedId.value;
                        }
                    },
                    $scope.doRedirection = function(redirectionUrl) {
                        if ($scope.useBaseUrl && redirectionUrl.indexOf("http") < 0) {
                            window.location = $scope.baseUrl + redirectionUrl;
                        } else if (window.parent) {
                            if (redirectionUrl.indexOf("http") < 0) {
                                window.parent.location = window.location.protocol + "//" + window.location.host + redirectionUrl;
                            } else {
                                window.parent.location = redirectionUrl;
                            }
                        } else {
                            window.location = redirectionUrl;
                        }
                    },
                    //Omniture Code
                    $scope.onRememberIdChange = function() {
                        if ($scope.IsAuth) {
                            if ($scope.RememberUserId) {
                                SiteCatService.SiteCatTLCall("LoginWidget", "StandalonePersonalIdRememberIdSelected", null);
                            } else {
                                SiteCatService.SiteCatTLCall("LoginWidget", "StandalonePersonalIdRememberIdDeSelected", null);
                            }
                        } else {
                            if ($scope.RememberUserId) {
                                SiteCatService.SiteCatTLCall("LoginWidget", "PersonalIdRememberIdSelected", null);
                            } else {
                                SiteCatService.SiteCatTLCall("LoginWidget", "PersonalIdRememberIdDeSelected", null);
                            }
                        }
                    },
                     $scope.OpenBrowserBlockedPopup = function() {
                         if ($scope.IsUxRefresh) {
                             document.querySelector('#wrapperId').className += " opacity-05";
                             document.querySelector('#wrapperId').style.marginTop += "-30px";
                             document.querySelector('#uxrLoginTemplate').style.pointerEvents = 'none';
                             angular.element(document.querySelector('#divBlockedUnsupportedMessage')).removeClass("hide").css("display", "table");
                             document.querySelector('#divBlockedUnsupportedMessage').style.pointerEvents = 'auto';
                             angular.element(document.querySelector('#chkRemember')).attr('disabled', 'disabled').css('cursor', 'auto').css('outline', '0');
                             angular.element(document.querySelector('#textAccountType')).attr('disabled', 'disabled').css('cursor', 'auto');
                             angular.element(document.querySelector('#textPersonalId')).attr('disabled', 'disabled').css('cursor', 'auto');
                             angular.element(document.querySelector('#btnContinue')).attr('disabled', 'disabled').css('cursor', 'auto');
                             angular.element(document.querySelector('#linkForgotID')).attr('disabled', 'disabled').css('cursor', 'auto');
                             angular.element(document.querySelector('#linkNewUserEnroll')).attr('disabled', 'disabled').css('cursor', 'auto');
                             //document.getElementById('linkUpgradeBrowser').text = "update your browser.";
                             document.getElementById('unsupportSpanMessage').innerHTML = "It's really time now. Please update your browser.";
                             document.getElementById('unsupportSpanMessage').innerHTML = document.getElementById('unsupportSpanMessage').innerHTML + ' Log in access will be restored once you upgrade.';
                             angular.element(document.querySelector('#linkUpgradeBrowser')).attr('tabindex', '0').attr('aria-label', 'update your browser. ');
                             angular.element(document.querySelector('#Errormessage1')).attr('tabindex', '-1').attr('aria-label', 'it is really time now. please ');
                             angular.element(document.querySelector('#Errormessage2')).attr('tabindex', '-1').attr('aria-label', 'Log in access will be restored once you upgrade.');

                             angular.element(document.querySelector('#unsupportSpanMessage')).attr('role', 'alert').attr('aria-invalid', 'false');
                             angular.element(document.querySelector('#unsupportBackground')).removeClass("hide");

                             //CI:Dec-2017, B-55520, Rebranding login screen loading during Blocked browser scenario
                             SiteCatService.SiteCatTLCall("LoginWidget", "DotComBlockBrowser", "DotComBlockEvent");
                         }
                         else {
                             document.querySelector('#divLoginPersonId').style.pointerEvents = 'none';
                             document.querySelector('#divLoginPersonId').className += " opacity-085";
                             document.querySelector('#backgroundUnsupport').className += " backgroundBlockLegacy";
                             angular.element(document.querySelector('#divBlockedUnsupportedMessage')).removeClass("hide");
                             document.querySelector('#divBlockedUnsupportedMessage').style.pointerEvents = 'auto';
                             angular.element(document.querySelector('#chkRemember')).attr('disabled', 'disabled').css('cursor', 'auto');
                             angular.element(document.querySelector('#txtPersonalId')).attr('disabled', 'disabled').css('cursor', 'auto');
                             angular.element(document.querySelector('#btnContinue')).attr('disabled', 'disabled').css('cursor', 'auto');
                             //CI:Dec-2017, B-55520, Legacy login screen loading during Blocked browser scenario
                             SiteCatService.SiteCatTCall("LoginWidget", "LegacyDotComBlockBrowser", null);
                         }
                     },
                    $scope.RedirectForgotIdUrl = function() {
                        if ($scope.IsAuth) {
                            if ($scope.IsLogOut) {
                                SiteCatService.SiteCatTLCall("LoginWidget", "LogOutForgotPersonalIdLinkClick", null);
                            } else if ($scope.IsSessionTimeOut) {
                                SiteCatService.SiteCatTLCall("LoginWidget", "SessionTimeoutForgotPersonalIdLinkClick", null);
                            } else {
                                SiteCatService.SiteCatTLCall("LoginWidget", "StandalonePersonalIdForgotIdLinkClick", null);
                            }
                        } else {
                            SiteCatService.SiteCatTLCall("LoginWidget", "PersonalIdForgotIdLinkClick", null);
                        }
                        // START CI-LoginAssistance : Retrieve ID
                        var loginAssistParams = [];
                        loginAssistParams.push({ name: 'AppName', value: $scope.AppName },
                                                { name: 'InSession', value: 'false' },
                                                { name: 'CancelURL', value: $scope.CancelUrl });

                        redirectToLoginAssist(loginAssistParams, '/OLS/LoginAssist/RetriveId', $scope.useBaseUrl, $scope.baseUrl);
                        // End CI-LoginAssistance : Retrieve ID
                    },
                    $scope.RedirectForgotTempAccessUrl = function() {
                        SiteCatService.SiteCatTLCall("LoginWidget", "ForgotTempAccessCodeLink", null);
                        $scope.doRedirection($scope.StepUpForgotAnswerUrl);

                    },
                    $scope.RedirectNewUserEnrollUrl = function() {
                        SiteCatService.SiteCatTLCall("LoginWidget", "PersonalIdEnrollNowLinkClick", null);
                        $scope.doRedirection($scope.NewUserEnrollUrl);
                    },
                    $scope.RemoveFocus = function() {
                        SiteCatService.SiteCatTLCall("LoginWidget", "PersonalIdRemoveFocus", null);
                    },
                    $scope.createDynamicElement = function(userForm, elementName, elementValue) {
                        var elem = document.createElement('INPUT');
                        elem.type = 'HIDDEN';
                        elem.value = elementValue;
                        elem.name = elementName;
                        userForm.appendChild(elem);
                    },
                    $scope.loginbuttonClick = function() {
                        if ($scope.isAjaxCall) {
                            return;
                        }

                        $scope.processAutofill();

                        $scope.$broadcast('userForm-validation');
                        $scope.isErrorMessage = false;
                        if ($scope.userForm.$invalid) {
                            if ($scope.IsAuth) {
                                SiteCatService.SiteCatTCall("LoginWidget", "StandalonePersonalIdFormatError", null);
                            } else {
                                SiteCatService.SiteCatTCall("LoginWidget", "PersonalIdFormatError", null);
                            }
                            return;
                        }
                        //Setting flag to show login button is clicked.
                        $("#hdnUserSubmitedForm").val("true");
                        //Checking if machineSecretWrapper js file is already executed to load Actimize data or not.
                        if ($("#hdnEntrustCompleted").val() == "false") {
                            return;
                        }
                        $scope.isAjaxCall = true;
                        //Omniture Code
                        if ($cookies["MP"] != null && $scope.RememberUserId && $cookies["MP"] == $scope.PersonalId) {
                            if ($scope.IsAuth) {
                                SiteCatService.SiteCatTLCall("LoginWidget", "StandalonePersonalIdIdentifier", null);
                            } else {
                                SiteCatService.SiteCatTLCall("LoginWidget", "PersonalIdIdentifier", null);
                            }
                        }

                        data = {
                            'PersonalId': $scope.PersonalId,
                            'MachineAttribute': $scope.MachineAttributes,
                            'UserType': $scope.UserType,
                            'RememberUserId': $scope.RememberUserId,
                            'userId': $scope.PersonalId,
                            'LoginType': $scope.loginType,
                            'ReferrerId': $scope.ReferrerId,
                            'ActimizeData': document.getElementById('ActimizeData').value
                        };

                        try {
                            //Defect# 21762 Begin
                            //AppD 4.3 instrumentation. User ID needs to be placed in this variable and maintained in scope.
                            //Agent will automatically pick it up and attach to page loads and AJAX calls subsequently. Hence the global.
                            window.signOnUserId = $scope.PersonalId;
                            //Defect# 21762 End
                        }
                        catch (ex) {
                        }

                        $scope.baseUrl = $scope.baseUrl ? $scope.baseUrl : '';
                        $scope.Env = $scope.Env ? $scope.Env : '';
                        $scope.authBaseurl = $scope.authBaseurl ? $scope.authBaseurl : '';
                        $http.post($scope.authBaseurl + logInWidgetUrl + $scope.Env, data, {
                            headers: { 'DT': $scope.DeviceToken, 'MP': $cookies["MP"] },
                            transformRequest: function(data) { return $scope.param(data); }
                        }).
                            then(function(response) {
                                if (!$scope.isValidResponse(response, "PersonalId", true, false)) {
                                    $scope.isAjaxCall = false;
                                    return;
                                }

                                try {

                                    if (response.data.Data.IsSharedAuthPilotUser) {

                                        transmitService.clearEventHandlers();
                                        transmitService.onAuthenticatorsChanged(function() {
                                            $scope.IsSharedAuth = true;
                                            $rootScope.$broadcast('busy.end', { remaining: 0 });
                                        });
                                        $scope.showAuthModal = true;
                                        $scope.isSharedAuthModal = true;

                                        $scope.TransmitPersonalId = response.data.Data.UserID;

                                        dataContainer.SessionGUID = $scope.SessionGUID = response.data.Data.SessionGUID;
                                        dataContainer.TransactionID = $scope.TransactionID = response.data.Data.TransactionID;
                                        dataContainer.TransmitURL = $scope.TransmitURL = response.data.Data.TransmitURL;
                                        dataContainer.IDShieldBaseURL = $scope.IDShieldBaseURL = response.data.Data.IDShieldBaseURL;
                                        dataContainer.PasswordBaseURL = $scope.PasswordBaseURL = response.data.Data.PasswordBaseURL;
                                        dataContainer.ImageBaseURL = $scope.ImageBaseURL = response.data.Data.ImageBaseURL;
                                        dataContainer.SoundBaseURL = $scope.SoundBaseURL = response.data.Data.SoundBaseURL;
                                        dataContainer.TransmitAppID = $scope.TransmitAppID = response.data.Data.TransmitAppID;
                                        dataContainer.TransmitPolicy = $scope.TransmitPolicy = response.data.Data.TransmitPolicy;
                                        dataContainer.IsOAMEnabled = $scope.IsOAMEnabled = response.data.Data.IsOAMEnabled;
                                        dataContainer.OAMPostUrl = $scope.OAMPostUrl = response.data.Data.OAMPostUrl;
                                        dataContainer.SuccessHandler = $scope.saSuccessHandler;
                                        dataContainer.ErrorHandler = $scope.saErrorHandler;
                                        dataContainer.CancelURL = $scope.CancelUrl;

                                        var actmizeDataContainer = document.getElementById('ActimizeData');
                                        var usernameInLowerCase = $scope.TransmitPersonalId ? $scope.TransmitPersonalId.toLowerCase() : $scope.TransmitPersonalId;
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
                                            actimizeData: actmizeDataContainer ? actmizeDataContainer.value : (dataContainer.ActimizeData ? dataContainer.ActimizeData : ""),
                                            isOAMEnabled: dataContainer.IsOAMEnabled,
                                            OAMPostUrl: dataContainer.OAMPostUrl,
                                            CancelURL: dataContainer.CancelURL,
                                            ContextData: "",
                                            InWidget: true,
                                            busyElement: 'divLoading',
                                            busyClass: 'lw__loader'
                                        };

                                        $scope.navigatePage = function(pageName, params) { $state.go(pageName, { transmitParams: params }); };
                                        transmitService.showOptions(
                                                null,
                                                null,
                                                usernameInLowerCase,
                                                dataContainer.SuccessHandler,
                                                dataContainer.ErrorHandler,
                                                dataContainer.TransmitAppID,
                                                dataContainer.TransmitPolicy,
                                                dataContainer.TransmitURL,
                                                requestParameter,
                                                $scope,
                                                null,
                                                SASiteCatService,
                                                $rootScope,
                                                dataContainer);

                                        return;
                                    }

                                    $scope.data = response.data.Data;
                                    if ($scope.data.Redirect && $scope.data.RedirectUrl) {
                                        $scope.doRedirection($scope.data.RedirectUrl);
                                        return;
                                    }

                                    $scope.ViewName = $scope.data.ViewName;
                                    if ($scope.ViewName != 'Password' && $scope.ViewName != 'ProtectedResource') {
                                        $scope.PersonalId = $scope.data.PersonalId;
                                    }

                                    $scope.ErrorMessage = $scope.data.ErrorMessage;
                                    $scope.StepUpForgotAnswerUrl = $scope.data.StepUpForgotAnswerUrl;
                                    $scope.AuthenticationType = $scope.data.AuthenticationType;
                                    $scope.RegisterComputer = $scope.data.StepUpShieldQuestion != null ? $scope.data.StepUpShieldQuestion.RegisterComputer : true;

                                    if ($scope.ErrorMessage == null) {
                                        $scope.isErrorMessage = false;
                                        if ($scope.AuthenticationType == 'TemporaryAccessCode') {
                                            $scope.isLogIn = false;
                                            $scope.isStepUp = false;
                                            $scope.isPassword = false;
                                            $scope.isTempAccessCode = true;
                                            $scope.focusTempAccessCode = true;

                                            $scope.ClearTimeOut();
                                            $scope.SetTimeOut();

                                            SiteCatService.SiteCatTCall("LoginWidget", "TempAccessCode", null);
                                            $scope.isAjaxCall = false;
                                        } else {
                                            if ($scope.ViewName == 'Password' || $scope.ViewName == 'ProtectedResource') {
                                                $scope.displayPasswordWidget();
                                            } else {
                                                $scope.StepUpShieldQuestion = $scope.data.StepUpShieldQuestion.QuetionText;
                                                $scope.StepUpAnswerFormat = $scope.data.StepUpShieldQuestion.AnswerFormat;
                                                $scope.StepUpAnswerMaxLength = $scope.data.StepUpShieldQuestion.AnswerMaxLength;
                                                $scope.RequiredValidationMessage = $scope.data.StepUpShieldQuestion.RequiredValidationMessage;
                                                $scope.MinLengthValidationMessage = $scope.data.StepUpShieldQuestion.MinLengthValidationMessage;
                                                $scope.RegexValidationMessage = $scope.data.StepUpShieldQuestion.RegexValidationMessage;
                                                $scope.isLogIn = false;
                                                $scope.isStepUp = true;
                                                $scope.isPassword = false;
                                                $scope.isTempAccessCode = false;

                                                var displayAnswerDiv = "";

                                                if ($scope.StepUpAnswerFormat == 'MMDD') {
                                                    displayAnswerDiv = "MMDD";
                                                } else if ($scope.StepUpAnswerFormat == 'DATE6') {
                                                    displayAnswerDiv = "DATE6";
                                                } else if ($scope.StepUpAnswerFormat == 'MMYY') {
                                                    displayAnswerDiv = "MMYY";
                                                } else if ($scope.StepUpAnswerFormat == 'TIME4') {
                                                    displayAnswerDiv = "TIME4";
                                                } else if ($scope.StepUpAnswerFormat == 'PHONE10' && $scope.StepUpAnswerMaxLength == '10') {
                                                    displayAnswerDiv = "PHONE10";
                                                } else if ($scope.StepUpAnswerFormat == 'NUMBER' && $scope.StepUpAnswerMaxLength == '4') {
                                                    displayAnswerDiv = "DIV4";
                                                } else if ($scope.StepUpAnswerFormat == 'NUMBER' && $scope.StepUpAnswerMaxLength == '5') {
                                                    displayAnswerDiv = "DIV5";
                                                } else if ($scope.StepUpAnswerFormat == 'NUMBER' && $scope.StepUpAnswerMaxLength == '6') {
                                                    displayAnswerDiv = "DIV6";
                                                } else if ($scope.StepUpAnswerFormat == 'NUMBER') {
                                                    displayAnswerDiv = "NUMBER";
                                                } else if ($scope.StepUpAnswerFormat == 'ALPHA') {
                                                    displayAnswerDiv = "ALPHA";
                                                } else if ($scope.StepUpAnswerFormat == 'ALPHANUM') {
                                                    displayAnswerDiv = "ALPHANUM";
                                                } else if ($scope.StepUpAnswerFormat == 'EMAIL') {
                                                    displayAnswerDiv = "EMAIL";
                                                }
                                                $scope.stepupAnswerDiv = displayAnswerDiv;

                                                $scope.ClearTimeOut();
                                                $scope.SetTimeOut();
                                                //Omniture - System displays the enter security question answer module
                                                if ($scope.data.IsBogusStepUpQuestion) {
                                                    if ($scope.IsAuth) {
                                                        SiteCatService.SiteCatTCall("LoginWidget", "StandaloneAnswSecrtyQustnfdq", null);
                                                    } else {
                                                        SiteCatService.SiteCatTCall("LoginWidget", "AnswSecrtyQustnfdq", null);
                                                    }
                                                } else {
                                                    if ($scope.IsAuth) {
                                                        SiteCatService.SiteCatTCall("LoginWidget", "StandaloneAnswSecrtyQustn", null);
                                                    } else {
                                                        SiteCatService.SiteCatTCall("LoginWidget", "AnswSecrtyQustn", null);
                                                    }
                                                }

                                                $scope.isAjaxCall = false;
                                            }
                                        }
                                    } else {
                                        if ($scope.data.InvalidLoginAttempts == 3 || $scope.data.Code == 203) {
                                            var loginAssistParams = [];
                                            loginAssistParams.push({ name: 'AppName', value: $scope.AppName },
                                                                         { name: 'InSession', value: 'false' },
                                                                         { name: 'CancelURL', value: $scope.CancelUrl },
                                                                         { name: 'LockIndicator', value: 'True' });

                                            if ($scope.data.LARedirectLink.indexOf("type=pid") > 0) {
                                                redirectToLoginAssist(loginAssistParams, "/OLS/LoginAssist/RetriveId", $scope.useBaseUrl, $scope.baseUrl);
                                            } else if ($scope.data.LARedirectLink.indexOf("type=ans") > 0) {
                                                redirectToLoginAssist(loginAssistParams, "/OLS/LoginAssist/ResetAnswers", $scope.useBaseUrl, $scope.baseUrl);
                                            }

                                        } else {
                                            $scope.isErrorMessage = true;
                                            //Omniture Code
                                            if ($scope.data.UserIPLocked) {
                                                if ($scope.IsAuth) {
                                                    SiteCatService.SiteCatTCall("LoginWidget", "StandalonePersonalIdIPLockError", null);
                                                } else {
                                                    SiteCatService.SiteCatTCall("LoginWidget", "PersonalIdIPLockError", null);
                                                }
                                            } else if ($scope.data.InvalidLoginAttempts == 1) {
                                                $scope.invalidPersonalId = true;
                                                $scope.personalIdErrorMessage = $scope.ErrorMessage;
                                                $scope.isErrorMessage = false;
                                                if ($scope.IsAuth) {
                                                    SiteCatService.SiteCatTCall("LoginWidget", "StandalonePersonalIdRecognizedFirstError", null);
                                                } else {
                                                    SiteCatService.SiteCatTCall("LoginWidget", "PersonalIdRecognizedFirstError", null);
                                                }
                                            } else if ($scope.data.InvalidLoginAttempts == 2) {
                                                $scope.invalidPersonalId = true;
                                                $scope.personalIdErrorMessage = $scope.ErrorMessage;
                                                $scope.isErrorMessage = false;
                                                if ($scope.IsAuth) {
                                                    SiteCatService.SiteCatTCall("LoginWidget", "StandalonePersonalIdRecognizedSecondError", null);
                                                } else {
                                                    SiteCatService.SiteCatTCall("LoginWidget", "PersonalIdRecognizedSecondError", null);
                                                }
                                            } else {
                                                if ($scope.IsAuth) {
                                                    SiteCatService.SiteCatTCall("LoginWidget", "StandalonePersonalIdSystemError", null);
                                                } else {
                                                    SiteCatService.SiteCatTCall("LoginWidget", "PersonalIdSystemError", null);
                                                }
                                            }
                                        }
                                        $scope.isAjaxCall = false;
                                    }
                                    $scope.checkboxModel = {
                                        value: $scope.RegisterComputer
                                    };
                                } catch (ex) {
                                    $scope.isAjaxCall = false;
                                }
                            },
                            function(response) {
                                $scope.isValidResponse(null, "PersonalId", true, false);
                                $scope.isAjaxCall = false;

                            });
                    },
                    $scope.stepupCheckbuttonClick = function() {
                        if ($scope.isAjaxCall) {
                            return;
                        }

                        $scope.processAutofill();
                        $scope.$broadcast('stepUpForm-validation');
                        $scope.isErrorMessage = false;
                        $scope.serverValidation = false;
                        var focusSet = false;
                        if ($scope.stepUpForm.$invalid) {
                            //START - PRJ:21940-CI-April 2017, B-30151 Changes
                            angular.forEach($scope.stepUpForm.$error, function(field) {
                                angular.forEach(field, function(errorField) {
                                    if (!focusSet) { //Set focus to first error field only if there are multiple fields(textboxes) in the answer(Eg.10/10/10)
                                        document.getElementsByName(errorField.$name)[0].focus();
                                        focusSet = true;
                                    }
                                })
                            });
                            //END - PRJ:21940-CI-April 2017, B-30151 Changes
                            return;
                        }
                        $scope.isAjaxCall = true;

                        data =
                            {
                                'PersonalId': $scope.PersonalId,
                                'MachineAttribute': $scope.MachineAttributes,
                                'StepUpShieldQuestion.Answer': $scope.ShieldAnswerComb,
                                'StepUpShieldQuestion.AnswerFormat': $scope.StepUpAnswerFormat,
                                'StepUpShieldQuestion.AnswerMaxLength': $scope.StepUpAnswerMaxLength,
                                'StepUpShieldQuestion.QuetionText': $scope.StepUpShieldQuestion,
                                'StepUpShieldQuestion.RegisterComputer': $scope.checkboxModel.value,
                                'LoginType': $scope.loginType,
                                'ReferrerId': $scope.ReferrerId,

                            };

                        try {
                            //Defect# 21762 Begin
                            //AppD 4.3 instrumentation. User ID needs to be placed in this variable and maintained in scope.
                            //Agent will automatically pick it up and attach to page loads and AJAX calls subsequently. Hence the global.
                            window.signOnUserId = $scope.PersonalId;
                            //Defect# 21762 End
                        }
                        catch (ex) {
                        }

                        $scope.baseUrl = $scope.baseUrl ? $scope.baseUrl : '';
                        $scope.Env = $scope.Env ? $scope.Env : '';
                        $scope.authBaseurl = $scope.authBaseurl ? $scope.authBaseurl : '';
                        $http.post($scope.authBaseurl + stepUpCheckWidgetUrl + $scope.Env, data, { transformRequest: function(data) { return $scope.param(data); } }).
                            then(function(response) {

                                if (!$scope.isValidResponse(response, "ScrtyQustn", true, false)) {
                                    //START - PRJ:21940-CI-April 2017, B-30151 Changes
                                    var elements = document.getElementsByTagName('input');
                                    for (var i = 0; i < elements.length; i++) {
                                        if (elements[i].type == 'text') {
                                            elements[i].focus();
                                        }
                                    }
                                    //END - PRJ:21940-CI-April 2017, B-30151 Changes
                                    $scope.isAjaxCall = false;
                                    return;
                                }

                                try {
                                    $scope.data = response.data;
                                    if ($scope.data) {
                                        if ($scope.data.UserLocked && $scope.data.LARedirectLink.indexOf("type=ans") > 0) {
                                            var loginAssistParams = [];
                                            loginAssistParams.push({ name: 'AppName', value: $scope.AppName },
                                                                     { name: 'InSession', value: 'false' },
                                                                     { name: 'CancelURL', value: $scope.CancelUrl },
                                                                     { name: 'LockIndicator', value: 'True' });
                                            redirectToLoginAssist(loginAssistParams, "/OLS/LoginAssist/ResetAnswers", $scope.useBaseUrl, $scope.baseUrl);
                                            return;
                                        }
                                        $scope.ErrorMessage = $scope.data.ErrorMessage;
                                        $scope.isErrorMessage = $scope.data.ErrorMessage ? true : false;

                                        if (!$scope.isErrorMessage) {
                                            $scope.displayPasswordWidget();
                                        } else {
                                            if ($scope.data.InvalidLoginAttempts >= 1) {
                                                $scope.serverValidation = true;
                                                if ($scope.IsAuth) {
                                                    SiteCatService.SiteCatTCall("LoginWidget", "StandaloneScrtyQustnFail", null);
                                                } else {
                                                    SiteCatService.SiteCatTCall("LoginWidget", "ScrtyQustnFail", null);
                                                }
                                            } else {
                                                if ($scope.IsAuth) {
                                                    SiteCatService.SiteCatTCall("LoginWidget", "StandaloneScrtyQustnSystmErr", null);
                                                } else {
                                                    SiteCatService.SiteCatTCall("LoginWidget", "ScrtyQustnSystmErr", null);
                                                }
                                            }
                                            //START - PRJ:21940-CI-April 2017, B-30151 Changes
                                            var elements = document.getElementsByTagName('input');
                                            for (var i = 0; i < elements.length; i++) {
                                                if (elements[i].type == 'text') {
                                                    elements[i].focus();
                                                }
                                            }
                                            //END - PRJ:21940-CI-April 2017, B-30151 Changes
                                            $scope.isAjaxCall = false;
                                        }
                                    }
                                } catch (ex) {
                                    //START - PRJ:21940-CI-April 2017, B-30151 Changes
                                    var elements = document.getElementsByTagName('input');
                                    for (var i = 0; i < elements.length; i++) {
                                        if (elements[i].type == 'text') {
                                            elements[i].focus();
                                        }
                                    }
                                    //END - PRJ:21940-CI-April 2017, B-30151 Changes
                                    $scope.isAjaxCall = false;
                                }
                            },
                            function(response) {
                                $scope.isValidResponse(null, "ScrtyQustn", true, false);
                                $scope.isAjaxCall = false;
                            });
                    },
                    $scope.passwordbuttonClick = function() {
                        if ($scope.isAjaxCall) {
                            return;
                        }
                        //Defect# 21762 Begin
                        //Capture time elapsed between password click and customer dashboard load complete.
                        //This will be reported to AppD as a custom data and will feed into metrics for SLAs.
                        //capture start timestamp here and place it in a cookie.
                        try {
                            timeStampInMs = Date.now();
                        }
                        catch (ex) {
                            //ignore if error
                        }
                        //Defect# 21762 End
                        $scope.processAutofill();
                        $scope.isErrorMessage = false;
                        $scope.$broadcast('passwordForm-validation');
                        if ($scope.passwordForm.$invalid) {
                            //START - B-51253, B-52808, B-50937 - CO Dec 17 - Clear the password text field
                            $scope.clearPassword();
                            if ($scope.isEnterHitFromPasswordTextBox) {
                                document.getElementById('txtPassword').focus(); //PRJ:21940-CI-April 2017, B-30151 Changes
                                $scope.isEnterHitFromPasswordTextBox = false;
                            }
                            //END - B-51253, B-52808, B-50937
                            return;
                        }

                        $scope.isAjaxCall = true;

                        var data = $scope.IsOAMEnabled ? { 'UserId': $scope.PersonalId, 'Password': $scope.Password} :
                            {
                                'PersonalId': $scope.PersonalId,
                                'ShieldImage.Password': $scope.Password,
                                'ShieldImage.ImageName': $scope.StepUpImageName,
                                'ShieldImage.ImagePhrase': $scope.StepUpImagePhrase,
                                'ShieldImage.ImageUrl': $scope.StepUpImageUrl,
                                'ShieldImage.IncludesSound': $scope.StepUpImageIncludeSound,
                                'ShieldImage.SoundURL': $scope.StepUpImageSoundUrl

                            }; //TO DO:Pwd Masking or Encryptions need to be done

                        try {
                            //Defect# 21762 Begin
                            //AppD 4.3 instrumentation. User ID needs to be placed in this variable and maintained in scope.
                            //Agent will automatically pick it up and attach to page loads and AJAX calls subsequently. Hence the global.
                            window.signOnUserId = $scope.PersonalId;
                            //Defect# 21762 End
                        }
                        catch (ex) {
                        }

                        $scope.baseUrl = $scope.baseUrl ? $scope.baseUrl : '';

                        if ($scope.IsOAMEnabled) {

                            $scope.baseUrl = $scope.baseUrl ? $scope.baseUrl : '';
                            $scope.authBaseUrl = $scope.authBaseUrl ? $scope.authBaseUrl : '';
                            //$scope.OAMPostUrl = $scope.OAMPostUrl.indexOf('http') != 0 ? $scope.authBaseUrl + $scope.OAMPostUrl + $scope.Env : $scope.OAMPostUrl;
                            if ($scope.OAMPostUrl.indexOf('http') != 0) {
                                $scope.OAMPostUrl = $scope.OAMPostUrl.toLowerCase().indexOf('?env=') === -1
                                                        ? $scope.authBaseUrl + $scope.OAMPostUrl + $scope.Env
                                                            : $scope.authBaseUrl + $scope.OAMPostUrl;
                            }
                            $http.post($scope.OAMPostUrl, data, { transformRequest: function(data) { return $scope.param(data); } }).then(
                                function(response) {

                                    if (!$scope.isValidResponse(response, "Pwd", true, true)) {
                                        //START - B-51253, B-52808, B-50937 - CO Dec 17 - Clear the password text field
                                        $scope.clearPassword();
                                        if ($scope.isEnterHitFromPasswordTextBox) {
                                            document.getElementById('txtPassword').focus(); //PRJ:21940-CI-April 2017, B-30151 Changes
                                            $scope.isEnterHitFromPasswordTextBox = false;
                                        }
                                        //END - B-51253, B-52808, B-50937
                                        $scope.isAjaxCall = false;
                                        return;
                                    }

                                    try {
                                        $scope.data = response.data;
                                        $scope.ErrorMessage = $scope.data.ErrorMessage;
                                        // START : B-18129 - Reset Password (Temporary Password) OLB Flow - August
                                        if ($scope.data.UserLocked || $scope.data.InvalidLoginAttempts == 5) {
                                            var loginAssistParams = [];
                                            loginAssistParams.push({ name: 'AppName', value: $scope.AppName },
                                                                     { name: 'InSession', value: 'false' },
                                                                     { name: 'CancelURL', value: $scope.CancelUrl },
                                                                     { name: 'LockIndicator', value: 'True' });
                                            redirectToLoginAssist(loginAssistParams, "/OLS/LoginAssist/ResetPassword", $scope.useBaseUrl, $scope.baseUrl);
                                            return;
                                        } else if ($scope.data.PasswordExpired) {
                                            if ($scope.data.IsEnrolledInEAS) {
                                                if ($scope.data.IsTempPasswordGeneratedWithIn2Hours) {
                                                    $scope.redirectToLocation(response);
                                                } else {
                                                    if ($scope.data.ViewName && $scope.data.ViewName == "Login") {
                                                        $scope.reloadLoginWidget(true);
                                                        $scope.isAjaxCall = false;
                                                    } else {
                                                        $scope.reloadErrorMessage(response);
                                                    }
                                                }
                                            } else {
                                                $scope.redirectToLocation(response);
                                            }
                                            return;
                                        }
                                        //For B-23048 User Story added below conditon for OAM error extension for disabled users.
                                        else if ($scope.data.OAMUserDisabled) {
                                            if ($scope.IsAuth) {
                                                switch ($scope.data.OAMUserDisabledCode) {
                                                    case 5:
                                                        SiteCatService.SiteCatTCall("LoginWidget", "StandaloneOAMDisableErr5", null);
                                                        break;
                                                    case 6:
                                                        SiteCatService.SiteCatTCall("LoginWidget", "StandaloneOAMDisableErr6", null);
                                                        break;
                                                    case 7:
                                                        SiteCatService.SiteCatTCall("LoginWidget", "StandaloneOAMDisableErr7", null);
                                                        break;
                                                    default:
                                                        SiteCatService.SiteCatTCall("LoginWidget", "StandaloneOAMDisableErr", null);
                                                        break;
                                                }
                                            } else {
                                                switch ($scope.data.OAMUserDisabledCode) {
                                                    case 5:
                                                        SiteCatService.SiteCatTCall("LoginWidget", "OAMDisableErr5", null);
                                                        break;
                                                    case 6:
                                                        SiteCatService.SiteCatTCall("LoginWidget", "OAMDisableErr6", null);
                                                        break;
                                                    case 7:
                                                        SiteCatService.SiteCatTCall("LoginWidget", "OAMDisableErr7", null);
                                                        break;
                                                    default:
                                                        SiteCatService.SiteCatTCall("LoginWidget", "OAMDisableErr", null);
                                                        break;
                                                }
                                            }
                                            $scope.reloadLoginWidgetWithErrorMessage(true, $scope.data.ErrorMessage);
                                        } else if ($scope.data.OAMGenericError) {
                                            if ($scope.IsAuth) {
                                                SiteCatService.SiteCatTCall("LoginWidget", "StandaloneOAMGenricErr", null);
                                            } else {
                                                SiteCatService.SiteCatTCall("LoginWidget", "OAMGenricErr", null);
                                            }
                                            $scope.reloadLoginWidget(true);
                                        } else if ($scope.data.SignOnSuccess ||
                                        ((angular.isDefined($scope.data.SignOnSuccess) && $scope.data.SignOnSuccess == false) && angular.isDefined($scope.data.RedirectUrl))) {
                                            //Defect# 21762 begin
                                            //All apps run under the same domain from what I have see so far, this cookie thus should be 
                                            //accessible in other apps (eg. customer dashboard) down the line.
                                            try {
                                                if ($scope.data.SignOnSuccess) {
                                                    //AppD march 2018 release. Changed cookie to explicit top level domain.
                                                    document.cookie = "dashboardTimerStart=" + timeStampInMs + ";path=/;domain=.usbank.com";
                                                }
                                            }
                                            catch (ex) {
                                                //console.error(ex);
                                            }
                                            //Defect# 21762 End
                                            // START : B-43864
                                            if ($scope.isIE() && $scope.getInternetExplorerVersion() <= 9) {
                                                document.getElementById("divLoading").innerHTML = "<img src='/Auth/Content/Images/ajax-loader.gif' />";
                                            }
                                            $rootScope.$broadcast('busy.begin');
                                            // END : B-43864
                                            $scope.doRedirection($scope.data.RedirectUrl);
                                            return;
                                        } else {

                                            if ($scope.data.ViewName && $scope.data.ViewName == "Login") {
                                                $scope.reloadLoginWidget(true);
                                                $scope.FireSiteCatalystForErrorScenario(response);
                                            } else {
                                                $scope.reloadErrorMessage(response);
                                            }
                                        }
                                        //START - B-51253, B-52808, B-50937 - CO Dec 17 - Clear the password text field
                                        if ($scope.isEnterHitFromPasswordTextBox) {
                                            document.getElementById('txtPassword').focus(); //PRJ:21940-CI-April 2017, B-30151 Changes
                                            $scope.isEnterHitFromPasswordTextBox = false;
                                        }
                                        //END - B-51253, B-52808, B-50937
                                        $scope.isAjaxCall = false;
                                        // END : B-18129 - Reset Password (Temporary Password) OLB Flow - August
                                    } catch (ex) {
                                        //START - B-51253, B-52808, B-50937 - CO Dec 17 - Clear the password text field
                                        $scope.clearPassword();
                                        if ($scope.isEnterHitFromPasswordTextBox) {
                                            document.getElementById('txtPassword').focus(); //PRJ:21940-CI-April 2017, B-30151 Changes
                                            scope.isEnterHitFromPasswordTextBox = false;
                                        }
                                        //END - B-51253, B-52808, B-50937
                                        $scope.isAjaxCall = false;
                                    }
                                },
                                function(response) {
                                    $scope.isValidResponse(null, "Pwd", true, true);
                                    $scope.isAjaxCall = false;
                                });
                        } else {
                            $http.post($scope.authBaseurl + passwordWidgetUrl + $scope.Env, data, { transformRequest: function(data) { return $scope.param(data); } }).
                                then(function(response) {
                                    if (!$scope.isValidResponse(response, "Pwd", true, true)) {
                                        //START - B-51253, B-52808, B-50937 - CO Dec 17 - Clear the password text field
                                        $scope.clearPassword();
                                        if ($scope.isEnterHitFromPasswordTextBox) {
                                            document.getElementById('txtPassword').focus(); //PRJ:21940-CI-April 2017, B-30151 Changes
                                            $scope.isEnterHitFromPasswordTextBox = false;
                                        }
                                        //END - B-51253, B-52808, B-50937
                                        $scope.isAjaxCall = false;
                                        return;
                                    }

                                    $scope.data = response.data;
                                    $scope.ErrorMessage = $scope.data.ErrorMessage;
                                    // START : B-18129 - Reset Password (Temporary Password) OLB Flow - August
                                    if ($scope.data.Success) {
                                        //Defect# 21762 begin
                                        //All apps run under the same domain from what I have see so far, this cookie thus should be 
                                        //accessible in other apps (eg. customer dashboard) down the line.
                                        try {
                                            //AppD march 2018 release. Changed cookie to explicit top level domain.
                                            document.cookie = "dashboardTimerStart=" + timeStampInMs + ";path=/;domain=.usbank.com";
                                        }
                                        catch (ex) {
                                            //console.error(ex);
                                        }
                                        //end
                                        $scope.redirectToLocation(response);
                                    } else if ($scope.data.UserLocked || $scope.data.InvalidLoginAttempts == 5) {
                                        var loginAssistParams = [];
                                        loginAssistParams.push({ name: 'AppName', value: $scope.AppName },
                                                                 { name: 'InSession', value: 'false' },
                                                                 { name: 'CancelURL', value: $scope.CancelUrl },
                                                                 { name: 'LockIndicator', value: 'True' });
                                        redirectToLoginAssist(loginAssistParams, "/OLS/LoginAssist/ResetPassword", $scope.useBaseUrl, $scope.baseUrl);
                                        return;
                                    } else if ($scope.data.PasswordExpired) {
                                        if ($scope.data.IsEnrolledInEAS) {
                                            if ($scope.data.IsTempPasswordGeneratedWithIn2Hours) {
                                                $scope.redirectToLocation(response);
                                            } else {
                                                $scope.reloadErrorMessage(response);
                                            }
                                        } else {
                                            $scope.redirectToLocation(response);
                                        }
                                    } else {
                                        $scope.reloadErrorMessage(response);
                                    }
                                    //START - B-51253, B-52808, B-50937 - CO Dec 17 - Clear the password text field
                                    if ($scope.isEnterHitFromPasswordTextBox) {
                                        document.getElementById('txtPassword').focus(); //PRJ:21940-CI-April 2017, B-30151 Changes
                                        $scope.isEnterHitFromPasswordTextBox = true;
                                    }
                                    //END - B-51253, B-52808, B-50937
                                    // END : B-18129 - Reset Password (Temporary Password) OLB Flow - August
                                },
                                function(response) {
                                    $scope.isValidResponse(null, "Pwd", true, true);
                                    $scope.isAjaxCall = false;
                                });
                        }
                    },
                    // START : B-43864
                    $scope.isIE = function() {
                        return navigator.userAgent.indexOf('Trident') > 0 || navigator.userAgent.indexOf('MSIE') > 0;
                    };
                    // END : B-43864
                    // DE-SE : Card 103 Start
                    $scope.hidePassword = function() {
                        $scope.txtPwd.type = "password";
                        $scope.isHide = false;
                    };

                    $scope.showHidePwd = function() {
                    var password = "password", text = "text";
                    var txtPwd = $scope.txtPwd;
                        try {
                            /// TO TEXT
                            if (txtPwd.type == password) {
                                txtPwd.type = text;
                                $scope.isHide = true;
                                // DE SE Card 204 - Sitecat Implementation - Show
                                if ($scope.IsAuth && $scope.IsWidget == false) {
                                    SiteCatService.SiteCatTLCall("LoginWidget", "LoginStepUpPwdShowPassword", null);
                                } else {
                                    SiteCatService.SiteCatTLCall("LoginWidget", "LoginStepUpPwdShowPasswordSBBDOTCOM", null);
                                }
                            }
                            else {
                                /// TO PASSWORD
                                $scope.hidePassword();
                                // DE SE Card 204 - Sitecat Implementation - Hide
                                if ($scope.IsAuth && $scope.IsWidget == false) {
                                    SiteCatService.SiteCatTLCall("LoginWidget", "LoginStepUpPwdHidePassword", null);
                                } else {
                                    SiteCatService.SiteCatTLCall("LoginWidget", "LoginStepUpPwdHidePasswordSBBDOTCOM", null);
                                }

                            }

                            /// set the focus here...
                            txtPwd.focus();
                            txtPwd.selectionEnd = txtPwd.value ? txtPwd.value.length : 0;

                        }
                        catch (error) {
                            if (console && console.log) console.log(error);
                        }
                    },
                    //DE-SE : Card 103 END

                    // START : B-51253, B-52808, B-50937 - CO Dec 17 - Clear the password text field
                    $scope.clearPassword = function() {
                        $scope.Password = null;
                    };
                    // END : B-51253, B-52808, B-50937

                    // START : B-18129 - Reset Password (Temporary Password) OLB Flow - August
                    $scope.redirectToLocation = function(response) {
                        $scope.isErrorMessage = false;
                        var actionMethod = response.data.ActionName;
                        var controllerName = response.data.ControllerName;
                        var url = '/Auth/' + controllerName + '/' + actionMethod;
                        // START : B-43864
                        if ($scope.isIE() && $scope.getInternetExplorerVersion() <= 9) {
                            document.getElementById("divLoading").innerHTML = "<img src='/Auth/Content/Images/ajax-loader.gif' />";
                        }
                        $rootScope.$broadcast('busy.begin');
                        // END : B-43864
                        $scope.doRedirection(url);
                    },
                    $scope.reloadErrorMessage = function(response) {
                        //START - B-51253, B-52808, B-50937 - CO Dec 17 - Clear the password text field
                        $scope.clearPassword();
                        //END - B-51253, B-52808, B-50937
                        $scope.isErrorMessage = true;
                        $scope.isLogIn = false;
                        $scope.isStepUp = false;
                        $scope.isPassword = true;
                        $scope.isTempAccessCode = false;

                        $scope.FireSiteCatalystForErrorScenario(response);
                    },
                    $scope.FireSiteCatalystForErrorScenario = function(response) {
                        if (response.data.InvalidLoginAttempts >= 1) {
                            $scope.invalidPassword = true;
                            $scope.passwordErrorMessage = $scope.ErrorMessage;
                            $scope.isErrorMessage = false;
                            // START : B-18166 - Tagging: Reset Password Expired Password Message
                            if ($scope.IsAuth) {
                                if (angular.isDefined(response.data.PasswordExpired) && response.data.PasswordExpired)
                                    SiteCatService.SiteCatTCall("LoginWidget", "StandaloneTempPwdExpire", null);
                                else {
                                    //CI Oct Release - B-21523 story changes start
                                    SiteCatService.SiteCatTCall("LoginWidget", "PilotStandalonePwdFail", null);
                                    //CI Oct Release - B-21523 story changes End
                                }
                            } else {
                                if (angular.isDefined(response.data.PasswordExpired) && response.data.PasswordExpired)
                                    SiteCatService.SiteCatTCall("LoginWidget", "TempPwdExpire", null);
                                else {
                                    //CI JAN Release B-25916 - Tagging: Enable Case Sensitivity for Passwords
                                    SiteCatService.SiteCatTCall("LoginWidget", "PilotPwdFail", null);
                                    //CI JAN Release B-25916 - Tagging: Enable Case Sensitivity for Passwords
                                }
                            }
                            // END : B-18166 - Tagging: Reset Password Expired Password Message
                        } else {
                            $scope.reloadLoginWidget(true);
                            if ($scope.IsAuth) {
                                SiteCatService.SiteCatTCall("LoginWidget", "StandalonePwdSystmErr", null);
                            } else {
                                SiteCatService.SiteCatTCall("LoginWidget", "PwdSystmErr", null);
                            }
                        }
                        $scope.isAjaxCall = false;
                    },
                    // END : B-18129 - Reset Password (Temporary Password) OLB Flow - August
                $scope.tempaccesscodebuttonClick = function() {
                    if ($scope.isAjaxCall) {
                        return;
                    }

                    $scope.processAutofill();
                    $scope.isErrorMessage = false;
                    $scope.$broadcast('show-temperrors-check-validity');
                    if ($scope.tempAccessCodeForm.$invalid) {
                        return;
                    }


                    $scope.isAjaxCall = true;

                    var data = {
                        'TempAccessCode': $scope.TempAccessCode,
                        'LoginType': $scope.loginType,
                        'ReferrerId': $scope.ReferrerId
                    };

                    $scope.baseUrl = $scope.baseUrl ? $scope.baseUrl : '';
                    $scope.Env = $scope.Env ? $scope.Env : '';
                    $scope.authBaseurl = $scope.authBaseurl ? $scope.authBaseurl : '';
                    $http.post($scope.authBaseurl + tempAccessCodeWidgetUrl + $scope.Env, data, { transformRequest: function(data) { return $scope.param(data); } }).
                            then(function(response) {
                                if (!$scope.isValidResponse(response, "TempAccessCode", true, false)) {
                                    $scope.isAjaxCall = false;
                                    return;
                                }
                                try {
                                    $scope.data = response.data;
                                    $scope.ErrorMessage = $scope.data.ErrorMessage;
                                    if ($scope.data.UserLocked) {
                                        $scope.doRedirection($scope.data.LARedirectLink);
                                        return;
                                    } else if ($scope.data.Success) {
                                        if ($scope.data.AnswerCorrect) {
                                            $scope.displayPasswordWidget();
                                        } else {
                                            $scope.isErrorMessage = true;

                                            if ($scope.data.InvalidLoginAttempts >= 1) {
                                                $scope.invalidTempCode = true;
                                                $scope.accessCodeErrorMessage = $scope.ErrorMessage;
                                                $scope.isErrorMessage = false;
                                                SiteCatService.SiteCatTCall("LoginWidget", "TempAccessCodeFail", null);
                                            } else {
                                                SiteCatService.SiteCatTCall("LoginWidget", "TempAccessCodeSystemErr", null);
                                            }
                                            $scope.isAjaxCall = false;
                                        }
                                    } else {
                                        SiteCatService.SiteCatTCall("LoginWidget", "TempAccessCodeSystemErr", null);
                                        $scope.isErrorMessage = true;
                                        $scope.isAjaxCall = false;
                                    }
                                } catch (ex) {
                                    $scope.isAjaxCall = false;
                                }
                            },
                            function(response) {
                                $scope.isValidResponse(null, "TempAccessCode", true, true);
                                $scope.isAjaxCall = false;
                            });
                },
                    $scope.displayPasswordWidget = function() {
                        if ($scope.data.IsOAMEnabled) {
                            $scope.IsOAMEnabled = $scope.data.IsOAMEnabled;
                            $scope.OAMPostUrl = $scope.data.OAMPostUrl;

                            if ($scope.data.ProtectedResource) {
                                $http.get($scope.authBaseurl + $scope.data.ProtectedResource + $scope.Env).then(
                                    function(response) {
                                        $scope.populatePasswordWidget();
                                        $scope.isAjaxCall = false;
                                    },
                                    function(response) {
                                        $scope.isValidResponse(null, "ProtectedResource", true, true);
                                        $scope.PersonalId = $scope.data.PersonalId;
                                        $scope.isAjaxCall = false;
                                    }
                                );
                            }
                        } else {
                            $scope.populatePasswordWidget();
                            $scope.isAjaxCall = false;
                        }
                    },
                    $scope.populatePasswordWidget = function() {
                        $scope.StepUpImageName = $scope.data.ShieldImage != null ? $scope.data.ShieldImage.ImageName : null;
                        $scope.StepUpImagePhrase = $scope.data.ShieldImage != null ? $scope.data.ShieldImage.ImagePhrase : null;
                        $scope.StepUpImageUrl = $scope.data.ShieldImage != null ? $scope.data.ShieldImage.ImageUrl : null;
                        $scope.StepUpImageIncludeSound = $scope.data.ShieldImage != null ? $scope.data.ShieldImage.IncludesSound : null;
                        $scope.StepUpImageSoundUrl = $scope.data.ShieldImage != null ? $scope.data.ShieldImage.SoundURL : null;
                        $scope.DataSound = $scope.data.ShieldImage != null ? $scope.data.ShieldImage.SoundURL ? "Yes" : "No" : "No";
                        $scope.PasswordScreenForgotUrl = $scope.data.PasswordScreenForgotUrl;
                        $scope.isPwdImageExists = ($scope.StepUpImageName != null);
                        
                        $scope.isLogIn = false;
                        $scope.isStepUp = false;
                        $scope.isPassword = true;
                        $scope.isTempAccessCode = false;
                        $scope.focusPassword = true;
                        $scope.playSound();

                        $scope.ClearTimeOut();
                        $scope.SetTimeOut();
                        $scope.isHide = false;
                        $scope.txtPwd = document.getElementById('txtPassword');
                        
                        /// check browser is mozilla firefox using existing utility
                        /// get the browser...
                        var browserNameAndVersion = Utility.getBrowser();

                        /// Check for browser name and version
                        if (browserNameAndVersion && browserNameAndVersion != '') {

                            /// On only SBB...
                            var sbbCSSClass = document.getElementsByClassName("showHideNonAuthBtn");

                            /// On only StandAlone...
                            var standAloneCSSClass = document.getElementsByClassName("showHideSABtn");

                            // check for firefox
                            if (browserNameAndVersion[0].toLowerCase() == "firefox") {

                                /// Standalone check
                                if ($scope.IsAuth && standAloneCSSClass && standAloneCSSClass.length > 0) {
                                    $("#btnShow").addClass("lw-topRightFF");
                                }
                                else if (!$scope.IsAuth && sbbCSSClass && sbbCSSClass.length > 0) {
                                    $("#btnShow").addClass("lw-topPadFF");
                                }
                            } else if (browserNameAndVersion[0].toLowerCase() == "microsoft internet explorer") {
                                if ($scope.IsAuth && standAloneCSSClass && standAloneCSSClass.length > 0) {
                                    $("#btnShow").addClass("topShowHideBtnIE");
                                }
                            }
                        }

                        // Set Password type if we click any where than password text box
                        $(document).click(function(event) {
                            if (!$(event.target).is('input#txtPassword,button#btnShow')) {
                                $scope.hidePassword();
                            }
                        });
                                                

                        // on iframe focus out
                        window.addEventListener("blur", function() {
                            $scope.hidePassword();
                        });
                        // DE - SE Sprint #3: Show/Hide Password

                        $scope.PersonalId = $scope.data.PersonalId;
                        var errorMessage = $scope.IsAuth ? "StandaloneEnterPwd" : "EnterPwd";
                        SiteCatService.SiteCatTCall("LoginWidget", errorMessage, null);
                    },
                    $scope.validateServerResponse = function(response) {
                        if (!response || !response.headers()) {
                            return { isValidResponse: false, isNullResponse: true, isOAMError: false, isUAGError: false };
                        }

                        var jsonContentType = "application/json";

                        var responseType = response.headers()["content-type"];
                        if (responseType && responseType.indexOf(jsonContentType) >= 0) {
                            return { isValidResponse: true, isNullResponse: false, isOAMError: false, isUAGError: false };
                        }

                        var webHeader = response.headers()["web"];
                        var isUAGError = !webHeader || (webHeader.toUpperCase().indexOf("OBC") < 0 && webHeader.toUpperCase().indexOf("EPOC") < 0);
                        return { isValidResponse: false, isNullResponse: false, isOAMError: !isUAGError, isUAGError: isUAGError };
                    },
                    $scope.isValidResponse = function(response, feature, showErrorMessage, reloadLoginWidget) {
                        var responseValid = $scope.validateServerResponse(response);
                        if (responseValid.isValidResponse) return true;

                        var errorMessage = responseValid.isNullResponse ? feature + "ReqErr" :
                            (responseValid.isUAGError ? feature + "UAGErr" : (responseValid.isOAMError ? feature + "OAMErr" : ''));

                        if ($scope.IsAuth) errorMessage = "Standalone" + errorMessage;
                        SiteCatService.SiteCatTCall("LoginWidget", errorMessage, null);

                        if (reloadLoginWidget) {
                            $scope.reloadLoginWidget(showErrorMessage);
                            return false;
                        }

                        if (showErrorMessage) {
                            $scope.isErrorMessage = true;
                            $scope.ErrorMessage = "Sorry, our system is currently unavailable. Please try again.";
                        }

                        return false;
                    },
                    $scope.reloadLoginWidget = function(isError) {
                        $scope.clearFields();

                        if (isError) {
                            $scope.isErrorMessage = true;
                            $scope.ErrorMessage = "Sorry, our system is currently unavailable. Please try again.";
                        }
                        if ($cookies["MP"] != null && $cookies["MP"] != undefined) {
                            $scope.PersonalId = $cookies["MP"];
                        }
                        $scope.isLogIn = true;
                        $scope.isStepUp = false;
                        $scope.isPassword = false;
                        $scope.isTempAccessCode = false;

                        $scope.ClearTimeOut();
                    },
                    $scope.reloadLoginWidgetWithErrorMessage = function(isError, errorMsg) {
                        $scope.clearFields();

                        if (isError) {
                            $scope.isErrorMessage = true;
                            $scope.ErrorMessage = errorMsg;
                        }

                        $scope.isLogIn = true;
                        $scope.isStepUp = false;
                        $scope.isPassword = false;
                        $scope.isTempAccessCode = false;

                        $scope.ClearTimeOut();
                    },
                    $scope.clearFields = function() {
                        $scope.isLogIn = true;
                        $scope.focusInput = true;

                        $scope.PersonalId = null;
                        $scope.ShieldAnswerComb = null;
                        $scope.ShieldAnswer1 = null;
                        $scope.ShieldAnswer2 = null;
                        $scope.ShieldAnswer3 = null;
                        $scope.Password = null;
                        $scope.TempAccessCode = null;
                        $scope.stepupAnswerDiv = null;

                        $scope.isStepUp = false;
                        $scope.isPassword = false;
                        $scope.isTempAccessCode = false;
                        $scope.isErrorMessage = false;
                        $scope.invalidPersonalId = false;
                        $scope.invalidPassword = false;
                        $scope.invalidTempCode = false;
                        $scope.focusPassword = false;
                        $scope.isRequired = false;
                        $scope.isMinLength = false;
                        $scope.isPattern = false;
                        $scope.focusTempAccessCode = false;
                        $scope.IsLogOut = false;
                        $scope.IsSessionTimeOut = false;
                        $scope.serverValidation = false;
                    },
                        $scope.reloadSALoginWidget = function(isError, errorMsg) {
                            $scope.clearFields();

                            if (isError) {
                                $scope.isErrorMessage = true;
                                $scope.ErrorMessage = errorMsg;
                            }

                            $scope.isLogIn = true;
                            $scope.isStepUp = false;
                            $scope.isPassword = false;
                            $scope.isTempAccessCode = false;

                            $scope.ClearTimeOut();
                        },
                        $scope.cancelbuttonClick = function() {

                            if ($scope.isStepUp) {
                                //Omniture - user clicks cancel link on the security question screen
                                if ($scope.IsAuth) {
                                    SiteCatService.SiteCatTLCall("LoginWidget", "StandaloneAswSecrtyQstnCancelLink", null);
                                } else {
                                    SiteCatService.SiteCatTLCall("LoginWidget", "AswSecrtyQstnCancelLink", null);
                                }
                            } else if ($scope.isPassword) {
                                //Omniture - user clicks the cancel link on the enter password screen
                                if ($scope.IsAuth) {
                                    SiteCatService.SiteCatTLCall("LoginWidget", "StandalonePwdCancelLink", null);
                                } else {
                                    SiteCatService.SiteCatTLCall("LoginWidget", "PwdCancelLink", null);
                                }
                            } else if ($scope.isTempAccessCode) {
                                //Omniture - user clicks the cancel link on the enter Temp access code screen
                                SiteCatService.SiteCatTLCall("LoginWidget", "TempAccessCancelLink", null);
                            }
                            if ($scope.IsAuth) {
                                SiteCatService.SiteCatTCall("LoginWidget", "StandaloneEnterPersonalId", null);
                            } else {
                                SiteCatService.SiteCatTCall("LoginWidget", "EnterPersonalId", null);
                            }
                            if ($cookies["MP"] != null && $cookies["MP"] != undefined) {
                                $scope.PersonalId = $cookies["MP"];
                            } else {
                                $scope.PersonalId = null;
                            }

                            $scope.ShieldAnswerComb = null;
                            $scope.ShieldAnswer1 = null;
                            $scope.ShieldAnswer2 = null;
                            $scope.ShieldAnswer3 = null;
                            $scope.Password = null;
                            $scope.TempAccessCode = null;
                            $scope.stepupAnswerDiv = null;
                            $scope.isLogIn = true;
                            $scope.isStepUp = false;
                            $scope.isPassword = false;
                            $scope.isTempAccessCode = false;
                            $scope.isErrorMessage = false;
                            $scope.invalidPersonalId = false;
                            $scope.invalidPassword = false;
                            $scope.invalidTempCode = false;
                            $scope.focusInput = true;
                            $scope.focusPassword = false;
                            $scope.isRequired = false;
                            $scope.isMinLength = false;
                            $scope.isPattern = false;
                            $scope.focusTempAccessCode = false;
                            $scope.IsLogOut = false;
                            $scope.IsSessionTimeOut = false;
                            $scope.serverValidation = false;
                            $scope.isAjaxCall = false;

                            $scope.ClearTimeOut();
                        },
                    $scope.playSound = function() {
                        if (angular.isDefined($scope.StepUpImageSoundUrl) && $scope.StepUpImageSoundUrl != '' && $scope.StepUpImageSoundUrl != null) {
                            var IE_Version = $scope.getInternetExplorerVersion();
                            var ua = navigator.userAgent;
                            var IsIE = ua.indexOf('Trident') > 0 || navigator.userAgent.indexOf('MSIE') > 0;
                            if ((IsIE) || (IE_Version === 11)) {
                                var soundContainer = document.getElementById('soundContainer');
                                if (soundContainer == null) {
                                    var div = document.createElement('div');
                                    div.innerHTML = "<embed src=\"" + $scope.StepUpImageSoundUrl + "\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
                                    document.body.appendChild(div);
                                } else {
                                    soundContainer.empty();
                                    soundContainer.html("<embed src=\"" + $scope.StepUpImageSoundUrl + "\" hidden=\"true\" autostart=\"true\" loop=\"false\" />");
                                }
                            } else {
                                var audio = new Audio();
                                audio.src = $scope.StepUpImageSoundUrl;
                                audio.play();
                            }
                        }
                    },
                    $scope.getInternetExplorerVersion = function() {
                        var rv = -1;
                        var ua = navigator.userAgent;
                        var re = ua.indexOf("MSIE") > -1 ? new RegExp("MSIE\\s([0-9]{1,}[\\.0-9]{0,})") : new RegExp("Trident/.*?rv:([0-9]{1,}[\\.0-9]{0,})");
                        var result = re.exec(ua);
                        if (result != null && result[1] != null) {
                            rv = parseFloat(result[1]);
                        }
                        return rv;
                    },
                    $scope.SetTimeOut = function() {
                        var sessionTime = 900000;
                        sessionTimeOut = setTimeout($scope.RedirectToSessionOut, sessionTime);
                    },
                    $scope.ClearTimeOut = function() {
                        if (sessionTimeOut != undefined) {
                            clearTimeout(sessionTimeOut);
                        }
                    },
                    $scope.RedirectToSessionOut = function() {
                        $scope.doRedirection(sessionOutUrl);
                        return;
                    },
                    $scope.forgotAnswerClick = function() {
                        //Omniture - user makes clicks the forgot Answer link
                        if ($scope.IsAuth) {
                            SiteCatService.SiteCatTLCall("LoginWidget", "StandaloneAswSecrtyQstnFogotAswLink", null);
                        } else {
                            SiteCatService.SiteCatTLCall("LoginWidget", "AswSecrtyQstnFogotAswLink", null);
                        }
                        // START CI-LoginAssistance : Changed ForgotAnswer link urls to new LA ResetIdShield
                        var loginAssistParams = [];
                        loginAssistParams.push({ name: 'AppName', value: $scope.AppName },
                                                 { name: 'CancelURL', value: $scope.CancelUrl });
                        if ($scope.PersonalId) {
                            loginAssistParams.push({ name: 'InSession', value: 'false' });
                        }
                        redirectToLoginAssist(loginAssistParams, "/OLS/LoginAssist/ResetAnswers", $scope.useBaseUrl, $scope.baseUrl);
                        // End CI-LoginAssistance : Changed ForgotAnswer link urls to new LA ResetIdShield
                    },
                    $scope.forgotPwdClick = function() {
                        //Omniture - user makes clicks the forgot password link
                        if ($scope.IsAuth) {
                            SiteCatService.SiteCatTLCall("LoginWidget", "StandaloneForgotPwdLink", null);
                        } else {
                            SiteCatService.SiteCatTLCall("LoginWidget", "ForgotPwdLink", null);
                        }
                        // START CI-LoginAssistance : Changed ForgotPassword link urls to new LA ResetPassword
                        var loginAssistParams = [];
                        loginAssistParams.push({ name: 'AppName', value: $scope.AppName },
                                                 { name: 'InSession', value: 'false' },
                                                 { name: 'CancelURL', value: $scope.CancelUrl });

                        redirectToLoginAssist(loginAssistParams, "/OLS/LoginAssist/ResetPassword", $scope.useBaseUrl, $scope.baseUrl);
                        // End CI-LoginAssistance : Changed ForgotPassword link urls to new LA ResetPassword
                    },
                    $scope.DontAskQstClick = function() {
                        if (!$scope.checkboxModel.value) {
                            if ($scope.IsAuth) {
                                SiteCatService.SiteCatTCall("LoginWidget", "StandaloneDontAskQstnSelect", null);
                            } else {
                                SiteCatService.SiteCatTCall("LoginWidget", "DontAskQstnSelect", null);
                            }
                        } else {
                            if ($scope.IsAuth) {
                                SiteCatService.SiteCatTCall("LoginWidget", "StandaloneDontAskQstnDeSelect", null);
                            } else {
                                SiteCatService.SiteCatTCall("LoginWidget", "DontAskQstnDeSelect", null);
                            }
                        }
                    }
                },
                link: function($scope, $element, $attr) {
                    $scope.MachineAttributes = GetMachineAttributes();
                    //START - B-51253, B-52808, B-50937 - CO Dec 17 - Clear the password text field
                    $scope.isEnterHitFromPasswordTextBox = false;
                    //END - B-51253, B-52808, B-50937
                    $scope.isLogIn = true;
                    $scope.isStepUp = false;
                    $scope.isPassword = false;
                    $scope.isTempAccessCode = false;
                    $scope.isErrorMessage = false;
                    $scope.invalidPersonalId = false;
                    $scope.invalidPassword = false;
                    $scope.invalidTempCode = false;
                    $scope.baseUrl = $attr.baseurl;
                    $scope.loginType = $attr.loginType;
                    $scope.ReferrerId = $attr.referrerid;
                    // convenience for conditionally showing HTML elements.   Can be removed if customizable CSS is made possible in LoginWidget
                    $scope.IsPapLogin = $attr.loginType == "PAP";
                    $scope.InternetBankingURL = $attr.internetbankingurl;
                    $scope.OnlineInvestingURL = $attr.onlineinvestingurl;
                    $scope.MortgageAccountURL = $attr.mortgageaccounturl;
                    $scope.TrustNowEssentialsURL = $attr.trustnowessentialsurl;
                    $scope.baseUrl = $scope.baseUrl ? $scope.baseUrl : '';
                    /*START - Remove iframe change*/
                    $scope.authBaseurl = $attr.authBaseurl;
                    $scope.useBaseUrl = ($scope.baseUrl == '') ? false : true;
                    $scope.Env = $attr.env || '';
                    $scope.authBaseurl = $scope.authBaseurl ? $scope.authBaseurl : '';
                    /*END - Remove iframe change*/


                    $scope.LoginForgotIdUrl = $scope.baseUrl + document.querySelector('#LoginScreenForgotIdUrl').value;
                    $scope.NewUserEnrollUrl = $scope.baseUrl + newUserEnrollUrl;
                    $scope.IsLogOut = $attr.islogout == "True" || $attr.islogout == "true" ? true : false;
                    $scope.IsSessionTimeOut = $attr.issessiontimeout == "True" || $attr.issessiontimeout == "true" ? true : false;
                    $scope.IsAuth = $attr.isauth == "True" || $attr.isauth == "true" ? true : false;
                    $scope.IsUxRefresh = (!$scope.IsAuth && ($attr.isUxRefresh === "true" || $attr.isUxRefresh === "True" || $attr.isuxrefresh === "true" || $attr.isuxrefresh === "True")); // UX Refresh only relevant for login widget on dotcom pages.
                    $scope.isAjaxCall = false;
                    //PRJ:21940-CI-Mar 2017-Dropdown changes
                    $scope.UserType = $attr.usertype == undefined ? '' : $attr.usertype;
                    $scope.IsCoBrandedCard = $attr.iscobrandedcard == "True" || $attr.isCoBrandedCard == "true" ? true : false;
                    $scope.TempAccessCodeKeyArray = [46, 8, 9, 27, 13, 190];
                    $scope.HasNoAssociatedAccounts = $attr.hasnoassociatedaccounts == "True" || $attr.hasnoassociatedaccounts == "true" ? true : false;
                    $scope.BusinessType = $attr.businesstype;
                    $scope.AppName = $attr.appname;
                    $scope.CancelUrl = $attr.cancelurl;
                    //PRJ:21940-CI-Mar 2017-Dropdown changes
                    LoadDropDownOptions($scope.BusinessType);
                    //PRJ23137 Gymboree Start
                    if ($scope.UserType != '' && $attr.isuxrefresh == "True") {

                        $scope.isPartner = true;

                        document.getElementById("divLoginNewUserMessageTemplate").outerHTML = "";
                        document.getElementById("divLoginNeedhelpMessageTemplate").outerHTML = "";
                        document.getElementById("divLoginNotyouMessageTemplate").outerHTML = "";

                        document.getElementsByClassName("lw-AuthMainContainer")[0].className += " lw-AuthMainContainer-width";
                    }
                    //PRJ23137 Gymboree End
                    if ($attr.errormessage == undefined || $attr.errormessage == null || $attr.errormessage == "") {
                        $scope.ErrorMessage = "";
                        $scope.isErrorMessage = false;
                    } else {
                        $scope.ErrorMessage = $attr.errormessage;
                        $scope.isErrorMessage = true;
                    }

                    //BEGIN - Need to add No iFrame condition since the below code need to be executed only incase of No iFrame
                    var browserNameAndVersion = Utility.getBrowser();

                    if (browserNameAndVersion != '') {
                        $scope.BrowserType = browserNameAndVersion[0].toLowerCase();
                        $scope.BrowserVersion = browserNameAndVersion[1];

                        if ($scope.BrowserType == "safari") {
                            if ($scope.BrowserVersion <= 3)
                                $scope.IsUnsupportedBrowser = true;
                        }

                        if ($scope.BrowserType == "chrome") {
                            if ($scope.BrowserVersion <= 3)
                                $scope.IsUnsupportedBrowser = true;
                        }

                        if ($scope.BrowserType == "ie" || $scope.BrowserType == "microsoft internet explorer") {
                            if ($scope.BrowserVersion <= 6)
                                $scope.IsUnsupportedBrowser = true;
                        }

                        if ($scope.BrowserType == "firefox") {
                            if ($scope.BrowserVersion <= 4)
                                $scope.IsUnsupportedBrowser = true;
                        }
                    }
                    //END - TODO: Need to add No iFrame condition since the below code need to be executed only incase of No iFrame
                    if ($scope.IsAuth) {
                        $scope.IsUnsupportedBrowser = ($attr.isunsupportedbrowser == 'true' || $attr.isunsupportedbrowser == 'True');
                    }
                    if ($scope.IsUnsupportedBrowser && !$scope.IsAuth) {
                        $scope.OpenBrowserBlockedPopup();

                        angular.forEach(document.querySelectorAll('.tabDisableOnBusy'), function(v) {
                            angular.element(v).removeAttr('tabindex');
                            angular.element(v).attr('tabindex', '-1');
                        });
                    }

                    if ($scope.IsAuth) {

                        $scope.UserIPLocked = $attr.useriplocked == "True" || $attr.userIPLocked == "true" ? true : false;

                        if ($scope.UserIPLocked) {
                            if ($attr.personalid != undefined && $attr.personalid != null && $attr.personalid != "") {
                                $scope.PersonalId = $attr.personalid;
                            }
                            SiteCatService.SiteCatTCall("LoginWidget", "StandalonePersonalIdIPLockError", null);
                        }

                        if ($scope.HasNoAssociatedAccounts) {
                            SiteCatService.SiteCatTCall("LoginWidget", "NoValidAccounts", null);
                        }

                        $scope.InvalidLoginAttempts = $attr.invalidloginattempts;
                        if ($scope.InvalidLoginAttempts == 1) {
                            if ($attr.personalid != undefined && $attr.personalid != null && $attr.personalid != "") {
                                $scope.PersonalId = $attr.personalid;
                            }
                            $scope.invalidPersonalId = true;
                            $scope.personalIdErrorMessage = $scope.ErrorMessage;
                            $scope.isErrorMessage = false;
                            SiteCatService.SiteCatTCall("LoginWidget", "StandalonePersonalIdRecognizedFirstError", null);
                        } else if ($scope.InvalidLoginAttempts == 2) {
                            if ($attr.personalid != undefined || $attr.personalid != null || $attr.personalid != "") {
                                $scope.PersonalId = $attr.personalid;
                            }
                            $scope.invalidPersonalId = true;
                            $scope.personalIdErrorMessage = $scope.ErrorMessage;
                            $scope.isErrorMessage = false;
                            SiteCatService.SiteCatTCall("LoginWidget", "StandalonePersonalIdRecognizedSecondError", null);
                        }

                        if (angular.isDefined($scope.IsCoBrandedCard) && !$scope.IsCoBrandedCard) {
                            document.querySelector('span.partnerCardArt').style.display = "none";
                        }

                        if ($scope.IsLogOut) {
                            if ($attr.errormessage == null || $attr.errormessage == "") {
                                SiteCatService.SiteCatTCall("LoginWidget", "LogOut", null);
                            } else {
                                SiteCatService.SiteCatTCall("LoginWidget", "LogoutSystemError", null);
                            }
                        } else if (!$scope.IsSessionTimeOut && !$scope.HasNoAssociatedAccounts) {
                            //CI:Dec-2017, B-55520 Suppress this message in case of Standalone Blocked browsers
                            if (!$scope.invalidPersonalId && !$scope.IsUnsupportedBrowser) {
                                SiteCatService.SiteCatTCall("LoginWidget", "StandaloneEnterPersonalId", null);
                            }
                        }

                        if ($scope.IsSessionTimeOut) {
                            if ($attr.errormessage == null || $attr.errormessage == "") {
                                SiteCatService.SiteCatTCall("LoginWidget", "SessionTimeout", null);
                            } else {
                                SiteCatService.SiteCatTCall("LoginWidget", "SessionTimeoutSystemError", null);
                            }

                        }
                    }


                    function LoadDropDownOptions(businessType) {
                        switch (businessType) {
                            case "sbt":
                                $scope.loginddlOptions = [
                                { "id": 1, "value": InternetBankingURL, "label": "Online Banking", "selected": "selected" },
                                { "id": 3, "value": SPEURL, "label": "SinglePoint Essentials" },
                                { "id": 4, "value": SBIBankingURL, "label": "Small Business Internet Banking" },
                                { "id": 5, "value": EasyTaxURL, "label": "EasyTax" },
                                { "id": 6, "value": MerchantConnectURL, "label": "MerchantConnect" },
                                { "id": 7, "value": FXWebURL, "label": "FX Web" }
                                ];
                                break;
                            case "cbt":
                                $scope.isContinueButtonDisplay = false;
                                $scope.isPersonIDDisplay = false;
                                $scope.isMortgageDisplay = false; //PRJ:21940-CI- B-51259 changes
                                $scope.isGoButtonDisplay = true;
                                $scope.loginddlOptions = [
                                { "id": -1, "value": "", "label": "Select a Service", "selected": "selected" },
                                { "id": 3, "value": AccessOnlineURL, "label": "Access Online" },
                                { "id": 4, "value": SinglePointURL, "label": "SinglePoint" },
                                { "id": 5, "value": MSinglePointURL, "label": "Mobile SinglePoint" },
                                { "id": 6, "value": TNEURL, "label": "TrustNow Essentials" },
                                { "id": 7, "value": EPSURL, "label": "E-Payment Service" },
                                { "id": 8, "value": EasyTaxCURL, "label": "EasyTax" },
                                { "id": 9, "value": MerchantConnectURL, "label": "MerchantConnect" },
                                { "id": 10, "value": GlobalTradeURL, "label": "Global Trade" },
                                { "id": 11, "value": FCOURL, "label": "Fleet Commander Online" },
                                { "id": 12, "value": FXWebURL, "label": "FX Web" },
                                { "id": 13, "value": SLURL, "label": "Securities Lending" },
                                { "id": 14, "value": SPANSOnlineURL, "label": "SPANS Online" },
                                { "id": 15, "value": ITCPURL, "label": "Institutional Trust and Custody Pivot" }
                                ];
                                break;
                            default:
                                $scope.loginddlOptions = [
                                { "id": 1, "value": InternetBankingURL, "label": "Online Banking", "selected": "selected" },
                                { "id": 2, "value": OnlineInvestingURL, "label": "Online Investing" },
                                { "id": 3, "value": MortgageAccountURL, "label": "Mortgage Account" },
                                { "id": 4, "value": TrustNowEssentialsURL, "label": "TrustNow Essentials" }
                                ];
                                break;
                        }
                    }

                    function GetMachineAttributes() {
                        var colorDepth = window.screen.colorDepth,
                        width = window.screen.width,
                        height = window.screen.height,
                        availWidth = window.screen.availWidth,
                        availHeight = window.screen.availHeight,
                        platform = navigator.platform,
                        userAgent = navigator.userAgent,
                        clientParms,
                        java = "No";

                        if (navigator.javaEnabled() == 1)
                            java = "Yes";

                        clientParms = "colorDepth=" + colorDepth +
                        "|width=" + width +
                        "|height=" + height +
                        "|availWidth=" + availWidth +
                        "|availHeight=" + availHeight +
                        "|platform=" + platform +
                        "|javaEnabled=" + java +
                        "|userAgent=" + ParseUserAgentString(userAgent);

                        return clientParms;
                    }


                    function setValidationFlags(element1, element2, element3) {
                        $scope.isRequired = false;
                        $scope.isMinLength = false;
                        $scope.isPattern = false;

                        $scope.isRequired = (element1 ? element1.$error.required : false) || (element2 ? element2.$error.required : false) || (element3 ? element3.$error.required : false);
                        if (!$scope.isRequired) {
                            $scope.isMinLength = (element1 ? element1.$error.minlength : false) || (element2 ? element2.$error.minlength : false) || (element3 ? element3.$error.minlength : false);
                        }
                        if (!$scope.isRequired && !$scope.isMinLength) {
                            $scope.isPattern = (element1 ? element1.$error.pattern : false) || (element2 ? element2.$error.pattern : false) || (element3 ? element3.$error.pattern : false);
                        }

                        $scope.stepUpForm.$invalid = $scope.isRequired || $scope.isMinLength || $scope.isPattern;
                    }

                    function setValidationFlagsForLogIn(element) {

                        $scope.isRequired = element ? element.$error.required : false;
                        $scope.isMinLength = element ? element.$error.minlength : false;
                        $scope.isMaxlength = element ? element.$error.maxlength : false;
                        $scope.isPattern = element ? element.$error.pattern : false;

                        $scope.userForm.$invalid = $scope.isRequired || $scope.isMinLength || $scope.isMaxlength || $scope.isPattern;
                        return $scope.userForm.$invalid;
                    }

                    function ParseUserAgentString(userAgent) {
                        var returnVal = userAgent;
                        if (returnVal.search("Firefox") > -1) {
                            var revPos = returnVal.search("rv:");
                            if (revPos > -1) {
                                returnVal = returnVal.substring(0, revPos + 6);
                            }
                        }
                        return returnVal;
                    }

                    $scope.$on('userForm-validation', function() {
                        $scope.invalidPersonalId = setValidationFlagsForLogIn($scope.userForm.personalId);

                        if ($scope.userForm.personalId.$error.required) {
                            $scope.personalIdErrorMessage = "Please enter a Personal ID.";
                        }

                        if ($scope.userForm.personalId.$error.minlength) {
                            $scope.personalIdErrorMessage = "Personal ID is 7-22 characters, no spaces or special characters.";
                        }

                        if ($scope.userForm.personalId.$error.maxlength) {
                            $scope.personalIdErrorMessage = "Personal ID is 7-22 characters, no spaces or special characters.";
                        }

                        if ($scope.userForm.personalId.$error.pattern) {
                            $scope.personalIdErrorMessage = "Personal ID is 7-22 characters, no spaces or special characters.";
                        }
                    });

                    $scope.$on('stepUpForm-validation', function() {
                        switch ($scope.StepUpAnswerFormat) {
                            case "MMDD":
                                setValidationFlags($scope.stepUpForm.monthForMMDD, $scope.stepUpForm.dayForMMDD);
                                //Combine answer from multiple fields
                                $scope.ShieldAnswerComb = $scope.ShieldAnswer1 + $scope.ShieldAnswer2;
                                break;
                            case "DATE6":
                                setValidationFlags($scope.stepUpForm.monthForDate6, $scope.stepUpForm.dayForDate6, $scope.stepUpForm.yearForDate6);
                                //Combine answer from multiple fields
                                $scope.ShieldAnswerComb = $scope.ShieldAnswer1 + $scope.ShieldAnswer2 + $scope.ShieldAnswer3;
                                break;
                            case "MMYY":
                                setValidationFlags($scope.stepUpForm.monthForMMYY, $scope.stepUpForm.yearForMMYY);
                                //Combine answer from multiple fields
                                $scope.ShieldAnswerComb = $scope.ShieldAnswer1 + $scope.ShieldAnswer2;
                                break;
                            case "TIME4":
                                setValidationFlags($scope.stepUpForm.hour, $scope.stepUpForm.minute);
                                //Combine answer from multiple fields
                                $scope.ShieldAnswerComb = $scope.ShieldAnswer1 + $scope.ShieldAnswer2;
                                break;
                            case "PHONE10":
                                if ($scope.StepUpAnswerMaxLength == "10") {
                                    setValidationFlags($scope.stepUpForm.txtPhoneDigits1, $scope.stepUpForm.txtPhoneDigits2, $scope.stepUpForm.txtPhoneDigits3);
                                    //Combine answer from multiple fields
                                    $scope.ShieldAnswerComb = $scope.ShieldAnswer1 + $scope.ShieldAnswer2 + $scope.ShieldAnswer3;
                                }
                                break;
                            case "NUMBER":
                                if ($scope.StepUpAnswerMaxLength == "4") {
                                    setValidationFlags($scope.stepUpForm.txtNumber4);
                                    //Combine answer from multiple fields
                                    $scope.ShieldAnswerComb = $scope.ShieldAnswer1;
                                } else if ($scope.StepUpAnswerMaxLength == "5") {
                                    setValidationFlags($scope.stepUpForm.txtNumber5);
                                    //Combine answer from multiple fields
                                    $scope.ShieldAnswerComb = $scope.ShieldAnswer1;
                                } else if ($scope.StepUpAnswerMaxLength == "6") {
                                    setValidationFlags($scope.stepUpForm.txtNumber6);
                                    //Combine answer from multiple fields
                                    $scope.ShieldAnswerComb = $scope.ShieldAnswer1;
                                } else {
                                    setValidationFlags($scope.stepUpForm.txtNumber);
                                    //Combine answer from multiple fields
                                    $scope.ShieldAnswerComb = $scope.ShieldAnswer1;
                                }
                                break;
                            case "ALPHA":
                                setValidationFlags($scope.stepUpForm.txtAlpha);
                                //Combine answer from multiple fields
                                $scope.ShieldAnswerComb = $scope.ShieldAnswer1;
                                break;
                            case "ALPHANUM":
                                setValidationFlags($scope.stepUpForm.txtAlphaNum);
                                //Combine answer from multiple fields
                                $scope.ShieldAnswerComb = $scope.ShieldAnswer1;
                                break;
                            case "EMAIL":
                                setValidationFlags($scope.stepUpForm.txtEmail);
                                //Combine answer from multiple fields
                                $scope.ShieldAnswerComb = $scope.ShieldAnswer1;
                                break;
                        }
                        if ($scope.stepUpForm.$invalid) {
                            if ($scope.IsAuth) {
                                SiteCatService.SiteCatTCall("LoginWidget", "StandaloneScrtyQustnFrmtErr", null);
                            } else {
                                SiteCatService.SiteCatTCall("LoginWidget", "ScrtyQustnFrmtErr", null);
                            }
                        }
                    });

                    $scope.$on('passwordForm-validation', function() {
                        $scope.invalidPassword =
                        ($scope.passwordForm.password.$error.required) ||
                        ($scope.passwordForm.password.$error.minlength) ||
                        ($scope.passwordForm.password.$error.maxlength) ||
                        ($scope.passwordForm.password.$error.pattern);

                        if ($scope.passwordForm.password.$error.required) {
                            $scope.passwordErrorMessage = "Please enter a Password.";
                        }

                        if ($scope.passwordForm.password.$error.minlength) {
                            $scope.passwordErrorMessage = "Passwords are 8-24 characters. Use letters and numbers.";
                        }

                        if ($scope.passwordForm.password.$error.maxlength) {
                            $scope.passwordErrorMessage = "Passwords are 8-24 characters. Use letters and numbers.";
                        }

                        if ($scope.passwordForm.password.$error.pattern) {
                            $scope.passwordErrorMessage = "Passwords are 8-24 characters. Use letters and numbers.";
                        }

                        if ($scope.passwordForm.$invalid) {
                            if ($scope.IsAuth) {
                                SiteCatService.SiteCatTCall("LoginWidget", "StandalonePwdFrmtErr", null);
                            } else {
                                SiteCatService.SiteCatTCall("LoginWidget", "PwdFrmtErr", null);
                            }
                        }
                    });

                    $scope.$on('show-temperrors-check-validity', function() {
                        $scope.invalidTempCode =
                        ($scope.tempAccessCodeForm.tempAccessCode.$error.required) ||
                        ($scope.tempAccessCodeForm.tempAccessCode.$error.minlength) ||
                        ($scope.tempAccessCodeForm.tempAccessCode.$error.maxlength) ||
                        ($scope.tempAccessCodeForm.tempAccessCode.$error.pattern);

                        if ($scope.tempAccessCodeForm.tempAccessCode.$error.required) {
                            $scope.accessCodeErrorMessage = "Please enter a Temporary Access Code.";
                        }

                        if ($scope.tempAccessCodeForm.tempAccessCode.$error.minlength) {
                            $scope.accessCodeErrorMessage = "Please enter your 7-digit Temporary Access Code using numbers only.";
                        }

                        if ($scope.tempAccessCodeForm.tempAccessCode.$error.maxlength) {
                            $scope.accessCodeErrorMessage = "Please enter your 7-digit Temporary Access Code using numbers only.";
                        }

                        if ($scope.tempAccessCodeForm.tempAccessCode.$error.pattern) {
                            $scope.accessCodeErrorMessage = "Please enter your 7-digit Temporary Access Code using numbers only.";
                        }
                        if ($scope.tempAccessCodeForm.$invalid) {
                            SiteCatService.SiteCatTCall("LoginWidget", "TempAccessCodeFormatErr", null);
                        }
                    });
                    $rootScope.$broadcast('attrUxRefresh', attrUxRefresh);
                }
            }
        }
    ]);

    var myapp = angular.module("myapp");
    myapp.config([
        '$httpProvider', function($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            $httpProvider.defaults.withCredentials = true;
            $httpProvider.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
            $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
        }
    ]);

    myapp.filter('mask', function() {
        return function(input) {
            return input ? input.substring(0, 4) + '****' : '';
        };
    });

    myapp.directive('handleAutofill', function() {
        return {
            restrict: 'A',
            require: ['^loginwidgetdir', 'ngModel'],
            link: function(scope, element, attributes, controllers) {
                loginWidgetController = controllers[0];
                modelController = controllers[1];
                if (loginWidgetController && loginWidgetController.onAutofill) {
                    loginWidgetController.onAutofill(function() {
                        var placeHolder = element.attr('placeholder');
                        var elementVal = element.val();
                        if (elementVal && elementVal != '' && (!placeHolder || placeHolder !== elementVal)) {
                            this.$setViewValue(elementVal);
                        }
                    } .bind(modelController));
                }
            }
        };
    });

    myapp.directive('enablePlaceholders', function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                scope.$watch(function() {
                    return element.is ? element.is(':visible') : true;
                },
                function(value) {
                    if (window.Placeholders && window.Placeholders.enable) {
                        window.Placeholders.enable(element);
                    }
                });
            }
        };
    });

    myapp.directive('focusMe', function($timeout, $parse) {
        return {
            link: function(scope, element, attrs) {
                var model = $parse(attrs.focusMe);
                scope.$watch(model, function(value) {
                    if (value === true) {
                        $timeout(function() {
                            element[0].focus();
                        });
                    }
                });
                element.bind('blur', function() {
                    if (model.assign) {
                        scope.$apply(model.assign(scope, false));
                    }
                });
            }
        };
    });

    myapp.directive('usbDropdown', [
        '$document', function($document) {
            //PRJ:21940-CI-Mar 2017-Dropdown changes
            var dropDownFacade = '<div style="position:relative">' +
            '<button type="button" ng-class="{\'usbDropdown\':!IsAuth, \'usbAuthDropdown\':IsAuth}" tabindex="{{IsUnsupportedBrowser&&!IsAuth?\'-1\':\'0\'}}" class="ui-widget ui-state-default selectInput usbDropdown-popup" ' +
            'role="button" aria-haspopup="true" aria-owns="hEstateSelection-menu" ng-keydown="selectItems($event)"' +
            'href="#" ng-click="showOptions($event)"  s_oc="null">' +
            '<span class="usbDropdown-status">{{innerSelectedItem.label}}</span>' +
            '<span class="usbDropdown-icon ui-icon ui-icon-triangle-2-n-s"/>' +
            '</button>';

            //PRJ:21940-CI-Mar 2017-Dropdown changes
            var dropDownOptions = '<ul ng-class="{\'usbDropdown-menu\':!IsAuth, \'usbAuthDropdown-menu\':IsAuth}" class="ui-widget ui-widget-content ui-corner-all selectInput usbDropdown-menu-popup" role="listbox" aria-hidden="true"' +
            'ng-show="isOptionsVisible" ' +
            ' aria-labelledby="hEstateSelection-button" aria-activedescendant="usbDropdown-item-816" >' +
            '<li ng-model="selectedItem" class="uistatehighlight" ng-click="showOptions($event, item)" ng-class="{uistateactive: item.id === innerSelectedItem.id, uistatehighlightAuth:IsAuth }" ng-repeat="item in source">' +
            '<a tabIndex="-1" class="usbDropdown-menuitem" ng-click="showOptions($event, item)" id="usbDropdown-item-816" role="option" aria-selected="true" href="#" s_oc="null">' +
            '{{item.label}}</a></li></option></div>';

            return {
                scope: { source: "=", selectedItem: "=", selectedid: "=", change: "&" },
                restrict: "A",
                template: dropDownFacade + dropDownOptions,
                controller: function($scope, $http, $cookies, $timeout) {
                    $scope.innerSelectedItem = $scope.source[0];
                    $scope.isOptionsVisible = false;
                    $scope.currentId = 1;
                    $scope.selectItems = function(keyEvent) {
                        if (keyEvent.which === 40) {
                            if (keyEvent.preventDefault)
                                keyEvent.preventDefault();
                            if (keyEvent.stopPropagation)
                                keyEvent.stopPropagation();

                            var id = $scope.innerSelectedItem.id;
                            id = id == $scope.source.length ? (id - 1) : id;
                            $scope.innerSelectedItem = $scope.source[id];
                            if ($scope.change && $scope.currentId != $scope.innerSelectedItem.id) {
                                $scope.change()($scope.innerSelectedItem);
                            }
                            $scope.selectedid = $scope.currentId;
                            $scope.currentId = $scope.innerSelectedItem.id;
                            $timeout(function() { keyEvent.target.focus() }, 5);

                        } else if (keyEvent.which === 38) {

                            if (keyEvent.preventDefault)
                                keyEvent.preventDefault();
                            if (keyEvent.stopPropagation)
                                keyEvent.stopPropagation();

                            var id = $scope.innerSelectedItem.id - 2;
                            id = id <= 0 ? 0 : id;
                            $scope.innerSelectedItem = $scope.source[id];
                            if ($scope.change && $scope.currentId != $scope.innerSelectedItem.id) {
                                $scope.change()($scope.innerSelectedItem);
                            }
                            $scope.selectedid = $scope.currentId;
                            $scope.currentId = $scope.innerSelectedItem.id;
                            $timeout(function() { keyEvent.target.focus(); }, 5); //PRJ:21940-CI-Mar 2017-Dropdown changes
                        } else if (keyEvent.which == 9 || keyEvent.which == 13) {
                            $scope.isOptionsVisible = !$scope.isOptionsVisible;
                        }
                    };

                    $scope.showOptions = function($event, selected) {
                        $scope.isOptionsVisible = !$scope.isOptionsVisible;

                        if (selected) {
                            $scope.innerSelectedItem = selected;
                            if ($scope.change && $scope.currentId != $scope.innerSelectedItem.id) {
                                $scope.change()($scope.innerSelectedItem);
                                $scope.currentId = $scope.innerSelectedItem.id;
                                $scope.selectedid = $scope.currentId;
                            }
                        }

                        if ($event) {
                            if ($event.preventDefault)
                                $event.preventDefault();
                            if ($event.stopPropagation)
                                $event.stopPropagation();
                        }
                    };
                    // START PRJ:21940-CI- B-51259 changes
                    $scope.$on('change-drop-down', function(event, data) {
                        $scope.showOptions(null, data);
                    });
                    // END PRJ:21940-CI- B-51259 changes
                },
                link: function(scope, element, attrs) {
                    scope.IsAuth = attrs.isauth == "True" || attrs.isauth == "true" ? true : false; //PRJ:21940-CI-Mar 2017-Dropdown changes
                    scope.IsUnsupportedBrowser = attrs.isunsupportedbrowser == "True" || attrs.isunsupportedbrowser == "true" ? true : false;
                    $document.bind('click', function($event) {
                        scope.isOptionsVisible = false;
                    });
                }
            };

        }
    ]);

    myapp.directive('restrictInput', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                if (!ngModel) return;
                ngModel.$parsers.unshift(function(inputValue) {
                    var patternStr = new RegExp(attrs.keypressPattern);
                    var maxLen = parseInt(attrs.ngMaxlength);
                    var charlen = 0;
                    var digits = inputValue ? (inputValue.split('').filter(function(s) {
                        charlen++;
                        return (((attrs.keypressPattern) ? patternStr.test(s) : true) && ((maxLen) ? charlen <= maxLen : true));
                    }).join('')) : '';
                    ngModel.$viewValue = digits;
                    ngModel.$render();
                    return digits;
                });
            }
        };
    });

    Utility = {
        getBrowser: function() {
            var nVer = navigator.appVersion;
            var nAgt = navigator.userAgent;
            var browserName = navigator.appName;
            var fullVersion = '' + parseFloat(navigator.appVersion);
            var majorVersion = parseInt(navigator.appVersion, 10);
            var nameOffset, verOffset, ix;
            var ieBro = this.ie11();
            var ieVersion = ieBro;
            if (Number(ieVersion) > 10) {
                return ["Microsoft Internet Explorer", ieVersion];
            } else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
                browserName = "Microsoft Internet Explorer";
                fullVersion = nAgt.substring(verOffset + 5);
            } else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
                browserName = "Chrome";
                fullVersion = nAgt.substring(verOffset + 7);
                if ((verOffset = nAgt.indexOf("Version")) != -1)
                    fullVersion = nAgt.substring(verOffset + 8);
            } else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
                browserName = "Safari";
                fullVersion = nAgt.substring(verOffset + 7);
                if ((verOffset = nAgt.indexOf("Version")) != -1)
                    fullVersion = nAgt.substring(verOffset + 8);
            } else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
                browserName = "Firefox";
                fullVersion = nAgt.substring(verOffset + 8);
            } else {
                browserName = "";
                fullVersion = 0;
            }
            if (Number(ieVersion) > 10) { } else {
                if ((ix = fullVersion.indexOf(";")) != -1)
                    fullVersion = fullVersion.substring(0, ix);
                if ((ix = fullVersion.indexOf(" ")) != -1)
                    fullVersion = fullVersion.substring(0, ix);
            }
            majorVersion = parseInt('' + fullVersion, 10);
            if (isNaN(majorVersion)) {
                fullVersion = '' + parseFloat(navigator.appVersion);
                majorVersion = parseInt(navigator.appVersion, 10);
            }
            return [browserName, majorVersion];
        },
        ie11: function() {
            var rv = -1;
            if (navigator.appName == 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent;
                var re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
                if (re.exec(ua) != null)
                    rv = parseFloat(RegExp.$1);
            } else if (navigator.appName == 'Netscape') {
                var ua = navigator.userAgent;
                var re = new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");
                if (re.exec(ua) != null)
                    rv = parseFloat(RegExp.$1);
            }
            return Number(rv);
        },
        isOnDotcom: function() {
            return typeof isDotcomEnv !== 'undefined' && isDotcomEnv === true
        }
    };
} ());
