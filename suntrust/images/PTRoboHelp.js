
function PTRoboHelp()
{
	return this;
}

PTRoboHelp.helpWindow = false;
PTRoboHelp.baseURL = '';
PTRoboHelp.launchHelp = function(topic,baseURL,width,height)
{
	if (!baseURL) { baseURL = PTRoboHelp.baseURL; }
	var isIE = (document.all);
	var isSafari = ((new String(navigator.userAgent)).indexOf('Safari') > -1);
	var isNS4 = ((!document.all) && (!document.getElementById));
	var scrWidth = (isIE) ? screen.availWidth : 800;
	var scrHeight = (isIE) ? screen.availHeight : 600;
	var isResizable = 1;
	var winWidth = (width) ? width : 650;
	var winHeight = (height) ? height : 450;
	var leftPosVal = parseInt(scrWidth/2) - parseInt(winWidth/2);
	var topPosVal = parseInt(scrHeight/2) - parseInt(winHeight/2);
	var leftPos = 'left=' + leftPosVal;
	var topPos = 'top=' + topPosVal;
	var winProps = 'width=' + winWidth + ',height=' + winHeight + ',' + leftPos + ',' + topPos + ',resizable=' + isResizable + ',scrollbars=0,location=0,menubar=0,toolbar=0,status=0';
	var url = baseURL;
	if (topic) { url += '#' + topic; }
	var html = '<html>\n<head>\n<scr' + 'ipt language="javascript">\nfunction loadme() { top.document.location.href=\'' + url + '\' }\n</scr' + 'ipt>\n</head>\n<body onload="loadme()">\n</body>\n</html>\n';
	if (isSafari)
	{
		PTRoboHelp.helpWindow = window.open(url,'PT_WebHelp',winProps);
	}
	else
	{
		PTRoboHelp.helpWindow = window.open('about:blank','',winProps);
		PTRoboHelp.helpWindow.document.open();
		PTRoboHelp.helpWindow.document.write(html);
		PTRoboHelp.helpWindow.document.close();
	}
	if (isSafari)
	{
		if ((url != PTRoboHelp.helpWindow.document.location.href) && (PTRoboHelp.helpWindow.document.location.href != '/'))
		{
			window.setTimeout('PTRoboHelp.helpWindow = window.open(\'' + url + '\',\'PT_WebHelp\',\'' + winProps + '\');',50);
		}
	}
	PTRoboHelp.helpWindow.focus();
}