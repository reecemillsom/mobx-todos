import styled from "styled-components";
import {IconButton} from "@chakra-ui/react";

export const TODOContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 16px;
    border: 1px solid black;

    &:not(:last-child) {
        border-bottom: none;
    }
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