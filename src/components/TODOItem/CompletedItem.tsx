import {FC} from "react";
import TODO from "../../models/TODO/TODO";
import * as S from './styles';

interface Props {
    todo: TODO;
}

export const CompletedItem: FC<Props> = ({todo}) => {
    return (
        <S.CompletedItemContainer>
            <span><s>{todo?.text?.original}</s></span>
        </S.CompletedItemContainer>
    );
};