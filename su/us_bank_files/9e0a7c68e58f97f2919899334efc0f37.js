Bootstrapper.bindDependencyImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;window.s.pageName="Personal Home Page";window.s.prop1="home pg";window.s.prop2="home page rebranded";window.s.prop40="dotcom";window.s.prop30=Bootstrapper.data.resolve(46844);window.s.eVar27=Bootstrapper.pcIdValue?Bootstrapper.pcIdValue:"";setTimeout(function(){$("#emergencyAlert a").on("click",function(){if($(this).text()=="here"){s.linkTrackVars=s.linkTrackVars+
",prop53";s.prop53="usb:personal home page:previous version of home page link";s.tl(window,"o","usb:personal home page:previous version of home page link")}});$(document).on("click",'a[alt\x3d"Log in to desktop site"]',function(){s.prop53=s.pageName+":log in to desktop site link";window.s.linkTrackVars="prop53";s.tl(window,"o",s.prop53,null,"navigate")})},2E3);s.t();Bootstrapper.insightSensor()},2471255,[2934901],457438,[386052]);
Bootstrapper.bindDOMParsed(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;var ac_LPID=typeof visitor=="object"&&typeof visitor.cookieRead=="function"?visitor.cookieRead("riblpid"):"";if(!ac_LPID);else{jQuery('\x3cdiv style\x3d"display:none" id\x3d"Offer1"\x3eEnsighten NBA Offer1 homePage\x3c/div\x3e\x3cdiv style\x3d"display:none" id\x3d"Offer2"\x3eEnsighten NBA Offer2 homePage\x3c/div\x3e').appendTo("body");if(typeof Storage!=="undefined"){var count=
1;var localStorageFlagTimer=setInterval(function(){var localStoreInfo=localStorage.getItem(ac_LPID);localStoreInfo=localStoreInfo?JSON.parse(localStoreInfo):{};var callCampaign="",acCallTimeStamp="",currentTimestamp=(new Date).getTime();if(localStoreInfo!=null){callCampaign=localStoreInfo.getOfferFromCampaign;acCallTimeStamp=localStoreInfo.currentTime}console.log("Received flag from Campaign -\x3e "+callCampaign);if(callCampaign==true||currentTimestamp-acCallTimeStamp>7*24*60*60*1E3){clearInterval(localStorageFlagTimer);
console.log("*** Campaign Call Made, Flag -\x3e "+callCampaign);callAC(ac_LPID);storeTimeStampOfACCall(ac_LPID)}else if(!callCampaign&&callCampaign!=null){clearInterval(localStorageFlagTimer);var localObject=localStorage.getItem(ac_LPID),acOfferDivs=[];localObject=JSON.parse(localObject);console.log("*** Campaign Call Blocked, Flag -\x3e "+callCampaign);acOfferDivs=localObject?localObject.offerDivsToInsert:[];if(acOfferDivs&&acOfferDivs.length>0&&acOfferDivs.length<=2)for(var j=1;j<=2;j++)$("#Offer"+
j).append(acOfferDivs[j-1])}else if(count>5){clearInterval(localStorageFlagTimer);console.log("*** Local Storage Flag Not Available...")}count++},1E3)}}function storeTimeStampOfACCall(ac_LPID){if(typeof Storage!=="undefined"){var currentObj=JSON.parse(localStorage.getItem(ac_LPID));currentObj.currentTime=(new Date).getTime();localStorage.setItem(ac_LPID,JSON.stringify(currentObj))}}function callAC(ac_LPID){var sCtx="\x3cinteraction hashLPID \x3d '"+ac_LPID+"'/\x3e";interactionGlobalCtx=sCtx;interactionDivs=
{};interactionDivs.Offer1={space:"homePage"};interactionDivs.Offer2={space:"homePage"};interactionTarget=ac_LPID;var script=document.createElement("script");script.setAttribute("src","https://usbank.campaign.adobe.com/nl/interactionProposal.js?env\x3dliveRcp");script.setAttribute("type","text/javascript");script.setAttribute("id","interactionProposalScript");script.setAttribute("async",true);document.getElementsByTagName("body")[0].appendChild(script)}},2006918,483516);
Bootstrapper.bindDOMLoaded(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;var linkName;var ariaLabelValue;function linkTrack(title){s.linkTrackVars=s.linkTrackVars+",prop53";s.prop53=s.pageName+":"+title;s.tl(window,"o",s.prop53,null,"navigate")}function ScTag(linkName){if(linkName=="get the app")linkTrack("o\x26m header spotlight click");else if(linkName=="student banking options")linkTrack("c\x26s header spotlight click");else if(linkName==
"pay with your mobile device"||linkName=="mobile purchasing")linkTrack("cc header spotlight click");else if(linkName=="first-time homebuyer help")linkTrack("m\x26r header spotlight click");else if(linkName=="track your application")linkTrack("l\x26cl header spotlight click");else if(linkName=="why invest with u.s. bank")linkTrack("i\x26wm header spotlight click")}if($(".sr-only a")[0])$(".sr-only a").click(function(){linkTrack("hotkey alt+h")});if($(".globalNav a")[0])$(".globalNav a").click(function(){linkName=
$(this).text().toLowerCase().replace(/\s+/g," ");ScTag(linkName)});if($(".red-circular-arrow-icon")[0])$(".red-circular-arrow-icon").parent().click(function(){ariaLabelValue=$(this).attr("aria-label").toLowerCase().replace(/\s+/g," ");ScTag(ariaLabelValue)})},2058950,490672);