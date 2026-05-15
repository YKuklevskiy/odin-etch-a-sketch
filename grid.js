const gridContainer = document.getElementById("grid-container");
const DEFAULT_GRID_SIZE = 16;

const GRID_ROW_CLASS = "grid-row";
const CELL_CLASS = "grid-cell";
const CELL_FILLED_CLASS = "grid-cell-filled";

const gridRowId = (i) => `grid-row-${i}`;
const cellId = (i, j) => `cell-${i}-${j}`;

function generateGrid(size) {
    let grid = [];
    for (let i = 0; i < size; i++) {
        let gridRow = document.createElement("div");
        gridRow.id = gridRowId(i);
        gridRow.classList.add(GRID_ROW_CLASS);
        
        grid.push([]);
        for (let j = 0; j < size; j++) {
            let cell = document.createElement("div");
            cell.id = cellId(i, j);
            cell.classList.add(CELL_CLASS);
            
            grid.at(-1).push(cell);
            gridRow.appendChild(cell);
        }
        gridContainer.appendChild(gridRow);
    }
    return grid;
}

function tearDownGrid() {
    while (gridContainer.lastElementChild) {
        gridContainer.removeChild(gridContainer.lastElementChild);
    }
}
    
let grid = generateGrid(DEFAULT_GRID_SIZE);

//https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties
const documentComputedStyle = getComputedStyle(document.documentElement);
const cellColor = arrayFromColor(documentComputedStyle.getPropertyValue("--color-cell"));
const fillColor = arrayFromColor(documentComputedStyle.getPropertyValue("--color-fill"));
const mixRatio = 0.2;

function colorFromArray(arr) {
    return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
}

function arrayFromColor(color) {
    // god help us all    
    color = color.replaceAll("rgb", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll(" ", "");
    
    return color.split(",").map(el => parseInt(el));
}

function mixColors(colorA, colorB, mixRatio) {
    let mix = (a, b, ratio) => (a + b * mixRatio) / (1 + mixRatio);
    return [
        mix(colorA[0], colorB[0], mixRatio),
        mix(colorA[1], colorB[1], mixRatio),
        mix(colorA[2], colorB[2], mixRatio)
    ];
}

function paintElement(element) {
    let initColor; 
    if(element.style.backgroundColor) {
        initColor = arrayFromColor(element.style.backgroundColor);
    }
    else {
        initColor = cellColor;
    }
    const finalColor = mixColors(initColor, fillColor, mixRatio);
    element.style.backgroundColor = colorFromArray(finalColor);
}

function clearElement(element) {
    element.style.backgroundColor = colorFromArray(cellColor);
}

function onCellHover(event) {
    if(!event.target.classList.contains(CELL_CLASS))
        return;

    if(event.ctrlKey) {
        paintElement(event.target);
    }

    if(event.shiftKey) {
        clearElement(event.target);
    }
}

gridContainer.addEventListener("mouseover", onCellHover);

const gridSizeInput = document.getElementById("grid-size-input");
gridSizeInput.addEventListener("input", () => {
    gridSizeInput.value = gridSizeInput.value > 100 ? 100 :
        gridSizeInput.value < 1 ? 1 : gridSizeInput.value;
});
gridSizeInput.addEventListener("focus", () => gridSizeInput.select());

function onRegenerateGrid(event) {
    tearDownGrid();
    const size = gridSizeInput.value;
    grid = generateGrid(size);
}

const regenerateGridButton = document.getElementById("regenerate-grid-button");
regenerateGridButton.addEventListener("click", onRegenerateGrid);

const infoContainer = document.getElementById("info");
const ctrlBlock = document.getElementById("ctrl");
const shiftBlock = document.getElementById("shift");
const PRESSED_KEY_CLASS = "info-block-pressed";
function onInfoKeyPressed(event, key, element, toPress) {
    if(event.key !== key)
        return;

    toPress ? element.classList.add(PRESSED_KEY_CLASS) : element.classList.remove(PRESSED_KEY_CLASS); 
}

window.addEventListener("keydown", (event) => onInfoKeyPressed(event, "Control", ctrlBlock, true));
window.addEventListener("keyup", (event) => onInfoKeyPressed(event, "Control", ctrlBlock, false));
window.addEventListener("keydown", (event) => onInfoKeyPressed(event, "Shift", shiftBlock, true));
window.addEventListener("keyup", (event) => onInfoKeyPressed(event, "Shift", shiftBlock, false));