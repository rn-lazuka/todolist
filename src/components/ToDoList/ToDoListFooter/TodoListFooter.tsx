import React from 'react';
import '../../../App.css';
import {Button} from '@material-ui/core';

interface IProps {
    changeFilter: (string: string) => void
    filterValue: string
}

interface IState {
    isHidden: boolean
}

class TodoListFooter extends React.Component<IProps, IState> {
    state = {
        isHidden: false
    };

    onAllFilterClick = () => {
        this.props.changeFilter("All")
    };
    onCompletedFilterClick = () => {
        this.props.changeFilter("Completed")
    };
    onActiveFilterClick = () => {
        this.props.changeFilter("Active")
    };

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
        debugger
        return (

            <div className="todoList-footer">
                {!this.state.isHidden && <div>
                  <Button onClick={this.onAllFilterClick}
                          variant={this.props.filterValue === 'All' ? 'outlined' : 'text'}
                          color="primary">All
                  </Button>
                  <Button onClick={this.onCompletedFilterClick}
                          variant={this.props.filterValue === 'Completed' ? 'outlined' : 'text'}
                          color="primary">Completed
                  </Button>
                  <Button onClick={this.onActiveFilterClick}
                          variant={this.props.filterValue === 'Active' ? 'outlined' : 'text'}
                          color="primary">Active
                  </Button>
                </div>}
                {!this.state.isHidden && <span onClick={this.onHideFiltersClick}>Hide</span>}
                {this.state.isHidden && <span onClick={this.onShowFiltersClick}>Show</span>}

            </div>
        );
    };
}

export default TodoListFooter;