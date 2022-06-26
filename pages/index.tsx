import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import {
    collisionB,
    COLS,
    createAndFillTwoDArray,
    FPS,
    getNextCur,
    ROWS
} from "./utils";

// Pieces
import { I, J, L, O, S, T, Z } from "./pieces";

// Components
import { Container, FC, Flex, Link, Matrix, Screen } from "./Components";

// Interfaces and Types
import { moveDown, moveLeft, moveRight, moveUp, rotate } from "./moves";

const Home: NextPage = () => {
    const [checked, setChecked] = useState<any>([]);
    const [gameOver, setGameOver] = useState(false);
    const [drawEmpty, setDrawEmpty] = useState(true);

    const [m, setM] = useState(
        createAndFillTwoDArray({ rows: ROWS, cols: COLS, defaultValue: 0 })
    );

    const [nextCur, setNextCur] = useState<any>(getNextCur());
    const [cur, setCur] = useState<any>(nextCur);

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
        // console.log({
        //     F: "updateCurPiece",
        //     gameover: gameOver,
        //     cur: cur,
        //     m: m
        // });
        if (gameOver || !cur || !m.length) return;

        if (collisionB(m)) {
            console.log("move piece down", cur?.posX, cur?.posY);
            moveDown(m, setCur, cur, updateMatrix);
            return;
        } else {
            return;
            console.clear();
            console.log("piece hit bottom", collisionB(m));
        }
    };

    const updateMatrix = () => {
        // console.log({
        //     F: "updateMatrix",
        //     gameover: gameOver,
        //     cur: cur,
        //     m: m
        // });
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

        //draw current piece @ location
        for (var i = 0; i < COLS; i++) {
            for (var j = 0; j < ROWS; j++) {
                let piece = pieceMap[cur.name];
                if (JSON.stringify(piece).includes(JSON.stringify([i, j]))) {
                    newM[j][i] = cur.name;
                } else {
                    newM[j][i] = 0;
                }
            }
        }

        setM(newM);
    };

    const piecePipeLine = () => {
        setCur(nextCur);
        const afterThis = getNextCur();
        return setNextCur(afterThis);
    };

    const newGame = () => {
        resetMatrix();
        return piecePipeLine();
    };

    const requestRef = useRef<any>();
    const previousTimeRef = useRef<any>();

    const gameLoop = (time: any) => {
        setTimeout(() => {
            if (previousTimeRef.current != undefined) {
                if (!gameOver) {
                    updateCurPiece();
                }
            }
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(gameLoop);
        }, 1000 / FPS);
    };

    useEffect(() => {
        console.log("rerender");
        requestRef.current = requestAnimationFrame(gameLoop);
        return () => cancelAnimationFrame(requestRef.current);
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
                    <button onClick={() => setGameOver(!gameOver)}>
                        Pause
                    </button>
                    <input
                        type={"checkbox"}
                        onChange={() => {
                            setDrawEmpty(!drawEmpty);
                        }}
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
