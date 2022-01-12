<?php
$currentTheme = "default";
$unlocks = ["default", "emerald", "aqua"];
$themeProgress = array();
$cookiesEnabled = TRUE;
$hasAccount = FALSE;

$currentDateISO = date_format(date_create(NULL, timezone_open("America/New_York")), "Y-m-d");
$points = 10;
$streak = 1;
$lastDate = "0000-00-00";

$conn;
$id;
if(!isset($_COOKIE["checkActive"])) {
  setcookie("checkActive", "true", time() + 3600, "/"); //set cookie to check if cookies are enabled
}

if(count($_COOKIE) > 0) {
  $conn = mysqli_connect('localhost', 'schedasr_admin', 'bananaman10?', 'schedasr_userbase');
  if($conn -> connect_error) {
    header("HTTP/1.1 500 Internal Server Error");
    exit;
  }

  if (isset($_COOKIE["IDString"])) {
    $id = $_COOKIE["IDString"];
    $result = $conn -> query("SELECT * FROM userset WHERE ID = '$id'");
    if($result -> num_rows > 0) {
      $hasAccount = TRUE;

      $row = $result -> fetch_assoc();
      $currentTheme = $row["activeTheme"];
      $unlocks = json_decode($row["unlockedThemes"]);
      $themeProgress = json_decode($row["themeProgress"], true);
      $points = (int)$row["points"];
      $streak = (int)$row["streak"];
      $lastDate = $row["lastDate"];

    }
  }

} else {
  $cookiesEnabled = FALSE;
}

//connnection still open at this point
?>
