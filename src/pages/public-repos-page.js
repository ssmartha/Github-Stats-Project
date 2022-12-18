import { useState, useEffect } from "react";
import { getPublicReposData } from "../services/github-api";
import { useAuth } from "../context/auth-context";
import { colors } from "../styles";
import { BiGitBranch } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";


export function PublicReposPage() {
  const [repos, setRepos] = useState([]);
  const { userFound, setUserFound } = useAuth();
  const [pageNumber, setPageNumber] = useState(1);
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
    getPublicReposData(userFound, pageNumber)
    .then((data) => {
      setRepos([...data]);
  })
  .catch((error) => console.log("errorcito: ", error.message));
  }, [pageNumber]);

  return(
  <div style={{display: "flex", flexDirection: "column", gap: "16px", alignItems: "center"}}>
    <h1>Public Repos ({repos.length})</h1>

    {/* barrita de paginas */}
    <div style={{display: "flex", flexDirection: "row"}}>


      <HiChevronLeft style={{ width: "25px", height: "25px" }} onClick={()=> pageNumber === 1 ? "" : setPageNumber(pageNumber - 1)} />

      { pageNumber >= Math.round(data.followers/7) - 2 ?
        <div style={{display: "flex", flexDirection: "row"}}>
          <p style={{ cursor: "pointer", borderRadius: "50px", width: "26px", height: "22px", textAlign: "center" }}>{pageNumber - 4}</p>
          <p style={{ cursor: "pointer", borderRadius: "50px", width: "26px", height: "22px", textAlign: "center" }}>{pageNumber - 3}</p>
        </div> : ""
      }

      { pageNumber > 2 ?
        <div style={{display: "flex", flexDirection: "row"}}>
          <p style={{ cursor: "pointer", borderRadius: "50px", width: "26px", height: "22px", textAlign: "center" }}>{pageNumber - 2}</p>
          <p style={{ cursor: "pointer", borderRadius: "50px", width: "26px", height: "22px", textAlign: "center" }}>{pageNumber - 1}</p>
        </div> : ""
      }

      <p onClick={()=>setPageNumber(pageNumber + 2)} style={{cursor: "pointer", background: "#2D9CDB", borderRadius: "50px", width: "26px", height: "22px", textAlign: "center"}}>{pageNumber}</p>
      { pageNumber < Math.round(data.followers/7) - 2 ?
        <div style={{display: "flex", flexDirection: "row"}}>
          <p style={{ cursor: "pointer", borderRadius: "50px", width: "26px", height: "22px", textAlign: "center" }}>{pageNumber + 1}</p>
          <p style={{ cursor: "pointer", borderRadius: "50px", width: "26px", height: "22px", textAlign: "center" }}>{pageNumber + 2}</p>
        </div> : ""
      }
      {/* <p onClick={()=>setPageNumber(pageNumber + 2)} style={{cursor: "pointer", borderRadius: "50px", width: "26px", height: "22px", textAlign: "center"}}>{pageNumber + 1}</p>
      <p onClick={()=>setPageNumber(pageNumber + 2)} style={{cursor: "pointer", borderRadius: "50px", width: "26px", height: "22px", textAlign: "center"}}>{pageNumber + 2}</p> */}


      { pageNumber <= 2 ?
        <div style={{display: "flex", flexDirection: "row"}}>
          <p style={{ cursor: "pointer", borderRadius: "50px", width: "26px", height: "22px", textAlign: "center" }}>{pageNumber + 3}</p>
          <p style={{ cursor: "pointer", borderRadius: "50px", width: "26px", height: "22px", textAlign: "center" }}>{pageNumber + 4}</p>
        </div> : ""
      }

      <HiChevronRight style={{ width: "25px", height: "25px" }} onClick={()=> pageNumber + 1 <= Math.round(data.followers/7) ? setPageNumber(pageNumber + 1) : ""}/>

    </div>

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
