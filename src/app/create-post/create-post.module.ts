import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post.component';
import { CreatePostRoutingModule } from './create-post-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxIndexedDBModule, NgxIndexedDBService } from 'ngx-indexed-db';
import { ToastrModule } from 'ngx-toastr';
import { dbConfig } from 'src/db.config';



@NgModule({
  declarations: [
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    CreatePostRoutingModule,
    ReactiveFormsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    ToastrModule.forRoot()
  ],
  providers:[NgxIndexedDBService]
})
export class CreatePostModule { }
