import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostListComponent } from './post-list/post-list.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { NgxIndexedDBModule, NgxIndexedDBService } from 'ngx-indexed-db';
import { HeaderComponent } from './header/header.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { LayoutComponent } from './layout/layout.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { dbConfig } from 'src/db.config';
import { FilterComponent } from './filter/filter.component';



@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    PostDetailComponent,
    LayoutComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [NgxIndexedDBService],
  bootstrap: [AppComponent]
})
export class AppModule { }
