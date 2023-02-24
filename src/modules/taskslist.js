import Sortable from './Sortable/Sortable.js';
import Task from './tasks.js';

const containerElement = document.querySelector('.container-todo');
const ulElement = document.querySelector('.ul-element');

class TasksList {
  constructor() {
    this.tasks = [];
  }

  populateFields = () => {
    localStorage.setItem('savedTasks', JSON.stringify(this.tasks));
  };

  removeTask(task) {
    const result = this.tasks.filter((b) => b !== task);
    this.tasks = result;
    this.populateFields();
  }

  addTask = (task) => {
    const inputElement = document.getElementById('input-element');
    const newTask = new Task(inputElement.value, task.completed, task.index);
    this.tasks.push(newTask);
    this.populateFields();
    this.displayTasks();
  };

  swapArrayElements = (array, indexA, indexB) => {
    const temp = array[indexA];
    array[indexA] = array[indexB];
    array[indexB] = temp;
  }

  orderList = (oldIndex, newIndex) => {
    this.swapArrayElements(this.tasks, oldIndex, newIndex);
  }

  displayTasks = () => {
    ulElement.innerHTML = '';
    let i = -1;
    this.tasks.forEach((task) => {
      i += 1;
      task.index = i;
    });
    this.tasks.map((task) => {
      const li = document.createElement('li');
      const itemTaskElement = document.createElement('div');
      const checkBox = document.createElement('input');
      const checkBoxContainer = document.createElement('div');
      checkBoxContainer.classList.add('checkbox-container');
      const label = document.createElement('label');
      const textInput = document.createElement('input');
      const icon = document.createElement('div');
      textInput.classList.add('text-input', 'hidden');
      icon.classList.add('icon-menu-container');
      itemTaskElement.classList.add('item-element');
      icon.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
      const iconMenu = '<i class="fa-solid fa-ellipsis-vertical"></i>';
      const iconDelete = '<i class="fa-solid fa-trash-can"></i>';
      checkBox.type = 'checkbox';
      checkBox.id = `check${task.index}`;
      textInput.value = task.description;
      label.innerHTML = task.description;
      checkBox.checked = task.completed;

      Sortable.create(ulElement, {
        onEnd: (evt) => {
          this.orderList(evt.oldIndex, evt.newIndex);
          this.populateFields();
        },
      });

      if (checkBox.checked) {
        label.style.textDecoration = 'line-through';
      }

      if (icon.innerHTML !== iconDelete) {
        icon.addEventListener('click', () => {
          if (icon.innerHTML === iconDelete) {
            this.removeTask(task);
            ulElement.removeChild(li);
          }
          label.classList.add('hidden');
          textInput.classList.remove('hidden');
          li.classList.add('editing');
          icon.innerHTML = iconDelete;
          icon.style.cursor = 'pointer';
          textInput.focus();
        });
      }

      textInput.addEventListener('focus', () => {
        this.populateFields();
        icon.innerHTML = iconDelete;
        icon.style.cursor = 'pointer';
      });

      textInput.addEventListener('change', (e) => {
        task.description = e.target.value;
        label.innerHTML = task.description;
        this.populateFields();
        icon.innerHTML = iconDelete;
        icon.style.cursor = 'pointer';
      });

      textInput.addEventListener('blur', () => {
        label.classList.remove('hidden');
        textInput.classList.add('hidden');
        li.classList.remove('editing');
        setTimeout(() => {
          icon.innerHTML = iconMenu;
          icon.style.cursor = 'menu';
        }, 150);
      });

      checkBox.addEventListener('click', () => {
        if (checkBox.checked) {
          label.style.textDecoration = 'line-through';
          task.completed = checkBox.checked;
          this.populateFields();
        } else {
          label.style.textDecoration = 'none';
          task.completed = checkBox.checked;
          this.populateFields();
        }
      });

      li.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          checkBox.focus();
          textInput.classList.add('hidden');
          label.classList.remove('hidden');
          li.classList.remove('editing');
        }
      });

      checkBoxContainer.append(checkBox, label, textInput);
      itemTaskElement.append(checkBoxContainer, icon);

      li.appendChild(itemTaskElement);
      ulElement.appendChild(li);
      return ulElement;
    });
    containerElement.appendChild(ulElement);
    return containerElement;
  };
}

export default TasksList;