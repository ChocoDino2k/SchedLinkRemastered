<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="HandheldFriendly" content="true">
    <meta http-equiv="Cache-control" content="no-cache">

    <title>Schedule Editor</title>
    <link rel="shortcut icon" type="image/ico" href="/global/images/favicon.ico"/>

    <script src="../json/schedules.js?v=3" charset="utf-8"></script>
    <script src="../json/filler.js?v=3" charset="utf-8"></script>

    <script src="/global/js/DOM.js?v=3" charset="utf-8"></script>

    <link rel="stylesheet" href="/global/css/global.css?v=3">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

</head>
<body>
  <div class="wrapper">
    <?php
      $r = $_SERVER['DOCUMENT_ROOT'];
      include_once($r . "/global/modules/noscript.html");
      include_once( $r . "/global/modules/header.html");
    ?>
    <article id = "main_body">
      <div id = "state_display" class = "hidden">
        <p>Saving...</p>
      </div>
      <section class = "block">
        <section class = "inline">
          <div class="save_container">
            <button type="button" name="save" onclick = "save()">Save</button>
          </div>
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
          <div class="schedule_view_options">
            <div class="schedule_alter_options">
              <div class="alter_option_container">
                <img src="/global/images/edit_icon.svg" alt="">
              </div>
              <div class="alter_option_container">
                <img src="/global/images/plus_sign.svg" alt="">
              </div>
            </div>
          </div>
            <div class="schedule_view_container">
              <div id = "schedule_view">
                <div id = "schedule_head">
                </div>
                <div id = "schedule_body"></div>
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
@keyframes fade-in{
  0%{opacity: 0}
  100%{opacity: 1}
}
#state_display{
  position: absolute;
    top: 60px;
    left: 50%;
    transform: translate(-50%, 50%);
    width: 50%;
    max-width: 10rem;
    z-index: 10;
    opacity: 0;
}
#state_display.saving{
  opacity: 1;
  background: #00fe;
}
#state_display.success{
  animation: fade-in 1s 0s 2 alternate ease-out;
  background: #0f0e;

}
.block{
  width:100%;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
}
.inline{
  line-height: 0;
  display: inline-grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 100%;
  justify-items: center;
  align-items: center;
  height: calc(100vh - 12vw - 12vw - 11.25px);
  overflow: auto;
}
.inline > div{
  width: 100%;
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

.save_container{
  width: 90%;
  margin:5px 0;
}
.save_container button,
.alter_option_container{
  padding: .25rem .75rem;
  background: var(--button-color);
  color: var(--button-text-color);
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
  width: calc(100%/3 - 5px);
  display: inline-block;
}
.weekday{
  width: 2rem;
}
.calendar_container{
  width: 100%;
  max-height: 100%;
  height: fit-content;
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
}
.calendar_body{
  width:100%;
  margin: auto;
  height: auto;
  background: var(--container-color);
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
  margin-bottom: 5px;
}

.schedule_view_options{
  display: grid;
  grid-template-rows: auto 1fr;
  font-size: 0;
  justify-content: center;
}
.alter_option_container{
  width: auto;
  box-sizing: border-box;
  margin: 5px;
  display: inline-block;
}
.alter_option_container img{
  width: 35px;
  height: 35px;
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
.name_body_container,
.sub_head{
  margin: 5px 0;
  padding: 0 5px;
  background: #fff;
  box-sizing: border-box;
  font-size: .75rem;
}
.period_name p,
.sub_head{
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
.sub_block{
  width: 90%;
}
.sub_head {
  font-size: .85rem;
  margin: 5px 0 5px 5%;
}
.sub_block .name_body_container{
    margin: 5px 0 5px 10%;
}

@media screen and (min-width: 500px){
  .inline{
        height: calc(100vh - 60px - 60px - 11.25px);
  }

}
@media screen and (min-width: 800px){
  :root{
    font-size: 3vw;
  }
  .calendar_container{
    width:90%;
  }
  .calendar_group{
    display: inline-block;
    width: calc(100%/7);
    margin:0;

  }
  .weekday, .day{
    width: 100%;
  }
  #calendar_date{
        align-items: center;
  }
}
</style>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.4/gsap.min.js" async></script> -->
<script src="/global/js/calendar.js?v=3" charset="utf-8"></script>
<script src="js/calendar_html.js?v=3" charset="utf-8"></script>
<script src="js/schedule_html.js?v=3" charset="utf-8"></script>
<script src="js/save.js?v=3" charset="utf-8"></script>
</html>
