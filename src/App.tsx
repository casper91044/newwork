import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = "all" | "active" | "completed";
type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
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

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
            setTask({...tasksObj});
        }

    }

    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let filterTask = tasks.filter(t => t.id != id);
        tasksObj[todoListId] = filterTask;
        setTask({...tasksObj});
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const todolist = todoLists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = newTitle;
            setTodoLists([...todoLists]);
        }
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todolist = todoLists.find(tl => tl.id === todoListId);
        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todoLists]);
        }
    }

    let removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(filteredTodoList);
        delete tasksObj[todoListId];
        setTask({...tasksObj});
    }

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListId1, title: "What to Learn", filter: "all"},
        {id: todoListId2, title: "What to Buy", filter: "all"},
    ]);

    let [tasksObj, setTask] = useState<TasksStateType>({
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

    function addTodoList(title: string) {
        let todolist: TodoListsType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodoLists([todolist, ...todoLists]);
        setTask({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar>
                    <IconButton>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        News
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={10}>
                    {todoLists.map((tl) => {
                        let taskForTodolist = tasksObj[tl.id];
                        if (tl.filter === "active") {
                            taskForTodolist = taskForTodolist.filter(t => t.isDone === false);
                        }
                        if (tl.filter === "completed") {
                            taskForTodolist = taskForTodolist.filter(t => t.isDone === true);
                        }
                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist title={tl.title}
                                          key={tl.id}
                                          id={tl.id}
                                          tasks={taskForTodolist}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeTaskStatus={changeStatus}
                                          changeTaskTitle={changeTaskTitle}
                                          filter={tl.filter}
                                          removeTodoList={removeTodoList}
                                          changeTodoListTitle={changeTodoListTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}


export default App;
