// import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getFavorites } from "../services/favorites-service";
import UserCard from "../components/user-card";



function FavoritePage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites().then((data) => {
      setFavorites([...data])
    }).catch(console.log);
  }, []);

  useEffect(() => {
    console.log("favorites hereeeeeeeeeeeeeeeeeeeee");
    console.log(favorites);
  }, [favorites]);

  return (
    <div style={{display: "flex", flexDirection: "column", gap: "16px", alignItems: "center"}}>
      <h1>Favorites ({favorites.length})</h1>
      {favorites.map((fav) => (
        <UserCard id={fav.id} img={ fav.avatar_url } user={fav.username} name={fav.name} icon="defined"/>
      ))}
    </div>
  );
}

export default FavoritePage;
