import { validateForm, getValues, clear, createTask, renderTask} from './utility.js'

const addBtn = document.getElementById("add-task");
const tasks=[];

addBtn.addEventListener('click', function(){
    const isValidated = validateForm();
    if(!isValidated)
        return
    const input = getValues()
    clear();
    tasks.push(input);
    
    console.log(tasks);
    renderTask(tasks);
    


})



