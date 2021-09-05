<?php
if (isset($_POST["variable"])){
  $filename =  "../" . $_POST['filen'];
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
    return;
  }

echo "success";
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
  echo "not set";
}

?>
