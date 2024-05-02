import styled, {css} from 'styled-components';

const headingContainerStyles = css`
    display: flex;
    margin-bottom: 16px;
`;

export const PendingListHeadingContainer = styled.div`
    ${headingContainerStyles};
    justify-content: space-between;
`;

export const CompleteListHeadingContainer = styled.div`
    ${headingContainerStyles};
    justify-content: flex-start;
    margin-top: 16px;
`;