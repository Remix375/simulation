

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

    drawVec(start_x, start_y, n, color){
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
    constructor(radius, posX, posY, speedX, speedY, accX, accY, mass, color) {
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
        } else {
            this.inv_mass = 1 / this.mass;
        }

        this.color = color;

        this.dead = false;

    }


    get isdead() {
        return this.dead
    }

    pr() {
        return [this.size, this.pos.x, this.pos.y, this.vel.x, this.vel.y, this.acc.x, this.acc.y, this.mass, this.color]
    }


    draw(ctx, zoom) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.pos.x * zoom, this.pos.y * zoom, this.size * zoom, 0, Math.PI * 2, false);
        ctx.fill();
    }

    

    update(friction) {
        this.pos = this.pos.add(this.vel);

        this.vel = this.vel.add(this.acc).mult(1-friction);

        if (this.pos.y > canvas.clientHeight/0.1 + 50 || this.pos.y < -40 || this.pos.x > canvas.clientWidth/0.1 + 50 || this.pos.x < -40) {
            this.dead = true;
        }
    }
}

//Walls are line segments between two points
class Wall{
    constructor(x_start, y_start, x_end, y_end){
        this.start = new Vector(x_start, y_start);
        this.end = new Vector(x_end, y_end);
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




