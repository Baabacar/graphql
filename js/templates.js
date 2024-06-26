
const loginHtml = `
    <form class="form-control" id="loginForm">
        <p class="title">Login</p>
        <input required="" class="input" id="username" type="text" placeholder="username"/>
        <input required="" class="input" id="password" type="password" placeholder="password"/>
        <button class="submit-btn">Sign In</button>
    </form>
`
const homeHtml = `
    <div id="home">
        <div id="userFullName"></div>
    </div>
    <button id="logoutBtn">Logout</button>
`

// const dataHtml = 
const brouillon = `
    <form class="form-control" id="loginForm">
        <p class="title">Login</p>
        <div class="input-field">
          <input required="" class="input" id = "username" type="text" />
          <label class="label" for="input">Enter Email</label>
        </div>
        <div class="input-field">
          <input required="" class="input" id = "password" type="password" />
          <label class="label" for="input">Enter Password</label>
        </div>
        <button class="submit-btn">Sign In</button>
    </form>
    <div id="userFullName"></div>
    <button onclick="logout()">Logout</button>
`
export { loginHtml, homeHtml }