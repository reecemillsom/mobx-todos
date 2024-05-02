import {FC} from 'react';
import {observer} from "mobx-react";
import {Input} from '@chakra-ui/react';
import {CheckIcon, DeleteIcon, EditIcon} from '@chakra-ui/icons';
import TODO from "../../models/TODO/TODO";

import * as S from "./styles";

interface Props {
    todo: TODO
}

// TODO set deleted. If in edit mode, show a different item.
export const TODOItem: FC<Props> = observer(({todo}) => {
    return (
        <S.TODOContainer>
            <S.TODOContentContainer>
                {todo?.editing ? <Input placeholder="Enter TODO" value={todo?.text}
                                        onChange={(e) => todo?.setText(e?.target?.value)}/> : <span>{todo?.text}</span>}
            </S.TODOContentContainer>
            <S.TODOButtonsContainer>
                <S.StateButton aria-label="Edit" onClick={() => todo.setEditing(true)} icon={<EditIcon/>}/>
                <S.StateButton aria-label="Complete" onClick={() => todo.setCompleted()} icon={<CheckIcon/>}/>
                <S.StateButton aria-label="Delete" icon={<DeleteIcon/>}/>
            </S.TODOButtonsContainer>
        </S.TODOContainer>
    )
});