import styled from "@emotion/styled";

export const CheckBox = ({ i1, i2, c }: any) => {
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

export const HiddenCheckBox = styled.input`
    opacity: 0;
`;
