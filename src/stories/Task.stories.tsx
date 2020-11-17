import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "../features/TodoListsList/TodoList/Task/Task";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

export default {
    title: 'Task Stories',
    component: Task
}

const removeTaskCallback = action('Remove Button inside Task clicked');
const changeTaskStatusCallback = action('Status changed inside Task');
const changeTaskTitleCallback = action('Title changed inside Task');

export const TaskBaseExample = () => {
    return (
        <>
            <Task removeTask={removeTaskCallback}
                  changeTaskStatus={changeTaskStatusCallback}
                  changeTaskTitle={changeTaskTitleCallback}
                  task={{id: "1", status:TaskStatuses.Completed, title: "HTML",  todoListId: "todoListId1", description: '',
                      startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}}
                  todoListId={"todoListId1"}
            />
            <Task removeTask={removeTaskCallback}
                  changeTaskStatus={changeTaskStatusCallback}
                  changeTaskTitle={changeTaskTitleCallback}
                  task={{id: "2", status:TaskStatuses.New, title: "CSS", todoListId: "todoListId1", description: '',
                      startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}}
                  todoListId={"todoListId2"}
            />
        </>
    )
}
