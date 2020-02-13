import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {addNewTaskAC, changeTaskAC, deleteTaskAC, deleteToDoListAC, setTaskAC} from "./reducer";
import axios from "axios";


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
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
            {withCredentials: true, "API-KEY": "6d54c1cb-0079-4662-b13d-27d4ae8cf67d"})
            .then(res => {
                const tasks = res.data.items;
                this.props.setTasks(tasks, todolistId);
            });
    };
    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    };
    addTask = (newText) => {
        const todolistId = this.props.id;
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {title: newText},
            {withCredentials: true, headers: {"API-KEY": "6d54c1cb-0079-4662-b13d-27d4ae8cf67d"}})
            .then(res => {
                const task = res.data.data.item;
                this.props.addNewTask(task, todolistId)

            });
    };


    changeTask = (task, newTask) => {
        const todolistId = this.props.id;
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${task.id}`,newTask,
            {withCredentials: true, headers: {"API-KEY": "6d54c1cb-0079-4662-b13d-27d4ae8cf67d"}})
            .then(res => {  if (res.data.resultCode === 0) {
                this.props.changeTask(newTask, todolistId)
            }
            });
    };

    changeStatus = (task, status) => {
        let newTask = {...task, status: status};
        this.changeTask(task, newTask);
    };

    changeTitle = (task, title) => {
        let newTask = {...task, title: title};
        this.changeTask(task, newTask)
    };
    deleteToDoList = () => {
        const todolistId = this.props.id;
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            {withCredentials: true, headers: {"API-KEY": "6d54c1cb-0079-4662-b13d-27d4ae8cf67d"}})
            .then(res => { if (res.data.resultCode === 0) {
                this.props.deleteToDoList(todolistId)
            }
            });
    };
    deleteTask = (taskId) => {
        const todolistId = this.props.id;
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
            {withCredentials: true, headers: {"API-KEY": "6d54c1cb-0079-4662-b13d-27d4ae8cf67d"}})
            .then(res => { if (res.data.resultCode === 0) {
                this.props.deleteTask(todolistId, taskId)
            }
            });

    };
    render = () => {
        let {tasks = []} = this.props;
        return (
            <div className="App">
                <div className="todoList">
                    <div className={'todoList-header'}>
                        <TodoListTitle deleteToDoList={this.deleteToDoList} title={this.props.title}/>
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
                                               return t.status===2;
                                           case "Active":
                                               return t.status===0;
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
const mapDispatchToProps = (dispatch) => {

    return {
        addNewTask: (newTask, todolistId) => {
            dispatch(addNewTaskAC(newTask, todolistId))
        },
        setTasks: (tasks, todolistId) => {
            dispatch(setTaskAC(tasks, todolistId))
        },
        changeTask: (newTask, todolistId) => {
            dispatch(changeTaskAC(newTask, todolistId))
        },
        deleteToDoList: (todolistId) => {
            dispatch(deleteToDoListAC(todolistId))
        },
        deleteTask: (todolistId, taskId) => {
            dispatch(deleteTaskAC(todolistId, taskId))
        }
    }
};

const ConnectedToDoList = connect(mapStateToProps, mapDispatchToProps)(ToDoList);
export default ConnectedToDoList;
