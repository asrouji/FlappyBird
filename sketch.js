const PIPE_COUNT = 3
const GRAVITY = 0.2
const JUMP_SPEED = 5
let score = 0
let lives = 3

class Bird {
  constructor() {
    this.x = 70
    this.y = 100
    this.diameter = 35
    this.speed = 3
  }
  draw() {
    fill('orange')
    strokeWeight(2)
    circle(this.x, this.y, this.diameter)
  }
  move() {
    if (this.y >= 600 - this.diameter / 2) gameOver()
    this.y += this.speed
    this.speed += GRAVITY
    if (this.y < 0) this.y = 0
  }
}

class Pipe {
  constructor() {
    this.x = 0
    this.gapSize = 125
    this.gapHeight = random(20, 600 - this.gapSize - 20)
    this.width = 50
    this.collided = false
  }
  draw() {
    fill(this.collision() ? 'red' : 'green')
    rect(this.x, 0, this.width, this.gapHeight)
    rect(this.x, this.gapHeight + this.gapSize, this.width, 600)
  }
  move() {
    if (this.x < -this.width) {
      this.x = 400
      this.gapHeight = random(50, 600 - this.gapSize)
      this.collided = false
    } else {
      this.x -= 2
    }
    if (this.x === bird.x) score++
    if (this.collision() && !this.collided) {
      lives -= 1
      this.collided = true
      if (lives <= 0) gameOver()
    }
  }
  collision() {
    if (collideRectCircle(this.x, 0, this.width, this.gapHeight, bird.x, bird.y, bird.diameter)
      || collideRectCircle(this.x, this.gapHeight + this.gapSize, this.width, 600, bird.x, bird.y, bird.diameter)) {
      return true
    }
    return false
  }
}

const bird = new Bird()
const pipes = []

function setup() {
  createCanvas(400, 600)
  while (pipes.length < PIPE_COUNT) {
    pipes.push(new Pipe)
  }
  for (let i = 0; i < pipes.length; i++) {
    pipes[i].x = width / 2 + width / i
  }
}

function draw() {
  background('skyblue')
  for (pipe of pipes) {
    pipe.draw()
    pipe.move()
  }
  bird.draw()
  bird.move()
  drawStats()
}

function drawStats() {
  fill('black')
  textFont('Impact')
  textSize(20)
  text('Lives Remaining: ' + lives, 20, 40)
  text('Score: ' + score, 20, 70)
}

function keyPressed() {
  if (keyCode === 32) {
    bird.speed = -JUMP_SPEED
  }
}

function gameOver() {
  lives = 0
  fill('red')
  textFont('Impact')
  textSize(60)
  text('GAME OVER', width / 2 - 130, height / 2)
  noLoop()
}