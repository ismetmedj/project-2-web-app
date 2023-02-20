// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
import myAPI from "./service.js";
import launchTimetable from "./grid-timetable.js";
document.addEventListener("DOMContentLoaded", () => {
  console.log("Project-2 JS imported successfully!");
});

// 
  launchTimetable();
  
  const eventBtn = document.createElement("button");
  eventBtn.classList.add("createEvent");
  eventBtn.textContent = "create event";
  document.querySelector("#divBtn").append(eventBtn);
  eventBtn.addEventListener("click", (event) => {
    const clone = document
    .querySelector("#createEvent")
    .content.cloneNode(true);
    document.querySelector("#diBtn").append(clone);
  });