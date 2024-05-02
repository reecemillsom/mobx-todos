import React, {FC} from "react";
import {observer} from "mobx-react";
import {Heading} from "@chakra-ui/react";
import TODOs from "../../models/TODOs/TODOs";
import {CompletedItem} from "../TODOItem/CompletedItem";
import * as S from './styles';

interface Props {
    todos: TODOs;
}

export const CompletedList: FC<Props> = observer(({todos}) => {
    return (
        <div>
            <S.CompleteListHeadingContainer>
                <Heading as="h2">Completed</Heading>
            </S.CompleteListHeadingContainer>
            <div>{todos?.completedItems.map(todo => <CompletedItem todo={todo} key={todo.id}/>)}</div>
        </div>
    )
})