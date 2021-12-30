<?php
$themeRequest = $_REQUEST["theme"];

$themesList = array("cherry" => "cherry",
"blue" => "aqua",
"dark" => "dark",
"emerald" => "emerald",
"autumn" => "autumn");
$response = "default";
foreach ($themesList as $key => $value) {
  if($key == $themeRequest) {
    $response = $value;
  }
}

echo $response;
?>
