import collectionClient from "./collection-client";

export async function createFavorite(data) {
  console.log(data);
  return await collectionClient("/favorites", {
    body: data,
  });
}

export async function removeFavorite(id) {
  console.log(id);
  return await collectionClient(`/favorites/${id}`, {
    method: "DELETE",
  });
}

export async function getFavorites() {
  return await collectionClient(`/favorites`);
}
