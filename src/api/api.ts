import axios from "axios";
import {ITask} from "../entities/entities";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {"API-KEY": "6d54c1cb-0079-4662-b13d-27d4ae8cf67d"}
});
export enum ResultCodeEnum {
    Success=0,
    Error=1,
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired=10
}
type LoginResponseType = {
    resultCode: ResultCodeEnum|ResultCodeForCaptcha
    messages: Array<string>
    data: {
        userId: number
    }
}
export const api = {
    login(email:string, password:string, rememberMe = false,captcha:string|null=null) {
        debugger
        return instance.post<LoginResponseType>(`/auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    getToDoLists() {
        return instance.get("/todo-lists").then(res => {
            return res.data
        })
    },
    addToDoList(title: string) {
        return instance.post("/todo-lists", {title: title}).then(
            res => {
                return res.data.data.item
            }
        )
    },
    getTasks(todolistId: string) {
        return instance.get(`/todo-lists/${todolistId}/tasks`).then(
            res => {
                return res.data.items
            }
        )
    },
    deleteToDoList(todolistId: string) {
        return instance.delete(`/todo-lists/${todolistId}`)
    },
    addTask(todolistId: string, newText: string) {
        return instance.post(`/todo-lists/${todolistId}/tasks`, {title: newText}).then(res => {
            return res.data.data.item
        })
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    changeTask(todolistId: string, taskId: string, newTask: ITask) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, newTask).then(
            res => {
                if (res.data.resultCode === 0) {
                    return res.data.data.item
                }
            }
        )
    },
    changeToDoListTitle(todolistId: string, title: string) {
        return instance.put(`/todo-lists/${todolistId}/`, {title})
    }
};