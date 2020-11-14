import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todoListId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}
export type UpdateTaskActionType = {
    type: 'UPDATE -TASK',
    taskId: string,
    model: UpdateDomainTaskModelType,
    todoListId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    title: string,
    todoListId: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todoListId: string
}



type ActionTypeTask = RemoveTaskActionType | AddTaskActionType |
    UpdateTaskActionType | ChangeTaskTitleActionType |
    AddTodoListActionType | RemoveTodoListActionType |
    SetTodolistsActionType | SetTasksActionType;

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypeTask): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todoListId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = action.task

            const tasks = stateCopy[newTask.todoListId];
            const newTasks = [newTask, ...tasks];
            stateCopy[newTask.todoListId] = newTasks;
            return stateCopy;
        }
        case 'UPDATE -TASK': {
            let todolistTasks = state[action.todoListId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? { ...t, ...action.model } : t);

            state[action.todoListId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todoListId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? { ...t, title: action.title } : t);

            state[action.todoListId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todoList.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TODOLISTS": {
            const copyState = {...state};
            action.todoLists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState;
        }
        case 'SET-TASKS': {
            const copyState = {...state};
            copyState[action.todoListId] = action.tasks
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): ActionTypeTask => {
    return {type: 'REMOVE-TASK', taskId, todoListId };
}

export const addTaskAC = (task: TaskType): ActionTypeTask => {
    return { type: 'ADD-TASK', task};
}

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todoListId: string): ActionTypeTask => {
    return { type: 'UPDATE -TASK', taskId, model, todoListId};
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ActionTypeTask => {
    return { type: 'CHANGE-TASK-TITLE', taskId, title, todoListId};
}

export const setTasksAC = (tasks: Array<TaskType>, todoListId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todoListId}
}

export const fetchTasksTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todoListId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todoListId)
                dispatch(action)
            })
    }
}

export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTask(title, todolistId)
            .then((res) => {
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
            })
    }
}

export const removeTaskTC = (taskId: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTask(todoListId,taskId)
            .then((res) => {
                const action = removeTaskAC(taskId, todoListId)
                dispatch(action)
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todoListId].find(t => t.id === taskId);
        if (!task) {
            console.warn("task not found")
            return
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        todolistAPI.updateTask(taskId, todoListId, apiModel)
            .then((res) => {
                const action = updateTaskAC(taskId, domainModel, todoListId)
                dispatch(action)
            })
    }
}


