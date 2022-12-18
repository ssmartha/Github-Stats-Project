import { useState, useEffect } from "react";
import { getFollowersData } from "../services/github-api";
import UserCard from "../components/user-card";
import { useAuth } from "../context/auth-context";

export function FollowersPage() {
  const [followers, setFollowers] = useState([]);
  const { userFound, setUserFound } = useAuth();
  const { data, ...others } = useAuth().state;
  const { login, ...rest}= data;
  setUserFound(login);

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
