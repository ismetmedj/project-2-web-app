// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
import myAPI from "./service.js";
import launchTimetable from "./grid-timetable.js";
document.addEventListener("DOMContentLoaded", () => {
  console.log("Project-2 JS imported successfully!");
});

// 
launchTimetable();
createBtnEvent();
function createBtnEvent () {  
  // console.log('ded');
  const eventBtn = document.createElement("button");
  eventBtn.classList.add("createEvent");
  eventBtn.textContent = "create event";
  document.querySelector("#divBtn").append(eventBtn);
  eventBtn.addEventListener("click", (event) => cloneFormEvent());
}
const cloneFormEvent = () => {
  const clone = document
  .querySelector("#createEvent")
  .content.cloneNode(true);
  document.querySelector("#divBtn").innerHTML= ''
  document.querySelector("#divBtn").append(clone);
  document.querySelector('#addAnEvent').addEventListener('click', (event) => createAnEvent());
}

const createAnEvent= async  () => {
  const title= document.querySelector('#title').value;
  const content= document.querySelector('#content').value;
  const hour= document.querySelector('#hour').value;
  const day= document.querySelector('#day').value;
  const url= document.location.href;
  const id=url.slice(32);
  const newEvent= { hour, day, content, title};
  const res= await myAPI.post(`/timetable/${id}`, newEvent);
  console.log(res.data);
}