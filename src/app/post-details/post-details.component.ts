import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from '../shared/post.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post!: Post;
  id!: string;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
     const id = params['id'];
      this.http.get<Post>(`https://plovo-13-default-rtdb.firebaseio.com/posts/${id}.json`)
        .pipe(map(post => {
          console.log(post);
          return new Post(post.id, post.data, post.title, post.text);
        }))
        .subscribe(post => {
          this.post = post
        });
    });
  }

}
