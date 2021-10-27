import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private message$: BehaviorSubject<string> = new BehaviorSubject(
    'Default message!'
  );
  private socket = io('http://localhost:3000');

  constructor() {}

  public sendMessage(message: string) {
    this.socket.emit('hello', message);
  }

  public getNewMessage(): Observable<string> {
    this.socket.on('hello', (message) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  }
}
