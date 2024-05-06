import React, {FC, useEffect} from "react";
import {observer} from "mobx-react";
import {AlertStatus, Button, Heading, Stack, useToast} from "@chakra-ui/react";
import {SmallAddIcon} from "@chakra-ui/icons";
import {PendingItem} from "../TODOItem/PendingItem";
import {NothingToShow} from "../NothingToShow/NothingToShow";
import TODOs from "../../models/TODOs/TODOs";
import * as S from './styles';

interface Props {
    todos: TODOs;
}

export const PendingList: FC<Props> = observer(({todos}) => {
    const toast = useToast();
    const {show, message, status} = todos?.toast;

    // TODO could use a reaction function from MobX but I do not see the benefit of doing that.
    useEffect(() => {
        if (show) {
            toast({
                description: message,
                status: status as AlertStatus
            });
        }
    }, [show, message, status, toast]);

    return (
        <div>
            <S.PendingListHeadingContainer>
                <Heading as="h2">Pending</Heading>

                <Stack direction='row' spacing={4}>
                    <Button rightIcon={<SmallAddIcon/>} variant="solid" onClick={() => todos?.createTodo()}
                            isDisabled={todos?.isItemAlreadyBeingEditedOrCreated}>
                        Add TODO
                    </Button>
                </Stack>
            </S.PendingListHeadingContainer>

            {!todos?.pendingItems?.length ? (
                <NothingToShow text={"No Pending TODOs"}/>
            ) : (
                <div>{todos?.pendingItems.map(todo => (
                    <PendingItem todo={todo} removeTodo={todos?.removeTodo}
                                 accept={todos?.handleAccept}
                                 cancel={todos?.handleCancel}
                                 isItemAlreadyBeingEditedOrCreated={todos?.isItemAlreadyBeingEditedOrCreated}
                                 key={todo.id}/>)
                )}</div>
            )}
        </div>
    )
})