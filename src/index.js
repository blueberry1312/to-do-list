import './style.css';
import TasksList from './modules/taskslist.js';

const inTsk = {};
const objTasks = new TasksList();

if (localStorage.savedTasks) {
  objTasks.tasks = JSON.parse(localStorage.getItem('savedTasks'));
}

const btnClearTasks = document.querySelector('.btn-clear-task');
const root = document.querySelector('.root');
const ulElement = document.querySelector('.ul-element');
const inputElement = document.getElementById('input-element');
const btnAddTasks = document.querySelector('.btn-add-tasks');

btnAddTasks.addEventListener('click', () => {
  if (inputElement.value === '') {
    inputElement.value = '';
  } else {
    inTsk.description = inputElement.value;
    inTsk.completed = false;
    inTsk.index = objTasks.tasks.length;
    objTasks.addTask(new TasksList(inTsk.description, inTsk.completed, inTsk.index));
    objTasks.populateFields();
    inputElement.value = '';
  }
});

inputElement.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    if (inputElement.value === '') {
      inputElement.value = '';
    } else {
      inTsk.description = inputElement.value;
      inTsk.completed = false;
      inTsk.index = objTasks.tasks.length;
      objTasks.addTask(new TasksList(inTsk.description, inTsk.completed, inTsk.index));
      objTasks.populateFields();
      inputElement.value = '';
    }
  }
});

btnClearTasks.addEventListener('click', () => {
  objTasks.clearcompletedTasks(objTasks);
  ulElement.innerHTML = '';
  root.append(objTasks.displayTasks(), btnClearTasks);
});

objTasks.displayTasks();
root.append(btnClearTasks);