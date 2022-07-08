import styled from "@emotion/styled";

export const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    color: white;
`;

export const FlexR = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    color: white;
    flex-direction: column;
    height: 100vh;
`;

export const FC = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media only screen and (max-width: 428px) {
        row-gap: 10px;
    }
`;
