//OBJETO player
var player = function () {
  this.x = 1;
  this.y = 1;

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

  this.enemyCollision = (x, y) => {
    if (this.x === x && this.y === y) {
      this.x = 1;
      this.y = 1;

      this.key = false;

      stage[8][3] = 4;

      console.log("Has perdido!!!");
    }
  };

  this.margin = (x, y) => stage[y][x] === 0;

  this.up = () => {
    if (this.margin(this.x, this.y - 1) === false) {
      this.y--;
      this.objectLogic();
    }
  };

  this.down = () => {
    if (this.margin(this.x, this.y + 1) === false) {
      this.y++;
      this.objectLogic();
    }
  };

  this.left = () => {
    if (this.margin(this.x - 1, this.y) === false) {
      this.x--;
      this.objectLogic();
    }
  };

  this.right = () => {
    if (this.margin(this.x + 1, this.y) === false) {
      this.x++;
      this.objectLogic();
    }
  };

  this.resetKey = () => {
    this.x = 1;
    this.y = 1;

    this.key = false;

    stage[keyPosition[`level${level}`][1]][keyPosition[`level${level}`][0]] = 4;
  };

  this.nextLevel = () => {
    this.x = 1;
    this.y = 1;

    level = randomizer(level);

    resetEnemies(level);
    stage = [...stages[level]];
    stage[keyPosition[`level${level}`][1]][keyPosition[`level${level}`][0]] = 4;
  };

  this.objectLogic = () => {
    let object = stage[this.y][this.x];

    if (object === 4) {
      this.key = true;
      stage[this.y][this.x] = 3;

      console.log("Has obtenido la llave!!!");
    }

    if (object === 1) {
      if (this.key) {
        //this.resetKey();
        this.nextLevel();

        console.log("Has ganado!!!");
      } else {
        console.log("Te falta la llave, no puedes pasar");
      }
    }
  };

  this.enemyCollision = (x, y) => {
    if (this.x === x && this.y === y) {
      this.resetKey();

      console.log("Has perdido!!!");
    }
  };
};
