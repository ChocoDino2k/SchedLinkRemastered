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
    <title>Theme Template</title>
    <link rel="shortcut icon" type="image/ico" href="/global/images/favicon.ico"/>

    <script src="/global/js/DOM.js?v=10" charset="utf-8"></script>

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
        <section class="row" id="info">
	<div class="container" id="splash">
		<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><defs><style>.cls-1{fill:#fff;}</style></defs><title>! 1</title><path d="M121.05,109q-1.48-45-2.94-89.9c-.27-8.67,2.16-12.35,10.89-12.84a336.22,336.22,0,0,1,40.28,0c9.55.62,11.9,4.26,11.59,13.79q-2.24,70.66-4.61,141.34c-.44,13.48-1,27-1.22,40.46-.08,4.91-2.09,8-6.76,9.09a80.24,80.24,0,0,1-37.55,0c-4.13-1-6.57-3.53-6.72-8.1Q122.54,155.94,121,109Z"/><path d="M149.58,233.6c4.29.41,8.62.55,12.85,1.3,11.84,2.11,17,6.95,18.65,18.7a79.76,79.76,0,0,1,.3,20.82c-1.61,12.73-6.6,18.09-19.35,19.59a116.88,116.88,0,0,1-27.72-.39c-9.32-1.14-15.44-7.28-16.22-16.9a123.94,123.94,0,0,1,.13-24.74c1.36-11.2,9-16.76,22.36-17.82,3-.23,6,0,9,0Z"/></svg>
		<p id="splash__body">
			Do you have ideas to make SchedLink better? Contact us at SchedLinkOfficial@gmail.com <br>
		</p>
	</div>
</section>
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
        (findElements(document.body, false, "#period__box")).children[2].appendChild(createElement('button', ["class", "gallery-dot"]));
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
