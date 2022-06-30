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
    Link,
    Matrix,
    Screen,
    CheckBox,
    Level,
    Next,
    Score
} from "../Components";

// Interfaces and Types
import {
    moveDown,
    moveLeft,
    moveRight,
    moveUp,
    rotate
} from "../Constants/moves";
import { Cur } from "../Constants/interfaces";

let pause = false;
let gameOver = false;
let cur: any = null;
let nextCur: any = null;

const Home: NextPage = () => {
    const requestRef = useRef<any>();
    const previousTimeRef = useRef<any>();

    const [checked, setChecked] = useState<any>([]);
    const [drawEmpty, setDrawEmpty] = useState(false);

    const [score, setScore] = useState(0);
    const [m, setM] = useState(
        createAndFillTwoDArray({ rows: ROWS, cols: COLS, defaultValue: 0 })
    );

    const resetMatrix = () => {
        // resets the matrix for a new game, sets new current/next pieces
        const newM = [...m];

        if (!newM) return;

        for (var i = 0; i < ROWS; i++) {
            for (var j = 0; j < COLS; j++) {
                if (newM[i][j] !== 0) {
                    newM[i][j] = 0;
                }
            }
        }
        piecePipeLine();
        setM(newM);
    };

    const checkLinesToClear = () => {
        // checks and clears set lines in the matrix, increments score
        const newM: any = [...m];

        // //draw current piece @ location
        for (var i = 0; i < COLS; i++) {
            for (var j = 0; j < ROWS; j++) {
                // console.log(`piece ${i} ${j}`, newM[i][j]);
            }
        }
        // setM(newM);
    };

    const setFixedPieces = () => {
        // updates matrix to reprsenty settled pieces

        const newM = [...m];
        const newChecked = [];

        if (!newM) return;

        for (var i = 0; i < ROWS; i++) {
            for (var j = 0; j < COLS; j++) {
                if (newM[i][j] !== 0) {
                    newM[i][j] = 1;
                    newChecked.push([i, j]);
                }
            }
        }
        setChecked([...newChecked]);
        setM(newM);
    };

    const updateCurPiece = () => {
        // updates the position of current piece

        if (gameOver || !m.length || collisionT(m)) return;

        if (!cur) piecePipeLine();

        if (collisionB(m)) {
            // console.clear();
            console.log("piece hit bottom/other cell");
            setFixedPieces();
            piecePipeLine();
            // checkLinesToClear();
            return;
        } else {
            moveDown(m, checked, cur, updateMatrix);
            return;
        }

        // console.log("move piece down", cur?.name, cur?.posX, cur?.posY);
    };

    const updateMatrix = () => {
        //inserts current piece @ location

        if (gameOver || !cur || !m.length) return;

        console.log("update matrix");

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

        for (var i = 0; i < COLS; i++) {
            for (var j = 0; j < ROWS; j++) {
                if (newM[j][i] !== 1) {
                    let piece = pieceMap[cur.name];
                    if (
                        JSON.stringify(piece).indexOf(JSON.stringify([i, j])) !=
                        -1
                    ) {
                        // show the piece
                        newM[j][i] = cur.name;
                    } else {
                        //don't touch settled pieces
                        newM[j][i] = 0;
                    }
                }
            }
        }

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
                    } else {
                        // console.log("game paused");
                    }
                }
            }
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(gameLoop);
        }, 1000 / FPS);
    };

    useEffect(() => {
        console.log("render");
        requestRef.current = requestAnimationFrame(gameLoop);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    useEffect(() => {
        console.log(checked, "checked");
    }, [checked]);
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
                    <button onClick={() => (pause = !pause)}>Pause</button>
                    <input
                        type={"checkbox"}
                        onChange={() => setDrawEmpty(!drawEmpty)}
                        checked={drawEmpty}
                    />
                    <button
                        onClick={() => {
                            console.log(m, cur, nextCur, checked);
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
