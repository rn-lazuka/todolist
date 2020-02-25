import React, {ChangeEvent} from 'react';
import './App.css';

interface IProps {
    deleteTask:Function
    changeTitle:Function
    changeStatus:Function
    task:any
}

class TodoListTask extends React.Component<IProps> {
    state ={editMode:false,
        title:this.props.task.title,
        classForInput:""
    };
    activateEditMode =():void=>{
     this.setState({editMode:true,title:this.props.task.title})
    };
    deactivateEditMode =():void=>{
        if(this.state.title!=="") {
            this.props.changeTitle(this.props.task, this.state.title);
            this.setState({editMode: false});
        } else {
            this.setState({classForInput: "error"});
        }
    };

    onTitleChanged =(e:ChangeEvent<HTMLInputElement>):void=>{
        let newTitle =  e.currentTarget.value;
        this.setState({title:newTitle});
    };

    onIsDoneChanged = (e:ChangeEvent<HTMLInputElement>):void => {
        let status = e.currentTarget.checked ? 2 : 0;
        this.props.changeStatus(this.props.task,status )
    };
    deleteTask=():void=>{
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