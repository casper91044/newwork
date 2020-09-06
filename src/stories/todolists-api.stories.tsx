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
        const newTodoTitle = 'REact'
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
        const title = 'SOME NEW TITLEok'
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                 setState(res.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const GetTask = () => {
    const [state, setState] = useState<any>({name: "XXX"})
    useEffect(() => {
        const todolistId = 'b3f52ca0-cc4b-4255-8c82-2a26fc20fa2c';
        todolistAPI.getTask(todolistId)
            .then( (res) => {
                setState(res.data);
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])

    return <div> {JSON.stringify(state)}</div>
}