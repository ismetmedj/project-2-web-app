import myAPI from "./service.js";
const createBtn= document.createElement('button');
createBtn.classList.add('button-28');
createBtn.setAttribute('id', 'create');
createBtn.textContent= "Create a TimeTable"
document.querySelector('main').append(createBtn);
document.querySelector("#create").addEventListener("click", divCreat);
document.querySelector("#create").addEventListener("click", divCreat);
fetchAll();
function divCreat(event){
    document.querySelector('#create').remove();
    if(document.getElementById('editDiv')){
        document.getElementById("editDiv").remove();
    }
    document.querySelector("#divCreate").innerHTML = "";
    const clone = document.querySelector("#createTT").content.cloneNode(true);
    document.querySelector("#divCreate").append(clone);
    // document.querySelector('#create').setAttribute('form', 'createTimeTable');
}

async function fetchShare() {
    try {
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
        if(document.getElementById("createTimeTable")){
            document.getElementById("createTimeTable").remove();
            const createBtn= document.createElement('button');
            createBtn.classList.add('button-28');
            createBtn.setAttribute('id', 'create');
            createBtn.textContent= "Create a TimeTable"
            document.querySelector('main').append(createBtn);
            document.querySelector("#create").addEventListener("click", divCreat);
        }
        if(document.getElementById('editDiv')){
            document.getElementById("editDiv").remove();
        }
        const edTT= await myAPI.get(`/profil/${tt._id}`);
        const all=await myAPI.post('/users');
        // console.log(all);    
        const clone = document.querySelector("#editTT").content.cloneNode(true);
        // document.getElementById(tt._id).parentNode.innerHTML;
        document.getElementById(tt._id).parentNode.append(clone);
        const editForm= document.querySelector('#editForm');
        
        // console.log(tt.participants);
        // console.log(tt.editors);
        all.data.forEach((el) => {
            // console.log(el._id)
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
        // all.data.forEach((el) => {
        //     const input= document.createElement('input');
        //     input.setAttribute('type', 'checkbox');
        //     input.setAttribute('name', el.username);
        //     input.setAttribute('id', el.username);
        //     input.classList.add('updateShare');
        //     const label= document.createElement('label');
        //     label.setAttribute('for', el.username);
        //     label.textContent= el.username;
        //     for(const user of tt.participants){
        //         if(user._id===el._id){
        //             input.checked= true;
        //         }
        //     }
        //     const divInp= document.createElement('div');
        //     divInp.append(input, label);
        //     editForm.append(divInp);
        document.querySelector('#edittitle').setAttribute('value', tt.title);
        // console.log(el);
        })
        
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

        // allTT.data.forEach((tt) => createLi(tt, ul, false));
        document.querySelector('#list').append(ul);
        fetchShare();
    } catch (error) {
        console.error(error);
    }
}

function createLi(tt, ul, shared){
    const li= document.createElement('li');
    const button = document.createElement('button');
    button.classList.add('button-29');
    const a= document.createElement('a');
    a.href = "/timetable/"+tt._id;
    button.textContent=  tt.title;
    li.append(a);
    a.append(button)
    // if(!shared){
        // const whithUl= document.createElement('ul');
        // const h6= document.createElement('h6');
        // h6.textContent= "List of Participants";
        // console.log(tt);
        // whithUl.append(h6);
        // tt.participants.forEach((part) => {
            //     const withLi= document.createElement('li');
            //     withLi.textContent= part.username;
            //     const deletePart= document.createElement('button');
            // deletePart.classList.add('deletePart');
            // deletePart.textContent= "Unshare";
            // deletePart.addEventListener('click', (event) => unshareTT(tt));
            //     whithUl.append(withLi);
            // })
            
            // tt.participants.forEach((part) => {
                //     const withLi= document.createElement('li');
                //     withLi.textContent= part.username;
                //     const deletePart= document.createElement('button');
            // deletePart.classList.add('deletePart');
            // deletePart.textContent= "Unshare";
            // deletePart.addEventListener('click', (event) => unshareTT(tt));
        //     whithUl.append(withLi);
        // })
        // delBtn.addEventListener('click', (event) => deleteOne(tt));
        // li.append(delBtn);
        // }
        // else {
        //     delBtn.addEventListener('click', (event) => deleteSharedOne(tt));
        // }
        if(!shared){
            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.addEventListener('click', (event) => deleteOne(tt));
            const ediBtn= document.createElement('button');
            ediBtn.textContent= "Edit";
            const divEdit= document.createElement('div');
            divEdit.classList.add('divEdit');
            divEdit.setAttribute('id', tt._id);
            divEdit.append(ediBtn);
            ediBtn.addEventListener('click', (event) => editTT(tt));
        
            divEdit.append(delBtn);
            li.append(divEdit);
        }
        ul.append(li)
}

async function deleteOne(tt) {
    await myAPI.delete(`/profil/${tt._id}`)
    fetchAll();
}
// async unshareTT(tt){

// }
// async function deleteSharedOne(tt){
//     await myAPI.delete(`/profil/share/${tt._id}`);
//     await fetchShare();
// }
 async function updateTT(tt) {
    // console.log('click')
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
    // document.querySelectorAll('.updateShare').forEach((el) => {
    //     if(el.checked){
    //         partic.push(el.name);
    //     }
    // })
    // const newTT= { title , partic};
    await myAPI.patch(`/profil/${tt._id}`, newTT);
    fetchAll();
 }
