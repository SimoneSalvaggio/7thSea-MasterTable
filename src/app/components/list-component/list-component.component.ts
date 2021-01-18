import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Villain } from '../../model/Villain';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css']
})
export class ListComponentComponent implements OnInit {

  heroesArray = ["Vigfuss", "Volker", "Jean", "Niv", "Alejandro"]
  villainsArray = ["Vigfuss", "Volker", "Jean", "Niv", "Alejandro"]
  
  constructor() { }
  
  ngOnInit(){ }
  
  removeVillain(i){
    console.log(i);
  }


}
