import { Component, OnInit } from '@angular/core';
import { Post } from './shared/post';
import { User } from './shared/user';
import { DataService } from './data.service';
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

  constructor(private ds: DataService) { }

  ngOnInit() {
    this.loadData();
  }

  getUser(userId: number): User {
    return this.users.find((user: User) => {
      return user.id === userId;
    });
  }

  getPosts(maxPosts): Array<Post> {
    return this.posts.slice(0, maxPosts);
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
        this.posts = response[0];
        this.users = response[1];
        console.log(this.posts, this.users);
      });
  }

}
