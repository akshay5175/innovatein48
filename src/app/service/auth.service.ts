import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get username(): string | null {
    return sessionStorage.getItem("username");
  }

  get password(): string | null {
    return sessionStorage.getItem("password");
  }

  set setUsername(uname: string) {
    sessionStorage.setItem("username", uname);
  }

  set setPassword(pwd: string) {
    sessionStorage.setItem("password", pwd);
  }

  logOut() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
  }

  setSessionData(username: string, password: string) {
    this.setUsername = username;
    this.setPassword = password;
  }

  isAuthenticated() {
    return this.username === "admin" && this.password === "admin";
  }

  authenticate(username: string, password: string) {
    if (username === "admin" && password === "admin") {
      this.setSessionData(username, password);
    }

    return this.isAuthenticated();
  }
}
