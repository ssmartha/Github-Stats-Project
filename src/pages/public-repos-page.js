import { useState, useEffect } from "react";
import { getPublicReposData } from "../services/github-api";
import { useAuth } from "../context/auth-context";
import { colors } from "../styles";
import { BiGitBranch } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";


export function PublicReposPage() {
  const [repos, setRepos] = useState([]);
  const { userFound, setUserFound } = useAuth();
  const { data, ...others } = useAuth().state;
  const { login, ...rest}= data;
  setUserFound(login);

  const languageColor = {
    CSS: colors.blue[500],
    HTML: colors.red[800],
    JavaScript: colors.orange[500],
    Ruby: colors.red[500],
  }

  useEffect(() => {
    getPublicReposData(userFound)
    .then((data) => {
      setRepos([...data]);
  })
  .catch((error) => console.log("errorcito: ", error.message));
  }, []);

  return(
  <div style={{display: "flex", flexDirection: "column", gap: "16px", alignItems: "center"}}>
    <h1>Public Repos ({repos.length})</h1>

    {/* barrita de paginas */}

    {repos.map((repo) => (
      <div key={repo.id} style={{
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        width: "300px", 
        backgroundColor: "#FFFFFF", 
        boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.25)", 
        borderRadius: "4px",
        fontFamily: 'Source Code Pro',
        fontStyle: "normal",
        }}>
        <div style={{
          height: "20px", 
          width: "276px", 
          margin: "8px 12px 0",
          fontHeight: "700",
          fontSize: "16px",
          lineHeight: "20px",
          color: "#2D9CDB",
          }}>  
          <p key={repo.id}>{repo.name}</p>
        </div>
        <div style={{
          width: "276px", 
          margin: "4px 12px",
          fontHeight: "400",
          fontSize: "12px",
          lineHeight: "15px",
          }}>
          <p key={repo.id}>{repo.description}</p>
        </div> 
        <div style={{ 
          display: "flex", 
          flexDirection: "row",
          fontHeight: "400",
          fontSize: "12px",
          lineHeight: "15px",
          }}>
          <div style={{backgroundColor: languageColor[`${repo.language}`], width: "15px", borderRadius: "50%", marginRight: "5px",}}></div>
          <p style={{ marginRight: "16px",}}>{repo.language}</p>
          < AiOutlineStar />
          <p style={{ marginRight: "16px",}}>{repo.stargazers_count}</p>
          < BiGitBranch />
          <p>{repo.open_issues_count}</p>
        </div>
      </div>
    ))}
  </div>
  )
}
