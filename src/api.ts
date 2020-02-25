import  axios from "axios";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "6d54c1cb-0079-4662-b13d-27d4ae8cf67d"}
});

export const api = {
    getToDoLists() {
        return instance.get("")
    },
    addToDoList(title:string) {
        return instance.post("", {title: title},
        )
    },
    getTasks(todolistId:string) {
        return instance.get(`/${todolistId}/tasks`)
    },
    deleteToDoList(todolistId:string) {
        return instance.delete(`/${todolistId}`)
    },
    addTask(todolistId:string,newText:string) {
        return instance.post(`/${todolistId}/tasks`, {title: newText}).
        then(res => {
            return res.data.data.item
        })
    },
    deleteTask(todolistId:string, taskId:string) {
        return instance.delete(`/${todolistId}/tasks/${taskId}`)
    },
    changeTask (todolistId:string,taskId:string,newTask:any){
        return instance.put(`/${todolistId}/tasks/${taskId}`, newTask)
    },
    changeToDoListTitle (todolistId:string,title:string){
        return instance.put(`/${todolistId}/`, {title})
    }
};