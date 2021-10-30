import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayUsersOrRoomsComponent } from './display-users-or-rooms.component';

describe('DisplayUsersOrRoomsComponent', () => {
  let component: DisplayUsersOrRoomsComponent;
  let fixture: ComponentFixture<DisplayUsersOrRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayUsersOrRoomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayUsersOrRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
