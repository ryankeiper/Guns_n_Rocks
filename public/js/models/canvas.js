module.exports = {
	canvas: document.getElementById('canvas1'),

	ctx: this.canvas.getContext('2d'),
	
	draw: function() {
		this.ctx.canvas.width  = window.innerWidth;
		this.ctx.canvas.height = window.innerHeight;
		console.log("drawn!");
	}
}