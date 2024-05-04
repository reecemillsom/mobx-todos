import {FC} from "react";
import {Divider} from "@chakra-ui/react";
import * as S from './styles';

interface Props {
    text: string;
}

export const NothingToShow: FC<Props> = ({text}) => {
    return (
        <>
            <S.NothingToShow>{text}</S.NothingToShow>
            <Divider/>
        </>
    );
}