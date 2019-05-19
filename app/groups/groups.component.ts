import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  public groups = []; //Array for list of groups (all groups)
  
  constructor() { }

  ngOnInit() {
  }

}
