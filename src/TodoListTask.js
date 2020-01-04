import React from 'react';
import './App.css';

class TodoListTask extends React.Component {
    onIsDoneChanged = (e) => {
        this.props.changeStatus(e.currentTarget.checked, this.props.task)
    };
    render = () => {
        let classForTask = this.props.task.isDone?"todoList-task done":"todoList-task";
        return (
            <div className={classForTask}>
                <input type="checkbox" checked={this.props.task.isDone} onChange={this.onIsDoneChanged}/>
                <span>{this.props.task.title}</span>
                <span>, priority: {this.props.task.priority}</span>
            </div>
        );
    }

}

export default TodoListTask;