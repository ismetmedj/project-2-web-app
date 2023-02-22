import myAPI from "./service.js";

document.querySelector("#create").addEventListener("click", (event) => {
      const clone = document.querySelector("#createTT").content.cloneNode(true);
      document.querySelector("#divCreate").innerHTML = "";
      document.querySelector("#divCreate").append(clone);
    });
fetchAll();
// isAdmin();
// async function isAdmin() {
//   const user= await myAPI.get('/user');
//   console.log(user.data._id);
// }

// document.querySelector('#fetch').addEventListener('click', (event) => fetchAll());

// document.querySelector('#fetchShare').addEventListener('click', (event) => fetchShare());

async function fetchShare() {
    try {
        // document.querySelector('#listShare').innerHTML= '';
        const allTT= await myAPI.get('/profil/sharedtimetables')
        const ul= document.querySelector('.ulList');
        allTT.data.forEach((tt) => createLi(tt, ul, true));
        document.querySelector('#list').append(ul);
    } catch (error) {
        console.error(error);
    }
}

async function editTT(tt) {
    try {
        const editedTT= await myAPI.get(`/profil/${tt._id}`);
        const all=await myAPI.post('/users');
        // console.log(all);
        const clone = document.querySelector("#editTT").content.cloneNode(true);
        document.getElementById(tt._id).innerHTML= "";
        document.getElementById(tt._id).append(clone);
        const editForm= document.querySelector('#editForm');
        
        console.log(tt.participants);
        console.log(tt.editors);
        all.data.forEach((el) => {
            console.log(el._id)
            const array= ['none', 'participant', 'editor'];
            const fieldset= document.createElement('fieldset');
            const legend= document.createElement('legend');
            array.forEach((tag) => {
                legend.textContent= el.username;
                const input= document.createElement('input');
                input.setAttribute('type', 'radio');
                input.setAttribute('name', el.username);
                input.setAttribute('value', tag);
                if(tag==='participant'){
                    for(const user of tt.participants){
                        if(user._id===el._id){
                            input.checked= true;
                            // console.log('part');
                        }
                    }
                }
                if(tag==='editor'){
                    for(const user of tt.editors){
                        if(user._id===el._id){
                        input.checked= true;
                        // console.log('ed');
                        }
                    }
                }
                input.classList.add('updateShare');
                const label= document.createElement('label');
                label.setAttribute('for', el.username);
                // label.append(input);
                const divInp= document.createElement('div');
                divInp.append(input, label);
                label.textContent= tag;
                fieldset.append(legend, divInp);
            })
            // label.textContent= el.username;
            // for(const user of tt.participants){
            //     if(user._id===el._id){
            //         input.checked= true;
            //     }
            // }
            editForm.append(fieldset);
        // console.log(tt.participants);
        all.data.forEach((el) => {
            const input= document.createElement('input');
            input.setAttribute('type', 'checkbox');
            input.setAttribute('name', el.username);
            input.setAttribute('id', el.username);
            input.classList.add('updateShare');
            const label= document.createElement('label');
            label.setAttribute('for', el.username);
            label.textContent= el.username;
            for(const user of tt.participants){
                if(user._id===el._id){
                    input.checked= true;
                }
            }
            const divInp= document.createElement('div');
            divInp.append(input, label);
            editForm.append(divInp);
        })
        
        document.querySelector('#edittitle').setAttribute('value', editedTT.data.title);
        document.querySelector('#editBtn').addEventListener('click', (event) => updateTT(tt));
        // document.querySelector('#editBtn').classList.add(tt._id);
        document.querySelector('#editBtn').textContent= "Update";
        
    } catch (error) {
        console.error(error);
    }
}
async function fetchAll() {
    document.querySelector('#list').innerHTML= '';
    const ul= document.createElement('ul');
    ul.classList.add('ulList');
    try {
        const allTT= await myAPI.get('/profil/timetables')
        allTT.data.forEach((tt) => {
            // console.log(tt.admin);
            createLi(tt, ul, false)});

        allTT.data.forEach((tt) => createLi(tt, ul, false));
        document.querySelector('#list').append(ul);
        fetchShare();
    } catch (error) {
        console.error(error);
    }
}

function createLi(tt, ul, shared){
    const li= document.createElement('li');
    const a= document.createElement('a');
    a.href = "/timetable/"+tt._id;
    a.textContent=  tt.title;
    li.append(a);
    if(!shared){
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        const whithUl= document.createElement('ul');
        const h6= document.createElement('h6');
        h6.textContent= "List of Participants";
        // console.log(tt);
        whithUl.append(h6);
        // tt.participants.forEach((part) => {
        //     const withLi= document.createElement('li');
        //     withLi.textContent= part.username;
        //     const deletePart= document.createElement('button');
            // deletePart.classList.add('deletePart');
            // deletePart.textContent= "Unshare";
            // deletePart.addEventListener('click', (event) => unshareTT(tt));
        //     whithUl.append(withLi);
        // })
        delBtn.addEventListener('click', (event) => deleteOne(tt));
        li.append(delBtn);

        tt.participants.forEach((part) => {
            const withLi= document.createElement('li');
            withLi.textContent= part.username;
            const deletePart= document.createElement('button');
            // deletePart.classList.add('deletePart');
            // deletePart.textContent= "Unshare";
            // deletePart.addEventListener('click', (event) => unshareTT(tt));
            whithUl.append(withLi);
        })
        delBtn.addEventListener('click', (event) => deleteOne(tt));
        li.append(delBtn, whithUl);
        }
        // else {
        //     delBtn.addEventListener('click', (event) => deleteSharedOne(tt));
        // }
        if(!shared){
            const ediBtn= document.createElement('button');
            ediBtn.textContent= "Edit";
            const divEdit= document.createElement('div');
            divEdit.classList.add('divEdit');
            divEdit.setAttribute('id', tt._id);
            divEdit.append(ediBtn);
            ediBtn.addEventListener('click', (event) => editTT(tt));
            
            
            li.append(divEdit);
        }
        ul.append(li)
}

async function deleteOne(tt) {
    await myAPI.delete(`/profil/${tt._id}`)
    await fetchAll();
}
// async unshareTT(tt){

// }
// async function deleteSharedOne(tt){
//     await myAPI.delete(`/profil/share/${tt._id}`);
//     await fetchShare();
// }
 async function updateTT(tt) {
    console.log('click')
    const title= document.querySelector('#edittitle').value;
    const partic= [];
    const edito= [];
    document.querySelectorAll('.updateShare').forEach((el) => {
        if(el.checked){
            if(el.value==='participant'){
                partic.push(el.name);
            }
            if(el.value==='editor'){
                edito.push(el.name);
            }
        }
    })
    const newTT= { title , partic, edito};
    document.querySelectorAll('.updateShare').forEach((el) => {
        if(el.checked){
            partic.push(el.name);
        }
    })
    const newTT= { title , partic};
    await myAPI.patch(`/profil/${tt._id}`, newTT);
    fetchAll();
 }
