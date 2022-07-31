function drawStage() {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 15; x++) {
      let tile = stage[y][x];

      if (tile !== 7) ctx.drawImage(tileMap, 0, 0, 32, 32, x * sideSquare, y * sideSquare, sideSquare, sideSquare);
      else {
        ctx.fillStyle = black;
        ctx.fillRect(x * sideSquare, y * sideSquare, sideSquare, sideSquare);
      }
    }
  }
}

function initialize() {
  tileMap = new Image();
  tileMap.src = './img/tilemap.png';

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  //CAMARA
  camera = new objCamera(5, 5, 0, 0, 0, 0);

  //CREAMOS AL player
  protagonist = new player();

  //CREAMOS enemigos
  enemies.push(new enemy(24, 2, 1));
  enemies.push(new enemy(2, 19, 2));
  enemies.push(new enemy(12, 10, 3));

  //CREAMOS TORCHES
  torches.push(new torch(1, 1));
  torches.push(new torch(1, heightStage - 2));
  torches.push(new torch(widthStage - 2, 1));
  torches.push(new torch(widthStage - 2, heightStage - 2));

  //LECTURA DEL TECLADO
  document.addEventListener('keydown', (key) => {
    if (key.keyCode === 37) camera.left();

    if (key.keyCode === 38) camera.up();

    if (key.keyCode === 39) camera.right();

    if (key.keyCode === 40) camera.down();
  });

  setInterval(() => principal(), 1000 / FPS);
}

function deleteCanvas() {
  canvas.width = 250;

  canvas.height = 250;
}

function principal() {
  deleteCanvas();

  camera.draw();

  protagonist.draw();
}
