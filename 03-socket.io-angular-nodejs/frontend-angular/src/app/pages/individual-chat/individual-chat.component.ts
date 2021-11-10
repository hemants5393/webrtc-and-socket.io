import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageData, User } from 'src/app/models/user.model';
import { IndividualChatService } from 'src/app/services/individual-chat.service';

@Component({
  selector: 'app-individual-chat',
  templateUrl: './individual-chat.component.html',
  styleUrls: ['./individual-chat.component.scss'],
})
export class IndividualChatComponent implements OnInit, OnDestroy {
  public user: User | null = null;
  public users: Array<User> = [];
  public userName = '';
  public isLoggedIn = false;
  public header = 'Available users';
  public filterBy = 'name';
  public filterPlaceholder = 'Filter by user name';
  public isUserSelected = false;
  public selectedUser: User | null = null;
  public messagesMap: Map<string, Array<MessageData>> = new Map();
  public messagesList: Array<MessageData> | undefined;

  constructor(private readonly individualChatService: IndividualChatService) {}

  ngOnInit(): void {
    this.subscribeToCurrentUser();
    this.subscribeToAllUsers();
    this.subscribeToNewMessage();
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
        console.log('User disconnected on client:', this.user);
        this.isLoggedIn = false;
        this.user = null;
        this.selectedUser = null;
        this.userName = '';
      }
    });
  }

  private subscribeToAllUsers(): void {
    this.individualChatService.getAllUsers().subscribe((users: Array<User>) => {
      this.users = users.filter((user) => user.id !== this.user?.id);
      const lastSelectedUser = this.users.find(
        (user) => user.id === this.selectedUser?.id
      );
      if (!lastSelectedUser) {
        this.selectedUser = null;
        this.isUserSelected = false;
      } else {
        this.selectedUser = lastSelectedUser;
      }
    });
  }

  private subscribeToNewMessage(): void {
    this.individualChatService
      .getNewMessage()
      .subscribe((messageData: MessageData | null) => {
        if (messageData) {
          if (messageData?.isSender) {
            const receiverId = messageData?.receiver?.id;
            let messages: Array<MessageData>;
            if (this.messagesMap.get(receiverId)) {
              messages = [
                ...(this.messagesMap.get(receiverId) as Array<MessageData>),
                messageData,
              ];
            } else {
              messages = [messageData];
            }
            this.messagesMap.set(receiverId, messages);
          } else {
            const senderId = messageData?.sender?.id;
            let messages: Array<MessageData>;
            if (this.messagesMap.get(senderId)) {
              messages = [
                ...(this.messagesMap.get(senderId) as Array<MessageData>),
                messageData,
              ];
            } else {
              messages = [messageData];
            }
            this.messagesMap.set(senderId, messages);
          }
          if (this.selectedUser) {
            this.messagesList = this.messagesMap.get(this.selectedUser.id);
          }
        }
      });
  }

  public listItemClicked(user: User): void {
    this.isUserSelected = true;
    this.selectedUser = user;
    this.messagesList = this.messagesMap.get(this.selectedUser.id);
  }

  public sendMessage(message: string): void {
    if (message && this.selectedUser && this.user) {
      const messageData: MessageData = {
        message,
        sender: this.user,
        receiver: this.selectedUser,
      };
      this.individualChatService.sendMessage(messageData);
    }
  }

  ngOnDestroy(): void {
    this.disconnectUser();
  }
}
