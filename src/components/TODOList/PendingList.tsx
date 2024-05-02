import React, {FC} from "react";
import {observer} from "mobx-react";
import * as S from "../../AppStyles";
import {Button, Heading, Stack} from "@chakra-ui/react";
import {SmallAddIcon} from "@chakra-ui/icons";
import {TODOItem} from "../TODOItem/TODOItem";
import TODOs from "../../models/TODOs/TODOs";

interface Props {
    todos: TODOs;
}

export const PendingList: FC<Props> = observer(({todos}) => {
    return (
        <div>
            <S.AddItemContainer>
                <Heading as="h2">Pending</Heading>

                <Stack direction='row' spacing={4}>
                    <Button rightIcon={<SmallAddIcon/>} variant="solid" onClick={() => todos?.createTodo()}>
                        Add TODO
                    </Button>
                </Stack>
            </S.AddItemContainer>

            <div>{todos?.pendingItems.map(todo => <TODOItem todo={todo} key={todo.id}/>)}</div>
        </div>
    )
})