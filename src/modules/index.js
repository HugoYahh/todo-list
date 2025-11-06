import '../style.css'
import loadView from './dom.js'
import createToDo from './todo.js'
import createProject from './project.js'
import ProjectManager from './projectManager.js'

const home = ProjectManager.addProject('Default Project', 'My tasks');
console.log(home.tasks);
loadView('today');