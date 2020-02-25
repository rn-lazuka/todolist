import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";


interface IProps {
    changeTitle:Function
    deleteTask:Function
    changeStatus:Function
    tasks:Array<any>
}

class TodoListTasks extends React.Component<IProps> {
    render = () => {
        let tasksElements = this.props.tasks.map ((task:any) => <TodoListTask deleteTask={this.props.deleteTask}
                                                                        task={task}
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