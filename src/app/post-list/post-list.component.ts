import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { PostService } from '../services/requests/post-service/post.service';
import { Post } from '../types/post';

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: [ './post-list.component.scss' ]
})
export class PostListComponent implements OnInit {
	postList: Post[] = [];
	originalPostList: Post[] = [];
	myPostList: Post[] = [];
	myPost: boolean = false;
	initialized = false;

	constructor(
		private router: Router,
		private postService: PostService,
		private activatedRoute: ActivatedRoute,
		private authService: AuthenticationService
	) {
		this.myPost = this.activatedRoute.snapshot.data.myPost;
	}

	ngOnInit(): void {
		this.myPost ? this.getMyPosts() : this.getAllPosts();
	}

	openPostDetail(id: number): void {
		this.router.navigate([ '/home/post-detail', id ]);
	}

	filterPosts(event): void {
		console.log('filter', event);
		let filterItems = this.originalPostList.filter(
			(item) => this.checkTitleFilter(item, event.title) && this.checkUsernameFilter(item, event.publisher)
		);
		this.postList = this.dateSort(filterItems, event.dateSort);
	}

	private getAllPosts(): void {
		this.postService.getAllPosts().subscribe(
			(items: any) => {
				this.initialized = true;
				this.originalPostList = items;
				this.postList = [...this.originalPostList];
			},
			(err) => {
				this.initialized = true;
			}
		);
	}

	private getMyPosts(): void {
		const user = this.authService.getUser();
		this.postService.getPostsByUser(user.id).subscribe(
			(items: any) => {
				this.initialized = true;
				this.originalPostList = items;
				this.postList = [...this.originalPostList];
			},
			(err) => {
				console.log(err);
			}
		);
	}

	private checkUsernameFilter(post, nameFilter: string): boolean {
		return nameFilter ? post.username.toLowerCase().includes(nameFilter.toLowerCase()) : true;
	}
	private checkTitleFilter(post, titleFilter: string): boolean {
		return titleFilter ? post.title.toLowerCase().includes(titleFilter.toLowerCase()) : true;
	}
	private dateSort(post, dateSort: string) {
		if (dateSort == 'ascending') {
			return post.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
		} else {
			return post.sort((firstItem, secondItem) => secondItem.id - firstItem.id);
		}
	}
}
