import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/auth/authentication.service';
import { PostService } from '../services/requests/post-service/post.service';
import { Post, PostCreate, PostUpdate } from '../types/post';

@Component({
	selector: 'app-create-post',
	templateUrl: './create-post.component.html',
	styleUrls: [ './create-post.component.scss' ]
})
export class CreatePostComponent implements OnInit {
	isLoading = false;
	postForm = new FormGroup({
		title: new FormControl(null, Validators.required),
		content: new FormControl(null, Validators.required),
		additionalInfo: new FormControl(null)
	});
	postId: number;
	post: Post;

	constructor(
		private dbService: NgxIndexedDBService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private toaster: ToastrService,
		private AuthService: AuthenticationService,
		private postService: PostService
	) {
		this.postId = this.activatedRoute.snapshot.params.id;
	}

	ngOnInit(): void {
		if (this.postId) {
			this.dbService.getByID('posts', +this.postId).subscribe(
				(item: any) => {
					this.post = item;
					this.postForm.controls.title.patchValue(item.title);
					this.postForm.controls.content.patchValue(item.content);
					this.postForm.controls.additionalInfo
						? this.postForm.controls.additionalInfo.patchValue(item.moreInfo)
						: this.postForm.controls.additionalInfo.patchValue('');
				},
				(err) => {
					console.log(err);
				}
			);
		}
	}
	get user() {
		return this.AuthService.getUser();
	}

	createPost(status): void {
		this.isLoading = true;
		const createdAt = new Date().toISOString().split('T')[0]; + ' ' + this.getCurrentTime()
		const data: PostCreate = {
			userId: this.user.id,
			username:this.user.name+ ' ' + this.user.surname,
			title: this.postForm.controls.title.value,
			content: this.postForm.controls.content.value,
			createdAt,
			updatedAt: createdAt,
			moreInfo: this.postForm.controls.additionalInfo.value,
			published: status,
			displayCount: 0
		};
		this.postService.create(data).subscribe(
			(res) => {
				this.isLoading = false;
				this.toaster.success('Post creation is successfull');
				this.router.navigate([ '/home/my-posts' ]);
			},
			(err) => {
				this.isLoading = false;
				this.toaster.error('Post creation is failed');
			}
		);
	}

	updatePost(status): void {
		this.isLoading = true;
		const updatedAt = new Date().toISOString().split('T')[0]; + ' ' + this.getCurrentTime()
		const data: PostUpdate = {
			id: +this.postId,
			userId: this.user.id,
			username:this.user.name+ ' ' + this.user.surname,
			title: this.postForm.controls.title.value,
			content: this.postForm.controls.content.value,
			createdAt: this.post.createdAt,
			updatedAt,
			displayCount: this.post.displayCount,
			moreInfo: this.postForm.controls.additionalInfo.value,
			published: status
		};
		this.postService.update(data).subscribe(
			(res) => {
				this.toaster.success('Post update is successfull');
				this.router.navigate([ '/home/my-posts' ]);
				this.isLoading = false;
			},
			(err) => {
				this.isLoading = false;
				this.toaster.error('Post update is failed');
			}
		);
	}

	savePost(status: number): void {
		if (!this.postForm.valid) {
			this.postForm.markAllAsTouched();
			return;
		}
		if (this.postId) {
			this.updatePost(status);
		} else {
			this.createPost(status);
		}
	}

	private getCurrentTime(): string {
		const today = new Date();
		return today.getHours + ':' + today.getMinutes();
	}
}
