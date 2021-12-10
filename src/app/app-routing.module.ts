import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NewPostsComponent } from './new-posts/new-posts.component';
import { PostDetailsComponent } from './post-details/post-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about/us', component: AboutUsComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'posts/add', component: NewPostsComponent},
  {path: 'posts/:id',component: PostDetailsComponent},
  {path: 'posts/:id/edit', component: NewPostsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
