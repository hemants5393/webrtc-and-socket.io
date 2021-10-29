import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-individual-chat',
  templateUrl: './individual-chat.component.html',
  styleUrls: ['./individual-chat.component.scss'],
})
export class IndividualChatComponent implements OnInit {
  public users: object[] = [];
  constructor() {}

  ngOnInit(): void {
    this.users = [
      { name: 'Hemant' },
      { name: 'John' },
      { name: 'Jessica' },
      { name: 'Peter' },
      { name: 'Emily' },
      { name: 'Joanna' },
      { name: 'Selena' },
      { name: 'Ron' },
      { name: 'Harry' },
      { name: 'Frank' },
      { name: 'Ross' },
      { name: 'Kane' },
      { name: 'Steve' },
      { name: 'Glenn' },
      { name: 'Rick' },
      { name: 'Daryl' },
      { name: 'Maggie' },
      { name: 'Carl' },
      { name: 'Judith' },
    ];
  }
}
