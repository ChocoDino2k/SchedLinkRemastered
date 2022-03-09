<!DOCTYPE html>

<?php

$r = $_SERVER['DOCUMENT_ROOT'];

include_once($r . "/global/php/getUserAccountInfo.php");

include_once($r . "/global/php/streaks.php");

$conn->close();

 ?>

<html lang="en" dir="ltr">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="HandheldFriendly" content="true">
    <title>SchedLink</title>
    <link rel="shortcut icon" type="image/ico" href="/global/images/favicon.ico"/>

    <script src="json/schedules.js?v=<?php echo filemtime("json/schedules.js");?>" charset="utf-8"></script>
    <script src="json/schedule-calendar.js?v=<?php echo filemtime("json/schedule-calendar.js"); ?>" charset="utf-8"></script>

    <script src="/global/js/DOM.js?v=10" charset="utf-8"></script>
    <script src="/global/js/home/LinkedList.js?v=10" charset="utf-8"></script>
    <script src="/global/js/home/clockv2.js?v=10" charset="utf-8"></script>

    <link rel="stylesheet" href="/global/css/global.css?v=10">
    <link rel="stylesheet" href="/global/css/home.css?v=10">

  </head>
  <body>
    <style media="screen">
      <?php include_once($r . "/global/themes/theme_css/" . $currentTheme . ".css"); ?>
    </style>
    <canvas id = "canvas"></canvas>
    <div class="wrapper">
      <?php
        include_once($r . "/global/modules/noscript.html");
        include_once( $r . "/global/modules/header.html");
      ?>
      <article id = "main-content">
        <section class = "block">
          <?php
            include_once($r . "/global/modules/timer.html");
          ?>
        </section>
        <section class = "block">
          <?php
            include_once($r . "/global/modules/splash.html");
          ?>
        </section>
      </article>
      <?php
        include_once($r . "/global/modules/navigation.html");
      ?>
    </div>
  </body>

  <script type="text/javascript">
  document.onreadystatechange = () => {
      if(document.readyState == "complete") {
        init();
        findElements(document.body, false, "#nav-tabs__home").classList.toggle("selected");
        <?php include_once($r . "/global/themes/theme_js/" . $currentTheme . ".js"); ?>
        document.querySelector("#period__time").innerHTML = "Template";
        document.querySelector("#countdown__timer").innerHTML = "00:00";
      }
  }
  </script>
  <style media="screen">
    #countdown__progress {
      width: 45%;
    }
  </style>
</html>
