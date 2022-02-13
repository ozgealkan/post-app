import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { PostCreate, PostUpdate } from 'src/app/types/post';
import { delay } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class PostService {
	constructor(private dbService: NgxIndexedDBService) {}

	getAllPosts() {
		return this.dbService.getAllByIndex('posts', 'published', IDBKeyRange.only(1)).pipe(delay(2000));
	}
	getPostById(id: number) {
		return this.dbService.getByID('posts', +id).pipe(delay(2000));
	}
	getPostsByUser(user: any) {
		return this.dbService.getAllByIndex('posts', 'userId', IDBKeyRange.only(user)).pipe(delay(2000));
	}
	deletePostById(id: number) {
		return this.dbService.deleteByKey('posts', +id).pipe(delay(2000));
	}
	create(data: PostCreate) {
		return this.dbService.add('posts', data).pipe(delay(2000));
	}
	update(data: PostUpdate) {
		return this.dbService.update('posts', data).pipe(delay(2000));
	}
	bulkCreate(data) {
		return this.dbService.bulkAdd('posts', data);
	}
}
