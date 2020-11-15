import React, {useReducer, useState} from 'react';
import '../app/App.css';
import {Todolist} from "../features/TodoListsList/TodoList/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, FilterValuesType,
    removeTodoListAC,
    todolistsReducer
} from "../features/TodoListsList/todolists-reducer";
import {addTaskAC, updateTaskAC,  removeTaskAC, tasksReducer} from "../features/TodoListsList/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";


export type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    function addTask(title: string, todoListId: string) {
        const action = addTaskAC({
            todoListId: todoListId,
            title: title,
            status: TaskStatuses.New,
            addedDate: "",
            deadline: "",
            description: "",
            order: 0,
            priority: 0,
            startDate: "",
            id: "id"
        });
        dispatchTask(action);
    }

    function changeStatus(taskId: string, status: TaskStatuses, todoListId: string) {
        const action = updateTaskAC(taskId, {status}, todoListId)
        dispatchTask(action);

    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        const action = updateTaskAC(taskId, {title: newTitle}, todoListId)
        dispatchTask(action);


    }

    function removeTask(taskId: string, todoListId: string) {
        const action = removeTaskAC(taskId, todoListId)
        dispatchTask(action);
    }

    function changeTodoListTitle(todoListId: string, newTitle: string) {
        const action = changeTodoListTitleAC(todoListId, newTitle)
        dispatchTodoLists(action)

    }

    function changeFilter( value: FilterValuesType, todoListId: string) {
        const action = changeTodoListFilterAC(value, todoListId)
        dispatchTodoLists(action)

    }

    let removeTodoList = (id: string) => {
        const action = removeTodoListAC(id)
        dispatchTodoLists(action)
    }

    function addTodoList(title: string) {
        const action = addTodoListAC({
            id: v1(),
            order: 0,
            addedDate: "",
            title: title
        });
        dispatchTask(action);
        dispatchTodoLists(action);
    }

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, dispatchTodoLists] = useReducer(todolistsReducer, [
        {id: todoListId1, title: "What to Learn", filter: "all",addedDate: '', order: 0},
        {id: todoListId2, title: "What to Buy", filter: "all",addedDate: '', order: 0},
    ]);

    let [tasksObj, dispatchTask] = useReducer(tasksReducer, {
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


export default AppWithReducers;
