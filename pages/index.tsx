import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";

import {
    collisionB,
    collisionT,
    COLS,
    createAndFillTwoDArray,
    FPS,
    getNextCur,
    ROWS
} from "../Constants/utils";

// Pieces
import { I, J, L, O, S, T, Z } from "../Constants/pieces";

// Components
import {
    Container,
    FC,
    Flex,
    Level,
    Link,
    Matrix,
    Next,
    Score,
    Screen
} from "../Components";

// Interfaces and Types
import {
    moveDown,
    moveLeft,
    moveRight,
    moveUp,
    rotate
} from "../Constants/moves";

let pause = false;
let gameOver = false;
let cur: any = null;
let nextCur: any = null;

const Home: NextPage = () => {
    const requestRef = useRef<any>();
    const previousTimeRef = useRef<any>();

    const [drawEmpty, setDrawEmpty] = useState(false);

    const [score, setScore] = useState(0);
    const [m, setM] = useState(
        createAndFillTwoDArray({ rows: ROWS, cols: COLS, defaultValue: 0 })
    );

    const resetMatrix = () => {
        // resets the matrix for a new game, sets new current/next pieces
        const newM = [...m];

        if (!newM) return;

        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                if (newM[i][j] !== 0) {
                    newM[i][j] = 0;
                }
            }
        }
        piecePipeLine();
        setM(newM);
    };

    const clearSetLines = () => {
        let rowsToClear: any = [];
        let newM: any = [...m];

        for (let i = 0; i < ROWS; i++) {
            if (m[i].every((cell: any) => cell === 1)) {
                rowsToClear.push(i);
            }
        }

        while (rowsToClear.length) {
            let rowToPop = rowsToClear.pop();
            let rowsAbove: any = [];
            let rowsBelow: any = [];

            for (let i = 0; i < rowToPop; i++) {
                rowsAbove.push(m[i]);
            }

            for (let i = rowToPop; i < ROWS - 1; i++) {
                rowsBelow.push(m[i]);
            }

            for (let i = 0; i < ROWS; i++) {
                if (i === rowToPop) {
                    for (let j = 0; j < COLS; j++) {
                        if (newM[i][j] === 1) {
                            newM[i][j] = 0;
                        }
                    }

                    for (let i = 0; i < rowsAbove.length; i++) {
                        console.log(i);
                        newM[i] = rowsAbove[i];
                    }

                    const pad = ROWS + 1 - newM.length;

                    for (let i = 0; i < pad; i++) {
                        let row = [];
                        for (let j = 0; j < COLS; j++) {
                            row.push(0);
                        }
                        newM.unshift(row);
                        newM.pop();
                    }
                }
            }
        }
        console.log(newM, "⚗️");
        setM(newM);
        return;
    };

    const setFixedPieces = () => {
        // updates matrix to reprsenty settled pieces

        const newM = [...m];

        if (!newM) return;

        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                if (newM[i][j] !== 0) {
                    newM[i][j] = 1;
                }
            }
        }
        setM(newM);
    };

    const updateCurPiece = () => {
        // updates the position of current piece

        if (gameOver || !m.length || collisionT(m)) return;

        if (!cur) piecePipeLine();

        if (collisionB(m)) {
            setFixedPieces();
            piecePipeLine();
            return;
        } else {
            console.log("moving down", m);
            moveDown(m, cur, updateMatrix);
            return;
        }

        // console.log("move piece down", cur?.name, cur?.posX, cur?.posY);
    };

    const updateMatrix = () => {
        //inserts current piece @ location

        if (gameOver || !cur || !m.length) return;

        console.log("update matrix", m);

        const newM: any = [...m];

        const pieceMap: any = {
            T: T(cur.posX, cur.posY, cur.rot),
            O: O(cur.posX, cur.posY, cur.rot),
            L: L(cur.posX, cur.posY, cur.rot),
            J: J(cur.posX, cur.posY, cur.rot),
            I: I(cur.posX, cur.posY, cur.rot),
            S: S(cur.posX, cur.posY, cur.rot),
            Z: Z(cur.posX, cur.posY, cur.rot)
        };

        for (let i = 0; i < COLS; i++) {
            for (let j = 0; j < ROWS; j++) {
                if (newM[j][i] !== 1) {
                    //cell is not settled, either current piece or empty
                    let piece = pieceMap[cur.name];
                    if (
                        JSON.stringify(piece).indexOf(JSON.stringify([i, j])) !=
                        -1
                    ) {
                        // show the piece
                        newM[j][i] = cur.name;
                    } else {
                        //clear piece trail
                        newM[j][i] = 0;
                    }
                }
            }
        }

        console.log(
            "🚀 ~ file: index.tsx ~ line 208 ~ updateMatrix ~ newM",
            newM
        );
        setM(newM);
    };

    const piecePipeLine = () => {
        // sets current and next pieces

        const c = getNextCur();
        cur = c;
        const nc = getNextCur();
        nextCur = nc;
        console.log("next pieces set ", cur.name, nextCur.name);
        return;
    };

    const newGame = () => {
        console.log("🚽");
        return resetMatrix();
        // return piecePipeLine();
    };

    const gameLoop = (time: any) => {
        //TODO: optimise this https://gist.github.com/elundmark/38d3596a883521cb24f5
        setTimeout(() => {
            if (previousTimeRef.current != undefined) {
                if (!gameOver) {
                    if (!pause) {
                        updateCurPiece();
                        clearSetLines();
                    } else {
                        // console.log("game paused");
                    }
                }
            }
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(gameLoop);
        }, 1000 / FPS);
    };

    const handleKeyboard = (event: any) => {
        console.log(event.key);

        if (event.key === " ") {
            rotate(m, cur, updateMatrix);
        }

        if (event.key === "ArrowLeft") {
            moveLeft(m, cur, updateMatrix);
        }

        if (event.key === "ArrowRight") {
            moveRight(m, cur, updateMatrix);
        }

        if (event.key === "ArrowDown") {
            moveDown(m, cur, updateMatrix);
        }

        if (event.key === "ArrowUp") {
            rotate(m, cur, updateMatrix);
        }

        if (event.key === "p" || event.key === "P") {
            pause = !pause;
        }
    };

    useEffect(() => {
        console.log("render");
        requestRef.current = requestAnimationFrame(gameLoop);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    return (
        <div className="App" onKeyDown={handleKeyboard} tabIndex={-1}>
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
                    <button onClick={() => (pause = !pause)}>Pause</button>
                    <input
                        type={"checkbox"}
                        onChange={() => setDrawEmpty(!drawEmpty)}
                        checked={drawEmpty}
                    />
                    <button
                        onClick={() => {
                            console.log(m, cur, nextCur);
                        }}
                    >
                        SCORE:500
                    </button>
                </Flex>
                {<Matrix matrix={m} drawEmpty={drawEmpty} />}
                <Flex>
                    <button onClick={() => rotate(m, cur, updateMatrix)}>
                        Rotate
                    </button>
                    <button onClick={() => moveLeft(m, cur, updateMatrix)}>
                        Left
                    </button>
                    <button onClick={() => moveRight(m, cur, updateMatrix)}>
                        Right
                    </button>
                    <button onClick={() => moveDown(m, cur, updateMatrix)}>
                        Down
                    </button>
                    <button onClick={() => moveUp(m, cur, updateMatrix)}>
                        Up
                    </button>
                </Flex>
            </Container>

            <hr />
            <Container>
                <Flex>
                    <Level>
                        <p>{FPS}</p>
                        <p>Level</p>
                    </Level>
                    <Next>{nextCur?.name}</Next>
                    <Score>
                        <p>{score}</p>
                        <p>Score</p>
                    </Score>
                </Flex>
            </Container>
        </div>
    );
};

export default Home;
