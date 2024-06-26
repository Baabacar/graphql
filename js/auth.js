import { fetchUserData, renderHome, renderLogin } from "./app.js";

async function loginAuth(evt) {
  evt.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const credentials = btoa(`${username}:${password}`);

  try {
    const response = await fetch("https://learn.zone01dakar.sn/api/auth/signin", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${credentials}`
      }
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    localStorage.setItem("jwt", data);
    renderHome();
    fetchUserData();  // Appel mis à jour
  } catch (error) {
    alert("Invalid credentials");
  }
}

function logout() {
  console.log('LOGOUT');
  localStorage.removeItem("jwt");
  renderLogin();
}

function checkAuth() {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) {
    renderLogin();
  } else {
    renderHome();
    fetchUserData();  // Appel mis à jour
  }
}

export { loginAuth, logout, checkAuth };
