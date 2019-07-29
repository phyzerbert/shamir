

PTCommonOpener.OPENER_SPACENAME = 'Opener';
PTCommonOpener.OPENER_MODE_CREATE 		= 0;
PTCommonOpener.OPENER_MODE_EDIT 		= 1;
PTCommonOpener.OPENER_MODE_VIEW 		= 2;
PTCommonOpener.OPENER_MODE_VIEW_META_DATA 	= 3;
PTCommonOpener.OPENER_MODE_SEARCH_BROWSE 	= 4;
PTCommonOpener.OPENER_MODE_SEARCH_EDIT 		= 5;
	

PTCommonOpener.QS_UUID 			= 'uuID';
PTCommonOpener.QS_OPEN 			= 'open';
PTCommonOpener.QS_CLASSID 		= 'clsID';
PTCommonOpener.QS_OBJECTID 		= 'objID';
PTCommonOpener.QS_MODE 			= 'mode';
PTCommonOpener.QS_USERID 		= 'userID';
PTCommonOpener.QS_FOLDERID 		= 'folderID';
PTCommonOpener.QS_PROV_ENG_NAME		= 'provEngName';
PTCommonOpener.QS_OPEN_UICLASSTYPEDESC_CLASSNAME = "space";
PTCommonOpener.QS_ACTIVITY_SPACE_NAME = "asName";
PTCommonOpener.QS_SPACENAME		= 'space';
PTCommonOpener.QS_PARENTSPACENAME	= 'parentname';
PTCommonOpener.QS_PARENTSPACEID		= 'parentid';
PTCommonOpener.QS_CACHED		= 'cached';
PTCommonOpener.QS_XUI_DATASOURCE_ID = 'dataSourceID';
PTCommonOpener.QS_XUI_WEBSERVICE_ID = 'webServiceID';
PTCommonOpener.JS_METHOD_GET_APPLICATION_BASE_URL	= 'OpenerAS_GetApplicationBaseURL';
PTCommonOpener.JS_METHOD_GET_CURRENT_USER_ID 		= 'OpenerAS_GetCurrentUserID';	
PTCommonOpener.JS_METHOD_GET_PARENTSPACE_NAME 		= 'OpenerAS_GetParentSpaceName';	
PTCommonOpener.JS_METHOD_GET_PARENTSPACE_ID 		= 'OpenerAS_GetParentSpaceID';	

if ( getJSUtilVersionObject() && eval(getJSUtilVersionObject()) )
{
	PTCommonOpener.JSUTIL_VERSIONOBJ = eval(getJSUtilVersionObject());		
} else {
	alert("Cannot find valid JSUtil version object. Define a getJSUtilVersionObject function to return the name of the strongly versioned JSUtil object.")		
}
PTCommonOpener.DOM_SHOW		= 'r_show_';
PTCommonOpener.DOM_SPAN		= 'r_span_';
PTCommonOpener.DOM_EDIT		= 'r_edit_';
PTCommonOpener.DOM_STATUS	= 'ali-status';

function PTCommonOpener()
{
	return this;
}

PTCommonOpener.getOpenerURLCreate = function(_nClassID, _nFolderID, _strParentSpaceName, _strParentSpaceID, 
	_strApplicationBaseURL, _nUserID)
{
	var strQSArgs = "";
	strQSArgs = strQSArgs + PTCommonOpener.getFirstQSArg(PTCommonOpener.QS_OPEN, _nClassID);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_FOLDERID, _nFolderID);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_PARENTSPACENAME, _strParentSpaceName);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_PARENTSPACEID, _strParentSpaceID);
	
	return PTCommonOpener.getOpenerURL(strQSArgs, PTCommonOpener.OPENER_MODE_CREATE, _strApplicationBaseURL, _nUserID);
}
PTCommonOpener.getOpenerURLCreateExt = function(_nClassID, _nFolderID, _strProvEnglishName, _nDataSourceID, 
	_nWebServiceID, _strParentSpaceName, _strParentSpaceID, _strApplicationBaseURL, _nUserID)
{
	var strQSArgs = "";
	strQSArgs = strQSArgs + PTCommonOpener.getFirstQSArg(PTCommonOpener.QS_OPEN, _nClassID);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_FOLDERID, _nFolderID);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_PROV_ENG_NAME, _strProvEnglishName);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_XUI_DATASOURCE_ID, _nDataSourceID);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_XUI_WEBSERVICE_ID, _nWebServiceID);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_PARENTSPACENAME, _strParentSpaceName);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_PARENTSPACEID, _strParentSpaceID);
	
	return PTCommonOpener.getOpenerURL(strQSArgs, PTCommonOpener.OPENER_MODE_CREATE, _strApplicationBaseURL, _nUserID);
}

PTCommonOpener.getOpenerURLOpenAS = function(_strASName, _strOptQSArgs, _nOpenerMode, 
	_strParentSpaceName, _strParentSpaceID, _strApplicationBaseURL, _nUserID)
{
	var strQSArgs = "";
	strQSArgs = strQSArgs + PTCommonOpener.getFirstQSArg(PTCommonOpener.QS_OPEN, PTCommonOpener.QS_OPEN_UICLASSTYPEDESC_CLASSNAME);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_ACTIVITY_SPACE_NAME, _strASName);

	if ((null != _strOptQSArgs) && ('null' != _strOptQSArgs))
	{
		strQSArgs = strQSArgs + _strOptQSArgs;
	}

	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_PARENTSPACENAME, _strParentSpaceName);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_PARENTSPACEID, _strParentSpaceID);
	
	return PTCommonOpener.getOpenerURL(strQSArgs, _nOpenerMode, _strApplicationBaseURL, _nUserID);
}
PTCommonOpener.getOpenerURLOpenUUID = function(_strUUID, _strOptQSArgs, _strParentSpaceName, 
	_strParentSpaceID, _strApplicationBaseURL, _nUserID)
{
	var strQSArgs = "";
	strQSArgs = strQSArgs + PTCommonOpener.getFirstQSArg(PTCommonOpener.QS_UUID, _strUUID);

	if ((null != _strOptQSArgs) && ('null' != _strOptQSArgs))
	{
		strQSArgs = strQSArgs + _strOptQSArgs;
	}

	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_PARENTSPACENAME, _strParentSpaceName);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_PARENTSPACEID, _strParentSpaceID);
	
	return PTCommonOpener.getOpenerURL(strQSArgs, _nOpenerMode, _strApplicationBaseURL, _nUserID);
}

PTCommonOpener.getOpenerURLOpenObjID = function(_nClassID, _nObjectID, _strOptQSArgs, _nOpenerMode, _strParentSpaceName, 
	_strParentSpaceID, _strApplicationBaseURL, _nUserID)
{
	var strQSArgs = "";
	strQSArgs = strQSArgs + PTCommonOpener.getFirstQSArg(PTCommonOpener.QS_OPEN, _nClassID);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_OBJECTID, _nObjectID);
	
	if ((null != _strOptQSArgs) && ('null' != _strOptQSArgs))
	{
		strQSArgs = strQSArgs + _strOptQSArgs;
	}
	
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_PARENTSPACENAME, _strParentSpaceName);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_PARENTSPACEID, _strParentSpaceID);
	
	return PTCommonOpener.getOpenerURL(strQSArgs, _nOpenerMode, _strApplicationBaseURL, _nUserID);
}
PTCommonOpener.getOpenerURL = function(_strQSArgs, _nOpenerMode, _strApplicationBaseURL, _nUserID)
{
	var strURL = _strApplicationBaseURL;

	if ((null != _strQSArgs) && ('null' != _strQSArgs))
	{
		// this should not be null.
		strURL = strURL + _strQSArgs;
	}
	
	// Always try to get a cached Opener space
	strURL = strURL + PTCommonOpener.getQSArg(PTCommonOpener.QS_CACHED, 'true');

	strURL = strURL + PTCommonOpener.getQSArg(PTCommonOpener.QS_MODE, _nOpenerMode);
	strURL = strURL + PTCommonOpener.getQSArg(PTCommonOpener.QS_USERID, _nUserID);

	return strURL;
}

PTCommonOpener.getOpenerURLCreate = function(_nClassID, _nFolderID)
{
	var strQSArgs = "";
	strQSArgs = strQSArgs + PTCommonOpener.getFirstQSArg(PTCommonOpener.QS_OPEN, _nClassID);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_FOLDERID, _nFolderID);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_PARENTSPACENAME, eval(PTCommonOpener.JS_METHOD_GET_PARENTSPACE_NAME + '()'));
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_PARENTSPACEID, eval(PTCommonOpener.JS_METHOD_GET_PARENTSPACE_ID + '()'));

	return PTCommonOpener.getOpenerURL(strQSArgs, PTCommonOpener.OPENER_MODE_CREATE);
}

PTCommonOpener.getOpenerURLCreateExt = function(_nClassID, _nFolderID, _strProvEnglishName, _nDataSourceID, 
	_nWebServiceID)
{
	var strQSArgs = "";
	strQSArgs = strQSArgs + PTCommonOpener.getFirstQSArg(PTCommonOpener.QS_OPEN, _nClassID);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_FOLDERID, _nFolderID);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_PROV_ENG_NAME, _strProvEnglishName);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_XUI_DATASOURCE_ID, _nDataSourceID);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_XUI_WEBSERVICE_ID, _nWebServiceID);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_PARENTSPACENAME, eval(PTCommonOpener.JS_METHOD_GET_PARENTSPACE_NAME + '()'));
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_PARENTSPACEID, eval(PTCommonOpener.JS_METHOD_GET_PARENTSPACE_ID + '()'));
	
	return PTCommonOpener.getOpenerURL(strQSArgs, PTCommonOpener.OPENER_MODE_CREATE);
}
PTCommonOpener.getOpenerURLOpenAS = function(_strASName, _strOptQSArgs, _nOpenerMode)
{
	var strQSArgs = "";
	strQSArgs = strQSArgs + PTCommonOpener.getFirstQSArg(PTCommonOpener.QS_OPEN, PTCommonOpener.QS_OPEN_UICLASSTYPEDESC_CLASSNAME);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_ACTIVITY_SPACE_NAME, _strASName);

	if ((null != _strOptQSArgs) && ('null' != _strOptQSArgs))
	{
		strQSArgs = strQSArgs + _strOptQSArgs;
	}

	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_PARENTSPACENAME, eval(PTCommonOpener.JS_METHOD_GET_PARENTSPACE_NAME + '()'));
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_PARENTSPACEID, eval(PTCommonOpener.JS_METHOD_GET_PARENTSPACE_ID + '()'));
	
	return PTCommonOpener.getOpenerURL(strQSArgs, _nOpenerMode, _strApplicationBaseURL, _nUserID);
}
PTCommonOpener.getOpenerURLOpenUUID = function(_strUUID, _strOptQSArgs, _nOpenerMode)
{
	var strQSArgs = "";
	strQSArgs = strQSArgs + PTCommonOpener.getFirstQSArg(PTCommonOpener.QS_UUID, _strUUID);

	if ((null != _strOptQSArgs) && ('null' != _strOptQSArgs))
	{
		strQSArgs = strQSArgs + _strOptQSArgs;
	}

	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_PARENTSPACENAME, eval(PTCommonOpener.JS_METHOD_GET_PARENTSPACE_NAME + '()'));
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_PARENTSPACEID, eval(PTCommonOpener.JS_METHOD_GET_PARENTSPACE_ID + '()'));
	
	return PTCommonOpener.getOpenerURL(strQSArgs, _nOpenerMode, _strApplicationBaseURL, _nUserID);
}
PTCommonOpener.getOpenerURLOpenObjID = function(_nClassID, _nObjectID, _strOptQSArgs, _nOpenerMode)
{
	var strQSArgs = "";
	strQSArgs = strQSArgs + PTCommonOpener.getFirstQSArg(PTCommonOpener.QS_OPEN, _nClassID);
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_OBJECTID, _nObjectID);

	if ((null != _strOptQSArgs) && ('null' != _strOptQSArgs))
	{
		strQSArgs = strQSArgs + _strOptQSArgs;
	}
	
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_PARENTSPACENAME, eval(PTCommonOpener.JS_METHOD_GET_PARENTSPACE_NAME + '()'));
	strQSArgs = strQSArgs + PTCommonOpener.getQSArg(PTCommonOpener.QS_PARENTSPACEID, eval(PTCommonOpener.JS_METHOD_GET_PARENTSPACE_ID + '()'));
	
	return PTCommonOpener.getOpenerURL(strQSArgs, _nOpenerMode);
}

PTCommonOpener.getOpenerURL = function(_strQSArgs, _nOpenerMode)
{
	var strURL = eval(PTCommonOpener.JS_METHOD_GET_APPLICATION_BASE_URL + '()');

	if ((null != _strQSArgs) && ('null' != _strQSArgs))
	{
		// this should not be null.
		strURL = strURL + _strQSArgs;
	}
	
	// Always try to get a cached Opener space
	strURL = strURL + PTCommonOpener.getQSArg(PTCommonOpener.QS_CACHED, 'true');

	strURL = strURL + PTCommonOpener.getQSArg(PTCommonOpener.QS_MODE, _nOpenerMode);
	strURL = strURL + PTCommonOpener.getQSArg(PTCommonOpener.QS_USERID, eval(PTCommonOpener.JS_METHOD_GET_CURRENT_USER_ID + '()'));
	
	return strURL;
}
PTCommonOpener.openInSameWindow = function(_strURL)
{
	window.location = _strURL;		
}
PTCommonOpener.openInNewWindow = function(_strURL, _strWindowName, _strWidth, _strHeight, _bIsFancyWindow)
{
	return PTCommonOpener.JSUTIL_VERSIONOBJ.PTWindowUtil.openWindow(_strURL, _strWindowName, _strHeight, _strWidth, _bIsFancyWindow);
}

PTCommonOpener.getQSArg = function(_strArgName, _strArgValue)
{
	if ((null == _strArgName) || (null == _strArgValue) || ('null' == _strArgValue) || ('' == _strArgValue))
	{
		return "";
	}
	else
	{
		return '&' + _strArgName + '=' + _strArgValue;
	}
}

PTCommonOpener.getFirstQSArg = function(_strArgName, _strArgValue)
{
	if ((null == _strArgName) || (null == _strArgValue) || ('null' == _strArgValue) || ('' == _strArgValue))
	{
		return "";
	}
	else
	{
		return _strArgName + '=' + _strArgValue;
	}
}

// OBJECT RENAME FUNCTIONS

PTCommonOpener.removeHTMLComments = function(html) {
//	due to a bug in the comment removal subsystem, the following line to remove HTML comments is broken.
//	as a temporary fix, this function returns all text up to the first comment in the returned result
//	return html.replace(/<!(?:--[\s\S
	if (html.indexOf('<!--') != -1)
		return html.substring(0,html.indexOf('<!--'));
	else
		return html;
}
PTCommonOpener.showDisplayField = function(classid, objectid)
{
	var el;
	el = document.getElementById(PTCommonOpener.DOM_SHOW + classid + "_" + objectid); 
	if (el != null)
		el.style.display='inline';
	
	el = document.getElementById(PTCommonOpener.DOM_EDIT + classid + "_" + objectid);
	if (el != null)
		el.style.display='none';
}
PTCommonOpener.showRenameField = function(classid, objectid)
{
	var el;
	el = document.getElementById(PTCommonOpener.DOM_SHOW + classid + "_" + objectid); 
	if (el != null)
		el.style.display='none';
	
	el = document.getElementById(PTCommonOpener.DOM_EDIT + classid + "_" + objectid);
	if (el != null)
		el.style.display='inline';
}

PTCommonOpener.handleRenameResponse = function(resp) 
{
	try
	{
		var res = PTCommonOpener.removeHTMLComments(resp.responseText);
		res = eval('(' + res +')');

		PTCommonOpener.showDisplayField(res.classid, res.objectid);
		if (res.status=='1')
		{
			// instead of showing a status message, refresh the page to update 
			// page names that exist in other location on the page
			if (res.refreshURL) {
		        window.location = res.refreshURL;
		    } else {
		        window.location.reload(true);
		    }
		}
		else
		{
			PTCommonOpener.showStatus(res.message, true);
		}
	}
	catch (ex)
	{
		PTCommonOpener.showStatus("Error performing action", true);
	}
}	

PTCommonOpener.renamePTObject = function(_nClassID, _nObjectID, _strOldName, _strNewName)
{
	// dynamically create form
	var dynamic_form = document.createElement("form");
	var in_space = document.createElement("input");
	var in_control = document.createElement("input");
	var in_action = document.createElement("input");
	var in_cid = document.createElement("input");
	var in_oid = document.createElement("input");
	var in_newname = document.createElement("input");
	dynamic_form.appendChild(in_space);
	dynamic_form.appendChild(in_control);
	dynamic_form.appendChild(in_action);
	dynamic_form.appendChild(in_cid);
	dynamic_form.appendChild(in_oid);
	dynamic_form.appendChild(in_newname);
	dynamic_form.action = eval(PTCommonOpener.JS_METHOD_GET_APPLICATION_BASE_URL + '()');

	// set input names
	in_space.name = "in_hi_space";
	in_control.name = "in_hi_control";
	in_action.name = "action";
	in_cid.name = "cid";
	in_oid.name = "oid";
	in_newname.name = "name";

	// set input values
	in_space.value = "Ajax";
	in_control.value = "AjaxControl";
	in_action.value = "rename";
	in_cid.value = _nClassID;
	in_oid.value =  _nObjectID;
	in_newname.value = _strNewName;

	// invoke the request and pass a response handling function
	var request = new PTHTTPPOSTRequest(dynamic_form.action, dynamic_form, PTCommonOpener.handleRenameResponse);
	request.invoke();
}

PTCommonOpener.hideStatus = function()
{
	var status = document.getElementById(PTCommonOpener.DOM_STATUS);
	if (status == null)
		return;

	status.innerHTML = "";
	status.style.display='none';
}
PTCommonOpener.showStatus = function(message, isError)
{
	var status = document.getElementById(PTCommonOpener.DOM_STATUS);
	if (status==null)
		return;

	status.innerHTML = "<table width=100%><tr><td>" + message + "</td></tr></table>";
	status.style.font="12px verdana,arial,helvetica,'sans-serif'";
	status.style.padding="10px 10px 10px 10px";
	if (isError)
	{
		status.style.backgroundColor = "#FFFFCC";
		status.style.color = "#FF0000"; 
	}
	else
	{
		status.style.backgroundColor = "#CCFFCC";
		status.style.color = "#000000"; 
	}
	status.style.display='inline';
}
