<!DOCTYPE html>

<?php
// header('Cache-Control: no-cache, no-store, must-revalidate');
// header('Pragma: no-cache');
// header('Expires: 0');
$r = $_SERVER['DOCUMENT_ROOT'];

include_once($r . "/global/php/getUserAccountInfo.php");

include_once($r. "/global/php/streaks.php");

include_once($r. "/global/php/themeShopSetup.php");

$conn -> close();
 ?>

 <html lang="en" dir="ltr">
   <head>

     <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta name="HandheldFriendly" content="true">
     <title>Theme Shop</title>
     <link rel="shortcut icon" type="image/ico" href="/global/images/favicon.ico"/>

     <script src="/global/js/DOM.js?v=10" charset="utf-8"></script>
     <script src="/global/js/shop/theme_shop.js?v=12" charset="utf-8"></script>
     <script src="/global/js/shop/streaks.js?v=10" charset="utf-8"></script>

     <script src="/global/themes/plain_names.js?v=15" charset="utf-8"></script>
     <script src="/global/js/shop/confetti.js?v=10" charset="utf-8"></script>

     <link rel="stylesheet" href="/global/css/global.css?v=11">
     <link rel="stylesheet" href="/global/css/home.css?v=10">
     <link rel="stylesheet" href="/global/css/shop/theme_shop.css?v=12">
     <link rel="stylesheet" href="/global/css/shop/streaks.css?v=10">

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
            <form class="puzzle-post" action="" method="POST">
              <input type="text" name="answer" value="" placeholder="Answer Here">
              <button type="submit" name="check" value ="CHECKING">Check</button>
              <button type="submit" name="points" value = "POINTS">Use Points()</button>
            </form>
          </div>
       </div>
       <article id = "main-content">
         <section class = "block">
           <section id = "theme-section">
            <div class="row container" id = "shop-heading">
              <h2 id = "shop-title">Market</h2>
              <button class = "shop-toggle" value = "p">Points</button><button class = "shop-toggle active scene-loaded" value = "t">Themes</button>
            </div>
            <div class="contaienr row hidden" id = "point-content">
              <div>
                <div class="container row">
                  <h1>Points</h1>
                  <p class = "point-info" id = "points">POINTS</p>
                  <a href = "../info/"><p class  = "point-info" id = "addi-info">HOW IT WORKS</p></a>
                </div>
                <div class="container row">
                  <h1>Streak</h1>
                  <p class = "point-info" id = "streak">STREAK</p>
                  <p class = "point-info" id = "next-bonus">DAYS UNTIL</p>
                </div>
              </div>
              <div id="streaks-timeline">
                <div id="streaks-chain">
                </div>
                <div id="streaks-blur"></div>
              </div>
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
   const QUESTIONS = <?php echo json_encode($questions); ?>;
   const QUESTIONSNUMS = <?php echo json_encode($questionNums); ?>;
   const QUESTIONPOINTS = <?php echo json_encode($questionPoints); ?>;
   const UNLOCKS = <?php echo json_encode($unlocks); ?>;
   const POINTS = <?php echo $points; ?>;
   const STREAK  = <?php echo $streak; ?>;
   const LOAD = <?php echo (isset($_REQUEST["loadPuzzle"]))? $_REQUEST["loadPuzzle"] : json_encode(false); ?>;
   const THEME = "<?php echo (isset($_REQUEST["theme"])) ? $_REQUEST["theme"] : "default"; ?>";
   const ANI = <?php echo (isset($_REQUEST["isCorrect"]))? $_REQUEST["isCorrect"] : json_encode(false); ?>;
   document.onreadystatechange = () => {
       if(document.readyState == "complete") {
         let isThms = false;
         let toggles = document.querySelectorAll(".shop-toggle"),
         blocks = document.querySelector("#theme-section").children;
         for (let t of toggles) {
           t.onclick = function() {
             for(let choice of this.parentNode.children) {
               if(choice.classList.contains("active") && choice != this){
                 choice.classList.toggle("active");
                 this.classList.toggle("active");
                 blocks[1].classList.toggle("hidden");
                 blocks[2].classList.toggle("hidden");
                 if(choice.value == "t" && !this.classList.contains("scene-loaded")) {
                   this.classList.toggle("scene-loaded");
                   loadStreakScene();
                 } else if (choice.value == "p" && !this.classList.contains("scene-loaded")) {
                   this.classList.toggle("scene-loaded");
                   loadThemeScene();
                 }
               }
             }
           };
         }
         loadThemeScene();
         findElements(document.body, false, "#nav-tabs__theme").classList.toggle("selected");



        <?php include_once($r . "/global/themes/theme_js/" . $currentTheme . ".js"); ?>
       }
   }
   </script>
   </html>
