const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const resolution = 10;
canvas.width = 400;
canvas.height = 400;

class Snake {
  constructor() {
    this.snake = [{ x: 200, y: 200 }];
    this.direction = 'right';
    this.food = { x: 300, y: 300 };
    this.started = false;
    this.dead = false;
  }

  draw() {
    const { snake, food } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    snake.forEach(({ x, y }) => ctx.fillRect(x, y, resolution, resolution));
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, resolution, resolution);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  }

  update() {
    if (!this.started || this.dead) return;
    const head = { ...this.snake[0] };
    switch (this.direction) {
      case 'right': head.x += resolution; break;
      case 'left': head.x -= resolution; break;
      case 'up': head.y -= resolution; break;
      case 'down': head.y += resolution; break;
    }
    if (this.isCollision(head)) {
      this.dead = true;
      return;
    }
    this.snake.unshift(head);
    if (this.isFoodEaten(head)) {
      this.generateFood();
    } else {
      this.snake.pop();
    }
  }

  isCollision(head) {
    return (
      head.x < 0 || head.x >= canvas.width ||
      head.y < 0 || head.y >= canvas.height ||
      this.snake.some(cell => cell.x === head.x && cell.y === head.y)
    );
  }

  isFoodEaten(head) {
    return head.x === this.food.x && head.y === this.food.y;
  }

  generateFood() {
    this.food.x = Math.floor(Math.random() * canvas.width / resolution) * resolution;
    this.food.y = Math.floor(Math.random() * canvas.height / resolution) * resolution;
  }

  reset() {
    this.snake = [{ x: 200, y: 200 }];
    this.direction = 'right';
    this.food = { x: 300, y: 300 };
    this.started = false;
    this.dead = false;
  }
}

const snake = new Snake();

window.setInterval(() => {
  snake.update();
  snake.draw();
}, 100);

window.addEventListener('keydown', e => {
  snake.started = true;
  switch (e.key) {
    case 'ArrowLeft':
    case 'a': snake.direction = 'left'; break;
    case 'ArrowRight':
    case 'd': snake.direction = 'right'; break;
    case 'ArrowUp':
    case 'w': snake.direction = 'up'; break;
    case 'ArrowDown':
    case 's': snake.direction = 'down'; break;
  }
});

document.querySelector('#play').addEventListener('click', () => {
  document.querySelector('#menu').style.display = 'none';
  canvas.style.display = 'block';
  snake.reset();
});

document.querySelector('#dont-play').addEventListener('click', () => {});

window.setInterval(() => {
  if (snake.dead) {
    document.querySelector('#menu').style.display = 'block';
    canvas.style.display = 'none';
  }
}, 100);