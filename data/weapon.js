var g_weapon_data = [
//编号, 武器名称, 地址, 射程, 命中, , 空, 陆, 海
[0, "NaN", "B29D", 1, 110, 0, 50, 50, 40],
[1, "光剑1级", "B29D", 1, 110, 0, 50, 50, 40],
[2, "光剑2级", "B2A3", 1, 110, 0, 65, 65, 55],
[3, "光剑3级", "B2A9", 1, 110, 0, 80, 80, 70],
[4, "光剑4级", "B2AF", 1, 120, 0, 95, 95, 85],
[5, "光剑5级", "B2B5", 1, 120, 0, 120, 120, 105],
[6, "光束枪1级", "B2BB", 1, 85, 0, 70, 60, 0],
[7, "光束枪2级", "B2C1", 1, 85, 0, 85, 75, 0],
[8, "光束枪3级", "B2C7", 1, 85, 0, 100, 90, 0],
[9, "光束枪4级", "B2CD", 1, 90, 0, 115, 105, 0],
[10, "光束枪5级", "B2D3", 1, 95, 0, 140, 130, 0],
[11, "导弹1", "B2D9", 4, 80, 1, 50, 60, 50],
[12, "导弹2", "B2DF", 4, 80, 1, 70, 80, 70],
[13, "导弹3", "B2E5", 5, 80, 1, 90, 100, 90],
[14, "穿甲弹1", "B2EB", 1, 84, 0, 50, 70, 30],
[15, "光子射线", "B2F1", 1, 115, 0, 30, 30, 0],
[16, "机械刀", "B2F7", 1, 98, 0, 65, 85, 50],
[17, "火焰喷射器", "B2FD", 1, 80, 0, 0, 120, 0],
[18, "中子刀", "B303", 1, 110, 0, 90, 90, 90],
[19, "原子钻", "B309", 1, 102, 0, 120, 130, 50],
[20, "闪电", "B30F", 1, 88, 0, 100, 160, 0],
[21, "光回旋镖", "B315", 1, 102, 0, 100, 100, 100],
[22, "质子炮", "B31B", 1, 90, 0, 0, 180, 0],
[23, "压力钻", "B321", 1, 102, 0, 110, 110, 110],
[24, "盖塔战斧1", "B327", 1, 110, 0, 50, 20, 0],
[25, "盖塔战斧2", "B32D", 1, 110, 0, 65, 35, 0],
[26, "盖塔射线1", "B333", 1, 80, 0, 70, 65, 0],
[27, "盖塔射线2", "B339", 1, 80, 0, 85, 80, 0],
[28, "盖塔射线3", "B33F", 1, 80, 0, 120, 115, 0],
[29, "回旋钻1", "B345", 1, 108, 0, 0, 60, 50],
[30, "回旋钻2", "B34B", 1, 110, 0, 0, 75, 65],
[31, "神风钻1", "B351", 1, 82, 0, 0, 80, 0],
[32, "神风钻2", "B357", 1, 84, 0, 0, 95, 0],
[33, "冷冻液1", "B35D", 1, 80, 0, 0, 55, 80],
[34, "冷冻液2", "B363", 1, 82, 0, 0, 70, 95],
[35, "盖塔导弹1", "B369", 3, 98, 0, 0, 0, 70],
[36, "盖塔导弹2", "B36F", 4, 100, 0, 5, 0, 85],
[37, "远程激光炮1", "B375", 6, 95, 1, 150, 150, 0],
[38, "远程激光炮2", "B37B", 7, 98, 1, 170, 170, 0],
[39, "高能激光束", "B381", 1, 100, 0, 110, 110, 0],
[40, "高能光剑1", "B387", 1, 120, 0, 95, 95, 95],
[41, "高能光剑2", "B38D", 1, 120, 0, 110, 110, 110],
[42, "激光子母炮2", "B393", 6, 110, 0, 118, 118, 118],
[43, "激光子母炮3", "B399", 7, 120, 0, 138, 138, 138],
[44, "激光子母炮1", "B39F", 5, 110, 0, 98, 98, 98],
[45, "中子炮1", "B3A5", 1, 100, 0, 125, 125, 0],
[46, "中子炮2", "B3AB", 1, 100, 0, 150, 150, 0],
[47, "手持光束枪", "B3B1", 1, 110, 0, 90, 90, 0],
[48, "螺旋粉碎器", "B3B7", 1, 98, 0, 95, 95, 80],
[49, "反重力风暴", "B3BD", 1, 110, 0, 110, 110, 0],
[50, "十字镖", "B3C3", 1, 100, 0, 80, 120, 120],
[51, "宇宙闪电", "B3C9", 1, 100, 0, 145, 145, 0],
[52, "双面钩", "B3CF", 1, 100, 0, 50, 150, 150],
[53, "双刃战斧1", "B3D5", 1, 110, 0, 95, 90, 0],
[54, "双刃战斧2", "B3DB", 1, 110, 0, 110, 105, 0],
[55, "双刃战斧3", "B3E1", 1, 110, 0, 125, 120, 0],
[56, "链子炮3", "B3E7", 1, 100, 0, 0, 135, 105],
[57, "链子炮1", "B3ED", 1, 100, 0, 0, 105, 75],
[58, "链子炮2", "B3F3", 1, 100, 0, 0, 120, 90],
[59, "格雷导弹1", "B3F9", 3, 100, 1, 0, 95, 0],
[60, "格雷导弹2", "B3FF", 4, 100, 1, 0, 115, 0],
[61, "气旋炮1", "B405", 1, 90, 0, 0, 80, 135],
[62, "气旋炮2", "B40B", 1, 90, 0, 0, 90, 150],
[63, "鱼雷1", "B411", 3, 100, 1, 0, 0, 100],
[64, "鱼雷2", "B417", 4, 100, 1, 0, 0, 115],
[65, "组合刀1", "B41D", 1, 100, 0, 40, 40, 40],
[66, "脉冲波", "B423", 230, 140, 0, 120, 120, 0],
[67, "组合刀2", "B429", 1, 100, 0, 60, 60, 60],
[68, "射线枪1", "B42F", 230, 140, 0, 135, 135, 0],
[69, "锯齿刀", "B435", 1, 100, 0, 80, 80, 80],
[70, "射线枪2", "B43B", 231, 140, 0, 150, 150, 0],
[71, "萨斯剑", "B441", 1, 100, 0, 0, 45, 45],
[72, "左轮手枪", "B447", 1, 80, 0, 60, 60, 60],
[73, "激光剑", "B44D", 1, 120, 0, 40, 40, 40],
[74, "激光枪", "B453", 1, 120, 0, 60, 60, 60],
[75, "火箭弹", "B459", 5, 75, 1, 120, 120, 0],
[76, "激光1", "B45F", 1, 90, 0, 60, 30, 0],
[77, "激光2", "B465", 1, 90, 0, 80, 50, 0],
[78, "激光3", "B46B", 1, 90, 0, 100, 70, 0],
[79, "高压电1", "B471", 1, 95, 0, 40, 80, 0],
[80, "高压电2", "B477", 1, 95, 0, 50, 90, 0],
[81, "光刀", "B47D", 1, 90, 0, 50, 60, 50],
[82, "鞭", "B483", 1, 98, 0, 80, 80, 80],
[83, "步枪", "B489", 7, 120, 1, 90, 90, 90],
[84, "手枪", "B48F", 1, 100, 0, 70, 70, 0],
[85, "溶解液", "B495", 1, 80, 0, 100, 110, 0],
[86, "角", "B49B", 1, 75, 0, 0, 90, 80],
[87, "战斧", "B4A1", 1, 80, 0, 0, 100, 95],
[88, "破坏光线1", "B4A7", 1, 65, 0, 70, 70, 0],
[89, "破坏光线2", "B4AD", 1, 65, 0, 140, 140, 0],
[90, "矛", "B4B3", 1, 90, 0, 0, 100, 100],
[91, "毒液", "B4B9", 1, 95, 0, 70, 90, 0],
[92, "红外线", "B4BF", 1, 90, 0, 50, 50, 0],
[93, "导弹", "B4C5", 4, 90, 0, 50, 50, 50],
[94, "大炮", "B4CB", 6, 80, 1, 50, 100, 60],
[95, "远程导弹1", "B4D1", 4, 100, 1, 110, 0, 0],
[96, "远程导弹2", "B4D7", 5, 100, 1, 140, 0, 0],
[97, "远程导弹3", "B4DD", 6, 100, 1, 170, 0, 0],
[98, "喷火器1", "B4E3", 1, 100, 0, 40, 60, 0],
[99, "喷火器2", "B4E9", 1, 100, 0, 60, 80, 0],
[100, "撞击器", "B4EF", 1, 98, 0, 70, 70, 70],
[101, "三指叉", "B4F5", 1, 110, 0, 40, 40, 0],
[102, "连发枪", "B4FB", 1, 100, 0, 50, 50, 50],
[103, "75高射炮", "B501", 1, 110, 0, 55, 55, 50],
[104, "热能剑", "B507", 1, 110, 0, 65, 65, 60],
[105, "红外线枪", "B50D", 1, 90, 0, 0, 90, 0],
[106, "反坦克炮", "B513", 1, 80, 0, 65, 80, 50],
[107, "扩散光炮1", "B519", 1, 120, 1, 40, 40, 0],
[108, "扩散光炮2", "B51F", 1, 120, 1, 60, 60, 0],
[109, "扩散光炮3", "B525", 1, 120, 1, 100, 100, 0],
[110, "远程粒子炮", "B52B", 6, 90, 1, 150, 150, 0],
[111, "防空粒子炮", "B531", 1, 120, 0, 90, 90, 0],
[112, "粒子炮1", "B537", 1, 100, 0, 40, 40, 0],
[113, "粒子炮2", "B53D", 4, 95, 1, 70, 70, 0],
[114, "粒子炮3", "B543", 5, 95, 1, 100, 100, 0],
[115, "子母弹1", "B549", 6, 95, 1, 130, 130, 0],
[116, "子母弹2", "B54F", 7, 95, 1, 170, 170, 0],
[117, "高能光炮", "B555", 6, 120, 0, 60, 60, 50],
[118, "激光加农炮", "B55B", 4, 120, 0, 80, 80, 80],
[119, "手持导弹", "B561", 1, 120, 0, 40, 40, 0],
[120, "机械爪", "B567", 1, 120, 0, 40, 40, 40],
[121, "激光枪", "B56D", 1, 120, 0, 0, 40, 70],
[122, "激光子母炮", "B573", 1, 95, 0, 160, 160, 0],
[123, "激光剑2", "B579", 7, 160, 0, 130, 130, 130],
[124, "激光剑3", "B57F", 7, 160, 0, 150, 150, 150],
[125, "激光剑1", "B585", 7, 160, 0, 120, 120, 120],
[126, "激光剑4", "B58B", 7, 160, 0, 150, 150, 150],
[127, "激光剑5", "B591", 9, 160, 0, 120, 120, 120],
[128, "扩散粒子炮", "B597", 1, 120, 0, 150, 150, 150],
[129, "激光剑6", "B59D", 8, 160, 0, 160, 160, 160],
[130, "三栖导弹1", "B5A3", 1, 120, 1, 80, 80, 0],
[131, "三栖导弹2", "B5A9", 1, 130, 1, 100, 100, 0],
[132, "三栖导弹3", "B5AF", 1, 140, 1, 120, 120, 0],
[133, "三栖导弹4", "B5B5", 1, 150, 1, 140, 140, 0],
[134, "激光炮", "B5BB", 6, 120, 1, 150, 150, 150],
[135, "激光刀", "B5C1", 1, 120, 0, 40, 40, 0],
[136, "激光战斧", "B5C7", 1, 120, 0, 80, 80, 70],
[137, "子母炮", "B5CD", 1, 120, 0, 0, 40, 40],
[138, "近距导弹", "B5D3", 5, 120, 0, 100, 100, 100],
[139, "超级粒子炮", "B5D9", 1, 105, 1, 120, 120, 0],
[140, "激光剑1", "B5DF", 5, 120, 1, 80, 80, 0],
[141, "激光剑2", "B5E5", 6, 120, 1, 130, 130, 0],
[142, "激光剑3", "B5EB", 7, 120, 1, 180, 180, 0],
[143, "质子刀", "B5F1", 3, 120, 0, 80, 80, 80],
[144, "激光枪", "B5F7", 5, 120, 0, 170, 170, 170],
[145, "激光剑", "B5FD", 1, 95, 0, 90, 90, 0],
[146, "尾巴", "B603", 1, 120, 0, 0, 80, 80],
[147, "火焰弹", "B609", 1, 100, 0, 0, 40, 70],
[148, "火箭弹", "B60F", 1, 120, 0, 40, 40, 0],
[149, "离子剑", "B615", 1, 105, 0, 80, 40, 40],
[150, "冷冻光线", "B61B", 1, 112, 0, 0, 80, 40],
[151, "蝶形光枪", "B621", 1, 120, 0, 40, 40, 40],
[152, "回旋镖1", "B627", 17, 120, 0, 70, 70, 0],
[153, "回旋镖2", "B62D", 1, 100, 0, 80, 80, 40],
[154, "粉碎机", "B633", 1, 120, 0, 40, 40, 40],
[155, "G加农炮", "B639", 6, 120, 0, 40, 40, 40],
[156, "激光剑休", "B63F", 1, 160, 0, 230, 230, 230],
[157, "能量球休", "B645", 8, 160, 1, 220, 220, 220],
[158, "激光剑", "B64B", 1, 160, 0, 100, 100, 100],
[159, "离子波", "B651", 7, 160, 1, 190, 190, 190],
[160, "离子波", "B657", 3, 80, 1, 150, 150, 0],
[161, "粒子加农炮", "B65D", 4, 85, 1, 180, 180, 0],
[162, "粒子加农炮", "B663", 1, 200, 0, 200, 200, 200],
[163, "十字捣碎机", "B669", 9, 200, 1, 255, 255, 255],
[164, "恢复HP", "B66F", 241, 120, 0, 0, 0, 0],
[165, "气旋光束", "B675", 4, 120, 1, 90, 80, 0],
[166, "热能炮", "B67B", 1, 90, 0, 105, 95, 0],
[167, "气旋光束", "B681", 4, 100, 1, 90, 90, 0],
[168, "气旋光束", "B687", 5, 100, 1, 110, 110, 0],
[169, "双刃刀", "B68D", 1, 95, 0, 120, 120, 0],
[170, "双刃刀", "B693", 1, 95, 0, 150, 150, 0],
[171, "马林导弹", "B699", 5, 120, 1, 0, 0, 120],
[172, "离子刀", "B69F", 1, 120, 0, 0, 0, 150],
[173, "神风导弹", "B6A5", 5, 120, 1, 0, 120, 0],
[174, "紫外线枪", "B6AB", 1, 120, 0, 0, 150, 0],
[175, "20机枪1", "B6B1", 1, 120, 0, 10, 10, 10],
[176, "20机枪2", "B6B7", 1, 120, 0, 30, 30, 30],
[177, "20机枪3", "B6BD", 1, 120, 0, 50, 50, 50],
[178, "20机枪4", "B6C3", 1, 120, 0, 70, 70, 70],
[179, "能量波1", "B6C9", 1, 120, 0, 40, 40, 40],
[180, "能量波2", "B6CF", 1, 120, 0, 80, 80, 80],
[181, "冲击波1", "B6D5", 1, 85, 0, 180, 180, 0],
[182, "冲击波2", "B6DB", 1, 85, 0, 200, 200, 0],
[183, "格雷导弹", "B6E1", 5, 100, 1, 0, 135, 0],
[184, "射线枪", "B6E7", 1, 90, 0, 0, 100, 165],
[185, "射线枪", "B6ED", 5, 100, 1, 0, 0, 135],
[186, "穿甲弹2", "B6F3", 1, 60, 0, 60, 120, 120],
[187, "高能穿甲弹", "B6F9", 1, 60, 0, 80, 160, 160],
[188, "DX穿甲弹", "B6FF", 1, 60, 0, 100, 200, 200],

]