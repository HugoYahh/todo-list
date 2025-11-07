import '../style.css'
import loadView from './dom.js'
import createToDo from './todo.js'
import createProject from './project.js'
import ProjectManager from './projectManager.js'
import Storage from './storage.js';

Storage.initStorage();

ProjectManager.initDefaultProject();
loadView('today');