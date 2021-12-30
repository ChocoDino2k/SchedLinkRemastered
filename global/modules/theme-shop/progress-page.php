<section class="block">
  <section class="container row" id="progress__info">
    <p>Receive points in the following ways!</p>
  </section>

  <a href="../puzzle/" class="a--no-underline">
    <div id="puzzle-card" class="container hover row">
      <h1>Puzzles</h1>
      <?php include('puzzle-icons.php'); ?>
    </div>
  </a>

  <section class="row" id="progress__cards">
    <div class="container hover progress-card" onclick="displayInfoCard('dailyCheck')">
      <h3>Daily Check</h3>
      <?php include('daily-check.php'); ?>
      <p>+1 point</p>
    </div>

    <div class="container l-margin hover progress-card" onclick="displayInfoCard('planner')" style="display: none;">
      <h3>Planner Entries</h3>
      <?php include('planner.php'); ?>
      <p>+1 point</p>
    </div>
  </section>
  <div class="container streaks-info" onclick="displayInfoCard('streaks');" style="padding-bottom: 2px; padding-left: 1em; padding-right: 1em;">
    <h1>Streaks</h1>
    <h2 class="streaks-info__count">-</h2>
    <?php include('timeline.php'); ?>
  </div>
</section>

<div class="container progress-card info-card" id="daily-check__info-card">
  <h3>Daily Check</h3>
  <?php include('daily-check.php'); ?>
  <p class="info-card__desc">
    Open SchedLink during<br>
    5 periods in 1 day.<br>
    You get a point for each period.
  </p>
  <p>+1 point</p>
</div>

<div class="container progress-card info-card" id="planner__info-card">
  <h3>Planner Entries</h3>
  <?php include('planner.php'); ?>
  <p class="info-card__desc">
    Confirm public
    <br>
    planner entries
  </p>
  <p>+1 point</p>
</div>

<div class="container progress-card info-card" id="streaks__info-card">
  <h3>Streaks</h3>
  <h2 class="streaks-info__count">0</h2>
  <?php include('timeline.php'); ?>
  <p class="info-card__desc">
    Get the most amount of points by
    <br>
    keeping a streak on school days
  </p>
  <p>+1 point</p>
</div>
