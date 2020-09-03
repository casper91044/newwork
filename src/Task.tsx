import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskProps = {
    removeTask: (taskId: string, todoListId:string) => void;
    changeTaskStatus: (taskId:string,isDone: boolean, todoListId:string) => void;
    changeTaskTitle: (taskId:string,newTitle: string, todoListId:string) => void;
    task: TaskType;
    todoListId:string;
}


export const Task = React.memo((props: TaskProps) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todoListId);
    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, event.currentTarget.checked, props.todoListId);
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todoListId);
    }, [props]);
    return (
        <div className={props.task.isDone ? 'is-done' : ""}
             key={props.task.id}>
            <Checkbox checked={props.task.isDone}
                      onChange={onChangeStatusHandler}
            />
            <EditableSpan title={props.task.title}
                          onChange={onChangeTitleHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})