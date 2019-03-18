const imagePromise = require('./imagePromise');

class Cursor {
  constructor(context, map) {
    this.context = context;
    this.map = map;
    this.x = 0;
    this.y = 0;
    this.image = new Image();
    this.imagePromise = imagePromise('../src/OrangeStarSprites.png', this.image);
    this.imagePosition = [286, 127];
    this.imageSize = [212, 234];

    this.render = this.render.bind(this);
    this.move = this.move.bind(this);
  }

  render() {
    this.context.drawImage(
      this.image,
      this.imagePosition[0], 
      this.imagePosition[1], 
      this.imageSize[0],
      this.imageSize[1],
      this.x * this.map.gameTileSize,
      this.y * this.map.gameTileSize, 
      52, 
      57
    );
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;

    let maxX = (this.map.cols - 1);
    let maxY = (this.map.rows - 1);
    this.x = Math.max(0, Math.min(this.x, maxX));
    this.y = Math.max(0, Math.min(this.y, maxY));
  }
}

module.exports = Cursor;