<?php
if (isset($_GET['returnURL']) && $_GET['returnURL'][0] == '/') {
    $returnURL = $_GET['returnURL'];
} else {
    $returnURL = '/fishers/';
}

if (!(count($_COOKIE) > 0)) {
    // cookies are disabled
    $returnURL .= parse_url($returnURL, PHP_URL_QUERY) ? '&' : '?';
    $returnURL .= 'nocookies=';
    $returnURL .= time();
}
header("location: $returnURL");
?>