import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import ConnectedToDoList from "./ToDoList";
import {connect} from "react-redux";
import {addToDoList, setTodoLists} from "./reducer";


class App extends React.Component {

   componentDidMount() {
       this.props.setTodoLists()
   }

    addToDoList = (title) => {
        this.props.addToDoList(title)
    };

    render = () => {
        const todolists = this.props.toDoList.map(t => <ConnectedToDoList id={t.id} title={t.title} tasks={t.tasks}/>);
        return (
            <>
                <div>
                    <AddNewItemForm addTask={this.addToDoList}/>
                </div>
                <div className="App">
                    {todolists}
                </div>
            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        toDoList: state.todolists
    }
};

const ConnectedApp = connect(mapStateToProps,{setTodoLists,addToDoList})(App);
export default ConnectedApp;

