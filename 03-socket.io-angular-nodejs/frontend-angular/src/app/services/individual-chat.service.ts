import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { MessageData, User } from '../models/user.model';
const SOCKET_URL = 'http://localhost:3000/iChat'; // "iChat" is the namespace at backend

@Injectable({
  providedIn: 'root',
})
export class IndividualChatService {
  public individualChatUsers$: BehaviorSubject<Array<User>> =
    new BehaviorSubject<Array<User>>([]);
  public currentUser$: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  private iChatSocket: Socket | null = null;

  constructor() {}

  public connectUser(userName: string): void {
    this.iChatSocket = io(SOCKET_URL); // Create socket with namespace "iChat"
    this.iChatSocket.on('connect', () => {
      // Listen to default 'connect' event
      const user = {
        name: userName,
        id: this.iChatSocket?.id,
      };
      this.iChatSocket?.emit('connect-user', user);
      this.fetchCurrentUser();
      this.fetchAllUsers();
    });
  }

  public disconnectUser(): void {
    this.iChatSocket?.emit('disconnect-user');
    this.iChatSocket?.on('disconnect', () => {
      this.currentUser$.next(null);
      this.fetchAllUsers();
    });
  }

  private fetchCurrentUser(): void {
    this.iChatSocket?.on('current-user', (user: User) => {
      this.currentUser$.next(user);
    });
  }

  private fetchAllUsers(): void {
    this.iChatSocket?.on('all-users', (users: Array<User>) => {
      this.individualChatUsers$.next(users);
    });
  }

  public getCurrentUser(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  public getAllUsers(): Observable<Array<User>> {
    return this.individualChatUsers$.asObservable();
  }

  public sendMessage(messageData: MessageData): void {
    this.iChatSocket?.emit("message", messageData);
  }
}
