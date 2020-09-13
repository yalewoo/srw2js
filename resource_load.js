
var load_maprect_image = function() {
	var images_path = ["A_00", "A_01", "A_02", "A_03", "A_04", "A_05", "A_06", "A_07", "A_08", "A_09", "A_0A", "A_0B", "A_0C", "A_0D", "A_0E", "A_0F", ];
	var image_path_parent = "img/maprect/";
	var map_images = {};
	for (var i = 0; i < images_path.length; ++i)
	{
		map_images[i] = new Image();
		map_images[i].src = image_path_parent + images_path[i] + ".png";

		map_images[i].onerror = function () {
			map_images[i].src = "img/robots/1enemy/undefined.png";
		}
	}
	return map_images;
}

var load_robot_icon_image = function()
{
	var map_images = {};
	for (var i = 0; i < g_robot_data.length; ++i)
	{
		var img = new Image();
		img.src = "img/robots/1/" + g_robot_data[i][20] + ".png"
		map_images[i] = img;

		img.onerror = function () {
			this.src = "img/robots/1/undefined.png";
		}
		img.onload = function () {
			this.isloaded = true;
		}
	}

	return map_images;
}

var load_enemy_icon_image = function () {
	var map_images = {};
	for (var i = 0; i < g_robot_data.length; ++i) {
		var img = new Image();
		img.src = "img/robots/1enemy/" + g_robot_data[i][20] + ".png"
		map_images[i] = img;

		img.onerror = function () {
			this.src = "img/robots/1enemy/undefined.png";
		}
		img.onload = function () {
			this.isloaded = true;
		}
	}

	return map_images;
}

var load_robot_image = function() {
	var map_images = {};
	for (var i = 0; i < g_robot_data.length; ++i) {
		var img = new Image();
		img.src = "img/robotImg/" + i + ".png"
		map_images[i] = img;

		img.onerror = function () {
			this.src = "img/robots/1/undefined.png";
		}
		img.onload = function () {
			this.isloaded = true;
		}
	}

	return map_images;
}

var load_people_image = function () {
	var map_images = {};
	for (var i = 0; i < g_people_data.length; ++i) {
		var img = new Image();
		img.src = "img/people/" + i + ".png"
		map_images[i] = img;

		img.onerror = function () {
			this.src = "img/robots/1/undefined.png";
		}
		img.onload = function () {
			this.isloaded = true;
		}
	}

	return map_images;
}

var ResourceManager = function() {
	this.img_maprect = load_maprect_image();
	this.img_roboticon = load_robot_icon_image();
	this.img_enemyicon = load_enemy_icon_image();
	this.img_robot_image = load_robot_image();
	this.img_people_image = load_people_image();
}