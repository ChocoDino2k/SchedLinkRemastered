<!DOCTYPE html>

<?php
$r = $_SERVER['DOCUMENT_ROOT'];
include_once($r . "/global/php/getUserAccountInfo.php");

include_once($r. "/global/php/streaks.php");

$conn->close();

 ?>

<html lang="en" dir="ltr">
  <head>

    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="HandheldFriendly" content="true">
    <meta http-equiv="Cache-control" content="no-cache">

    <title>Calendar</title>
    <link rel="shortcut icon" type="image/ico" href="/global/images/favicon.ico"/>

    <script src="../json/schedules.js?v=<?php echo filemtime("../json/schedules.js");?>" charset="utf-8"></script>
    <script src="../json/schedule-calendar.js?v=<?php echo filemtime("../json/schedule-calendar.js"); ?>" charset="utf-8"></script>

    <link rel="stylesheet" href="/global/css/global.css?v=10">
    <link rel="stylesheet" href="/global/css/calendar/calendar.css?v=10">
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
      <article id = "main_body">
        <section id = "calendar_section">
          <div id = "calendar_container" class="container">
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
        <section id = "schedule_section" class = "hidden">
          <div id="schedule_container">
            <div class="schedule_head">

            </div>
            <div class="schedule_body">

            </div>
          </div>
        </section>
      </article>
      <?php
        include_once($r . "/global/modules/navigation.html");
      ?>
    </div>
      </body>
      <script src="/global/js/DOM.js?v=9" charset="utf-8"></script>
      <script src="/global/js/calendar/calendar.js?v=9" charset="utf-8"></script>
      <script src="/global/js/calendar/calendar_html.js?v=9" charset="utf-8"></script>
      <script type="text/javascript">
      var calendarSection, scheduleSection, calendar;
      calendar = new Calendar(false);
      document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
          findElements(document.body, false, "#nav-tabs__cal").classList.toggle("selected");

          calendarSection = findElements(document.body, false, "#calendar_container");
          scheduleSection = findElements(document.body, false, "#schedule_section");
          scheduleSection.classList = "hidden";
          scheduleSection.onclick = (e) =>{
            scheduleSection.classList = "hidden";
          }

          //set days of the week along the calendar
          let weekDayNames = findElements(calendarSection, true, ".weekday");
          DAYS_OF_WEEK_ABR.forEach((item, i) => {
            weekDayNames[i].innerHTML = item;
          });
          setCurrentMonthDisplay(); //show current month
          //set arrow buttons to update calendar display
          for(let btn of findElements(calendarSection, true, '.calendar_head_btn')){
            btn.onclick = function() {
              calendar.updateMonth(parseInt(btn.value))
              setCurrentMonthDisplay();
            }
          }

          <?php include_once($r . "/global/themes/theme_js/" . $currentTheme . ".js"); ?>
        }
      }
      </script>
      </html>
