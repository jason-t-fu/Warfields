
class Map {
  constructor(context) {
    this.context = context;
    this.cols = 15;
    this.rows = 10;
    this.gameTileSize = this.context.canvas.height / 10;
    this.imageTileSize = 16;
    this.tiles = [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 8, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 8, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1,
      1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1,
      6, 6, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];

    this.mapImage = new Image();
    this.mapImage.src = "../src/map_parts_1.png";

    this.getTile = this.getTile.bind(this);
    this.render = this.render.bind(this);

    this.mapImage.onload = () => {
      this.render();
    };
    
  }

  getTile(col, row) {
    return this.tiles[row * this.cols + col];
  }

  render() {
    for (var col = 0; col < this.cols; col++) {
      for (var row = 0; row < this.rows; row++) {
        var tile = this.getTile(col, row);
        if (tile !== 0) { // 0 => empty tile
          this.context.drawImage(
            this.mapImage, // image
            Map.imageTileLoc[tile][0], // source x
            Map.imageTileLoc[tile][1], // source y
            this.imageTileSize, // source width
            this.imageTileSize, // source height
            col * this.gameTileSize,  // target x
            row * this.gameTileSize, // target y
            this.gameTileSize, // target width
            this.gameTileSize // target height
          );
        }
      }
    }
  }

}

Map.imageTileLoc = {
  1: [464, 0],
  2: [0, 288],
  3: [0, 304],
  4: [96, 288],
  5: [96, 304],
  6: [320, 160],
  7: [416, 176],
  8: [336, 176],
  9: [272, 160],
};

module.exports = Map;