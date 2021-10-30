import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-users-or-rooms',
  templateUrl: './display-users-or-rooms.component.html',
  styleUrls: ['./display-users-or-rooms.component.scss'],
})
export class DisplayUsersOrRoomsComponent implements OnInit {
  @Input() header = '';
  @Input() list: object[] = [];
  @Input() filterBy = '';
  @Input() filterPlaceholder = '';

  constructor() {}

  ngOnInit(): void {}
}
