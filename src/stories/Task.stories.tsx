import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

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
                  task={{id: "1", isDone: true, title: "HTML"}}
                  todoListId={"todoListId1"}
            />
            <Task removeTask={removeTaskCallback}
                  changeTaskStatus={changeTaskStatusCallback}
                  changeTaskTitle={changeTaskTitleCallback}
                  task={{id: "2", isDone: false, title: "CSS"}}
                  todoListId={"todoListId2"}
            />
        </>
    )
}
