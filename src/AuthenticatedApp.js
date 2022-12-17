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
import SearchPage from "./pages/search-page";
import { FollowersPage } from "./pages/followers-page";
import FavoritePage from "./pages/favorites-page";


function AuthenticatedApp() {
  const [query, setQuery] = useState("");
  // const { logout } = useAuth();
  const Footer = () => (
  <nav>
    <Link to="/profile">  {<BsPersonFill/>} </Link>
    <Link to="/search"> {<RiSearchFill/>} </Link>
    <Link to="/favorite"> {<BsFillStarFill/>} </Link>
  </nav>
  );

  function Profile() {
    return (
      <div>
        <h1>Profile Page</h1>
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
        <FavoritePage/>
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
        <h1>Followings Page</h1>
      </div>
    );
  }

  function Public_repos() {
    return (
      <div>
        <h1>Public repos Page</h1>
      </div>
    );
  }

  function Public_gists() {
    return (
      <div>
        <h1>Public gists Page</h1>
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
