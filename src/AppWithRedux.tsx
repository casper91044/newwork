import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, Array<TodoListsType>>(state => state.todolists);
    const dispatch = useDispatch();

    const addTask = useCallback((title: string, todoListId: string) => {
        const action = addTaskAC(title, todoListId)
        dispatch(action);
    }, [dispatch]);

    const changeStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todoListId)
        dispatch(action);

    }, [dispatch]);

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, todoListId)
        dispatch(action);


    }, [dispatch]);

    const removeTask = useCallback((taskId: string, todoListId: string) => {
        const action = removeTaskAC(taskId, todoListId)
        dispatch(action);
    }, [dispatch]);

    const changeTodoListTitle = useCallback((todoListId: string, newTitle: string) => {
        const action = changeTodoListTitleAC(todoListId, newTitle)
        dispatch(action)

    }, [dispatch]);

    const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
        const action = changeTodoListFilterAC(value, todoListId)
        dispatch(action)

    }, [dispatch]);

    const removeTodoList = useCallback((id: string) => {
        const action = removeTodoListAC(id)
        dispatch(action)
    }, [dispatch]);

    const addTodoList = useCallback((title: string) => {
        const action = addTodoListAC(title);
        dispatch(action);
    }, [dispatch]);

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
                    {
                        todoLists.map((tl) => {
                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist title={tl.title}
                                              key={tl.id}
                                              id={tl.id}
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


export default AppWithRedux;
