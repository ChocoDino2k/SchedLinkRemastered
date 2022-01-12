<?php

$loadPuzzle = false;
$isCorrect = false;
$questions = array();
$questionNums = array();
$questionLengths = array();
$questionPoints = array();

if($cookiesEnabled and !$hasAccount) {
  $id = hash('sha256', strval(uniqid(rand(0, 100))));
  $conn -> query("INSERT INTO userset (ID) VALUES ('$id')");
  setcookie("IDString", $id, time() + 31536000, "/");
}


$result = $conn -> query("SELECT themeName, questions, questionPoints, numQuestions FROM themeset WHERE 1"); //get theme data
if($result -> num_rows > 0) {
  while($row = $result -> fetch_assoc()) {
    if(!in_array($row["themeName"], $unlocks)) {
      $questionNums[$row["themeName"]] = ((array_key_exists($row["themeName"], $themeProgress) )? (int)$themeProgress[$row["themeName"]] : 0);
      $questions[$row["themeName"]] = json_decode($row["questions"])[$questionNums[$row["themeName"]]];
      $questionPoints[$row["themeName"]] = json_decode($row["questionPoints"])[$questionNums[$row["themeName"]]];
      $questionsLengths[$row["themeName"]] = $row["numQuestions"];
    }
  }
}

if($hasAccount and (isset($_POST["points"]) or (isset($_POST["check"]))  ) ) { //checking answer or points
$loadPuzzle = false;
$isCorrect = false;
$t;
  if(isset($_POST["check"])) {
      $n = stripslashes(strip_tags($_POST["check"]));

      $result = $conn -> query("SELECT questionAnswers FROM themeset WHERE themeName = '$n'");
      $ans;
      if($result -> num_rows > 0) {
        $row = $result -> fetch_assoc();
        $ans = json_decode($row["questionAnswers"]);
      }

      if(array_key_exists($n, $questions)) {
        $userAns = strtolower(stripslashes(strip_tags($_POST["answer"])));
        if(in_array( $userAns, $ans[$questionNums[$n]])) {

          if($questionNums[$n] == $questionsLengths[$n] - 1) {
            $unlocks[count($unlocks)] = $n;
            $unlocks = json_encode($unlocks);
            $conn -> query("UPDATE userset SET unlockedThemes = '$unlocks', activeTheme = '$n' WHERE ID = '$id'");
          } else {
            $themeProgress[$n] = (int)$questionNums[$n] + 1;

            $themeProgress = json_encode($themeProgress);
            $conn -> query("UPDATE userset SET themeProgress = '$themeProgress' WHERE ID = '$id'");
            $loadPuzzle = true;
            $isCorrect = true;
          }
        } else {
          $loadPuzzle = true;
        }
    }
    $t = $_POST["check"];
    unset($_POST["check"]);
  } else {
    $n = stripslashes(strip_tags($_POST["points"]));

    if(array_key_exists($n, $questionPoints)) {
      if($points >= $questionPoints[$n]) {
        $loadPuzzle = true;
        $isCorrect = true;

        $points -= $questionPoints[$n];

        if($questionNums[$n] == $questionsLengths[$n] - 1) {
          $unlocks[count($unlocks)] = $n;
          $unlocks = json_encode($unlocks);
          $conn -> query("UPDATE userset SET unlockedThemes = '$unlocks', activeTheme = '$n', points = '$points' WHERE ID = '$id'");
        } else {
          $themeProgress[$n] = (int)$questionNums[$n] + 1;

          $themeProgress = json_encode($themeProgress);
          $conn -> query("UPDATE userset SET themeProgress = '$themeProgress', points = '$points' WHERE ID = '$id'");
          $loadPuzzle = true;
          $isCorrect = true;
        }
      } else {
        $loadPuzzle = true;
        $isCorrect = false;
      }
    }
    $t = $_POST["points"];
    unset($_POST["points"]);
  }



  unset($_POST["answer"]);
  header("Location: index.php?loadPuzzle=" . json_encode($loadPuzzle) . "&theme=" . $t . "&isCorrect=" . json_encode($isCorrect));
}



 ?>
