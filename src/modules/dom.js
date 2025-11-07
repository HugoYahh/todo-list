import ProjectManager from './projectManager.js';
import openAddTaskForm from './form.js';
import Storage from './storage.js';
import createToDo from './todo.js';

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

  const tasks = ProjectManager.getTodayTasks();

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
      description.title = task.description;

      left.appendChild(checkbox);
      left.appendChild(description);

      // 🔹 Priority color
      const priority = document.createElement('span');
      priority.classList.add('priority', 'task-component');
      priority.textContent = task.priority[0].toUpperCase() + task.priority.slice(1);

      if (task.priority === "low") {
        priority.classList.add('low');
      } else if (task.priority === "medium") {
        priority.classList.add('medium');
      } else if (task.priority === "high") {
        priority.classList.add('high');
      }

      top.appendChild(left);
      top.appendChild(priority);

      const bottom = document.createElement('div');
      bottom.classList.add('task-item-bottom');

      const date = document.createElement('span');
      date.classList.add('due-date', 'task-component');
      date.textContent = task.dueDate;

      // 🔹 Bottom right container
      const bottomRight = document.createElement('div');
      bottomRight.classList.add('bottom-right');

      // 🔹 Delete button
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('bottom-right-btn', 'delete-btn');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        const projects = ProjectManager.getAllProjects();
        for (const project of projects) {
          const index = project.tasks.indexOf(task);
          if (index !== -1) {
            project.removeTask(index);
            break;
          }
        }
        Storage.saveProjects();
        refreshToday();
      });

      // 🔹 Edit button (ouvre un modal pré-rempli)
      const editButton = document.createElement('button');
      editButton.classList.add('bottom-right-btn', 'edit-btn');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => openEditModal(task));

      bottomRight.appendChild(editButton);
      bottomRight.appendChild(deleteButton);

      bottom.appendChild(date);
      bottom.appendChild(bottomRight);

      taskItem.appendChild(top);
      taskItem.appendChild(bottom);
      taskContainer.appendChild(taskItem);
    });

    section.appendChild(taskContainer);
  }

  // 🔹 Add Task button
  const addBtn = document.createElement('button');
  addBtn.textContent = '+ Add Task';
  addBtn.classList.add('add-task-btn');
  addBtn.addEventListener('click', openAddTaskForm);
  section.appendChild(addBtn);

  return section;
}

// 🔁 Utilitaire pour rafraîchir la vue Today
function refreshToday() {
  const main = document.querySelector('.main-content');
  main.innerHTML = '';
  main.appendChild(renderToday());
}

// 🪄 Modal d’édition pré-rempli
function openEditModal(task) {
  // overlay
  let overlay = document.querySelector('.overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
  }
  overlay.classList.remove('hidden');
  overlay.innerHTML = '';

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const title = document.createElement('h2');
  title.textContent = 'Edit Task';
  modal.appendChild(title);

  const form = document.createElement('form');
  form.id = 'edit-task-form';

  // helper function
  function createLabel(text, inputElement) {
    const label = document.createElement('label');
    label.textContent = text;
    label.appendChild(inputElement);
    return label;
  }

  const nameInput = document.createElement('input');
  nameInput.value = task.name;
  nameInput.required = true;

  const descriptionInput = document.createElement('textarea');
  descriptionInput.rows = 2;
  descriptionInput.value = task.description;

  const dueDateInput = document.createElement('input');
  dueDateInput.type = 'date';
  dueDateInput.value = task.dueDate;

  const priorityInput = document.createElement('select');
  ['low', 'medium', 'high'].forEach(level => {
    const option = document.createElement('option');
    option.value = level;
    option.textContent = level[0].toUpperCase() + level.slice(1);
    if (level === task.priority) option.selected = true;
    priorityInput.appendChild(option);
  });

  form.append(
    createLabel('Name', nameInput),
    createLabel('Description', descriptionInput),
    createLabel('Due Date', dueDateInput),
    createLabel('Priority', priorityInput)
  );

  const actions = document.createElement('div');
  actions.classList.add('form-actions');

  const saveButton = document.createElement('button');
  saveButton.type = 'submit';
  saveButton.textContent = 'Save';

  const cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', () => overlay.classList.add('hidden'));

  actions.appendChild(saveButton);
  actions.appendChild(cancelButton);
  form.appendChild(actions);
  modal.appendChild(form);
  overlay.appendChild(modal);

  // ✅ Événement de sauvegarde
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    task.name = nameInput.value;
    task.description = descriptionInput.value;
    task.dueDate = dueDateInput.value;
    task.priority = priorityInput.value;

    Storage.saveProjects();
    overlay.classList.add('hidden');
    refreshToday();
  });
}
