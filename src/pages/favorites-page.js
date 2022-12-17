import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getFavorites } from "../services/favorites-service";

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FavoriteUserCard = styled("div")`
  background-color: red;
`;

function FavoritePage() {
  const [favorites, setFavorites] = useState("");

  useEffect(() => {
    getFavorites().then(setFavorites).catch(console.log);
  }, []);

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  return (
    <Wrapper>
      {favorites.map((fav, index) => (
        <FavoriteUserCard key={`${index}`}>
          {fav.name}
        </FavoriteUserCard>
      ))}
    </Wrapper>
  );
}

export default FavoritePage;
