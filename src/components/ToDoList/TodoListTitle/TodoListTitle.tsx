import React, {ChangeEvent} from 'react';
import '../../../App.css';

interface IProps {
    changeToDoListTitle: (title: string) => void
    deleteToDoList: () => void
    title: string
}
interface IState {
    title: string
    editMode: boolean
    classForInput: string
}

class TodoListTitle extends React.Component<IProps,IState> {
    state = {
        title: this.props.title,
        editMode: false,
        classForInput: ""
    };

    activateEditMode = (): void => {
        this.setState({editMode: true})
    };

    deactivateEditMode = (): void => {
        if (this.state.title !== "") {
            this.props.changeToDoListTitle(this.state.title);
            this.setState({editMode: false});
        } else {
            this.setState({classForInput: "error"});
        }
    };

    onTitleChanged = (e: ChangeEvent<HTMLInputElement>): void => {
        let newTitle = e.currentTarget.value;
        this.setState({title: newTitle});
    };

    render = () => {
        return (
            <div className="todoList-header">
                {this.state.editMode
                    ? <input className={this.state.classForInput} onChange={this.onTitleChanged}
                             onBlur={this.deactivateEditMode} autoFocus={true} value={this.state.title}/> :
                    <h3 className="todoList-header__title" onClick={this.activateEditMode}>{this.state.title}
                    </h3>
                }
                <button onClick={this.props.deleteToDoList}>X</button>
            </div>
        )
    }
}

export default TodoListTitle;