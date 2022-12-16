import { useState } from "react";
import Input from "./input";

function SignupForm({ onSignup }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const { email, password, first_name, last_name } = formData;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSignup(formData);
  }

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
        <Input
          name="first_name"
          type="first_name"
          value={first_name}
          onChange={handleChange}
          label="First Name"
        />
        <Input
          name="last_name"
          type="last_name"
          value={last_name}
          onChange={handleChange}
          label="Last Name"
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default SignupForm;
