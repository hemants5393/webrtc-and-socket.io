import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { OrderListModule } from 'primeng/orderlist';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [MenubarModule, OrderListModule],
})
export class SharedModule {}
