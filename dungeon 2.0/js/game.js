var canvas;
var ctx;
var FPS = 50;

var sideSquare = 50;

var protagonist;
var enemies = [];
var torches = [];

var tileMap;

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

//OBJETO torch
var torch = function (x, y) {
  this.x = x;
  this.y = y;

  this.frame = 0;
  this.timeOut = 6;
  this.count = 0;

  this.draw = () => {
    if (this.count < this.timeOut) this.count++;
    else {
      this.count = 0;

      if (this.frame < 3) this.frame++;
      else this.frame = 0;
    }

    ctx.drawImage(
      tileMap,
      this.frame *  32,
      64,
      32,
      32,
      this.x * sideSquare,
      this.y * sideSquare,
      sideSquare,
      sideSquare
    );
  };
};

//OBJETO enemy
var enemy = function (x, y) {
  this.x = x;
  this.y = y;

  this.direction = Math.floor(Math.random() * 4);

  this.timeOut = 50;
  this.frame = 0;

  this.draw = () => {
    /* ctx.fillStyle = this.color;
    ctx.fillRect(
      this.x * sideSquare,
      this.y * sideSquare,
      sideSquare,
      sideSquare
    ); */

    ctx.drawImage(
      tileMap,
      0,
      32,
      32,
      32,
      this.x * sideSquare,
      this.y * sideSquare,
      sideSquare,
      sideSquare
    );
  };

  this.testCollision = (x, y) =>
    stage[y][x] === 0 || stage[y][x] === 3 || stage[y][x] === 1;

  this.move = () => {
    protagonist.enemyCollision(this.x, this.y);

    if (this.frame < this.timeOut) this.frame++;
    else {
      this.frame = 0;

      switch (this.direction) {
        case 0:
          if (!this.testCollision(this.x, this.y - 1)) this.y--;
          else this.direction = Math.floor(Math.random() * 4);

          break;
        case 1:
          if (!this.testCollision(this.x, this.y + 1)) this.y++;
          else this.direction = Math.floor(Math.random() * 4);

          break;
        case 2:
          if (!this.testCollision(this.x - 1, this.y)) this.x--;
          else this.direction = Math.floor(Math.random() * 4);

          break;
        default:
          if (!this.testCollision(this.x + 1, this.y)) this.x++;
          else this.direction = Math.floor(Math.random() * 4);

          break;
      }
    }
  };
};

//OBJETO player
var player = function () {
  this.x = 1;
  this.y = 1;

  this.key = false;

  this.draw = () => {
    /* ctx.fillStyle = this.color;
    ctx.fillRect(
      this.x * sideSquare,
      this.y * sideSquare,
      sideSquare,
      sideSquare
    ); */

    ctx.drawImage(
      tileMap,
      32,
      32,
      32,
      32,
      this.x * sideSquare,
      this.y * sideSquare,
      sideSquare,
      sideSquare
    );
  };

  this.enemyCollision = (x, y) => {
    if (this.x === x && this.y === y) {
      this.x = 1;
      this.y = 1;

      this.key = false;

      stage[8][3] = 3;

      console.log("Has perdido!!!");
    }
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

  this.resetKey = () => {
    this.x = 1;
    this.y = 1;

    this.key = false;

    stage[8][3] = 3;
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
        this.resetKey();

        console.log("Has ganado!!!");
      } else {
        console.log("Te falta la llave, no puedes pasar");
      }
    }
  };

  this.enemyCollision = (x, y) => {
    if (this.x === x && this.y === y) {
      this.resetKey();

      console.log("Has perdido!!!");
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

  tileMap = new Image();
  tileMap.src = "./img/tileMap.png";

  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  //CREAMOS AL player
  protagonist = new player();

  //CREAMOS enemigos
  enemies.push(new enemy(4, 4));
  enemies.push(new enemy(6, 8));
  enemies.push(new enemy(13, 1));

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
