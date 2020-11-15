import React, {useState} from 'react';
import '../app/App.css';
import {Todolist} from "../features/TodoListsList/TodoList/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskPriorities, TaskStatuses, TaskType} from '../api/todolist-api'
import {FilterValuesType, TodolistDomainType} from '../features/TodoListsList/todolists-reducer'


export type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    function addTask(title: string, todoListId: string) {
        let task = {
            id: v1(), title: title, status: TaskStatuses.New, todoListId: todoListId, description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
        };
        let tasks = tasksObj[todoListId];
        let newTasks = [task, ...tasks];
        tasksObj[todoListId] = newTasks
        setTask({...tasksObj});
    }

    function changeStatus(taskId: string, status: TaskStatuses, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.status = status;
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

    function changeFilter(value: FilterValuesType, id: string) {
        let todolist = todoLists.find(tl => tl.id === id);
        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todoLists]);
        }
    }

    let removeTodoList = (id: string) => {
        let filteredTodoList = todoLists.filter(tl => tl.id !== id)
        setTodoLists(filteredTodoList);
        delete tasksObj[id];
        setTask({...tasksObj});
    }

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodolistDomainType>>([
        {id: todoListId1, title: "What to Learn", filter: "all", addedDate: '', order: 0},
        {id: todoListId2, title: "What to Buy", filter: "all", addedDate: '', order: 0},
    ]);

    let [tasksObj, setTask] = useState<TasksStateType>({
        [todoListId1]: [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: todoListId1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todoListId1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],
        [todoListId2]: [
            {
                id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: todoListId2, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'React Book', status: TaskStatuses.Completed, todoListId: todoListId2, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    });

    function addTodoList(title: string) {
        let todolist: TodolistDomainType = {
            id: v1(),
            filter: 'all',
            title: title,
            addedDate: '', order: 0
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
                            taskForTodolist = taskForTodolist.filter(t => t.status === TaskStatuses.New);
                        }
                        if (tl.filter === "completed") {
                            taskForTodolist = taskForTodolist.filter(t => t.status === TaskStatuses.Completed);
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
