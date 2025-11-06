import createToDo from './todo.js';
export default function createProject(projectName,projectDescription){
    const tasks =[];
    function addTask(todo){
        tasks.push(todo);
    }

    function removeTask(index){
        tasks.splice(index,1);
    }
    return{
        projectName,
        projectDescription,
        tasks,
        addTask,
        removeTask,

    }
}