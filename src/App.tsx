import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    let [tasks,setTask] = useState ([
        {id:v1(),title:"HTML&CSS ",isDone:true},
        {id:v1(),title:"JS ",isDone:true},
        {id:v1(),title:"ReactJS ",isDone:false},
        {id:v1(),title:"Rest api ",isDone:false},
        {id:v1(),title:"GraphQL ",isDone:false}
    ]);

    function addTask(title:string) {
        let task = {id:v1(),title: title,isDone:false};
        let newTasks = [task, ...tasks];
        setTask(newTasks);
    }

    function removeTask(id:string) {
        let filterTask = tasks.filter(t=> t.id !=id);
        setTask(filterTask);
    }

    let [filter,setFilter] = useState <FilterValuesType>("all");

    let taskForTodolist = tasks;
    if (filter === "active") {
        taskForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        taskForTodolist = tasks.filter(t => t.isDone === true);
    }
    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }
    return (
        <div className="App">
          <Todolist title="What to Learn?"
                    tasks={taskForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}/>
        </div>
    );
}



export default App;
