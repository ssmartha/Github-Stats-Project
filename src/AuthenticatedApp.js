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

function AuthenticatedApp() {
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
        <SearchPage />
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

  function Followers() {

    

    return (
      <div>
        <h1>Followers Page</h1>
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
          <Route path="/followers" element={<Followers />} />
          <Route path="*" element={<Search />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default AuthenticatedApp;
