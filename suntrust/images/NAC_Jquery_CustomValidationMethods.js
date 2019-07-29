
function addCustomJqueryMethods()
{


jQuery.validator.addMethod("dobLimitCheck", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','dobAgeRetrieve') ;
  }, "You must be at least 18 years old to apply.");  



jQuery.validator.addMethod("dobCheck", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','dobRetrieve') ;
  }, "Please provide a valid date (MM/DD/YYYY).");  



  
jQuery.validator.addMethod("purchaseMonth", function(value, element) {
	return this.optional(element) ||  fnValidations(value+'|input|txtYear','purchaseMonth');
 }, "Please enter a valid Purchase Date.");



  
jQuery.validator.addMethod("maximumAmount", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','maximumAmount') ;
 }, "Please enter an amount equal to or less than $250,000.");

    
  
jQuery.validator.addMethod("secCredName", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','secCredName') ;
 }, "Please provide a valid 2nd Name of Lender."); 



jQuery.validator.addMethod("payoff", function(value, element) {
	return this.optional(element) || fnValidations(value+'|select','payoff') ;
 }, "You must pay off either your First or Second Mortgage."); 

  
jQuery.validator.addMethod("currencyLength7", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','currencyLength7') ;
 }, "Please provide a valid amount (U.S. currency).");  


  
jQuery.validator.addMethod("contactName", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','contactName') ;
 }, "Please provide a valid Other Contact Name."); 



  
 jQuery.validator.addMethod("year", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','year') ;
 }, "Please provide a valid year."); 
 
   
 jQuery.validator.addMethod("purchaseDateYearFuture", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','purchaseDateYearFuture') ;
 }, "Please enter a valid Purchase Date."); 
 
   
 jQuery.validator.addMethod("purchaseDateYear", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','purchaseDateYear') ;
 }, "Please provide a valid year."); 
  



jQuery.validator.addMethod("currencyLength5", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','currencyLength5') ;
  }, "Please enter a valid Estimated Acreage.");

 
jQuery.validator.addMethod("describePurpose", function(value, element) {
 	return this.optional(element) || fnValidations(value+'|input','describePurpose') ;
 }, "Please provide a valid Describe Purpose."); 



jQuery.validator.addMethod("minimumAmountEquity", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','minimumAmountEquity') ;
  }, "Please enter at least the minimum amount."); 


  
jQuery.validator.addMethod("vinUS", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','vinUS') ;
  }, "Invalid VIN Format."); 


jQuery.validator.addMethod("mileage", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','mileage') ;
  }, "Please provide a valid Vehicle Mileage."); 




jQuery.validator.addMethod("county", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','county') ;
  }, "Please provide a valid County Of Registration."); 



jQuery.validator.addMethod("ssn", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','ssn') ;
  }, "Please provide a valid Social Security Number."); 



jQuery.validator.addMethod("ssnCoapp", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','ssnCoapp') ;
  }, "Please provide a valid Social Security Number."); 




  jQuery.validator.addMethod("dobAge", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','dobAge') ;
  }, "You must be at least 18 years old to apply.");



  
  jQuery.validator.addMethod("dob", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','dob') ;
  }, "Please provide a valid date (MM/DD/YYYY).");


  
  jQuery.validator.addMethod("dobCoapp", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','dobCoapp') ;
  }, "Please provide a valid date (MM/DD/YYYY).");


  
  jQuery.validator.addMethod("dobAgeCoapp", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','dobAgeCoapp') ;
  }, "You must be at least 18 years old to apply.");


  
  jQuery.validator.addMethod("emailAddress", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','emailAddress') ;
  }, "Please enter a valid email address.");
  



   jQuery.validator.addMethod("phone", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','phone') ;
  }, "Please provide a valid US phone number.");  


  
  jQuery.validator.addMethod("POBox", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','POBox') ;
  }, "Please enter a valid Street Address.");


  
  jQuery.validator.addMethod("street", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','street') ;
  }, "Please enter a valid Street Address.");

 
  jQuery.validator.addMethod("mailingStreet", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','mailingStreet') ;
  }, "Please enter a valid Street Address.");

  
  jQuery.validator.addMethod("apartment", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','apartment') ;
  }, "Please provide a valid Apartment/Unit Number."); 


  
   jQuery.validator.addMethod("city", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','city') ;
  }, "Please provide a valid City.");  

 
  
   jQuery.validator.addMethod("zipUs", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','zipUs') ;
  }, "Please provide a valid US Zip Code.");  


  
   jQuery.validator.addMethod("currencyUS", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input|ddlHome','currencyUS') ;
  }, "Please provide a valid amount (U.S. currency)."); 

 jQuery.validator.addMethod("currencyUSZeroAllowed", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','currencyUSZeroAllowed') ;
  }, "Please provide a valid amount (U.S. currency)."); 
  
   jQuery.validator.addMethod("currencyUSZeroNotAllowed", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','currencyUSZeroNotAllowed') ;
  }, "Please provide a valid amount (U.S. currency).");


  
   jQuery.validator.addMethod("currencyLength9", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','currencyLength9') ;
  }, "Please provide a valid amount (U.S. currency).");   


  
   jQuery.validator.addMethod("POBoxAllowed", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','POBoxAllowed') ;
  }, "Please provide a valid P.O Box.");  


  
  
   jQuery.validator.addMethod("currencySmallSpace", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','currencySmallSpace') ;
  }, "Please provide a valid amount.");  

 jQuery.validator.addMethod("currencySmallSpaceNotZero", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','currencySmallSpaceNotZero') ;
  }, "Please provide a valid amount.");  

  
   jQuery.validator.addMethod("currencyLength9SmallSpace", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','currencyLength9SmallSpace') ;
  }, "Please provide a valid amount.");    


  
   jQuery.validator.addMethod("firstName", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','firstName') ;
  }, "Please provide a valid First Name."); 


  
  
   jQuery.validator.addMethod("middleName", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','middleName') ;
  }, "Please provide a valid Middle Name."); 


  
    jQuery.validator.addMethod("lastName", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','lastName') ;
  }, "Please provide a valid Last Name."); 

 
  
   jQuery.validator.addMethod("credName", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','credName') ;
  }, "Please provide a valid Name of Lender."); 


  
  jQuery.validator.addMethod("currencyLength9WithoutDec", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','currencyLength9WithoutDec') ;
  }, "Please provide a valid amount (U.S. currency).");

  
     
  jQuery.validator.addMethod("currencyUSZeroForMonthlyPayment", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input|ddlHome','currencyUSZeroForMonthlyPayment') ;
  }, "Please provide a valid amount (U.S. currency)."); 
    


  jQuery.validator.addMethod("otherDescription", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','otherDescription') ;
  }, "Please provide a valid Other Description.");



  jQuery.validator.addMethod("militaryBranch", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','otherDescription') ;
  }, "Please provide a valid Military Branch."); 



  jQuery.validator.addMethod("presentEmployer", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','otherDescription') ;
  }, "Please provide a valid Present Employer."); 




  jQuery.validator.addMethod("previousEmployer", function(value, element) {
	return this.optional(element) || fnValidations(value+'|input','otherDescription') ;
  }, "Please provide a valid Previous Employer."); 
}
 