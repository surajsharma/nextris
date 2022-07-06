import React from "react";
import { I, J, L, O, S, T, Z } from "../Constants/pieces";
import { NextContainer } from "./Flex";

import {
    CheckBox,
    HiddenCheckBox,
    HiddenNextCheckBox,
    NextCheckBox
} from "./Checkbox";

export function NextPiece({ nextCur, paused, gameOver }: any) {
    const pieceMap: any = {
        T: T(nextCur?.posX, nextCur?.posY, nextCur?.rot),
        O: O(nextCur?.posX, nextCur?.posY, nextCur?.rot),
        L: L(nextCur?.posX, nextCur?.posY, nextCur?.rot),
        J: J(nextCur?.posX, nextCur?.posY, nextCur?.rot),
        I: I(nextCur?.posX, nextCur?.posY, nextCur?.rot),
        S: S(nextCur?.posX, nextCur?.posY, nextCur?.rot),
        Z: Z(nextCur?.posX, nextCur?.posY, nextCur?.rot)
    };

    let piece = pieceMap[nextCur?.name];

    let nm = [
        [5, -1],
        [6, -1],
        [7, -1],
        [8, -1],
        [5, 0],
        [6, 0],
        [7, 0],
        [8, 0],
        [5, 1],
        [6, 1],
        [7, 1],
        [8, 1],
        [5, 2],
        [6, 2],
        [7, 2],
        [8, 2]
    ];
    console.log(paused, gameOver);

    return (
        <NextContainer>
            {piece &&
                nm?.map((p: any, index: number) => {
                    // console.log(p, piece[index]);
                    if (JSON.stringify(piece).includes(JSON.stringify(p))) {
                        return (
                            <NextCheckBox
                                type="checkbox"
                                key={index}
                                checked={false}
                                onChange={() => {
                                    console.log(p);
                                }}
                            />
                        );
                    } else {
                        return (
                            <HiddenNextCheckBox
                                type="checkbox"
                                key={index}
                            ></HiddenNextCheckBox>
                        );
                    }
                })}
            {nextCur && !paused && !gameOver ? "next" : <h3>game over!</h3>}
            {paused ? "paused" : null}
            {gameOver ? "gameOver" : null}
        </NextContainer>
    );
}
