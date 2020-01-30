import React from 'react';
import './App.css';

class TodoListTask extends React.Component {
    state ={editMode:false,
    };
    activateEditMode =()=>{
     this.setState({editMode:true})
    };
    deactivateEditMode =()=>{
     this.setState({editMode:false})
    };

    onTitleChanged =(e)=>{
       this.props.changeTitle(e.currentTarget.value,this.props.task.id)
    };

    onIsDoneChanged = (e) => {
        this.props.changeStatus(e.currentTarget.checked, this.props.task.id)
    };
    deleteTask=()=>{
        this.props.deleteTask(this.props.task.id)
    };
    render = () => {
        let classForTask = this.props.task.isDone?"todoList-task done":"todoList-task";
        return (
            <div className={classForTask}>
                <input type="checkbox" checked={this.props.task.isDone} onChange={this.onIsDoneChanged}/>
                {this.state.editMode
                ?<input onChange={this.onTitleChanged} onBlur={this.deactivateEditMode} autoFocus={true} value={this.props.task.title}/>
                :<span onClick={this.activateEditMode}>{this.props.task.id} -{this.props.task.title}</span>}
                <span>, priority: {this.props.task.priority}</span>
                <button onClick={this.deleteTask}>X</button>
            </div>

        );
    }

}

export default TodoListTask;