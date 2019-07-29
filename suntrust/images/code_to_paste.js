/*Please check if the function has the  following variables 
  prop6:   Internal SunTrust Traffic
  pageName: Pagename
  hier1:hierarchy for the page.
  prop19:  High-Level Application Pathing 
  s.events:Application started,application completed,funding initiated.
  prop18:Error specific
  eVar9: Account Funding Type
  eVar12:
  eVar22:
  evar27:Application type.
  s.products:Products set in the NAC application by the user.
  eVar16: number of products selected by user.

Any modifications to the file SHOULD be mentioned in the comments */


function fnCodeToPaste(tagString,prodValues) {
  s.clearVars();


if(tagString != null && tagString != ""){
	var tagArray = tagString.split('^');

	s.prop6 = tagArray[0];
	s.pageName = tagArray[1];
	s.hier1 = tagArray[2];
	s.prop19 = tagArray[3];

	
	if(tagArray[4] != null && tagArray[4] != ""){	
		s.events = tagArray[4];
	}

	
	if(tagArray[5] != null && tagArray[5] != ""){	
		s.prop18 = tagArray[5];
	}
	
	
	if(tagArray[6] != null && tagArray[6] != ""){
		s.eVar9 = tagArray[6];
	}
	if(tagArray[7] != null && tagArray[7] != ""){		
                        s.eVar12 = tagArray[7];

            }
	
   if(tagArray[8] != null && tagArray[8] != ""){
     s.eVar22=tagArray[8];
	
   }
if(tagArray[9] != null && tagArray[9] != ""){
      
     s.eVar27=tagArray[9];
	
   }

if(tagArray[10]!=null && tagArray[10]!=""){

    s.evar28=tagArray[10];

}

if(tagArray[11]!=null && tagArray[11]!=""){

    s.evar32=tagArray[11];

}

if(tagArray[12]!=null && tagArray[12]!=""){

  s.transactionid=tagArray[12];

}

if(prodValues!=null && prodValues!=""){
	var prodArray = prodValues.split('^');
	s.products=prodArray[0];

	if(prodArray[1] != null && prodArray[1] != ''){
		s.eVar16 = prodArray[1];
	}

}
	s.t();
            
}	
	
}

        


function fnCodeToPasteCredit(tagString,prodValues,resv,pyid) {
  s.clearVars();
if(tagString != null && tagString != ""){
	var tagArray = tagString.split('^');

	s.prop6 = tagArray[0];
	s.pageName = tagArray[1];
	s.hier1 = tagArray[2];
    
	s.prop19 = tagArray[3];


	
	if(tagArray[4] != null && tagArray[4] != ""){	
		s.events = tagArray[4];
	}
           
	
	if(tagArray[5] != null && tagArray[5] != ""){	
		s.prop18 = tagArray[5];

	}
	
	
	if(tagArray[6] != null && tagArray[6] != ""){
		s.eVar9 = tagArray[6];
	}
	if(tagArray[7] != null && tagArray[7] != ""){		
                        s.eVar12 = tagArray[7];

            }
	
   if(tagArray[8] != null && tagArray[8] != ""){
     s.eVar22=tagArray[8];
	
   } 
    if(tagArray[9] != null && tagArray[9] != ""){
      
     s.eVar27=tagArray[9];
	
   }


   


if(resv!=null && resv!=""){

  s.eVar28=resv;

}


if(pyid!=null && pyid!=""){
   s.transactionID=pyid;
   s.eVar38=s.transactionID;

}


if(prodValues!=null && prodValues!=""){
s.products=prodValues;


}

	s.t();
            
}	
	
}

function fnCodeToPasteCreditCardApplication(tagString,prodValues,resv,pyid,offerType) {
  s.clearVars();
if(tagString != null && tagString != ""){
	var tagArray = tagString.split('^');

	s.prop6 = tagArray[0];
	s.pageName = tagArray[1];
	s.hier1 = tagArray[2];
    
	s.prop19 = tagArray[3];


	
	if(tagArray[4] != null && tagArray[4] != ""){	
		s.events = tagArray[4];
	}
           
	
	if(tagArray[5] != null && tagArray[5] != ""){	
		s.prop18 = tagArray[5];

	}
	
	
	if(tagArray[6] != null && tagArray[6] != ""){
		s.eVar9 = tagArray[6];
	}
	if(tagArray[7] != null && tagArray[7] != ""){		
                        s.eVar12 = tagArray[7];

            }
	
   if(tagArray[8] != null && tagArray[8] != ""){
     s.eVar22=tagArray[8];
	
   } 
    if(tagArray[9] != null && tagArray[9] != ""){
      
     s.eVar27=tagArray[9];
	
   }


   


if(resv!=null && resv!=""){

  s.eVar28=resv;

}


if(pyid!=null && pyid!=""){
   s.transactionID=pyid;
   s.eVar38=s.transactionID;

}


if(prodValues!=null && prodValues!=""){
s.products=prodValues;


}

if(offerType!=null && offerType!=""){
s.eVar33=offerType;

}


	s.t();
            
}	
	
}


function fnCodeToPasteCreditConfirm(tagString,prodValues,resv,pyid) {
s.clearVars();
if(tagString != null && tagString != ""){
	var tagArray = tagString.split('^');

	s.prop6 = tagArray[0];
	s.pageName = tagArray[1];
	s.hier1 = tagArray[2];
    
	s.prop19 = tagArray[3];


	
	if(tagArray[4] != null && tagArray[4] != ""){	
		s.events = tagArray[4];
	}
           
	
	if(tagArray[5] != null && tagArray[5] != ""){	
		s.prop18 = tagArray[5];

	}
	
	
	if(tagArray[6] != null && tagArray[6] != ""){
		s.eVar9 = tagArray[6];
	}
	if(tagArray[7] != null && tagArray[7] != ""){		
                        s.eVar12 = tagArray[7];

            }
	
   if(tagArray[8] != null && tagArray[8] != ""){
     s.eVar22=tagArray[8];
	
   } 
    if(tagArray[9] != null && tagArray[9] != ""){
      
     s.eVar27=tagArray[9];
	
   }


   


if(resv!=null && resv!=""){

  s.eVar28=resv;

}


if(pyid!=null && pyid!=""){

    s.transactionID=pyid;
 s.eVar38=s.transactionID;

}


if(prodValues!=null && prodValues!=""){
var valuex="1";	
s.products=prodValues;

s.eVar16=valuex;

}

	s.t();
            
}	
	
}

function fnCodeToPasteWelcomeConfirmNAC(tagString,prodValues,pyid) {
  s.clearVars();


if(tagString != null && tagString != ""){
	var tagArray = tagString.split('^');

	s.prop6 = tagArray[0];
	s.pageName = tagArray[1];
	s.hier1 = tagArray[2];
	s.prop19 = tagArray[3];

	
	if(tagArray[4] != null && tagArray[4] != ""){	
		s.events = tagArray[4];
	}

	
	if(tagArray[5] != null && tagArray[5] != ""){	
		s.prop18 = tagArray[5];
	}
	
	
	if(tagArray[6] != null && tagArray[6] != ""){
		s.eVar9 = tagArray[6];
	}
	if(tagArray[7] != null && tagArray[7] != ""){		
                        s.eVar12 = tagArray[7];

            }
	
   if(tagArray[8] != null && tagArray[8] != ""){
     s.eVar22=tagArray[8];
	
   }
if(tagArray[9] != null && tagArray[9] != ""){
      
     s.eVar27=tagArray[9];
	
   }

if(tagArray[10]!=null && tagArray[10]!=""){

    s.evar28=tagArray[10];

}

if(tagArray[11]!=null && tagArray[11]!=""){

    s.evar32=tagArray[11];

}

if(pyid!=null && pyid!=""){

     s.transactionID=pyid;
 s.eVar38=s.transactionID;


}

if(prodValues!=null && prodValues!=""){
	var prodArray = prodValues.split('^');
	s.products=prodArray[0];

	if(prodArray[1] != null && prodArray[1] != ''){
		s.eVar16 = prodArray[1];
	}

}

	s.t();
            
}	
	
}


function fnCodeToPaste_Click(){


var s_code=s.tl(this,'o','Button Click');
}


/* s.tl() method for Creditcard application true,'o','btnclick'*/


function fnCodeToPasteCreditCard_Click(reservationcode,authMethod)
{
s.clearVars();
s.linkTrackVars="eVar28,eVar32";
s.eVar28=reservationcode;
s.eVar32=authMethod;
var s_code=s.tl(this,'o','Button Click');
}


/* s.tl() method for Creditcard application true,'o','btnclick'*/


function fnCodeToPasteCreditCardProductType_Click(producttype)
{
s.linkTrackVars="eVar33";
s.eVar33=producttype;
var s_code=s.tl(this,'o','Button Click');
}


function fnCodeToPasteStamentType_Click(statementType)
{
s.clearVars();
s.linkTrackVars="prop3,eVar3,events";
s.linkTrackEvents="event3";
s.events="event3";
s.prop3=s.eVar3=statementType;
var s_code=s.tl(this,'o','Button Click');
}

/*This function is for Omniture tagging for WinBackWindow*/
function fnCodeToPasteWBW_Click(){
s.clearVars();
s.pageName = "STcom|NAC|WinBackWindow";
	s.hier1 = "STcom|NAC";
s.t();
}

function fnCodeToPasteLendingPageLoad(tagString, confirmDetails, pyid) {
    s.clearVars();
    
    if (tagString != null && tagString != "") {
        var tagArray = tagString.split('^');

        s.prop6 = tagArray[0];
        s.pageName = tagArray[1];
        s.hier1 = tagArray[2];
        s.prop19 = tagArray[3];


        if (tagArray[4] != null && tagArray[4] != "") {
            s.events = tagArray[4];
        }


        if (tagArray[5] != null && tagArray[5] != "") {
            s.prop18 = tagArray[5];
        }


        if (tagArray[6] != null && tagArray[6] != "") {
            s.eVar9 = tagArray[6];
        }
        if (tagArray[7] != null && tagArray[7] != "") {
            s.eVar12 = tagArray[7];

        }

        if (tagArray[8] != null && tagArray[8] != "") {
            s.eVar22 = tagArray[8];

        }
        if (tagArray[9] != null && tagArray[9] != "") {

            s.eVar27 = tagArray[9];

        }

        if (tagArray[10] != null && tagArray[10] != "") {

            s.evar28 = tagArray[10];

        }

        if (tagArray[11] != null && tagArray[11] != "") {

              s.products = tagArray[11];

        }
         if (tagArray[12] != null && tagArray[12] != "") {

            s.eVar33 = tagArray[12];

        }

        if (pyid != null && pyid != "") {

            s.transactionID = pyid;
            s.eVar38 = s.transactionID;


        }

        if (confirmDetails != null && confirmDetails != "") {
            var detailsArray = confirmDetails.split('^');
            if(detailsArray[0]!= null&&detailsArray[1]!= null&&detailsArray[2]!= null){
            s.products=';'+detailsArray[0]+';;;event18='+detailsArray[1]+';eVar30='+detailsArray[2];
            }            

            if (detailsArray[3] != null && detailsArray[3] != '') {
                s.eVar31 = detailsArray[3];
            }
              if (detailsArray[4] != null && detailsArray[4] != '') {
                s.transactionID = detailsArray[4];
                s.eVar38=s.transactionID;
            }
        }

        s.t();

    }
}

function fnCodeToPasteGetStarted_Click(state,reservationCode,AuthMode)
{
s.clearVars();
s.linkTrackVars="prop35,eVar35,eVar28,eVar32";
 if (state != null && state != "") {

         s.prop35=s.eVar35=state;

        }
         if (reservationCode != null && reservationCode != "") {

              s.eVar28=reservationCode;

        }
         if (AuthMode != null && AuthMode != "") {

            s.eVar32=AuthMode;

        }

var s_code=s.tl(this,'o','Button Click');
}

function fnCodeToPasteOfferSelect_Click(product,offerSelected)
{
s.clearVars();
s.linkTrackVars="eVar33,events,products";
s.linkTrackEvents="event20";
s.events="event20"
 if (product != null && product != "") {

             s.products=';'+product;

        }
if (offerSelected != null && offerSelected != "") {

             s.eVar33=offerSelected;

        }        
var s_code=s.tl(this,'o','Button Click');
}

function fnCodeToPasteLoanOptions_Click(loanType,surePay)
{
s.clearVars();
s.linkTrackVars="eVar27,prop37,eVar37";
 if (loanType != null && loanType != "") {
             s.eVar27=loanType;
        }
if (surePay && surePay=='True') {

            s.prop37=s.eVar37="SurePay";

        }        
var s_code=s.tl(this,'o','Button Click');
}


function fnCodeToPasteAutoLoanOptions_Click(loanType,surePay,VinSelect)
{
s.clearVars();
s.linkTrackVars="eVar27,prop37,eVar37,prop3,events";

if(VinSelect && VinSelect=='True') {
s.linkTrackEvents="event3";
s.events="event3" ;
s.prop3="NAC|VinLookup";
}

 if (loanType != null && loanType != "") {
             s.eVar27=loanType;
        }
if (surePay && surePay=='True') {

            s.prop37=s.eVar37="SurePay";

        }        
var s_code=s.tl(this,'o','Button Click');
}



    function fnCodeToPasteSelectProductDDA_Click(selectedProd){
    s.clearVars();
    s.linkTrackVars="products,pageName";
    s.linkTrackEvents = "event6";
    s.events = "event6";
    s.pageName="STcom|NAC|SelectAdditionalProducts";
     if (selectedProd != null && selectedProd != "") {
             var products = selectedProd.split(',');
        var tagvalue="";
         for (i = 0; i < products.length; i++){
         if (tagvalue == null || tagvalue == ""){            
                tagvalue = ";Personal|" + products[i] + ";;;;eVar21=UpsoldProduct";
            }
            else{
            if(products[i]!=null && products[i]!=""){
                tagvalue = tagvalue + ",;Personal|" + products[i] + ";;;;eVar21=UpsoldProduct";
                }
                }
        }
        s.products = tagvalue;
        }
         var s_code = s.tl(this, 'o', 'Button Click');
    }

function fnCodeToPasteLendingOffersPageLoad(tagString, confirmDetails, pyid,offerSource) {
    s.clearVars();   
    if (tagString != null && tagString != "") {
        var tagArray = tagString.split('^');

        s.prop6 = tagArray[0];
        s.pageName = tagArray[1];
        s.hier1 = tagArray[2];
        s.prop19 = tagArray[3];


        if (tagArray[4] != null && tagArray[4] != "") {
            s.events = tagArray[4];
        }


        if (tagArray[5] != null && tagArray[5] != "") {
            s.prop18 = tagArray[5];
        }


        if (tagArray[6] != null && tagArray[6] != "") {
            s.eVar9 = tagArray[6];
        }
        if (tagArray[7] != null && tagArray[7] != "") {
            s.eVar12 = tagArray[7];

        }

        if (tagArray[8] != null && tagArray[8] != "") {
            s.eVar22 = tagArray[8];

        }
        if (tagArray[9] != null && tagArray[9] != "") {

            s.eVar27 = tagArray[9];

        }

        if (tagArray[10] != null && tagArray[10] != "") {

            s.evar28 = tagArray[10];

        }

        if (tagArray[11] != null && tagArray[11] != "") {

              s.products = tagArray[11];

        }
         if (tagArray[12] != null && tagArray[12] != "") {

            s.eVar33 = tagArray[12];
        }

        if (pyid != null && pyid != "") {

            s.transactionID = pyid;
            s.eVar38 = s.transactionID;


        }

        if (confirmDetails != null && confirmDetails != "") {
            var detailsArray = confirmDetails.split('^');
            if(detailsArray[0]!= null&&detailsArray[1]!= null&&detailsArray[2]!= null){
            s.products=';'+detailsArray[0]+';;;event18='+detailsArray[1]+';eVar30='+detailsArray[2];
            }            

            if (detailsArray[3] != null && detailsArray[3] != '') {
                s.eVar31 = detailsArray[3];
            }
              if (detailsArray[4] != null && detailsArray[4] != '') {
                xact = detailsArray[4];
                s.eVar38=xact;
            }
        }
	if (offerSource != null && offerSource != "") {
	s.eVar33 = offerSource;
	}

        s.t();

    }
}