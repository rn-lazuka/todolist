import axios from "axios";
import {ITask} from "./entities/entities";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "6d54c1cb-0079-4662-b13d-27d4ae8cf67d"}
});

export const api = {
    getToDoLists() {
        return instance.get("").then(res => {
            return res.data
        })
    },
    addToDoList(title: string) {
        return instance.post("", {title: title}).then(
            res => {
                return res.data.data.item
            }
        )
    },
    getTasks(todolistId: string) {
        return instance.get(`/${todolistId}/tasks`).then(
            res => {
                return res.data.items
            }
        )
    },
    deleteToDoList(todolistId: string) {
        return instance.delete(`/${todolistId}`)
    },
    addTask(todolistId: string, newText: string) {
        return instance.post(`/${todolistId}/tasks`, {title: newText}).then(res => {
            return res.data.data.item
        })
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`/${todolistId}/tasks/${taskId}`)
    },
    changeTask(todolistId: string, taskId: string, newTask: ITask) {
        return instance.put(`/${todolistId}/tasks/${taskId}`, newTask).then(
            res => {
                if (res.data.resultCode === 0) {
                    return res.data.data.item
                }
            }
        )
    },
    changeToDoListTitle(todolistId: string, title: string) {
        return instance.put(`/${todolistId}/`, {title})
    }
};