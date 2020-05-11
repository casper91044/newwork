import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    let [task,setTask] = useState ([
        {id:1,title:"HTML&CSS ",isDone:true},
        {id:2,title:"JS ",isDone:true},
        {id:3,title:"ReactJS ",isDone:false},
        {id:4,title:"Rest api ",isDone:false},
        {id:5,title:"GraphQL ",isDone:false}
    ]);

    function removeTask(id:number) {
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
