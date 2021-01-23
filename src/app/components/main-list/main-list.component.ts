import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/model/Hero';
import { Abilita } from 'src/app/model/Abilita';
import { Background } from 'src/app/model/Background';
import { Hubris } from 'src/app/model/Hubris';
import { Tratti } from 'src/app/model/Tratti';
import { Vantaggio } from 'src/app/model/Vantaggio';
import { Virtu } from 'src/app/model/Virtu';

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.css']
})
export class MainListComponent implements OnInit {

  heroesArray: Hero[];
  selectedHero: Hero;
  newHero: Hero;
  newTratti: Tratti;
  newVirtu: Virtu;
  newHubris: Hubris;
  newAbilita: Abilita;
  newVantaggio: Vantaggio;
  newVantaggi: Vantaggio[];
  newBackground: Background;
  newBackgrounds: Background[];
  editMode: boolean;
  removeMode: boolean;
  addModeModal: boolean;
  editModeModal: boolean;
  removeModeModal: boolean;
  isArrayEmpty: boolean;
  nazioniArray: string[];

  constructor() { }

  ngOnInit(): void {
    this.nazioniArray = ["Vodacce", "Vestenmennavenjar", "Ussura", "Montaigne", "Marche delle Highland","Insimore", "Eisen", "Conf. Samartiana", "Castille", "Avalon"]
    document.body.style.background = "#c0d5f8";
    this.editMode = false;
    this.removeMode = false;
    this.addModeModal = false;
    this.editModeModal = false;
    this.removeModeModal = false;
    this.newHero = new Hero();
    this.newTratti = new Tratti();
    this.newVirtu = new Virtu();
    this.newHubris = new Hubris();
    this.newAbilita = new Abilita();
    this.newVantaggio = new Vantaggio();
    this.newVantaggi = [];
    this.newBackground = new Background();
    this.newBackgrounds = [];
    let jsonHeroes = localStorage.getItem("7thSeaHeroes");
    this.heroesArray = JSON.parse(jsonHeroes);
    localStorage.setItem("7thSeaHeroes", JSON.stringify(this.heroesArray));
    if (this.heroesArray==null) {
      this.isArrayEmpty = false;
      this.heroesArray = [];
    } else{
      for (let i = 0; i < this.heroesArray.length; i++) {
        this.heroesArray[i].id=i
      }
      this.selectedHero = this.heroesArray[0];
      this.isArrayEmpty = true;
    }
  }

  selectPg(pg: Hero){
    this.selectedHero = pg;
    this.newBackgrounds = this.selectedHero.background;
    this.newVantaggi = this.selectedHero.vantaggi;
  }

  addNewVantaggio(){
    this.newVantaggi.push(this.newVantaggio);
    this.newVantaggio = new Vantaggio();
  }

  addNewBackground(){
    this.newBackgrounds.push(this.newBackground);
    this.newBackground = new Background();
  }

  addEditVantaggio(){
    this.newVantaggi.push(this.newVantaggio);
    this.newVantaggio = new Vantaggio();
  }

  addEditBackground(){
    this.newBackgrounds.push(this.newBackground);
    this.newBackground = new Background();
  }

  addPlayer(){
    if (this.heroesArray==null) {
      this.newHero.id
    } else{
      this.newHero.id = this.heroesArray.length;
    }
    this.newHero.incrementi = 0;
    this.newHero.pe = 1;
    this.newHero.background = this.newBackgrounds;
    this.newHero.vita = 20;
    this.newHero.vantaggi = this.newVantaggi;
    this.newHero.abilita= this.newAbilita;
    this.newHero.tratti = this.newTratti;
    this.newHero.virtu = this.newVirtu;
    this.newHero.hubris = this.newHubris;
    this.heroesArray.push(this.newHero);
    localStorage.setItem("7thSeaHeroes", JSON.stringify(this.heroesArray));
    this.newHero = new Hero();
    if (this.heroesArray==null) {
      this.isArrayEmpty = false;
    } else{
      for (let i = 0; i < this.heroesArray.length; i++) {
        this.isArrayEmpty = true;
      }
    }
  }

  rimuoviVantaggioAdd(i){
    this.newVantaggi.splice(i, 1);
  }
  
  rimuoviBackgroundAdd(i){
    this.newBackgrounds.splice(i, 1);
  }

  rimuoviVantaggioEdit(i){
    this.selectedHero.vantaggi.splice(i, 1)
  }

  rimuoviBackgroundEdit(i){
    this.selectedHero.background.splice(i, 1)
  }

  editPlayer(){
    for (let i = 0; i < this.heroesArray.length; i++) {
      if (this.selectedHero.id == this.heroesArray[i].id) {
        this.heroesArray[i] = this.selectedHero;
        this.heroesArray[i].background = this.newBackgrounds;
        this.heroesArray[i].vantaggi = this.newVantaggi;
      }
    }
    this.ordinaArray();
    localStorage.setItem("7thSeaHeroes", JSON.stringify(this.heroesArray));
  }

  removePlayer(){
    for (let i = 0; i < this.heroesArray.length; i++) {
      if (this.selectedHero.id == this.heroesArray[i].id) {
        this.heroesArray.splice(i, 1);
      }
    }
    if (this.heroesArray==null) {
      this.isArrayEmpty = false;
    } else{
      for (let i = 0; i < this.heroesArray.length; i++) {
        this.isArrayEmpty = true;
      }
    }
    this.ordinaArray();
    localStorage.setItem("7thSeaHeroes", JSON.stringify(this.heroesArray));
  }

  setRemoveMode(){
    this.removeMode = !this.removeMode;
  }

  setEditMode(){
    this.editMode = !this.editMode;
  }

  setSelectedBackground(b: Background){
    this.newBackground = b;
  }

  setSelectedVantaggio(v: Vantaggio){
    this.newVantaggio = v;
  }

  setAddModal(){
    this.newVantaggi = [];
    this.newBackgrounds = [];
    this.addModeModal = true;
    this.editModeModal = false;
    this.removeModeModal = false;
  }

  setEditModal(pg){
    this.selectPg(pg);
    this.addModeModal = false;
    this.editModeModal = true;
    this.removeModeModal = false;
  }

  setRemoveModal(pg){
    this.selectPg(pg);
    this.addModeModal = false;
    this.editModeModal = false;
    this.removeModeModal = true;
  }

  ordinaArray(){
    this.heroesArray = this.heroesArray.sort((n1,n2) => {
      if (n1.id > n2.id) {
          return 1;
      }
  
      if (n1.id < n2.id) {
          return -1;
      }
  
      return 0;
    });
  }

}
