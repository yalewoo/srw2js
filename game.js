var Game = function(cxt)
{
	this.cxt = cxt;
	this.update = function() {

	}
	var self = this;
	this.runloop = function() {
		self.update();
		self.cxt.clearRect(0,0,self.cxt.canvas.width,self.cxt.canvas.height);

		self.scene.draw();
		
		setTimeout(self.runloop, 1000/60);
	}
	this.runWithScene = function(scene)
	{
		this.scene = scene;
		this.runloop();
	}

	window.addEventListener("keydown", function(e) {
		if (Number(e.key) )
		{
			self.scene.loadStage(Number(e.key) );
		}
	})
}

