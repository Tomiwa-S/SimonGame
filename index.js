var colors = ["blue","red","yellow","green"];
var gamePattern = [];
var level = 1;
var path = "./sounds/"
var extension = ".mp3";
$(document).keypress(function(){
    $(document).unbind();
    startGame();   
});
function startGame(){
    counter = 0;
    $("#level-title").text("Level "+level);
    var randomIndex = Math.floor(Math.random()*4)
    gamePattern.push(colors[randomIndex]);
    setTimeout(function(){
        playAudio(colors[randomIndex])
    },1680)
    $(".btn").click(function(event){
        var Id = $(event.target).attr("id");
        playAudio(Id);
        if(Id!==gamePattern[counter]){
            var loss = new Audio("./sounds/wrong.mp3");
            loss.play();
            $(".btn").unbind();
            endGame();
        }
        if(Id===gamePattern[counter]){
            counter++;
        }
        if(counter===level){
            $(".btn").unbind();
            nextLevel();
        }
    })
}
function nextLevel(){
    level++;
    startGame();
}
function endGame(){
    level =1;
    $("#level-title").text("Game Over, Press any key to restart");
    $(document).keypress(function(){
        $(document).unbind();
        gamePattern = [];
        startGame();   
    });
}
function playAudio(name){
    var location = path+name+extension;
    var audio = new Audio(location);
    audio.play();
    $("#"+name).addClass("pressed");
    setTimeout(function(){$("#"+name).removeClass("pressed");},200)
}