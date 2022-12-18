import UserCard from "../components/user-card";
import { useAuth } from "../context/auth-context";


function FavoritePage() {
  const { favorites, setCurrentPage } = useAuth();
  setCurrentPage("FavoritePage");
  console.log(favorites);

  return (
    <div style={{display: "flex", flexDirection: "column", gap: "16px", alignItems: "center"}}>
      <h1>Favorites ({favorites.length})</h1>
      {favorites.map((fav) => (
        <UserCard key={fav.id} img={ fav.avatar_url } user={fav.username} name={fav.name} icon="defined"/>
      ))}
    </div>
  );
}

export default FavoritePage;
