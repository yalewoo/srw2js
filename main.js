(function() {
	var canvas=document.getElementById("myCanvas");
	var context2D=canvas.getContext("2d");


	

	window.g_buttonCanvasManager = new ButtonCanvasManager(context2D);

	window.g_resourceManager = new ResourceManager();

	var game = new Game(canvas, 240);

	if (g_debug_mode_enabled)
	{
		window.game = game;
	}
	

	var scene_main = new SceneMain(game);
	scene_main.loadStage(1);


	var scene_start = new SceneStart(game);

	var scene_map1 = new SceneStartMap1(game, 1);
	var scene_title = new SceneTitle(game, 1);
	


	scene_start.setStartButton(function () {
		game.setScene(scene_map1);
		scene_map1.setFinishHandler(function () {
			game.setScene(scene_title);
			scene_title.setFinishHandler(function () {
				
				
				game.setScene(scene_main);
			});
		});
	})

	scene_start.setContinueButton(function () {
		if (scene_main.loadFromFile())
		{
			game.setScene(scene_main);
		}
		
	});

	scene_start.setDataLoadButton(function (stage) {

		scene_main.beginStage(stage);		

	})


	
	
	game.setScene(scene_start);

	

	game.run();



})();