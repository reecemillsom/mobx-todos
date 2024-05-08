import styled from "@emotion/styled";
import {IconButton} from "@chakra-ui/react";
import {listContainer} from "./listStyles";

export const TODOContainer = styled.div`
    ${listContainer};
    justify-content: space-between;
`

export const TODOContentContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 50%;

    @media screen and (min-width: 48em) {
        width: 75%;
    }
`;

export const TODOTitle = styled.span`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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

export const DesktopMenuItems = styled.div`
    display: none;
    @media screen and (min-width: 48em) {
        display: block;
    }
`;

export const MobileMenuItems = styled.div`
    display: block;

    @media screen and (min-width: 48em) {
        display: none;
    }
`;
