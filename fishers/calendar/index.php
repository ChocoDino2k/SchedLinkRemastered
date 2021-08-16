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
    <script src="../json/schedule-calendar.js?v=2" charset="utf-8"></script>

    <script src="/global/js/DOM.js?v=2" charset="utf-8"></script>

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
        <section>
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
      </article>
    </div>
      </body>
      <style media="screen">
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
      <script src="/global/js/calendar.js" charset="utf-8"></script>
      <script src="js/calendar_html.js" charset="utf-8"></script>
      </html>
