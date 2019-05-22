import { Component, OnInit } from '@angular/core';
import { Posts } from '../services/posts'; 
import { PostsService } from '../services/posts.service';
import { parseHostBindings } from '@angular/compiler';
//import { ngmodule } from '@angular/core'; 


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postsModel = new Posts('','','','',0,0); 

  postid; 
  
  constructor(private _postsService: PostsService) { }

  ngOnInit() {

  }

  onSubmit() {
    alert("New Post Created!");

    this._postsService.createPosts(
      this.postsModel.title,
      this.postsModel.content,
      this.postsModel.author,
      0,0); 
  }

  likePost(){
    alert("You liked a post" + ' ' + this.postid);
    this._postsService.likePost(this.postid); 
  }

}
