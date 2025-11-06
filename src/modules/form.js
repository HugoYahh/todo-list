import createToDo from './todo.js';
import ProjectManager from './projectManager.js';
import {renderToday} from './dom.js'

export default function openAddTaskForm(){
    
    const projects = ProjectManager.getAllProjects();
    let overlay = document.querySelector('.overlay')
    if(!overlay){
        overlay=document.createElement('div');
        overlay.classList.add('overlay','hidden');
        document.body.appendChild(overlay);
    }

    const modal = document.createElement('div')
    modal.classList.add('modal');
    

    const title = document.createElement('h2');
    title.textContent="Add New Task";
    modal.appendChild(title);

    const form = document.createElement('form');
    form.id='add-task-form';

    function createLabel(text,inputElement){
        const label = document.createElement('label')
        label.textContent=text;
        label.appendChild(inputElement)
        return label;
    }

    const nameInput = document.createElement('input');
    nameInput.id="task-name"
    nameInput.required=true;

    const descriptionInput=document.createElement('textarea');
    descriptionInput.id="task-desc"
    descriptionInput.rows=2;

    const dueDateInput=document.createElement('input')
    dueDateInput.type='date'
    dueDateInput.id='task-date'
    const priorityInput=document.createElement('select');
    priorityInput.id='task-priority'
    ['low','medium','high'].forEach(element => {
        const option = document.createElement('option')
        option.value = element;
        option.textContent=element[0].toUpperCase()+ element.slice(1);
        if(element==='medium') option.selected = true;
        priorityInput.appendChild(option);
    });
    
    form.appendChild(createLabel('Name', nameInput));
    form.appendChild(createLabel('Description', descriptionInput));
    form.appendChild(createLabel('Due Date', dueDateInput));
    form.appendChild(createLabel('Priority', priorityInput));
    
    const actions = document.createElement('div')
    actions.classList.add('form-actions')
    form.appendChild(actions);

    const submitButton = document.createElement('button');
    submitButton.type='submit';
    submitButton.textContent='Add Task'
    actions.appendChild(submitButton);

    const cancelButton = document.createElement('button');
    cancelButton.type='button';
    cancelButton.textContent='Cancel'
    cancelButton.id='cancel-task'
    actions.appendChild(cancelButton);

    modal.appendChild(form);
    overlay.innerHTML = '';
    overlay.appendChild(modal);
    
    overlay.classList.remove('hidden');
    cancelButton.addEventListener('click', () => overlay.classList.add('hidden'));
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value;
        const description = descriptionInput.value;
        const dueDate = dueDateInput.value;
        const emergencyStatus = priorityInput.value;

        const newTodo = createToDo(name, description, dueDate, emergencyStatus, false);
        ProjectManager.getAllProjects()[0].addTask(newTodo);

        overlay.classList.add('hidden');
        const main = document.querySelector('.main-content');
        main.innerHTML = '';
        main.appendChild(renderToday());
    });

}