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
        <section class= "inline">
          <div class="grid_pos">
            <div class="schedule_view_container">
              <div id = "schedule_view">
                <div id = "schedule_head">
                </div>
                <div id = "schedule_body"></div>
              </div>
            </div>
          </div>
        </section>
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
  --sched-ratio: .5;
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
  max-height: calc(100vh - 60px - 60px - 11.25px);
}
.grid_pos{
  grid-template-rows: auto auto;
  max-height: inherit;
  height: 100%;
  overflow: auto;
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
.period_name p{
  text-align: left;
}
.period_time{
  display: grid;
  grid-template-columns: 1fr auto 1fr;
}
.period_time p:first-child{
  text-align: right;
}
.period_time p{
  margin: 0 .2rem;
}
.period_time p:last-child{
  text-align: left;
}
.sub{
  margin-left: 1.5rem;
}
/*
#schedule_body {
  margin: 0;
  width: calc(100% + 1px);
  font-family: var(--norm-font);
  font-size: calc(3vw * var(--sched-ratio));
  text-align: center;
  border-collapse: collapse;
}
#schedule_body tr {
  border-bottom: solid var(--background-color) calc(0.5vw * var(--sched-ratio));
  width: calc((100% - 6vw) * var(--sched-ratio));
}
#schedule_body td {
  padding: calc(1vw * var(--sched-ratio)) 0;
  text-align: center;
}

#schedule_body .sub-row .period {
 text-align: right;
}
#schedule_body .sub-row .period input{
  width: calc(16vw * var(--sched-ratio));
}

#schedule_body .period {
  padding: 0 calc(2vw * var(--sched-ratio)) 0 0;
}
#schedule_body .period input{
  width: calc(18vw * var(--sched-ratio));
  text-align: center;
}
#schedule_body .dash {
  padding: 0 calc(0.5vw * var(--sched-ratio));
}
#schedule_body .remove {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 calc(1vw * var(--sched-ratio));
  background: none;
}
#schedule_body .remove > img {
  width: calc(4vw * var(--sched-ratio));
}
#schedule_body .handle {
  padding: 0 calc(1vw * var(--sched-ratio));
  height: calc(5vw * var(--sched-ratio));
  vertical-align: middle;
  cursor: move;
}
#schedule_body .start-time input, #schedule_body .end-time input {
  width: calc(24vw * var(--sched-ratio));
}

#schedule_body input {
  padding: calc(0.8vw * var(--sched-ratio));
  width: auto;
  height: calc(4vw * var(--sched-ratio));
  font-size: calc(3.5vw * var(--sched-ratio));
} */
</style>

<script type="text/javascript">

</script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.4/gsap.min.js" async></script> -->
<script src="../JSON/bell-schedules.js" charset="utf-8"></script>
<script src="../JSON/schedule-calendar.js" charset="utf-8"></script>
<script src="js/calendar.js" charset="utf-8"></script>
<script src="js/calendar_html.js" charset="utf-8"></script>
<script src="js/schedule_html.js" charset="utf-8"></script>
</html>
