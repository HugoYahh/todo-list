import Form from './form.js';
import ProjectManager from './projectManager.js';

function renderSidebarProjects() {
  const projectsList = document.getElementById('projects-list');
  const addProjectButton = document.getElementById('add-project-btn');
  projectsList.innerHTML = '';

  const projects = ProjectManager.getAllProjects();

  projects.forEach((project, index) => {
    const projectItemGroup = document.createElement('li');
    projectItemGroup.classList.add('project-item-group');
    projectsList.appendChild(projectItemGroup);

    const projectHeader = document.createElement('div');
    projectHeader.classList.add('project-header');
    projectItemGroup.appendChild(projectHeader);

    const projectLogo = document.createElement('span');
    projectLogo.id = 'project-logo';
    projectHeader.appendChild(projectLogo);

    const projectName = document.createElement('span');
    projectName.textContent = project.projectName;
    projectName.classList.add('project-name');
    projectHeader.appendChild(projectName);

    // liste des tâches
    const projectTasksList = document.createElement('ul');
    projectTasksList.classList.add('project-tasks-list');
    projectItemGroup.appendChild(projectTasksList);

    project.tasks.forEach(task => {
      const taskItemGroup = document.createElement('li');
      taskItemGroup.classList.add('task-item-group');
      projectTasksList.appendChild(taskItemGroup);

      const taskLogo = document.createElement('span');
      taskLogo.id = "task-logo"
      taskItemGroup.appendChild(taskLogo)

      const taskName = document.createElement('span');
      taskName.classList.add('task-name');
      taskName.textContent = task.name;
      taskItemGroup.appendChild(taskName);
    });

    // bouton Add Task
    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = '+ Add Task';
    addTaskButton.classList.add('add-task-btn-small');
    addTaskButton.addEventListener('click', () => {
      Form.openAddTaskForm(index); // 👈 ici l’index est bien défini
    });
    projectItemGroup.appendChild(addTaskButton);
  });

  addProjectButton.onclick = Form.openAddProjectForm;
}

export default renderSidebarProjects;
