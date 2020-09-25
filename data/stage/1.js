var g_stages_data_stage1 = {
    map: [
        [4, 1, 1, 4, 4, 7, 7, 7, 2, 4, 4, 4, 4, 4, 4, 4,],
        [4, 1, 2, 1, 4, 7, 7, 1, 1, 1, 1, 12, 13, 4, 4, 4,],
        [4, 2, 2, 7, 2, 2, 1, 1, 1, 1, 2, 14, 15, 4, 4, 4,],
        [4, 4, 2, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 4, 4, 4,],
        [4, 7, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 4, 4,],
        [6, 7, 7, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 4,],
        [6, 7, 6, 2, 1, 1, 7, 1, 1, 1, 1, 3, 3, 3, 3, 3,],
        [6, 6, 6, 2, 2, 4, 4, 1, 1, 1, 1, 1, 3, 3, 8, 8,],
        [6, 7, 7, 7, 1, 7, 4, 4, 4, 4, 4, 1, 1, 4, 4, 8,],
        [7, 7, 7, 2, 2, 1, 1, 4, 4, 4, 4, 4, 1, 1, 4, 8,],
        [4, 7, 2, 1, 1, 1, 1, 2, 4, 4, 4, 4, 4, 4, 4, 4,],
        [4, 4, 2, 1, 1, 9, 1, 1, 1, 2, 2, 4, 4, 4, 4, 4,],
        [4, 4, 4, 4, 1, 2, 4, 4, 1, 1, 10, 2, 4, 4, 4, 4,],
        [5, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 2, 4, 4, 2,],
        [5, 5, 4, 4, 4, 4, 1, 1, 1, 1, 1, 2, 2, 4, 2, 2,],
        [5, 5, 5, 8, 1, 1, 1, 1, 1, 1, 1, 1, 6, 2, 2, 1,],
        [5, 5, 5, 8, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,],
        [5, 5, 5, 5, 8, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1,],
        [5, 5, 5, 5, 8, 8, 8, 1, 1, 1, 1, 6, 1, 2, 6, 1,],
        [5, 5, 5, 5, 5, 5, 8, 1, 1, 1, 1, 1, 1, 1, 6, 6,]],
    enemy_init : [
        [1, 1, 8, 3, 3, 54, 1, 5, "士兵", "乍克", "8", 32],
        [1, 1, 9, 4, 3, 54, 1, 5, "士兵", "乍克", "8", 32],
        [1, 1, 10, 5, 3, 54, 1, 12, "士兵", "乍克", "12", 32],
        [1, 1, 3, 10, 3, 54, 0, 10, "士兵", "乍克", "0", 32],
        [1, 1, 4, 10, 3, 54, 0, 11, "士兵", "乍克", "0", 32],
        [1, 1, 5, 10, 3, 54, 0, 10, "士兵", "乍克", "0", 32],
        [1, 1, 9, 2, 3, 54, 2, 5, "士兵", "乍克", "8", 32],
        [1, 1, 10, 3, 3, 54, 2, 12, "士兵", "乍克", "12", 32],
        [1, 1, 11, 4, 3, 54, 2, 12, "士兵", "乍克", "12", 32],
        [1, 1, 7, 6, 2, 42, 0, 11, "——", "布达MZ", "0", 38],
        [1, 1, 8, 7, 2, 43, 0, 11, "——", "拉达K7", "0", 37],
        [1, 1, 12, 1, 2, 86, 3, 12, "——", "宰恩Ⅱ", "12", 39],
        [1, 1, 11, 3, 3, 70, 2, 12, "士兵", "巴勒", "12", 42]],
    robot_init : [
        [1, 1, 12, 16, 1, 6, "大卫", 126, "刚达"],
        [1, 1, 14, 16, 4, 15, "由美", 34, "阿波罗A"],
        [1, 1, 13, 17, 3, 7, "加代", 29, "金Z"],
        [1, 1, 12, 18, 2, 8, "龙", 2, "盖塔1"],
        [1, 1, 14, 18, 5, 17, "杰克", 35, "太勒"],
        [1, 1, 15, 19, 0, 54, "乔", 161, "怀特"], ],
    talk_map : [
        // 机师，机体
        [54, 161, "首要问题是如何整备战斗力"],
        [54, 161, "要解救基地里的卡姆和刚达z，有什么问题吗？"],
        [8, 2, "那基地有多少人？"],
        [54, 161, "没多少，我们现在的战斗力完全可以解决他们。"],
        [7, 29, "哼！敌人再多来点，我也能收拾掉！"],
        [15, 34, "别说大话……"],
        [9, 3, "总之要见机行事，出击吧！"],   ],
    round_event :  {
        1: {
            talks: 
            [
                [54, 161, "很好，正如情报所说，敌人防守较差"],
                [54, 161, "全歼他们！就出热核装置！"],
                [7, 29, "是！我去把他们全干掉！"],
                [15, 34, "加代，可不能蛮干呀！HP减少的话，我给你修理。"],
                [54, 161, "如果有人受伤，不要勉强。让阿波罗A给你们修理，或者回我这里。"],
                [6, 126, "明白了，舰长"],
            ],
        },
        11: {
            addEnemys : [
            [1, 11, 1, 0, 22, 175, 12, 2, "凯", "乍克（瞎鸭用）", "0", 32],
            [1, 11, 2, 0, 79, 54, 4, 3, "莫尼", "乍克", "0", 32],
            [1, 11, 2, 1, 80, 54, 1, 4, "邓肯", "乍克", "0", 32]],
            talks: 
                [
                    [22, 175, "真走运，居然在这儿碰上这么好的猎物……"],
                    [79, 54, "我们先去侦查一下。"],
                    [22, 175, "嗯，在了解敌情之前不可贸然进攻。"],
                    [79, 54, "是。金，出发！"],
                    [80, 54, "是！"],
                ]
        }
    }
    
}