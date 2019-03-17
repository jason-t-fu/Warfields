const Map = require('./map');
const Keyboard = require('./keyboard');
const Cursor = require('./cursor');

class Game {
  constructor(context, player1, player2) {
    this.context = context;
    this.player1 = player1;
    this.player2 = player2;
    this.map = new Map(this.context);
    this.keyboard = new Keyboard();
    this.cursor = new Cursor(this.context, this.map);

    this.hold = {L: 0, "R": 0, "U": 0, "D": 0 };
    Promise.all([this.cursor.imagePromise]).then(
      imageArr => {
        this.tick();
      }
    );
  }

  start() {

  }

  won() {

  }

  load() {

  }

  init() {

  }

  update() {

    let dx = 0;
    let dy = 0;
    if (this.keyboard.isPressed(Keyboard.LEFT)) { if (this.hold.L % 5 === 0) {dx = -1;} this.hold.L++; }
    else if (this.keyboard.isPressed(Keyboard.RIGHT)) { if (this.hold.R % 5 === 0) {dx = 1;} this.hold.R++; }
    else if (this.keyboard.isPressed(Keyboard.UP)) { if (this.hold.U % 5 === 0) {dy = -1;} this.hold.U++; }
    else if (this.keyboard.isPressed(Keyboard.DOWN)) { if (this.hold.D % 5 === 0) {dy = 1;} this.hold.D++; }

    this.cursor.move(dx, dy);
  }

  render() {
    this.map.render();
    this.cursor.render();
  }

  tick() {
    window.requestAnimationFrame(this.tick.bind(this));
    this.context.clearRect(0, 0, 800, 600);

    this.update();
    this.render();
  }
}

module.exports = Game;