import React from 'react';
import './App.css';

interface IProps {
    changeFilter:Function
    filterValue:string
}

class TodoListFooter extends React.Component<IProps> {
    state = {
        isHidden: false
    };

    onAllFilterClick = () => {this.props.changeFilter("All")
    };
    onCompletedFilterClick = () => {this.props.changeFilter("Completed")};
    onActiveFilterClick = () => {this.props.changeFilter("Active")};

    onHideFiltersClick = () => {
        let isHiddenValue = this.state.isHidden;
        this.setState({isHidden: !isHiddenValue})
    };
    onShowFiltersClick = () => {
        let isHiddenValue = this.state.isHidden;
        this.setState({isHidden: !isHiddenValue})
    };
    render = () => {
        let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";
        return (
            <div className="todoList-footer">
                {!this.state.isHidden && <div>
                    <button onClick={this.onAllFilterClick} className={classForAll}>All
                    </button>
                    <button onClick={this.onCompletedFilterClick} className={classForCompleted}>Completed
                    </button>
                    <button onClick={this.onActiveFilterClick} className={classForActive}>Active
                    </button>
                </div>}
                {!this.state.isHidden && <span onClick={this.onHideFiltersClick}>Hide</span>}
                {this.state.isHidden && <span onClick={this.onShowFiltersClick}>Show</span>}

            </div>
        );
    };
}

export default TodoListFooter;