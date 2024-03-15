import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Myuser } from '../models/myuser';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject: BehaviorSubject<Myuser | null>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<Myuser | null>(
      this.getUser()
    );
  }

  getUserSubject() {
    return this.currentUserSubject;
  }

  getCurrentUserFromSubject() {
    return this.currentUserSubject.value;
  }

  getUser(): Myuser | null {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

  saveUser(user: Myuser) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  removeUser() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
}
