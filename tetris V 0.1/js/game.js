var canvas;
var ctx;
var FPS = 50;

//DIMENSIONES DEL CANVAS
var heightCanvas = 640;
var widthCanvas = 400;

var marginTop = 4;
var marginLeft = 1;

//TABLERO (10x16)
var heightBoard = 20;
var widthBoard = 10;

//DIMENSIONES REALES DE CADA CUADRO DEL TABLERO (40x40 pixels)
var sideSquare = 40;

//COLORES DE LAS FICHAS
var red = '#FF0000';
var purple = '#800080';
var orange = '#FF8C00';
var yellow = '#FFD700';
var green = '#008000';
var cyan = '#00CED1';
var blue = '#0000CD';

//nueva linea
const line = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];

//MATRIZ TABLERO (12x21)
//LA MATRIZ ES MAYOR PORQUE AÑADIMOS MÁRGENES PARA LAS COLISIONES
var board = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const auxBoard = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

//DIBUJO DE LAS PIEZAS (Matriz de 4 dimensiones)
// fichaGrafico [Pieza] [Posición/rotación] [y] [x]
var tabGraphics = [
  [
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
  ],

  [
    [
      [0, 0, 0, 0],
      [2, 2, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0],
    ],

    [
      [0, 0, 0, 0],
      [2, 2, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0],
    ],
  ],

  [
    [
      [0, 0, 0, 0],
      [0, 0, 3, 3],
      [0, 3, 3, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 3, 0],
      [0, 0, 3, 3],
      [0, 0, 0, 3],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0],
      [0, 0, 3, 3],
      [0, 3, 3, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 3, 0],
      [0, 0, 3, 3],
      [0, 0, 0, 3],
      [0, 0, 0, 0],
    ],
  ],

  [
    [
      [0, 0, 0, 0],
      [0, 4, 4, 0],
      [0, 0, 4, 4],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 4],
      [0, 0, 4, 4],
      [0, 0, 4, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0],
      [0, 4, 4, 0],
      [0, 0, 4, 4],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 4],
      [0, 0, 4, 4],
      [0, 0, 4, 0],
      [0, 0, 0, 0],
    ],
  ],

  [
    [
      [0, 0, 0, 0],
      [0, 5, 5, 5],
      [0, 5, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 5, 0],
      [0, 0, 5, 0],
      [0, 0, 5, 5],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 5],
      [0, 5, 5, 5],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 5, 5, 0],
      [0, 0, 5, 0],
      [0, 0, 5, 0],
      [0, 0, 0, 0],
    ],
  ],

  [
    [
      [0, 0, 0, 0],
      [0, 6, 6, 6],
      [0, 0, 0, 6],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 6, 6],
      [0, 0, 6, 0],
      [0, 0, 6, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 6, 0, 0],
      [0, 6, 6, 6],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 6, 0],
      [0, 0, 6, 0],
      [0, 6, 6, 0],
      [0, 0, 0, 0],
    ],
  ],

  [
    [
      [0, 0, 0, 0],
      [0, 7, 7, 7],
      [0, 0, 7, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 7, 0],
      [0, 0, 7, 7],
      [0, 0, 7, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 7, 0],
      [0, 7, 7, 7],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 7, 0],
      [0, 7, 7, 0],
      [0, 0, 7, 0],
      [0, 0, 0, 0],
    ],
  ],
];

function gameOver() {
  board = [...auxBoard];
}

//OBJETO PIEZA
var pieceObj = function () {
  this.x = 4;
  this.y = 0;

  this.angle = 0;
  this.type = 4;

  this.frames = 0;
  this.timeOut = 50;

  this.newPiece = function () {
    this.type = Math.floor(Math.random() * 7);
    this.x = 4;
    this.y = 0;
  };

  this.fall = function () {
    if (this.frame < this.timeOut) this.frame++;
    else {
      if (!this.collision(this.angle, this.y + 1, this.x)) this.y++;
      else {
        this.setPiece();
        this.clearLine();
        this.newPiece();

        if (this.checkLose()) {
          gameOver();
          return;
        }
      }

      this.frame = 0;
    }
  };

  this.setPiece = function () {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (tabGraphics[this.type][this.angle][i][j] > 0) {
          board[this.y + i][this.x + j] = tabGraphics[this.type][this.angle][i][j];
        }
      }
    }
  };

  this.draw = function () {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (tabGraphics[this.type][this.angle][i][j] !== 0) {
          if (tabGraphics[this.type][this.angle][i][j] === 1) ctx.fillStyle = red;

          if (tabGraphics[this.type][this.angle][i][j] === 2) ctx.fillStyle = purple;

          if (tabGraphics[this.type][this.angle][i][j] === 3) ctx.fillStyle = orange;

          if (tabGraphics[this.type][this.angle][i][j] === 4) ctx.fillStyle = yellow;

          if (tabGraphics[this.type][this.angle][i][j] === 5) ctx.fillStyle = green;

          if (tabGraphics[this.type][this.angle][i][j] === 6) ctx.fillStyle = cyan;

          if (tabGraphics[this.type][this.angle][i][j] === 7) ctx.fillStyle = blue;

          ctx.fillRect((this.x + j - marginLeft) * sideSquare, (this.y + i - marginTop) * sideSquare, sideSquare, sideSquare);
        }
      }
    }
  };

  this.collision = function (newAngle, newY, newX) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (tabGraphics[this.type][newAngle][i][j] !== 0 && board[newY + i][newX + j] !== 0) {
          return true;
        }
      }
    }

    return false;
  };

  this.rotate = function () {
    let newAngle = this.angle;

    if (newAngle < 3) newAngle++;
    else newAngle = 0;

    if (!this.collision(newAngle, this.y, this.x)) this.angle = newAngle;
  };

  this.left = function () {
    if (!this.collision(this.angle, this.y, this.x - 1)) this.x--;
  };

  this.right = function () {
    if (!this.collision(this.angle, this.y, this.x + 1)) this.x++;
  };

  this.down = function () {
    if (!this.collision(this.angle, this.y + 1, this.x)) this.y++;
  };

  this.checkLose = function () {
    for (let i = 1; i <= widthBoard; i++) {
      if (board[2][i] > 0) return true;
    }

    return false;
  };

  this.clearLine = function () {
    for (let i = marginTop; i < heightBoard; i++) {
      let completed = true;

      for (let j = 1; j <= widthBoard; j++) {
        if (board[i][j] === 0) {
          completed = false;
        }
      }

      if (completed) {
        board.splice(i, 1);
        board.unshift(line);
      }
    }
  };

  this.newPiece();
};

function initializeKeyboard() {
  document.addEventListener('keydown', (key) => {
    if (key.keyCode === 37) piece.left();

    if (key.keyCode === 38) piece.rotate();

    if (key.keyCode === 39) piece.right();

    if (key.keyCode === 40) piece.down();
  });
}

function drawBoard() {
  for (let i = marginTop; i <= heightBoard; i++) {
    for (let j = marginLeft; j <= widthBoard; j++) {
      if (board[i][j] !== 0) {
        if (board[i][j] === 1) ctx.fillStyle = red;
        if (board[i][j] === 2) ctx.fillStyle = purple;
        if (board[i][j] === 3) ctx.fillStyle = orange;
        if (board[i][j] === 4) ctx.fillStyle = yellow;
        if (board[i][j] === 5) ctx.fillStyle = green;
        if (board[i][j] === 6) ctx.fillStyle = cyan;
        if (board[i][j] === 7) ctx.fillStyle = blue;

        ctx.fillRect((j - marginLeft) * sideSquare, (i - marginTop) * sideSquare, sideSquare, sideSquare);
      }
    }
  }
}

function initialize() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  canvas.width = widthCanvas;
  canvas.height = heightCanvas;

  piece = new pieceObj();

  initializeKeyboard();

  setInterval(() => principal(), 1000 / FPS);
}

function deleteCanvas() {
  canvas.width = widthCanvas;
  canvas.height = heightCanvas;
}

function principal() {
  deleteCanvas();
  drawBoard();

  piece.fall();
  piece.draw();
}
