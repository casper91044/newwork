import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {removeTaskAC} from "./tasks-reducer";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST',
    todoList: TodolistType
}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string,
    id: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    filter: FilterValuesType,
    id: string
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todoLists: Array<TodolistType>
}

type ActionsType = RemoveTodoListActionType | AddTodoListActionType |
    ChangeTodoListTitleActionType | ChangeTodoListFilterActionType | SetTodolistsActionType;

export type FilterValuesType = "all" | "active" | "completed";

const initialState: Array<TodolistDomainType> = []

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' :
            return state.filter(tl => tl.id !== action.id);

        case 'ADD-TODOLIST' :
            const newTodoList: TodolistDomainType = {...action.todoList, filter: 'all'}
            return [newTodoList, ...state]

        case 'CHANGE-TODOLIST-TITLE' :
            let todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title;
                return [...state]
            }
            return state;

        case 'CHANGE-TODOLIST-FILTER' :
            let todoListFilter = state.find(tl => tl.id === action.id)
            if (todoListFilter) {
                todoListFilter.filter = action.filter;
                return [...state]
            }
            return state;

        case 'SET-TODOLISTS': {
            return action.todoLists.map((tl) => ({
                ...tl,
                filter: 'all'
            }))
        }

        default:
            return state;
    }
}

export const removeTodoListAC = (todoListId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListId};
}

export const addTodoListAC = (todoList: TodolistType): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', todoList};
}

export const changeTodoListTitleAC = (todoListId: string, newTitle: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todoListId, title: newTitle};
}

export const changeTodoListFilterAC = (newFilter: FilterValuesType, todoListId: string): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: newFilter, id: todoListId};
}

export const setTodoListAC = (todoLists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todoLists};
}

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolist()
            .then((res) => {
                dispatch(setTodoListAC(res.data))
            })
    }
}

export const removeTodoListTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolist(todoListId)
            .then((res) => {
                const action = removeTodoListAC(todoListId)
                dispatch(action)
            })
    }
}

export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                const todoList = res.data.data.item
                const action = addTodoListAC(todoList)
                dispatch(action)
            })
    }
}

export const changeTodoListTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                const action = changeTodoListTitleAC(todolistId, title)
                dispatch(action)
            })
    }
}



