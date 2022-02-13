import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/types/users';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private user: User | null;

	constructor(private router: Router) {
		this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
		window.addEventListener('storage', (event) => {
			if (event.key === 'token' && (router.url.includes('my-posts') || router.url.includes('create-post'))) {
				this.router.navigate([ '/login' ]);
			}
		});
	}

	setToken() {
		localStorage.setItem('token', '123xyz');
	}

	deleteToken() {
		localStorage.removeItem('token');
	}

	getToken() {
		return localStorage.getItem('token');
	}

	setUser(user: User): void {
		this.user = user;
		localStorage.setItem('user', JSON.stringify(this.user));
	}

	getUser(): User | null {
		return this.user || null;
	}

	removeUser() {
		localStorage.removeItem('user');
	}
}
