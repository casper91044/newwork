import React from "react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../EditableSpan";

export default {
    title: 'EditableSpan Stories',
    component: EditableSpan
}

export const EditableSpanBaseExample = (props: any) =>
    <EditableSpan title={"Start title"} onChange={action("Change title")} />;
