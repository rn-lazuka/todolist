import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import ConnectedToDoList from "./ToDoList";
import {connect} from "react-redux";
import {addToDoListAC, setTodoListsAC} from "./reducer";
import axios from "axios";


class App extends React.Component {

   componentDidMount() {
       this.restoreState();
   }
    restoreState = () => {
        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists",
            {withCredentials: true, "API-KEY":"6d54c1cb-0079-4662-b13d-27d4ae8cf67d"})
            .then(res => {
                this.props.setTodoLists(res.data)
            });
    };


    addToDoList = (title) => {
        axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title:title},
            {withCredentials: true,  headers:{"API-KEY": "6d54c1cb-0079-4662-b13d-27d4ae8cf67d"}})
            .then(res => {
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

