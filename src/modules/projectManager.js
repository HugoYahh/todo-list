import { isToday, parseISO } from 'date-fns';
import createProject from './project.js';

const projects = []; // ✅ variable définie dans le scope du module

function addProject(name, description) {
  const newProject = createProject(name, description);
  projects.push(newProject);
  return newProject;
}

function removeProject(index) {
  projects.splice(index, 1);
}

function getAllProjects() {
  return projects;
}

function getTodayTasks() {
  const todayTasks = [];

  projects.forEach(project => {
    // ⬇️ Amélioration de la vérification ici ⬇️
    if (!project.tasks || !Array.isArray(project.tasks)) return; 
    
    project.tasks.forEach(task => {
      if (task.dueDate && isToday(parseISO(task.dueDate))) {
        todayTasks.push(task);
      }
    });
  });

  return todayTasks;
}

if (projects.length === 0) {
  addProject('Inbox', 'Toutes les tâches non classées.');
}

// 👇 export unique, clair et compatible avec ton import default
export default {
  addProject,
  removeProject,
  getAllProjects,
  getTodayTasks,
};
