var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var highest = 0;

//Keyboard
$(document).keydown(function() {

  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});

//Click
$(".btn").click(function() {

  if (started) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePressed(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }

});

//Sequence Function
function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //Animation
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //Sound
  playSound(randomChosenColour);
  if(highest<level){
    highest=level;
  }
}

//Sound Function
function playSound(file) {

  var audio = new Audio("sounds/" + file + ".mp3");
  audio.play();

}

//Animation for click
function animatePressed(currentColor) {

  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

//Answer Check (Main Game)
function checkAnswer(currentlevel) {

  if (userClickedPattern[currentlevel] === gamePattern[currentlevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    var boom = new Audio("sounds/wrong.mp3");
    boom.play();

    $("#level-title").text("High Score: " + highest + " Your Score: " + level + " Game Over, Press Any Key to Restart");
    startOver();
  }

}

//Startover for starting again
function startOver() {
  started = false;
  gamePattern = [];
  level = 0;
}
