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
</div>`;
});

const objTasks = new TasksList();

describe('Testing addTask and removeTask', () => {
  test('Using addTask to add new li element and increase the size of the task array', () => {
    objTasks.addTask({
      description: 'Adding a new task to test',
      completed: false,
      index: 0,
    });

    objTasks.addTask({
      description: 'Remove a new task to test',
      completed: false,
      index: 1,
    });
    const liElement = document.querySelectorAll('li');
    expect(liElement.length).toEqual(2);
  });

  test('Removing li element and decreasing size of the array', () => {
    objTasks.removeTask({
      description: 'Remove a new task to test',
      completed: false,
      index: 1,
    });
    const liElement = document.querySelectorAll('li');
    expect(liElement.length).toEqual(1);
  });
});
