const boardSize = document.querySelector('#inputRange');
const sizeDisplay = document.querySelector('#displaySize');
const board = document.querySelector('#board');
const colorChoice = document.querySelector('#colorPicker');
const randomColor = document.querySelector('#random');
const resetBtn = document.querySelector('#reset');
const eraser = document.querySelector('#eraser');

// Create the board
function makeBoard(e) {
    board.innerHTML = '';
    board.style.setProperty('--grid-rows',e);
    board.style.setProperty('--grid-cols',e);
    for(c = 0; c< (e * e);c++){
        let cell = document.createElement('div');
        cell.addEventListener('mouseover', changeColor);
        board.appendChild(cell).className = 'grid-item';
    }
}
makeBoard(16);
function displaySize(e) {
    sizeDisplay.innerText = `${e} x ${e}`;
}

function resetAll(){
    makeBoard(16);
    document.querySelector('#inputRange').value = 16;
    displaySize(16);
}
function changeColor(){
    this.style.backgroundColor = color;
}

let color = '#333333';
let mouseDown = false;
//update board size
boardSize.onmousedown = () => mouseDown = true;
boardSize.onmousemove = (e) => {
    if(!mouseDown){ 
        makeBoard(e.target.value);
        displaySize(e.target.value);
    }
    else displaySize(e.target.value);
};
boardSize.onmouseup = () => mouseDown = false;

resetBtn.addEventListener('click',resetAll);

randomColor.addEventListener('click', ()=>{
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    color = `rgb(${randomR}, ${randomG}, ${randomB})`;
    console.log(color);
    randomColor.style.backgroundColor = color;
})
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  
colorChoice.addEventListener('change', ()=>{
    let colorR = hexToRgb(colorChoice.value).r;
    let colorG = hexToRgb(colorChoice.value).g;
    let colorB = hexToRgb(colorChoice.value).b;
    color = `rgb(${colorR}, ${colorG}, ${colorB})`;
    randomColor.style.backgroundColor = '#DCDCDC';
    console.log(color);
});

eraser.addEventListener('click', ()=>{
    color = `rgb(220,220,220)`;
});