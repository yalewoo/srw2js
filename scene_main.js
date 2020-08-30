var SceneMain = function(cxt, stage) {
	this.cxt = cxt;

	this.draw = function() {
		this.map.draw();
		this.robots.draw();
	}

	this.loadStage = function(stage)
	{
		this.map = new Map(cxt, stage);


		this.robots = new Robots(this.cxt);
		this.robots.loadStage(stage);
	}

	this.currentX = 0;
	this.currentY = 0;
	var self = this;
	cxt.canvas.addEventListener('mousemove', function(event) {
            var x = Math.floor(event.offsetX / 32)
            var y = Math.floor(event.offsetY / 32)
            if (x != self.currentX || y != self.currentY)
            {
            	//log('selected (' + x + "," + y + ")")
            	self.currentX = x;
				self.currentY = y;

				//self.map.logXY(x, y);
				self.robots.logXY(x, y);
            }

        })

}