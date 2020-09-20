var log = console.log.bind(console);


var updateValuebyDomId = function(id, s)
{
    var d = document.getElementById(id);
    d.innerText = s;

}

var updateRobotUI = function(robot)
{
    var d = document.getElementById("robot_data");
    if (!robot){
        
        d.style.display = "none";
        return;
    }

    var d2 = document.getElementById("map_rect_data");

    d2.style.display = "none";


    d.style.display = "block";

    updateValuebyDomId("robot_name", robot.property.robotName);

    updateValuebyDomId("robot_level", robot.level);

    

    var types = ["空", "陆", "海"];
    updateValuebyDomId("robot_type", types[robot.property.type]);
    updateValuebyDomId("robot_move", robot.move);


    updateValuebyDomId("robot_strength", robot.strength);
    updateValuebyDomId("robot_defense", robot.defense);
    updateValuebyDomId("robot_speed", robot.speed);
    updateValuebyDomId("robot_hp_total", robot.hp_total);
    updateValuebyDomId("robot_pilot_name", robot.pilot.name);


    updateValuebyDomId("robot_spirit_total", robot.pilot.spirit_total0);

    updateValuebyDomId("robot_spirit", robot.spirit);
    updateValuebyDomId("robot_hp", robot.hp);
    updateValuebyDomId("robot_exp", robot.exp);

    var exp_need = g_robot_exp_table[robot.level] - robot.exp;

    updateValuebyDomId("robot_exp_need", exp_need);


    var d = document.getElementById("robot_image");
    d.innerHTML = "";
    d.append(g_resourceManager.get_img_robot_image(robot.robot_id));
    
    d = document.getElementById("pilot_image");
    d.innerHTML = "";
    d.append(g_resourceManager.get_img_people_image(robot.pilot.id));

    updateValuebyDomId("weapon1_name", robot.weapon1.name);
    updateValuebyDomId("weapon1_hitrate", robot.weapon1.hitRadio);
    updateValuebyDomId("weapon1_range", robot.weapon1.range);
    updateValuebyDomId("weapon1_power_sky", robot.weapon1.firepower[0]);
    updateValuebyDomId("weapon1_power_land", robot.weapon1.firepower[1]);
    updateValuebyDomId("weapon1_power_sea", robot.weapon1.firepower[2]);

    updateValuebyDomId("weapon2_name", robot.weapon2.name);
    updateValuebyDomId("weapon2_hitrate", robot.weapon2.hitRadio);
    updateValuebyDomId("weapon2_range", robot.weapon2.range);
    updateValuebyDomId("weapon2_power_sky", robot.weapon2.firepower[0]);
    updateValuebyDomId("weapon2_power_land", robot.weapon2.firepower[1]);
    updateValuebyDomId("weapon2_power_sea", robot.weapon2.firepower[2]);

    // robot.move;
    // robot.speed;
    // robot.strength;
    // robot.defense;
}

var updateMapRectUI = function (maprect) {


    var d = document.getElementById("map_rect_data");
    if (!maprect) {

        d.style.display = "none";
        return;
    }
    d.style.display = "block";

    updateValuebyDomId("map_rect_name", maprect.typeName);
    updateValuebyDomId("move_consume_sky", maprect.moveConsume[0]);
    updateValuebyDomId("move_consume_land", maprect.moveConsume[1]);
    updateValuebyDomId("move_consume_sea", maprect.moveConsume[2]);
  

}


//灰白滤镜
function toGray(imgdata) {
    for (var i = 0; i < imgdata.data.length - 4; i = i + 4) {
        var r = imgdata.data[i];
        var g = imgdata.data[i + 1];
        var b = imgdata.data[i + 2];
        var rgb = (r * 0.3 + g * 0.5 + b * 0.11);
        rgb = .399 * r + .687 * g + .214 * b
        imgdata.data[i] = rgb;
        imgdata.data[i + 1] = rgb;
        imgdata.data[i + 2] = rgb;
    }
    return imgdata;
}
//黑白滤镜
function toBlack(imgdata) {
    for (var i = 0; i < imgdata.data.length - 4; i = i + 4) {
        var r = imgdata.data[i];
        var g = imgdata.data[i + 1];
        var b = imgdata.data[i + 2];
        var rgb = (r + g + b) / 3;
        if (rgb < 100) {
            rgb = 0;
        }
        else {
            rgb = 255;
        }
        imgdata.data[i] = rgb;
        imgdata.data[i + 1] = rgb;
        imgdata.data[i + 2] = rgb;
    }
    return imgdata;
}


