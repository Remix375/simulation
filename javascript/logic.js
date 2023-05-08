//circle has balls and magnets
let circles = [];
let balls = [];
let magnets = [];

let generators = [];

let walls = [];


let current_zoom = 1;


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let last_time = 0;
let timeCount = 0;

const friction = 0;


let paused = false;


let current_x = 0;
let current_y = 0;




let fps = 0

canvas.addEventListener('mousemove', (e) => {
    current_x = e.clientX - e.target.offsetLeft;
    current_y = e.clientY - e.target.offsetTop;
});



canvas.addEventListener("wheel", (event) => {
    current_zoom = Math.min(5, Math.max(0.1, current_zoom-1e-3 * event.deltaY))
})






function objIsDead(obj) {
    return !obj.isdead;
}

function clearDead(type = "All") {
    if (type === "All") {
        circles = circles.filter(objIsDead);
        balls = balls.filter(objIsDead);
        magnets = magnets.filter(objIsDead);
        generators = generators.filter(objIsDead);
        walls = walls.filter(objIsDead);
    }
    if (type === "Ball") {
        circles = circles.filter(objIsDead);
        balls = balls.filter(objIsDead);
    } else if (type === "Magnet") {
        magnets = magnets.filter(objIsDead);
        circles = circles.filter(objIsDead);
    } else if (type === "Generator") {
        generators = generators.filter(objIsDead);
    } else if (type === "Wall") {
        walls = walls.filter(objIsDead);
    }
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
    if (dist.x === 0 && dist.y === 0) {
        dist.x = 1;
        dist.y = 1;
    }
    let pen_depth = b1.size + b2.size - dist.mag() + 2;
    if (b1.inv_mass === 0 && b2.inv_mass === 0) {
        let pen_res = dist.unit().mult(pen_depth / 2);
        b1.pos = b1.pos.add(pen_res);
        b2.pos = b2.pos.add(pen_res.mult(-1));
    } else {
        let pen_res = dist.unit().mult(pen_depth / (b1.inv_mass + b2.inv_mass));
        b1.pos = b1.pos.add(pen_res.mult(b1.inv_mass));
        b2.pos = b2.pos.add(pen_res.mult(-b2.inv_mass));
    }
}

//penetration resolution between ball and wall
function pen_res_bw(b1, w1){
    let penVect = b1.pos.subtr(closestPointBW(b1, w1));
    if (penVect.x === 0 && penVect.y === 0) {
        penVect.x = 1;
        penVect.y = 1;
    }
    b1.pos = b1.pos.add(penVect.unit().mult(b1.size-penVect.mag()));
}

//effect of collision of 2 balls
function coll_res_bb(b1, b2){
    let normal = b1.pos.subtr(b2.pos).unit();
    let relVel = b1.vel.subtr(b2.vel);
    let sepVel = Vector.dot(relVel, normal);
    let new_sepVel = -sepVel;
    
    let vsep_diff = new_sepVel - sepVel;

    let impulse;
    //if 2 immovable elements are placed one on the other
    if (b1.immovable && b2.immovable) {
        impulse = 0;
    } else {
        impulse = vsep_diff / (b1.inv_mass + b2.inv_mass);
    }
    let impulseVec = normal.mult(impulse);

    b1.vel = b1.vel.add(impulseVec.mult(b1.inv_mass)).mult(parseFloat(input_data['scene']['elasticity']));
    b2.vel = b2.vel.add(impulseVec.mult(-b2.inv_mass)).mult(parseFloat(input_data['scene']['elasticity']));
}


//collision response between ball and wall
function coll_res_bw(b1, w1){
    let normal = b1.pos.subtr(closestPointBW(b1, w1)).unit();
    let sepVel = Vector.dot(b1.vel, normal);
    let new_sepVel = -sepVel;
    let vsep_diff = sepVel - new_sepVel;
    b1.vel = b1.vel.add(normal.mult(-vsep_diff)).mult(parseFloat(input_data['scene']['elasticity']));
}



const mainLoop = () => {
    let current_time = performance.now();

    fps = 1000 / (current_time - last_time) ;
    last_time = current_time;


    ctx.canvas.width = window.innerWidth * 0.6;
    ctx.canvas.height = window.innerHeight * 0.7;

    timeCount += 1


    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

    //iterating on generators
    for (let g = 0; g < generators.length; g++) {
        if (!paused) {
            generators[g].update(fps);
        }
        generators[g].draw(ctx, current_zoom);
    }


    

    //iterating on balls
    for (let elt = 0; elt < circles.length; elt++) {
        for (let elt2 = elt+1; elt2 < circles.length; elt2++) {
            if (ballsTouching(circles[elt], circles[elt2])){
                pen_res_bb(circles[elt], circles[elt2]);
                coll_res_bb(circles[elt], circles[elt2]);
            }
        }
        circles[elt].draw(ctx, current_zoom);

        //paused condition
        if (!paused) {
            circles[elt].update(parseFloat(input_data['scene']['friction']), fps);

            circles[elt].setAcc(0, parseFloat(input_data['scene']['gravity']))
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
                let acceleration_c = vect.unit().mult(1000 * magnets[m].strength/(balls[b].mass * (vect.mag() ** 2)));
                balls[b].addAcc(acceleration_c.x, acceleration_c.y);
            }
        }
    }


    //if currently placing a wall
    if (placing_wall) {
        placing_wall.setEnd(current_x / current_zoom, current_y/ current_zoom);
        placing_wall.draw(ctx, current_zoom);
    }


    //fps counter
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`${Math.round(fps)}fps`, 0, 20);

    drawScale(ctx, current_zoom);


    requestAnimationFrame(mainLoop);


}
//calling twice to get most frames possible
//makes simulation more precise
//requestAnimationFrame(mainLoop);
requestAnimationFrame(mainLoop);

function accelerate() {
    mainLoop();
}



function reset() {
    circles = [];
    balls = [];
    magnets = [];
    
    generators = [];
    
    walls = [];
}

function pause (that) {
    if (paused) {
        paused = false;
        that.getElementsByTagName("img")[0].src = "./media/bouton-pause.png"
    } else {
        paused = true;
        that.getElementsByTagName("img")[0].src = "./media/bouton-jouer.png"
    }
}