import '../style.css'
import loadView from './dom.js'
import createToDo from './todo.js'
import createProject from './project.js'
import ProjectManager from './projectManager.js'

const home = ProjectManager.addProject('Maison', 'Tâches ménagères');
const t1 = createToDo('Ménage', 'Cuisine', '2025-11-04', 'medium',false);
const t2 = createToDo('Courses', 'Acheter du lait', '2025-11-08', 'low',false);

home.addTask(t1);
home.addTask(t2);
console.log(ProjectManager.getAllProjects()); 
const todayTasks = ProjectManager.getTodayTasks();
console.log(todayTasks);