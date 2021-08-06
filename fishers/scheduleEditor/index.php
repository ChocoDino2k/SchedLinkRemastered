<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="HandheldFriendly" content="true">
    <title></title>

    <script src="../json/bell-schedules.js" charset="utf-8"></script>
    <script src="../json/schedule-calendar.js" charset="utf-8"></script>

    <script src="/global/js/DOM.js" charset="utf-8"></script>

    <link rel="stylesheet" href="/global/css/global.css?v=1">

</head>
<body>
  <div class="wrapper">
    <?php
      $r = $_SERVER['DOCUMENT_ROOT'];
      include_once($r . "/global/modules/noscript.html");
      include_once( $r . "/global/modules/header.html");
    ?>
    <article id = "main_body">
      <section class = "inline">
        <div class="calendar_container">
          <div class="calendar_head">
            <button type="button" name="button" class = "calendar_head_btn" value = '-1'><p></p></button>
            <div id = "calendar_date"></div>
            <button type="button" name="button" class = "calendar_head_btn" value = '1'><p></p></button>
          </div>
          <div class="calendar_body">
            <div class="weekday_container"></div>
            <div id = "dates"></div>
          </div>
        </div>
        <!-- <select name="cars" id="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedesdddddddddddddddddddddd</option>
  <option value="audi">Audi</option>
</select> -->

      </section>
      <section class= "inline">

      </section>
    </article>
    <?php
      include_once($r . "/global/modules/navigation.html");
    ?>
  </div>
</body>
<style media="screen">
:root{
  --mod: 1;
  font-size: 3vw;
}
p{
  margin:0;
  text-align: center;
  word-break: break-word;
}
p,button{
  font-size: 1rem;
  font-family: var(--norm-font);
  color: var(--container-text-color);
  line-height: 1.5;
  background: transparent;
}

.inline{
  width: 50%;
  line-height: 0;
  display: inline-block;
}


.cal_itm{
  display: inline-block;
  width:calc(100%/7);
  line-height: 2;
  font-size: 0.75rem;
  padding:0;
  box-sizing: border-box;
  cursor: default;
  border: 0.001rem solid transparent;
}
.day{
  cursor: pointer;
  border-color: black;
}
.calendar_head{
  display: flex;
  align-items: center;
  background: var(--container-color);
}
.calendar_head button{
  flex:1;
  display: inline-block;
  padding: 0;
}
.calendar_head button p{
    line-height: 1;
}
.calendar_head button p::before{
  display: inline-block;
  font-size: 3rem;
  line-height: 50%;
}
.calendar_head button:last-child p::before{
  content:"›";
}
.calendar_head button:first-child p::before{
  content:"‹";
}
.calendar_head div{
  flex:5;
  display: inline-block;
  padding:5px 0;
}
.calendar_head div p{
  width: 100%;
  font-size: 0.9rem;
  color: var(--container-text-color);
}
#calendar_date{
  display: flex;
  align-items: center;
  background: var(--container-color);
}
.calendar_body{
  width:100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  background: var(--container-color);
}
.calendar_body > div{
  width: 100%;
  line-height: 0;
}


.drop{
  background-color: #eee;
  padding: 0.5rem;
}
.dropcontainer{
  background-color: #ddd;
}
.dropcontainer::-webkit-scrollbar {
    display: none;
}
</style>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.4/gsap.min.js" async></script> -->
<script src="../JSON/bell-schedules.js" charset="utf-8"></script>
<script src="../JSON/schedule-calendar.js" charset="utf-8"></script>
<script src="js/calendar.js" charset="utf-8"></script>
<script src="js/calendar_html.js" charset="utf-8"></script>
</html>
