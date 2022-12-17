import { useState, useEffect } from "react";
import { getPublicGistsData } from "../services/github-api"
// import styled from "@emotion/styled";

// const StyledGithubUser = styled("div")``;

export function PublicGistsPage({ query }){
  const [gists, setGists] = useState([]);

  useEffect(() => {
    getPublicGistsData(query)
    .then((data) => {
    setGists([...data])
  })
  .catch((error) => console.log("errorcito: ", error.message));
  }, []);



  return(
  <div style={{display: "flex", flexDirection: "column", gap: "16px", alignItems: "center"}}>
    <h1>Public Gists ({gists.length})</h1>

    {/* barrita de paginas */}

    {gists.map((gist) => (
      <div key={gist.id} style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "8px", padding: "12px", width: "300px", height: "56px", backgroundColor: "#FFFFFF", boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.25)", borderRadius: "4px",}}>
        <p key={gist.id}>{gist.description}</p>
      </div>
    ))}
  </div>
  )
}