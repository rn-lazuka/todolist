import * as axios from "axios";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "6d54c1cb-0079-4662-b13d-27d4ae8cf67d"}
});

export const api = {
    getToDoLists() {
        return instance.get()
    },
    addToDoList(title) {
        return instance.post("", {title: title},
        )
    },
    getTasks(todolistId) {
        return instance.get(`/${todolistId}/tasks`)
    },
    deleteToDoList(todolistId) {
        return instance.delete(`/${todolistId}`)
    },
    addTask(todolistId,newText) {
        return instance.post(`/${todolistId}/tasks`, {title: newText})
    },
    deleteTask(todolistId, taskId) {
        return instance.delete(`/${todolistId}/tasks/${taskId}`)
    },
    changeTask (todolistId,taskId,newTask){
        return instance.put(`/${todolistId}/tasks/${taskId}`, newTask)
    },
    changeToDoListTitle (todolistId,title){
        return instance.put(`/${todolistId}/`, title)
    }

};