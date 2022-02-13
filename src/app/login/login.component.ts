import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/auth/authentication.service';
import { UserService } from '../services/requests/user-service/user.service';
import { User } from '../types/users';
import { createPasswordStrengthValidator } from '../validators/strength-password-validator';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
	isLoading = false;
	loginForm = new FormGroup({
		email: new FormControl(null, [ Validators.required, Validators.email ]),
		password: new FormControl(null, [ Validators.required, createPasswordStrengthValidator() ])
	});

	constructor(
		private router: Router,
		private authService: AuthenticationService,
		private userService: UserService,
		private toaster: ToastrService
	) {}

	get email(): AbstractControl {
		return this.loginForm.get('email');
	}

	get password(): AbstractControl {
		return this.loginForm.get('password');
	}

	ngOnInit(): void {}

	openRegister(): void {
		this.router.navigate([ '/register' ]);
	}

	login(): void {
		this.isLoading = true;
		if (!this.loginForm.valid) {
			this.loginForm.markAllAsTouched();
			this.isLoading = false;
		} else {
			this.checkUser();
		}
	}

	private checkUser(): void {
		this.userService.get(this.email.value).subscribe((user: User) => {
			if (!user) {
				this.toaster.error('User not found', 'Failed');
				this.isLoading = false;
				return;
			}
			if (user.password != this.password.value) {
				this.toaster.error('Password is wrong', 'Failed');
				this.isLoading = false;
				return;
			}
			this.navigateHome(user);
		});
	}

	private navigateHome(user: User): void {
		this.isLoading = false;
		this.authService.setToken();
		this.authService.setUser(user);
		this.router.navigate([ '/home' ]);
	}
}
