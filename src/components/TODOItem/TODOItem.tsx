import {FC} from 'react';
import {observer} from "mobx-react";
import {Input} from '@chakra-ui/react';
import {CheckIcon, CloseIcon, DeleteIcon, EditIcon} from '@chakra-ui/icons';
import TODO from "../../models/TODO/TODO";

import * as S from "./styles";

interface Props {
    todo: TODO;
    removeTodo: (id: string) => void;
}

// TODO set deleted. If in edit mode, show a different item.
// TODO change this to a PendingListItem, and render a edit item or regular item.
export const TODOItem: FC<Props> = observer(({todo, removeTodo}) => {
    return (
        <S.TODOContainer>
            <S.TODOContentContainer>
                {todo?.editing ? <Input placeholder="Enter TODO" value={todo?.text}/> : <span>{todo?.text}</span>}
            </S.TODOContentContainer>
            <S.TODOButtonsContainer>

                {!todo?.editing ? (
                    <>
                        <S.StateButton aria-label="Edit" onClick={() => todo.setEditing(true)} icon={<EditIcon/>}/>
                        <S.StateButton aria-label="Complete" onClick={() => todo.setCompleted()} icon={<CheckIcon/>}/>
                        <S.StateButton aria-label="Delete" onClick={() => removeTodo(todo?.id)} icon={<DeleteIcon/>}/>
                    </>
                ) : (
                    <>
                        <S.StateButton aria-label="Cancel" onClick={() => todo.setEditing(false)} icon={<CloseIcon/>}/>
                        <S.StateButton aria-label="Accept" icon={<CheckIcon/>}/>
                    </>
                )}
            </S.TODOButtonsContainer>
        </S.TODOContainer>
    )
});