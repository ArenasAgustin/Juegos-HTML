function initializeKeyboard() {
  document.addEventListener('keydown', (key) => {
    switch (key.keyCode) {
      case 37:
        piece.left();
        break;

      case 38:
        piece.rotate();
        break;

      case 39:
        piece.right();
        break;

      case 40:
        piece.down();
        break;

      default:
        break;
    }
  });
}

function drawBoard() {
  for (let i = marginTop; i <= heightBoard; i++) {
    for (let j = marginLeft; j <= widthBoard; j++) {
      if (board[i][j] !== 0) {
        switch (board[i][j]) {
          case 1:
            ctx.fillStyle = red;
            break;

          case 2:
            ctx.fillStyle = purple;
            break;

          case 3:
            ctx.fillStyle = orange;
            break;

          case 4:
            ctx.fillStyle = yellow;
            break;

          case 5:
            ctx.fillStyle = green;
            break;

          case 6:
            ctx.fillStyle = cyan;
            break;

          case 7:
            ctx.fillStyle = blue;
            break;

          default:
            break;
        }

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
