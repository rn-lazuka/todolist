import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {
    changeToDoListTitle,
    setTasks,
    addNewTask,
    deleteToDoList,
    changeTask,
    deleteTask
} from "./store/reducer";

interface IProps {
    id:string
    title:string
    tasks:Array<any>
    setTasks:Function
    addNewTask:Function
    changeTask:Function
    changeToDoListTitle:Function
    deleteToDoList:(id:string)=>void
    deleteTask:Function
}
class ToDoList extends React.Component<IProps> {
    nextTaskId = 0;
    state = {
        filterValue: "All",
        tasks: []
    };

    componentDidMount() {
        this.restoreState()
    }

    restoreState:any = ():void  => {
        const todolistId = this.props.id;
        this.props.setTasks(todolistId);
    };

    changeFilter = (newFilterValue:string):void  => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    addTask = (newText:string):void  => {
        const todolistId = this.props.id;
        this.props.addNewTask(newText, todolistId)
    };

    changeTask = (task:any, newTask:any):void  => {
        const todolistId = this.props.id;
        this.props.changeTask(task, newTask, todolistId);
    };

    changeStatus = (task:any, status:number):void  => {
        let newTask:any = {...task, status: status};
        this.changeTask(task, newTask);
    };

    changeTitle = (task:any, title:string):void  => {
        let newTask = {...task, title: title};
        this.changeTask(task, newTask)
    };

    changeToDoListTitle = (title:string):void  => {
        const todolistId = this.props.id;
        this.props.changeToDoListTitle(todolistId, title);
    };

    deleteToDoList = ():void => {
        const todolistId = this.props.id;
        this.props.deleteToDoList(todolistId);
    };

    deleteTask = (taskId:string):void  => {
        const todolistId = this.props.id;
        this.props.deleteTask(todolistId, taskId);
    };

    render = () => {
        let {tasks = []} = this.props;
        return (
            <div className="App">
                <div className="todoList">
                    <div className={'todoList-header'}>
                        <TodoListTitle changeToDoListTitle={this.changeToDoListTitle}
                                       deleteToDoList={this.deleteToDoList} title={this.props.title}/>
                        <AddNewItemForm addTask={this.addTask}/>

                    </div>
                    <TodoListTasks changeTitle={this.changeTitle}
                                   deleteTask={this.deleteTask}
                                   changeStatus={this.changeStatus}
                                   tasks={tasks.filter((t:any) => {
                                       switch (this.state.filterValue) {
                                           case "All":
                                               return true;
                                           case "Completed":
                                               return t.status === 2;
                                           case "Active":
                                               return t.status === 0;
                                           default:
                                               return true;
                                       }
                                   })}/>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
                </div>
            </div>
        )
            ;
    }
}

const mapStateToProps = (state:any) => {
    return {
        toDoList: state.todolists
    }
};

const ConnectedToDoList = connect(mapStateToProps, {changeTask,deleteTask,deleteToDoList,changeToDoListTitle,setTasks,addNewTask})(ToDoList);
export default ConnectedToDoList;
