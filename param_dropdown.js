




const input_data = {"ball": {"size": '0', "mass": '0', "color": 'black'}}

const data_visual = {"ball_obj_param": [false, `<div class='param_perso'><h5>Size</h5><input type='number' value=${input_data['ball']['size']}></div><div class='param_perso'><h5>Mass</h5><input type='number' value=${input_data['ball']['mass']}></div><div class='param_perso'><h5>Color</h5><input type='color' value=${input_data['ball']['color']}></div>`]}


const changeValue = (obj, par, that) => {
    input_data[obj][par] = that.value;
    console.log(input_data);
}



const dropDownParam = (nameId) => {
    data_obj = data_visual[nameId];
    if (!data_obj[0]) {
        document.getElementById(nameId).getElementsByClassName("subsettings")[0].innerHTML = data_obj[1];
    } else {
        document.getElementById(nameId).getElementsByClassName("subsettings")[0].innerHTML = "";
    }
    data_visual[nameId][0] = !data_obj[0]
}