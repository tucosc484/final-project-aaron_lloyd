import { Component, OnInit } from '@angular/core';
import { User } from '../services/user'; 
import { Groups } from '../services/groups'; 
import { Posts } from '../services/posts'; 
import { UsersService } from '../services/users.service';
import { GroupsService } from '../services/groups.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public posts;
  public groups;
  
  constructor(private _usersService: UsersService,
    private _groupssService: GroupsService,
    private _postsService: PostsService) { }

  ngOnInit() {
    this.posts = this._postsService.getTopPosts();
    this.groups = this._groupssService.getTopThreeGroups();
  }

}


