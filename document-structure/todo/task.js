const tasks = document.querySelector(".tasks");
const addButton = tasks.querySelector(".tasks__add");
const taskInput = tasks.querySelector(".tasks__input");
const taskList = tasks.querySelector(".tasks__list");

const storage = window.localStorage;
let tasksStates = loadStorage(storage);
let currentTaskId = Object.keys(tasksStates).length > 0 ? +Object.keys(tasksStates).sort((a,b) => b[0] - a[0])[0] + 1: 0; 

function saveStorage(storage, tasksStates) {
    storage["tasks"] = JSON.stringify(tasksStates);
}

function loadStorage(storage) {
    if(!storage["tasks"]) {
        return {};
    }

    const result = JSON.parse(storage["tasks"]);
    const states = Object.entries(result).sort((a,b) => a[0] - b[0]);

    for(const [id, text] of states) {
        addTask(taskList, result, text, id);
    }

    return result;
}

function createTask(taskText, taskId, tasksStates) {
    const task = document.createElement("div");
    task.classList.add("task");

    task.insertAdjacentHTML("afterBegin", `<div class="task__title">${taskText}</div><a href="#" class="task__remove">&times;</a>`)

    const removeBtn = task.querySelector(".task__remove");
    tasksStates[taskId] = taskText;

    removeBtn.addEventListener("click", event => {
        event.preventDefault();
        task.remove();

        delete tasksStates[taskId];
        saveStorage(storage, tasksStates);
    });

    return task;
}


function addTask(taskList, tasksStates, taskText, taskId) {
    if(tasksStates[taskId]) {
        taskList.insertAdjacentElement("beforeEnd", createTask(taskText, taskId, tasksStates));
        return;
    }
    
    taskList.insertAdjacentElement("beforeEnd", createTask(taskText, currentTaskId, tasksStates));
    tasksStates[currentTaskId] = taskText;
    currentTaskId++;
}


addButton.addEventListener("click", event => {
    event.preventDefault();

    const taskText = taskInput.value.trim();
    if(taskText === "") {
        return;
    }
 
    taskInput.value = "";

    addTask(taskList, tasksStates, taskText);    
    saveStorage(storage, tasksStates);
});