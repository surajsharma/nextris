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

export const SideBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: orange;
    flex-direction: column;

    font-family: sans-serif;
    background-color: #001;
    @media only screen and (max-width: 428px) {
        flex-direction: row;
        height: 100px;
        background-color: #000;
    }
`;

export const FC = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const NextContainer = styled.div`
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-radius: 8px;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin-top: 15px;
    margin-left: 10px;
`;

export const Level = styled.div`
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    align-items: center;
    align-content: center;
    flex-direction: column;
    text-align: center;
    @media only screen and (max-width: 428px) {
        margin-top: 40px;
    }
`;

export const Score = styled.div`
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    align-items: center;
    align-content: center;
    flex-direction: column;
    text-align: center;
    @media only screen and (max-width: 428px) {
        margin-top: 40px;
    }
`;
