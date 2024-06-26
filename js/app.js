import { loginAuth, logout, checkAuth } from "./auth.js";
import { homeHtml, loginHtml } from "./templates.js";
import { executeGraphQLQuery } from "./utils.js";
import { queryUser, queryXp, queryAudits, querySkills, queryXpTotal, queryProject } from "./query.js";

const Form = document.getElementById('loginForm');

if (Form) {
    Form.addEventListener("submit", loginAuth);
}

function addLogoutListener() {
    const logout_btn = document.getElementById('logoutBtn');
    if (logout_btn) {
        logout_btn.addEventListener('click', logout);
    }
}

async function fetchAllData() {
    try {
        const [userResult, xpResult, auditsResult, skillsResult, xpTotalResult, projectResult] = await Promise.all([
            executeGraphQLQuery(queryUser),
            executeGraphQLQuery(queryXp),
            executeGraphQLQuery(queryAudits),
            executeGraphQLQuery(querySkills),
            executeGraphQLQuery(queryXpTotal),
            executeGraphQLQuery(queryProject)
        ]);

        if (!userResult || !userResult.user) {
            logout();
            throw new Error("Structure de données invalide pour les utilisateurs");
        }

        const data = {
            user: userResult.user[0],
            xp: xpResult.transaction,
            audits: auditsResult.transaction,
            skills: skillsResult.transaction,
            xpTotal: xpTotalResult.transaction_aggregate.aggregate.sum.amount,
            project: projectResult.xp_view
        };

        console.log("All data:", data);
        document.getElementById("userFullName").innerHTML = `
            Bienvenue, ${data.user.firstName} ${data.user.lastName} <br>
            Login: ${data.user.login} <br>
            Level: ${data.user.events[0].level}<br>
            Audits ratio: ${data.user.auditRatio}<br>
            Audits Done: ${data.user.totalUp}<br>
            Audits Received: ${data.user.totalDown}<br>
        `;
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        logout();
    }
}

function renderHome() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.remove();
    }
    document.body.insertAdjacentHTML('beforeend', homeHtml);
    addLogoutListener();
}

function renderLogin() {
    console.log("RENDER");
    const home = document.getElementById('home');
    const logoutbtn = document.getElementById('logoutBtn');
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.remove();
    }
    if (home) {
        home.remove();
    }
    if (logoutbtn) {
        logoutbtn.remove();
    }
    document.body.insertAdjacentHTML('beforeend', loginHtml);
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener("submit", loginAuth);
    }
}  

checkAuth();

// fetchAllData().then(data => {
//     if (data) {
//         document.getElementById("userFullName").textContent = `Bienvenue, ${data.user.firstName} ${data.user.lastName}`;
//         // Vous pouvez maintenant utiliser les autres données comme vous le souhaitez
//         console.log(data);
//     }
// });

export { addLogoutListener, fetchAllData as fetchUserData, renderHome, renderLogin };
