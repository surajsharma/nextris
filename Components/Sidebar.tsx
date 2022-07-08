import styled from "@emotion/styled";

interface SideBarProps {
    FF: boolean;
}

export const SidebarItems = styled.div<SideBarProps>`
    ${({ FF }) => FF && `margin-top:30px;`}

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    line-height: 0;
    @media only screen and (max-width: 428px) {
        flex-direction: row;
        height: 0%;
    }
`;

export const SideBar = styled.div`
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    color: orange;
    font-family: sans-serif;
    @media only screen and (max-width: 428px) {
        flex-direction: row;
        height: 100px;
        width: 100%;
        background: #000;
        background: -webkit-linear-gradient(bottom, #01246c, #000000);
        background: -moz-linear-gradient(bottom, #01246c, #000000);
        background: linear-gradient(to top, #01246c, #000000);
    }
`;

export const NextContainer = styled.div<SideBarProps>`
    @media only screen and (max-width: 428px) {
        margin-top: -20px;
        ${({ FF }) =>
            FF &&
            `margin-top:15px !important;
            -moz-transform: scale(90%);`}
    }

    width: 70px;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    justify-content: center;
`;

export const LevelOrScore = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    text-align: center;
    margin: 15px;
    color: darkgoldenrod;

    width: 100%;
    height: 100%;
    @media only screen and (max-width: 428px) {
        line-height: 0;
        height: 0%;
        width: 100%;
    }
`;
