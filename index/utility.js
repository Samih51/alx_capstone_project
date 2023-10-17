const taskName = document.getElementById("task_name");
const date = document.getElementById("date");
const time = document.getElementById("time");
const category = document.getElementById("category") ;
const priority = document.getElementById("priority");

//this finction validates the inputs of the form
function validateForm(){

    if (taskName.value =='' || date.value =='' || time.value == '')
    {
         taskName.style.border = "1px solid red ";
         date.style.border = "1px solid red ";
         time.style.border = "1px solid red ";
         return false;
    }
     taskName.style.border = "1px solid #ccc";
     date.style.border = "1px solid #ccc";
     time.style.border = "1px solid #ccc";
     return true;
 }
 
 //this function clears the input fields of the form 
 function clear(){
     taskName.value='';
     date.value='';
     time.value='';
 
 }
 
 //this gets the values of the form and returns it as an object
 function getValues(){
 const taskNameValue =taskName.value; 
 const dateValue = date.value;
 const timeValue = time.value;
 const categoryValue = category.value;
 const priorityValue = priority.value;
 return{
     taskNameValue, dateValue, timeValue, categoryValue, priorityValue, statusValue: "Not Completed"
 }
 
 }
 
function createTask(task) {
   // console.log(task);
    const tasksDiv = document.createElement("div");
    tasksDiv.setAttribute("class", "tasks");

    const imgGroupDiv = document.createElement("div");
    imgGroupDiv.setAttribute("class", "img-group");

    const image = document.createElement("img");
    image.setAttribute("src", "image/icons8-task-96.png")
    image.setAttribute("alt", "task icon");
    image.setAttribute("class", "task-icon");

    imgGroupDiv.appendChild(image);

    const taskBodyDiv = document.createElement("div");
    taskBodyDiv.setAttribute("class", "task-body");

    const title = document.createElement("h4");
    title.textContent = task.taskNameValue;

    const paraDiv = document.createElement("div");
    paraDiv.setAttribute("class", "para");

    const dateTimePara = document.createElement("p");
    dateTimePara.textContent = `${task.dateValue}: ${task.timeValue}`

    const priorityPara = document.createElement("p");
    priorityPara.textContent=task.priorityValue;
    
    const categoryPara = document.createElement("p");
    categoryPara.textContent = task.categoryValue; 

    const statusPara = document.createElement("p");
    statusPara.textContent = `Status: ${task.statusValue}`; 

    paraDiv.appendChild(dateTimePara);
    paraDiv.appendChild(priorityPara);
    paraDiv.appendChild(categoryPara);
    paraDiv.appendChild(statusPara);

    const btnGroupDiv = document.createElement("div");
    btnGroupDiv.setAttribute("class", "btn-group");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.setAttribute("class", "btn-edit");

    editBtn.addEventListener('click', function(){
       
        
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("class", "btn-delete");

    deleteBtn.addEventListener('click', function(){
       
        
    })

    const completedBtn = document.createElement("button");
    completedBtn.textContent = "Completed";
    completedBtn.setAttribute("class", "btn-comp");

    completedBtn.addEventListener('click', function(){
     
    })

    btnGroupDiv.appendChild(editBtn);
    btnGroupDiv.appendChild(deleteBtn);
    btnGroupDiv.appendChild(completedBtn);

    taskBodyDiv.appendChild(title);
    taskBodyDiv.appendChild(imgGroupDiv);
    taskBodyDiv.appendChild(paraDiv)
    taskBodyDiv.appendChild(btnGroupDiv);
    
    tasksDiv.appendChild(taskBodyDiv);
    
    console.log(tasksDiv);

    return tasksDiv;    
}

function renderTask(tasks) {
    const render = document.querySelector('.task-group');
    render.innerHTML = "";
    for(let itemPosition = 0; itemPosition < tasks.length; itemPosition++){
        const task = tasks[itemPosition]
        const item = createTask(task);
        render.appendChild(item);
    }
    
}
 export{
    validateForm, getValues, clear, createTask, renderTask};