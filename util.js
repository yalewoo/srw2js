var log = console.log.bind(console);


var updateValuebyDomId = function(id, s)
{
    var d = document.getElementById(id);
    d.innerText = s;

}
var updateRobotUI = function(robot)
{

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


    var d = document.getElementById("robot_image_img");
    d.src = "img/robotImg/" + robot.robot_id +".png"
    
    d = document.getElementById("pilot_image_img");
    d.src = "img/people/" + robot.pilot.id + ".png"

    // robot.move;
    // robot.speed;
    // robot.strength;
    // robot.defense;
}