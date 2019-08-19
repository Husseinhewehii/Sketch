//Global Variables
const root = document.documentElement;
const canvas = document.getElementById('canvas');
const dimension = document.getElementById('dimension');
const clear = document.getElementById('clear');
const grid_toggle = document.getElementById('hide_grid');
const color = document.getElementById('color');
const spray_switch = document.getElementById('spray_switch')
const settings_controller = document.getElementById('settings')
const single_drawer = document.getElementById('single');
const my_gradual = document.getElementById('gradual');
const my_rainbow = document.getElementById('rainbow');
const my_rubber = document.getElementById('rubber');


//Grid Functions
function generate_grid(){
    if(dimension.value > 1 && dimension.value <= 250){
        canvas.innerHTML = '';
        root.style.setProperty('--grid-dimension',dimension.value)
        canvas.style.cssText = 'background: rgb(255,255,255);';
        for (i=0; i<dimension.value * dimension.value; i++){
            let div = document.createElement('div');
            canvas.appendChild(div);
            div.addEventListener('click',paint);
            div.addEventListener('mouseover',spray);

        }
    }else{
        canvas.innerHTML = '';
        canvas.style.backgroundColor = 'black';
        let sizer = document.createElement('p');
        sizer.textContent = 'Size must range between 2 and 250';
        sizer.style.cssText = "width:320px;color: rgba(252, 161, 44); font-size: 30px;text-align: center; position:relative;top:100px;left:180px;font-style: italic;font: bold;";
        canvas.appendChild(sizer);
    }

    //setting each div's border
    border_conditions()
}

function border_conditions(){
    //disabling the (GRID TOGGLE) and setting the canvas'(BORDERS) to ZERO at a certain point..
    let divs = canvas.querySelectorAll('div');
   
    if (dimension.value>=100 ){
        grid_toggle.checked = true;
        divs.forEach((one)=>one.style.cssText = 'border:0px;');
        grid_toggle.disabled = true;
        let border_note = document.createElement('p')
        border_note.textContent = 'Grid Size over 99 does not allow Borders...';
        border_note.style.cssText = 'font-size:11px;color:black;position:relative;bottom:58px;right:40px;';
        settings_controller.appendChild(border_note); 
    }else{
        grid_toggle.checked = false;
        divs.forEach((one)=>one.style.cssText = 'border:0.1px solid rgb(223, 223, 223,0.8);')
        grid_toggle.disabled = false;
        if(settings_controller.querySelector('p')){
            let border_note =document.querySelector('p');
            settings_controller.removeChild(border_note);
        }
    }
}

function hide_grid(){
    //turns the "borders" of all div squares on the canvas to ZERO and BACK according the the toggle state..
    let divs = canvas.querySelectorAll('div');
    if(grid_toggle.checked){
        divs.forEach((one)=>one.style.border ='0px');  
    }else{
       divs.forEach((one)=>one.style.border ='0.1px solid rgb(223, 223, 223,0.8)');
    }
}

//Draw Functions
function paint(){
    // changes a sqaure background-color by a (Mouse-Click)..
    if(!spray_switch.checked){
        //if the (Spray_Toggle) is switched (Off)
        if(single_drawer.classList.contains('active')){
            //if the (Single_Palette) is activated the color is (User-Specified)
            this.style.backgroundColor = color.value
        }else if(my_rubber.classList.contains('active')){
            //if the (Rubber) is activated the color is (Basic)
            this.style.backgroundColor = 'rgb(255,255,255)'
        }else if(my_rainbow.classList.contains('active')){
            //if the (Rainbow) is activated the color is (random)
            let Red = Math.floor(Math.random()*255);
            let Green = Math.floor(Math.random()*255);
            let Blue = Math.floor(Math.random()*255);
            this.style.backgroundColor = 'rgb(' + Red + ',' + Green + ',' + Blue + ')';
        }else if(my_gradual.classList.contains('active')){
            if(this.style.backgroundColor == ''){this.style.backgroundColor = color.value;}
            this.style.opacity == '' ? this.style.opacity = 0.1 :
            this.style.opacity = parseFloat(this.style.opacity)+0.1
        }
    }
}

function spray(){
    // changes a sqaure background-color by a (Mouse-Hover)..
    if(spray_switch.checked){
        //if the (Spray_Toggle) is switched (On)
        if(single_drawer.classList.contains('active')){
            //if the (Single_Palette) is activated the color is (User-Specified)
            this.style.backgroundColor = color.value
        }else if(my_rubber.classList.contains('active')){
            //if the (Rubber) is activated the color is (Basic)
            this.style.backgroundColor = 'rgb(255,255,255)'
        }else if(my_rainbow.classList.contains('active')){
            //if the (Rainbow) is activated the color is (random)
            let Red = Math.floor(Math.random()*255);
            let Green = Math.floor(Math.random()*255);
            let Blue = Math.floor(Math.random()*255);
            this.style.backgroundColor = 'rgb(' + Red + ',' + Green + ',' + Blue + ')';
        }else if(my_gradual.classList.contains('active')){
            if(this.style.backgroundColor == ''){
                this.style.backgroundColor = color.value;
            }
            this.style.opacity == '' ? this.style.opacity = 0.1 :
            this.style.opacity = parseFloat(this.style.opacity)+0.1;
        }
    }
}

// Options Functions
function activate_option(){
    // removes the 'active' class from the (LAST) activated element and add it to the (CURRENT) activated element ..
    document.querySelector('.active').classList.remove('active');
    this.classList.add('active');
}



//Event Listeners
dimension.addEventListener('keyup',generate_grid);
dimension.addEventListener('mouseup',generate_grid);
clear.addEventListener('click',generate_grid);

grid_toggle.addEventListener('click',hide_grid);

single_drawer.addEventListener('click',activate_option);
my_gradual.addEventListener('click',activate_option);
my_rainbow.addEventListener('click',activate_option);
my_rubber.addEventListener('click',activate_option);