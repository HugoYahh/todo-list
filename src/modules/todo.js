export default function createToDo(name,description,dueDate,priority,completionStatus){
    return{
        name,
        description,
        dueDate,
        priority,
        completionStatus,
        isCompleted(){
            return this.completionStatus;
        },
        toggleComplete(){
            this.completionStatus=!this.completionStatus;
        }
    };
}

