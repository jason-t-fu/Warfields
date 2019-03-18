
class Player {
  constructor(units, imageSrc) {
    this.units = units;

    this.image = new Image();
    this.imagePromise = imagePromise(imageSrc, this.image);

  }


}