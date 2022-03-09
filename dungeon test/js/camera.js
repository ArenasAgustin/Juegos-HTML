var objCamera = function (width, height, boardX, boardY, screenX, screenY) {
  this.width = width;
  this.height = height;

  this.posX = boardX;
  this.posY = boardY;

  this.posXPixel = 0;
  this.posYPixel = 0;

  this.screenX = screenX;
  this.screenY = screenY;

  this.draw = function () {
    for (let i = this.posY; i < this.posY + this.height; i++) {
      for (let j = this.posX; j < this.posX + this.width; j++) {
        let tile = stage[i][j];

        ctx.drawImage(
          tileMap,
          tile * 32,
          0,
          32,
          32,
          (j - this.posX + this.screenX) * sideSquare,
          (i - this.posY + this.screenY) * sideSquare,
          sideSquare,
          sideSquare
        );

        if (tile === 7) {
          ctx.drawImage(
            tileMap,
            0,
            97,
            32,
            32,
            (j - this.posX + this.screenX) * sideSquare,
            (i - this.posY + this.screenY) * sideSquare,
            sideSquare,
            sideSquare
          );
        }
      }
    }
  };

  this.up = function () {
    if (this.posY > 0) {
      this.posY--;
    }
  };

  this.down = function () {
    if (this.posY < stage.length - this.height) {
      this.posY++;
    }
  };

  this.left = function () {
    if (this.posX > 0) {
      this.posX--;
    }
  };

  this.right = function () {
    if (this.posX < stage.length - this.width) {
      this.posX++;
    }
  };
};
