// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
import myAPI from './service.js';
document.addEventListener("DOMContentLoaded", () => {
  console.log("Project-2 JS imported successfully!");
});

document.querySelector('#create').addEventListener('click', (event)=> {
  const clone= document.querySelector('#createTT').content.cloneNode(true);
  document.querySelector('#main').innerHTML= '';
  document.querySelector('#main').append(clone);

  document.querySelector('#createTimeTable').addEventListener('submit', async (event) => {
    event.preventDefault();
    const title= document.querySelector('#title').value;
    const newTT= { title };
    // console.log(newTT);
    try {
      // console.log('hey');
      const res= await myAPI.post('/timetable', newTT);
      // console.log(res);
      const eventBtn= document.createElement('button');
      eventBtn.classList.add('createEvent');
      eventBtn.textContent= 'create event';
      document.querySelector('#main').append(eventBtn);
      eventBtn.addEventListener('click', (event)=> {
        const clone= document.querySelector('#createEvent').content.cloneNode(true);
        document.querySelector('#main').innerHTML= '';
        document.querySelector('#main').append(clone);
    });
      // document.querySelector('#main').append(clone);
    } catch (error) {
      console.error(error);
    }
  })
})

