
function fnValidations(controlIdandType,reqValidations)
{
    var returnValue=true;    
    var breakLoop=0;  
    var idAndTypeArray=new Array(); 
    var requiredValidationsArray= new Array();
    var controlId2;
    var controlId=findInput(controlIdandType);
    
    var controlType="input";
    var secondInputId=""
    if(controlIdandType.length>(controlId.length+6))
      {
       secondInputId=controlIdandType.substring(controlId.length+7,controlIdandType.length);
      controlId2="#phasedControl_"+secondInputId;
       
      }
    if(controlId!="" && controlId!=null)
    {
      controlId=Trim(controlId);
    }
    requiredValidationsArray=reqValidations.split("|");
    
    for(count=0; count<requiredValidationsArray.length;count++)
    {
     var validation=requiredValidationsArray[count];
  
     if(controlType=="input"){
     
     switch(validation)
     {
     
      case "ssn":
      {
              returnValue=true;
               if(!($('#phasedControl_hdnIsSSnValid').val()=='valid' && controlId.length==11))
               {
              
                if((/^\d{9}$/.test(controlId)))
                {
                    if(parseFloat(controlId)==parseFloat("0"))
                    {
                        breakLoop=1;                   
                       returnValue=false;
                    }
                    else
                    {
                        var ssnCharArray=controlId.split('');
                        if(ssnCharArray[0]=="9")
                        {
                         breakLoop=1;
                         returnValue=false; 
                        }
                    }
      
                }
                else if(/^0{3}-0{2}-0{4}$/.test(controlId))
                {
                    breakLoop=1;                   
                   returnValue=false;               
                }
                else if(!(/^\d{3}-\d{2}-\d{4}$/.test(controlId)))
                {
                    breakLoop=1;                   
                   returnValue=false;               
                }
              
               
               }
               
               
        }
        break;
        
       case "ssnCoapp":
       {
             var SSN=controlId;                
             if(!($('#phasedControl_ucxCLPersonalInfoCoapp_hdnIsSSnValid').val()=='valid' && SSN.length==11))
             {
                 if((/^\d{9}$/.test(controlId)))
                {
                    if(parseFloat(controlId)==parseFloat("0"))
                    {
                        breakLoop=1;                   
                       returnValue=false;
                    }
                    else
                    {
                        var ssnCharArray=SSN.split('');
                        if(ssnCharArray[0]=="9")
                        {
                         breakLoop=1;
                         returnValue=false; 
                        }
                    }
      
                }
                else if(/^0{3}-0{2}-0{4}$/.test(controlId))
                {
                    breakLoop=1;                   
                   returnValue=false;               
                }
                else if(!(/^\d{3}-\d{2}-\d{4}$/.test(controlId)))
                {
                    breakLoop=1;                   
                   returnValue=false;               
                }
              
              
            }   
        }
        break;
        
       case "dobAge":
       {
                 var inputDate=controlId;
                 var formatSplit=new Array();
                 formatSplit=inputDate.split("/");        
                 var Year=formatSplit[2];
                 var Month=formatSplit[0];
                 var Day=formatSplit[1];
                 var DOB=new Date();
                 DOB.setFullYear(Year,Month-1,Day);
                 var currentdate= new Date();
                 var currentYear=currentdate.getFullYear();
                 currentdate.setFullYear(currentYear-18);
                 
                if($('#phasedControl_hdnIsDobValid').val()=="invalid")
                {
                    if(currentdate<DOB){
                    breakLoop=1;
                    returnValue=false;
                    }
                 }
       }
       
       case "dobAgeCoapp":
       {
                 var inputDate=controlId;
                 var formatSplit=new Array();
                 formatSplit=inputDate.split("/");        
                 var Year=formatSplit[2];
                 var Month=formatSplit[0];
                 var Day=formatSplit[1];
                 var DOB=new Date();
                 DOB.setFullYear(Year,Month-1,Day);
                 var currentdate= new Date();
                 var currentYear=currentdate.getFullYear();
                 currentdate.setFullYear(currentYear-18);
                 
                if($('#phasedControl_ucxCLPersonalInfoCoapp_hdnIsDobValid').val()=="invalid")
                {
                    if(currentdate<DOB){
                    breakLoop=1;
                    returnValue=false;
                    }
                 }
       }
       
       case "dobAgeRetrieve":
       {
                 var inputDate=controlId;
                 var formatSplit=new Array();
                 formatSplit=inputDate.split("/");        
                 var Year=formatSplit[2];
                 var Month=formatSplit[0];
                 var Day=formatSplit[1];
                 var DOB=new Date();
                 DOB.setFullYear(Year,Month-1,Day);
                 var currentdate= new Date();
                 var currentYear=currentdate.getFullYear();
                 currentdate.setFullYear(currentYear-18);
                 
                
                    if(currentdate<DOB){
                    breakLoop=1;
                    returnValue=false;
                    }
                
       }
           
       case "dob":
       {
             
               var inputDate=controlId;                                  
               if($('#phasedControl_hdnIsDobValid').val()=="invalid")
                {
                   if(inputDate.length==10)
                   { 
                    if(!(/^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[13-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(inputDate))){
                     breakLoop=1;
                     returnValue=false;
                    } 
                    else 
                    {
                        var formatSplit=new Array();
                        formatSplit=inputDate.split("/");
                        var Year=formatSplit[2];
                         var Month=formatSplit[0];
                         var Day=formatSplit[1];
                         var DOB=new Date();
                         DOB.setFullYear(Year,Month-1,Day);
                         var currentdate= new Date();
                         var currentYear=currentdate.getFullYear();
                         currentdate.setFullYear(currentYear-18);
                         if(!(/^([1][9]\d\d|[2][0]\d\d)$/.test(Year)))
                         {              
                          breakLoop=1;
                          returnValue=false;
                         }             
                    }
                }
                else
                {
                    breakLoop=1;
                    returnValue=false;
                }
                }
       }
        break; 
        
         case "dobCoapp":
         {
             var inputDate=controlId;
              
             if($('#phasedControl_ucxCLPersonalInfoCoapp_hdnIsDobValid').val()=='invalid')
             { 
             if(inputDate.length==10)
                { 
                
                 if(!(/^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[13-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(inputDate))){              
                 breakLoop=1;
                 returnValue=false;
                 } 
                else 
                {              
                 var formatSplit=new Array();
                 formatSplit=inputDate.split("/");        
                 var Year=formatSplit[2];
                 var Month=formatSplit[0];
                 var Day=formatSplit[1];
                 var DOB=new Date();
                 DOB.setFullYear(Year,Month-1,Day);
                 var currentdate= new Date();
                 var currentYear=currentdate.getFullYear();
                 currentdate.setFullYear(currentYear-18);
                 if(!(/^([1][9]\d\d|[2][0]\d\d)$/.test(Year)))
                 {              
                  breakLoop=1;
                  returnValue=false;
                 }
                }
                }
                else
                {
                    breakLoop=1;
                    returnValue=false;
                }
              }
       }
        break;  
       case "dobRetrieve":
       {
               
                 var inputDate=controlId;
                
                 
                
                if(!(/^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[13-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(inputDate))){              
                 breakLoop=1;
                 returnValue=false;
                } 
                else 
                { 
                  var formatSplit=new Array();
                 formatSplit=inputDate.split("/");        
                 var Year=formatSplit[2];
                 var Month=formatSplit[0];
                 var Day=formatSplit[1];
                 var DOB=new Date();
                 DOB.setFullYear(Year,Month-1,Day);
                 var currentdate= new Date();
                 var currentYear=currentdate.getFullYear();
                 currentdate.setFullYear(currentYear-18);
                 if(!(/^([1][9]\d\d|[2][0]\d\d)$/.test(Year))){               
                  breakLoop=1;              
                  returnValue=false;
                 }
                }
       }
        break;   
      case "phone":
      {
            var result=false;
            var phoneNumber=controlId;
            if(phoneNumber!=null)
            {

             if(phoneNumber.length==10)
             {      
                 var patt1=new RegExp("^(\\d{10})$");
                 result = patt1.test(phoneNumber);        
             }
             else if(phoneNumber.length==14)
             {
                 var patt1=new RegExp("^[1][-](\\d{3})[-]\\d{3}[-]\\d{4}$");
                 result = patt1.test(phoneNumber);

                 if(!result)
                 {
                     var patt2=new RegExp("^\\(?(\\d{3})\\)?[ ]\\d{3}[-]\\d{4}$");
                     result = patt2.test(phoneNumber);
                 }

             }
            else if (phoneNumber.length==12)
            {
                var patt1=new RegExp("^(\\d{3})[-]\\d{3}[-]\\d{4}$");
                result = patt1.test(phoneNumber);
            }

           if(result)
           {

            phoneNumber=phoneNumber.replace(/[-() ]/g,"");
            if(phoneNumber.length==11)
            {
                phoneNumber=phoneNumber.substr(1,10);
            }
            var patriotActPhoneNumbers=new Array("1234567890","0000000000","1111111111","2222222222","3333333333","4444444444","5555555555","6666666666","7777777777","8888888888","9999999999");

            for(var i=0;i<patriotActPhoneNumbers.length;i++)

            {

                if(patriotActPhoneNumbers[i]==phoneNumber)
                {
                    result=false;
                    break;
                }

            }

          

        }

        return result;

    }



      
      } 
      break;
      
      case "zipUs":
      {         
            var zip=controlId;
             var result=false;
            var pattern=new RegExp("^((\\d{5})?$|(\\d{9})?$|((\\d{5})-(\\d{4}))?$|((\\d{5})[ ](\\d{4}))?$)$");
            result = pattern.test(zip);
            return result;
            
      }
      break;
  
              
      case "currencyUS":
      {
            var currency=controlId;
            currency=Trim(currency);
           
            if(!(/^\$?(\d{1,3},?(\d{3},?)*\d{3}(\.\d{1,2})?|\d{1,3}(\.\d{1,2})?|\.\d{1,2}?)$/.test(currency))){
             breakLoop=1;
             returnValue=false;
            }
            else if(parseFloat(currency)==parseFloat("0"))
            {
                if(controlId!="#phasedControl_txtGrossMonthlyIncome")
                {
                    breakLoop=1;
                    returnValue=false;
                }
                if(controlId!="#phasedControl_ucxCLPersonalInfoCoapp_txtGrossIncomeCoapp")
                {
                    breakLoop=1;    
                    returnValue=false;
                }
                if((controlId =="#phasedControl_txtOwnMonthlyPayment") && ($(controlId2).val()=="X~"))
                {                   
                    returnValue=true;
                }
            }
     }
     break;
      case "currencyUSZeroAllowed":
      {
            var currency=controlId;
            currency=Trim(currency);
           
            if(!(/^\$?(\d{1,3},?(\d{3},?)*\d{3}(\.\d{1,2})?|\d{1,3}(\.\d{1,2})?|\.\d{1,2}?)$/.test(currency))){
             breakLoop=1;
             returnValue=false;
            }
            
     }
     break;
     case "currencyUSZeroNotAllowed":
      {
            var currency=controlId;
            currency=Trim(currency);
           
            if(!(/^\$?(\d{1,3},?(\d{3},?)*\d{3}(\.\d{1,2})?|\d{1,3}(\.\d{1,2})?|\.\d{1,2}?)$/.test(currency))){
             breakLoop=1;
             returnValue=false;
            }
            else if(parseFloat(currency)==parseFloat("0"))
            {                
                  breakLoop=1;
                  returnValue=false;           
            }
     }
     break;
     
      case "currencyUSZeroForMonthlyPayment":
      {
            var currency=controlId;
            currency=Trim(currency);
         
            if(!(/^\$?(\d{1,3},?(\d{3},?)*\d{3}(\.\d{1,2})?|\d{1,3}(\.\d{1,2})?|\.\d{1,2}?)$/.test(currency))){
             breakLoop=1;
             returnValue=false;
            }
            else if(parseFloat(currency)==parseFloat("0"))
            {  if($(controlId2).val()!="X~" )
                 {             
                  breakLoop=1;
                  returnValue=false; 
                  }          
            }
     }
     break;
     
     
     case "emailAddress":
       {
            
            var emailID=controlId;
            emailID=Trim(emailID);
            if(emailID.length>0){
                if(/^\w([-.]?\w)*@(\w[-\w]*\w\.)+[a-zA-Z]{2,9}$/.test(emailID)){                        
                     returnValue=true;
                }
            
            else {            
             breakLoop=1;
             returnValue=false;
            }
            }
        }
         break;
         
        
         case "firstName":  
         {                       
            var name=controlId;
            name=Trim(name);
            if(name.length>0)
            {
            if(!(/^[a-zA-Z\-' ]*$/.test(name)))
            {
            breakLoop=1;
           
            returnValue=false;
            }
            }
         }
         break;
        
        case "middleName":  
         {
            var name=controlId;
            name=Trim(name);
            if(name.length>0)
            {
            if(!(/^[a-zA-Z\-' ]*$/.test(name)))
            {
            breakLoop=1;
            returnValue=false;
            }
            }
         }
         break;
         
         case "lastName":  
         {            
            var name=controlId;
            name= Trim(name);
            if(!(/^[a-zA-Z\-' ]{2,25}$/.test(name)))
            {
             breakLoop=1;    
             returnValue=false;
            }
         }
         break;
        
         
         case "POBox":  
         {            
            var address=controlId;
            address=address.toLowerCase();
            if(address.match(/\b(?:p\.?\s*o\.?|post\s*office)\s*(box|b\s*o\s*x)\b/))
            {           
             breakLoop=1;   
             returnValue=false;
            }
            else if(address.match(/\b(?:p\.?\s*o\.?|post\s*office)\s*(box|b\s*o\s*x)\s*[0-9]+\b/))
            {
             breakLoop=1;   
             returnValue=false;
            }
         }
         break;
         
         case "POBoxAllowed":  
         {
                   
            var address=controlId;
            address=address.toLowerCase();
            if(address.match(/\b(?:p\.?\s*o\.?|post\s*office)\s*(box|b\s*o\s*x)\b/))
            {
                if(!(address.match(/\b(?:p\.?\s*o\.?|post\s*office)\s*(box|b\s*o\s*x)\s*[0-9a-zA-Z]+\b/)))
                {              
                 breakLoop=1;
                 returnValue=false;
                }
            }
         }
         break;
        
         case "apartment":  
         {
      
            var apartmentNumber=controlId;
            if(apartmentNumber.length>0)
            {
            if(!(/^[a-zA-Z0-9 ]*$/.test(apartmentNumber)))
            {
             breakLoop=1;
             returnValue=false;
            }
            }
         }
         break;
         
         case "street":  
         {  
            var entry=controlId;
            if(!(/^[a-zA-Z0-9-'#%&/ ]*$/.test(entry)))
            {           
             breakLoop=1;
             returnValue=false;
            }
            else
            {
               if (!(/\d/.test(entry)) || !(/[a-zA-Z]/.test(entry)))
               {
                 breakLoop=1;
                 returnValue=false;
                
               }
            }
         }
         break;
         case "mailingStreet":  
         {      
            var entry=controlId;
            if(!(/^[a-zA-Z0-9-'#%&/. ]*$/.test(entry)))
            {           
             breakLoop=1;
             returnValue=false;
            }
            else
            {
               if (!(/\d/.test(entry)) || !(/[a-zA-Z]/.test(entry)))
               {
                 breakLoop=1;
                 returnValue=false;
                
               }
            }
         }
         break;
         case "city":  
         {          
            var entry=controlId;
            if(!(/^[a-zA-Z0-9-'#%&/ ]*$/.test(entry)))
            {            
             breakLoop=1;          
             returnValue=false;
            }
         }
         break;
         case "currencySmallSpace":
      {
           
            var currency=controlId;
            currency=Trim(currency);
            if(!(/^\$?(\d{1,3},?(\d{3},?)*\d{3}(\.\d{1,2})?|\d{1,3}(\.\d{1,2})?|\.\d{1,2}?)$/.test(currency))){
             breakLoop=1;            
             returnValue=false;
            }
     }
     break;
     case "currencySmallSpaceNotZero":
      {
           
            var currency=controlId;
            currency=Trim(currency);
            if(!(/^\$?(\d{1,3},?(\d{3},?)*\d{3}(\.\d{1,2})?|\d{1,3}(\.\d{1,2})?|\.\d{1,2}?)$/.test(currency))){
             breakLoop=1;            
             returnValue=false;
            }
            else if(parseFloat(currency)==parseFloat("0"))
            {             
                  breakLoop=1;
                  returnValue=false; 
                         
            }
     }
     break;
      case "contactName":  
         {
            var name=controlId;
            if(name.length>0)
            {
            if(!(/^[a-zA-Z\-' ]*$/.test(name)))
            {
             breakLoop=1;
             returnValue=false;
            }
            }
         }
         break;
         
         case "credName":  
         {
   
            var name=controlId;
            if(name.length>0)
            {
            if(!(/^[a-zA-Z0-9!@#$%^&\-',/ ]*(.edu|.org|.gov|.com|.net)?$/i.test(name)))
            {
             breakLoop=1;     
             returnValue=false;
            }
            }
         }
         break;
        
         
         case "secCredName":  
         {           
            var name=controlId;
            if(name.length>0)
            {
            if(!(/^[a-zA-Z0-9!@#$%^&\-',/ ]*(.edu|.org|.gov|.com|.net)?$/i.test(name)))
            {
             breakLoop=1;           
             returnValue=false;
            }
            }
         }
         break;
         case "describePurpose":
         {
           var value=controlId;
           while(value.indexOf("\n")!=-1)
           {
           value = value.replace("\n","")
           }           
            if(!(/^[a-zA-Z0-9!@#$%^&\-',/ ]*(.edu|.org|.gov|.com|.net)?$/i.test(value))){          
             breakLoop=1;
            returnValue=false;
            }
         }
         break;
         case "numeric":  
         {
           
            var value=controlId;
            
            if(!(/^\d+$/.test(value))){
             breakLoop=1;
             returnValue=false;
            }
         }
         break;
         case "year":  
         {           
            var currentDate = new Date();
            var entry=controlId;
            if(!(/^([1][9]\d\d|[2][0]\d\d)$/.test(entry)))
            {            
             breakLoop=1;           
             returnValue=false;
            }
            if(entry>currentDate.getFullYear())
            {             
             breakLoop=1;           
             returnValue=false;
            }
            
         }
         break;
         case "purchaseDateYear":  
         {           
            var currentDate = new Date();
            var entry=controlId;
            if(!(/^([1][9]\d\d|[2][0]\d\d)$/.test(entry)))
            {            
             breakLoop=1;           
             returnValue=false;
            }
            
            
         }
         break;
         case "purchaseDateYearFuture":  
         {  
            var currentDate = new Date();
            var entry=controlId;
            
            if(entry>currentDate.getFullYear())
            {             
             breakLoop=1;           
             returnValue=false;
            }  
           else if(entry==currentDate.getFullYear() && ($('#phasedControl_ddlMonth').val()!=null || $('#phasedControl_ddlMonth').val()!=""))
           {
                if(parseFloat($('#phasedControl_ddlMonth').val())>parseFloat(currentDate.getMonth()+1))
                {
                    breakLoop=1;           
                    returnValue=false;
                }
           }
            
            
         }
         break;
         case "vinUS":
        {
            var vinValue = LTrim(controlId);
            if (vinValue.length > 0) {
                if(vinValue.length ==17)
                {
                   if (!(/\d/.test(vinValue)) || !(/[a-zA-Z]/.test(vinValue)))
                   {
                     breakLoop=1;
                     returnValue=false;
                   }
                }
                else
                {
                     breakLoop=1;                     
                     returnValue=false;
                }
            }

        }
        break;
     
          case "mileage":
          {              
                var number=controlId;
                if(!(/^[0-9]+$/.test(number))){
                 breakLoop=1;
                 returnValue=false;
                }
         }
         break;
         case "county":  
         {            
            var name=controlId;
            if(name.length>0)
            {
            if(!(/^[a-zA-Z0-9-' ]*$/.test(name)))
            {
             breakLoop=1;
             returnValue=false;
            }
            }
         }
         break;
       
         
         case "currencyLength9":
          {     
                var currency=controlId;
                currency=currency.replace("$", "");
                while(currency.indexOf(",")!=-1)
                {
                currency=currency.replace(",", "");
                }
                currency=Trim(currency);
                if(!(/^\d{1,7}(\.\d{1,2})?$/.test(currency))){
                 breakLoop=1;                
                returnValue=false;
                }
         }
         break;
         
          case "currencyLength5":
          {     
                var currency=controlId;
                currency=currency.replace("$", "");
                while(currency.indexOf(",")!=-1)
                {
                currency=currency.replace(",", "");
                }
                currency=Trim(currency);
                if(!(/^\d{1,5}(\.\d{1,2})?$/.test(currency))){
                 breakLoop=1;                
                returnValue=false;
                }
                else if(currency<=10)
                {
                 breakLoop=1;                
                 returnValue=false;
                }
         }
         break;
         
         case "currencyLength9WithoutDec":
          {
               
                var currency=controlId;
                currency=currency.replace("$", "");
                while(currency.indexOf(",")!=-1)
                {
                currency=currency.replace(",", "");
                }
                currency=Trim(currency);
                
                if(!(/^\d{1,7}?$/.test(currency))){
                 breakLoop=1;
                
                returnValue=false;
                }
         }
         break;
         
          case "currencyLength9SmallSpace":
          {
               
                var currency=controlId;
                currency=currency.replace("$", "");
                while(currency.indexOf(",")!=-1)
                {
                currency=currency.replace(",", "");
                }
                currency=Trim(currency);
                
                if(!(/^\d{1,7}(\.\d{1,2})?$/.test(currency))){
                 breakLoop=1;
               
                returnValue=false;
                }
         }
         break;
         
         
         case "currencyLength10":
          {
               
                var currency=controlId;
                currency=currency.replace("$", "");
                while(currency.indexOf(",")!=-1)
                {
                currency=currency.replace(",", "");
                }
                currency=Trim(currency);
                
                if(!(/^\d{1,10}(\.\d{1,2})?$/.test(currency))){
                 breakLoop=1;
               
                returnValue=false;
                }
         }
         break;
         case "otherDescription":
          {
               
                var value=controlId;
                
                value=Trim(value);
                
                if(value.match("{") || value.match("}"))
                {
                 breakLoop=1;
               
                returnValue=false;
                }
         }
         break;
        
         case "minimumAmount":
         {
            var requiredMinAmount=secondInputId;
            var MinimumAmount=controlId;
            
            if(requiredMinAmount.length>0 )
            {
                MinimumAmount=MinimumAmount.replace("$", "");
                var intIndexOfMatch = MinimumAmount.indexOf(",");
                while (intIndexOfMatch != -1)
                {
                    MinimumAmount = MinimumAmount.replace(",", "")
                    intIndexOfMatch = MinimumAmount.indexOf(",");
                }
               
               
               requiredMinAmount=requiredMinAmount.replace("$", "");
               intIndexOfMatch = requiredMinAmount.indexOf(",");
                while (intIndexOfMatch != -1)
                {
                    requiredMinAmount = requiredMinAmount.replace(",", "")
                    intIndexOfMatch = requiredMinAmount.indexOf(",");
                }
               
                if(parseFloat( MinimumAmount)>=parseFloat(requiredMinAmount))
                {                  
                    returnValue=true;                  
                }
                else
                {
                    breakLoop=1;                    
                    returnValue=false;
                }
              }
    
             }
             break;
             case "maximumAmount":
             {
                if($('#phasedControl_ddlEquityLoanType').val() == "INETHOME")
                {
                    var maxAmount="250000";
                    var enteredAmount=controlId;            
                    if(enteredAmount.length>0 )
                    {
                        enteredAmount=enteredAmount.replace("$", "");
                        var intIndexOfMatch = enteredAmount.indexOf(",");
                        while (intIndexOfMatch != -1)
                        {
                            enteredAmount = enteredAmount.replace(",", "")
                            intIndexOfMatch = enteredAmount.indexOf(",");
                        }               
                                      
                        if(parseFloat( enteredAmount)>parseFloat(maxAmount))
                        {
                            breakLoop=1;
                            returnValue=false;
                        }
                      }
                 }
                }
                break; 
           
             
           
             case "purchaseMonth":
         {  
                 var currentdate= new Date();
                 var currentYear=currentdate.getFullYear();
                if($(controlId2).val()!=null)
                {
                     if(currentYear==$(controlId2).val())
                     {
                        if(parseFloat(controlId) > parseFloat(currentdate.getMonth()+1))
                        {
                          breakLoop=1;
                          returnValue=false;
                        }
                     }
                     else if(currentYear<$(controlId2).val())
                     {
                         breakLoop=1;
                          returnValue=false;
                     }
                }
                  
                
         }
         break;
	case "maxAmountInstallment":
      {

               var value=controlId;
	       var number = Number(value.replace(/[^0-9\.]+/g,""));
               var loanType=$("#phasedControl_ddlInstallmentLoanType>option:selected").val();
               if(loanType=="SEC")
                {
      			if(number>100000)
				{
					breakLoop=1;
					returnValue=false;
				}
		}
		else if(loanType=="UNSEC")
		{
			if(number>50000)
				{
					breakLoop=1;
					returnValue=false;
				}
		}
		else if(loanType=="")
		{
			breakLoop=1;
			returnValue=true;
		}

                
      } 
      break;

case "loanTermInstallment":
      {
		var loanType=$("#phasedControl_ddlInstallmentLoanType>option:selected").val();
		var reqAmt=$("#phasedControl_txtRequestedAmount").val();
		var number = Number(reqAmt.replace(/[^0-9\.]+/g,""));
                var value=controlId;
	       
               if(loanType=="UNSEC")
		{
			if(number==50000 && value!=48)
			{
				breakLoop=1;
				returnValue=false;
			}
		}			
               

                
      } 
      break;
            case "minimumAmountEquity":
            {
            var requiredMinAmount="10000";
            var MinimumAmount=controlId;            
            if(requiredMinAmount.length>0 )
            {
                MinimumAmount=MinimumAmount.replace("$", "");
                var intIndexOfMatch = MinimumAmount.indexOf(",");
                while (intIndexOfMatch != -1)
                {
                    MinimumAmount = MinimumAmount.replace(",", "")
                    intIndexOfMatch = MinimumAmount.indexOf(",");
                }               
                              
                if(parseFloat( MinimumAmount)>=parseFloat(requiredMinAmount))
                {
                    returnValue=true;                  
                }
                else
                {
                    breakLoop=1;
                    returnValue=false;
                }
              }
    
             }
             break;         
        
             }
             }
             
     
     if(breakLoop==1)
     {
        break;
     }
     
    }
    return returnValue;
    
}	


function Trim(str)
{
  return RTrim(str);
}

 

function LTrim(str)
{
  for (var i=0; str.charAt(i)==" "; i++)
  {
    str =  str.substring(i+1,str.length);
  }

  return str;
  
}

 

function RTrim(str)

{

  for (var i=str.length-1; str.charAt(i)==" "; i--)
  {
      str = str.substring(0,i);
  }

  return str;
}






function ClearAndReenterDOBCoapp(e)
{
var keynum;

    if(window.event) // IE8 and earlier
	{
	
	keynum = e.keyCode;
	}
else if(e.which) // IE9/Firefox/Chrome/Opera/Safari
	{
	keynum = e.which;
	}


var editedDate= $('#phasedControl_ucxCLPersonalInfoCoapp_txtDobCoapp').val();

var dobChararray=editedDate.split('');
var containX=false;

for( var count=0;count<dobChararray.length;count++)
{

    if(dobChararray[count]=='X')
    {
    containX=true;
    }
    
}
if(editedDate.length!=null)
{
    if(($('#phasedControl_ucxCLPersonalInfoCoapp_hdnIsDobValid').val()=="valid") && keynum!=9 && keynum!=13)
    {
     document.getElementById('phasedControl_ucxCLPersonalInfoCoapp_txtDobCoapp').value="";
        document.getElementById('phasedControl_ucxCLPersonalInfoCoapp_txtDobCoapp').maxLength=10;
        $("#phasedControl_ucxCLPersonalInfoCoapp_hdnIsDobValid").val("invalid");
    }
}
}


function ClearAndReenterSSNCoapp(e)
{
var keynum;

    if(window.event) // IE8 and earlier
	{
	
	keynum = e.keyCode;
	}
else if(e.which) // IE9/Firefox/Chrome/Opera/Safari
	{
	keynum = e.which;
	}


var editedSSN= $('#phasedControl_ucxCLPersonalInfoCoapp_txtSSNCoapp').val();


if(editedSSN.length!=null)
{
    if(($('#phasedControl_ucxCLPersonalInfoCoapp_hdnIsSSnValid').val()=="valid")&& keynum!=9 && keynum!=13)
    {
     document.getElementById('phasedControl_ucxCLPersonalInfoCoapp_txtSSNCoapp').value="";
        document.getElementById('phasedControl_ucxCLPersonalInfoCoapp_txtSSNCoapp').maxLength=11;
         $('#phasedControl_ucxCLPersonalInfoCoapp_hdnIsSSnValid').val('invalid');
    }
}


}




function ClearAndReenterDOB(e)
{
var keynum;

    if(window.event) // IE8 and earlier
	{
	
	keynum = e.keyCode;
	}
else if(e.which) // IE9/Firefox/Chrome/Opera/Safari
	{
	keynum = e.which;
	}


var editedDate= $('#phasedControl_txtDob').val();

var dobChararray=editedDate.split('');
var containX=false;

for( var count=0;count<dobChararray.length;count++)
{

    if(dobChararray[count]=='X')
    {
    containX=true;
    }
    
}
if(editedDate.length!=null)
{
    if(($('#phasedControl_hdnIsDobValid').val()=="valid") && containX && keynum!=9 && keynum!=13)
    {
     document.getElementById('phasedControl_txtDob').value="";
        document.getElementById('phasedControl_txtDob').maxLength=10;
        
         $('#phasedControl_hdnIsDobValid').val("invalid");
    }
}
}


function ClearAndReenterSSN(e)
{
var keynum;

    if(window.event) // IE8 and earlier
	{
	
	keynum = e.keyCode;
	}
else if(e.which) // IE9/Firefox/Chrome/Opera/Safari
	{
	keynum = e.which;
	}


var editedSSN= $('#phasedControl_txtSSN').val();


if(editedSSN.length!=null)
{
    if(($('#phasedControl_hdnIsSSnValid').val()=="valid") && keynum!=9 && keynum!=13)
    {
     document.getElementById('phasedControl_txtSSN').value="";
        document.getElementById('phasedControl_txtSSN').maxLength=11;
        $('#phasedControl_hdnIsSSnValid').val('invalid');
    }
}


}



function SlideDown(divName)
 {
   $("div#"+divName+":hidden").slideDown("fast"); 
 }
 
 function SlideUp(divName)
 {
    $("div#"+divName+":visible").slideUp("fast");
 }

function findInput(input)
{var inputValue="";
    var index=input.lastIndexOf("|input");
    if(index>-1){
    inputValue=input.substring(0, index);   
 return inputValue;
}
}

