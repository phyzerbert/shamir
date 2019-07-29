
PTWCControl_3_1.responseIdStr = "<!-- ptwc:";
PTWCControl_3_1.startSpanIdStr = "PTPortletSPAN_";
PTWCControl_3_1.errorSpanIdStr = "PTPortletErrorSPAN_";
PTWCControl_3_1.doPostBack = function(uid, formName, eventTarget, eventArgument, extraArgs)
{
	var theform;
	theform = document.forms[formName];
	if(theform.__EVENTTARGET) {
		theform.__EVENTTARGET.value = eventTarget.split("$").join(":");
		theform.__EVENTTARGET.value = PTWCControl_3_1.restoreFormNames(theform.__EVENTTARGET.value, uid);
	}
	if(theform.__EVENTARGUMENT)
		theform.__EVENTARGUMENT.value = eventArgument;
	var spanId = PTWCControl_3_1.startSpanIdStr + uid;
	PTWCControl_3_1.formPost(uid, theform, spanId, extraArgs, false);
}

PTWCControl_3_1.restoreFormNames = function(formName, uid)
{
	var rgxp = new RegExp('_'+uid);
	if ( formName && -1 != formName.indexOf('_'+uid) )
	{   
		formName = formName.replace(rgxp, '');	
	}
	return formName;
}

PTWCControl_3_1.formPost = function(uid, theForm, rerenderSpan, extraArgs, omitResponseCheck)
{
	var len = theForm.elements.length
	for ( var i = 0; i < len; i++ ) 
	{
		var elem = theForm.elements[i];
		if ( elem )
			elem.name = PTWCControl_3_1.restoreFormNames(elem.name, uid);
	}
	if(rerenderSpan.tagName && rerenderSpan.tagName == "SPAN")
	{
		var spanId = rerenderSpan.ID;
	}
	else 
	{
		var spanId = rerenderSpan;
	}
	var control = PTWCControl_3_1.getPTWCHandler(uid);
	if(control.shouldInlineSubmit(spanId, theForm))
	{
		control.span = document.getElementById(spanId);
		control.errorSpan = document.getElementById(PTWCControl_3_1.errorSpanIdStr + uid);
		if(extraArgs)
		{
			control.setProperty("extraArgs", extraArgs, false);
		}
		else
		{
			control.setProperty("extraArgs", "", false);
		}
		control.post(theForm, omitResponseCheck);
	}
	else 
	{
		theForm.submit();
	}
}

PTWCControl_3_1.handleFormPostResponse = function(response)
{
	return PTWCControl_3_1.getPTWCHandler(response.request.repaintId).handleResponse(response);
}

PTWCControl_3_1.getGatewayPrependMinLen = function()
{if(this.isPortal50())
	   return 700;else
	   return 1497;
}

PTWCControl_3_1.getPTWCHandler = function(uid)
{
	var map = PTWCControl_3_1.getControlMap();
	var handler = map[uid];
	if(!handler)
	{
		handler = new PTWCControl_3_1(uid);
		map[uid] = handler;
	}
	return handler; 
}

PTWCControl_3_1.controlMap;
PTWCControl_3_1.getControlMap = function()
{
	if (PTWCControl_3_1.controlMap == null)
		PTWCControl_3_1.controlMap = new Object();
	return PTWCControl_3_1.controlMap;
}

function PTWCControl_3_1(uid)
{
	this.uid = uid;
	this.requestProperties = new Object();
	this.portletProperties = new Object();
	return this;
}

PTWCControl_3_1.prototype.getProperty = function(key)
{
	if(typeof(this.requestProperties[key]) != "undefined")
		return this.requestProperties[key];
	else
		return this.portletProperties[key];
}

PTWCControl_3_1.prototype.getPropertyWithDefault = function(key, defaultValue)
{
	if(typeof(this.getProperty(key)) != "undefined")
		return this.getProperty(key);
	else
		return defaultValue;
}

PTWCControl_3_1.prototype.setProperty = function(key, newValue, persist)
{
	if(persist)
		this.portletProperties[key] = newValue;
	else
		this.requestProperties[key] = newValue;
}

PTWCControl_3_1.prototype.post = function(theForm, omitResponseCheck)
{
	var formAction = theForm.action;
	var formRequest = new PTHTTPPOSTRequest(formAction, theForm, this.span);
	formRequest.responsePreProcHandler = PTWCControl_3_1.responsePreProcHandler;
	formRequest.responsePostProcHandler = PTWCControl_3_1.responsePostProcHandler;
	if(this.getProperty("extraArgs"))
	{
		var extra = this.getProperty("extraArgs");
		if(extra.length > 0)
			formRequest.formDataSet += "&" + extra;
	}
	if(typeof(this.getProperty("omitResponseCheck")) == "undefined")
	{
		this.setProperty("omitResponseCheck", omitResponseCheck ? true : false, false);
	}
	formRequest.repaintId = this.uid;
	formRequest.invoke();
}

PTWCControl_3_1.responsePreProcHandler = function(response)
{
	return PTWCControl_3_1.getPTWCHandler(response.request.repaintId).responsePreProcHandler(response);
}

PTWCControl_3_1.responsePostProcHandler = function(response)
{
	return PTWCControl_3_1.getPTWCHandler(response.request.repaintId).responsePostProcHandler(response);
}

PTWCControl_3_1.prototype.responsePreProcHandler = function(response)
{
	var handleResponse = true;
	var allowRedraw = true;
	if(this.getProperty("userResponseHandler"))
		handleResponse = this.getProperty("userResponseHandler")(response);
	if(handleResponse)
	{
		if(response.status == 500)
		{
			response.type = PTHTTPResponse.RESPONSE_TYPE_PORTLET_ERROR;
			var regex = /<span><H1>(.*)<hr width=100%/;
			var found = regex.exec(response.responseText);
			var errorMsg = "";
			if(found && found.length > 1)
				errorMsg = found[1];
			this.raiseError(errorMsg);
			allowRedraw = false;
		}
		else if(response.status == 204 || response.status == 1223) 
		{
			response.type = PTHTTPResponse.RESPONSE_TYPE_EMPTY_RESPONSE;
			this.errorSpan.innerHTML = '';
			allowRedraw = false;
		}
		else 
		{
			if((this.getProperty("omitResponseCheck") == true) || this.validateResponseAndSetHeaders(response))
			{
				response.type = PTHTTPResponse.RESPONSE_TYPE_OK;
			}
			else 
			{
				var errorBlock = response.responseXML.getElementsByTagName("error");
				if(errorBlock) {
					var fields = errorBlock.item(0).getElementsByTagName("field");
					var errorMsg = "";
					for(i=0; i<fields.length; ++i) {
						if( fields[i].firstChild.text == "Error Message" ) {
							errorMsg = fields[i].lastChild.text;
							break;
						}
					}
					this.raiseError(errorMsg);
					allowRedraw = false;
				} 
				else
				{ 
					if(PTWCControl_3_1.isPortal50()) {
						var regex = /<span class="alertErrorDescription" >(.*)<\/span>/;  
						var timeoutRegex = /Error info: \[-2147203532:/;
						var isTimeout = timeoutRegex.exec(response.responseText);
						if(isTimeout)
						{
							response.type = PTHTTPResponse.RESPONSE_TYPE_PORTLET_TIMEOUT
						}
						else
						{
							response.type = PTHTTPResponse.RESPONSE_TYPE_SERVER_ERROR;
						}
					}
					else 
					{
						var regex = /<br><strong>(.*)<\/strong>/;
						response.type = PTHTTPResponse.RESPONSE_TYPE_SERVER_ERROR; 
					}
					var found = regex.exec(response.responseText);
					var errorMsg = "";
					if(found && found.length > 1)
					{
						errorMsg = found[1];
						//add [Portlet Timeout] if we know it's a timeout and we're running in english
						if(response.type == PTHTTPResponse.RESPONSE_TYPE_PORTLET_TIMEOUT)
							errorMsg += " [" + this.getTimeoutMsg() + "]";
					}
					else
					{
						errorMsg = this.getPropertyWithDefault("defaultErrorMessage", this.getDefaultErrorMessage());
					}
					this.raiseError(errorMsg);
					allowRedraw = false;
				}
			}
		}
	}
	this.requestProperties = new Object();
	return handleResponse && allowRedraw;
}

PTWCControl_3_1.prototype.responsePostProcHandler = function(response)
{
	if(PTWCControl_3_1.validateResponse(response))
		this.initValidators();	
	window.setTimeout("PTWCControl_3_1.raiseRerenderEvent(" + this.uid + ")", 1);
}

PTWCControl_3_1.prototype.initValidators = function()
{
	var funcName = "PTValidate_" + this.uid;
	if(window[funcName])
	{
		window[funcName]();
	}
}

PTWCControl_3_1.isPortal50 = function()
{
	if(document.PCC)
		return true;
	else
		return false;
}

PTWCControl_3_1.raiseRerenderEvent = function(uid)
{
	if(PTWCControl_3_1.isPortal50())
	{
		document.PCC.RaiseEvent(document.PCC.WindowEventURN, "rerender." + uid);
	}
	else 
	{
		document.GCC.RaiseEvent(document.GCC.WindowEventURN, "rerender." + uid);
	}
}

PTWCControl_3_1.prototype.raiseError = function(messageHTML)
{
	var errorSpan = document.getElementById(PTWCControl_3_1.errorSpanIdStr + this.uid);
	var html = "<p><span class=\"alertErrorTitle\">";
	if(PT_WC_IMAGESERVER)
		html += "<img src=\"" + PT_WC_IMAGESERVER + "/plumtree/portal/public/img/icon_error.gif\" alt=\"Error\" border=\"0\" height=\"20\" width=\"20\"></img>&nbsp;"
	html += messageHTML;
	html += "</span></p>";
	errorSpan.innerHTML = html;
}

PTWCControl_3_1.prototype.setPTWCHeaders = function(response, index)
{
	if(this.getProperty("headersParsed") == true)
		return;
	if(typeof(index) == "undefined")
		var index = PTWCControl_3_1.ptwcTagIndex(response);
	if(index < 0) return;
	var endIdx = response.responseText.indexOf("-->", index);
	var rawHeader = response.responseText.substring(index + PTWCControl_3_1.responseIdStr.length, endIdx);
	var pairs = rawHeader.split("&");
	for(var i = 0; i < pairs.length; i++)
	{
		var nameAndValue = pairs[i].split("=");
		this.setProperty(nameAndValue[0], nameAndValue[1]);
	}
	this.setProperty("headersParsed", true);
}

PTWCControl_3_1.prototype.lateParseControlVars = function()
{
	if(this.getProperty("headersParsed") == true)
		return;
	var span = document.getElementById(PTWCControl_3_1.startSpanIdStr + this.uid);
	var parent = PTWCControl_3_1.getParent(span);
	var ctrl = PTWCControl_3_1.getPTWCHandler(this.uid);
	var fakeResponse = new Object();
	fakeResponse.responseText = parent.innerHTML;
	ctrl.setPTWCHeaders(fakeResponse);
}

PTWCControl_3_1.prototype.validateResponseAndSetHeaders = function(response)
{  
	var idx = PTWCControl_3_1.ptwcTagIndex(response);
	this.setPTWCHeaders(response, idx);
	return idx >= 0;
}

PTWCControl_3_1.validateResponse = function(response)
{  
	return PTWCControl_3_1.ptwcTagIndex(response) > -1;
}

PTWCControl_3_1.ptwcTagIndex = function(response)
{
	var idIndex;
	var strStart = response.responseText.substring(0, PTWCControl_3_1.responseIdStr.length)
	if (strStart == PTWCControl_3_1.responseIdStr)
	{
		return 0;
	}
	var idIndex = response.responseText.indexOf(PTWCControl_3_1.responseIdStr, PTWCControl_3_1.getGatewayPrependMinLen());
	return idIndex;
}

PTWCControl_3_1.getBrowserLang = function()
{
	var lang;
	if( navigator.language )
	{
		lang = navigator.language;
	}
	else
	{
		if( navigator.browserLanguage )
		{
			lang = navigator.browserLanguage;
		}
		else
		{
			lang = "en";
		}
	} 
	return lang.substring(0, 2);
}

PTWCControl_3_1.prototype.shouldInlineSubmit = function(spanId, theForm)
{
	if(typeof(this.getProperty("forceinlinesubmit")) != "undefined")
		return this.getProperty("forceinlinesubmit");
	return PTWCControl_3_1.inlineSubmit(spanId, theForm);
}

PTWCControl_3_1.getParent = function(span)
{
	var IEVer = PTCommonUtil.getIEVersion();
	var parent;
	if(IEVer > 0 && IEVer < 5)
	{
		parent = span.parentElement;
	}
	else
	{
		parent = span.parentNode;
	}
	return parent; 
}

PTWCControl_3_1.inlineSubmit = function(spanId, theForm)
{
	var span;
	if(spanId.tagName && spanId.tagName == "SPAN")
		span = spanId;
	else
		span = document.getElementById(spanId);
	//don't submit multi-part forms
	if(theForm.encoding && theForm.encoding == "multipart/form-data")
		return false;
	if(theForm.enctype && theForm.enctype == "multipart/form-data")
		return false;
	return PTWCControl_3_1.validSpan(span);
}

PTWCControl_3_1.buttonInlineSubmit = function(uid, fid, formName)
{
	var theForm = document.getElementById(formName);
	var spanId = PTWCControl_3_1.startSpanIdStr + uid;
	if(PTWCControl_3_1.inlineSubmit(spanId, theForm))
	{
		if(eval("typeof(Page_ClientValidate_" + fid + ") == 'function'"))
		{
			if(eval("typeof(PTValidate_" + uid + ") == 'function'"))
				if(eval("PTValidate_" + uid + "()"))
					if(eval("Page_ClientValidate_" + fid) + "()")
						return eval("ValidatorCommonOnSubmit_" + fid + "()");
		}
		return true;
	}
	return false;
}

PTWCControl_3_1.validSpan = function(span)
{
	if(span)
	{
		var parent = PTWCControl_3_1.getParent(span);
		if(parent)
		{
			if(parent.id && parent.id.length > PTWCControl_3_1.startSpanIdStr.length)
			{
				var spanIdPrefix = parent.id.substring(0, PTWCControl_3_1.startSpanIdStr.length);
				if(spanIdPrefix == PTWCControl_3_1.startSpanIdStr)
					return PTWCControl_3_1.validSpan(parent);
			}	
			if(PTWCControl_3_1.isPortal50()) 
			{
				if(parent.tagName == "DIV")
					return true;
			}
			else 
			{
				if(parent.tagName == "TD")
					if(parent.className == "gNarrowContentSection" || parent.className == "gContentSection") 
						return true;
			}
		}
	}
	return false;
}

PTWCControl_3_1.extraArgs = function(element, type, clickevent)
{
	if(type == "image")
	{
		if(PTCommonUtil.getIEVersion() > 0)
		{
			var Xcoord = clickevent.clientX - element.offsetLeft;
			var Ycoord = clickevent.clientY - element.offsetTop;
		}
		else
		{
			var Xcoord = clickevent.pageX - element.offsetLeft;
			var Ycoord = clickevent.pageY - element.offsetTop;
		}
		return PTStringUtil.encodeURL(element.name) + ".x=" + PTStringUtil.encodeURL(Xcoord) + "&" + PTStringUtil.encodeURL(element.name) + ".y=" + PTStringUtil.encodeURL(Ycoord);
	}
	else 
	{
		if(type == "submit")
		{
			return PTStringUtil.encodeURL(element.name) + "=" + PTStringUtil.encodeURL(element.value);
		}
		else 
		{
			return "";
		}
	}
}

PTWCControl_3_1.prototype.getDefaultErrorMessage = function()
{
	return this.getErrorTitle() + "<br/>" + this.getErrorDescription();
}

PTWCControl_3_1.prototype.getErrorTitle = function()
{return PTWCControl_3_1.error_title[this.getLang()];
}

PTWCControl_3_1.prototype.getErrorDescription = function(lang)
{return PTWCControl_3_1.error_desc[this.getLang()];
}

PTWCControl_3_1.prototype.getLang = function()
{
	this.lateParseControlVars();
	var locale = this.getProperty("locale");
	if(typeof(locale) == "undefined" || locale.length < 2)
		return "en";
	else
		return locale.substring(0, 2).toLowerCase();
}

PTWCControl_3_1.prototype.getTimeoutMsg = function()
{var rawStr = PTWCControl_3_1.timeoutMsg[this.getLang()];var name = PTWCControl_3_1.portletName[this.getLang()];var idx = rawStr.indexOf("{0}");var newStr = rawStr.substring(0, idx) + name + rawStr.substring(idx + 3);return newStr;
}

if(!window.PTWCControl_3_1.error_title){ PTWCControl_3_1.error_title = new Object(); }
PTWCControl_3_1.error_title["de"] = "Fehler";
PTWCControl_3_1.error_title["en"] = "Error";
PTWCControl_3_1.error_title["es"] = "Error";
PTWCControl_3_1.error_title["fr"] = "Erreur";
PTWCControl_3_1.error_title["it"] = "Errore";
PTWCControl_3_1.error_title["ja"] = "ã‚¨ãƒ©ãƒ¼";
PTWCControl_3_1.error_title["ko"] = "ì˜¤ë¥˜";
PTWCControl_3_1.error_title["pt"] = "Erro";
PTWCControl_3_1.error_title["zh"] = "é”™è¯¯";
if(!window.PTWCControl_3_1.error_desc){ PTWCControl_3_1.error_desc = new Object(); }
PTWCControl_3_1.error_desc["de"] = "Wir empfehlen Ihnen Folgendes:<br/>&bull;Aktualisieren Sie die Seite.<br/>&bull;Wenden Sie sich an den Portal-Administrator, wenn die Probleme wiederholt auftreten.<br/>&bull;Greifen Sie spÃ¤ter noch einmal auf dieses Portlet zu.";
PTWCControl_3_1.error_desc["en"] = "We Recommend:<br/>&bull;Refreshing the page.<br/>&bull;Contacting your Portal administrator if problems persist.<br/>&bull;Accessing this Portlet at a later time.";
PTWCControl_3_1.error_desc["es"] = "RecomendaciÃ³n:<br/>&bull;Actualizar la pÃ¡gina.<br/>&bull;Ponerse en contacto con el administrador del portal si los problemas continÃºan.<br/>&bull;Acceder a este portlet mÃ¡s adelante.";
PTWCControl_3_1.error_desc["fr"] = "Nous recommandons :<br/>&bull;Actualiser la page.<br/>&bull;Contacter lâ€™administrateur du portail si le problÃ¨me persiste.<br/>&bull;AccÃ©der Ã  ce portail plus tard.";
PTWCControl_3_1.error_desc["it"] = "Si raccomanda:<br/>&bull;Aggiornamento pagina in corso.<br/>&bull;Contattare lâ€™amministratore del portale se i problemi persistono.<br/>&bull;Accedere a questo Portlet in un momento successivo.";
PTWCControl_3_1.error_desc["ja"] = "æ¬¡ã?®æ“?ä½œã‚’è¡Œã?£ã?¦ã??ã? ã?•ã?„:<br/>&bull;ãƒšãƒ¼ã‚¸ã‚’æ›´æ–°ã?™ã‚‹<br/>&bull;å•?é¡Œã?Œè§£æ±ºã?—ã?ªã?„å ´å?ˆã?¯ã€?ãƒ?ãƒ¼ã‚¿ãƒ«ç®¡ç?†è€…ã?«é€£çµ¡ã?™ã‚‹<br/>&bull;å¾Œã?§ã?“ã?®ãƒ?ãƒ¼ãƒˆãƒ¬ãƒƒãƒˆã?«ã‚¢ã‚¯ã‚»ã‚¹ã?™ã‚‹";
PTWCControl_3_1.error_desc["ko"] = "ê¶Œìž¥ ì‚¬í•­:<br/>&bull;íŽ˜ì?´ì§€ë¥¼ ìƒˆë¡œ ê³ ì¹˜ì‹­ì‹œì˜¤.<br/>&bull;ë¬¸ì œê°€ ì§€ì†?ë?˜ë©´ í?¬í„¸ ê´€ë¦¬ìž?ì—?ê²Œ ë¬¸ì?˜í•˜ì‹­ì‹œì˜¤.<br/>&bull;ë‚˜ì¤‘ì—? ì?´ í?¬í‹€ë¦¿ì—? ì ‘ì†?í•˜ì‹­ì‹œì˜¤.";
PTWCControl_3_1.error_desc["pt"] = "Ã‰ recomendÃ¡vel:<br/>&bull;Atualizar a pÃ¡gina.<br/>&bull;Entrar em contato com o administrador do portal se os problemas persistirem.<br/>&bull;Acessar este portlet mais tarde.";
PTWCControl_3_1.error_desc["zh"] = "æˆ‘ä»¬æŽ¨è??ï¼š<br/>&bull;åˆ·æ–°é¡µé?¢ã€‚<br/>&bull;å¦‚æžœä»?ç„¶å‡ºçŽ°é—®é¢˜ï¼Œè¯·ä¸Žé—¨æˆ·ç½‘ç«™ç®¡ç?†å‘˜è?”ç³»ã€‚<br/>&bull;ç¨?å?Žè®¿é—®æ­¤ Portletã€‚";
if(!window.PTWCControl_3_1.timeoutMsg){ PTWCControl_3_1.timeoutMsg = new Object(); }
PTWCControl_3_1.timeoutMsg["de"] = "{0} kann wegen eines Timeout-Fehlers nicht angezeigt werden.";
PTWCControl_3_1.timeoutMsg["en"] = "{0} cannot be displayed due to a timeout error.";
PTWCControl_3_1.timeoutMsg["es"] = "{0} no se puede mostrar debido a un error de tiempo de espera.";
PTWCControl_3_1.timeoutMsg["fr"] = "{0} ne peut pas Ãªtre affichÃ© en raison dâ€™une erreur de dÃ©lai dâ€™attente.";
PTWCControl_3_1.timeoutMsg["it"] = "Impossibile visualizzare {0} a causa di un errore di timeout.";
PTWCControl_3_1.timeoutMsg["ja"] = "ã‚¿ã‚¤ãƒ ã‚¢ã‚¦ãƒˆ ã‚¨ãƒ©ãƒ¼ã?®ã?Ÿã‚? {0} ã‚’è¡¨ç¤ºã?§ã??ã?¾ã?›ã‚“ã€‚";
PTWCControl_3_1.timeoutMsg["ko"] = "íƒ€ìž„ì•„ì›ƒ ì˜¤ë¥˜ë¡œ ì?¸í•´ {0}ì?„(ë¥¼) í‘œì‹œí•  ìˆ˜ ì—†ìŠµë‹ˆë‹¤.";
PTWCControl_3_1.timeoutMsg["pt"] = "{0} nÃ£o pode ser exibido devido a um erro de tempo limite.";
PTWCControl_3_1.timeoutMsg["zh"] = "å› è¶…æ—¶é”™è¯¯è€Œæ— æ³•æ˜¾ç¤º {0}ã€‚";
if(!window.PTWCControl_3_1.portletName){ PTWCControl_3_1.portletName = new Object(); }
PTWCControl_3_1.portletName["de"] = "Portlet";
PTWCControl_3_1.portletName["en"] = "Portlet";
PTWCControl_3_1.portletName["es"] = "Portlet";
PTWCControl_3_1.portletName["fr"] = "Portlet";
PTWCControl_3_1.portletName["it"] = "Portlet";
PTWCControl_3_1.portletName["ja"] = "ãƒ?ãƒ¼ãƒˆãƒ¬ãƒƒãƒˆ";
PTWCControl_3_1.portletName["ko"] = "í?¬í‹€ë¦¿";
PTWCControl_3_1.portletName["pt"] = "Portlet";
PTWCControl_3_1.portletName["zh"] = "Portlet";
