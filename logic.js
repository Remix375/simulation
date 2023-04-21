

const particles = [];

let current_zoom = 1;


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");







document.getElementById("increase_zoom").onclick = () => {
    current_zoom += 0.2
}


document.getElementById("decrease_zoom").onclick = () => {
    current_zoom -= 0.2
}



canvas.addEventListener("click", function(e) {
    const localX = e.clientX - e.target.offsetLeft;
    const localY = e.clientY - e.target.offsetTop;

    particles.push(new Particle(localX / current_zoom, localY / current_zoom, 0, 0, 0, 0));
})






const mainLoop = () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)


    drawScale(ctx, current_zoom);
    for (let elt = 0; elt < particles.length; elt++) {
        particles[elt].draw(ctx, current_zoom);
        particles[elt].update();
    }
    requestAnimationFrame(mainLoop);
}
requestAnimationFrame(mainLoop);








