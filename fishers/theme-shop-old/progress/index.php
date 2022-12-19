<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <?php
      //Change the file extension
      $fileExtension = "../../";

      //Change page title
      $title = "Theme Progress";

      include($fileExtension."js-data/template-variables.php");
      include($fileExtension.'../modules/global/head.php');

    ?>

    <!-- CSS Links -->
    <link rel="stylesheet" href="/css/theme-progress.css?v=<?php echo $versionNum ?>">
    <link rel="stylesheet" href="/css/theme-shop.css?v=<?php echo $versionNum ?>">
    <link rel="stylesheet" href="/css/streaks-timeline.css?v=<?php echo $versionNum ?>">

    <!-- Scripts -->
    <script type="text/javascript" src="/js/theme-progress.js?v=<?php echo $versionNum ?>"></script>
    <script type="text/javascript" src="../../js-data/Schedule.json?v=<?php echo $versionNum ?>"></script>
    <script type="text/javascript" src="../../js-data/Calendar.json?v=<?php echo $versionNum ?>"></script>
    <script type="text/javascript" src="/js/streaks-points.js?v=<?php echo $versionNum ?>"></script>
    <script type="text/javascript" src="/js/streaks-timeline.js?v=<?php echo $versionNum ?>"></script>

    <?php include($fileExtension."../php/streaksUpdater.php");?>
    <?php include($fileExtension."../php/theme-shop.php"); ?>

  </head>
  <body onload="loadProgressPage(getDailyChecks(),getPlannerEntries()); loadStreaks(getStreaks());">
    <?php include($fileExtension.'../modules/theme-shop/progress-scrim.php'); ?>

    <div class="wrapper">
      <?php include($fileExtension.'../modules/global/header.php'); ?>

      <article id="main-content">
        <!-- Main Content -->
        <?php include($fileExtension.'../modules/theme-shop/header.php'); ?>
        <?php include($fileExtension.'../modules/theme-shop/progress-page.php'); ?>
      </article>

    </div>
    <?php include($fileExtension.'../modules/global/navigation.php'); ?>

    <script type="text/javascript" src="/js/progress-end.js?v=<?php echo $versionNum ?>"></script>

  </body>
</html>
