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


}