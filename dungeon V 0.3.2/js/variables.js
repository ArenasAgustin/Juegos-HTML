let canvas;
let ctx;
const FPS = 50;

const sideSquare = 50;

let camera;
let protagonist;
const enemies = [];
const torches = [];

let tileMap;
let level = 0;

const stage = [
  [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
  [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
  [7, 0, 3, 3, 0, 0, 0, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 7],
  [7, 0, 0, 3, 3, 3, 3, 3, 3, 0, 3, 0, 0, 3, 3, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 7],
  [7, 0, 0, 3, 0, 0, 0, 3, 3, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 7],
  [7, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 3, 3, 3, 3, 3, 0, 3, 0, 0, 7],
  [7, 0, 3, 3, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 7],
  [7, 0, 0, 3, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 7],
  [7, 0, 3, 3, 3, 0, 0, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 0, 3, 0, 0, 7],
  [7, 0, 3, 3, 4, 0, 0, 3, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 7],
  [7, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 7],
  [7, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 7],
  [7, 0, 3, 0, 3, 3, 3, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 7],
  [7, 0, 3, 0, 3, 3, 3, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 7],
  [7, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 7],
  [7, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 3, 3, 0, 0, 3, 0, 0, 3, 0, 0, 0, 7],
  [7, 0, 3, 3, 3, 0, 3, 3, 0, 0, 0, 0, 3, 0, 0, 3, 3, 0, 0, 3, 0, 0, 3, 0, 0, 0, 7],
  [7, 0, 3, 0, 3, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 0, 0, 3, 0, 0, 3, 0, 0, 0, 7],
  [7, 0, 3, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 3, 3, 3, 0, 0, 3, 3, 3, 0, 7],
  [7, 0, 3, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0, 7],
  [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
  [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
];

const heightStage = stage.length;
const widthStage = stage[0].length;

let enemiesData = {
  level0: [
    { x: 24, y: 2, type: 1 },
    { x: 2, y: 19, type: 2 },
    { x: 12, y: 10, type: 3 },
  ],
};

let keyPosition = {
  level0: { x: 4, y: 9 },
};
