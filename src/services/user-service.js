import { tokenKey } from "../config";
import collectionClient from "./collection-client";

export async function createUser(userData) {
  const { token, ...user } = await collectionClient("/signup", {
    body: userData,
  });

  sessionStorage.setItem(tokenKey, token);
  return user;
}

export async function getUser() {
  const { token, ...user } = await collectionClient("/profile");

  return user;
}

export async function show() {
  const { token, id , ...user } = await collectionClient("/profile");
  
  return user;
}


export async function update(updateData) {
  const { token, id ,...user } = await collectionClient("/profile", {
    body: updateData,
    method: "PATCH",
  });

  console.log(user)
  return user;
}
