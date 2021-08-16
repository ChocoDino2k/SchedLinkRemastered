<?php

if (isset($_POST["variable"])){
  $filename =  $_POST['file'];
  // $backupfile = '../js-data/backup/Schedule.json';
$jsondata = $_POST["variable"];


if (is_writable($filename)) {
    if (!$handle = fopen($filename, 'w')) {
         exit;
    }
    if (fwrite($handle, $jsondata) === FALSE) {
        exit;
    }

    fclose($handle);
  }else{
    echo "hello";
    return;
  }

echo "hello";
  // if (is_writable($backupfile)) {
  //     if (!$handle = fopen($backupfile, 'w')) {
  //          exit;
  //     }
  //     if (fwrite($handle, $jsondata) === FALSE) {
  //         exit;
  //     }
  //
  //     fclose($handle);
  //
  // }
}else{
  echo "failed";
}

?>
