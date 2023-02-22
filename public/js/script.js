// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
import myAPI from "./service.js";
import launchTimetable from "./grid-timetable.js";
document.addEventListener("DOMContentLoaded", () => {
  console.log("Project-2 JS imported successfully!");
});
const url= document.location.href;
const id=url.slice(32);
let authRight= false;
await isAdmin();
async function isAdmin() {
  const user= await myAPI.get('/user');
  const TT= await myAPI.get('/profil/'+id);
  // console.log(user.data._id+'    '+ TT.data.admin);
  if(TT.data.admin===user.data._id || TT.data.editors.includes(user.data._id)){
    authRight= true;
  }
}
// console.log(authRight);
// 
const cells= launchTimetable();
if(authRight){
  createBtnEvent();
}
listEvent();

function createBtnEvent () {  
  const eventBtn = document.createElement("button");
  eventBtn.classList.add("createEvent");
  eventBtn.textContent = "create event";
  document.querySelector("#divBtn").append(eventBtn);
  eventBtn.addEventListener("click", (event) => cloneFormEvent());
// import myAPI from './service.js'
// import launchTimetable from './grid-timetable.js'

// const cells = launchTimetable()

// document.addEventListener('DOMContentLoaded', () => {
//     console.log('Project-2 JS imported successfully!')
// })
// const url = document.location.href
// const id = url.slice(32)
//
// launchTimetable()
// createBtnEvent()
// listEvent()
// function createBtnEvent() {
//     // console.log('ded');
//     const eventBtn = document.createElement('button')
//     eventBtn.classList.add('createEvent')
//     eventBtn.textContent = 'create event'
//     document.querySelector('#divBtn').append(eventBtn)
//     eventBtn.addEventListener('click', (event) => cloneFormEvent())
}

const cloneFormEvent = () => {
    const clone = document.querySelector('#createEvent').content.cloneNode(true)
    document.querySelector('#divBtn').innerHTML = ''
    document.querySelector('#divBtn').append(clone)
    document
        .querySelector('#addAnEvent')
        .addEventListener('click', (event) => createAnEvent())
}

// const createAnEvent = async () => {
//     const title = document.querySelector('#title').value;
//     const content = document.querySelector('#content').value;
//     const hour = parseInt(document.querySelector('#hour').value);
//     const day = parseInt(document.querySelector('#day').value);
//     const newEvent = { hour, day, content, title };
//     const res = await myAPI.post(`/timetable/${id}`, newEvent);

//     console.log(res.data)
//     // document.querySelector('#divBtn').innerHTML = ''
//     // createBtnEvent()
//     // listEvent()
//     // const listDiv= document.querySelector('div');
//     const selectedCell = cells[hour - 7][day + 1];
//     selectedCell.textContent = title;
// }
// async function listEvent() {
//     const ul = document.querySelector('#ullist')
//     ul.innerHTML = ''
//     const allEvent = await myAPI.get(`/timetable/${id}/event`)
//     allEvent.data.forEach((oneEvent) => {
//         const li = document.createElement('li')
//         li.setAttribute('id', oneEvent._id)
//         const delBtn = document.createElement('button')
//         delBtn.textContent = 'Delete'
//         delBtn.addEventListener('click', (event) => deleteEvent(oneEvent))
//         const ediBtn = document.createElement('button')
//         ediBtn.textContent = 'Edit'
//         ediBtn.addEventListener('click', (event) => editForm(oneEvent))
//         li.textContent = oneEvent.title + ': ' + oneEvent.content
//         li.append(delBtn, ediBtn)
//         ul.append(li)
//     })
// }

const createAnEvent= async  () => {
  const title= document.querySelector('#title').value;
  const content= document.querySelector('#content').value;
  const hour= document.querySelector('#hour').value;
  const day= document.querySelector('#day').value;
  if(title!==''){
    const newEvent= { hour, day, content, title};
    const res= await myAPI.post(`/timetable/${id}`, newEvent);
  }
  // console.log(res.data);
  document.querySelector('#divBtn').innerHTML= "";
  createBtnEvent();
  listEvent();
  // const listDiv= document.querySelector('div');
  
}
async function listEvent(){
  const ul= document.querySelector('#ullist');
  ul.innerHTML= '';
  document.querySelectorAll('.event').forEach((el) => el.innerHTML='')
  const allEvent= await myAPI.get(`/timetable/${id}/event`);
  allEvent.data.forEach((oneEvent) => {
    const day= oneEvent.day;
    const hour= oneEvent.hour;
    // console.log(d+ '  '+ h);
    const div= cells[hour - 7][day + 1];
    // const div= document.getElementsByClassName(`d${d} ${h}o`);
    // console.log(div);
    const divEvent= document.createElement('div');
    divEvent.setAttribute('id', oneEvent._id);
    divEvent.textContent= oneEvent.title;
    divEvent.addEventListener('click', (event) => printEvent(oneEvent));
    div.append(divEvent);


    // const li= document.createElement('li');
    // li.setAttribute('id', oneEvent._id);
    // li.textContent= oneEvent.title+ ': '+ oneEvent.content;
    // if(authRight){
    //   const delBtn= document.createElement('button');
    //   delBtn.textContent= "Delete";
    //   delBtn.addEventListener('click', (event) => deleteEvent(oneEvent));
    //   const ediBtn= document.createElement('button');
    //   ediBtn.textContent= "Edit";
    //   ediBtn.addEventListener('click', (event) => editForm(oneEvent));
    //   li.append(delBtn, ediBtn);
    // }
    // ul.append(li);
  })
}

async function printEvent(oneEvent) {
  const printDiv= document.querySelector('#printEvent');
  printDiv.innerHTML='';
  const titleElem= document.createElement('h2');
  titleElem.textContent= oneEvent.title;
  const days= ['Monday', 'Thuesday', 'Wednasday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const contentElem= document.createElement('div');
  contentElem.textContent= oneEvent.content+' at '+oneEvent.hour+"o'clock on "+days[oneEvent.day];
  printDiv.append(titleElem, contentElem);
  if(authRight){
    const delBtn= document.createElement('button');
    delBtn.textContent= "Delete";
    delBtn.addEventListener('click', (event) => deleteEvent(oneEvent));
    const ediBtn= document.createElement('button');
    ediBtn.textContent= "Edit";
    ediBtn.addEventListener('click', (event) => editForm(oneEvent));
    printDiv.append(delBtn, ediBtn);
  }
}

async function editForm(oneEvent) {
  const clone = document
  .querySelector("#createEvent")
  .content.cloneNode(true);
  // document.getElementById(oneEvent._id).innerHTML= ''
  document.getElementById('printEvent').append(clone);
  // console.log(document.querySelector('#newEvent>#title'));
  document.querySelector('#newEvent>#title').setAttribute('value', oneEvent.title);
  document.querySelector('#newEvent>#content').setAttribute('value', oneEvent.content);
  document.querySelector(`#newEvent>#hour`).value= oneEvent.hour;
  document.querySelector(`#newEvent>#day`).value= oneEvent.day;
  document.querySelector('#addAnEvent').addEventListener('click', (event) => editEvent(oneEvent));
}
async function editEvent(oneEvent){
  const updatedEvent= {
    title: document.querySelector('#newEvent>#title').value,
    content: document.querySelector('#newEvent>#content').value,
    hour: document.querySelector(`#newEvent>#hour`).value,
    day: document.querySelector(`#newEvent>#day`).value,
    timeTable: id,
  }
  // console.log('ok');
  await myAPI.patch(`timetable/${id}/event/${oneEvent._id}`, updatedEvent);
  // console.log('ok');
  await listEvent();
}
async function deleteEvent(event) {
  await myAPI.delete(`/timetable/event/${event._id}`);
  const printDiv= document.querySelector('#printEvent');
  printDiv.innerHTML='';
  // console.log('ok')
  await listEvent();
}

// async function editForm(oneEvent) {
//     const clone = document.querySelector('#createEvent').content.cloneNode(true)
//     document.getElementById(oneEvent._id).innerHTML = ''
//     document.getElementById(oneEvent._id).append(clone)
//     // console.log(document.querySelector('#newEvent>#title'));
//     document
//         .querySelector('#newEvent>#title')
//         .setAttribute('value', oneEvent.title)
//     document
//         .querySelector('#newEvent>#content')
//         .setAttribute('value', oneEvent.content)
//     document.querySelector(`#newEvent>#hour`).value = oneEvent.hour
//     document.querySelector(`#newEvent>#day`).value = oneEvent.day
//     document
//         .querySelector('#addAnEvent')
//         .addEventListener('click', (event) => editEvent(oneEvent))
// }
// async function editEvent(oneEvent) {
//     const updatedEvent = {
//         title: document.querySelector('#newEvent>#title').value,
//         content: document.querySelector('#newEvent>#content').value,
//         hour: document.querySelector(`#newEvent>#hour`).value,
//         day: document.querySelector(`#newEvent>#day`).value,
//         timeTable: id,
//     }
//     console.log('ok')
//     await myAPI.patch(`timetable/${id}/event/${oneEvent._id}`, updatedEvent)
//     console.log('ok')
//     await listEvent()
// }
// async function deleteEvent(event) {
//     await myAPI.delete(`/timetable/event/${event._id}`)
//     // console.log('ok')
//     await listEvent()
// }
