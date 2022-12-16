import { useState } from "react";
import Input from "./input";

function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  // function handleSubmit(event) {
  //   event.preventDefault();

  //   onLogin(formData);
  // }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="example@mail.com"
          label="Email"
        />
        <Input
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          placeholder="*******"
          label="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
