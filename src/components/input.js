import styled from "@emotion/styled";
import { colors } from "../styles";

const StyledInput = styled("input")`
  border: none;
  text-align: center;
  width: 213px;
  height: 28px;
  background: #FFFFFF;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  ::placeholder {
    text-align: center;
    color: ${colors.gray.light};
  }
`;

export const StyledButton = styled("button")`
  width: 167px;
  height: 36px;
  border: none;
  background: #2D9CDB;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

export const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const StyledDiv = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const StyledDivForm = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

export function Input({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  label,
}) {
  return (
    <StyledDiv>
      {label && <label htmlFor={id || name}>{label}</label>}
      <StyledInput
        id={id || name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </StyledDiv>
  );
}

