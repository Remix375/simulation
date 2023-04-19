


class Particle {
    constructor(posX, posY, speedX, speedY, accX, accY, color) {
        this.posX = posX;
        this.posY = posY;

        this.speedX = speedX;
        this.speedY = speedY;

        this.accX = accX;
        this.accY = accY;

        this.color = color;
    }



    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.posX, this.posY, 10, 0, Math.PI * 2, false);
        ctx.fill();
    }


    update() {
        this.posX += this.speedX/60;
        this.posY += this.speedY/60;

        this.speedX += this.accX/60;
        this.speedY += this.accY/60;
    }
}


