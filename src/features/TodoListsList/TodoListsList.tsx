import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    addTodoListTC,
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodoListTC,
    TodolistDomainType
} from "./todolists-reducer";
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./TodoList/Todolist";

export const TodoListsList: React.FC = (props) => {

    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const task = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])

    const addTask = useCallback((title: string, todoListId: string) => {
        const thunk = addTaskTC(title, todoListId)
        dispatch(thunk);
    }, [dispatch]);

    const removeTask = useCallback((taskId: string, todoListId: string,) => {
        const thunk = removeTaskTC(taskId, todoListId)
        dispatch(thunk)
    }, [dispatch]);

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todoListId: string) => {
        const thunk = updateTaskTC(taskId, {status}, todoListId)
        dispatch(thunk);

    }, [dispatch]);

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        const thunk = updateTaskTC(taskId, {title: newTitle}, todoListId)
        dispatch(thunk);
    }, [dispatch]);


    const changeTodoListTitle = useCallback((todoListId: string, newTitle: string) => {
        const thunk = changeTodoListTitleTC(todoListId, newTitle)
        dispatch(thunk)

    }, [dispatch]);

    const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
        const action = changeTodoListFilterAC(value, todoListId)
        dispatch(action)

    }, [dispatch]);

    const removeTodoList = useCallback((todoListId: string) => {
        const thunk = removeTodoListTC(todoListId)
        dispatch(thunk)
    }, [dispatch]);

    const addTodoList = useCallback((title: string) => {
        const thunk = addTodoListTC(title);
        dispatch(thunk);
    }, [dispatch]);


    return (

        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={10}>
                {
                    todoLists.map(tl => {
                        let allTodolistTasks = task[tl.id];
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist title={tl.title}
                                              key={tl.id}
                                              id={tl.id}
                                              tasks={allTodolistTasks}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              changeTaskTitle={changeTaskTitle}
                                              filter={tl.filter}
                                              removeTodoList={removeTodoList}
                                              changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>)
                    })
                }
            </Grid>

        </>)

}