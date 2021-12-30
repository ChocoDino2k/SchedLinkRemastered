<?php

// Options

$showDevsOnLeaderboard = TRUE;

// General page setup

$allowAccess = true;
$dontLoadTheme = true;

include $fileExtension . 'js-data/template-variables.php';

$title = $schoolName ? "Points Leaderboard - SchedLink $schoolName" : "Points Leaderboard";

// Access restriction

include $fileExtension . '../modules/home/fullscreen-access.php';
$rejectMessage = checkForAccess();
if ($rejectMessage !== TRUE) {
  http_response_code(403);
  $title = "Access Denied";
  
  $pageMessage = $rejectMessage;
  $pageHeading = 'Access Denied';
  include $fileExtension . '../modules/simple-page.php';
  
  exit;
}

// Theme points value lookup

$output;
$endNow = FALSE;

$themeCosts = array();

$conn = new mysqli('localhost', 'scheplqs_localuser', 'localpassword', "scheplqs__signIn");
if ($conn -> connect_error) {
    $endNow = TRUE;
	$output = 'Error: Failed to connect to database (scheplqs__signIn)';
} else {
    $result = $conn -> query('SELECT `themeName`, `themeCost` FROM `themes`');
    if ($result -> num_rows > 0) {
        while ($row = $result -> fetch_assoc()) {
            $themeCosts[$row['themeName']] = (int)$row['themeCost'];
        }
    } else {
        $endNow = TRUE;
        $output = 'Error: No themes were found in the theme shop list.';
    }
}
$conn -> close();

// Leaderboard generation

if (!$endNow) {
    $conn = new mysqli('localhost', 'scheplqs_localuser', 'localpassword', 'scheplqs_' . strtolower($schoolName));
    if ($conn -> connect_error) {
    	$endNow = TRUE;
    	$output = 'Error: Failed to connect to database (scheplqs_' . strtolower($schoolName) . ')';
    } else {
        $result = $conn -> query('SELECT `Name`, `Points`, `listOfThemes` FROM `registrationTest` WHERE `freePoints` = 0' . ($showDevsOnLeaderboard ? '' : ' AND `dev` = 0'));
        if ($result -> num_rows > 0) {
            $leaderboard = array();
            while ($row = $result -> fetch_assoc()) {
                $name = trim($row['Name']);
                $name = preg_replace('/\s+/', ' ', $name);
                $points = (int)$row['Points'];
                $themeList = explode('|', $row['listOfThemes']);
                foreach ($themeList as $theme) {
                    $points += $themeCosts[$theme];
                }
                $leaderboard[$name] = $points;
            }
            
            arsort($leaderboard);
            $leaderboard = array_slice($leaderboard, 0, 10);
            
            $tableData = [['Name', 'Points']];
            foreach ($leaderboard as $name => $points) {
                array_push($tableData, [$name, $points]);
            }
            
            include $fileExtension . '../modules/simple-table.php';
            $output = simpleTable($tableData, TRUE, 'leaderboard-table');
        } else {
            $endNow = TRUE;
            $output = 'The points leaderboard for this school seems to be empty.';
        }
    }
    $conn -> close();
}

if ($endNow) {
    $output = "<p>The following issue was encountered while attempting to generate this page:</p><p>$output</p>";
}

// Page generation
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <?php include($fileExtension.'../modules/global/head.php'); ?>
  </head>
  <body>

    <div class="wrapper">
      <?php include($fileExtension.'../modules/global/header.php'); ?>
      
      <article id="main-content">
        <!-- Main Content -->
        <div class="container" style="width: fit-content; margin: 0 auto; max-width: 600px; padding: 0.5em; text-align: left; font-size: 2em;">
            <?php echo $output; ?>
            <style>
                #leaderboard-table {
                    border-collapse: collapse;
                    border: 2px solid;
                }
                #leaderboard-table th,
                #leaderboard-table td {
                    border: 2px solid;
                    padding: 0.2em 0.7em;
                }
            </style>
        </div>
      </article>

    </div>

    <?php include($fileExtension.'../modules/global/navigation.php'); ?>

  </body>
</html>
