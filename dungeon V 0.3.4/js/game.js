function drawStage() {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 15; x++) {
      let tile = stage[y][x];

      /* ctx.fillStyle = color;
      ctx.fillRect(x * sideSquare, y * sideSquare, sideSquare, sideSquare); */

      if (tile !== 7) {
        ctx.drawImage(
          tileMap,
          0,
          0,
          32,
          32,
          x * sideSquare,
          y * sideSquare,
          sideSquare,
          sideSquare
        );
      } else {
        ctx.fillStyle = black;
        ctx.fillRect(x * sideSquare, y * sideSquare, sideSquare, sideSquare);
      }
    }
  }
}

function initialize() {
  tileMap = new Image();
  tileMap.src = "./img/tilemap.png";

  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  //CAMARA
  camera = new objCamera(5, 5, 0, 0, 0, 0);

  //CREAMOS AL player
  protagonist = new player();

  //CREAMOS enemigos
  /* enemies.push(new enemy(4, 4, 1));
  enemies.push(new enemy(6, 8, 2));
  enemies.push(new enemy(13, 1, 3)); */

  //LECTURA DEL TECLADO
  document.addEventListener("keydown", (key) => {
    if (key.keyCode === 37) {
      camera.left();
    }

    if (key.keyCode === 38) {
      camera.up();
    }

    if (key.keyCode === 39) {
      camera.right();
    }

    if (key.keyCode === 40) {
      camera.down();
    }
  });

  setInterval(() => principal(), 1000 / FPS);
}

function deleteCanvas() {
  canvas.width = 250;
  canvas.height = 250;
}

function principal() {
  deleteCanvas();
  //drawStage();

  camera.draw();

  protagonist.draw();

  /* for (let i = 0; i < enemies.length; i++) {
    enemies[i].move();
    enemies[i].draw();
  } */
}
