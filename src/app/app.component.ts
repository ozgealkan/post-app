import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { INITIAL_POSTS, INITIAL_USER } from 'src/initial.data';
import { PostService } from './services/requests/post-service/post.service';
import { UserService } from './services/requests/user-service/user.service';
import { User, UserCreate } from './types/users';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
	title = 'zenigma-post-app';
}
