let inputDir = {x:0, y:0};
const foodsound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    {x :13, y:15 }
]
let food = {x:6, y:7}
let score = 0;

//Game Functions

function displayRadioValue(value){
	if(value =="Easy")
		speed = 5;
	if(value =="Midium")
		speed = 10;
	if(value =="Hard")
		speed = 15;
            }

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    for (let i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        return true;
    }
    if (snake[0].x >=18 || snake[0].x<=0 || snake[0].y >=18 || snake[0].y<=0) {
        return true;
    }
      
}

function gameEngine(){
    //Part 1: Updating the Snake array
    // musicSound.play();

    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0, y:0}
        alert("Game Over, Press any key to play again.")
        snakeArr = [{x:13, y:15}]
        musicSound.play();
        score = 0;
    }
    // If you have eaten the food increment the score and regenerate the food.

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodsound.play();
        score += 1;
        scoreBox.innerHTML = "Score : "+ score;
        if(score > hiscoreval){
            hiscoreval = score
            localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
            hiScoreBox.innerHTML = "High Score : "+hiscoreval;
        }
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y :snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
    }

    //Moving the snake 
    for (let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    } 
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    
    
    //Part 2: Display the snake and food
    // Display the snake
board.innerHTML="";
snakeArr.forEach((e,index)=>{  
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x; 
    if(index === 0){
        snakeElement.classList.add('head');
    }
    else {
        snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement)
});

// Display the food
foodElement = document.createElement('div');
foodElement.style.gridRowStart = food.y;
foodElement.style.gridColumnStart = food.x;
foodElement.classList.add('food')
board.appendChild(foodElement)

}



// main logics

let hiscore = localStorage.getItem('hiscore');
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiScoreBox.innerHTML = "High Score : "+ hiscore;
}


window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir = {x:0,y:1}
    moveSound.play();
    switch(e.which){
        case 38:
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y=-1;
            break;

        case 40:
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;
            
        case 37:
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;

        case 39:
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
            break;
        // case 32:
        // console.log("Space");
        // gamePause();
        
        default:
  			ctime = 0;
            break;
                
    }
});