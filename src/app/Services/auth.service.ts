import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';
import { environment } from '../environments/environment.dev';
import { Iuser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}


  signup(user: Iuser): Observable<Iuser> {
    return this.http.post<Iuser>(`${environment.baseURL}/users`, user);
  }

  signin(user: Iuser): Observable<Iuser> {
    return this.http.get<Iuser[]>( `${environment.baseURL}/users?email=${user.email}&password=${user.password}` )
    .pipe(map((response) => {
          if (response.length) {
            return response[0];
          }
          throw new Error('Invalid username or password');
        })
      );
  }


}
