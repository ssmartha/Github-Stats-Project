const BASE_URI = "https://api.github.com/users/";

export function getUserData(query) {
  return fetch(BASE_URI + query.toLowerCase()).then((response) =>
    response.json()
  );
}

export function getFollowersData(user) {
  return fetch(BASE_URI + user + "/followers").then((response) =>
    response.json()
  );
}

export function getFollowingsData(user) {
  console.log(user);
  return fetch(BASE_URI + user + "/following").then((response) =>
    response.json()
  );
}

export function getPublicReposData(user) {
  return fetch(BASE_URI + user + "/repos").then((response) =>
    response.json()
  );
}

export function getPublicGistsData(user) {
  console.log(user);
  return fetch(BASE_URI + user + "/gists").then((response) =>
    response.json()
  );
}
