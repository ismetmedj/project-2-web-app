// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
import myAPI from './service.js';
document.addEventListener("DOMContentLoaded", () => {
  console.log("Project-2 JS imported successfully!");
});

document.querySelector('#create').addEventListener('click', (event)=> {
  const clone= document.querySelector('#createTT').content.cloneNode(true);
  document.querySelector('#main').innerHTML= '';
  document.querySelector('#main').append(clone);
})

document.querySelector('#createTT').addEventListener('click', async (event) => {
  event.defaultPrevented();
  const newTT= { title };
  try {
    const res= await myAPI.post('/timetable', newTT);
    // console.log(res);
  } catch (error) {
    console.error(error);
  }
})