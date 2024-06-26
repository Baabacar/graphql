const graphqlEndpoint = "https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql";

async function executeGraphQLQuery(query, variables = {}) {
  const jwt = localStorage.getItem("jwt");
  
  if (!jwt) {
    throw new Error("JWT non trouvé. L'utilisateur pourrait ne pas être authentifié.");
  }

  try {
    const response = await fetch(graphqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error("La réponse réseau n'était pas correcte.");
    }

    const jsonResponse = await response.json();

    if (jsonResponse.errors) {
      throw new Error(jsonResponse.errors[0].message);
    }
    console.log("Response:", jsonResponse.data);
    return jsonResponse.data;
  } catch (error) {
    console.error("Erreur d'exécution de la requête GraphQL :", error);
    throw error;
  }
}

export { executeGraphQLQuery };
