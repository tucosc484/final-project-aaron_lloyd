import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PostsComponent } from './posts/posts.component';
import { GroupsComponent } from './groups/groups.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent},
  { path: 'posts', component: PostsComponent},
  { path: 'groups', component: GroupsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
