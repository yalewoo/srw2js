//x成分とy成分を持つ二次元ベクトル
var Vector2 = function(x, y) {

    this.x = x;
    this.y = y;
    
    /**
     * ベクトルのxとyをセットする
     */
    this.set = function(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    /**
     * ベクトルの複製
     */
    this.clone = function() {
        return new Vector2(this.x, this.y);
    }
    /**
     * ベクトルの足し算 : 渡されたベクトルのxとyを自分に足す
     */
    this.add = function(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    /**
     * ベクトルの引き算 : 渡されたベクトルのxとyを自分から引く
     */
    this.sub = function(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    /**
     * ベクトルの乗算
     */
    this.mult = function(v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }
    /**
     * ベクトルの大きさ
     */
    this.magnitude = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    /**
     * ベクトルの向きを変更して速度を乗算する
     */
    this.setFromScalarAngle = function(scalar, angle) {
        this.x = Math.cos(angle) * scalar;
        this.y = Math.sin(angle) * scalar;
    }
}

//Particleクラスを作成する
var Particle = function (canvas, x, y, scalar, direction, radius, color){
    /**
     * コンストラクター
     * @param {canvas} canvas
     * @param {number} x positionx(位置)
     * @param {number} y positiony(位置)
     * @param {number} scalar scalar(速度)
     * @param {number} direction direction(角度)
     * @param {number} radius radius(半径)
     * @param {string} color color(色)
     */
    this.canvas = canvas;
    //position(位置)プロパティのインスタンスを作成
    this.position = new Vector2(x, y);
    //velocity(進路方向+速度)プロパティのインスタンスを作成
    this.velocity = new Vector2();
    //velocityの速度と向きをセットする
    this.velocity.setFromScalarAngle(scalar, direction);
    //radius(半径)プロパティを定義
    this.radius = radius;
    //color(色)プロパティを定義
    this.color = color;
    this.range = 0;
    this.originalX = x;
    this.originalY = y;
    
    /**
     * updateメソッドの作成
     */
   this.update = function() {
        //positionにvelocityを加算する
        this.position.add(this.velocity);

        // position(位置)がcanvas外に出た時は中央に再配置
        if ((this.position.x - this.originalX) * (this.position.x - this.originalX) +
            (this.position.y - this.originalY) * (this.position.y - this.originalY) > (6*32*6*32)
        ) {
            this.position.x = this.originalX;
            this.position.y = this.originalY;
        };
        
    }
}


var Weapon66 = function (scene_main, x, y, callback) {
    this.x = Math.floor(x * 32 + 16);
    this.y = Math.floor(y * 32 + 16);

    this.game = scene_main.game;
    this.context2D = this.game.context2D;
    this.canvas = this.game.canvas;

    this.callback = callback;

    var canvas = this.canvas;
    var ctx = this.context2D;
    var particles = [];
    var particleNum = 150;
    var colors = ["#0952BD", "#A5BFF0", "#118CD6", "#1AAEE8", "#F2E8C9"];



    //引数の最小値から最大値の間でランダムな値の整数を返す関数
    var randomIntFromRange = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    //ランダムな色を返す関数
    var randomColor = function(colors) {
        return colors[Math.floor(Math.random() * colors.length)]
    }

    //最初に定義しておいたparticles配列に、Particleクラスのインスタンスを作成し、各種プロパティを格納する
    for (var i = 0; i < particleNum; i++) {
        particles.push(new Particle(  canvas,this.x,this.y,Math.random() * 8 + 2,Math.random() * Math.PI * 2,randomIntFromRange(5, 7),randomColor(colors)));
    }


    this.r = 0;
    this.targetR = 100;

    this.update = function () {
        if (this.r < this.targetR) {
            ++this.r;
        }
        else {
            if (this.callback) {
                this.callback();
            }
            return false;
        }
    }

    this.draw = function () {
        for (var i = 0; i < particleNum; i++) {
            var p = particles[i];
            p.update();
            ctx.save();
            ctx.beginPath();
            ctx.arc(p.position.x, p.position.y, p.radius, 0, Math.PI * 2)
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 5;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.globalAlpha = '1'
            ctx.fillStyle = p.color;
            ctx.fill();
            ctx.restore();
        }
    }

    
}