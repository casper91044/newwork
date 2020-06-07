import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import set = Reflect.set;

export type FilterValuesType = "all" | "active" | "completed";
type TodoListsType ={
    id:string,
    title:string,
    filter: FilterValuesType
}

function App() {
    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todoListId];
        let newTasks = [task, ...tasks];
        tasksObj[todoListId] = newTasks
        setTask({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTask({...tasksObj});
        }

    }


    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let filterTask = tasks.filter(t => t.id != id);
        tasksObj[todoListId] = filterTask;
        setTask({...tasksObj});
    }

    function changeFilter(value: FilterValuesType,todoListId: string) {
        let todolist = todoLists.find(tl => tl.id === todoListId);
        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todoLists]);
        }
    }

    let removeTodoList  = (todoListId:string) => {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(filteredTodoList);
        delete tasksObj[todoListId];
        setTask({...tasksObj});
    }

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists,setTodoLists]  = useState<Array<TodoListsType>> ([
        {id: todoListId1, title: "What to Learn", filter: "all"},
        {id: todoListId2, title: "What to Buy", filter: "all"},
    ]);

    let [tasksObj, setTask] = useState({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS ", isDone: true},
            {id: v1(), title: "JS ", isDone: true},
            {id: v1(), title: "ReactJS ", isDone: false},
            {id: v1(), title: "Rest api ", isDone: false},
            {id: v1(), title: "GraphQL ", isDone: false}],
        [todoListId2]: [
            {id: v1(), title: "Book ", isDone: true},
            {id: v1(), title: " Milk", isDone: true},
            {id: v1(), title: " Apple", isDone: false},
            {id: v1(), title: "Banana ", isDone: false},
            {id: v1(), title: "Cocoin ", isDone: false}],
    });

    return (
        <div className="App">
            {todoLists.map((tl) => {
                let taskForTodolist = tasksObj[tl.id];
                if (tl.filter === "active") {
                    taskForTodolist = taskForTodolist.filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    taskForTodolist = taskForTodolist.filter(t => t.isDone === true);
                }
                return <Todolist title={tl.title}
                                 key={tl.id}
                                 id={tl.id}
                                 tasks={taskForTodolist}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeTaskStatus={changeStatus}
                                 filter={tl.filter}
                                 removeTodoList={removeTodoList}
                />
            })
            }
        </div>
    );
}


export default App;
