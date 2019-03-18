const imagePromise = require('./imagePromise');

function Unit(props) {
  this.x = props.x;
  this.y = props.y;
  this.team = props.team;
  this.range = props.range;
  this.movement = props.movement;
  this.attack = props.attack;
  this.defense = props.defense;

  this.image = new Image();
  this.imagePromise = imagePromise("../src/OrangeStarSprites.png", this.image);

}

Unit.prototype.move = function(direction) {
  let dx = direction[0];
  let dy = direction[1];

  
};