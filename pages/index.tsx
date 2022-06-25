import styled from "@emotion/styled";
import type { NextPage } from "next";

import { useEffect, useState } from "react";
import {
    collisionB,
    collisionL,
    collisionR,
    collisionT,
    COLS,
    createAndFillTwoDArray,
    INIT_LOC,
    ROWS,
    FPS,
} from "./utils";

// Pieces
import { T, I, S, Z, L, J, O } from "./pieces";

// Components
import { Matrix } from "./Components/Matrix";

// Interfaces and Types
import { Cur } from "./interfaces";

const Screen = styled.div`
    width: 220vw;
    height: 210vh;
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

const Container = styled.div`
    position: absolute;
    display: flex;
    align-content: center;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    border: 1px solid rgba(20, 20, 20, 0.69);
    background-color: transparent;
    border-radius: 10px;
    z-index: 999;
    top: 14vh;
`;

const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const FC = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Link = styled.a`
    color: gray;
    font-size: 0.3em;
`;

const Home: NextPage = () => {
    const [gameOver, setGameOver] = useState(false);
    const [checked, setChecked] = useState<any>([]);
    const [drawEmpty, setDrawEmpty] = useState(true);

    const [m, setM] = useState(
        createAndFillTwoDArray({
            rows: ROWS,
            cols: COLS,
            defaultValue: 0,
        })
    );

    const [cur, setCur] = useState<Cur>({
        name: "T",
        posX: INIT_LOC[0],
        posY: INIT_LOC[1],
        rot: 0,
    });

    const resetMatrix = () => {
        console.log("reset");

        let newM = createAndFillTwoDArray({
            rows: ROWS,
            cols: COLS,
            defaultValue: 0,
        });
        setM(newM);
    };

    const updateCurPiece = () => {
        console.log("move piece down", cur.posX);
        moveDown();
    };

    const updateMatrix = () => {
        console.log("update matrix");
        if (gameOver || !cur) return;

        const newM = [...m];
        const pieceMap: any = {
            T: T(cur.posX, cur.posY, cur.rot),
        };

        //draw current piece @ location
        for (var i = 0; i < ROWS; i++) {
            for (var j = 0; j < COLS; j++) {
                let piece = pieceMap[cur.name];
                if (JSON.stringify(piece).includes(JSON.stringify([i, j]))) {
                    newM[i][j] = cur.name;
                } else {
                    newM[i][j] = 0;
                }
            }
        }
        setM(newM);
        // updateCurPiece();
    };

    const newGame = () => {
        resetMatrix();
        setGameOver(false);
        setCur({
            name: "T",
            posX: INIT_LOC[0],
            posY: INIT_LOC[1],
            rot: 0,
        });
        setChecked([]);
        updateMatrix();
    };

    const moveDown = () => {
        if (collisionB(m)) {
            let n = cur;
            n.posX = (n.posX + 1) % ROWS;
            setCur(n);
            updateMatrix();
            console.log("moved down", cur, n);
        }
    };

    const moveUp = () => {
        if (collisionT(m)) {
            let n = cur;
            n.posX = (n.posX - 1) % ROWS;
            setCur(n);
            updateMatrix();
            console.log("moved up", cur, n);
        }
    };

    const moveLeft = () => {
        if (collisionL(m)) {
            let n = cur;
            n.posY = n.posY - 1;
            setCur(n);
            updateMatrix();
            console.log("moved left", cur, n);
        }
    };

    const moveRight = () => {
        if (collisionR(m)) {
            let n = cur;
            n.posY = (n.posY + 1) % COLS;
            setCur(n);
            updateMatrix();
            console.log("moved right", cur, n);
        }
    };

    const rotate = () => {
        let n = cur;
        let r = (cur.rot + 90) % 360;
        n.rot = r;
        setCur(n);
        updateMatrix();
        console.log("rotated", cur);
    };

    useEffect(() => {
        console.log("m updated");
    }, [m]);

    //game over
    useEffect(() => {
        if (gameOver) {
            console.log("game Over");
        }
    }, [gameOver]);

    //Timer/Loop
    useEffect(() => {
        //TODO: keyboard
        //TODO: check bounds
        //TODO: freeze set pieces
        //TODO: clear rows, reset m
        //TODO: check game over
        let timer = requestAnimationFrame(function gameLoop(timestamp) {
            newGame();
            updateMatrix();
            updateCurPiece();
            setTimeout(() => {
                if (gameOver) requestAnimationFrame(gameLoop);
            }, 1000 / FPS);
        });
    }, []);

    return (
        <div className="App">
            <FC>
                <h1>
                    <i>
                        selectris<sup>TM</sup>
                    </i>
                    <br />
                    <Link>ゼロイーブン</Link>
                </h1>
            </FC>
            <Container>
                <Flex>
                    <button onClick={newGame}>New Game</button>
                    <button onClick={resetMatrix}>Reset</button>
                    <input
                        type={"checkbox"}
                        onClick={() => {
                            setDrawEmpty(!drawEmpty);
                        }}
                    />
                    <button
                        onClick={() => {
                            console.log(m, cur);
                        }}
                    >
                        SCORE:500
                    </button>
                </Flex>
                <Matrix matrix={m} drawEmpty={drawEmpty} />
                <Flex>
                    <button onClick={rotate}>Rotate</button>
                    <button onClick={moveLeft}>Left</button>
                    <button onClick={moveRight}>Right</button>
                    <button onClick={moveDown}>Down</button>
                    <button onClick={moveUp}>Up</button>
                </Flex>
            </Container>
            <Screen></Screen>
        </div>
    );
};

export default Home;
