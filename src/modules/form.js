import createToDo from './todo.js';
import ProjectManager from './projectManager.js';
import { renderToday } from './dom.js';
import Storage from './storage.js';
import renderSidebarProjects from './sidebar.js';

// ========== ADD TASK FORM ==========
function openAddTaskForm(projectIndex = 0) {
  ProjectManager.initDefaultProject?.(); // sécurité si la fonction existe

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
  nameInput.maxLength = 25;

  const descriptionInput = document.createElement('textarea');
  descriptionInput.rows = 2;
  descriptionInput.maxLength = 100;

  const dueDateInput = document.createElement('input');
  dueDateInput.type = 'date';
  dueDateInput.required = true;
  dueDateInput.valueAsDate = new Date();

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
    let targetProject = projects[projectIndex];

    // ✅ si le projet n'existe pas (par exemple depuis "Today"), on crée un projet par défaut
    if (!targetProject) {
      console.warn(`⚠️ Project at index ${projectIndex} not found. Using default project.`);
      if (projects.length === 0) {
        ProjectManager.addProject('Random Tasks', 'Tâches non classées');
        Storage.saveProjects();
      }
      targetProject = ProjectManager.getAllProjects()[0];
    }

    targetProject.addTask(newTodo);
    Storage.saveProjects();

    // 🔹 rafraîchissement UI
    renderSidebarProjects();
    overlay.remove();

    const main = document.querySelector('.main-content');
    main.innerHTML = '';
    main.appendChild(renderToday());
  });

  overlay.classList.remove('hidden');
}


// ========== ADD PROJECT FORM ==========
function openAddProjectForm() {
  let overlay = document.querySelector('.overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
  }

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const title = document.createElement('h2');
  title.textContent = 'Add New Project';
  modal.appendChild(title);

  const form = document.createElement('form');
  form.id = 'add-project-form';

  function createLabel(text, inputElement) {
    const label = document.createElement('label');
    label.textContent = text;
    label.appendChild(inputElement);
    return label;
  }

  const nameInput = document.createElement('input');
  nameInput.required = true;
  nameInput.maxLength = 25;

  const descriptionInput = document.createElement('textarea');
  descriptionInput.rows = 2;
  descriptionInput.maxLength = 100;

  form.append(
    createLabel('Name', nameInput),
    createLabel('Description', descriptionInput)
  );

  const actions = document.createElement('div');
  actions.classList.add('form-actions');

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Add Project';

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

    ProjectManager.addProject(nameInput.value, descriptionInput.value);
    Storage.saveProjects();

    overlay.remove();
    renderSidebarProjects();
  });

  overlay.classList.remove('hidden');
}

export default {
  openAddTaskForm,
  openAddProjectForm
};
