
function fnCodeToPaste(tagString,prop18) {

	s.clearVars();
	if(tagString != null){
		var tagArray = tagString.split('^');
		s.prop6 = tagArray[0];
		s.pageName = tagArray[1];
		
		s.hier1 = tagArray[2];
		
		if(tagArray[3] != null && tagArray[3] != ""){
			s.prop3 = tagArray[3];			
		}		

		if(tagArray[4] != null && tagArray[4] != ""){
			s.eVar11 = tagArray[4];	
		}

		if(tagArray[5] != null && tagArray[5] != ""){
			s.events = tagArray[5];
		}

		if(tagArray[6] != null && tagArray[6] != ""){
			s.prop16 = tagArray[6];	
		}
	}
	if(prop18 != null){
		s.prop18 = prop18;
	}
	var s_code=s.t();
}

function fnCodeToPaste_tl_SelfService(obj, objID, value){
	s.clearVars();
	s.prop3 = value;
	s.linkTrackVars=s.apl(s.linkTrackVars,'prop3',',',2);
	s.linkTrackEvents='None';
	var s_code=s.tl(obj,'o', objID);


}

function fnCodeToPaste_tl_Download(obj, objID){

            s.clearVars();
            
            s.linkTrackVars='None';

            s.linkTrackEvents='None';

            var s_code=s.tl(obj,'d', objID);

}

function fnCodeToPaste_tl_Exit(obj, objID){

            s.clearVars();
            
            s.linkTrackVars='None';

            s.linkTrackEvents='None';

            var s_code=s.tl(obj,'e', objID);

}

function fnCodeToPaste_tl_Custom(obj, objID){

            s.clearVars();
            
            s.linkTrackVars='None';

            s.linkTrackEvents='None';

            var s_code=s.tl(obj,'o', objID);

}

function fnCodeToPaste_DMA_Both(obj){

	if(obj == "IphoneDwnld"){
		s.clearVars();
		s.linkTrackVars="eVar3,prop3,events";
		s.linkTrackEvents='event3';
		s.pageName = "STcom|OLB|CustServ|DownloadAppCntr|IphoneDwnld";
		s.prop3=s.eVar3="OLB|DownloadAppCntr|IphoneDwnld"; 
		var s_code=s.tl(true,'o','DownloadAppCntr|IphoneDwnld');
	}

	else if(obj == "AndroidDwnld"){
		s.clearVars();
		s.linkTrackVars="eVar3,prop3,events";
		s.linkTrackEvents='event3';
		s.pageName = "STcom|OLB|CustServ|DownloadAppCntr|AndroidDwnld";
		s.prop3=s.eVar3="OLB|DownloadAppCntr|AndroidDwnld"; 
		var s_code=s.tl(true,'o','DownloadAppCntr|AndroidDwnld');
	}
}

function fnCodeToPaste_OLBFlexFunds(objlink){

	if(objlink == "RequestAdvance"){
		s.clearVars();
		s.linkTrackVars="eVar3,prop3,events";
		s.linkTrackEvents='event3';
		s.pageName = "STcom|OLB|Accts|OLBFlexFunds";
		s.prop3=s.eVar3="OLB|FlexFunds|RequestAdvance"; 
		var s_code=s.tl(this,'o','OLB|FlexFunds|RequestAdvance');
	}
	else if(objlink == "ManageAcct"){
		s.clearVars();
		s.linkTrackVars="eVar3,prop3,events";
		s.linkTrackEvents='event3';
		s.pageName = "STcom|OLB|Accts|OLBFlexFunds";		
		s.prop3=s.eVar3="OLB|FlexFunds|ManageAcct"; 		
		var s_code=s.tl(this,'o','OLB|FlexFunds|ManageAcct');
	}
	else if(objlink == "LearnMore"){
		s.clearVars();
		s.linkTrackVars="eVar3,prop3,events";
		s.linkTrackEvents='event3';
		s.pageName = "STcom|OLB|Accts|OLBFlexFunds";		
		s.prop3=s.eVar3="OLB|FlexFunds|LearnMore";		 
		var s_code=s.tl(this,'o','OLB|FlexFunds|LearnMore');
	}


}
