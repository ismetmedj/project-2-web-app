// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
import myAPI from './service.js'
import launchTimetable from './grid-timetable.js'

const cells = launchTimetable()
console.log(cells)
document.addEventListener('DOMContentLoaded', () => {
    console.log('Project-2 JS imported successfully!')
})

//
createBtnEvent()
function createBtnEvent() {
    // console.log('ded');
    const eventBtn = document.createElement('button')
    eventBtn.classList.add('createEvent')
    eventBtn.textContent = 'create event'
    document.querySelector('#divBtn').append(eventBtn)
    eventBtn.addEventListener('click', (event) => cloneFormEvent())
}
const cloneFormEvent = () => {
    const clone = document.querySelector('#createEvent').content.cloneNode(true)
    document.querySelector('#divBtn').innerHTML = ''
    document.querySelector('#divBtn').append(clone)
    document
        .querySelector('#addAnEvent')
        .addEventListener('click', (event) => createAnEvent())
}

const createAnEvent = async () => {
    const title = document.querySelector('#title').value
    const content = document.querySelector('#content').value
    const hour = parseInt(document.querySelector('#hour').value)
    const day = parseInt(document.querySelector('#day').value)
    const url = document.location.href
    const id = url.slice(32)
    const newEvent = { hour, day, content, title }
    const res = await myAPI.post(`/timetable/${id}`, newEvent)

    // for (let i = 0; i < 88; i++) {}

    console.log(res.data)
    console.log(cells[hour - 7][day + 1])
    const selectedCell = cells[hour - 7][day + 1]
    const firstEventDiv = document.createElement('div')
    selectedCell.append(firstEventDiv)
    div.classList.add('first-event')
    firstEventDiv.textContent = title

    // selectedCell.textContent = title
    // const div = document.createElement('div')
    // selectedCell.append(div)
    // div.classList.add('event')
}
