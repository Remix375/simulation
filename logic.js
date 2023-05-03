

let balls = [];
let walls = [];
let magnets = [];


walls.push(new Wall(100, 150, 20, 40));

let current_zoom = 1;


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let timeCount = 0;

const friction = 0.1;

const controled = new Circle(20, 0, 0, 0, 0, 0, 0, 40, "green")
balls.push(controled);

const b = new Circle(40, 100, 100, 0, 0, 0, 0, 10, 'blue')
balls.push(b);



const mag = new Magnet(200, 200, 10, 30);
magnets.push(mag);







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

    drawScale(ctx, current_zoom);
    //iterating on balls
    for (let elt = 0; elt < balls.length; elt++) {
        for (let elt2 = elt+1; elt2 < balls.length; elt2++) {
            if (ballsTouching(balls[elt], balls[elt2])){
                pen_res_bb(balls[elt], balls[elt2]);
                coll_res_bb(balls[elt], balls[elt2])
            }
        }
        balls[elt].draw(ctx, current_zoom);
        balls[elt].update(friction);  
    }

    //iterating on walls
    for (let w = 0; w < walls.length; w++) {
        walls[w].draw(ctx, current_zoom);
    }

    console.log(magnets);
    for (let m=0; m< magnets.length; m++) {
        magnets[m].draw(ctx, current_zoom);
    }


    requestAnimationFrame(mainLoop);
}
requestAnimationFrame(mainLoop);








