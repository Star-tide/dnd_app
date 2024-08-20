import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const signUp = async (event) => {
  const formData = new FormData(event.target)
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  try {
    let response = await api.post("/signup/", formData);
    if (response.status === 201) {
      let { user, token } = response.data;
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      return user;
    }

  } catch (error) {
    console.log("error", error)
    return null;
  }
};

export const signIn = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target)
  let response = await api.post("/login/", formData);
  if (response.status === 200) {
    let { user, token } = response.data;
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    return user;
  }
  alert("credentials failed");
  return null;
};

export const logOut = async () => {
  try {
    let response = await api.post("/logout/");
    if (response.status === 204) {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      console.log("User Logged Out Successfully")
      return null;
    }
  }
  catch(error){
    return error
  }
  alert("Something went wrong during log out!");
};

export const confirmUser = async () => {
  try {
    let token = localStorage.getItem("token");
    if (token) {
      console.log(token)
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      let response = await api.get("users/");
      return response.data;
    }

  } catch (error) {
    console.log()
    console.error("Error Confirming user:", error)
  }
  return null;
};
