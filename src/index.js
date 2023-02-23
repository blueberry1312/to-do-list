import './style.css';

const arrayTasks = [
  {
    description: 'Complete To Do list project',
    completed: false,
    index: 0,
  },
  {
    description: 'Fix bike',
    completed: false,
    index: 1,
  },
  {
    description: 'Finish loft',
    completed: false,
    index: 2,
  },
];

function Task(task) {
  let isSelected = false;
  const li = document.createElement('li');
  const itemTaskElement = document.createElement('div');
  const checkBox = document.createElement('input');
  const checkBoxContainer = document.createElement('div');
  checkBoxContainer.classList.add('checkbox-container');
  const label = document.createElement('label');
  const iconMenu = document.createElement('div');
  iconMenu.classList.add('icon-menu-container');
  itemTaskElement.classList.add('item-element');
  iconMenu.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
  checkBox.type = 'checkbox';
  checkBox.id = `check${task.index}`;
  label.htmlFor = `check${task.index}`;
  label.innerText = task.description;

  label.addEventListener('click', () => {
    isSelected = !isSelected;
    if (isSelected === true) {
      label.style.textDecoration = 'line-through';
    } else {
      label.style.textDecoration = 'none';
    }
  });

  checkBox.addEventListener('click', () => {
    if (checkBox.checked) {
      label.style.textDecoration = 'line-through';
    } else {
      label.style.textDecoration = 'none';
    }
  });

  checkBoxContainer.append(checkBox, label);
  itemTaskElement.append(checkBoxContainer, iconMenu);
  li.appendChild(itemTaskElement);
  return li;
}

function component() {
  const containerElement = document.createElement('div');
  const btnAddTasks = document.createElement('div');
  btnAddTasks.classList.add('btn-add-tasks');
  btnAddTasks.innerHTML = '<i class="fa-solid fa-arrow-turn-down"></i>';
  const inputElement = document.createElement('input');
  inputElement.classList.add('container-add-btn');
  const ulElement = document.createElement('ul');
  const btnClearTasks = document.createElement('button');
  containerElement.classList.add('container-todo');
  inputElement.placeholder = 'Add to your list...';
  btnClearTasks.textContent = 'Clear all completed';
  btnClearTasks.classList.add('btn-clear-task');
  btnClearTasks.disabled = true;

  arrayTasks.map((task) => {
    ulElement.appendChild(Task(task));
    return 'done';
  });

  containerElement.append(inputElement, btnAddTasks, ulElement, btnClearTasks);

  return containerElement;
}

const root = document.querySelector('.root');

root.appendChild(component());