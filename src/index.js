const Cursor = require("./cursor");
const Game = require("./game");

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  
  let unitImage;
  let x = [705, 660];
  let y = 106;
  let fps = 2;
  let now;
  let then = Date.now();
  let interval = 1000/fps;
  let delta;

  const game = new Game(context);
  // loadResources();
  
  // function loadResources() {
  //   unitImage = new Image();
  //   unitImage.src = '../src/sprites.png';
  // }

  // unitImage.onload = () => {
  //   animate();
  // };

  // function animate() {
  //   requestAnimationFrame(animate);

  //   now = Date.now();
  //   delta = now - then;

  //   if (delta > interval) {

  //     then = now - (delta % interval);
  //     next_x = x.pop();
  //     x.unshift(next_x);
  //     context.clearRect(100, 100, 40, 40);
  //     context.drawImage(
  //       unitImage,
  //       x[0], y, 40, 40,
  //       100, 100, 40, 40
  //     );
  //   }
  // }

});
  