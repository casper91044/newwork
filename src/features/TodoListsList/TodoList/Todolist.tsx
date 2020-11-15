import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {FilterValuesType} from "../todolists-reducer";
import {fetchTasksTC} from "../tasks-reducer";



type PropType = {
    title: string;
    id: string;
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void;
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void;
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void;
    changeFilter: (value: FilterValuesType, todoListId: string) => void;
    addTask: (title: string, todoListId: string) => void;
    filter: FilterValuesType;
    removeTodoList: (todoListId: string) => void;
    changeTodoListTitle: (id: string, newTitle: string) => void;
}

export const Todolist = React.memo((props: PropType) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [dispatch,props.id])

    //let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id]);

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props]);

    const removeTodoList = () => {
        props.removeTodoList(props.id);
    }

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle);
    }, [props]);

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props]);

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    tasksForTodolist.map(task =>  <Task
                            key={task.id}
                            removeTask={props.removeTask}
                            changeTaskStatus={props.changeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle}
                            task={task}
                            todoListId={props.id}
                        />
                    )
                }
            </ul>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"}
                        onClick={onAllClickHandler}>All</Button>
                <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
});
