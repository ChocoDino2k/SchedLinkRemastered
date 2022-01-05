<?php
$currentTheme = "default";
$unlocks = ["default"];
$themeProgress = array();
$cookiesEnabled = TRUE;
$hasAccount = FALSE;
if(!isset($_COOKIE["checkActive"])) {
  setcookie("checkActive", "true", time() + 3600, "/"); //set cookie to check if cookies are enabled
}

if(count($_COOKIE) > 0) {
  $conn = mysqli_connect('localhost', 'schedasr_admin', 'bananaman10?', 'schedasr_userbase');
  if($conn -> connect_error) {
    alert("something went wrong try again later");
    exit;
  }

  if (isset($_COOKIE["IDString"])) {
    $id = $_COOKIE["IDString"];
    $result = $conn -> query("SELECT activeTheme, unlockedThemes, themeProgress FROM userset WHERE ID = '$id'");
    if($result -> num_rows > 0) {
      $hasAccount = true;
      while($row = $result -> fetch_assoc()) {
        $currentTheme = $row["activeTheme"];
        $unlocks = json_decode($row["unlockedThemes"]);
        $themeProgress = json_decode($row["themeProgress"], true);
      }


      $hasAqua = in_array("aqua", $unlocks);
      $hasE = in_array("emerald", $unlocks);
      if(!$hasAqua) {
        array_push($unlocks, "aqua");
      }
      if(!$hasE) {
        array_push($unlocks, "emerald");
      }
      if($currentTheme == "default" and (!$hasAqua or !$hasE) ) {
        $currentTheme = "aqua";
      }
      if( (!$hasAqua or !$hasE) ) {
        $unlocks = json_encode($unlocks);
        $conn -> query("UPDATE userset SET unlockedThemes = '$unlocks', activeTheme = '$currentTheme' WHERE ID = '$id'");
      }
    }
  }

  $conn -> close();
} else {
  $cookiesEnabled = FALSE;
}


?>
