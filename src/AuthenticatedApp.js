// import { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import { useAuth } from "./context/auth-context";

// import FavoritePage from "./pages/favorites-page";
// import SearchPage from "./pages/search-page";
// import {
//   createFavorite,
//   getFavorites,
//   removeFavorite,
// } from "./services/favorites-service";
import { useState } from "react";
import React from "react";
import {
  BrowserRouter, // Para declarar rutas => el padre de todas las rutas
  Routes, // Se ocupan de listar las rutas independientes.
  Route, // Para declarar una ruta
  Link, // Para navegar entre las rutas
  useParams,
} from "react-router-dom";
import { RiSearchFill } from "react-icons/ri";
import { BsFillStarFill, BsPersonFill } from "react-icons/bs";
import SearchPage from "./pages/search-page"
import { FollowersPage } from "./pages/followers-page"
import { FollowingsPage } from "./pages/followings-page";
import { PublicReposPage } from "./pages/public-repos-page";
import { PublicGistsPage } from "./pages/public-gists-page";
import ProfilePage from "./pages/profile-page";

function AuthenticatedApp() {
  const [query, setQuery] = useState("");
  // const { logout } = useAuth();
  const Footer = () => (
  <nav style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", background: "#F2F2F2", boxShadow: "0px -2px 0px rgba(0, 0, 0, 0.25)", width: "100%", height: "68px", position: "absolute", bottom: "1px", right:"0"}}>
    <Link to="/profile">  {<BsPersonFill style={{width: "45px", height: "45px", color: "#BDBDBD"}} />} </Link>
    <Link to="/search"> {<RiSearchFill style={{width: "45px", height: "45px", color: "#BDBDBD"}} />} </Link>
    <Link to="/favorite"> {<BsFillStarFill style={{width: "45px", height: "45px", color: "#BDBDBD"}} />} </Link>
  </nav>
  );

  function Profile() {
    return (
      <div>
        <ProfilePage />
      </div>
    );
  }

  function Search() {
    return (
      <div>
        <SearchPage query={query} setQuery={setQuery}/>
      </div>
    );
  }

  function Favorite() {
    return (
      <div>
        <h1>Favorite Page</h1>
      </div>
    );
  }

  function Followers({ query }) {
    console.log(query)
    return (
      <div>
        <FollowersPage query={query} />
      </div>
    );
  }

  function Followings() {
    return (
      <div>
        <FollowingsPage query={query} />
      </div>
    );
  }

  function Public_repos() {
    return (
      <div>
        <PublicReposPage query={query} />
      </div>
    );
  }

  function Public_gists() {
    return (
      <div>
        <PublicGistsPage query={query} />
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Search />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/followers" element={<Followers query={query} />} />
          <Route path="/followings" element={<Followings />} />
          <Route path="/public_repos" element={<Public_repos />} />
          <Route path="/public_gists" element={<Public_gists />} />
          <Route path="*" element={<Search />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default AuthenticatedApp;
