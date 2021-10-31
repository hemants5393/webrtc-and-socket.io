import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { User } from '../models/user.model';
const SOCKET_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class IndividualChatService {
  public individualChatUsers$: BehaviorSubject<Array<User>> =
    new BehaviorSubject<Array<User>>([]);
  public currentUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>({
    name: 'Sample',
    id: '12345',
  });
  private user: User | null = null;
  private socket: Socket | null = null;

  constructor() {}

  public registerNewUser(userName: string): void {
    this.socket = io(SOCKET_URL);

    this.socket.on('connect', () => {
      const user = {
        name: userName,
        id: this.socket?.id,
      };
      this.socket?.emit('register-new-individual-user', user);
      this.getCurrentUser();
      this.getIndividualUsers();
    });
  }

  private getCurrentUser(): void {
    this.socket?.on('new-registered-user', (user: User) => {
      this.user = user;
      this.currentUser$.next(user);
    });
  }

  private getIndividualUsers(): void {
    this.socket?.on('individual-users', (users: Array<User>) => {
      this.individualChatUsers$.next(users);
    });
  }

  public disconnectIndividualUser(): void {
    this.socket?.disconnect();
    this.user = null;
    this.currentUser$.next(this.user);
    this.getIndividualUsers();
  }

  public currentUser(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  public individualChatUsersList(): Observable<Array<User>> {
    return this.individualChatUsers$.asObservable();
  }
}
