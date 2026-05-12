const gridContainer = document.getElementById("grid-container");
const GRID_SIZE = 16;
const GRID_ROW_CLASS = "grid-row";
const CELL_CLASS = "grid-cell";

const gridRowId = (i) => `grid-row-${i}`;
const cellId = (i, j) => `cell-${i}-${j}`;

let grid = [];
for (let i = 0; i < GRID_SIZE; i++) {
    let gridRow = document.createElement("div");
    gridRow.id = gridRowId(i);
    gridRow.classList.add(GRID_ROW_CLASS);

    grid.push([]);
    for (let j = 0; j < GRID_SIZE; j++) {
        let cell = document.createElement("div");
        cell.id = cellId(i, j);
        cell.classList.add(CELL_CLASS);

        grid.at(-1).push(cell);
        gridRow.appendChild(cell);
    }
    gridContainer.appendChild(gridRow);
}