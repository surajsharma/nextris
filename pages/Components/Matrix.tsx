import styled from "@emotion/styled";

export const Matrix = ({ matrix, drawEmpty }: any) => {
    // matrix represents
    // 1) pieces set, cell = 0
    // 2) current piece, cell != 0

    let m = matrix;

    const Hidden = styled.input`
        opacity: 0;
    `;

    const Container = styled.div`
        height: 55.5vh;
        background-color: rgba(20, 20, 20, 0.5);
    `;

    return (
        <Container>
            {m.map((r: any, i1: number) =>
                r.map((c: any, i2: number) => {
                    if (drawEmpty) {
                        return (
                            <input
                                key={`${i1},${i2}`}
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
                    } else {
                        if (c !== 0) {
                            return (
                                <input
                                    key={`${i1},${i2}`}
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
                        } else {
                            return (
                                <Hidden
                                    type="checkbox"
                                    key={`${i1},${i2}`}
                                ></Hidden>
                            );
                        }
                    }
                })
            )}
        </Container>
    );
};
