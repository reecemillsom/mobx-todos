import {FC} from 'react';
import {observer} from "mobx-react";
import {Input} from '@chakra-ui/react';
import {CheckIcon, CloseIcon, DeleteIcon, EditIcon} from '@chakra-ui/icons';
import TODO from "../../models/TODO/TODO";
import {ItemType} from "../../models/TODOs/TODOs";
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
                    <Input placeholder="Enter TODO"
                           defaultValue={todo?.text?.original}
                           autoFocus={true}
                           onChange={(e) => todo?.setText(e?.target?.value, 'updated')}/> :
                    <span>{todo?.text?.updated || todo?.text?.original}</span>}
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