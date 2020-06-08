import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
                <button onClick={removeTodoList}>x</button>
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
                            <li className={t.isDone ? 'is-done' : ""}
                                key={t.id}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                        onChange={onChangeStatusHandler}
                                />
                                <EditableSpan title={t.title}
                                              onChange={onChangeTitleHandler}/>
                                <button onClick={ onClickHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler }>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler }>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
