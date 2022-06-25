import styled from "@emotion/styled";
import { useEffect, useState } from "react";

export const Matrix = ({ matrix, drawEmpty }: any) => {
    // matrix represents
    // 1) pieces set, cell = 0
    // 2) current piece, cell != 0

    const [rendered, setRendered] = useState<any>([]);
    const Hidden = styled.input`
        opacity: 0;
    `;

    const Container = styled.div`
        background-color: rgba(20, 20, 20, 0.5);
    `;

    const CheckBox = ({ i1, i2, c }: any) => {
        return (
            <input
                type="checkbox"
                id={`${i1},${i2}`}
                name={`${i1},${i2}`}
                value={`${i1},${i2}`}
                onChange={() => {
                    console.log(`@${i1},${i2}`);
                }}
                checked={c !== 0}
            />
        );
    };

    useEffect(() => {
        let re: any = [];
        let m = matrix;

        m.map((r: any, i1: number) => {
            r.map((c: any, i2: number) => {
                if (drawEmpty) {
                    re.push(
                        <CheckBox key={`${i1},${i2}`} i1={i1} i2={i2} c={c} />
                    );
                } else {
                    if (c !== 0) {
                        re.push(
                            <CheckBox
                                key={`${i1},${i2}`}
                                i1={i1}
                                i2={i2}
                                c={c}
                            />
                        );
                    } else {
                        re.push(
                            <Hidden
                                type="checkbox"
                                key={`${i1},${i2}`}
                            ></Hidden>
                        );
                    }
                }
            });
            re.push(<br key={`${i1}`} />);
        });

        setRendered(re);
    }, []);

    return <Container>{rendered}</Container>;
};
