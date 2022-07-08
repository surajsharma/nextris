import styled from "@emotion/styled";

export const SidebarItems = styled.div`
    ${({ FF }) => FF && `margin-top:30px;`}
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const SideBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    color: orange;

    font-family: sans-serif;
    background-color: #001;

    @media only screen and (max-width: 428px) {
        flex-direction: row;
        height: 130px;
        width: 100%;
        /* Created with https://www.css-gradient.com */
        background: #01246c;
        background: -webkit-linear-gradient(bottom, #01246c, #000000);
        background: -moz-linear-gradient(bottom, #01246c, #000000);
        background: linear-gradient(to top, #01246c, #000000);
    }
`;

export const NextContainer = styled.div`
    @media only screen and (max-width: 428px) {
        margin-top: 30px;

        ${({ FF }) =>
            FF &&
            `margin-top:0;
            -moz-transform: scale(90%);`}
    }

    width: 70px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    justify-content: center;
`;

export const Level = styled.div`
    height: 100px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    align-items: center;
    align-content: center;
    flex-direction: column;
    text-align: center;
    line-height: 1.4;
    margin: 15px;
    @media only screen and (max-width: 428px) {
        margin-top: 40px;
    }
`;

export const Score = styled.div`
    height: 100px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    align-items: center;
    align-content: center;
    flex-direction: column;
    text-align: center;
    line-height: 1.4;
    margin: 15px;
    @media only screen and (max-width: 428px) {
        margin-top: 40px;
    }
`;
