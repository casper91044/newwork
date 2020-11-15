import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";

//types
type ActionsType =
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | SetTodolistsActionType

export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type SetTodolistsActionType = ReturnType<typeof setTodoListAC>

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
            return [{...action.todoList, filter: 'all'}, ...state]

        case 'CHANGE-TODOLIST-TITLE' :
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)

        case 'CHANGE-TODOLIST-FILTER' :
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        case 'SET-TODOLISTS':
            return action.todoLists.map((tl) => ({...tl, filter: 'all'}))

        default:
            return state;
    }
}

//actions
export const removeTodoListAC = (todoListId: string) =>
    ({type: 'REMOVE-TODOLIST', id: todoListId} as const);

export const addTodoListAC = (todoList: TodolistType) =>
    ({type: 'ADD-TODOLIST', todoList} as const);

export const changeTodoListTitleAC = (todoListId: string, newTitle: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id: todoListId, title: newTitle} as const);

export const changeTodoListFilterAC = (newFilter: FilterValuesType, todoListId: string) =>
    ({type: 'CHANGE-TODOLIST-FILTER', filter: newFilter, id: todoListId} as const);

export const setTodoListAC = (todoLists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todoLists} as const);

//thunks
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistAPI.getTodolist()
            .then((res) => {
                dispatch(setTodoListAC(res.data))
            })
    }
}

export const removeTodoListTC = (todoListId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistAPI.deleteTodolist(todoListId)
            .then((res) => {
                const action = removeTodoListAC(todoListId)
                dispatch(action)
            })
    }
}

export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                const todoList = res.data.data.item
                const action = addTodoListAC(todoList)
                dispatch(action)
            })
    }
}

export const changeTodoListTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                const action = changeTodoListTitleAC(todolistId, title)
                dispatch(action)
            })
    }
}

