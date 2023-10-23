var MyCanvas = document.getElementById("MyCanvas");
var canvas = MyCanvas.getContext("2d");
var board_score = document.getElementById("Score");


const ranNumber = 13;
var Score = 0;

const color_playground = ["#555555", "#777777"];
const color_snake = ["#66FF00", "#33FFFF"];

var head = {
    X: 100,
    Y: 50,
    SIZE_WIDTH: 20,
    SIZE_HEIGHT: 10,
}

var Vector = {
    X: 1,
    Y: 0
}

var food = {
    X: getRandomInt(ranNumber, head.SIZE_WIDTH),
    Y: getRandomInt(ranNumber, head.SIZE_HEIGHT),
    color: "red"
}

var Body = [];
var i = 0, k =0, m =0, n = 0;


function getRandomInt(Max, SIZE) {
    return Math.floor(Math.random() * Max) * SIZE; 
}



function Push_Body() {
    Body.push([head.X, head.Y]);
}
function Update_body() {
    Body.shift();
}

function Draw_body() {
    while(i < Body.length) {
        i++;    
        canvas.fillStyle = color_snake[0];
        canvas.fillRect(Body[i-1][0], Body[i-1][1], head.SIZE_WIDTH, head.SIZE_HEIGHT);
    }
    i = 0;
}

function Draw__(color) {
    canvas.fillStyle = color;
    canvas.fillRect(n*20, m*10, head.SIZE_WIDTH, head.SIZE_HEIGHT);
}


function Draw_Playground() {
    while(m < 15) {
        if(m%2 == 0){
            for(n = 0; n < 16; n++) {
                if(n%2 == 0) {
                    Draw__(color_playground[0]);
                } else {
                    Draw__(color_playground[1]);
                }
            }
        } else {
            for(n = 0; n < 16; n++) {
                if(n%2 == 0) {
                    Draw__(color_playground[1]);
                } else {
                    Draw__(color_playground[0]);
                }
            }
        }
        m++;
    }
    m = 0;
}


function Draw_food() {
    canvas.fillStyle = food.color;
    canvas.fillRect(food.X, food.Y, 20, 10);
}
function Snake_head() {
    canvas.fillStyle = color_snake[1];
    canvas.fillRect(head.X, head.Y, head.SIZE_WIDTH, head.SIZE_HEIGHT);

}


function Game_over() {
    while(k < Body.length) {
        k++;
        if(head.X == Body[k-1][0] && head.Y == Body[k-1][1]) {
            location.reload()
        }

    }
    k = 0;
}


function Draw() {
    Draw_Playground();
    Draw_food();
    Snake_head();
    Draw_body();
    Game_over();
}

function Update() {
    canvas.clearRect(0, 0, 460, 460);

    if (head.X == food.X && head.Y == food.Y)  {
        food.X = getRandomInt(ranNumber, head.SIZE_WIDTH);
        food.Y = getRandomInt(ranNumber, head.SIZE_HEIGHT);
        Score += 1;
        board_score.textContent = "Score: " + Score;

        Push_Body();
    } else {
        Update_body();
        Push_Body();
    }

    if (head.X == 280 && Vector.X == 1) {
        head.X = -20;
    }
    if (head.X == 0 && Vector.X == -1) {
        head.X = 300;
    }
        
    if (head.Y == 140 && Vector.Y == 1) {
        head.Y = -10;
    }
    if (head.Y == 0 && Vector.Y == -1) {
        head.Y = 150;
    }

    head.X += 20*Vector.X;
    head.Y += 10* Vector.Y;

    Draw();
}


document.onkeydown = 
    function (event) {
        switch (event.keyCode){
            case 38:
                if(Vector.Y != -1 && Vector.Y != 1){
                    Vector.Y = -1;
                    Vector.X = 0;
                    //UP_ARROW
                }
                break;

            case 40:
                if(Vector.Y != 1 && Vector.Y != -1){
                    Vector.Y = 1;
                    Vector.X = 0;
                    //DOWN_ARROW
                }
                break;

            case 37:
                if(Vector.X != -1 && Vector.X != 1){
                    Vector.Y = 0;
                    Vector.X = -1;
                    //LEFT_ARROW
                }
                break;

            case 39:
                if(Vector.X != 1 && Vector.X != -1){
                    Vector.Y = 0;
                    Vector.X = 1;
                    //RIGHT_ARROW
                }
                break;
        }
    }

setInterval(Update, 100);