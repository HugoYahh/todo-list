import ProjectManager from './projectManager.js';
import openAddTaskForm from './form.js';

export default function loadView(viewName) {
  const main = document.querySelector(".main-content");
  main.innerHTML = "";

  if (viewName === 'inbox') {
    main.appendChild(renderInbox());
  } else if (viewName === 'today') {
    main.appendChild(renderToday());
  } else if (viewName === 'upcoming') {
    main.appendChild(renderUpcoming());
  } else if (viewName === 'anytime') {
    main.appendChild(renderAnytime());
  } else if (viewName === 'someday') {
    main.appendChild(renderSomeday());
  } else {
    main.textContent = "View not implemented yet";
  }
}


export function renderToday() {
  const section = document.createElement('section');
  section.id = 'today-section';

  const title = document.createElement('h1');
  title.textContent = "Today's Tasks";
  section.appendChild(title);

  const tasks = ProjectManager.getTodayTasks(); // ton array des tasks du jour

  if (tasks.length === 0) {
    const noTasksMsg = document.createElement('p');
    noTasksMsg.textContent = 'No tasks for today. Enjoy your free time!';
    noTasksMsg.classList.add('no-tasks');
    section.appendChild(noTasksMsg);
  } else {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('tasks-group');

    tasks.forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.classList.add('task-item');

      const top = document.createElement('div');
      top.classList.add('task-item-top');

      const left = document.createElement('div');
      left.classList.add('task-item-top-left');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completionStatus;
      checkbox.classList.add('task-done');

      const description = document.createElement('span');
      description.classList.add('description', 'task-component');
      description.textContent = task.description;

      left.appendChild(checkbox);
      left.appendChild(description);

      const priority = document.createElement('span');
      priority.classList.add('priority', 'task-component', task.emergencyStatus);
      priority.textContent = task.emergencyStatus;

      top.appendChild(left);
      top.appendChild(priority);

      const bottom = document.createElement('div');
      bottom.classList.add('task-item-bottom');

      const date = document.createElement('span');
      date.classList.add('due-date', 'task-component');
      date.textContent = task.dueDate;

      bottom.appendChild(date);

      taskItem.appendChild(top);
      taskItem.appendChild(bottom);
      taskContainer.appendChild(taskItem);
    });

    section.appendChild(taskContainer);
  }

  // 🔸 Étape 4 : bouton Add Task (toujours présent)
  const addBtn = document.createElement('button');
  addBtn.textContent = '+ Add Task';
  addBtn.classList.add('add-task-btn');
  addBtn.addEventListener('click', openAddTaskForm);
  section.appendChild(addBtn);

  return section;
}
