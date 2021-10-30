import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class IndividualChatService {
  public individualChatUsers$: BehaviorSubject<Array<object>> =
    new BehaviorSubject<Array<object>>([]);
  public currentUser$: BehaviorSubject<User> = new BehaviorSubject({
    name: 'Sample',
    id: '12345',
  });
  private socket = io('http://localhost:3000');

  constructor() {}

  public registerNewUser(userName: string): void {
    const user = {
      name: userName,
      id: this.socket.id,
    };
    this.socket.emit('register-new-individual-user', user);
    this.getCurrentUser();
    this.getIndividualUsers();
  }

  private getCurrentUser(): void {
    this.socket.on('new-registered-user', (user) => {
      this.currentUser$.next(user);
    });
  }

  private getIndividualUsers(): void {
    this.socket.on('individual-users', (users) => {
      this.individualChatUsers$.next(users);
    });
  }

  public disconnectIndividualUser(userName: string): void {
    const user = {
      name: userName,
      id: this.socket.id,
    };
    this.socket.emit('register-new-individual-user', user);
    this.getIndividualUsers();
  }

  public currentUser(): Observable<User> {
    return this.currentUser$.asObservable();
  }

  public individualChatUsersList(): Observable<Array<object>> {
    return this.individualChatUsers$.asObservable();
  }
}
