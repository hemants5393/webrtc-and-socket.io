import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { IndividualChatService } from 'src/app/services/individual-chat.service';

@Component({
  selector: 'app-individual-chat',
  templateUrl: './individual-chat.component.html',
  styleUrls: ['./individual-chat.component.scss'],
})
export class IndividualChatComponent implements OnInit, OnDestroy {
  public user: User | undefined;
  public users: Array<object> = [];
  public userName = '';
  public isLoggedIn = false;
  public header = 'Available users';
  public filterBy = 'true';
  public filterPlaceholder = 'Filter by user name';
  constructor(private readonly individualChatService: IndividualChatService) {}

  ngOnInit(): void {
    this.subscribeToCurrentUser();
    this.subscribeToAllUsers();
  }

  public connectUser(): void {
    if (!this.userName) {
      return;
    }
    this.individualChatService.connectUser(this.userName);
  }

  public disconnectUser(): void {
    this.individualChatService.disconnectUser();
  }

  private subscribeToCurrentUser(): void {
    this.individualChatService.getCurrentUser().subscribe((user) => {
      if (user) {
        console.log('User connected on client:', user);
        this.isLoggedIn = true;
        this.user = user;
      } else {
        this.isLoggedIn = false;
        this.userName = '';
      }
    });
  }

  private subscribeToAllUsers(): void {
    this.individualChatService.getAllUsers().subscribe((users: Array<User>) => {
      this.users = users.filter((user) => user.id !== this.user?.id);
    });
  }

  ngOnDestroy(): void {
    this.disconnectUser();
  }
}
