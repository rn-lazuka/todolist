import React from 'react';
import './App.css';

class TodoListHeader extends React.Component {
    state = {error: false,
    title:''};

    onChangingValue = (e) => {
        this.setState({error: false,title:e.currentTarget.value})
    };
    onAddTaskClick = () => {
        let newText = this.state.title;
        this.setState({title:''});
        if (newText === "") {
            this.setState({error: true})
        } else {
            this.setState({error: false})

        }
        this.props.addTask(newText);
    };
    onEnterPress = (e) => {
        if (e.key === 'Enter') {
            this.onAddTaskClick();
        }
    };
    render = () => {
        let classForInput = this.state.error ? "error" : "";
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input onKeyPress={this.onEnterPress} onChange={this.onChangingValue} className={classForInput}
                     value={this.state.title}  type="text" placeholder="New task name"/>
                    <button onClick={this.onAddTaskClick}>Add</button>
                </div>
            </div>

        );
    }

}

export default TodoListHeader;