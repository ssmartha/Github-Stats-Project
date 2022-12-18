import { useState, useEffect } from "react";
import { getFollowersData } from "../services/github-api";
import UserCard from "../components/user-card";
import { useAuth } from "../context/auth-context";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export function FollowersPage() {
  const [followers, setFollowers] = useState([]);
  const { userFound, setUserFound } = useAuth();
  const [pageNumber, setPageNumber] = useState(1);
  const { data } = useAuth().state;
  const { login }= data;
  setUserFound(login);

  // let totalPages = Math.round(data.followers / 7)
  // console.log(totalPages)
  // let totalPagesArr = Array.from({length: data.followers}, (_, i) => i + 1)
  // console.log(totalPagesArr);
  // let slicedArray1 = totalPagesArr.slice(0, 3);
  // let slicedArray2 = totalPagesArr.slice(3, 6);
  // console.log(slicedArray1);
  // console.log(slicedArray2);
  

  useEffect(() => {
    getFollowersData(userFound, pageNumber)
    .then((data) => {
    setFollowers([...data])
  })
  .catch((error) => console.log("errorcito: ", error.message));
  }, [pageNumber]);

  return(
  <div style={{display: "flex", flexDirection: "column", gap: "16px", alignItems: "center"}}>
    <h1>Followers ({data.followers})</h1>

    {/* 1.- Data.followers / 7 = Math.round(total de las paginas) */}
    {/*  useState = 1 */}
    {/* if (number que hay de botones < total de pages)  */}
    {/* Array.from({length: 10}, (_, i) => i + 1) */}


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

      {followers.map((user) => (
        <UserCard key={user.id} img={ user.avatar_url } user={user.login} />
      ))}
  </div>
  )
}
