const gridElement = document.getElementById("grid");

const columns = 8;
const rows = 11;
let cells = [];

function createTheGrid() {
  for (let i = 1; i < columns * rows; i++) {
    createCell();
  }
}

function createCell() {
  const div = document.createElement("div");
  div.classList.add("cell");
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
  console.log('hey');
  createTheGrid();
  createCell();
  createDays();
  createHours();
}

export default launchTimetable;