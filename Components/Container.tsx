import styled from "@emotion/styled";

export const OuterContainer = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center; /* align items vertically, in this case */
    align-items: center; /* align items horizontally, in this case */

    @media only screen and (max-height: 568px) {
        display: none;
    }

    @media only screen and (max-width: 316px) {
        display: none;
    }

    @media only screen and (max-width: 428px) {
        margin-top: -20px;
    }
`;

export const Container = styled.div`
    border-radius: 8px;
    border: 1px solid rgba(90, 90, 190, 0.2);
    background-color: black;
    @media only screen and (max-height: 568px) {
        margin-top: 10px;
        height: 80vh;
    }
`;

export const GameContainer = styled.div`
    display: flex;
    align-content: center;
    justify-content: space-evenly;
    width: 100%;
    @media only screen and (max-width: 428px) {
        flex-direction: column;
    }
`;

export const MContainer = styled.div`
    background-color: rgba(20, 20, 120, 0.3);
    @media only screen and (max-width: 428px) {
        background-color: rgba(20, 20, 120, 0);
    }
`;

export const Unsupported = styled.div``;
