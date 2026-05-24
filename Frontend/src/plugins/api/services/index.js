import LoginService from "./services/LoginService.js";


export const registerServices = (app) : void => {
    app.provide("loginService", LoginService);
}