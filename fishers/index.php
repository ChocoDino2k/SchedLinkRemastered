<!DOCTYPE html>

<?php
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');
$r = $_SERVER['DOCUMENT_ROOT'];

include_once($r . "/global/themes/getCurrentTheme.php");
 ?>

<html lang="en" dir="ltr">
  <head>
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />

    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="HandheldFriendly" content="true">
    <title>SchedLink</title>
    <link rel="shortcut icon" type="image/ico" href="/global/images/favicon.ico"/>

    <script src="json/schedules.js?v=7" charset="utf-8"></script>
    <script src="json/filler.js?v=7" charset="utf-8"></script>

    <script src="/global/js/DOM.js?v=6" charset="utf-8"></script>
    <script src="/global/js/LinkedList.js?v=6" charset="utf-8"></script>
    <script src="/global/js/clockv2.js?v=6" charset="utf-8"></script>

    <link rel="stylesheet" href="/global/css/global.css?v=6">
    <link rel="stylesheet" href="/global/css/home.css?v=6">

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
      }
  }
  </script>
</html>
