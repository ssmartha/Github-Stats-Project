import { useState, useEffect } from "react";
import { getFollowingsData } from "../services/github-api";
import { useAuth } from "../context/auth-context";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export function FollowingsPage() {
  const [followings, setFollowings] = useState([]);
  const { userFound, setUserFound } = useAuth();
  const [pageNumber, setPageNumber] = useState(1);
  const { data, ...others } = useAuth().state;
  const { login, ...rest}= data;
  setUserFound(login);

  useEffect(() => {
    getFollowingsData(userFound,pageNumber)
    .then((data) => {
    setFollowings([...data])
  })
  .catch((error) => console.log("errorcito: ", error.message));
  }, [pageNumber]);



  return(
  <div style={{display: "flex", flexDirection: "column", gap: "16px", alignItems: "center"}}>
    <h1>Followings ({followings.length})</h1>

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

    {followings.map((user) => (
      <div key={user.id} style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "8px", padding: "12px", width: "300px", height: "56px", backgroundColor: "#FFFFFF", boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.25)", borderRadius: "4px",}}>
        <img src={user.avatar_url} alt={user.login} style={{width: "40px", height: "40px", borderRadius: "50%"}}/>
        <p key={user.id}>{user.login}</p>
      </div>
    ))}
  </div>
  )
}
