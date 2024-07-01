import { loginHtml, homeHTML } from "./templates.js";
import { textAnimate } from "./animation.js";
import { loginAuth, logout, checkAuth } from "./auth.js";
import { executeGraphQLQuery, convertBytes, getUserRank, formatAmount } from "./utils.js";
import { queryUser, queryXp, queryAudits, querySkills, queryXpTotal, queryProject, queryCurrentAndLastProject } from "./query.js";

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
        const [userResult, xpResult, auditsResult, skillsResult, xpTotalResult, projectResult, projectStatusResult] = await Promise.all([
            executeGraphQLQuery(queryUser),
            executeGraphQLQuery(queryXp),
            executeGraphQLQuery(queryAudits),
            executeGraphQLQuery(querySkills),
            executeGraphQLQuery(queryXpTotal),
            executeGraphQLQuery(queryProject),
            executeGraphQLQuery(queryCurrentAndLastProject)
        ]);

        if (!userResult || !userResult.user) {
            logout();
            throw new Error("Structure de données invalide pour les utilisateurs");
        }

        // Ensure projectStatusResult and progress are properly defined
        const progress = projectStatusResult?.progress || [];
        
        // Find the current and last projects
        const currentProject = progress.find(item => item.group && item.group.status === "working");
        const lastProject = progress.filter(item => item.group && item.group.status === "finished")
                                    .sort((a, b) => new Date(b.group.createdAt) - new Date(a.group.createdAt))[0];

        const data = {
            user: userResult.user[0],
            xp: xpResult.transaction,
            audits: auditsResult.transaction,
            skills: skillsResult.transaction,
            xpTotal: xpTotalResult.transaction_aggregate.aggregate.sum.amount,
            project: projectResult.xp_view,
            currentProject: currentProject ? currentProject.group.object.name : 'N/A',
            lastProject: lastProject ? lastProject.group.object.name : 'N/A'
        };

        return returnApi(data);
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        logout();
    }
}


function returnApi(data) {
    // Préparer les données pour l'affichage
    let skillsString = '';
    data.skills.forEach(transaction => {
        skillsString += `${transaction.type.replace("skill_","")}: ${transaction.amount}%<br>`;
    });

    const formattedXpTotal = formatAmount(data.xpTotal);

    const transformedData = {
        userFullName: `${data.user.firstName} ${data.user.lastName}`,
        level: `${data.user.events[0].level}`,
        auditRatio: `${data.user.auditRatio.toFixed(1)}`,
        xpTotal: `${formattedXpTotal.amount}`,
        xpUnit: formattedXpTotal.unit,
        rank: `You're an ${getUserRank(data.user.events[0].level)}`,
        lastProject: `You're latest project is ${data.lastProject}`,
        currentProject: `You're working on ${data.currentProject}`,
        skills: `Skills: ${skillsString}`,
    };

    displayData(transformedData);
}

function displayData(data) {
    
}

function renderHome() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.remove();
    }
    document.body.insertAdjacentHTML('beforeend', homeHTML);
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

export { addLogoutListener, fetchAllData as fetchUserData, renderHome, renderLogin };

// firstname, lastname, xptotal, level,  rank, ratio, projet actuelle, derniere projet, nbr total de projet fait
// graph skill , graph projet fait , graph nombre de xp gagner 
