import React, {ChangeEvent} from 'react';
import '../../../../App.css';
import {ITask} from '../../../../entities/entities';
import TextField from '@material-ui/core/TextField';
import {Delete} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

interface IProps {
    deleteTask:(id:string)=>void
    changeTitle:(task:ITask, title:string)=>void
    changeStatus:(task:ITask,status:number)=>void
    task:ITask
}
interface IState {
    editMode:boolean,
    title:string
    classForInput:string
}

class TodoListTask extends React.Component<IProps,IState> {
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
        this.props.changeStatus(this.props.task,status)
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
                ? <TextField variant="outlined"
                             value={this.state.title}
                             onChange={this.onTitleChanged}
                             onBlur={this.deactivateEditMode}
                             autoFocus={true}
                             className={this.state.classForInput}
                    />
                :<span onClick={this.activateEditMode}>{this.props.task.id} -{this.props.task.title}</span>}
                <IconButton onClick={this.deleteTask}><Delete/></IconButton>
            </div>

        );
    }

}

export default TodoListTask;