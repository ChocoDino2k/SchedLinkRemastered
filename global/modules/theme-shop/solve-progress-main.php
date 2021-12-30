<?php
if ($token != "d60bed8874df2fb932c6c33f64085a4a") {
    // header("Location: ./");
    echo "<h1 class=\"container\" style=\"padding: 16px; margin: 0 auto; -moz-width: fit-content; width: fit-content;\">Your access token is invalid.</h1>";
    exit;
}
?>
<style>
table#dataTable td, 
table#dataTable th {
    border: 1px solid;
    padding: 2px 8px;
}

table#dataTable {
    border: 1px solid;
    border-collapse: collapse;
}

#main-content > div, #main-content > h1 {
    padding: 20px 12px;
    -moz-width: fit-content;
    margin: 0 auto;
    width: fit-content;
}

#main-content > div h1 {
    text-align: center;
}

</style>
<div class="container">
<?php
$themeNames = array();
$numPuzzles = array();
echo "<h1>Puzzle Solve Progress (" . $schoolName . ")</h1>";
//Database connection
$connSchool = new mysqli('localhost', 'scheplqs_localuser', 'localpassword', 'scheplqs_' . strtolower($schoolName));
$connPuzzles = new mysqli('localhost', 'scheplqs_localuser', 'localpassword', 'scheplqs_puzzles');
if ($connSchool -> connect_error) {
	die('Connection Failed : ' . $connSchool -> connect_error);
} else if ($connPuzzles -> connect_error) {
	die('Connection Failed : ' . $connPuzzles -> connect_error);
} else {
    $resultPuzzles = $connPuzzles -> query("SELECT puzzleID, theme, numberPuzzles FROM `puzzle`");
    if ($resultPuzzles -> num_rows > 0) {
        while ($row = $resultPuzzles -> fetch_assoc()) {
            $themeNames[$row["puzzleID"]] = $row["theme"];
            $numPuzzles[$row["puzzleID"]] = $row["numberPuzzles"];
        }
    }
    // echo implode(',',array_keys($themeNames));
    // echo implode(',',array_keys($numPuzzles));
    $resultSchool = $connSchool -> query("SELECT Name, id, Points, puzzleID FROM `registrationTest` WHERE `puzzleID` REGEXP '" . $puzzleIDregex . "' ORDER BY puzzleID DESC");
    if ($resultSchool -> num_rows > 0) {
        // echo "<table id=\"dataTable\"><thead><tr><th>Name</th><th>id</th><th>Points</th><th>Current Puzzle</th></tr></thead><tbody>";
        echo "<table id=\"dataTable\"><thead><tr><th>Name</th><th>id</th><th>Points</th><th>Currrent Stage</th></tr></thead><tbody>";
        while ($row = $resultSchool -> fetch_assoc()) {
            echo "<tr><td>" . $row["Name"] . "</td><td>" . $row["id"] . "</td><td>" . $row["Points"] . "</td><td>" . parsePuzzleID($row["puzzleID"]) . "</td></tr>";
        }
        echo "</tbody></table>";
    } else {
        echo "No results. This school probably doesn't have anyone that's solved any puzzles yet.";
    }
	$connSchool -> close();
}
function parsePuzzleID($id) {
    global $themeNames, $numPuzzles;
    $idArr = explode(":", $id);
    $puzzleId = $idArr[0];
    $idNum = $idArr[1];
    if (array_key_exists($puzzleId, $themeNames) and array_key_exists($puzzleId, $numPuzzles)) {
        if ($idNum > $numPuzzles[$puzzleId]) {
            // return $themeNames[$puzzleId] . " Finished";
            return "Finished";
        } else {
            // return $themeNames[$puzzleId] . " " . $idNum;
            return $idNum;
        }
    } else {
        return $id;
    }
}
?>
</div>