import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import ConnectedToDoList from "./ToDoList";
import {connect} from "react-redux";
import {addToDoListAC, setTodoListsAC} from "./reducer";
import axios from "axios";
import {api} from "./api";


class App extends React.Component {

   componentDidMount() {
       this.restoreState();
   }
    restoreState = () => {
            api.getToDoLists().then(res => {
                this.props.setTodoLists(res.data)
            });
    };


    addToDoList = (title) => {
            api.addToDoList(title).then(res => {
                this.props.addToDoList(res.data.data.item)
            });
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
const mapDispatchToProps = (dispatch) => {
    return {
        addToDoList: (newToDoList)=>{
            dispatch(addToDoListAC(newToDoList))
        },
        setTodoLists: (todolists)=>{
            dispatch(setTodoListsAC(todolists))
        }
    }
};
const ConnectedApp = connect(mapStateToProps,mapDispatchToProps)(App);
export default ConnectedApp;

