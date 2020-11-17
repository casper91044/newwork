import React from "react";
import {action} from "@storybook/addon-actions";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";

export default {
    title: 'AddItemForm Stories',
    component: AddItemForm
}

export const AddItemFormBaseExample = (props: any) =>
    <AddItemForm addItem={action('AddItemForm clicked')}/>;

export const AddItemFormDisabledExample = (props: any) =>
    <AddItemForm disabled={true} addItem={action('AddItemForm clicked')}/>;
