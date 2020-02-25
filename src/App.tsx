import React from 'react';
import './App.css';
import AddNewItemForm from "./components/ToDoList/AddNewItemForm";
import ConnectedToDoList from "./components/ToDoList/ToDoList";
import {connect} from "react-redux";
import {addToDoList, setTodoLists} from "./store/reducer";
import {ITodoList} from "./entities/entities";

interface IProps {
    setTodoLists: () => void
    addToDoList: (title: string) => void
    toDoLists: Array<ITodoList>
}


class App extends React.Component<IProps> {

    componentDidMount(): void {
        this.props.setTodoLists()
    }

    addToDoList = (title: string): void => {
        this.props.addToDoList(title)
    };

    render = () => {
        const todolists = this.props.toDoLists.map((t: ITodoList) => <ConnectedToDoList key={t.id} id={t.id} title={t.title}
                                                                                        tasks={t.tasks}/>);
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


const mapStateToProps = (state: any) => {
    return {
        toDoLists: state.todolists
    }
};

const ConnectedApp = connect(mapStateToProps, {setTodoLists, addToDoList})(App);
export default ConnectedApp;

