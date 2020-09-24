var Game = function(canvas, fps)
{
	this.canvas = canvas;
	this.context2D = canvas.getContext("2d");
	this.FPS = 1000 / fps;


	this.setupCanvas = function() {
		var context2D = this.context2D;

		context2D.textBaseline = "top";


	}



	this.setupCanvas();

	var game = this;


	this.run = function() {
		
		var desiredTime = Date.now() + game.FPS;
		var interval = Math.max(0, desiredTime - Date.now());
		game.scene.update();
		game.scene.draw();

		
		
		setTimeout(game.run, interval);
	}

	this.setScene = function(scene)
	{
		if (this.scene && this.scene != scene)
		{
			this.scene.clear();
		}

		this.scene = scene;
		this.scene.init();
		
	}

	

	this.musicManager = new MusicManager();

	var self = this;
	canvas.addEventListener("mousemove", function (e) {
		g_buttonCanvasManager.hoverHandler(e);

		self.scene.hoverHandler(e);

	});

	canvas.addEventListener("click", function (e) {
		if (g_buttonCanvasManager.clickHandler(e)) {
			return;
		}
		
		self.scene.clickHandler(e);
	});


	var canvasDom = document.getElementById("myCanvas");
	canvasDom.oncontextmenu = function (e) {
		self.scene.rightClickHandler(e);
		return false;
	};

}

