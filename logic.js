//circle has balls and magnets
let circles = [];
let balls = [];
let magnets = [];

let generators = [];

let walls = [];


let current_zoom = 1;


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let timeCount = 0;

const friction = 0.2;


let paused = false;




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



//returns with the closest point on a line segment to a given point
function closestPointBW(b1, w1){
    let ballToWallStart = w1.start.subtr(b1.pos);
    if(Vector.dot(w1.wallUnit(), ballToWallStart) > 0){
        return w1.start;
    }

    let wallEndToBall = b1.pos.subtr(w1.end);
    if(Vector.dot(w1.wallUnit(), wallEndToBall) > 0){
        return w1.end;
    }

    let closestDist = Vector.dot(w1.wallUnit(), ballToWallStart);
    let closestVect = w1.wallUnit().mult(closestDist);
    return w1.start.subtr(closestVect);
}


//collision detection between 2 balls
function ballsTouching(b1, b2) {
    return (b1.size + b2.size >= b1.pos.subtr(b2.pos).mag())
}

//collision detection between ball and wall
function coll_det_bw(b1, w1){
    let ballToClosest = closestPointBW(b1, w1).subtr(b1.pos);
    if (ballToClosest.mag() <= b1.size){
        return true;
    }
}

//penetration resolution if 2 balls are inside each other
function pen_res_bb(b1, b2){
    let dist = b1.pos.subtr(b2.pos);
    let pen_depth = b1.size + b2.size - dist.mag();
    let pen_res = dist.unit().mult(pen_depth / (b1.inv_mass + b2.inv_mass));
    b1.pos = b1.pos.add(pen_res.mult(b1.inv_mass));
    b2.pos = b2.pos.add(pen_res.mult(-b2.inv_mass));
}

//penetration resolution between ball and wall
function pen_res_bw(b1, w1){
    let penVect = b1.pos.subtr(closestPointBW(b1, w1));
    b1.pos = b1.pos.add(penVect.unit().mult(b1.size-penVect.mag()));
}

//effect of collision of 2 balls
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


//collision response between ball and wall
function coll_res_bw(b1, w1){
    let normal = b1.pos.subtr(closestPointBW(b1, w1)).unit();
    let sepVel = Vector.dot(b1.vel, normal);
    let new_sepVel = -sepVel;
    let vsep_diff = sepVel - new_sepVel;
    b1.vel = b1.vel.add(normal.mult(-vsep_diff));
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
        if (!paused) {
            generators[g].update();
        }
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

        //paused condition
        if (!paused) {
            circles[elt].update(friction);
            circles[elt].acc = new Vector(0, 0);
        }
    }

    //iterating on walls
    for (let w = 0; w < walls.length; w++) {
        for (let b = 0; b < circles.length; b++) {
            if (coll_det_bw(circles[b], walls[w])) {
                pen_res_bw(circles[b], walls[w]);
                coll_res_bw(circles[b], walls[w]);
            }
        }
        walls[w].draw(ctx, current_zoom);

    }


    //iterating on magnets
    if (!paused) {
        for (let m=0; m < magnets.length; m++) {
            for (let b = 0; b < balls.length; b++) {
                let vect = magnets[m].pos.subtr(balls[b].pos);
                balls[b].acc = balls[b].acc.add(vect.unit().mult(magnets[m].strength/(balls[b].mass * vect.mag())));
            }
        }
    }




    requestAnimationFrame(mainLoop);

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