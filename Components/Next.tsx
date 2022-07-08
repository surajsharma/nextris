import { useEffect, useState } from "react";
import { I, J, L, O, S, T, Z } from "../Constants/pieces";
import { NextContainer, NextText } from "./Sidebar";

import { HiddenNextCheckBox, NextCheckBox } from "./Checkbox";
import { FC } from "./Flex";

export function NextPiece({ nextCur, paused, gameOver, FF }: any) {
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
    const [nav, setNav] = useState<any>(null);

    useEffect(() => {
        if (navigator) {
            setNav(navigator);
        }
    }, []);

    return (
        <FC>
            <NextContainer
                FF={nav?.userAgent.toLowerCase().indexOf("firefox") > -1}
            >
                {piece &&
                    nm?.map((p: any, index: number) => {
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
            </NextContainer>

            <div>
                <NextText
                    FF={nav?.userAgent.toLowerCase().indexOf("firefox") > -1}
                >
                    {nextCur && "next"}{" "}
                    {gameOver && (
                        <FC>
                            <i>
                                <h3>GAME</h3>
                                <h3>OVER!</h3>
                            </i>
                        </FC>
                    )}
                </NextText>
            </div>
        </FC>
    );
}
