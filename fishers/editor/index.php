<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="HandheldFriendly" content="true">
    <title>Editor</title>
    <link rel="shortcut icon" type="image/ico" href="/global/images/favicon.ico"/>

    <script src="../json/schedules.js?v=<?php echo filemtime("../json/schedules.js");?>" charset="utf-8"></script>
    <script src="../json/schedule-calendar.js?v=<?php echo filemtime("../json/schedule-calendar.js"); ?>" charset="utf-8"></script>

    <script src="/global/js/DOM.js?v=10" charset="utf-8"></script>

    <link rel="stylesheet" href="/global/css/global.css?v=10">
    <link rel="stylesheet" href="/global/css/calendar/calendar.css?v=10">
    <link rel="stylesheet" href="/global/css/editor/editor.css?v=10">
    <link rel="stylesheet" href="/global/themes/theme_css/default.css?v=10">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

</head>
<body>
  <div class="wrapper">
    <?php
      $r = $_SERVER['DOCUMENT_ROOT'];
      include_once($r . "/global/modules/noscript.html");
      include_once( $r . "/global/modules/header.html");
    ?>
    <article id = "main-content">
      <section id = "menu_section">
          <div id = "calendar_options" class="menu_options">
            <div class="options_container">

            </div>
            <div class="options_container">
              <button type="button" name="button">New</button>
            </div>
            <div class="options_container">
              <button type="button" name="button">Edit</button>
            </div>
            <div class="options_container">
              <button type="button" name="button">Save</button>
            </div>
          </div>
          <div id = "schedule_options" class="menu_options hidden">
            <div class="options_container">
<div id = "color_picker" style = "font-size:0">
  <div class="color" style="background: #ff0000"></div><div class="color" style="background: #d92626"></div><div class="color" style="background: #b34d4d"></div><div class="color" style="background: #800000"></div><div class="color" style="background: #6c1313"></div><div class="color" style="background: #592626"></div><div class="color" style="background: #ff8c00"></div><div class="color" style="background: #d98826"></div><div class="color" style="background: #b3854d"></div><div class="color" style="background: #804600"></div><div class="color" style="background: #6c4413"></div><div class="color" style="background: #594226"></div><div class="color" style="background: #e5ff00"></div><div class="color" style="background: #c7d926"></div><div class="color" style="background: #a8b34d"></div><div class="color" style="background: #738000"></div><div class="color" style="background: #636c13"></div><div class="color" style="background: #545926"></div><div class="color" style="background: #59ff00"></div><div class="color" style="background: #65d926"></div><div class="color" style="background: #70b34d"></div><div class="color" style="background: #2d8000"></div><div class="color" style="background: #326c13"></div><div class="color" style="background: #385926"></div><div class="color" style="background: #00ff33"></div><div class="color" style="background: #26d94a"></div><div class="color" style="background: #4db361"></div><div class="color" style="background: #00801a"></div><div class="color" style="background: #136c25"></div><div class="color" style="background: #265930"></div><div class="color" style="background: #00ffbf"></div><div class="color" style="background: #26d9ac"></div><div class="color" style="background: #4db399"></div><div class="color" style="background: #008060"></div><div class="color" style="background: #136c56"></div><div class="color" style="background: #26594d"></div><div class="color" style="background: #00b3ff"></div><div class="color" style="background: #26a3d9"></div><div class="color" style="background: #4d94b3"></div><div class="color" style="background: #005980"></div><div class="color" style="background: #13526c"></div><div class="color" style="background: #264a59"></div><div class="color" style="background: #0026ff"></div><div class="color" style="background: #2641d9"></div><div class="color" style="background: #4d5cb3"></div><div class="color" style="background: #001380"></div><div class="color" style="background: #13216c"></div><div class="color" style="background: #262e59"></div><div class="color" style="background: #6600ff"></div><div class="color" style="background: #6e26d9"></div><div class="color" style="background: #754db3"></div><div class="color" style="background: #330080"></div><div class="color" style="background: #37136c"></div><div class="color" style="background: #3b2659"></div><div class="color" style="background: #f200ff"></div><div class="color" style="background: #d026d9"></div><div class="color" style="background: #ad4db3"></div><div class="color" style="background: #790080"></div><div class="color" style="background: #68136c"></div><div class="color" style="background: #572659"></div><div class="color" style="background: #ff0080"></div><div class="color" style="background: #d92680"></div><div class="color" style="background: #b34d80"></div><div class="color" style="background: #800040"></div><div class="color" style="background: #6c1340"></div><div class="color" style="background: #592640"></div><div class="color" style="background: #ffffff"></div><div class="color" style="background: #cccccc"></div><div class="color" style="background: #999999"></div><div class="color" style="background: #666666"></div><div class="color" style="background: #333333"></div><div class="color" style="background: #000000"></div></div>
            </div>
            <div class="options_container">
              <button type="button" name="button">Cancel</button>
            </div>
            <div class="options_container">
              <button type="button" name="button">Delete</button>
            </div>
            <div class="options_container">
              <button type="button" name="button">Save</button>
            </div>
          </div>
      </section>
      <section id = "edit_section">
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
        <div id = "schedule_container" class="container hidden">
          <div id = "schedule_head">

          </div>
          <div id  = "schedule_body">

          </div>
          <div id = "schedule_addition_container">
            <button type="button" name="button" onclick = "addPart(this, true, false)">Add</button>
          </div>
        </div>
      </section>
    </article>
    <?php
      include_once($r . "/global/modules/navigation.html");
    ?>
  </div>
</body>
<script src="/global/js/calendar/calendar.js?v=5" charset="utf-8"></script>
<script src="/global/js/editor/calendar_html.js?v=5" charset="utf-8"></script>
<script src="/global/js/editor/schedule_html.js?v=5" charset="utf-8"></script>
<script src="/global/js/editor/save.js?v=6" charset="utf-8"></script>

<script type="text/javascript">
let mSection, eSection, sectionIdx;
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    calendar = new Calendar(false);
    sectionIdx = 1;
    swapSections();


    let k=0;
    for(let btn of findElements(mSection, true, "button")){
      if(k == 0){
        btn.onclick = function(){edit(true)};
      }else if(k == 1){
        btn.onclick = function(){edit(false)};
      }else if(k ==2){
        btn.onclick = function(){saveCalendar()};
      }
      k++;
    }

    for(let btn of findElements(mSection.parentNode.children[1], true, "button")){
      if(k == 3){
        btn.onclick = function(){swapShown();}
      }else if(k == 4){
        btn.onclick = function(){removeSchedule();}
      }else if(k == 5){
        btn.onclick = function(){saveSchedule();}
      }
      k++;
    }

    mSection.children[0].appendChild(
      createDropDown(createScheduleOptions())
    );
    for(let btn of findElements(eSection, true, '.calendar_head_btn')){
      btn.onclick = function(){
        if(calendar.updateMonth(parseInt(btn.value))){
          setUserData(false);
        }
        replaceDays();
      }
    }
    DAYS_OF_WEEK_ABR.forEach((item, i) => {
      eSection.children[1].children[i].children[0].innerHTML = item;
    });

    setUserData(true);
    replaceDays();


    for(let c of findElements(document.body, false, "#color_picker").children){
      c.onclick = function(){
        swapColors(this);
      }
    }


  }
}
</script>
</html>
