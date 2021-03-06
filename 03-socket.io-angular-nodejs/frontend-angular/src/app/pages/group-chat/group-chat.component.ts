import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.scss']
})
export class GroupChatComponent implements OnInit, OnDestroy {

  public newMessage: string = '';
  public messageList: string[] = [];
  public isLoggedIn = false;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    });
  }

  public sendMessage(): void {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  ngOnDestroy(): void {
    this.isLoggedIn = false;
  }

}
