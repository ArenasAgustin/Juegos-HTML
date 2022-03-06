var canvas;
var ctx;
var FPS = 50;

var sideSquare = 50;

var protagonist;
var enemies = [];
var torches = [];

var tileMap;

var stage;
var level = randomizer();

function drawStage() {
  for (y = 0; y < 10; y++) {
    for (x = 0; x < 15; x++) {
      let tile = stage[y][x];

      /* ctx.fillStyle = color;
      ctx.fillRect(x * sideSquare, y * sideSquare, sideSquare, sideSquare); */

      ctx.drawImage(
        tileMap,
        tile * 32,
        0,
        32,
        32,
        x * sideSquare,
        y * sideSquare,
        sideSquare,
        sideSquare
      );
    }
  }
}

function initialize() {
  let keyUp = {
    key37: true,
    key38: true,
    key39: true,
    key40: true,
  };

  stage = stages[level];

  tileMap = new Image();
  tileMap.src = "./img/tileMap2.png";

  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  //CREAMOS AL player
  protagonist = new player();

  //CREAMOS enemigos
  enemies.push(new enemy(4, 4, 1));
  enemies.push(new enemy(6, 8, 2));
  enemies.push(new enemy(13, 1, 3));

  //CREAMOS TORCHES
  torches.push(new torch(0, 0));
  torches.push(new torch(0, 9));
  torches.push(new torch(14, 0));
  torches.push(new torch(14, 9));

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

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].move();
    enemies[i].draw();
  }

  for (let i = 0; i < torches.length; i++) {
    torches[i].draw();
  }
}
