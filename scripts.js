const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const grid = 20;
let snake = [{ x: 160, y: 160 }];
let dx = grid;
let dy = 0;
let food = {
    x: Math.floor(Math.random() * 20) * grid,
    y: Math.floor(Math.random() * 20) * grid
};

// ---- Efek Suara (tanpa file) ----
function playSoundEat() {
    let audio = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audio.createOscillator();
    oscillator.frequency.value = 700;
    oscillator.connect(audio.destination);
    oscillator.start();
    oscillator.stop(audio.currentTime + 0.1);
}

function playSoundGameOver() {
    let audio = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audio.createOscillator();
    oscillator.frequency.value = 200;
    oscillator.connect(audio.destination);
    oscillator.start();
    oscillator.stop(audio.currentTime + 0.3);
}

// ---------------------------------

function gameLoop() {
    requestAnimationFrame(gameLoop);

    if (++temp % 6 !== 0) return; 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let head = { x: snake[0].x + dx, y: snake[0].y + dy };

    head.x = (head.x + canvas.width) % canvas.width;
    head.y = (head.y + canvas.height) % canvas.height;

    snake.unshift(head);

    // Jika makan makanan
    if (head.x === food.x && head.y === food.y) {
        playSoundEat(); // 🔊 Bunyi makan
        food.x = Math.floor(Math.random() * 20) * grid;
        food.y = Math.floor(Math.random() * 20) * grid;
    } else {
        snake.pop();
    }

    // Jika menabrak diri sendiri
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            playSoundGameOver(); // 🔊 Bunyi Game Over
            snake = [{ x: 160, y: 160 }];
            dx = grid;
            dy = 0;
        }
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, grid - 2, grid - 2);

    ctx.fillStyle = "lime";
    snake.forEach(s => ctx.fillRect(s.x, s.y, grid - 2, grid - 2));
}

let temp = 0;
requestAnimationFrame(gameLoop);

document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && dy === 0) {
        dx = 0; dy = -grid;
    } else if (e.key === "ArrowDown" && dy === 0) {
        dx = 0; dy = grid;
    } else if (e.key === "ArrowLeft" && dx =
