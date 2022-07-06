import React from "react";
import { I, J, L, O, S, T, Z } from "../Constants/pieces";
import { NextContainer } from "./Flex";

import { CheckBox, HiddenCheckBox } from "./Checkbox";

export function NextPiece({ nextCur }: any) {
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

    return (
        <NextContainer>
            {piece &&
                nm?.map((p: any, index: number) => {
                    // console.log(p, piece[index]);
                    if (JSON.stringify(piece).includes(JSON.stringify(p))) {
                        return (
                            <CheckBox
                                key={index}
                                i1={p[0]}
                                i2={p[1]}
                                c={true}
                                clickHandler={() => {
                                    console.log(p == piece[0], p, piece[0]);
                                }}
                            />
                        );
                    } else {
                        return <HiddenCheckBox type="checkbox" key={index} />;
                    }
                })}
        </NextContainer>
    );
}
