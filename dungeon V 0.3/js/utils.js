function randomizer(after) {
  let random;
  do {
    random = Math.floor(Math.random() * stages.length);
  } while (random === after);

  return random;
}

function resetEnemies(level) {
  let enemiesPositionArray = enemiesPosition[`level${level}`];

  for (let i = 0; i < enemies.length; i ++) {
    enemies[i].x = enemiesPositionArray[i * 2];
    enemies[i].y = enemiesPositionArray[i * 2 + 1];
  }
}
