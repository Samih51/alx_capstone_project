import { validateForm, getValues, clear, setTaskField} from './utility.js'

const addBtn = document.getElementById("add-task");
const tasks = JSON.parse(localStorage.getItem('tasks'));
let currentPosition = -1;
const highPriorityBtn = document.getElementById("high-priority");
const normalPriorityBtn = document.getElementById("normal-priority");
const lowPriorityBtn = document.getElementById("low-priority");
const clearBtn = document.getElementById("clear");


renderTask(tasks);

addBtn.addEventListener('click', function(){
    const isValidated = validateForm();
    if(!isValidated)
        return
    const input = getValues()
    clear();


    if (addBtn.value === "Edit Task"){
        tasks[currentPosition] = input
        addBtn.value ="Add New Task";
    }
    else{

        tasks.push(input);
    }
    
    const stringify = JSON.stringify(tasks);
    localStorage.setItem('tasks',stringify);

    renderTask(tasks);
    
});

highPriorityBtn.addEventListener('click', function(){
    
    const taskList = document.querySelector(".task-group");
    const tasks = taskList.getElementsByClassName("tasks");

  for (let i = 0; i < tasks.length; i++) {

    
    const priorityElement = tasks[i].querySelector(".priority"); 
    const priority = priorityElement.textContent || priorityElement.innerText;
    
    if (priority === "High Priority") {
      tasks[i].style.display = "";
    } else {
      tasks[i].style.display = "none";
    }

  }
});
normalPriorityBtn.addEventListener('click', function(){
    const taskList = document.querySelector(".task-group");
    const tasks = taskList.getElementsByClassName("tasks");

  for (let i = 0; i < tasks.length; i++) {

    
    const priorityElement = tasks[i].querySelector(".priority"); 
    const priority = priorityElement.textContent || priorityElement.innerText;
    
    if (priority === "Normal Priority") {
      tasks[i].style.display = "";
    } else {
      tasks[i].style.display = "none";
    }

  }
});
lowPriorityBtn.addEventListener('click', function(){
    const taskList = document.querySelector(".task-group");
    const tasks = taskList.getElementsByClassName("tasks");

  for (let i = 0; i < tasks.length; i++) {

    
    const priorityElement = tasks[i].querySelector(".priority"); 
    const priority = priorityElement.textContent || priorityElement.innerText;
    
    if (priority === "Low Priority") {
      tasks[i].style.display = "";
    } else {
      tasks[i].style.display = "none";
    }

  }
});

clearBtn.addEventListener('click', function(){
    const taskList = document.querySelector(".task-group");
    const tasks = taskList.getElementsByClassName("tasks");

  for (let i = 0; i < tasks.length; i++){
    tasks[i].style.display = "";
  }
});

function createTask(task, position) {
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
     priorityPara.textContent = task.priorityValue;
     priorityPara.setAttribute("class", "priority");

     
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
        
        setTaskField(task);
        currentPosition = position;
     });
 
     const deleteBtn = document.createElement("button");
     deleteBtn.textContent = "Delete";
     deleteBtn.setAttribute("class", "btn-delete");
     
     deleteBtn.addEventListener('click', function(){
        
        tasks.splice(position, 1);
        const stringify = JSON.stringify(tasks);
        localStorage.setItem('tasks', stringify);
        renderTask(tasks)
     })
 
     const completedBtn = document.createElement("button");
     completedBtn.textContent = "Completed";
     completedBtn.setAttribute("class", "btn-comp");
 
     completedBtn.addEventListener('click', function(){
        task.statusValue = "Completed";
        tasksDiv.style.backgroundColor = "green";
        const stringify = JSON.stringify(tasks);
        localStorage.setItem('tasks', stringify);
      
     })
     if (task.statusValue=== "Completed") {
        tasksDiv.style.backgroundColor = "green";
    }
 
     btnGroupDiv.appendChild(editBtn);
     btnGroupDiv.appendChild(deleteBtn);
     btnGroupDiv.appendChild(completedBtn);
 
     taskBodyDiv.appendChild(title);
     taskBodyDiv.appendChild(imgGroupDiv);
     taskBodyDiv.appendChild(paraDiv)
     taskBodyDiv.appendChild(btnGroupDiv);
     
     tasksDiv.appendChild(taskBodyDiv);
 
     return tasksDiv;    
 }
 
 function renderTask(tasks) {
     const render = document.querySelector('.task-group');
     render.innerHTML = "";
     for(let itemPosition = 0; itemPosition < tasks.length; itemPosition++){
         const task = tasks[itemPosition]
         const item = createTask(task,itemPosition);
         render.appendChild(item,itemPosition);
     }
     
 }
 
 
function search() {

  const searchTerm = document.querySelector(".search").value.toUpperCase();
  
  const taskList = document.querySelector(".task-group");
  const tasks = taskList.getElementsByClassName("tasks");

  for (let i = 0; i < tasks.length; i++) {

    const title = tasks[i].querySelector("h4"); 
    const titleText = title.textContent || title.innerText;
    
    if (titleText.toUpperCase().indexOf(searchTerm) > -1) {
      tasks[i].style.display = "";
    } else {
      tasks[i].style.display = "none";
    }

  }

}
window.search = search;

function checkTime(){
    for(let i = 0; i < tasks.length; i++){
        const task = tasks[i]

        const deadline = new Date(task.dateValue + ' ' + task.timeValue);

        const now = new Date();
        const timeLeft = deadline.getTime() - now.getTime();

        // Check if 2 hours or less left
        if(timeLeft <= 2 * 60 * 60 * 1000) {
            alert(`Your task ${task.taskNameValue} is due in 2 hours!`);
         }
  
        }
}

setInterval(checkTime, 2 * 60 * 1000);