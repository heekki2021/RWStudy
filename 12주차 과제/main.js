var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "skyblue";

var dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,

  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};
dino.draw();

////////////////////////////////

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 25;
  }
  draw() {
    ctx.fillStyle = "blue";
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();
  }
}

///////////////////////////////////////

class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocitiy = velocity;
    b;
  }

  draw() {
    ctx.biginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

///////////////////////////////////////

class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
// var cactus = new Cactus();
// cactus.draw();

var count = 0;
var cactusArray = [];
var jumptimer = 0;
var animation;
const x = canvas.width / 2;
const y = canvas.height / 2;

function animationF() {
  animation = requestAnimationFrame(animationF);

  count++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var player = new Player(x, y);
  player.draw();

  if (count % 240 === 0) {
    var cactus = new Cactus();
    cactusArray.push(cactus);
  }
  cactusArray.forEach((a, i, o) => {
    if (a.x < 0) {
      o.splice(i, 1);
    }
    a.x--;

    collisionCheck(dino, a);
    a.draw();
  });

  if (jumping == true) {
    dino.y -= 3;
    jumptimer++;
  }
  if (jumping == false) {
    if (dino.y < 200) {
      dino.y += 3;
    }
  }
  if (jumptimer > 60) {
    jumping = false;
    jumptimer = 0;
  }

  dino.draw();
}

animationF();

//충돌 확인

function collisionCheck(dino, cactus) {
  var xgap = cactus.x - (dino.x + dino.width);
  var ygap = cactus.y - (dino.y + dino.height);
  if (xgap < 0 && ygap < 0) {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  }
}

var jumping = false;

document.addEventListener("keydown", function (e) {
  if (e.code === "Space" && dino.y == 200) {
    jumping = true;
  }
});

// canvas.onclick = function (event) {
//   const x = event.clientX - ctx.canvas.offsetLeft;
//   const y = event.clientY - ctx.canvas.offsetTop;

//   var bullet = new Bullet(x, y);

//   context.arc(x - 15, y - 15, 30, 0, 2 * Math.PI);
//   context.arc(x - 50, y - 50, 60, 0, 2 * Math.PI);

//   context.beginPath();
//   context.rect(x - 15, y - 15, 30, 30);
//   context.stroke();

//   context.beginPath();

//   context.rect(x - 50, y - 50, 30, 30);

//   context.stroke();
//     context.fill();
// };
