import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
	isMobileMenuVisible = false;

	constructor(private router: Router, private authService: AuthenticationService,private toastrService:ToastrService) {}

	ngOnInit(): void {
		const userInfo = this.authService.getUser();
		if (userInfo) {
			this.user = userInfo.name + ' ' + userInfo.surname;
		}
	}

	changeDropdownStatus(): void {
		this.dropdownStatus = !this.dropdownStatus;
	}

	logout(): void {
		this.user = null;
		this.changeDropdownStatus();
		this.authService.deleteToken();
		this.authService.removeUser();
		this.router.navigate([ '/home' ]);
		this.toastrService.success('Logout is successful')
	}

	toggleMobileMenu() {
		this.isMobileMenuVisible = !this.isMobileMenuVisible;
	}
}
