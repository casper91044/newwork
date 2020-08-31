import {TasksStateType, TodoListsType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListAC, RemoveTodoListActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todoListId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todoListId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string,
    isDone: boolean,
    todoListId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    title: string,
    todoListId: string
}

type ActionTypeTask = RemoveTaskActionType | AddTaskActionType |
    ChangeTaskStatusActionType | ChangeTaskTitleActionType |
    AddTodoListActionType | RemoveTodoListActionType;

export const tasksReducer = (state: TasksStateType, action: ActionTypeTask) => {
    let copyState
    switch (action.type) {
        case 'REMOVE-TASK' :
            copyState = {...state}
            copyState[action.todoListId] = copyState[action.todoListId].filter(t => t.id != action.taskId);
            return copyState
        case 'ADD-TASK' :
            copyState = {...state}
            let newTask = {id: v1(), title: action.title, isDone: false}
            copyState[action.todoListId] = [newTask, ...copyState[action.todoListId]]
            return copyState
        case 'CHANGE-TASK-STATUS' :
            copyState = {...state}
            copyState[action.todoListId] = copyState[action.todoListId].map(t => {
                if (t.id !== action.taskId) {
                    return t
                } else {
                    return {...t, isDone: action.isDone}
                }
            })
            return copyState
        case 'CHANGE-TASK-TITLE' :
            copyState = {...state}
            copyState[action.todoListId] = copyState[action.todoListId].map(t => {
                if (t.id !== action.taskId) {
                    return t
                } else {
                    return {...t, title: action.title}
                }
            })
            return copyState
        case 'ADD-TODOLIST' :
            copyState = {...state}
            copyState[action.todoListId] = []
            return copyState
        case 'REMOVE-TODOLIST' :
            copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            throw new Error('I do not understand this action type')
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): ActionTypeTask => {
    return {type: 'REMOVE-TASK', taskId, todoListId };
}

export const addTaskAC = (title: string, todoListId: string): ActionTypeTask => {
    return { type: 'ADD-TASK', title, todoListId};
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ActionTypeTask => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todoListId};
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ActionTypeTask => {
    return { type: 'CHANGE-TASK-TITLE', taskId, title, todoListId};
}

