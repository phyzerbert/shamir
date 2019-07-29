// Date Last Modified - 01/05/2013


//Added for Winback window
var needToConfirm=true;
//Variables for Lending Review and Submit page
var ValidationErrors=new Array();
var clickLink=false;
var clickLink1=false;
var clickLink2=false;
var OfferValueAssignmentCount=0;
//vARIABLES added for the Autoloan page
var prevOfferVal=true;
var loanTermFlag=true;
var loanAmountFlag=true;
var environmentURL=null;

  function confirmExit(e)

            {
                
            if (needToConfirm)

            {

                fnCodeToPasteWBW_Click();

                var nAgt = navigator.userAgent;

                var browserName  = navigator.appName;

                var nameOffset,verOffset,ix;

                var evt=window.event||e;                

                // In Opera, the true version is after "Opera" or after"Version"

                if ((verOffset=nAgt.indexOf("Opera"))!=-1) {

                 return "Your application will not be saved and all the information entered will be lost.";

                }

                // In MSIE, the true version is after "MSIE" in userAgent

                else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {

                 evt.returnValue="Your application will not be saved and all the information entered will be lost.";

 

                }

                // In Chrome, the true version is after "Chrome" 

                else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {

                 return "Your application will not be saved and all the information entered will be lost.";

 

                }

                // In Safari, the true version is after "Safari" or after "Version" 

                else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {

                 
                 return "Your application will not be saved and all the information entered will be lost.";

                }

                // In Firefox, the true version is after "Firefox" 

                else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {

                return "Your application will not be saved and all the information entered will be lost.";

                } 
                else{
                 return "Your application will not be saved and all the information entered will be lost.";
               
                }                          

            }

           needToConfirm = true;            

      } 


 function checkShortcut(objEvent) 

         {                        

             try {

            var sKey;
        

            if(window.event) {

                sKey = window.event.keyCode;               

            }

            else if(objEvent) {

                sKey = objEvent.which;

            }   
            

            var objEvent = objEvent || window.event;    

            //Ctrl+r

            if(sKey == 82 && objEvent.ctrlKey) {      

                

                needToConfirm=false;

            }

            else if (sKey==116){

                needToConfirm = false;

            }

        }

        catch(ex) {

            alert(ex.toString());

        }

                                 

      }

// Start of NAC Header Navigation Steps

function fnShowNACHeaderStep(p1){ 
  switch(p1){
  
    case 'step-1':       
         document.getElementById("NAC_GettingStarted").className = "selStep";   
         document.getElementById("NAC_Identification").className = "";  
         document.getElementById("NAC_Verification").className = "";
	 document.getElementById("NAC_ESignature").className = "";  
         document.getElementById("NAC_Funding").className = ""; 
         document.getElementById("NAC_NextSteps").className = "";  
         break; 
    
    case 'step-2':      
         document.getElementById("NAC_GettingStarted").className = "done";   
         document.getElementById("NAC_Identification").className = "selStep";  
         document.getElementById("NAC_Verification").className = "";
	 document.getElementById("NAC_ESignature").className = "";  
         document.getElementById("NAC_Funding").className = ""; 
         document.getElementById("NAC_NextSteps").className = "";   
         break;
         
     case 'step-3':     
         document.getElementById("NAC_GettingStarted").className = "done";   
         document.getElementById("NAC_Identification").className = "done";  
         document.getElementById("NAC_Verification").className = "selStep";  
         document.getElementById("NAC_ESignature").className = "";
	 document.getElementById("NAC_Funding").className = ""; 
         document.getElementById("NAC_NextSteps").className = "";   
         break;
         
     case 'step-4':     
         document.getElementById("NAC_GettingStarted").className = "done";   
         document.getElementById("NAC_Identification").className = "done";  
         document.getElementById("NAC_Verification").className = "done";  
	 document.getElementById("NAC_ESignature").className = "done";          
	 document.getElementById("NAC_Funding").className = "selStep"; 
         document.getElementById("NAC_NextSteps").className = "";   
         break;
         
     case 'step-5':     
         document.getElementById("NAC_GettingStarted").className = "done";   
         document.getElementById("NAC_Identification").className = "done";  
         document.getElementById("NAC_Verification").className = "done";
	 document.getElementById("NAC_ESignature").className = "done";	   
         document.getElementById("NAC_Funding").className = "done"; 
         document.getElementById("NAC_NextSteps").className = "selStep";   
         break;
    
 case 'T&C':     
         document.getElementById("NAC_GettingStarted").className = "done";   
         document.getElementById("NAC_Identification").className = "done";  
         document.getElementById("NAC_Verification").className = "done";
	 document.getElementById("NAC_ESignature").className = "selStep"; 
         document.getElementById("NAC_Funding").className = ""; 
         document.getElementById("NAC_NextSteps").className = "";   	 
         break;

    default:  
        document.getElementById("NAC_GettingStarted").className = "";   
        document.getElementById("NAC_Identification").className = "";  
        document.getElementById("NAC_Verification").className = "";
	document.getElementById("NAC_ESignature").className = "";  
        document.getElementById("NAC_Funding").className = ""; 
        document.getElementById("NAC_NextSteps").className = "";   
        break;
  }
}

// End of NAC Header Navigation Steps



//header for CreditCards.

function fnShowCometHeaderStep(p1){ 

  switch(p1){
  
    case 'step-1':       
         document.getElementById("CC_GettingStarted").className = "sel";   
         document.getElementById("CC_Offers").className = "";  
         document.getElementById("CC_Apply").className = "";  
         document.getElementById("CC_Next").className = ""; 
             
         break; 
    
    case 'step-2':      
        document.getElementById("CC_GettingStarted").className = "done";   
         document.getElementById("CC_Offers").className = "sel";  
         document.getElementById("CC_Apply").className = "";  
         document.getElementById("CC_Next").className = ""; 
         break;
         
     case 'step-3':     
        document.getElementById("CC_GettingStarted").className = "done";   
         document.getElementById("CC_Offers").className = "done";  
         document.getElementById("CC_Apply").className = "sel";  
         document.getElementById("CC_Next").className = "";    
         break;
         
     case 'step-4':     
         document.getElementById("CC_GettingStarted").className = "done";   
         document.getElementById("CC_Offers").className = "done";  
         document.getElementById("CC_Apply").className = "done";  
         document.getElementById("CC_Next").className = "sel"; 
         break;
         
   

    default:  
       document.getElementById("CC_GettingStarted").className = "";   
         document.getElementById("CC_Offers").className = "";  
         document.getElementById("CC_Apply").className = "";  
         document.getElementById("CC_Next").className = "";  
        break;
  }
}



//header for ConsumerLending

function fnShowCLHeaderStep(p1){ 

  switch(p1){
  
    case 'step-1':       
         document.getElementById("CL_GettingStarted").className = "selStep";   
         document.getElementById("CL_PersonalInfo").className = "";  
         document.getElementById("CL_LoanInfo").className = "";  
         document.getElementById("CL_Apply").className = ""; 
	 document.getElementById("CL_Next").className = "";              
         break; 
    
    case 'step-2':      
        document.getElementById("CL_GettingStarted").className = "done";   
         document.getElementById("CL_PersonalInfo").className = "selStep";  
         document.getElementById("CL_LoanInfo").className = "";  
         document.getElementById("CL_Apply").className = ""; 
	 document.getElementById("CL_Next").className = ""; 
         break;
         
     case 'step-3':     
        document.getElementById("CL_GettingStarted").className = "done";   
         document.getElementById("CL_PersonalInfo").className = "done";  
         document.getElementById("CL_LoanInfo").className = "selStep";  
         document.getElementById("CL_Apply").className = ""; 
	 document.getElementById("CL_Next").className = "";   
         break;
         
     case 'step-4':     
         document.getElementById("CL_GettingStarted").className = "done";   
         document.getElementById("CL_PersonalInfo").className = "done";  
         document.getElementById("CL_LoanInfo").className = "done";  
         document.getElementById("CL_Apply").className = "selStep"; 
	 document.getElementById("CL_Next").className = "";  
         break;
         
    case 'step-5':     
         document.getElementById("CL_GettingStarted").className = "done";   
         document.getElementById("CL_PersonalInfo").className = "done";  
         document.getElementById("CL_LoanInfo").className = "done";  
         document.getElementById("CL_Apply").className = "done"; 
	 document.getElementById("CL_Next").className = "selStep";  
         break;

    default:  
         document.getElementById("CL_GettingStarted").className = "";   
         document.getElementById("CL_PersonalInfo").className = "";  
         document.getElementById("CL_LoanInfo").className = "";  
         document.getElementById("CL_Apply").className = ""; 
	 document.getElementById("CL_Next").className = "";   
        break;
  }
}









//Cookie related functions
// Start of Create Cookie function

function createCookie(name,value,days)
		{	
			if (days)
				{
					var date = new Date();
					date.setTime(date.getTime()+(days*24*60*60*1000));
					var expires = ""; expires=""+date.toGMTString();
				}
			else {
			var expires = "";
			}
			document.cookie = name+"="+value+expires+";domain=.suntrust.com";			
		}

// End of Create Cookie function

// Start of Erase cookie function


function eraseCookie(name)
			{					
				Set_Cookie(name,'','-1' ,'/','.suntrust.com','false'); 
			}	

// End of Erase cookie function

// Start of Setcookie function

function Set_Cookie( name, value, expires, path, domain, secure ) 
			{
				// set time, it's in milliseconds
				var today = new Date();
				today.setTime( today.getTime() );

				if ( expires )
				{
					expires = expires * 1000 * 60 * 60 * 24;
				}
				var expires_date = new Date( today.getTime() + (expires) );

				document.cookie = name + "=" + value  +
				( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + 
				( ( path ) ? ";path=" + path : "" ) + 
				( ( domain ) ? ";domain=" + domain : "" ) +
				( ( secure ) ? ";secure" : "" );
			}

// End of Setcookie function

// Start of readCookie function

//Function for reading a cokie provided the cookie name is specified(name)

function readCookie(name) 
		{
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) {
						return c.substring(nameEQ.length,c.length);}
			}
			return null;
		}

// End of readCookie function 

// Start of readSSOCookie function

//Function for reading the cookie containing the ObSSOCookie
function readSSOCookie()
		{
			var ObSSOCookie = readCookie('ObSSOCookie');
			if(ObSSOCookie!=null){
				document.getElementById("phasedControl_hdnCookie").value=ObSSOCookie;
			}
		}

// End of readSSOCookie function

// Start of readpyIDCoApp cookie

//Function for reading a cookie provided the cookie name is specified(name) -  pyID 		
function readpyIDCoApp()
		{					
			var pyID=readCookie('pyID');
			if(pyID!=null){
				document.getElementById("phasedControl_hdnpyID").value=pyID;			
			}
			
		}

// End of readpyIDCoApp cookie


// start of readCoApp cookie

//Function for reading the cookie containing the CoApplicant mode
function readCoApp()
	{
		var CoApp = readCookie('SacApplicationMode');
			if(CoApp!=null){
				document.getElementById("phasedControl_hdnCoApp").value=CoApp;
			}
	}

// End of readCoApp cookie
//End of Cookie related functions

// Start of fnValidateBWBrdbs function.

function fnValidateBWBrdbs()
	{			
		    if((!(document.getElementById('phasedControl_rdbCoappYes').checked == true) &&! (document.getElementById('phasedControl_rdbCoappNo').checked == true))||
		    (!(document.getElementById('phasedControl_rdbAuthuserYes').checked == true) &&! (document.getElementById('phasedControl_rdbAuthuserNo').checked == true))||
		    (!(document.getElementById('phasedControl_rdbUSCitizenYes').checked== true) && ! (document.getElementById('phasedControl_rdbUSCitizenNo').checked == true))){ 
		        if(document.getElementById('dvError')!=null){
		          document.getElementById('dvError').style.display="";	
		         
		        //snippet to highlight the rows
		        if((document.getElementById('phasedControl_rdbAuthuserYes').checked == false)&&(document.getElementById('phasedControl_rdbAuthuserNo').checked == false)){
		              document.getElementById('tdAuth').className = "errorRow";
		        }
		        else {
		        document.getElementById('tdAuth').className = ""; }
		        
		        if((document.getElementById('phasedControl_rdbUSCitizenYes').checked== false)&&(document.getElementById('phasedControl_rdbUSCitizenNo').checked == false)){
		             document.getElementById('tdUSCitizen').className = "errorRow";		              
		        }
		        else{
		        document.getElementById('tdUSCitizen').className = "";}
		        
		        if((document.getElementById('phasedControl_rdbCoappYes').checked == false)&&(document.getElementById('phasedControl_rdbCoappNo').checked == false)){
		            document.getElementById('tdcoapp').className = "errorRow";
		        }
		        else{
		        document.getElementById('tdcoapp').className = "";}
		       	       
		       return "false";
		       }
		       }
		       return "true";
		       
		}

// End of fnValidateBWBrdbs function.


// Start of fnValidateAuthBWBrdbs functions

function fnValidateAuthBWBrdbs(){
		if(
		    (!(document.getElementById('phasedControl_rdbCoappYes').checked == true) &&! (document.getElementById('phasedControl_rdbCoappNo').checked == true))||
		    (!(document.getElementById('phasedControl_rdbUSCitizenYes').checked== true) && ! (document.getElementById('phasedControl_rdbUSCitizenNo').checked == true))){ 
		        if(document.getElementById('dvError')!=null){
		          document.getElementById('dvError').style.display="";
		         
		         if((document.getElementById('phasedControl_rdbCoappYes').checked == false)&&(document.getElementById('phasedControl_rdbCoappNo').checked == false)){
		            document.getElementById('tdcoapp').className = "errorRow";
		        }
		        else{
		        document.getElementById('tdcoapp').className = "";}
		          
		        if((document.getElementById('phasedControl_rdbUSCitizenYes').checked== false)&&(document.getElementById('phasedControl_rdbUSCitizenNo').checked == false)){
		            document.getElementById('tdUSCitizen').className = "errorRow";
		        }
		        else{
		         document.getElementById('tdUSCitizen').className = ""; }
		         
		        		        		       
		       return "false";
		       }
		       }
		       return "true";	
	     }

// End of fnValidateAuthBWBrdbs functions


// start of fnApplyStyle functions

function fnApplyStyle(p1)
	{
		if(p1!=null)
		{
			if(document.getElementById(p1)!=null)
						{
						    document.getElementById(p1).className="errorRow";
						}
 		}
	}

// End of fnApplyStyle functions

// Start of TextTab function

//Function to focus to the next tex box
			function TextTab(ctrl,ctrlIdToFocus){
				var ctrlToFocus = document.getElementById(ctrlIdToFocus);

				if ( ctrl.value.length == ctrl.maxLength ){ 
					ctrlToFocus.focus(); 
				}
			}

// End of TextTab function

// start of Popup Function

function popup(URL){
		window.open(URL,null,'width=800,height=600,resizable=yes,scrollbars=yes','false')
		}

// End of Popup Function


// Start of ClosePopup function

function ClosePopup(val,link){		
		if(val!=null){
			 createCookie('EnrollDetails',val);
			 }
			 
			 opener.location.href = link;
			 window.close();
		}

// End of ClosePopup function

//Start of refreshParent function

function refreshParent() {
		try{
			window.opener.location.href = window.opener.location.href;}
			catch(e){}
		}

// End of refreshParent function

// Start of Open it function

function openIt(a,b) {
            document.getElementById(a).style.display = 'none';
            document.getElementById(b).style.display = 'block';
        }

// End of Open it function

// start of Close it function
        function closeIt(a,b) {
            document.getElementById(a).style.display = 'inline';
            document.getElementById(b).style.display = 'none';
        }

//End of Close it function

function showAddress(a,b,c,d) {
var Check = d;
if(d == 'CoApp'){
 document.getElementById('phasedControl_chkCoappSamePreviousAddress').checked = false;
}
if(a!=null && b!=null){
if(document.getElementById(a).checked==true)
{
document.getElementById(b).style.display = "";

var text = document.getElementById(c);

if(text != null){
text.focus();
} 
}
}
}

function hideAddress(a,b,c) {
var text = document.getElementById(c);

if(text != null){
text.focus();
}
if(a!=null && b!=null) {
if(document.getElementById(a).checked==true)
{
document.getElementById(b).style.display = "none";
}
}
}

function fnShowIDIssuer(a,b,c){
var text = document.getElementById(c);

if(text != null){
text.focus();
}
if(a!=null &&  b!=null){
if((document.getElementById(a).value == "DL") || (document.getElementById(a). value == "STATE")) {
document.getElementById(b).style.display = "";
}
else {
document.getElementById(b).style.display = "none";
}
}
}


function ReadorCreateSAWRefreshCookie(name) {   
			var refCookie = readCookieSAW(name);
				if(refCookie == 'Passed'){
				    if(document.getElementById('dvRefreshError') !=null){
				            document.getElementById('dvRefreshError').style.display="";				           
				    }
			    }
			    else{
			        createCookie('SAWRefreshCookie','Passed',null);
			    }					
		    }
		    

function readCoAppCookie(name) {              
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) {
				if(name == 'CoAppStatus'){
					document.getElementById('phasedControl_hdnCoApp').value =c.substring(nameEQ.length,c.length);
					}
				else if (name == 'pyID'){
					document.getElementById('phasedControl_hdnpyID').value =c.substring(nameEQ.length,c.length);
					}
					else if(name == 'primaryProduct'){
					    document.getElementById('phasedControl_hdnPrimaryProduct').value =c.substring(nameEQ.length,c.length);
					}
					else if(name == 'IPAddress'){
					    document.getElementById('phasedControl_hdnIPAddress').value =c.substring(nameEQ.length,c.length);
					}else if(name =='ObSSOCookie'){
					        document.getElementById('phasedControl_hdnObSSO').value =c.substring(nameEQ.length,c.length);
					}
					else if(name =='RefreshCookie'){
					        document.getElementById('phasedControl_hdnRefreshCookie').value =c.substring(nameEQ.length,c.length);
					}
					
					
					
					}
			}			
		}
function fnToEnableSAWButton(a,b){
          var length=5;
          var regex='[0-9]*';
         document.getElementById(a).maxLength=length;
         var textvalue;
         if((document.getElementById(a)!=null)){
         if(document.getElementById(a).value.length!=0)
         { 
            textvalue=document.getElementById(a).value;
            if((textvalue!=null)||(textvalue.length!=0)){
                if(textvalue.length==length){   
                    var expression = regex;
                    var reg=new RegExp(expression);
                    if(reg.test(textvalue))
                    {
                        document.getElementById("phasedControl_btnCode").disabled = false;
                    }
                    else
                    {
                        document.getElementById("phasedControl_btnCode").disabled = true;
                    }
                }
                else{
                    document.getElementById("phasedControl_btnCode").disabled = true;
                    }
             }
          }
         
          
        }
     }
     

	function keypress(e){
	var keyCode;
	if(/Firefox/.test(navigator.userAgent)){ 
	  if(e.keyCode==46)
	return true;  
	}
	if(([e.keyCode||e.which]==8))
	return true;
	if(([e.keyCode||e.which]<48)||([e.keyCode||e.which]>57))
	{
	e.preventDefault?e.preventDefault():e.returnValue=false;
	}
	
	}






 function readCookieSAW(name) {   
             
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) {
				if(name == 'SAWRefreshCookie'){
					document.getElementById('phasedControl_hdnRefreshCookie').value =c.substring(nameEQ.length,c.length);
					}
			    }
			}			
		}


//Function to enable radio button

function fnRadioButtonsCheckdisable(){


 var textvalue=document.getElementById('phasedControl_txtSkymilesNumber').value;

 if(textvalue.length==0)
 {
 document.getElementById('phasedControl_btnNext').disabled=true;
 }
 else{
  document.getElementById('phasedControl_txtSkymilesNumber').value="";
  document.getElementById('phasedControl_btnNext').disabled=true;;
 }
  
}
function fnRadioButtonsCheckenable(){
document.getElementById('phasedControl_btnNext').disabled=false;
}

//function to check skymiles number length
function lenghtevent(e){
  
 if(document.getElementById('phasedControl_txtSkymilesNumber').value.length<1){
 if((e.keyCode==8)||(e.keyCode==46)){
	
	
 document.getElementById('phasedControl_btnNext').disabled=true;
	}
	}
	else{
	document.getElementById('phasedControl_btnNext').disabled=false;
	}
}

	
//function to enable a div
	
function fnToEnablediv(chkProdname){

var txt=document.getElementById(chkProdname);
var txte=document.getElementById('phasedControl_txtSkymilesNumber').value;
var checkboxes=0;
var numcheckbox=0;
 var inputs = document.getElementsByTagName("input");

    for (var i=0; i<inputs.length; i++)
    {
        if (inputs[i].type == "checkbox")
        {  
            if (inputs[i].checked ==false){
                checkboxes=checkboxes+1;
                
             }   
        }
      
        
    }
   
    for (var i=0; i<inputs.length; i++)
    {
        if (inputs[i].type == "checkbox")
        { 
        numcheckbox=numcheckbox+1;
              
        }
        }
 
  
  if(checkboxes==numcheckbox){
           document.getElementById("phasedControl_pnlradio").className="disabledText";
           document.getElementById("phasedControl_pnlradio").style.visibility='';
           document.getElementById('phasedControl_btnNext').disabled=false;
           
           document.getElementById('phasedControl_pnlradio').disabled=true;  
                             
           document.getElementById('phasedControl_txtSkymilesNumber').value=txte;
           document.getElementById('phasedControl_txtSkymilesNumber').disabled=true;
           document.getElementById('phasedControl_rdbDeltaClssic').disabled=true;
           document.getElementById('phasedControl_rdbDeltaWorld').disabled=true;
           document.getElementById('phasedControl_rdbCheckCard').disabled=true;
          
  
  }
  else{
           document.getElementById("phasedControl_pnlradio").style.visibility='';
           document.getElementById("phasedControl_pnlradio").disabled=false;
           document.getElementById('phasedControl_txtSkymilesNumber').disabled=false;
           document.getElementById("phasedControl_pnlradio").className="nope";
            document.getElementById('phasedControl_rdbDeltaClssic').disabled=false;
           document.getElementById('phasedControl_rdbDeltaWorld').disabled=false;
           document.getElementById('phasedControl_rdbCheckCard').disabled=false;
           if((document.getElementById('phasedControl_rdbDeltaClssic').checked)||(document.getElementById('phasedControl_rdbDeltaWorld').checked))
           {
                document.getElementById('phasedControl_btnNext').disabled=true;
                if(document.getElementById('phasedControl_txtSkymilesNumber').value>=1){
                    document.getElementById('phasedControl_btnNext').disabled=false;
                }
           }
  
  }
}

//function to apply styles to div.
function fnApplyStyleforerror()
 { 
   
   document.getElementById('phasedControl_idSkymiles').className="errorRow";
  // if(document.getElementById('phasedControl_rdbCheckCard').checked==false){
  
  // document.getElementById('phasedControl_tdrdbcheckcard').className="errorRow";
  // }
  
   document.getElementById('tddeltanumber').className="errorRow";
 if((document.getElementById('phasedControl_rdbDeltaClssic').checked==true)||(document.getElementById('phasedControl_rdbDeltaWorld').checked==true))
{ 

   document.getElementById('skyMilesNumber').style.display='';
}
   
}

//function to load a pop up

function LoadPage(link)
{
	
      
	if (window.opener && window.opener.open && !window.opener.closed) {
	
	   
		opener.location.href = link;
	  
	}
	else {
	
	   	window.open(link,'newwin');		
         self.focus();
        }            
       return false;        
}

function fnenableradiobutton(){

if(document.getElementById('phasedControl_rdbCheckCard')!=null){
if((document.getElementById('phasedControl_rdbDeltaClssic').checked==true)||(document.getElementById('phasedControl_rdbDeltaWorld').checked==true)){
document.getElementById('phasedControl_rdbCheckCard').checked=true;

}
else{

document.getElementById('phasedControl_rdbCheckCard').checked=true;
}
}

}


function deltaSelectionchanged(ddlValue,DonotWantaCard){ 
        var card=DonotWantaCard;    
       var index=0;
       var SelectedText = document.getElementById(ddlValue).options[document.getElementById(ddlValue).selectedIndex].value;
       var Initialitem= document.getElementsByTagName("select");
        for(var Value=0;Value<Initialitem.length;Value++)
            {
              if(((Initialitem[Value].options[Initialitem[Value].selectedIndex].text)==card)||((Initialitem[Value].options[Initialitem[Value].selectedIndex].text.match("ending"))=="ending"))
              {
                  index++;     
              }
       
            }
            if(index==Initialitem.length)
            {    
                document.getElementById('phasedControl_pnlradio').disabled=true;
                document.getElementById('phasedControl_txtSkymilesNumber').disabled=true;
                document.getElementById('phasedControl_btnNext').disabled=false;
                document.getElementById('phasedControl_rdbDeltaClssic').disabled=true;
                document.getElementById('phasedControl_rdbDeltaWorld').disabled=true;
                document.getElementById('phasedControl_rdbCheckCard').disabled=true;
            }
            
            else
            {    document.getElementById("phasedControl_pnlradio").style.visibility='';
                document.getElementById('phasedControl_pnlradio').disabled=false;
                document.getElementById('phasedControl_txtSkymilesNumber').disabled=false;
                document.getElementById('phasedControl_rdbDeltaClssic').disabled=false;
                document.getElementById('phasedControl_rdbDeltaWorld').disabled=false;
                document.getElementById('phasedControl_rdbCheckCard').disabled=false;
                if((document.getElementById('phasedControl_rdbDeltaClssic').checked)||(document.getElementById('phasedControl_rdbDeltaWorld').checked))
                {
                   document.getElementById('phasedControl_btnNext').disabled=true;
                   if(document.getElementById('phasedControl_txtSkymilesNumber').value>=1){
                    document.getElementById('phasedControl_btnNext').disabled=false;
                }
                }
            }
       
   }


//The below Javascripts will be called from the Credit Card start Page

      function   fnLoadViewOffersPage  (authLink){            
             createCookie('ReservationCode',$('#phasedControl_txtReservationcode').val(),null);
             window.location.replace(authLink);           
             }                          
             
                
     function fnpnlVisible(value){

    if(value=='1'){
    if($('#phasedControl_OLBsignon').size() && $('#phasedControl_Accounttype').size() && $('#phasedControl_DebitType').size()){
    document.getElementById('phasedControl_OLBsignon').visible=true;
    document.getElementById('phasedControl_OLBsignon').disabled=false;
    document.getElementById('phasedControl_OLBsignon').style.display="";
    document.getElementById('divOLBSignOn').style.display="";
    document.getElementById('phasedControl_Accounttype').visible=false;
    document.getElementById('phasedControl_DebitType').visible=false;
    document.getElementById('lnkOLB').className="sel";
    document.getElementById('lnkAcct').className="done";
    document.getElementById('lnkDebit').className="done";
    document.getElementById('phasedControl_Accounttype').style.display="none";
    document.getElementById('phasedControl_DebitType').style.display="none";
    document.getElementById('divDebitAcct').style.display="none"; 
    document.getElementById('divAcctType').style.display="none";
    document.getElementById('phasedControl_ddlAcctType').value="";
    document.getElementById('phasedControl_txtAccountNum').value="";
    document.getElementById('phasedControl_txtSSN').value="";
    document.getElementById('phasedControl_txtDebitNum').value="";
    document.getElementById('phasedControl_txtPinNum').value="";
    document.getElementById('phasedControl_btnContinue').disabled=false;
    document.getElementById('phasedControl_btnDebittype').disabled=true;
    document.getElementById('phasedControl_btnAcctType').disabled=true;
    document.getElementById('hdnTab').value='1';
    
    }

    }
    if(value=='2'){  
    if($('#phasedControl_OLBsignon').size() && $('#phasedControl_Accounttype').size() && $('#phasedControl_DebitType').size()){ 
    document.getElementById('phasedControl_OLBsignon').visible=false;
    document.getElementById('phasedControl_OLBsignon').disabled=true;
    document.getElementById('phasedControl_OLBsignon').style.display="none";
    document.getElementById('divOLBSignOn').style.display="none";
    document.getElementById('phasedControl_DebitType').visible=true;
    document.getElementById('phasedControl_DebitType').style.display="";
    document.getElementById('divDebitAcct').style.display="";
    document.getElementById('divAcctType').style.display="none";
    document.getElementById('phasedControl_Accounttype').visible=false;
    document.getElementById('phasedControl_Accounttype').style.display="none";
    document.getElementById('lnkOLB').className="done";
    document.getElementById('lnkDebit').className="sel";
    document.getElementById('lnkAcct').className="done";
    document.getElementById('uid').value="";
    document.getElementById('password').value="";
    document.getElementById('phasedControl_ddlAcctType').value="";
    document.getElementById('phasedControl_txtAccountNum').value="";
    document.getElementById('phasedControl_txtSSN').value="";
    document.getElementById('phasedControl_btnContinue').disabled=true;
    document.getElementById('phasedControl_btnDebittype').disabled=false;
    document.getElementById('phasedControl_btnAcctType').disabled=true;
   document.getElementById('hdnTab').value='2';

}
    }
    if(value=='3'){
    if($('#phasedControl_OLBsignon').size() && $('#phasedControl_Accounttype').size() && $('#phasedControl_DebitType').size()){
    document.getElementById('phasedControl_OLBsignon').visible=false;
    document.getElementById('phasedControl_OLBsignon').disabled=true;
    document.getElementById('phasedControl_OLBsignon').style.display="none";
    document.getElementById('divOLBSignOn').style.display="none";
    document.getElementById('phasedControl_DebitType').visible=false;
    document.getElementById('phasedControl_DebitType').style.display="none";
    document.getElementById('phasedControl_Accounttype').visible=true;
    document.getElementById('phasedControl_Accounttype').style.display="";
    document.getElementById('divDebitAcct').style.display="none";
    document.getElementById('divAcctType').style.display="";
    document.getElementById('lnkOLB').className="done";
    document.getElementById('lnkDebit').className="done";
    document.getElementById('lnkAcct').className="sel";
    document.getElementById('uid').value="";
    document.getElementById('password').value="";
    document.getElementById('phasedControl_txtDebitNum').value="";
    document.getElementById('phasedControl_txtPinNum').value="";  
    document.getElementById('phasedControl_btnContinue').disabled=true;
    document.getElementById('phasedControl_btnDebittype').disabled=true;
    document.getElementById('phasedControl_btnAcctType').disabled=false;   
    document.getElementById('hdnTab').value='3';
    }
    }
     
     }
 
 
  function fnVisible(Value){ 
  if(Value=='1'){  
   document.getElementById('phasedControl_hdnSAC').value="dbt";  
  }
  
  else{  
   document.getElementById('phasedControl_hdnSAC').value="act";
  }
  
  }

function headerDisplayNAC(){
	document.getElementById("NACHeader").style.display="";
	document.getElementById("NACNavTab").style.display="";
	document.getElementById("CreditCardHeader").style.display="none";
	document.getElementById("CreditCradNavTab").style.display="none";
	document.getElementById("ConsumerLendingHeader").style.display="none";
	document.getElementById("ConsumerLendingNavTab").style.display="none";
}

function headerDisplayCredit(){
	document.getElementById("CreditCardHeader").style.display="";
	document.getElementById("CreditCradNavTab").style.display="";
	document.getElementById("NACNavTab").style.display="none";
	document.getElementById("NACHeader").style.display="none";
	document.getElementById("ConsumerLendingHeader").style.display="none";
	document.getElementById("ConsumerLendingNavTab").style.display="none";
}
       
function headerDisplayCL(){
	document.getElementById("CreditCardHeader").style.display="none";
	document.getElementById("CreditCradNavTab").style.display="none";
	document.getElementById("NACNavTab").style.display="none";
	document.getElementById("NACHeader").style.display="none";
	document.getElementById("ConsumerLendingHeader").style.display="";
	document.getElementById("ConsumerLendingNavTab").style.display="";
}

function fnpnlMainContainer(){
document.getElementById('phasedControl_mainContainer').style.display="none";
} 

    function FireDefaultButton(event, target) {
  var __nonDOMBrowser = (window.navigator.appName.toLowerCase().indexOf('explorer') == -1);
        if (event.keyCode == 13 && !(event.srcElement && (event.srcElement.tagName.toLowerCase() == "textarea"))) {
        var defaultButton;
        if (__nonDOMBrowser) {
            defaultButton = document.getElementById(target);
        }
        else {
            defaultButton = document.all[target];
        }
        if (defaultButton && typeof(defaultButton.click) != "undefined") {
            defaultButton.click();
            event.cancelBubble = true;
            if (event.stopPropagation) event.stopPropagation();
            return false;
        }
    }
    return true;
}

  function loadDiv(divToLoad)
   {
    var DivTobeLoaded=divToLoad;
    
        switch(DivTobeLoaded)
        {
            case "noDiv":
            {
                $("div#pageSaveLinks").hide();
                $("div#pageSaveText").hide();
                 $("div#pageRetrieveText").hide();
                 $("div#pageBothText").hide();  
            }
            break;
            
            case "bothLinks":
            {
                $("div#pageSaveLinks").show();
                $("div#pageSaveText").hide();
                 $("div#pageRetrieveText").hide();
                 $("div#pageBothText").hide();  
            
            }
            break;
            
            case "OnlyRetrieve":
            {
                $("div#pageSaveLinks").hide();
                $("div#pageSaveText").show();                
                 $("div#pageRetrieveText").hide();
                 $("div#pageBothText").hide();  
            }
            break;    
            
           case "NoHeader":   
            {
                $("div#pageSaveLinks").hide();
                $("div#pageSaveText").hide();
                 $("div#pageRetrieveText").hide();
                 $("div#pageBothText").hide();  
                $("div#ConsumerLendingNavTab").hide();
            }
            break;
            
             case "ShowHeaderAndBothLinks":   
            {
                $("div#pageSaveLinks").show();
                $("div#pageSaveText").hide();
                 $("div#pageRetrieveText").hide();
                 $("div#pageBothText").hide();  
                $("div#ConsumerLendingNavTab").show();
            }
            break;
              case "ShowHeaderAndRetrieveText":   
            {
                $("div#pageSaveLinks").hide();
                $("div#pageSaveText").hide();
                $("div#pageBothText").hide();  
                 $("div#pageRetrieveText").show();
                $("div#ConsumerLendingNavTab").show();
            }
            break;
              case "BothText":
            {
                $("div#pageSaveLinks").hide();
                $("div#pageSaveText").hide();
                 $("div#pageRetrieveText").hide();
                 $("div#pageBothText").show();                 
            }
            break;
        }    
   }
   
    function showVanillaHeader(appl){
 switch(appl)
        {
            case "Deposit":
            {
                $("div#NACBanner").hide();  
                $("div#NACNavTab").hide();                               
            }
            break;
             case "Lending":   
            {
                $("div#pageSaveLinks").hide();
                $("div#pageSaveText").hide();
                 $("div#pageRetrieveText").hide();
                  $("div#pageRetrieveText").hide();
                 $("div#pageBothText").hide(); 
                $("div#ConsumerLendingNavTab").hide();
                $("div#pageBanner").removeClass("loan");;                
            }
            break;
        }
 }
 
 
 function closing() 
	{
	window.top.opener=null;
        window.close();
	}


function PopupCenter(pageURL, title,w,h) {
var left = (screen.width/2)-(w/2);
var top = (screen.height/2)-(h/2);
     var acrobatInstalled=adobeDetector();
//windows OS
    if(navigator.userAgent.toLowerCase().indexOf("windows")!=-1)
    {
         if((acrobatInstalled == null || !acrobatInstalled.installed) && !(navigator.userAgent.toLowerCase().indexOf("chrome")!=-1 || navigator.userAgent.toLowerCase().indexOf("firefox")!=-1 ) && (navigator.appVersion.toLowerCase().indexOf("version/5.1.7 safari")==-1) )
         {
            pageURL=GetQString('fileURL',pageURL);
            downloadURL(pageURL);
         }
         else
         {
            var targetWin = window.open (pageURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
            targetWin.focus(); 	   
         }  
    }
    //MAC OS
    else if(navigator.userAgent.toLowerCase().indexOf("windows")==-1)
    {
         if((acrobatInstalled == null || !acrobatInstalled.installed) && (navigator.userAgent.toLowerCase().indexOf("chrome")!=-1 || navigator.userAgent.toLowerCase().indexOf("firefox")!=-1 ))
         {
	    pageURL=GetQString('fileURL',pageURL);
            downloadURL(pageURL);
         }
         else
         {
            var targetWin = window.open (pageURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
            targetWin.focus(); 
         }  
    }


}

   
function querySt(Key,pageURL) {
    var url = pageURL;
    KeysValues = url.split(/[\?&]+/); 
    for (i = 0; i < KeysValues.length; i++) {
            KeyValue= KeysValues[i].split("=");
            if (KeyValue[0] == Key) {
                return KeyValue[1];
        }
    }
}

function GetQString(Key,pageURL) {    
    if (querySt(Key,pageURL)) {
         var value = querySt(Key,pageURL);
         return value;
    }
 }

function downloadURL(url) {

  
    var iframe;
    var hiddenIFrameID = 'hiddenDownloader';
    iframe = document.getElementById(hiddenIFrameID);
    if (iframe === null) {
        iframe = document.createElement('iframe');  
        iframe.id = hiddenIFrameID;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }
    iframe.src = url;   
 if((navigator.userAgent.toLowerCase().indexOf("windows")!=-1) && (navigator.appVersion.toLowerCase().indexOf("version/5.0 safari")!=-1))
    {
	needToConfirm=true;
    }
  
    
}

function wbwFixSafari(){
 if((navigator.userAgent.toLowerCase().indexOf("windows")!=-1) && (navigator.appVersion.toLowerCase().indexOf("version/5.0 safari")!=-1))
    {
	needToConfirm=false;
    }
}
function adobeDetector() {

 
            // for Windows only

            if (navigator.userAgent.toLowerCase().indexOf("win") != -1) {

 
                var acrobat=new Object();

                acrobat.installed=false;        

 
                // IE

                if(navigator.userAgent.toLowerCase().indexOf("msie") > -1){

                    try {

                        // version 6 or earlier

                        oAcro=new ActiveXObject('PDF.PdfCtrl');

                        if (oAcro) {                    

                            acrobat.installed=true;                                            

                        }
                        //alert(acrobat.installed);

                    }

                    catch(e) {}

 
                    try {

                        // version 7 or higher

                        oAcro7 = new ActiveXObject('AcroPDF.PDF');

                        if (oAcro7) {

                            acrobat.installed=true;                                            
                            

                        }
                        //alert(acrobat.installed);

                    }

                    catch(e) {}

                }        

                // check for Firefox, Chrome and others - code removed to simplify
                //alert(acrobat.installed);
                return acrobat;

            }

            // other OS (not supported)

            return null;

        }

function getDynamicURl(LinkUrl)
{
var formsArray = document.getElementsByTagName("form");
        var formAction='';
        
        for (i=0; i<formsArray.length; i++)
        { 
            formAction = formsArray[i].getAttribute('action');
        }
        var formActionSplit = formAction.split('NAC');
        var formattedurl = formActionSplit[0];      
	formattedurl=formattedurl+'NAC/Shared/ShowPopupPDF.htm'+"?fileURL="+LinkUrl;
        return formattedurl;
}

function getDynamicURlforDeposit(LinkUrl)
{
var formsArray = document.getElementsByTagName("form");
        var formAction='';
        
        for (i=0; i<formsArray.length; i++)
        { 
            formAction = formsArray[i].getAttribute('action');
        }
        var formActionSplit = formAction.split('NAC');
        var formattedurl = formActionSplit[0]; 
        var FinalURL=formattedurl.split('Nac');	
	formattedurl=FinalURL[0]+'NAC/Shared/ShowPopupPDF.htm'+"?fileURL="+LinkUrl;
        return formattedurl;
}

function getFormId() {
 var formsArray = document.getElementsByTagName("form");
  var formID='';        
        for (i=0; i<formsArray.length; i++)
        { 
            formID = formsArray[i].getAttribute('id');
        }
  formID='#'+formID;
  return formID;
 }
 
 function addRow(table,btnAddRow,btnDelRow,visibleRowsCount,maxRows)
    { 
    
        if (table == null) return;
        var divs = table.getElementsByTagName('div');
       
        var blockRows=1;
        var index=0;
       
        for ( index = 0; index < divs.length; index++) {
       
           var div = divs[index];
            
           if(div.id!="" && document.getElementById(div.id)!=null && document.getElementById(div.id).style.display=="block")
           {
                blockRows+=1;
           } 
            
        }
       
        for ( index = 0; index < blockRows+1; index++) {
           var div = divs[index];
            
           if(div.id!="" && document.getElementById(div.id)!=null && document.getElementById(div.id).style.display=="none")
           {
                document.getElementById(div.id).style.display = "block";
                
           } 
            
        }
       
       
          document.getElementById(btnAddRow).disabled= !(index<maxRows);
          document.getElementById(btnDelRow).disabled=!(index>1);
           $(visibleRowsCount).val(blockRows+1);
         
   
    }  

    function delRow(table,btnAddRow,btnDelRow,panel,visibleRowsCount,maxRows)
    { 
    
        if (table == null) return;
        var divs = table.getElementsByTagName('div');
        var blockRows=1;
        for (var i = 0; i < divs.length; i++) {
        var div = divs[i];
            
           if(div.id!="" && document.getElementById(div.id)!=null && document.getElementById(div.id).style.display=="block")
           {
                blockRows+=1;
                
           } 
            
        }
        
      
        var div = divs[blockRows-1];
           
           if(div.id!="" && document.getElementById(div.id)!=null && document.getElementById(div.id).style.display=="block")
           {
           
                document.getElementById(div.id).style.display = "none";
                blockRows-=1;
                refreshRow(div,panel);
           } 
      
      document.getElementById(btnDelRow).disabled=((blockRows)<2);
      document.getElementById(btnAddRow).disabled=!((blockRows-1)<maxRows);
     
       $(visibleRowsCount).val(blockRows);     
    }
    function refreshRow(div,panel)
    {
        if(div!=null)
        {
            var tables = div.getElementsByTagName('table');
            
            for(var tableIndex=0;tableIndex<tables.length;tableIndex++)
            {
                
                if(tables[tableIndex].id=panel)
                {
                    var table=tables[tableIndex].tBodies[0];
                    var inputs=table.rows[0].getElementsByTagName('input'), inp, index=0;
                
                  for(index=0;index<inputs.length;index++)
                  {
                    inputs[index].value="";
                  }
                  var textarea=table.rows[0].getElementsByTagName('textarea');
                  for(index=0;index<textarea.length;index++)
                  {
                    textarea[index].value="";
                  }
                    var selects=table.rows[0].getElementsByTagName('select'), sel, j=0;
                  for(index=0;index<selects.length;index++)
                  {
                    selects[index].selectedIndex=0;
                  }
                break;
              }
           }
      }
    }
    
    function clearErrorMessages(controlId)
    {
    var controlID="#phasedControl_"+controlId;
    $(controlID).text("");
    }
    
    
    function removeJqueryValidationMessages(controlsId)
    {
        var controlIDArray=new Array();
        controlIDArray=controlsId.split("|");
        for(var iCount=0;iCount<controlIDArray.length;iCount++)
        {
            var element =document.getElementById(controlIDArray[iCount]);
            $(element).removeClass("error");                    
            $(element).next().hide();
        }
    }

function DartTag(ProductType)
   {
	var url=null;
   if(ProductType=="AutoLoan")
	{
	 var axel = Math.random() + ""; 
	var a = axel * 10000000000000; 
	url="https://2409535.fls.doubleclick.net/activityi;src=2409535;type=suntr866;cat=nacco197;ord=1;num=" +a+ "?";
	handleRefresh(url);
		
	}
  else if(ProductType=="HomeEquity")
	{
	var axel = Math.random() + ""; 

	var a = axel * 10000000000000; 

	url="https://2409535.fls.doubleclick.net/activityi;src=2409535;type=suntr866;cat=nacco597;ord=1;num=" +a+ "?";
	handleRefresh(url); 
	}
else if(ProductType=="PersonalLine")
	{
	var axel = Math.random() + ""; 

	var a = axel * 10000000000000; 

	url="https://2409535.fls.doubleclick.net/activityi;src=2409535;type=suntr866;cat=nacco380;ord=1;num=" +a+ "?";
	handleRefresh(url);
        }
}


function handleRefresh(beaconurl){
			var beaconFrame = document.createElement("IFRAME");
			beaconFrame.src = beaconurl;
			beaconFrame.border = "0";
			beaconFrame.height = "0px";
			beaconFrame.width = "0px";
			document.body.appendChild(beaconFrame);
			return false;
    }
	