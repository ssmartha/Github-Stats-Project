import { useState, useEffect } from "react";
import { getPublicReposData } from "../services/github-api";
import { useAuth } from "../context/auth-context";


export function PublicReposPage() {
  const { userFound } = useAuth();
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    getPublicReposData(userFound)
    .then((data) => {
      setRepos([...data]);

    console.log(repos);
  })
  .catch((error) => console.log("errorcito: ", error.message));
  }, []);



  return(
  <div style={{display: "flex", flexDirection: "column", gap: "16px", alignItems: "center"}}>
    <h1>Public Repos ({repos.length})</h1>

    {/* barrita de paginas */}

    {repos.map((repo) => (
      <div key={repo.id} style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "8px", padding: "12px", width: "300px", height: "56px", backgroundColor: "#FFFFFF", boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.25)", borderRadius: "4px",}}>
        <p key={repo.id}>{repo.language}</p>
      </div>
    ))}
  </div>
  )
}
