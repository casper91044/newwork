import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string;
    onChange:(newValue:string) => void;
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode,setEditMode] = useState(false);
    let [title,setTitle] = useState("");
    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title)
    }
    const deActivateEditMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) =>
        setTitle(event.currentTarget.value);
    return editMode
        ? <input value={title}
                 onChange={onChangeTitleHandler}
                 onBlur={deActivateEditMode}
                 autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}