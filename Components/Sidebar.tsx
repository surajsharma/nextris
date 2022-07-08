import styled from "@emotion/styled";

interface SideBarProps {
    FF: boolean;
}

export const SidebarItems = styled.div<SideBarProps>`
    ${({ FF }) => FF && `margin-top:30px;`}

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 100%;

    line-height: 0;

    @media only screen and (max-width: 428px) {
        flex-direction: row;
        height: 0%;
        margin-top: -10px;
    }
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

export const NextContainer = styled.div<SideBarProps>`
    @media only screen and (max-width: 428px) {
        margin-top: 65px !important;
        ${({ FF }) =>
            FF &&
            `margin-top:40px !important;
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

export const LevelOrScore = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    text-align: center;
    margin: 15px;
    @media only screen and (max-width: 428px) {
        line-height: 0.5;
        height: 0%;
    }
`;
