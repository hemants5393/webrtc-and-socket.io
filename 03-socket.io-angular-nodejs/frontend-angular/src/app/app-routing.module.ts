import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupChatComponent } from './pages/group-chat/group-chat.component';
import { HomeComponent } from './pages/home/home.component';
import { IndividualChatComponent } from './pages/individual-chat/individual-chat.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'individual-chat',
    component: IndividualChatComponent,
  },
  {
    path: 'group-chat',
    component: GroupChatComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
