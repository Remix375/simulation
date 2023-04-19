

const particles = []


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 100, 100);

ctx.beginPath();
ctx.arc(150, 150, 30, 0, Math.PI * 2, false);
ctx.fill();







canvas.addEventListener("click", function(e) {
    const localX = e.clientX - e.target.offsetLeft;
    const localY = e.clientY - e.target.offsetTop;

    particles.push(new Particle(localX, localY, 50, 0, 0, 2));
})






const mainLoop = () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

    for (let elt = 0; elt < particles.length; elt++) {
        particles[elt].draw(ctx);
        particles[elt].update();
    }
    requestAnimationFrame(mainLoop);
}
requestAnimationFrame(mainLoop);





