//Game constants & variables
let inputDir = { x: 0, y: 0 }
const foodSound = new Audio('food.mp3')
const gameOverSound = new Audio('gameover.mp3')
const moveSound = new Audio('move.mp3')
let PlayBtn = document.getElementById("PlayBtn")
let soundBtn = document.getElementById("soundBtn")
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]

food = { x: 6, y: 7 };

// Game Functions


    function main(ctime) {
        window.requestAnimationFrame(main);
        // console.log(ctime)
        if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
            return;
        }
        lastPaintTime = ctime;
    
    
        gameEngine();
    
    }
    


function isCollide(snake) {
    // if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // if you bump into wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {

        return true;
    }

    return false;

}





function gameEngine() {
    // PART 1: UPDATING THE SNAKE ARRAY
    if (isCollide(snakeArr)) {
        if(soundBtn.innerHTML === 'OFF'){

            gameOverSound.play();
        }


        inputDir = { x: 0, y: 0 }
        alert("Game Over. Press any key to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
        speed = 5;

    }

    

    // if you have eaten the food , increament the score and regenrate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        
        if(soundBtn.innerHTML === 'OFF'){

            foodSound.play();
        }

        score += 1
        speed += 0.4
        // console.log(speed);

        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }

        scoreBox.innerHTML = "Score : " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        
    }

   
    
    //moving the snake
  
        if(PlayBtn.innerHTML === 'Pause'){

            for (let i = snakeArr.length - 2; i >= 0; i--) {
                snakeArr[i + 1] = { ...snakeArr[i] };
        
            }
            snakeArr[0].x += inputDir.x;
            snakeArr[0].y += inputDir.y;
        }
    
    


    //PART 2: DISPLAY THE SNAKE
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {

            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    })
    // DISPLAY THE FOOD
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
    
    
    
}



let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}


// main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } // START THE GAME

    if(soundBtn.innerHTML === 'OFF'){

        moveSound.play();
    }

    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            // console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            // console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            // console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})




PlayBtn.addEventListener('click', () => {
    


    if (PlayBtn.innerHTML === "Pause") {
        PlayBtn.innerHTML = "Play"
    }
    else {
        PlayBtn.innerHTML = "Pause"
    }
})

soundBtn.addEventListener('click', () => {
    


    if (soundBtn.innerHTML === "OFF") {
        soundBtn.innerHTML = "ON"
    }
    else {
        soundBtn.innerHTML = "OFF"
    }
})

