import React, {ChangeEvent} from 'react';
import '../../App.css';

interface IProps {
    addTask: Function
}

interface IState {
    error: boolean
    title: string
}

class AddNewItemForm extends React.Component<IProps,IState> {
    state = {
        error: false,
        title: ""
    };

    onChangingValue = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({error: false, title: e.currentTarget.value})
    };
    onAddItemClick = () => {
        let newText = this.state.title;
        this.setState({title: ''});
        if (newText === "") {
            this.setState({error: true})
        } else {
            this.setState({error: false});
            this.props.addTask(newText);
        }
    };
    onEnterPress = (e: KeyboardEventInit) => {
        if (e.key === 'Enter') {
            this.onAddItemClick();
        }
    };
    render = () => {
        let classForInput = this.state.error ? "error" : "";
        return (
            <div>
                <div className="todoList-newTaskForm">
                    <input onKeyPress={this.onEnterPress} onChange={this.onChangingValue} className={classForInput}
                           value={this.state.title} type="text" placeholder="New item name"/>
                    <button onClick={this.onAddItemClick}>Add</button>
                </div>
            </div>

        );
    }

}

export default AddNewItemForm;