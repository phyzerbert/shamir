// JScript source code

//This function sets the cookie on a browser. 
function Set_Cookie( name, value, expires, path, domain, secure ) 
			{
				// set time, it's in milliseconds
				var today = new Date();
				today.setTime( today.getTime() );

				if ( expires )
				{
					expires = expires * 1000 * 60 * 60 * 24;
				}
				var expires_date = new Date( today.getTime() + (expires) );

				document.cookie = name + "=" + value  +
				( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + 
				( ( path ) ? ";path=" + path : "" ) + 
				( ( domain ) ? ";domain=" + domain : "" ) +
				( ( secure ) ? ";secure" : "" );
			}
			
// this function gets the cookie, if it exists on the browser.
function Get_Cookie( name ) {
	
	var start = document.cookie.indexOf( name + "=" );
	var len = start + name.length + 1;
	if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) )
	{
		return null;
	}
	if ( start == -1 ) return null;
	var end = document.cookie.indexOf( ";", len );
	if ( end == -1 ) end = document.cookie.length;
	return unescape( document.cookie.substring( len, end ) );
}
