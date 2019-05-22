import { Injectable } from '@angular/core';
import { Posts } from './posts'; 
import { Http, Response } from '@angular/http'; 

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: Http) { }

  private postsUrl = 'http://localhost:3000/posts'; 

  //get("/posts")
  getPosts(): Promise<void | Posts[]> {
    return this.http.get(this.postsUrl)
      .toPromise()
      .then(response => response.json() as Posts[]); 
  }

  getTopPosts(): Promise<void | Posts[]> {
    return this.http.get(this.postsUrl + '/top')
      .toPromise()
      .then(response => response.json() as Posts[]); 
  }

  //post("/posts")
  createPosts(title: string, content: string, author: string, likes: number, dislikes: number): Promise<void | Posts[]> {
    return this.http.post(this.postsUrl, {title, content, author, likes, dislikes})
      .toPromise()
      .then(response => response.json() as Posts[]); 
  }

  /* Alternate POST Post function */
  createPostsAlt(newPost: Posts): Promise<void | Posts> {
    return this.http.post(this.postsUrl, newPost)
      .toPromise()
      .then(response => response.json() as Posts); 
  }

  likePost(id: string): Promise<void | Posts> {
    return this.http.patch(this.postsUrl + '/like/:id', id)
      .toPromise()
      .then(response => response.json() as Posts); 
  }

  likePostv2(title: string): Promise<void | Posts> {
    return this.http.patch(this.postsUrl + '/like/', title)
      .toPromise()
      .then(response => response.json() as Posts); 
  }

  dislikePost(id: string): Promise<void | Posts> {
    return this.http.patch(this.postsUrl + '/dislike/:id', id)
      .toPromise()
      .then(response => response.json() as Posts); 
  }

}
