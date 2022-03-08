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
        } else {
          this.newPiece();
        }
      }

      this.frame = 0;
    }
  };

  this.setPiece = function () {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (tabGraphics[this.type][this.angle][i][j] > 0) {
          board[this.y + i][this.x + j] =
            tabGraphics[this.type][this.angle][i][j];
        }
      }
    }
  };

  this.draw = function () {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (tabGraphics[this.type][this.angle][i][j] !== 0) {
          switch (tabGraphics[this.type][this.angle][i][j]) {
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

          ctx.fillRect(
            (this.x + j - marginLeft) * sideSquare,
            (this.y + i - marginTop) * sideSquare,
            sideSquare,
            sideSquare
          );
        }
      }
    }
  };

  this.collision = function (newAngle, newY, newX) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          tabGraphics[this.type][newAngle][i][j] !== 0 &&
          board[newY + i][newX + j] !== 0
        ) {
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
      if (board[3][i] !== 0) return true;
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
