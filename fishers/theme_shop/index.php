<!DOCTYPE html>

<?php
// header('Cache-Control: no-cache, no-store, must-revalidate');
// header('Pragma: no-cache');
// header('Expires: 0');
$r = $_SERVER['DOCUMENT_ROOT'];

include_once($r . "/global/themes/getCurrentTheme.php");


//$displayConfetti = isset($_REQUEST["confetti"]);
$loadPuzzle = false;
$isCorrect = false;
$connection = mysqli_connect('localhost', 'schedasr_admin', 'bananaman10?', 'schedasr_userbase');
if($conn -> connect_error) {
  header("HTTP/1.1 500 Internal Server Error");
  exit;
}

$result = $connection -> query("SELECT themeName, questions FROM themeset WHERE 1");
$questions;
$questionNums;
if($result -> num_rows > 0) {
  while($row = $result -> fetch_assoc()) {
    if(!in_array($row["themeName"], array($unlocks))) {
      $questionNums[$row["themeName"]] = ((array_key_exists($row["themeName"], $themeProgress) )? (int)$themeProgress[$row["themeName"]] : 0);
      $questions[$row["themeName"]] = json_decode($row["questions"]);
    }
  }
}


if(isset($_POST["answer"]) and isset($_POST["theme"])) { //checking answer
  $n = stripslashes(strip_tags($_POST["theme"]));
  $result = $connection -> query("SELECT questionAnswers FROM themeset WHERE themeName = '$n'");
  $ans;
  if($result -> num_rows > 0) {
    while($row = $result -> fetch_assoc()) {
      $ans = json_decode($row["questionAnswers"]);
    }
  }

  if(array_key_exists($n, $questions)) {
    $userAns = strtolower(stripslashes(strip_tags($_POST["answer"])));
    if(in_array( $userAns, $ans[$questionNums[$n]])) {

      if($questionNums[$n] == count($questions[$n]) - 1) {
        $unlocks[count($unlocks)] = $n;
        $unlocks = json_encode($unlocks);
        $connection -> query("UPDATE userset SET unlockedThemes = '$unlocks' WHERE ID = '$id'");
        $connection -> query("UPDATE userset SET activeTheme = '$n' WHERE ID = '$id'");
      } else {
        $themeProgress[$n] = (int)$questionNums[$n] + 1;

        $themeProgress = json_encode($themeProgress);
        $connection -> query("UPDATE userset SET themeProgress = '$themeProgress' WHERE ID = '$id'");
        $loadPuzzle = true;
        $isCorrect = true;
      }
    } else {
      $loadPuzzle = true;
    }

  $t = $_POST["theme"];
  unset($_POST["theme"]);
  unset($_POST["answer"]);
  header("Location: index.php?loadPuzzle=" . json_encode($loadPuzzle) . "&theme=" . $t . "&isCorrect=" . json_encode($isCorrect));
}
}
$connection -> close();
 ?>

 <html lang="en" dir="ltr">
   <head>

     <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta name="HandheldFriendly" content="true">
     <title>SchedLink</title>
     <link rel="shortcut icon" type="image/ico" href="/global/images/favicon.ico"/>

     <script src="/global/js/DOM.js?v=9" charset="utf-8"></script>
     <script src="/global/js/theme_shop.js?v=9" charset="utf-8"></script>

     <script src="/global/themes/plain_names.js?v=9" charset="utf-8"></script>

     <link rel="stylesheet" href="/global/css/global.css?v=9">
     <link rel="stylesheet" href="/global/css/home.css?v=9">
     <link rel="stylesheet" href="theme_shop.css?v=9">

   </head>


   <body>
     <style media="screen">
       <?php include_once($r . "/global/themes/theme_css/" . $currentTheme . ".css"); ?>
     </style>
     <canvas id="canvas"></canvas>
     <canvas id="confetti" style = "z-index: 15"></canvas>
     <div class="wrapper">
       <?php
         include_once($r . "/global/modules/noscript.html");
         include_once( $r . "/global/modules/header.html");
       ?>
       <div id = "scrim"></div>
       <div id = "puzzle-scrim">
          <div id = "puzzle-container" class = "container">
            <h2>theme heading</h2>
            <div id ="puzzle-content">
              <div id = "text-puzzle" class = ""></div>
              <img src="" alt="noPreload" class = "hidden preview">
            </div>
            <form class="puzzle-post" action="" method="post">
              <input type="text" name="answer" value="" placeholder="Answer Here">
              <button type="submit" name="theme" value = "">Check</button>
            </form>
          </div>
       </div>
       <article id = "main-content">
         <section class = "block">
           <section id = "theme-section">
            <div class="row container">
              <h2>Market</h2>
            </div>
            <div class="container row" id = "theme-content"></div>
           </section>
         </section>
       </article>
       <?php
         include_once($r . "/global/modules/navigation.html");
       ?>
     </div>
   </body>

   <script type="text/javascript">
   const COOKIESENABLE = <?php echo json_encode($cookiesEnabled); ?>;
   const QUESTIONS = <?php echo json_encode($questions) ?>;
   const QUESTIONSNUMS = <?php echo json_encode($questionNums) ?>;
   document.onreadystatechange = () => {
       if(document.readyState == "complete") {
         createImages(<?php echo json_encode($unlocks) ?>);
         findElements(document.body, false, "#nav-tabs__theme").classList.toggle("selected");
         document.body.querySelector("#scrim").onclick = function() {
           for(let s of document.querySelectorAll(".shown")) {
             if(s.id == "puzzle-scrim") {
               s.children[0].classList = "container";
               s.children[0].children[1].children[1].classList = "preview";
               s.children[0].children[1].children[1].src = "";
             }
             s.classList.toggle("shown");
           }
         }
         <?php
          $load = (isset($_REQUEST["loadPuzzle"]))? $_REQUEST["loadPuzzle"] : json_encode(false);
          $theme = (isset($_REQUEST["theme"])) ? $_REQUEST["theme"] : "default";
          $ani = (isset($_REQUEST["isCorrect"]))? $_REQUEST["isCorrect"] : json_encode(false);
         ?>
         if(<?php echo $load ?>) {
           let btn = document.querySelector("<?php echo '#' . $theme; ?>");
           btn.click();
           btn.previousElementSibling.children[1].click();
           if(<?php echo $ani ?>) {
             <?php
                if(json_decode($ani)) {
                 include_once("confetti.js");
                }
              ?>
           } else {
             document.querySelector("#puzzle-container").classList.toggle("incorrect");
           }
         }

        <?php include_once($r . "/global/themes/theme_js/" . $currentTheme . ".js"); ?>
       }
   }
   </script>
   </html>
