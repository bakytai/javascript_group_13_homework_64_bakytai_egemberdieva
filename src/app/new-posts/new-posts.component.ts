import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-posts',
  templateUrl: './new-posts.component.html',
  styleUrls: ['./new-posts.component.css']
})
export class NewPostsComponent  {
  title!: string;
  text!: string;
  data!: string;

  constructor(public http: HttpClient) { }

  createPost() {
    this.data = new Date().toISOString();
    const data = this.data;
    const title = this.title;
    const text = this.text;

    const body = {data, title, text};
    this.http.post('https://plovo-13-default-rtdb.firebaseio.com/posts.json', body).subscribe();
  }
}
