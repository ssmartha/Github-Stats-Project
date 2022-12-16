import styled from "@emotion/styled";
import { useState } from "react";
import LoginForm from "./components/login-form";
import SignupForm from "./components/signup-form";
import { colors } from "./styles";
import { StyledDivForm } from "./components/input"

const CustomLink = styled("button")`
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #2D9CDB;
  &:hover {
    color: ${colors.gray.medium};
  }
`;

function UnauthenticatedApp() {
  const [showLogin, setShowLogin] = useState(true);

  function handleLinkChange(event) {
    event.preventDefault();
    setShowLogin(!showLogin);
  }

  return (
    <StyledDivForm>
      <h1 style={{textAlign: "center"}}>Welcome to<br/>Github Stats</h1>
      {showLogin ? <LoginForm /> : <SignupForm />}

      <CustomLink onClick={handleLinkChange}>
        {showLogin ? "Create Account" : "Log in"}
      </CustomLink>
    </StyledDivForm>
  );
}

export default UnauthenticatedApp;
