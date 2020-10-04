var g_robot_data = [
// 编号,机体名称,属性地址,类型,技能,小图标地址,机动,速度,强度,防卫,金钱,HP1,HP2,经验,,速度成长,强度成长,防卫成长,HP成长,HP,图标,编号,机体名称,武器地址,武器1,武器2,武器名1,武器名2

[0, "Null", "Null", 8, 0, 16, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, "Null", "Null", 0, 0, "NaN", "NaN"],
[1, "盖塔", "A1EA", 8, 0, 16, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, "盖塔", "AF9F", 0, 0, "NaN", "NaN"],
[2,"盖塔1" ,"A1FA",24,0,16,7,55,90,55,30,54,1,100,0,1,7,1,3,310,4,2,"盖塔1" ,"AFA1",24,26,"盖塔战斧1","盖塔射线1"],
[3,"盖塔2" ,"A20A",41,0,20,8,73,85,55,30,54,1,100,0,1,7,1,3,310,5,3,"盖塔2" ,"AFA3",29,31,"回旋钻1","神风钻1"],
[4,"盖塔3" ,"A21A",58,0,24,8,48,95,60,30,54,1,100,0,1,7,1,3,310,6,4,"盖塔3" ,"AFA5",33,35,"冷冻液1","盖塔导弹1"],
[5,"盖塔" ,"A1EA",8,0,16,0,0,0,0,30,0,0,0,0,0,0,0,0,0,4,5,"盖塔" ,"AFA7",0,0,"NaN","NaN"],
[6,"盖塔1" ,"A1FA",24,0,16,7,55,90,55,30,54,1,100,0,1,7,1,3,310,4,6,"盖塔1" ,"AFA9",25,27,"盖塔战斧2","盖塔射线2"],
[7,"盖塔2" ,"A20A",41,0,20,8,73,85,55,30,54,1,100,0,1,7,1,3,310,5,7,"盖塔2" ,"AFAB",30,32,"回旋钻2","神风钻2"],
[8,"盖塔3" ,"A21A",58,0,24,8,48,95,60,30,54,1,100,0,1,7,1,3,310,6,8,"盖塔3" ,"AFAD",34,36,"冷冻液2","盖塔导弹2"],
[9,"刚达" ,"A22A",5,0,88,4,40,105,75,50,48,2,30,0,0,1,0,3,560,22,9,"刚达" ,"AFAF",131,0,"三栖导弹2","NaN"],
[10,"刚达（MA）" ,"A23A",20,0,88,5,40,105,75,50,48,2,30,0,0,1,0,3,560,22,10,"刚达（MA）" ,"AFB1",131,140,"三栖导弹2","激光剑1"],
[11,"刚达Ⅱ" ,"A24A",5,0,0,4,40,120,75,100,188,2,40,0,0,1,0,3,700,0,11,"刚达Ⅱ" ,"AFB3",132,142,"三栖导弹3","激光剑3"],
[12,"刚达Ⅱ（MA）" ,"A25A",20,0,0,5,40,120,75,100,188,2,40,0,0,1,0,3,700,0,12,"刚达Ⅱ（MA）" ,"AFB5",132,142,"三栖导弹3","激光剑3"],
[13,"西马（MA）" ,"A26A",20,0,160,8,75,60,40,10,44,1,20,0,0,0,0,3,300,1300,13,"西马（MA）" ,"AFB7",7,0,"光束枪2级","NaN"],
[14,"西马" ,"A27A",5,0,160,5,75,68,35,10,44,1,20,0,0,0,0,3,300,1300,14,"西马" ,"AFB9",7,1,"光束枪2级","光剑1级"],
[15,"刚克" ,"A28A",5,0,132,5,68,78,40,10,168,2,25,0,0,1,0,3,680,33,15,"刚克" ,"AFBB",130,0,"三栖导弹1","NaN"],
[16,"刚克" ,"A28A",5,0,132,5,68,78,40,10,168,2,25,0,0,1,0,3,680,33,16,"刚克" ,"AFBD",130,7,"三栖导弹1","光束枪2级"],
[17,"卡扎C" ,"A29A",1,0,144,5,65,60,35,10,210,0,18,0,0,0,0,2,210,17,17,"卡扎C" ,"AFBF",2,7,"光剑2级","光束枪2级"],
[18,"卡扎C" ,"A29A",1,0,144,5,65,60,35,10,210,0,18,0,0,0,0,2,210,17,18,"卡扎C" ,"AFC1",2,7,"光剑2级","光束枪2级"],
[19,"麦萨拉（MA）" ,"A2AA",20,0,144,10,68,80,55,10,182,3,30,0,0,0,0,3,950,36,19,"麦萨拉（MA）" ,"AFC3",115,0,"子母弹1","NaN"],
[20,"麦萨拉" ,"A2BA",5,0,144,5,60,88,48,10,182,3,30,0,0,0,0,3,950,36,20,"麦萨拉" ,"AFC5",115,5,"子母弹1","光剑5级"],
[21,"拉比" ,"A2CA",1,0,160,6,78,62,38,10,240,0,20,0,1,0,0,2,240,40,21,"拉比" ,"AFC7",3,0,"光剑3级","NaN"],
[22,"拉比" ,"A2CA",1,0,160,6,78,62,38,10,240,0,20,0,1,0,0,2,240,40,22,"拉比" ,"AFC9",3,8,"光剑3级","光束枪3级"],
[23,"巴斯塔" ,"A2DA",5,0,80,8,65,72,40,80,29,1,100,0,1,1,1,2,285,20,23,"巴斯塔" ,"AFCB",65,66,"组合刀1","脉冲波"],
[24,"巴得" ,"A2EA",20,0,80,10,65,72,35,80,29,1,100,0,1,1,1,2,285,20,24,"巴得" ,"AFCD",66,0,"脉冲波","NaN"],
[25,"巴斯塔" ,"A2DA",5,0,80,8,65,72,40,80,29,1,100,0,1,1,1,2,285,20,25,"巴斯塔" ,"AFCF",67,66,"组合刀2","脉冲波"],
[26,"巴得" ,"A2EA",20,0,80,10,65,72,35,80,29,1,100,0,1,1,1,2,285,20,26,"巴得" ,"AFD1",66,0,"脉冲波","NaN"],
[27,"巴斯塔" ,"A2DA",5,0,80,8,65,72,40,80,29,1,100,0,1,1,1,2,285,20,27,"巴斯塔" ,"AFD3",69,66,"锯齿刀","脉冲波"],
[28,"巴得" ,"A2EA",20,0,80,10,65,72,35,80,29,1,100,0,1,1,1,2,285,20,28,"巴得" ,"AFD5",66,0,"脉冲波","NaN"],
[29,"金Z" ,"A2FA",1,0,8,5,45,85,70,30,104,1,100,0,1,1,7,3,360,2,29,"金Z" ,"AFD7",14,15,"穿甲弹1","光子射线"],
[30,"金Z" ,"A2FA",1,0,8,5,45,85,70,30,104,1,100,0,1,1,7,3,360,2,30,"金Z" ,"AFD9",16,17,"机械刀","火焰喷射器"],
[31,"金" ,"A30A",0,0,12,7,50,105,85,80,194,1,100,0,1,1,7,3,450,3,31,"金" ,"AFDB",18,19,"中子刀","原子钻"],
[32,"金" ,"A30A",0,0,12,7,50,105,85,80,194,1,100,0,1,1,7,3,450,3,32,"金" ,"AFDD",20,21,"闪电","光回旋镖"],
[33,"金" ,"A30A",0,0,12,7,50,105,85,80,194,1,100,0,1,1,7,3,450,3,33,"金" ,"AFDF",22,23,"质子炮","压力钻"],
[34,"阿波罗A" ,"A31A",1,0,40,5,50,68,55,10,24,1,100,0,0,0,0,2,280,10,34,"阿波罗A" ,"AFE1",93,164,"导弹","恢复HP"],
[35,"太勒" ,"A32A",0,0,60,6,52,70,45,10,34,1,100,0,0,0,0,2,290,15,35,"太勒" ,"AFE3",71,72,"萨斯剑","左轮手枪"],
[36,"道尔" ,"A33A",1,0,52,6,65,75,48,10,44,1,100,0,0,0,0,3,300,13,36,"道尔" ,"AFE5",0,0,"NaN","NaN"],
[37,"道尔" ,"A33A",1,0,52,6,65,75,48,10,44,1,100,0,0,0,0,3,300,13,37,"道尔" ,"AFE7",0,0,"NaN","NaN"],
[38,"盖塔Q" ,"A34A",1,0,160,5,60,75,45,10,44,1,18,0,0,0,0,3,300,40,38,"盖塔Q" ,"AFE9",151,26,"蝶形光枪","盖塔射线1"],
[39,"博思" ,"A35A",1,0,100,4,40,80,45,5,79,1,100,0,1,7,1,3,335,25,39,"博思" ,"AFEB",186,0,"穿甲弹2","NaN"],
[40,"博思" ,"A35A",1,0,100,4,40,80,45,5,79,1,100,0,1,7,1,3,335,25,40,"博思" ,"AFED",187,0,"高能穿甲弹","NaN"],
[41,"博思" ,"A35A",1,0,100,4,40,80,45,5,79,1,100,0,1,7,1,3,335,25,41,"博思" ,"AFEF",188,0,"DX穿甲弹","NaN"],
[42,"布达MZ" ,"A36A",1,0,152,5,35,64,25,10,89,1,25,0,0,0,0,3,345,38,42,"布达MZ" ,"AFF1",76,79,"激光1","高压电1"],
[43,"拉达K7" ,"A37A",1,0,148,5,35,60,25,10,94,1,22,0,0,0,0,2,350,37,43,"拉达K7" ,"AFF3",81,11,"光刀","导弹1"],
[44,"米巴" ,"A38A",1,0,96,5,48,75,50,30,44,1,28,0,0,1,0,3,300,24,44,"米巴" ,"AFF5",14,17,"穿甲弹1","火焰喷射器"],
[45,"拉英X" ,"A39A",1,128,128,5,48,88,45,20,218,2,35,0,0,1,0,3,730,450,45,"拉英X" ,"AFF7",82,0,"鞭","NaN"],
[46,"诺巴M9" ,"A3AA",1,0,148,6,65,78,35,10,220,0,22,0,0,0,0,3,220,460,46,"诺巴M9" ,"AFF9",83,84,"步枪","手枪"],
[47,"古塔" ,"A3BA",0,0,152,5,48,75,38,10,154,1,22,0,0,0,0,3,410,38,47,"古塔" ,"AFFB",85,0,"溶解液","NaN"],
[48,"撞击器" ,"A3CA",1,0,172,5,35,55,45,10,44,1,30,0,0,0,0,3,300,43,48,"撞击器" ,"AFFD",86,95,"角","远程导弹1"],
[49,"布X1" ,"A3DA",1,128,128,5,42,148,48,10,68,2,38,0,1,1,0,3,580,32,49,"布X1" ,"AFFF",87,89,"战斧","破坏光线2"],
[50,"切克" ,"A3EA",1,0,184,6,40,70,30,10,144,1,28,0,0,0,0,3,400,46,50,"切克" ,"B001",90,88,"矛","破坏光线1"],
[51,"格尔" ,"A3FA",0,6,156,6,55,78,47,10,180,0,22,0,0,0,0,3,180,39,51,"格尔" ,"B003",91,0,"毒液","NaN"],
[52,"邦巴" ,"A40A",65,0,172,5,48,102,50,10,132,3,28,0,0,1,0,3,900,43,52,"邦巴" ,"B005",149,94,"离子剑","大炮"],
[53,"基尔" ,"A41A",0,1,176,6,56,80,26,10,220,0,20,0,0,0,0,2,220,44,53,"基尔" ,"B007",100,99,"撞击器","喷火器2"],
[54,"乍克" ,"A42A",1,0,128,4,55,40,28,8,180,0,18,0,0,0,0,2,180,32,54,"乍克" ,"B009",101,102,"三指叉","连发枪"],
[55,"古夫" ,"A43A",1,0,132,5,58,42,32,10,220,0,20,0,0,0,0,2,220,33,55,"古夫" ,"B00B",103,105,"75高射炮","红外线枪"],
[56,"德姆" ,"A44A",1,0,136,7,60,50,35,11,250,0,21,0,0,0,0,2,250,34,56,"德姆" ,"B00D",104,106,"热能剑","反坦克炮"],
[57,"加恩" ,"A45A",1,0,172,6,70,110,50,10,212,3,38,0,0,1,0,3,980,57,57,"加恩" ,"B00F",5,13,"光剑5级","导弹3"],
[58,"雷克" ,"A46A",0,0,120,7,70,45,20,25,200,0,40,0,0,0,0,2,200,30,58,"雷克" ,"B011",107,164,"扩散光炮1","恢复HP"],
[59,"比克" ,"A47A",1,0,180,4,45,120,70,50,232,3,40,0,0,1,0,3,1000,59,59,"比克" ,"B013",111,110,"防空粒子炮","远程粒子炮"],
[60,"艾文" ,"A48A",0,0,44,6,72,60,38,40,64,1,18,0,0,0,0,3,320,11,60,"艾文" ,"B015",112,117,"粒子炮1","高能光炮"],
[61,"吉恩" ,"A49A",128,0,152,6,70,70,48,0,188,2,26,0,0,0,0,3,700,38,61,"吉恩" ,"B017",113,118,"粒子炮2","激光加农炮"],
[62,"吉恩（首）" ,"A4AA",0,0,152,5,70,65,35,10,244,1,15,0,0,0,0,3,500,38,62,"吉恩（首）" ,"B019",113,0,"粒子炮2","NaN"],
[63,"斯特" ,"A4BA",2,0,176,7,65,55,30,10,220,0,15,0,0,0,0,3,220,44,63,"斯特" ,"B01B",120,121,"机械爪","激光枪"],
[64,"哈衣" ,"A4CA",2,0,180,7,65,55,38,10,200,0,15,0,0,0,0,2,200,45,64,"哈衣" ,"B01D",149,0,"离子剑","NaN"],
[65,"吉伯" ,"A4DA",1,0,16,8,75,70,55,80,124,1,100,0,1,0,0,3,380,4,65,"吉伯" ,"B01F",3,125,"光剑3级","激光剑1"],
[66,"基奥" ,"A4EA",1,128,140,9,98,188,70,40,12,8,50,0,1,1,1,3,2060,35,66,"基奥" ,"B021",128,122,"扩散粒子炮","激光子母炮"],
[67,"马登" ,"A4FA",1,0,164,6,76,62,35,10,94,1,24,0,0,0,0,2,350,41,67,"马登" ,"B023",2,7,"光剑2级","光束枪2级"],
[68,"帕拉" ,"A50A",1,0,124,6,62,124,32,10,84,1,30,0,0,1,0,3,340,31,68,"帕拉" ,"B025",132,134,"三栖导弹3","激光炮"],
[69,"巴依" ,"A51A",0,0,132,7,83,100,42,10,104,1,30,0,0,0,0,3,360,33,69,"巴依" ,"B027",3,8,"光剑3级","光束枪3级"],
[70,"巴勒" ,"A52A",1,0,168,5,63,70,20,10,230,0,18,0,0,0,0,2,230,42,70,"巴勒" ,"B029",11,95,"导弹1","远程导弹1"],
[71,"吉米" ,"A53A",1,0,136,7,73,92,41,10,84,1,22,0,0,0,0,3,340,34,71,"吉米" ,"B02B",136,8,"激光战斧","光束枪3级"],
[72,"盖马" ,"A54A",1,0,168,6,76,98,45,10,152,3,26,0,0,1,0,3,920,42,72,"盖马" ,"B02D",5,127,"光剑5级","激光剑5"],
[73,"伯希" ,"A55A",1,0,136,6,68,115,43,10,182,3,27,0,0,1,0,3,950,34,73,"伯希" ,"B02F",138,139,"近距导弹","超级粒子炮"],
[74,"巴乌" ,"A56A",1,0,148,8,82,95,40,10,44,1,28,0,1,0,0,2,300,37,74,"巴乌" ,"B031",4,8,"光剑4级","光束枪3级"],
[75,"加姆" ,"A57A",0,0,164,10,80,100,30,10,250,0,27,0,0,0,0,2,250,41,75,"加姆" ,"B033",141,0,"激光剑2","NaN"],
[76,"希卡" ,"A58A",1,0,140,8,74,110,40,10,114,1,25,0,0,1,0,3,370,35,76,"希卡" ,"B035",5,10,"光剑5级","光束枪5级"],
[77,"伯利" ,"A59A",1,0,8,8,65,122,58,140,148,2,38,0,0,1,0,3,660,2,77,"伯利" ,"B037",133,126,"三栖导弹4","激光剑4"],
[78,"基格" ,"A5AA",1,0,20,7,74,88,42,10,44,1,22,0,0,0,0,2,300,5,78,"基格" ,"B039",146,145,"尾巴","激光剑"],
[79,"亚克托" ,"A5BA",1,0,132,8,76,127,65,20,172,3,30,0,0,1,0,3,940,33,79,"亚克托" ,"B03B",4,123,"光剑4级","激光剑2"],
[80,"扎比" ,"A5CA",1,0,184,10,90,154,75,50,56,4,39,0,1,1,1,3,1080,46,80,"扎比" ,"B03D",5,124,"光剑5级","激光剑3"],
[81,"阿尔" ,"A5DA",0,0,172,5,65,186,75,40,188,7,42,0,0,1,0,3,1980,43,81,"阿尔" ,"B03F",133,129,"三栖导弹4","激光剑6"],
[82,"比纳" ,"A5EA",1,2,24,8,80,80,55,100,144,1,38,0,1,7,1,3,400,6,82,"比纳" ,"B041",5,10,"光剑5级","光束枪5级"],
[83,"兹" ,"A5FA",2,0,144,5,35,75,42,10,94,1,27,0,0,0,0,3,350,36,83,"兹" ,"B043",98,147,"喷火器1","火焰弹"],
[84,"巴得" ,"A60A",0,0,140,5,40,60,25,10,220,0,23,0,0,0,0,2,220,35,84,"巴得" ,"B045",11,148,"导弹1","火箭弹"],
[85,"扎依" ,"A61A",1,1,180,4,30,78,40,10,44,1,38,0,0,0,0,2,300,85,85,"扎依" ,"B047",86,149,"角","离子剑"],
[86,"宰恩Ⅱ" ,"A62A",1,0,156,5,44,76,40,15,164,1,20,0,0,0,0,3,420,39,86,"宰恩Ⅱ" ,"B049",149,150,"离子剑","冷冻光线"],
[87,"达衣" ,"A63A",1,0,128,4,45,134,62,10,0,5,38,0,0,1,0,3,1280,32,87,"达衣" ,"B04B",177,94,"20机枪3","大炮"],
[88,"希古" ,"A64A",0,128,128,7,70,125,38,10,232,3,28,0,0,1,0,3,1000,32,88,"希古" ,"B04D",78,89,"激光3","破坏光线2"],
[89,"麦卡" ,"A65A",0,6,156,6,65,75,38,10,244,1,26,0,0,0,0,3,500,39,89,"麦卡" ,"B04F",80,0,"高压电2","NaN"],
[90,"麦乔" ,"A66A",0,0,92,8,64,78,48,50,124,1,24,0,0,0,0,3,380,23,90,"麦乔" ,"B051",152,153,"回旋镖1","回旋镖2"],
[91,"科顿" ,"A67A",1,128,48,5,48,93,74,10,208,2,24,0,0,0,0,3,720,12,91,"科顿" ,"B053",100,78,"撞击器","激光3"],
[92,"坎普" ,"A68A",0,0,108,4,65,75,38,10,194,1,100,0,0,0,0,3,450,27,92,"坎普" ,"B055",175,164,"20机枪1","恢复HP"],
[93,"埃尔" ,"A69A",1,128,40,8,70,140,155,80,172,13,80,0,1,1,0,3,3500,10,93,"埃尔" ,"B057",156,157,"激光剑(休)","能量球(休)"],
[94,"埃尔" ,"A69A",1,128,40,8,70,140,155,80,172,13,80,0,1,1,0,3,3500,10,94,"埃尔" ,"B059",156,157,"激光剑(休)","能量球(休)"],
[95,"导弹" ,"A6AA",0,0,152,7,54,200,10,1,100,0,5,0,1,1,6,6,100,38,95,"导弹" ,"B05B",100,0,"撞击器","NaN"],
[96,"米巴X" ,"A6BA",1,0,96,5,48,70,55,10,44,1,18,0,0,0,0,3,300,96,96,"米巴X" ,"B05D",14,17,"穿甲弹1","火焰喷射器"],
[97,"艾文" ,"A6CA",0,0,44,6,72,60,38,10,64,1,18,0,0,0,0,3,320,11,97,"艾文" ,"B05F",112,117,"粒子炮1","高能光炮"],
[98,"古连" ,"A6DA",5,0,76,5,55,95,68,90,134,1,50,0,1,1,1,3,390,98,98,"古连" ,"B061",47,48,"手持光束枪","螺旋粉碎器"],
[99,"斯帕" ,"A6EA",20,0,76,7,55,95,68,90,134,1,100,0,1,1,1,3,390,19,99,"斯帕" ,"B063",165,166,"气旋光束","热能炮"],
[100,"古连" ,"A6DA",5,0,76,5,55,95,68,90,134,1,50,0,1,1,1,3,390,19,100,"古连" ,"B065",49,50,"反重力风暴","十字镖"],
[101,"双帕" ,"A6FA",20,0,76,8,55,95,68,90,134,1,100,0,1,1,1,3,390,19,101,"双帕" ,"B067",167,169,"气旋光束","双刃刀"],
[102,"古连" ,"A70A",13,0,76,5,55,95,68,120,134,1,100,0,1,1,1,3,390,19,102,"古连" ,"B069",51,52,"宇宙闪电","双面钩"],
[103,"双帕" ,"A71A",28,0,76,8,55,95,68,120,134,1,100,0,1,1,1,3,390,19,103,"双帕" ,"B06B",168,170,"气旋光束","双刃刀"],
[104,"钻帕" ,"A72A",44,0,76,8,55,95,68,120,134,1,100,0,1,1,1,3,390,19,104,"钻帕" ,"B06D",173,174,"神风导弹","紫外线枪"],
[105,"德帕" ,"A73A",60,0,76,8,55,95,68,120,134,1,100,0,1,1,1,3,390,19,105,"德帕" ,"B06F",171,172,"马林导弹","离子刀"],
[106,"麦塔斯" ,"A74A",5,0,84,6,68,60,45,10,44,1,100,0,4,1,1,3,300,21,106,"麦塔斯" ,"B071",73,164,"激光剑","恢复HP"],
[107,"麦塔斯（MA）" ,"A75A",20,0,84,8,68,50,40,10,44,1,100,0,4,1,1,3,300,21,107,"麦塔斯（MA）" ,"B073",73,164,"激光剑","恢复HP"],
[108,"麦塔斯" ,"A74A",5,0,84,6,68,60,45,10,44,1,100,0,4,1,1,3,300,21,108,"麦塔斯" ,"B075",74,164,"激光枪","恢复HP"],
[109,"麦塔斯（MA）" ,"A75A",20,0,84,8,68,50,40,10,44,1,100,0,4,1,1,3,300,21,109,"麦塔斯（MA）" ,"B077",74,164,"激光枪","恢复HP"],
[110,"麦塔斯" ,"A74A",5,0,84,6,68,60,45,10,44,1,100,0,4,1,1,3,300,21,110,"麦塔斯" ,"B079",3,164,"光剑3级","恢复HP"],
[111,"麦塔斯（MA）" ,"A75A",20,0,84,8,68,50,40,10,44,1,100,0,4,1,1,3,300,21,111,"麦塔斯（MA）" ,"B07B",113,164,"粒子炮2","恢复HP"],
[112,"麦塔斯" ,"A74A",5,0,84,6,68,60,45,10,44,1,100,0,4,1,1,3,300,21,112,"麦塔斯" ,"B07D",4,164,"光剑4级","恢复HP"],
[113,"麦塔斯（MA）" ,"A75A",20,0,84,8,68,50,40,10,44,1,100,0,4,1,1,3,300,21,113,"麦塔斯（MA）" ,"B07F",114,164,"粒子炮3","恢复HP"],
[114,"盖塔" ,"A76A",8,0,28,0,0,0,0,100,0,0,0,0,0,0,0,0,0,7,114,"盖塔" ,"B081",0,0,"NaN","NaN"],
[115,"盖塔龙" ,"A77A",24,0,28,8,60,132,54,100,144,1,100,0,1,7,1,3,400,7,115,"盖塔龙" ,"B083",53,28,"双刃战斧1","盖塔射线3"],
[116,"盖塔虎" ,"A78A",41,0,32,11,79,120,50,100,144,1,100,0,1,7,1,3,400,8,116,"盖塔虎" ,"B085",57,59,"链子炮1","格雷导弹1"],
[117,"盖塔海神" ,"A79A",58,0,36,7,52,133,55,100,144,1,100,0,1,7,1,3,400,9,117,"盖塔海神" ,"B087",61,63,"气旋炮1","鱼雷1"],
[118,"盖塔" ,"A76A",8,0,28,0,0,0,0,100,0,0,0,0,0,0,0,0,0,7,118,"盖塔" ,"B089",0,0,"NaN","NaN"],
[119,"盖塔龙" ,"A77A",24,0,28,8,60,132,54,100,144,1,100,0,1,7,1,3,400,7,119,"盖塔龙" ,"B08B",54,181,"双刃战斧2","冲击波1"],
[120,"盖塔虎" ,"A78A",41,0,32,11,79,120,50,100,144,1,100,0,1,7,1,3,400,8,120,"盖塔虎" ,"B08D",58,60,"链子炮2","格雷导弹2"],
[121,"盖塔海神" ,"A79A",58,0,36,7,52,133,55,100,144,1,100,0,1,7,1,3,400,9,121,"盖塔海神" ,"B08F",62,64,"气旋炮2","鱼雷2"],
[122,"盖塔" ,"A76A",8,0,28,0,0,0,0,100,0,0,0,0,0,0,0,0,0,7,122,"盖塔" ,"B091",0,0,"NaN","NaN"],
[123,"盖塔龙" ,"A77A",24,0,28,8,60,132,54,100,144,1,100,0,1,7,1,3,400,7,123,"盖塔龙" ,"B093",55,182,"双刃战斧3","冲击波2"],
[124,"盖塔虎" ,"A78A",41,0,32,11,79,120,50,100,144,1,100,0,1,7,1,3,400,8,124,"盖塔虎" ,"B095",56,183,"链子炮3","格雷导弹"],
[125,"盖塔海神" ,"A79A",58,0,36,7,52,133,55,100,144,1,100,0,1,7,1,3,400,9,125,"盖塔海神" ,"B097",184,185,"射线枪","射线枪"],
[126,"刚达" ,"A7AA",1,0,0,6,72,70,55,20,64,1,100,0,8,1,1,3,320,0,126,"刚达" ,"B099",1,6,"光剑1级","光束枪1级"],
[127,"阿马G" ,"A7BA",0,0,0,7,64,72,55,20,64,1,100,0,8,1,1,3,320,0,127,"阿马G" ,"B09B",113,0,"粒子炮2","NaN"],
[128,"刚达" ,"A7AA",1,0,0,6,72,70,55,20,64,1,100,0,8,1,1,3,320,0,128,"刚达" ,"B09D",2,7,"光剑2级","光束枪2级"],
[129,"阿马G" ,"A7BA",0,0,0,7,64,72,55,20,64,1,100,0,8,1,1,3,320,0,129,"阿马G" ,"B09F",114,0,"粒子炮3","NaN"],
[130,"刚达Z" ,"A7CA",5,0,64,6,73,72,55,40,84,1,100,0,8,7,1,3,340,16,130,"刚达Z" ,"B0A1",1,6,"光剑1级","光束枪1级"],
[131,"韦尔" ,"A7DA",20,0,64,9,72,74,55,40,84,1,100,0,8,7,1,3,340,16,131,"韦尔" ,"B0A3",113,0,"粒子炮2","NaN"],
[132,"刚达Z" ,"A7CA",5,0,64,6,73,72,55,40,84,1,100,0,8,7,1,3,340,16,132,"刚达Z" ,"B0A5",2,7,"光剑2级","光束枪2级"],
[133,"韦尔" ,"A7DA",20,0,64,9,72,74,55,40,84,1,100,0,8,7,1,3,340,16,133,"韦尔" ,"B0A7",114,0,"粒子炮3","NaN"],
[134,"刚达Z" ,"A7CA",5,0,64,6,73,72,55,40,84,1,100,0,8,7,1,3,340,16,134,"刚达Z" ,"B0A9",3,8,"光剑3级","光束枪3级"],
[135,"韦尔" ,"A7DA",20,0,64,9,72,74,55,40,84,1,100,0,8,7,1,3,340,16,135,"韦尔" ,"B0AB",115,0,"子母弹1","NaN"],
[136,"刚达Z" ,"A7CA",5,0,64,6,73,72,55,40,84,1,100,0,8,7,1,3,340,16,136,"刚达Z" ,"B0AD",4,37,"光剑4级","远程激光炮1"],
[137,"韦尔" ,"A7DA",20,0,64,9,72,74,55,40,84,1,100,0,8,7,1,3,340,16,137,"韦尔" ,"B0AF",37,0,"远程激光炮1","NaN"],
[138,"刚达Z" ,"A7CA",5,0,64,6,73,72,55,40,84,1,100,0,8,7,1,3,340,16,138,"刚达Z" ,"B0B1",5,38,"光剑5级","远程激光炮2"],
[139,"韦尔" ,"A7DA",20,0,64,9,72,74,55,40,84,1,100,0,8,7,1,3,340,16,139,"韦尔" ,"B0B3",38,0,"远程激光炮2","NaN"],
[140,"刚达R" ,"A7EA",1,0,4,7,92,92,70,120,164,1,100,0,8,7,1,3,420,1,140,"刚达R" ,"B0B5",3,44,"光剑3级","激光子母炮1"],
[141,"刚达R" ,"A7EA",1,0,4,7,92,92,70,120,164,1,100,0,8,7,1,3,420,1,141,"刚达R" ,"B0B7",4,42,"光剑4级","激光子母炮2"],
[142,"刚达R" ,"A7EA",1,0,4,7,92,92,70,120,164,1,100,0,8,7,1,3,420,1,142,"刚达R" ,"B0B9",5,43,"光剑5级","激光子母炮3"],
[143,"F91" ,"A7FA",1,2,72,8,82,88,60,50,144,1,100,0,1,1,7,3,400,18,143,"F91" ,"B0BB",2,7,"光剑2级","光束枪2级"],
[144,"F91" ,"A7FA",1,2,72,8,82,88,60,50,144,1,100,0,1,1,7,3,400,18,144,"F91" ,"B0BD",3,8,"光剑3级","光束枪3级"],
[145,"F91" ,"A7FA",1,2,72,8,82,88,60,50,144,1,100,0,1,1,7,3,400,18,145,"F91" ,"B0BF",4,45,"光剑4级","中子炮1"],
[146,"F91" ,"A7FA",1,2,72,8,82,88,60,50,144,1,100,0,1,1,7,3,400,18,146,"F91" ,"B0C1",5,46,"光剑5级","中子炮2"],
[147,"刚达ZZ" ,"A80A",5,0,68,6,60,88,57,50,114,1,100,0,1,7,1,3,370,17,147,"刚达ZZ" ,"B0C3",3,39,"光剑3级","高能激光束"],
[148,"齐托" ,"A81A",20,0,68,8,62,88,57,50,114,1,100,0,1,7,1,3,370,17,148,"齐托" ,"B0C5",11,8,"导弹1","光束枪3级"],
[149,"刚达ZZ" ,"A80A",5,0,68,6,60,88,57,50,114,1,100,0,1,7,1,3,370,17,149,"刚达ZZ" ,"B0C7",40,160,"高能光剑1","离子波"],
[150,"齐托" ,"A81A",20,0,68,8,62,88,57,50,114,1,100,0,1,7,1,3,370,17,150,"齐托" ,"B0C9",12,39,"导弹2","高能激光束"],
[151,"刚达ZZ" ,"A80A",5,0,68,6,60,88,57,50,114,1,100,0,1,7,1,3,370,17,151,"刚达ZZ" ,"B0CB",41,161,"高能光剑2","粒子加农炮"],
[152,"齐托" ,"A81A",20,0,68,8,62,88,57,50,114,1,100,0,1,7,1,3,370,17,152,"齐托" ,"B0CD",13,39,"导弹3","高能激光束"],
[153,"吉伯Ⅱ" ,"A82A",1,0,16,8,75,78,50,10,124,1,20,0,0,0,0,3,380,4,153,"吉伯Ⅱ" ,"B0CF",3,125,"光剑3级","激光剑1"],
[154,"伯利" ,"A83A",1,0,8,8,65,138,58,40,48,2,45,0,1,1,1,3,560,2,154,"伯利" ,"B0D1",133,126,"三栖导弹4","激光剑4"],
[155,"比纳" ,"A84A",1,2,24,8,80,80,56,10,144,1,28,0,1,1,0,3,400,6,155,"比纳" ,"B0D3",5,10,"光剑5级","光束枪5级"],
[156,"刚达" ,"A85A",20,0,88,5,40,105,70,10,48,2,25,0,0,1,0,3,560,22,156,"刚达" ,"B0D5",131,0,"三栖导弹2","NaN"],
[157,"刚达" ,"A86A",5,0,88,4,40,105,70,10,48,2,25,0,0,1,0,3,560,22,157,"刚达" ,"B0D7",131,140,"三栖导弹2","激光剑1"],
[158,"吉尔" ,"A87A",128,0,160,5,68,115,65,60,52,8,70,0,0,1,0,3,2100,40,158,"吉尔" ,"B0D9",158,159,"激光剑","离子波"],
[159,"麦加金刚" ,"A88A",0,0,164,5,78,130,90,100,216,14,80,0,0,1,0,3,3800,41,159,"麦加金刚" ,"B0DB",158,159,"激光剑","离子波"],
[160,"瓦尔" ,"A89A",1,0,112,7,70,150,70,0,168,22,0,0,1,1,0,3,5800,28,160,"瓦尔" ,"B0DD",162,163,"粒子加农炮","十字捣碎机"],
[161,"怀特" ,"A8AA",0,0,48,5,35,80,40,50,144,1,100,0,1,1,1,3,400,12,161,"怀特" ,"B0DF",113,175,"粒子炮2","20机枪1"],
[162,"阿格马" ,"A8BA",0,0,52,6,40,88,45,150,224,1,100,0,1,1,1,3,480,13,162,"阿格马" ,"B0E1",114,176,"粒子炮3","20机枪2"],
[163,"奈尔" ,"A8CA",0,0,56,7,47,99,50,200,28,2,100,0,1,1,1,3,540,14,163,"奈尔" ,"B0E3",116,177,"子母弹2","20机枪3"],
[164,"拉姆" ,"A8DA",0,0,60,8,59,100,55,250,188,2,100,0,1,1,1,3,700,15,164,"拉姆" ,"B0E5",116,178,"子母弹2","20机枪4"],
[165,"古尔" ,"A8EA",0,0,184,5,40,100,50,40,40,10,32,0,1,1,0,3,2600,165,165,"古尔" ,"B0E7",178,89,"20机枪4","破坏光线2"],
[166,"诺曼" ,"A8FA",0,0,104,5,10,10,10,10,44,1,100,0,0,0,0,3,300,26,166,"诺曼" ,"B0E9",100,96,"撞击器","远程导弹2"],
[167,"刚达Ⅱ" ,"A90A",5,0,0,4,40,110,70,30,88,2,38,0,0,1,0,3,600,0,167,"刚达Ⅱ" ,"B0EB",132,142,"三栖导弹3","激光剑3"],
[168,"刚达Ⅱ（MA）" ,"A91A",20,0,0,5,40,110,70,30,88,2,38,0,0,1,0,3,600,0,168,"刚达Ⅱ（MA）" ,"B0ED",132,142,"三栖导弹3","激光剑3"],
[169,"麦乔" ,"A92A",0,0,92,8,64,78,48,10,84,1,22,0,0,0,0,3,340,169,169,"麦乔" ,"B0EF",152,153,"回旋镖1","回旋镖2"],
[170,"盖塔Q" ,"A93A",1,0,160,5,65,75,45,10,44,1,10,0,0,0,0,3,300,40,170,"盖塔Q" ,"B0F1",151,26,"蝶形光枪","盖塔射线1"],
[171,"炮台" ,"A94A",1,0,156,0,30,110,20,5,70,0,20,0,0,0,0,3,70,171,171,"炮台" ,"B0F3",94,0,"大炮","NaN"],
[172,"发电镜" ,"A95A",1,0,156,0,10,10,10,5,144,1,8,0,0,0,0,3,400,39,172,"发电镜" ,"B0F5",177,0,"20机枪3","NaN"],
[173,"希亚" ,"A96A",0,0,176,5,68,160,50,110,216,14,48,0,0,1,0,3,3800,44,173,"希亚" ,"B0F7",109,116,"扩散光炮3","子母弹2"],
[174,"假古连" ,"A97A",0,0,184,6,40,60,35,50,124,1,20,0,0,0,0,3,380,46,174,"假古连" ,"B0F9",92,78,"红外线","激光3"],
[175,"乍克（瞎鸭用）" ,"A98A",1,0,128,6,65,65,40,8,44,1,22,0,0,0,0,3,300,32,175,"乍克（瞎鸭用）" ,"B0FB",101,102,"三指叉","连发枪"],
[176,"巴乌" ,"A99A",1,0,148,8,82,120,45,10,44,6,45,0,1,1,1,3,1580,37,176,"巴乌" ,"B0FD",5,10,"光剑5级","光束枪5级"],
[177,"秀伯" ,"A9AA",1,0,16,8,75,120,40,10,8,7,31,0,0,0,0,3,1800,4,177,"秀伯" ,"B0FF",3,125,"光剑3级","激光剑1"],
[178,"基格" ,"A5AA",1,0,20,7,74,88,42,10,44,1,22,0,0,0,0,2,300,5,178,"基格" ,"B101",146,145,"尾巴","激光剑"],
[179,"亚克托" ,"A5BA",1,0,132,8,76,127,65,20,172,3,30,0,0,1,0,3,940,33,179,"亚克托" ,"B103",4,123,"光剑4级","激光剑2"],
[180,"乍克Ⅲ" ,"A58A",1,0,140,8,74,110,40,10,114,1,25,0,0,1,0,3,370,35,180,"乍克Ⅲ" ,"B105",3,9,"光剑3级","光束枪4级"],

]


var g_robot_exp_table = [
0,
30,
50,
90,
140,
290,
300,
400,
500,
600,
600,
800,
780,
930,
1210,
0960,
1020,
1080,
1140,
1200,
1260,
1320,
1380,
1440,
1500,
1560,
1620,
1680,
1800,
1800,
1860,
1800,
1980,
2040,
2100,
2220,
2220,
2280,
2340,
2400,
2460,
2560,
1000,
1050,
1100,
1160,
1220,
1280,
1340,
1400,
2245,
9999,
9999,
9999,
9999,
9999,
9999,
9999,
9999,
]

for (var i = 2; i < 51; ++i)
{
    g_robot_exp_table[i] = g_robot_exp_table[i-1] + g_robot_exp_table[i];
}


var g_robot_img_map_data = {
0: 0,
1: 1,
2: 2,
3: 3,
4: 4,
5: 5,
6: 2,
7: 3,
8: 4,
9: 9,
10: 10,
11: 11,
12: 12,
13: 13,
14: 14,
15: 15,
16: 16,
17: 17,
18: 18,
19: 19,
20: 20,
21: 21,
22: 22,
23: 23,
24: 24,
25: 25,
26: 26,
27: 27,
28: 28,
29: 29,
30: 29,
31: 31,
32: 32,
33: 33,
34: 34,
35: 35,
36: 36,
37: 37,
38: 38,
39: 39,
40: 40,
41: 41,
42: 42,
43: 43,
44: 44,
45: 45,
46: 46,
47: 47,
48: 48,
49: 49,
50: 50,
51: 51,
52: 52,
53: 53,
54: 54,
55: 55,
56: 56,
57: 57,
58: 58,
59: 59,
60: 60,
61: 61,
62: 62,
63: 63,
64: 64,
65: 65,
66: 66,
67: 67,
68: 68,
69: 69,
70: 70,
71: 71,
72: 72,
73: 73,
74: 74,
75: 75,
76: 76,
77: 77,
78: 78,
79: 79,
80: 80,
81: 81,
82: 82,
83: 83,
84: 84,
85: 85,
86: 86,
87: 87,
88: 88,
89: 89,
90: 90,
91: 91,
92: 92,
93: 93,
94: 94,
95: 95,
96: 96,
97: 97,
98: 98,
99: 99,
100: 100,
101: 101,
102: 102,
103: 103,
104: 104,
105: 105,
106: 106,
107: 107,
108: 106,
109: 107,
110: 110,
111: 111,
112: 112,
113: 113,
114: 114,
115: 115,
116: 116,
117: 117,
118: 118,
119: 119,
120: 120,
121: 121,
122: 122,
123: 123,
124: 124,
125: 125,
126: 126,
127: 127,
128: 126,
129: 129,
130: 130,
131: 131,
132: 130,
133: 131,
134: 134,
135: 135,
136: 136,
137: 137,
138: 138,
139: 139,
140: 140,
141: 141,
142: 142,
143: 143,
144: 144,
145: 145,
146: 146,
147: 147,
148: 148,
149: 149,
150: 150,
151: 151,
152: 152,
153: 153,
154: 154,
155: 155,
156: 156,
157: 157,
158: 158,
159: 159,
160: 160,
161: 161,
162: 162,
163: 163,
164: 164,
165: 165,
166: 166,
167: 167,
168: 168,
169: 169,
170: 170,
171: 171,
172: 172,
173: 173,
174: 174,
175: 175,
176: 176,
177: 177,
178: 178,
179: 179,
180: 180,
}