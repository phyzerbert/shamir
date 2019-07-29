/**
 * Author Patrick Corcoran
 * @lastmodified $DateTime: 2005/03/03 15:30:44 $
 * @lastmodifiedby $Author: AndrewL $
 * Version $Change: 173911 $
 * @ignore
 */
if (!PTDate.formats)
{
	/** @private */
	PTDate.formats = new Object();
}

PTDate.formats['en'] 	= new Array(
									'MMM d, yyyy h:mm:ss a',
									'M/d/yyyy h:mm a',
									'MMM d, yyyy h:mm:ss a',
									'MMMM d, yyyy h:mm:ss a z',
									'EEEE, MMMM d, yyyy h:mm:ss a z'
								);


 PTDate.formats['da'] = new Array(
									'dd-MM-yy HH:mm:ss',
									'dd-MM-yy HH:mm',
									'dd-MM-yyyy HH:mm:ss',
									'd. MMMM yyyy HH:mm:ss z',
									'd. MMMM yyyy HH:mm:ss z'
								);
  
PTDate.formats['da_DK'] = new Array(
									'dd-MM-yy HH:mm:ss',
									'dd-MM-yy HH:mm',
									'dd-MM-yyyy HH:mm:ss',
									'd. MMMM yyyy HH:mm:ss z',
									'd. MMMM yyyy HH:mm:ss z'
								);
  
PTDate.formats['fi'] = new Array(
									'd.M.yy HH:mm:ss',
									'd.M.yy HH:mm',
									'd.MMM.yyyy HH:mm:ss',
									'd. MMMM yyyy HH:mm:ss z',
									'd. MMMM yyyy HH:mm:ss z'
								);								
								
 PTDate.formats['fi_FI'] = new Array(
									'dd-MM-yy HH:mm:ss',
									'dd-MM-yy HH:mm',
									'dd-MM-yyyy HH:mm:ss',
									'd. MMMM yyyy HH:mm:ss z',
									'd. MMMM yyyy HH:mm:ss z'
								);

								
PTDate.formats['no'] = new Array(
									'dd.MM.yy HH:mm:ss',
									'dd.MM.yy HH:mm',
									'dd.MMM.yyyy HH:mm:ss',
									'd. MMMM yyyy HH:mm:ss z',
									'd. MMMM yyyy \'kl \' HH:mm z'
								);											


								
PTDate.formats['no_NO'] = new Array(
									'dd.MM.yy HH:mm:ss',
									'dd.MM.yy HH:mm',
									'dd.MMM.yyyy HH:mm:ss',
									'd. MMMM yyyy HH:mm:ss z',
									'd. MMMM yyyy \'kl \' HH:mm z'
								);	

PTDate.formats['nb'] = new Array(
									'dd.MM.yy HH:mm:ss',
									'dd.MM.yy HH:mm',
									'dd.MMM.yyyy HH:mm:ss',
									'd. MMMM yyyy HH:mm:ss z',
									'd. MMMM yyyy \'kl \' HH:mm z'
								);											



PTDate.formats['nb_NO'] = new Array(
									'dd.MM.yy HH:mm:ss',
									'dd.MM.yy HH:mm',
									'dd.MMM.yyyy HH:mm:ss',
									'd. MMMM yyyy HH:mm:ss z',
									'd. MMMM yyyy \'kl \' HH:mm z'
								);			
								
PTDate.formats['nn'] = new Array(
									'dd.MM.yy HH:mm:ss',
									'dd.MM.yy HH:mm',
									'dd.MMM.yyyy HH:mm:ss',
									'd. MMMM yyyy HH:mm:ss z',
									'd. MMMM yyyy \'kl \' HH:mm z'
								);				
																	
PTDate.formats['nn_NO'] = new Array(
									'dd.MM.yy HH:mm:ss',
									'dd.MM.yy HH:mm',
									'dd.MMM.yyyy HH:mm:ss',
									'd. MMMM yyyy HH:mm:ss z',
									'd. MMMM yyyy \'kl \' HH:mm z'
								);				
																
PTDate.formats['sv'] = new Array(
									'yyyy-MM-dd HH:mm:ss',
									'yyyy-MM-dd HH:mm',
									'yyyy-MM-dd HH:mm:ss',
									'\'den \' d MMMM yyyy HH:mm:ss z',
									'\'den \' d MMMM yyyy \'kl \' HH:mm z'
								);											

PTDate.formats['sv_SE'] = new Array(
									'yyyy-MM-dd HH:mm:ss',
									'yyyy-MM-dd HH:mm',
									'yyyy-MM-dd HH:mm:ss',
									'\'den \' d MMMM yyyy HH:mm:ss z',
									'\'den \' d MMMM yyyy \'kl \' HH:mm z'
								);										
																
								
PTDate.formats['tr'] = new Array(
									'dd.MM.yy HH:mm:ss',
									'dd.MM.yy HH:mm',
									'dd.MMM.yyyy HH:mm:ss',
									'dd MMMM yyyy EEEE HH:mm:ss z',
									'dd MMMM yyyy EEEE HH:mm:ss z'
								);		

PTDate.formats['tr_TR'] = new Array(
									'dd.MM.yy HH:mm:ss',
									'dd.MM.yy HH:mm',
									'dd.MMM.yyyy HH:mm:ss',
									'dd MMMM yyyy EEEE HH:mm:ss z',
									'dd MMMM yyyy EEEE HH:mm:ss z'
								);	
								
							
								
PTDate.formats['de'] = new Array(
									'dd.MM.yyyy HH:mm:ss',
									'dd.MM.yyyy HH:mm',
									'dd.MM.yyyy HH:mm:ss',
									'd. MMMM yyyy HH:mm:ss z',
									'EEEE, d. MMMM yyyy H.mm\' Uhr \'z'
								);
								
PTDate.formats['de_AT'] = new Array(
									'dd.MM.yyyy HH:mm:ss',
									'dd.MM.yyyy HH:mm',
									'dd.MM.yyyy HH:mm:ss',
									'dd. MMMM yyyy HH:mm:ss z',
									'EEEE, dd. MMMM yyyy HH.mm\' Uhr \'z'
								);
								
PTDate.formats['de_CH'] = new Array(
									'dd.MM.yyyy HH:mm:ss',
									'dd.MM.yyyy HH:mm',
									'dd.MM.yyyy HH:mm:ss',
									'd. MMMM yyyy HH:mm:ss z',
									'EEEE, d. MMMM yyyy H.mm\' Uhr \'z'
								);
								
PTDate.formats['de_DE'] = new Array(
									'dd.MM.yyyy HH:mm:ss',
									'dd.MM.yyyy HH:mm',
									'dd.MM.yyyy HH:mm:ss',
									'd. MMMM yyyy HH:mm:ss z',
									'EEEE, d. MMMM yyyy H.mm\' Uhr \'z'
								);
								
PTDate.formats['de_LU'] = new Array(
									'dd.MM.yyyy HH:mm:ss',
									'dd.MM.yyyy HH:mm',
									'dd.MM.yyyy HH:mm:ss',
									'd. MMMM yyyy HH:mm:ss z',
									'EEEE, d. MMMM yyyy H.mm\' Uhr \'z'
								);
								
PTDate.formats['en_AU'] = new Array(
									'd/MM/yyyy HH:mm:ss',
									'd/MM/yyyy HH:mm',
									'd/MM/yyyy HH:mm:ss',
									'd MMMM yyyy H:mm:ss',
									'EEEE, d MMMM yyyy hh:mm:ss a z'
								);
								
PTDate.formats['en_CA'] = new Array(
									'd-MMM-yyyy h:mm:ss a',
									'dd/MM/yyyy h:mm a',
									'd-MMM-yyyy h:mm:ss a',
									'MMMM d, yyyy h:mm:ss z a',
									'EEEE, MMMM d, yyyy h:mm:ss \'o\'\'clock\' a z'
								);
								
PTDate.formats['en_GB'] = new Array(
									'dd-MMM-yyyy HH:mm:ss',
									'dd/MM/yyyy HH:mm',
									'dd-MMM-yyyy HH:mm:ss',
									'dd MMMM yyyy HH:mm:ss z',
									'dd MMMM yyyy HH:mm:ss \'o\'\'clock\' z'
								);
								
PTDate.formats['en_IE'] = new Array(
									'dd-MMM-yyyy HH:mm:ss',
									'dd/MM/yyyy HH:mm',
									'dd-MMM-yyyy HH:mm:ss',
									'dd MMMM yyyy HH:mm:ss z',
									'dd MMMM yyyy HH:mm:ss \'o\'\'clock\' z'
								);
								
PTDate.formats['en_NZ'] = new Array(
									'd/MM/yyyy HH:mm:ss',
									'd/MM/yyyy HH:mm',
									'd/MM/yyyy HH:mm:ss',
									'd MMMM yyyy H:mm:ss',
									'EEEE, d MMMM yyyy hh:mm:ss a z'
								);
								
PTDate.formats['en_US'] = new Array(
									'MMM d, yyyy h:mm:ss a',
									'M/d/yyyy h:mm a',
									'MMM d, yyyy h:mm:ss a',
									'MMMM d, yyyy h:mm:ss a z',
									'EEEE, MMMM d, yyyy h:mm:ss a z'
								);
								
PTDate.formats['en_ZA'] = new Array(
									'yyyy/MM/dd hh:mm:ss',
									'yyyy/MM/dd hh:mm',
									'yyyy/MM/dd hh:mm:ss',
									'dd MMMM yyyy hh:mm:ss',
									'dd MMMM yyyy hh:mm:ss a'
								);
								
PTDate.formats['es'] = new Array(
									'dd-MMM-yyyy H:mm:ss',
									'd/MM/yyyy H:mm',
									'dd-MMM-yyyy H:mm:ss',
									'd\' de \'MMMM\' de \'yyyy H:mm:ss z',
									'EEEE d\' de \'MMMM\' de \'yyyy HH\'H\'mm\'\' z'
								);
								
PTDate.formats['es_AR'] = new Array(
									'dd/MM/yyyy HH:mm:ss',
									'dd/MM/yyyy HH:mm',
									'dd/MM/yyyy HH:mm:ss',
									'd\' de \'MMMM\' de \'yyyy H:mm:ss z',
									'EEEE d\' de \'MMMM\' de \'yyyy HH\'h\'\'\'mm z'
								);
								
PTDate.formats['es_BO'] = new Array(
									'dd-MM-yyyy hh:mm:ss a',
									'dd-MM-yyyy hh:mm a',
									'dd-MM-yyyy hh:mm:ss a',
									'd\' de \'MMMM\' de \'yyyy hh:mm:ss a z',
									'EEEE d\' de \'MMMM\' de \'yyyy hh:mm:ss a z'
								);
								
PTDate.formats['es_CL'] = new Array(
									'dd-MM-yyyy hh:mm:ss a',
									'dd-MM-yyyy hh:mm a',
									'dd-MM-yyyy hh:mm:ss a',
									'd\' de \'MMMM\' de \'yyyy hh:mm:ss a z',
									'EEEE d\' de \'MMMM\' de \'yyyy hh:mm:ss a z'
								);
								
PTDate.formats['es_CO'] = new Array(
									'd/MM/yyyy hh:mm:ss a',
									'd/MM/yyyy hh:mm a',
									'd/MM/yyyy hh:mm:ss a',
									'd\' de \'MMMM\' de \'yyyy hh:mm:ss a z',
									'EEEE d\' de \'MMMM\' de \'yyyy hh:mm:ss a z'
								);
								
PTDate.formats['es_CR'] = new Array(
									'dd/MM/yyyy hh:mm:ss a',
									'dd/MM/yyyy hh:mm a',
									'dd/MM/yyyy hh:mm:ss a',
									'd\' de \'MMMM\' de \'yyyy hh:mm:ss a z',
									'EEEE d\' de \'MMMM\' de \'yyyy hh:mm:ss a z'
								);
								
PTDate.formats['es_DO'] = new Array(
									'MM/dd/yyyy hh:mm:ss a',
									'MM/dd/yyyy hh:mm a',
									'MM/dd/yyyy hh:mm:ss a',
									'd\' de \'MMMM\' de \'yyyy hh:mm:ss a z',
									'EEEE d\' de \'MMMM\' de \'yyyy hh:mm:ss a z'
								);
								
PTDate.formats['es_EC'] = new Array(
									'dd/MM/yyyy hh:mm:ss a',
									'dd/MM/yyyy hh:mm a',
									'dd/MM/yyyy hh:mm:ss a',
									'd\' de \'MMMM\' de \'yyyy hh:mm:ss a z',
									'EEEE d\' de \'MMMM\' de \'yyyy hh:mm:ss a z'
								);
								
PTDate.formats['es_GT'] = new Array(
									'd/MM/yyyy hh:mm:ss a',
									'd/MM/yyyy hh:mm a',
									'd/MM/yyyy hh:mm:ss a',
									'd\' de \'MMMM\' de \'yyyy hh:mm:ss a z',
									'EEEE d\' de \'MMMM\' de \'yyyy hh:mm:ss a z'
								);
								
PTDate.formats['es_HN'] = new Array(
									'MM-dd-yyyy hh:mm:ss a',
									'MM-dd-yyyy hh:mm a',
									'MM-dd-yyyy hh:mm:ss a',
									'dd\' de \'MMMM\' de \'yyyy hh:mm:ss a z',
									'EEEE dd\' de \'MMMM\' de \'yyyy hh:mm:ss a z'
								);
								
PTDate.formats['es_MX'] = new Array(
									'd/MM/yyyy hh:mm:ss a',
									'd/MM/yyyy hh:mm a',
									'd/MM/yyyy hh:mm:ss a',
									'd\' de \'MMMM\' de \'yyyy hh:mm:ss a z',
									'EEEE d\' de \'MMMM\' de \'yyyy hh:mm:ss a z'
								);
								
PTDate.formats['es_NI'] = new Array(
									'MM-dd-yyyy hh:mm:ss a',
									'MM-dd-yyyy hh:mm a',
									'MM-dd-yyyy hh:mm:ss a',
									'dd\' de \'MMMM\' de \'yyyy hh:mm:ss a z',
									'EEEE dd\' de \'MMMM\' de \'yyyy hh:mm:ss a z'
								);
								
PTDate.formats['es_PA'] = new Array(
									'MM/dd/yyyy hh:mm:ss a',
									'MM/dd/yyyy hh:mm a',
									'MM/dd/yyyy hh:mm:ss a',
									'd\' de \'MMMM\' de \'yyyy hh:mm:ss a z',
									'EEEE d\' de \'MMMM\' de \'yyyy hh:mm:ss a z'
								);
								
PTDate.formats['es_PE'] = new Array(
									'dd/MM/yyyy hh:mm:ss a',
									'dd/MM/yyyy hh:mm a',
									'dd/MM/yyyy hh:mm:ss a',
									'd\' de \'MMMM\' de \'yyyy hh:mm:ss a z',
									'EEEE d\' de \'MMMM\' de \'yyyy hh:mm:ss a z'
								);
								
PTDate.formats['es_PR'] = new Array(
									'MM-dd-yyyy hh:mm:ss a',
									'MM-dd-yyyy hh:mm a',
									'MM-dd-yyyy hh:mm:ss a',
									'dd\' de \'MMMM\' de \'yyyy hh:mm:ss a z',
									'EEEE dd\' de \'MMMM\' de \'yyyy hh:mm:ss a z'
								);
								
PTDate.formats['es_PY'] = new Array(
									'dd/MM/yyyy hh:mm:ss a',
									'dd/MM/yyyy hh:mm a',
									'dd/MM/yyyy hh:mm:ss a',
									'd\' de \'MMMM\' de \'yyyy hh:mm:ss a z',
									'EEEE d\' de \'MMMM\' de \'yyyy hh:mm:ss a z'
								);
								
PTDate.formats['es_SV'] = new Array(
									'MM-dd-yyyy hh:mm:ss a',
									'MM-dd-yyyy hh:mm a',
									'MM-dd-yyyy hh:mm:ss a',
									'dd\' de \'MMMM\' de \'yyyy hh:mm:ss a z',
									'EEEE dd\' de \'MMMM\' de \'yyyy hh:mm:ss a z'
								);
								
PTDate.formats['es_UY'] = new Array(
									'dd/MM/yyyy hh:mm:ss a',
									'dd/MM/yyyy hh:mm a',
									'dd/MM/yyyy hh:mm:ss a',
									'd\' de \'MMMM\' de \'yyyy hh:mm:ss a z',
									'EEEE d\' de \'MMMM\' de \'yyyy hh:mm:ss a z'
								);
								
PTDate.formats['es_VE'] = new Array(
									'dd/MM/yyyy hh:mm:ss a',
									'dd/MM/yyyy hh:mm a',
									'dd/MM/yyyy hh:mm:ss a',
									'd\' de \'MMMM\' de \'yyyy hh:mm:ss a z',
									'EEEE d\' de \'MMMM\' de \'yyyy hh:mm:ss a z'
								);
								
PTDate.formats['fr'] = new Array(
									'd MMM yyyy HH:mm:ss',
									'dd/MM/yyyy HH:mm',
									'd MMM yyyy HH:mm:ss',
									'd MMMM yyyy HH:mm:ss z',
									'EEEE d MMMM yyyy HH\' h \'mm z'
								);
								
PTDate.formats['fr_BE'] = new Array(
									'dd-MMM-yyyy H:mm:ss',
									'd/MM/yyyy H:mm',
									'dd-MMM-yyyy H:mm:ss',
									'd MMMM yyyy H:mm:ss z',
									'EEEE d MMMM yyyy H\' h \'mm\' min \'ss\' s \'z'
								);
								
PTDate.formats['fr_CA'] = new Array(
									'yyyy-MM-dd HH:mm:ss',
									'yyyy-MM-dd HH:mm',
									'yyyy-MM-dd HH:mm:ss',
									'd MMMM yyyy HH:mm:ss z',
									'EEEE d MMMM yyyy H\' h \'mm z'
								);
								
PTDate.formats['fr_CH'] = new Array(
									'd MMM yyyy HH:mm:ss',
									'dd.MM.yyyy HH:mm',
									'd MMM yyyy HH:mm:ss',
									'd. MMMM yyyy HH:mm:ss z',
									'EEEE, d. MMMM yyyy HH.mm.\' h\' z'
								);
								
PTDate.formats['fr_FR'] = new Array(
									'd MMM yyyy HH:mm:ss',
									'dd/MM/yyyy HH:mm',
									'd MMM yyyy HH:mm:ss',
									'd MMMM yyyy HH:mm:ss z',
									'EEEE d MMMM yyyy HH\' h \'mm z'
								);
								
PTDate.formats['fr_LU'] = new Array(
									'd MMM yyyy HH:mm:ss',
									'dd/MM/yyyy HH:mm',
									'd MMM yyyy HH:mm:ss',
									'd MMMM yyyy HH:mm:ss z',
									'EEEE d MMMM yyyy HH\' h \'mm z'
								);
								
PTDate.formats['it'] = new Array(
									'd-MMM-yyyy H.mm.ss',
									'dd/MM/yyyy H.mm',
									'd-MMM-yyyy H.mm.ss',
									'd MMMM yyyy H.mm.ss z',
									'EEEE d MMMM yyyy H.mm.ss z'
								);
								
PTDate.formats['it_CH'] = new Array(
									'd-MMM-yyyy HH:mm:ss',
									'dd.MM.yyyy HH:mm',
									'd-MMM-yyyy HH:mm:ss',
									'd. MMMM yyyy HH:mm:ss z',
									'EEEE, d. MMMM yyyy H.mm\' h\' z'
								);
								
PTDate.formats['it_IT'] = new Array(
									'd-MMM-yyyy H.mm.ss',
									'dd/MM/yyyy H.mm',
									'd-MMM-yyyy H.mm.ss',
									'd MMMM yyyy H.mm.ss z',
									'EEEE d MMMM yyyy H.mm.ss z'
								);
								
PTDate.formats['ja'] = new Array(
									'yyyy/MM/dd H:mm:ss',
									'yyyy/MM/dd H:mm',
									'yyyy/MM/dd H:mm:ss',
									'yyyy/MM/dd H:mm:ss z',
									'yyyy\'\u5E74\'M\'\u6708\'d\'\u65E5\' H\'\u6642\'mm\'\u5206\'ss\'\u79D2\'z'
								);
								
PTDate.formats['ja_JP'] = new Array(
									'yyyy/MM/dd H:mm:ss',
									'yyyy/MM/dd H:mm',
									'yyyy/MM/dd H:mm:ss',
									'yyyy/MM/dd H:mm:ss z',
									'yyyy\'\u5E74\'M\'\u6708\'d\'\u65E5\' H\'\u6642\'mm\'\u5206\'ss\'\u79D2\'z'
								);
								
PTDate.formats['ko'] = new Array(
									'yyyy-MM-dd a h:mm:ss',
									'yyyy-MM-dd a h:mm',
									'yyyy-MM-dd a h:mm:ss',
									'yyyy\'\uB144\' M\'\uC6D4\' d\'\uC77C\' EE a hh\'\uC2DC\'mm\'\uBD84\'ss\'\uCD08\'',
									'yyyy\'\uB144\' M\'\uC6D4\' d\'\uC77C\' EEEE a hh\'\uC2DC\'mm\'\uBD84\'ss\'\uCD08\' z'
								);
								
PTDate.formats['ko_KR'] = new Array(
									'yyyy-MM-dd a h:mm:ss',
									'yyyy-MM-dd a h:mm',
									'yyyy-MM-dd a h:mm:ss',
									'yyyy\'\uB144\' M\'\uC6D4\' d\'\uC77C\' EE a hh\'\uC2DC\'mm\'\uBD84\'ss\'\uCD08\'',
									'yyyy\'\uB144\' M\'\uC6D4\' d\'\uC77C\' EEEE a hh\'\uC2DC\'mm\'\uBD84\'ss\'\uCD08\' z'
								);

PTDate.formats['nl'] = new Array(
									'd-MMM-yyyy HH:mm:ss',
									'd-M-yy H:mm',
									'd-MMM-yyyy H:mm:ss',
									'd MMMM yyyy HH:mm:ss z',
									'EEEE d MMMM yyyy H.mm\' uur  \'z'
								);

PTDate.formats['nl_BE'] = new Array(
									'd-MMM-yyyy HH:mm:ss',
									'd/MM/yy H:mm',
									'd-MMM-yyyy H:mm:ss',
									'd MMMM yyyy HH:mm:ss z',
									'EEEE d MMMM yyyy H.mm\' uur  \'z'
								);

PTDate.formats['nl_NL'] = new Array(
									'd-MMM-yyyy HH:mm:ss',
									'd-M-yy H:mm',
									'd-MMM-yyyy H:mm:ss',
									'd MMMM yyyy HH:mm:ss z',
									'EEEE d MMMM yyyy H.mm\' uur  \'z'
								);

PTDate.formats['pt'] = new Array(
									'd/MMM/yyyy H:mm:ss',
									'dd-MM-yyyy H:mm',
									'd/MMM/yyyy H:mm:ss',
									'd\' de \'MMMM\' de \'yyyy H:mm:ss z',
									'EEEE, d\' de \'MMMM\' de \'yyyy HH\'H\'mm\'m\' z'
								);
								
PTDate.formats['pt_BR'] = new Array(
									'dd/MM/yyyy HH:mm:ss',
									'dd/MM/yyyy HH:mm',
									'dd/MM/yyyy HH:mm:ss',
									'd\' de \'MMMM\' de \'yyyy H\'h\'m\'min\'s\'s\' z',
									'EEEE, d\' de \'MMMM\' de \'yyyy HH\'h\'mm\'min\'ss\'s\' z'
								);
								
PTDate.formats['pt_PT'] = new Array(
									'd/MMM/yyyy H:mm:ss',
									'dd-MM-yyyy H:mm',
									'd/MMM/yyyy H:mm:ss',
									'd\' de \'MMMM\' de \'yyyy H:mm:ss z',
									'EEEE, d\' de \'MMMM\' de \'yyyy HH\'H\'mm\'m\' z'
								);
								
PTDate.formats['zh'] = new Array(
									'yyyy-M-d H:mm:ss',
									'yyyy-M-d ah:mm',
									'yyyy-M-d H:mm:ss',
									'yyyy\'\u5E74\'M\'\u6708\'d\'\u65E5\' ahh\'\u65F6\'mm\'\u5206\'ss\'\u79D2\'',
									'yyyy\'\u5E74\'M\'\u6708\'d\'\u65E5\' HH\'\u65F6\'mm\'\u5206\'ss\'\u79D2\' z'
								);
								
PTDate.formats['zh_CN'] = new Array(
									'yyyy-M-d H:mm:ss',
									'yyyy-M-d ah:mm',
									'yyyy-M-d H:mm:ss',
									'yyyy\'\u5E74\'M\'\u6708\'d\'\u65E5\' ahh\'\u65F6\'mm\'\u5206\'ss\'\u79D2\'',
									'yyyy\'\u5E74\'M\'\u6708\'d\'\u65E5\' HH\'\u65F6\'mm\'\u5206\'ss\'\u79D2\' z'
								);
								
PTDate.formats['zh_HK'] = new Array(
									'yyyy\'\u5E74\'M\'\u6708\'d\'\u65E5\' ahh:mm:ss',
									'yyyy\'\u5E74\'M\'\u6708\'d\'\u65E5\' ah:mm',
									'yyyy\'\u5E74\'M\'\u6708\'d\'\u65E5\' ahh:mm:ss',
									'yyyy\'\u5E74\'MM\'\u6708\'dd\'\u65E5\' EEEE ahh\'\u6642\'mm\'\u5206\'ss\'\u79D2\'',
									'yyyy\'\u5E74\'MM\'\u6708\'dd\'\u65E5\' EEEE ahh\'\u6642\'mm\'\u5206\'ss\'\u79D2\' z'
								);
								
PTDate.formats['zh_TW'] = new Array(
									'yyyy/M/d a hh:mm:ss',
									'yyyy/M/d a h:mm',
									'yyyy/M/d a hh:mm:ss',
									'yyyy\'\u5E74\'M\'\u6708\'d\'\u65E5\' ahh\'\u6642\'mm\'\u5206\'ss\'\u79D2\'',
									'yyyy\'\u5E74\'M\'\u6708\'d\'\u65E5\' ahh\'\u6642\'mm\'\u5206\'ss\'\u79D2\' z'
								);