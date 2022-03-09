var canvas;
var ctx;
var FPS = 50;

var sideSquare = 50;

var protagonist;
var enemies = [];
var torches = [];

var tileMap;

var stage = [
  [
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7,
  ],
  [
    7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 7,
  ],
  [
    7, 0, 3, 3, 0, 0, 0, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    0, 7,
  ],
  [
    7, 0, 0, 3, 3, 3, 3, 3, 3, 0, 3, 0, 0, 3, 3, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0,
    0, 7,
  ],
  [
    7, 0, 0, 3, 0, 0, 3, 3, 3, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0,
    0, 7,
  ],
  [
    7, 0, 0, 3, 3, 3, 0, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 3, 3, 3, 3, 3, 0, 3, 0,
    0, 7,
  ],
  [
    7, 0, 3, 3, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0,
    0, 7,
  ],
  [
    7, 0, 0, 3, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0,
    0, 7,
  ],
  [
    7, 0, 3, 3, 3, 0, 0, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 0, 3, 0,
    0, 7,
  ],
  [
    7, 0, 3, 3, 4, 0, 0, 3, 0, 0, 1, 3, 3, 3, 3, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0,
    0, 7,
  ],
  [
    7, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0,
    0, 7,
  ],
  [
    7, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0,
    0, 7,
  ],
  [
    7, 0, 3, 0, 3, 3, 3, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 3, 3, 3, 0,
    0, 7,
  ],
  [
    7, 0, 3, 0, 3, 3, 3, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 3, 3, 3, 0,
    0, 7,
  ],
  [
    7, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0,
    0, 7,
  ],
  [
    7, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 3, 3, 0, 0, 3, 0, 0, 3, 0, 0,
    0, 7,
  ],
  [
    7, 0, 3, 3, 3, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 3, 3, 0, 0, 3, 0, 0, 3, 0, 0,
    0, 7,
  ],
  [
    7, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 3, 0, 0, 3, 0, 0, 3, 0, 0,
    0, 7,
  ],
  [
    7, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 3, 3, 3, 0, 0, 3, 0, 0,
    0, 7,
  ],
  [
    7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 7,
  ],
  [
    7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 7,
  ],
  [
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7,
  ],
];

var heightStage = 20;
var widthStage = 25;

var camera;
