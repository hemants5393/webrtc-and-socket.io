import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent implements OnInit {
  public items: MenuItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'My Chat App',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/home'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Individual Chat',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/individual-chat'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Group Chat',
        icon: 'pi pi-fw pi-users',
        routerLink: ['/group-chat'],
        routerLinkActiveOptions: { exact: true },
      },
    ];
  }
}
