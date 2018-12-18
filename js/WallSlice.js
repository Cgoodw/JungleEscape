function WallSlice(type, y) {
	this.type   = type;
	this.y      = y;
	this.sprite = null;
}

WallSlice.WIDTH = 64;

WallSlice.prototype.retSprite = function(){
    return this.sprite;
}