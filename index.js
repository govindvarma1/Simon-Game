var buttonColors=["green", "red", "yellow", "blue"];
var gamePattern=[];
var userPattern=[];

var started=false;
var level=0;

$(document).on("keypress", function(){
    if(!started)
    {
        nextSequence();
        started=true;
    }
})

$(".btn").on("click", function(){
    var chosenColor=$(this).attr("id");
    userPattern.push(chosenColor);
    // playSound(chosenColor);
    $("#"+chosenColor).fadeOut(100).fadeIn(100);
    checkAnswer(userPattern.length-1);
})

function checkAnswer(userPatternLength)
{
    if(gamePattern[userPatternLength]==userPattern[userPatternLength])
    {
        playSound(userPattern[userPatternLength])
        if(gamePattern.length==userPattern.length)
        {
            setTimeout(function() {
                nextSequence(); 
            },1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over"); 
        $("h1").text("Game Over, Press Any key to Restart ")
        setTimeout(function(){
            $("body").removeClass("game-over");  
        },100)
        startOver();
        
    }
} 


function nextSequence()
{
    userPattern=[];
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    $("h1").text("level "+level);
    var randomChosenColor= buttonColors[randomNumber];
    console.log(randomChosenColor)
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(randomChosenColor)
{
    var sound=new Audio("./sounds/"+ randomChosenColor+".mp3");
    sound.play();  
}

function startOver()
{
    level=0;
    gamePattern=[];
    started = false;
}