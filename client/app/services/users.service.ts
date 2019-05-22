import { Injectable } from '@angular/core';
import { User } from './user'; 
import { Http, Response, Headers } from '@angular/http'; 

@Injectable({
  providedIn: 'root'
})

export class UsersService {


  private usersUrl = 'http://localhost:3000/users'; 

  constructor(private http: Http) {}

  //get("/users")
  getUsers(): Promise<void | User[]> {
    return this.http.get(this.usersUrl)
      .toPromise()
      .then(response => response.json() as User[]); 
  }

  getUser(username: string): Promise<void | User[]> {
    return this.http.get(this.usersUrl + '/' + username)
      .toPromise()
      .then(response => response.json() as User[]); 
  }

  createUser(username: string, password: string, email: string): Promise<void | User[]> {
    return this.http.post(this.usersUrl, {username, password, email})
      .toPromise()
      .then(response => response.json() as User[]); 
  }

  /* Alternate POST User function */
  createUserAlt(newUser: User): Promise<void | User> {
    return this.http.post(this.usersUrl, newUser)
      .toPromise()
      .then(response => response.json() as User); 
  }

  //Add Delete User function


}
