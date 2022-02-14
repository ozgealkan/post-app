import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/auth/authentication.service';
import { PostService } from '../services/requests/post-service/post.service';
import { Post } from '../types/post';

@Component({
	selector: 'app-post-detail',
	templateUrl: './post-detail.component.html',
	styleUrls: [ './post-detail.component.scss' ]
})
export class PostDetailComponent implements OnInit {
	postId: number;
	postItem: Post;
	initialized = false;
	isUserPost;
	isLoading=false;

	constructor(
		private activatedRoute: ActivatedRoute,
		private postService: PostService,
		private router: Router,
		private toaster: ToastrService,
		private AuthService: AuthenticationService
	) {
		this.postId = this.activatedRoute.snapshot.params.id;
	}

	ngOnInit(): void {
		this.getPostDetail();
	}

	get user() {
		return this.AuthService.getUser();
	}

	getPostDetail() {
		this.postService.getPostById(this.postId).subscribe(
			(item: Post) => {
				this.userPostCheck(item.userId);
				this.initialized = true;
				this.postItem = item;
				this.increaseDisplayCount();
			},
			(err) => {
				this.initialized = true;
				console.log(err);
			}
		);
	}

	edit(id: number) {
		this.router.navigate([ '/home/edit-post', id ]);
	}

	delete(id: number) {
		this.isLoading=true;
		this.postService.deletePostById(id).subscribe(
			() => {
				this.isLoading=false
				this.router.navigate([ '/home/my-posts' ]);
				this.toaster.success('Success');
			},
			(err) => {
				this.isLoading=false
				this.toaster.error('Delete operation failed', err);
			}
		);
	}

	increaseDisplayCount() {
		this.postItem.displayCount += 1;
		this.postService.update(this.postItem).subscribe((res) => {});
	}

	userPostCheck(id) {
		this.isUserPost = (this.user?.id == id)
	}
}
