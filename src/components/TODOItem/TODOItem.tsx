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

export const TODOItem: FC<Props> = observer(({todo, removeTodo}) => {
    return (
        <S.TODOContainer>
            <S.TODOContentContainer>
                {todo?.editing ? <Input placeholder="Enter TODO" value={todo?.text?.updated || todo?.text?.original}
                                        onChange={(e) => todo?.setText(e?.target?.value, 'updated')}/> :
                    <span>{todo?.text?.updated || todo?.text?.original}</span>}
            </S.TODOContentContainer>
            <S.TODOButtonsContainer>

                {!todo?.editing ? (
                    <>
                        <S.StateButton aria-label="Edit" title="Edit" onClick={() => todo?.setEditing(true)}
                                       icon={<EditIcon/>}/>
                        <S.StateButton aria-label="Complete" title="Complete" onClick={() => todo?.setCompleted()}
                                       icon={<CheckIcon/>}/>
                        <S.StateButton aria-label="Delete" title="Delete" onClick={() => removeTodo(todo?.id)}
                                       icon={<DeleteIcon/>}/>
                    </>
                ) : (
                    <>
                        <S.StateButton aria-label="Cancel" title="Cancel" onClick={() => todo?.cancelEdit()}
                                       icon={<CloseIcon/>}/>
                        <S.StateButton aria-label="Accept" title="Accept" onClick={() => todo?.acceptEdit()}
                                       icon={<CheckIcon/>}/>
                    </>
                )}
            </S.TODOButtonsContainer>
        </S.TODOContainer>
    )
});