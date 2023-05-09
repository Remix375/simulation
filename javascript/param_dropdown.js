"use strict";




const input_data = {"ball": {"size": '15', "mass": '5', "color": 'black'}, 
                    "magnet": {"size": "15", "mass": "0", "strength": "100"},
                    "generator": {"size": "30", "mass": "5", "color": "black", "time": "5"},
                    "scene": {"gravity": "9.8", "friction": "0.5", "elasticity": "0.9"}
                };


document.getElementById("gravity_scene_param").getElementsByTagName("input")[0].value = input_data["scene"]["gravity"];
document.getElementById("friction_scene_param").getElementsByTagName("input")[0].value = input_data["scene"]["friction"];
document.getElementById("elasticity_scene_param").getElementsByTagName("input")[0].value = input_data["scene"]["elasticity"];

let selected_obj = false;


let placing_wall = false;


let selected_in_scene = false;


const changeValue = (obj, par, that) => {
    console.log(selected_in_scene);
    if (!selected_in_scene){
        input_data[obj][par] = that.value;
    } else {
        if (par === "size") {
            selected_in_scene.size = parseFloat(that.value);
        } else if (par === "mass") {
            if (that.value === "0"){
                selected_in_scene.immovable = true;
                selected_in_scene.inv_mass = 0;
            } else {
                selected_in_scene.immovable = false;
                selected_in_scene.inv_mass = 1 / parseFloat(that.value);
            }
            selected_in_scene.mass = parseFloat(that.value);
        } else if (par === "color") {
            selected_in_scene.color = that.value;
        } else if (par === "strength") {
            selected_in_scene.strength = parseFloat(that.value);
        } else if (par === "time") {
            selected_in_scene.timeMax = parseFloat(that.value);
        }
    }
}


const change_param = (o) => {
    if (o === "objects") {
        document.getElementById("objects").style.display = "block";
        document.getElementById("scene").style.display = "none";
    } else {
        selected_in_scene = false;
        placing_wall = false;
        document.getElementById("scene").style.display = "block";
        document.getElementById("objects").style.display = "none";
    }
}



function create_ball_html(data_) {
    const ball_html = document.createElement("div")
    ball_html.classList.add("subsettings");
    ball_html.id = "ball_settings";
    //size
    const size_div = document.createElement("div");
    size_div.classList.add("param_perso")

    const size_h = document.createElement("h5");
    size_h.innerHTML = "Size"
    const size_input = document.createElement("input");

    size_input.type = "number";
    size_input.value = data_["size"];
    size_input.onchange = function() {changeValue('ball', 'size', size_input)};

    size_div.appendChild(size_h)
    size_div.appendChild(size_input)

    //mass
    const mass_div = document.createElement("div");
    mass_div.classList.add("param_perso")

    const mass_h = document.createElement("h5");
    mass_h.innerHTML = "Mass"
    const mass_input = document.createElement("input");

    mass_input.type = "number";
    mass_input.value = data_["mass"];
    mass_input.onchange = function () {changeValue('ball', 'mass', mass_input)};

    mass_div.appendChild(mass_h)
    mass_div.appendChild(mass_input)


    //color
    const color_div = document.createElement("div");
    color_div.classList.add("param_perso")

    const color_h = document.createElement("h5");
    color_h.innerHTML = "Color"
    const color_input = document.createElement("input");

    color_input.type = "color";
    color_input.value = data_["color"];
    color_input.onchange = function () {changeValue('ball', 'color', color_input)};

    color_div.appendChild(color_h)
    color_div.appendChild(color_input)

    //all together
    ball_html.appendChild(size_div);
    ball_html.appendChild(mass_div);
    ball_html.appendChild(color_div);

    return ball_html;
}



function create_magnet_html(data_) {
    const magnet_html = document.createElement("div")
    magnet_html.classList.add("subsettings");
    magnet_html.id = "magnet_settings";
    //size
    const size_div = document.createElement("div");
    size_div.classList.add("param_perso")

    const size_h = document.createElement("h5");
    size_h.innerHTML = "Size"
    const size_input = document.createElement("input");

    size_input.type = "number";
    size_input.value = data_["size"];
    size_input.onchange = function() {changeValue('magnet', 'size', size_input)};

    size_div.appendChild(size_h)
    size_div.appendChild(size_input)

    //mass
    const mass_div = document.createElement("div");
    mass_div.classList.add("param_perso")

    const mass_h = document.createElement("h5");
    mass_h.innerHTML = "Mass"
    const mass_input = document.createElement("input");

    mass_input.type = "number";
    mass_input.value = data_["mass"];
    mass_input.onchange = function () {changeValue('magnet', 'mass', mass_input)};

    mass_div.appendChild(mass_h)
    mass_div.appendChild(mass_input)


    //strength
    const strength_div = document.createElement("div");
    strength_div.classList.add("param_perso")

    const strength_h = document.createElement("h5");
    strength_h.innerHTML = "Strength";
    const strength_input = document.createElement("input");

    strength_input.type = "number";
    strength_input.value = data_["strength"];
    strength_input.onchange = function () {changeValue('magnet', 'strength', strength_input)};

    strength_div.appendChild(strength_h)
    strength_div.appendChild(strength_input)

    //all together
    magnet_html.appendChild(size_div);
    magnet_html.appendChild(mass_div);
    magnet_html.appendChild(strength_div);

    return magnet_html;
}


//generates html for generator dropdown
function create_generator_html(data_) {
    const generator_html = document.createElement("div")
    generator_html.classList.add("subsettings");
    generator_html.id = "generator_settings";
    
    //size
    const size_div = document.createElement("div");
    size_div.classList.add("param_perso")

    const size_h = document.createElement("h5");
    size_h.innerHTML = "Size"
    const size_input = document.createElement("input");

    size_input.type = "number";
    size_input.value = data_["size"];
    size_input.onchange = function() {changeValue('generator', 'size', size_input)};

    size_div.appendChild(size_h)
    size_div.appendChild(size_input)

    //mass
    const mass_div = document.createElement("div");
    mass_div.classList.add("param_perso")

    const mass_h = document.createElement("h5");
    mass_h.innerHTML = "Mass"
    const mass_input = document.createElement("input");

    mass_input.type = "number";
    mass_input.value = data_["mass"];
    mass_input.onchange = function () {changeValue('generator', 'mass', mass_input)};

    mass_div.appendChild(mass_h)
    mass_div.appendChild(mass_input)


    //color
    const color_div = document.createElement("div");
    color_div.classList.add("param_perso")

    const color_h = document.createElement("h5");
    color_h.innerHTML = "Color"
    const color_input = document.createElement("input");

    color_input.type = "color";
    color_input.value = data_["color"];
    color_input.onchange = function () {changeValue('generator', 'color', color_input)};

    color_div.appendChild(color_h)
    color_div.appendChild(color_input)



    //time
    const time_div = document.createElement("div");
    time_div.classList.add("param_perso")

    const time_h = document.createElement("h5");
    time_h.innerHTML = "Time"
    const time_input = document.createElement("input");

    time_input.type = "number";
    time_input.value = data_["time"];
    time_input.onchange = function () {changeValue('generator', 'time', time_input)};

    time_div.appendChild(time_h)
    time_div.appendChild(time_input)



    //all together
    generator_html.appendChild(size_div);
    generator_html.appendChild(mass_div);
    generator_html.appendChild(color_div);
    generator_html.appendChild(time_div)

    return generator_html;
}




//generates html for wall dropdown
function create_wall_html(data_) {
    const wall_html = document.createElement("div")
    wall_html.classList.add("subsettings");
    wall_html.id = "wall_settings";
    
    
    const inf_div = document.createElement("div");
    inf_div.classList.add("param_perso")

    const inf_h = document.createElement("h5");
    inf_h.innerHTML = "Placing wall"


    inf_div.appendChild(inf_h)

    //all together
    wall_html.appendChild(inf_div);

    return wall_html;
}

function create_select_html() {
    const select_html = document.createElement("div");
    select_html.id = "object_selected";
    return select_html;
}




const creation_fun= {"ball_obj_param": [create_ball_html, input_data["ball"]], 
                    "magnet_obj_param": [create_magnet_html, input_data["magnet"]], 
                    "generator_obj_param": [create_generator_html, input_data["generator"]],
                    "wall_obj_param": [create_wall_html, []]};




const dropDownParam = (nameId) => {
    placing_wall = false;
    selected_in_scene = false;
    if (selected_obj === false) {
        let child = creation_fun[nameId][0](creation_fun[nameId][1])
        let chevron = document.getElementById(nameId).getElementsByClassName("chevron-down")[0];

        child.style.opacity = "0";
        document.getElementById(nameId).appendChild(child);

        chevron.animate({transform: "rotate(0deg)"}, {duration: 200, fill: "forwards"});
        child.animate({opacity: "1"}, {duration: 200, fill: "forwards"});

        selected_obj = nameId;
    } else if (selected_obj === "select") {
        document.getElementById("select_txt").style.color = "white";

        document.getElementById("object_selected").remove();
        selected_obj = nameId;


        let child = creation_fun[nameId][0](creation_fun[nameId][1])
        let chevron = document.getElementById(nameId).getElementsByClassName("chevron-down")[0];

        child.style.opacity = "0";
        document.getElementById(nameId).appendChild(child);

        chevron.animate({transform: "rotate(0deg)"}, {duration: 200, fill: "forwards"});
        child.animate({opacity: "1"}, {duration: 200, fill: "forwards"});
    } else if (selected_obj !== nameId) {
        let chevron1 = document.getElementById(nameId).getElementsByClassName("chevron-down")[0];
        let chevron2 = document.getElementById(selected_obj).getElementsByClassName("chevron-down")[0];

        let child = creation_fun[nameId][0](creation_fun[nameId][1]);

        chevron1.animate({transform: "rotate(0deg)"}, {duration: 200, fill: "forwards"})
        chevron2.animate({transform: "rotate(-90deg)"}, {duration: 200, fill: "forwards"});

        document.getElementById(selected_obj).getElementsByClassName("subsettings")[0].remove();
        document.getElementById(nameId).appendChild(child)

        child.animate({opacity: "1"}, {duration: 200, fill: "forwards"});

        selected_obj = nameId;
    } else {
        let chevron = document.getElementById(nameId).getElementsByClassName("chevron-down")[0];
        chevron.animate({transform: "rotate(-90deg)"}, {duration: 200, fill: "forwards"})
        document.getElementById(nameId).getElementsByClassName("subsettings")[0].remove();
        selected_obj = false;
    }
}


const select = () => {
    if (selected_obj === "select") {
        return;
    } else {
        if (selected_obj) {
            let chevron = document.getElementById(selected_obj).getElementsByClassName("chevron-down")[0];
            chevron.animate({transform: "rotate(-90deg)"}, {duration: 200, fill: "forwards"})
            document.getElementById(selected_obj).getElementsByClassName("subsettings")[0].remove();
        }

        let html = create_select_html()
        document.getElementById("select_obj_param").appendChild(html);
        document.getElementById("select_txt").style.color = "blue"
        

        selected_obj = "select";
    }
}


const fill_select_html = (obj) => {
    const past = document.getElementById("selected_data_container");
    if (past) {
        document.getElementById("selected_data_container").remove();
    }

    const container = document.createElement('div');
    container.id = "selected_data_container";


    let type = obj.constructor.name;
    

    let html;

    const title_div = document.createElement("div");
    title_div.id = "select_title"
    const title_h3 = document.createElement("h3");
    title_h3.innerHTML = type;
    title_div.appendChild(title_h3); 

    if (type === "Ball") {
        const param = {"size": obj.size.toString(), "mass": obj.mass.toString(), "color": obj.color};
        html = create_ball_html(param);
    } else if (type === "Magnet") {
        const param = {"size": obj.size.toString(), "mass": obj.mass.toString(), "strength": obj.strength.toString()}
        html = create_magnet_html(param)
    } else if (type === "Generator") {
        const param = {"size": obj.size.toString(), "mass": obj.mass.toString(), "color": obj.color, "time": obj.timeMax.toString()}
        html = create_generator_html(param);
    } else if (type === "Wall") {
        html = document.createElement("div");
    }


    const remove_elt = document.createElement("button");
    remove_elt.id = "document_remove_button";
    remove_elt.innerHTML = "Remove Element";
    remove_elt.addEventListener("click", function() {
        obj.die();
        clearDead(type);
        document.getElementById("selected_data_container").remove();
    })
    html.appendChild(remove_elt)


    container.appendChild(title_div);
    container.appendChild(html);

    document.getElementById("object_selected").appendChild(container);
}




//add object to scene by clicking
canvas.addEventListener("click", function(e) {
    const localX = e.clientX - e.target.offsetLeft;
    const localY = e.clientY - e.target.offsetTop;


    if (selected_obj === "ball_obj_param") {
        let data = input_data["ball"]
        let n_b = new Ball(parseFloat(data["size"]), localX / current_zoom, localY / current_zoom, 0, 0, 0, 0, parseInt(data["mass"], 10), data["color"])
        balls.push(n_b);
        circles.push(n_b);
    } else if (selected_obj === "magnet_obj_param") {
        let data = input_data["magnet"];
        let n_m = new Magnet(parseFloat(data["size"]), localX / current_zoom, localY / current_zoom, 0, 0, 0, 0, parseInt(data["mass"], 10), data["strength"])
        magnets.push(n_m);
        circles.push(n_m);
    } else if (selected_obj === "generator_obj_param") {
        let data = input_data["generator"];
        let n_g = new Generator(localX/current_zoom, localY/current_zoom, parseFloat(data["size"]), parseFloat(data["mass"]), data["color"], parseFloat(data["time"]));
        generators.push(n_g);
    } if (selected_obj === "wall_obj_param") {
        if (placing_wall) {
            placing_wall.setEnd(localX/current_zoom, localY/current_zoom);
            walls.push(placing_wall);
            placing_wall = false;
        } else {
            placing_wall = new Wall(localX / current_zoom, localY/current_zoom, localX/current_zoom, localY/current_zoom);
        }
    } else if (selected_obj === "select") {
        selected_in_scene = false;
        let curs_ball = new Ball(5/current_zoom, localX/current_zoom, localY/current_zoom, 0, 0, 0, 0, 0, 0);
        for (let w = 0; w < walls.length; w++) {
            let cursToClosest = closestPointBW(curs_ball, walls[w]).subtr(curs_ball.pos);
            if (cursToClosest.mag() <= curs_ball.size){
                selected_in_scene = walls[w];
                break;
            }
        }
        for (let c = 0; c < balls.length; c++) {
            if (balls[c].size > balls[c].pos.subtr(new Vector(localX/current_zoom, localY/current_zoom)).mag()) {
                selected_in_scene = balls[c];
                break;
            }
        }
        for (let m = 0; m < magnets.length; m++) {
            if (magnets[m].size > magnets[m].pos.subtr(new Vector(localX/current_zoom, localY/current_zoom)).mag()) {
                selected_in_scene = magnets[m];
                break;
            }
        }
        for (let g = 0; g < generators.length; g++) {
            if (generators[g].size > generators[g].pos.subtr(new Vector(localX/current_zoom, localY/current_zoom)).mag()) {
                selected_in_scene = generators[g];
                break;
            }
        }
        if (selected_in_scene) {
            fill_select_html(selected_in_scene);
        }
    }
})