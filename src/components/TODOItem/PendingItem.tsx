import {FC} from 'react';
import {observer} from "mobx-react";
import {Input} from '@chakra-ui/react';
import {CheckIcon, CloseIcon, DeleteIcon, EditIcon} from '@chakra-ui/icons';
import TODO from "../../models/TODO/TODO";

import * as S from "./styles";

interface Props {
    todo: TODO;
    removeTodo: (id: string) => void;
    accept: (id: string, itemType: 'creating' | 'editing') => void;
    cancel: (id: string, itemType: 'creating' | 'editing') => void;
    isItemAlreadyBeingEditedOrCreated: boolean;
}

export const PendingItem: FC<Props> = observer(({
                                                    todo,
                                                    removeTodo,
                                                    accept,
                                                    cancel,
                                                    isItemAlreadyBeingEditedOrCreated
                                                }) => {
    return (
        <S.TODOContainer>
            <S.TODOContentContainer>
                {(todo?.editing || todo?.creating) ?
                    <Input placeholder="Enter TODO" value={todo?.text?.updated || todo?.text?.original}
                           onChange={(e) => todo?.setText(e?.target?.value, 'updated')}/> :
                    <span>{todo?.text?.updated || todo?.text?.original}</span>}
            </S.TODOContentContainer>

            <S.TODOButtonsContainer>
                {(todo?.creating || todo?.editing) ? (
                    <>
                        <S.StateButton aria-label="Cancel" title="Cancel"
                                       onClick={() => cancel(todo?.id, todo?.editing ? 'editing' : 'creating')}
                                       icon={<CloseIcon/>}/>
                        <S.StateButton aria-label="Accept" title="Accept"
                                       onClick={() => accept(todo?.id, todo?.editing ? 'editing' : 'creating')}
                                       icon={<CheckIcon/>}/>
                    </>
                ) : (
                    <>
                        <S.StateButton aria-label="Edit" title="Edit" onClick={() => todo?.setEditing(true)}
                                       icon={<EditIcon/>} isDisabled={isItemAlreadyBeingEditedOrCreated}/>
                        <S.StateButton aria-label="Complete" title="Complete" onClick={() => todo?.setCompleted()}
                                       icon={<CheckIcon/>}/>
                        <S.StateButton aria-label="Delete" title="Delete" onClick={() => removeTodo(todo?.id)}
                                       icon={<DeleteIcon/>}/>
                    </>
                )}
            </S.TODOButtonsContainer>
        </S.TODOContainer>
    )
});