import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";


class App extends React.Component {
    state = {
        filterValue: "All",
        tasks: [
            {title: 'JS', isDone: true, priority: 'low'},
            {title: 'HTML', isDone: true, priority: 'medium'},
            {title: 'CSS', isDone: true, priority: 'high'},
            {title: 'React', isDone: false, priority: 'low'}
        ]
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    };
    addTask = (newText) => {
        if (newText !== "") {

            let newTask = {
                title: newText,
                isDone: false,
                priority: 'low'
            };
            let newTasks = [...this.state.tasks, newTask];
            this.setState({tasks: newTasks});
        }
    };

    changeStatus = (status, task) => {
        let tasksCopy = this.state.tasks.map(t => {
            if (t === task) {
                return {...t, isDone: status}
            }
            return t
        });
        this.setState({tasks: tasksCopy});
    };
    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask}/>
                    <TodoListTasks changeStatus={this.changeStatus}
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


export default App;

