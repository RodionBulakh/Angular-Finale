import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  InputText=''
  constructor() { }

  addText(event: Event) {
    this.InputText = (<HTMLInputElement>event.target).value;
  }

  ngOnInit(): void {
  }

}
