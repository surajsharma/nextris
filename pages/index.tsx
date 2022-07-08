import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";

import {
    collisionB,
    collisionL,
    collisionR,
    collisionT,
    COLS,
    createAndFillTwoDArray,
    getNextCur,
    ROWS,
    useSwipe
} from "../Constants/utils";

// Pieces
import { I, J, L, O, S, T, Z } from "../Constants/pieces";

// Components
import {
    Container,
    FC,
    Flex,
    GameContainer,
    Link,
    Matrix,
    NextPiece,
    OuterContainer,
    SideBar,
    LevelOrScore,
    SidebarItems
} from "../Components";

// Interfaces and Types
import { moveDown, moveLeft, moveRight, rotate } from "../Constants/moves";

let pause: boolean = false;
let gameOver: boolean = false;

let cur: any = null;
let nextCur: any = null;

let then: number = 0;
let deltaTime: number = 0;

const Home: NextPage = () => {
    const requestRef = useRef<any>();
    const previousTimeRef = useRef<any>();
    const selectris = useRef<any>();
    const [drawEmpty, setDrawEmpty] = useState(false);
    const [score, setScore] = useState(0);

    const [Firefox, setFirefox] = useState<boolean>(false);

    let interval = useRef(100 - score);

    const [m, setM] = useState(
        createAndFillTwoDArray({ rows: ROWS, cols: COLS, defaultValue: 0 })
    );

    const resetMatrix = () => {
        // resets the matrix for a new game, sets new current/next pieces
        // console.log(
        // "🚀 ~ file: index.tsx ~ line 72 ~ resetMatrix ~ resetMatrix",
        // resetMatrix
        // );
        const newM = m;

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
        // console.log("matrix reset", m);
    };

    const clearSetLines = () => {
        // console.log(
        // "🚀 ~ file: index.tsx ~ line 105 ~ clearSetLines ~ clearSetLines",
        // clearSetLines
        // );

        let rowsToClear: any = [];

        for (let i = 0; i < ROWS; i++) {
            if (m[i].every((cell: any) => cell === 1)) {
                rowsToClear.push(i);
            }
        }

        if (!rowsToClear.length) return [];

        let newM: any = m;
        let clearM: any = m;

        rowsToClear.forEach((rowToPop: number, index: number) => {
            let pad: any = [];

            for (let j = 0; j < COLS; j++) {
                pad.push(0);
            }

            // blank for each row to be cleared
            const rowsAbove =
                index === 0
                    ? newM.slice(0, rowToPop)
                    : clearM.slice(0, rowToPop);

            const rowsBelow =
                index === 0
                    ? newM.slice(rowToPop + 1, ROWS)
                    : clearM.slice(rowToPop + 1, ROWS);

            clearM = [pad].concat(rowsAbove, rowsBelow);
            rowsToClear.pop();
            setScore((oldScore) => {
                return oldScore + 1;
            });
        });

        //all rows to be cleared processed, set new matrix
        for (let i = 0; i < ROWS; i++) {
            newM[i] = clearM[i];
        }
        setM([...newM]);
    };

    const setFixedPieces = () => {
        // updates matrix to reprsenty settled pieces
        // console.log(
        // "🚀 ~ file: index.tsx ~ line 124 ~ setFixedPieces ~ setFixedPieces",
        // setFixedPieces
        // );

        const newM = m;

        if (!newM) return;

        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                if (newM[i][j] !== 0) {
                    newM[i][j] = 1;
                }
            }
        }

        setM([...newM]);
        // console.log("setFixedPieces", m);
    };

    const updateCurPiece = () => {
        // updates the position of current piece

        if (gameOver || !m.length || collisionT(m)) return;

        if (!cur) piecePipeLine();

        if (collisionB(m)) {
            // console.log("collided, getting new pieces", m);
            setFixedPieces();
            piecePipeLine();
            return;
        } else {
            console.log("moving down", m);
            moveDown(m, cur, updateMatrix);
            return;
        }
    };

    const updateMatrix = () => {
        // console.log(
        // "🚀 ~ file: index.tsx ~ line 186 ~ updateMatrix ~ updateMatrix",
        // updateMatrix
        // );
        //inserts current piece @ location

        if (gameOver || !cur || !m.length) return;

        // // console.log("update matrix", m);

        let newM: any = m;

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
                    // cell is not settled, either current piece or empty
                    let piece = pieceMap[cur.name];
                    if (
                        JSON.stringify(piece).indexOf(JSON.stringify([i, j])) !=
                        -1
                    ) {
                        // show the piece
                        newM[j][i] = cur.name;
                    } else {
                        // clear piece trail
                        newM[j][i] = 0;
                    }
                }
            }
        }

        setM([...newM]);
        // // // // console.log("🚀 updateMatrix ~ newM", newM);
    };

    const piecePipeLine = () => {
        // sets current and next pieces
        cur = nextCur;
        nextCur = getNextCur();
        return;
    };

    const newGame = () => {
        console.clear();
        setScore(0);
        return resetMatrix();
    };

    const gameLoop = (now: any) => {
        if (!then) {
            then = now;
        }

        deltaTime = now - then;

        if (deltaTime > interval.current) {
            then = now - (deltaTime % interval.current);

            if (!gameOver) {
                if (!pause) {
                    updateCurPiece();
                    clearSetLines();
                    selectris.current.focus();
                } else {
                    // console.log("game paused");
                }
            }

            previousTimeRef.current = now;
            console.log("timer", interval.current - score * 10);
        }
        requestRef.current = requestAnimationFrame(gameLoop);
    };

    const outOfBounds = () => {
        // TODO:will piece go out of bounds?
        let out = 0;
        for (let i = 0; i < COLS; i++) {
            for (let j = 0; j < ROWS; j++) {
                if (m[i][j] !== 0 && m[i][j] !== 1 && m[i][j] !== undefined) {
                    out += 1;
                    if (out === 3) {
                        return j;
                    }
                }
            }
        }
        return null;
    };

    const handleKeyboard = (event: any) => {
        // console.log(event.key);

        if (event.key === " ") {
            pause = !pause;
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
            const out = outOfBounds();
            if (out !== null) {
                // alert("piece out");
            }
            if (collisionL(m) && collisionR(m)) return;
            rotate(m, cur, updateMatrix);
        }

        if (event.key === "p" || event.key === "P") {
            pause = !pause;
        }
    };

    const swipeLeft = () => {
        moveLeft(m, cur, updateMatrix);
    };

    const swipeRight = () => {
        moveRight(m, cur, updateMatrix);
    };

    const swipeUp = () => {
        rotate(m, cur, updateMatrix);
    };

    const swipeDown = () => {
        moveDown(m, cur, updateMatrix);
    };

    const swipe = useSwipe({
        left: swipeRight,
        right: swipeLeft,
        up: swipeDown,
        down: swipeUp
    });

    useEffect(() => {
        console.log("render/begin");
        if (navigator) {
            setFirefox(
                navigator?.userAgent.toLowerCase().indexOf("firefox") > -1
            );
        }

        nextCur = getNextCur();
        requestRef.current = requestAnimationFrame(gameLoop);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    useEffect(() => {
        // console.log("score!");
        interval.current = 500 - score * 10;
    }, [score]);

    return (
        <div
            ref={selectris}
            className="App"
            onKeyDown={handleKeyboard}
            tabIndex={-1}
        >
            <OuterContainer>
                <Container>
                    <Flex>
                        <button onClick={newGame}>New Game</button>
                        <button
                            onClick={() => {
                                console.log(cur, nextCur);
                                pause = !pause;
                            }}
                        >
                            SCORE:{score * 10}
                        </button>
                    </Flex>
                    <GameContainer>
                        <Matrix matrix={m} drawEmpty={drawEmpty} />
                        <SideBar>
                            <SidebarItems FF={Firefox}>
                                <LevelOrScore>
                                    <h2>📶 {score}</h2>
                                    stage
                                </LevelOrScore>
                                <NextPiece
                                    nextCur={nextCur}
                                    paused={pause}
                                    gameOver={gameOver}
                                />
                                <LevelOrScore>
                                    <h2>🧮 {score * 10}</h2>
                                    score
                                </LevelOrScore>
                            </SidebarItems>
                        </SideBar>
                    </GameContainer>
                </Container>
                <FC>
                    <h1>
                        <i>
                            selectrix<sup>TM</sup>
                        </i>
                        <br />
                        <Link>ゼロイーブン</Link>
                    </h1>
                </FC>
            </OuterContainer>
        </div>
    );
};

export default Home;
