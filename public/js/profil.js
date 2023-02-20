import myAPI from "./service.js";

document.querySelector("#create").addEventListener("click", (event) => {
      const clone = document.querySelector("#createTT").content.cloneNode(true);
      document.querySelector("#main").innerHTML = "";
      document.querySelector("#main").append(clone);
    });
// document.querySelector('#fetch').addEventListener('click', fetchAll());
fetchAll();
async function fetchAll() {
    try {
        const allTT= await myAPI.get('/profil/timetables')
        // console.log(allTT);
        const ul= document.createElement('ul');
        ul.classList.add('ulList');
        allTT.data.forEach((tt) => createLi(tt, ul))
        
        document.querySelector('#list').append(ul);
    } catch (error) {
        console.error(error);
    }
}

function createLi(tt, ul){
        const li= document.createElement('li');
        const a= document.createElement('a');
        a.href = "profil/timetable/"+tt._id;
        a.textContent=  tt.title;
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', async () => {
            await myAPI.delete(`/profil/${tt._id}`)
            ul.innerHTML= '';
            await fetchAll();
        })
        ul.append(li)
        li.append(a, delBtn);
}
    //   document
    //     .querySelector("#createTimeTable")
    //     .addEventListener("submit", async (event) => {
    //       console.log('hey');
    //       event.preventDefault();
    //       const title = document.querySelector("#title").value;
    //       const newTT = { title };
    //       try {
    //         const res = await myAPI.post("/profil", newTT);
    //         console.log(res);
    //   } catch (error) {
    //       console.error(error);
    //     }
    //     });