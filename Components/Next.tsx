import React from "react";
import { I, J, L, O, S, T, Z } from "../Constants/pieces";
import { NextContainer } from "./Flex";

import { CheckBox, HiddenCheckBox } from "./Checkbox";

export function NextPiece({ nextCur }: any) {
    const pieceMap: any = {
        T: T(0, 0, nextCur?.rot),
        O: O(0, 0, nextCur?.rot),
        L: L(0, 0, nextCur?.rot),
        J: J(0, 0, nextCur?.rot),
        I: I(0, 0, nextCur?.rot),
        S: S(0, 0, nextCur?.rot),
        Z: Z(0, 0, nextCur?.rot)
    };

    let piece = pieceMap[nextCur?.name];

    let nm = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 0],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
        [2, -1],
        [2, 0],
        [2, 1]
    ];

    return (
        <NextContainer>
            {piece &&
                nm?.map((p: any, index: number) => {
                    // console.log(p, piece[index]);
                    return (
                        <CheckBox
                            key={index}
                            i1={p[0]}
                            i2={p[1]}
                            c={
                                JSON.stringify(p) ===
                                    JSON.stringify(piece[0]) ||
                                JSON.stringify(p) ===
                                    JSON.stringify(piece[1]) ||
                                JSON.stringify(p) ===
                                    JSON.stringify(piece[2]) ||
                                JSON.stringify(p) === JSON.stringify(piece[3])
                            }
                            clickHandler={() => {
                                console.log(p == piece[0], p, piece[0]);
                            }}
                        />
                    );
                })}
        </NextContainer>
    );
}
