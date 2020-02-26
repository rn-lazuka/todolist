import React from 'react';
import '../../App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./ToDoListTasks/TodoListTasks";
import TodoListFooter from "./ToDoListFooter/TodoListFooter";
import TodoListTitle from "./TodoListTitle/TodoListTitle";
import {connect} from "react-redux";
import {
    changeToDoListTitle,
    setTasks,
    addNewTask,
    deleteToDoList,
    changeTask,
    deleteTask
} from "../../store/reducer";
import {ITask, ITodoList} from "../../entities/entities";
import {AppStateType} from '../../store/store';

interface IProps {
    id: string
    title: string
    tasks: Array<ITask>

}

interface IMSTP {
    toDoLists: Array<ITodoList>
}

interface IMDTP {
    setTasks: (todolistId: string) => void
    addNewTask: (newText: string, todolistId: string) => void
    changeTask: (task: ITask, newTask: ITask, todolistId: string) => void
    changeToDoListTitle: (todolistId: string, title: string) => void
    deleteToDoList: (id: string) => void
    deleteTask: (todolistId: string, taskId: string) => void
}

interface IState {
    filterValue: string
    tasks: Array<ITask>|null
}

class ToDoList extends React.Component<IProps & IMSTP & IMDTP, IState> {

    state = {
        filterValue: "All",
        tasks: []
    };

    componentDidMount(): void {
        this.restoreState()
    }

    restoreState: any = (): void => {
        const todolistId = this.props.id;
        this.props.setTasks(todolistId);
    };

    changeFilter = (newFilterValue: string): void => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    addTask = (newText: string): void => {
        const todolistId = this.props.id;
        this.props.addNewTask(newText, todolistId)
    };

    changeTask = (task: ITask, newTask: ITask): void => {
        const todolistId = this.props.id;
        this.props.changeTask(task, newTask, todolistId);
    };

    changeStatus = (task: ITask, status: number): void => {
        let newTask: ITask = {...task, status: status};
        this.changeTask(task, newTask);
    };

    changeTitle = (task: ITask, title: string): void => {
        let newTask = {...task, title: title};
        this.changeTask(task, newTask)
    };

    changeToDoListTitle = (title: string): void => {
        const todolistId = this.props.id;
        this.props.changeToDoListTitle(todolistId, title);
    };

    deleteToDoList = (): void => {
        const todolistId = this.props.id;
        this.props.deleteToDoList(todolistId);
    };

    deleteTask = (taskId: string): void => {
        const todolistId = this.props.id;
        this.props.deleteTask(todolistId, taskId);
    };

    render = () => {
        let {tasks = []} = this.props;
        return (
            <div className="App">
                <div className="todoList">
                    <div>
                        <TodoListTitle changeToDoListTitle={this.changeToDoListTitle}
                                       deleteToDoList={this.deleteToDoList} title={this.props.title}/>
                        <AddNewItemForm addTask={this.addTask}/>

                    </div>
                    <TodoListTasks changeTitle={this.changeTitle}
                                   deleteTask={this.deleteTask}
                                   changeStatus={this.changeStatus}
                                   tasks={tasks.filter((t: ITask) => {
                                       switch (this.state.filterValue) {
                                           case "All":
                                               return true;
                                           case "Completed":
                                               return t.status === 2;
                                           case "Active":
                                               return t.status === 0;
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

const mapStateToProps = (state: AppStateType) => {
    return {
        toDoLists: state.todolists.todolists
    }
};

const ConnectedToDoList = connect(mapStateToProps, {
    changeTask,
    deleteTask,
    deleteToDoList,
    changeToDoListTitle,
    setTasks,
    addNewTask
})(ToDoList);
export default ConnectedToDoList;
