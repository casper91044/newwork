import React from "react";

type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}
type PropType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: number) => void;
    changeFilter: (value: "all" | "active" | "completed") => void;
}

export const Todolist = (props: PropType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={ () => {props.removeTask(t.id)}}>x</button>
                    </li>)
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