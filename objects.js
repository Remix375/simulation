

class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    add(v){
        return new Vector(this.x+v.x, this.y+v.y);
    }

    subtr(v){
        return new Vector(this.x-v.x, this.y-v.y);
    }

    mag(){
        return Math.sqrt(this.x**2 + this.y**2);
    }

    mult(n){
        return new Vector(this.x*n, this.y*n);
    }

    normal(){
        return new Vector(-this.y, this.x).unit();
    }

    unit(){
        if(this.mag() === 0){
            return new Vector(0,0);
        } else {
            return new Vector(this.x/this.mag(), this.y/this.mag());
        }
    }

    draw(start_x, start_y, n, color){
        ctx.beginPath();
        ctx.moveTo(start_x, start_y);
        ctx.lineTo(start_x + this.x * n, start_y + this.y * n);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
    }
    
    static dot(v1, v2){
        return v1.x*v2.x + v1.y*v2.y;
    }
}

//circles are define with a radius, position, velocity, acceleration, mass and color
class Circle {
    constructor(radius, posX, posY, speedX, speedY, accX, accY, mass) {
        this.size = radius;

        this.pos = new Vector(posX, posY);

        //speed given in meters per second
        //converted to pixels per 1/60 seconds
        //100 pixels is a meter
        this.vel = new Vector(100*speedX/60, 100*speedY/60);

        //acc given in meters per second^2
        //converted to pixels per 1/60 seconds ^2
        //100 pixels is a meter
        this.acc = new Vector(100*accX/3600, 100*accY/3600);

        this.mass = mass;

        if (this.mass === 0){
            this.inv_mass = 0;
            this.immovable = true;
        } else {
            this.inv_mass = 1 / this.mass;
            this.immovable = false;
        }

        this.dead = false;

    }


    get isdead() {
        return this.dead
    }

    pr() {
        return [this.size, this.pos.x, this.pos.y, this.vel.x, this.vel.y, this.acc.x, this.acc.y, this.mass, this.color]
    }


    update(friction) {
        if (this.immovable) {
            return;
        }
        this.pos = this.pos.add(this.vel);

        this.vel = this.vel.add(this.acc).mult(1-friction);

        if (this.pos.y > canvas.clientHeight/0.1 + 50 || this.pos.y < -40 || this.pos.x > canvas.clientWidth/0.1 + 50 || this.pos.x < -40) {
            this.dead = true;
        }
    }
}

class Ball extends Circle {
    constructor(radius, posX, posY, speedX, speedY, accX, accY, mass, color) {
        super(radius, posX, posY, speedX, speedY, accX, accY, mass);
        this.color = color;
    }

    draw(ctx, zoom) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.pos.x * zoom, this.pos.y * zoom, this.size * zoom, 0, Math.PI * 2, false);
        ctx.fill();
    }

}



class Magnet extends Circle{
    constructor(radius, posX, posY, speedX, speedY, accX, accY, mass, strength) {
        super(radius, posX, posY, speedX, speedY, accX, accY, mass);
        this.strength = strength;
    }


    draw(ctx, zoom) {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(this.pos.x * zoom, this.pos.y * zoom, this.size * zoom, Math.PI / 2, (3/2) * Math.PI, false);
        ctx.fill();
        ctx.closePath()
        ctx.beginPath()
        ctx.fillStyle = "white";
        ctx.arc(this.pos.x * zoom, this.pos.y * zoom, this.size * zoom, (3/2) * Math.PI, Math.PI/2, false);
        ctx.fill();
        ctx.closePath()
    }
}

class Generator {
    constructor(posX, posY, radius, mass, color, time) {
        this.pos = new Vector(posX, posY);
        this.size = radius;
        this.mass = mass;
        this.color = color;
        this.timeMax = time * 60;
        this.currentTime = 0
    }


    update() {
        if (this.currentTime == this.timeMax) {
            let gen_ball = new Ball(this.size, this.pos.x + Math.random(), this.pos.y + Math.random(), 0, 0, 0, 0, this.mass, this.color);
            balls.push(gen_ball);
            circles.push(gen_ball);
            this.currentTime = 0;
        }
        this.currentTime += 1
    }

    draw(ctx, zoom) {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect((this.pos.x - (1/2) * this.size) * zoom, (this.pos.y - (1/2) * this.size) * zoom, this.size * zoom, this.size * zoom);
        ctx.closePath();
    }
}

//Walls are line segments between two points
class Wall {
    constructor(x_start, y_start, x_end, y_end){
        this.start = new Vector(x_start, y_start);
        this.end = new Vector(x_end, y_end);


        this.wallVect = this.end.subtr(this.start);
    }


    setEnd(x, y) {
        this.end = new Vector(x, y);
    }

    draw(ctx, zoom){
        ctx.beginPath();
        ctx.moveTo(this.start.x * zoom, this.start.y * zoom);
        ctx.lineTo(this.end.x * zoom, this.end.y * zoom);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }

    wallUnit(){
        return this.end.subtr(this.start).unit();
    }


}






function drawScale(ctx, zoom) {
    ctx.fillRect(20, canvas.clientHeight - 20, 100 * zoom, 4);
    ctx.fillRect(20, canvas.clientHeight - 30, 2, 24);
    ctx.fillRect(20 + 100*zoom, canvas.clientHeight - 30, 2, 24);


    ctx.font = `${20*zoom}px serif`;
    ctx.fillText('1 meter', (40 + 100*zoom) / 4, canvas.clientHeight - 30);

}




