<!-- Start of DoubleClick Spotlight Tag: Please do not remove-->
<!-- Activity Name for this tag is:PF - new account center - home page -->
<!-- Web site URL where tag should be placed: http://www.suntrust.com -->
<!-- This tag must be placed within the opening <body> tag, as close to the beginning of it as possible-->
<!-- Creation Date:8/17/2009 -->

	function fnHomePage_spotLight(){
		var axel = Math.random()+"";
		var a = axel * 10000000000000;	
		if(document.getElementById('phasedControl_gettingStarted_OnLoad_spotLightTag')!=null){		
			document.getElementById('phasedControl_gettingStarted_OnLoad_spotLightTag').innerHTML ='<IFRAME 					SRC="https://fls.doubleclick.net/activityi;src=2409535;type=suntr866;cat=pfnew135;ord=1;num='+ a + 				'?" WIDTH=1 HEIGHT=1 FRAMEBORDER=0></IFRAME>';
		}	
		

	}


<!-- End of DoubleClick Spotlight Tag: Please do not remove-->



<!-- Start of DoubleClick Spotlight Tag: Please do not remove-->
<!-- Activity Name for this tag is:PF - new account center - step 1 - personal information -->
<!-- Web site URL where tag should be placed: http://www.suntrust.com -->
<!-- This tag must be placed within the opening <body> tag, as close to the beginning of it as possible-->
<!-- Creation Date:8/17/2009 -->

function fnPersonalInformation_spotLight(){
	var axel = Math.random()+"";
	var a = axel * 10000000000000;
	
	if(document.getElementById('phasedControl_dvPI')!=null){			
		document.getElementById('phasedControl_dvPI').innerHTML ='<IFRAME 								SRC="https://fls.doubleclick.net/activityi;src=2409535;type=suntr866;cat=pfnew924;ord=1;num='+ a + '?" WIDTH=1 					HEIGHT=1 FRAMEBORDER=0></IFRAME>';
		
		}				
	}



<!-- End of DoubleClick Spotlight Tag: Please do not remove-->



<!-- Start of DoubleClick Spotlight Tag: Please do not remove-->
<!-- Activity Name for this tag is:PF - new account center - step 2 - verification and approval -->
<!-- Web site URL where tag should be placed: http://www.suntrust.com -->
<!-- This tag must be placed within the opening <body> tag, as close to the beginning of it as possible-->
<!-- Creation Date:8/17/2009 -->

function fnVerificationApproval_spotLight(){
	var axel = Math.random()+"";
	var a = axel * 10000000000000;
	if(document.getElementById('phasedControl_dvPINext')!=null){		
		document.getElementById('phasedControl_dvPINext').innerHTML ='<IFRAME 		SRC="https://fls.doubleclick.net/activityi;src=2409535;type=suntr866;cat=pfnew427;ord=1;num='+ a + '?" 			WIDTH=1 HEIGHT=1 FRAMEBORDER=0></IFRAME>';		
	}	
}


<!-- End of DoubleClick Spotlight Tag: Please do not remove-->



<!-- Start of DoubleClick Spotlight Tag: Please do not remove-->
<!-- Activity Name for this tag is:PF - new account center - step 3 - fund allocation -->
<!-- Web site URL where tag should be placed: http://www.suntrust.com -->
<!-- This tag must be placed within the opening <body> tag, as close to the beginning of it as possible-->
<!-- Creation Date:8/17/2009 -->


function fnFundingVerification_spotLight(){
	var axel = Math.random()+"";
	var a = axel * 10000000000000;
	if(document.getElementById('phasedControl_dvFunding')!=null){		
		document.getElementById('phasedControl_dvFunding').innerHTML ='<IFRAME SRC="https://fls.doubleclick.net/activityi;src=2409535;type=suntr866;cat=pfnew020;ord=1;num='+ a + '?" WIDTH=1 HEIGHT=1 FRAMEBORDER=0></IFRAME>';		
	}	
}

<!-- End of DoubleClick Spotlight Tag: Please do not remove-->


<!-- Start of DoubleClick Spotlight Tag: Please do not remove-->
<!-- Activity Name for this tag is:PF - new account center - step 4 - select account options -->
<!-- Web site URL where tag should be placed: http://www.suntrust.com -->
<!-- This tag must be placed within the opening <body> tag, as close to the beginning of it as possible-->
<!-- Creation Date:8/17/2009 -->


function fnOpenNewAccount_spotLight(){
	var axel = Math.random()+"";
	var a = axel * 10000000000000;
	if(document.getElementById('phasedControl_dvNewAccount')!=null){	
		document.getElementById('phasedControl_dvNewAccount').innerHTML ='<IFRAME 		SRC="https://fls.doubleclick.net/activityi;src=2409535;type=suntr866;cat=pfnew246;ord=1;num='+ a + '?" WIDTH=1 HEIGHT=1 		FRAMEBORDER=0></IFRAME>';		
	}	
}



<!-- This JS function is used to apply the style to the div which holds the NO SCRIT content-->

function fnEnable_Div_spotLight(st1){
    if(st1!=null){
     if(document.getElementById(st1)!=null){        	
         document.getElementById(st1).style.display="";
        }    
     }
  }

<!-- This JS function is used in getstarted page-->

function fnDeltaTagging(name,delenv){
   
    var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) 
		var tCookie= c.substring(nameEQ.length,c.length);
	}
   
	  if ( (typeof(tCookie) !== "undefined") && (tCookie !=null) && (tCookie != "")  ){

	  fnDeltaCallOmni(tCookie,delenv);
	  }
	
}


function fnDeltaCallOmni(tCookie,delenv){
    var Readcookie=tCookie;
    
    if(document.getElementById('phasedControl_dvDelta')!=null){
    document.getElementById('phasedControl_dvDelta').innerHTML ='<IFRAME SRC="https://smetrics.delta.com/b/ss/'+ delenv +'/1/H.20.3?gn=Partner%20Suntrust%3A%20Application%20Start&ch=Partners&server=www.suntrust.com&c45='+Readcookie+'" WIDTH=5 HEIGHT=5 FRAMEBORDER=0></IFRAME>';		
	}
}

<!-- This JS function is used in TDD initiation page-->

function fnDeltaConfirmTaggingTDD(name,selectproduct,delenv){

    var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) 
		var tCookie= c.substring(nameEQ.length,c.length);
	}

	  if ( (typeof(tCookie) !== "undefined") && (tCookie !=null) && (tCookie != "")  ){

	   fnDeltaConfirmCallOmniTDD(tCookie,selectproduct,delenv);
	  }
	
}


function fnDeltaConfirmCallOmniTDD(tCookie,selectproduct,delenv){
    var Readcookie=tCookie;
   
    if(document.getElementById('phasedControl_divconfirmTDD')!=null){
  
    document.getElementById('phasedControl_divconfirmTDD').innerHTML ='<IFRAME SRC="https://smetrics.delta.com/b/ss/'+delenv+'/1/H.20.3?gn=Partner%20Suntrust%3A%20Funding%20Initiated%20Page&ch=Partners&pl='+selectproduct+'&server=www.suntrust.com&c45='+Readcookie +'" WIDTH=5 HEIGHT=5 FRAMEBORDER=0></IFRAME>';		
	}
	    var head = document.getElementsByTagName('head')[0];
           
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = "https://s.xp1.ru4.com/meta?_o=5&_t=pt-2670-001&ssv_partnerid=" + Readcookie;
            head.appendChild(script);
}

<!-- This JS function is used in welcome page-->

function fnDeltaConfirmTagging(name,selectproduct,delenv){
  
    var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) 
		var tCookie= c.substring(nameEQ.length,c.length);
	}

	 if ( (typeof(tCookie) !== "undefined") && (tCookie !=null) && (tCookie != "")  ){

	  
	  fnDeltaConfirmCallOmni(tCookie,selectproduct,delenv);
	  }
	
}


function fnDeltaConfirmCallOmni(tCookie,selectproduct,delenv){
    var Readcookie=tCookie;
     if(document.getElementById('phasedControl_divconfirm')!=null){
    document.getElementById('phasedControl_divconfirm').innerHTML ='<IFRAME SRC="https://smetrics.delta.com/b/ss/'+delenv+'/1/H.20.3?gn=Partner%20Suntrust%3A%20Confirmation%20Page&ch=Partners&pl='+selectproduct+'&server=www.suntrust.com&c45='+Readcookie +'" WIDTH=5 HEIGHT=5 FRAMEBORDER=0></IFRAME>';		
	}
	    var head = document.getElementsByTagName('head')[0];
          
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = "https://s.xp1.ru4.com/meta?_o=5&_t=pt-2670-001&ssv_partnerid=" + Readcookie;
            head.appendChild(script);

}








