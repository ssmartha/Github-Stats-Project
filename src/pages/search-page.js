import { useState } from "react";
import styled from "@emotion/styled";
import { Input } from "../components/input";
import { getUserData } from "../services/github-api";
import SearchState from "../components/search-state";
import { Link } from "react-router-dom";
import {HiUserGroup} from "react-icons/hi";
import { RiUserHeartFill, RiBookMarkFill, RiCodeBoxFill } from "react-icons/ri";
import { BsStar } from "react-icons/bs";
import { createFavorite, removeFavorite } from "../services/favorites-service";
import { useAuth } from "../context/auth-context";

// import PokemonData from "../components/";

// function SearchPage() {
function SearchPage({ query, setQuery }) {
  const { favorites, setCurrentPage } = useAuth();
  const [iconClickedStatus, setIconClickedStatus] = useState(false);
  // const[newFavoriteUsername, SetNewFavoriteUsername]=useState("");
  const [state, setState] = useState({
    status: "idle", // success - error - pending
    data: null,
    error: null,
  });

  setCurrentPage("SearchPage");
  console.log(favorites);
  const { status, data: user, error } = state;

  function findIdFromUserInFavorites(favorites, user) {
    const userInFavorites = favorites.filter((fav) => fav.username === user.login);
    console.log("id uwu",userInFavorites[0]["id"])
    const idFromUserInFavorites = userInFavorites[0]["id"]
    return idFromUserInFavorites
  }

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
    // console.log(user);
    // console.log(favorites);
    // findIdFromUserInFavorites(favorites, user);
  }

  function addToFavorites(userData) {
    createFavorite(userData).then(console.log).catch(console.log);
  }

  function deleteFromFavorites(userId) {
    removeFavorite(userId).then(console.log
    ).catch(console.log);
  }

  function handleIconClick(event, favorites, user) {
    event.preventDefault();
    console.log("hi icon click");
    console.log("oldIconClickStatus",iconClickedStatus)
    setIconClickedStatus(!iconClickedStatus);
    console.log("newStatus", iconClickedStatus);
    let userId= findIdFromUserInFavorites(favorites, user)
    console.log("userId", userId);
    iconClickedStatus ? console.log("icon clicked") : console.log("icon not clicked!");
    iconClickedStatus ? console.log("icon clicked") : deleteFromFavorites(userId);
    // addToFavorites(userData);
  }

  const UserDataContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const UserDataGridContainer = styled.div`
    margin-top: 16px;
    display: grid;
    grid-template: repeat(2, 140px) / repeat(2, 140px);
    width: 296px;
    height: 296px;
  `;

  const UserNameContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 12px;
    gap: 4.6px;
  `;

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>
      <div style={{width: "411px", height: "731px", display: "flex", flexDirection: "column", alignItems: "center"}}>
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
          <UserDataContainer>
              <img src={user.avatar_url} alt={user.name} style={{ width: "120px", height: "120px", borderRadius: "50%", marginTop: "32px", }} />
              <UserNameContainer>
                <p >{user.name}</p>
                <p onClick={(event)=>handleIconClick(event, favorites, user)}><BsStar /></p>
              </UserNameContainer>
            <UserDataGridContainer>

              <Link to="/followers">
                <UserDataContainer>
                  <HiUserGroup style={{width:"50px", height:"50px", color: "#F2994A",}}/>
                  <p>{user.followers}</p>
                  <p>Followers</p>
                </UserDataContainer>
              </Link>


              <Link to="/followings">
                <UserDataContainer>
                  <RiUserHeartFill style={{width:"50px", height:"50px", color: "#2D9CDB",}}/>
                  <p>{user.following}</p>
                  <p>Followings</p>
                </UserDataContainer>
              </Link>
              <Link to="/public_repos">
                <UserDataContainer>
                  <RiBookMarkFill style={{width:"50px", height:"50px", color: "#219653",}}/>
                  <p>{user.public_repos}</p>
                  <p>public repos</p>
                </UserDataContainer>
              </Link>
              <Link to="/public_gists">
                <UserDataContainer>
                  <RiCodeBoxFill style={{width:"50px", height:"50px", color: "#828282",}}/>
                  <p>{user.public_gists}</p>
                  <p>public gists</p>
                </UserDataContainer>
              </Link>
            </UserDataGridContainer>
          </UserDataContainer>
        )}
        {status === "error" && <SearchState message={error}/>}
      </div>
    </div>
  );
}

export default SearchPage;
