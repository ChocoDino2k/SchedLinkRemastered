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
      <section class = "block">
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
        </section>
        <section class= "inline"></section>
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

.block{
  width:100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.inline{
  line-height: 0;
  display: inline-block;
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


/* .custom-select-wrapper {
     position: relative;
     user-select: none;
     width: 100%;
}
 .custom-select {
     position: relative;
     display: flex;
     flex-direction: column;
     border-width: 0 2px 0 2px;
     border-style: solid;
     border-color: #394a6d;
}
 .custom-select__trigger {
     position: relative;
     display: flex;
     align-items: center;
     justify-content: space-between;
     padding: 0 22px;
     font-size: 20px;
     font-weight: 300;
     color: #3b3b3b;
     height: 60px;
     line-height: 60px;
     background: #ffffff;
     cursor: pointer;
     border-width: 2px 0 2px 0;
     border-style: solid;
     border-color: #394a6d;
}
 .custom-options {
     position: absolute;
     display: block;
     top: 100%;
     left: 0;
     right: 0;
     border: 2px solid #394a6d;
     border-top: 0;
     background: #fff;
     transition: all 0.5s;
     opacity: 0;
     visibility: hidden;
     pointer-events: none;
     z-index: 2;
}
 .custom-select.open .custom-options {
     opacity: 1;
     visibility: visible;
     pointer-events: all;
}
 .custom-option {
     position: relative;
     display: block;
     padding: 0 22px 0 22px;
     font-size: 22px;
     font-weight: 300;
     color: #3b3b3b;
     line-height: 60px;
     cursor: pointer;
     transition: all 0.5s;
}
 .custom-option:hover {
     cursor: pointer;
     background-color: #b2b2b2;
}
 .custom-option.selected {
     color: #ffffff;
     background-color: #305c91;
}
*/
.arrow {
     position: relative;
     height: 15px;
     width: 15px;
}
 .arrow::before, .arrow::after {
     content: "";
     position: absolute;
     bottom: 0px;
     width: 0.15rem;
     height: 100%;
     transition: all 0.5s;
}
 .arrow::before {
     left: -5px;
     transform: rotate(45deg);
     background-color: #394a6d;
}
 .arrow::after {
     left: 5px;
     transform: rotate(-45deg);
     background-color: #394a6d;
}
 .open .arrow::before {
     left: -5px;
     transform: rotate(-45deg);
}
 .open .arrow::after {
     left: 5px;
     transform: rotate(45deg);
}


.schedule_container{
  grid-template-columns: auto 1fr;
  display: grid;
  justify-content: center;
  padding: 5px;
}
.schedule_container:hover{
  background: #fff;
}
.schedule_container > div{
  width:100%;
  margin:auto;
}
.schedule_container .schedule_color_container span{
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  display: inline-block;
}

.overflow_container{
  outline: 1px solid black;
}
thead{
  background: #fff;
}
tbody{
  background: #ddd;
}
</style>

<script type="text/javascript">

</script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.4/gsap.min.js" async></script> -->
<script src="../JSON/bell-schedules.js" charset="utf-8"></script>
<script src="../JSON/schedule-calendar.js" charset="utf-8"></script>
<script src="js/calendar.js" charset="utf-8"></script>
<script src="js/calendar_html.js" charset="utf-8"></script>
</html>
