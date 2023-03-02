import TasksList from './taskslist.js';

beforeAll(() => {
  document.body.innerHTML = `
    <div class="root">
      <div class="title">
        <span>Today's To Do</span>
        <i class="fa-solid fa-arrows-rotate"></i>
      </div>
      <div class="container-todo">
        <input type="text" id="input-element" name="input-element" placeholder="Add to your list..." required>
        <ul class='ul-element'></ul>
        <div class="btn-add-tasks">
            <i class="fa-solid fa-arrow-turn-down"></i>
        </div>
      </div>
      <button type="button" class="btn-clear-task">Clear all completed</button>
    </div>`;
});

const objTasks = new TasksList();

describe('Testing addTask and removeTask', () => {
  test('Using addTask to add new li element and increase the size of the task array', () => {
    objTasks.addTask({
      description: 'Adding a new task to test 1',
      completed: false,
      index: 0,
    });
    objTasks.addTask({
      description: 'Adding a new task to test 2',
      completed: false,
      index: 1,
    });
    objTasks.addTask({
      description: 'Adding a new task to test 3',
      completed: false,
      index: 2,
    });
    objTasks.addTask({
      description: 'Remove a new task to test',
      completed: false,
      index: 3,
    });
    const liElement = document.querySelectorAll('li');
    expect(liElement.length).toEqual(4);
  });

  test('Removing li element and decreasing size of the array', () => {
    objTasks.removeTask({
      description: 'Remove a new task to test',
      completed: false,
      index: 3,
    });
    const liElement = document.querySelectorAll('li');
    expect(liElement.length).toEqual(3);
  });
});

describe('Testing editTask, completedTask and clearcompletedTasks', () => {
  test('check if the label is changing', () => {
    const liElement = document.querySelectorAll('li');
    const label = liElement[0].querySelector('label');
    const icon = liElement[0].querySelector('.icon-menu-container');
    objTasks.editTask('editing the task', label, icon);
    expect(liElement[0].textContent).toEqual('editing the task');
  });
  test('check if the task is completed', () => {
    const liElement = document.querySelectorAll('li');
    const checkBox = liElement[0].querySelector('input');
    const label = liElement[0].querySelector('label');
    checkBox.checked = true;
    objTasks.completedTask(objTasks.tasks[0], checkBox, label);
    expect(objTasks.tasks[0].completed).toEqual(true);
  });
  test('clear completed task', () => {
    objTasks.tasks[2].completed = true;
    objTasks.tasks[1].completed = true;
    objTasks.clearcompletedTasks();
    expect(objTasks.tasks.length).toEqual(0);
  });
});
