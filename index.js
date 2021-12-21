var buttonColors = ["green", "red", "yellow", "blue"];
var gameSeq = [];
var playerSeq = [];
var level = 0;
var started = false;

$("body").keypress(function(){
    if(!started){
        nextColor();
        started = true;
    }
});

$(".btn").click(function(){
    var playerColor = $(this).attr("id");
    playerSeq.push(playerColor);

    
    console.log("ps: " + playerSeq);
    

    playSound(playerColor);
    btnPressed(playerColor);

    checkColor((playerSeq.length)-1);
   
}); 

function checkColor(currentLevel){
  
    if(gameSeq[currentLevel] === playerSeq[currentLevel]){
        if(gameSeq.length === playerSeq.length){
            setTimeout(function(){
                nextColor()}, 1000);
        }
    }

    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart.");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startAgain();
    }
    
}

function nextColor(){
    playerSeq = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColors[randomNumber];
    gameSeq = gameSeq.concat(randomColor);
    console.log("gs: "+ gameSeq);
    level = gameSeq.length;
    $("h1").text("Level " + level);

    playSound(buttonColors[randomNumber]);
    $("#" + buttonColors[randomNumber]).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(name){
    var music = new Audio("sounds/" + name + ".mp3");
    music.play();
}

function btnPressed(buttonColor){
    $("." + buttonColor).addClass("pressed");
    setTimeout(function() {
        $("." + buttonColor).removeClass("pressed");
    }, 100);
}

function startAgain(){
    started = false;
    gameSeq = [];
    level = 0;
}
const fs = require("fs");