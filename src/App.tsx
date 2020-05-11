import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

function App() {
    let [task,setTask] = useState ([
        {id:v1(),title:"HTML&CSS ",isDone:true},
        {id:v1(),title:"JS ",isDone:true},
        {id:v1(),title:"ReactJS ",isDone:false},
        {id:v1(),title:"Rest api ",isDone:false},
        {id:v1(),title:"GraphQL ",isDone:false}
    ]);

    function removeTask(id:string) {
        let filterTask = task.filter(t=> t.id !=id);
        setTask(filterTask);
    }

    let [filter,setFilter] = useState <"all" | "active" | "completed">("all");
    let taskForTodolist = task;
    if (filter === "active") {
        taskForTodolist = task.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        taskForTodolist = task.filter(t => t.isDone === true);
    }
    function changeFilter(value: "all" | "active" | "completed") {
        setFilter(value);
    }
    return (
        <div className="App">
          <Todolist title="What to Learn?"
                    tasks={taskForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
