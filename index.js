var buttonColours = ["blue", "green", "yellow", "red"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started=false;

$(document).keypress(function(){
  if(!started){
    $("h1").text("Level "+level);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  var currentLevel=userClickedPattern.length;
  checkAnswer(currentLevel-1);
  
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]!==gamePattern[currentLevel]){
    gameOver();
  }
  else {
    if(currentLevel===level-1){
      setTimeout(function(){nextSequence()},1000);
    }
  }
}

function nextSequence() {
  userClickedPattern=[];

  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function gameOver(){
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");

  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  
  //reset game
  level=0;
  gamePattern=[];
  started=false;
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100);
}