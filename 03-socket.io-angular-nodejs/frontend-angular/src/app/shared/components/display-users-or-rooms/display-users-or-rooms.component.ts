import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { OrderList } from 'primeng/orderlist';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-display-users-or-rooms',
  templateUrl: './display-users-or-rooms.component.html',
  styleUrls: ['./display-users-or-rooms.component.scss'],
})
export class DisplayUsersOrRoomsComponent implements OnInit, OnChanges {
  @Input() header = '';
  @Input() list: object[] = [];
  @Input() filterBy = '';
  @Input() filterPlaceholder = '';
  @Input() selectedUser: User | null = null;
  @Output() listItemClickedEvent = new EventEmitter();
  @ViewChild('orederListRef') orederListRef: OrderList | undefined;
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.selectedUser) {
      if (this.selectedUser && this.orederListRef) {
        // Retain the selected user in selection when the list of all users refreshes
        this.orederListRef.selection = [this.selectedUser];
        this.orederListRef.selectionChange.emit(this.orederListRef.selection);
      }
    }
  }
}
