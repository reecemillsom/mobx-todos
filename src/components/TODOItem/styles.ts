import styled from "styled-components";
import {IconButton} from "@chakra-ui/react";
import {listContainer} from "./listStyles";

export const TODOContainer = styled.div`
    ${listContainer};
    justify-content: space-between;
`

export const TODOContentContainer = styled.div`
    display: flex;
    justify-content: flex-start;
`;

export const TODOButtonsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

export const StateButton = styled(IconButton)`
    &:not(:last-child) {
        margin-right: 8px;
    }
`;

export const CompletedItemContainer = styled.div`
    ${listContainer};
    justify-content: flex-start;
`
