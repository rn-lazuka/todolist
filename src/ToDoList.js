import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {addNewTaskAC, changeTaskAC, deleteTaskAC, deleteToDoListAC} from "./reducer";


class ToDoList extends React.Component {
    nextTaskId = 0;
    state = {
        filterValue: "All",
        tasks: []
    };


    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    };
    addItem = (newText) => {
        if (newText !== "") {
            let newTask = {
                id: this.nextTaskId,
                title: newText,
                isDone: false,
                priority: 'low'
            };
            this.nextTaskId++;
            this.props.addNewTask(newTask, this.props.id);
        }
    };


    changeTask = (taskId, obj) => {
        let newTasks = this.props.tasks.map(t => {
            if (t.id !== taskId) {
                return t
            } else {
                return {...t, ...obj}
            }
        });
        this.props.changeTask(newTasks, this.props.id)
    };

    changeStatus = (isDone, taskId) => {
        this.changeTask(taskId, {isDone: isDone})
    };

    changeTitle = (title, taskId) => {
        this.changeTask(taskId, {title: title})
    };
    deleteToDoList = () => {
        this.props.deleteToDoList(this.props.id)
    };
    deleteTask = (taskId) => {
        this.props.deleteTask(this.props.id, taskId)
    };
    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <div className={'todoList-header'}>
                        <TodoListTitle deleteToDoList={this.deleteToDoList} title={this.props.title}/>
                        <AddNewItemForm addItem={this.addItem}/>

                    </div>
                    <TodoListTasks changeTitle={this.changeTitle}
                                   deleteTask={this.deleteTask}
                                   changeStatus={this.changeStatus}
                                   tasks={this.props.tasks.filter((t) => {
                                       switch (this.state.filterValue) {
                                           case "All":
                                               return true;
                                           case "Completed":
                                               return t.isDone;
                                           case "Active":
                                               return !t.isDone;
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
        changeTask: (newTasks, todolistId) => {
            dispatch(changeTaskAC(newTasks, todolistId))
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
