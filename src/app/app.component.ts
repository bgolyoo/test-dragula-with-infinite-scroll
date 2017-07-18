import { Component, OnInit } from '@angular/core';
import { Post } from './shared/post';
import { User } from './shared/user';
import { DataService } from './data.service';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  posts: Array<Post> = [];
  users: Array<User> = [];
  maxPosts = 20;
  threshold = 70;

  constructor(private ds: DataService, private dragulaService: DragulaService) {
    dragulaService.setOptions('infinite-bag', {
      moves: function (el, container, handle) {
        return handle.className === 'handle';
      }
    });
  }

  ngOnInit() {
    this.loadData();
  }

  getUser(userId: number): User {
    return this.users.find((user: User) => {
      return user.id === userId;
    });
  }

  getPostsAboveThreshold(max: number): Array<Post> {
    const postsAboveThreshold: Array<Post> = this.posts.filter((post: Post) => {
      return post.likes > this.threshold;
    });
    return postsAboveThreshold.slice(0, max);
  }

  getPostsBelowThreshold(max: number): Array<Post> {
    const postsAboveThreshold: Array<Post> = this.posts.filter((post: Post) => {
      return post.likes > this.threshold;
    });
    if (postsAboveThreshold.length < max) {
      return this.posts.slice(postsAboveThreshold.length, max);
    }
    return [];
  }

  getPosts(min, max): Array<Post> {
    return this.posts.slice(min, max);
  }

  onScrollDown() {
    console.log('scrolled down!!');
    this.maxPosts += 5;
  }

  onScrollUp() {
    console.log('scrolled up!!');
  }

  private loadData() {
    Observable.forkJoin(this.ds.getPosts(), this.ds.getUsers())
      .subscribe((response: [Array<Post>, Array<User>]) => {
        this.posts = response[0]
          .map((post: Post) => {
            const p: Post = post;
            p.likes = Math.floor(Math.random() * 99);
            return p;
          })
          .sort((a: Post, b: Post) => {
            return b.likes - a.likes;
          });
        this.users = response[1];
      });
  }

}
