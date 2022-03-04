var canvas;
var ctx;
var FPS = 50;

var sideSquare = 50;

var wall = "#044f14";
var door = "#3a1700";
var earth = "#c6892f";
var key = "#c6bc00";

var protagonist;

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

//OBJETO player
var player = function () {
  this.x = 1;
  this.y = 1;

  this.key = false;

  this.color = "#820c01";

  this.draw = () => {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.x * sideSquare,
      this.y * sideSquare,
      sideSquare,
      sideSquare
    );
  };

  this.margin = (x, y) => stage[y][x] === 0;

  this.up = () => {
    if (this.margin(this.x, this.y - 1) === false) {
      this.y--;
      this.objectLogic();
    }
  };

  this.down = () => {
    if (this.margin(this.x, this.y + 1) === false) {
      this.y++;
      this.objectLogic();
    }
  };

  this.left = () => {
    if (this.margin(this.x - 1, this.y) === false) {
      this.x--;
      this.objectLogic();
    }
  };

  this.right = () => {
    if (this.margin(this.x + 1, this.y) === false) {
      this.x++;
      this.objectLogic();
    }
  };

  this.objectLogic = () => {
    let object = stage[this.y][this.x];

    if (object === 3) {
      this.key = true;
      stage[this.y][this.x] = 2;

      console.log("Has obtenido la llave!!!");
    }

    if (object === 1) {
      if (this.key) {
        this.x = 1;
        this.y = 1;

        this.key = false;

        stage[8][3] = 3;

        console.log("Has ganado!!!");
      } else {
        console.log("Te falta la llave, no puedes pasar");
      }
    }
  };
};

function initialize() {
  let keyUp = {
    key37: true,
    key38: true,
    key39: true,
    key40: true,
  };

  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  //CREAMOS AL player
  protagonist = new player();

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

  document.addEventListener("keyup", (key) => {
    if (key.keyCode === 37) keyUp.key37 = true;

    if (key.keyCode === 38) keyUp.key38 = true;

    if (key.keyCode === 39) keyUp.key39 = true;

    if (key.keyCode === 40) keyUp.key40 = true;
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
  protagonist.draw();
}
