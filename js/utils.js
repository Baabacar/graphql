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

function convertBytes(bytes) {
    console.log("bytes", bytes);
    if (bytes === 0) return '0 B';

    const sizes = ['B', 'kB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = sizes[i];
    const value = (bytes / Math.pow(1024, i)).toFixed(0);

    return `${value} ${size}`;
}

function getUserRank(level) {
    if (level >= 50) {
        return 'Junior developer';
    } else if (level >= 40) {
        return 'Basic developer';
    } else if (level >= 30) {
        return 'Assistant developer';
    } else if (level >= 20) {
        return 'Apprentice developer';
    } else if (level >= 10) {
        return 'Beginner developer';
    } else {
        return 'Aspiring developer';
    }
}

function formatAmount(amount) {
    let amountInKB = amount / 1000;
    let displayAmount = amountInKB;
    let displayUnit = 'KB';
    if (amountInKB > 1000) {
        displayAmount = amountInKB / 1000;
        displayUnit = 'MB';
        displayAmount = Math.floor(displayAmount * 100) / 100;
    }
    return `${displayAmount.toFixed(displayUnit === 'MB' ? 2 : 0)} ${displayUnit}`;
}

export { executeGraphQLQuery, convertBytes, getUserRank, formatAmount };
