<?php

$toCheck = $_REQUEST["checkTheme"];
$id = $_COOKIE["IDString"];

$conn = mysqli_connect('localhost', 'schedasr_admin', 'bananaman10?', 'schedasr_userbase');
if($conn -> connect_error) {
die("Connection failed: " . $conn->connect_error);
}
$result = $conn -> query("SELECT unlockedThemes FROM userset WHERE ID = '$id'");

if($result -> num_rows > 0) {
  $themes;
  while($row = $result -> fetch_assoc()) {
    $themes = $row["unlockedThemes"];
  }

  $themes = json_decode($themes);

  for ($i = 0; $i < count($themes); $i++) {
    if($themes[$i] == $toCheck) {
      $conn -> query("UPDATE userset SET activeTheme = '$toCheck' WHERE ID = '$id'");
      echo "T";
      break;
    }
  }
  echo "F";
} else {
  echo "F";
}

?>
