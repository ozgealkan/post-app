import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { User, UserCreate } from 'src/app/types/users';
import { delay } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	constructor(private dbService: NgxIndexedDBService) {}

	get(email: string) {
		return this.dbService.getByIndex('users', 'email', email).pipe(delay(2000));
	}

	create(data: UserCreate) {
		return this.dbService.add('users', data).pipe(delay(2000));
	}

	getAll() {
		return this.dbService.getAll('users');
	}
}
