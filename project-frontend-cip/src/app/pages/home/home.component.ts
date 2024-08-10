import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  now?: Date;
  constructor() {
  }

  ngOnInit(){
    this.now = new Date();
    setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

}
