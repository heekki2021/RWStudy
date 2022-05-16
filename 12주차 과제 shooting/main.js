const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

//////////////////////////////////////////////////////////////////////////////
class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;

    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
}

const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 30, "blue"); // Player 화면 중앙 정렬
player.draw();
//////////////////////////////////////////////////////////////////////////////

class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

/////////////////////////////////////////////////////////////////////////////////

class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

/////////////////////////////////////////////////////////////////////////////////
// enemy 화면 밖에서 랜덤하게 spawn 시키기
function spawnEneies() {
  setInterval(() => {
    const radius = Math.random() * (30 - 10) + 10;

    let x;
    let y;

    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }

    const color = "green";

    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);

    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };

    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, 1000);
}

/////////////////////////////////////////////////////////////////////////////////
// 객체들을 남을 배열
const projectiles = [];
const enemies = [];

//////////////////////////////////////////////////////////////////////////////////

// 에니메이션 부분
let animationId;

function animate() {
  animationId = requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);

  player.draw();
  projectiles.forEach((projectile) => {
    projectile.update();
  });

  enemies.forEach((enemy, index) => {
    enemy.update();

    const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    // end game
    if (distance - enemy.radius - player.radius < 1) {
      cancelAnimationFrame(animationId);
    }

    projectiles.forEach((projectile, projectileIndex) => {
      const distance = Math.hypot(
        projectile.x - enemy.x,
        projectile.y - enemy.y
      );

      if (distance - enemy.radius - projectile.radius < 1) {
        if (enemy.radius - 10 > 10) {
          enemy.radius -= 10;
          setTimeout(() => {
            projectiles.splice(projectileIndex, 1);
          });
        } else {
          setTimeout(() => {
            enemies.splice(index, 1);
            projectiles.splice(projectileIndex, 1);
          });
        }
      }
    });
  });
}
/////////////////////////////////////////////////////////////////////////////////

addEventListener("click", (event) => {
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );

  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };

  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, "red", velocity)
  );
});

animate();
spawnEneies();
