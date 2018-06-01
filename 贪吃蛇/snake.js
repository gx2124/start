//点击开始游戏--startPage消失--游戏开始
// 随机出现食物，出现三节蛇身开始运动
// 上下左右键--改变方向
// 判断是否吃到食物--食物消失，蛇身+1
// 判断撞墙/吃到自己--游戏结束--弹出分
var scoreBox = document.getElementById('score');
var content = document.getElementById('content');
var startPage = document.getElementById('startPage');
var lose = document.getElementById('lose');
var loseScore = document.getElementById('loseScore');
var closeBtn = document.getElementById('close');
var go = document.getElementById('go');
var startBtn = document.getElementById('startBtn');
var startGameBool = true;
var startPauseBool = true;
var snakeMove;
var speed = 300;

init();

//初始化参数：
function init() {
    //map
    this.mapWidth = parseInt(getComputedStyle(content).width);
    this.mapHeight = parseInt(getComputedStyle(content).height);
    this.mapDiv = content;
    //food
    this.foodWidth = 20;
    this.foodHeight = 20;
    this.foodX = 0;
    this.foodY = 0;
    this.foodColor = '#00F';
    //蛇--数组：每一位存一节
    this.snake;
    this.snakeWidth = 20;
    this.snakeHeight = 20;
    this.snakeBody = [[3, 1, 'head'], [2, 1, 'body'], [1, 1, 'body']];
    //游戏属性：
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    //分数：
    this.score = 0;
    scoreBox.innerHTML = this.score;
    bindEvent();

}

//开始游戏按钮：
function startGame() {
    startPage.style.display = "none";
    go.style.display = "block";
    food();
    snake();
}

function food() {
    var food = document.createElement('div');
    food.style.width = this.foodWidth + 'px';
    food.style.height = this.foodHeight + 'px';
    food.style.position = 'absolute';
    this.foodX = Math.floor(Math.random() * (this.mapWidth / this.foodWidth));
    this.foodY = Math.floor(Math.random() * (this.mapHeight / this.foodHeight));

    food.style.left = this.foodX * this.foodWidth + 'px';
    food.style.top = this.foodY * this.foodHeight + 'px';

    food.style.position = "absolute";
    this.mapDiv.appendChild(food).setAttribute('class', 'food');
}

function snake() {
    for (var i = 0; i < this.snakeBody.length; i++) {
        var snake = document.createElement('div');
        snake.style.width = this.snakeWidth + 'px';
        snake.style.height = this.snakeHeight + 'px';
        snake.style.borderRadius = "50%";
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
        switch (this.direct) {
            case 'right':
                break;
            case 'left':
                snake.style.transform = 'rotate(180deg)';
                break;
            case 'up':
                snake.style.transform = 'rotate(270deg)';
                break;
            case 'down':
                snake.style.transform = 'rotate(90deg)';
                break;
            default:
                break;
        }
    }
}

function move() {
    //蛇身位置
    for (var i = this.snakeBody.length - 1; i > 0; i--) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    // 蛇头位置：
    switch (this.direct) {
        case 'right':
            this.snakeBody[0][0] += 1;
            break;
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        case 'up':
            this.snakeBody[0][1] -= 1;
            break;
        case 'down':
            this.snakeBody[0][1] += 1;
            break;
        default:
            break;
    }
    //删除之前蛇的节点，重新渲染：
    removeClass('snake');
    snake();
    // 如果蛇头和食物的x、y都相等，则吃到食物：
    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
        switch (this.direct) {
            case 'right':
                this.snakeBody.push([snakeEndX + 1, snakeEndY, 'body']);
                break;
            case 'left':
                this.snakeBody.push([snakeEndX - 1, snakeEndY, 'body']);
                break;
            case 'up':
                this.snakeBody.push([snakeEndX, snakeEndY - 1, 'body']);
                break;
            case 'down':
                this.snakeBody.push([snakeEndX, snakeEndY + 1, 'body']);
                break;
            default:
                break;
        }
        this.score += 1;
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food();
    }
    // 撞到边界：
    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapWidth / this.snakeHeight) {
        this.reloadGame();
       
    }
    if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapHeight / this.snakeWidth) {
        this.reloadGame();
      
    }
    var snakeHeightX = this.snakeBody[0][0];
    var snakeHeightY = this.snakeBody[0][1];
    for (var i = 1; i < this.snakeBody.length; i++) {
        var snakeBodyX = this.snakeBody[i][0];
        var snakeBodyY = this.snakeBody[i][1];
        if (snakeHeightX == snakeBody[i][0] && snakeHeightY == snakeBody[i][1]) {
            this.reloadGame();
        }
    }
}

//重新开始：
function reloadGame() {
    removeClass('snake');
    removeClass('food');
    clearInterval(snakeMove);
    go.setAttribute('src', 'img/go.png');
    this.snakeBody = [[3, 1, 'head'], [2, 1, 'body'], [1, 1, 'body']];
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    startGameBool = true;
    startPauseBool = true;
    lose.style.display = 'block';
    loseScore.innerHTML = this.score;
    this.score = 0;
    scoreBox.innerHTML = this.score;
}

function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}

// 控制蛇的方向：
function setDerict(code) {
    switch (code) {
        case 37:
            if (this.left) {
                this.direct = 'left';
                this.left = false;
                this.right = true;
                this.up = true;
                this.down = true;
            }
            break;
        case 39:
            if (this.right) {
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if (this.up) {
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 40:
            if (this.down) {
                this.direct = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        default:
            break;
    }
}

function bindEvent() {
    closeBtn.onclick = function () {
        lose.style.display = 'none';
    }
    startBtn.onclick = function () {
        startAndPauseGame();
    }
    go.onclick = function () {
        startAndPauseGame();
    }
}

//暂停和开始：
function startAndPauseGame() {
    if (startPauseBool) {
        if (startGameBool) {
            startGame();
            startGameBool = false;
        }
        go.setAttribute('src', 'img/pause.png');
        snakeMove = setInterval(function () {
            move();
        }, speed);
        document.onkeydown = function (e) {
            var code = e.keyCode;
            setDerict(code);
        };
        startPauseBool = false;
    } else {
        //暂停：
        go.setAttribute('src', 'img/go.png');
        clearInterval(snakeMove);   
        document.onkeydown = function (e) {
            e.returnValue = false;
            return false;
        }
        startPauseBool = true;
    }
}

