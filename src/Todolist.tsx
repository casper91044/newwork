import React, {useState} from "react";
import {FilterValuesType} from "./App";

type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
type PropType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: string) => void;
    changeFilter: (value: FilterValuesType) => void;
    addTask: (title:string) => void;
}

export const Todolist = (props: PropType) => {
    let [title,setTitle] = useState("");

    function addTask(title:string) {
        props.addTask(title);
        setTitle("");
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={ (event) => {setTitle(event.currentTarget.value) } }
                    onKeyPress={ (event) => {if (event.charCode === 13) {addTask(title)} } }
                />
                <button onClick={() => addTask(title)}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={ () => {props.removeTask(t.id)}}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={ () => {props.changeFilter("all") } }>All</button>
                <button onClick={ () => {props.changeFilter("active") } }>Active</button>
                <button onClick={ () => {props.changeFilter("completed") } }>Completed</button>
            </div>
        </div>
    )
}