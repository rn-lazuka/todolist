import {api} from "../api/api";
import {ITask, ITodoList} from "../entities/entities";

export const ADD_TODOLIST = "TODOLIST/REDUCER/ADD_TODOLIST";
export const ADD_TASK = "TODOLIST/REDUCER/ADD_TASK";
export const CHANGE_TASK = "TODOLIST/REDUCER/CHANGE_TASK";
export const DELETE_TASK = "TODOLIST/REDUCER/DELETE_TASK";
export const DELETE_TODOLIST = "TODOLIST/REDUCER/DELETE_TODOLIST";
export const SET_TODOLISTS = "TODOLIST/REDUCER/SET_TODOLISTS";
export const SET_TASKS = "TODOLIST/REDUCER/SET_TASKS";
export const CHANGE_TODOLIST_TITLE = "TODOLIST/REDUCER/CHANGE_TODOLIST_TITLE";


interface IInitialState {
    todolists: Array<ITodoList>
}

const initialState = {
    todolists: []
};


export const reducer = (state: IInitialState = initialState, action: TodoListReducerActionTypes): IInitialState => {
    switch (action.type) {
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newToDoList],
            };
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map((tl: ITodoList) => ({...tl, tasks: []}))
            };
        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map((tl: ITodoList) => {
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
                todolists: state.todolists.map((tl: ITodoList) => {
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
                todolists: state.todolists.map((tl: ITodoList) => {
                        if (tl.id === action.todolistId) {
                            return {
                                ...tl,
                                tasks: tl.tasks.map((t: ITask) => {
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
                todolists: state.todolists.map((tl: ITodoList) => {
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
                todolists: state.todolists.map((tl: ITodoList) => {
                        if (tl.id === action.todolistId) {
                            return {...tl, tasks: tl.tasks.filter((t: ITask) => t.id !== action.taskId)}
                        } else {
                            return tl
                        }
                    }
                )
            };
        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter((tl: ITodoList) => tl.id !== action.todolistId)
            };
        default:
            return state;
    }
};

interface IAddToDoListAC {
    type: typeof ADD_TODOLIST
    newToDoList: ITodoList
}

interface ISetTodoListsAC {
    type: typeof SET_TODOLISTS
    todolists: Array<ITodoList>
}

interface ISetTaskAC {
    type: typeof SET_TASKS
    tasks: Array<ITask>
    todolistId: string
}

interface IAddNewTaskAC {
    type: typeof ADD_TASK
    newTask: ITask
    todolistId: string
}

interface IChangeTaskAC {
    type: typeof CHANGE_TASK
    newTask: ITask
    todolistId: string
}

interface IDeleteToDoListAC {
    type: typeof DELETE_TODOLIST
    todolistId: string
}

interface IDeleteTaskAC {
    type: typeof DELETE_TASK
    todolistId: string
    taskId: string
}

interface IChangeToDoListTitleAC {
    type: typeof CHANGE_TODOLIST_TITLE
    todolistId: string
    title: string
}

type TodoListReducerActionTypes = IAddToDoListAC | ISetTodoListsAC | ISetTaskAC | IAddNewTaskAC
    | IChangeTaskAC | IDeleteToDoListAC | IDeleteTaskAC | IChangeToDoListTitleAC;


const addToDoListAC = (newToDoList: ITodoList): IAddToDoListAC => ({type: ADD_TODOLIST, newToDoList});
const setTodoListsAC = (todolists: Array<ITodoList>): ISetTodoListsAC => ({type: SET_TODOLISTS, todolists});
const setTaskAC = (tasks: Array<ITask>, todolistId: string): ISetTaskAC => ({
    type: SET_TASKS,
    tasks,
    todolistId
});
const addNewTaskAC = (newTask: ITask, todolistId: string): IAddNewTaskAC => ({
    type: ADD_TASK,
    newTask,
    todolistId
});
const changeTaskAC = (newTask: ITask, todolistId: string): IChangeTaskAC => ({
    type: CHANGE_TASK,
    newTask,
    todolistId
});
const deleteToDoListAC = (todolistId: string): IDeleteToDoListAC => ({type: DELETE_TODOLIST, todolistId});
const deleteTaskAC = (todolistId: string, taskId: string): IDeleteTaskAC => ({
    type: DELETE_TASK,
    todolistId,
    taskId
});
const changeToDoListTitleAC = (todolistId: string, title: string): IChangeToDoListTitleAC => ({
    type: CHANGE_TODOLIST_TITLE,
    todolistId,
    title
});


export const setTodoLists = () => async (dispatch: Function) => {
    const dataItem: Array<ITodoList> = await api.getToDoLists();
    dispatch(setTodoListsAC(dataItem))
};

export const setTasks = (todolistId: string) => async (dispatch: Function) => {
    const dataItem: Array<ITask> = await api.getTasks(todolistId);
    dispatch(setTaskAC(dataItem.reverse(), todolistId))
};

export const addToDoList = (title: string) => async (dispatch: Function) => {
    const dataItem: ITodoList = await api.addToDoList(title);
    dispatch(addToDoListAC(dataItem))
};

export const addNewTask = (newText: string, todolistId: string) => async (dispatch: Function) => {
    const dataItem: ITask = await api.addTask(todolistId, newText)
    dispatch(addNewTaskAC(dataItem, todolistId))
};

export const changeTask = (task: ITask, newTask: ITask, todolistId: string) => async (dispatch: Function) => {
    const dataItem: ITask = await api.changeTask(todolistId, task.id, newTask)
    dispatch(changeTaskAC(dataItem, todolistId))
};

export const changeToDoListTitle = (todolistId: string, title: string) => async (dispatch: Function) => {
    const dataItem: any = await api.changeToDoListTitle(todolistId, title);
    dispatch(changeToDoListTitleAC(todolistId, title))
};

export const deleteToDoList = (todolistId: string) => async (dispatch: Function) => {
    const dataItem: any = await api.deleteToDoList(todolistId);
    if (dataItem.data.resultCode === 0) {
        dispatch(deleteToDoListAC(todolistId))
    }
};

export const deleteTask = (todolistId: string, taskId: string) => async (dispatch: Function, getState: any) => {
    const dataItem: any = await api.deleteTask(todolistId, taskId);
    if (dataItem.data.resultCode === 0) {
        dispatch(deleteTaskAC(todolistId, taskId))
    }
};

