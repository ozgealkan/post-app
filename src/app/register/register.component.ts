import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/requests/user-service/user.service';
import { UserCreate } from '../types/users';
import { createPasswordStrengthValidator } from '../validators/strength-password-validator';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent implements OnInit {
	isLoading = false;
	registerForm = new FormGroup({
		name: new FormControl(null, Validators.required),
		surname: new FormControl(null, Validators.required),
		email: new FormControl(null, [ Validators.required, Validators.email ]),
		password: new FormControl(null, [ Validators.required, createPasswordStrengthValidator() ]),
		confirmPassword: new FormControl(null, Validators.required)
	});

	constructor(private router: Router, private userService: UserService, private toaster: ToastrService) {}

	ngOnInit(): void {}

	openLogin(): void {
		this.router.navigate([ '/login' ]);
	}
	get name(): AbstractControl {
		return this.registerForm.get('name');
	}

	get surname(): AbstractControl {
		return this.registerForm.get('surname');
	}

	get email(): AbstractControl {
		return this.registerForm.get('email');
	}

	get password(): AbstractControl {
		return this.registerForm.get('password');
	}

	createUser(): void {
		this.isLoading = true;
		if (!this.registerForm.valid) {
			this.registerForm.markAllAsTouched();
			this.isLoading = false;
		}
		const value = this.registerForm.value;
		const data: UserCreate = {
			name: value.name,
			surname: value.surname,
			email: value.email,
			password: value.password
		};
		this.userService.create(data).subscribe(
			(key) => {
				this.isLoading = false;
				this.toaster.success('Success');
				this.router.navigate([ '/login' ]);
			},
			(err) => {
				this.toaster.error('Update operation is failed');
				this.isLoading = false;
			}
		);
	}
}
