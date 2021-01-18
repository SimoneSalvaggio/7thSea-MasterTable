import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-note',
  templateUrl: './main-note.component.html',
  styleUrls: ['./main-note.component.css']
})
export class MainNoteComponent implements OnInit {

  noteSalvate: string;

  constructor() { }

  ngOnInit(): void {
    document.body.style.background = "#fcfbfa";
    this.noteSalvate = localStorage.getItem("7thSeaNote")
  }

  salvaNote(){
    localStorage.setItem("7thSeaNote", this.noteSalvate)
  }
}
