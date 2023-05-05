




const input_data = {"ball": {"size": '15', "mass": '5', "color": 'black'}, 
                    "magnet": {"size": "15", "mass": "0", "strength": "100"},
                    "generator": {"size": "30", "mass": "5", "color": "black", "time": "5"}};



let selected_obj = false;




const changeValue = (obj, par, that) => {
    input_data[obj][par] = that.value;
}



function create_ball_html() {
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
    size_input.value = input_data["ball"]["size"];
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
    mass_input.value = input_data["ball"]["mass"];
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
    color_input.value = input_data["ball"]["color"];
    color_input.onchange = function () {changeValue('ball', 'color', color_input)};

    color_div.appendChild(color_h)
    color_div.appendChild(color_input)

    //all together
    ball_html.appendChild(size_div);
    ball_html.appendChild(mass_div);
    ball_html.appendChild(color_div);

    return ball_html;
}



function create_magnet_html() {
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
    size_input.value = input_data["magnet"]["size"];
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
    mass_input.value = input_data["magnet"]["mass"];
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
    strength_input.value = input_data["magnet"]["strength"];
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
function create_generator_html() {
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
    size_input.value = input_data["generator"]["size"];
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
    mass_input.value = input_data["generator"]["mass"];
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
    color_input.value = input_data["generator"]["color"];
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
    time_input.value = input_data["generator"]["time"];
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



const creation_fun = {"ball_obj_param": create_ball_html, "magnet_obj_param": create_magnet_html, "generator_obj_param": create_generator_html};
const dropDownParam = (nameId) => {
    console.log(input_data);
    if (selected_obj === false) {
        document.getElementById(nameId).appendChild(creation_fun[nameId]())
        selected_obj = nameId;
    } else if (selected_obj !== nameId) {
        document.getElementById(selected_obj).getElementsByClassName("subsettings")[0].remove();
        document.getElementById(nameId).appendChild(creation_fun[nameId]())
        selected_obj = nameId;
    } else {
        document.getElementById(nameId).getElementsByClassName("subsettings")[0].remove();
        selected_obj = false;
    }
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
    }
})