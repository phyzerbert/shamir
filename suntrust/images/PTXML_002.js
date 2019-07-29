
PTHTTPTransport = function() {}

PTHTTPTransport.VERSION  = '246682';
PTHTTPTransport.CCMODE_QUEUE 		= 'queue';		
PTHTTPTransport.CCMODE_ASYNC 		= 'async';		
PTHTTPTransport.CCMODE_SYNC 		= 'sync';		
PTHTTPTransport.TRANSPORT_TYPE_MSXML			= 'MSXML';
PTHTTPTransport.TRANSPORT_TYPE_XMLHTTPREQUEST	= 'XMLHttpRequest';
PTHTTPTransport.TRANSPORT_TYPE_IFRAME			= 'iframe';
PTHTTPTransport.transportType			= false;
PTHTTPTransport.transportTypeMSIE		= ''; 
PTHTTPTransport._requestInProcess		= false;
PTHTTPTransport._requestQueue 			= new Array();
PTHTTPTransport._timers				= new Object();
PTHTTPTransport.getVehicle = function ()
{
	if (PTHTTPTransport.transportType == PTHTTPTransport.TRANSPORT_TYPE_MSXML)
	{
		return new ActiveXObject(PTHTTPTransport.transportTypeMSIE);
	}
	else if (PTHTTPTransport.transportType == PTHTTPTransport.TRANSPORT_TYPE_XMLHTTPREQUEST)
	{
		return new XMLHttpRequest(); 
	}
	else if (PTHTTPTransport.transportType == PTHTTPTransport.TRANSPORT_TYPE_IFRAME)
	{
		return PTHTTPTransport._iFrameVehicle;
	}
}

PTHTTPTransport.invokeRequest = function (request) 
{	if (!request || !request.url || request.url == '') { return false; }
	if (request.concurrencyMode == PTHTTPTransport.CCMODE_QUEUE &&
		PTHTTPTransport._requestInProcess)
	{
		PTArrayUtil.push(PTHTTPTransport._requestQueue,request);
		return;
	}
	if (request.concurrencyMode == PTHTTPTransport.CCMODE_QUEUE)
	{
		PTHTTPTransport._requestInProcess = true;
	}
	if (window.PT_DEBUG && (PT_DEBUG >= 2))
	{
		var start = (new Date()).getTime();
		request.properties.timerID = 'timer_' + start;
		PTHTTPTransport._timers[request.properties.timerID] = new Object();
		PTHTTPTransport._timers[request.properties.timerID].start = start;
	}
	var requestMethod = (request.className == 'PTHTTPPOSTRequest') ? 'POST' : 'GET';
	if (PTHTTPTransport.transportType != PTHTTPTransport.TRANSPORT_TYPE_IFRAME)
	{		
		var async = (request.concurrencyMode == PTHTTPTransport.CCMODE_SYNC) ? false : true;
		var vehicle = PTHTTPTransport.getVehicle();
		PTHTTPTransport.vehicle = vehicle;
		vehicle.open(requestMethod, request.url, async);
		vehicle.setRequestHeader(PTHTTPRequest.REQUEST_TYPE_HEADER, request.type);		vehicle.setRequestHeader('Referer', window.location); 
		for (var header in request.requestHeaders)
		{
			if (typeof request.requestHeaders[header] == 'string' || typeof request.requestHeaders[header] == 'number' || typeof request.requestHeaders[header] == 'boolean')
			{
				vehicle.setRequestHeader(header,request.requestHeaders[header]);
			}
		}
		if ((requestMethod == 'POST') && !request.requestHeaders[PTHTTPRequest.CONTENT_TYPE_HEADER])
		{
			vehicle.setRequestHeader(PTHTTPRequest.CONTENT_TYPE_HEADER,'application/x-www-form-urlencoded');
		}
		if (async)
		{
			vehicle.onreadystatechange = function()
			{
				if (vehicle.readyState == 4)
				{
					PTHTTPTransport.handleResponse(vehicle, request);
				}
			}
		}
		if (requestMethod == 'POST')
		{
			var formDataSet = (!request.formDataSet) ? '' : request.formDataSet;
			vehicle.send(formDataSet);
		}
		else 
		{
			vehicle.send('');
		}
		if (!async)
		{
			var response = PTHTTPTransport.handleResponse(vehicle, request);
			return response;
		}
	}	else
	{
		if (requestMethod == 'POST')
		{
			PTHTTPTransport._iFrameVehicle.document.write(request.submitFormHTML);
			PTHTTPTransport._iFrameVehicle.document.close();
			PTHTTPTransport._iFrameVehicle.document.forms[0].submit();		
		}
		else 
		{
			PTHTTPTransport._vehicle.document.location.replace(request.url);
		}
		var maxWaitMs = 10000; // Don't wait more than 10 seconds for a response
		var start = new Date();
		var waitMs = 0;
		while (PTHTTPTransport._iFrameVehicle.readyState == 'loading' ||
			   PTHTTPTransport._iFrameVehicle.readyState == 'loaded'  ||
			   PTHTTPTransport._iFrameVehicle.readyState == 'interactive')
		{
			var now = new Date();
			waitMs = now - start;
			if (waitMs > maxWaitMs) { break; }
		}
		if (!(PTHTTPTransport._iFrameVehicle.readyState == 'loading' ||
			  PTHTTPTransport._iFrameVehicle.readyState == 'loaded'  ||
			  PTHTTPTransport._iFrameVehicle.readyState == 'interactive'))
		{
			var response = PTHTTPTransport.handleResponse(null, request);
			return response;
		}
	}
}

PTHTTPTransport.handleResponse = function (vehicle, request) 
{  		var response;	var emptyResponse = false;
	if (PTHTTPTransport.transportType != PTHTTPTransport.TRANSPORT_TYPE_IFRAME)
	{
		var status;
		emptyResponse = false;
		try
		{
			status = vehicle.status;
		}
		catch(e)
		{
			if (e.name == 'NS_ERROR_NOT_AVAILABLE')
			{
				response = new PTHTTPResponse(request, '', false, false, PTHTTPResponse.RESPONSE_TYPE_NO_RESPONSE);
				emptyResponse = true;
			}
		}		if (status == 12029)
		{
			response = new PTHTTPResponse(request, '', false, false, PTHTTPResponse.RESPONSE_TYPE_NO_RESPONSE);
			emptyResponse = true;
		}
		if (!emptyResponse)
		{
			response = new PTHTTPResponse(request, 
										  vehicle.responseText,
										  vehicle.responseXML,
										  vehicle.status,
										  false,
										  vehicle.getAllResponseHeaders());
			response._contentType = vehicle.getResponseHeader(PTHTTPRequest.CONTENT_TYPE_HEADER);
			if (window.PT_DEBUG && (PT_DEBUG >= 2))
			{
				var end = (new Date()).getTime();
				if (request && request.properties && request.properties.timerID)
				{
					PTHTTPTransport._timers[request.properties.timerID].end = end;
					var diff = end - PTHTTPTransport._timers[request.properties.timerID].start;
				}
			}
		}	}	if (PTHTTPTransport.transportType == PTHTTPTransport.TRANSPORT_TYPE_IFRAME) 	{		response = new PTHTTPResponse(request, PTHTTPTransport._iFrameVehicle.document.body.innerText);	}
	if (request.responsePreProcHandler && 
		typeof request.responsePreProcHandler == 'function')
	{
		try
		{
			var ok2Continue = request.responsePreProcHandler(response);
		}
		catch (e)
		{
			ok2Continue = false;
		}		if (ok2Continue === false)
		{
			if (request.targetElement)
			{				request.targetElement.style.cursor = request._targetElementCursorStyle;
			}
			if (request.concurrencyMode == PTHTTPTransport.CCMODE_QUEUE)
			{
				PTHTTPTransport._requestInProcess = false;
				window.setTimeout('PTHTTPTransport._invokeNextRequest()',1);			
			}
			return response;
		}
	}
	if (response.type == PTHTTPResponse.RESPONSE_TYPE_SESSION_EXPIRED)
	{
		PTHTTPTransport._requestInProcess = false;			var loginURL = response.getResponseHeaders()[PTHTTPResponse.PT_LOGIN_URL_HEADER];
		if (loginURL)
		{
			window.location = loginURL;	
			return;
		}		else
		{
			window.location.reload();
			return;
		}
	}	
	if (response.type == PTHTTPResponse.RESPONSE_TYPE_REDIRECT)
	{
		var redirectURL = response.getResponseHeaders()['Location'];
		request.url = redirectURL;
		PTHTTPTransport._requestInProcess = false;
		return request.invoke();		
	}	
	if (request.callback)
	{		
		if (typeof request.callback == 'string')
		{
			if (eval(request.callback))
			{
				eval(request.callback + '(response)');
			}
		}
		else if (typeof request.callback == 'function')
		{
			request.callback(response);
		}
	}
	else if (request.targetElement && response._contentType.indexOf('text') != 0 )
	{
		request.targetElement.style.cursor = request._targetElementCursorStyle;
		window.location = request.url;
	}	else if (request.targetElement)
	{
		var targetElement = request.targetElement;
		targetElement.innerHTML = '';
		var responseHTML = response.responseText;
		if (PTBrowserInfo.IS_SAFARI)
		{			responseHTML = responseHTML.replace(new RegExp('(<style)','gi'), '<!-- $1');
			responseHTML = responseHTML.replace(new RegExp('(<\/style>)','gi'), '$1 -->');
			responseHTML = responseHTML.replace(new RegExp('(<link.*?>)','gi'), '<!-- $1 -->');
		}
		targetElement.innerHTML = '<input type="hidden"/>' + responseHTML;
		request.targetElement.style.cursor = request._targetElementCursorStyle;
		var scriptElements = targetElement.getElementsByTagName('SCRIPT');
		if (scriptElements && scriptElements.length > 0)
		{			try
			{
				PTHTTPTransport._jsToEval = ''; 
				for (var i = 0; i<scriptElements.length; i++)
				{
					var scriptElement = scriptElements[i];
					if (scriptElement.defer && PTBrowserInfo.IS_MSIE && PTBrowserInfo.MSIE_VERSION >= 5.5) { continue; }
					if (scriptElement.src)
					{												if (PTHTTPTransport.transportType != PTHTTPTransport.TRANSPORT_TYPE_IFRAME) 
						{
							try
							{
								var scriptGetRequest = new PTHTTPGETRequest(scriptElement.src, false, PTHTTPTransport.CCMODE_SYNC);
								var scriptGetResponse = scriptGetRequest.invoke();
								if (scriptGetResponse.status == 200)
								{
									PTHTTPTransport._jsToEval += scriptGetResponse.responseText + '\n';
								}
							}
							catch(e)
							{
							}
						}
					}
					else if (scriptElement.innerHTML)
					{									var scriptLines = scriptElement.innerHTML.split('\n');						for (var j=0; j<scriptLines.length; j++)
						{
							if (scriptLines[j].indexOf('document.write') > -1)
							{
								scriptLines[j] = '';
							}
							if (scriptLines[j].indexOf('<!--') != -1)
							{
								scriptLines[j] = '';
							}
						}
						PTHTTPTransport._jsToEval += scriptLines.join('\n') + '\n';;
					}
				}
				if (PTBrowserInfo.IS_MSIE)
				{
					window.setTimeout('window.execScript(PTHTTPTransport._jsToEval)',10);
				}
				else if (PTBrowserInfo.IS_SAFARI)
				{
					window.setTimeout('window.eval(PTHTTPTransport._jsToEval)',10);			
				}
				else 
				{
					window.eval(PTHTTPTransport._jsToEval);
				}
			}
			catch (e)
			{
			}
		}
	}
	else
	{
	}
	if (request.responsePostProcHandler && typeof request.responsePostProcHandler == 'function')
	{
		try
		{
			request.responsePostProcHandler(response);
		}
		catch(e)
		{
		}
	}
	if (request.concurrencyMode == PTHTTPTransport.CCMODE_QUEUE)
	{
		PTHTTPTransport._requestInProcess = false;
		window.setTimeout('PTHTTPTransport._invokeNextRequest()',1);
	}
	return response;
}

PTHTTPTransport._invokeNextRequest = function()
{
	if (PTHTTPTransport._requestQueue.length > 0) 
	{ 
		var nextRequest = PTHTTPTransport._requestQueue.shift(); 
		PTHTTPTransport.invokeRequest(nextRequest); 
	}
}

PTHTTPTransport.init					= function()
{	if (PTBrowserInfo.IS_MSIE && PTBrowserInfo.MSIE_VERSION >= 5)
	{
		PTHTTPTransport._setTransportTypeMSIE();
	}	if (!PTHTTPTransport.transportType)
	{
		try
		{
			var object = new XMLHttpRequest();
			PTHTTPTransport.transportType = PTHTTPTransport.TRANSPORT_TYPE_XMLHTTPREQUEST;
		}
		catch (e) {}

	}	
	if (!PTHTTPTransport.transportType)
	{
		if (!document.body)
		{
			window.setTimeout('PTHTTPTransport.init()',200);
			return;
		}
		if (document.createElement && !document.frames['_ptHttpTransportIFrame'])
		{
			if (PTBrowserInfo.IS_OPERA)
			{
				PTHTTPTransport._iFrameVehicle = document.createElement('iframe');
				PTHTTPTransport._iFrameVehicle.setAttribute('id','_ptHttpTransportIFrame');
				PTHTTPTransport._iFrameVehicle.style.border = '0px';
				PTHTTPTransport._iFrameVehicle.style.width	= '0px';
				PTHTTPTransport._iFrameVehicle.style.height	= '0px';
				document.body.appendChild(PTHTTPTransport._iFrameVehicle);
			}
			else 
			{
				var tempIFrame = document.createElement('iframe');
				tempIFrame.setAttribute('id','_ptHttpTransportIFrame');
				tempIFrame.style.border = '0px';
				tempIFrame.style.width	= '0px';
				tempIFrame.style.height	= '0px';
				document.body.appendChild(tempIFrame);			
				PTHTTPTransport._iFrameVehicle = document.frames['_ptHttpTransportIFrame'];
			}
			PTHTTPTransport.transportType = PTHTTPTransport.TRANSPORT_TYPE_IFRAME;
		}
	}
}

PTHTTPTransport._setTransportTypeMSIE = function()
{
	var transportTypes = new Array(
		'MSXML2.XMLHTTP.3.0', 
		'MSXML2.XMLHTTP', 
		'Microsoft.XMLHTTP'
	);
	var transportTypeMSIE = false;
	TEST:
	for (var t = 0; t < transportTypes.length; t++)
	{
		var transportType = transportTypes[t];
		var object;
		try 
		{
			object = new ActiveXObject(transportType);
		}
		catch(e) { continue TEST; }
		PTHTTPTransport.transportType = PTHTTPTransport.TRANSPORT_TYPE_MSXML;
		PTHTTPTransport.transportTypeMSIE = transportType;
		return true;
	}
	return false;
}

PTHTTPTransport.init();
PTHTTPRequest = function()
{
}

PTHTTPRequest.VERSION  = '246682'; 
PTHTTPRequest.REQUEST_TYPE_HEADER				= 'PT-HTTPRequest-Type';
PTHTTPRequest.REQUEST_TYPE_CLIENT_SIDE  		= 'CLIENT_SIDE'; 
PTHTTPRequest.REQUEST_TYPE_PORTLET_REFRESH 	= 'PORTLET_REFRESH';
PTHTTPRequest.CONTENT_TYPE_HEADER				= 'Content-Type';
PTHTTPRequest.prototype.url = null;
PTHTTPRequest.prototype.type = PTHTTPRequest.REQUEST_TYPE_CLIENT_SIDE;
PTHTTPRequest.prototype.callback = null;
PTHTTPRequest.prototype.targetElement = null;
PTHTTPRequest.prototype.responsePreProcHandler = null;
PTHTTPRequest.prototype.responsePostProcHandler = null;
PTHTTPRequest.prototype.concurrencyMode = PTHTTPTransport.CCMODE_QUEUE;
PTHTTPRequest.prototype.requestHeaders = {};
PTHTTPRequest.prototype.properties = {};
PTHTTPRequest.prototype._requestForm = null;
PTHTTPRequest.prototype.formDataSet = null;
PTHTTPRequest.prototype._setFormURLEncodedDataFromNVPairs = function(nvPairs)
{
	if (!nvPairs) { return null; }
	var formData = '';
	for (theName in nvPairs)
	{
		formData += PTStringUtil.encodeURL(theName) + '=' + PTStringUtil.encodeURL(nvPairs[theName]) + '&';
	}
	if (formData.length > 0)
		this.formDataSet = formData.substring(0,formData.length-1);
}

PTHTTPRequest.prototype._setFormURLEncodedDataFromForm = function(formRef)
{
	this._requestForm = PTHTTPRequest._resolveFormReference(formRef);
	if (!this._requestForm) { return null; }
	var formData = '';
	var formInputs = this._requestForm.elements;
	for (var i=0; i<formInputs.length; i++)
	{
		var theInput = formInputs[i];
		if (theInput.tagName == 'BUTTON')
		{
			var encodedName = PTStringUtil.encodeURL(theInput.name);
			var encodedValue = PTStringUtil.encodeURL(PTStringUtil.getInnerText(theInput));
			formData += encodedName + '=' + encodedValue + '&';
		}
		else if (theInput.tagName == 'SELECT')
		{
			var encodedName = PTStringUtil.encodeURL(theInput.name);
			for (var j=0; j<theInput.options.length; j++)
			{
				if (theInput.options[j].selected)
				{
					var valueToEncode = (theInput.options[j].value) ? theInput.options[j].value : theInput.options[j].text;
					var encodedValue = PTStringUtil.encodeURL(valueToEncode);
					formData += encodedName + '=' + encodedValue + '&';
				}
			}
		}
		else if (theInput.tagName == 'TEXTAREA')
		{
			var encodedName = PTStringUtil.encodeURL(theInput.name);
			var encodedValue = PTStringUtil.encodeURL(theInput.value);
			formData += encodedName + '=' + encodedValue + '&';
		}
		else if (theInput.tagName == 'INPUT' && theInput.name)
		{			if (theInput.type == 'button' || theInput.type == 'file' || theInput.type == 'image' || theInput.type == 'submit')
			{
				continue;
			}
			else if (theInput.type == 'checkbox' || theInput.type == 'radio')
			{
				if (theInput.checked)
				{
					var encodedName = PTStringUtil.encodeURL(theInput.name);
					var encodedValue = PTStringUtil.encodeURL(theInput.value);
					formData += encodedName + '=' + encodedValue + '&';
				}
			}
			else
			{
				var encodedName = PTStringUtil.encodeURL(theInput.name);
				var encodedValue = PTStringUtil.encodeURL(theInput.value);
				formData += encodedName + '=' + encodedValue + '&';
			}
		}
	}
	if (formData.length > 0)
		this.formDataSet = formData.substring(0,formData.length-1);
}

PTHTTPRequest.prototype.setResponseHandler = function(responseHandler)
{
	if (typeof responseHandler == 'string' || typeof responseHandler == 'function')
	{
		this.callback = responseHandler;
	}
	else if (responseHandler && responseHandler.tagName)
	{
		this.targetElement = responseHandler;
	}
}

PTHTTPRequest.prototype.setFormContent = function(formContent)
{
	if (!formContent) { return; }
	if ((formContent.tagName  && formContent.tagName == 'FORM') || typeof formContent == 'string') 
	{
		this._setFormURLEncodedDataFromForm(formContent);
	}
	else if (typeof formContent == 'object')
	{
		this._setFormURLEncodedDataFromNVPairs(formContent);
	}
}

PTHTTPRequest.prototype.setRequestHeader = function(header, value)
{
	if (!header) { return; }
	this.requestHeaders[header] = value;
}

PTHTTPRequest.prototype.invoke = function (loadMessageCommand)
{
	var gotURLFromForm = false;
	if (!this.url && this._requestForm)
	{
		this.url = this._requestForm.action;
		gotURLFromForm = true;
	}
	if (!this.url)
	{
		return;
	}
	if (this.className == 'PTHTTPGETRequest' && this.formDataSet)
	{
		this.url += '?' + this.formDataSet;
	}
	var calledFromOnSubmit = false;
	var priorCaller = arguments.callee.caller;
	var callDepth = 0;
	while (priorCaller && ++callDepth < 100)
	{
		try{
		if (this._requestForm && 
			this._requestForm.onsubmit && 
			priorCaller == this._requestForm.onsubmit)
		{
			calledFromOnSubmit = true;
			break;
		}
		priorCaller = priorCaller.arguments.callee.caller;
		}
		catch(e){}
	}	
	if (this._requestForm && this._requestForm.onsubmit && this._requestForm.onsubmit.toString().indexOf('PTValidate_') == -1 && !calledFromOnSubmit)
	{
		var onsubmitReturn = this._requestForm.onsubmit();
		if (!onsubmitReturn)
		{
			return;
		}		if (gotURLFromForm)
		{	
			this.url = this._requestForm.action;
		}
	}
	if (this.callback)
	{
	}
	else if (this.targetElement)
	{
		this._targetElementCursorStyle = this.targetElement.style.cursor;
		this.targetElement.style.cursor = 'wait';
	}
	if (loadMessageCommand && (loadMessageCommand = new String(loadMessageCommand)))
	{		if (loadMessageCommand.lastIndexOf(')') != (loadMessageCommand.length - 1)) { loadMessageCommand += '(true)'; }
		try			{ eval(loadMessageCommand); }
		catch(e)	{  }
	}
	return PTHTTPTransport.invokeRequest(this);
}

PTHTTPRequest._resolveFormReference = function(formRef)
{
	if (!formRef) { return null; }
	var formElement = null;
	if (formRef.tagName && (formRef.tagName == 'FORM'))
	{
		formElement = formRef;
	}
	else if (typeof formRef == 'string')
	{		if (document[formRef])
		{
			formElement = document[formRef];
		}		else if (document.getElementById(formRef))
		{
			formElement = document.getElementById(formRef);
		}
	}
	return formElement;
}

PTHTTPGETRequest = function(url, responseHandler, concurrencyMode, properties)
{	if (url) { this.url = url; }
	this.setResponseHandler(responseHandler);
	if (concurrencyMode) { this.concurrencyMode = concurrencyMode; }
	if (properties)
	{
		for (var p in properties) { this.properties[p] = properties[p]; }
	}
	else
	{
		this.properties = {};	
	}		
	this.requestHeaders['Referer'] = window.location;
	return this;
}

PTHTTPGETRequest.prototype = new PTHTTPRequest();
PTHTTPGETRequest.prototype.constructor = PTHTTPGETRequest;
PTHTTPGETRequest.prototype._superClass = PTHTTPRequest;
PTHTTPGETRequest.VERSION  = '246682';
PTHTTPGETRequest.prototype.className	= 'PTHTTPGETRequest';
PTHTTPPOSTRequest = function(url, formContent, responseHandler, concurrencyMode, properties)
{	if (url) { this.url = url; }
	this.setFormContent(formContent);
	this.setResponseHandler(responseHandler);
	if (concurrencyMode) { this.concurrencyMode = concurrencyMode; }
	if (properties)
	{
		for (var p in properties) { this.properties[p] = properties[p]; }
	}
	else
	{
		this.properties = {};	
	}		
	return this;
}

PTHTTPPOSTRequest.prototype = new PTHTTPRequest();
PTHTTPPOSTRequest.prototype.constructor = PTHTTPPOSTRequest;
PTHTTPPOSTRequest.prototype._superClass = PTHTTPRequest;
PTHTTPPOSTRequest.VERSION  = '246682';
PTHTTPPOSTRequest.prototype.className	= 'PTHTTPPOSTRequest';
PTHTTPPOSTRequest.prototype.setFormContent = function(formContent)
{	if (PTHTTPTransport.transportType == 'iframe')
	{
		if (formContent && formContent.tagName  && formContent.tagName == 'FORM')
		{
			this._submitFormHTML = 
				PTHTTPPOSTRequest._genSubmitFormHTMLFromForm(formContent, this.url);
		}
		else if (formContent && typeof formContent == 'object')
		{
			this._submitFormHTML = 
				PTHTTPPOSTRequest._genSubmitFormHTMLFromNVPairs(formContent, this.url);
		}
	}
	else
	{		if (!this._super_setFormContent) 
		{ 
			this._super_setFormContent = this._superClass.prototype.setFormContent;
		}
		this._super_setFormContent(formContent);
	}
}

PTHTTPPOSTRequest.prototype.setPostBody = function(payload,contentType)
{
	if (!contentType) { contentType = 'text/plain'; }
	this.formDataSet = payload;
	this.setRequestHeader(PTHTTPRequest.CONTENT_TYPE_HEADER, contentType);
}

PTHTTPPOSTRequest.prototype.setPostBodyXML = function(xmlString)
{
	this.setPostBody(xmlString,'text/xml');
}

PTHTTPPOSTRequest._genSubmitFormHTMLFromNVPairs = function(theArray, url)
{
	var submitFormHTML = '<form name="submitForm" method="POST" action="' + url + '">\n';
	for (prop in theArray)
	{
		submitFormHTML += '<input type="hidden" ';
		submitFormHTML += 'name="' + PTStringUtil.escapeHTML(prop) + '" ';
		submitFormHTML += 'value="' + PTStringUtil.escapeHTML(theArray[prop]) + '">\n';
	}
	submitFormHTML += '</form>';
	return submitFormHTML;
}

PTHTTPPOSTRequest._genSubmitFormHTMLFromForm = function(theForm, url)
{
	var submitFormHTML = '<form name="submitForm" method="POST" action="' + url + '">\n';
	var formInputs = theForm.elements;
	for (var i=0; i<formInputs.length; i++)
	{
		var theInput = formInputs[i];
		if (theInput.tagName == 'BUTTON')
		{
			var escapedName = PTStringUtil.escapeHTML(theInput.name);
			var escapedValue = PTStringUtil.escapeHTML(theInput.innerText);
			submitFormHTML += '<input type="hidden" ';
			submitFormHTML += 'name="' + escapedName + '" ';
			submitFormHTML += 'value="' + escapedValue + '">\n';
		}
		else if (theInput.tagName == 'SELECT')
		{
			var escapedName = PTStringUtil.escapeHTML(theInput.name);
			for (var j=0; j<theInput.options.length; j++)
			{
				if (theInput.options[j].selected)
				{
					var valueToEscape = (theInput.options[j].value) ? theInput.options[j].value : theInput.options[j].text;
					var escapedValue = PTStringUtil.escapeHTML(valueToEscape);
					submitFormHTML += 'name="' + escapedName + '" ';
					submitFormHTML += 'value="' + escapedValue + '">\n';
				}
			}
		}
		else if (theInput.tagName == 'TEXTAREA')
		{
			var escapedName = PTStringUtil.escapeHTML(theInput.name);
			var escapedValue = PTStringUtil.escapeHTML(theInput.value);
			submitFormHTML += 'name="' + escapedName + '" ';
			submitFormHTML += 'value="' + escapedValue + '">\n';
		}
		else if (theInput.tagName == 'INPUT' && theInput.name)
		{			if (theInput.type == 'file' || theInput.type == 'image')
			{
				continue;
			}
			else if (theInput.type == 'checkbox' || theInput.type == 'radio')
			{
				if (theInput.checked)
				{
					var escapedName = PTStringUtil.escapeHTML(theInput.name);
					var escapedValue = PTStringUtil.escapeHTML(theInput.value);
					submitFormHTML += 'name="' + escapedName + '" ';
					submitFormHTML += 'value="' + escapedValue + '">\n';
				}
			}
			else
			{
				var encodedName = PTStringUtil.encodeURL(theInput.name);
				var encodedValue = PTStringUtil.encodeURL(theInput.value);
				submitFormHTML += 'name="' + escapedName + '" ';
				submitFormHTML += 'value="' + escapedValue + '">\n';
			}
		}
	}
	submitFormHTML += '</form>';
	return submitFormHTML;
}

PTHTTPResponse = function(request, responseText, responseXML, status, type, responseHeadersString)
{
	this.request 			= (request) ? request : new Object();
	this.responseText		= (responseText) ? responseText : '';
	this.responseXML		= (responseXML) ? responseXML : false;
	this.status				= (status) ? parseInt(status) : false;
	this.type				= (type) ? type : null;
	this._responseHeaders		= false;
	this._responseHeadersString	= responseHeadersString;
	if (!type && this.status)
	{		var hasPTResponseType = (responseHeadersString.toLowerCase().indexOf(PTHTTPResponse.PT_RESPONSE_TYPE_HEADER.toLowerCase()) > -1) ? true: false;
		if	  (this.status == 200 && !hasPTResponseType) { this.type = PTHTTPResponse.RESPONSE_TYPE_OK; }
		else if (this.status == 204 || this.status == 1223) { this.type = PTHTTPResponse.RESPONSE_TYPE_EMPTY_RESPONSE; }
		else if (this.status >= 400 && this.status < 600) { this.type = PTHTTPResponse.RESPONSE_TYPE_SERVER_ERROR; }
		else
		{			this.type = this._getResponseTypeFromHeaders(this.status);
		}
	}
	this.className			= 'PTHTTPResponse';
	return this;
}

PTHTTPResponse.VERSION  = '246682';
PTHTTPResponse.RESPONSE_TYPE_OK					= 'ok';
PTHTTPResponse.RESPONSE_TYPE_REDIRECT				= 'redirect';
PTHTTPResponse.RESPONSE_TYPE_SESSION_EXPIRED		= 'session_expired';
PTHTTPResponse.RESPONSE_TYPE_PORTLET_ERROR		= 'portlet_error';
PTHTTPResponse.RESPONSE_TYPE_PORTLET_TIMEOUT		= 'portlet_timeout';
PTHTTPResponse.RESPONSE_TYPE_SERVER_ERROR			= 'server_error';
PTHTTPResponse.RESPONSE_TYPE_EMPTY_RESPONSE		= 'empty_response';
PTHTTPResponse.RESPONSE_TYPE_NO_RESPONSE			= 'no_response';
PTHTTPResponse.PT_RESPONSE_TYPE_HEADER			= 'PT-HTTPResponse-Type';
PTHTTPResponse.PT_RESPONSE_TYPE_HEADER_SAFARI		= 'Pt-Httpresponse-Type'; 
PTHTTPResponse.PT_RESPONSE_TYPE_PORTLET_ERROR		= 'PORTLET_ERROR';
PTHTTPResponse.PT_RESPONSE_TYPE_PORTLET_TIMEOUT	= 'PORTLET_TIMEOUT';
PTHTTPResponse.PT_RESPONSE_TYPE_SESSION_TIMEOUT	= 'SESSION_TIMEOUT';
PTHTTPResponse.PT_LOGIN_URL_HEADER				= 'PT-Login-URL';
PTHTTPResponse.prototype._getResponseTypeFromHeaders = function(status)
{
	var responseHeaders = this.getResponseHeaders();
	var ptReponseTypeHeader = (PTBrowserInfo.IS_SAFARI) ? PTHTTPResponse.PT_RESPONSE_TYPE_HEADER_SAFARI : PTHTTPResponse.PT_RESPONSE_TYPE_HEADER;
	if (responseHeaders[ptReponseTypeHeader] == PTHTTPResponse.PT_RESPONSE_TYPE_PORTLET_ERROR)
	{
		return PTHTTPResponse.RESPONSE_TYPE_PORTLET_ERROR;
	}
	else if (responseHeaders[ptReponseTypeHeader] == PTHTTPResponse.PT_RESPONSE_TYPE_PORTLET_TIMEOUT)
	{
		return PTHTTPResponse.RESPONSE_TYPE_PORTLET_TIMEOUT;
	}
	else if (responseHeaders[ptReponseTypeHeader] == PTHTTPResponse.PT_RESPONSE_TYPE_SESSION_TIMEOUT)
	{
		return PTHTTPResponse.RESPONSE_TYPE_SESSION_EXPIRED;
	}	else if (status == 302) 
	{ 
		return PTHTTPResponse.RESPONSE_TYPE_REDIRECT; 
	}
}

PTHTTPResponse.prototype.getResponseHeaders = function()
{	if (this._responseHeaders) { return this._responseHeaders; }
	else
	{
		this._responseHeaders = new Object();
		if (this._responseHeadersString)
		{
			var responseHeadersArray = this._responseHeadersString.split('\n');
			for (var i=0; i<responseHeadersArray.length; i++)
			{
				var headerLine = responseHeadersArray[i];
				var headerNVPair = headerLine.split(': ');
				if (headerNVPair[0] && headerNVPair[1])
				{
					var headerName = PTStringUtil.trimWhitespace(headerNVPair[0], true, true);
					var headerValue = PTStringUtil.trimWhitespace(headerNVPair[1], true, true);
					this._responseHeaders[headerName] = headerValue;				}
			}
		}
		return this._responseHeaders;
	}
}

PTHTTPResponse.isValid = function(HTTPResponse)
{
	return (HTTPResponse && HTTPResponse.responseText && (HTTPResponse.responseText.length > 0) && !PTStringUtil.isAllWhitespace(HTTPResponse.responseText));
}

function PTXMLCompositor() {
	return this;
}

PTXMLCompositor.VERSION  = '246682';
PTXMLCompositor.VALUE_AUTOSET 	= 'VALUE_AUTOSET';
PTXMLCompositor.nextUID			= (new Date()).getTime();
PTXMLCompositor.URLNodes		= { 'baseURL' : true, 'imgSrc' : true ,'URL' : true, 'srcURL' : true, 'defaultPageURL' : true, 'relativeBaseURL' : true };
PTXMLCompositor.expandFromXML = function(xml,w,obj)
{
	var topObjectName = w.getAttribute(xml,'class');
	if (!topObjectName)
	{
		return;
	}
	if (!obj) { obj = PTXMLCompositor.inflateObject(topObjectName,xml,w); }
	var onFinishCompositorID = 'finishcompositor' + ++PTXMLCompositor.nextUID;
	obj = PTXMLCompositor.inflateNode(xml,obj,w,null,onFinishCompositorID);
	var evt = new Object();
	evt.type = onFinishCompositorID;
	document.PCC.RaiseWindowEvent(evt);
	return obj;
}

PTXMLCompositor.inflateObject = function(objName,node,w,mode,obj)
{
	try
	{
		var newObj = null;
		if ((objName == 'Number') && node)
		{
			var nodeValue = new String(w.getNodeValue(node));
			if (isNaN(nodeValue)) { throw ''; }
			if (nodeValue.indexOf('.') > -1)
			{
				newObj = parseFloat(nodeValue);
			}
			else 
			{
				newObj = parseInt(nodeValue);
			}
		}
		else if ((objName == 'Boolean') && node)
		{
			if ((w.getNodeValue(node) == 'false') || (w.getNodeValue(node) == '0'))
			{
				newObj = false;
			}
			else {
				newObj = true;
			}
		}
		else if (objName == 'Date')
		{
			var dateValue = w.getNodeValue(node);
			try {
				newObj = new Date(dateValue);
			} catch(e) {
				newObj = new Date('\'' + dateValue + '\'');
			}
			if (!newObj) { throw ''; }
		}
		else if (objName == 'PTDate')
		{
			newObj = new PTDate(w.getNodeValue(node));
			newObj.date = new Date(w.getNodeValue(node));
		}
		else if ((objName == 'Hash') || (objName == 'Array'))
		{
			if (mode && (mode == 'merge') && obj)
			{
				newObj = obj;
			}
			else
			{
				newObj = new Array();
			}
		}
		else if (objName == 'PTSimpleMenuItem')
		{
			newObj = new PTMenuItem();
			newObj.type = PTMenuItem.SIMPLE_MENU_ITEM;
		}
		else if (objName == 'PTDividerMenuItem')
		{
			newObj = new PTMenuItem();
			newObj.type = PTMenuItem.DIVIDER_MENU_ITEM;
		}
		else if (objName == 'PTRadioMenuItem')
		{
			newObj = new PTMenuItem();
			newObj.type = PTMenuItem.RADIO_MENU_ITEM;
		}
		else if (objName == 'PTCheckboxMenuItem')
		{
			newObj = new PTMenuItem();
			newObj.type = PTMenuItem.CHECKBOX_MENU_ITEM;
		}
		else if (objName == 'PTCascadingMenuItem')
		{
			newObj = new PTMenuItem();
			newObj.type = PTMenuItem.CASCADING_MENU_ITEM;
		}
		else if (objName == 'PTAntiMatter')
		{
			newObj = null;
		}
		else if (objName == 'null')
		{
			newObj = null;
		}
		else
		{
			newObj = new window[objName]();
		}		return newObj;
	}
	catch(e)
	{
		var alertMsg = 'PTXMLCompositor: Failed to create new ' + objName + '.';
		if ((objName == 'Number') && node && w)
		{
			if (isNaN(w.getNodeValue(node)))
			{
				alertMsg += '\n\nInvalid numeric value:  ';
				alertMsg += w.getNodeValue(node);
			}
		}
		else
		{
			if (e.message) { alertMsg += '\n\n' + e.message; }
		}
		return;
	}
}

PTXMLCompositor.inflateNode	= function(node,obj,w,parentObj,onFinishCompositorID)
{
	if (!node) 
	{ 
		return;
	}
	var c = node.childNodes;
	var childNodesLength = c.length;
	for (var i = 0; i < childNodesLength; i++) {
		var child = c[i];
		var cNodeName = new String(w.getNodeName(child));
		if (cNodeName == '#text' || cNodeName == '#comment') { continue; }
		try {
			var index = w.getAttribute(child,'index');			
			var key = w.getAttribute(child,'key');
			var objName = w.getAttribute(child,'class');
			var mod = w.getAttribute(child,'mod');
			var mode = w.getAttribute(child,'mode');
		} catch(e) {
			continue;
		}
		if (cNodeName == 'component')
		{
			var ptComponent = PTXMLCompositor.expandComponent(node,child,w);
			if (ptComponent)
			{
				obj[cNodeName] = ptComponent;
			}
			else
			{
				obj[cNodeName] = PTXMLCompositor.inflateObject(objName,child,w,mode,obj[cNodeName]);
				obj[cNodeName] = PTXMLCompositor.inflateNode(child,obj[cNodeName],w,obj,onFinishCompositorID);
			}
		}
		else if ((objName == 'PTPanelSet') && (index != null))
		{
			var ptComponent = PTXMLCompositor.expandComponent(node,child,w);
			var orderNum = parseInt(index);
			if (ptComponent)
			{
				obj[orderNum] = ptComponent;
			}
			else
			{
				obj[orderNum] = PTXMLCompositor.inflateObject(objName,child,w,mode,obj[orderNum]);
				obj[orderNum] = PTXMLCompositor.inflateNode(child,obj[orderNum],w,obj,onFinishCompositorID);
			}
		}
		else if (cNodeName == 'javascript')
		{
			eval(w.getNodeValue(child));
		}
		else if (index && objName)
		{
			var orderNum = parseInt(index);
			obj[orderNum] = PTXMLCompositor.inflateObject(objName,child,w,mode,obj[orderNum]);
			obj[orderNum] = PTXMLCompositor.inflateNode(child,obj[orderNum],w,obj,onFinishCompositorID);
		}
		else if (index)
		{
			var orderNum = parseInt(index);
			obj[orderNum] = w.getNodeValue(child);
		}
		else if (key)
		{
			if (objName)
			{
				obj[key] = PTXMLCompositor.inflateObject(objName,child,w,mode,obj[key]);
				obj[key] = PTXMLCompositor.inflateNode(child,obj[key],w,obj,onFinishCompositorID);
			}
			obj[key] = w.getNodeValue(child);
		}
		else if (cNodeName == 'rows' && obj.className == 'PTTableControl')
		{
			obj.rowNodes = new Array();
			for (var j=0; j < child.childNodes.length; j++)
			{
				var rowNode = child.childNodes[j];
				var rowNodeName = new String(w.getNodeName(rowNode));
				if (rowNodeName == '#text' || rowNodeName == '#comment') { continue; }
				var rowIndex = parseInt(w.getAttribute(rowNode,'index'));	
				obj.rowNodes[rowIndex] = rowNode;
			}
			obj.rows = new Array(obj.rowNodes.length);
		}
		else if (objName)
		{
			obj[cNodeName] = PTXMLCompositor.inflateObject(objName,child,w,mode,obj[cNodeName]);
			obj[cNodeName] = PTXMLCompositor.inflateNode(child,obj[cNodeName],w,obj,onFinishCompositorID);
		}
		else
		{
			var nodeValue = new String(w.getNodeValue(child));
			if ((cNodeName == 'js') && (nodeValue.indexOf('<script>') > -1))
			{
				var endIndex = nodeValue.indexOf('</script>');
				var js = nodeValue.substring(nodeValue.indexOf('<script>') + 8,endIndex);
				obj[cNodeName] = js;
			}
			else if (nodeValue.indexOf('<html-frag>') > -1)
			{
				var endIndex = nodeValue.indexOf('</html-frag>');
				var html = nodeValue.substring(nodeValue.indexOf('<html-frag>') + 11,endIndex);
				obj[cNodeName] = html;
			}
			else
			{
				var isURLNode = PTXMLCompositor.URLNodes[cNodeName] ? true : false;
				if (isURLNode && (nodeValue.indexOf('<a href="') > -1))
				{
					var endIndex = nodeValue.indexOf('"></a>');
					var href = nodeValue.substring(nodeValue.indexOf('<a href="') + 9,endIndex);
					obj[cNodeName] = href;
				}
				else
				{					obj[cNodeName] = w.getNodeValue(child);
				}
			}
		}
		if ((cNodeName == 'srcURL') && obj.className && (obj.className == 'PTHTMLPanel'))
		{
			var tempPanelName = 'PTXMLCompositor_PanelLoadPointer_' + ++PTXMLCompositor.nextUID;
			window[tempPanelName] = obj;
			document.PCC.RegisterForWindowEvent('on' + onFinishCompositorID, tempPanelName + '.loadSrcURL');
		}
		if (obj[cNodeName] && obj[cNodeName].parent && (obj[cNodeName].parent == PTXMLCompositor.VALUE_AUTOSET))
		{
			obj[cNodeName].parent = obj;
		}
		else if (index)
		{
			var orderNum = parseInt(index);
			if (obj[orderNum] && obj[orderNum].parent && (obj[orderNum].parent == PTXMLCompositor.VALUE_AUTOSET))
			{
				obj[orderNum].parent = parentObj;
			}
		}
		if (obj[cNodeName] && obj[cNodeName].uid && (obj[cNodeName].uid == PTXMLCompositor.VALUE_AUTOSET))
		{
			obj[cNodeName].uid = ++PTXMLCompositor.nextUID;
		}
		else if (index)
		{
			var orderNum = parseInt(index);
			if (obj[orderNum] && obj[orderNum].uid && (obj[orderNum].uid == PTXMLCompositor.VALUE_AUTOSET))
			{
				obj[orderNum].uid = ++PTXMLCompositor.nextUID;
			}
		}
		if (index)
		{
			var orderNum = parseInt(index);
			if (obj[orderNum] && obj[orderNum].index && (obj[orderNum].index == PTXMLCompositor.VALUE_AUTOSET))
			{
				obj[orderNum].index = orderNum;
			}
		}
		if (cNodeName == 'objName')
		{
			var globalObjectName = w.getNodeValue(child);
			if (globalObjectName && (globalObjectName.length > 0))
			{
				PTControls.makeGlobalObject(obj,globalObjectName);				
			}
		}
	}
	return obj;
}

PTXMLCompositor.expandComponent = function(parentNode,node,w)
{
	if (!node) { return false; }
	var ptComponent = false;
	try {
		var cls = w.getAttribute(node,'class');
	} catch(e) {
		return false;
	}
	var elem = window[cls];
	if (!elem)
	{
		return false;
	}
	var mode = false;
	try {
		mode = w.getAttribute(node,'mode');
	} catch(e) {}

	var objNameNode = w.selectSingleNode(node,'objName');
	if (!objNameNode)
	{
		return false;
	}
	var objName = w.getNodeValue(objNameNode);
	try {
		if (mode && (mode == 'merge'))
		{
			window[objName] = window[cls].createFromNode(node,w,objName);
			return window[objName];
		}
		else if (parentNode)
		{
			ptComponent = window[cls].createFromXML(parentNode,w);
		}
	} catch(e) {
		return false;
	}
	if (!ptComponent)
	{
		try {
			ptComponent = window[cls].createFromNode(node,w);
		} catch(e) {
			return false;
		}
	}
	if (!ptComponent)
	{
	}
	PTControls.makeGlobalObject(ptComponent,objName,true);
	return ptComponent;
}

PTXMLCompositor.unescapeTokens = function(str)
{
	return str;
}

PTXMLDocument = function(doc) 
{
	if (doc) { this._doc = doc; }
	else
	{
		var msg = 'No document to wrap. To create a new document, use the PTXMLDocumentBuilder class.';
		throw msg;
	}
}

PTXMLDocument.VERSION = '246682';
PTXMLDocument.ELEMENT_NODE  				= 1;
PTXMLDocument.ATTRIBUTE_NODE 				= 2;
PTXMLDocument.TEXT_NODE 					= 3;
PTXMLDocument.CDATA_SECTION_NODE 			= 4;
PTXMLDocument.ENTITY_REFERENCE_NODE 		= 5;
PTXMLDocument.ENTITY_NODE 					= 6;
PTXMLDocument.PROCESSING_INSTRUCTION_NODE 	= 7;
PTXMLDocument.COMMENT_NODE 					= 8;
PTXMLDocument.DOCUMENT_NODE 				= 9;
PTXMLDocument.DOCUMENT_TYPE_NODE 			= 10;
PTXMLDocument.DOCUMENT_FRAGMENT_NODE 		= 11;
PTXMLDocument.NOTATION_NODE 				= 12;
PTXMLDocument.prototype.getUnderlyingObject = function()
{
	return this._doc;
}

PTXMLDocument.prototype.loadFromString = function(str)
{
	var ptdoc = PTXMLDocumentBuilder.createFromString(str);
	this._doc = ptdoc._doc;
}

PTXMLDocument.prototype.serializeToString = function()
{
	if (!this._doc)
	{
		return '';	
	}
	if (this._doc.xml) 	
	{
		return this._doc.xml;
	} 
	else if (window.XMLSerializer) 
	{
		var xml = (new XMLSerializer()).serializeToString(this._doc);
		return xml;
	} 
	else 
	{
		return '';
	}
}

PTXMLDocument.prototype.getDocumentElement = function()
{	if (PTXMLDocumentBuilder.parserType == PTXMLDocumentBuilder.PARSER_TYPE_PTXML)
	{
		return this._doc;
	}
	else
	{
		return this._doc.documentElement;
	}
}

PTXMLDocument.prototype.createElement = function(elementName)
{
	return this._doc.createElement(elementName);
}

PTXMLDocument.prototype.appendChild = function(node)
{
	return this._doc.appendChild(node);
}

PTXMLDocument.prototype.getElementsByTagName = function(tagName)
{
	return this._doc.getElementsByTagName(tagName);
}

PTXMLDocument.prototype.importNode = function(node, deep)
{
	return this._doc.importNode(node, deep);
}

PTXMLDocument.selectSingleNode = function(contextNode,expr)
{	if (PTXMLDocumentBuilder.parserType == PTXMLDocumentBuilder.PARSER_TYPE_MSXML)
	{
		return contextNode.selectSingleNode(expr);
	}
	else
	{
		var childNodes = contextNode.childNodes;
		if (childNodes)
		{
			var len = childNodes.length;
			for (var n = 0; n < len; n++)
			{
				var cn = childNodes.item(n);
				if (cn.nodeName == expr)
				{
					return childNodes.item(n);
				}
			}
		}
	}
}

PTXMLDocument.prototype.selectSingleNode = function(expr)
{
	return PTXMLDocument.selectSingleNode(this._doc,expr);
}

PTXMLDocument.getAttributeValue = function(node,attrName)
{
	if (!node) { return null; }	if (PTXMLDocumentBuilder.parserType == PTXMLDocumentBuilder.PARSER_TYPE_MSXML)  
	{
		return node.getAttribute(attrName);
	} 	else if (node.attributes && node.attributes.getNamedItem)
	{
		var ni = node.attributes.getNamedItem(attrName);
		if (ni) { return ni.nodeValue; }
	}
	return null;
}

PTXMLDocument.prototype.getAttributeValue = function(node,attrName)
{
	return PTXMLDocument.getAttributeValue(node,attrName);
}

PTXMLDocument.getNodeValue = function(node)
{	if (PTXMLDocumentBuilder.parserType == PTXMLDocumentBuilder.PARSER_TYPE_MSXML) 
	{
		var v = node.nodeValue;
		if (v) 					{ return v; } 
		else if (node.text) 	{ return node.text; } 
		else 					{ return null; }
	} 	else 
	{
		if (node.childNodes && node.childNodes[1] && (node.childNodes[1].nodeType == PTXMLDocument.CDATA_SECTION_NODE))
		{
			return node.childNodes[1].nodeValue;
		}
		else if (node.firstChild) 	
		{ 
			return node.firstChild.nodeValue;
		}
		else						
		{ 
			return null; 
		}
	} 
}

PTXMLDocument.prototype.getNodeValue = function(node)
{
	return PTXMLDocument.getNodeValue(node);
}

PTXMLDocumentBuilder = function() {}

PTXMLDocumentBuilder.VERSION = '246682';
PTXMLDocumentBuilder.PARSER_TYPE_MSXML = 'MSXML';	
PTXMLDocumentBuilder.PARSER_TYPE_MOZDP = 'MOZDP';
PTXMLDocumentBuilder.PARSER_TYPE_PTXML = 'PTXML';
PTXMLDocumentBuilder.parserType 		= false;
PTXMLDocumentBuilder.parserTypeMSIE 	= false;  	 
PTXMLDocumentBuilder._testXMLString = '<?xml version="1.0" encoding="UTF-8" ?>\n<root>test</root>\n';
PTXMLDocumentBuilder._getParserTypeMSIE = function()
{
	var parserTypes = new Array(
		'MSXML2.DOMDocument.3.0',
		'MSXML2.DOMDocument.2.6',
		'MSXML2.DOMDocument',
		'MSXML.DOMDocument',
		'Microsoft.XMLDOM'
	);
	var parserTypeMSIE = false;
	TEST:
	for (var p = 0; p < parserTypes.length; p++)
	{
		var parserType = parserTypes[p];
		try {
			object = new ActiveXObject(parserType);
			object.async = false;
			object.loadXML(PTXMLDocumentBuilder._testXMLString);
			while (object.readyState != 4) {
				if (object.parseError.errorCode != 0) {
					continue TEST;
				}
			}
			var doc = object.documentElement;
			if (!doc) { continue TEST; }
			var ssn1Test = object.selectSingleNode('root');
			if (!ssn1Test) { continue TEST; }
			var ceTest = object.createElement('newnode');
			if (!ceTest) { continue TEST; }
		}
		catch(e) { continue TEST; }
		parserTypeMSIE = parserType;
		break;
	}
	return parserTypeMSIE;
}

PTXMLDocumentBuilder.init = function()
{	if (PTBrowserInfo.IS_MSIE && PTBrowserInfo.MSIE_VERSION >= 5)
	{
		var parserTypeMSIE = PTXMLDocumentBuilder._getParserTypeMSIE();
		if (parserTypeMSIE)
		{
			PTXMLDocumentBuilder.parserType = PTXMLDocumentBuilder.PARSER_TYPE_MSXML;
			PTXMLDocumentBuilder.parserTypeMSIE = parserTypeMSIE;
			return;
		}
	}	if (PTBrowserInfo.IS_MOZILLA && window.DOMParser)
	{
		try
		{
			(new DOMParser()).parseFromString(PTXMLDocumentBuilder._testXMLString,'text/xml');
			PTXMLDocumentBuilder.parserType = PTXMLDocumentBuilder.PARSER_TYPE_MOZDP;
			return;
		}
		catch(e) {}

	}
	PTXMLDocumentBuilder.parserType = PTXMLDocumentBuilder.PARSER_TYPE_PTXML;
}

PTXMLDocumentBuilder.init();
PTXMLDocumentBuilder._unescapeCDATAs = function(str)
{
	var startCDATA = /&lt;!\[CDATA\[/g;
	str = str.replace(startCDATA,'<![CDATA[');
	var endCDATA = /\]\]&gt;/g;
	str = str.replace(endCDATA,']]>');
	return str;
}

PTXMLDocumentBuilder._stripPreXML = function(str)
{
	if (str.indexOf('<?xml') > -1)
	{
		return str.substr(str.indexOf('<?xml'));
	}
	else { return str; }
}

PTXMLDocumentBuilder.createFromString = function(str)
{
	str = PTXMLDocumentBuilder._stripPreXML(str);
	str = PTXMLDocumentBuilder._unescapeCDATAs(str);
	var doc;
	if (PTXMLDocumentBuilder.parserType == PTXMLDocumentBuilder.PARSER_TYPE_MSXML)
	{
		if (str.indexOf('<?xml') == -1)
		{
			str = '<?xml version="1.0"?>\n' + str;
		}
		doc = new ActiveXObject(PTXMLDocumentBuilder.parserTypeMSIE);
		doc.async = false;
		doc.loadXML(str);
		try {			doc.setProperty('NewParser',true);
		} catch(e) {}

		while (doc.readyState != 4) { }
	}
	else if (PTXMLDocumentBuilder.parserType == PTXMLDocumentBuilder.PARSER_TYPE_MOZDP)
	{
		var domParser = new DOMParser();
		if (str.indexOf('<?xml') == -1)
		{
			str = '<?xml version="1.0"?>\n' + str;
		}
		try
		{
			doc = domParser.parseFromString(str,'text/xml');
			if(doc.documentElement.tagName == "parsererror")
			{
			}
		}
		catch (e)
		{
		}
	}
	else if (PTXMLDocumentBuilder.parserType == PTXMLDocumentBuilder.PARSER_TYPE_PTXML)
	{
		doc = PTXMLParser.parseFromString(str);
	}
	return new PTXMLDocument(doc);
}

PTXMLDocumentBuilder.createFromURI = function(uri)
{
	var request = new PTHTTPGETRequest(uri, false, PTHTTPTransport.CCMODE_SYNC);
	var resp = request.invoke();	if(resp && resp.responseXML)
	{
		return new PTXMLDocument(resp.responseXML);
	}
	else if (resp && resp.responseText)
	{
		return PTXMLDocumentBuilder.createFromString(resp.responseText);
	}
	else
	{
	}
}

PTXMLDocumentBuilder.create = function()
{
	var doc;	if (PTXMLDocumentBuilder.parserType == PTXMLDocumentBuilder.PARSER_TYPE_MSXML)
	{
		doc = new ActiveXObject(PTXMLDocumentBuilder.parserTypeMSIE);
	}	else if (document.implementation && document.implementation.createDocument)
	{
		doc = document.implementation.createDocument('', '', null);
	}
	return new PTXMLDocument(doc);
}

PTXMLParser = function() 
{ 
	return this;
}

PTXMLParser.VERSION = '246682';
PTXMLParser.parseFromString = function(str)
{	var doc;
	if (document.implementation && document.implementation.createDocument)
	{
		doc = document.implementation.createDocument('', '', null);
	}
	else
	{
		return false;
	}
	var frag = new _PTXMLParserFrag(doc);
	frag.str = PTXMLUtil.stripProlog(str);
	PTXMLParser._recurseAndParse(frag);
	for (var i=0; i<frag.childNodes.length; i++)
	{
		var childNode = frag.childNodes[i];		if (childNode.nodeType == 1) 
		{
			doc.appendChild(childNode);
		}
	}
	return doc;
}

_PTXMLParserFrag = function(parentNode) 
{ 
	this.parentNode = parentNode;
	this.str = new String();
	this.childNodes = new Array();
	this.end = new String();
}

PTXMLParser._getDoc = function(frag)
{
	if (frag.parentNode.nodeType == 9) 
	{
		return frag.parentNode
	}
	else
	{
		return frag.parentNode.ownerDocument;
	}
}

PTXMLParser._recurseAndParse = function(frag)
{	while (1) {		if (frag.str.length == 0) { return; }
		var tagStart = frag.str.indexOf('<');
		if (tagStart != 0) 
		{			var thisNodeIdx = frag.childNodes.length;
			frag.childNodes[thisNodeIdx] = PTXMLParser._getDoc(frag).createTextNode('');
			if (tagStart == -1) 
			{
				frag.childNodes[thisNodeIdx].nodeValue = PTXMLUtil.unescapeEntities(frag.str);
				frag.str = '';
			} 
			else 
			{
				frag.childNodes[thisNodeIdx].nodeValue = PTXMLUtil.unescapeEntities(frag.str.substring(0,tagStart));
				frag.str = frag.str.substring(tagStart,frag.str.length);
			}
		} 
		else 
		{			if(frag.str.substring(1,2) == '?') 
			{
				PTXMLParser._processPI(frag);
			} 
			else if (frag.str.substring(1,4) == '!--') 
			{
				PTXMLParser._processComment(frag);
			} 
			else if (frag.str.substring(1,9) == '![CDATA[') 
			{
				PTXMLParser._processCDATA(frag);
			} 
			else if (frag.str.substring(1,frag.end.length + 3) == '/' + frag.end + '>' || PTXMLUtil.stripWhitespace(frag.str.substring(1,frag.end.length + 3)) == '/' + frag.end) 
			{				frag.str = frag.str.substring(frag.end.length + 3,frag.str.length);
				frag.end = '';
				return;
			} 
			else 
			{
				PTXMLParser._processElement(frag);
			}
		}
	}
}

PTXMLParser._processElement = function(frag)
{
	var close = frag.str.indexOf('>');
	var empty = (frag.str.substring(close - 1,close) == '/');
	if (empty) { close -= 1; }
	var starttag = PTXMLUtil.normalizeWhitespace(frag.str.substring(1,close));
	var nextspace = starttag.indexOf(' ');
	var attribs = new String();
	var name = new String();
	if (nextspace != -1) 
	{
		name = starttag.substring(0,nextspace);
		attribs = starttag.substring(nextspace + 1,starttag.length);
	} 
	else 
	{ 
		name = starttag; 
	}
	var thisNodeIdx = frag.childNodes.length;
	var elmName = PTXMLUtil.stripWhitespace(name);
	frag.childNodes[thisNodeIdx] = PTXMLParser._getDoc(frag).createElement(elmName);
	if (attribs.length > 0) 
	{
		PTXMLParser._processAttributes(frag.childNodes[thisNodeIdx], attribs);
	}
	if (!empty) 
	{
		var childFrag = new _PTXMLParserFrag(frag.parentNode);
		childFrag.str = frag.str.substring(close + 1,frag.str.length);
		childFrag.end = name;
		PTXMLParser._recurseAndParse(childFrag);
		for (var i=0; i<childFrag.childNodes.length; i++)
		{
			frag.childNodes[thisNodeIdx].appendChild(childFrag.childNodes[i]);
		}
		frag.str = childFrag.str;
	} 
	else 
	{
		frag.str = frag.str.substring(close + 2,frag.str.length);
	}
}

PTXMLParser._processPI = function(frag)
{
	var close = frag.str.indexOf('?>');
	var val = frag.str.substring(2,close);
	var thisNodeIdx = frag.childNodes.length;
	frag.childNodes[thisNodeIdx] = PTXMLParser._getDoc(frag).createProcessingInstruction();
	frag.childNodes[thisNodeIdx].nodeValue = val;
	frag.str = frag.str.substring(close + 2,frag.str.length);
}

PTXMLParser._processComment = function(frag)
{
	var close = frag.str.indexOf('-->');
	var val = frag.str.substring(4,close);
	var thisNodeIdx = frag.childNodes.length;
	frag.childNodes[thisNodeIdx] = PTXMLParser._getDoc(frag).createComment();
	frag.childNodes[thisNodeIdx].nodeValue = val;
	frag.str = frag.str.substring(close + 3,frag.str.length);
}

PTXMLParser._processCDATA = function(frag)
{
	var close = frag.str.indexOf(']]>');
	var val = frag.str.substring(9,close);
	var thisNodeIdx = frag.childNodes.length;
	frag.childNodes[thisNodeIdx] = PTXMLParser._getDoc(frag).createCDATASection();
	frag.childNodes[thisNodeIdx].nodeValue = val;
	frag.str = frag.str.substring(close + 3,frag.str.length);
}

PTXMLParser._processAttributes = function(node, str) 
{
	while (1)
	{
		var eq = str.indexOf('=');
		if (str.length == 0 || eq == -1) { return; }
		var id1 = str.indexOf('\'');
		var id2 = str.indexOf('\"');
		var ids = new Number();
		var id = new String();
		if ((id1 < id2 && id1 != -1) || id2 == -1) 
		{
			ids = id1;
			id = '\'';
		}
		if ((id2 < id1 || id1 == -1) && id2 != -1) 
		{
			ids = id2;
			id = '\"';
		}
		var nextid = str.indexOf(id,ids + 1);
		var val = str.substring(ids + 1,nextid);
		var name = PTXMLUtil.stripWhitespace(str.substring(0,eq));
		node.setAttribute(name, val);
		str = str.substring(nextid + 1,str.length);
	}
}

PTXMLUtil = function() {}

PTXMLUtil.VERSION = '246682';
PTXMLUtil.stripProlog = function(str) 
{
	var a = new Array();
	a = str.split('\r\n');
	str = a.join('\n');
	a = str.split('\r');
	str = a.join('\n');
	var start = str.indexOf('<');
	if (str.substring(start,start + 3) == '<?x' || str.substring(start,start + 3) == '<?X' ) 
	{
		var close = str.indexOf('?>');
		str = str.substring(close + 2,str.length);
	}
	var start = str.indexOf('<!DOCTYPE');
	if (start != -1) 
	{
		var close = str.indexOf('>',start) + 1;
		var dp = str.indexOf('[',start);
		if(dp < close && dp != -1) 
		{
			close = str.indexOf(']>',start) + 2;
		}
		str = str.substring(close,str.length);
	}
	return str;
}

PTXMLUtil.stripWhitespace = function(str)
{
	var a = new Array();
	a = str.split('\n');
	str = a.join('');
	a = str.split(' ');
	str = a.join('');
	a = str.split('\t');
	str = a.join('');
	return str;
}

PTXMLUtil.normalizeWhitespace = function(str)
{
	var a = new Array();
	a = str.split('\n');
	str = a.join(' ');
	a = str.split('\t');
	str = a.join(' ');
	return str;
}

PTXMLUtil.unescapeEntities = function(str) 
{
	var a = new Array();
	a = str.split('&lt;');
	str = a.join('<');
	a = str.split('&gt;');
	str = a.join('>');
	a = str.split('&quot;');
	str = a.join('\"');
	a = str.split('&apos;');
	str = a.join('\'');
	a = str.split('&amp;');
	str = a.join('&');
	return str;
}

PTXMLUtil.unescapeCDATAs = function(str)
{
	var startCDATA = /&lt;!\[CDATA\[/g;
	str = str.replace(startCDATA,'<![CDATA[');
	var endCDATA = /\]\]&gt;/g;
	str = str.replace(endCDATA,']]>');
	return str;
}

PTXMLUtil.stripPreXML = function(str)
{
	if (str.indexOf('<?xml') > -1)
	{
		return str.substr(str.indexOf('<?xml'));
	}
	else { return str; }
}

PTXMLWrapper = function()
{
	this.parser = 'PTXML';
	this.parserString = '';
	this.uidIndex = 1;
	return this;
}

PTXMLWrapper.VERSION = '246682';
PTXMLWrapper.NODE_ELEMENT					= 1;
PTXMLWrapper.NODE_ATTRIBUTE					= 2;
PTXMLWrapper.NODE_TEXT						= 3;
PTXMLWrapper.NODE_CDATA_SECTION					= 4;
PTXMLWrapper.NODE_ENTITY_REFERENCE				= 5;
PTXMLWrapper.NODE_ENTITY					= 6;
PTXMLWrapper.NODE_PROCESSING_INSTRUCTION			= 7;
PTXMLWrapper.NODE_COMMENT					= 8;
PTXMLWrapper.NODE_DOCUMENT					= 9;
PTXMLWrapper.NODE_DOCUMENT_TYPE					= 10;
PTXMLWrapper.NODE_DOCUMENT_FRAGMENT				= 11;
PTXMLWrapper.NODE_NOTATION					= 12;
PTXMLWrapper.unescapeCDATAs = function(str)
{
	var startCDATA = /&lt;!\[CDATA\[/g;
	str = str.replace(startCDATA,'<![CDATA[');
	var endCDATA = /\]\]&gt;/g;
	str = str.replace(endCDATA,']]>');
	return str;
}

PTXMLWrapper.stripPreXML = function(str)
{
	if (str.indexOf('<?xml') > -1)
	{
		return str.substr(str.indexOf('<?xml'));
	}
	else { return str; }
}

PTXMLWrapper.prototype.defaultPreferredParsers = new Array('MSXML','NS6','PTXML');
PTXMLWrapper.prototype.xmlTestString = '<?xml version=\"1.0\" encoding="UTF-8"?>\n<pts:cjb xmlns:pts="http://pts.plumtree.com/">Blah</pts:cjb>\n';
PTXMLWrapper.prototype.init = function(pref,ignoreNamespaces,requireXSL)
{
	if (!pref) { pref = this.defaultPreferredParsers; }
	var ua = new String(navigator.userAgent);
	PARSER:
	for (var p = 0; p < pref.length; p++) {
		var parser = pref[p];
		if (parser == 'MSXML') {
			var useMSIE = this.checkMSIEParsers(ignoreNamespaces,requireXSL);
			if (useMSIE) {
				this.parser = 'MSXML';
				break;
			} else { continue; }
		} else if (parser == 'NS6') {
			try {
				var DP = new DOMParser();
				var xml = DP.parseFromString(this.xmlTestString,'text/xml');
				this.parser = 'NS6';
				break PARSER;
			} catch(e) { continue; }
		} else if (parser == 'PTXML') {
			this.parser = 'PTXML';
			break PARSER;
		}
	}
	var brk = '';
	if (this.parser == 'MSXML')
	{
		this.getNodeValue = _ptxmlw_getNodeValue_MSXML;
		this.getNodeName = _ptxmlw_getNodeName_MSXML_NS6;
		this.getAttribute = _ptxmlw_getAttribute_MSXML_PTXML;
	}
	else if (this.parser == 'NS6')
	{
		this.getNodeValue = _ptxmlw_getNodeValue_NS6;
		this.getNodeName = _ptxmlw_getNodeName_MSXML_NS6;
		this.getAttribute = _ptxmlw_getAttribute_Other;
	}
	else if (this.parser == 'PTXML')
	{
		this.getNodeValue = _ptxmlw_getNodeValue_Other;
		this.getNodeName = _ptxmlw_getNodeName_Other;
		this.getAttribute = _ptxmlw_getAttribute_MSXML_PTXML;
	}
}

PTXMLWrapper.prototype.checkMSIEParsers = function(ignoreNamespaces,requireXSL)
{
	var encoding = (ignoreNamespaces) ? '' : ' encoding="UTF-8"';
	var xml = '<?xml version="1.0"' + encoding + '?>\n<root>Test Text.</root>\n';
	var xmlNamespaces = '<?xml version="1.0"' + encoding + '?>\n<ns:root xmlns:ns="http://pts.plumtree.com/">Namespace Test Text.</ns:root>\n';
	var xsl = '<?xml version="1.0"' + encoding + '?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:template match="pagina"><xsl:processing-instruction name="cocoon-format">type="text/html"</xsl:processing-instruction><html><head><title><xsl:value-of select="titulus"/></title></head> <body bgcolor="#ffffff"> <xsl:apply-templates/> </body> </html> </xsl:template><xsl:template match="titulus"><h1 align="center"><font color="darkgreen"><xsl:apply-templates/></font></h1></xsl:template><xsl:template match="auctor"><h1 align="center"><xsl:apply-templates/></h1> </xsl:template><xsl:template match="versus"><p align="center"><tt><xsl:apply-templates/></tt> </p></xsl:template></xsl:stylesheet>';
	var parsers = new Array(
		'MSXML2.DOMDocument.3.0',
		'MSXML2.DOMDocument.2.6',
		'MSXML2.DOMDocument',
		'MSXML.DOMDocument',
		'Microsoft.XMLDOM'
	);
	var useMSIE = false;
	TEST:
	for (var p = 0; p < parsers.length; p++)
	{
		var parser = parsers[p];
		try {
			object = new ActiveXObject(parser);
			object.async = false;
			object.loadXML(xml);
			while (object.readyState != 4) {
				if (object.parseError.errorCode != 0) {
					continue TEST;
				}
			}
			var doc = object.documentElement;
			if (!doc) { continue TEST; }
			var ssn1Test = object.selectSingleNode('root');
			if (!ssn1Test) { continue TEST; }
			var ceTest = object.createElement('newnode');
			if (!ceTest) { continue TEST; }
			if (!ignoreNamespaces)
			{
				var xmlns = new ActiveXObject(parser);
				xmlns.async = false;
				xmlns.loadXML(xmlNamespaces);
				if (!xmlns) { continue TEST; }
				var ssn3Test = xmlns.selectSingleNode('ns:root');
				if (!ssn3Test) { continue TEST; }
			}
			if (requireXSL)
			{
				var stylesheet = new ActiveXObject(parser);
				stylesheet.async = false;
				stylesheet.loadXML(xsl);
				if (!stylesheet) { continue TEST; }
				var xslText = object.transformNode(stylesheet);
				if (!xslText) { continue TEST; }
			}
		}
		catch(e) { continue TEST; }
		useMSIE = true;
		this.parserString = parser;
		break;
	}
	return useMSIE;
}

PTXMLWrapper.prototype.newXMLFromString = function(str)
{
	str = PTXMLWrapper.stripPreXML(str);
	str = PTXMLWrapper.unescapeCDATAs(str);
	var newXML;
	if (this.parser == 'MSXML')
	{
		if (str.indexOf('<?xml') == -1)
		{
			str = '<?xml version="1.0"?>\n' + str;
		}
		newXML = new ActiveXObject(this.parserString);
		newXML.async = false;
		newXML.loadXML(str);
		try {			newXML.setProperty('NewParser',true);
		} catch(e) {}

		while (newXML.readyState != 4) { }
	}
	else if (this.parser == 'NS6')
	{
		var DP = new DOMParser();
		if (str.indexOf('<?xml') == -1)
		{
			str = '<?xml version="1.0"?>\n' + str;
		}
		try
		{
			newXML = DP.parseFromString(str,'text/xml');
			parserErrorNode = this.selectSingleNode(newXML,'parsererror');
			if (parserErrorNode)
			{
			}
		}
		catch (e)
		{
		}
	}
	else if (this.parser == 'PTXML')
	{
		newXML = new PTXMLParser(str);
	}
	while (!newXML) {
		var Start = new Date().valueOf();
		while ((new Date().valueOf() - Start) < 1000) {}

	}
	return newXML;
}

PTXMLWrapper.prototype.createNode = function(node,name,val)
{
	if ((this.parser == 'MSXML') || (this.parser == 'NS6')) {
		var newNode = node.ownerDocument.createElement(name);
		if (val || (val == 0) || (val == false)) {
			newNode.text = new String(val);
		}
		node.appendChild(newNode);
		return newNode;
	} else {
		var newNode = node.createNode(name,val);
		return newNode;
	}
}

PTXMLWrapper.prototype.cloneNode = function(node)
{
	if ((this.parser == 'MSXML') || (this.parser == 'NS6')) {
		var newNode = node.cloneNode(true);
		if (node.parentNode) {
			node.parentNode.appendChild(newNode);
		} else {
			node.ownerDocument.documentElement.appendChild(newNode);
		}		newNode = this.createNewNodeUIDs(newNode);
		return newNode;
	} else {
		return node.parentNode.cloneNode(node);
	}
}

PTXMLWrapper.prototype.createNewNodeUIDs = function(node)
{
	if (!node) { return; }
	var node = this.recurseAndCreateNewNodeUIDs(node);
	return node;
}

PTXMLWrapper.prototype.recurseAndCreateNewNodeUIDs = function(node)
{
	node.removeAttribute('uid');
	this.getUID(node);
	if (node && node.childNodes && node.childNodes.length)
	{
		for (var i = 0; i < node.childNodes.length; i++)
		{
			try {
				var itm = node.childNodes.item(i);
				itm.removeAttribute('uid');
				this.getUID(node.childNodes.item(i));
				node.replaceChild(this.recurseAndCreateNewNodeUIDs(node.childNodes.item(i)), node.childNodes.item(i));
			} catch(e) {}

		}
	}
	return node;
}

PTXMLWrapper.prototype.deleteNode = function(node)
{
	if ((this.parser == 'MSXML') || (this.parser == 'NS6')) {
		if (node.parentNode) {
			node.parentNode.removeChild(node);
		} else {
			delete node;
		}
	} else {
		node.deleteNode();
	}
}

PTXMLWrapper.prototype.selectSingleNode = function(node,val)
{
	if ((this.parser == 'MSXML') || (this.parser == 'PTXML'))
	{
		return node.selectSingleNode(val);
	}
	else if (this.parser == 'NS6')
	{
		var nodes = node.childNodes;
		if (nodes)
		{
			var len = nodes.length;
			for (var n = 0; n < len; n++)
			{
				var cn = nodes.item(n);
				if (cn.nodeName == val)
				{
					return nodes.item(n);
				}
			}
		}
	}
}

PTXMLWrapper.prototype.getElementsByTagName = function(node,tagName)
{
	if (this.parser == 'PTXML')
	{
		return node.selectNodes(tagName);
	}
	else
	{
		return node.getElementsByTagName(tagName);
	}
}

PTXMLWrapper.prototype.getNodeValue = function(node)
{
	if (this.parser == 'MSXML') {
		var v = node.nodeValue;
		if (v) {
			return v;
		} else if (node.text) {
			return node.text;
		} else {
			return '';
		}
	} else if (this.parser == 'NS6') {
		var v = '';
		if (node.firstChild) { v = node.firstChild.nodeValue; }
		return v;
	} else {
		if (node.getNodeValue) {
			return node.getNodeValue();
		} else {
			return node.value;
		}
	}
}

_ptxmlw_getNodeValue_MSXML = function(node)
{
	var v = node.nodeValue;
	if (v) {
		return v;
	} else if (node.text) {
		return node.text;
	} else {
		return '';
	}
}

_ptxmlw_getNodeValue_NS6 = function(node)
{
	var v = '';
	if (node.childNodes && node.childNodes[1] && (node.childNodes[1].nodeType == PTXMLWrapper.NODE_CDATA_SECTION))
	{
		return node.childNodes[1].nodeValue;
	}
	if (node.firstChild) { v = node.firstChild.nodeValue; }
	return v;
}

_ptxmlw_getNodeValue_Other = function(node)
{
	if (node.getNodeValue) {
		return node.getNodeValue();
	} else {
		return node.value;
	}
}

PTXMLWrapper.prototype.setNodeValue = function(node,val)
{
	if ((this.parser == 'MSXML') || (this.parser == 'NS6')) {
		node.text = new String(val);
	} else {
		node.setNodeValue(val);
	}
}

PTXMLWrapper.prototype.getNodeName = function(node)
{
	if ((this.parser == 'MSXML') || (this.parser == 'NS6')) {
		return node.nodeName;
	} else {
		return node.name;
	}
}

_ptxmlw_getNodeName_MSXML_NS6 = function(node)
{
	return node.nodeName;
}

_ptxmlw_getNodeName_Other = function(node)
{
	return node.name;
}

PTXMLWrapper.prototype.getAttribute = function(node,val)
{
	if ((this.parser == 'MSXML') || (this.parser == 'PTXML')) {
		return node.getAttribute(val);
	} else {
		if (!node) { return; }
		var ni = node.attributes.getNamedItem(val);
		if (ni) { return ni.nodeValue; }	}
}

_ptxmlw_getAttribute_MSXML_PTXML = function(node,val)
{
	return node.getAttribute(val);
}

_ptxmlw_getAttribute_Other = function(node,val)
{
	if (!node) { return; }
	var ni = node.attributes.getNamedItem(val);
	if (ni) { return ni.nodeValue; }
}

PTXMLWrapper.prototype.getUID = function(node)
{
	if ((this.parser == 'MSXML') || (this.parser == 'NS6')) {
		var attrIDValue = this.getAttribute(node,'uid');
		if (attrIDValue) {
			return attrIDValue;
		} else {
			var newUID = this.uidIndex++;
			node.setAttribute('uid',newUID);
			return newUID;
		}
	} else {
		return node.uid;
	}
}

PTXMLWrapper.prototype.getNodeByUID = function(uid,node)
{
	if (!node) { return; }
	var node = this.recurseAndFindNodeByUID(node,uid);
	return node;
}

PTXMLWrapper.prototype.recurseAndFindNodeByUID = function(node,uid)
{
	if (!node || !node.childNodes || !node.childNodes.length) { return; }
	var targetNode;
	for (var i = 0; i < node.childNodes.length; i++) {
		if ((this.parser == 'MSXML') || (this.parser == 'NS6')) {
			var itm = node.childNodes.item(i);
			if (itm.nodeTypeString == 'element') {
				if (parseInt(this.getAttribute(itm,'uid')) == parseInt(uid)) {
					targetNode = itm;
					return itm;
				}
				targetNode = this.recurseAndFindNodeByUID(itm,uid);
				if (targetNode) { return targetNode; }
			}
		} else {
			var itm = node.childNodes[i];
			if (!itm) { continue; }
			if (itm.nodeTypeString == 'element') {
				if (parseInt(itm.uid) == parseInt(uid)) {
					targetNode = itm;
					return itm;
				}
				targetNode = this.recurseAndFindNodeByUID(itm,uid);
				if (targetNode) { return targetNode; }
			}
		}
	}
	return targetNode;
}

PTXMLWrapper.prototype.genXML = function(xmlObject)
{
	if (this.parser == 'MSXML') {
		return xmlObject.xml;
	} else if (this.parser == 'NS6') {
		return (new XMLSerializer()).serializeToString(xmlObject);
	} else {
		return xmlObject.genXML();
	}
}

PTXMLWrapper.prototype.deleteNodeByUID = function(xmlObject,uid)
{
	var root;
	if ((this.parser == 'MSXML') || (this.parser == 'NS6')) {
		root = xmlObject.documentElement;
	} else {
		root = xmlObject;
	}
	var node = this.getNodeByUID(uid,root);
	if (node) { this.deleteNode(node); }
}

var XMLW = new PTXMLWrapper();
