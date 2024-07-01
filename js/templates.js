const loginHtml = /* html */`
    <form class="form" id="loginForm">>
        <span class="input-span">
            <label for="email" class="label">Email</label>
            <input required="" type="text" name="email" id="username"/>
        </span>
        <span class="input-span">
            <label for="password" class="label">Password</label>
            <input required="" type="password" name="password" id="password"/>
        </span>
        <button class="submit">Log In</button>
    </form>
`;


const homeHTML = /* html */`
    <div class="main-container" id="home">
        <header>
            <div class="logo">
                <img src="./assets/0.svg" alt="">
                <img src="./assets/1.svg" alt="">
            </div>
            <p class="welcome-message">welcome <strong></strong>!</p>
            <button class="Btn" id="logoutBtn">
                <div class="sign"><svg viewBox="0 0 512 512">
                        <path
                            d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z">
                        </path>
                    </svg>
                </div>
                <div class="text">Logout</div>
            </button>
        </header>
        <div class="container">
            <div class="top-row">
                <div class="left-column">
                    <div class="box box-stats">
                        <div class="sliding-container">
                            <div class="slide" style="background-color: var(--color3);color: white;">
                                <div class="stat-item">
                                    <div class="xp-value">
                                        <span class="number"></span>
                                    </div>
                                    <p>Audit's ratio</p>
                                </div>
                            </div>
                            <div class="slide" style="background-color: var(--color2);">
                                <div class="stat-item">
                                    <div class="xp-value">
                                        <span class="number"></span>
                                    </div>
                                    <p>current level</p>
                                </div>
                            </div>
                            <div class="slide" style="background-color: var(--color6);">
                                <div class="stat-item">
                                    <div class="xp-value">
                                        <span class="number"></span>
                                        <span class="unit"></span>
                                    </div>
                                    <p>total xp</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box box-working"><strong>
                            <p class="heading" data-target-resolver></p>
                        </strong></div>
                </div>
                <div class="box box-progression">Progression</div>
            </div>
            <div class="bottom-row">
                <div class="box box-projects">Projects
                    <div class="projet-graph" id="chartproject"></div>     
                </div>        
                <div class="box box-skills">
                    <h2>Skills</h2>
                    <div class="skills-graph" id="chart">
                    </div>
                </div>
            </div>
        </div>
    </div>
`
export { loginHtml, homeHTML }