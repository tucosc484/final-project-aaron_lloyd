import { Component, OnInit } from '@angular/core';
import { ComponentBase } from 'buildmotion-core';
import { Router } from '@angular/router';
import { LoggingService, Severity } from 'buildmotion-logging';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent extends ComponentBase implements OnInit  {

  postContent: string;

  constructor(
    router: Router,
    loggingService: LoggingService,
    public formBuilder: FormBuilder,
  ) {
    super('PostComponent', loggingService, router);
   }

  ngOnInit() {
    // simulate retrieval of content from data store;
    this.postContent = `hello editor from post component`;
  }

  onMarkdownChange(markdown: string) {
    this.postContent = markdown;
    console.log(`markdown: ${this.postContent}`);
  }
}
