import { loginHtml, homeHTML } from "./templates.js";
import { updateAnimationInDom } from "./animation.js";
import { loginAuth, logout, checkAuth } from "./auth.js";
import { returnChart, returnChartProject, returnChartProgression } from "./graph.js";
import { executeGraphQLQuery, getUserRank, formatAmount, updateAnimationStrings } from "./utils.js";
import { queryUser, queryXp, querySkills, queryXpTotal, queryProject, queryCurrentAndLastProject, queryTotalProjet } from "./query.js";

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
        const [userResult, xpResult, totalProjetResult, skillsResult, xpTotalResult, projectResult, projectStatusResult] = await Promise.all([
            executeGraphQLQuery(queryUser),
            executeGraphQLQuery(queryXp),
            executeGraphQLQuery(queryTotalProjet),
            executeGraphQLQuery(querySkills),
            executeGraphQLQuery(queryXpTotal),
            executeGraphQLQuery(queryProject),
            executeGraphQLQuery(queryCurrentAndLastProject)
        ]);

        if (!userResult || !userResult.user) {
            logout();
            throw new Error("Invalid data structure for users");
        }

        const progress = projectStatusResult?.progress || [];

        const currentProject = progress.find(item => item.group && item.group.status === "working");
        const lastProject = progress.filter(item => item.group && item.group.status === "finished")
            .sort((a, b) => new Date(b.group.createdAt) - new Date(a.group.createdAt))[0];

        const xpData = xpResult.transaction.map(xp => ({
            date: xp.createdAt,
            amount: xp.amount
        }));

        const data = {
            user: userResult.user[0],
            xp: xpData,
            totalProject: totalProjetResult.xp_view,
            skills: skillsResult.transaction,
            xpTotal: xpTotalResult.transaction_aggregate.aggregate.sum.amount,
            project: projectResult.xp_view,
            currentProject: currentProject ? currentProject.group.object.name : 'N/A',
            lastProject: lastProject ? lastProject.group.object.name : 'N/A'
        };

        return returnApi(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        logout();
    }
}

function returnApi(data) {
    let skillsString = '';
    const topSkills = data.skills
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 4);

    const skillNames = topSkills.map(transaction => transaction.type.replace("skill_", ""));
    const skillAmounts = topSkills.map(transaction => transaction.amount);

    topSkills.forEach(transaction => {
        skillsString += `${transaction.type.replace("skill_", "")}: ${transaction.amount}%<br>`;
    });

    const formattedXpTotal = formatAmount(data.xpTotal);

    const transformedData = {
        userFullName: `${data.user.firstName} ${data.user.lastName}`,
        level: `${data.user.events[0].level}`,
        auditRatio: `${data.user.auditRatio.toFixed(1)}`,
        xpTotal: `${formattedXpTotal.amount}`,
        xpUnit: formattedXpTotal.unit,
        rank: `You're an ${getUserRank(data.user.events[0].level)}`,
        lastProject: data.lastProject,
        currentProject: data.currentProject,
        projectsDone: `You've completed  ${data.totalProject.length}/126 projects`,
        skillNames: skillNames,
        project: data.project.map(project => ({
            name: project.object.name,
            amount: formatAmount(project.amount).amount,
            unit: formatAmount(project.amount).unit
        })),
        skillAmounts: skillAmounts,
        xpProgression: data.xp
    };

    const animationStrings = updateAnimationStrings(transformedData);
    displayData(transformedData, animationStrings);
}


function displayData(data, animationStrings) {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.remove();
    }

    document.body.insertAdjacentHTML('beforeend', homeHTML);

    document.querySelector('.welcome-message strong').textContent = data.userFullName;
    document.querySelector('.slide:nth-child(1) .number').textContent = data.auditRatio;
    document.querySelector('.slide:nth-child(2) .number').textContent = data.level;
    document.querySelector('.slide:nth-child(3) .number').textContent = data.xpTotal;
    document.querySelector('.slide:nth-child(3) .unit').textContent = data.xpUnit;

    if (typeof updateAnimationInDom === 'function') {
        updateAnimationInDom(animationStrings);
    }

    setTimeout(() => {
        const chart = returnChart(data.skillNames, data.skillAmounts);
        if (chart) {
            chart.render();
        }
    }, 0);

    setTimeout(() => {
        if (data.project && Array.isArray(data.project)) {
            const projectNames = data.project.map(item => item.name);
            const projectAmounts = data.project.map(item => item.amount);
            const charts = returnChartProject(projectNames, projectAmounts);
            if (charts) {
                charts.render();
            }
        } 
    }, 0);

    setTimeout(() => {
        const chart = returnChartProgression(data.xpProgression);
        if (chart) {
            chart.render();
        }
    }, 0);

    addLogoutListener();
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
