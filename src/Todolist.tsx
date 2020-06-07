import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

type TaskType = {
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
    filter: FilterValuesType;
    removeTodoList:(todoListId:string) => void;
}

export const Todolist = (props: PropType) => {
    let [title,setTitle] = useState("");
    let [error,setError] = useState<string|null >(null);


    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event :KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all",props.id);
    const onActiveClickHandler = () => props.changeFilter("active",props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed",props.id);
    const removeTodoList = () => {
        props.removeTodoList(props.id);
    }
    const addTask = () => {
        if(title.trim() !== "") {
            props.addTask(title.trim(),props.id);
            setTitle("");
        }  else {
        setError("Title is required");
    }

    }
    return (
        <div>
            <h3>{props.title} <button onClick={removeTodoList}>x</button></h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? "error" : "" }
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => props.removeTask(t.id,props.id);
                        const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id,event.currentTarget.checked, props.id);
                        }
                        return (
                            <li className={t.isDone ? 'is-done' : ""}
                                key={t.id}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                        onChange={onChangeHandler}
                                />
                                <span>{t.title}</span>
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