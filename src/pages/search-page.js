import { useState } from "react";
import styled from "@emotion/styled";
import { Input } from "../components/input";
import { getUserData } from "../services/github-api";
import SearchState from "../components/search-state";
import { Link } from "react-router-dom";
import {HiUserGroup} from "react-icons/hi";
import {RiUserHeartFill, RiBookMarkFill, RiCodeBoxFill} from "react-icons/ri";

// import PokemonData from "../components/";

// function SearchPage() {
function SearchPage({ query, setQuery }) {
  // const [query, setQuery] = useState("");
  // console.log(setQuery)

  const [state, setState] = useState({
    status: "idle", // success - error - pending
    data: null,
    error: null,
  });
  const { status, data: user, error } = state;

  function handleSubmit(event) {
    event.preventDefault();
    // onSetUserFound(query);
    setState({ status: "pending", data: null, error: null });

    getUserData(query)
      .then((data) => {
        if (data.message === "Not Found") throw new Error("No users...");
        setState({ status: "success", data: data, error: null });
      })
      .catch((error) => {
        setState({
          status: "error",
          data: null,
          error: error.message,
        });
      });
  }

  const UserDataConteiner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const UserDataGridConteiner = styled.div`
    margin-top: 16px;
    display: grid;
    grid-template: repeat(2, 140px) / repeat(2, 140px);
    width: 296px;
    height: 296px;
  `;

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <form onSubmit={handleSubmit} style={{marginTop: "32px",}}>
          <Input
            name="query"
            type="query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="username"
          />
        </form>
        {status === "pending" && <SearchState message={"Retrieving user..."}/>}
        {status === "idle" && <SearchState message={"Ready to search"}/>}
        {status === "success" && (
          <UserDataConteiner>
            <div>
              <img src={user.avatar_url} alt={user.name} style={{width: "120px", height: "120px", borderRadius: "50%", marginTop: "32px",}}/>
              <p style={{marginTop: "12px",}}>{user.name}</p>
            </div>
            <UserDataGridConteiner>


              <Link to="/followers">
                <UserDataConteiner>
                  <HiUserGroup style={{width:"50px", height:"50px", color: "#F2994A",}}/>
                  <p>{user.followers}</p>
                  <p>Followers</p>
                </UserDataConteiner>
              </Link>


              <Link to="/followings">
                <UserDataConteiner>
                  <RiUserHeartFill style={{width:"50px", height:"50px", color: "#2D9CDB",}}/>
                  <p>{user.following}</p>
                  <p>Followings</p>
                </UserDataConteiner>
              </Link>
              <Link to="/public_repos">  
                <UserDataConteiner>
                  <RiBookMarkFill style={{width:"50px", height:"50px", color: "#219653",}}/>
                  <p>{user.public_repos}</p>
                  <p>public repos</p>
                </UserDataConteiner>
              </Link>  
              <Link to="/public_gists">  
                <UserDataConteiner>
                  <RiCodeBoxFill style={{width:"50px", height:"50px", color: "#828282",}}/>
                  <p>{user.public_gists}</p>
                  <p>public gists</p>
                </UserDataConteiner>
              </Link>  
            </UserDataGridConteiner>
          </UserDataConteiner>
        )}
        {status === "error" && <SearchState message={error}/>}
      </div>
    </div>
  );
}

export default SearchPage;
