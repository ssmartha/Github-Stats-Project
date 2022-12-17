import { useState } from "react";
import { Input, StyledButton, StyledForm } from "../components/input";
import { update } from "../services/user-service";
import { useAuth } from "../context/auth-context";

function ProfilePage () {
  
    const { email, first_name, last_name } = useAuth().user;
    const [formData, setFormData] = useState({
        email: email,
        password: "",
        first_name: first_name,
        last_name: last_name,
    });
    
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(formData)
        update(formData);
    }

    return (
        <div>
          <StyledForm onSubmit={handleSubmit}>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              label="Email"
            />
            <Input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="*******"
              label="Password"
            />
            <Input
              name="first_name"
              type="first_name"
              value={formData.first_name}
              onChange={handleChange}
              label="First Name"
            />
            <Input
              name="last_name"
              type="last_name"
              value={formData.last_name}
              onChange={handleChange}
              label="Last Name"
            />
            <StyledButton type="submit">Update</StyledButton>
          </StyledForm>
        </div>
      );
}

export default ProfilePage