import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from '../shared/post.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-posts',
  templateUrl: './new-posts.component.html',
  styleUrls: ['./new-posts.component.css']
})
export class NewPostsComponent implements OnInit{
  title!: string;
  text!: string;
  data!: string;
  id!: string;
  mainTitle!: string;

  constructor(public http: HttpClient,public route: ActivatedRoute, public routeService: Router) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.id = id;
      if (this.id) {
        this.mainTitle = 'Редактировать пост';
        this.http.get<Post>(`https://plovo-13-default-rtdb.firebaseio.com/posts/${id}.json`)
          .pipe(map(post => {
            console.log(post);
            return new Post(post.id, post.data, post.title, post.text);
          }))
          .subscribe(post => {
            this.title = post.title;
            this.text = post.text
          });
      } else {
        this.mainTitle = 'Добавить новый пост';
      }
    });
  }

  createPost() {
    this.data = new Date().toISOString();
    const data = this.data;
    const title = this.title;
    const text = this.text;
    const body = {data, title, text};

    if (this.id) {
      this.http.put(`https://plovo-13-default-rtdb.firebaseio.com/posts/${this.id}.json`, body).subscribe();
    } else {
      this.http.post('https://plovo-13-default-rtdb.firebaseio.com/posts.json', body).subscribe();
    }
    this.http.get<{[id: string]: Post}>('https://plovo-13-default-rtdb.firebaseio.com/posts.json').subscribe();
    void this.routeService.navigate(['/']);
  }
}
