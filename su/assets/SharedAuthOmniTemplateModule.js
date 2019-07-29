(function (app) {
    try { app = angular.module('sharedAuthOmniTemplateModule'); }
    catch (err) { app = angular.module('sharedAuthOmniTemplateModule', []); }
    app.run(['$templateCache', function ($templateCache) {
        'use strict';

        $templateCache.put('StepUpContainerOmni.html',
            // Container Only
            '<div style="z-index: 100000;position:fixed;top:0;bottom:0;left:0;right:0; display: block;" class="modal fade ng-isolate-scope in" tabindex="-1">' +
                 '<div class="sr-only" id="stepupLiveAnnouncement" aria-live="assertive"></div>' +

            '<div class="sharedauth-omni modal-dialog modal-dialog-thirdpartyOTP" role="modal">' +
                '<div class="modal-content modal-content-thirdpartyOTP" style="top: 0; z-index: 1000; height: 100% !important; overflow:auto !important;">' +
                    '<div class="contain-stepup sharedauth" id="sharedAuthstepUpContainer" ng-if="showAuthModal" aria-labelledby="authenticatorheader" tabindex="-1">' +
                        '<div class="authenticator-header-buttons">' +
                            '<button type="button" class="close" aria-label="close" data-dismiss="modal" id="goback" ng-click="cancel()">' +
                                '<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGZpbGw9IiM1OTU5NWIiIGQ9Ik0xNy40MTQsMTZsNy4zMTQtNy4zMTRjMC4zOTEtMC4zOTEsMC4zOTEtMS4wMjMsMC0xLjQxNHMtMS4wMjMtMC4zOTEtMS40MTQsMEwxNiwxNC41ODZMOC42ODYsNy4yNzFjLTAuMzkxLTAuMzkxLTEuMDIzLTAuMzkxLTEuNDE0LDBzLTAuMzkxLDEuMDIzLDAsMS40MTRMMTQuNTg2LDE2bC03LjMxNCw3LjMxNGMtMC4zOTEsMC4zOTEtMC4zOTEsMS4wMjMsMCwxLjQxNGMwLjE5NSwwLjE5NSwwLjQ1MSwwLjI5MywwLjcwNywwLjI5M3MwLjUxMi0wLjA5OCwwLjcwNy0wLjI5M0wxNiwxNy40MTRsNy4zMTQsNy4zMTRjMC4xOTUsMC4xOTUsMC40NTEsMC4yOTMsMC43MDcsMC4yOTNzMC41MTItMC4wOTgsMC43MDctMC4yOTNjMC4zOTEtMC4zOTEsMC4zOTEtMS4wMjMsMC0xLjQxNEwxNy40MTQsMTZ6Ii8+PC9zdmc+" />' +
                            '</button>' +
                        '</div>' +
                        '<div ui-view id="customUI"></div>' +

                        // Existing Omni - Select Auth Method
                        '<div ng-if="authOptions" ng-controller="AuthOptionController">' +
                            '<div class="authenticator-header" id="childauth">' +
                                '<h1 id="authenticatorheader">Please select authentication method</h1>' +
                            '</div>' +
                            '<div class="authenticator-body">' +
                                '<ul>' +
                                    '<li ng-repeat="authMethod in methods | orderBy:\'-type\'">' +
                                        '<a href="" ng-click="authenticationMethodClicked(authMethod.type)">{{getAuthenticationTypeText(authMethod.type)}}</a>' +
                                    '</li>' +
                                '</ul>' +
                            '</div>' +
                        '</div>' +

                        // Existing Omni - Security Question
                        '<div ng-if="ChildIDShield" ng-controller="IDShieldController">' +
                            '<div class="authenticator-header">' +
                                '<h1 id="authenticatorheader">ID Shield Questions</h1>' +
                            '</div>' +
                            '<div id="disablingDiv"></div>' +
                            '<div class="authenticator-body">' +
                                '<form class="transmit-qa">' +
                                    '<label for="ans">{{idShieldQuestion}} <span class="sr-only">{{placeHolderText}}</span></label>' +
                                    '<input id="ans" type="text" ng-model="answer" placeholder="{{placeHolderText}}" aria-required="true" autocomplete="off" aria-describedby="transmit-errors"/>' +
                                    '<div id="transmit-errors" class="transmit-error-contain" aria-live="assertive">' +
                                        '<p class="error" id="qaLockError" ng-show="lockErrorMessage && isApp" role="alert">Alas, that was your third try with the wrong code. For your security, we\'ve locked your account. <a href="" ng-click="RedirectToLoginAssist(personid)">Click here</a> to reset.</p>' +
                                        '<p class="error" id="qaLockError" ng-show="lockErrorMessage && !isApp" role="alert">Hmm. That information doesn\'t match what we have on file. To be sure your account is secure, we\'ve locked it for now. <a href="" ng-click="RedirectToLoginAssist(personid)">Click here</a> to reset.</p>' +
                                        '<p class="error" id="qaError" role="alert">{{errorMessage}}</p>' +
                                    '</div>' +
                                    '<div class="btn-wrap">' +
                                        '<button type="submit" class="btn" id="SubmitAns" ng-click="submitAns(answer)">Continue</button>' +
                                        '<p><a href="" class="btn idshieldlink" id="ForgetAns" ng-model=personid ng-click=RedirectToLoginAssist(true)>Forgot Answer?</a></p>' +
                                    '</div>' +
                                    '<p class="login-transmit-show"><a href="" id="changeAuth" ng-click="changeAuth()">Change authentication method</a></p>' +
                                '</form>' +
                            '</div>' +
                            '<div class="authenticator-footer">' +
                                '<p>If you would like to change your authentication method, close this window.</p>' +
                            '</div>' +
                            '<div ng-show="loading" class="stepup_load_spinner"></div>' +
                        '</div>' +

                        // Existing Omni - Select mobile approve
                        '<div ng-if="ChildMobileApprove" ng-controller="MobileApproveController">' +
                            '<div class="authenticator-header">' +
                                '<h1 id="authenticatorheader">Please select how you want us to deliver a push notification to authenticate you</h1>' +
                            '</div>' +
                            '<div class="authenticator-body">' +
                                '<ul class="mobile-list">' +
                                    '<li ng-repeat="device in devices"><a href="" ng-click="targetClick(device)">{{device.model}}</a></li>' +
                                    '<li ng-if="!devices.length">To use these features, you must have Push enabled on your device. You can manage Push Notifications in the Device Manager or in the My Profile section of the app.</li>' +
                                '</ul>' +
                            '</div>' +
                        '</div>' +

                        // Existing Omni - Authorization Pending
                        '<div ng-if="PendingApproval" ng-controller="PendingApprovalController">' +
                            '<div class="authenticator-header">' +
                                '<h1 id="authenticatorheader">Authorization Pending</h1>' +
                            '</div>' +
                            '<div class="authenticator-body">' +
                            '<p>A request for authorization has been sent. It will expire in 15 minutes.</p>' +
                            '<p class="error" role="alert" aria-live="assertive" id="mobError">{{errorMessage}}</p>' +
                            '<ul>' +
                                '<li><a href="" ng-click="changeAuth()" id="changeAuth">Change authentication method</a></li>' +
                                '<li><a href="" ng-click=RedirectToLoginAssist(false)>Need help?</a></li>' +
                            '</ul>' +
                            '</div>' +
                        '</div>' +

                        // Existing Omni - OTP
                        '<div ng-if="ChildOTPInputCode" ng-controller="InputOTPController">' +
                            '<div class="authenticator-header">' +
                                '<h1 id="authenticatorheader" ng-hide="IsTempAccessFlow">One-Time Passcode</h1>' +
                            '</div>' +
                            '<div class="authenticator-body">' +
                                '<form>' +
                                    '<p> {{otpheadingmessage}}</p> ' +
                                    '<label for="otpCode">{{otpsubheading}}</label>' +
                                    '<input ng-model="otpCode" autocomplete="off" aria-required="true" id="otpCode" type="tel" maxlength="{{otplength}}" onkeypress="return event.charCode >= 48 && event.charCode <= 57">' +
                                    '<p class="error" role="alert" aria-live="assertive" style="display:none" id="otpLockError">Alas, that was your third try with the wrong code. For your security, we\'ve locked your account. <a href="" ng-click="RedirectToLoginAssist(personid)">Click here</a> to reset.</p>' +
                                    '<p class="error" role="alert" aria-live="assertive" id="otpError">{{errorMessage}}</p>' +
                                    '<div class="btn-wrap">' +
                                        '<button type="submit" class="btn thirtd_party_button" ng-click="otpLogin()" id="otpLogin">Continue</button>' +
                                        '<button type="button" class="btn secondary thirdparty-Secondary" ng-hide="IsTempAccessFlow" ng-click="otpResend()" id="otpResend">Resend</button>' +
                                    '</div>' +
                                    '<div class ="tempCancel" ng-show="IsTempAccessFlow && loginWigetDirective">' +
                                        '<p class="login-transmit-show"><a href="" ng-click="cancelbuttonClick();" tabindex="0">Start over</a></p>' +
                                    '</div>' +
                                '</form>' +
                                '<p ng-hide="IsTempAccessFlow"><a href="" id="changeAuth" ng-click="changeAuth()">Change authentication method</a></p>' +
                                '<p ><a href="" ng-click="RedirectToLoginAssist(personid)">Need help?</a></p>' +
                            '</div>' +
                        '</div>' +

                          // MNC OTP
                        '<div ng-if="ChildOTPInputCodeMNC" ng-controller="InputOTPControllerMNC">' +
                        '<div id="header" class="olb-shared-layout__header" role="banner">    <div id="divHeaderMC" class="la__hide-when-xs">        <!--<div class="customBackground"></div>-->        <div class="la__header-container">            <div class="la__header-container-rebranding">   <div class="headerSection_Logos la__header-logo-height" title="U.S Bank Logo">  <div class="la-header-logo-rebrand usBankLogo" alt=""></div>    </div>   </div>    <div class="headerClear"></div>  </div>   </div></div>'+
                            '<div class="authenticator-header">' +
                                '<h1 id="authenticatorheader" ng-hide="IsTempAccessFlow"> One-Time Passcode</h1>' +
                            '</div>' +
                            '<div class="authenticator-body">' +
                                '<form>' +
                                    '<p ng-class="">{{otpheadingmessage}}</p>' +
                                    '<label for="otpCode">{{otpsubheading}}</label>' +
                                    '<input ng-model="otpCode" autocomplete="off" aria-required="true" id="otpCode" type="tel" maxlength="{{otplength}}" onkeypress="return event.charCode >= 48 && event.charCode <= 57">' +
                                    '<p class="error" role="alert" aria-live="assertive" style="display:none" id="otpLockError">Alas, that was your third try with the wrong code. For your security, we\'ve locked your account. <a href="" ng-click="RedirectToLoginAssist(personid)">Click here</a> to reset.</p>' +
                                    '<p class="error" role="alert" aria-live="assertive" id="otpError">{{errorMessage}}</p>' +
                                        '<input type="submit" class="la__rebrand_nextButton" ng-click="otpLogin()" id="otpLogin" value="Continue">' +
                                        '<input type="button" class="la__rebrand_resendButton" ng-hide="IsTempAccessFlow" ng-click="otpResend()" id="otpResend" value="Resend" />' +
                                    '<div class ="tempCancel" ng-show="IsTempAccessFlow && loginWigetDirective">' +
                                        '<p class="login-transmit-show"><a href="" ng-click="cancelbuttonClick();" tabindex="0">Start over</a></p>' +
                                    '</div>' +
                                '</form>' +
                                '<p ng-hide="IsTempAccessFlow"><a href="" id="changeAuth" ng-click="changeAuth()">Change authentication method</a></p>' +
                                '<p><a href="" ng-click="RedirectToLoginAssist(personid)">Need help?</a></p>' +
                            '</div>' +
                            '<div id="footer" class="olb-shared-layout__footer" role="contentinfo">    <div class="la-footer-background-rebrand">        <div class="la__hide-when-xs">                       <div class="footer-rebranding-image footerline" alt=""></div>        </div>    </div></div>'+
                        '</div>' +



                        // Existing Omni - Select OTP Method
                        '<div ng-if="ChildOTPSelectTarget" ng-controller="OTPTargetController">' +
                            '<div class="authenticator-header">' +
                                '<h1 id="authenticatorheader">Please select how you want us to deliver a one-time passcode to you</h1>' +
                            '</div>' +
                            '<div class="authenticator-body">' +
                                '<ul class="mobile-list">' +
                                    '<li ng-repeat="number in targets"><a href="" class="linkDecoration" ng-click="targetClick(number)">Ending in {{number | formatetarget}}</a></li>' +
                                '</ul>' +
                            '</div>' +
                            '<div class="authenticator-footer">' +
                                '<p class="otp-footer">By providing a cellular number, you expressly consent to receiving a one-time text message related to your authorization code. Message and data rates may apply and you are responsible for any such charges.</p>' +
                            '</div>' +
                        '</div>' +

                        // Existing Omni - AYS Screen
                        '<div ng-if="CancelAuth" ng-controller="ConfirmPopController">' +
                            '<div class="authenticator-header overlayayssheader">' +
                                '<h1 id="authenticatorheader">Are you sure you want to cancel?</h1>' +
                            '</div>' +
                            '<div class="authenticator-body overlayaysoption">' +
                                '<ul>' +
                                    '<li><a href="" ng-click="confirmCancel()" id="confirmCancel">Yes</a></li>' +
                                    '<li><a href="" ng-click="tryOnce()" id="tryOnce">No</a></li>' +
                                    '<li><a href="" ng-click="changeAuth()" id="changeAuth">Change authentication method</a></li>' +
                                '</ul>' +
                            '</div>' +
                        '</div>' +

                    // Container Only - End of Existing Omni Container
                    '<span id="errortag" aria-live="assertive"></span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>'
    )

        // Container Only
        $templateCache.put('StepUpContainer.html',
            '<div class="sr-only" id="stepupLiveAnnouncement" aria-live="assertive"></div>' +
            '<div class="sharedauth-loading" aria-live="assertive" tabindex="-1">' +

                // Loading indicator
                '<div id="wrapperId" >' +
                    '<div id="scrollerId">' +
                        '<div class="contain-stepup sharedauth" id="sharedAuthstepUpContainer">' +
                            '<div class="authenticator-header">' +
                                '<h1 id="authenticatorheader" aria-live="assertive">{{dialogHeading}}</h1>' +
                            '</div>' +
                            '<div ng-hide="HideCloseButton" class="authenticator-header-buttons">' +
                                '<button type="button" class="close" aria-label="close" data-dismiss="modal" id="goback" ng-click="cancel()">' +
                                    '<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGZpbGw9IiM1OTU5NWIiIGQ9Ik0xNy40MTQsMTZsNy4zMTQtNy4zMTRjMC4zOTEtMC4zOTEsMC4zOTEtMS4wMjMsMC0xLjQxNHMtMS4wMjMtMC4zOTEtMS40MTQsMEwxNiwxNC41ODZMOC42ODYsNy4yNzFjLTAuMzkxLTAuMzkxLTEuMDIzLTAuMzkxLTEuNDE0LDBzLTAuMzkxLDEuMDIzLDAsMS40MTRMMTQuNTg2LDE2bC03LjMxNCw3LjMxNGMtMC4zOTEsMC4zOTEtMC4zOTEsMS4wMjMsMCwxLjQxNGMwLjE5NSwwLjE5NSwwLjQ1MSwwLjI5MywwLjcwNywwLjI5M3MwLjUxMi0wLjA5OCwwLjcwNy0wLjI5M0wxNiwxNy40MTRsNy4zMTQsNy4zMTRjMC4xOTUsMC4xOTUsMC40NTEsMC4yOTMsMC43MDcsMC4yOTNzMC41MTItMC4wOTgsMC43MDctMC4yOTNjMC4zOTEtMC4zOTEsMC4zOTEtMS4wMjMsMC0xLjQxNEwxNy40MTQsMTZ6Ii8+PC9zdmc+" /> ' +
                                '</button>' +
                            '</div>' +
                            '<div ui-view id="customUI"></div>' +
                            '<span id="errortag" aria-live="assertive"></span>' +
                        '</div>' +
                    '<div class="sr-only" aria-label="End of dialog"></div>' +
                '</div>' +
            '</div>'
        )


        // Child Auth; select your authentication method
        $templateCache.put('ChildAuthOptionPage.html',
            '<div id="no-device-error"></div>' +
            '<div class="authenticator-body">' +
                '<div class="login-transmit">' +
                    '<h1 id="stepUpHeader" ng-if="!uxrefresh">Please select authentication method</h1>' +
                    '<h2 id="stepUpHeader" ng-if="uxrefresh">Please select authentication method</h2>' +
                '</div>' +
                '<ul>' +
                    '<li ng-repeat="authMethod in methods | orderBy:\'-type\'">' +
                        '<a href="" ng-click="authenticationMethodClicked(authMethod.type)">{{getAuthenticationTypeText(authMethod.type)}}</a>' +
                    '</li>' +
                    '<li class="login-transmit-show">' +
                        '<a href="" ng-click="cancelbuttonClick()" tabindex="0">Start over</a>' +
                    '</li>' +
                '</ul>' +
            '</div>'
        )

        // General Error
        $templateCache.put('ErrorPage.html',
            '<div class="authenticator-body">' +
                '<form>' +
                    '<div class="omni-modal-body">' +
                        '<p class="device-error general" role="alert" aria-live="assertive">To use these features, you must have Push enabled on your device. You can manage Push Notifications in the Device Manager or in the My Profile section of the app.</p>' +
                    '</div>' +
                '</form>' +
            '</div>' +
            '<div class="authenticator-footer">' +
                '<p><a href="" ng-click="cancelbuttonClick()">Cancel</a></p>' +
            '</div>'
        )

        // Security Question
        $templateCache.put('ChildIDShield.html',
            '<div id="disablingDiv"></div>' +
            '<div class="authenticator-body">' +
                '<div class="login-transmit">' +
                    '<h1 id="stepUpHeader" ng-if="!uxrefresh">ID Shield Questions</h1>' +
                    '<h2 id="stepUpHeader" ng-if="uxrefresh">ID Shield Questions</h2>' +
                '</div>' +
                '<form class="transmit-qa">' +
                    '<label for="ans">{{idShieldQuestion}} <span class="sr-only">{{placeHolderText}}</span></label>' +
                    '<input id="ans" ng-blur="onBlur($event)" type="text" ng-model="answer" placeholder="{{placeHolderText}}" aria-required="true" autocomplete="off" aria-describedby="transmit-errors"/>' +
                    '<div id="transmit-errors" class="transmit-error-contain" aria-live="assertive">' +
                        '<p class="error" id="qaLockError" ng-show="lockErrorMessage && isApp" role="alert">Alas, that was your third try with the wrong code. For your security, we\'ve locked your account. <a href="" ng-click="RedirectToLoginAssist(personid)">Click here</a> to reset.</p>' +
                        '<p class="error" id="qaLockError" ng-show="lockErrorMessage && !isApp" role="alert">Hmm. That information doesn\'t match what we have on file. To be sure your account is secure, we\'ve locked it for now. <a href="" ng-click="RedirectToLoginAssist(personid)">Click here</a> to reset.</p>' +
                        '<p class="error" id="qaError" role="alert">{{errorMessage}}</p>' +
                    '</div>' +
                    '<div class="btn-wrap">' +
                        '<button type="submit" class="btn" id="SubmitAns" ng-click="submitAns(answer)">Continue</button>' +
                        '<p><a href="" ng-class="{\'btn idshieldlink\': (!uxrefresh && !istux)}" id="ForgetAns" ng-click="RedirectToLoginAssist(true)">Forgot Answer?</a></p>' +
                    '</div>' +
                    '<p class="login-transmit-show"><a href="" ng-click="cancelbuttonClick();" tabindex="0">Start over</a></p>' +
                    '<p class="login-transmit-show" ng-hide="hideChangeAuth"><a href="" id="changeAuth" ng-click="changeAuth()" ng-hide="lockErrorMessage" ng-if="!lockErrorMessage" aria-hidden="true">Change authentication method</a></p>' +
                '</form>' +
            '</div>' +
            '<div class="authenticator-footer login-transmit-hide">' +
                '<p>If you would like to change your authentication method, close this window.</p>' +
            '</div>' +
            '<div ng-show="loading" class="stepup_load_spinner"></div>'
        )

        $templateCache.put('TransmitStepup.html',
            '<div ng-controller="TransmitLoginStepupController">' +
                '<div busy busy-add-classes="sa__loader" not-busy-remove-classes="sa__loader">' +
                    '<div class="loadingSpinner">' +
                        '<div class="holder">' +
                            '<div class="bar1"></div><div class="bar2"></div><div class="bar3"></div><div class="bar4"></div><div class="bar5"></div><div class="bar6"></div><div class="bar7"></div><div class="bar8"></div><div class="bar9"></div><div class="bar10"></div><div class="bar11"></div><div class="bar12"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div saloginwidget id="tuxloginwidget" username="{{Username}}" widget="false" uxrefresh="false" istux="true" onsuccess="saSuccessHandler(response)" onerror="saErrorHandler(response)"></div>'
        )

        // Password
        $templateCache.put('Password.html',
                '<div class="authenticator-body transmit-password">' +
                    '<div ng-if="(uxrefresh && iswidget) || istux" class="lw-AuthLoginIcon">{{welcomeMessage}}</div>' +
                    '<div class="form-group image-wrapper" ng-show="isPwdImageExists">' +
                        '<img id="imgSound" class="lw-passwordImage lw-floatLeft tux-Password-image tux-floatLeft" ng-src="{{ ImageUrl }}" alt="{{ ImangeName }}" data-sound= "{{DataSound}}" data-sounduri="{{SoundUrl}}" imgindex="0" ng-click="playSound();"/>' +
                        '<div role="button" aria-label="Play Sound" ng-show="SoundUrl != null" id="imgSound" class="sound_img lw-passwordImageSound" data-sound= "{{DataSound}}" data-sounduri="{{SoundUrl}}" imgindex="0" ng-click="playSound();"></div>' +
                        '<div class="lw-vs8 lw-passwordImagePhrase lw-floatLeft tux-Password-Phrase tux-floatLeft">{{ Phrase }}</div>' +
                    '</div>' +
                    '<form name="passwordForm" method="post" autocomplete="off">' +
                        '<div class="lw-vs20 lw-placeholderIe8 lw-marginBottom18 lw-floatLeft lw-passwordScreenHeight">' +
                            '<label for="txtPassword">Enter Password</label>' +
                            '<input autofocus id="txtPassword" autocapitalize="none" name="password" handle-autofill="" focus-me="focusPassword" ng-keydown ="ProcessPassword($event)" ng-model="Password" aria-describedby="pwdError" type="password" maxlength="24" class="StepupPswTxt" aria-required="true" ng-minlength="8" ng-maxlength="24" ng-class="{\'redborderTextbox\': invalidPassword, \'lw-marginBottom18\': !invalidPassword && IsAuth , \'lw-marginBottom8\': isErrorMessage && IsAuth, \'lw-AuthTextRoundCorner\': IsAuth}" />' +
                            '<button id="btnShow" type="button" class="showHideBtn" ng-click="showHidePwd();" aria-label="{{isHide?\'Hide Password\':\'Show Password\'}}" >{{isHide?\'Hide\':\'Show\'}}</button>' +
                        '</div>' +
                        '<div aria-live="assertive">' +
                            '<p class="error" id="pwdError" role="alert">{{errorMessage}}</p>' +
                        '</div>' +
                        '<div class="btn-wrap">' +
                            '<button type="submit" id="btnLogin" target="_top" class="btn lw-buttonwidth140 lw-marginRight10 lw-AuthbuttonSubmit lw-buttonwidth168" id="SubmitAns" ng-click="submitPassword()">Log In</button>' +
                            '<a ng-class="{\'btn idshieldlink\': !uxrefresh && !istux}" class="login-transmit-show" href="" ng-click="cancelbuttonClick();" tabindex="0">Start over</a><br />' +
                            '<a href="" id="ForgetAns" ng-click="RedirectToLoginAssist(true)">Forgot Password?</a>' +
                        '</div>' +
                    '</form>' +
                '</div>' +
                '<div ng-show="loading" class="stepup_load_spinner"/>'
        )
        // Select mobile approve
        $templateCache.put('ChildMobileApprove.html',
                '<div class="authenticator-body">' +
                    '<div class="login-transmit">' +
                        '<h1 ng-if="!uxrefresh" id="stepUpHeader">Please select how you want us to deliver a push notification to authenticate you</h1>' +
                        '<h2 ng-if="uxrefresh" id="stepUpHeader">Please select how you want us to deliver a push notification to authenticate you</h2>' +
                    '</div>' +
                    '<ul class="mobile-list">' +
                        '<li ng-repeat="device in devices"><a href="" ng-click="targetClick(device)">{{device.model}}</a></li>' +
                        '<li class="login-transmit-show"><a href="" ng-click="cancelbuttonClick()">Start over</a></li>' +
                        '<li ng-if="!devices.length">To use these features, you must have Push enabled on your device. You can manage Push Notifications in the Device Manager or in the My Profile section of the app.</li>' +
                    '</ul>' +
                '</div>'
        )

        // Authorization Pending
        $templateCache.put('PendingApproval.html',
                '<div class="authenticator-body">' +
                    '<div class="login-transmit">' +
                        '<h1 ng-if="!uxrefresh" id="stepUpHeader">Authorization Pending</h1>' +
                        '<h2 ng-if="uxrefresh" id="stepUpHeader">Authorization Pending</h2>' +
                    '</div>' +
                    '<p>A request for authorization has been sent. It will expire in 15 minutes.</p>' +
                    '<p class="error" role="alert" aria-live="assertive" id="mobError">{{errorMessage}}</p>' +
                    '<ul>' +
                        '<li><a href="" ng-click="changeAuth()" id="changeAuth" ng-keydown="navigateArrowKeys($event)">Change authentication method</a></li>' +
                        '<li class="login-transmit-show"><a href="" ng-click="cancelbuttonClick()">Start over</a></li>' +
                        '<li ng-hide="is24HBScreen"><a href="" ng-click="RedirectToLoginAssist(personid)" ng-keydown="navigateArrowKeys($event)">Need help?</a></li>' +
                    '</ul>' +
                '</div>'
        )

        // OTP
        $templateCache.put('ChildOTPInputCode.html',
                '<div class="authenticator-body">' +
                    '<div ng-if="!IsTempAccessFlow" ng-class="{\'login-transmit\':!showOTPHeader}">' +
                        '<h1 ng-if="!uxrefresh" id="stepUpHeader">One-Time Passcode</h1>' +
                        '<h2 ng-if="uxrefresh" id="stepUpHeader">One-Time Passcode</h2>' +
                    '</div>' +
                    '<form>' +
                        '<p ng-class="{\'aboutotp\': IsTempAccessFlow}">{{otpheadingmessage}}</p>' +
                        '<label for="otpCode">{{otpsubheading}}</label>' +
                        '<input ng-model="otpCode" autofocus aria-required="true" autocomplete="off" id="otpCode" type="tel" maxlength="{{otplength}}" onkeypress="return validateinput(event)" />' +
                        '<p ng-show="isUserLocked"></p>' +
                        '<p class="error" role="alert" aria-live="assertive" style="display:none" id="otpLockError">Alas, that was your third try with the wrong code. For your security, we\'ve locked your account. <a href="" ng-click="RedirectToLoginAssist(personid)">Click here</a> to reset.</p>' +
                        '<p class="error" role="alert" aria-live="assertive" id="otpError">{{errorMessage}}</p>' +
                        '<div class="btn-wrap">' +
                            '<button type="submit" class="btn" ng-click="otpLogin()" id="otpLogin">Continue</button>' +
                            '<button type="button" class="btn secondary" ng-hide="IsTempAccessFlow" ng-click="otpResend()" id="otpResend">Resend</button>' +
                            '<p ng-if="IsTempAccessFlow" style="display: inline;" class="login-transmit-show"><a href="" ng-click="cancelbuttonClick();" tabindex="0">Start over</a></p>' +
                        '</div>' +
                    '</form>' +
                    '<p ng-if="!IsTempAccessFlow" class="login-transmit-show"><a href="" ng-click="cancelbuttonClick();" tabindex="0">Start over</a></p>' +
                    '<p ng-hide="IsTempAccessFlow || hideChangeAuth"><a href="" id="changeAuth" ng-click="changeAuth()">Change authentication method</a></p>' +
                    '<p ng-hide="is24HBScreen"><a href="" ng-click="RedirectToLoginAssist(personid)">Need help?</a></p>' +
                '</div>'
        )    

        // Select OTP Method
        $templateCache.put('ChildOTPSelectTarget.html',
                '<div class="authenticator-body">' +
                    '<div class="login-transmit">' +
                        '<h1 ng-if="!uxrefresh" id="stepUpHeader">Please select how you want us to deliver a one-time passcode to you</h1>' +
                        '<h2 ng-if="uxrefresh" id="stepUpHeader">Please select how you want us to deliver a one-time passcode to you</h2>' +
                    '</div>' +
                    '<ul class="mobile-list">' +
                        '<li ng-repeat="number in targets"><a href="" class="linkDecoration" ng-click="targetClick(number)">Ending in {{number | formatetarget}}</a></li>' +
                        '<li class="login-transmit-show"><a href="" ng-click="cancelbuttonClick()">Start over</a></li>' +
                    '</ul>' +
                '</div>' +
                '<div class="authenticator-footer">' +
                    '<p class="otp-footer">By providing a cellular number, you expressly consent to receiving a one-time text message related to your authorization code. Message and data rates may apply and you are responsible for any such charges.</p>' +
                '</div>'
        )

        //AYS Screen
        $templateCache.put('StepupCancellation.html',
                '<div class="authenticator-body">' +
                    '<div class="login-transmit">' +
                        '<h1 ng-if="!uxrefresh" id="stepUpHeader">Are you sure you want to cancel?</h1>' +
                        '<h2 ng-if="uxrefresh" id="stepUpHeader">Are you sure you want to cancel?</h2>' +
                    '</div>' +
                    '<ul>' +
                        '<li><a href="" ng-click="confirmCancel()" id="confirmCancel" ng-keydown="navigateArrowKeys($event)">Yes</a></li>' +
                        '<li><a href="" ng-click="tryOnce()" id="tryOnce" ng-keydown="navigateArrowKeys($event)">No</a></li>' +
                        '<li ng-hide="hideChangeAuth"><a href="" ng-click="changeAuth()" id="changeAuth" ng-keydown="navigateArrowKeys($event)">Change authentication method</a></li>' +
                    '</ul>' +
                '</div>'
        )

    }]);
})();
