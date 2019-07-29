/**
 * JSUtil package
 * @fileoverview Contains cross-browser utility functions that are common to most JSComponents and are useful in custom scripts.
 */ 
if (!jsutil)
{	
	var jsutil = {};
	jsutil.basePath = PTIncluder.imageServerURL + PTIncluder.basePath + 'jsutil/LATEST/';
	PTIncluder.loadStrings(jsutil.basePath + 'Strings/PTU-Date-${LANG}.js');
	PTIncluder.loadStrings(jsutil.basePath + 'Strings/PTU-Number-${LANG}.js');
	PTIncluder.loadJS(jsutil.basePath + 'PTUtil.js');
	PTIncluder.loadJS(jsutil.basePath + 'PTDateFormats.js');

	// Uncomment the following line
	// if you wish to use custom
	// language extension files.
	//PTIncluder.loadJS(jsutil.basePath + 'PTDateFormats-${LANG}.js');
}
/**
 * JSXML package
 * @fileoverview Contains cross-browser methods for invoking AJAX 
 * (Asynchronous JavaScript And XML) operations on the client, including "in-place-refresh" GET
 * and POST requests, as well as object instantiation from XML.
 */ 
if (!jsxml)
{
	var jsxml = {};
	jsxml.basePath = PTIncluder.imageServerURL + PTIncluder.basePath + 'jsxml/LATEST/';
	PTIncluder.loadJS(jsxml.basePath + 'PTXML.js');
}
/**
 * JSPortlet package
 * @fileoverview Provides portal services such as inter-portlet communiciation through PCC events, support for 
 * session preferences, and a client-side API providing access to portlet, page, and community attributes and built-in functions
 * for in-place-refresh of portlet content.
 */ 
if (!jsportlet)
{
	var jsportlet = {};
	jsportlet.basePath = PTIncluder.imageServerURL + PTIncluder.basePath + 'jsportlet/LATEST/';
	PTIncluder.loadJS(jsportlet.basePath + 'PTPortletServices.js');
}