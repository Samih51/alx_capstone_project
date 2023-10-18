const taskName = document.getElementById("task_name");
const date = document.getElementById("date");
const time = document.getElementById("time");
const category = document.getElementById("category") ;
const priority = document.getElementById("priority");
const addBtn = document.querySelector("#add-task")
const search = document.querySelector(".search");

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
     taskName.value = '';
     date.value = '';
     time.value = '';
     search.value = '';
 
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

 function setTaskField(task) {
    taskName.value = task.taskNameValue;
    date.value = task.dateValue;
    time.value = task.timeValue;

    for (let i = 0; i < category.options.length; i++) {
        if (category.options[i].value === task.categoryValue) {
            category.selectedIndex = i;
            break;
        }
    }

    for (let i = 0; i < priority.options.length; i++) {
        if (priority.options[i].value === task.priorityValue) {
            priority.selectedIndex = i;
            break;
        }
    }

    addBtn.value = "Edit Task";
 }
 

 export{
    validateForm, getValues, clear, setTaskField};