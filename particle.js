


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



    draw(ctx, zoom) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.posX * zoom, this.posY * zoom, 10 * zoom, 0, Math.PI * 2, false);
        ctx.fill();
    }


    update() {
        this.posX += this.speedX/60;
        this.posY += this.speedY/60;

        this.speedX += this.accX/60;
        this.speedY += this.accY/60;
    }
}


function drawScale(ctx, zoom) {
    ctx.fillRect(20, canvas.clientHeight - 20, 100 * zoom, 4);
    ctx.fillRect(20, canvas.clientHeight - 30, 2, 24);
    ctx.fillRect(20 + 100*zoom, canvas.clientHeight - 30, 2, 24);


    ctx.font = `${20*zoom}px serif`;
    ctx.fillText('1 meter', (40 + 100*zoom) / 4, canvas.clientHeight - 30);
}

