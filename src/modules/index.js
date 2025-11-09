import '../style.css'
import loadView from './dom.js'
import createToDo from './todo.js'
import createProject from './project.js'
import ProjectManager from './projectManager.js'
import Storage from './storage.js';
import renderSidebarProjects from './sidebar.js'
window.ProjectManager = ProjectManager;
Storage.initStorage();

ProjectManager.initDefaultProject();
loadView('today');
renderSidebarProjects();