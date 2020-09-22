var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//2. Create a new variable called level and start at level 0.
var level = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(".clickme").click(function(event) {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  if(started==true){
      animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  }
});

function nextSequence() {

  //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log("gamePattern "+gamePattern);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
var i = 0;

function checkAnswer(currentLevel) {
  console.log("success" + i + gamePattern.length+currentLevel);
//  if (currentLevel >= gamePattern.length - 1) {

    if (userClickedPattern[currentLevel] === gamePattern[i]) {

      if(gamePattern.length-1==i){
      setTimeout(function() {
        this.nextSequence();
      }, 1000);
      userClickedPattern=[];
      i=-1;
    }

      console.log("success," + i +",gamePattern"+ gamePattern+",userClickedPattern"+ userClickedPattern);
      i++;
    } else {
      console.log("wrong"+userClickedPattern);
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      playSound("wrong");
      $("h1").text("Game Over, Press Click Me to Restart");

      startOver();
    }

}

function startOver(){
  level = 0;
  gamePattern=[];
  started=false;
}
