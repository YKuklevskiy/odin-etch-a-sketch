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

function onCellHover(event) {
    if(!event.target.classList.contains(CELL_CLASS))
        return;

    if(event.ctrlKey) {
        event.target.classList.add(CELL_FILLED_CLASS);
    }

    if(event.shiftKey) {
        event.target.classList.remove(CELL_FILLED_CLASS);
    }
}

gridContainer.addEventListener("mouseover", onCellHover);

const gridSizeInput = document.getElementById("grid-size-input");
gridSizeInput.addEventListener("input", () => {
    gridSizeInput.value = gridSizeInput.value > 100 ? 100 :
        gridSizeInput.value < 1 ? 1 : gridSizeInput.value;
});

function onRegenerateGrid(event) {
    tearDownGrid();
    const size = gridSizeInput.value;
    grid = generateGrid(size);
}

const regenerateGridButton = document.getElementById("regenerate-grid-button");
regenerateGridButton.addEventListener("click", onRegenerateGrid);