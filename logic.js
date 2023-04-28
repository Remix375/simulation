

let particles = [];

let current_zoom = 1;


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let timeCount = 0;


canvas.addEventListener("wheel", (event) => {
    
    current_zoom = Math.min(5, Math.max(0.1, current_zoom-1e-3 * event.deltaY))
    console.log(current_zoom);
})




canvas.addEventListener("click", function(e) {
    const localX = e.clientX - e.target.offsetLeft;
    const localY = e.clientY - e.target.offsetTop;

    particles.push(new Particle(localX / current_zoom, localY / current_zoom, 60, 0, 0, 10));
})


function clearDead(l) {
    replacement = []
    for (let elt = 0; elt <particles.length; elt++) {
        if (!particles[elt].isdead) {
            replacement.push(particles[elt])
        }
    }
    particles = replacement;
}



const mainLoop = () => {
    ctx.canvas.width = window.innerWidth * 0.6;
    ctx.canvas.height = window.innerHeight * 0.7;


    timeCount += 1
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

    //remove elements not in frame every 5 seconds
    //if 60fps
    if (timeCount % 300 == 0) {
        clearDead(particles);
    }


    drawScale(ctx, current_zoom);
    for (let elt = 0; elt < particles.length; elt++) {
        particles[elt].draw(ctx, current_zoom);
        particles[elt].update();
    }
    requestAnimationFrame(mainLoop);
}
requestAnimationFrame(mainLoop);








