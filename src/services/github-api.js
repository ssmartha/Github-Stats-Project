const BASE_URI = "https://api.github.com/users/";

export function getUserData(query) {
  return fetch(BASE_URI + query.toLowerCase()).then((response) =>
    response.json()
  );
}
