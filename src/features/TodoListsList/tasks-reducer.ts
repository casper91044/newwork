import {AddTodoListActionType, RemoveTodoListActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskType, todolistAPI, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";

const initialState: TasksStateType = {};

//types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

type ActionTypeTask =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodolistsActionType

export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypeTask): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }

        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }

        case 'UPDATE -TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }

        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todoList.id]: []
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

        case 'SET-TASKS':
            return {
                ...state,
                [action.todoListId]: action.tasks
            }

        default:
            return state;
    }
}

//actions
export const removeTaskAC = (taskId: string, todoListId: string) =>
    ({type: 'REMOVE-TASK', taskId, todoListId} as const);

export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const);

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todoListId: string) =>
    ({type: 'UPDATE -TASK', taskId, model, todoListId} as const);

export const setTasksAC = (tasks: Array<TaskType>, todoListId: string) =>
    ({type: 'SET-TASKS', tasks, todoListId} as const);

//thunks
export const fetchTasksTC = (todoListId: string) => (dispatch: Dispatch<ActionTypeTask>) => {
    todolistAPI.getTasks(todoListId)
        .then((res) => {
            const tasks = res.data.items
            const action = setTasksAC(tasks, todoListId)
            dispatch(action)
        })
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionTypeTask>) => {
    todolistAPI.createTask(title, todolistId)
        .then((res) => {
            const task = res.data.data.item
            const action = addTaskAC(task)
            dispatch(action)
        })
}

export const removeTaskTC = (taskId: string, todoListId: string) => (dispatch: Dispatch<ActionTypeTask>) => {
    todolistAPI.deleteTask(todoListId, taskId)
        .then((res) => {
            const action = removeTaskAC(taskId, todoListId)
            dispatch(action)
        })

}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string) =>
    (dispatch: Dispatch<ActionTypeTask>, getState: () => AppRootStateType) => {
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

