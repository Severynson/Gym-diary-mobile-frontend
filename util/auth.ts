import axios from "axios";
// @ts-ignore
import { BACKEND_API } from "@env";

const API_KEY = "AIzaSyDY1JZOp6Bahjm6WPLC64scB4ogGQg_mZs";

async function authenticate(
  mode: "sign-in" | "sign-up",
  email: string,
  password: string
) {
  const response = await axios.post(`${BACKEND_API}/authentication/${mode}`, {
    email,
    password,
  });

  if (mode === "sign-in") {
    const token = response.data.idToken;
    return token;
  } else {
    const registeredSuccessful = response.data.registeredSuccessful;
    return registeredSuccessful;
  }
}

export async function createUser(email: string, password: string) {
  return await authenticate("sign-up", email, password);
}

export async function login(email: string, password: string) {
  return await authenticate("sign-in", email, password);
}
