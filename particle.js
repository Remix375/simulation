

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
    }

    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
    }

    mult(n) {
        this.x *= n;
        this.y *= n;
    }

    magn() {
        return Math.sqrt(this.x ** 2 + this.y**2);
    }


    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }
}


class Circle {
    constructor(radius, posX, posY, speedX, speedY, accX, accY, mass, color) {
        this.size = radius;

        this.pos = new Vector(posX, posY);

        this.speed = new Vector(speedX/60, speedY/60);

        this.acc = new Vector(accX/60, accY/60);

        this.mass = mass

        this.color = color;

        this.dead = false;

    }


    get isdead() {
        return this.dead
    }

    draw(ctx, zoom) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.pos.x * zoom, this.pos.y * zoom, this.size * zoom, 0, Math.PI * 2, false);
        ctx.fill();
    }

    

    update(friction) {
        this.pos.add(this.speed);

        this.speed.add(this.acc);
        this.speed.mult(1-friction);

        if (this.pos.y > canvas.clientHeight/0.1 + 50 || this.pos.y < -40 || this.pos.x > canvas.clientWidth/0.1 + 50 || this.pos.x < -40) {
            this.dead = true;
        }
    }
}


function drawScale(ctx, zoom) {
    ctx.fillRect(20, canvas.clientHeight - 20, 100 * zoom, 4);
    ctx.fillRect(20, canvas.clientHeight - 30, 2, 24);
    ctx.fillRect(20 + 100*zoom, canvas.clientHeight - 30, 2, 24);


    ctx.font = `${20*zoom}px serif`;
    ctx.fillText('1 meter', (40 + 100*zoom) / 4, canvas.clientHeight - 30);

}




