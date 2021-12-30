<section class="block" id="puzzle">
  <div class="row container" id="puzzle__header">
    <?php include('puzzle-icons.php'); ?>
    <p>
      Solve puzzles to gain points! Compete against others to gain the most points!
      <br>
      Solving the last stage of the puzzle will unlock the newest theme in the shop!
    </p>
  </div>
  <?php include('puzzle-viewer.php'); ?>
  <div class="row container" id="puzzle__submit">
  <?php
  if (!$puzzlesCompleted && !$noActivePuzzle) {
  ?>
    <input id="puzzle__submit__input" type="text" name="" value="" placeholder="Type here" autocomplete="off">
    <p id="puzzle__submit__info">test</p>
    <button onclick="submitAnswer();" id="puzzle__submit__button">Submit</button>
  <?php } else if ($noActivePuzzle) { ?>
    <!--There is currently no active puzzle.-->
    <span style="vertical-align: middle;">There is currently no active puzzle.</span>
    <?php include $_SERVER["DOCUMENT_ROOT"] . '/modules/global/easter-egg.php'; ?>
  <?php } else { ?>
    Congratulations, you have finished the puzzle!
  <?php } ?>
  </div>
</section>
