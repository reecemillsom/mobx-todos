import {FC} from 'react';
import {observer} from "mobx-react";
import {Input} from '@chakra-ui/react';
import {CheckIcon, CloseIcon} from '@chakra-ui/icons';
import TODO from "../../models/TODO/TODO";
import {ItemType} from "../../models/TODOs/TODOs";
import {MenuOptions} from "./MenuOptions";
import * as S from "./styles";

interface Props {
    todo: TODO;
    removeTodo: (id: string) => void;
    accept: (id: string, itemType: ItemType) => void;
    cancel: (id: string, itemType: ItemType) => void;
    isItemAlreadyBeingEditedOrCreated: boolean;
}

export const PendingItem: FC<Props> = observer(({
                                                    todo,
                                                    removeTodo,
                                                    accept,
                                                    cancel,
                                                    isItemAlreadyBeingEditedOrCreated
                                                }) => {
    const itemType = todo?.editing ? 'editing' : 'creating';

    return (
        <S.TODOContainer>
            <S.TODOContentContainer>
                {(todo?.editing || todo?.creating) ?
                    <Input placeholder="Enter Title"
                           defaultValue={todo?.text?.original}
                           autoFocus={true}
                           onFocus={(e) => todo?.setText(e?.target?.value, 'updated')}
                           onChange={(e) => todo?.setText(e?.target?.value, 'updated')}/> :
                    <S.TODOTitle>{todo?.text?.original}</S.TODOTitle>}
            </S.TODOContentContainer>

            <S.TODOButtonsContainer>
                {(todo?.creating || todo?.editing) ? (
                    <>
                        <S.StateButton aria-label="Cancel" title="Cancel"
                                       onClick={() => cancel(todo?.id, itemType)}
                                       icon={<CloseIcon/>}/>
                        <S.StateButton aria-label="Accept" title="Accept"
                                       onClick={() => accept(todo?.id, itemType)}
                                       icon={<CheckIcon/>}/>
                    </>
                ) : (
                    <>
                        <MenuOptions
                            todoId={todo?.id}
                            setEditing={todo?.setEditing}
                            setCompleted={todo?.setCompleted}
                            removeTodo={removeTodo}
                            itemBeingEditedOrCreated={isItemAlreadyBeingEditedOrCreated}
                        />
                    </>
                )}
            </S.TODOButtonsContainer>
        </S.TODOContainer>
    )
});