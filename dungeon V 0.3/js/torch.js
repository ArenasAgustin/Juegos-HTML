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

    ctx.drawImage(tileMap, this.frame * 32, 64, 32, 32, this.x * sideSquare, this.y * sideSquare, sideSquare, sideSquare);
  };
};
