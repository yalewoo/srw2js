

var ButtonManager = function() {
    this.buttonhandlers = [null, null, null, null, null, null, null, null, null]
    this.used = 0;

    this.registerHandler = function(id, callback)
    {
        this.buttonhandlers[id] = callback;
    }

    this.addButtonHandler = function(name, callback)
    {
        var id = "button" + (this.used+1);
        log(id)
        var d = document.getElementById(id);
        d.innerText = name;

        this.buttonhandlers[this.used] = callback;
        ++this.used;
    }

    this.runHandler = function(id)
    {
        this.buttonhandlers[id-1]();
    }

    this.draw = function() {
        for (var i = 1; i <= 9; ++i)
        {
            var id = "button" + i;
            var d = document.getElementById(id);

            if (this.buttonhandlers[i-1])
            {
                d.style.display = "inline";
            }
            else
            {
                d.style.display = "none";
            }
        }
    }

    this.clear = function() {
        this.buttonhandlers = [null, null, null, null, null, null, null, null, null]
        this.used = 0;
    }

    this.unshowButton1 = function() {
        var d = document.getElementById("buttons1");
        d.style.display = "block";
    }
}

var g_buttonManager = new ButtonManager();

function buttonHandler(id) {
    g_buttonManager.runHandler(id);
}

var showMenu1 = function(robots)
{
    g_buttonManager.clear();
    g_buttonManager.addButtonHandler("AI行动", function () {
        robots.selectedRobot.AI_action();
    })

    g_buttonManager.addButtonHandler("待命", function () {
        robots.setSelectedRobotInactive();
    })

    var robot = robots.selectedRobot;
    if (robot.canAttack1()) {
        g_buttonManager.addButtonHandler(robot.weapon1.name, function () {
            robot.attack1();
        })
    }
    if (robot.canAttack2()) {
        g_buttonManager.addButtonHandler(robot.weapon2.name, function () {
            robot.attack2();
        })
    }

    if (robot.pilot) {
        for (var i = 0; i < 19; ++i)
        {
            if (robot.pilot.spirit_table[i] && robot.pilot.spirit >= g_spirit_consume_table[i] && robot.canUseSpirit(i))
            {
                var text = g_spirit_name[i] + " (" + g_spirit_consume_table[i] + ")";
                (function(text2, i2) {
                    switch (i2) {
                        case 0: g_buttonManager.addButtonHandler(text2, function () { robot.use_sprit_0() }); break;
                        case 1: g_buttonManager.addButtonHandler(text2, function () { robot.use_sprit_1() }); break;
                        case 2: g_buttonManager.addButtonHandler(text2, function () { robot.use_sprit_2() }); break;
                        case 3: g_buttonManager.addButtonHandler(text2, function () { robot.use_sprit_3() }); break;
                        case 4: g_buttonManager.addButtonHandler(text2, function () { robot.use_sprit_4() }); break;
                        case 5: g_buttonManager.addButtonHandler(text2, function () { robot.use_sprit_5() }); break;
                        case 6: g_buttonManager.addButtonHandler(text2, function () { robot.use_sprit_6() }); break;
                        case 7: g_buttonManager.addButtonHandler(text2, function () { robot.use_sprit_7() }); break;
                        case 8: g_buttonManager.addButtonHandler(text2, function () { robot.use_sprit_8() }); break;
                        case 9: g_buttonManager.addButtonHandler(text2, function () { robot.use_sprit_9() }); break;
                        case 10: g_buttonManager.addButtonHandler(text2, function () { robot.use_sprit_10() }); break;
                        case 11: g_buttonManager.addButtonHandler(text2, function () { robot.use_sprit_11() }); break;
                        case 12: g_buttonManager.addButtonHandler(text2, function () { robot.use_sprit_12() }); break;
                        case 13: g_buttonManager.addButtonHandler(text2, function () { robot.use_sprit_13() }); break;
                        case 14: g_buttonManager.addButtonHandler(text2, function () { robot.use_sprit_14() }); break;
                        case 15: g_buttonManager.addButtonHandler(text2, function () { robot.use_sprit_15() }); break;
                        case 16: g_buttonManager.addButtonHandler(text2, function () { robot.use_sprit_16() }); break;
                        case 17: g_buttonManager.addButtonHandler(text2, function () { robot.use_sprit_17() }); break;
                        case 18: g_buttonManager.addButtonHandler(text2, function () { robot.use_sprit_18() }); break;
                        default: break;
                    }
                })(text, i);
                
                               

            }
        }
    }

    var transforms = robot.canTransform();
    if (transforms.length > 0) {
        for (var i = 0; i < transforms.length; ++i)
        {
            var property = transforms[i];

            (function (property) {

                g_buttonManager.addButtonHandler("变形为" + property.robotName, function () {
                    robot.transform(property);
                })
            })(property);
           
            
        }
    }

}