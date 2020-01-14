import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";


class ToDoList extends React.Component {
    nextTaskId = 0;
    state = {
        filterValue: "All",
        tasks: []
    };


    componentDidMount() {
        this.restoreState();

    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("our-state" + this.props.id, stateAsString);

    };

    restoreState = () => {
        let state = {
            filterValue: "All",
            tasks: []
        };
        let stateAsString = localStorage.getItem("our-state" + this.props.id);
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            // this.nextTaskId = this.state.tasks.reduce((task, curr) => task.id > curr.id ? task.id : curr.id, 0) + 1;
            this.state.tasks.filter(task => {
                if (task.id >= this.nextTaskId) {
                    this.nextTaskId = task.id + 1
                }
            })
        });

    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => {
            this.saveState()
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
            let newTasks = [...this.state.tasks, newTask];
            this.setState({tasks: newTasks}, () => {
                this.saveState();
            });
        }
    };


    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id != taskId) {
                return t
            } else {
                return {...t, ...obj}
            }
        });
        this.setState({tasks: newTasks});
    };

    changeStatus = (isDone, taskId) => {
        this.changeTask(taskId, {isDone: isDone})
    };

    changeTitle = (title, taskId) => {
        this.changeTask(taskId, {title: title})
    };

    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <div className={'todoList-header'}>
                        <TodoListTitle title={this.props.title}/>
                        <AddNewItemForm addItem={this.addItem}/>

                    </div>
                    <TodoListTasks changeTitle={this.changeTitle}
                                   changeStatus={this.changeStatus}
                                   tasks={this.state.tasks.filter((t) => {
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


export default ToDoList;

