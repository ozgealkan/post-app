import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {
	postFilter = new FormControl();
	user;
	dropdownStatus;

	constructor(private router: Router, private authService: AuthenticationService) {}

	ngOnInit(): void {
		const userInfo = this.authService.getUser();
		if(userInfo) {
			this.user = userInfo.name + ' ' + userInfo.surname;
		}
	}

	changeDropdownStatus(): void {
		this.dropdownStatus = !this.dropdownStatus;
	}

	logout(): void  {
		this.user = null;
		this.changeDropdownStatus();
		this.authService.deleteToken();
		this.authService.removeUser();
		this.router.navigate([ '/home' ]);
	}
}
