Bootstrapper.bindDOMParsed(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;setTimeout(function(){if(Bootstrapper.ensightenOptions.publishPath!="gss_dev"){var additionalData="";var keyValueObject={};keyValueObject.adobeid_old=document.cookie.match(/s_vi=[^;]*/i)?document.cookie.match(/s_vi=[^;]*/i)[0].split(/[\|,\[]/)[2]:"";keyValueObject.adobeid_new=window.Visitor?Visitor.getInstance(visitor.marketingCloudOrgID).getMarketingCloudVisitorID():"";
for(var i in keyValueObject)if(keyValueObject[i])additionalData+=i+"\x3d"+keyValueObject[i]+",";additionalData=additionalData.slice(0,-1);if(additionalData)Bootstrapper.imageRequest("//di.rlcdn.com/452709.gif?pdata\x3d"+encodeURIComponent(additionalData));else Bootstrapper.imageRequest("//di.rlcdn.com/452709.gif")}},1E3)},2819128,448718);