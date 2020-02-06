import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import ConnectedToDoList from "./ToDoList";
import {connect} from "react-redux";
import {addToDoListAC} from "./reducer";


class App extends React.Component {

    toDoListId = 0;

    addToDoList = (title) => {
        let newToDoList = {id: this.toDoListId, title: title,tasks:[]};
        this.props.addToDoList(newToDoList);
        this.toDoListId++;
    };

    render = () => {
        const todolists = this.props.toDoList.map(t => <ConnectedToDoList id={t.id} title={t.title} tasks={t.tasks}/>);
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


const mapStateToProps = (state) => {
    return {
        toDoList: state.todolists
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addToDoList: (newToDoList)=>{
            dispatch(addToDoListAC(newToDoList))
        }
    }
};
const ConnectedApp = connect(mapStateToProps,mapDispatchToProps)(App);
export default ConnectedApp;

