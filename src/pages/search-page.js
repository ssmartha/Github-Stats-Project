import { useState } from "react";

import { Input } from "../components/input";
import { getUserData } from "../services/github-api";
// import PokemonData from "../components/";

function SearchPage() {
  const [query, setQuery] = useState("");

  const [state, setState] = useState({
    status: "idle", // success - error - pending
    data: null,
    error: null,
  });
  const { status, data: user, error } = state;

  function handleSubmit(event) {
    event.preventDefault();
    setState({ status: "pending", data: null, error: null });

    getUserData(query)
      .then((data) => {
        if (data.message === "Not Found") throw new Error("El user no existe! Intenta de nuevo");
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          name="query"
          type="query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="example@mail.com"
          label="Search"
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {status === "pending" && "Loading..."}
        {status === "idle" && "Ready to search"}
        {status === "success" && (
          <div>
            {user.name}
            <br />
            Followers: {user.followers}
            <br />
            Repositories: {user.public_repos}
            <br />
            <img src={user.avatar_url} alt={user.name} />
            {user.name}
            <br />
          </div>
        )}
        {status === "error" && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default SearchPage;
