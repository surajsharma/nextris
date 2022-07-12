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
    LevelOrScore,
    Link,
    Matrix,
    NextPiece,
    OuterContainer,
    SideBar,
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
    const [r, rerender] = useState(false);
    const [score, setScore] = useState(0);

    const [Firefox, setFirefox] = useState<boolean>(false);

    let interval = useRef(100 - score);

    const [m, setM] = useState(
        createAndFillTwoDArray({ rows: ROWS, cols: COLS, defaultValue: 0 })
    );

    const isGameOver = () => {
        return m[0].filter((cell: string | number) => cell === 1).length;
    };

    const resetMatrix = () => {
        // resets the matrix for a new game, sets new current/next pieces
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
        //remove set lines from the matrix

        let rowsToClear: any = [];

        for (let i = 0; i < ROWS; i++) {
            if (m[i].every((cell: any) => cell === 1)) {
                rowsToClear.push(i);
            }
        }

        if (!rowsToClear.length) return [];

        let newM: any = m;
        let clearM: any = m;

        for (let index = 0; index < rowsToClear.length; index++) {
            let rowToPop = rowsToClear[index];

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
        }

        //all rows to be cleared processed, set new matrix
        for (let i = 0; i < ROWS; i++) {
            newM[i] = clearM[i];
        }
        setM([...newM]);
    };

    const setFixedPieces = () => {
        // updates matrix to reprsenty settled pieces

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
    };

    const updateCurPiece = () => {
        // updates the position of current piece

        if (pause || !m.length || collisionT(m)) return;

        if (!cur) piecePipeLine();

        if (!isGameOver()) {
            if (collisionB(m)) {
                setFixedPieces();
                piecePipeLine();
                return;
            } else {
                moveDown(m, cur, updateMatrix);
            }
        } else {
            gameIsOver();
        }
        return;
    };

    const updateMatrix = () => {
        //inserts current piece @ location

        if (gameOver || !cur || !m.length) return;

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
    };

    const piecePipeLine = () => {
        // sets current and next pieces
        if (isGameOver()) {
            return gameIsOver();
        }
        cur = nextCur;
        nextCur = getNextCur();
        return;
    };

    const newGame = () => {
        console.clear();
        pause = false;
        gameOver = false;
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

            if (!isGameOver()) {
                if (!pause) {
                    updateCurPiece();
                    clearSetLines();
                    selectris.current.focus();
                }
            } else {
                gameIsOver();
            }
            previousTimeRef.current = now;
        }
        requestRef.current = requestAnimationFrame(gameLoop);
    };

    const gameIsOver = () => {
        rerender(!r);
        gameOver = true;
        cur = null;
        nextCur = null;
        return rerender(!r);
    };

    const outOfBounds = () => {
        let count = 0;
        for (let i = 0; i < ROWS; i++) {
            let row = m[i];
            if (row.filter((cell: any) => cell === cur.name).length) {
                count += row.filter((cell: any) => cell === cur.name).length;
            }
        }

        return count === 4 ? 0 : 4 - count;
    };

    const handleKeyboard = (event: any) => {
        if (gameOver) {
            if (confirm("Game Over, start again?")) {
                newGame();
            }
            return;
        }
        if (pause) {
            pause = !pause;
            rerender(r);
        }

        if (event.key === "`") {
            console.clear();
        }

        if (event.key === "m") {
            console.log(m);
        }

        if (event.key === "c") {
            console.log(cur);
        }

        if (event.key === "n") {
            newGame();
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
            if (collisionL(m) && collisionR(m)) return;

            rotate(m, cur, updateMatrix);

            if (cur.posX === -1 || cur.posX === 0) {
                let steps = outOfBounds();
                for (let move = 0; move < steps; move++) {
                    moveRight(m, cur, updateMatrix);
                }
            }

            if (cur.posX === COLS - 2 || cur.posX === COLS - 1) {
                let steps = outOfBounds();
                for (let move = 0; move < steps; move++) {
                    moveLeft(m, cur, updateMatrix);
                }
            }
        }

        if (event.key === "p" || event.key === "P" || event.key === " ") {
            pause = !pause;
            rerender(!r);
        }
    };

    // Gestures for Mobile
    const swipeLeft = () => {
        if (pause || gameOver) return;
        moveLeft(m, cur, updateMatrix);
    };

    const swipeRight = () => {
        if (pause || gameOver) return;
        moveRight(m, cur, updateMatrix);
    };

    const swipeUp = () => {
        if (pause || gameOver) return;
        rotate(m, cur, updateMatrix);
    };

    const swipeDown = () => {
        if (pause || gameOver) return;
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
        interval.current = 500 - score * 10;
    }, [score]);

    useEffect(() => {
        if (gameOver) {
            console.log("game over");
        }
    }, [r]);

    return (
        <div
            ref={selectris}
            className="App"
            onKeyDown={handleKeyboard}
            tabIndex={-1}
            style={{ display: "flex", flexDirection: "column" }}
        >
            <OuterContainer>
                <Container>
                    <Flex>
                        <button onClick={newGame}>⭐️ New Game</button>
                        <button
                            onClick={() => {
                                pause = !pause;
                                rerender(!r);
                            }}
                        >
                            SCORE:{score * 10} ⏸
                        </button>
                    </Flex>
                    <GameContainer>
                        <Matrix matrix={m} drawEmpty={drawEmpty} />
                        <SideBar>
                            <SidebarItems FF={Firefox}>
                                <LevelOrScore>
                                    <h2>
                                        📶 <i>{score}</i>
                                    </h2>
                                    stage
                                </LevelOrScore>
                                <NextPiece
                                    nextCur={nextCur}
                                    paused={pause}
                                    gameOver={gameOver}
                                />
                                <LevelOrScore>
                                    <h2>
                                        🧮 <i>{score * 10}</i>
                                    </h2>
                                    score
                                </LevelOrScore>
                            </SidebarItems>
                        </SideBar>
                    </GameContainer>
                </Container>
                <FC>
                    <h1>
                        <i>
                            {pause ? (
                                <>
                                    <sup>⏸</sup>paused
                                </>
                            ) : (
                                <>
                                    nextrix<sup>TM</sup>
                                </>
                            )}
                        </i>
                        <br />
                        <Link target="_blank" href={"https://evenzero.in"}>
                            ゼロイーブン
                        </Link>
                    </h1>
                </FC>
            </OuterContainer>
            <div className="unsupported">Screen size not supported.</div>
        </div>
    );
};

export default Home;
