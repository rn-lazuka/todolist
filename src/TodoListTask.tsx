import React from 'react';
import './App.css';

class TodoListTask extends React.Component {
    state ={editMode:false,
        title:this.props.task.title,
        classForInput:""
    };
    activateEditMode =()=>{
     this.setState({editMode:true})
    };
    deactivateEditMode =()=>{
        if(this.state.title!=="") {
            this.props.changeTitle(this.props.task, this.state.title);
            this.setState({editMode: false});
        } else {
            this.setState({classForInput: "error"});
        }
    };

    onTitleChanged =(e)=>{
        let newTitle =  e.currentTarget.value;
        this.setState({title:newTitle});
    };

    onIsDoneChanged = (e) => {
        let status = e.currentTarget.checked ? 2 : 0;
        this.props.changeStatus(this.props.task,status )
    };
    deleteTask=()=>{
        this.props.deleteTask(this.props.task.id)
    };
    render = () => {
        let classForTask = this.props.task.status===2?"todoList-task done":"todoList-task";
        return (
            <div className={classForTask}>
                <input type="checkbox" checked={this.props.task.status===2} onChange={this.onIsDoneChanged}/>
                {this.state.editMode
                ?<input className={this.state.classForInput} onChange={this.onTitleChanged} onBlur={this.deactivateEditMode} autoFocus={true} value={this.state.title}/>
                :<span onClick={this.activateEditMode}>{this.props.task.id} -{this.props.task.title}</span>}
                <span>, priority: {this.props.task.priority}</span>
                <button onClick={this.deleteTask}>X</button>
            </div>

        );
    }

}

export default TodoListTask;