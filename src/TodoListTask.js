import React from 'react';
import './App.css';

class TodoListTask extends React.Component {
    onIsDoneChanged = (e) => {
        this.props.changeStatus(e.currentTarget.checked, this.props.task)
    };
    render = () => {
        return (
            <div className="todoList-task">
                <input type="checkbox" checked={this.props.task.isDone} onChange={this.onIsDoneChanged}/>
                <span>{this.props.task.title}</span>
                <span>, priority: {this.props.task.priority}</span>
            </div>
        );
    }

}

export default TodoListTask;