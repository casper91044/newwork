import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
type PropType = {
    title: string;
    id:string;
    tasks: Array<TaskType>;
    removeTask: (taskId: string, todoListId:string) => void;
    changeFilter: (value: FilterValuesType,todoListId:string) => void;
    addTask: (title:string, todoListId:string) => void;
    changeTaskStatus: (taskId:string,isDone: boolean, todoListId:string) => void;
    changeTaskTitle: (taskId:string,newTitle: string, todoListId:string) => void;
    filter: FilterValuesType;
    removeTodoList:(todoListId:string) => void;
    changeTodoListTitle:(id:string,newTitle:string) => void;
}

export const Todolist = (props: PropType) => {
    const onAllClickHandler = () => props.changeFilter("all",props.id);
    const onActiveClickHandler = () => props.changeFilter("active",props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed",props.id);
    const removeTodoList = () => {
        props.removeTodoList(props.id);
    }
    const changeTodoListTitle = (newTitle:string) => {
        props.changeTodoListTitle(props.id,newTitle);
    }

    const addTask = (title:string) => {
        props.addTask(title,props.id);
    }

    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => props.removeTask(t.id,props.id);
                        const onChangeStatusHandler = (event:ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id,event.currentTarget.checked, props.id);
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id);
                        }
                        return (
                            <div className={t.isDone ? 'is-done' : ""}
                                key={t.id}>
                                <Checkbox checked={t.isDone}
                                          onChange={onChangeStatusHandler}
                                />
                                <EditableSpan title={t.title}
                                              onChange={onChangeTitleHandler}/>
                                <IconButton onClick={ onClickHandler}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        )
                    })
                }
            </ul>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"}
                        onClick={onAllClickHandler }>All</Button>
                <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler }>Active</Button>
                <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}
