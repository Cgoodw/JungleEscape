let usedSlices=[];
function Walls() {
	PIXI.Container.call(this);

	this.pool = new TileArray();
	this.createLookupTables();

	this.slices = [];

	this.viewportX = 0;
	this.viewportSliceX = 0;
    usedSlices=[];
}



Walls.prototype = Object.create(PIXI.Container.prototype);

Walls.VIEWPORT_WIDTH = 512;
Walls.VIEWPORT_NUM_SLICES = Math.ceil(Walls.VIEWPORT_WIDTH/64) + 1;

Walls.prototype.sliceList= function() {
   return usedSlices;
}


Walls.prototype.setViewportX = function(viewportX) {
	this.viewportX = this.checkViewportXBounds(viewportX);

	var prevViewportSliceX = this.viewportSliceX;
	this.viewportSliceX = Math.floor(this.viewportX/WallSlice.WIDTH);

	this.removeOldSlices(prevViewportSliceX);
	this.addNewSlices();
};

Walls.prototype.removeOldSlices = function(prevViewportSliceX) {
	var numOldSlices = this.viewportSliceX - prevViewportSliceX;
	if (numOldSlices > Walls.VIEWPORT_NUM_SLICES)
	{
		numOldSlices = Walls.VIEWPORT_NUM_SLICES;
	}

	for (var i = prevViewportSliceX; i < prevViewportSliceX + numOldSlices; i++)
	{
		var slice = this.slices[i];
        
        let index = usedSlices.indexOf(slice);
        usedSlices.splice(index, 1);
        
		if (slice.sprite != null)
		{
			this.returnWallSprite(slice.type, slice.sprite);
			this.removeChild(slice.sprite);
			slice.sprite = null;
		}

        
	}
};

Walls.prototype.addSlice = function(sliceType, y) {
	var slice = new WallSlice(sliceType, y);
	this.slices.push(slice);

};

Walls.prototype.checkViewportXBounds = function(viewportX) {
	var maxViewportX = (this.slices.length - Walls.VIEWPORT_NUM_SLICES) * 
						WallSlice.WIDTH;
	if (viewportX < 0)
	{
		viewportX = 0;
	}
	else if (viewportX > maxViewportX)
	{
		viewportX = maxViewportX;
	}

	return viewportX;
};

Walls.prototype.addNewSlices = function() {
	var firstX = -(this.viewportX % WallSlice.WIDTH);
	for (let i = this.viewportSliceX, sliceIndex = 0;
			 i < this.viewportSliceX + Walls.VIEWPORT_NUM_SLICES;
			 i++, sliceIndex++)
	{
		let slice = this.slices[i];
		if (slice.sprite == null && slice.type != SliceType.GAP)
		{
			slice.sprite = this.borrowWallSprite(slice.type);

			slice.sprite.position.x = firstX + (sliceIndex * WallSlice.WIDTH);
			slice.sprite.position.y = slice.y;

			this.addChild(slice.sprite);
            usedSlices.push(slice);
            
		}
		else if (slice.sprite != null)
		{
            
			slice.sprite.position.x = firstX + (sliceIndex * WallSlice.WIDTH);
		}

        
        
	}
};

Walls.prototype.createLookupTables = function() {
	this.borrowWallSpriteLookup = [];
	this.borrowWallSpriteLookup[SliceType.FRONT] = this.pool.borrowFrontEdge;
	this.borrowWallSpriteLookup[SliceType.BACK] = this.pool.borrowBackEdge;
	this.borrowWallSpriteLookup[SliceType.STEP] = this.pool.borrowStep;
	this.borrowWallSpriteLookup[SliceType.DECORATION] = this.pool.borrowDecoration;
	this.borrowWallSpriteLookup[SliceType.TILE] = this.pool.borrowTile;

	this.returnWallSpriteLookup = [];
	this.returnWallSpriteLookup[SliceType.FRONT] = this.pool.returnFrontEdge;
	this.returnWallSpriteLookup[SliceType.BACK] = this.pool.returnBackEdge;
	this.returnWallSpriteLookup[SliceType.STEP] = this.pool.returnStep;
	this.returnWallSpriteLookup[SliceType.DECORATION] = this.pool.returnDecoration;
	this.returnWallSpriteLookup[SliceType.TILE] = this.pool.returnTile;
};

Walls.prototype.borrowWallSprite = function(sliceType) {
	return this.borrowWallSpriteLookup[sliceType].call(this.pool);
};

Walls.prototype.returnWallSprite = function(sliceType, sliceSprite) {
	return this.returnWallSpriteLookup[sliceType].call(this.pool, sliceSprite);
};