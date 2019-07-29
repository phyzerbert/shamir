
PTBrowserInfo = function()
{
	return this;
}

PTBrowserInfo.VERSION = '246682';
PTBrowserInfo.init = function()
{
	PTBrowserInfo.USER_AGENT		= navigator.userAgent;
	PTBrowserInfo.MSIE_VERSION		= PTBrowserInfo.getIEVersion();
	PTBrowserInfo.NETSCAPE_VERSION	= PTBrowserInfo.getNNVersion();
	PTBrowserInfo.IS_DOM			= (document.getElementById);
	PTBrowserInfo.IS_OPERA			= (/opera [56789]|opera\/[56789]/i.test(PTBrowserInfo.USER_AGENT));
	PTBrowserInfo.IS_SAFARI			= (/safari/i.test(PTBrowserInfo.USER_AGENT));
	PTBrowserInfo.IS_MSIE			= (PTBrowserInfo.MSIE_VERSION && document.all && !PTBrowserInfo.IS_OPERA);
	PTBrowserInfo.IS_MSIE_4			= (PTBrowserInfo.MSIE_VERSION < 5.0);
	PTBrowserInfo.IS_MSIE_5 		= ((PTBrowserInfo.MSIE_VERSION >= 5.0) && (PTBrowserInfo.MSIE_VERSION < 5.5));
	PTBrowserInfo.IS_MSIE_5_5		= ((PTBrowserInfo.MSIE_VERSION >= 5.5) && (PTBrowserInfo.MSIE_VERSION < 6.0));
	PTBrowserInfo.IS_MSIE_6 		= ((PTBrowserInfo.MSIE_VERSION >= 6.0) && (PTBrowserInfo.MSIE_VERSION < 7.0));
	PTBrowserInfo.IS_MSIE_7 		= ((PTBrowserInfo.MSIE_VERSION >= 7.0) && (PTBrowserInfo.MSIE_VERSION < 7.5));
	PTBrowserInfo.IS_NETSCAPE_4		= ((PTBrowserInfo.NETSCAPE_VERSION > 0) && (PTBrowserInfo.NETSCAPE_VERSION < 5.0));
	PTBrowserInfo.IS_NETSCAPE_6		= ((PTBrowserInfo.NETSCAPE_VERSION >= 5.0) && (PTBrowserInfo.NETSCAPE_VERSION < 7.0));
	PTBrowserInfo.IS_NETSCAPE_7		= (PTBrowserInfo.NETSCAPE_VERSION >= 7.0);
	PTBrowserInfo.IS_MOZILLA		= ((!PTBrowserInfo.IS_OPERA) && (/gecko/i.test(PTBrowserInfo.USER_AGENT)));
	PTBrowserInfo.IS_NETSCAPE_DOM	= (PTBrowserInfo.IS_MOZILLA || (PTBrowserInfo.NETSCAPE_VERSION >= 5.0));
	PTBrowserInfo.IS_HTTPS			= (document.location.protocol.indexOf('https:') > -1);
	PTBrowserInfo.IS_XP_SP2			= (window.navigator.userAgent.indexOf('SV1') > -1);
	PTBrowserInfo.IS_NT4				= (window.navigator.userAgent.indexOf('Windows NT 4.0') > -1);
	PTBrowserInfo.isInitialized		= true;
}

PTBrowserInfo.getIEVersion = function()
{
	var version = 0;
	var ua = new String(navigator.userAgent);
	if (ua.indexOf('MSIE ') > -1)
	{
		version = parseFloat(ua.substr(ua.indexOf('MSIE ') + 5));
	}
	return version;
}

PTBrowserInfo.getNNVersion = function()
{
	var version = 0;
	if(navigator.appName == 'Netscape')
	{
		version = parseFloat(navigator.appVersion);
		if(version >= 5)
		{
			if (typeof navigator.vendorSub != 'undefined')
			{
				version = parseFloat(navigator.vendorSub);
			}
		}
	}
	return version;
}

//: Initialize PTBrowserInfo once.
if (!PTBrowserInfo.isInitialized)
{
	PTBrowserInfo.init();
}

PTCommonUtil = function()
{
	return this;
}

PTCommonUtil.VERSION = '246682';
PTCommonUtil.getIEVersion = function()
{
	return PTBrowserInfo.getIEVersion();
}

PTCommonUtil.getNNVersion = function()
{
	return PTBrowserInfo.getNNVersion();
}

PTCommonUtil.getElementById = function(id)
{
	return PTDOMUtil.getElementById(id);
}

PTCommonUtil.copyObject = function(srcObj,destObj)
{
	if (!destObj)
	{
		if (srcObj.constructor) { destObj = srcObj.constructor(); }
		else					{ destObj = new Object(); }
	}
	var t = typeof srcObj;
	var isPrimitive = false;
	if		(t == 'string')		{ isPrimitive = true; }
	else if	(t == 'number')		{ isPrimitive = true; }
	else if (t == 'boolean')	{ isPrimitive = true; }
	if (isPrimitive) { destObj = srcObj; }
	else
	{		if (srcObj && srcObj.slice && srcObj.sort && srcObj.length)
		{
			var len = srcObj.length;
			for (var a = 0; a < len; a++) { destObj[a] = srcObj[a]; }
		}
		else
		{
			for (var i in srcObj)
			{
				//: Isomorphic "SmartClient" (note the irony please) adds circular references as a by-product of
				//: extending the native Array class.  We need to special case the exclusion of these, to prevent insanity.
				//: There is no need to explicitly copy 'function' objects for Arrays anyway -- they will be included
				//: automatically since we have instantiated copies via calling the 'new Array' constructor, above.
				if (srcObj.Class && (srcObj.Class == 'Array') && (typeof srcObj[i] == 'function')) { continue; }
				var t = typeof srcObj[i];
				var isPrimitive = false;
				if		(t == 'string')		{ isPrimitive = true; }
				else if	(t == 'number')		{ isPrimitive = true; }
				else if (t == 'boolean')	{ isPrimitive = true; }
				if (isPrimitive)	{ destObj[i] = srcObj[i]; }
				else				{ destObj[i] = PTCommonUtil.copyObject(srcObj[i]); }
			}
		}
	}
	return destObj;
}

PTCommonUtil.getServerFromURL = function(url)
{
	var link = document.createElement('A');
	link.href = url;
	return link.hostname;
}

PTCommonUtil.isDefined = function(obj)
{
	var type = typeof(obj);
	return (!(type == 'unknown') && !(type == 'undefined'));
}

PTCommonUtil.sortHashByKeys = function(hash,preserveFirstKey,isCaseInsensitive,doReverseSort)
{
	var keys 		= new Array();
	var sortedHash 	= new Object();
	var firstKey;
	var isNumericList = false;
	for (var key in hash) { firstKey = key; break; }
	var fkStr = new String(firstKey);
	if (!isNaN(parseInt(fkStr.charAt(0)))) { isNumericList = true; }
	for (var key in hash) { keys[keys.length] = key; }
	var sortedKeys;
	if (isNumericList)
	{
		sortedKeys = keys.sort(PTCommonUtil.sortNumeric);
		preserveFirstKey = false;
	}
	else if (doReverseSort)
	{
		if (isCaseInsensitive)	{ sortedKeys = keys.sort(PTCommonUtil.sortReverseCaseInsensitive); }
		else					{ sortedKeys = keys.sort(PTCommonUtil.sortReverse); }
	}
	else if (isCaseInsensitive)
	{
		sortedKeys = keys.sort(PTCommonUtil.sortCaseInsensitive);
	}
	else
	{
		sortedKeys = keys.sort(PTCommonUtil.sortForward);
	}
	if (preserveFirstKey) { sortedHash[firstKey] = hash[firstKey]; }
	for (var i = 0; i < sortedKeys.length; i++)
	{
		if (preserveFirstKey && (sortedKeys[i] == firstKey)) { continue; }
		sortedHash[sortedKeys[i]] = hash[sortedKeys[i]];
	}
	return sortedHash;
}

PTCommonUtil.sortNumeric = function(a,b)
{
	var numa = parseInt(a);
	var numb = parseInt(b);
	if (!isNaN(numa) && !isNaN(numb))	{ return numa - numb; }
	else								{ return -1; }
}

PTCommonUtil.sortCaseInsensitive = function(aa,bb)
{
	var a = (new String(aa)).toLowerCase();
	var b = (new String(bb)).toLowerCase();
	if (a.valueOf() == b.valueOf()) { return 0; }
	var minLength = (a.length > b.length) ? b.length : a.length;
	var curPos = 0;
	while ((curPos < minLength) && (a.charCodeAt(curPos) == b.charCodeAt(curPos))) { curPos++; }
	var ac = a.charCodeAt(curPos);
	var bc = b.charCodeAt(curPos);
	if (isNaN(ac))		{ return -1; }
	else if (isNaN(bc))	{ return 1; }
	else				{ return ac - bc; }
}

PTCommonUtil.sortReverseCaseInsensitive = function(aa,bb)
{
	var a = (new String(aa)).toLowerCase();
	var b = (new String(bb)).toLowerCase();
	if (a.valueOf() == b.valueOf()) { return 0; }
	var minLength = (a.length > b.length) ? b.length : a.length;
	var curPos = 0;
	while ((curPos < minLength) && (a.charCodeAt(curPos) == b.charCodeAt(curPos))) { curPos++; }
	var ac = a.charCodeAt(curPos);
	var bc = b.charCodeAt(curPos);
	if (isNaN(ac))		{ return 1; }
	else if (isNaN(bc))	{ return -1; }
	else				{ return bc - ac; }
}

PTCommonUtil.sortReverse = function(aa,bb)
{
	var a = new String(aa);
	var b = new String(bb);
	if (a.valueOf() == b.valueOf()) { return 0; }
	var minLength = (a.length > b.length) ? b.length : a.length;
	var curPos = 0;
	while ((curPos < minLength) && (a.charCodeAt(curPos) == b.charCodeAt(curPos))) { curPos++; }
	var retValue = b.charCodeAt(curPos) - a.charCodeAt(curPos);
	if (isNaN(retValue))	{ return 0; }
	else					{ return retValue; }
}

PTCommonUtil.sortForward = function(aa,bb)
{
	var a = new String(aa);
	var b = new String(bb);
	if (a.valueOf() == b.valueOf()) { return 0; }
	var minLength = (a.length > b.length) ? b.length : a.length;
	var curPos = 0;
	while ((curPos < minLength) && (a.charCodeAt(curPos) == b.charCodeAt(curPos))) { curPos++; }
	var retValue = a.charCodeAt(curPos) - b.charCodeAt(curPos);
	if (isNaN(retValue))	{ return 0; }
	else					{ return retValue; }
}

PTCommonUtil.getValueForStyleAttribute = function(s,attr)
{
	var s = new String(s);
	var attr = new String(attr);
	var attrPos = s.indexOf(attr);
	if (attrPos == -1) { return; }
	var s = s.substr(attrPos + attr.length + 1);
	while ((s.charAt(0) == ' ') || (s.charAt(0) == ':')) { s = s.substr(1); }
	var semiPos = s.indexOf(';');
	if (semiPos == -1) { semiPos = (s.length - 1); }
	s = s.substr(0,(semiPos));
	return s;
}

PTCommonUtil.getRelativePosition = function (childDiv,parentDiv,ignoreBorders)
{
	var pos = new Object();
	pos.x = 0;
	pos.y = 0;
	if (!childDiv) { return pos; }
	if (!parentDiv) { parentDiv = document.body; }
	while (1)
	{
		if (childDiv == parentDiv) { break; }
		pos.x -= parseInt(childDiv.scrollLeft);
		pos.y -= parseInt(childDiv.scrollTop);
		var bbw = parseInt(childDiv.style.borderBottomWidth);
		var ot = childDiv.offsetTop;
		pos.y += ot + ((bbw && !ignoreBorders) ? bbw : 0);
		var blw = parseInt(childDiv.style.borderLeftWidth);
		var ol = childDiv.offsetLeft;
		pos.x += ol + ((blw && !ignoreBorders) ? blw : 0);
		if (childDiv.offsetParent)	{ childDiv = childDiv.offsetParent; }
		else						{ break; }
	}
	return pos;
}

PTCommonUtil.scrollDivIntoView = function (object,container)
{
	if (!object) { return; }
	if (!container) { container = document.body; }
	var pos = PTCommonUtil.getRelativePosition(object,container,true);
	container.scrollTop = pos.y;
}

if (!PTCommonUtil.CSSClassCache) 
{
	PTCommonUtil.CSSClassCache = new Object(); 
}

PTCommonUtil.getCSSClassStyles = function(className)
{
	var classStyles = PTCommonUtil.CSSClassCache[className];
	if (!classStyles)
	{		var tmpElm = document.createElement('span');
		tmpElm.style.visibility = 'hidden';
		tmpElm.style.display = 'none';
		tmpElm.className = className;
		document.body.appendChild(tmpElm);
		if (document.all) 
		{
			PTCommonUtil.CSSClassCache[className] = tmpElm.currentStyle;
		}
		else if (document.getElementById && !document.all) 
		{
			PTCommonUtil.CSSClassCache[className] = document.defaultView.getComputedStyle(tmpElm, '');
		}
	}
	return PTCommonUtil.CSSClassCache[className];	
}

PTCommonUtil.getCSSClassStyleProperty = function(className, propertyName)
{
	var classStyles = PTCommonUtil.getCSSClassStyles(className);	
	if (classStyles) 
	{ 
		if (PTBrowserInfo.IS_NETSCAPE_DOM && PTBrowserInfo.NETSCAPE_VERSION < 7.1)
		{			var convertedPropertyName = propertyName.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase();
			return classStyles.getPropertyValue(convertedPropertyName);
		}
		else
		{
			return classStyles[propertyName]; 
		}
	}
	return null;
}

PTCommonUtil.getStyleClassFromDocument = function(doc,className)
{
	var re = new RegExp('\\.' + className + '$', 'gi');
	if (doc.all) {
		for (var s = 0; s < doc.styleSheets.length; s++) {
			for (var r = 0; r < doc.styleSheets[s].rules.length; r++) {
				if (doc.styleSheets[s].rules[r].selectorText.search(re) != -1) {
					return doc.styleSheets[s].rules[r].style;
				}
			}
		}
	} else if (doc.getElementById) {
		for (var s = 0; s < doc.styleSheets.length; s++) {
			for (var r = 0; r < doc.styleSheets[s].cssRules.length; r++) {
				if (doc.styleSheets[s].cssRules[r].selectorText.search(re) != -1) {
					doc.styleSheets[s].cssRules[r].sheetIndex = s;
					doc.styleSheets[s].cssRules[r].ruleIndex = s;
					return doc.styleSheets[s].cssRules[r].style;
				}
			}
		}
	} else if (doc.layers) {
		return doc.classes[className].all;
	} else {
		return false;
	}
}

PTCommonUtil.getStyleClass = function(className)
{
	return PTCommonUtil.getStyleClassFromDocument(document,className);
}

PTCommonUtil.getStyleClassProperty = function(className,attrName)
{
	var styleClass = PTCommonUtil.getStyleClass(className);
	return (styleClass) ? styleClass[attrName] : '';
}

PTCommonUtil.getRemoteStyleClassProperty = function(doc,className,attrName)
{
	var styleClass = PTCommonUtil.getStyleClassFromDocument(doc,className);
	return (styleClass) ? styleClass[attrName] : '';
}

PTCommonUtil.parseGet = function(url)
{
	var FORM_DATA = new Object();
	var separator = ',';
	var query;
	if (url) { query = url; }
	else {
		query = '' + top.document.location.href;
	}
	query = query.substring((query.indexOf('?')) + 1);
	if (query.length < 1) { return false; }  
	var keypairs = new Object();
	var numKP = 1;
	while (query.indexOf('&') > -1) {
		keypairs[numKP] = query.substring(0,query.indexOf('&'));
		query = query.substring((query.indexOf('&')) + 1);
		numKP++;
	}
	keypairs[numKP] = query;
	for (var i in keypairs) {
		var keyName = keypairs[i].substring(0,keypairs[i].indexOf('='));		var keyValue = keypairs[i].substring((keypairs[i].indexOf('=')) + 1);		while (keyValue.indexOf('+') > -1) {
			keyValue = keyValue.substring(0,keyValue.indexOf('+')) + ' ' + keyValue.substring(keyValue.indexOf('+') + 1);		}
		keyValue = unescape(keyValue);
		if (FORM_DATA[keyName]) {
			FORM_DATA[keyName] = FORM_DATA[keyName] + separator + keyValue;
		} else {
			FORM_DATA[keyName] = keyValue;		}
	}
	return FORM_DATA;
}

PTCommonUtil.wait = function(ms)
{
	var Start = new Date().valueOf();
	while ((new Date().valueOf() - Start) < ms) {}

}

PTCommonUtil.alertVersion = function()
{
	var str = '';
	var controls = new Array('PTCalendarControl','PTTableControl','PTTreeControl','PTTabularLayoutManager','PTCalendarManager');
	var foundControl = false;
	for (var i = 0; i < controls.length; i++)
	{
		if (window[controls[i]]) { foundControl = controls[i]; break; }
		else if(window['' + controls[i]]) { foundControl = '' + controls[i]; break;}
	}
	if (foundControl)
	{
		var jscontrol = eval(foundControl);
		if (jscontrol.VERSION)
		{
			var version = jscontrol.VERSION;
			str += 'PTControls  (v. ' + version + ')\n';
			if (window.PTControls)
			{
				for (var obj in window.PTControls)
				{
					if (obj == 'properties') { continue; }
					var o = window.PTControls[obj];
					if (o && o.objName && o.className)
					{
						var type = ' (' + o.className + ')';
						str += '    ' + o.objName + type + '\n';
					}
				}
			}
			else if(window.PTControls)
			{
				for (var obj in window.PTControls)
				{
					if (obj == 'properties') { continue; }
					var o = window.PTControls[obj];
					if (o && o.objName && o.className)
					{
						var type = ' (' + o.className + ')';
						str += '    ' + o.objName + type + '\n';
					}
				}
			}
		}
	}
	if (typeof PTDatepicker != 'undefined')
	{
		if (PTDatepicker.VERSION) { str += 'PTDatepicker  (v. ' + PTDatepicker.VERSION + ')\n'; }
	}
	else if (typeof PTDatepicker != 'undefined')
	{
		if (PTDatepicker.VERSION) { str += 'PTDatepicker  (v. ' + PTDatepicker.VERSION + ')\n'; }
	}
	if (typeof PTXMLWrapper != 'undefined')
		{
			if (PTXMLWrapper.VERSION) { str += 'PTXML (v. ' + PTXMLWrapper.VERSION + ')\n'; }
	}
	else if (typeof PTXMLWrapper != 'undefined')
	{
		if (PTXMLWrapper.VERSION) { str += 'PTXML (v. ' + PTXMLWrapper.VERSION + ')\n'; }
	}
	str += 'PTUtil  (v. ' + PTCommonUtil.VERSION + ')\n';
	str += '\n\u00A92002-2004 Plumtree Software Inc., All Rights Reserved    \n';
	if (PTCommonUtil.isDefined(window.PT_DEBUG))
	{
		str += '\nDo you want to inspect an object?\n';
		var inspect = confirm(str);
		if (inspect)
		{
			var obj = prompt('Enter the name of the object you wish to inspect: \n','');
			if (obj)
			{
				var o = eval(obj);
				if (o)
				{
				}
				else
				{
				}
			}
		}
	}
	else { alert(str); }
}

PTCommonUtil.versions = function()
{
	if (document.all)
	{		if (window.event.altKey && window.event.ctrlKey && window.event.shiftKey) {
			PTCommonUtil.alertVersion();
			return false;
		}
	}
}

PTCommonUtil.setUpVersions = function()
{
	if ((typeof document != 'undefined') && (PTCommonUtil.getIEVersion() >= 5.5))
	{
		if (document.all)
		{
			if (document.body) { document.body.onmouseleave = PTCommonUtil.versions;
			} else { window.setTimeout('PTCommonUtil.setUpVersions()',500); }
		}
	}
}

PTCommonUtil.setUpVersions();
PTCommonUtil.getScripts = function()
{
	if(!document.scripts)
	{
		document.scripts = new Array();
		PTCommonUtil.addScripts(document.childNodes);
	}
	return document.scripts;
}

PTCommonUtil.addScripts = function(nodeList)
{
	for(var i = 0; i < nodeList.length; i++)	{		if(nodeList[i].tagName)		{			if(nodeList[i].tagName.toLowerCase() == 'script')				document.scripts[document.scripts.length] = nodeList[i];			PTCommonUtil.addScripts(nodeList[i].childNodes);		}	}
}

PTCommonUtil.JSON = function () 
{
	var m = {
			'\b': '\\b',
			'\t': '\\t',
			'\n': '\\n',
			'\f': '\\f',
			'\r': '\\r',
			'"' : '\\"',
			'\\': '\\\\'
		},
		s = {
			'boolean': function (x) {
				return String(x);
			},
			number: function (x) {
				return isFinite(x) ? String(x) : 'null';
			},
			string: function (x) {
				if (/["\\\x00-\x1f]/.test(x)) {
					x = x.replace(/([\x00-\x1f\\"])/g, function(a, b) {
						var c = m[b];
						if (c) {
							return c;
						}
						c = b.charCodeAt();
						return '\\u00' +
							Math.floor(c / 16).toString(16) +
							(c % 16).toString(16);
					});
				}
				return '"' + x + '"';
			},
			object: function (x) {
				if (x) {
					var a = [], b, f, i, l, v;
					if (x instanceof Array) {
						a[0] = '[';
						l = x.length;
						for (i = 0; i < l; i += 1) {
							v = x[i];
							f = s[typeof v];
							if (f) {
								v = f(v);
								if (typeof v == 'string') {
									if (b) {
										a[a.length] = ',';
									}
									a[a.length] = v;
									b = true;
								}
							}
						}
						a[a.length] = ']';
					} else if (x instanceof Object) {
						a[0] = '{';
						for (i in x) {
							v = x[i];
							f = s[typeof v];
							if (f) {
								v = f(v);
								if (typeof v == 'string') {
									if (b) {
										a[a.length] = ',';
									}
									a.push(s.string(i), ':', v);
									b = true;
								}
							}
						}
						a[a.length] = '}';
					} else {
						return;
					}
					return a.join('');
				}
				return 'null';
			}
		};
	return {
		copyright: '(c)2005 JSON.org',
		license: 'http://www.crockford.com/JSON/license.html',
		stringify: function (v) {
			var f = s[typeof v];
			if (f) {
				v = f(v);
				if (typeof v == 'string') {
					return v;
				}
			}
			return null;
		},
		parse: function (text) {
			try {
				return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
						text.replace(/"(\\.|[^"\\])*"/g, ''))) &&
					eval('(' + text + ')');
			} catch (e) {
				return false;
			}
		}
	};
}();
PTArrayUtil = function()
{
	return this;
}

PTArrayUtil.VERSION = '246682';
PTArrayUtil.push = function(arr,items)
{
	if (!PTArrayUtil.isArrayLike(arr))
	{
		return;
	}
	if (PTArrayUtil.isArrayLike(items))
	{
		for (var i = 0; i < items.length; i++)
		{
			arr[arr.length] = items[i];
		}
	}
	else
	{
		arr[arr.length] = items;
	}
	return arr.length;
}

PTArrayUtil.shift = function(arr)
{
	if (!PTArrayUtil.isArrayLike(arr))
	{
		return;
	}
	var returnValue = arr[0];
	for (var i = 0; i < (arr.length - 1); i++) { arr[i] = arr[i + 1]; }
	delete arr[arr.length - 1];
	arr.length--;
	return returnValue;
}

PTArrayUtil.splice = function(arr, start, deleteCount, variableNumberOfOtherArguments)
{
	if (!PTArrayUtil.isArrayLike(arr))
	{
		return;
	}
	if (!PTNumberUtil.isInteger(start) || (start < 0) || (start >= arr.length))
	{
		return;
	}
	if (!PTNumberUtil.isInteger(deleteCount) || (deleteCount < 0) || (deleteCount > arr.length))
	{
		return;
	}
	var returnValue = new Array();
	var originalLength = arr.length;
	var elemsToAdd = arguments.length - 3;
	var totalShift = elemsToAdd - deleteCount;
	for (var i = 0; i < deleteCount; i++)
	{
		var indexToRemove = start + i;
		returnValue[returnValue.length] = arr[indexToRemove];
		delete arr[indexToRemove];
	}
	if (totalShift != 0)
	{
		if (totalShift < 0)
		{
			var firstToMove = start + deleteCount;
			var lastToMove = originalLength - 1;			
			for (var i = firstToMove; i <= lastToMove; i++)
			{
				arr[i + totalShift] = arr[i];
				delete arr[i];
			}
			arr.length = arr.length + totalShift;
		}
		else if (totalShift > 0)
		{
			var firstToMove = originalLength - 1;
			var lastToMove = start + deleteCount;
			for (var i = firstToMove; i >= lastToMove; i--)
			{
				arr[i + totalShift] = arr[i];
				delete arr[i];
			}
		}
	}
	for (var i = 0; i < elemsToAdd; i++)
	{
		arr[start + i] = arguments[i+3];
	}
	return returnValue;
}

PTArrayUtil.removeElementAt = function(arr,index)
{
	if (!PTArrayUtil.isArrayLike(arr))
	{
		return;
	}
	return PTArrayUtil.splice(arr,index,1);
}

PTArrayUtil.moveElement = function(arr,sourceIndex,targetIndex)
{
	if (!PTArrayUtil.isArrayLike(arr))
	{
		return;
	}
	var elm = arr[sourceIndex];
	PTArrayUtil.removeElementAt(arr,sourceIndex);
	var len = arr.length;
	for (var i = (len - 1); i >= targetIndex; i--)
	{
		arr[i+1] = arr[i];	
	}
	arr[targetIndex] = elm;
}

PTArrayUtil.isArrayLike = function(arr)
{
	var likeArray = (arr && arr.join && PTNumberUtil.isInteger(arr.length) && (parseInt(arr.length) >= 0));
	return (likeArray == true);
}

PTCookie = function()
{
	return this;
}

PTCookie.VERSION = '246682';
PTCookie.set = function(name,value,expires)
{
	document.cookie = name + "=" + escape(value) + ';path=/' + ((!expires) ? '' : ';expires=' + expires.toGMTString());
	return;
}

PTCookie.get = function(name)
{
	var cname = name + '=';
	if (document.cookie.length > 0) {
		begin = document.cookie.indexOf(cname);
		if (begin != -1) {
			begin += cname.length;
			end = document.cookie.indexOf(";", begin);
			if (end == -1) {end = document.cookie.length;}
			return unescape(document.cookie.substring(begin,end));
		}
	} else {
		return;
	}
}

PTCookie.expire = function(name)
{
	document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT' + ';path=/';
	return;
}

PTCookie.daysAway = function(numDays)
{
	var exp = new Date();
	var oneDay = (1000 * 60 * 60 * 24);  
	return new Date(exp.setTime(exp.getTime() + (oneDay * numDays)));
}

PTCookie.INT_30_DAYS = PTCookie.daysAway(30);
PTDOMUtil = function()
{
	return this;
}

PTDOMUtil.VERSION = '246682';
PTDOMUtil.getElementById = function(id)
{	if (!document.all) { return document.getElementById(id); }
	var elem = PTDOMUtil.ElementCache[id];
	if (!elem || !elem.innerHTML)
	{
		PTDOMUtil.ElementCache[id] = document.getElementById(id);
	}
	return PTDOMUtil.ElementCache[id];
}

if (!window.PTDOMUtil.ElementCache)
{ 
	PTDOMUtil.ElementCache = new Object(); 
}

PTDOMUtil.elementContains = function(containerElement, containedElement)
{	if (document.all) { return containerElement.contains(containedElement); }
	if (!PTDOMUtil.ElementContainsCache[containerElement]) { PTDOMUtil.ElementContainsCache[containerElement] = new Object(); }
	if (PTDOMUtil.ElementContainsCache[containerElement][containedElement]) 
	{ 
		return (PTDOMUtil.ElementContainsCache[containerElement][containedElement] == 'true' ? true : false); 
	}
	if (containedElement == containerElement) 
	{ 
		PTDOMUtil.ElementContainsCache[containerElement][containedElement] = 'true';
		return true; 
	}
	if (containedElement == null) 
	{ 
		PTDOMUtil.ElementContainsCache[containerElement][containedElement] = 'false';
		return false; 
	}
	if (!containerElement.hasChildNodes) 
	{ 
		PTDOMUtil.ElementContainsCache[containerElement][containedElement] = 'false';
		return false; 
	}
	var childNodes = containerElement.childNodes;
	var childNodesLength = childNodes.length;
	for (var i=0; i<childNodesLength; i++)
	{
		var childNode = childNodes[i];
		if (PTDOMUtil.elementContains(childNode, containedElement)) 
		{ 
			PTDOMUtil.ElementContainsCache[containerElement][containedElement] = 'true';
			return true; 
		}
	}
	PTDOMUtil.ElementContainsCache[containerElement][containedElement] = 'false';
	return false;
}

if (!window.PTDOMUtil.ElementContainsCache) 
{ 
	PTDOMUtil.ElementContainsCache = new Object(); 
}

PTDOMUtil.insertAdjacentElement = function(targetElement, insertWhere, elementToInsert)
{	if (document.all)
	{
		targetElement.insertAdjacentElement(insertWhere, elementToInsert);
	}	else
	{
		switch (insertWhere)
		{
			case 'beforeBegin':
				targetElement.parentNode.insertBefore(elementToInsert,targetElement)
				break;
			case 'afterBegin':
				targetElement.insertBefore(elementToInsert,targetElement.firstChild);
				break;
			case 'beforeEnd':
				targetElement.appendChild(elementToInsert);
				break;
			case 'afterEnd':
				if (targetElement.nextSibling) { targetElement.parentNode.insertBefore(elementToInsert,targetElement.nextSibling); }
				else { targetElement.parentNode.appendChild(elementToInsert); }
				break;
		}
	}
}

PTDOMUtil.getOuterHTML = function(node, formatHTML, replacementTagIdMap)
{
	var sb = new PTStringBuffer();
	return PTDOMUtil.getHTML(sb, node, true, ((formatHTML) ? 0 : -1), replacementTagIdMap);
}

PTDOMUtil.getInnerHTML = function(node, formatHTML, replacementTagIdMap)
{
	var sb = new PTStringBuffer();
	var html = PTDOMUtil.getHTML(sb, node, false, (((formatHTML) ? 0 : -1)), replacementTagIdMap);
	return html;
}

PTDOMUtil.getHTML = function(sb, node, outputNode, nesting, map)
{		
	switch (node.nodeType)
	{
		case 1: 
		case 11: 
		var closed;
		var i;
		if (outputNode)
		{	
			if(map && node.id && map[node.id])
			{
				sb.append(map[node.id]);
				return sb.toString();
			}
			closed = (!(node.hasChildNodes() || PTDOMUtil.isClosingTag(node)));
			if((nesting >= 0) && !PTDOMUtil.isTextEnclosingTag(node))
			{
				sb.append('\n');
				for(i = 0; i < nesting; i++)
					sb.append('\t');
			}
			sb.append('<' + node.tagName.toLowerCase());
			var attrs = node.attributes;
			for(i = 0; i < attrs.length; ++i)
			{
				var a = attrs.item(i);
				if(!a.specified)
				{
					continue;
				}
				var name = a.nodeName.toLowerCase();
				if(/moz/.test(name))
				{
					continue;
				}
				var value;
				if(PTBrowserInfo.IS_NETSCAPE_7 || name != "style")
				{
					if((PTBrowserInfo.IS_MSIE) && PTCommonUtil.isDefined(node[a.nodeName]))
					{
						value = node[a.nodeName];
					}
					else
					{
						value = a.nodeValue;
					}
				}
				else
				{ 
					value = PTDOMUtil.cleanCSSText(node.style.cssText);
				}
				if(/moz/.test(value))
				{
					continue;
				}
				sb.append(' ' + name.toLowerCase() + '="' + value + '"');
			}
			sb.append((closed ? ' />' : '>'));
		}
		var newNesting = (!outputNode && (nesting == 0)) ? 0 : ((nesting >= 0) ? (nesting + 1) : -1);
		for (i = node.firstChild; i; i = i.nextSibling)
		{
			PTDOMUtil.getHTML(sb, i, true, newNesting, map);
		}
		if (outputNode && !closed)
		{
			if((nesting >= 0) && !PTDOMUtil.isTextEnclosingTag(node))
			{
				sb.append('\n');
				for(i = 0; i < nesting; i++)
					sb.append('\t');
			}
			sb.append('</' + node.tagName.toLowerCase() + '>');
		}
		break;
		case 3: 
		sb.append(PTDOMUtil.escapeHTML(node.data));
		break;
		case 8: 
		sb.append('<!--' + node.data + '-->');
		break;		
	}
	var html = sb.toString();
	if((html.length > 0) && (html.substring(0,1) == '\n'))
		html = html.substring(1);
	return html;
}

PTDOMUtil.escapeHTML = function(str)
{
	str = PTStringUtil.escapeHTML(str);
	var sb = new PTStringBuffer();
	for(var i = 0; i < str.length; i++)
	{
		if(str.charCodeAt(i) == 160)
			sb.append('&nbsp;');
		else
			sb.append(str.charAt(i));
	}
	return sb.toString();
}

PTDOMUtil.isClosingTag = function(el)
{
	var closingTags = ' h1 h2 h3 h4 h5 h6 script style div span tr td tbody table em strong font a ';
	var success = (closingTags.indexOf(' ' + el.tagName.toLowerCase() + ' ') != -1);
	return success;
}

PTDOMUtil.isTextEnclosingTag = function(el)
{
	var textEnclosingTags = ' th td span em font strong u a ';
	var success = (textEnclosingTags.indexOf(' ' + el.tagName.toLowerCase() + ' ') != -1);
	return success;
}

PTDOMUtil.cleanCSSText = function(css)
{
	var cssMap = {};
	var nameValuePairs = css.split(';');
	for(var i = 0; i < nameValuePairs.length; i++)
	{
		var nameValue = nameValuePairs[i].split(':');
		if(nameValue.length == 2)
		{
			var name = PTStringUtil.trimWhitespace(nameValue[0].toLowerCase(), true, true);
			var value = PTStringUtil.trimWhitespace(nameValue[1].toLowerCase(), true, true);
			cssMap[name] = value;
		}
	}
	if((cssMap['border-right'] == cssMap['border-left']) &&
	   (cssMap['border-top'] == cssMap['border-bottom']) &&
	   (cssMap['border-left'] == cssMap['border-bottom']))
	{
		cssMap['border'] = cssMap['border-right'];
		cssMap['border-right'] = '';
		cssMap['border-left'] = '';
		cssMap['border-top'] = '';
		cssMap['border-bottom'] = '';
	}
	var newCss = '';
	for(n in cssMap)
	{
		value = cssMap[n];
		if(value)
			newCss += n + ': ' + value + ';';
	}
	return newCss;
}

PTDOMUtil.getElementLeft = function(elm)
{								  if (!elm) { return false; }var x = elm.offsetLeft;	  var elmParent = elm.offsetParent; while (elmParent != null){										
	  if(PTBrowserInfo.IS_MSIE)			
	  {
		 if( (elmParent.tagName != "TABLE") && (elmParent.tagName != "BODY") )
		 {								   
			x += elmParent.clientLeft; 
		 }
	  }
	  else 
	  {
		 if(elmParent.tagName == "TABLE")  
		 {								  
			var parentBorder = parseInt(elmParent.border);
			if(isNaN(parentBorder))	 
			{							
			   var parentFrame = elmParent.getAttribute('frame');
			   if(parentFrame != null)	
			   {
				  x += 1;  
			   }
			}
			else if(parentBorder > 0)  
			{
			   x += parentBorder; 
			}
		 }
	  }
	  x += elmParent.offsetLeft;
	  elmParent = elmParent.offsetParent; 
}

return x;
}

PTDOMUtil.getElementTop = function(elm)
{	var y = 0;		 	while (elm != null)
	{										
	  	if(PTBrowserInfo.IS_MSIE)  
	  	{
		 	if( (elm.tagName != "TABLE") && (elm.tagName != "BODY") )
		 	{								  
				y += elm.clientTop;
		 	}
	  	}
	  	else 
	  	{
		 	if(elm.tagName == "TABLE") 
		 	{	
				var parentBorder = parseInt(elm.border);
				if(isNaN(parentBorder))   
				{			   
			   		var parentFrame = elm.getAttribute('frame');
			   		if(parentFrame != null) 
			   		{
				  		y += 1;  
			   		}
				}
				else if(parentBorder > 0)   
				{
			   		y += parentBorder;
				}
		 	}
	  	}
	  	y += elm.offsetTop;  
	 	if (elm.offsetParent && elm.offsetParent.offsetHeight && elm.offsetParent.offsetHeight < elm.offsetHeight)
	 	{			elm = elm.offsetParent.offsetParent; 
	 	}
	 	else
	 	{		  		elm = elm.offsetParent; 
	 	}	}	
	return y;
}

PTDOMUtil.getElementWidth = function(elm)
{	if (!elm) { return 0; }	var w1 = elm.offsetWidth;
	var w2 = 0;
	if (window.getComputedStyle) 
	{ 
		var w2px = window.getComputedStyle(elm,null).getPropertyValue('width'); 		w2px = PTStringUtil.substituteChars(w2px, { 'px' : '' });
		w2 = parseInt(w2px);
	}
	return Math.max(w1,w2);
}

PTDOMUtil.getElementHeight = function(elm)
{	if (!elm) { return 0; }	var h1 = elm.offsetHeight;
	var h2 = 0;
	if (window.getComputedStyle) 
	{ 
		var h2px = window.getComputedStyle(elm,null).getPropertyValue('height'); 		h2px = PTStringUtil.substituteChars(h2px, { 'px' : '' });
		h2 = parseInt(h2px);
	}
	return Math.max(h1,h2);
}

PTDOMUtil.getWindowWidth = function()
{
	if (self.innerHeight) 
	{
		return self.innerWidth;
	}
	else if (document.documentElement && document.documentElement.clientHeight)	{
		return document.documentElement.clientWidth;
	}
	else if (document.body) 
	{
		return document.body.clientWidth;
	}
}

PTDOMUtil.getWindowHeight = function()
{
	if (self.innerHeight) 
	{
		return self.innerHeight;
	}
	else if (document.documentElement && document.documentElement.clientHeight)	{
		return document.documentElement.clientHeight;
	}
	else if (document.body) 
	{
		return document.body.clientHeight;
	}
}

PTDOMUtil.setElementOpacity = function(element,value)
{
	if (!element || !element.style)	{ return false; }
	if (isNaN(value))				{ return false; }
	value = parseInt(value);
	if ((value < 0) || (value > 100)) { return false; }
	if (document.all)
	{		if (PTBrowserInfo.IS_NT4)
		{
			return false;
		}		else if (element.filters && element.filters.alpha && element.filters.alpha.opacity)
		{
			element.filters.alpha.opacity = value;
			return true;
		}		else if (typeof element.style.filter == 'string')
		{
			element.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + value + ')';
			return true;
		}		else
		{
			return false;
		}
	}	else if (typeof element.style.MozOpacity == 'string')
	{
		var dec = value / 100;
		element.style.MozOpacity = '' + dec;
		return true;
	}	else
	{
		return false;
	}
}

PTDOMUtil.toggleVisibility = function(id)
{
	var elm = PTDOMUtil.getElementById(id);
	if (elm.style.display == 'none')
	{ 
		if (PTDOMUtil._elmDisplayCache[id] || PTDOMUtil._elmDisplayCache[id] == '') 
		{ 
			elm.style.display = PTDOMUtil._elmDisplayCache[id]; 
		}
		else { elm.style.display = 'block'; }
	}
	else 
	{ 
		PTDOMUtil._elmDisplayCache[id] = elm.style.display;
		elm.style.display = 'none'; 
	}
}

PTDOMUtil._elmDisplayCache = {};
PTDate = function(datestring,date,language,dateFormat)
{
	this.datestring 	= (datestring) ? datestring : '';
	this.date			= (date) ? date : new Date();
	this.language		= (language) ? language : false;
	this.dateFormat		= (dateFormat) ? dateFormat : PTDate.defaultDateFormat;
	return this;
}

PTDate.VERSION = '246682';
PTDate.TIME_POLICY_ALLOW_TIMES		= 0;
PTDate.TIME_POLICY_REQUIRE_TIMES	= 1;
PTDate.TIME_POLICY_FORBID_TIMES		= 2;
PTDate.FORMAT_DEFAULT				= 0;
PTDate.FORMAT_SHORT					= 1;
PTDate.FORMAT_MEDIUM				= 2;
PTDate.FORMAT_LONG					= 3;
PTDate.FORMAT_FULL					= 4;
PTDate.PIVOT_DATE					= 50;  	
PTDate.defaultLanguage		= 'en';
PTDate.defaultDateFormat	= new String('EEE MMM d HH:mm:ss yyyy');
PTDate.DEFAULT_LOCALE				= 'en';
PTDate.EnglishStrings = new Object();
PTDate.EnglishStrings.monthsLong = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
PTDate.EnglishStrings.monthsShort = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
PTDate.EnglishStrings.daysLong = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
PTDate.EnglishStrings.daysShort = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
PTDate.EnglishStrings.daysInitial = new Array('S','M','T','W','T','F','S');
PTDate.EnglishStrings.ampm = new Array('am','pm');
PTDate.formatDate = function(date,dateFormat,language)
{
	var d = new PTDate('',date,language,dateFormat);
	return d.format(dateFormat,d.language);
}

PTDate.validateDate = function(dateString, locale, alertOnFailure, timePolicy, formatList)
{
	return PTDateValidator.validateDate(dateString,locale,alertOnFailure,timePolicy,formatList);
}

PTDate.validateAndFormatDate = function(dateString, outputFormat, locale, alertOnFailure, timePolicy, formatList)
{
	if (!dateString) { return false; }
	if (!outputFormat) { outputFormat = PTDate.defaultDateFormat; }
	var validDate = PTDateValidator.validateDate(dateString,locale,alertOnFailure,timePolicy,formatList);
	if (!validDate) { return false; }
	var formattedDate = PTDate.formatDate(validDate,outputFormat);
	return formattedDate;
}

PTDate.getNumberOfDaysInMonth = function(date)
{
	var m = date.getMonth();
	if ((m == 3) || (m == 5) || (m == 8) || (m == 10)) { return 30; }
	else if (m == 1)
	{
		var y = date.getFullYear();
		if ((!(y%4) && (y%100)) || !(y%400))
		{
			return 29;
		}
		else
		{
			return 28;
		}
	}
	else { return 31; }
}

PTDate.get2DigitYear = function(date)
{
	var y = date.getFullYear() % 100;
	if (y < 10) { y = '0' + y; }
	return '' + y;
}

PTDate.get2DigitMonth = function(date)
{
	var m = date.getMonth() + 1;
	if (m < 10) { m = '0' + m; }
	return '' + m
}

PTDate.get1DigitMonth = function(date)
{
	var m = date.getMonth() + 1;
	return '' + m
}

PTDate.get2DigitDayOfMonth = function(date)
{
	var d = date.getDate();
	if (d < 10) { d = '0' + d; }
	return '' + d;
}

PTDate.get1DigitDayOfMonth = function(date)
{
	var d = date.getDate();
	return '' + d;
}

PTDate.get2Digit1To12Hour = function(date)
{
	var h = date.getHours();
	h = h % 12;
	if (h == 0) { h = '12'; }
	else if (h < 10) { h = '0' + h; }
	return '' + h;
}

PTDate.get1Digit1To12Hour = function(date)
{
	var h = date.getHours();
	h = h % 12;
	if (h == 0) { h = '12'; }
	return '' + h;
}

PTDate.get2Digit0To23Hour = function(date)
{
	var h = date.getHours();
	if (h < 10) { h = '0' + h; }
	return '' + h;
}

PTDate.get2Digit0To11Hour = function(date)
{
	var h = date.getHours();
	h = h % 12;
	if (h < 10) { h = '0' + h; }
	return '' + h;
}

PTDate.get1Digit0To11Hour = function(date)
{
	var h = date.getHours();
	h = h % 12;
	return '' + h;
}

PTDate.get2Digit1To24Hour = function(date)
{
	var h = date.getHours() + 1;
	if (h < 10) { h = '0' + h; }
	return '' + h;
}

PTDate.get1Digit1To24Hour = function(date)
{
	var h = date.getHours() + 1;
	return '' + h;
}

PTDate.get2DigitMinutes = function(date)
{
	var m = date.getMinutes();
	if (m < 10) { m = '0' + m; }
	return '' + m;
}

PTDate.get1DigitMinutes = function(date)
{
	var m = date.getMinutes();
	return '' + m;
}

PTDate.get2DigitSeconds = function(date)
{
	var s = date.getSeconds();
	if (s < 10) { s = '0' + s; }
	return '' + s;
}

PTDate.get1DigitSeconds = function(date)
{
	var s = date.getSeconds();
	return '' + s;
}

PTDate.get3DigitMilliseconds = function(date)
{
	var m = date.getMilliseconds();
	if (m < 10) { m = '00' + m; }
	else if (m < 100) { m = '0' + m; }
	return '' + m;
}

PTDate.getAMPM = function(date,language)
{
	if (!language) { language = PTDate.defaultLanguage; }
	var h = date.getHours();
	var STR = PTDateStrings;
	if (language == 'en') { STR = PTDate.EnglishStrings; }
	var ampm = STR.ampm[0];
	if (h >= 12) { ampm = STR.ampm[1]; }
	return ampm;
}

PTDate.convert2DigitTo4DigitYear = function(year)
{
	if (year <= PTDate.PIVOT_DATE) { year += 100; }
	year += 1900;
	return year;
}

PTDate.isLeapYear = function(year)
{
	if (year && year.getFullYear)	{ var y = year.getFullYear(); }
	else							{ var y = parseInt(year); }
	return (((y % 4 == 0) && (y % 100 != 0)) || (y % 400 == 0));
}

PTDate.getFormatListForLocale = function(locale,requireExactMatch)
{
	locale = new String(locale);
	if ((locale.indexOf('-') == 2) && (locale.length == 5))
	{
		locale = (locale.substr(0,2)).toLowerCase() + '_' + (locale.substr(3,2)).toUpperCase();
	}
	if (PTDate.formats[locale]) { return PTDate.formats[locale]; }
	if (requireExactMatch) { return false; }
	var language = locale.substring(0,2);
	if (PTDate.formats[language]) { return PTDate.formats[language]; }
	for (var loc in PTDate.formats)
	{
		if (loc.indexOf(language) > -1) { return PTDate.formats[loc]; }
	}
	return PTDate.formats[PTDate.DEFAULT_LOCALE];
}

PTDate.stripTimesFromFormat = function(format)
{
	format = format.replace(/a.*$/,'');
	format = format.replace(/h.*$/i,'');
	return format;
}

PTDate.prototype.format = function(dateFormat,language)
{
	dateFormat = (dateFormat) ? new String(dateFormat) : this.dateFormat;
	language = (language) ? language : false;
	var date = this.date;
	var STR = PTDateStrings;
	if (language == 'en') { STR = PTDate.EnglishStrings; }
	var patternStrings = {
		'yyyy'		: date.getFullYear(),
		'yy'		: PTDate.get2DigitYear(date),
		'MMMMM'		: STR.monthsLong[date.getMonth()],	
		'MMMM'	    : STR.monthsLong[date.getMonth()],  // whether long form for month is 4 or 5 M's.  Support both here.
		'MMM'		: STR.monthsShort[date.getMonth()],
		'MM'		: PTDate.get2DigitMonth(date),
		'M'			: PTDate.get1DigitMonth(date),
		'EEEE'		: STR.daysLong[date.getDay()],
		'EEE'		: STR.daysShort[date.getDay()],	
		'EE'	    : STR.daysShort[date.getDay()], // whether short form for day is 2 or 3 E's.  Support both here.
		'E'			: STR.daysInitial[date.getDay()],
		'dd'		: PTDate.get2DigitDayOfMonth(date),
		'd'			: PTDate.get1DigitDayOfMonth(date),
		'hh'		: PTDate.get2Digit1To12Hour(date),
		'h'			: PTDate.get1Digit1To12Hour(date),
		'HH'		: PTDate.get2Digit0To23Hour(date),
		'H'			: date.getHours(),
		'KK'		: PTDate.get2Digit0To11Hour(date),
		'K'			: PTDate.get1Digit0To11Hour(date),
		'kk'		: PTDate.get2Digit1To24Hour(date),
		'k'			: PTDate.get1Digit1To24Hour(date),
		'mm'		: PTDate.get2DigitMinutes(date),
		'm'			: PTDate.get1DigitMinutes(date),
		'ss'		: PTDate.get2DigitSeconds(date),
		's'			: PTDate.get1DigitSeconds(date),
		'SSS'		: PTDate.get3DigitMilliseconds(date),
		'a'			: PTDate.getAMPM(date,language),
		'z'		    : ''	    // z gets used a lot in PTDateValidatorFormats, but we really don't want any effect from it
	}
	var ph = new Array();
	var f = dateFormat;
	while (f.indexOf('\'') != f.lastIndexOf('\''))
	{
		var re = new RegExp("('[^']*')");
		var res = re.exec(f);
		var literal = RegExp.$1;
		var pStart = f.indexOf(literal);
		var pEnd = pStart + literal.length;
		var filler = '';
		for (var i = 0; i < literal.length; i++) { filler += '-'; }
		f = f.substring(0,pStart) + filler + f.substr(pEnd);
	}
	for (var pattern in patternStrings)
	{
		while (f.indexOf(pattern) > -1)
		{
			var pStart = f.indexOf(pattern);
			var pEnd = pStart + pattern.length;
			ph[pStart] = new Object();
			ph[pStart].string = patternStrings[pattern];
			ph[pStart].end = pEnd;
			var filler = '';
			for (var i = 0; i < pattern.length; i++) { filler += '-'; }
			f = f.substring(0,pStart) + filler + f.substr(pEnd);
		}
	}
	var convertedString = new String('');
	var i = 0;
	while (i < dateFormat.length)
	{
		if (ph[i])
		{
			convertedString += ph[i].string;
			i = ph[i].end;
		}
		else
		{
			if (dateFormat.charAt(i) == '\'')
			{
				if (dateFormat.charAt(i+1) == '\'')
				{					convertedString += '\'';
					i = i + 2;
				}
				else { i++; }
				continue;
			}
			convertedString += dateFormat.charAt(i);
			i++;
		}
	}
	return PTStringUtil.trimWhitespace(convertedString,true,true);
}

PTDate.prototype.hasTime = function()
{
	return (this.datestring.indexOf(':') > -1);
}

PTDate.prototype.incrementMonth = function()
{
	var date = this.date;
	var month = date.getMonth();
	if (month < 11) {
		date.setMonth(month+1);
	}
	else {
		date.setMonth(0);
		date.setFullYear(date.getFullYear()+1);
	}
}

PTDate.prototype.incrementWeek = function()
{
	var date = this.date;
	var hours = date.getHours();
	date.setHours(12);
	var week = 1000*60*60*24*7;
	date.setTime(date.getTime()+week);
	date.setHours(hours);
}

PTDate.prototype.incrementDay = function()
{
	var date = this.date;
	var hours = date.getHours();
	date.setHours(12);
	var day = 1000*60*60*24;
	date.setTime(date.getTime()+day);
	date.setHours(hours);
}

PTDate.prototype.clone = function()
{
	return new PTDate(this.datestring,
					  new Date(this.date.getTime()),
					  this.language,
					  this.dateFormat);
}

PTDate.prototype.getNumberOfDaysInThisMonth = function()
{
	return PTDate.getNumberOfDaysInMonth(this.date);
}

PTDate.prototype.getTime = function()
{
	return this.date.getTime();
}

if (!PTDate.formats)
{
	PTDate.formats = new Object();
}

PTDate.formats['en'] 	= new Array(
									'MMM d, yyyy h:mm:ss a',
									'M/d/yyyy h:mm a',
									'MMM d, yyyy h:mm:ss a',
									'MMMM d, yyyy h:mm:ss a z',
									'EEEE, MMMM d, yyyy h:mm:ss a z'
								);PTDate.formats['da'] = new Array(
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
								);								PTDate.formats['fi_FI'] = new Array(
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
PTDateUtil = function()
{
	return this;
}

PTDateUtil.VERSION = '246682';
PTDateUtil.isSameDay = function (date1, date2)
{
	if (isNaN(date1) || isNaN(date2)) { return false; }
	if ((date1.getFullYear() == date2.getFullYear())
			&&
		(date1.getMonth() == date2.getMonth())
			&&
		(date1.getDate() == date2.getDate()))
	{
		return true;
	}
	else { return false; }
}

PTDateUtil.getDaysBetweenDates = function (date1, date2)
{
	if (isNaN(date1) || isNaN(date2)) { return 0; }
	date1.setHours(12);
	date2.setHours(12);
	var millis = Math.abs(date2.getTime() - date1.getTime());
	return Math.round(millis / (1000 * 60 * 60 * 24));
}

PTDateUtil.formatTime = function(sTime, iMode)
{
	var err = false;
	var regTime = /\b\d\d?\b|\b\d\d?\B|\B\d\d?\b|\B\d\d?\B/g;
	var regAMPM = new RegExp('AM|am|Am|aM|PM|pm|Pm|pM|p.m.|p.m|P.M.|a.m.|a.m|A.M.');
	if (sTime == '') { return false; }
	if ((sTime.match(/\d\d?:\d/) == null) || (sTime.match(/:/) == null)) { return false; }
	var arrTime = sTime.match(regTime);
	var strAMPM = sTime.match(regAMPM);
	if (!arrTime[1]) { arrTime[1] = 0; }
	if (!arrTime[2]) { arrTime[2] = 0; }
	if ((arrTime[0] > 23) || (arrTime[1] > 59) || (arrTime[2] > 59) || (arrTime[0] == null) || (arrTime[0] < 0) || (arrTime[1] < 0) || (arrTime[2] < 0)) { err = true; }
	var strTempDigits;
	if (iMode == 0)
	{
		if ((strAMPM == 'PM') && (arrTime[0] < 12))			{ arrTime[0] += 12; }
		else if ((strAMPM == 'AM') && (arrTime[0] == 12))	{ arrTime[0] = 0; }
	}
	else
	{
		if (!strAMPM)
		{
			strAMPM = 'AM';
			if (arrTime[0] > 12)
			{
				arrTime[0] = arrTime[0] - 12;
				strAMPM = 'PM';
			}
			else if (arrTime[0] == 0)
			{
				arrTime[0] = 12;
				strAMPM = 'AM';
			}
		}
	}
	for (i = 0; i < 3; i++)
	{
		strTempDigits = '0' + arrTime[i];
		if (strTempDigits.length == 2) { arrTime[i] = strTempDigits; }
	}
	if (err)
	{
		alert(PTS_STR['PTU-Date-TimeFormatError']);
		return false;
	}
	else
	{
		sTime = arrTime[0] + ':' + arrTime[1] + ':' + arrTime[2];
		if (iMode == 1) { sTime += ' ' + strAMPM; }
		return sTime;
	}
}

PTDateUtil.validateDate = function(strDay, strMonth, strYear)
{
	var strInputDate = strDay + ' ' + strMonth + ' ' + strYear;	var objDate = new Date(strInputDate);
	var strDate = objDate.toGMTString();
	var arrDate = strDate.split(' ');
	return (arrDate[2] != strMonth);
}

PTDateValidator = function()
{
	return this;
}

PTDateValidator.VERSION = '246682';
PTDateValidator.TIME_POLICY_ALLOW_TIMES		= 0;
PTDateValidator.TIME_POLICY_REQUIRE_TIMES	= 1;
PTDateValidator.TIME_POLICY_FORBID_TIMES	= 2;
PTDateValidator.formatTokens	= new Array('a','d','E','h','H','k','K','m','M','s','S','y');
PTDateValidator.punctuation		= new Array(',','/',':','-','.');
PTDateValidator.closeSubstitutes =	{
							'\u00E1' : 'a',
							'\u00E4' : 'a',
							'\u00E7' : 'c',
							'\u00E9' : 'e',
							'\u00EC' : 'i',
							'\u00FB' : 'u',
							'\u2013' : '-',  
							'\u2212' : '-'
					 };
PTDateValidator.validateDate = function(dateString, locale, alertOnFailure, timePolicy, formatList)
{
	if (!dateString) { return false; }
	if (!locale)	 { locale 		= PTDate.DEFAULT_LOCALE; }
	if (!timePolicy) { timePolicy 	= PTDateValidator.TIME_POLICY_ALLOW_TIMES; }
	if (!formatList) { formatList 	= PTDate.getFormatListForLocale(locale); }
	var isValidDate = false;
	var numFormats = formatList.length;
	var dateData = false;
	var hash = PTDateValidator.getPunctuationHash();
	for (var f = 0; f < numFormats; f++)
	{
		var format = formatList[f];
		dateData = PTDateValidator.parseDateStringAgainstFormat(dateString,format,hash,locale);
		if (dateData != false)
		{
			if (PTNumberUtil.isInteger(dateData.day) && PTNumberUtil.isInteger(dateData.month) && PTNumberUtil.isInteger(dateData.year)) { break; }
		}
	}
	var date;
	var isValidDate = false;
	if (dateData != false)
	{		if (dateData.ampm && (dateData.ampm == 'pm'))
		{
			if ((dateData.hour > 0) && (dateData.hour < 12)) { dateData.hour += 12; }
		}
		date = new Date(dateData.year, dateData.month, dateData.day, dateData.hour, dateData.minutes, dateData.seconds);
		if ((dateData.day == date.getDate()) &&
			(dateData.month == date.getMonth()) &&
			(dateData.year == date.getFullYear()))
		{
			isValidDate = true;
		}
	}
	if (!isValidDate) { alertOnFailure = PTDateValidator.alertOnFailure(alertOnFailure,formatList,timePolicy); }
	var isTimeValid = false;
	if (timePolicy == PTDateValidator.TIME_POLICY_ALLOW_TIMES)
	{
		if ((PTNumberUtil.isInteger(dateData.hour) && PTNumberUtil.isInteger(dateData.minutes)) ||
			(!PTNumberUtil.isInteger(dateData.hour) && !PTNumberUtil.isInteger(dateData.minutes)))
		{
			isTimeValid = true;
		} else { alertOnFailure = PTDateValidator.alertTimeFormatProblem(alertOnFailure,formatList,timePolicy); }
	}
	else if (timePolicy == PTDateValidator.TIME_POLICY_REQUIRE_TIMES)
	{
		if (PTNumberUtil.isInteger(dateData.hour) && PTNumberUtil.isInteger(dateData.minutes))
		{
			isTimeValid = true;
		} else { alertOnFailure = PTDateValidator.alertTimeRequired(alertOnFailure,formatList,timePolicy); }
	}
	else if (timePolicy == PTDateValidator.TIME_POLICY_FORBID_TIMES)
	{
		if (!PTNumberUtil.isInteger(dateData.hour) && !PTNumberUtil.isInteger(dateData.minutes))
		{
			isTimeValid = true;
		} else { alertOnFailure = PTDateValidator.alertTimeForbidden(alertOnFailure,formatList,timePolicy); }
	}
	if (timePolicy != PTDateValidator.TIME_POLICY_FORBID_TIMES)
	{
		if ((dateData.hour < 0) || (dateData.hour > 23))
		{
			isTimeValid = false;
			alertOnFailure = PTDateValidator.alertTimeFormatProblem(alertOnFailure,formatList,timePolicy);
		}
		else if ((dateData.minutes < 0) || (dateData.minutes > 59))
		{
			isTimeValid = false;
			alertOnFailure = PTDateValidator.alertTimeFormatProblem(alertOnFailure,formatList,timePolicy);
		}
		else if ((dateData.seconds < 0) || (dateData.seconds > 59))
		{
			isTimeValid = false;
			alertOnFailure = PTDateValidator.alertTimeFormatProblem(alertOnFailure,formatList,timePolicy);
		}
	}
	var returnValue = false;
	if (isValidDate && isTimeValid) { returnValue = date; }
	return returnValue;
}

PTDateValidator.parseDateStringAgainstFormat = function(dateString, format, hash, locale)
{
	dateString = (new String(dateString)).replace(/\'/g,'');
	format = format.replace(/\'\'/g,'');
	while (1)
	{
		var s = format.indexOf('\'');
		if (s == -1) { break; }
		var e = format.substr(s + 1).indexOf('\'');
		if (e == -1) { break; }
		e += s + 1;
		var literal = format.substring(s + 1,e);
		var percent = parseInt(((s / format.length) * 100),10);
		var matches = PTDateValidator.findAllMatches(literal, dateString, locale);
		var bestMatch = false;
		var bestDist = 100;
		for (var m = 0; m < matches.length; m++)
		{
			var match = matches[m];
			var dist = Math.abs(percent - match.pct);
			if (dist < bestDist) { bestMatch = match; }
		}
		if (bestMatch)
		{
			var start = bestMatch.loc;
			var end = start + literal.length;
			dateString = dateString.substring(0,start) + ' ' + dateString.substr(end);
		}
		format = format.substring(0,s) + ' ' + format.substr(e + 1);
	}
	dateString = PTStringUtil.substituteChars(dateString,hash);
	format = PTStringUtil.substituteChars(format,hash);
	dateString = PTStringUtil.trimWhitespace(dateString,true,true);
	format = PTStringUtil.trimWhitespace(format,true,true);
	var i = dateString.split(/\s+/);
	var f = format.split(/\s+/);
	var dateData = new _dateData();
	var numWords = Math.min(i.length,f.length);
	for (var w = 0; w < numWords; w++)
	{		
		var formatToken = f[w];
		var word = i[w];
		dateData = PTDateValidator.validateWordByTokenType(word,formatToken,dateData,locale);
		if (dateData == false) { return false; }
	}
	return dateData;
}

PTDateValidator.validateWordByTokenType = function(word, formatToken, dateData, locale)
{
	word = word.toLowerCase();
	var foundAmpm = false;
	var STR = PTDateStrings;
	if (locale.indexOf('en') == 0) { STR = PTDate.EnglishStrings; }
	if (formatToken.indexOf('a') > -1)
	{
		var strings = STR.ampm.length;
		for (var s = 0; s < strings; s++)
		{
			var ampmString = STR.ampm[s];
			var idx = word.indexOf(ampmString.toLowerCase());
			if (idx > -1)
			{
				dateData.ampm = (s) ? 'pm' : 'am';
				word = word.substring(0,idx) + word.substr(ampmString.length);
				while (formatToken.indexOf('a') > -1)
				{
					var pos = formatToken.indexOf('a');
					formatToken = formatToken.substring(0,pos) + formatToken.substr(pos + 1);
				}
				foundAmpm = true;
				break;
			}
		}
	}
	if (formatToken.charAt(0) == 'd')
	{		if (!PTNumberUtil.isInteger(word)) { return false; }
		var n = word;
		if (parseInt(n,10) == 0) { n = parseInt(n,10); }
		else { n = parseInt(PTNumberUtil.trimLeadingZeros(word),10); }
		if (isNaN(n)) { return false; }		dateData.day = n;
		return dateData;
	}
	else if (formatToken == 'E')
	{		if (PTDateValidator.isWordLike(word,STR.daysInitial,7)) { return dateData; }
	}
	else if (formatToken.substring(0,2) == 'EE')
	{		if (PTDateValidator.isWordLike(word,STR.daysLong.concat(STR.daysShort),7)) { return dateData; }
	}
	else if (formatToken.charAt(0).toLowerCase() == 'h')
	{		if (!PTNumberUtil.isInteger(word)) { return false; }
		var n = word;
		if (parseInt(n,10) == 0) { n = parseInt(n,10); }
		else { n = parseInt(PTNumberUtil.trimLeadingZeros(word),10); }
		if (isNaN(n)) { return false; }		dateData.hour = n;
		return dateData;
	}
	else if (formatToken.charAt(0).toLowerCase() == 'k')
	{		if (!PTNumberUtil.isInteger(word)) { return false; }
		var n = word;
		if (parseInt(n,10) == 0) { n = parseInt(n,10); }
		else { n = parseInt(PTNumberUtil.trimLeadingZeros(word),10); }
		if (isNaN(n)) { return false; }		dateData.hour = n;
		return dateData;
	}
	else if (formatToken.charAt(0) == 'm')
	{		if (!PTNumberUtil.isInteger(word)) { return false; }
		var n = word;
		if (parseInt(n,10) == 0) { n = parseInt(n,10); }
		else { n = parseInt(PTNumberUtil.trimLeadingZeros(word),10); }
		if (isNaN(n)) { return false; }		dateData.minutes = n;
		return dateData;
	}
	else if ((formatToken == 'M') || (formatToken == 'MM'))
	{		if (!PTNumberUtil.isInteger(word)) { return false; }
		var n = word;
		if (parseInt(n,10) == 0) { n = parseInt(n,10); }
		else { n = parseInt(PTNumberUtil.trimLeadingZeros(word),10); }
		if (isNaN(n)) { return false; }
		n -= 1;		dateData.month = n;
		return dateData;
	}
	else if (formatToken.substring(0,3) == 'MMM')
	{		var m = PTDateValidator.isWordLike(word,STR.monthsLong.concat(STR.monthsShort),12);
		if (m)
		{			if (parseInt(m,10) == 0) { dateData.month = 0; }
			else { dateData.month = parseInt(PTNumberUtil.trimLeadingZeros(m),10); }
			return dateData;
		}
	}
	else if (formatToken.charAt(0) == 's')
	{
		var n = word;
		if (parseInt(n,10) == 0) { n = parseInt(n,10); }
		else { n = parseInt(PTNumberUtil.trimLeadingZeros(word),10); }		if (isNaN(n)) { dateData.seconds = 0; }		else { dateData.seconds = n; }
		return dateData;
	}
	else if (formatToken.charAt(0) == 'S')
	{		return dateData;
	}
	else if (formatToken.indexOf('yy') > -1)
	{		if (!PTNumberUtil.isInteger(word)) { return false; }
		var n = parseInt(PTNumberUtil.trimLeadingZeros(word),10);
		if (isNaN(n)) { return false; }		if (n < 100)
		{
			n = PTDate.convert2DigitTo4DigitYear(n);
		}
		dateData.year = n;
		return dateData;
	}
	else if (formatToken.charAt(0) == 'z')
	{		return dateData;
	}
	if (foundAmpm)	{ return dateData }
	else			{ return false; }
}

PTDateValidator.isWordLike = function(word, matchArray, numTests)
{
	word = word + '';  
	var len = matchArray.length;
	for (var a = 0; a < len; a++)
	{
		var m = (new String(matchArray[a])).toLowerCase() + '';  
		if (m == word) { return new String(a % numTests); }
		if ((word.length >= 3) && (m.indexOf(word.substring(0,3)) == 0)) { return new String(a % numTests); }
		m = PTStringUtil.substituteChars(m,PTDateValidator.closeSubstitutes);
		if (m == word) { return new String(a % numTests); }
		if ((word.length >= 3) && (m.indexOf(word) == 0)) { return new String(a % numTests); }
	}
	return false;
}

PTDateValidator.findAllMatches = function(pattern, string, locale)
{
	var results = new Array();
	var tester = new String(string);
	var chopped = 0;
	var STR = PTDateStrings;
	if (locale.indexOf('en') == 0) { STR = PTDate.EnglishStrings; }
	while (tester.indexOf(pattern) > -1)
	{
		var loc = tester.indexOf(pattern);
		var pos = loc + chopped;
		var nogood = false;
		var fragment = (tester.substr(tester.indexOf(pattern))).replace(/\s.*$/,'');
		if (fragment.length > 1)
		{
			for (var i = 0; i < STR.monthsLong.length; i++)
			{
				if (STR.monthsLong[i].indexOf(fragment) > -1)
				{
					nogood = true;
					break;
				}
			}
		}
		if (!nogood)
		{
			var r = results[results.length] = new Object();
			r.loc = pos;
			r.pct = Math.round((pos / string.length) * 100);
		}
		tester = tester.substr(loc + 1);
		chopped += (loc + 1);
	}
	return results;
}

PTDateValidator.alertOnFailure = function(alertOnFailure, formatList, timePolicy)
{
	if (alertOnFailure)
	{
		var sb = new PTStringBuffer();
		sb.append(PTS_STR['PTU-DateV-DateFormatError'] + '\n\n');
		sb.append(PTS_STR['PTU-DateV-ExampleFormats'] + '\n\n');
		var m = new Array();
		var d = new Date();
		var startAt = 0;
		if (formatList[0] == formatList[2]) { startAt = 1; }
		for (var f = startAt; f < formatList.length; f++)
		{
			var format = formatList[f];
			if (timePolicy == PTDateValidator.TIME_POLICY_FORBID_TIMES) { format = PTDate.stripTimesFromFormat(format); }
			var formattedDate = PTDate.formatDate(d,format);
			if (m[formattedDate]) { continue; }
			else { m[formattedDate] = true; }
			sb.append('      ' + formattedDate + '\n');
		}
		sb.append('\n');
		alert(sb.toString());
	}
	return false;
}

PTDateValidator.alertTimeFormatProblem = function(alertOnFailure, formatList, timePolicy)
{
	if (alertOnFailure)
	{
		alert(PTS_STR['PTU-DateV-TimeFormatError']);
		return false;
	}
	return alertOnFailure;
}

PTDateValidator.alertTimeRequired = function(alertOnFailure, formatList, timePolicy)
{
	if (alertOnFailure)
	{
		alert(PTS_STR['PTU-DateV-TimeRequired']);
		return false;
	}
	return alertOnFailure;
}

PTDateValidator.alertTimeForbidden = function(alertOnFailure, formatList, timePolicy)
{
	if (alertOnFailure)
	{
		alert(PTS_STR['PTU-DateV-TimeForbidden']);
		return false;
	}
	return alertOnFailure;
}

PTDateValidator.getPunctuationHash = function()
{
	var hash = new Array();
	var chars = PTStringUtil.whitespaceChars.concat(PTDateValidator.punctuation);
	var len = chars.length;
	for (var c = 0; c < len; c++) { hash[chars[c]] = ' '; }
	return hash;
}

function _dateData()
{
	this.day		= false;
	this.month 		= false;
	this.year		= false;
	this.hour		= false;
	this.minutes	= false;
	this.seconds	= false;
	this.ampm		= false;
	return this;
}

PTEventUtil = function()
{
	return this;
}

PTEventUtil.VERSION = '246682';
PTEventUtil.SRC_BUTTON_LEFT	= 'left';
PTEventUtil.SRC_BUTTON_RIGHT	= 'right';
PTEventUtil.SRC_BUTTON_MIDDLE	= 'middle';
PTEventUtil.stopBubbling = function(e)
{
	if (!e) var e = window.event;
	if (!e) return;
	e.cancelBubble = true;
	if (e.stopPropagation) e.stopPropagation();
}

PTEventUtil.attachEventListener = function(targetElement, eventName, listenerReference)
{	if (document.all)
	{		if (eventName.substring(0,2) != 'on') { eventName = 'on' + eventName; }
		targetElement.attachEvent(eventName, listenerReference);
	}	else
	{		if (eventName.substring(0,2) == 'on') { eventName = eventName.substring(2,eventName.length); }
		targetElement.addEventListener(eventName, listenerReference, false);
	}
}

PTEventUtil.detachEventListener = function(targetElement, eventName, listenerReference)
{	if (document.all)
	{		if (eventName.substring(0,2) != 'on') { eventName = 'on' + eventName; }
		targetElement.detachEvent(eventName, listenerReference);
	}	else
	{		if (eventName.substring(0,2) == 'on') { eventName = eventName.substring(2,eventName.length); }
		targetElement.removeEventListener(eventName, listenerReference, false);
	}
}

PTEventUtil.getSrcElement = function(e)
{	if (document.all)
	{
		return e.srcElement;
	}	else
	{
		return e.target;
	}
}

PTEventUtil.getButtonClicked = function(e)
{
	if (!e) { return false; }
	if (document.all)
	{
		if (e.button == 1) { return PTEventUtil.SRC_BUTTON_LEFT; }
		else if (e.button == 4) { return PTEventUtil.SRC_BUTTON_MIDDLE; }
		else if (e.button == 2){ return PTEventUtil.SRC_BUTTON_RIGHT; }
		else { return false; }
	}	else
	{
		if (e.button == 0) { return PTEventUtil.SRC_BUTTON_LEFT; }
		else if (e.button == 1) { return PTEventUtil.SRC_BUTTON_MIDDLE; }
		else if (e.button == 2){ return PTEventUtil.SRC_BUTTON_RIGHT; }
		else { return false; }
	}
}

PTEventUtil.getMouseOverFromElement = function(e)
{
	if (!e) { return false; }
	if (document.all) { return e.fromElement; }	else { return e.relatedTarget; }
}

PTEventUtil.getMouseOutFromElement = function(e)
{
	if (!e) { return false; }
	if (document.all) { return e.fromElement; }	else { return e.target; }
}

PTEventUtil.getMouseOverToElement = function(e)
{
	if (!e) { return false; }
	if (document.all) { return e.toElement; }	else { return e.target; }
}

PTEventUtil.getMouseOutToElement = function(e)
{
	if (!e) { return false; }
	if (document.all) { return e.toElement; }	else { return e.relatedTarget; }
}

PTEventUtil.clickElement = function(elm) 
{if (elm.click) { elm.click(); }else if (elm.dispatchEvent) {
	 var evt = document.createEvent('MouseEvents');
	 evt.initMouseEvent(
	   'click',
		true,
		true,
		window,
		1,
		0,
		0,
		0,
		0,
		false,
		false,
		false,
		false,
		0,
		null
	 );
	 elm.dispatchEvent(evt);
}

}
PTEventUtil.getMouseX = function(e)
{
	var posx = 0;
	if (!e) var e = window.event;
	if (e.pageX)
	{
		posx = e.pageX;
	}
	else if (e.clientX)
	{
		posx = e.clientX;
		posy = e.clientY;
		if (PTBrowserInfo.IS_MSIE)
		{
			posx += document.body.scrollLeft;
		}
	}
	return posx;
}

PTEventUtil.getMouseY = function(e)
{
	var posy = 0;
	if (!e) var e = window.event;
	if (e.pageY)
	{
		posy = e.pageY;
	}
	else if (e.clientY)
	{
		posy = e.clientY;
		if (PTBrowserInfo.IS_MSIE)
		{
			posy += document.body.scrollTop;
		}
	}
	return posy;
}

PTFormUtil = function() {}

PTFormUtil.VERSION = '246682';
PTFormUtil.getRadioValue = function(rads)
{
	if (!rads) { return; }
	var val;
	if (rads.length > 1) {
		for (var i = 0; i < rads.length; i++) {
			if (rads[i].checked) {
				val = rads[i].value;
				break;
			}
		}
	} else {
		val = rads.value;
	}
	return val;
}

PTFormUtil.setRadioValue = function(rads,val)
{
	if (!rads) { return false; }
	var foundRadio = false;
	if (rads.length > 1)
	{
		for (var i = 0; i < rads.length; i++)
		{
			if (rads[i].value == val)
			{
				foundRadio = true;
				break;
			}
		}
		if (foundRadio)
		{
			for (var i = 0; i < rads.length; i++)
			{
				if (rads[i].value == val)	{ rads[i].checked = true; }
				else						{ rads[i].checked = false; }
			}
		}
	}
	else
	{
		foundRadio = (rads.checked = true);
	}
	return foundRadio;
}

PTFormUtil.setSelectValue = function(sel,val)
{
	var success = false;
	if (!sel) { return success; }
	if (sel.options.length < 1) { return success; }
	for (var i = 0; i < sel.options.length; i++) {
		var opt = sel.options[i];
		if (opt.value && opt.value == val) {
			sel.selectedIndex = i;
			success = true;
			break;
		}
	}
	return success;
}

PTFormUtil.fillSelect = function(sel,optionsInfo)
{
	if (!sel) { return; }
	if (!optionsInfo) { return; }
	if (!optionsInfo.length) { return; }
	var numOldOptions = sel.options.length;
	var numNewOptions = optionsInfo.length;
	for (var i = 0; i < numNewOptions; i++) {
		if (!optionsInfo[i]) { continue; }
		var curNewOption = optionsInfo[i];
		var newOptionText = curNewOption.text;
		var newOptionValue = curNewOption.value;
		var newOptionIndex = numOldOptions + i;
		sel.options[newOptionIndex] = new Option(newOptionText,newOptionValue);
	}
}

PTFormUtil.clearSelect = function(sel)
{
	if (!sel) { return; }
	var numOpts = sel.options.length;
	if (numOpts == 0) { return; }
	for (var i = (numOpts - 1); i >= 0; i--) {
		sel.options[i] = null;
	}
}

PTFormUtil.addItemToSelect = function(sel,val,txt,idx)
{
	if ((!idx && (idx != 0)) || (idx == -1)) {
		idx = sel.options.length;
		sel.options[idx] = new Option(txt,val);
	} else {
		var opts = sel.options;
		var len = opts.length;
		for (var i = len; i > idx; i--) {
			if (!opts[i]) {
				opts[i] = new Option(opts[i-1].text,opts[i-1].value);
			} else {
				opts[i].text = opts[i-1].text;
				opts[i].value = opts[i-1].value;
			}
		}
		opts[idx].text = txt;
		opts[idx].value = val;
	}
	return idx;
}

PTFormUtil.selectMoveItemUp = function(sel)
{
	idx = sel.selectedIndex;
	if (idx == -1) { return; }
	if (idx < 1) { return; }
	var swapText = sel.options[idx-1].text;
	var swapVal = sel.options[idx-1].value;
	sel.options[idx-1].text = sel.options[idx].text;
	sel.options[idx-1].value = sel.options[idx].value;
	sel.options[idx].text = swapText;
	sel.options[idx].value = swapVal;
	sel.selectedIndex = idx - 1;
}

PTFormUtil.selectMoveItemDown = function(sel)
{
	idx = sel.selectedIndex;
	if (idx == -1) { return; }
	if (idx >= (sel.options.length - 1)) { return; }
	var swapText = sel.options[idx+1].text;
	var swapVal = sel.options[idx+1].value;
	sel.options[idx+1].text = sel.options[idx].text;
	sel.options[idx+1].value = sel.options[idx].value;
	sel.options[idx].text = swapText;
	sel.options[idx].value = swapVal;
	sel.selectedIndex = idx + 1;
}

PTFormUtil.focusAndSelectText = function(input)
{
	if (!input || !input.focus || !input.select) { return; }
	input.focus();
	input.select();
}

PTFormUtil.focusFormFieldByName = function(fieldName)
{
	var field = eval(fieldName);
	if (field && field.focus) { field.focus(); }
}

PTFormUtil.hideAllSelects = function(elem)
{
	if (!elem) { elem = window.document; }
	var selects = elem.getElementsByTagName('select');
	var hiddenSelects = new Array();
	for (var s = 0; s < selects.length; s++)
	{
		if(selects[s].style.visibility != 'hidden')
		{
			PTFormUtil.setSelectVisibility(selects[s],'hidden');
			hiddenSelects[hiddenSelects.length] = selects[s];
		}
	}
	return hiddenSelects;
}

PTFormUtil.hideSelects = function(selects)
{
	if(!selects) return;
	for (var s = 0; s < selects.length; s++)
	{
		PTFormUtil.setSelectVisibility(selects[s],'hidden');
	}
}

PTFormUtil.showAllSelects = function(elem)
{
	if (!elem) { elem = window.document; }
	var selects = elem.getElementsByTagName('select');
	var visibleSelects = new Array();
	for (var s = 0; s < selects.length; s++)
	{
		if(selects[s].style.visibility == 'hidden')
		{
			PTFormUtil.setSelectVisibility(selects[s],'visible');
			visibleSelects[visibleSelects.length] = selects[s];
		}
	}
	return visibleSelects;
}

PTFormUtil.showSelects = function(selects)
{
	if(!selects) return;
	for(var s = 0; s < selects.length; s++)
	{
		PTFormUtil.setSelectVisibility(selects[s], 'visible');
	}
}

PTFormUtil.disableAllSelects = function(elem)
{
	if (!elem) { elem = window.document; }
	var selects = elem.getElementsByTagName('select');
	if (!window._selectStateCache) { window._selectStateCache = new Object(); }
	for (var s = 0; s < selects.length; s++)
	{
		var sel = selects[s];
		if (sel.id)
		{
			if (sel.disabled === true)	{ window._selectStateCache[sel.id] = true; }
			else						{ window._selectStateCache[sel.id] = false; }
		}
		sel.disabled = true;
	}
}

PTFormUtil.enableAllSelects = function(elem,useSelectStateCache)
{
	if (!elem) { elem = window.document; }
	var selects = elem.getElementsByTagName('select');
	for (var s = 0; s < selects.length; s++)
	{
		var sel = selects[s];
		if (useSelectStateCache && window._selectStateCache && window._selectStateCache[sel.id]) { continue; }
		selects[s].disabled = false;
	}
}

PTFormUtil.setSelectVisibility = function(select,vis)
{
	if (!select) { return false; }
	select.style.visibility = vis;
}

PTHashtable = function()
{
	this._keys			= new Array();
	this._values		= new Object();
	this._enumKeyIndex	= -1;
	return this;
}

PTHashtable.VERSION = '246682';
PTHashtable.prototype.className = 'PTHashtable';
PTHashtable.prototype.clear = function()
{
	this._keys			= new Array();
	this._values		= new Object();
	this._enumKeyIndex	= -1;
}

PTHashtable.prototype.clone = function()
{
	var newHT = new PTHashtable();
	var numKeys = this._keys.length;
	for (var i = 0; i < numKeys; i++)
	{
		var key = this._keys[i];
		newHT._keys[i] = key;
		newHT._values[key] = this._values[key];
	}
	return newHT;
}

PTHashtable.prototype.contains = function(obj)
{
	return this.containsValue(obj);
}

PTHashtable.prototype.containsKey = function(key)
{
	var numKeys = this._keys.length;
	for (var i = 0; i < numKeys; i++)
	{
		if (this._keys[i] == key) { return true; }
	}
	return false;
}

PTHashtable.prototype.containsValue = function(obj)
{
	var numKeys = this._keys.length;
	for (var i = 0; i < numKeys; i++)
	{
		var key = this._keys[i];
		if (this._values[key] == obj) { return true; }
	}
	return false;
}

PTHashtable.prototype.equals = function(obj)
{
	if (!obj) { return false; }
	if (!obj.className) { return false; }
	if (obj.className != 'PTHashtable') { return false; }
	if (!obj._keys) { return false; }
	if (!PTArrayUtil.isArrayLike(obj._keys)) { return false; }
	if (obj._keys.length != this._keys.length) { return false; }
	var numKeys = this._keys.length;
	for (var i = 0; i < numKeys; i++)
	{
		var key = this._keys[i];
		if (key != obj._keys[i]) { return false; }
		if (this._values[key] != obj._values[key]) { return false; }
	}
	return true;
}

PTHashtable.prototype.get = function(key)
{
	return this._values[key];
}

PTHashtable.prototype.hasNext = function()
{
	var index = this._enumKeyIndex + 1;
	return (this._keys.length > index) ? true : false;
}

PTHashtable.prototype.isEmpty = function()
{
	return (this.size() == 0) ? true : false;
}

PTHashtable.prototype.keys = function()
{
	var arr = new Array();
	var numKeys = this._keys.length;
	for (var i = 0; i < numKeys; i++)
	{
		arr[i] = this._keys[i];
	}
	return arr;
}

PTHashtable.prototype.next = function()
{
	this._enumKeyIndex++;
	if (!this.hasNext()) { return; }
	else
	{
		return this._values[this._keys[this._enumKeyIndex]];
	}
}

PTHashtable.prototype.put = function(key,value)
{
	var oldValue = this._values[key];
	if (!this.containsKey(key))
	{
		this._keys.push(key);
	}
	this._values[key] = value;
	return oldValue;
}

PTHashtable.prototype.remove = function(key)
{
	var oldValue = this._values[key];
	var keyIndex = -1;
	var numKeys = this._keys.length;
	for (var i = 0; i < numKeys; i++)
	{
		if (this._keys[i] == key)
		{
			keyIndex = i;
			break;
		}
	}
	if (keyIndex == -1) { return; }
	this._keys.splice(keyIndex,1);
	return oldValue;
}

PTHashtable.prototype.resetIterator = function()
{
	this._enumKeyIndex	= -1;
}

PTHashtable.prototype.size = function()
{
	return this._keys.length;
}

PTHashtable.prototype.toArray = function()
{
	var arr = new Array();
	var numKeys = this._keys.length;
	for (var i = 0; i < numKeys; i++)
	{
		var key = this._keys[i];
		var value = this._values[key];
		var obj = new Object();
		obj.key = key;
		obj.value = value;
		arr[i] = obj;
	}
	return arr;
}

PTHashtable.prototype.toString = function()
{
	var sb = new PTStringBuffer();
	sb.append('{ ');
	var numKeys = this._keys.length;
	for (var i = 0; i < numKeys; i++)
	{
		var key = this._keys[i];
		var value = this._values[key];
		sb.append('\'' + PTStringUtil.escapeJS(key) + '\'');
		sb.append(' : ');
		sb.append('\'' + PTStringUtil.escapeJS(value) + '\'');
		if (i != (numKeys - 1)) { sb.append(', '); }
	}
	sb.append(' }');
	return sb.toString();
}

PTHashtable.prototype.values = function()
{
	var arr = new Array();
	var numKeys = this._keys.length;
	for (var i = 0; i < numKeys; i++)
	{
		var key = this._keys[i];
		arr[i] = this._values[key];
	}
	return arr;
}

PTNumberFormatter = function(num)
{
	this.num					= (num) ? num : 0;
	this.isGrouping				= true;
	this.isCurrency				= false;
	this.currencySymbol			= '';
	this.currencySymbolBefore	= true;
	this.groupingSeparator		= ',';
	this.decimalSeparator		= '.';
	this.decimalPlaces			= -1;
	this.negativePrefix			= '-';
	this.negativeSuffix			= '';
}

PTNumberFormatter.VERSION = '246682';
PTNumberFormatter.prototype.INVALID = 'INVALID';
PTNumberFormatter.prototype.formatValue = function(num)
{
	if (num != null) { this.num = num; }
	if ((this.num == null) || (this.num == '') || (this.num.toString().length == 0)) { return ''; }
	if (this.isCurrency == true)
	{
		var csRe1 = new RegExp(this.currencySymbol, 'gi');
		this.num = this.num.toString().replace(csRe1,'');
		var csRe2 = new RegExp('\\'+this.currencySymbol, 'gi');
		this.num = this.num.toString().replace(csRe2,'');
	}
	var gsRe = new RegExp('\\'+this.groupingSeparator, 'g');
	this.num = this.num.toString().replace(gsRe,'');
	if ((this.num.toString().indexOf('(') > -1) && (this.num.toString().indexOf(')') > -1)) {		if (this.num.toString().indexOf(')') != this.num.toString().lastIndexOf(')')) {
			return this.invalidNumber();
		}
		if (this.num.toString().indexOf('(') != this.num.toString().lastIndexOf('(')) {
			return this.invalidNumber();
		}		if (this.num.toString().indexOf(')') < this.num.toString().lastIndexOf('(')) {
			return this.invalidNumber();
		}
		var paRe1 = new RegExp('\\(', 'g');
		this.num = this.num.toString().replace(paRe1,'');
		var paRe2 = new RegExp('\\)', 'g');
		this.num = this.num.toString().replace(paRe2,'');		if (this.num.toString().indexOf('-') == -1) {
			this.num = '-' + this.num.toString();
		}
	}
	if (this.num.toString().indexOf('-') != this.num.toString().lastIndexOf('-')) {		return this.invalidNumber();
	}
	var mseRe = new RegExp('\\d\\D*-\\D*\\d', 'g');
	if (mseRe.test(this.num.toString())) {
		return this.invalidNumber();
	}
	if (this.num.toString().indexOf('-') != -1) {
		var msRe = new RegExp('-', 'g');
		this.num = this.num.toString().replace(msRe,'');
		this.num = '-' + this.num.toString();
	}
	dsRe = new RegExp('\\'+this.decimalSeparator, 'g');
	this.num = this.num.toString().replace(dsRe,'.');
	if (isNaN(this.num)) {
		return this.invalidNumber();
	}
	var pos;
	var nNum = this.num; 
	var nStr;			
	var absNum = this.num;
	if (absNum.toString().indexOf('-') == 0) {
		absNum = absNum.substring(1);
	}
	nNum = this.getRounded(nNum);
	nStr = this.preserveZeros(absNum);
	dotRe = new RegExp('\\.', 'g');
	nStr = nStr.replace(dotRe,this.decimalSeparator);
	if (this.isGrouping) {
		pos = nStr.indexOf(this.decimalSeparator);
		if (pos == -1) {
			pos = nStr.length;
		}
		while (pos > 0) {
			pos -= 3;
			if (pos <= 0) { break; }
			nStr = nStr.substring(0,pos) + this.groupingSeparator + nStr.substring(pos, nStr.length);
		}
	}
	if (this.isCurrency) {
		if (this.currencySymbolBefore) {
			nStr = this.currencySymbol + nStr;
		} else {
			nStr = nStr + this.currencySymbol;
		}
	}
	nStr = (nNum < 0) ? this.negativePrefix + nStr + this.negativeSuffix : nStr; 
	return (nStr);
}

PTNumberFormatter.prototype.setNumber = function(num)
{
	this.num = num;
}

PTNumberFormatter.prototype.toUnformatted = function()
{
	return (this.num);
}

PTNumberFormatter.prototype.setGrouping = function(showGroupingSeparator)
{
	this.isGrouping = showGroupingSeparator;
}

PTNumberFormatter.prototype.setGroupingSeparator = function(separator)
{
	this.groupingSeparator = separator;
}

PTNumberFormatter.prototype.setDecimalSeparator = function(separator)
{
	this.decimalSeparator = separator;
}

PTNumberFormatter.prototype.setCurrency = function(isCurrency)
{
	this.isCurrency = isCurrency;
}

PTNumberFormatter.prototype.setCurrencySymbol = function(symbol)
{
	this.currencySymbol = symbol;
}

PTNumberFormatter.prototype.setCurrencySymbolBefore = function(showSymbolBefore)
{
	this.currencySymbolBefore = showSymbolBefore;
}

PTNumberFormatter.prototype.setDecimalPlaces = function(numDecimalPlaces)
{
	this.decimalPlaces = numDecimalPlaces;
}

PTNumberFormatter.prototype.setNegativePrefix = function(symbol)
{
	this.negativePrefix = symbol;
}

PTNumberFormatter.prototype.setNegativeSuffix = function(symbol)
{
	this.negativeSuffix = symbol;
}

PTNumberFormatter.prototype.formatField = function(field)
{
	var formatted = this.formatValue(field.value);
	if (formatted == this.INVALID)
	{
		field.value = '';
		field.focus();
	}
	else { field.value = formatted; }
}

PTNumberFormatter.prototype.validateValue = function(number)
{
	var formatted = this.formatValue(number);
	if (formatted == this.INVALID)	{ return false; }
	else							{ return true; }
}

PTNumberFormatter.prototype.getRounded = function(val)
{
	if (this.decimalPlaces < 0) return val;
	var factor;
	var i;
	factor = 1;
	for (i=0; i<this.decimalPlaces; i++)
	{   factor *= 10; }
	val *= factor;
	val = Math.round(val);
	val /= factor;
	return (val);
}

PTNumberFormatter.prototype.preserveZeros = function(val)
{
	var i;
	val = val + '';
	if (this.decimalPlaces < 0) return val; 
	var decimalPos = val.indexOf('.');
	if (decimalPos == -1 && this.decimalPlaces > 0)
	{
		val += this.decimalSeparator;
		for (i=0; i<this.decimalPlaces; i++)
		{
			val += '0';
		}
	}
	else
	{
		var actualDecimals = (val.length - 1) - decimalPos;
		var difference = this.decimalPlaces - actualDecimals;
		for (i=0; i<difference; i++)
		{
			val += '0';
		}
	}
	return val;
}

PTNumberFormatter.prototype.invalidNumber = function()
{
	alert(PTS_STR['PTU-Number-AlertInvNumber']);
	return this.INVALID;
}

PTNumberFormatter.prototype.toFormatted = function(number)
{
	return this.formatValue(number);
}

PTNumberUtil = function() {}

PTNumberUtil.VERSION = '246682';
PTNumberUtil.isInteger = function(sNumber)
{
	sNumber = PTNumberUtil.trimLeadingZeros(sNumber);	if (sNumber.length == 0)
	{
		return true;
	}
	var oString = new String(sNumber);
	var nString = new String(parseInt(new String(sNumber)));
	return (oString.valueOf() == nString.valueOf());
}

PTNumberUtil.isPositiveInteger = function(sNumber)
{	
	if (!PTNumberUtil.isInteger(sNumber)) { return false; }
	return (parseInt(sNumber) > 0);
}

PTNumberUtil.trimLeadingZeros = function(sNumber)
{
	sNumber = new String(sNumber);
	while (sNumber.charAt(0) == '0') { sNumber = sNumber.substr(1); }
	return sNumber;
}

PTStringBuffer = function(str) 
{
	this.i = 0;
	this.s = new Array();
	if (str && str.length && (str.length > 0))
	{
		this.s[this.i++] = str;
	}
	return this;
}

PTStringBuffer.VERSION = '246682';
PTStringBuffer.prototype.append = function(str)
{
	if (this.i >= 1000 && this.i%1000 == 0) 
	{
		var tmp = this.s.join('');
		this.s = new Array();
		this.s[0] = tmp;
		this.i = 1;
	}
	this.s[this.i++] = str;
}

PTStringBuffer.prototype.toString = function()
{
	return this.s.join('');
}

PTStringUtil = function() {}

PTStringUtil.VERSION = '246682';
PTStringUtil.isString = function(obj)
{
	if (obj == '')						{ return true; }
	else if (typeof obj == 'string')	{ return true; }
	else if (typeof obj == 'object')
	{
		if (obj.fixed && obj.link && obj.blink && obj.toUpperCase)	{ return true; }
		else														{ return false; }
	}
	else								{ return false; }
}

PTStringUtil.isValidHTTPString = function(str)
{
	var strHTTPPartA = str.substring(0,7);
	var strHTTPPartB = str.substring(0,8);
	if ((strHTTPPartA != 'http://') && (strHTTPPartB != 'https://')) { return false; }
	if (str.length < 8) { return false; }
	if (PTStringUtil.containsWhitespace(str)) { return false; }
	return true;
}

PTStringUtil.isValidUNCString = function(str, bCanBeNull)
{
	if (!str)						{ return false; }
	if (bCanBeNull && (str == ''))	{ return true; }
	if (str == '')					{ return false; }
	var strUNCPart = str.substring(0,2);
	if (strUNCPart != '\\\\' )	{ return false; }
	if (str.length < 3)			{ return false; }
	return true;
}

PTStringUtil.containsAngleBrackets = function(str)
{
	var angles = /[<>]/;
	return (angles.test(str));
}

PTStringUtil.containsWhitespace = function(str)
{
	var whitespaceChars = PTStringUtil.whitespaceChars;
	str = new String(str);
	for (var i = 0; i < str.length; i++) {
		var theChar = str.charAt(i);
		for (var j = 0; j < whitespaceChars.length; j++) {
			var white = whitespaceChars[j];
			if (theChar == white) {
				return true;
			}
		}
	}
	return false;
}

PTStringUtil.isAllWhitespace = function(str)
{
	var whitespaceChars = PTStringUtil.whitespaceChars;
	str = new String(str);
	STRING:
	for (var i = 0; i < str.length; i++) {
		var theChar = str.charAt(i);
		for (var j = 0; j < whitespaceChars.length; j++) {
			var white = whitespaceChars[j];
			if (theChar == white) {
				continue STRING;
			}
		}
		return false;
	}
	return true;
}

PTStringUtil.UCFirst = function(str) {
	var firstLetter = (new String(str)).substring(0,1);
	if (!firstLetter) { return str; }
	else {
		var restOfString = (new String(str)).substring(1);
		if (!restOfString) { restOfString = ''; }
		var ucFirst = firstLetter.toUpperCase() + restOfString;
		return ucFirst;
	}
}

PTStringUtil.stripChars = function(str,chars)
{  
	if (!chars || (chars.length < 1)) { return str; }
	str = new String(str);
	var newStr = new String();
	STRING:
	for (var i = 0; i < str.length; i++) {
		var theChar = str.charAt(i);
		for (var j = 0; j < chars.length; j++) {
			var strip = chars[j];
			if (theChar == strip) {
				continue STRING;
			}
		}
		newStr += theChar;
	}
	return newStr;
}

PTStringUtil.whitespaceChars = new Array(' ','\n','\r','\t','\u00A0');	
PTStringUtil.trimWhitespace = function(str,trimFront,trimRear)
{
	if (!str) { return str; }
	str = new String(str);
	var whitespaceChars = PTStringUtil.whitespaceChars;
	if (trimFront) {
		var doTrim = true;
		while (doTrim) {
			var foundWhite = false;
			for (var w = 0; w < whitespaceChars.length; w++) {
				var c = whitespaceChars[w];
				if (c == str.charAt(0)) {
					foundWhite = true;
					break;
				}
			}
			if (foundWhite) {
				str = str.substr(1);
			} else {
				doTrim = false;
			}
		}
	}
	if (trimRear) {
		var doTrim = true;
		while (doTrim) {
			var foundWhite = false;
			for (var w = 0; w < whitespaceChars.length; w++) {
				var c = whitespaceChars[w];
				if (c == str.charAt(str.length - 1)) {
					foundWhite = true;
					break;
				}
			}
			if (foundWhite) {
				str = str.substring(0, (str.length - 1));
			} else {
				doTrim = false;
			}
		}
	}
	return str;
}

PTStringUtil.escapeHTML = function(str,doLineBreakConversion,doWhitespaceConversion)
{
	str = new String(str);
	if (document.getElementById)
	{
		var nextChar = new RegExp('"','g');
		str = str.replace(nextChar, '&quot;');
		var nextChar = new RegExp('<','g');
		str = str.replace(nextChar, '&lt;');
		var nextChar = new RegExp('>','g');
		str = str.replace(nextChar, '&gt;');
		if (doLineBreakConversion)
		{
			var nextChar = new RegExp('\n','g');
			str = str.replace(nextChar, '<br>');
		}
		if (doWhitespaceConversion)
		{
			var nextChar = new RegExp('\\s','g');
			str = str.replace(nextChar, '&nbsp;');
		}
		var newStr = str;
	}
	else
	{
		var escapes = {
			'"' : '&quot;',
			'<' : '&lt;',
			'>' : '&gt;'
		}
		var newStr = new String();
		STRING:
		for (var i = 0; i < str.length; i++) {
			var theChar = str.charAt(i);
			for (var j in escapes) {
				var esc = escapes[j];
				if (theChar == j) {
					newStr += esc;
					continue STRING;
				}
			}
			newStr += theChar;
		}
	}
	return newStr;
}

PTStringUtil.unescapeHTML = function(str)
{
	str = new String(str);
	var escQuote = new RegExp('&quot;','gi');
	str = str.replace(escQuote,'"');
	var escLeftAngle = new RegExp('&lt;','gi');
	str = str.replace(escLeftAngle,'<');
	var escLeftAngle = new RegExp('&gt;','gi');
	str = str.replace(escLeftAngle,'>');
	return str;
}

PTStringUtil.removeHTML = function(str)
{
	str = new String(str);
	str = str.replace( new RegExp('&nbsp;','g') ,' ');
	while ((str.indexOf('<') > -1) && (str.indexOf('>') > str.indexOf('<')))
	{
		var start = str.indexOf('<');
		var end = str.indexOf('>');
		str = str.substr(0,start) + str.substring(end + 1,str.length);
	}
	return str;
}

PTStringUtil.getInnerText = function(elem)
{
	var str;
	if (PTBrowserInfo.IS_MSIE)	{ str = elem.innerText; }
	else						{ str = PTStringUtil.removeHTML(elem.innerHTML); }
	return str;
}

PTStringUtil.escapeJS = function(str)
{
	str = new String(str);
	if (document.getElementById)
	{
		var nextChar = new RegExp('\\\\','g');
		str = str.replace(nextChar, '\\\\');
		var nextChar = new RegExp('\n','g');
		str = str.replace(nextChar, '\\n');
		var nextChar = new RegExp('\'','g');
		str = str.replace(nextChar, '\\\'');
		var newStr = str;
	}
	else
	{
		var escapes = {
			'\n' : '\\n',
			'\'' : '\\\'',
			'\\' : '\\\\'
		}	
		var newStr = new String('');
		STRING:
		for (var i = 0; i < str.length; i++) {
			var theChar = str.charAt(i);
			for (var j in escapes) {
				var esc = escapes[j];
				if (theChar == j) {
					newStr += esc;
					continue STRING;
				}
			}
			newStr += theChar;
		}
	}
	return newStr;
}

PTStringUtil.encodeURL = function(str,URLEncodeSingleQuotes)
{
	if (str == null)
		return null;
	if (PTBrowserInfo.IS_NETSCAPE_DOM || PTBrowserInfo.IS_SAFARI || (PTBrowserInfo.IS_MSIE && PTBrowserInfo.MSIE_VERSION >= 5.5))
	{
		var encoded = encodeURIComponent(str);
		if (URLEncodeSingleQuotes)
		{
			encoded = encoded.replace(/\'/g,'%27');
		}
		return encoded;
	}
	var theString = new String(str);
	var encoded = new PTStringBuffer();
	for (var i = 0; i < theString.length; i++ ) 
	{
		var theChar = theString.charAt(i);
		var charCode = theChar.charCodeAt(0);		if(((charCode > 47)&&(charCode < 58))||
		   ((charCode > 64)&&(charCode < 91))||
		   ((charCode > 96)&&(charCode < 123)))
		{
			encoded.append(String.fromCharCode(charCode));
		}		else if ((charCode <= 47)||
				 ((charCode >= 58)&&(charCode <= 64))||
				 ((charCode >= 91)&&(charCode <= 96))||
				 ((charCode >= 123)&&(charCode <= 127)))
		{
			var hex = charCode.toString(16);
			var len = hex.length;
			switch(len){
				case 0:
					hex = '00';
					break;
				case 1:
					hex = '0'+hex;
				case 2:
					break;
				defalt:
					hex = hex.substring((len-2), len);
					break;
			}
			encoded.append('%'+hex);
		}		else if ((charCode>127) && (charCode<2048))
		{
			encoded.append('%' + ((charCode>>6)|192).toString(16).toUpperCase());
			encoded.append('%' + ((charCode&63)|128).toString(16).toUpperCase());
		}		else
		{
			var c1 = (charCode>>12)|224;
			var c2 = ((charCode>>6)&63)|128;
			var c3 = (charCode&63)|128;
			encoded.append('%' + ((charCode>>12)|224).toString(16).toUpperCase());
			encoded.append('%' + (((charCode>>6)&63)|128).toString(16).toUpperCase());
			encoded.append('%' + ((charCode&63)|128).toString(16).toUpperCase());
		}
	}
	var returnString = encoded.toString();
	if (URLEncodeSingleQuotes)
	{
		returnString = returnString.replace(/\'/g,'%27');
	}
	return returnString;
}

PTStringUtil.substituteChars = function(str,hash)
{
	str = new String(str);
	var newStr = new String();
	STRING:
	for (var i = 0; i < str.length; i++) {
		var theChar = str.charAt(i);
		for (var h in hash) {
			var subs = hash[h];
			if (theChar == h) {
				newStr += subs;
				continue STRING;
			}
		}
		newStr += theChar;
	}
	return newStr;
}

PTStringUtil.lineBreakToBR = function(str)
{
	str = new String(str);
	var br = /\n/g;
	str = str.replace(br,'<br>');
	return str;
}

PTWindowUtil = function()
{
	return this;
}

PTWindowUtil.VERSION = '246682';
PTWindowUtil.defaultWidth = 650;
PTWindowUtil.defaultHeight = 450;
PTWindowUtil.helpWindowName = 'PTRoboHelp';
PTWindowUtil.openWindow = function(URL,name,height,width,isFullChrome)
{
	var isNN4 = (document.layers);
	if (!name) { name = 'PTWindow' + (new Date()).getTime(); }
	var winWidth = (width) ? width : PTWindowUtil.defaultWidth;
	var winHeight = (height) ? height : PTWindowUtil.defaultHeight;
	var scrWidth = (isNN4) ? screen.width : screen.availWidth;
	var scrHeight = (isNN4) ? screen.height : screen.availHeight;
	var leftPosVal = parseInt(scrWidth/2) - parseInt(winWidth/2);
	var topPosVal = parseInt(scrHeight/2) - parseInt(winHeight/2);
	var leftPos = (isNN4) ? 'screenX=' + leftPosVal : 'left=' + leftPosVal;
	var topPos = (isNN4) ? 'screenY=' + topPosVal : 'top=' + topPosVal;
	var winProps = 'width=' + winWidth + ',height=' + winHeight + ',' + leftPos + ',' + topPos + ',resizable=1';
	if (PTNumberUtil.isInteger(isFullChrome))
	{
		if (isFullChrome == 1) { winProps += ',scrollbars=1,status=0,toolbar=0,menubar=0,location=0'; }
	}
	else if (isFullChrome == true)
	{
		winProps += ',scrollbars=1,status=1,toolbar=1,menubar=1,location=1';
	}
	else
	{
		winProps += ',scrollbars=0,status=0,toolbar=0,menubar=0,location=0';
	}
	var winOpenedWindow = window.open(URL,name,winProps);
	winOpenedWindow.focus();
	return winOpenedWindow;
}

PTWindowUtil.openHelpWindow = function(URL,height,width,isFullChrome)
{
	return PTWindowUtil.openWindow(URL,PTWindowUtil.helpWindowName,height,width,isFullChrome);
}

function OpenSizedWindow(URL,name,height,width,isFullChrome)
{
	return PTWindowUtil.openWindow(URL,name,height,width,isFullChrome);
}

