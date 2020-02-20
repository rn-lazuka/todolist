import {api} from "./api";

export const ADD_TODOLIST = "TODOLIST/REDUCER/ADD_TODOLIST";
export const ADD_TASK = "TODOLIST/REDUCER/ADD_TASK";
export const CHANGE_TASK = "TODOLIST/REDUCER/CHANGE_TASK";
export const DELETE_TASK = "TODOLIST/REDUCER/DELETE_TASK";
export const DELETE_TODOLIST = "TODOLIST/REDUCER/DELETE_TODOLIST";
export const SET_TODOLISTS = "TODOLIST/REDUCER/SET_TODOLISTS";
export const SET_TASKS = "TODOLIST/REDUCER/SET_TASKS";
export const CHANGE_TODOLIST_TITLE = "TODOLIST/REDUCER/CHANGE_TODOLIST_TITLE";


const initialState = {
    todolists: [/*{
        id: 0, title: "WhatToEat", tasks: [{id: 0, title: "Pizza", isDone: false, priority: "low"},
            {id: 1, title: "More pizza", isDone: false, priority: "low"}, {
                id: 2,
                title: "IceCream",
                isDone: false,
                priority: "low"
            }]
    },
        {
            id: 1, title: "WhatToLearn", tasks: [{id: 0, title: "React", isDone: false, priority: "low"},
                {id: 1, title: "Redux", isDone: false, priority: "low"}, {
                    id: 2,
                    title: "Hooks",
                    isDone: false,
                    priority: "low"
                }]
        }*/]
};


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newToDoList],
            };
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map(tl => ({...tl, tasks: []}))
            };
        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: action.tasks}
                    } else {
                        return tl
                    }
                })
            };
        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: [...tl.tasks, action.newTask]}
                    } else {
                        return tl
                    }
                })
            };
        case CHANGE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                        if (tl.id === action.todolistId) {
                            return {
                                ...tl,
                                tasks: tl.tasks.map(t => {
                                        if (t.id !== action.newTask.id) {
                                            return t
                                        } else {
                                            return action.newTask
                                        }
                                    }
                                )
                            }
                        } else {
                            return tl
                        }
                    }
                )
            };
            case CHANGE_TODOLIST_TITLE:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                        if (tl.id === action.todolistId) {
                            return {
                                ...tl,
                                title: action.title
                            }
                        } else {
                            return tl
                        }
                    }
                )
            };
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                        if (tl.id === action.todolistId) {
                            return {...tl, tasks: tl.tasks.filter(t => t.id !== action.taskId)}
                        } else {
                            return tl
                        }
                    }
                )
            };
        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id !== action.todolistId)
            };
        default:
            return state;
    }
};

export const addToDoListAC = (newToDoList) => ({type: ADD_TODOLIST, newToDoList});
export const setTodoListsAC = (todolists) => ({type: SET_TODOLISTS, todolists});
export const setTaskAC = (tasks, todolistId) => ({type: SET_TASKS, tasks, todolistId});
export const addNewTaskAC = (newTask, todolistId) => ({type: ADD_TASK, newTask, todolistId});
export const changeTaskAC = (newTask, todolistId) => ({type: CHANGE_TASK, newTask, todolistId});
export const deleteToDoListAC = (todolistId) => ({type: DELETE_TODOLIST, todolistId});
export const deleteTaskAC = (todolistId, taskId) => ({type: DELETE_TASK, todolistId, taskId});
export const changeToDoListTitleAC = (todolistId, title) => ({type: CHANGE_TODOLIST_TITLE, todolistId, title});




export const setTodoLists = () => {
    return (dispatch, getState) => {
    api.getToDoLists().then(res => {
        dispatch(setTodoListsAC(res.data))
    });
}};
export const setTasks = (todolistId) => {
    return (dispatch, getState) => {
        api.getTasks(todolistId).then(res => {
            const tasks = res.data.items;
            dispatch(setTaskAC(tasks, todolistId))
        });
}};

export const addToDoList = (title) => {
    return (dispatch, getState) => {
        api.addToDoList(title).then(res => {
     dispatch(addToDoListAC(res.data.data.item))
    });
}};
export const addNewTask = (newText,todolistId) => {
    return (dispatch, getState) => {
        api.addTask(todolistId, newText)
            .then(res => {
                const task = res.data.data.item;
               dispatch(addNewTaskAC(task, todolistId))
    });
}};

export const changeTask = (task, newTask, todolistId) => {
    return (dispatch, getState) => {
        api.changeTask(todolistId, task.id, newTask)
            .then(res => {
                if (res.data.resultCode === 0) {
                  dispatch(changeTaskAC(res.data.data.item, todolistId))
                }
            });
}};

export const changeToDoListTitle = (todolistId, title) => {
    return (dispatch, getState) => {
        api.changeToDoListTitle(todolistId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                  dispatch(changeToDoListTitleAC(todolistId, title))
                }
            });
}};

export const deleteToDoList = (todolistId) => {
    return (dispatch, getState) => {
        api.deleteToDoList(todolistId)
            .then(res => {
                if (res.data.resultCode === 0) {
                   dispatch(deleteToDoListAC(todolistId))
                }
            });
}};

export const deleteTask = (todolistId, taskId) => {
    return (dispatch, getState) => {
        api.deleteTask(todolistId, taskId).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTaskAC(todolistId, taskId))
            }
        });
}};

