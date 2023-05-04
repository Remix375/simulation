//circle has balls and magnets
let circles = [];
let balls = [];
let magnets = [];

let generators = [];

let walls = [];



walls.push(new Wall(100, 150, 20, 40));

let current_zoom = 1;


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let timeCount = 0;

const friction = 0.1;

const controled = new Ball(20, 0, 0, 0, 0, 0, 0, 40, "green")
balls.push(controled);
circles.push(controled);

let paused = false;


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







function clearDead() {
    replacement = []
    for (let elt = 0; elt <balls.length; elt++) {
        if (!balls[elt].isdead) {
            replacement.push(balls[elt])
        }
    }
    r2 = [];
    for (let e = 0; e < circles.length; e++) {
        if (!circles[e].isdead) {
            r2.push(circles[e]);
        }
    }
    circles = r2;
    balls = replacement;
}



function ballsTouching(b1, b2) {
    return (b1.size + b2.size >= b1.pos.subtr(b2.pos).mag())
}

function pen_res_bb(b1, b2){
    let dist = b1.pos.subtr(b2.pos);
    let pen_depth = b1.size + b2.size - dist.mag();
    let pen_res = dist.unit().mult(pen_depth / (b1.inv_mass + b2.inv_mass));
    b1.pos = b1.pos.add(pen_res.mult(b1.inv_mass));
    b2.pos = b2.pos.add(pen_res.mult(-b2.inv_mass));
}

function coll_res_bb(b1, b2){
    let normal = b1.pos.subtr(b2.pos).unit();
    let relVel = b1.vel.subtr(b2.vel);
    let sepVel = Vector.dot(relVel, normal);
    let new_sepVel = -sepVel;
    
    //the difference between the new and the original sep.velocity value
    let vsep_diff = new_sepVel - sepVel;

    //dividing the impulse value in the ration of the inverse masses
    //and adding the impulse vector to the original vel. vectors
    //according to their inverse mass
    let impulse = vsep_diff / (b1.inv_mass + b2.inv_mass);
    let impulseVec = normal.mult(impulse);

    b1.vel = b1.vel.add(impulseVec.mult(b1.inv_mass));
    b2.vel = b2.vel.add(impulseVec.mult(-b2.inv_mass));
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
        clearDead();
    }


    //iterating on generators
    for (let g = 0; g < generators.length; g++) {
        generators[g].update();
        generators[g].draw(ctx, current_zoom);
    }


    drawScale(ctx, current_zoom);
    //iterating on balls
    for (let elt = 0; elt < circles.length; elt++) {
        for (let elt2 = elt+1; elt2 < circles.length; elt2++) {
            if (ballsTouching(circles[elt], circles[elt2])){
                pen_res_bb(circles[elt], circles[elt2]);
                coll_res_bb(circles[elt], circles[elt2])
            }
        }
        circles[elt].draw(ctx, current_zoom);
        circles[elt].update(friction);
        circles[elt].acc = new Vector(0, 0);
    }

    //iterating on walls
    for (let w = 0; w < walls.length; w++) {
        walls[w].draw(ctx, current_zoom);
    }


    //iterating on magnets
    for (let m=0; m < magnets.length; m++) {
        for (let b = 0; b < balls.length; b++) {
            let vect = magnets[m].pos.subtr(balls[b].pos);
            balls[b].acc = balls[b].acc.add(vect.unit().mult(magnets[m].strength/(balls[b].mass * vect.mag())));
        }
    }



    if (!paused) {
        requestAnimationFrame(mainLoop);
    }
}
requestAnimationFrame(mainLoop);








function pause () {
    console.log("dfd")
    if (paused) {
        paused = false;
        mainLoop();
    } else {
        paused = true;
    }
}