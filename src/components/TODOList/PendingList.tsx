import React, {FC} from "react";
import {observer} from "mobx-react";
import {Button, Heading, Stack} from "@chakra-ui/react";
import {SmallAddIcon} from "@chakra-ui/icons";
import {TODOItem} from "../TODOItem/TODOItem";
import TODOs from "../../models/TODOs/TODOs";
import * as S from './styles';
import {NothingToShow} from "../NothingToShow/NothingToShow";

interface Props {
    todos: TODOs;
}

export const PendingList: FC<Props> = observer(({todos}) => {
    // TODO instead of TODOItem on line 27 a PendingListItem should be rendered.
    return (
        <div>
            <S.PendingListHeadingContainer>
                <Heading as="h2">Pending</Heading>

                <Stack direction='row' spacing={4}>
                    <Button rightIcon={<SmallAddIcon/>} variant="solid" onClick={() => todos?.createTodo()}>
                        Add TODO
                    </Button>
                </Stack>
            </S.PendingListHeadingContainer>

            {!todos?.pendingItems?.length ? (
                <NothingToShow text={"No Pending TODOs"}/>
            ) : (
                <div>{todos?.pendingItems.map(todo => <TODOItem todo={todo} removeTodo={todos?.removeTodo}
                                                                key={todo.id}/>)}</div>
            )}
        </div>
    )
})