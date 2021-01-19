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
    this.selectedHero.vantaggi.push(this.newVantaggio);
    this.newVantaggio = new Vantaggio();
  }

  addEditBackground(){
    this.selectedHero.background.push(this.newBackground);
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

  setAddModal(){
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
  edit(){
    // var p0 = this.heroesArray[0];
    // p0.pe = 0;
    // this.heroesArray[0] = p0;

    // var p1 = this.heroesArray[1];
    // p1.pe = 0;
    // this.heroesArray[1] = p1;

    // var p2 = this.heroesArray[2];
    // p2.pe = 0;
    // this.heroesArray[2] = p2;

    // var p3 = this.heroesArray[3];
    // p3.pe = 0;
    // this.heroesArray[3] = p3;

    // var p4 = this.heroesArray[4];
    // p4.pe = 0;
    // this.heroesArray[4] = p4;

    // localStorage.setItem("7thSeaHeroes", JSON.stringify(this.heroesArray));
  }

  backup(){
    // localStorage.setItem("7thSeaHeroesBackup", JSON.stringify(this.heroesArray));
  }

  add(){
    // let vigfuss = new Hero();
    // vigfuss.id= 5;

    // vigfuss.nome="Vigfuss Serksen";

    // vigfuss.vita = 20;

    // let tr = new Tratti();
    // tr.vigore = 3;
    // tr.grazia = 3;
    // tr.risolutezza = 2;
    // tr.acume = 3;
    // tr.panache = 2;
    // vigfuss.tratti = tr;

    // let ab = new Abilita();
    // ab.allettare = 1;
    // ab.arteDellaGuerra = 0;
    // ab.atletica = 1;
    // ab.cavalcare = 0;
    // ab.convincere = 2;
    // ab.empatia = 0;
    // ab.esibirsi = 0;
    // ab.furto = 0;
    // ab.intimidire = 3;
    // ab.istruzione = 0;
    // ab.mira = 1;
    // ab.mischia = 2;
    // ab.nascondersi = 0;
    // ab.navigazione = 3;
    // ab.notare = 2;
    // ab.rissa = 2;
    // vigfuss.abilita = ab;

    // let vantaggiArray = []
    // let vantaggio1 = new Vantaggio();
    // vantaggio1.nome = "Sguardo di ghiaccio";
    // vantaggio1.descrizione = " Spendendo un Punto Eroe, l’Eroe può intimorire un altro personaggio facendolo recedere da un pericolo, ottenendo accesso a un luogo riservato o, in generale, facendolo sparire dalla sua vista.";
    // vantaggiArray.push(vantaggio1);
    // let vantaggio2 = new Vantaggio();
    // vantaggio2.nome = "Ti porto con me";
    // vantaggio2.descrizione = "Spendendo un Punto Eroe, l’Eroe aumenta il danno inflitto in questo Round del numero di Ferite Drammatiche che ha subito";
    // vantaggiArray.push(vantaggio2);
    // let vantaggio3 = new Vantaggio();
    // vantaggio3.nome = "Gambe da marinaio";
    // vantaggio3.descrizione = "L’Eroe non ha difficoltà a gestire l’incerto appoggio dovuto al ponte di una nave. Ottiene 1 Dado Bonus in tutti i Rischi fisici eseguiti a bordo: duellare sulla tolda o scalare il sartiame durante una tempesta";
    // vantaggiArray.push(vantaggio3);
    // let vantaggio4 = new Vantaggio();
    // vantaggio4.nome = "Joie de vivre";
    // vantaggio4.descrizione = "Prima di affrontare un Malvagio spende un Punto Eroe e fa un commento arguto. Chi lo sente considera come 10 tutti i dadi del prossimo tiro che ottengono un risultato minore o uguale al suo Grado di Abilità";
    // vantaggiArray.push(vantaggio4);
    // let vantaggio5 = new Vantaggio();
    // vantaggio5.nome = "Sala d'armi";
    // vantaggio5.descrizione = "Gettata rune - discorso per fama - conoscere vero nome";
    // vantaggiArray.push(vantaggio5);
    // vigfuss.vantaggi = vantaggiArray;

    // let vir = new Virtu();
    // vir.nome = "Astuto";
    // vigfuss.virtu= vir;

    // let hub = new Hubris();
    // hub.nome = "Fanatico";
    // vigfuss.hubris = hub;
    
    // let backArray = [];
    // let back1 = new Background();
    // back1.nome = "Sjorover";
    // back1.descrizione = "Crede negli dei antichi, +1 PE: si mette in pericolo per accedere al Valhalla";
    // backArray.push(back1);
    // let back2 = new Background();
    // back2.nome = "Skald";
    // back2.descrizione = "Conosce i misteri del fuoco e delle ossa, +1PE quando lancia le rune per risolvere il problema di un compagno";
    // backArray.push(back2);
    // vigfuss.background = backArray;

    // vigfuss.incrementi = 0;

    // this.heroesArray.splice(2, 1);
    // this.heroesArray.splice(1, 1);
    // this.heroesArray.push(vigfuss)

    // localStorage.setItem("7thSeaHeroes", JSON.stringify(this.heroesArray));
  }

}
