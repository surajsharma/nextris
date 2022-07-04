import { useEffect, useState } from "react";

import { CheckBox, HiddenCheckBox } from "./Checkbox";
import { MContainer } from "./Container";

export const Matrix = ({ matrix, drawEmpty }: any) => {
    // matrix represents
    // 1) pieces set, cell = 0
    // 2) current piece, cell != 0

    const [rendered, setRendered] = useState<any>([]);

    useEffect(() => {
        let re: any = [];
        let m = matrix;

        m &&
            m.map((r: any, i1: number) => {
                r &&
                    r.map((c: any, i2: number) => {
                        if (drawEmpty) {
                            re.push(
                                <CheckBox
                                    key={`${i1},${i2}`}
                                    i1={i1}
                                    i2={i2}
                                    c={c}
                                    clickHandler={() =>
                                        console.log(
                                            `m@ ${i1},${i2} = ${m[i1][i2]}`
                                        )
                                    }
                                />
                            );
                        } else {
                            if (c !== 0) {
                                re.push(
                                    <CheckBox
                                        key={`${i1},${i2}`}
                                        i1={i1}
                                        i2={i2}
                                        c={c}
                                        clickHandler={() =>
                                            console.log(
                                                `m@ ${i1},${i2} = ${m[i1][i2]}`
                                            )
                                        }
                                    />
                                );
                            } else {
                                re.push(
                                    <HiddenCheckBox
                                        type="checkbox"
                                        key={`${i1},${i2}`}
                                    ></HiddenCheckBox>
                                );
                            }
                        }
                    });
                re.push(<br key={`${i1}`} />);
            });

        setRendered(re);
    }, [matrix, drawEmpty]);

    useEffect(() => {}, [rendered]);

    return <MContainer>{rendered}</MContainer>;
};
