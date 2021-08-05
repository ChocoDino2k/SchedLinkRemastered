<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="HandheldFriendly" content="true">
    <title></title>
    <script src="/global/js/DOM.js" charset="utf-8"></script>
  </head>
  <body>
    <div class="wrapper">
      <?php
        $r = $_SERVER['DOCUMENT_ROOT'];
        include_once($r . "/global/modules/noscript.html");
        include_once( $r . "/global/modules/header.html");
      ?>
      <article id = "main_body">
        <section class = "block">
          <?php
            include_once($r . "/global/modules/timer.html");
          ?>
        </section>
        <section class = "block">

        </section>
      </article>
      <?php
        include_once($r . "/global/modules/navigation.html");
      ?>
    </div>
  </body>
  <script type="text/javascript">
    let parent = findElements(document.body, false, ".block");
    parent.appendChild(createElement("div", "id:timer_head"));
    parent.appendChild(createElement("div", "id:timer"));
  </script>
</html>
