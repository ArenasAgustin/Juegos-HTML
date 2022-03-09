var objCamera = function (width, height, boardX, boardY, screenX, screenY) {
  this.width = width;
  this.height = height;

  this.posX = boardX;
  this.posY = boardY;

  this.posXPixel = 0;
  this.posYPixel = 0;

  this.screenX = screenX;
  this.screenY = screenY;

  this.key = false;

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

  this.collision = function (x, y) {
    return stage[y][x] === 0;
  };

  this.up = function () {
    if (
      this.posY > 0 &&
      !this.collision(
        this.posX + parseInt(width / 2),
        this.posY + parseInt(height / 2) - 1
      )
    ) {
      this.posY--;
      this.objectLogic();
    }
  };

  this.down = function () {
    if (
      this.posY < stage.length - this.height &&
      !this.collision(
        this.posX + parseInt(width / 2),
        this.posY + parseInt(height / 2) + 1
      )
    ) {
      this.posY++;
      this.objectLogic();
    }
  };

  this.left = function () {
    if (
      this.posX > 0 &&
      !this.collision(
        this.posX + parseInt(width / 2) - 1,
        this.posY + parseInt(height / 2)
      )
    ) {
      this.posX--;
      this.objectLogic();
    }
  };

  this.right = function () {
    if (
      this.posX < stage.length &&
      !this.collision(
        this.posX + parseInt(width / 2) + 1,
        this.posY + parseInt(height / 2)
      )
    ) {
      this.posX++;
      this.objectLogic();
    }
  };

  this.resetKey = () => {
    this.posX = 0;
    this.posY = 0;

    this.key = false;

    stage[9][4] = 4;
  };

  this.objectLogic = function () {
    let object =
      stage[this.posY + parseInt(height / 2)][this.posX + parseInt(width / 2)];

    if (object === 4) {
      this.key = true;
      stage[this.posY + parseInt(height / 2)][
        this.posX + parseInt(width / 2)
      ] = 3;

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
};
