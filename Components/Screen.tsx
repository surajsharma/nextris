import styled from "@emotion/styled";

export const Screen = styled.div`
    position: absolute;
    top: 0;
    overflow: hidden;
    z-index: -1;
    opacity: 0.1;
    background-image: url("starfield.gif");
    background-size: cover;
    background-color: orange;
    display: flex;
    flex-direction: column;
    filter: blur(8px);

    -webkit-filter: blur(8px);
    -webkit-animation: spin 16s linear infinite;
    -moz-animation: spin 16s linear infinite;

    animation: spin 16s linear infinite;

    @-moz-keyframes spin {
        100% {
            -moz-transform: rotate(360deg);
        }
    }

    @-webkit-keyframes spin {
        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    filter: hue-rotate(270deg);
`;
