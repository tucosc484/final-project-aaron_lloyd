import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PostsComponent } from './posts/posts.component';
import { GroupsComponent } from './groups/groups.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TopicsComponent } from './topics/topics.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent},
  { path: 'posts', component: PostsComponent},
  { path: 'groups', component: GroupsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'topics', component: TopicsComponent},
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'} //redirects startup page to home component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
