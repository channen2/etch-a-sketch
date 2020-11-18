function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function createGrid(){
    const grid_container = document.querySelector('.grid-container');
    grid_container.style.width = CONTAINER_WIDTH + "px";
    grid_container.style.height = CONTAINER_HEIGHT + "px";

    removeAllChildNodes(grid_container);

    if (firstGrid){x = 16;firstGrid=false;}
    else{x = prompt("Enter grid size");}

    const widthPerUnit = (CONTAINER_WIDTH - 2*x) / x;
    const heightPerUnit = (CONTAINER_HEIGHT - 2*x) / x;
    console.log(widthPerUnit);

    for(i=0; i<x*x; i++){
        const div = document.createElement('div');
        div.classList.add('grid-unit');
        div.style.backgroundColor = "rgb(255,255,255)";
        div.style.width = widthPerUnit + "px";
        div.style.height = heightPerUnit + "px";
        div.addEventListener('mouseover', drawOnHover);
        grid_container.appendChild(div);
    }
}

function clearGrid(){
    const grid = document.querySelectorAll('.grid-unit');
    grid.forEach((square) => square.style.backgroundColor = "rgb(255,255,255");
}

function drawOnHover(e){
    // Normal drawing mode
    if(isDown){
        if(drawMode===0){
            e.target.style.backgroundColor = document.getElementById("color").value;
        }
        // Darken pixel by 10% 
        else if(drawMode===1){
            const currentColor = e.target.style.backgroundColor; 
            const currRgb = currentColor.match(/\d+/g);
            const newRgb = currRgb.map(rgb => rgb * 0.9);
    
            e.target.style.backgroundColor = `rgb(${newRgb[0]}, ${newRgb[1]}, ${newRgb[2]})`;
        }
        // Random color mode
        else{
            const rgb = Array.from(Array(3)).map(x=>Math.floor(Math.random() * Math.floor(256)));
            e.target.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        }
    }
}

const newGridBtn = document.querySelector('.new-grid-btn');
const clearBtn = document.querySelector('.clear-btn');
const drawBtn = document.querySelector('.draw-btn');
const darkenBtn = document.querySelector('.darken-btn');
const randomBtn = document.querySelector('.random-btn');

newGridBtn.addEventListener('click', createGrid)
clearBtn.addEventListener('click', clearGrid);
drawBtn.addEventListener('click', () => drawMode=0);
darkenBtn.addEventListener('click', () => drawMode=1);
randomBtn.addEventListener('click', () => drawMode=2);
document.addEventListener('mousedown', () => isDown=true);
document.addEventListener('mouseup', () => isDown=false);

let drawMode = 0;
let firstGrid = true;
let isDown = false;
const CONTAINER_WIDTH = 650;
const CONTAINER_HEIGHT = 650;

createGrid(firstGrid);
