//OBJETO enemy
var enemy = function (x, y, image) {
  this.x = x;
  this.y = y;

  this.direction = Math.floor(Math.random() * 4);

  this.timeOut = 50;
  this.frame = 0;

  this.draw = () => {
    ctx.drawImage(
      tileMap,
      32 * image,
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
    stage[y][x] === 0 ||
    stage[y][x] === 4 ||
    stage[y][x] === 1 ||
    stage[y][x] === 2;

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
