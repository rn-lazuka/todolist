import {api} from "../api";
import {ITask} from "../entities/entities";

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


export const reducer = (state = initialState, action:any) => {
    switch (action.type) {
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newToDoList],
            };
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map((tl:any )=> ({...tl, tasks: []}))
            };
        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map((tl:any) => {
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
                todolists: state.todolists.map((tl:any) => {
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
                todolists: state.todolists.map((tl:any) => {
                        if (tl.id === action.todolistId) {
                            return {
                                ...tl,
                                tasks: tl.tasks.map((t:any) => {
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
                todolists: state.todolists.map((tl:any) => {
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
                todolists: state.todolists.map((tl:any) => {
                        if (tl.id === action.todolistId) {
                            return {...tl, tasks: tl.tasks.filter((t:any) => t.id !== action.taskId)}
                        } else {
                            return tl
                        }
                    }
                )
            };
        case DELETE_TODOLIST:
            let st =  state.todolists.filter((tl:any) => tl.id !== action.todolistId)
            return {
                ...state,
                todolists: state.todolists.filter((tl:any) => tl.id !== action.todolistId)
            };
        default:
            return state;
    }
};

export const addToDoListAC = (newToDoList:any) => ({type: ADD_TODOLIST, newToDoList});
export const setTodoListsAC = (todolists:Array<any>) => ({type: SET_TODOLISTS, todolists});
export const setTaskAC = (tasks:Array<ITask>, todolistId:string) => ({type: SET_TASKS, tasks, todolistId});
export const addNewTaskAC = (newTask:ITask, todolistId:string) => ({type: ADD_TASK, newTask, todolistId});

export const changeTaskAC = (newTask:ITask, todolistId:string) => ({type: CHANGE_TASK, newTask, todolistId});
export const deleteToDoListAC = (todolistId:string) => ({type: DELETE_TODOLIST, todolistId});
export const deleteTaskAC = (todolistId:string, taskId:string) => ({type: DELETE_TASK, todolistId, taskId});
export const changeToDoListTitleAC = (todolistId:string, title:string) => ({type: CHANGE_TODOLIST_TITLE, todolistId, title});




export const setTodoLists = () => {
    return (dispatch:Function) => {
    api.getToDoLists().then((res:any) => {
        dispatch(setTodoListsAC(res.data))
    });
}};
export const setTasks = (todolistId:string) => {
    return (dispatch:Function) => {
        api.getTasks(todolistId).then((res:any) => {
            const tasks:Array<ITask> = res.data.items;
            dispatch(setTaskAC(tasks, todolistId))
        });
}};

export const addToDoList = (title:string) => {
    return (dispatch:Function) => {
        api.addToDoList(title).then((res:any) => {
     dispatch(addToDoListAC(res.data.data.item))
    });
}};
export const addNewTask = (newText:string,todolistId:string) => {
    return (dispatch:Function) => {
        api.addTask(todolistId, newText)
            .then((task:ITask) => {
               dispatch(addNewTaskAC(task, todolistId))
    });
}};

export const changeTask = (task:any, newTask:ITask, todolistId:string) => {
    return (dispatch:Function) => {
        api.changeTask(todolistId, task.id, newTask)
            .then((res:any) => {
                if (res.data.resultCode === 0) {
                  dispatch(changeTaskAC(res.data.data.item, todolistId))
                }
            });
}};

export const changeToDoListTitle = (todolistId:string, title:string) => {
    return (dispatch:Function) => {
        api.changeToDoListTitle(todolistId, title)
            .then((res:any) => {
                if (res.data.resultCode === 0) {
                  dispatch(changeToDoListTitleAC(todolistId, title))
                }
            });
}};

export const deleteToDoList = (todolistId:string) => {
    return (dispatch:Function) => {
        api.deleteToDoList(todolistId)
            .then((res:any) => {
                if (res.data.resultCode === 0) {
                   dispatch(deleteToDoListAC(todolistId))
                }
            });
}};

export const deleteTask = (todolistId:string, taskId:string) => {
    return (dispatch:Function, getState:any) => {
        api.deleteTask(todolistId, taskId).then((res:any) => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTaskAC(todolistId, taskId))
            }
        });
}};

