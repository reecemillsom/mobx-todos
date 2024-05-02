import React, {FC} from "react";
import {observer} from "mobx-react";
import TODOs from "../../models/TODOs/TODOs";
import {PendingList} from "./PendingList";
import {CompletedList} from "./CompletedList";

interface Props {
    todos: TODOs;
}

export const TODOList: FC<Props> = observer(({todos}) => {
    return (
        <>
            <PendingList todos={todos}/>

            <CompletedList todos={todos}/>
        </>
    );
});