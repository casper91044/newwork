import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";

type TaskProps = {
    removeTask: (taskId: string, todoListId:string) => void;
    changeTaskStatus: (taskId:string,status: TaskStatuses, todoListId:string) => void;
    changeTaskTitle: (taskId:string,newTitle: string, todoListId:string) => void;
    task: TaskType;
    todoListId:string;
}


export const Task = React.memo((props: TaskProps) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todoListId);
    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id,
            event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
            props.todoListId);
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todoListId);
    }, [props]);
    return (
        <div className={props.task.status === TaskStatuses.Completed ? 'is-done' : ""}
             key={props.task.id}>
            <Checkbox checked={props.task.status === TaskStatuses.Completed}
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