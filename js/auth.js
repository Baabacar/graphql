import { queryUser } from "./query.js";

const graphqlEndpoint = "https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql";
async function loginAuth(evt) {
  evt.preventDefault()
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

    fetchUserData()
  } catch (error) {
    alert("Invalid credentials")
  }
}

function logout() {
  localStorage.removeItem("jwt");
}

export async function fetchUserData() {
    const jwt = localStorage.getItem("jwt");
    try {
      const response = await fetch(graphqlEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt}`, 
        },
        body: JSON.stringify({
          query: `{
                user {
                  id
                  login
                  firstName
                  lastName
                  campus
                  auditRatio
                  totalUp
                  totalDown
                  attrs     
                }
              }`
        }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const jsonResponse = await response.json();
      console.log("GraphQL Response:", jsonResponse); 
  
      if (jsonResponse.errors) {
        throw new Error(jsonResponse.errors[0].message);
      }
  
      const result = jsonResponse.data;
      if (!result || !result.user) {
        throw new Error("Invalid data structure");
      }
  
      const user = {
        firstName: result.user[0].firstName,
        lastName: result.user[0].lastName
      };
  
      document.getElementById("userFullName").textContent = `Welcome, ${user.firstName} ${user.lastName}`;
  
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout();
    }
  }
  
export { loginAuth, logout};
