var canvas;
var ctx;
var FPS = 50;

var sideSquare = 50;

var wall = "#044f14";
var door = "#3a1700";
var earth = "#c6892f";
var key = "#c6bc00";

var stage = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
  [0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 0, 0],
  [0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 2, 0],
  [0, 2, 2, 2, 0, 0, 2, 0, 0, 1, 0, 0, 0, 2, 0],
  [0, 2, 2, 3, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function drawStage() {
  var color;

  for (y = 0; y < 10; y++) {
    for (x = 0; x < 15; x++) {
      switch (stage[y][x]) {
        case 1:
          color = door;
          break;

        case 2:
          color = earth;
          break;

        case 3:
          color = key;
          break;

        default:
          color = wall;
          break;
      }

      ctx.fillStyle = color;
      ctx.fillRect(x * sideSquare, y * sideSquare, sideSquare, sideSquare);
    }
  }
}

function initialize() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  //LECTURA DEL TECLADO
  document.addEventListener("keydown", (key) => {
    if (key.keyCode === 37 && keyUp.key37) {
      protagonist.left();
      keyUp.key37 = false;
    }

    if (key.keyCode === 38 && keyUp.key38) {
      protagonist.up();
      keyUp.key38 = false;
    }

    if (key.keyCode === 39 && keyUp.key39) {
      protagonist.right();
      keyUp.key39 = false;
    }

    if (key.keyCode === 40 && keyUp.key40) {
      protagonist.down();
      keyUp.key40 = false;
    }
  });

  setInterval(() => principal(), 1000 / FPS);
}

function deleteCanvas() {
  canvas.width = 750;
  canvas.height = 500;
}

function principal() {
  deleteCanvas();
  drawStage();
}
