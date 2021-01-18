import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guida-utilizzo',
  templateUrl: './guida-utilizzo.component.html',
  styleUrls: ['./guida-utilizzo.component.css']
})
export class GuidaUtilizzoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.body.style.background = "#fcfbfa";
  }

}
