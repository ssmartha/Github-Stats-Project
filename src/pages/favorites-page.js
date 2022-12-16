import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const typeColors = {
  grass: "#74CB48",
  electric: "#F9CF30",
  fire: "#F57D31",
};

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PokeCard = styled("div")`
  border: 2px solid ${({ type }) => typeColors[type]};
`;

function FavoritePage({ favorites }) {
  return (
    <Wrapper>
      {favorites.map((fav, index) => (
        <PokeCard type={fav.pokemon_type} key={`pok${index}`}>
          {fav.pokemon_name}
        </PokeCard>
      ))}
      <Link to="/">Go back to search</Link>
    </Wrapper>
  );
}

export default FavoritePage;
