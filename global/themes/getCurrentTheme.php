<?php
$currentTheme = "default";
$unlocks = ["default"];
$themeProgress = array();
$cookiesEnabled = TRUE;
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
      while($row = $result -> fetch_assoc()) {
        $currentTheme = $row["activeTheme"];
        $unlocks = json_decode($row["unlockedThemes"]);
        $themeProgress = json_decode($row["themeProgress"], true);
      }
    } else {
      $id = hash('sha256', strval(uniqid(rand(0, 100))));
      $conn -> query("INSERT INTO userset (ID) VALUES ('$id')");
      setcookie("IDString", $id, time() + 31536000, "/");
    }


  } else {

    $id = hash('sha256', strval(uniqid(rand(0, 100))));
    $conn -> query("INSERT INTO userset (ID) VALUES ('$id')");
    setcookie("IDString", $id, time() + 31536000, "/");

  }
  $conn -> close();
} else {
  $cookiesEnabled = FALSE;
}

?>
