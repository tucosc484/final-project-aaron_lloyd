import { Injectable } from '@angular/core';
import { Groups } from './groups';
import { Http, Response } from '@angular/http'; 

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: Http) { }

  private groupsUrl = 'http://localhost:3000/groups'; 

  //get("/groups")
  getGroups(): Promise<void | Groups[]> {
    return this.http.get(this.groupsUrl)
      .toPromise()
      .then(response => response.json() as Groups[]); 
  }

  getTopThreeGroups(): Promise<void | Groups[]> {
    return this.http.get(this.groupsUrl + '/topthree')
      .toPromise()
      .then(response => response.json() as Groups[]); 
  }

  getGroupMembers(groupId: string): Promise<void | Groups[]> {
    return this.http.get(this.groupsUrl + '/groupmembers', groupId)
      .toPromise()
      .then(response => response.json() as Groups[]); 
  }

  //post("/groups")
  createGroup(title: string, description: string, 
              creator: string, population: number): Promise<void | Groups[]> {
    return this.http.post(this.groupsUrl,
      {title, description, creator, population})
      .toPromise()
      .then(response => response.json() as Groups[]); 
  }

  /* Alternate POST Group function */
  createGroupAlt(newGroup: Groups): Promise<void | Groups> {
    return this.http.post(this.groupsUrl, newGroup)
      .toPromise()
      .then(response => response.json() as Groups); 
  }
  
 

}
