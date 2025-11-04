export default function createToDo(name,description,dueDate,priority,completionStatus){
    return{
        name,
        description,
        dueDate,
        priority,
        completionStatus,
        isCompleted(){
            return this.isCompleted;
        },
        toggleComplete(){
            this.isCompleted=!this.isCompleted;
        }
    };
}

