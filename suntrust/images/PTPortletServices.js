
function PTCommunity(guid, name)
{
	this.guid			= guid;
	this.name			= name;
	return this;
}

if (!window.PTPortalPage)
{
	PTPortalPage = new Object();
}

PTPortalPage.TYPE_MY_PAGE						= 'my-page';
PTPortalPage.TYPE_COMMUNITY_PAGE				= 'community-page';
PTPortalPage.TYPE_ADMIN_PAGE					= 'admin-page';
PTPortalPage.TYPE_ADMIN_EDITOR_PAGE				= 'admin-editor-page';
PTPortalPage.TYPE_NON_HOSTED_DISPLAY_MODE		= 'non-hosted-page';
PTPortalPage.portlets		= (PTPortalPage.portlets) ? PTPortalPage.portlets : new Object();
PTPortalPage.createdOn			= (PTPortalPage.createdOn) ? PTPortalPage.createdOn : new Date();
PTPortalPage.getPortlets = function()
{
	return PTPortalPage.portlets;
}

PTPortalPage.getPortletByID = function(id)
{
	if (!id)	{ return null; }
	else		{ return PTPortalPage.portlets[id]; }
}

PTPortalPage.getPortletByGUID = function(guid)
{
	if (!guid) { return null; }
	for (var p in PTPortalPage.portlets)
	{
		if (PTPortalPage.portlets[p].guid == guid)
		{
			return PTPortalPage.portlets[p];
		}
	}
	return null;
}

PTPortalPage.getPortletByName = function(name)
{
	if (!name) { return null; }
	for (var p in PTPortalPage.portlets)
	{
		if (PTPortalPage.portlets[p].name == name)
		{
			return PTPortalPage.portlets[p];
		}
	}
	return null;
}

PTPortalPage.addPortlet = function(portlet)
{
	if (!portlet || !portlet.className || (portlet.className != 'PTPortlet')) { return; }
	var portletID = portlet.id;
	if (!portletID) { return; }
	PTPortalPage.portlets[portletID] = portlet;
}

function PTPortlet(id, guid, name, containerID, remoteRequestURL, remoteBaseURL, gatewayPrefixURL, secureGatewayPrefixURL, isCollapsed, refreshURL, refreshInterval, callingApplication)
{
	this.id							= id;
	this.guid						= guid;
	this.name						= name;
	this.containerID				= containerID;
	this.remoteRequestURL			= (remoteRequestURL) ? remoteRequestURL : '';
	this.remoteBaseURL				= (remoteBaseURL) ? remoteBaseURL : '';
	this.gatewayPrefixURL			= (gatewayPrefixURL) ? gatewayPrefixURL : '';
	this.secureGatewayPrefixURL		= (secureGatewayPrefixURL) ? secureGatewayPrefixURL : '';
	this.isCollapsed				= (isCollapsed == true || isCollapsed == 'true') ? true : false;
	this.refreshURL					= (refreshURL) ? refreshURL : '';
	this.refreshInterval			= (refreshInterval) ? refreshInterval : 0;
	this.responsePreProcHandler		= false;
	this.responsePostProcHandler	= false;
	this.responseErrorHandler		= false;
	this.responseErrors				= new Array();
	this._eventListeners			= new Object();
	this._refreshTimeout			= null;
	this.className					= 'PTPortlet';	if ( (callingApplication=='1') || (callingApplication=='2') ) {
		this.callingApplication = callingApplication;
	}
	if (window.PTPortalPage)
	{
		window.PTPortalPage.addPortlet(this);
	}
	return this;
}

PTPortlet.VERSION = '246682';
PTPortlet.SESSION_PREF_NAME_PREFIX	= '_';
PTPortlet.getPortletByID = function(id)
{
	return PTPortalPage.getPortletByID(id);
}

PTPortlet.getPortletByGUID = function(guid)
{
	return PTPortalPage.getPortletByGUID(guid);
}

PTPortlet.getPortletByName = function(name)
{
	return PTPortalPage.getPortletByName(name);
}

PTPortlet.getSessionPref = function(name)
{
	var postContent = new Object();
	postContent[PTPortlet.SESSION_PREF_NAME_PREFIX + name] = 1;
	var pref = null;
	var sessionPrefs = PTPortlet._processGetSessionPrefs(postContent);
	if (sessionPrefs) { pref = sessionPrefs[name]; }
	return pref;
}

PTPortlet.getSessionPrefs = function(names)
{
	var postContent = new Object();
	var numNames = names.length;
	for (var i = 0; i < numNames; i++)
	{
		var name = names[i];
		postContent[PTPortlet.SESSION_PREF_NAME_PREFIX + name] = 1;
	}
	var sessionPrefs = PTPortlet._processGetSessionPrefs(postContent);
	if (!sessionPrefs) { sessionPrefs = new Object(); }
	for (var i = 0; i < numNames; i++)
	{
		if (!sessionPrefs[names[i]]) { sessionPrefs[names[i]] = ''; }
	}
	return sessionPrefs;
}

PTPortlet.setSessionPref = function(name,value)
{
	var postContent = new Object();
	postContent[name] = value;
	return PTPortlet.setSessionPrefs(postContent);
}

PTPortlet.setSessionPrefs = function(hash)
{
	var postContent = new Object();
	for (var name in hash)
	{
		var value = hash[name];
		postContent[PTPortlet.SESSION_PREF_NAME_PREFIX + name] = value;
	}
	return PTPortlet._postSetSessionPrefs(postContent);
}

PTPortlet._postSetSessionPrefs = function(postContent,invokerPortlet)
{
	if (!window.PTPortalContext) { return; }
	var url = PTPortalContext.SET_SESSION_PREFS_URL;
	if (!url) { return; }
	var postRequest = new PTHTTPPOSTRequest(url, postContent, null, PTHTTPTransport.CCMODE_SYNC);
	postRequest.properties._invoker = invokerPortlet;
	postRequest.invoke();
	return postRequest;
}

PTPortlet._processGetSessionPrefs = function(postContent,invokerPortlet)
{
	if (!window.PTPortalContext) { return; }
	var url = PTPortalContext.GET_SESSION_PREFS_URL;
	if (!url) { return; }
	var request = new PTHTTPPOSTRequest(url, postContent, false, PTHTTPTransport.CCMODE_SYNC);
	request.properties._invoker = invokerPortlet;
	var response = request.invoke();
	if (response)
	{
		if (response.responseXML)		{ var xmlDoc = new PTXMLDocument(response.responseXML); }
		else if (response.responseText)	{ var xmlDoc = PTXMLDocumentBuilder.createFromString(response.responseText); }
		return PTPortlet._getSessionPrefsFromXML(xmlDoc);
	}
	else
	{
		return;
	}
}

PTPortlet._getSessionPrefsFromXML = function(xmlDoc)
{
	if (!xmlDoc) { return; }
	var hash = new Object();
	var prefs = xmlDoc.getDocumentElement();
	var fields = prefs.getElementsByTagName('field');
	var numFields = fields.length;
	for (var i = 0; i < numFields; i++)
	{
		var field = fields.item(i);
		var name = PTXMLDocument.getNodeValue((field.getElementsByTagName('name')).item(0));
		var value = PTXMLDocument.getNodeValue((field.getElementsByTagName('value')).item(0));
		hash[name] = value;
	}
	return hash;
}

PTPortlet.prototype.refresh = function(url,requestHeaders)
{	if (!url) { url = this.getRefreshURL(); }
	if (!url) { return false; }
	var wasRequestInvoked = this._createGetRefreshRequest(url,null,requestHeaders);
	this._startRefreshTimer();
}

PTPortlet.prototype.formRefresh = function(form,requestHeaders)
{
	var formElement = PTHTTPRequest._resolveFormReference(form);
	if (!formElement) { return false; }
	var wasRequestInvoked;
	if (formElement.method == 'post')
	{
		wasRequestInvoked = this._createPostRefreshRequest(null,formElement,requestHeaders);
	}
	else
	{
		wasRequestInvoked = this._createGetRefreshRequest(null,formElement,requestHeaders);
	}
}

PTPortlet.prototype.formGetRefresh = function(form,requestHeaders)
{
	var wasRequestInvoked = this._createGetRefreshRequest(null,form,requestHeaders);
}

PTPortlet.prototype.formPostRefresh = function(form,requestHeaders)
{
	var wasRequestInvoked = this._createPostRefreshRequest(null,form,requestHeaders);
}

PTPortlet.prototype.getRefreshURL = function()
{
	return this.refreshURL;
}

PTPortlet.prototype.setRefreshURL = function(url)
{
	this.refreshURL = url;
}

PTPortlet.prototype.getRefreshInterval = function()
{
	return this.refreshInterval;
}

PTPortlet.prototype.setRefreshInterval = function(refreshInterval)
{
	this.refreshInterval = refreshInterval;
	this._startRefreshTimer();
}

PTPortlet.prototype.clearRefreshInterval = function()
{
	this.refreshInterval = 0;
	this._clearRefreshTimer();
}

PTPortlet.prototype.setInnerHTML = function(html)
{
	var element = document.getElementById(this.containerID);
	if (element) { element.innerHTML = html; }
}

PTPortlet.prototype.registerForEvent = function(eventName,eventCallback,eventNamespace)
{
	if (document.PCC)
	{		if (!eventNamespace) { eventNamespace = document.PCC.WindowEventURN; }
		if (!this._eventListeners[eventNamespace]) { this._eventListeners[eventNamespace] = new Object(); }
		if (!this._eventListeners[eventNamespace][eventName]) { this._eventListeners[eventNamespace][eventName] = new Array(); }
		var index = this._eventListeners[eventNamespace][eventName].length;
		var portletID = this.id;
		var eventListenerID = document.PCC.RegisterOnceForEvent(eventNamespace,eventName,eventCallback,portletID);
		if (eventListenerID) { this._eventListeners[eventNamespace][eventName][index] = eventListenerID; }
	}
}

PTPortlet.prototype.refreshOnEvent = function(eventName,eventNamespace)
{
	var refreshMethod = '(PTPortlet.getPortletByGUID(\'' + this.guid + '\')).refresh';
	this.registerForEvent(eventName,refreshMethod,eventNamespace);
}

PTPortlet.prototype.raiseEvent = function(eventName,eventArgs,eventNamespace)
{
	if (document.PCC)
	{		if (!eventNamespace) { eventNamespace = document.PCC.WindowEventURN; }
		document.PCC.RaiseEvent(eventNamespace,eventName,eventArgs);
	}
}

PTPortlet.prototype.clearEvent = function(eventName,eventNamespace)
{
	if (document.PCC)
	{		if (!eventNamespace) { eventNamespace = document.PCC.WindowEventURN; }
		if (this._eventListeners[eventNamespace])
		{
			if (this._eventListeners[eventNamespace][eventName])
			{				var ids = this._eventListeners[eventNamespace][eventName].length;
				for (var i = 0; i < ids; i++)
				{
					var eventListenerID = this._eventListeners[eventNamespace][eventName][i];
					document.PCC.ClearWindowEvent(eventListenerID,eventName,eventNamespace);
				}
				this._eventListeners[eventNamespace][eventName] = null;
			}
		}
	}
}

PTPortlet.prototype.getSessionPref = function(name)
{
	return PTPortlet.getSessionPref(name,this);
}

PTPortlet.prototype.getSessionPrefs = function(names)
{
	return PTPortlet.getSessionPrefs(names,this);
}

PTPortlet.prototype.setSessionPref = function(name,value)
{
	return PTPortlet.setSessionPref(name,value);
}

PTPortlet.prototype.setSessionPrefs = function(hash)
{
	return PTPortlet.setSessionPrefs(hash);
}

PTPortlet.prototype.deleteSessionPref = function(name)
{
	var postContent = new Object();
	postContent[name] = '';
	return this.setSessionPrefs(postContent);
}

PTPortlet.prototype.deleteSessionPrefs = function(array)
{
	var postContent = new Object();
	var numPrefs = array.length;
	for (var i =0; i < numPrefs; i++)
	{
		var value = array[i];
		postContent[PTPortlet.SESSION_PREF_NAME_PREFIX + name] = '';
	}
	return this._postSetSessionPrefs(postContent);
}

PTPortlet.prototype.transformURL = function(url)
{
	if ( this.callingApplication ) {
			if ( this.callingApplication == '1' ) {
				return PTTransformer.transformURLasPortal(url, this.remoteRequestURL, this.remoteBaseURL, this.gatewayPrefixURL, this.secureGatewayPrefixURL);
			} 
			if ( this.callingApplication == '2' ) {
				return PTTransformer.transformURLasRunner(url, this.remoteRequestURL, this.remoteBaseURL, this.gatewayPrefixURL, this.secureGatewayPrefixURL);
			}
		}		return PTTransformer.transformURLasPortal(url, this.remoteRequestURL, this.remoteBaseURL, this.gatewayPrefixURL, this.secureGatewayPrefixURL);
}

PTPortlet.prototype.makeAbsoluteURL = function(url)
{
	return PTTransformer.makeAbsoluteURL(url, this.remoteRequestURL, this.remoteBaseURL);
}

PTPortlet.prototype._startRefreshTimer = function()
{
	this._clearRefreshTimer();	if (this.refreshInterval > 0  && (this.guid != ''))
	{
		this._refreshTimeout = window.setTimeout('PTPortlet.getPortletByGUID(\'' + this.guid + '\').refresh()',this.refreshInterval);
	}	if(this.refreshInterval > 0) {
		this._refreshTimeout = window.setTimeout('PTPortlet.getPortletByName(\'' + this.name + '\').refresh()',this.refreshInterval);
	}
}

PTPortlet.prototype._clearRefreshTimer = function()
{
	if (this._refreshTimeout)
	{
		window.clearTimeout(this._refreshTimeout);
	}
}

PTPortlet.prototype._createGetRefreshRequest = function(url,form,requestHeaders)
{	var responseHandler = document.getElementById(this.containerID);
	if (form)
	{		var request = new PTHTTPGETRequest(false,responseHandler);
		request.setFormContent(form);
	}
	else if (url)
	{		var request = new PTHTTPGETRequest(url,responseHandler);
	}
	else
	{
		return false;
	}
	if (requestHeaders) { request.requestHeaders = requestHeaders; }
	request.type = PTHTTPRequest.REQUEST_TYPE_PORTLET_REFRESH;
	request.responsePreProcHandler = (this.responsePreProcHandler) ? this.responsePreProcHandler : this._refreshErrorHandler;
	request.responsePostProcHandler = this.responsePostProcHandler;
	request.properties._invoker = this;
	request.invoke();
	return true;
}

PTPortlet.prototype._createPostRefreshRequest = function(url,form,requestHeaders)
{	var responseHandler = document.getElementById(this.containerID);
	if (form)
	{		var request = new PTHTTPPOSTRequest(false,form,responseHandler);
	}
	else if (url)
	{		var request = new PTHTTPPOSTRequest(url,false,responseHandler);
	}
	else
	{
		return false;;
	}
	if (requestHeaders) { request.requestHeaders = requestHeaders; }
	request.type = PTHTTPRequest.REQUEST_TYPE_PORTLET_REFRESH;
	request.responsePreProcHandler = (this.responsePreProcHandler) ? this.responsePreProcHandler : this._refreshErrorHandler;
	request.responsePostProcHandler = this.responsePostProcHandler;
	request.properties._invoker = this;
	request.invoke();
	return true;
}

PTPortlet.prototype._refreshErrorHandler = function(response)
{
	var type = response.type;
	if (type == PTHTTPResponse.RESPONSE_TYPE_OK) 						{ return true; } 
	else if (type == PTHTTPResponse.RESPONSE_TYPE_REDIRECT) 			{ return true; } 
	else if (type == PTHTTPResponse.RESPONSE_TYPE_SESSION_EXPIRED)	{ return true; } 
	if (response.responseXML)		
	{ 
		try
		{
			var xmlDoc = new PTXMLDocument(response.responseXML); 
		}
		catch(e) {}

	}
	else if (response.responseText)	
	{ 
		try
		{
			var xmlDoc = PTXMLDocumentBuilder.createFromString(response.responseText);
		}
		catch(e) {}

	}
	var invoker = response.request.properties._invoker;
	if (!invoker) { return false; }
	invoker._handleResponseErrorXML(xmlDoc,response);
	if (invoker.responseErrorHandler)
	{
		if (typeof invoker.responseErrorHandler == 'string')
		{
			if (window[invoker.responseErrorHandler])
			{
				eval(invoker.responseErrorHandler + '(response)');
			}
		}
		else if (typeof invoker.responseErrorHandler == 'function')
		{
			invoker.responseErrorHandler(response);
		}
	}
	else
	{
		var err = invoker.responseErrors[invoker.responseErrors.length - 1];
		var errMessage = err['Error Message'] ? err['Error Message'] : response.type + ' : ' + response.status;
		var debugInfo = '';
		for (var i in err)
		{
			if ((i == 'Response Headers') || (i == 'PTHTTPRequest Object')) { continue; }
			debugInfo += '<b>' + i + ':</b> ' + err[i] + '<br>';
		}
		debugInfo += '<br><b>Response Headers</b><br><br>';
		var headers = err['Response Headers'];
		for (var i in headers)
		{
			debugInfo += '<b>' + i + ':</b> ' + headers[i] + '<br>';
		}
		var privateMsgID = invoker.containerID + '_debug';
		var publicMessage = '<div style="padding:5px;cursor:default;" ondblclick="document.getElementById(\'' + privateMsgID + '\').style.display = \'block\';">' + errMessage + '</div>';
		var privateMessage = '<div style="padding:5px;cursor:default;display:none;" id="' + privateMsgID + '"><pre style="font-size:10pt;">' + debugInfo + '</pre></div>';
		var portletBox = document.getElementById(invoker.containerID);
		portletBox.innerHTML = publicMessage + privateMessage;
	}
	return false;
}

PTPortlet.prototype._handleResponseErrorXML = function(xmlDoc,response)
{
	var err = new Object();
	err['Timestamp'] = new Date();
	err['Response Status Code'] = response.status;
	err['Response Type'] = response.type;
	err['Response Headers'] = (response._responseHeaders) ? response._responseHeaders : null;
	err['Response Text'] = response.responseText;
	err['PTHTTPRequest Object'] = response.request;
	if (!xmlDoc)
	{
		err['Error Message'] = 'An unknown error occurred -- no error xml returned.';
	}
	else
	{
		var errorInfo = xmlDoc.getDocumentElement();
		var fields = errorInfo.getElementsByTagName('field');
		var numFields = fields.length;
		for (var i = 0; i < numFields; i++)
		{
			var field = fields.item(i);
			var name = PTXMLDocument.getNodeValue((field.getElementsByTagName('name')).item(0));
			var value = PTXMLDocument.getNodeValue((field.getElementsByTagName('value')).item(0));
			err[name] = value;
		}
	}
	this.responseErrors[this.responseErrors.length] = err;
	return;
}

function PTPortletServices()
{
	this.regEvents = new Object();
	if (!window.navigator['PTPCCState']) { window.navigator['PTPCCState'] = new Array(); }
	this._eventListener = function(func)
	{
		this.func		= func;
		this.id			= PTPortletServices._eventListenerCount++;
		this._portletID	= null;  
	}
}

PTPortletServices._eventListenerCount = (PTPortletServices._eventListenerCount) ? PTPortletServices._eventListenerCount : 1;
PTPortletServices._SESSION_STATE_COOKIE = 'PCC_SESSION_STATE'; 
PTPortletServices.VERSION = '246682';
PTPortletServices.prototype.WindowEventURN = 'urn:schemas.microsoft.com:dhtml';
PTPortletServices.prototype.RaiseEvent = function(sNamespaceURN, eventName, objEventArgs)
{
	var arrEvents = this.regEvents[sNamespaceURN];
	if (arrEvents && arrEvents[eventName])
	{		
		var eventListenersForEvent = arrEvents[eventName];
		var bHaveArguments = (objEventArgs);
		for (var lIndex = 0; lIndex < eventListenersForEvent.length; ++lIndex)
		{
			var itemFunction = eventListenersForEvent[lIndex].func;
			var functionType = typeof(itemFunction);
			if (functionType == 'string')
			{
				if (bHaveArguments)	{ eval(itemFunction + '(arguments[2])'); }
				else				{ eval(itemFunction + '()'); }
			}
			else if (functionType == 'function')
			{
				if (bHaveArguments)	{ itemFunction(arguments[2]); }
				else				{ itemFunction(); }
			}
		}
	}
}

PTPortletServices.prototype.RaiseWindowEvent = function(objEventArgs)
{
	if (this && this.RaiseEvent)
	{
		this.RaiseEvent(this.WindowEventURN, 'on' + arguments[0].type, arguments[0]);
	}
	else if (document.PCC && document.PCC.RaiseEvent)
	{
		document.PCC.RaiseEvent(document.PCC.WindowEventURN, 'on' + arguments[0].type, arguments[0]);
	}
}

PTPortletServices.prototype.RegisterForEvent = function(namespaceURN, eventName, sFunction, _portletID)
{	var events = new Object();
	if (this.regEvents[namespaceURN])	{ events = this.regEvents[namespaceURN]; }
	else								{ this.regEvents[namespaceURN] = events; }
	var evls = new Array();
	if (events[eventName])	{ evls = events[eventName]; }
	else					{ events[eventName] = evls; }
	var eventListener = new this._eventListener();
	eventListener.func = sFunction;
	if (_portletID) { eventListener._portletID = _portletID; }
	evls[evls.length] = eventListener;
	return eventListener.id;
}

PTPortletServices.prototype.RegisterForWindowEvent = function(eventName, sFunction)
{
	return this.RegisterForEvent(this.WindowEventURN, eventName, sFunction);
}

PTPortletServices.prototype.RegisterOnceForEvent = function(namespaceURN, eventName, sFunction, _portletID)
{
	if (!this.IsEventRegistered(namespaceURN, eventName, sFunction, _portletID))
	{
		return this.RegisterForEvent(namespaceURN, eventName, sFunction, _portletID);
	}
	else { return false; }
}

PTPortletServices.prototype.RegisterOnceForWindowEvent = function(eventName, sFunction)
{
	return this.RegisterOnceForEvent(this.WindowEventURN, eventName, sFunction);
}

PTPortletServices.prototype.ClearWindowEvent = function(eventListenerID)
{
	var eventCleared = false;
	ALL:
	for (var namespace in this.regEvents)
	{
		for (var event in this.regEvents[namespace])
		{
			if (this.regEvents[namespace][event])
			{
				var numEvents = this.regEvents[namespace][event].length;
				for (var i = 0; i < numEvents; i++)
				{
					var eventListener = this.regEvents[namespace][event][i];
					if (eventListener.id == eventListenerID)
					{
						this.regEvents[namespace][event].splice(i,1);
						eventCleared = true;
						break ALL;
					}
				}
			}
		}
	}
	return eventCleared;
}

PTPortletServices.prototype.IsEventRegistered = function(namespaceURN, eventName, sFunction, _portletID)
{
	if (this.regEvents[namespaceURN])
	{
		var namespaceEvents = this.regEvents[namespaceURN];
		if (namespaceEvents[eventName])
		{			var functionString = '';
			if (typeof sFunction == 'string')
			{
				var functionObject = eval(sFunction);
				if (!functionObject) 
				{ 
					return false; 
				}
				functionString = functionObject.toString();
			}
			else if (typeof sFunction == 'function')
			{
				functionString = sFunction.toString();
			}
			var eventListeners = namespaceEvents[eventName];
			var numListeners = eventListeners.length;
			for (var i = 0; i < numListeners; i++)
			{
				var listener = eventListeners[i].func;
				var listenerType = typeof(listener);
				var listenerString = '';
				if (listenerType == 'string')
				{
					var listenerObject = eval(listener);
					if (!listenerObject) { continue; }
					listenerString = listenerObject.toString();
				}
				else
				{
					listenerString = listener.toString();
				}
				if (listenerString.valueOf() == functionString.valueOf())
				{
					var eventsMatch = false;
					if (_portletID)
					{
						var listenerPortletID = eventListeners[i]._portletID;
						if (listenerPortletID && (listenerPortletID == _portletID)) { eventsMatch = true; }
					}
					else { eventsMatch = true; }
					if (eventsMatch)
					{
						return true;
					}
				}	
			}
		}
	}
	return false;
}

PTPortletServices.prototype.PutSessionState = function(sNamespaceURN, sName, objValue)
{
	var nameSpaceURN = (sNamespaceURN) ? sNamespaceURN : this.DefaultURN;
	var sessionStateString = PTCookie.get(PTPortletServices._SESSION_STATE_COOKIE);
	if (sessionStateString)
	{
		var sessionStateObj = PTCommonUtil.JSON.parse(sessionStateString);	
	}
	else
	{
		sessionStateObj = {};		
	}
	sessionStateObj[nameSpaceURN + ':' + sName] = objValue;
	sessionStateString = PTCommonUtil.JSON.stringify(sessionStateObj);
	PTCookie.set(PTPortletServices._SESSION_STATE_COOKIE, sessionStateString);	
}

PTPortletServices.prototype.GetSessionState = function(sNamespaceURN, sName)
{
	var nameSpaceURN = (sNamespaceURN) ? sNamespaceURN : this.DefaultURN;
	var sessionStateString = PTCookie.get(PTPortletServices._SESSION_STATE_COOKIE);
	if (sessionStateString)
	{
		var sessionStateObj = PTCommonUtil.JSON.parse(sessionStateString);
		return sessionStateObj[nameSpaceURN + ':' + sName];
	}
}

PTPortletServices.prototype.ClearSessionState = function(sNamespaceURN, sName)
{
	var nameSpaceURN = (sNamespaceURN) ? sNamespaceURN : this.DefaultURN;
	var sessionStateString = PTCookie.get(PTPortletServices._SESSION_STATE_COOKIE);
	if (sessionStateString)
	{
		var sessionStateObj = PTCommonUtil.JSON.parse(sessionStateString);	
	}
	else
	{
		sessionStateObj = {};		
	}
	delete sessionStateObj[nameSpaceURN + ':' + sName];
	sessionStateString = PTCommonUtil.JSON.stringify(sessionStateObj);
	PTCookie.set(PTPortletServices._SESSION_STATE_COOKIE, sessionStateString);		
}

function InitializeEvents()
{
	if (PTPortletServices.initialized) { return; }
	PTPortletServices.initialized = true;
	var arrHTMLEvents = new Array(
		'blur',
		'click',
		'dblclick',
		'focus',
		'keydown',
		'keyup',
		'mousedown',
		'mousemove',
		'mouseout',
		'mouseover',
		'mouseup',
		'resize'
	);
	var arrWindowEvents = new Array(
		'abort',
		'beforeunload',
		'change',
		'close',
		'contextmenu',
		'copy',
		'cut',
		'error',
		'keypress',
		'load',
		'mouseenter',
		'mouseleave',
		'paste',
		'readystatechange',
		'selectStart',
		'scroll',
		'select',
		'submit',
		'unload'
	);
	for (var i = 0; i < arrHTMLEvents.length; i++)
	{	
		CheckAndRegisterEvent('window', arrHTMLEvents[i]);	
		CheckAndRegisterEvent('document', arrHTMLEvents[i]);
	}
	for (var j = 0; j < arrWindowEvents.length; j++)
	{	
		CheckAndRegisterEvent('window', arrWindowEvents[j]);
	}
}

PTPortletServices.prototype.InitializeEvents = InitializeEvents;
if (!document.PCC)
{
	var PCC = new PTPortletServices();
	document.PCC = PCC;
	var GCC = PCC;
	document.GCC = PCC;
	var DDSC = PCC;
	document.DDSC = PCC;
}

function CheckAndRegisterEvent(obj, eventName)
{
	var eventHandle = obj + '.on' + eventName;
	var evt = eval(eventHandle);
	var eventExistsButIsNotPCC = (evt && ((new String(evt)).indexOf('PCC') == -1));
	var eventDoesNotExist = (!evt);
	if (document && document.PCC && eventExistsButIsNotPCC)
	{		document.PCC.RegisterForWindowEvent('on' + eventName, evt);
	}
	if (document && document.PCC && document.PCC.RaiseWindowEvent && (eventDoesNotExist || eventExistsButIsNotPCC))
	{		if (document.all) {
			eval(eventHandle + ' = new Function(\'document.PCC.RaiseWindowEvent(window.event)\')');	
		} else {
			eval(eventHandle + ' = function (e) { document.PCC.RaiseWindowEvent(e); }');
		}
	}
}

function PTTransformer() {}

PTTransformer.transformURLasPortal = function(URL,remoteRequestURL,remoteBaseURL,gatewayPrefixURL,secureGatewayPrefixURL)
{
	var URL = new String(URL);
	if ((URL.indexOf(gatewayPrefixURL) == 0) || (URL.indexOf(secureGatewayPrefixURL) == 0)) { return URL; }
	var absoluteURL = PTTransformer.makeAbsoluteURL(URL,remoteRequestURL,remoteBaseURL);
	var queryStringIndex = absoluteURL.indexOf('?');
	if (queryStringIndex == -1) { queryStringIndex = absoluteURL.length; }
	absoluteURL = absoluteURL.substr(0,queryStringIndex).replace(/:\/\//g,'%3B/').replace(/:/g,'%3B') + absoluteURL.substr(queryStringIndex);
	var protocol = absoluteURL.substr(0,5).toUpperCase();
	if (protocol == 'HTTP%')		{ return gatewayPrefixURL + absoluteURL; }
	else if (protocol == 'HTTPS')	{ return secureGatewayPrefixURL + absoluteURL; }
	else							{ return URL; }
}

PTTransformer.transformURLasRunner = function(URL,remoteRequestURL,remoteBaseURL,gatewayPrefixURL,secureGatewayPrefixURL)
{
	var URL = new String(URL);
	var isURLRelative = false;
	var windowURL = window.location.toString();
	var windowURLProtocol = windowURL.substr(0,5).toUpperCase();
	var URLprotocol = URL.substr(0,5).toUpperCase();
	if ((URLprotocol == 'HTTP:') || (URLprotocol == 'HTTPS')) {
		isURLRelative = false;
	}
	else { 
		isURLRelative = true; 
	}
	var finalGatewayPrefixURL;
	if (isURLRelative == false){		if ( (URLprotocol == 'HTTPS') &&  (secureGatewayPrefixURL != '') ){
			finalGatewayPrefixURL = secureGatewayPrefixURL;
		}  else {
			finalGatewayPrefixURL = gatewayPrefixURL;
		}
	} else  {		if (  (windowURLProtocol == 'HTTPS')  && (secureGatewayPrefixURL != '')  ){
			finalGatewayPrefixURL = secureGatewayPrefixURL;
		}  else {
			finalGatewayPrefixURL = gatewayPrefixURL;
		}
	}
	if ((URL.indexOf(gatewayPrefixURL) == 0) || (URL.indexOf(secureGatewayPrefixURL) == 0)) { return URL; }
	var absoluteURL = PTTransformer.makeAbsoluteURLforRunner(URL,remoteRequestURL,remoteBaseURL);
	if (URL.indexOf(remoteBaseURL) == 0)  {
		var prefixString = gatewayPrefixURL;
		var relativeString = URL.replace(remoteBaseURL,"");
		if ( PTTransformer.doesURLbeginWithSlash(relativeString) ) {
			relativeString = relativeString.substring(1, relativeString.length);
			} else {
			relativeString = relativeString.substring(0, relativeString.length);
			}
		if ( (!(PTTransformer.doesURLendWithSlash(finalGatewayPrefixURL)))  ){
			finalGatewayPrefixURL + '/';
		}
		var returnString = finalGatewayPrefixURL + relativeString;
		return returnString;
	}
	if ( absoluteURL.indexOf(remoteBaseURL) == 0)   {
		var prefixString = gatewayPrefixURL;
		var relativeString = absoluteURL.replace(remoteBaseURL,"");
		if ( PTTransformer.doesURLbeginWithSlash(relativeString) ) {
			relativeString = relativeString.substring(1, relativeString.length);
		} else {
			relativeString = relativeString.substring(0, relativeString.length);
		}
		if ( (!(PTTransformer.doesURLendWithSlash(finalGatewayPrefixURL)))  ){
			finalGatewayPrefixURL + '/';
		}
		var returnString = finalGatewayPrefixURL + relativeString;
		return returnString;
	}	if(! isURLRelative ) { return URL; }
	if ( (!(PTTransformer.doesURLendWithSlash(finalGatewayPrefixURL)))  ){
		finalGatewayPrefixURL + '/';
	}
	if ( PTTransformer.doesURLbeginWithSlash(URL) ) {
		return finalGatewayPrefixURL + URL.substring(1, URL.length);
	}
	return finalGatewayPrefixURL + URL; 
}

PTTransformer.makeAbsoluteURL = function(URL,remoteRequestURL,remoteBaseURL)
{
	var URL = new String(URL);
	if (URL.indexOf('#') == 0)		{ return URL; }
	else if (URL.indexOf('/') == 0)	{ return remoteRequestURL + URL; }
	var queryStringIndex = URL.indexOf('?');
	if (queryStringIndex != -1)	{ var URLBase = URL.substring(0,queryStringIndex); }
	else						{ var URLBase = URL; }
	if (URLBase.indexOf(':') != -1)	{ return URL; }
	var URLTemp = URL;
	while (URLTemp.indexOf('../') == 0)
	{
		URLTemp = URLTemp.substr(3);
		var lastSlashIndex = remoteBaseURL.lastIndexOf('/');
		if (lastSlashIndex == -1) { return URL; }
		remoteBaseURL = remoteBaseURL.substr(0,lastSlashIndex);
	}
	if (URLTemp.indexOf('./') == 0) { URLTemp = URLTemp.substr(2); }
	var absoluteURL = remoteBaseURL + '/' + URLTemp;
	return absoluteURL;
}

PTTransformer.makeRelativeURL = function(remoteAbsoluteURL,remoteBaseURL)
{
	var absoluteURL = new String(remoteAbsoluteURL);
	var baseURL = new String(remoteBaseURL);
	var index = absoluteURL.indexOf(baseURL);
	if (index != -1) { return absoluteURL.substring(baseURL.length, absoluteURL.length); }
	else
	return absoluteURL;
}

PTTransformer.makeAbsoluteURLforRunner = function(URL,remoteRequestURL,remoteBaseURL)
{
	var URL = new String(URL);
	if (URL.indexOf('#') == 0)		{ return URL; }
	else if (URL.indexOf('/') == 0)	{ return remoteRequestURL + URL; }
	var queryStringIndex = URL.indexOf('?');
	if (queryStringIndex != -1)	{ var URLBase = URL.substring(0,queryStringIndex); }
	else						{ var URLBase = URL; }
	if (URLBase.indexOf(':') != -1)	{ return URL; }
	var URLTemp = URL;
	while (URLTemp.indexOf('../') == 0)
	{
		URLTemp = URLTemp.substr(3);
	}
	if (URLTemp.indexOf('./') == 0) { URLTemp = URLTemp.substr(2); }
	var absoluteURL;
	if (remoteBaseURL.charAt(remoteBaseURL.length-1) != '/'){
		absoluteURL = remoteBaseURL + '/' + URLTemp;
	} else {
		absoluteURL = remoteBaseURL + URLTemp;
	}
	return absoluteURL;
}

PTTransformer.doesURLbeginWithSlash = function(URL)
{
	if ( URL.charAt(0) == '/' ) {
		return true;		
	}
	return false;
}

PTTransformer.doesURLendWithSlash = function(URL)
{
	if ( URL.charAt(URL.length - 1) == '/' ){
		return true;
	}
		return false;
}

