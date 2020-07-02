import React, {ChangeEvent, KeyboardEvent} from 'react';
import '../../App.css';
import {StyledButton} from '../common/AddButton';
import TextField from '@material-ui/core/TextField';


interface IProps {
    addTask: Function
}

interface IState {
    error: string
    title: string
}

class AddNewItemForm extends React.Component<IProps, IState> {
    state = {
        error: "",
        title: ""
    };


    onChangingValue = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({error: "", title: e.currentTarget.value})
    };
    onAddItemClick = () => {
        let newText = this.state.title;
        this.setState({title: ''});
        if (newText === "") {
            this.setState({error: "Field is required"})
        } else {
            this.setState({error: ""});
            this.props.addTask(newText);
        }
    };
    onEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.onAddItemClick();
        }
    };
    render = () => {
        return (
            <div>
                <div className="todoList-newTaskForm">
                    <TextField variant="outlined"
                               value={this.state.title}
                               onChange={this.onChangingValue}
                               onKeyPress={this.onEnterPress}
                               error={!!this.state.error}
                               helperText={this.state.error}
                               placeholder="New item name"/>
                    <StyledButton variant="contained" onClick={this.onAddItemClick}>Add</StyledButton>
                </div>
            </div>

        );
    }

}

export default AddNewItemForm;