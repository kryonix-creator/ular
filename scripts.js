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

function gameLoop() {
    requestAnimationFrame(gameLoop);

    if (++temp % 6 !== 0) return; // kontrol kecepatan
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // jika keluar batas → muncul di sisi lain (optional)
    head.x = (head.x + canvas.width) % canvas.width;
    head.y = (head.y + canvas.height) % canvas.height;

    snake.unshift(head);

    // jika makan
    if (head.x === food.x && head.y === food.y) {
        food.x = Math.floor(Math.random() * 20) * grid;
        food.y = Math.floor(Math.random() * 20) * grid;
    } else {
        snake.pop();
    }

    // jika menabrak badan sendiri → reset
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            snake = [{ x: 160, y: 160 }];
            dx = grid; 
            dy = 0;
        }
    }

    // gambar makanan
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, grid - 2, grid - 2);

    // gambar ular
    ctx.fillStyle = "lime";
    snake.forEach(s => ctx.fillRect(s.x, s.y, grid - 2, grid - 2));
}

let temp = 0;
requestAnimationFrame(gameLoop);

// kontrol arah
document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && dy === 0) {
        dx = 0; dy = -grid;
    } else if (e.key === "ArrowDown" && dy === 0) {
        dx = 0; dy = grid;
    } else if (e.key === "ArrowLeft" && dx === 0) {
        dx = -grid; dy = 0;
    } else if (e.key === "ArrowRight" && dx === 0) {
        dx = grid; dy = 0;
    }
});
