import {createStore} from "redux";

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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return {
                ...state,
                todolists: [...state.todolists, action.newToDoList]
            };
        case "ADD-TASK":
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
        case "CHANGE-TASK":
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                        if (tl.id === action.todolistId) {
                            return {...tl, tasks: action.newTasks}
                        } else {
                            return tl
                        }
                    }
                )
            };
        case "DELETE-TASK":
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                        if (tl.id === action.todolistId) {
                            return {...tl,tasks:tl.tasks.filter (t=>t.id!==action.taskId)}
                        } else {
                            return tl
                        }
                    }
                )
            };
        case "DELETE-TODOLIST":
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id !== action.todolistId)
            };
    }
    return state;
};

const store = createStore(reducer);
export default store;