
PTIncluder = function() {}

PTIncluder.VERSION 			= '246682';
PTIncluder.INCLUDES_FILE	= 'component.js';
PTIncluder.PT_DEBUG_COOKIE	= 'PT_DEBUG';
PTIncluder.supportedLocales = {};
PTIncluder.supportedLocales['zh'] = {};
PTIncluder.supportedLocales['zh']['CN'] = true;
PTIncluder.supportedLocales['zh']['HK'] = true;
PTIncluder.supportedLocales['zh']['MO'] = true;
PTIncluder.supportedLocales['zh']['SG'] = true;
PTIncluder.supportedLocales['zh']['TW'] = true;
PTIncluder.loadComponent = function(jscomponent) 
{
	if (!window[jscomponent])
	{
		var includesFilePath = PTIncluder.imageServerURL + PTIncluder.basePath + jscomponent + '/LATEST/' + PTIncluder.INCLUDES_FILE;
		document.write('<script type="text/javascript" src="' + includesFilePath + '"></scr' + 'ipt>');
	}
}

PTIncluder.loadJS = function(jsfile)
{
	var isDebug = (PTIncluder.debug || PTIncluder.getPTDebugCookie());
	if (isDebug)
	{
		jsfile = jsfile.replace(/\.js/, '-debug.js');
		var debugLevel = (PTIncluder.getPTDebugCookie()) ? PTIncluder.getPTDebugCookie() : '1';		document.write('<script type="text/javascript">\n');
		document.write('PT_DEBUG = ' + debugLevel + '\n');
		document.write('</scr' + 'ipt>');
	}
	document.write('<script type="text/javascript" src="' + jsfile + '"></scr' + 'ipt>');
}

PTIncluder.loadStrings = function(jsfile)
{
	var langFull = PTIncluder.lang;
	if (PTIncluder.supportedLocales[PTIncluder.lang] && PTIncluder.supportedLocales[PTIncluder.country])
	{
		langFull = PTIncluder.lang + '_' + PTIncluder.country;
	}
	jsfile = jsfile.replace(/\$\{LANG\}/, langFull);
	document.write('<script type="text/javascript" src="' + jsfile + '"></scr' + 'ipt>');
}

PTIncluder.loadCSS = function(cssfile)
{
	var linkElm = document.createElement('link');
	linkElm.rel = 'stylesheet';
	linkElm.type = 'text/css';
	linkElm.href = cssfile;
	var heads = document.getElementsByTagName('head');
	if(heads.length > 0) 
	{
		heads[0].appendChild(linkElm);
	}
}

PTIncluder.setPTDebugCookie = function(debugLevel)
{
	document.cookie = PTIncluder.PT_DEBUG_COOKIE + "=" + debugLevel + ';path=/';
	return;
}

PTIncluder.getPTDebugCookie = function()
{
	var cname = PTIncluder.PT_DEBUG_COOKIE + '=';
	if (document.cookie.length > 0) 
	{
		begin = document.cookie.indexOf(cname);
		if (begin != -1) 
		{
			begin += cname.length;
			end = document.cookie.indexOf(";", begin);
			if (end == -1) {end = document.cookie.length;}
			return document.cookie.substring(begin,end);
		}
	} 
	else 
	{
		return false;
	}
}

PTIncluder.checkKeyPress = function(e)
{
	var code;
	if (!e) var e = window.event;
	if (e.keyCode) code = e.keyCode;
	else if (e.which) code = e.which;
	var character = String.fromCharCode(code);
	if ((character == '0' || character == '1' || character == '2' || character == '3') &&
		 e.ctrlKey && e.shiftKey)
	{
		alert('Setting PT_DEBUG = ' + character);
		PTIncluder.setPTDebugCookie(character);
		window.location.reload();
	}
}

PTIncluder.listenForKeyPress = function()
{
	if (document.attachEvent) 
	{
		document.attachEvent('onkeydown', PTIncluder.checkKeyPress);
	}
	else if (document.addEventListener) 
	{
		document.addEventListener('keydown', PTIncluder.checkKeyPress, false);
	}
}

PTIncluder.listenForKeyPressIsRegistered = false;
if (document.PCC && !PTIncluder.listenForKeyPressIsRegistered)
{
	PCC.RegisterForWindowEvent('onload', PTIncluder.listenForKeyPress);
}

else if (!PTIncluder.listenForKeyPressIsRegistered)
{
	document.onload = PTIncluder.listenForKeyPress;
}

