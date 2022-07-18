var button = ['green', 'red', 'yellow', 'blue'];
var gamePattern = [];

var userClickedPattern = [];

//当前关卡
var level = 0;

var begin = false;

//#玩家点击按钮
$('.btn').click(function () {

  if (begin == false) return;

  //1.获取点击的是哪个按钮
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);


  //2.判断是否正确
  if (userChosenColor == gamePattern[userClickedPattern.length - 1]) {

    playSound(userChosenColor);
    animatePress(userChosenColor);
    //console.log(userClickedPattern);
    //console.log("right");

    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 200);
    }


  } else {
    //错误
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");

    }, 150);

    var audio = new Audio("sounds/wrong.mp3");
    audio.play()
    //console.log("wrong");
    gameOver();
  }

});



$(document).keypress(function (event) {

  beginGame();
});

$('#start').click(beginGame);

function beginGame() {
  if (level == 0) {
    begin = true;
    //开始游戏
    
    $('#start').addClass("pressed");
    setTimeout(function () {
      $('#start').removeClass("pressed");
      $('#start').hide();
    }, 100);

   
      nextSequence();
    
  
  }

}


function gameOver() {
  $('h1').text("Simon")
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  $('#start').show();
  begin = false;
}

function nextSequence() {

  if(begin==false)return;
  //清空玩家选择
  userClickedPattern = [];


  //随机数
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = button[randomNumber];
  gamePattern.push(randomChosenColour);

  //改变level标题
  level++;
  $('h1').text("Level " + level);

  setTimeout(() => {
    //显示下一个
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //console.log("下一关");
  playSound(randomChosenColour);
  }, 500);
 
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");

  }, 100);
}

$('h1').slideUp(1).slideDown(800)
$("#description").fadeOut(1).fadeIn(1500);
$('#green').fadeOut(1).delay(500).fadeIn(1500);
$('#red').fadeOut(1).delay(1000).fadeIn(1500);
$('#yellow').fadeOut(1).delay(1500).fadeIn(1500);
$('#blue').fadeOut(1).delay(2000).fadeIn(1500);
$('#start').fadeOut(1).delay(2500).fadeIn(1500);
$('.foot').fadeOut(1).delay(3000).fadeIn(1500);