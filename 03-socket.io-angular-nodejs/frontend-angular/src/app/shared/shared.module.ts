import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { OrderListModule } from 'primeng/orderlist';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DisplayUsersOrRoomsComponent } from './components/display-users-or-rooms/display-users-or-rooms.component';

@NgModule({
  declarations: [DisplayUsersOrRoomsComponent],
  imports: [
    CommonModule,
    MenubarModule,
    OrderListModule,
    CardModule,
    ButtonModule,
    InputTextModule,
  ],
  exports: [
    DisplayUsersOrRoomsComponent,
    MenubarModule,
    OrderListModule,
    CardModule,
    ButtonModule,
    InputTextModule,
  ],
})
export class SharedModule {}
