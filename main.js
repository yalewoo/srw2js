(function() {
	var canvas=document.getElementById("myCanvas");
var cxt=canvas.getContext("2d");

window.g_resourceManager = new ResourceManager();

var game = new Game(canvas);

var scene_main = new SceneMain(cxt, 0);
scene_main.loadStage(1);

game.runWithScene(scene_main);





})();