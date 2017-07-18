import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Post } from './shared/post';
import { User } from './shared/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  private backendUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: Http) { }

   getPosts(): Observable<Array<Post>> {
    return this.http.get(`${this.backendUrl}/posts`)
      .map(resp => resp.json());
  }

   getUsers(): Observable<Array<User>> {
    return this.http.get(`${this.backendUrl}/users`)
      .map(resp => resp.json());
  }

}
