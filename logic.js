

let particles = [];

let current_zoom = 1;


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let timeCount = 0;

const friction = 0.1;

const controled = new Circle(20, 0, 0, 0, 0, 0, 0, 0, "green")
particles.push(controled);


//boolean variables - if true, ball moves in the direction
let LEFT, UP, RIGHT, DOWN;

document.addEventListener('keydown', function(e){
    if(e.keyCode === 37){
        LEFT = true;
    }
    if(e.keyCode === 38){
        UP = true;
    }
    if(e.keyCode === 39){
        RIGHT = true;
    }
    if(e.keyCode === 40){
        DOWN = true;
    }
});

document.addEventListener('keyup', function(e){
    if(e.keyCode === 37){
        LEFT = false;
    }
    if(e.keyCode === 38){
        UP = false;
    }
    if(e.keyCode === 39){
        RIGHT = false;
    }
    if(e.keyCode === 40){
        DOWN = false;
    }
});

function act(b){
    console.log(LEFT)
    //if true, the accelertion component gets a certain value
    if(LEFT){
        b.acc.x = -1;
    }
    if(UP){
        b.acc.y = -1;
    }
    if(RIGHT){
        b.acc.x = 1;
    }
    if(DOWN){
        b.acc.y = 1;
    }
    if(!UP && !DOWN){
        b.acc.y = 0;
    }
    if(!RIGHT && !LEFT){
        b.acc.x = 0;
    }
}



canvas.addEventListener("wheel", (event) => {
    current_zoom = Math.min(5, Math.max(0.1, current_zoom-1e-3 * event.deltaY))
})




canvas.addEventListener("click", function(e) {
    const localX = e.clientX - e.target.offsetLeft;
    const localY = e.clientY - e.target.offsetTop;

    particles.push(new Circle(20, localX / current_zoom, localY / current_zoom, 60, 0, 0, 10, 20, "red"));
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
    act(controled)
    //remove elements not in frame every 5 seconds
    //if 60fps
    if (timeCount % 300 == 0) {
        clearDead(particles);
    }


    drawScale(ctx, current_zoom);
    for (let elt = 0; elt < particles.length; elt++) {
        particles[elt].draw(ctx, current_zoom);
        particles[elt].update(friction);
    }
    requestAnimationFrame(mainLoop);
}
requestAnimationFrame(mainLoop);








