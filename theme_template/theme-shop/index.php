<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <?php
      //Change the file extension
      $fileExtension = "../";

      //Change page title
      $title = "Theme Shop";

      include($fileExtension."js-data/template-variables.php");
      include($fileExtension.'../modules/global/head.php');
    ?>

    <!-- CSS Links -->
    <link rel="stylesheet" href="/css/theme-shop.css?v=<?php echo $versionNum ?>">

    <!-- Scripts -->
    <script type="text/javascript" src="/js/theme-shop.js?v=<?php echo $versionNum ?>"></script>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.4/gsap.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="/js/lazy/jquery.lazy.min.js"></script>

    <!-- Php -->
    <?php include($fileExtension."../php/catch-theme-request.php"); ?>
    <?php include($fileExtension."../php/theme-shop.php"); ?>

  </head>
  <body onload="loadThemeShop();">
    <?php include($fileExtension.'../modules/theme-shop/scrim.php'); ?>
    <?php include($fileExtension.'../modules/theme-shop/confetti.php'); ?>
    <div class="wrapper">
      <?php include($fileExtension.'../modules/global/header.php'); ?>

      <article id="main-content">
        <!-- Main Content -->
        <?php include($fileExtension.'../modules/theme-shop/dropdown-message.php'); ?>
        <?php include($fileExtension.'../modules/theme-shop/header.php'); ?>
        <?php include($fileExtension.'../modules/theme-shop/theme-grid.php'); ?>
      </article>

    </div>

    <?php include($fileExtension.'../modules/global/navigation.php'); ?>

    <script type="text/javascript" src="/js/theme-shop-end.js?v=<?php echo $versionNum ?>"></script>

  </body>
</html>
