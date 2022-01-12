<?php
function checkMiss($last, $current) {
  global $r;
  clearstatcache($r . "/fishers/json/schedule-calendar.js", TRUE);
  clearstatcache($r . "/fishers/json/schedules.js", TRUE);
  $calendarArray = json_decode(explode(" = ", file_get_contents($r . "/fishers/json/schedule-calendar.js"))[1], true);
  $scheduleArray = json_decode(explode(" = ", file_get_contents($r . "/fishers/json/schedules.js"))[1], true);

  $dateSep = explode("-", $last);
  $checkDay = (int)$dateSep[2];
  $checkMonth = (int)$dateSep[1];
  $checkYear = (int)$dateSep[0];


  $checkDay++;
  if($checkDay > count($calendarArray[$checkYear][$checkMonth-1])) {
    $checkMonth++;
    $checkDay = 1;
  }
  if($checkMonth > 12) {
    $checkYear++;
    $checkMonth = 1;
  }

  while(sprintf("%04d-%02d-%02d", $checkYear, $checkMonth, $checkDay) != $current) {
    if($scheduleArray[$calendarArray[$checkYear][$checkMonth-1][$checkDay-1]][0]["needsCheck"]) {
      return TRUE;
    }
    $checkDay++;
    if($checkDay > count($calendarArray[$checkYear][$checkMonth-1])) {
      $checkMonth++;
      $checkDay = 1;
    }
    if($checkMonth > 12) {
      $checkYear++;
      $checkMonth = 1;
    }
  }

  return FALSE;

}


if($hasAccount and $cookiesEnabled) {

  $result = $conn -> query("SELECT points, streak, lastDate FROM userset WHERE ID = '$id'");

  if($result -> num_rows > 0)
  {
      $row = $result->fetch_assoc();
      $points = (int)$row["points"];
      $streak = (int)$row["streak"];
      $lastDate = $row["lastDate"];

    if($lastDate == "0000-00-00" or $lastDate != $GLOBALS['currentDateISO']) { //if it's their first time or the dates do not match
      $dateToCheck = ($lastDate == "0000-00-00")? $GLOBALS['currentDateISO'] : $lastDate;
      $dateTime = date_timestamp_get(date_create($dateToCheck));
      $currentTime = date_timestamp_get(date_create($GLOBALS["currentDateISO"]));
      $lostStreak = false;
      if($currentTime - $dateTime  > 86400) {
        if(checkMiss($dateToCheck, $GLOBALS['currentDateISO'])) {
          $streak -= 1;
          $lostStreak = true;
        }
      }

      $streak += 1;
      $points += 10;
      if(!$lostStreak) { //bonus for logging in everyday
        switch ($streak) {
          case 5:
            $points += 20;
            break;
          case 10:
            $points += 30;
            break;
          case 15:
            $points += 50;
            break;
          case 20:
            $points += 60;
          default:
            if($streak % 5 == 0)
              $points += 70;
            break;
        }
      }
      $now = $GLOBALS['currentDateISO'];
      $conn -> query("UPDATE userset SET streak = $streak, points = $points, lastDate = '$now' WHERE ID = '$id'");
    }
  }
}
//connection still open at this point
?>
