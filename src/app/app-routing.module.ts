import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth/auth.guard';
import { InitializerGuard } from './services/initializer.guard';

const routes: Routes = [
  {
    path: 'home',
    component: LayoutComponent,
    canActivate: [ InitializerGuard ],
    children: [
      {
        path: '',
        component: PostListComponent
      },
      {
        path: 'my-posts',
        component: PostListComponent,
        canActivate:[AuthGuard],
        data: { myPost: true }
      },
      {
        path: 'post-detail/:id',
        component: PostDetailComponent
      },
      {
        path: 'create-post',
        loadChildren: () => import('./create-post/create-post.module').then(m => m.CreatePostModule),
        canActivate: [AuthGuard]
      },
      {
        path:'edit-post/:id',
        loadChildren: () => import('./create-post/create-post.module').then(m => m.CreatePostModule),
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
