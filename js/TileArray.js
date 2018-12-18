function TileArray() {
        
      this.createDecorations();
      this.createFrontEdges();
      this.createBackEdges();
      this.createSteps();

      this.tiles = [];
      this.tiles.push(PIXI.Sprite.fromFrame("tile2"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile1"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile1"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile2"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile1"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile2"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile2"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile2"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile2"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile1"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile1"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile2"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile2"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile1"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile1"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile2"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile1"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile2"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile2"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile2"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile2"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile1"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile1"));
      this.tiles.push(PIXI.Sprite.fromFrame("tile2"));

      this.shuffle(this.tiles);
    }

TileArray.prototype.shuffle = function(array) {
      let len = array.length;
      let shuffles = len * 3;
      for (var i = 0; i < shuffles; i++)
      {
        let wallSlice = array.pop();
        let pos = Math.floor(Math.random() * (len-1));
        array.splice(pos, 0, wallSlice);
      }
};


TileArray.prototype.createDecorations = function() {
      this.decorations = [];

      this.decorations.push(PIXI.Sprite.fromFrame("tile3"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile3"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile3"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile4"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile4"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile4"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile4"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile4"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile3"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile3"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile4"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile3"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile3"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile3"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile4"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile4"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile4"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile4"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile4"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile3"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile3"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile4"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile4"));
      this.decorations.push(PIXI.Sprite.fromFrame("tile4"));

      this.shuffle(this.decorations);
};


TileArray.prototype.createSteps = function() {
    this.steps = [];
    let sprite = new PIXI.Sprite(PIXI.Texture.fromFrame("lower"));
    sprite.anchor.y = 0.25;
    this.steps.push(sprite);
};

TileArray.prototype.borrowTile = function() {
      return this.tiles.shift();
};

TileArray.prototype.returnTile = function(sprite) {
      return this.tiles.push(sprite);
};

TileArray.prototype.borrowDecoration = function() {
      return this.decorations.shift();
};

TileArray.prototype.returnDecoration = function(sprite) {
      return this.decorations.push(sprite);
};

TileArray.prototype.createFrontEdges = function() {
      this.frontEdges = [];
      this.frontEdges.push(PIXI.Sprite.fromFrame("leftEnd"));
};

TileArray.prototype.createBackEdges = function() {
      this.backEdges = []; 
      this.backEdges.push(PIXI.Sprite.fromFrame("rightEnd"));
};

TileArray.prototype.borrowFrontEdge = function() {
  return this.frontEdges.shift();
};

TileArray.prototype.returnFrontEdge = function(sprite) {
  this.frontEdges.push(sprite);
};

TileArray.prototype.borrowBackEdge = function() {
  return this.backEdges.shift();
};

TileArray.prototype.returnBackEdge = function(sprite) {
  this.backEdges.push(sprite);
};

TileArray.prototype.borrowStep = function() {
  return this.steps.shift();
};

TileArray.prototype.returnStep = function(sprite) {
  this.steps.push(sprite);
};
