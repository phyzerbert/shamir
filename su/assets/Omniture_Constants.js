var Omniture = {};
Omniture.constants = {};
Omniture.constants["OmniSitePrefix"] = "olb";
Omniture.constants["LoginWidget"] = {};
Omniture.constants["LoginWidget"]["siteSection"] = "login";
Omniture.constants["LoginWidget"]["subSiteSection"] = "login";
//CI B-52091
Omniture.constants["LoginWidget"]["MortgageNewToOlb"] = {};
Omniture.constants["LoginWidget"]["MortgageNewToOlb"] = {
    "eventname": "enter personal ID standalone mortgage selection new to olb options",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};
//CI B-52091 end
Omniture.constants["LoginWidget"]["PersonalIdSystemError"] = {};
Omniture.constants["LoginWidget"]["PersonalIdSystemError"] = {
    "eventname": "enter personal id system error",
    "errorStatus": "login enter personal id system error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter personal id system error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};
Omniture.constants["LoginWidget"]["PersonalIdIPLockError"] = {};
Omniture.constants["LoginWidget"]["PersonalIdIPLockError"] = {
    "eventname": "enter personal id system error -1",
    "errorStatus": "login enter personal id system error -1",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter personal id system error -1",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};
Omniture.constants["LoginWidget"]["PersonalIdFormatError"] = {};
Omniture.constants["LoginWidget"]["PersonalIdFormatError"] = {
    "eventname": "enter personal id format error",
    "errorStatus": "login enter personal id format error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter personal id format error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};
Omniture.constants["LoginWidget"]["NoValidAccounts"] = {};
Omniture.constants["LoginWidget"]["NoValidAccounts"] = {
    "eventname": "enter personal id error no valid accounts",
    "errorStatus": "login enter personal id system error no valid accounts",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter personal id error no valid accounts",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};
Omniture.constants["LoginWidget"]["PersonalIdRecognizedFirstError"] = {};
Omniture.constants["LoginWidget"]["PersonalIdRecognizedFirstError"] = {
    "eventname": "enter personal ID not recognized first",
    "errorStatus": "login enter personal id not recognized first error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter personal ID not recognized first",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};
Omniture.constants["LoginWidget"]["PersonalIdRecognizedSecondError"] = {};
Omniture.constants["LoginWidget"]["PersonalIdRecognizedSecondError"] = {
    "eventname": "enter personal ID not recognized second",
    "errorStatus": "login enter personal id not recognized second error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter personal ID not recognized second",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};
Omniture.constants["LoginWidget"]["PersonalIdDropdownSelection"] = {};
Omniture.constants["LoginWidget"]["PersonalIdDropdownSelection"] = {
    "prop53": "enter personal id login dropdown selection",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "eVar72": "desktop",
    "prop28": "OLB",
    "eVar60": "OLB",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "dynamic": "enter personal id login dropdown selection"//PRJ:21940-CI-Mar 2017-Dropdown changes
};
//PRJ:21940-CI-Mar 2017-Dropdown changes - BEGIN
Omniture.constants["LoginWidget"]["StandalonePersonalIdDropdownSelection"] = {};
Omniture.constants["LoginWidget"]["StandalonePersonalIdDropdownSelection"] = {
    "prop53": "enter personal id standalone login dropdown selection",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "dynamic": "enter personal id standalone login dropdown selection"
};
//PRJ:21940-CI-Mar 2017-Dropdown changes - END
Omniture.constants["LoginWidget"]["PersonalIdRememberIdSelected"] = {};
Omniture.constants["LoginWidget"]["PersonalIdRememberIdSelected"] = {
    "prop53": "enter personal id remember personal id selected",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "eVar72": "desktop",
    "prop28": "OLB",
    "eVar60": "OLB",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};
Omniture.constants["LoginWidget"]["PersonalIdRememberIdDeSelected"] = {};
Omniture.constants["LoginWidget"]["PersonalIdRememberIdDeSelected"] = {
    "prop53": "enter personal id remember personal id deselected",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "eVar72": "desktop",
    "prop28": "OLB",
    "eVar60": "OLB",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};
Omniture.constants["LoginWidget"]["PersonalIdButtonGoClick"] = {};
//PRJ:21940-CI-Mar 2017-Dropdown changes - BEGIN
Omniture.constants["LoginWidget"]["PersonalIdButtonGoClick"] = {
    "prop53": "enter personal id login dropdown selection go button",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "eVar72": "desktop",
    "prop28": "OLB",
    "eVar60": "OLB",
    "dynamic": "enter personal id login dropdown selection go button"
};

Omniture.constants["LoginWidget"]["StandalonePersonalIdButtonGoClick"] = {};
Omniture.constants["LoginWidget"]["StandalonePersonalIdButtonGoClick"] = {
    "prop53": "enter personal id login standalone dropdown selection go button",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "dynamic": "enter personal id login standalone dropdown selection go button"
};
//PRJ:21940-CI-Mar 2017-Dropdown changes - END
Omniture.constants["LoginWidget"]["PersonalIdForgotIdLinkClick"] = {};
Omniture.constants["LoginWidget"]["PersonalIdForgotIdLinkClick"] = {
    "prop53": "enter personal id forgot id link",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "eVar72": "desktop",
    "prop28": "OLB",
    "eVar60": "OLB",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};
Omniture.constants["LoginWidget"]["PersonalIdEnrollNowLinkClick"] = {};
Omniture.constants["LoginWidget"]["PersonalIdEnrollNowLinkClick"] = {
    "prop53": "enter personal id enroll now link",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "eVar72": "desktop",
    "prop28": "OLB",
    "eVar60": "OLB",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};
Omniture.constants["LoginWidget"]["PersonalIdRemoveFocus"] = {};
Omniture.constants["LoginWidget"]["PersonalIdRemoveFocus"] = {
    "prop53": "enter personal id text field remove focus",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking"
};
Omniture.constants["LoginWidget"]["PersonalIdIdentifier"] = {};
Omniture.constants["LoginWidget"]["PersonalIdIdentifier"] = {
    "prop53": "enter personal id remember personal id identified",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop28": "OLB",
    "eVar60": "OLB",
    "eVar72": "desktop"
};
Omniture.constants["LoginWidget"]["EnterPersonalId"] = {};
Omniture.constants["LoginWidget"]["EnterPersonalId"] = {
    "eventname": "enter personal ID",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter personal ID",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["AnswSecrtyQustn"] = {};
Omniture.constants["LoginWidget"]["AnswSecrtyQustn"] = {
    "eventname": "answer security question",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "answer security question",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["ScrtyQustnFrmtErr"] = {};
Omniture.constants["LoginWidget"]["ScrtyQustnFrmtErr"] = {
    "eventname": "enter security question format error",
    "errorStatus": "login enter security question format error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter security question format error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["ScrtyQustnSystmErr"] = {};
Omniture.constants["LoginWidget"]["ScrtyQustnSystmErr"] = {
    "eventname": "answer security question system error",
    "errorStatus": "login enter security question system error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "answer security question system error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["ScrtyQustnFail"] = {};
Omniture.constants["LoginWidget"]["ScrtyQustnFail"] = {
    "eventname": "security question failure",
    "errorStatus": "login enter security question failure",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "security question failure",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["AswSecrtyQstnFogotAswLink"] = {};
Omniture.constants["LoginWidget"]["AswSecrtyQstnFogotAswLink"] = {
    "prop53": "answer security question forgot answer link",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "eVar72": "desktop",
    "prop28": "OLB",
    "eVar60": "OLB"
};

Omniture.constants["LoginWidget"]["AswSecrtyQstnCancelLink"] = {};
Omniture.constants["LoginWidget"]["AswSecrtyQstnCancelLink"] = {
    "prop53": "answer security question cancel link",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "eVar72": "desktop",
    "prop28": "OLB",
    "eVar60": "OLB"
};

Omniture.constants["LoginWidget"]["EnterPwd"] = {};
Omniture.constants["LoginWidget"]["EnterPwd"] = {
    "eventname": "enter password",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter password",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["PwdFrmtErr"] = {};
Omniture.constants["LoginWidget"]["PwdFrmtErr"] = {
    "eventname": "enter password format error",
    "errorStatus": "login enter password format error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter password format error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["PwdSystmErr"] = {};
Omniture.constants["LoginWidget"]["PwdSystmErr"] = {
    "eventname": "enter password system error",
    "errorStatus": "login enter password system error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter password system error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["PwdFail"] = {};
Omniture.constants["LoginWidget"]["PwdFail"] = {
    "eventname": "password failure",
    "errorStatus": "login enter password failure",
    "prop13": "password failure",
    "prop40": "online banking",
    "prop53": "password failure",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["PilotPwdFail"] = {};
Omniture.constants["LoginWidget"]["PilotPwdFail"] = {
    "eventname": "password failure case sensitivity error",
    "errorStatus": "login enter password failure case sensitivity error",
    "prop13": "password failure case sensitivity error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["ForgotPwdLink"] = {};
Omniture.constants["LoginWidget"]["ForgotPwdLink"] = {
    "prop53": "enter password forgot password link",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "eVar72": "desktop",
    "prop28": "OLB",
    "eVar60": "OLB"
};

Omniture.constants["LoginWidget"]["PwdCancelLink"] = {};
Omniture.constants["LoginWidget"]["PwdCancelLink"] = {
    "prop53": "enter password cancel link",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "eVar72": "desktop",
    "prop28": "OLB",
    "eVar60": "OLB"
};

Omniture.constants["LoginWidget"]["DontAskQstnSelect"] = {};
Omniture.constants["LoginWidget"]["DontAskQstnSelect"] = {
    "eventname": "security question remember me selected",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "security question remember me selected",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["DontAskQstnDeSelect"] = {};
Omniture.constants["LoginWidget"]["DontAskQstnDeSelect"] = {
    "eventname": "security question remember me deselected",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "security question remember me deselected",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};


Omniture.constants["LoginWidget"]["TempAccessCode"] = {};
Omniture.constants["LoginWidget"]["TempAccessCode"] = {
    "eventname": "temp access code",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "temp access code",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["TempAccessCodeFormatErr"] = {};
Omniture.constants["LoginWidget"]["TempAccessCodeFormatErr"] = {
    "eventname": "temp access code format error",
    "errorStatus": "login temp access code format error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "temp access code format error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["TempAccessCodeSystemErr"] = {};
Omniture.constants["LoginWidget"]["TempAccessCodeSystemErr"] = {
    "eventname": "temp access code system error",
    "errorStatus": "login temp access code system error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "temp access code system error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["TempAccessCodeFail"] = {};
Omniture.constants["LoginWidget"]["TempAccessCodeFail"] = {
    "eventname": "temp access code failure",
    "errorStatus": "login temp access code failure",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "temp access code failure",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["ForgotTempAccessCodeLink"] = {};
Omniture.constants["LoginWidget"]["ForgotTempAccessCodeLink"] = {
    "prop53": "temp access code forgot temp access code link",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "eVar72": "desktop",
    "prop28": "OLB",
    "eVar60": "OLB"
};

Omniture.constants["LoginWidget"]["TempAccessCancelLink"] = {};
Omniture.constants["LoginWidget"]["TempAccessCancelLink"] = {
    "prop53": "temp access code cancel link",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "eVar72": "desktop",
    "prop28": "OLB",
    "eVar60": "OLB"
};

Omniture.constants["LoginWidget"]["LogOut"] = {};
Omniture.constants["LoginWidget"]["LogOut"] = {
    "eventname": "logout",
    "prop53": "logout",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["LogoutSystemError"] = {};
Omniture.constants["LoginWidget"]["LogoutSystemError"] = {
    "eventname": "logout system error",
    "prop53": "logout system error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["SessionTimeout"] = {};
Omniture.constants["LoginWidget"]["SessionTimeout"] = {
    "eventname": "system timeout",
    "prop53": "system timeout",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["SessionTimeoutSystemError"] = {};
Omniture.constants["LoginWidget"]["SessionTimeoutSystemError"] = {
    "eventname": "system timeout system error",
    "prop53": "system timeout system error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["LogOutForgotPersonalIdLinkClick"] = {};
Omniture.constants["LoginWidget"]["LogOutForgotPersonalIdLinkClick"] = {
    "prop53": "logout forgot id link",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking"
};

Omniture.constants["LoginWidget"]["SessionTimeoutForgotPersonalIdLinkClick"] = {};
Omniture.constants["LoginWidget"]["SessionTimeoutForgotPersonalIdLinkClick"] = {
    "prop53": "system timeout forgot id link",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking"
};

Omniture.constants["LoginWidget"]["StandaloneEnterPersonalId"] = {};
Omniture.constants["LoginWidget"]["StandaloneEnterPersonalId"] = {
    "eventname": "enter personal ID standalone",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter personal ID standalone",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};
Omniture.constants["LoginWidget"]["StandalonePersonalIdRememberIdSelected"] = {};
Omniture.constants["LoginWidget"]["StandalonePersonalIdRememberIdSelected"] = {
    "prop53": "enter personal id remember personal id standalone selected",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};
Omniture.constants["LoginWidget"]["StandalonePersonalIdRememberIdDeSelected"] = {};
Omniture.constants["LoginWidget"]["StandalonePersonalIdRememberIdDeSelected"] = {
    "prop53": "enter personal id standalone remember personal id deselected",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};
Omniture.constants["LoginWidget"]["StandalonePersonalIdIdentifier"] = {};
Omniture.constants["LoginWidget"]["StandalonePersonalIdIdentifier"] = {
    "prop53": "enter personal id standalone remember personal id identified",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking"
};
Omniture.constants["LoginWidget"]["StandalonePersonalIdSystemError"] = {};
Omniture.constants["LoginWidget"]["StandalonePersonalIdSystemError"] = {
    "eventname": "enter personal id standalone system error",
    "errorStatus": "login enter personal id standalone system error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter personal id standalone system error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};
Omniture.constants["LoginWidget"]["StandalonePersonalIdIPLockError"] = {};
Omniture.constants["LoginWidget"]["StandalonePersonalIdIPLockError"] = {
    "eventname": "enter personal id standalone system error -1",
    "errorStatus": "login enter personal id standalone system error -1",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter personal id standalone system error -1",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};
Omniture.constants["LoginWidget"]["StandalonePersonalIdFormatError"] = {};
Omniture.constants["LoginWidget"]["StandalonePersonalIdFormatError"] = {
    "eventname": "enter personal id standalone format error",
    "errorStatus": "login enter personal id standalone format error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter personal id standalone format error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};
Omniture.constants["LoginWidget"]["StandalonePersonalIdRecognizedFirstError"] = {};
Omniture.constants["LoginWidget"]["StandalonePersonalIdRecognizedFirstError"] = {
    "eventname": "enter personal id standalone id not recognized first",
    "errorStatus": "login enter personal id standalone not recognized first error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter personal id standalone id not recognized first",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};
Omniture.constants["LoginWidget"]["StandalonePersonalIdRecognizedSecondError"] = {};
Omniture.constants["LoginWidget"]["StandalonePersonalIdRecognizedSecondError"] = {
    "eventname": "enter personal id standalone id not recognized second",
    "errorStatus": "login enter personal id standalone not recognized second error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter personal id standalone id not recognized second",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};
Omniture.constants["LoginWidget"]["StandalonePersonalIdForgotIdLinkClick"] = {};
Omniture.constants["LoginWidget"]["StandalonePersonalIdForgotIdLinkClick"] = {
    "prop53": "enter personal id standalone forgot id link",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};


Omniture.constants["LoginWidget"]["StandaloneAnswSecrtyQustn"] = {};
Omniture.constants["LoginWidget"]["StandaloneAnswSecrtyQustn"] = {
    "eventname": "answer security question standalone",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "answer security question standalone",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["StandaloneScrtyQustnFrmtErr"] = {};
Omniture.constants["LoginWidget"]["StandaloneScrtyQustnFrmtErr"] = {
    "eventname": "enter security question standalone format error",
    "errorStatus": "login enter security question standalone format error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "answer security question standalone format error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["StandaloneScrtyQustnSystmErr"] = {};
Omniture.constants["LoginWidget"]["StandaloneScrtyQustnSystmErr"] = {
    "eventname": "answer security question standalone system error",
    "errorStatus": "login enter security question standalone system error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "answer security question standalone system error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["StandaloneScrtyQustnFail"] = {};
Omniture.constants["LoginWidget"]["StandaloneScrtyQustnFail"] = {
    "eventname": "security question failure standalone",
    "errorStatus": "login enter security question failure standalone",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "security question failure standalone",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["StandaloneAswSecrtyQstnFogotAswLink"] = {};
Omniture.constants["LoginWidget"]["StandaloneAswSecrtyQstnFogotAswLink"] = {
    "prop53": "answer security question standalone forgot answer link",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking"
};

Omniture.constants["LoginWidget"]["StandaloneAswSecrtyQstnCancelLink"] = {};
Omniture.constants["LoginWidget"]["StandaloneAswSecrtyQstnCancelLink"] = {
    "prop53": "answer security question standalone cancel link",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking"
};

Omniture.constants["LoginWidget"]["StandaloneEnterPwd"] = {};
Omniture.constants["LoginWidget"]["StandaloneEnterPwd"] = {
    "eventname": "enter password standalone",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter password standalone",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["StandalonePwdFrmtErr"] = {};
Omniture.constants["LoginWidget"]["StandalonePwdFrmtErr"] = {
    "eventname": "enter password standalone format error",
    "errorStatus": "login enter password standalone format error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter password standalone format error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["StandalonePwdSystmErr"] = {};
Omniture.constants["LoginWidget"]["StandalonePwdSystmErr"] = {
    "eventname": "enter password standalone system error",
    "errorStatus": "login enter password standalone system error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter password standalone system error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

//B-21523 Story changes start
Omniture.constants["LoginWidget"]["StandalonePwdFail"] = {};
Omniture.constants["LoginWidget"]["StandalonePwdFail"] = {
    "eventname": "password failure standalone",
    "errorStatus": "login enter password failure standalone",
    "prop40": "online banking",
    "prop13": "password failure standalone",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["PilotStandalonePwdFail"] = {};
Omniture.constants["LoginWidget"]["PilotStandalonePwdFail"] = {
    "eventname": "password failure standalone case sensitivity error",
    "errorStatus": "login enter password failure standalone case sensitivity error",
    "prop40": "online banking",
    "prop13": "password failure standalone case sensitivity error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};
//B-21523 Story changes End

Omniture.constants["LoginWidget"]["StandaloneForgotPwdLink"] = {};
Omniture.constants["LoginWidget"]["StandaloneForgotPwdLink"] = {
    "prop53": "enter password standalone forgot password link",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking"
};

Omniture.constants["LoginWidget"]["StandalonePwdCancelLink"] = {};
Omniture.constants["LoginWidget"]["StandalonePwdCancelLink"] = {
    "prop53": "enter password standalone cancel link",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking"
};
Omniture.constants["LoginWidget"]["StandaloneDontAskQstnSelect"] = {};
Omniture.constants["LoginWidget"]["StandaloneDontAskQstnSelect"] = {
    "eventname": "security question remember me selected standalone",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "security question remember me selected standalone",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["StandaloneDontAskQstnDeSelect"] = {};
Omniture.constants["LoginWidget"]["StandaloneDontAskQstnDeSelect"] = {
    "eventname": "security question remember me deselected standalone",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "security question remember me deselected standalone",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["ResetPassword"] = {};
Omniture.constants["LoginWidget"]["ResetPassword"] = {
    "eventname": "create new password",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "create new password",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["ResetPasswordSystemError"] = {};
Omniture.constants["LoginWidget"]["ResetPasswordSystemError"] = {
    "eventname": "create new password system error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "create new password system error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["ResetPasswordCancelLinkClick"] = {};
Omniture.constants["LoginWidget"]["ResetPasswordCancelLinkClick"] = {
    "prop53": "create new password cancel link",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking"
};

Omniture.constants["LoginWidget"]["ResetPasswordErrorCancelLinkClick"] = {};
Omniture.constants["LoginWidget"]["ResetPasswordErrorCancelLinkClick"] = {
    "prop53": "create new password system error cancel link",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking"
};

Omniture.constants["LoginWidget"]["StandalonePwdReqErr"] = {};
Omniture.constants["LoginWidget"]["StandalonePwdReqErr"] = {
    "eventname": "enter password standalone request failure",
    "errorStatus": "login enter password standalone request failure",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter password standalone request failure",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["PwdReqErr"] = {};
Omniture.constants["LoginWidget"]["PwdReqErr"] = {
    "eventname": "enter password request failure",
    "errorStatus": "login enter password request failure",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter password request failure",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["StandalonePwdUAGErr"] = {};
Omniture.constants["LoginWidget"]["StandalonePwdUAGErr"] = {
    "eventname": "enter password standalone uag error",
    "errorStatus": "login enter password standalone uag error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter password standalone uag error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["PwdUAGErr"] = {};
Omniture.constants["LoginWidget"]["PwdUAGErr"] = {
    "eventname": "enter password uag error",
    "errorStatus": "login enter password uag error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter password uag error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["StandalonePwdOAMErr"] = {};
Omniture.constants["LoginWidget"]["StandalonePwdOAMErr"] = {
    "eventname": "enter password standalone oam error",
    "errorStatus": "login enter password standalone oam error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter password standalone oam error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["PwdOAMErr"] = {};
Omniture.constants["LoginWidget"]["PwdOAMErr"] = {
    "eventname": "enter password oam error",
    "errorStatus": "login enter password oam error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter password oam error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["StandalonePersonalIdReqErr"] = {};
Omniture.constants["LoginWidget"]["StandalonePersonalIdReqErr"] = {
    "eventname": "enter personal id standalone request failure",
    "errorStatus": "login enter personal id standalone request failure",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter personal id standalone request failure",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["PersonalIdReqErr"] = {};
Omniture.constants["LoginWidget"]["PersonalIdReqErr"] = {
    "eventname": "enter personal id request failure",
    "errorStatus": "login enter personal id request failure",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter personal id request failure",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["StandalonePersonalIdUAGErr"] = {};
Omniture.constants["LoginWidget"]["StandalonePersonalIdUAGErr"] = {
    "eventname": "enter personal id standalone uag error",
    "errorStatus": "login enter personal id standalone uag error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter personal id standalone uag error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["PersonalIdUAGErr"] = {};
Omniture.constants["LoginWidget"]["PersonalIdUAGErr"] = {
    "eventname": "enter personal id uag error",
    "errorStatus": "login enter personal id uag error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter personal id uag error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["StandalonePersonalIdOAMErr"] = {};
Omniture.constants["LoginWidget"]["StandalonePersonalIdOAMErr"] = {
    "eventname": "enter personal id standalone oam error",
    "errorStatus": "login enter personal id standalone oam error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter personal id standalone oam error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["PersonalIdOAMErr"] = {};
Omniture.constants["LoginWidget"]["PersonalIdOAMErr"] = {
    "eventname": "enter personal id oam error",
    "errorStatus": "login enter personal id oam error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter personal id oam error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["StandaloneScrtyQustnReqErr"] = {};
Omniture.constants["LoginWidget"]["StandaloneScrtyQustnReqErr"] = {
    "eventname": "enter security question standalone request failure",
    "errorStatus": "login enter security question standalone request failure",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter security question standalone request failure",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["ScrtyQustnReqErr"] = {};
Omniture.constants["LoginWidget"]["ScrtyQustnReqErr"] = {
    "eventname": "enter security question request failure",
    "errorStatus": "login enter security question request failure",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter security question request failure",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["StandaloneScrtyQustnUAGErr"] = {};
Omniture.constants["LoginWidget"]["StandaloneScrtyQustnUAGErr"] = {
    "eventname": "enter security question standalone uag error",
    "errorStatus": "login enter security question standalone uag error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter security question standalone uag error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["ScrtyQustnUAGErr"] = {};
Omniture.constants["LoginWidget"]["ScrtyQustnUAGErr"] = {
    "eventname": "enter security question uag error",
    "errorStatus": "login enter security question uag error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter security question uag error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["StandaloneScrtyQustnOAMErr"] = {};
Omniture.constants["LoginWidget"]["StandaloneScrtyQustnOAMErr"] = {
    "eventname": "enter security question standalone oam error",
    "errorStatus": "login enter security question standalone oam error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter security question standalone oam error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["ScrtyQustnOAMErr"] = {};
Omniture.constants["LoginWidget"]["ScrtyQustnOAMErr"] = {
    "eventname": "enter security question oam error",
    "errorStatus": "login enter security question oam error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter security question oam error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["StandaloneTempAccessCodeReqErr"] = {};
Omniture.constants["LoginWidget"]["StandaloneTempAccessCodeReqErr"] = {
    "eventname": "enter temp access code standalone request failure",
    "errorStatus": "login enter temp access code standalone request failure",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter temp access code standalone request failure",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["TempAccessCodeReqErr"] = {};
Omniture.constants["LoginWidget"]["TempAccessCodeReqErr"] = {
    "eventname": "enter temp access code request failure",
    "errorStatus": "login enter temp access code request failure",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter temp access code request failure",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["StandaloneTempAccessCodeUAGErr"] = {};
Omniture.constants["LoginWidget"]["StandaloneTempAccessCodeUAGErr"] = {
    "eventname": "enter temp access code standalone uag error",
    "errorStatus": "login enter temp access code standalone uag error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter temp access code standalone uag error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["TempAccessCodeUAGErr"] = {};
Omniture.constants["LoginWidget"]["TempAccessCodeUAGErr"] = {
    "eventname": "enter temp access code uag error",
    "errorStatus": "login enter temp access code uag error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter temp access code uag error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["StandaloneTempAccessCodeOAMErr"] = {};
Omniture.constants["LoginWidget"]["StandaloneTempAccessCodeOAMErr"] = {
    "eventname": "enter temp access code standalone oam error",
    "errorStatus": "login enter temp access code standalone oam error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter temp access code standalone oam error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["TempAccessCodeOAMErr"] = {};
Omniture.constants["LoginWidget"]["TempAccessCodeOAMErr"] = {
    "eventname": "enter temp access code oam error",
    "errorStatus": "login enter temp access code oam error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter temp access code oam error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["ProtectedResourceReqErr"] = {};
Omniture.constants["LoginWidget"]["ProtectedResourceReqErr"] = {
    "eventname": "protected resource request failure",
    "errorStatus": "login protected resource request failure",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "protected resource request failure",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["StandaloneProtectedResourceReqErr"] = {};
Omniture.constants["LoginWidget"]["StandaloneProtectedResourceReqErr"] = {
    "eventname": "protected resource standalone request failure",
    "errorStatus": "login protected resource standalonerequest failure",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "protected resource standalone request failure",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["StandaloneTempPwdExpire"] = {};
Omniture.constants["LoginWidget"]["StandaloneTempPwdExpire"] = {
    "eventname": "temp password standalone expired error",
    "pagename": "temp password standalone expired error",
    "prop13": "temp password standalone expired error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["TempPwdExpire"] = {};
Omniture.constants["LoginWidget"]["TempPwdExpire"] = {
    "eventname": "temp password expired error",
    "pagename": "temp password expired error",
    "prop13": "temp password expired error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["StandaloneOAMGenricErr"] = {};
Omniture.constants["LoginWidget"]["StandaloneOAMGenricErr"] = {
    "eventname": "enter password standalone oam error code 4",
    "errorStatus": "login enter password standalone oam error code 4",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter password standalone oam error code 4",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["OAMGenricErr"] = {};
Omniture.constants["LoginWidget"]["OAMGenricErr"] = {
    "eventname": "enter password oam error code 4",
    "errorStatus": "login enter password oam error code 4",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter password oam error code 4",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};


Omniture.constants["LoginWidget"]["StandaloneOAMDisableErr"] = {};
Omniture.constants["LoginWidget"]["StandaloneOAMDisableErr"] = {
    "eventname": "enter password standalone oam disable error",
    "errorStatus": "login enter password standalone oam disable error",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter password standalone oam disable error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["StandaloneOAMDisableErr5"] = {};
Omniture.constants["LoginWidget"]["StandaloneOAMDisableErr5"] = {
    "eventname": "enter password standalone oam error code 5",
    "prop13": "login enter password standalone oam error code 5"
};
Omniture.constants["LoginWidget"]["StandaloneOAMDisableErr6"] = {};
Omniture.constants["LoginWidget"]["StandaloneOAMDisableErr6"] = {
    "eventname": "enter password standalone oam error code 6",
    "prop13": "login enter password standalone oam error code 6"
};
Omniture.constants["LoginWidget"]["StandaloneOAMDisableErr7"] = {};
Omniture.constants["LoginWidget"]["StandaloneOAMDisableErr7"] = {
    "eventname": "enter password standalone oam error code 7",
    "prop13": "login enter password standalone oam error code 7"
};

Omniture.constants["LoginWidget"]["OAMDisableErr"] = {};
Omniture.constants["LoginWidget"]["OAMDisableErr"] = {
    "eventname": "enter password oam disable error",
    "errorStatus": "login enter password disable oam",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "enter password oam disable error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["OAMDisableErr5"] = {};
Omniture.constants["LoginWidget"]["OAMDisableErr5"] = {
    "eventname": "enter password oam error code 5",
    "prop13": "login enter password oam error code 5",
    "loginType": "login widget no iframe"
};
Omniture.constants["LoginWidget"]["OAMDisableErr6"] = {};
Omniture.constants["LoginWidget"]["OAMDisableErr6"] = {
    "eventname": "enter password oam error code 6",
    "prop13": "login enter password oam error code 6",
    "loginType": "login widget no iframe"
};
Omniture.constants["LoginWidget"]["OAMDisableErr7"] = {};
Omniture.constants["LoginWidget"]["OAMDisableErr7"] = {
    "eventname": "enter password oam error code 7",
    "prop13": "login enter password oam error code 7",
    "loginType": "login widget no iframe"
};

Omniture.constants["LoginWidget"]["StandaloneAnswSecrtyQustnfdq"] = {};
Omniture.constants["LoginWidget"]["StandaloneAnswSecrtyQustnfdq"] = {
    "eventname": "answer security question standalone fdq",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "answer security question standalone fdq",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};
Omniture.constants["LoginWidget"]["AnswSecrtyQustnfdq"] = {};
Omniture.constants["LoginWidget"]["AnswSecrtyQustnfdq"] = {
    "eventname": "answer security question fdq",
    "prop67": "login widget",
    "eVar67": "login widget",
    "prop40": "online banking",
    "prop53": "answer security question fdq",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb",
    "loginType": "login widget no iframe"
};
Omniture.constants["LoginWidget"]["PilotResetPwdNoInput"] = {};
Omniture.constants["LoginWidget"]["PilotResetPwdNoInput"] = {
    "eventname": "create new password pwd case user entry validation failure",
    "prop13": "create new password pwd case user entry validation failure",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};
Omniture.constants["LoginWidget"]["PilotResetPwdDoNotMet"] = {};
Omniture.constants["LoginWidget"]["PilotResetPwdDoNotMet"] = {
    "eventname": "create new password pwd case new pwd entry format error",
    "prop13": "create new password pwd case new pwd entry format error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["PilotResetPwdDoNotMatch"] = {};
Omniture.constants["LoginWidget"]["PilotResetPwdDoNotMatch"] = {
    "eventname": "create new password pwd case new pwd entry mismatch error",
    "prop13": "create new password pwd case new pwd entry mismatch error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["NonPilotResetPwdNoInput"] = {};
Omniture.constants["LoginWidget"]["NonPilotResetPwdNoInput"] = {
    "eventname": "create new password user entry validation failure",
    "prop13": "create new password user entry validation failure",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};
Omniture.constants["LoginWidget"]["NonPilotResetPwdDoNotMet"] = {};
Omniture.constants["LoginWidget"]["NonPilotResetPwdDoNotMet"] = {
    "eventname": "create new password new pwd entry format error",
    "prop13": "create new password new pwd entry format error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};

Omniture.constants["LoginWidget"]["NonPilotResetPwdDoNotMatch"] = {};
Omniture.constants["LoginWidget"]["NonPilotResetPwdDoNotMatch"] = {
    "eventname": "create new password new pwd entry mismatch error",
    "prop13": "create new password new pwd entry mismatch error",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};
//BEGIN - CI:Dec-2017, B-55520 Changes
Omniture.constants["LoginWidget"]["DotComBlockBrowser"] = {};
Omniture.constants["LoginWidget"]["DotComBlockBrowser"] = {
    "prop53": "dotcom home page login widget blocked browser error",
    "prop13": "dotcom home page login widget blocked browser error"
};

Omniture.constants["LoginWidget"]["LegacyDotComBlockBrowser"] = {};
Omniture.constants["LoginWidget"]["LegacyDotComBlockBrowser"] = {
    "prop53": "dotcom legacy login widget blocked browser message",
    "prop13": "dotcom legacy login widget blocked browser message"
};

Omniture.constants["LoginWidget"]["StandAloneBlockBrowser"] = {};
Omniture.constants["LoginWidget"]["StandAloneBlockBrowser"] = {
    "eventname": "standalone login page blocked browser error",
    "errorStatus": "standalone login page blocked browser error"
};
//END - CI:Dec-2017, B-55520 Changes

//BEGIN - Transmit Pilot Login Changes
Omniture.constants["Mobile"] = {};
Omniture.constants["MobilePrefix"] = "usb:mobile:app";

Omniture.constants["LoginWidget"]["StepupQuestion"] = {};
Omniture.constants["LoginWidget"]["StepupQuestion"] = {
    "eventname": "answer security question",
    "loginMethod": "transmit login",
    "challengeStatus": "login challenge",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneStepupQuestion"] = {};
Omniture.constants["LoginWidget"]["StandaloneStepupQuestion"] = {
    "eventname": "answer security question standalone",
    "loginMethod": "transmit login",
    "challengeStatus": "login challenge"
};

Omniture.constants["Mobile"]["StepupQuestion"] = {};
Omniture.constants["Mobile"]["StepupQuestion"] = {
    "mobileEvent": "login stepup",
    "loginMethod": "transmit login",
    "challengeStatus": "login challenge"
};

Omniture.constants["LoginWidget"]["StepupQAFormatError"] = {};
Omniture.constants["LoginWidget"]["StepupQAFormatError"] = {
    "eventname": "enter security question format error",
    "loginMethod": "transmit login",
    "errorStatus": "login enter security question format error",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneStepupQAFormatError"] = {};
Omniture.constants["LoginWidget"]["StandaloneStepupQAFormatError"] = {
    "eventname": "enter security question standalone format error",
    "loginMethod": "transmit login",
    "errorStatus": "login enter security question format error"
};

Omniture.constants["Mobile"]["StepupQAFormatError"] = {};
Omniture.constants["Mobile"]["StepupQAFormatError"] = {
    "mobileEvent": "answer security question format error",
    "loginMethod": "transmit login",
    "errorStatus": "login enter security question format error"
};

Omniture.constants["LoginWidget"]["StepupQASystemError"] = {};
Omniture.constants["LoginWidget"]["StepupQASystemError"] = {
    "eventname": "answer security question system error",
    "loginMethod": "transmit login",
    "errorStatus": "login enter security question system error",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneStepupQASystemError"] = {};
Omniture.constants["LoginWidget"]["StandaloneStepupQASystemError"] = {
    "eventname": "answer security question standalone system error",
    "loginMethod": "transmit login",
    "errorStatus": "login enter security question system error"
};

Omniture.constants["Mobile"]["StepupQASystemError"] = {};
Omniture.constants["Mobile"]["StepupQASystemError"] = {
    "mobileEvent": "login stepup system error",
    "loginMethod": "transmit login",
    "errorStatus": "login enter security question system error"
};

Omniture.constants["LoginWidget"]["StepupQAFailure"] = {};
Omniture.constants["LoginWidget"]["StepupQAFailure"] = {
    "eventname": "security question failure",
    "loginMethod": "transmit login",
    "errorStatus": "login enter security question failure",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneStepupQAFailure"] = {};
Omniture.constants["LoginWidget"]["StandaloneStepupQAFailure"] = {
    "eventname": "security question standalone failure",
    "loginMethod": "transmit login",
    "errorStatus": "login enter security question failure"
};

Omniture.constants["Mobile"]["StepupQAFailure"] = {};
Omniture.constants["Mobile"]["StepupQAFailure"] = {
    "mobileEvent": "login stepup failure",
    "loginMethod": "transmit login",
    "errorStatus": "login enter security question failure"
};

Omniture.constants["LoginWidget"]["StepupForgotAnswer"] = {};
Omniture.constants["LoginWidget"]["StepupForgotAnswer"] = {
    "prop53": "answer security question forgot answer link",
    "loginMethod": "transmit login",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneStepupForgotAnswer"] = {};
Omniture.constants["LoginWidget"]["StandaloneStepupForgotAnswer"] = {
    "prop53": "answer security question standalone forgot answer link",
    "loginMethod": "transmit login"
};

Omniture.constants["Mobile"]["StepupForgotAnswer"] = {};
Omniture.constants["Mobile"]["StepupForgotAnswer"] = {
    "mblprop53": "login question forgot answer link",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StepupQAChangeAuth"] = {};
Omniture.constants["LoginWidget"]["StepupQAChangeAuth"] = {
    "prop53": "answer security question change authentication method link",
    "loginMethod": "transmit login",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneStepupQAChangeAuth"] = {};
Omniture.constants["LoginWidget"]["StandaloneStepupQAChangeAuth"] = {
    "prop53": "answer security question standalone change authentication method link",
    "loginMethod": "transmit login"
};

Omniture.constants["Mobile"]["StepupQAChangeAuth"] = {};
Omniture.constants["Mobile"]["StepupQAChangeAuth"] = {
    "mblprop53": "login question change authentication method link",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StepupEnterOTPChangeAuth"] = {};
Omniture.constants["LoginWidget"]["StepupEnterOTPChangeAuth"] = {
    "prop53": "enter otp change authentication method link",
    "loginMethod": "transmit login",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["Mobile"]["StepupEnterOTPChangeAuth"] = {};
Omniture.constants["Mobile"]["StepupEnterOTPChangeAuth"] = {
    "mblprop53": "login enter otp change authentication method link",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StepupMobApprovePendingChangeAuth"] = {};
Omniture.constants["LoginWidget"]["StepupMobApprovePendingChangeAuth"] = {
    "prop53": "mobile approve pending change authentication method link",
    "loginMethod": "transmit login",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["Mobile"]["StepupMobApprovePendingChangeAuth"] = {};
Omniture.constants["Mobile"]["StepupMobApprovePendingChangeAuth"] = {
    "mblprop53": "login mobile approve pending change authentication method link",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["ChangeAuthQALink"] = {};
Omniture.constants["LoginWidget"]["ChangeAuthQALink"] = {
    "prop53": "step up select authentication method id shield selected",
    "loginMethod": "transmit login",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneChangeAuthQALink"] = {};
Omniture.constants["LoginWidget"]["StandaloneChangeAuthQALink"] = {
    "prop53": "step up select authentication method standalone id shield selected",
    "loginMethod": "transmit login"
};

Omniture.constants["Mobile"]["ChangeAuthQALink"] = {};
Omniture.constants["Mobile"]["ChangeAuthQALink"] = {
    "mblprop53": "login select authentication method standalone id shield selected",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["ChangeAuthOTPLink"] = {};
Omniture.constants["LoginWidget"]["ChangeAuthOTPLink"] = {
    "prop53": "step up select authentication method otp via sms selected",
    "loginMethod": "transmit login",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneChangeAuthOTPLink"] = {};
Omniture.constants["LoginWidget"]["StandaloneChangeAuthOTPLink"] = {
    "prop53": "step up select authentication method standalone otp via sms selected",
    "loginMethod": "transmit login"
};

Omniture.constants["Mobile"]["ChangeAuthOTPLink"] = {};
Omniture.constants["Mobile"]["ChangeAuthOTPLink"] = {
    "mblprop53": "login select authentication method standalone otp via sms selected",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["ChangeAuthMobApproveLink"] = {};
Omniture.constants["LoginWidget"]["ChangeAuthMobApproveLink"] = {
    "prop53": "step up select authentication method visual pattern or fingerprint selected",
    "loginMethod": "transmit login",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneChangeAuthMobApproveLink"] = {};
Omniture.constants["LoginWidget"]["StandaloneChangeAuthMobApproveLink"] = {
    "prop53": "step up select authentication method standalone visual pattern or fingerprint selected",
    "loginMethod": "transmit login"
};

Omniture.constants["Mobile"]["ChangeAuthMobApproveLink"] = {};
Omniture.constants["Mobile"]["ChangeAuthMobApproveLink"] = {
    "mblprop53": "login select authentication method standalone visual pattern or fingerprint selected",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StepupChangeAuthSuccess"] = {};
Omniture.constants["LoginWidget"]["StepupChangeAuthSuccess"] = {
    "eventname": "step up select authentication method",
    "loginMethod": "transmit login",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneStepupChangeAuthSuccess"] = {};
Omniture.constants["LoginWidget"]["StandaloneStepupChangeAuthSuccess"] = {
    "eventname": "step up standalone select authentication method",
    "loginMethod": "transmit login"
};

Omniture.constants["Mobile"]["StepupChangeAuthSuccess"] = {};
Omniture.constants["Mobile"]["StepupChangeAuthSuccess"] = {
    "mobileEvent": "stepup select authentication method",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StepupSelectOTPDevice"] = {};
Omniture.constants["LoginWidget"]["StepupSelectOTPDevice"] = {
    "eventname": "step up select OTP authentication device",
    "loginMethod": "transmit login",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneStepupSelectOTPDevice"] = {};
Omniture.constants["LoginWidget"]["StandaloneStepupSelectOTPDevice"] = {
    "eventname": "step up standalone select OTP authentication device",
    "loginMethod": "transmit login"
};

Omniture.constants["Mobile"]["StepupSelectOTPDevice"] = {};
Omniture.constants["Mobile"]["StepupSelectOTPDevice"] = {
    "mobileEvent": "stepup select otp device",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StepupEnterOTPCode"] = {};
Omniture.constants["LoginWidget"]["StepupEnterOTPCode"] = {
    "eventname": "step up authentication OTP pending",
    "loginMethod": "transmit login",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneStepupEnterOTPCode"] = {};
Omniture.constants["LoginWidget"]["StandaloneStepupEnterOTPCode"] = {
    "eventname": "step up standalone authentication OTP pending",
    "loginMethod": "transmit login"
};

Omniture.constants["Mobile"]["StepupEnterOTPCode"] = {};
Omniture.constants["Mobile"]["StepupEnterOTPCode"] = {
    "mobileEvent": "stepup enter otp code pending",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StepupEnterOTPFormatError"] = {};
Omniture.constants["LoginWidget"]["StepupEnterOTPFormatError"] = {
    "eventname": "step up enter otp format error",
    "loginMethod": "transmit login",
    "errorStatus": "login enter otp format error",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["Mobile"]["StepupEnterOTPFormatError"] = {};
Omniture.constants["Mobile"]["StepupEnterOTPFormatError"] = {
    "mobileEvent": "stepup enter otp format error",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StepupEnterOTPUserError"] = {};
Omniture.constants["LoginWidget"]["StepupEnterOTPUserError"] = {
    "eventname": "step up enter otp user error",
    "loginMethod": "transmit login",
    "errorStatus": "login enter otp user error",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["Mobile"]["StepupEnterOTPUserError"] = {};
Omniture.constants["Mobile"]["StepupEnterOTPUserError"] = {
    "mobileEvent": "stepup enter otp user error",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StepupEnterOTPUserLockedError"] = {};
Omniture.constants["LoginWidget"]["StepupEnterOTPUserLockedError"] = {
    "eventname": "step up enter otp user locked error",
    "loginMethod": "transmit login",
    "errorStatus": "login enter otp user locked error",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["Mobile"]["StepupEnterOTPUserLockedError"] = {};
Omniture.constants["Mobile"]["StepupEnterOTPUserLockedError"] = {
    "mobileEvent": "stepup enter otp user locked error",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StepupMobileApprovePendingError"] = {};
Omniture.constants["LoginWidget"]["StepupMobileApprovePendingError"] = {
    "eventname": "step up authentication authorization pending error",
    "loginMethod": "transmit login",
    "errorStatus": "login step up authentication authorization pending error",
    "prop67": "login widget",
    "eVar67": "login widget"
};
Omniture.constants["Mobile"]["StepupMobileApprovePendingError"] = {};
Omniture.constants["Mobile"]["StepupMobileApprovePendingError"] = {
    "mobileEvent": "stepup authentication authorization pending error",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StepupMobileApproveExpiredError"] = {};
Omniture.constants["LoginWidget"]["StepupMobileApproveExpiredError"] = {
    "eventname": "step up authentication authorization expired error",
    "loginMethod": "transmit login",
    "errorStatus": "login step up authentication authorization expired error",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["Mobile"]["StepupMobileApproveExpiredError"] = {};
Omniture.constants["Mobile"]["StepupMobileApproveExpiredError"] = {
    "mobileEvent": "stepup authentication authorization expired error",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StepupAuthSystemError"] = {};
Omniture.constants["LoginWidget"]["StepupAuthSystemError"] = {
    "eventname": "step up authentication system error",
    "loginMethod": "transmit login",
    "errorStatus": "login step up authentication system error",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["Mobile"]["StepupAuthSystemError"] = {};
Omniture.constants["Mobile"]["StepupAuthSystemError"] = {
    "mobileEvent": "stepup authentication system error",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StepupAuthFailed"] = {};
Omniture.constants["LoginWidget"]["StepupAuthFailed"] = {
    "eventname": "step up authentication failed",
    "loginMethod": "transmit login",
    "errorStatus": "login step up authentication failed",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["Mobile"]["StepupAuthFailed"] = {};
Omniture.constants["Mobile"]["StepupAuthFailed"] = {
    "mobileEvent": "stepup authentication failed",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StepupQAError"] = {};
Omniture.constants["LoginWidget"]["StepupQAError"] = {
    "eventname": "step up answer security question error",
    "loginMethod": "transmit login",
    "errorStatus": "login step up answer security question error",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["Mobile"]["StepupQAError"] = {};
Omniture.constants["Mobile"]["StepupQAError"] = {
    "mobileEvent": "stepup answer security question error",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StepupMobApprove"] = {};
Omniture.constants["LoginWidget"]["StepupMobApprove"] = {
    "eventname": "step up select authentication device",
    "loginMethod": "transmit login",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneStepupMobApprove"] = {};
Omniture.constants["LoginWidget"]["StandaloneStepupMobApprove"] = {
    "eventname": "step up standalone select authentication device",
    "loginMethod": "transmit login"
};

Omniture.constants["Mobile"]["StepupMobApprove"] = {};
Omniture.constants["Mobile"]["StepupMobApprove"] = {
    "mobileEvent": "login stepup select authentication device",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StepupMobApprovePending"] = {};
Omniture.constants["LoginWidget"]["StepupMobApprovePending"] = {
    "eventname": "step up authentication authorization pending",
    "loginMethod": "transmit login",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneStepupMobApprovePending"] = {};
Omniture.constants["LoginWidget"]["StandaloneStepupMobApprovePending"] = {
    "eventname": "step up standalone authentication authorization pending",
    "loginMethod": "transmit login"
};

Omniture.constants["Mobile"]["StepupMobApprovePending"] = {};
Omniture.constants["Mobile"]["StepupMobApprovePending"] = {
    "mobileEvent": "login stepup authentication authorization pending",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StepupMobApproveChangeDevice"] = {};
Omniture.constants["LoginWidget"]["StepupMobApproveChangeDevice"] = {
    "prop53": "step up authentication authorization change device",
    "loginMethod": "transmit login",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["Mobile"]["StepupMobApproveChangeDevice"] = {};
Omniture.constants["Mobile"]["StepupMobApproveChangeDevice"] = {
    "mblprop53": "login stepup authentication authorization change device",
    "loginMethod": "transmit login"
};
/*DE SE Card 204 START*/
Omniture.constants["LoginWidget"]["LoginStepUpPwdHidePassword"] = {};
Omniture.constants["LoginWidget"]["LoginStepUpPwdHidePassword"] = {
    "prop53": "enter password standalone hide password link",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};
Omniture.constants["LoginWidget"]["LoginStepUpPwdShowPassword"] = {};
Omniture.constants["LoginWidget"]["LoginStepUpPwdShowPassword"] = {
    "prop53": "enter password standalone show password link",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};
Omniture.constants["LoginWidget"]["LoginStepUpPwdHidePasswordSBBDOTCOM"] = {};
Omniture.constants["LoginWidget"]["LoginStepUpPwdHidePasswordSBBDOTCOM"] = {
    "prop53": "enter password hide password link",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};
Omniture.constants["LoginWidget"]["LoginStepUpPwdShowPasswordSBBDOTCOM"] = {};
Omniture.constants["LoginWidget"]["LoginStepUpPwdShowPasswordSBBDOTCOM"] = {
    "prop53": "enter password show password link",
    "uxNameForSiteCat": "desktop",
    "appNameForSiteCat": "olb"
};
/*DE SE Card 204 END*/
Omniture.constants["LoginWidget"]["StepupOTPResend"] = {};
Omniture.constants["LoginWidget"]["StepupOTPResend"] = {
    "prop53": "step up authentication otp resend",
    "loginMethod": "transmit login",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["Mobile"]["StepupOTPResend"] = {};
Omniture.constants["Mobile"]["StepupOTPResend"] = {
    "mblprop53": "login stepup authentication otp resend",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["EnterPassword"] = {};
Omniture.constants["LoginWidget"]["EnterPassword"] = {
    "eventname": "enter password",
    "loginMethod": "transmit login",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneEnterPassword"] = {};
Omniture.constants["LoginWidget"]["StandaloneEnterPassword"] = {
    "eventname": "enter password standalone",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["EnterPasswordFormatError"] = {};
Omniture.constants["LoginWidget"]["EnterPasswordFormatError"] = {
    "eventname": "enter password format error",
    "loginMethod": "transmit login",
    "errorStatus": "login enter password format error",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneEnterPasswordFormatError"] = {};
Omniture.constants["LoginWidget"]["StandaloneEnterPasswordFormatError"] = {
    "eventname": "enter password standalone format error",
    "loginMethod": "transmit login",
    "errorStatus": "login enter password format error"
};

Omniture.constants["LoginWidget"]["EnterPasswordSystemError"] = {};
Omniture.constants["LoginWidget"]["EnterPasswordSystemError"] = {
    "eventname": "enter password system error",
    "loginMethod": "transmit login",
    "errorStatus": "login enter password system error",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneEnterPasswordSystemError"] = {};
Omniture.constants["LoginWidget"]["StandaloneEnterPasswordSystemError"] = {
    "eventname": "enter password standalone system error",
    "loginMethod": "transmit login",
    "errorStatus": "login enter password system error"
};

Omniture.constants["LoginWidget"]["EnterPasswordLockoutError"] = {};
Omniture.constants["LoginWidget"]["EnterPasswordLockoutError"] = {
    "eventname": "enter password lockout error",
    "loginMethod": "transmit login",
    "errorStatus": "login enter password lockout error",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneEnterPasswordLockoutError"] = {};
Omniture.constants["LoginWidget"]["StandaloneEnterPasswordLockoutError"] = {
    "eventname": "enter password standalone lockout error",
    "loginMethod": "transmit login",
    "errorStatus": "login enter password lockout error"
};

Omniture.constants["LoginWidget"]["EnterPasswordUserError"] = {};
Omniture.constants["LoginWidget"]["EnterPasswordUserError"] = {
    "eventname": "password failure case sensitivity error",
    "loginMethod": "transmit login",
    "errorStatus": "login enter password failure case sensitivity error",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneEnterPasswordUserError"] = {};
Omniture.constants["LoginWidget"]["StandaloneEnterPasswordUserError"] = {
    "eventname": "password failure standalone case sensitivity error",
    "loginMethod": "transmit login",
    "errorStatus": "login enter password failure case sensitivity error"
};

Omniture.constants["LoginWidget"]["EnterPasswordExpiredError"] = {};
Omniture.constants["LoginWidget"]["EnterPasswordExpiredError"] = {
    "eventname": "temp password expired error",
    "loginMethod": "transmit login",
    "errorStatus": "login temp password expired error",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneEnterPasswordExpiredError"] = {};
Omniture.constants["LoginWidget"]["StandaloneEnterPasswordExpiredError"] = {
    "eventname": "temp password standalone expired error",
    "loginMethod": "transmit login",
    "errorStatus": "login temp password expired error"
};

Omniture.constants["LoginWidget"]["EnterPasswordUserDisabledError"] = {};
Omniture.constants["LoginWidget"]["EnterPasswordUserDisabledError"] = {
    "eventname": "enter password account disabled error",
    "loginMethod": "transmit login",
    "errorStatus": "login enter password account disabled error",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneEnterPasswordUserDisabledError"] = {};
Omniture.constants["LoginWidget"]["StandaloneEnterPasswordUserDisabledError"] = {
    "eventname": "enter password standalone account disabled error",
    "loginMethod": "transmit login",
    "errorStatus": "login enter password account disabled error"
};

Omniture.constants["LoginWidget"]["ForgotPassword"] = {};
Omniture.constants["LoginWidget"]["ForgotPassword"] = {
    "prop53": "enter password forgot password link",
    "loginMethod": "transmit login",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneForgotPassword"] = {};
Omniture.constants["LoginWidget"]["StandaloneForgotPassword"] = {
    "prop53": "enter password standalone forgot password link",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["CancelPassword"] = {};
Omniture.constants["LoginWidget"]["CancelPassword"] = {
    "prop53": "enter password cancel link",
    "loginMethod": "transmit login",
    "prop67": "login widget",
    "eVar67": "login widget"
};

Omniture.constants["LoginWidget"]["StandaloneCancelPassword"] = {};
Omniture.constants["LoginWidget"]["StandaloneCancelPassword"] = {
    "prop53": "enter password standalone cancel link",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StandaloneCancelPassword"] = {
    "prop53": "enter password standalone cancel link",
    "loginMethod": "transmit login"
};


Omniture.constants["LoginWidget"]["TransmitPwdReqErr"] = {
    "eventname": "enter password request failure",
    "errorStatus": "login enter password request failure",
    "prop53": "enter password request failure",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StandaloneTransmitPwdReqErr"] = {
    "eventname": "enter password standalone request failure",
    "errorStatus": "login enter password standalone request failure",
    "prop53": "enter password standalone request failure",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["TransmitProtectedResourceReqErr"] = {
    "eventname": "protected resource request failure",
    "errorStatus": "login protected resource request failure",
    "prop53": "protected resource request failure",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StandaloneTransmitProtectedResourceReqErr"] = {
    "eventname": "protected resource standalone request failure",
    "errorStatus": "login protected resource standalone  request failure",
    "prop53": "protected resource standalone request failure",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["TransmitWebgateReqErr"] = {
    "eventname": "webgate request failure",
    "errorStatus": "login webgate request failure",
    "prop53": "webgate request failure",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StandaloneTransmitWebgateReqErr"] = {
    "eventname": "webgate standalone request failure",
    "errorStatus": "login webgate standalone  request failure",
    "prop53": "webgate standalone request failure",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["TransmitPwdAPIReqErr"] = {
    "eventname": "validate password api request failure",
    "errorStatus": "login validate password api request failure",
    "prop53": "validate password api request failure",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StandaloneTransmitPwdAPIReqErr"] = {
    "eventname": "validate password api standalone request failure",
    "errorStatus": "login validate password api standalone  request failure",
    "prop53": "validate password api standalone request failure",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["TransmitUnExpectedContent"] = {
    "eventname": "unexpected response from server",
    "errorStatus": "login unexpected response from server",
    "prop53": "unexpected response from server",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StandaloneTransmitUnExpectedContent"] = {
    "eventname": "standalone unexpected response from server",
    "errorStatus": "standalone login unexpected response from server",
    "prop53": "standalone unexpected response from server",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["TransmitEmptyQA"] = {
    "eventname": "empty stepup question from server",
    "errorStatus": "login empty stepup question from server",
    "prop53": "empty stepup question from server",
    "loginMethod": "transmit login"
};

Omniture.constants["LoginWidget"]["StandaloneTransmitEmptyQA"] = {
    "eventname": "standalone empty stepup question from server",
    "errorStatus": "standalone login empty stepup question from server",
    "prop53": "standalone empty stepup question from server",
    "loginMethod": "transmit login"
};

//END - Transmit Pilot Login Changes
