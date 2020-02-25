import React from 'react';
import '../../../App.css';
import TodoListTask from "./ToDoListTask/TodoListTask";
import {ITask} from "../../../entities/entities";

interface IProps {
    changeTitle:(task:ITask, title:string)=>void
    deleteTask:(taskId:string)=>void
    changeStatus: (task:ITask, status:number)=>void
    tasks: Array<ITask>
}

class TodoListTasks extends React.Component<IProps> {
    render = () => {
        let tasksElements = this.props.tasks.map((task: ITask) =>
            <TodoListTask deleteTask={this.props.deleteTask}
                          task={task}
                          key={task.id}
                          changeTitle={this.props.changeTitle}
                          changeStatus={this.props.changeStatus}/>);
        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;