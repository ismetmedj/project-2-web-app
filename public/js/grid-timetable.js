const gridElement = document.getElementById("grid");

const columns = 8;
const rows = 11;
let cells = [];

function createTheGrid() {
  let x = 0;
  let y = 0;
  for (let i = 0; i < columns * rows; i++) {
    if (i % columns === 0 && i > 0) {
      x = 0;
      y++;
    }
    createCell(x, y);
    x++;
  }
}

function createCell(x, y) {
  const div = document.createElement("div");
  div.classList.add("cell");
  div.dataset.x = x;
  div.dataset.y = y;
  gridElement.append(div);
  cells.push(div);
}

function createDays() {
  const copy = [...cells];

  for (let i = 1; i < 8; i++) {
    const days = copy[i];
    days.classList.add("days");
  }
}

function createHours() {
  const copy = [...cells];

  for (let i = 8; i < 81; i++) {
    if (i % 8 === 0) {
      const hours = copy[i];
      hours.classList.add("hours");
    }
  }
}

// gridElement.innerHTML = "";

function launchTimetable() {
  createTheGrid();

  createDays();
  createHours();
}

export default launchTimetable;