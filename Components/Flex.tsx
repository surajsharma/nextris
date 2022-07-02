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
`;

export const Next = styled.div`
    width: 70px;
    height: 70px;
    background: rgba(90, 90, 90, 0.1);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-radius: 8px;
    align-items: center;
    align-content: center;
    justify-content: center;
    border: 1px solid rgba(90, 90, 190, 0.1);
`;

export const Level = styled.div`
    width: 100px;
    height: 70px;
    display: flex;
    flex-direction: column;
    background: rgba(90, 90, 90, 0.1);
    border-radius: 8px;
    align-items: center;
    align-content: center;
    flex-direction: column;
    line-height: 0;
    border: 1px solid rgba(90, 90, 190, 0.1);
`;

export const Score = styled.div`
    width: 100px;
    height: 70px;
    display: flex;
    flex-direction: column;
    background: rgba(90, 90, 90, 0.1);
    border-radius: 8px;
    align-items: center;
    align-content: center;
    flex-direction: column;
    line-height: 0;
    border: 1px solid rgba(90, 90, 190, 0.1);
`;
