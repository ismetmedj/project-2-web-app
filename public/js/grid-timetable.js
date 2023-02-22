const gridElement = document.getElementById('grid')

const columns = 8
const rows = 11
const cells = []

function createTheGrid() {
    let x = 0
    let y = 0
    for (let i = 0; i < rows; i++) {
        const row = []
        for (let j = 0; j < columns; j++) {
            createCell(i, j, row)
        }
        cells.push(row)
    }

    // for (let i = 0; i < columns * rows; i++) {
    //     if (i % columns === 0 && i > 0) {
    //         x = 0
    //         y++
    //     }
    //     createCell(x, y)
    //     x++
    // }
}

function createCell(x, y, row) {
    const div = document.createElement('div')
    div.classList.add('cell')
    div.dataset.x = x
    div.dataset.y = y
    gridElement.append(div)
    row.push(div)
}

function createDays() {
  const daysList= ['Monday', 'Thuesday', 'Wednasday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let index= 0;
    const copy = [...cells.flat()]    
    for (let i = 1; i < 8; i++) {
      const days = copy[i];
      days.classList.add("days");
      days.textContent= daysList[index];
      index++;
    }
}  
    /*
  // for(let i=1; i<82; i+=8){
  //   copy[i].classList.add('d0');
  // }
  // for(let i=2; i<83; i+=8){
  //   copy[i].classList.add('d1');
  // }
  // for(let i=3; i<84; i+=8){
  //   copy[i].classList.add('d2');
  // }
  // for(let i=4; i<85; i+=8){
  //   copy[i].classList.add('d3');
  // }
  // for(let i=5; i<86; i+=8){
  //   copy[i].classList.add('d4');
  // }
  // for(let i=6; i<87; i+=8){
  //   copy[i].classList.add('d5');
  // }
  // for(let i=7; i<88; i+=8){
  //   copy[i].classList.add('d6');
  // }
    // for (let i = 1; i < 8; i++) {
    //     const days = copy[i]
    //     days.classList.add('days')
    // }


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

    for (let i = 1; i < 8; i++) {
        const days = copy[i]
        days.classList.add('days')
    }

}
*/
function createHours() {
    const copy = [...cells.flat()]
    let index= 8;
  for (let i = 8; i < 81; i+=8) {
      const hours = copy[i];
      hours.classList.add("hours");
      hours.textContent= index+"o'";
      index++;
  }
  for(let i=8; i< columns* rows ; i+=8){
    for(let j=i+1; j<i+8; j++){
      copy[j].classList.add('event')
    }
  }
}
/*
  // let index=8;
  // for(let i=8; i< columns* rows ; i++){
  //   for(let j=i; j<i+8; j++){
  //     copy[j].classList.add(`${index}o`);
  //   }
  //   index++
  //   i+=7
  // }

    // for (let i = 8; i < 81; i++) {
    //     if (i % 8 === 0) {
    //         const hours = copy[i]
    //         hours.classList.add('hours')
    //     }
    // }


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

    for (let i = 8; i < 81; i++) {
        if (i % 8 === 0) {
            const hours = copy[i]
            hours.classList.add('hours')
        }
    }

}
*/
// gridElement.innerHTML = "";

function launchTimetable() {
    createTheGrid()

    createDays()
    createHours()

    return cells
}

export default launchTimetable
