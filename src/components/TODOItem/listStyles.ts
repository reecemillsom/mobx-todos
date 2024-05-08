import {css} from "@emotion/react";

export const listContainer = css`
    display: flex;
    align-items: center;
    padding: 16px;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-top: 1px solid black;

    &:last-child {
        border-bottom: 1px solid black;
    }
`;