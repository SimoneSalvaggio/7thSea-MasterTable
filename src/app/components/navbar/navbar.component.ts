import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  background(nColor){
    switch (nColor) {
      case 1:
        document.body.style.background = "#c0d5f8";
        break;
      case 2:
        document.body.style.background = "#facaca";
        break;
      case 3:
        document.body.style.background = "#fcfbfa";
        break;
      default:
        break;
    }
  }

}
