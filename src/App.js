import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";


class App extends React.Component {
    filterValue = "All";

    tasks = [
        {title: 'JS', isDone: true, priority: 'low'},
        {title: 'HTML', isDone: true, priority: 'medium'},
        {title: 'CSS', isDone: true, priority: 'high'},
        {title: 'React', isDone: false, priority: 'low'}
    ];

    render = () => {


        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader/>
                    <TodoListTasks tasks={this.tasks}/>
                    <TodoListFooter filterValue={this.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

