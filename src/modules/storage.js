import ProjectManager from './projectManager.js';
import createProject from './project.js';
import createToDo from './todo.js';

const STORAGE_KEY = 'odin_todo_projects';

function saveProjects() {
  const projects = ProjectManager.getAllProjects();

  const serializable = projects.map(project => ({
    projectName: project.projectName,
    projectDescription: project.projectDescription,
    tasks: project.tasks.map(task => ({
      name: task.name,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      completionStatus: task.completionStatus,
    })),
  }));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
}

function loadProjects() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return false;

  const parsed = JSON.parse(data);

  // ✅ 1. On vide le tableau de projets existant
  const projects = ProjectManager.getAllProjects();
  projects.length = 0;

  // ✅ 2. On restaure directement chaque projet complet
  parsed.forEach(p => {
    const project = createProject(p.projectName, p.projectDescription);
    p.tasks.forEach(t => {
      const todo = createToDo(
        t.name,
        t.description,
        t.dueDate,
        t.priority,
        t.completionStatus
      );
      project.addTask(todo);
    });
    projects.push(project); // on ajoute directement au tableau existant
  });

  return true;
}

function clearStorage() {
  localStorage.removeItem(STORAGE_KEY);
}

function initStorage() {
  const loaded = loadProjects();
  if (!loaded) {
    ProjectManager.initDefaultProject();
  }
}

export default {
  saveProjects,
  loadProjects,
  clearStorage,
  initStorage,
};
