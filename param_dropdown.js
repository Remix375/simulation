




const input_data = {"ball": {"size": '0', "mass": '0', "color": 'black'}}



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



const creation_fun = {"ball_obj_param": create_ball_html}
const dropDownParam = (nameId) => {
    if (selected_obj === false) {
        document.getElementById(nameId).appendChild(creation_fun[nameId]())
        selected_obj = nameId;
    } else if (selected_obj !== nameId) {
        document.getElementById(nameId).getElementsByClassName("subsettings")[0].remove();
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
        balls.push(new Circle(parseInt(data["size"], 10), localX / current_zoom, localY / current_zoom, 0, 0, 0, 0, parseInt(data["mass"], 10), data["color"]))
    }
})