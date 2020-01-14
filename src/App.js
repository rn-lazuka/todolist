import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import ToDoList from "./ToDoList";


class App extends React.Component {
    state = {
        toDoList: [{id: 0, title: "Redux"},
            {id: 1, title: "React"}]
    }
    toDoListId = 1;
    addToDoList = (title) => {
        let newToDoList = [...this.state.toDoList, {id: this.toDoListId, title: title}];
        this.setState({toDoList: newToDoList})
    };

    render = () => {
        const todolists = this.state.toDoList.map(t => <ToDoList id={t.id} title={t.title}/>)
        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addToDoList}/>
                </div>
                <div className="App">
                    {todolists}
                </div>
            </>
        );
    }
}


export default App;

