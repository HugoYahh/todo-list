import { isToday, parseISO } from 'date-fns';
import createProject from './project';

const projects=[];


function addProject(name, description){
    const newProject = createProject(name,description);
    projects.push(newProject);
    return newProject;
}

function removeProject(name){
    const index = projects.findIndex(p => p.name === name);
    if(index!==-1) projects.splice(index,1);
}

function getAllProjects(){
    return projects;
}

function getTodayTasks(){
    const todayTasks=[];
    projects.forEach(project=>{
        project.tasks.forEach(item=>{
            if(isToday(parseISO(item.dueDate))){
                todayTasks.push(item);
            }
        })
    })
    return todayTasks;
    
}

export default {getTodayTasks,addProject,removeProject,getAllProjects,};