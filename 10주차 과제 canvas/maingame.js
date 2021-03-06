var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

class player {
  constructor(position_x, position_y, radius, color) {
    this.position_x = position_x;
    this.position_y = position_y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    context.beginPath();
    context.arc(this.position_x, this.position_y, this.radius, 0, 2 * Math.PI);
    context.fillStyle = this.color;
    context.fill();
  }
}

class bullet {
  constructor(posX, posY, width, height, color) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    context.beginPath();
    context.rect(this.posX, this.posY, this.width, this.height);
    context.fillStyle = this.color;
    context.fill();
  }
}

canvas.onclick = function (event) {
  const x = event.clientX - context.canvas.offsetLeft;
  const y = event.clientY - context.canvas.offsetTop;

  // context.arc(x - 15, y - 15, 30, 0, 2 * Math.PI);
  // context.arc(x - 50, y - 50, 60, 0, 2 * Math.PI);

  context.beginPath();
  context.rect(x - 15, y - 15, 30, 30);
  context.stroke();

  context.beginPath();

  context.rect(x - 50, y - 50, 30, 30);

  context.stroke();
  //   context.fill();
};

function changeColor() {
  const colorInput = document.getElementById("colorChange").value;
  document.getElementById("result").innerHTML = colorInput;
  document.getElementById("result").style.backgroundColor = colorInput;
  context.fillStyle = colorInput;
}

// function clear() {
//   location.reload(true);
// }

// function shapeChange()
// {
//     if(document.getElementById("shapeButton").value === 'circle')
//     {
//         document.getElementById("shapeButton").value = 'rectangle'
//         context.arc(x - 15,  y - 15, this.radius, 0, 2 * Math.PI);

//     }
// }

var char_player = new player(100, 100, 20, "blue");
char_player.draw();

var char_bullet = new bullet(200, 200, 50, 70, "white");
char_bullet.draw();

context.rect(15, 15, 40, 40);
context.rect(50, 50, 40, 40);
// function action_coords(event) {
//   var x1 = event.offsetX;
//   var y1 = event.offsetY;

//   var coords = "clientX: " + x1 + ", clientY: " + y1 + "<br/>";
//   document.getElementById("game").innerHTML = coords;
// }
//onclick event
//????????? ?????????????????? ??????????????? ?????? context????
