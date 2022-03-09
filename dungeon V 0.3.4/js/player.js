//OBJETO player
var player = function () {
  this.x = 2;
  this.y = 2;

  this.key = false;

  this.draw = () => {
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
};
