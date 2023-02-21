import myAPI from "./service.js";

document.querySelector("#create").addEventListener("click", (event) => {
      const clone = document.querySelector("#createTT").content.cloneNode(true);
      document.querySelector("#divCreate").innerHTML = "";
      document.querySelector("#divCreate").append(clone);
    });

document.querySelector('#fetch').addEventListener('click', (event) => fetchAll());

document.querySelector('#fetchShare').addEventListener('click', (event) => fetchShare());

async function fetchShare() {
    try {
        document.querySelector('#listShare').innerHTML= '';
        const allTT= await myAPI.get('/profil/sharedtimetables')
        const ul= document.createElement('ul');
        ul.classList.add('ulList');
        allTT.data.forEach((tt) => createLi(tt, ul, true));
        document.querySelector('#listShare').append(ul);
    } catch (error) {
        console.error(error);
    }
}

async function editTT(tt , shared=false) {
    try {
        const editedTT= await myAPI.get(`/profil/${tt._id}`);
        const clone = document.querySelector("#editTT").content.cloneNode(true);
        document.querySelector('.divEdit').innerHTML= "";
        document.querySelector('.divEdit').append(clone);
        if(!shared){
            document.querySelector('#edittitle').setAttribute('value', editedTT.data.title);
            document.querySelector('#editBtn').addEventListener('click', (event) => updateTT(tt));
        }else {
            // document.querySelector('#edittitle').setAttribute('value', editedTT.data.title);
            document.querySelector('#editBtn').addEventListener('click', (event) => updateTT(tt));
        }
    } catch (error) {
        console.error(error);
    }
}
async function fetchAll() {
    try {
        document.querySelector('#list').innerHTML= '';
        const allTT= await myAPI.get('/profil/timetables')
        const ul= document.createElement('ul');
        ul.classList.add('ulList');
        allTT.data.forEach((tt) => createLi(tt, ul, false));
        document.querySelector('#list').append(ul);
    } catch (error) {
        console.error(error);
    }
}

function createLi(tt, ul, shared){
        const li= document.createElement('li');
        const a= document.createElement('a');
        a.href = "/timetable/"+tt._id;
        a.textContent=  tt.title;
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        const whithUl= document.createElement('ul');
        tt.participants.forEach(async (part) => {
            const partObj= await User.findById(part);
            const withLi= document.querySelector('li');
            withLi.textContent= 'aeuzaeu'+partObj.username;
            const deletePart= document.createElement('button');
            deletePart.classList.add('deletePart');
            whithUl.append(withLi, deletePart);
        })
        if(!shared){
            delBtn.addEventListener('click', (event) => deleteOne(tt));
        }else {
            delBtn.addEventListener('click', (event) => deleteSharedOne(tt));
        }
        li.append(a, whithUl, delBtn);
        if(!shared){
            const ediBtn= document.createElement('button');
            ediBtn.textContent= "Edit";
            const divEdit= document.createElement('div');
            divEdit.classList.add('divEdit');
            divEdit.append(ediBtn);
            ediBtn.addEventListener('click', (event) => editTT(tt));
            
            const divShare= document.createElement('div');
            divShare.classList.add('divShare');
            const shareBtn= document.createElement('button');
            shareBtn.textContent= "Share Time Table"
            divShare.append(shareBtn);
            shareBtn.addEventListener('click', (event) => editTT(tt, true));
            
            li.append(divEdit, divShare);
        }
        ul.append(li)
}

async function shareTT(tt) {
    
}

async function deleteOne(tt) {
    await myAPI.delete(`/profil/${tt._id}`)
    await fetchAll();
}
async function deleteSharedOne(tt){
    await myAPI.delete(`/profil/share/${tt._id}`);
    await fetchShare();
}
 async function updateTT(tt) {
    // console.log('click')
    const title= document.querySelector('#edittitle').value;
    const newTT= { title };
    await myAPI.patch(`/profil/${tt._id}`, newTT);
    fetchAll();
 }
