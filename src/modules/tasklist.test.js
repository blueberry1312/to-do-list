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

describe('Testing addTask', () => {
  test('Using addTask to add new li element and increase the size of the task array', () => {
    const objTasks = new TasksList();
    objTasks.addTask({
      description: 'Adding a new task to test',
      completed: false,
      index: 0,
    });
    const liElement = document.querySelectorAll('li');
    expect(liElement.length).toEqual(1);
  });
});