import './style.css';
import Tasks from './modules/tasks.js';

const inTsk = {};
const objTasks = new Tasks();

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
    objTasks.addTask(new Tasks(inTsk.description, inTsk.completed, inTsk.index));
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
      objTasks.addTask(new Tasks(inTsk.description, inTsk.completed, inTsk.index));
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