var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var level = 0;

var started = false;

function nextSequence() {
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  level += 1;
  $("h1").text("level " + level);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern.length === gamePattern.length){
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]){
      setTimeout(function(){
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
    else {
      console.log("wrong");
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      $("body").addClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(name) {
  switch (name) {
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;

    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;

    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;

    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
  }
}

function animatePress(name) {
  $(name).addClass("pressed");
  setTimeout(function(){
    $(name).removeClass("pressed");
  }, 100);
}

$(".btn").click(function(event){
  var userChosenColour = "#" + event.target.id;
  console.log(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(event.target.id);
  playSound(event.target.id);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function(){
  if (!started){
    nextSequence();
    started = true;
  }
});
