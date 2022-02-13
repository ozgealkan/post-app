import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  CanActivate
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { INITIAL_POSTS, INITIAL_USER } from 'src/initial.data';
import { User } from '../types/users';
import { PostService } from './requests/post-service/post.service';
import { UserService } from './requests/user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class InitializerGuard implements CanActivate {

	constructor(private userService: UserService, private postService: PostService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.initialize();
  }

  private initialize(): Observable<boolean> {
    return this.userService.getAll().pipe(
      switchMap((users) => {
        if(users.length == 0) {
          return of(false);
        }
        return of(true);
      }),
      switchMap((usersResponse) => {
          if(!usersResponse) {
            return this.userService.create(INITIAL_USER);
          }
          return of(false);
      }),
      switchMap((hasUserCreated) => {
        if(hasUserCreated) {
          return this.postService.bulkCreate(INITIAL_POSTS);
        }
        return of(false);
      }),
      switchMap((hasPostCreated) => of(true))
    )
  }

	private addInitialPosts() {
		this.postService.bulkCreate(INITIAL_POSTS).subscribe((res) => {});
	}
}
