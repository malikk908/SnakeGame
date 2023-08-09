let speed = 5;
let score = 0;
let lastPaintTime = 0;

let inputDir = { x: 0, y: 0 }
let lastInputDir = { x: 0, y: 0 } 





let snakeArr = [
    { x: 18, y: 5 }

]

let food = { x: 10, y: 10 }

function main(ctime) {

    window.requestAnimationFrame(main)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime
    gameEngine();

}

function isCollide(sarr) {
    // if you bump into yourself
    for (let i = 1; i < sarr.length; i++) {
        if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y){
            return true;
        }
           
    }
    // if you bump into wall
    if (sarr[0].x >= 21 || sarr[0].x <= 0 || sarr[0].y >= 21 || sarr[0].y <= 0 ) {
        return true;
    }
}





function gameEngine() {
    //Part 1: Updating the sname array and food
    if (isCollide(snakeArr)) {
        inputDir = { x: 0, y: 0 }
        alert("Game Over, press any key to play again")
        snakeArr = [{ x: 20, y: 5 }]
        score = 0;

    }

    //if you have eaten the food, increment the score and regenrate the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        if(snakeArr.length > 4){
            speed = 8
        }
        if(snakeArr.length > 5){
            speed = 10
        }
        if(snakeArr.length > 8){
            speed = 13
        }

        let a = 2;
        let b = 19;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //Moving the snake
    lastInputDir = inputDir
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };

    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    //Part 2: Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head')

        } else {
            snakeElement.classList.add('snake')


        }
        board.appendChild(snakeElement)

    })
    //Part 2: Display the food


    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)



}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    //Start the game
    switch (e.key) {
        
        case "ArrowUp":
            if(lastInputDir.y !== 0) break
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            if(lastInputDir.y !== 0) break
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            if(lastInputDir.x !== 0) break
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            if(lastInputDir.x !== 0) break
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }

})