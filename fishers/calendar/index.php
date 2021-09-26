<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="HandheldFriendly" content="true">
    <meta http-equiv="Cache-control" content="no-cache">

    <title>Schedule Editor</title>
    <link rel="shortcut icon" type="image/ico" href="/global/images/favicon.ico"/>

    <script src="../json/schedules.js" charset="utf-8"></script>
    <script src="../json/filler.js?v=3" charset="utf-8"></script>

    <link rel="stylesheet" href="/global/css/global.css?v=3">
    <link rel="stylesheet" href="css/calendar.css?v=3">
  </head>
  <body>
    <div class="wrapper">
      <?php
        $r = $_SERVER['DOCUMENT_ROOT'];
        include_once($r . "/global/modules/noscript.html");
        include_once( $r . "/global/modules/header.html");
      ?>
      <article id = "main_body">
        <section id = "calendar_section">
          <div id = "calendar_container" class="">
            <div class="calendar_head">
              <button type="button" name="button" class = "calendar_head_btn" value = '-1'><p></p></button>
              <div id = "calendar_date"><p>undefined</p>
              </div>
              <button type="button" name="button" class = "calendar_head_btn" value = '1'><p></p></button>
            </div>
            <div class="calendar_body">
              <div class="group"><p class = "weekday">U</p><div class="day_group"><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p></div></div>
              <div class="group"><p class = "weekday">U</p><div class="day_group"><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p></div></div>
              <div class="group"><p class = "weekday">U</p><div class="day_group"><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p></div></div>
              <div class="group"><p class = "weekday">U</p><div class="day_group"><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p></div></div>
              <div class="group"><p class = "weekday">U</p><div class="day_group"><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p></div></div>
              <div class="group"><p class = "weekday">U</p><div class="day_group"><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p></div></div>
              <div class="group"><p class = "weekday">U</p><div class="day_group"><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p><p class = "day">0</p></div></div>
            </div>
          </div>
        </section>
        <section id = "schedule_section">
          <div id="schedule_container">
            <div class="schedule_head">

            </div>
            <div class="schedule_body">

            </div>
          </div>
        </section>
      </article>
    </div>
      </body>
      <script src="/global/js/DOM.js?v=3" charset="utf-8"></script>
      <script src="/global/js/calendar.js" charset="utf-8"></script>
      <script src="js/calendar_html.js" charset="utf-8"></script>
      <script type="text/javascript">
      var cSec,sSec;
      document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
          cSec = findElements(document.body, false, "#calendar_container");
          sSec = findElements(document.body, false, "#schedule_section");
          calendar = new Calendar(false);

          DAYS_OF_WEEK_ABR.forEach((item, i) => {
            cSec.children[1].children[i].children[0].innerHTML = item;
          });
          for(let btn of findElements(cSec, true, '.calendar_head_btn')){
            btn.onclick = function(){
              if(calendar.updateMonth(parseInt(btn.value))){
                setUserData(false);
              }
              replaceDays();
            }
          }


          setUserData(true);
          replaceDays();
        }
      }
      </script>
      </html>
