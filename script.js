const state={
    tasklist:[],
};


const taskcontent=document.querySelector(".task_contents");
const taskmodal=document.querySelector(".view_task");
const editmodal=document.querySelector(".edit_card");
const deletemodal=document.querySelector(".delete_card");


const htmlTaskContent=({id,url,title,description,type,deadline}) =>`
<div class='col-md-6 col-lg-4 mt-3' id=${id}>
<div class='card shadow-sm task_card'>
 <div class='card-header d-flex justify-content-end task__card__header bg-warning'>
          <button type='button' class='btn btn-primary m-1' id=${id} name=${id} data-bs-target="#editModal" data-bs-toggle="modal" onclick="editor.apply(this,arguments)">
              <i class="fa-solid fa-pen-to-square" onclick="editor.apply(this,arguments)" id=${id} name=${id}></i>
          </button>
           <button type='button' class='btn btn-danger m-1' id=${id} name=${id} data-bs-target="#conformdelete" onclick="deleteTask.apply(this,arguments)" data-bs-toggle="modal">
              <i class='fas fa-trash-alt' name=${id} id=${id}></i>
          </button>
      </div>
<div class='card-body bg-dark'>
    ${         
    url
    ? `<img width='100%' src=${url} alt='Card Image' class='card-img-top md-3 rounded-lg' />`
    : `<img width='100%' src="https://tse1.mm.bing.net/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&pid=Api&rs=1&c=1&qlt=95&w=223&h=117" alt='Card Image' class='card-img-top md-3 rounded-lg' />`

    }
    <h4 class='card-title task_card_title text-warning m-1'>${title}</h4>
    <p class='text-warning m-1 '>Deadline: ${deadline}</p>
</div>
<div class='card-footer bg-warning'>
<button type='button' class='btn btn-primary' float-right data-bs-toggle="modal" data-bs-target="#showtask" onclick="openTask.apply(this,arguments)" id=${id}>Open Task</button>
</div>
</div>
</div>
`;


const htmlModalContent=({id,url,title,description,type,deadline}) => {
const date=new Date(parseInt(id));
return `
<div id=${id}>
${
   
    url
    ? `<img width='100%' src=${url} alt='Card Image' class='card-img-top md-3 rounded-lg' />`
    : `<img width='100%' src="https://tse1.mm.bing.net/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&pid=Api&rs=1&c=1&qlt=95&w=223&h=117" alt='Card Image' class='card-img-top md-3 rounded-lg' />`
}
<p class='text-muted text-sm'> Created on:${date.toDateString()} </p>
<h2 class='my-1'>${title}</h2>
<h4><span class='badge text-bg-success'>Goal: ${type}</span></h4>
<span>Description:</span>
<p class='text-secondary'>${description}</p>
<h5 class='text-black '>Deadline:${deadline}</h5>
</div>
`;
};


const editModalContent=({id})=>{
    return`
        <button type="button" class="btn btn-primary" id=${id} data-bs-dismiss="modal" onclick="saveedit.apply(this,arguments)" >Save changes</button>
`;
};


const deleteModalContent=({id})=>{
    return`
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger" id=${id} data-bs-dismiss="modal" onclick="deleter.apply(this,arguments)">Delete</button>
`;
};


const updatedLocalStorage = () => {
localStorage.setItem(
"task",
JSON.stringify({
 tasks: state.tasklist
})
);
};


const loadInitialStorage = () => {
    const localStorageCopy=JSON.parse(localStorage.task);
    if(localStorageCopy)state.tasklist=localStorageCopy.tasks;
    state.tasklist.map((date)=>{
        taskcontent.insertAdjacentHTML("beforeend",htmlTaskContent(date));
    });
};


const handlesubmit =(Event)=>{
const id=`${Date.now()}`;
const input={
    url:document.getElementById("imageurl").value,
    title:document.getElementById("tasktitle").value,
    type:document.getElementById("taskgoal").value,
    description:document.getElementById("taskdescription").value,
    deadline:document.getElementById("deadline").value
};
if (input.title === "" || input.type === "" || input.deadline === "") {
    return alert("Please fill the required fields");
  }
taskcontent.insertAdjacentHTML("beforeend",htmlTaskContent({...input,id}));
state.tasklist.push({...input,id});
updatedLocalStorage();
};


const openTask = (e) => {
    const getTask = state.tasklist.find(({id}) => id ===e.target.id);
    taskmodal.innerHTML = htmlModalContent(getTask);
  };


  const deleteTask = (e) => {
    const getTask = state.tasklist.find(({id}) => id ===e.target.id);
    console.log(getTask);
    
    deletemodal.innerHTML = deleteModalContent(getTask);
  }


const deleter= (e) => {
    const getTask = state.tasklist.find(({id}) => id ===e.target.id);
    console.log(getTask);
    deletemodal.innerHTML = deleteModalContent(getTask);
    const taskindex= state.tasklist.indexOf(getTask);
    state.tasklist.splice(taskindex,1);
    updatedLocalStorage();
    window.location.reload();
};


const editor=(e)=>{
let titletxt=document.getElementById("tasktitle_edit");
let typetxt=document.getElementById("taskgoal_edit");
let imgtxt=document.getElementById("imageurl_edit");
let deadlinetxt=document.getElementById("deadline_edit");
let destxt=document.getElementById("taskdescription_edit");
const getTask = state.tasklist.find(({id}) => id ===e.target.id);
editmodal.innerHTML = editModalContent(getTask);
titletxt.value=getTask.title;
typetxt.value=getTask.type;
imgtxt.value=getTask.url;
deadlinetxt.value=getTask.deadline;
destxt.value=getTask.description;
}


const saveedit=(e)=>{
const getTask = state.tasklist.find(({id}) => id ===e.target.id);
const taskindex= state.tasklist.indexOf(getTask);
    const editedinput={
        id:getTask.id,
        url:document.getElementById("imageurl_edit").value,
        title:document.getElementById("tasktitle_edit").value,
        type:document.getElementById("taskgoal_edit").value,
        description:document.getElementById("taskdescription_edit").value,
        deadline:document.getElementById("deadline_edit").value
    };
if (editedinput.title === "" || editedinput.type === "" || editedinput.deadline === "") {
    return alert("Please fill the required fields");
  }
    state.tasklist[taskindex]=editedinput;
    updatedLocalStorage();
    window.location.reload();
}


const searchTask=(e)=>{
while (taskcontent.firstChild) {
    taskcontent.removeChild(taskcontent.firstChild);
}
const resultCard=state.tasklist.filter(({title})=>
    title.toLowerCase().includes(e.target.value.toLowerCase())
);
console.log(resultCard);
resultCard.map(
    (cardData)=>
taskcontent.insertAdjacentHTML("beforeend",htmlTaskContent(cardData))
);
};
