import { useState, useEffect } from "react";
import { getFollowersData } from "../services/github-api"
// import styled from "@emotion/styled";

// const StyledGithubUser = styled("div")``;

export function FollowersPage({ query }){
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    getFollowersData(query)
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
      <div key={user.id} style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "8px", padding: "12px", width: "300px", height: "56px", backgroundColor: "#FFFFFF", boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.25)", borderRadius: "4px",}}>
        <img src={user.avatar_url} alt={user.login} style={{width: "40px", height: "40px", borderRadius: "50%"}}/>
        <p key={user.id}>{user.login}</p>
      </div>
    ))}
  </div>
  )
}
