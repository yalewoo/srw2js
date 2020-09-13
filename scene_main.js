var SceneMain = function(cxt, stage) {
	this.cxt = cxt;

	this.update = function () {
		this.map.update();
		this.robots.update();
	}

	this.draw = function() {
		this.map.draw();
		this.robots.draw();
	}

	this.loadStage = function(stage)
	{
		this.map = new Map(this, stage);


		this.robots = new Robots(this);
		this.robots.loadStage(stage);
	}

	this.currentHoverX = 0;
	this.currentHoverY = 0;


	var self = this;
	cxt.canvas.addEventListener('mousemove', function(event) {
		//console.log(event);

		var x = Math.floor(event.offsetX / 32)
		var y = Math.floor(event.offsetY / 32)
		if (x != self.currentHoverX || y != self.currentHoverY)
		{
			//log('selected (' + x + "," + y + ")")
			self.currentHoverX = x;
			self.currentHoverY = y;

			//self.map.logXY(x, y);
			self.robots.mousehoverHandler(x, y);
		}

	})
	
	cxt.canvas.addEventListener('click', function (event) {
		var x = Math.floor(event.offsetX / 32)
		var y = Math.floor(event.offsetY / 32)

		self.robots.mousedownHandler(x, y);
	})

	var canvasDom = document.getElementById("myCanvas");
	canvasDom.oncontextmenu = function (e) {
			return false;
		}; 

}