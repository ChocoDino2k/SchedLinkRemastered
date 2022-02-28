<?php
function shutDownFunction() { 
    $error = error_get_last();
    if ($error) {
        ob_clean();
        include $_SERVER['DOCUMENT_ROOT'] . '/500-home.html';
        exit;
    } 
}
register_shutdown_function('shutDownFunction');
include 'index.php';
?>