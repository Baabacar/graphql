const graphqlEndpoint = "https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql";
const signinEndpoint = "https://learn.zone01dakar.sn/api/auth/signin";

async function loginAuth(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const credentials = btoa(`${username}:${password}`);
    
    try {
        const response = await fetch(signinEndpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Invalid credentials');
        }
        
        const data = await response.json();
        
        localStorage.setItem('jwtToken', data);

    } catch (error) {
        console.error('Error:', error);
        alert('Invalid username or password');
    }
}

function logout() {
    localStorage.removeItem('jwtToken');
    console.log('Logged out');
}

async function fetchGraphQL(query, variables) {
    const jwt = localStorage.getItem('jwtToken');
    
    if (!jwt) {
        throw new Error('Not authenticated');
    }
    
    const response = await fetch(graphqlEndpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables
        })
    });
    
    return response.json();
}

export { loginAuth, logout, fetchGraphQL };
