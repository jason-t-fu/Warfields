
class Keyboard {
  constructor() {
    this.keys = {};

    window.onkeydown = ({keyCode}) => {
      console.log(keyCode);
      this.keys[keyCode] = true;
    };

    window.onkeyup = ({keyCode}) => {
      this.keys[keyCode] = false;
    };

    this.isPressed = this.isPressed.bind(this);
  }

  isPressed(keyCode) {
    return this.keys[keyCode] === true;
  }
}

Keyboard.LEFT = 37;
Keyboard.UP = 38;
Keyboard.RIGHT = 39;
Keyboard.DOWN = 40;

module.exports = Keyboard;