import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import {fetchTasksTC} from "../tasks-reducer";



type PropType = {
    todoList: TodolistDomainType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void;
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void;
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void;
    changeFilter: (value: FilterValuesType, todoListId: string) => void;
    addTask: (title: string, todoListId: string) => void;
    removeTodoList: (todoListId: string) => void;
    changeTodoListTitle: (id: string, newTitle: string) => void;
    demo?: boolean
}

export const Todolist = React.memo(({demo = false,...props}: PropType) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(fetchTasksTC(props.todoList.id))
    }, [dispatch,props.todoList.id])

    //let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id]);

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoList.id);
    }, [props]);

    const removeTodoList = () => {
        props.removeTodoList(props.todoList.id);
    }

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todoList.id, newTitle);
    }, [props]);

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.todoList.id), [props]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.todoList.id), [props]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.todoList.id), [props]);

    let tasksForTodolist = props.tasks

    if (props.todoList.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todoList.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return (
        <div>
            <h3><EditableSpan title={props.todoList.title} onChange={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList} disabled={props.todoList.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todoList.entityStatus === 'loading'}/>
            <ul>
                {
                    tasksForTodolist.map(task =>  <Task
                            key={task.id}
                            removeTask={props.removeTask}
                            changeTaskStatus={props.changeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle}
                            task={task}
                            todoListId={props.todoList.id}
                        />
                    )
                }
            </ul>
            <div>
                <Button variant={props.todoList.filter === "all" ? "contained" : "text"}
                        onClick={onAllClickHandler}>All</Button>
                <Button color={"primary"} variant={props.todoList.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button color={"secondary"} variant={props.todoList.filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
});
