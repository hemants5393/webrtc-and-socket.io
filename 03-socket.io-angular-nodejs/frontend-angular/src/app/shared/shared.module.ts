import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { OrderListModule } from 'primeng/orderlist';
import { DisplayUsersOrRoomsComponent } from './components/display-users-or-rooms/display-users-or-rooms.component';

@NgModule({
  declarations: [DisplayUsersOrRoomsComponent],
  imports: [CommonModule, OrderListModule],
  exports: [DisplayUsersOrRoomsComponent, MenubarModule, OrderListModule],
})
export class SharedModule {}
