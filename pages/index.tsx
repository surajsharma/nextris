import type { NextPage } from "next";

import { useEffect, useState } from "react";
import { COLS, createAndFillTwoDArray, FPS, INIT_LOC, ROWS } from "./utils";

// Pieces
import { T, O, L, J, I, S, Z } from "./pieces";

// Components
import { Container, FC, Flex, Link, Matrix, Screen } from "./Components";

// Interfaces and Types
import { Cur } from "./interfaces";
import { moveDown, moveLeft, moveRight, moveUp, rotate } from "./moves";

const Home: NextPage = () => {
    const [gameOver, setGameOver] = useState(false);
    const [checked, setChecked] = useState<any>([]);
    const [drawEmpty, setDrawEmpty] = useState(false);

    const [m, setM] = useState(
        createAndFillTwoDArray({
            rows: ROWS,
            cols: COLS,
            defaultValue: 0
        })
    );

    const [cur, setCur] = useState<Cur>({
        name: "Z",
        posX: INIT_LOC[0],
        posY: INIT_LOC[1],
        rot: 0
    });

    const resetMatrix = () => {
        console.log("reset");

        let newM = createAndFillTwoDArray({
            rows: ROWS,
            cols: COLS,
            defaultValue: 0
        });

        setM(newM);
    };

    const updateCurPiece = () => {
        console.log("move piece down", cur.posX);
        moveDown(m, setCur, cur, updateMatrix);
    };

    const updateMatrix = () => {
        console.log("update matrix");
        if (gameOver || !cur) return;

        const newM = [...m];
        const pieceMap: any = {
            T: T(cur.posX, cur.posY, cur.rot),
            O: O(cur.posX, cur.posY, cur.rot),
            L: L(cur.posX, cur.posY, cur.rot),
            J: J(cur.posX, cur.posY, cur.rot),
            I: I(cur.posX, cur.posY, cur.rot),
            S: S(cur.posX, cur.posY, cur.rot),
            Z: Z(cur.posX, cur.posY, cur.rot)
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
    };

    const newGame = () => {
        resetMatrix();
        updateMatrix();
    };

    //Timer/Loop
    useEffect(() => {
        //TODO: pieces
        //TODO: keyboard
        newGame();
        let timer = requestAnimationFrame(function gameLoop(timestamp) {
            setTimeout(() => {
                //TODO: check game over
                //TODO: move cur piece down
                //TODO: check cur piece settled
                //TODO: new cur
                //TODO: set settled pieces
                //TODO: clear filled rows
                updateCurPiece();
                if (gameOver) requestAnimationFrame(gameLoop);
            }, 1000 / FPS);
        });
    }, []);

    return (
        <div className="App">
            <Screen></Screen>
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
                        onChange={() => {
                            setDrawEmpty(!drawEmpty);
                        }}
                        checked={drawEmpty}
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
                    <button
                        onClick={() => rotate(m, setCur, cur, updateMatrix)}
                    >
                        Rotate
                    </button>
                    <button
                        onClick={() => moveLeft(m, setCur, cur, updateMatrix)}
                    >
                        Left
                    </button>
                    <button
                        onClick={() => moveRight(m, setCur, cur, updateMatrix)}
                    >
                        Right
                    </button>
                    <button
                        onClick={() => moveDown(m, setCur, cur, updateMatrix)}
                    >
                        Down
                    </button>
                    <button
                        onClick={() => moveUp(m, setCur, cur, updateMatrix)}
                    >
                        Up
                    </button>
                </Flex>
            </Container>
        </div>
    );
};

export default Home;
