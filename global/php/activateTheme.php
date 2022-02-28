<?php
if(!isset($_REQUEST["theme"]) or count($_COOKIE) < 1) {
  http_response_code(500);
  die("You need to have cookies enabled to use themes.");
}

$active = html_entity_decode(stripslashes($_REQUEST["theme"]), ENT_QUOTES);

$id = $_COOKIE["IDString"];

$connection = mysqli_connect('localhost', 'schedasr_admin', 'bananaman10?', 'schedasr_userbase');
if($connection -> connect_error) {
  http_response_code("500");
  header("HTTP/1.1 500 Internal Server Error");
  $connection->close();
  exit;
}

$account = $connection->query("SELECT unlockedThemes FROM userset WHERE ID = '$id'");

if($account->num_rows > 0) {
  $row = $account->fetch_assoc();
  $unlocks = json_decode($row["unlockedThemes"]);
  if(in_array($active, $unlocks)) {
    if($connection->query("UPDATE userset SET activeTheme = '$active' WHERE ID = '$id'")) {
      echo "Congrats! Activated " . $active;
    } else {
      http_response_code(500);
      exit;
    }
  } else {
    http_response_code(500);
    exit;
  }
} else {
  http_response_code(500);
  exit;
}


$connection->close();
exit;

 ?>
