import './style.css';
import TasksList from './modules/taskslist.js';

const inTsk = {};
const objTasks = new TasksList();

if (localStorage.savedTasks) {
  objTasks.tasks = JSON.parse(localStorage.getItem('savedTasks'));
}

const btnClearTasks = document.createElement('button');
const root = document.querySelector('.root');
const ulElement = document.querySelector('.ul-element');
const inputElement = document.getElementById('input-element');
const btnAddTasks = document.querySelector('.btn-add-tasks');
btnClearTasks.innerHTML = 'Clear all completed';
btnClearTasks.classList.add('btn-clear-task');

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
  const result = objTasks.tasks.filter((task) => task.completed === false);
  objTasks.tasks = result;
  objTasks.populateFields();
  ulElement.innerHTML = '';
  root.append(objTasks.displayTasks(), btnClearTasks);
});

objTasks.displayTasks();
root.append(btnClearTasks);