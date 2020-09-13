var Weapon = function(id)
{
    this.id = id;

    var t = g_weapon_data[id];

    this.name = (t[1]);

    this.range = (t[3]);

    this.firepower = [0,0,0]
    this.firepower[0] = (t[6]);
    this.firepower[1] = (t[7]);
    this.firepower[2] = (t[8]);

    this.hitRadio = (t[4]);   //命中率

    if (id == 164) {
        this.range = 1;
        this.firepower[0] = 0;
        this.firepower[1] = 0;
        this.firepower[2] = 0;
        this.hitRadio = 100;
    }
}