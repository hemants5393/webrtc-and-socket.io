import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';

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
  @Input() selectedUser: User | null = null;
  @Output() listItemClickedEvent = new EventEmitter();
  private selectedListItem: any;

  constructor() {}

  public onListItemClicked(listItem: any[]): void {
    if (listItem?.length === 1) {
      this.selectedListItem = listItem[0];
    } else {
      listItem = [this.selectedListItem];
    }
    this.listItemClickedEvent.emit(listItem[0]);
  }

  ngOnInit(): void {}
}
