import { Component, OnInit } from '@angular/core';
import { Groups } from '../services/groups'; 
import { GroupsService } from '../services/groups.service';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groupsModel = new Groups('','',0,'','',[])
  
  constructor(private _groupsService: GroupsService) { }

  ngOnInit() {
  }

  onSubmit() {
    alert("New group has been created!");


    this._groupsService.createGroup(
      this.groupsModel.title,
      this.groupsModel.description,
      this.groupsModel.creator,
      0); 
  }
}
