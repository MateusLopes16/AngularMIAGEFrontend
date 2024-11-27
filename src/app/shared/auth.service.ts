import { Injectable } from '@angular/core';
import { User } from '../login/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    new User('admin', 'admin', true),
  ];
  loggedInUser: User | undefined;

  constructor() {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      this.loggedInUser = JSON.parse(storedUser);
    }
  }

  login(username: string, password: string): boolean {
    for (const user of this.users) {
      if (user.username === username && user.password === password) {
        this.loggedInUser = user;
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        return true;
      }
    }
    return false;
  }

  createAccount(username: string, password: string): boolean {
    for (const user of this.users) {
      if (user.username === username) {
        return false;
      }
    }
    const newUser = new User(username, password, false);
    this.users.push(newUser);
    return true;
  }

  logout() {
    this.loggedInUser = undefined;
    localStorage.removeItem('loggedInUser');
  }

  isAdmin() {
    const isUserAdmin = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedInUser?.isAdmin);
        });
      }
    );
    return isUserAdmin;
  }

  isUserAdmin() {
    return this.loggedInUser?.isAdmin;
  }

  isLoggedIn() {
    return this.loggedInUser !== undefined;
  }

  displayUser() {
    console.log(this.users);
  }

  getUsername() {
    return this.loggedInUser?.username;
  }
}
