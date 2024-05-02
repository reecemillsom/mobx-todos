import React, {FC} from "react";
import {observer} from "mobx-react";
import {Heading} from "@chakra-ui/react";
import TODOs from "../../models/TODOs/TODOs";
import {CompletedItem} from "../TODOItem/CompletedItem";

interface Props {
    todos: TODOs;
}

export const CompletedList: FC<Props> = observer(({todos}) => {
    return (
        <div>
            <Heading as="h2" style={{marginTop: '16px', marginBottom: '16px'}}>Completed</Heading>
            <div>{todos?.completedItems.map(todo => <CompletedItem todo={todo} key={todo.id}/>)}</div>
        </div>
    )
})