let isOn = false;

const powerOnOff = () => {
  isOn = !isOn;
  if (isOn) {
    document.getElementById('led').classList.add('on');
    document.getElementById('power-switch').classList.add('on');
    document.getElementById('canvas').classList.remove('d-none');
  } else {
    document.getElementById('led').classList.remove('on');
    document.getElementById('power-switch').classList.remove('on');
    document.getElementById('canvas').classList.add('d-none');
  }
};

const onClickCross = (direction) => {
  if (direction === 'left') camera.left();
  else if (direction === 'right') camera.right();
  else if (direction === 'up') camera.up();
  else if (direction === 'down') camera.down();
};
