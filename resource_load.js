
var load_maprect_image = function() {
	var images_path = ["A_00", "A_01", "A_02", "A_03", "A_04", "A_05", "A_06", "A_07", "A_08", "A_09", "A_0A", "A_0B", "A_0C", "A_0D", "A_0E", "A_0F", ];
	var image_path_parent = "img/maprect/";
	var map_images = {};
	for (var i = 0; i < images_path.length; ++i)
	{
		map_images[i] = new Image();
		map_images[i].src = image_path_parent + images_path[i] + ".png";

		map_images[i].onerror = function () {
			map_images[i].src = "img/undefined.png";
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
			this.src = "img/undefined.png";
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
			this.src = "img/undefined.png";
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
			this.src = "img/undefined.png";
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
			this.src = "img/undefined.png";
		}
		img.onload = function () {
			this.isloaded = true;
		}
	}

	return map_images;
}


var load_logos = function() {
	var map_images = {};
	var images_path = ["logo", "map1", "select", "fire", "arrow2"];

	for (var i = 0; i < images_path.length; ++i) {
		var img = new Image();
		img.src = "img/logo/" + images_path[i] + ".png"
		map_images[images_path[i]] = img;

		img.onerror = function () {
			this.src = "img/undefined.png";
		}
		img.onload = function () {
			this.isloaded = true;
		}
	}

	return map_images;
}

var ResourceManager = function() {
	this.img_maprect = {};
	this.img_roboticon = {};
	this.img_enemyicon = {};
	this.img_robot_image = {};
	this.img_people_image = {};

	this.img_logos = load_logos();

	this.get_img_maprect = function(style, kind) {
		var images = {};
		images["A"] = ["A_00", "A_01", "A_02", "A_03", "A_04", "A_05", "A_06", "A_07", "A_08", "A_09", "A_0A", "A_0B", "A_0C", "A_0D", "A_0E", "A_0F",];
		images["B"] = ["B_00", "B_01", "B_02", "B_03", "B_04", "B_05", "B_06", "B_07", "B_08", "B_09", "B_0B", "B_0B", "B_0C", "B_0D", "B_0E", "B_0F",];
		images["C"] = ["C_00", "C_01", "C_02", "C_03", "C_04", "C_05", "C_06", "C_07", "C_08", "C_09", "C_0C", "C_0B", "C_0C", "C_0D", "C_0E", "C_0F",];
		images["D"] = ["D_00", "D_01", "D_02", "D_03", "D_04", "D_05", "D_06", "D_07", "D_08", "D_09", "D_0D", "D_0B", "D_0C", "D_0D", "D_0E", "D_0F",];
		var key = style+kind;

		if (this.img_maprect[key]) {
			return this.img_maprect[key];
		}
		else {
			var img = new Image();
			img.src = "img/maprect/" + images[style][kind] + ".png"
			this.img_maprect[key] = img;

			img.onerror = function () {
				this.src = "img/undefined.png";
			}
			img.onload = function () {
				this.isloaded = true;
			}

			return img;
		}
	}

	this.get_img_roboticon = function(i)
	{
		if (this.img_roboticon[i])
		{
			return this.img_roboticon[i];
		}
		else{
			var img = new Image();
			img.src = "img/robots/1/" + g_robot_data[i][20] + ".png"
			this.img_roboticon[i] = img;

			img.onerror = function () {
				this.src = "img/undefined.png";
			}
			img.onload = function () {
				this.isloaded = true;
			}

			return img;
		}
	}

	this.get_img_enemyicon = function (i) {
		if (this.img_enemyicon[i]) {
			return this.img_enemyicon[i];
		}
		else {
			var img = new Image();
			img.src = "img/robots/1enemy/" + g_robot_data[i][20] + ".png"
			this.img_enemyicon[i] = img;

			img.onerror = function () {
				this.src = "img/undefined.png";
			}
			img.onload = function () {
				this.isloaded = true;
			}

			return img;
		}
	}

	this.get_img_robot_image = function (i) {
		if (this.img_robot_image[i]) {
			return this.img_robot_image[i];
		}
		else {
			var img = new Image();
			img.src = "img/robotImg/" + i + ".png"
			this.img_robot_image[i] = img;

			img.onerror = function () {
				this.src = "img/undefined.png";
			}
			img.onload = function () {
				this.isloaded = true;
			}

			return img;
		}
	}

	this.get_img_people_image = function (i) {
		if (this.img_people_image[i]) {
			return this.img_people_image[i];
		}
		else {
			var img = new Image();
			img.src = "img/people/" + i + ".png"
			this.img_people_image[i] = img;

			img.onerror = function () {
				this.src = "img/undefined.png";
			}
			img.onload = function () {
				this.isloaded = true;
			}

			return img;
		}
	}


	



}
