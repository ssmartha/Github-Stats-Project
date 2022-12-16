import styled from "@emotion/styled";
import { colors } from "../styles";

const StyledInput = styled("input")`
  ::placeholder {
    color: ${colors.gray.light};
  }
`;

function Input({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  label,
}) {
  return (
    <div>
      {label && <label htmlFor={id || name}>{label}</label>}
      <StyledInput
        id={id || name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
