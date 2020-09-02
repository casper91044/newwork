import {FilterValuesType, TodoListsType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    todoListId: string
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

type ActionTypeList = RemoveTodoListActionType|AddTodoListActionType|
    ChangeTodoListTitleActionType|ChangeTodoListFilterActionType;

const initialState: Array<TodoListsType> = [];

export const todolistsReducer = (state: Array<TodoListsType> = initialState , action: ActionTypeList): Array<TodoListsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' :
            return state.filter(tl => tl.id !== action.id);

        case 'ADD-TODOLIST' :
            let newTodoList: TodoListsType = {
                id: action.todoListId,
                title: action.title,
                filter: "all"
            }
            return [...state, newTodoList]

        case 'CHANGE-TODOLIST-TITLE' :
            let todoList = state.find(tl => tl.id === action.id)
            if(todoList) {
                todoList.title = action.title;
                return [...state]
            }
            return state;

        case 'CHANGE-TODOLIST-FILTER' :
            let todoListFilter = state.find(tl => tl.id === action.id)
            if(todoListFilter) {
                todoListFilter.filter = action.filter;
                return [...state]
            }
            return state;
        default:
            return state;
    }
}

export const removeTodoListAC = (todoListId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListId };
}

export const addTodoListAC = (newTitle: string): AddTodoListActionType => {
    return { type: 'ADD-TODOLIST', title: newTitle, todoListId: v1()};
}

export const changeTodoListTitleAC = (todoListId: string , newTitle: string): ChangeTodoListTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE',id: todoListId, title: newTitle };
}

export const changeTodoListFilterAC = (  newFilter: FilterValuesType, todoListId: string): ChangeTodoListFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: newFilter, id: todoListId };
}
