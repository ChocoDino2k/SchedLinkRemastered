<?php
if (isset($_GET['returnURL']) && $_GET['returnURL'][0] == '/') {
    $returnURL = $_GET['returnURL'];
} else {
    $returnURL = '/fishers/';
}

if (!(count($_COOKIE) > 0)) {
    // cookies are disabled
    if (parse_url($returnURL, PHP_URL_QUERY)) {
        $returnURL .= '&nocookies';
    } else {
        $returnURL .= '?nocookies';
    }
}
header("location: $returnURL");
?>