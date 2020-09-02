import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
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
        const action = addTaskAC(title, todoListId)
        dispatchTask(action);
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        const action = changeTaskStatusAC(taskId, isDone, todoListId)
        dispatchTask(action);

    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        const action = changeTaskTitleAC(taskId, newTitle, todoListId)
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

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, dispatchTodoLists] = useReducer(todolistsReducer, [
        {id: todoListId1, title: "What to Learn", filter: "all"},
        {id: todoListId2, title: "What to Buy", filter: "all"},
    ]);

    let [tasksObj, dispatchTask] = useReducer(tasksReducer, {
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
        const action = addTodoListAC(title);
        dispatchTask(action);
        dispatchTodoLists(action);
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


export default AppWithReducers;
