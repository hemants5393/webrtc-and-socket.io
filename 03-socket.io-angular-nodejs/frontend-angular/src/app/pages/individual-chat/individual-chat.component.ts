import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { IndividualChatService } from 'src/app/services/individual-chat.service';

@Component({
  selector: 'app-individual-chat',
  templateUrl: './individual-chat.component.html',
  styleUrls: ['./individual-chat.component.scss'],
})
export class IndividualChatComponent implements OnInit, OnDestroy {
  public users: Array<object> = [];
  public userName = '';
  public user: User | undefined;
  public header = 'Available users';
  public filterBy = 'true';
  public filterPlaceholder = 'Filter by user name';
  public isLoggedIn = false;
  constructor(private readonly individualChatService: IndividualChatService) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.subscribeToUsers();
  }

  private getCurrentUser(): void {
    this.individualChatService.currentUser().subscribe((user) => {
      if (user) {
        this.user = user;
      } else {
        this.isLoggedIn = false;
        this.userName = '';
      }
    });
  }

  private subscribeToUsers(): void {
    this.individualChatService
      .individualChatUsersList()
      .subscribe((users: Array<User>) => {
        this.users = users.filter((user) => user.id !== this.user?.id);
      });
  }

  public enterIndividualChat(): void {
    if (!this.userName) {
      return;
    }
    this.isLoggedIn = true;
    this.individualChatService.registerNewUser(this.userName);
  }

  public disconnectUser(): void {
    this.individualChatService.disconnectIndividualUser();
  }

  ngOnDestroy(): void {
    this.disconnectUser();
  }
}
