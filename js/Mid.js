function Mid() {
  let texture = PIXI.Texture.fromImage("Images/plx-5.png");
  PIXI.extras.TilingSprite.call(this, texture, 512, 256);

  this.position.x = 0;
  this.position.y = 0;
  this.tilePosition.x = 0;
  this.tilePosition.y = 0;
  this.viewportX = 0;

}

Mid.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Mid.prototype.update = function() {
  this.tilePosition.x -= 0.64;
};

Mid.DELTA_X = 0.64;

Mid.prototype.setViewportX = function(newViewportX) {
  let distanceTravelled = newViewportX - this.viewportX;
  this.viewportX = newViewportX;
  this.tilePosition.x -= (distanceTravelled * Mid.DELTA_X);
};