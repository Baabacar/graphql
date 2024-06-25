import { loginAuth } from "./auth.js";

const Form = document.getElementById('loginForm')

if (Form) {
    Form.addEventListener("submit", loginAuth);
}