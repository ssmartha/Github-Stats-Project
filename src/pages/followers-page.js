import { useState, useEffect } from "react";
import { getFollowersData } from "../services/github-api";
import UserCard from "../components/user-card";
import { useAuth } from "../context/auth-context";
// import styled from "@emotion/styled";

// const StyledGithubUser = styled("div")``;

export function FollowersPage() {
  const { userFound } = useAuth();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    getFollowersData(userFound)
    .then((data) => {
    setFollowers([...data])
  })
  .catch((error) => console.log("errorcito: ", error.message));
  }, []);



  return(
  <div style={{display: "flex", flexDirection: "column", gap: "16px", alignItems: "center"}}>
    <h1>Followers ({followers.length})</h1>

    {/* barrita de paginas */}

      {followers.map((user) => (
        <UserCard key={user.id} img={ user.avatar_url } user={user.login} />
      ))}
  </div>
  )
}
