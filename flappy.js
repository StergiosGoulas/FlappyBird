const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const birdSprites = new Image();
birdSprites.src = "../images/bird.png";

let upPipe = new Image();
upPipe.src = "../images/pipesUp.png";

let downPipe = new Image();
downPipe.src = "../images/pipesDown.png";

const bgImage = new Image();
bgImage.src = "../images/bg.png";

const bird = {
  x: 50,
  y: 300,
  width: 49,
  height: 50,
  grav: 1,
  jump: -10,
  currentFrame: 0
};

const pipes = [];
let score = 0;

function update() {
  bird.currentFrame = (bird.currentFrame + 1) % 3;  //allagh eikonas ka8e 3 frames
  bird.y += bird.grav;
  bird.grav += 0.5;

  if (bird.y > canvas.height - bird.height) {
    bird.y = canvas.height - bird.height;
    bird.grav = 0;
  }

  if (bird.y < 0) {
    bird.y = 0;
    bird.grav = 0;
  }

  if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 100) {
    pipes.push({
      x: canvas.width + 400,
      y: Math.floor(Math.random() * (canvas.height - 200)) + 50,
      width: 51,
      height: 200  //to keno anamesa sto upPipe kai to downPipe
    });
  }

  for (let i = 0; i < pipes.length; i++) {
    pipes[i].x -= 2;

    if (pipes[i].x + pipes[i].width < 0) {
      pipes.shift();
      score++;
    }

    if ((bird.x + bird.width >= pipes[i].x && bird.x <= pipes[i].x + pipes[i].width) && (bird.y <= pipes[i].y || bird.y + bird.height >= pipes[i].y + pipes[i].height)) {
      document.location.reload();
    }

  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

  ctx.drawImage(birdSprites, bird.currentFrame * bird.width, 0, bird.width, bird.height,bird.x, bird.y, bird.width, bird.height);

  for (let i = 0; i < pipes.length; i++) {
    ctx.drawImage(upPipe, pipes[i].x, pipes[i].y + pipes[i].height, pipes[i].width, canvas.height);
    ctx.drawImage(downPipe, pipes[i].x, 0, pipes[i].width, pipes[i].y);
  }

  ctx.fillStyle = "black";
  ctx.font = "20px sans-serif";
  ctx.fillText("Score: " + score, 10, 20);
}

setInterval(() => {
  update();
  draw();
}, 16);

document.onkeydown = function (e) {
  if (e.code === "ArrowUp") {
    bird.grav = bird.jump;
  }
};