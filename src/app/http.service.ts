import { Injectable } from '@angular/core';
import { IUserModel } from './i-user-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiBaseUrl = 'https://bpdts-test-app.herokuapp.com';
  private corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';


  constructor(private http: HttpClient) { }

  getUsersByListedLocation(searchCity: string): Observable<IUserModel[]> {
    const endpoint = `/city/${searchCity}/users`;
    return this.http.get<IUserModel[]>(`${this.corsAnywhereUrl}${this.apiBaseUrl}${endpoint}`, httpOptions)
      .pipe(map(res => res))
      // Nb: error response handling not setup due to time
  }

  getAllUsers(): Observable<IUserModel[]> {
    const endpoint = `/users`;
    return this.http.get<IUserModel[]>(`${this.corsAnywhereUrl}${this.apiBaseUrl}${endpoint}`, httpOptions)
      .pipe(map(res => res))
      // Nb: error response handling not setup due to time
  }
}
