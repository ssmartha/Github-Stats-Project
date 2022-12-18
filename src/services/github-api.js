const BASE_URI = "https://api.github.com/users/";

export function getUserData(query) {
  return fetch(BASE_URI + query.toLowerCase()).then((response) =>
    response.json()
  );
}

export function getFollowersData(user, num) {
  return fetch(BASE_URI + user + "/followers?per_page=7&page=" + num).then((response) =>
    response.json()
  );
}

export function getFollowingsData(user,num) {
  console.log(user);
  return fetch(BASE_URI + user + "/following?per_page=7&page=" + num).then((response) =>
    response.json()
  );
}

export function getPublicReposData(user,num) {
  return fetch(BASE_URI + user + "/repos?per_page=7&page=" + num).then((response) =>
    response.json()
  );
}

export function getPublicGistsData(user) {
  console.log(user);
  return fetch(BASE_URI + user + "/gists").then((response) =>
    response.json()
  );
}
