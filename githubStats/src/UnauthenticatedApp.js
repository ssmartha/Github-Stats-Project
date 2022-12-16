import styled from "@emotion/styled";
import { useState } from "react";
import LoginForm from "./components/login-form";
import SignupForm from "./components/signup-form";
import { colors } from "./styles";

const CustomLink = styled("button")`
  border: none;
  background: none;
  cursor: pointer;
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
    <div>
      <h1>Welcome to Github Stats</h1>
      {showLogin ? <LoginForm /> : <SignupForm />}

      <CustomLink onClick={handleLinkChange}>
        {showLogin ? "Create Account" : "Log in"}
      </CustomLink>
    </div>
  );
}

export default UnauthenticatedApp;
