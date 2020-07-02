import React from 'react';
import './App.css';
import AddNewItemForm from "./components/ToDoList/AddNewItemForm";
import ConnectedToDoList from "./components/ToDoList/ToDoList";
import {connect} from "react-redux";
import {addToDoList, setTodoLists} from "./store/reducer";
import {ITodoList} from "./entities/entities";
import {AppStateType} from './store/store';
import  s from  './App.module.css'

interface IMSTP {
    toDoLists: Array<ITodoList>
}

interface IMDTP {
    setTodoLists: () => void
    addToDoList: (title: string) => void
}

class App extends React.Component<IMSTP & IMDTP> {

    componentDidMount(): void {
        this.props.setTodoLists()
    }

    addToDoList = (title: string): void => {
        this.props.addToDoList(title)
    };

    render = () => {
        const todolists = this.props.toDoLists.map((t: ITodoList) => <ConnectedToDoList key={t.id} id={t.id}
                                                                                        title={t.title}
                                                                                        tasks={t.tasks}/>);
        return (
            <>
                {/*<div className={s.container}>*/}
                {/*    <div className={s.box}></div>*/}
                {/*    <div className={s.box}>></div>*/}
                {/*    <div className={s.box}>></div>*/}
                {/*    <div className={s.box}>></div>*/}
                {/*    <div className={s.box}>></div>*/}
                {/*</div>*/}

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


const mapStateToProps = (state: AppStateType): IMSTP => {
    return {
        toDoLists: state.todolists.todolists
    }
};

const ConnectedApp = connect(mapStateToProps, {setTodoLists, addToDoList})(App);
export default ConnectedApp;

