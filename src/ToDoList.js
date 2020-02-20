import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {addNewTaskAC, changeTaskAC, changeToDoListTitleAC, deleteTaskAC, deleteToDoListAC, setTaskAC} from "./reducer";
import axios from "axios";
import {api} from "./api";


class ToDoList extends React.Component {
    nextTaskId = 0;
    state = {
        filterValue: "All",
        tasks: []
    };

    componentDidMount() {
        this.restoreState()
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    restoreState = () => {
        const todolistId = this.props.id;
        api.getTasks(todolistId).then(res => {
            const tasks = res.data.items;
            this.props.setTasks(tasks, todolistId);
        });
    };

    addTask = (newText) => {
        const todolistId = this.props.id;
        api.addTask(todolistId,newText)
            .then(res => {
                const task = res.data.data.item;
                this.props.addNewTask(task, todolistId)

            });
    };


    changeTask = (task, newTask) => {
        const todolistId = this.props.id;
        api.changeTask(todolistId, task.id, newTask)
            .then(res => {
                if (res.data.resultCode === 0) {
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
    changeToDoListTitle = (title)=> {
        const todolistId = this.props.id;
        api.changeToDoListTitle(todolistId,title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    this.props.changeToDoListTitle(todolistId,title)
                }
            });
    };
    deleteToDoList = () => {
        const todolistId = this.props.id;
        api.deleteToDoList(todolistId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    this.props.deleteToDoList(todolistId)
                }
            });
    };
    deleteTask = (taskId) => {
        const todolistId = this.props.id;
        api.deleteTask(todolistId, taskId).then(res => {
            if (res.data.resultCode === 0) {
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
                        <TodoListTitle changeToDoListTitle={this.changeToDoListTitle} deleteToDoList={this.deleteToDoList} title={this.props.title}/>
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
        },
        changeToDoListTitle:(todolistId,title)=> {
            dispatch(changeToDoListTitleAC(todolistId, title))
        }
    }
};

const ConnectedToDoList = connect(mapStateToProps, mapDispatchToProps)(ToDoList);
export default ConnectedToDoList;
