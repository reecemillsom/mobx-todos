import {FC} from "react";
import * as S from './styles';
import TODO from "../../models/TODO/TODO";

interface Props {
    todo: TODO;
}

export const CompletedItem: FC<Props> = ({todo}) => {
    return (
        <S.CompletedItemContainer>
            <span><s>{todo?.text}</s></span>
        </S.CompletedItemContainer>
    );
};