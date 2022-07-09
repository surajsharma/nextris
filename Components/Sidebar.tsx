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
    line-height: 1;
    @media only screen and (max-width: 428px) {
        flex-direction: row;
        height: 0%;
        margin-top: 30px;
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
        height: 125px;
        width: 100%;
        background: #000;
        background: -webkit-linear-gradient(bottom, #01246c, #000000);
        background: -moz-linear-gradient(bottom, #01246c, #000000);
        background: linear-gradient(to top, #01246c, #000000);
    }
`;

export const NextContainer = styled.div<SideBarProps>`
    @media only screen and (max-width: 428px) {
        margin-top: 5px;
        ${({ FF }) =>
            FF &&
            `margin-top:0px !important;
            -moz-transform: scale(90%);`}
    }

    width: 68px;

    height: 100%;
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
    margin: 5px;
    color: darkgoldenrod;
    line-height: 0.7;
    height: 0%;
    @media only screen and (max-width: 428px) {
        line-height: 2;
        height: 0%;
    }
`;

export const NextText = styled.div<SideBarProps>`
color:white;
padding:10px;

    @media only screen and (max-width: 428px) {
        margin-top: -10px;
        ${({ FF }) =>
            FF &&
            `margin-top:-25px !important;
            
        `}
}
    }
`;
