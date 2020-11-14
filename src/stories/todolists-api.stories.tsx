import React, {useEffect, useState} from 'react';
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodolist()
            .then( (res) => {
            setState(res.data);
        } )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const newTodoTitle = 'New TodoList'
        todolistAPI.createTodolist(newTodoTitle)
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
            .then( (res) => {
            setState(res.data);
        } )

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '5ee51c9f-7be4-4b4b-a87d-9002b6c2eb6c';
        todolistAPI.deleteTodolist(todolistId)
            .then( (res) => {
            setState(res.data);
        })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'b3f52ca0-cc4b-4255-8c82-2a26fc20fa2c'
        const title = 'Update TITLE'
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                 setState(res.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '257f2181-15f8-4a74-9f94-a21cb845d80b';
        todolistAPI.getTasks(todolistId)
            .then( (res) => {
                setState(res.data);
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '257f2181-15f8-4a74-9f94-a21cb845d80b';
        const title = 'New Task'
        todolistAPI.createTask(todolistId, title)
            .then( (res) => {
                setState(res.data);
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '257f2181-15f8-4a74-9f94-a21cb845d80b';
        const taskId = 'dfacb130-a021-460b-bea0-9d56b8f49187';
        todolistAPI.deleteTask(todolistId,taskId)
            .then( (res) => {
                setState(res.data);
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '257f2181-15f8-4a74-9f94-a21cb845d80b';
        const taskId = 'f87e91fe-f954-452d-87fe-d37e750ca584';
        let title = 'Learn JS'
        todolistAPI.updateTask(taskId, todolistId, {
            deadline: "",
            description: "",
            priority: 0,
            startDate: "",
            status: 0,
            title: title
        } )
            .then( (res) => {
                setState(res.data);
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])

    return <div> {JSON.stringify(state)}</div>
}