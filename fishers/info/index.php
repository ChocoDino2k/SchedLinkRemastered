<?php

$r = $_SERVER['DOCUMENT_ROOT'];

include_once($r . "/global/php/getUserAccountInfo.php");

$conn -> close();

?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="HandheldFriendly" content="true">
    <title>About Sched</title>
    <link rel="shortcut icon" type="image/ico" href="/global/images/favicon.ico"/>

    <script src="/global/js/DOM.js?v=10" charset="utf-8"></script>

    <link rel="stylesheet" href="/global/css/global.css?v=11">
    <link rel="stylesheet" href="/global/css/info/info.css?v=10">
  </head>
  <body>
    <style media="screen">
      <?php include_once($r . "/global/themes/theme_css/" . $currentTheme . ".css"); ?>
    </style>
    <canvas id="canvas"></canvas>

    <div class="wrapper">
      <?php
      include_once($r . "/global/modules/noscript.html");
      include_once( $r . "/global/modules/header.html");
      ?>
      <article id = "main-content">
        <section class = "block">
          <div class="info-block container row">
            <h1>Home Page</h1>
            <p>This page contains a timer which displays how much time is remaining in any given period, but defaults to the current period in the school's schedule</p>
            <p>Clicking on an arrow will scroll through the schedule for that day. If you go to a future period, the timer displays how much time remains until that period starts</p>
            <p>Under the timer is an information board where new updates and important information will be listed</p>
          </div>
          <div class="info-block container row">
            <h1>Calendar</h1>
            <p>This page contains a color-coded calendar that shows each schedule for every day of the year</p>
            <p>Clicking on a day will display its schedule</p>
          </div>
          <div class="info-block container row">
            <h1>Themes</h1>
            <p>These are a way to customize your SchedLink experience and can be located in the Theme Shop</p>
            <p>There are two ways to unlock a theme: Solving its respective puzzle or using points</p>
          </div>
          <div class="info-block container row">
            <h1>Points/Streaks</h1>
            <p>Points are collected passively by simplying using SchedLink</p>
            <p>Every 5 consecutive days a user uses SchedLink, they get additional bonus points</p>
            <p>If a user misses a day, their streak is stunted at their last log in (NOTE: This does NOT include eLearning or No School days)</p>
            <p>These points can be used to skip puzzles and unlock themes directly, and are found in the Theme Shop</p>
          </div>
        </section>
        <section class = "block">
          <div class="info-block container row" id="about-us">
            <h1>About Us</h1>
            <div id = "creator-info">
              <div class="creator-block row">
                <h2>Creators</h2>
                <p>Matthew Ghera</p>
                <p>Dane Trainor</p>
              </div>
              <div class="creator-block row">
                <h2>UI Designers</h2>
                <p>Patrick Nusbaum</p>
                <p>Logan Cover</p>
              </div>
              <div class="creator-block row">
                <h2>Developers</h2>
                <p>Logan Cover</p>
                <p>Gabriel Iskandar</p>
                <p>Skylar Smith</p>
                <p>Matthew Ghera</p>
                <p>Ben Lilley</p>
              </div>
            </div>
            <div class="creator-block row">
              <h2>Contact Us</h2>
              <p>schedlinkofficial@gmail.com</p>
            </div>
          </div>
        </section>
      </article>
      <?php
      include_once($r . "/global/modules/navigation.html");
      ?>
    </div>
  </body>
</html>
