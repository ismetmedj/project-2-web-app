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
  for(let i=1; i<82; i+=8){
    copy[i].classList.add('d0');
  }
  for(let i=2; i<83; i+=8){
    copy[i].classList.add('d1');
  }
  for(let i=3; i<84; i+=8){
    copy[i].classList.add('d2');
  }
  for(let i=4; i<85; i+=8){
    copy[i].classList.add('d3');
  }
  for(let i=5; i<86; i+=8){
    copy[i].classList.add('d4');
  }
  for(let i=6; i<87; i+=8){
    copy[i].classList.add('d5');
  }
  for(let i=7; i<88; i+=8){
    copy[i].classList.add('d6');
  }
}

function createHours() {
  const copy = [...cells];

  for (let i = 8; i < 81; i+=8) {
      const hours = copy[i];
      hours.classList.add("hours");
  }
  let index=8;
  for(let i=8; i< columns* rows ; i++){
    for(let j=i; j<i+8; j++){
      copy[j].classList.add(`${index}o`);
    }
    index++
    i+=7
  }
}

// gridElement.innerHTML = "";

function launchTimetable() {
  createTheGrid();
  createCell();
  createDays();
  createHours();
}

export default launchTimetable;