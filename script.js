//Get all the elements//
const container = document.getElementById("container");
const resetButton = document.getElementById("reset");
const rainButton = document.getElementById("rainbow");
const color = document.getElementById("color");
const pixelRange = document.getElementById("myRange");
const filler = document.getElementById("fill");

//Declare the variables//
let drawColor = color.value;
let IsDraw = false;
let rainbow = false;
let Erase = false;
let isReset = false;
let background = "white";
let Pixel = 64;

//Functions and set up//
for (let i = 0; i < Pixel; i++) {
  columns();
}
function changeColor () {
  drawColor = color.value;
}
function rows (rowContainer) {
  const box = document.createElement("div");
  box.style.backgroundColor = "white";
  box.style.height = "" + 640/Pixel + "px";
  box.style.width = "" + 640/Pixel + "px";
  box.classList.add("effect-class");
  box.addEventListener("mousedown",ChangeBool);
  box.addEventListener("mouseenter",ToDraw);
  box.addEventListener("mouseenter",ToErase);
  rowContainer.appendChild(box);
}
function columns () {
  const rowContainer = document.createElement("div");
  rowContainer.style.display = "flex";
  rowContainer.style.flexDirection = "row";
  for (let i = 0; i < Pixel; i++) {
    rows(rowContainer);
  }
  container.appendChild(rowContainer);
}
function ToDraw () {
  if (IsDraw && rainbow) {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    drawColor = "rgb(" + r + "," + g + "," + b + ")";
    this.style.backgroundColor = drawColor;
  }
  else if (IsDraw) {
    this.style.backgroundColor = drawColor;
  }
}
function ToErase () {
  if (Erase) {
    this.style.backgroundColor = background;
  }
}
function ChangeBool () {
  if (event.button == 0) {
    if (IsDraw == false) {
      this.style.backgroundColor = drawColor;
      IsDraw = true;
      Erase = false;
    }
    else {
      IsDraw = false;
    }
  }
  if (event.button == 2) {
    if (Erase == false) {
      this.style.backgroundColor = background;
      Erase = true;
      IsDraw = false;
    }
    else {
      Erase = false;
    }
  }
}
function Reset () {
  let row = container.children;
  let v = 0;
  while (v != Pixel ) {
    let grid = row[v].children
    for (let i = 0; i < grid.length; i++) {
      grid[i].style.backgroundColor = "white";
      background = "white";
    }
    v++;
  }
}
function Fill () {
  let row = container.children;
  let v = 0;
  while (v != Pixel ) {
    let grid = row[v].children
    for (let i = 0; i < grid.length; i++) {
      grid[i].style.backgroundColor = drawColor;
      background = drawColor;
    }
    v++;
  }
}
function colorful () {
  if (!rainbow) {
    rainbow = true;
  }
  else {
    drawColor = color.value;
    rainbow = false;
  }
}
function resize () {
    Pixel = pixelRange.value;
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
    for (let i = 0; i < Pixel; i++) {
        columns();
    }
}


//Set the functions to Buttons//
resetButton.addEventListener("click",Reset);
rainButton.addEventListener("click",colorful);
color.addEventListener("input",changeColor);
filler.addEventListener("click",Fill);
pixelRange.addEventListener("input",resize);

