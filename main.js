(function() {
	var c=document.getElementById("myCanvas");
var cxt=c.getContext("2d");

window.g_resourceManager = new ResourceManager();

var game = new Game(cxt);

var scene_main = new SceneMain(cxt, 0);
scene_main.loadStage(1);

game.runWithScene(scene_main);
})();