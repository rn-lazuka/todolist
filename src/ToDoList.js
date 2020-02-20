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
} from "./reducer";


class ToDoList extends React.Component {
    nextTaskId = 0;
    state = {
        filterValue: "All",
        tasks: []
    };

    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        const todolistId = this.props.id;
        this.props.setTasks(todolistId);
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    addTask = (newText) => {
        const todolistId = this.props.id;
        this.props.addNewTask(newText, todolistId)
    };

    changeTask = (task, newTask) => {
        const todolistId = this.props.id;
        this.props.changeTask(task, newTask, todolistId);
    };

    changeStatus = (task, status) => {
        let newTask = {...task, status: status};
        this.changeTask(task, newTask);
    };

    changeTitle = (task, title) => {
        let newTask = {...task, title: title};
        this.changeTask(task, newTask)
    };

    changeToDoListTitle = (title) => {
        const todolistId = this.props.id;
        this.props.changeToDoListTitle(todolistId, title);
    };

    deleteToDoList = () => {
        const todolistId = this.props.id;
        this.props.deleteToDoList(todolistId);
    };

    deleteTask = (taskId) => {
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
                                   tasks={tasks.filter((t) => {
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

const mapStateToProps = (state) => {
    return {
        toDoList: state.todolists
    }
};

const ConnectedToDoList = connect(mapStateToProps, {changeTask,deleteTask,deleteToDoList,changeToDoListTitle,setTasks,addNewTask})(ToDoList);
export default ConnectedToDoList;
