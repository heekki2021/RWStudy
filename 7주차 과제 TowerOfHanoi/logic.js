function buttonClick() {
  document.getElementById("black").innerHTML = "◼";
  document.getElementById("purple").innerHTML = "◼︎◼︎◼︎";
  document.getElementById("blue").innerHTML = "◼︎◼︎◼︎◼︎◼︎";
  document.getElementById("green").innerHTML = "◼︎◼︎◼︎◼︎◼︎◼︎◼︎";
  document.getElementById("yellow").innerHTML = "◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎";
  document.getElementById("red").innerHTML = "◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎";
}

function box1Selected() {
  document.getElementById("box1").style.border = "10px solid red";
  var status = true;

  while (status) {
    if (
      document.getElementById("box2").addEventListener("click", function () {
        this.getElementById("box2").style.border = "10px solid blue";
      })
    ) {
      status = false;
    } else if (
      document.getElementById("box3").addEventListener("click", function () {
        this.getElementById("box3").style.border = "10px solid blue";
      })
    ) {
      status = false;
    }
  }
}

function box2Selected() {
  document.getElementById("box2").style.border = "10px solid red";
}

function box3Selected() {
  document.getElementById("box3").style.border = "10px solid red";
}
