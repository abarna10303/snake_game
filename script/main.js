var foodX,foodY;
let snackX=5,snackY=15,score=0;
let valacityX=0,valacityY=0;
let food,snakeLength=[];
let setIntervalID;
$(document).ready(function(){
    $('.game-over').hide();
    $('.high-score').html(`High Score ${localStorage.getItem("HightScore")}`)
    foodPosition();
    setIntervalID=setInterval(startGame,300);
    $(document).keydown(snackDerection);
});
function foodPosition(){
    foodX=Math.floor(Math.random()*30)+1;
    foodY=Math.floor(Math.random()*30)+1;
    $('.score').html(`<b>Score : ${parseInt(score)}</b>`);
}
function startGame(){
    food=`<div class="snack-food" style=grid-area:${foodY}/${foodX} ></div>`;
    if(snackX==foodX && snackY==foodY)
    {
        ++score;
        foodPosition();
        snakeLength.push([foodX,foodY]);      
    }
    for(let i=snakeLength.length-1;i>0;i--)
    {
        snakeLength[i]=snakeLength[i-1];
    }
    snakeLength[0]=[snackX,snackY];
    snackX+=valacityX;
    snackY+=valacityY;
    if(snackX<1 ||snackX>30 || snackY<1 ||snackY>30){
        gameOver();
    }
    for(i=0;i<snakeLength.length;i++)
    {
        food+=`<div class="snack" style=grid-area:${snakeLength[i][1]}/${snakeLength[i][0]}></div>`;
        if(i!==0 && snakeLength[0][0]==snakeLength[i][0] && snakeLength[0][1]==snakeLength[i][1]){
            gameOver();
        }
    }    
    $('.game-board').html(food);
}
function snackDerection(e)
{
    switch(e.key){
    case 'ArrowUp':
        if(valacityY!=1){
            valacityX=0;
            valacityY=-1;
        }     
        break;
    case 'ArrowDown':
        if(valacityY!=-1)
        {
            valacityX=0;
            valacityY=1;
        }
        break;
    case 'ArrowRight':
        if(valacityX !=-1)
        {
            valacityX=1;
            valacityY=0;
        }
        break;
    case 'ArrowLeft':
        if(valacityX!=1)
        {
            valacityX=-1;
            valacityY=0;
        }
        break;            
    }
}
 function HightScore(){
    if(!(localStorage.getItem("HightScore")))
    {
        localStorage.setItem("HightScore",0)
    }
    else if(localStorage.getItem("HightScore")<score)
    {
        localStorage.setItem("HightScore",score)
    }
 }
function gameOver()
{
        HightScore();
        clearInterval(setIntervalID);
        $('.game-over').show();
        $('#restart-game').click(function(){
            location.reload();
        })

}