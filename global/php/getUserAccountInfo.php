<?php
$currentTheme = "default";
$unlocks = ["default", "emerald", "aqua"];
$themeProgress = array();
$cookiesEnabled;
$hasAccount = FALSE;

$currentDateISO = date_format(date_create(NULL, timezone_open("America/New_York")), "Y-m-d");
$points = 50;
$streak = 1;
$lastDate = "0000-00-00";

$conn;
$id;

// check if cookies are enabled
if (count($_COOKIE) > 0) {
  // cookies are enabled
  $cookiesEnabled = TRUE;
} else if (isset($_GET['nocookies']) && time() - 3600 < $_GET['nocookies'] && $_GET['nocookies'] < time() + 5) {
  // a previous test in the last 3600 seconds (1 hour) concluded cookies are disabled
  $cookiesEnabled = FALSE;
} else {
  // test if cookies are enabled
  setcookie("cookietest", true, time() + 3600, "/");
  if (isset($_GET['nocookies'])) {
    unset($_GET['nocookies']);
  }
  $returnURLquery = http_build_query($_GET);
  if (strlen($returnURLquery) > 0) {
    $returnURLquery = '?' . $returnURLquery;
  }
  if ($_SERVER["SCRIPT_NAME"] == "/fishers/loadHomeWithErrorHandler.php") {
    header("location: /global/php/cookietest.php?returnURL=/fishers/$returnURLquery");
  } else {
    header("location: /global/php/cookietest.php?returnURL=$_SERVER[SCRIPT_URL]$returnURLquery");
  }
  exit;
}

//removed bc log-in information
$conn = mysqli_connect('', '', '', '');
if($conn -> connect_error) {
  http_response_code(500);
  exit;
}

if($cookiesEnabled) {
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
}

//connnection still open at this point
?>
