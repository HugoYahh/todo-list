import createToDo from './todo.js';
import ProjectManager from './projectManager.js';
import { renderToday } from './dom.js';
import Storage from './storage.js';

export default function openAddTaskForm() {
  ProjectManager.initDefaultProject(); // sécurité

  let overlay = document.querySelector('.overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
  }

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const title = document.createElement('h2');
  title.textContent = 'Add New Task';
  modal.appendChild(title);

  const form = document.createElement('form');
  form.id = 'add-task-form';

  function createLabel(text, inputElement) {
    const label = document.createElement('label');
    label.textContent = text;
    label.appendChild(inputElement);
    return label;
  }

  const nameInput = document.createElement('input');
  nameInput.required = true;
  nameInput.maxLength=25;

  const descriptionInput = document.createElement('textarea');
  descriptionInput.rows = 2;
  descriptionInput.maxLength=100;

  const dueDateInput = document.createElement('input');
  dueDateInput.type = 'date';
  dueDateInput.required=true;

  const priorityInput = document.createElement('select');
  ['low', 'medium', 'high'].forEach(level => {
    const option = document.createElement('option');
    option.value = level;
    option.textContent = level[0].toUpperCase() + level.slice(1);
    if (level === 'medium') option.selected = true;
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

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Add Task';

  const cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.textContent = 'Cancel';

  actions.append(submitButton, cancelButton);
  form.appendChild(actions);
  modal.appendChild(form);
  overlay.innerHTML = '';
  overlay.appendChild(modal);

  cancelButton.addEventListener('click', () => overlay.remove());

  form.addEventListener('submit', e => {
    e.preventDefault();

    const newTodo = createToDo(
      nameInput.value,
      descriptionInput.value,
      dueDateInput.value,
      priorityInput.value,
      false
    );

    const projects = ProjectManager.getAllProjects();
    const targetProject = projects[0];
    targetProject.addTask(newTodo);
    Storage.saveProjects();

    // nettoyage
    overlay.remove();

    // rafraîchissement
    const main = document.querySelector('.main-content');
    main.innerHTML = '';
    main.appendChild(renderToday());
  });

  overlay.classList.remove('hidden');
}
