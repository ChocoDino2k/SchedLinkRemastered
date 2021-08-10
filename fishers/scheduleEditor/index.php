<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="HandheldFriendly" content="true">
    <title></title>

    <script src="../json/bell-schedules.js" charset="utf-8"></script>
    <script src="../json/schedule-calendar.js" charset="utf-8"></script>

    <script src="/global/js/DOM.js?v=1" charset="utf-8"></script>

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
  font-size: 5vw;
}

.block{
  width:100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.inline{
  line-height: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px - 60px - 11.25px);
  overflow: auto;
}
.grid_pos{
  grid-template-rows: auto auto;
  max-height: inherit;
  height: 100%;
  overflow: auto;
  flex:1;
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
.dropdown_wrapper thead{
  background: var(--container-color);
}
.dropdown_wrapper tbody{
  background: var(--secondary-background);
}
.cal_itm{
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
  width: 1.5rem;
  display: inline-block;
}
.weekday{
  width: 2rem;
}
.calendar_container{
  width: 100%;
  margin: auto;
  background: var(--container-color);
}
.calendar_head{
  display: flex;
  align-items: center;
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
}
.calendar_body{
  width:100%;
  margin: auto;
  height: auto;
}
.calendar_body > div{
  width: 100%;
  line-height: 0;
}
.calendar_group{
  display: grid;
      grid-template-columns: auto 1fr;
      justify-content: center;
      align-items: center;
      margin-top: 5px;
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
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  display: inline-block;
}

.overflow_container{
  outline: 1px solid black;
}
.name_body_container{
  margin: 5px 0;
  padding: 0 5px;
  background: #fff;
  box-sizing: border-box;
  font-size: .75rem;
}
.period_name p{
  text-align: left;
  font-size: inherit;
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
  font-size: inherit;
}
.period_time p:last-child{
  text-align: left;
}
.sub{
  margin: 5px 0 5px 10%;
  width: 90%;
}
@media screen and (min-width: 800px){
  :root{
    font-size: 3vw;
  }
  .calendar_container{
    width:90%;
    margin: auto;
  }
  .calendar_group{
    display: inline-block;
    width: calc(100%/7);
    margin-top:0;

  }
  .weekday, .day{
    width: 100%;
  }
}
</style>

<script type="text/javascript">

</script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.4/gsap.min.js" async></script> -->
<script src="js/calendar.js" charset="utf-8"></script>
<script src="js/calendar_html.js?v=1" charset="utf-8"></script>
<script src="js/schedule_html.js?v=1" charset="utf-8"></script>
</html>
